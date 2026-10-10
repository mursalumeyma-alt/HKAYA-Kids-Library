import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ENV } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data folder exists
const dbDir = path.dirname(ENV.DATABASE_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Open SQLite database with synchronous safe engine
export const db = new DatabaseSync(ENV.DATABASE_PATH);

// Configure WAL mode and foreign key constraints for production reliability
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  PRAGMA synchronous = NORMAL;
`);

// Safe column migrations for existing products table before applying indexes
try {
  const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='products'").get();
  if (tableExists) {
    const existingCols = db.prepare('PRAGMA table_info(products)').all().map(c => c.name);
    if (!existingCols.includes('slug')) {
      db.exec('ALTER TABLE products ADD COLUMN slug TEXT');
    }
    if (!existingCols.includes('subcategory')) {
      db.exec('ALTER TABLE products ADD COLUMN subcategory TEXT');
    }
    if (!existingCols.includes('compare_at_price')) {
      db.exec('ALTER TABLE products ADD COLUMN compare_at_price INTEGER');
    }
    if (!existingCols.includes('featured')) {
      db.exec('ALTER TABLE products ADD COLUMN featured INTEGER NOT NULL DEFAULT 0');
    }
    if (!existingCols.includes('best_seller')) {
      db.exec('ALTER TABLE products ADD COLUMN best_seller INTEGER NOT NULL DEFAULT 0');
    }
    if (!existingCols.includes('new_arrival')) {
      db.exec('ALTER TABLE products ADD COLUMN new_arrival INTEGER NOT NULL DEFAULT 0');
    }
    if (!existingCols.includes('learning_benefits')) {
      db.exec('ALTER TABLE products ADD COLUMN learning_benefits TEXT');
    }
    if (!existingCols.includes('age_min')) {
      db.exec('ALTER TABLE products ADD COLUMN age_min INTEGER');
    }
    if (!existingCols.includes('age_max')) {
      db.exec('ALTER TABLE products ADD COLUMN age_max INTEGER');
    }
    if (!existingCols.includes('age_group_id')) {
      db.exec('ALTER TABLE products ADD COLUMN age_group_id TEXT');
    }
  }
} catch (err) {
  console.warn('[Database] Column migration warning:', err.message);
}

// Execute schema
const schemaSql = fs.readFileSync(path.resolve(__dirname, 'schema.sql'), 'utf-8');
db.exec(schemaSql);

console.log(`[Database] SQLite connected successfully at: ${ENV.DATABASE_PATH}`);

export default db;
