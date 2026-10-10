import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Attempt to load .env from server/ or project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: parseInt(process.env.PORT || '5001', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  
  // Database Path
  DATABASE_PATH: process.env.DATABASE_PATH || path.resolve(__dirname, '../data/hkaya.db'),
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'hkaya_dev_jwt_secret_must_be_changed_in_production_873192847192',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Admin Initial Seed
  ADMIN_INITIAL_EMAIL: (process.env.ADMIN_INITIAL_EMAIL || 'admin@hkayalibrary.co.ke').toLowerCase(),
  ADMIN_INITIAL_PASSWORD: process.env.ADMIN_INITIAL_PASSWORD || 'HkayaAdmin2026!Secure',

  // Daraja M-Pesa Settings
  MPESA_ENVIRONMENT: (process.env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase(),
  MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY || '',
  MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET || '',
  MPESA_SHORTCODE: process.env.MPESA_SHORTCODE || '174379',
  MPESA_PASSKEY: process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbaca158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c91',
  MPESA_CALLBACK_URL: process.env.MPESA_CALLBACK_URL || 'https://api.hkayalibrary.co.ke/api/payments/mpesa/callback',
  MPESA_TRANSACTION_TYPE: process.env.MPESA_TRANSACTION_TYPE || 'CustomerPayBillOnline',

  // Free delivery threshold & standard fee in KSh
  FREE_DELIVERY_THRESHOLD: 3000,
  DEFAULT_DELIVERY_FEE: 350
};

// Check if real Daraja credentials have been configured
export const isMpesaConfigured = Boolean(
  ENV.MPESA_CONSUMER_KEY &&
  ENV.MPESA_CONSUMER_SECRET &&
  ENV.MPESA_SHORTCODE &&
  ENV.MPESA_PASSKEY
);
