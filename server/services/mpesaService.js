import crypto from 'node:crypto';
import { db } from '../db/database.js';
import { ENV, isMpesaConfigured } from '../config/env.js';
import { OrderService } from './orderService.js';

let cachedToken = null;
let tokenExpiresAt = 0;

export class MpesaService {
  /**
   * Generates timestamp in YYYYMMDDHHmmss format required by Daraja
   */
  static getTimestamp() {
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const DD = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${YYYY}${MM}${DD}${hh}${mm}${ss}`;
  }

  /**
   * Generates Daraja password: Base64(Shortcode + Passkey + Timestamp)
   */
  static getPassword(timestamp) {
    const str = `${ENV.MPESA_SHORTCODE}${ENV.MPESA_PASSKEY}${timestamp}`;
    return Buffer.from(str).toString('base64');
  }

  /**
   * Retrieves base URL based on configured environment
   */
  static getBaseUrl() {
    return ENV.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';
  }

  /**
   * Fetches or reuses OAuth access token from Safaricom Daraja
   */
  static async getAccessToken() {
    if (!isMpesaConfigured) {
      throw new Error('M-Pesa credentials are not configured on the server. Please configure MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET in server/.env.');
    }

    const now = Date.now();
    if (cachedToken && tokenExpiresAt > now + 60000) {
      return cachedToken;
    }

    const auth = Buffer.from(`${ENV.MPESA_CONSUMER_KEY}:${ENV.MPESA_CONSUMER_SECRET}`).toString('base64');
    const url = `${this.getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[M-Pesa] Failed to obtain OAuth token from Safaricom:', errorText);
      throw new Error(`Safaricom authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiresAt = now + (parseInt(data.expires_in, 10) * 1000);

    return cachedToken;
  }

  /**
   * Initiates STK Push for an order
   */
  static async initiateSTKPush({ orderId, phone }) {
    const order = OrderService.getOrderById(orderId);
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    if (order.payment_status === 'paid') {
      throw new Error('This order has already been paid.');
    }

    // Check if M-Pesa is configured
    if (!isMpesaConfigured) {
      // Create a pending payment record clearly noting setup status
      const paymentId = 'pay_' + crypto.randomUUID();
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO payments (
          id, order_id, provider, provider_reference, merchant_request_id,
          checkout_request_id, amount, currency, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        paymentId,
        orderId,
        'mpesa_daraja',
        null,
        'SETUP_MODE',
        'SETUP_' + Date.now(),
        order.total,
        'KES',
        'pending',
        now,
        now
      );

      return {
        success: false,
        isConfigured: false,
        orderId,
        amount: order.total,
        phone,
        message: 'M-Pesa payment integration is in setup mode. Backend Safaricom credentials need to be configured in server/.env.',
        instructions: 'Please configure MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET in server/.env to initiate real STK Push on Safaricom Daraja.'
      };
    }

    const accessToken = await this.getAccessToken();
    const timestamp = this.getTimestamp();
    const password = this.getPassword(timestamp);
    const amount = Math.round(order.total); // Whole shillings

    const payload = {
      BusinessShortCode: parseInt(ENV.MPESA_SHORTCODE, 10),
      Password: password,
      Timestamp: timestamp,
      TransactionType: ENV.MPESA_TRANSACTION_TYPE,
      Amount: amount,
      PartyA: parseInt(phone, 10),
      PartyB: parseInt(ENV.MPESA_SHORTCODE, 10),
      PhoneNumber: parseInt(phone, 10),
      CallBackURL: ENV.MPESA_CALLBACK_URL,
      AccountReference: `HKAYA-${orderId.slice(-6)}`,
      TransactionDesc: `Payment for Order ${orderId}`
    };

    console.log(`[M-Pesa] Sending STK Push request to Safaricom for order ${orderId}, amount KSh ${amount}...`);

    const response = await fetch(`${this.getBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || data.ResponseCode !== '0') {
      console.error('[M-Pesa] Daraja STK Push error:', data);
      throw new Error(data.errorMessage || data.CustomerMessage || 'Failed to initiate M-Pesa STK Push with Safaricom.');
    }

    // Save payment record in DB with Daraja request IDs
    const paymentId = 'pay_' + crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO payments (
        id, order_id, provider, provider_reference, merchant_request_id,
        checkout_request_id, amount, currency, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      paymentId,
      orderId,
      'mpesa_daraja',
      null,
      data.MerchantRequestID,
      data.CheckoutRequestID,
      amount,
      'KES',
      'pending',
      now,
      now
    );

    return {
      success: true,
      isConfigured: true,
      paymentId,
      orderId,
      amount,
      phone,
      checkoutRequestId: data.CheckoutRequestID,
      customerMessage: data.CustomerMessage || 'Please check your phone and enter your M-Pesa PIN to complete payment.'
    };
  }

  /**
   * Handles Safaricom Webhook Callback with idempotency and duplicate protection
   */
  static handleCallback(callbackBody) {
    console.log('[M-Pesa] Webhook callback received from Safaricom');

    if (!callbackBody || !callbackBody.Body || !callbackBody.Body.stkCallback) {
      console.error('[M-Pesa] Invalid callback structure:', JSON.stringify(callbackBody));
      return { success: false, error: 'Invalid callback format' };
    }

    const { stkCallback } = callbackBody.Body;
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    console.log(`[M-Pesa] Callback details - CheckoutRequestID: ${CheckoutRequestID}, ResultCode: ${ResultCode}, ResultDesc: "${ResultDesc}"`);

    // Find payment record
    const payment = db.prepare(`
      SELECT * FROM payments
      WHERE checkout_request_id = ? OR merchant_request_id = ?
      LIMIT 1
    `).get(CheckoutRequestID, MerchantRequestID);

    if (!payment) {
      console.warn(`[M-Pesa] Payment record not found for CheckoutRequestID: ${CheckoutRequestID}`);
      return { success: false, error: 'Payment record not found' };
    }

    // IDEMPOTENCY: If payment is already completed, do nothing
    if (payment.status === 'completed') {
      console.log(`[M-Pesa] Payment ${payment.id} already processed. Ignoring duplicate callback.`);
      return { success: true, message: 'Already processed' };
    }

    const now = new Date().toISOString();

    if (ResultCode === 0 && CallbackMetadata && Array.isArray(CallbackMetadata.Item)) {
      // Successful payment
      let receiptNumber = null;
      let paidAmount = 0;
      let transactionDate = null;
      let paidPhone = null;

      for (const item of CallbackMetadata.Item) {
        if (item.Name === 'MpesaReceiptNumber') receiptNumber = item.Value;
        if (item.Name === 'Amount') paidAmount = Number(item.Value);
        if (item.Name === 'TransactionDate') transactionDate = String(item.Value);
        if (item.Name === 'PhoneNumber') paidPhone = String(item.Value);
      }

      // Verify paid amount matches expected amount
      if (paidAmount < payment.amount) {
        console.error(`[M-Pesa ALERT] Paid amount (${paidAmount}) is less than expected (${payment.amount}) for order ${payment.order_id}!`);
        
        db.prepare(`
          UPDATE payments
          SET status = 'failed', provider_reference = ?, raw_callback = ?, updated_at = ?
          WHERE id = ?
        `).run(receiptNumber || 'UNDERPAID', JSON.stringify(callbackBody), now, payment.id);

        return { success: false, error: 'Underpaid transaction' };
      }

      // Mark payment as completed
      db.prepare(`
        UPDATE payments
        SET status = 'completed', provider_reference = ?, raw_callback = ?, updated_at = ?
        WHERE id = ?
      `).run(receiptNumber, JSON.stringify(callbackBody), now, payment.id);

      // Mark order as paid
      db.prepare(`
        UPDATE orders
        SET payment_status = 'paid', status = 'processing', updated_at = ?
        WHERE id = ?
      `).run(now, payment.order_id);

      // Reduce product inventory safely
      OrderService.deductOrderStock(payment.order_id);

      // Audit Log
      const logId = 'log_' + crypto.randomUUID();
      db.prepare(`
        INSERT INTO audit_logs (id, event, entity_type, entity_id, details, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        logId,
        'PAYMENT_SUCCESS',
        'payment',
        payment.id,
        JSON.stringify({ receiptNumber, paidAmount, phone: paidPhone, orderId: payment.order_id }),
        now
      );

      console.log(`[M-Pesa] Order ${payment.order_id} marked as PAID. Receipt: ${receiptNumber}`);
      return { success: true, receiptNumber, orderId: payment.order_id };
    } else {
      // Payment failed or cancelled by user
      db.prepare(`
        UPDATE payments
        SET status = 'failed', raw_callback = ?, updated_at = ?
        WHERE id = ?
      `).run(JSON.stringify(callbackBody), now, payment.id);

      db.prepare(`
        UPDATE orders
        SET payment_status = 'failed', updated_at = ?
        WHERE id = ?
      `).run(now, payment.order_id);

      console.log(`[M-Pesa] Payment failed/cancelled for order ${payment.order_id}: ${ResultDesc}`);
      return { success: false, error: ResultDesc };
    }
  }

  /**
   * Retrieves payment status for frontend polling
   */
  static getPaymentStatus(orderId) {
    const payment = db.prepare(`
      SELECT id, order_id, provider, provider_reference, checkout_request_id, amount, status, created_at, updated_at
      FROM payments
      WHERE order_id = ?
      ORDER BY created_at DESC
      LIMIT 1
    `).get(orderId);

    const order = OrderService.getOrderById(orderId);

    return {
      orderId,
      orderStatus: order ? order.status : null,
      paymentStatus: order ? order.payment_status : 'unknown',
      payment: payment || null
    };
  }
}
