import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy curated inspect images into permanent public/images/products/
const copyMap = [
  { from: '../public/images/temp_inspect/stat1.jpg', to: 'handwriting-phonics.jpg' },
  { from: '../public/images/temp_inspect/stat_opt1.jpg', to: 'math-grid-books.jpg' },
  { from: '../public/images/temp_inspect/stat_opt2.jpg', to: 'teacher-stamps.jpg' },
  { from: '../public/images/temp_inspect/gifts.jpg', to: 'young-reader-gift-set.jpg' },
  { from: '../public/images/temp_inspect/read3.jpg', to: 'daily-duas-cards.jpg' },
  { from: '../public/images/temp_inspect/toys.jpg', to: 'wooden-blocks-50pc.jpg' },
  { from: '../public/images/temp_inspect/toy1.jpg', to: 'numbers-counting-cards.jpg' },
  { from: '../public/images/temp_inspect/toy2.jpg', to: 'wooden-shape-set.jpg' },
  { from: '../public/images/temp_inspect/backpack.jpg', to: 'ergonomic-backpack.jpg' },
  { from: '../public/images/temp_inspect/bag1.jpg', to: 'safari-daypack.jpg' },
  { from: '../public/images/temp_inspect/lunch1.jpg', to: 'insulated-lunch-bag.jpg' },
  { from: '../public/images/temp_inspect/lunchbox.jpg', to: 'stainless-bento.jpg' }
];

for (const item of copyMap) {
  const src = path.join(__dirname, item.from);
  const dest = path.join(targetDir, item.to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${item.from} -> /images/products/${item.to}`);
  }
}

// Now update the specific products to achieve 100% unique image mapping!
const productsPath = path.join(__dirname, '../src/data/products.js');
let fileContent = fs.readFileSync(productsPath, 'utf8');

const singleFixes = {
  'hk-square-grid-math-books': ['/images/products/math-grid-books.jpg'],
  'hk-gk-02': ['/images/products/young-reader-gift-set.jpg'],
  'hk-handwriting-phonics-book': ['/images/products/handwriting-phonics.jpg'],
  'hk-fc-02': ['/images/products/daily-duas-cards.jpg'],
  'hk-wooden-building-blocks': ['/images/products/wooden-blocks-50pc.jpg'],
  'hk-fc-03': ['/images/products/numbers-counting-cards.jpg'],
  'hk-gk-04': ['https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800'],
  'hk-et-04': ['/images/products/wooden-shape-set.jpg'],
  'hk-teacher-praise-stamps': ['/images/products/teacher-stamps.jpg'],
  'hk-ergonomic-kids-backpack': ['/images/products/ergonomic-backpack.jpg'],
  'hk-safari-daypack': ['/images/products/safari-daypack.jpg'],
  'hk-insulated-lunch-bag': ['/images/products/insulated-lunch-bag.jpg'],
  'hk-stainless-bento-lunchbox': ['/images/products/stainless-bento.jpg']
};

for (const [id, newImages] of Object.entries(singleFixes)) {
  const idRegex = new RegExp(`(["']?id["']?\\s*:\\s*["']${id}["'][\\s\\S]*?["']?images["']?\\s*:\\s*\\[)([\\s\\S]*?)(\\])`, 'm');
  if (idRegex.test(fileContent)) {
    fileContent = fileContent.replace(idRegex, (match, prefix, oldImages, suffix) => {
      return `${prefix}\n      ${newImages.map(img => `"${img}"`).join(',\n      ')}\n    ${suffix}`;
    });
  }
}

fs.writeFileSync(productsPath, fileContent, 'utf8');
console.log('Single product image overrides applied successfully.');
