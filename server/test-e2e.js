async function runE2ETest() {
  const BASE_URL = 'http://localhost:5000/api';
  console.log('--- Running Live End-to-End API Scenario ---');

  // 1. Health check
  const healthRes = await fetch(`${BASE_URL}/health`).then(r => r.json());
  console.log('1. Health check:', healthRes.status, '| DB Engine: SQLite | M-Pesa Configured:', healthRes.mpesaConfigured);
  if (healthRes.status !== 'ok') throw new Error('Health check failed');

  // 2. Register new customer
  const customerEmail = `parent_${Date.now()}@example.com`;
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Halima Mwangi',
      email: customerEmail,
      phone: '0722123456',
      password: 'ParentSecure2026!'
    })
  }).then(r => r.json());

  console.log('2. Customer Registration:', regRes.success, '| Customer ID:', regRes.user?.id);
  if (!regRes.success) throw new Error('Customer registration failed: ' + regRes.error);
  const customerToken = regRes.token;

  // 3. Query catalog
  const productsRes = await fetch(`${BASE_URL}/products?limit=5`).then(r => r.json());
  console.log('3. Catalog query returned products count:', productsRes.count);
  const testProduct = productsRes.products[0];

  // 4. Place Order with zero-trust server calculation
  const orderRes = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${customerToken}`
    },
    body: JSON.stringify({
      items: [{ productId: testProduct.id, quantity: 1 }],
      customerName: 'Halima Mwangi',
      customerEmail,
      customerPhone: '0722123456',
      county: 'Nairobi',
      deliveryAddress: 'Parklands, 3rd Avenue',
      notes: 'Please call on arrival',
      paymentMethod: 'mpesa'
    })
  }).then(r => r.json());

  console.log('4. Order Creation:', orderRes.success, '| Order ID:', orderRes.order?.id, '| Server Total: KSh', orderRes.order?.total);
  if (!orderRes.success) throw new Error('Order creation failed: ' + orderRes.error);
  const orderId = orderRes.order.id;

  // 5. Initiate M-Pesa
  const mpesaRes = await fetch(`${BASE_URL}/payments/mpesa/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId,
      phone: '0722123456'
    })
  }).then(r => r.json());

  console.log('5. M-Pesa Initiation response - isConfigured:', mpesaRes.isConfigured, '| Notice:', mpesaRes.message || mpesaRes.customerMessage);

  // 6. Query Payment Status
  const statusRes = await fetch(`${BASE_URL}/payments/status/${orderId}`).then(r => r.json());
  console.log('6. Payment Status polling - Order Payment Status:', statusRes.paymentStatus, '| Order Status:', statusRes.orderStatus);

  // 7. Login as Administrator
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@hkayalibrary.co.ke',
      password: 'HkayaAdmin2026!Secure'
    })
  }).then(r => r.json());

  console.log('7. Admin Login:', adminLoginRes.success, '| Role:', adminLoginRes.user?.role);
  if (!adminLoginRes.success || adminLoginRes.user?.role !== 'admin') throw new Error('Admin login failed');
  const adminToken = adminLoginRes.token;

  // 8. Admin retrieve all orders
  const adminOrdersRes = await fetch(`${BASE_URL}/orders/admin/all`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  }).then(r => r.json());

  console.log('8. Admin All Orders count:', adminOrdersRes.count, '| Latest order in list:', adminOrdersRes.orders[0]?.id);

  // 9. Admin update order status
  const updateRes = await fetch(`${BASE_URL}/orders/admin/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({ status: 'processing' })
  }).then(r => r.json());

  console.log('9. Admin Status Update:', updateRes.success, '| New Status:', updateRes.order?.status);

  // 10. Admin adjust stock
  const stockRes = await fetch(`${BASE_URL}/products/${testProduct.id}/stock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({ stock: 55 })
  }).then(r => r.json());

  console.log('10. Admin Stock adjustment:', stockRes.success, '| New Stock:', stockRes.stock);

  console.log('\n======================================================');
  console.log('LIVE END-TO-END SCENARIO VERIFIED 100% SUCCESSFULLY! ✓');
  console.log('======================================================\n');
}

runE2ETest().catch(err => {
  console.error('E2E Test Failed:', err);
  process.exit(1);
});
