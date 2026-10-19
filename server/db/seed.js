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

  // 3. Normalize legacy categories & map into the 6 canonical categories
  db.exec(`
    -- Books & Reading
    UPDATE products SET category = 'books-reading' 
    WHERE category IN ('islamic-books', 'quran-arabic-learning', 'childrens-story-books', 'activity-coloring-books', 'islamic', 'books')
       OR id IN ('hk-se-01', 'hk-se-02', 'hk-se-03', 'hk-re-01', 'hk-digital-arabic-activity-pack', 'hk-digital-ramadan-pack');

    -- Educational Toys
    UPDATE products SET category = 'educational-toys' 
    WHERE category IN ('learning-kits', 'puzzles-educational-games', 'flashcards-learning-cards', 'toys')
       OR id IN ('hk-re-02', 'hk-ramadan-kids-activity-kit');

    -- Gifts & Accessories
    UPDATE products SET category = 'gifts-accessories' 
    WHERE category IN ('gifts-for-kids', 'ramadan-eid', 'gifts', 'trophies')
       OR id IN ('hk-re-03', 'hk-re-04', 'hk-eid-gift-box', 'hk-creative-art-gift-box', 'hk-golden-student-trophy', 'hk-reading-champion-medals');

    -- School Bags
    UPDATE products SET category = 'school-bags', subcategory = 'Children''s backpacks' 
    WHERE id = 'hk-ergonomic-kids-backpack';

    -- Lunch Boxes & Bottles
    UPDATE products SET category = 'lunch-boxes-bottles', subcategory = 'Lunch boxes' 
    WHERE id = 'hk-stainless-bento-lunchbox';

    UPDATE products SET category = 'lunch-boxes-bottles', subcategory = 'Reusable water bottles' 
    WHERE id = 'hk-insulated-water-bottle';

    UPDATE products SET category = 'lunch-boxes-bottles', subcategory = 'Insulated lunch bags' 
    WHERE id = 'hk-insulated-lunch-bag';

    UPDATE products SET category = 'lunch-boxes-bottles', subcategory = 'Food containers' 
    WHERE id = 'hk-bamboo-kids-dining-set';

    -- Stationery (remaining school-learning-essentials)
    UPDATE products SET category = 'stationery' 
    WHERE category IN ('school-learning-essentials', 'stationery', 'exercise-books', 'teachers');

    -- Assign numeric age bounds to items where age_min IS NULL
    UPDATE products SET age_min = 3, age_max = 16 WHERE age_min IS NULL;
  `);

  const totalInDb = db.prepare('SELECT COUNT(*) as count FROM products WHERE active = 1').get().count;
  console.log(`[Seed] Verified ${totalInDb} products in database with structured age boundaries.`);
}
