import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ENV, isMpesaConfigured } from './config/env.js';
import { runDatabaseSeed } from './db/seed.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// 1. Production Security Headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://*.unsplash.com"],
      connectSrc: ["'self'", "http://localhost:*", "https://sandbox.safaricom.co.ke", "https://api.safaricom.co.ke"]
    }
  },
  crossOriginEmbedderPolicy: false,
  xContentTypeOptions: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' }
}));

// 2. CORS configuration restricted to authorized client origins
const allowedOrigins = [
  ENV.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, or Daraja webhooks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Request Body Parser with Strict Payload Size Limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. Rate Limiting on /api
app.use('/api', apiLimiter);

// 5. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'HKAYA Kids Library API',
    version: '1.0.0',
    environment: ENV.NODE_ENV,
    mpesaConfigured: isMpesaConfigured,
    mpesaEnvironment: ENV.MPESA_ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

// 6. Mount Feature Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// 7. 404 Handler for undefined API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      error: `API route ${req.originalUrl} not found.`
    });
  }
  next();
});

// 8. Global Centralized Error Handler
app.use(errorHandler);

// Initialize DB and start server
async function startServer() {
  try {
    await runDatabaseSeed();

    app.listen(ENV.PORT, () => {
      console.log('====================================================');
      console.log(`[HKAYA API] Server running on: http://localhost:${ENV.PORT}`);
      console.log(`[HKAYA API] M-Pesa Integration: ${isMpesaConfigured ? 'Configured (' + ENV.MPESA_ENVIRONMENT + ')' : 'Setup/Testing Mode'}`);
      console.log(`[HKAYA API] Allowed Client: ${ENV.CLIENT_URL}`);
      console.log('====================================================');
    });
  } catch (err) {
    console.error('[HKAYA API] Fatal startup error:', err);
    process.exit(1);
  }
}

startServer();

export default app;
