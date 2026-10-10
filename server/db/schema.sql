-- ==============================================================================
-- HKAYA Kids Library — Production SQLite Schema
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer', 'admin')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  subcategory TEXT,
  price INTEGER NOT NULL CHECK(price >= 0),
  compare_at_price INTEGER,
  stock INTEGER NOT NULL DEFAULT 50 CHECK(stock >= 0),
  images TEXT NOT NULL, -- JSON array of image URLs
  description TEXT,
  short_description TEXT,
  age_range TEXT,
  age_min INTEGER,
  age_max INTEGER,
  age_group_id TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  best_seller INTEGER NOT NULL DEFAULT 0,
  new_arrival INTEGER NOT NULL DEFAULT 0,
  learning_benefits TEXT,
  is_digital INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_bestseller ON products(best_seller);
CREATE INDEX IF NOT EXISTS idx_products_newarrival ON products(new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_age_min ON products(age_min);
CREATE INDEX IF NOT EXISTS idx_products_age_max ON products(age_max);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items TEXT NOT NULL, -- JSON array of verified product items
  subtotal INTEGER NOT NULL CHECK(subtotal >= 0),
  delivery_fee INTEGER NOT NULL CHECK(delivery_fee >= 0),
  total INTEGER NOT NULL CHECK(total >= 0),
  county TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL CHECK(payment_method IN ('mpesa', 'card', 'cash_on_delivery')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK(provider IN ('mpesa_daraja', 'card_gateway', 'cash_on_delivery')),
  provider_reference TEXT,
  merchant_request_id TEXT,
  checkout_request_id TEXT,
  amount INTEGER NOT NULL CHECK(amount >= 0),
  currency TEXT NOT NULL DEFAULT 'KES',
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed', 'cancelled')),
  raw_callback TEXT, -- Sanitized callback JSON for idempotency audit
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_checkout_req_id ON payments(checkout_request_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_ref ON payments(provider_reference);

-- Audit / Security Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  event TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
