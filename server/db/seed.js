import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { db } from './database.js';
import { ENV } from '../config/env.js';
import { PRODUCTS } from '../../src/data/products.js';

export async function runDatabaseSeed() {
  const now = new Date().toISOString();

  // 1. Seed Admin User if not existing
  const checkAdmin = db.prepare("SELECT id, email FROM users WHERE role = 'admin' LIMIT 1").get();
  if (!checkAdmin) {
    const adminId = 'usr_' + crypto.randomUUID();
    const passwordHash = await bcrypt.hash(ENV.ADMIN_INITIAL_PASSWORD, 12);

    const insertUser = db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertUser.run(
      adminId,
      'HKAYA Administrator',
      ENV.ADMIN_INITIAL_EMAIL,
      '254700000000',
      passwordHash,
      'admin',
      now,
      now
    );

    console.log(`[Seed] Initial Admin account verified: ${ENV.ADMIN_INITIAL_EMAIL}`);
  }

  // 2. Cleanly upsert all 44 products across the 11 categories
  const upsertProduct = db.prepare(`
    INSERT OR REPLACE INTO products (
      id, name, slug, category, subcategory, price, compare_at_price, stock, images,
      description, short_description, age_range, age_min, age_max, age_group_id, featured, best_seller, new_arrival,
      learning_benefits, is_digital, active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of PRODUCTS) {
    upsertProduct.run(
      p.id,
      p.name,
      p.slug || p.id,
      p.category,
      p.subcategory || null,
      p.price,
      p.compareAtPrice || null,
      p.stock !== undefined ? p.stock : 40,
      JSON.stringify(p.images || []),
      p.description || p.shortDescription,
      p.shortDescription || p.description,
      p.ageRange || 'All Ages',
      p.ageMin !== undefined ? p.ageMin : null,
      p.ageMax !== undefined ? p.ageMax : null,
      p.ageGroupId || null,
      p.featured ? 1 : 0,
      p.bestSeller ? 1 : 0,
      p.newArrival ? 1 : 0,
      JSON.stringify(p.learningBenefits || []),
      p.isDigital ? 1 : 0,
      1,
      now,
      now
    );
  }

  // 3. Normalize legacy categories & set accurate age bounds for all database items
  db.exec(`
    UPDATE products SET category = 'islamic-books', subcategory = 'Islamic Reading' WHERE category = 'islamic';
    UPDATE products SET category = 'childrens-story-books', subcategory = 'Storybooks' WHERE category = 'books';
    UPDATE products SET category = 'educational-toys', subcategory = 'Montessori & Toys' WHERE category = 'toys';
    UPDATE products SET category = 'gifts-for-kids', subcategory = 'Awards & Trophies' WHERE category = 'trophies';
    UPDATE products SET category = 'gifts-for-kids', subcategory = 'Gift Sets' WHERE category = 'gifts';
    UPDATE products SET category = 'school-learning-essentials', subcategory = 'Backpacks & Bags' WHERE category = 'bags';
    UPDATE products SET category = 'school-learning-essentials', subcategory = 'Stationery & Pens' WHERE category = 'stationery';
    UPDATE products SET category = 'school-learning-essentials', subcategory = 'Exercise Books' WHERE category = 'exercise-books';
    UPDATE products SET category = 'school-learning-essentials', subcategory = 'Lunch & Dishes' WHERE category = 'dishes-lunch';
    UPDATE products SET category = 'school-learning-essentials', subcategory = 'Teachers Corner' WHERE category = 'teachers';
    UPDATE products SET category = 'activity-coloring-books', subcategory = 'Printable Activities' WHERE category = 'digital';

    -- Assign numeric age bounds to legacy items where age_min IS NULL
    UPDATE products SET age_min = 6, age_max = 15 WHERE age_min IS NULL AND subcategory = 'Backpacks & Bags';
    UPDATE products SET age_min = 1, age_max = 8 WHERE age_min IS NULL AND subcategory = 'Lunch & Dishes';
    UPDATE products SET age_min = 6, age_max = 18 WHERE age_min IS NULL AND subcategory = 'Stationery & Pens';
    UPDATE products SET age_min = 5, age_max = 16 WHERE age_min IS NULL AND subcategory = 'Exercise Books';
    UPDATE products SET age_min = 6, age_max = 16 WHERE age_min IS NULL AND subcategory = 'Awards & Trophies';
    UPDATE products SET age_min = 1, age_max = 6 WHERE age_min IS NULL AND subcategory = 'Montessori & Toys';
    UPDATE products SET age_min = 3, age_max = 9 WHERE age_min IS NULL AND category = 'childrens-story-books';
    UPDATE products SET age_min = 3, age_max = 12 WHERE age_min IS NULL AND category = 'islamic-books';
    UPDATE products SET age_min = 4, age_max = 12 WHERE age_min IS NULL AND category = 'gifts-for-kids';
    UPDATE products SET age_min = 3, age_max = 10 WHERE age_min IS NULL AND category = 'activity-coloring-books';
    UPDATE products SET age_min = 3, age_max = 10 WHERE age_min IS NULL AND category = 'quran-arabic-learning';
    UPDATE products SET age_min = 3, age_max = 8 WHERE age_min IS NULL AND category = 'puzzles-educational-games';
    UPDATE products SET age_min = 3, age_max = 8 WHERE age_min IS NULL AND category = 'flashcards-learning-cards';
    UPDATE products SET age_min = 4, age_max = 12 WHERE age_min IS NULL AND category = 'ramadan-eid';
  `);

  const totalInDb = db.prepare('SELECT COUNT(*) as count FROM products WHERE active = 1').get().count;
  console.log(`[Seed] Verified ${totalInDb} products in database with structured age boundaries.`);
}
