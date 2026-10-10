import express from 'express';
import crypto from 'node:crypto';
import { db } from '../db/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

function mapProductRow(p) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug || p.id,
    category: p.category,
    subcategory: p.subcategory || null,
    price: p.price,
    compareAtPrice: p.compare_at_price || null,
    stock: p.stock,
    images: JSON.parse(p.images || '[]'),
    description: p.description,
    shortDescription: p.short_description,
    ageRange: p.age_range,
    ageMin: p.age_min !== null && p.age_min !== undefined ? p.age_min : undefined,
    ageMax: p.age_max !== null && p.age_max !== undefined ? p.age_max : undefined,
    ageGroupId: p.age_group_id || null,
    featured: Boolean(p.featured),
    bestSeller: Boolean(p.best_seller),
    newArrival: Boolean(p.new_arrival),
    learningBenefits: JSON.parse(p.learning_benefits || '[]'),
    isDigital: Boolean(p.is_digital),
    active: Boolean(p.active),
    createdAt: p.created_at,
    updatedAt: p.updated_at
  };
}

/**
 * GET /api/products
 * Public: Query products with optional filters
 */
router.get('/', (req, res, next) => {
  try {
    const {
      category,
      search,
      ageGroup,
      featured,
      bestSeller,
      newArrival,
      activeOnly = '1',
      sort = 'featured',
      limit = 100,
      offset = 0
    } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (activeOnly === '1') {
      query += ' AND active = 1';
    }

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (featured === '1' || featured === 'true') {
      query += ' AND featured = 1';
    }

    if (bestSeller === '1' || bestSeller === 'true') {
      query += ' AND best_seller = 1';
    }

    if (newArrival === '1' || newArrival === 'true') {
      query += ' AND new_arrival = 1';
    }

    if (ageGroup && ageGroup !== 'all') {
      let bMin = null;
      let bMax = null;
      if (ageGroup === '0-2' || ageGroup === '0-3') {
        bMin = 0; bMax = 2;
      } else if (ageGroup === '3-5') {
        bMin = 3; bMax = 5;
      } else if (ageGroup === '6-8' || ageGroup === '5-7') {
        bMin = 6; bMax = 8;
      } else if (ageGroup === '9-12' || ageGroup === '7-10' || ageGroup === '10-12') {
        bMin = 9; bMax = 12;
      } else if (ageGroup === '13+') {
        bMin = 13; bMax = 99;
      }

      if (bMin !== null && bMax !== null) {
        query += " AND (age_min <= ? AND age_max >= ?)";
        params.push(bMax, bMin);
      }
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ? OR short_description LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    // Sort order
    if (sort === 'price-low') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-high') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'newest') {
      query += ' ORDER BY new_arrival DESC, created_at DESC';
    } else if (sort === 'bestseller') {
      query += ' ORDER BY best_seller DESC, price DESC';
    } else {
      query += ' ORDER BY featured DESC, best_seller DESC, created_at DESC';
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const rows = db.prepare(query).all(...params);
    const products = rows.map(mapProductRow);

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/products/category/:category
 * Public: Get products strictly belonging to a category
 */
router.get('/category/:category', (req, res, next) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM products
      WHERE category = ? AND active = 1
      ORDER BY featured DESC, best_seller DESC, created_at DESC
    `).all(req.params.category);

    res.json({
      success: true,
      count: rows.length,
      category: req.params.category,
      products: rows.map(mapProductRow)
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/products/slug/:slug
 * Public: Get product by URL slug
 */
router.get('/slug/:slug', (req, res, next) => {
  try {
    const p = db.prepare('SELECT * FROM products WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    if (!p) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    // Also fetch up to 4 related products from the SAME category!
    const related = db.prepare(`
      SELECT * FROM products
      WHERE category = ? AND id != ? AND active = 1
      LIMIT 4
    `).all(p.category, p.id);

    res.json({
      success: true,
      product: mapProductRow(p),
      relatedProducts: related.map(mapProductRow)
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/products/:id
 * Public: Get single product by ID
 */
router.get('/:id', (req, res, next) => {
  try {
    const p = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!p) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    // Related products from the SAME category
    const related = db.prepare(`
      SELECT * FROM products
      WHERE category = ? AND id != ? AND active = 1
      LIMIT 4
    `).all(p.category, p.id);

    res.json({
      success: true,
      product: mapProductRow(p),
      relatedProducts: related.map(mapProductRow)
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/products
 * Admin Only: Create new product
 */
router.post('/', authenticate, requireAdmin, (req, res, next) => {
  try {
    const {
      name,
      slug,
      category,
      subcategory,
      price,
      compareAtPrice,
      stock,
      images,
      description,
      shortDescription,
      ageRange,
      featured = false,
      bestSeller = false,
      newArrival = false,
      learningBenefits = [],
      isDigital = false
    } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({ success: false, error: 'Name, category, and price are required.' });
    }

    const id = 'prod_' + crypto.randomUUID().slice(0, 8);
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO products (
        id, name, slug, category, subcategory, price, compare_at_price, stock, images,
        description, short_description, age_range, featured, best_seller, new_arrival,
        learning_benefits, is_digital, active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      name.trim(),
      finalSlug,
      category.trim(),
      subcategory ? subcategory.trim() : null,
      parseInt(price, 10),
      compareAtPrice ? parseInt(compareAtPrice, 10) : null,
      stock !== undefined ? parseInt(stock, 10) : 50,
      JSON.stringify(images || []),
      description || '',
      shortDescription || '',
      ageRange || 'All Ages',
      featured ? 1 : 0,
      bestSeller ? 1 : 0,
      newArrival ? 1 : 0,
      JSON.stringify(learningBenefits || []),
      isDigital ? 1 : 0,
      1,
      now,
      now
    );

    res.status(201).json({
      success: true,
      product: { id, name, slug: finalSlug, category, price, stock }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/products/:id
 * Admin Only: Update product
 */
router.put('/:id', authenticate, requireAdmin, (req, res, next) => {
  try {
    const {
      name,
      slug,
      category,
      subcategory,
      price,
      compareAtPrice,
      stock,
      description,
      shortDescription,
      ageRange,
      featured,
      bestSeller,
      newArrival,
      active
    } = req.body;

    const now = new Date().toISOString();

    const result = db.prepare(`
      UPDATE products
      SET name = COALESCE(?, name),
          slug = COALESCE(?, slug),
          category = COALESCE(?, category),
          subcategory = COALESCE(?, subcategory),
          price = COALESCE(?, price),
          compare_at_price = COALESCE(?, compare_at_price),
          stock = COALESCE(?, stock),
          description = COALESCE(?, description),
          short_description = COALESCE(?, short_description),
          age_range = COALESCE(?, age_range),
          featured = COALESCE(?, featured),
          best_seller = COALESCE(?, best_seller),
          new_arrival = COALESCE(?, new_arrival),
          active = COALESCE(?, active),
          updated_at = ?
      WHERE id = ?
    `).run(
      name,
      slug,
      category,
      subcategory,
      price !== undefined ? parseInt(price, 10) : null,
      compareAtPrice !== undefined ? parseInt(compareAtPrice, 10) : null,
      stock !== undefined ? parseInt(stock, 10) : null,
      description,
      shortDescription,
      ageRange,
      featured !== undefined ? (featured ? 1 : 0) : null,
      bestSeller !== undefined ? (bestSeller ? 1 : 0) : null,
      newArrival !== undefined ? (newArrival ? 1 : 0) : null,
      active !== undefined ? (active ? 1 : 0) : null,
      now,
      req.params.id
    );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    res.json({ success: true, message: 'Product updated successfully.' });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/products/:id/stock
 * Admin Only: Quick stock adjustment
 */
router.patch('/:id/stock', authenticate, requireAdmin, (req, res, next) => {
  try {
    const { stock } = req.body;
    const qty = parseInt(stock, 10);
    if (isNaN(qty) || qty < 0) {
      return res.status(400).json({ success: false, error: 'Stock must be a non-negative integer.' });
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      UPDATE products
      SET stock = ?, updated_at = ?
      WHERE id = ?
    `).run(qty, now, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    res.json({ success: true, id: req.params.id, stock: qty });
  } catch (err) {
    next(err);
  }
});

export default router;
