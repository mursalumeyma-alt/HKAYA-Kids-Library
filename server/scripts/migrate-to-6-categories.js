import { db } from '../db/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('--- Migrating products to 6 canonical categories ---');

  // 1. Ensure additional high-demand products exist for school-bags and lunch-boxes-bottles
  const extraProducts = [
    {
      id: "hk-safari-daypack",
      name: "Safari Friends Lightweight Junior School Backpack",
      slug: "safari-friends-junior-backpack",
      category: "school-bags",
      subcategory: "Children's backpacks",
      price: 2200,
      compareAtPrice: 2600,
      stock: 35,
      images: [
        "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Comfortable, lightweight everyday school bag featuring padded breathable shoulder straps, side water bottle sleeves, dual zippered compartments, and fun animal prints.",
      shortDescription: "Lightweight, water-resistant junior school backpack with ergonomic padding.",
      ageRange: "3–8 Years",
      ageMin: 3,
      ageMax: 8,
      ageGroupId: "3-5",
      featured: true,
      bestSeller: true,
      newArrival: false,
      learningBenefits: ["Supports healthy spinal posture with ergonomic weight distribution", "Encourages independent organization of school essentials"],
      isDigital: false
    },
    {
      id: "hk-heavy-duty-bookbag",
      name: "Reinforced Primary School Book Bag with Reflective Trim",
      slug: "reinforced-school-book-bag",
      category: "school-bags",
      subcategory: "Book bags",
      price: 1450,
      compareAtPrice: 1750,
      stock: 45,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Durable reinforced waterproof book bag designed to protect textbooks, exercise books, and homework folders from wear, rain, and corner damage.",
      shortDescription: "Durable waterproof book bag with carry handle and high-visibility safety trim.",
      ageRange: "5–12 Years",
      ageMin: 5,
      ageMax: 12,
      ageGroupId: "6-8",
      featured: false,
      bestSeller: true,
      newArrival: false,
      learningBenefits: ["Protects school books and homework from weather and bending", "Easy-carry grip suitable for young hands"],
      isDigital: false
    },
    {
      id: "hk-canvas-library-tote",
      name: "Little Reader Durable Canvas Storybook Tote Bag",
      slug: "little-reader-canvas-tote",
      category: "school-bags",
      subcategory: "Tote bags",
      price: 850,
      compareAtPrice: 1000,
      stock: 50,
      images: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Eco-friendly 100% natural cotton canvas tote featuring joyful reading illustrations and reinforced cross-stitched handles. Perfect for carrying library books and weekend classes.",
      shortDescription: "Heavyweight cotton canvas library bag for carrying storybooks and art supplies.",
      ageRange: "All Ages",
      ageMin: 3,
      ageMax: 16,
      ageGroupId: "6-8",
      featured: false,
      bestSeller: false,
      newArrival: true,
      learningBenefits: ["Encourages children to take pride in their reading library books", "Washable, reusable, and sustainable choice"],
      isDigital: false
    },
    {
      id: "hk-zipper-pencil-pouch",
      name: "Multi-Compartment Expandable Zipper Pencil Pouch",
      slug: "expandable-zipper-pencil-pouch",
      category: "school-bags",
      subcategory: "Pencil pouches",
      price: 650,
      compareAtPrice: 800,
      stock: 60,
      images: [
        "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Spacious multi-tiered zippered pouch with elastic pen loops, mesh ruler pocket, and expandable gusset. Fits up to 40 pens, pencils, erasers, and scissors neatly.",
      shortDescription: "Expandable multi-pocket zippered pencil pouch for school desks and backpacks.",
      ageRange: "5–16 Years",
      ageMin: 5,
      ageMax: 16,
      ageGroupId: "6-8",
      featured: false,
      bestSeller: true,
      newArrival: false,
      learningBenefits: ["Keeps writing utensils organized without cluttering backpacks", "Durable smooth-gliding dual zippers"],
      isDigital: false
    },
    {
      id: "hk-waterproof-drawstring-bag",
      name: "Waterproof Drawstring PE & Activity Bag",
      slug: "waterproof-drawstring-activity-bag",
      category: "school-bags",
      subcategory: "School bags",
      price: 750,
      compareAtPrice: 900,
      stock: 40,
      images: [
        "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Lightweight waterproof nylon drawstring bag with reinforced metal eyelets. Great for school PE kits, swimming lessons, extra shoes, or quick library trips.",
      shortDescription: "Water-resistant drawstring activity bag for sports kits, swimming, and books.",
      ageRange: "4–14 Years",
      ageMin: 4,
      ageMax: 14,
      ageGroupId: "6-8",
      featured: false,
      bestSeller: false,
      newArrival: true,
      learningBenefits: ["Easy drawstring closure designed for quick child access", "Dries rapidly and resists odors"],
      isDigital: false
    },
    {
      id: "hk-leakproof-snack-box",
      name: "Leak-Proof 3-Compartment Kids Snack & Fruit Box",
      slug: "leak-proof-kids-snack-box",
      category: "lunch-boxes-bottles",
      subcategory: "Food containers",
      price: 950,
      compareAtPrice: 1200,
      stock: 40,
      images: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Food-grade BPA-free partitioned snack box with silicone seal ring and kid-friendly latch. Keeps fruits, biscuits, and veggies separated and crisp until break time.",
      shortDescription: "Partitioned leak-proof snack container with silicone seals and easy latch.",
      ageRange: "2–10 Years",
      ageMin: 2,
      ageMax: 10,
      ageGroupId: "3-5",
      featured: false,
      bestSeller: true,
      newArrival: false,
      learningBenefits: ["Encourages healthy portion control and variety in school snacks", "Easy for small fingers to open and close independently"],
      isDigital: false
    },
    {
      id: "hk-straw-drinking-bottle",
      name: "Kids Tritan Easy-Sip Straw Drinking Bottle (500ml)",
      slug: "kids-tritan-straw-drinking-bottle",
      category: "lunch-boxes-bottles",
      subcategory: "Children's drinking bottles",
      price: 850,
      compareAtPrice: 1100,
      stock: 45,
      images: [
        "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Crystal-clear shatter-resistant Tritan drinking bottle with flip-top hygienic straw lid, silicone carry loop, and measurement scale in ml. 100% leak-proof when closed.",
      shortDescription: "Shatterproof Tritan water bottle with flip straw and carry loop.",
      ageRange: "3–12 Years",
      ageMin: 3,
      ageMax: 12,
      ageGroupId: "3-5",
      featured: true,
      bestSeller: false,
      newArrival: true,
      learningBenefits: ["Encourages consistent daily hydration during school hours", "Spill-resistant valve prevents classroom desk messes"],
      isDigital: false
    }
  ];

  const now = new Date().toISOString();
  const upsert = db.prepare(`
    INSERT OR REPLACE INTO products (
      id, name, slug, category, subcategory, price, compare_at_price, stock, images,
      description, short_description, age_range, age_min, age_max, age_group_id, featured, best_seller, new_arrival,
      learning_benefits, is_digital, active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of extraProducts) {
    upsert.run(
      p.id,
      p.name,
      p.slug,
      p.category,
      p.subcategory,
      p.price,
      p.compareAtPrice,
      p.stock,
      JSON.stringify(p.images),
      p.description,
      p.shortDescription,
      p.ageRange,
      p.ageMin,
      p.ageMax,
      p.ageGroupId,
      p.featured ? 1 : 0,
      p.bestSeller ? 1 : 0,
      p.newArrival ? 1 : 0,
      JSON.stringify(p.learningBenefits),
      p.isDigital ? 1 : 0,
      1,
      now,
      now
    );
  }

  // 2. Perform SQL updates to map existing items into the 6 canonical categories
  db.exec(`
    -- Books & Reading
    UPDATE products SET category = 'books-reading' 
    WHERE category IN ('islamic-books', 'quran-arabic-learning', 'childrens-story-books', 'activity-coloring-books')
       OR id IN ('hk-se-01', 'hk-se-02', 'hk-se-03', 'hk-re-01', 'hk-digital-arabic-activity-pack', 'hk-digital-ramadan-pack');

    -- Educational Toys
    UPDATE products SET category = 'educational-toys' 
    WHERE category IN ('learning-kits', 'puzzles-educational-games', 'flashcards-learning-cards')
       OR id IN ('hk-re-02', 'hk-ramadan-kids-activity-kit');

    -- Gifts & Accessories
    UPDATE products SET category = 'gifts-accessories' 
    WHERE category IN ('gifts-for-kids', 'ramadan-eid')
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
    WHERE category = 'school-learning-essentials';
  `);

  // 3. Print breakdown
  const stats = db.prepare('SELECT category, COUNT(*) as count FROM products WHERE active = 1 GROUP BY category').all();
  console.log('Updated Category Stats in SQLite:', stats);

  // 4. Export all rows into a complete, clean src/data/products.js
  const allProducts = db.prepare('SELECT * FROM products WHERE active = 1 ORDER BY category, featured DESC, best_seller DESC').all();
  
  const mappedProducts = allProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug || p.id,
    category: p.category,
    categoryLabel: 
      p.category === 'books-reading' ? 'Books & Reading' :
      p.category === 'stationery' ? 'Stationery' :
      p.category === 'school-bags' ? 'School Bags' :
      p.category === 'lunch-boxes-bottles' ? 'Lunch Boxes & Bottles' :
      p.category === 'educational-toys' ? 'Educational Toys' :
      p.category === 'gifts-accessories' ? 'Gifts & Accessories' : p.category,
    subcategory: p.subcategory || '',
    price: p.price,
    compareAtPrice: p.compare_at_price || null,
    stock: p.stock,
    images: JSON.parse(p.images || '[]'),
    description: p.description,
    shortDescription: p.short_description,
    ageRange: p.age_range,
    ageMin: p.age_min,
    ageMax: p.age_max,
    ageGroupId: p.age_group_id,
    featured: Boolean(p.featured),
    bestSeller: Boolean(p.best_seller),
    newArrival: Boolean(p.new_arrival),
    learningBenefits: JSON.parse(p.learning_benefits || '[]'),
    isDigital: Boolean(p.is_digital),
    active: 1
  }));

  const productsFileContent = `/**
 * Hikaya Kids Library - Product Catalog
 * 
 * Harmonized with SQLite database and organized into the 6 canonical categories:
 * 1. Books & Reading (books-reading)
 * 2. Stationery (stationery)
 * 3. School Bags (school-bags)
 * 4. Lunch Boxes & Bottles (lunch-boxes-bottles)
 * 5. Educational Toys (educational-toys)
 * 6. Gifts & Accessories (gifts-accessories)
 */

export const PRODUCTS = ${JSON.stringify(mappedProducts, null, 2)};

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === categorySlug);
}
`;

  fs.writeFileSync(path.resolve(__dirname, '../../src/data/products.js'), productsFileContent, 'utf8');
  console.log(`Successfully wrote ${mappedProducts.length} products to src/data/products.js`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
