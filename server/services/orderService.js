import crypto from 'node:crypto';
import { db } from '../db/database.js';
import { ENV } from '../config/env.js';

export class OrderService {
  /**
   * Calculates trusted pricing, verifies stock, and creates a pending order
   */
  static createOrder({
    userId = null,
    items,
    customerName,
    customerEmail,
    customerPhone,
    county,
    deliveryAddress,
    notes = '',
    paymentMethod
  }) {
    // Zero-trust calculation: Fetch live product details from DB
    const verifiedItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const product = db.prepare(`
        SELECT id, name, price, stock, active, is_digital
        FROM products
        WHERE id = ?
      `).get(item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (!product.active) {
        throw new Error(`Product "${product.name}" is currently unavailable.`);
      }

      const qty = parseInt(item.quantity, 10);
      if (qty <= 0) {
        throw new Error(`Invalid quantity for product "${product.name}".`);
      }

      if (product.stock < qty && !product.is_digital) {
        throw new Error(`Insufficient stock for "${product.name}". Only ${product.stock} left.`);
      }

      const itemTotal = product.price * qty;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        isDigital: Boolean(product.is_digital),
        subtotal: itemTotal
      });
    }

    // Server-side delivery fee calculation
    let deliveryFee = calculatedSubtotal >= ENV.FREE_DELIVERY_THRESHOLD ? 0 : ENV.DEFAULT_DELIVERY_FEE;
    
    // If all items are digital downloads, delivery fee is 0
    const allDigital = verifiedItems.every(i => i.isDigital);
    if (allDigital) {
      deliveryFee = 0;
    }

    const calculatedTotal = calculatedSubtotal + deliveryFee;

    const orderId = `HKY-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();

    const insertOrder = db.prepare(`
      INSERT INTO orders (
        id, user_id, customer_name, customer_email, customer_phone,
        items, subtotal, delivery_fee, total, county, delivery_address,
        notes, status, payment_method, payment_status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertOrder.run(
      orderId,
      userId || null,
      customerName,
      customerEmail,
      customerPhone,
      JSON.stringify(verifiedItems),
      calculatedSubtotal,
      deliveryFee,
      calculatedTotal,
      county,
      deliveryAddress,
      notes || '',
      'pending',
      paymentMethod,
      'pending',
      now,
      now
    );

    // Audit log
    const logId = 'log_' + crypto.randomUUID();
    db.prepare(`
      INSERT INTO audit_logs (id, event, entity_type, entity_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      logId,
      'ORDER_CREATED',
      'order',
      orderId,
      JSON.stringify({ total: calculatedTotal, paymentMethod, customerPhone }),
      now
    );

    return {
      id: orderId,
      userId,
      customerName,
      customerEmail,
      customerPhone,
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      deliveryFee,
      total: calculatedTotal,
      county,
      deliveryAddress,
      status: 'pending',
      paymentMethod,
      paymentStatus: 'pending',
      createdAt: now
    };
  }

  /**
   * Fetches order by ID
   */
  static getOrderById(orderId) {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!order) return null;

    return {
      ...order,
      items: JSON.parse(order.items || '[]')
    };
  }

  /**
   * Fetches orders for a specific customer
   */
  static getOrdersForUser(userId) {
    const rows = db.prepare(`
      SELECT * FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(userId);

    return rows.map(order => ({
      ...order,
      items: JSON.parse(order.items || '[]')
    }));
  }

  /**
   * Admin: Fetches all orders with optional filtering
   */
  static getAllOrders({ status, paymentStatus, limit = 50, offset = 0 } = {}) {
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (paymentStatus) {
      query += ' AND payment_status = ?';
      params.push(paymentStatus);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const rows = db.prepare(query).all(...params);
    return rows.map(order => ({
      ...order,
      items: JSON.parse(order.items || '[]')
    }));
  }

  /**
   * Admin: Updates order fulfillment status
   */
  static updateOrderStatus(orderId, newStatus) {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid order status: ${newStatus}`);
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      UPDATE orders
      SET status = ?, updated_at = ?
      WHERE id = ?
    `).run(newStatus, now, orderId);

    if (result.changes === 0) {
      throw new Error(`Order ${orderId} not found.`);
    }

    return this.getOrderById(orderId);
  }

  /**
   * Reduces product inventory when an order is paid
   * Safe transaction with duplicate prevention
   */
  static deductOrderStock(orderId) {
    const order = this.getOrderById(orderId);
    if (!order) return false;

    // Check if stock has already been deducted for this order
    const alreadyDeducted = db.prepare(`
      SELECT id FROM audit_logs
      WHERE event = 'INVENTORY_DEDUCTED' AND entity_id = ?
      LIMIT 1
    `).get(orderId);

    if (alreadyDeducted) {
      console.log(`[Inventory] Stock already deducted for order: ${orderId}`);
      return true;
    }

    const now = new Date().toISOString();

    for (const item of order.items) {
      if (item.isDigital) continue;

      db.prepare(`
        UPDATE products
        SET stock = MAX(0, stock - ?), updated_at = ?
        WHERE id = ?
      `).run(item.quantity, now, item.productId);
    }

    // Log deduction in audit log
    const logId = 'log_' + crypto.randomUUID();
    db.prepare(`
      INSERT INTO audit_logs (id, event, entity_type, entity_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(logId, 'INVENTORY_DEDUCTED', 'order', orderId, JSON.stringify({ items: order.items }), now);

    console.log(`[Inventory] Stock successfully deducted for order: ${orderId}`);
    return true;
  }
}
