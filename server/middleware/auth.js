import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { ENV } from '../config/env.js';

/**
 * Extracts and verifies JWT from Bearer Authorization header
 */
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const userRow = db.prepare('SELECT id, name, email, phone, role FROM users WHERE id = ?').get(decoded.id);

    if (!userRow) {
      req.user = null;
      return next();
    }

    req.user = {
      id: userRow.id,
      name: userRow.name,
      email: userRow.email,
      phone: userRow.phone,
      role: userRow.role
    };
    next();
  } catch (err) {
    req.user = null;
    next();
  }
}

/**
 * Enforces authenticated user
 */
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please sign in.'
    });
  }
  next();
}

/**
 * Enforces admin authorization strictly on the server-side
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Administrator privileges required.'
    });
  }
  next();
}
