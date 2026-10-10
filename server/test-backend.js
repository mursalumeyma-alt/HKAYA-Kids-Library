import { db } from './db/database.js';
import { runDatabaseSeed } from './db/seed.js';
import { OrderService } from './services/orderService.js';
import { MpesaService } from './services/mpesaService.js';
import { ENV } from './config/env.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function runTests() {
  console.log('--- Starting Backend Verification Tests ---');

  // Test 1: Seed
  console.log('Test 1: Running Database Seed...');
  await runDatabaseSeed();
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  console.log(`✓ Products in DB: ${productCount}`);
  if (productCount === 0) throw new Error('Products were not seeded');

  // Test 2: Admin user
  console.log('Test 2: Verifying Admin user...');
  const admin = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
  console.log(`✓ Admin user exists: ${admin.email}`);
  const match = await bcrypt.compare(ENV.ADMIN_INITIAL_PASSWORD, admin.password_hash);
  if (!match) throw new Error('Admin password hash mismatch');
  console.log('✓ Admin password hash verified');

  // Test 3: JWT generation & verification
  console.log('Test 3: Testing JWT...');
  const token = jwt.sign({ id: admin.id, role: admin.role }, ENV.JWT_SECRET, { expiresIn: '1h' });
  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  if (decoded.id !== admin.id || decoded.role !== 'admin') throw new Error('JWT verification failed');
  console.log('✓ JWT token verified');

  // Test 4: Server-side price calculation (Zero-trust test)
  console.log('Test 4: Testing zero-trust server order calculation...');
  const firstProd = db.prepare('SELECT id, name, price, stock FROM products LIMIT 1').get();
  const initialStock = firstProd.stock;

  const order = OrderService.createOrder({
    customerName: 'Test Parent',
    customerEmail: 'parent@example.com',
    customerPhone: '254712345678',
    county: 'Nairobi',
    deliveryAddress: 'Kilimani, Nairobi',
    paymentMethod: 'mpesa',
    items: [
      { productId: firstProd.id, quantity: 2, clientClaimedPrice: 1 } // Client claims price is 1 KSh!
    ]
  });

  const expectedSubtotal = firstProd.price * 2;
  const expectedDelivery = expectedSubtotal >= 3000 ? 0 : 350;
  const expectedTotal = expectedSubtotal + expectedDelivery;

  if (order.subtotal !== expectedSubtotal || order.total !== expectedTotal) {
    throw new Error(`Price calculation was tampered! Expected ${expectedTotal}, got ${order.total}`);
  }
  console.log(`✓ Server correctly rejected client-side price and calculated real total: KSh ${order.total} (Subtotal: ${expectedSubtotal}, Delivery: ${expectedDelivery})`);

  // Test 5: M-Pesa STK Push flow & setup mode notice
  console.log('Test 5: Testing M-Pesa STK push handling...');
  const stkResult = await MpesaService.initiateSTKPush({
    orderId: order.id,
    phone: '254712345678'
  });
  console.log(`✓ STK response handled safely (Configured: ${stkResult.isConfigured}): ${stkResult.message || stkResult.customerMessage}`);

  // Test 6: Safe Callback Idempotency & Stock Deduction
  console.log('Test 6: Testing Webhook Callback Idempotency & Stock Deduction...');
  const checkoutRequestId = 'test_crq_' + Date.now();
  
  const payId = 'pay_test_' + Date.now();
  db.prepare(`
    INSERT INTO payments (id, order_id, provider, checkout_request_id, amount, status, created_at, updated_at)
    VALUES (?, ?, 'mpesa_daraja', ?, ?, 'pending', datetime('now'), datetime('now'))
  `).run(payId, order.id, checkoutRequestId, order.total);

  const mockCallback = {
    Body: {
      stkCallback: {
        MerchantRequestID: 'mrq_1',
        CheckoutRequestID: checkoutRequestId,
        ResultCode: 0,
        ResultDesc: 'Success',
        CallbackMetadata: {
          Item: [
            { Name: 'MpesaReceiptNumber', Value: 'QWE123TEST' },
            { Name: 'Amount', Value: order.total },
            { Name: 'TransactionDate', Value: 20261008140000 },
            { Name: 'PhoneNumber', Value: 254712345678 }
          ]
        }
      }
    }
  };

  const callbackResult = MpesaService.handleCallback(mockCallback);
  if (!callbackResult.success) throw new Error('Callback failed: ' + callbackResult.error);
  console.log('✓ Callback successfully processed. Receipt: ' + callbackResult.receiptNumber);

  // Check order status updated
  const updatedOrder = OrderService.getOrderById(order.id);
  if (updatedOrder.payment_status !== 'paid') throw new Error('Order was not marked paid');
  console.log(`✓ Order payment_status: ${updatedOrder.payment_status}, status: ${updatedOrder.status}`);

  // Check stock deducted
  const updatedProd = db.prepare('SELECT stock FROM products WHERE id = ?').get(firstProd.id);
  if (updatedProd.stock !== initialStock - 2) {
    throw new Error(`Stock deduction failed! Expected ${initialStock - 2}, got ${updatedProd.stock}`);
  }
  console.log(`✓ Stock safely deducted: ${initialStock} -> ${updatedProd.stock}`);

  // Duplicate callback test (Idempotency)
  console.log('Test 7: Testing Duplicate Callback Protection (Idempotency)...');
  const duplicateResult = MpesaService.handleCallback(mockCallback);
  const stockAfterDuplicate = db.prepare('SELECT stock FROM products WHERE id = ?').get(firstProd.id).stock;
  if (stockAfterDuplicate !== initialStock - 2) {
    throw new Error('Stock was deducted twice on duplicate callback!');
  }
  console.log('✓ Duplicate callback safely ignored without double stock reduction!');

  console.log('\n========================================');
  console.log('ALL 7 BACKEND SECURITY TESTS PASSED! ✓');
  console.log('========================================\n');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
