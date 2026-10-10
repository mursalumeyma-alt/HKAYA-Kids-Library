import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { ENV } from '../config/env.js';
import { authenticate, requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { isValidEmail } from '../middleware/validate.js';

const router = express.Router();

/**
 * POST /api/auth/register
 */
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full name is required (min 2 characters).' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check existing email
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
    }

    const userId = 'usr_' + crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      name.trim(),
      cleanEmail,
      phone ? phone.trim() : null,
      passwordHash,
      'customer',
      now,
      now
    );

    const token = jwt.sign(
      { id: userId, email: cleanEmail, role: 'customer' },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : null,
        role: 'customer'
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/auth/login
 */
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/auth/me
 */
router.get('/me', authenticate, requireAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.'
  });
});

/**
 * POST /api/auth/password-reset-request
 */
router.post('/password-reset-request', authLimiter, (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Valid email address is required.' });
  }

  // Always return success to prevent email enumeration
  res.json({
    success: true,
    message: 'If an account exists with this email, password reset instructions have been dispatched.'
  });
});

export default router;
