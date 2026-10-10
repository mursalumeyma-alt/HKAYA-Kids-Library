import express from 'express';
import { MpesaService } from '../services/mpesaService.js';
import { db } from '../db/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { paymentLimiter } from '../middleware/rateLimiter.js';
import { normalizeKenyanPhone } from '../middleware/validate.js';

const router = express.Router();

/**
 * POST /api/payments/mpesa/initiate
 * Initiates real M-Pesa STK Push
 */
router.post('/mpesa/initiate', paymentLimiter, async (req, res, next) => {
  try {
    const { orderId, phone } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, error: 'Order ID is required.' });
    }

    const normalizedPhone = normalizeKenyanPhone(phone);
    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        error: 'Valid Kenyan mobile number is required (e.g. 0712345678 or 254712345678).'
      });
    }

    const result = await MpesaService.initiateSTKPush({
      orderId,
      phone: normalizedPhone
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/payments/mpesa/callback
 * Safaricom Daraja Webhook Callback endpoint
 */
router.post('/mpesa/callback', async (req, res) => {
  try {
    const result = MpesaService.handleCallback(req.body);
    // Safaricom expects 200 OK with this standard JSON response
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Callback processed successfully'
    });
  } catch (err) {
    console.error('[M-Pesa Webhook Error]:', err);
    // Return 200 so Safaricom does not aggressively hammer failed retries
    res.status(200).json({
      ResultCode: 0,
      ResultDesc: 'Callback acknowledged'
    });
  }
});

/**
 * GET /api/payments/status/:orderId
 * Frontend polling endpoint to verify whether STK prompt was completed
 */
router.get('/status/:orderId', (req, res) => {
  try {
    const statusData = MpesaService.getPaymentStatus(req.params.orderId);
    res.json({
      success: true,
      ...statusData
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve payment status.' });
  }
});

/**
 * GET /api/admin/payments
 * Admin: Retrieve payment transaction audit records
 */
router.get('/admin/all', authenticate, requireAdmin, (req, res, next) => {
  try {
    const payments = db.prepare(`
      SELECT p.*, o.customer_name, o.customer_email, o.customer_phone
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      ORDER BY p.created_at DESC
      LIMIT 100
    `).all();

    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (err) {
    next(err);
  }
});

export default router;
