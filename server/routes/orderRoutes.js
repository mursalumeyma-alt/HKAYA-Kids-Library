import express from 'express';
import { OrderService } from '../services/orderService.js';
import { authenticate, requireAuth, requireAdmin } from '../middleware/auth.js';
import { validateOrderInput } from '../middleware/validate.js';

const router = express.Router();

/**
 * POST /api/orders
 * Create new order with zero-trust server-side calculation
 */
router.post('/', authenticate, validateOrderInput, async (req, res, next) => {
  try {
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      county,
      deliveryAddress,
      notes,
      paymentMethod
    } = req.body;

    const order = OrderService.createOrder({
      userId: req.user ? req.user.id : null,
      items,
      customerName,
      customerEmail,
      customerPhone,
      county,
      deliveryAddress,
      notes,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/my-orders
 * Customer: Retrieve own order history
 */
router.get('/my-orders', authenticate, requireAuth, (req, res, next) => {
  try {
    const orders = OrderService.getOrdersForUser(req.user.id);
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/:id
 * Customer / Admin: Retrieve single order details
 */
router.get('/:id', authenticate, (req, res, next) => {
  try {
    const order = OrderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    // Authorization check
    if (order.user_id) {
      if (!req.user || (req.user.id !== order.user_id && req.user.role !== 'admin')) {
        return res.status(403).json({ success: false, error: 'Unauthorized to view this order.' });
      }
    }

    res.json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/orders
 * Admin: Retrieve all orders
 */
router.get('/admin/all', authenticate, requireAdmin, (req, res, next) => {
  try {
    const { status, paymentStatus, limit = 100 } = req.query;
    const orders = OrderService.getAllOrders({
      status,
      paymentStatus,
      limit: parseInt(limit, 10)
    });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/admin/orders/:id/status
 * Admin: Update fulfillment status
 */
router.patch('/admin/:id/status', authenticate, requireAdmin, (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedOrder = OrderService.updateOrderStatus(req.params.id, status);

    res.json({
      success: true,
      message: `Order status updated to ${status}.`,
      order: updatedOrder
    });
  } catch (err) {
    next(err);
  }
});

export default router;
