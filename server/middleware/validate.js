/**
 * Validates and normalizes Kenyan phone numbers to Daraja format: 254XXXXXXXXX
 */
export function normalizeKenyanPhone(phone) {
  if (!phone || typeof phone !== 'string') return null;

  // Strip spaces, dashes, parentheses
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, '');

  // 07XXXXXXXX or 01XXXXXXXX -> 2547XXXXXXXX or 2541XXXXXXXX
  if (/^0[17]\d{8}$/.test(cleaned)) {
    return '254' + cleaned.slice(1);
  }

  // 7XXXXXXXX or 1XXXXXXXX -> 2547XXXXXXXX or 2541XXXXXXXX
  if (/^[17]\d{8}$/.test(cleaned)) {
    return '254' + cleaned;
  }

  // 2547XXXXXXXX or 2541XXXXXXXX
  if (/^254[17]\d{8}$/.test(cleaned)) {
    return cleaned;
  }

  return null;
}

/**
 * Validates email format
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates order payload on backend
 */
export function validateOrderInput(req, res, next) {
  const { items, customerName, customerEmail, customerPhone, county, deliveryAddress, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Order must contain at least one product item.' });
  }

  for (const item of items) {
    if (!item.productId || typeof item.productId !== 'string') {
      return res.status(400).json({ success: false, error: 'Invalid product ID in order items.' });
    }
    const qty = parseInt(item.quantity, 10);
    if (isNaN(qty) || qty <= 0 || qty > 50) {
      return res.status(400).json({ success: false, error: 'Product quantity must be between 1 and 50.' });
    }
  }

  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Customer name is required (min 2 characters).' });
  }

  if (!isValidEmail(customerEmail)) {
    return res.status(400).json({ success: false, error: 'Valid customer email is required.' });
  }

  const normalizedPhone = normalizeKenyanPhone(customerPhone);
  if (!normalizedPhone) {
    return res.status(400).json({
      success: false,
      error: 'Valid Kenyan mobile number is required (e.g. 0712345678 or 254712345678).'
    });
  }

  if (!county || typeof county !== 'string' || county.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Delivery county is required.' });
  }

  if (!deliveryAddress || typeof deliveryAddress !== 'string' || deliveryAddress.trim().length < 3) {
    return res.status(400).json({ success: false, error: 'Delivery address/location details are required.' });
  }

  const validPaymentMethods = ['mpesa', 'card'];
  if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
    return res.status(400).json({ success: false, error: 'Invalid payment method selected. Please choose M-Pesa or Card.' });
  }

  // Attach normalized values
  req.body.customerPhone = normalizedPhone;
  req.body.customerEmail = customerEmail.trim().toLowerCase();
  req.body.customerName = customerName.trim();

  next();
}
