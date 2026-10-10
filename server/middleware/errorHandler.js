import { ENV } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  // Safe server-side log
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  const status = err.status || 500;
  const message = status === 500
    ? 'An unexpected error occurred while processing your request. Please try again later.'
    : err.message;

  res.status(status).json({
    success: false,
    error: message,
    ...(ENV.NODE_ENV === 'development' ? { devDetails: err.message } : {})
  });
}
