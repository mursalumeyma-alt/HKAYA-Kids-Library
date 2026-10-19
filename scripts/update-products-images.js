import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUpdates = {
  // --- SCHOOL BAGS ---
  'hk-safari-daypack': ['/images/categories/sub-preschool-backpacks.jpg'],
  'hk-heavy-duty-bookbag': ['/images/categories/sub-book-bags.jpg'],
  'hk-zipper-pencil-pouch': ['/images/categories/sub-pencil-pouches.jpg'],
  'hk-ergonomic-kids-backpack': ['/images/categories/school-bags.jpg'],
  'hk-canvas-library-tote': ['/images/categories/sub-tote-bags.jpg'],
  'hk-waterproof-drawstring-bag': ['https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=800'],

  // --- LUNCH BOXES & BOTTLES ---
  'hk-straw-drinking-bottle': ['/images/categories/sub-water-bottles.jpg'],
  'hk-leakproof-snack-box': ['/images/categories/sub-food-containers.jpg'],
  'hk-insulated-lunch-bag': ['/images/categories/sub-lunch-bags.jpg'],
  'hk-stainless-bento-lunchbox': ['/images/categories/sub-lunch-boxes.jpg'],
  'hk-insulated-water-bottle': ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800'],
  'hk-bamboo-kids-dining-set': ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800'],

  // --- STATIONERY ---
  'hk-ergonomic-pencil-kit': ['/images/categories/sub-pens-pencils.jpg'],
  'hk-pastel-highlighters': ['https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=800'],
  'hk-non-dust-erasers-sharpeners': ['/images/categories/sub-erasers-sharpeners.jpg'],
  'hk-jumbo-colored-pencils': ['/images/categories/sub-crayons-pencils.jpg'],
  'hk-ruler-math-set': ['https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800'],
  'hk-hardtop-pencil-case': ['/images/categories/sub-pencil-cases.jpg'],
  'hk-a5-ruled-exercise-books': ['/images/categories/sub-notebooks.jpg'],
  'hk-square-grid-math-books': ['https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800'],
  'hk-handwriting-phonics-book': ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'],
  'hk-classroom-organizer-caddy': ['/images/categories/sub-art-craft.jpg'],
  'hk-teacher-praise-stamps': ['/images/categories/sub-stickers-bookmarks.jpg'],
  'hk-teacher-lesson-planner': ['/images/categories/sub-teacher-gifts.jpg'],
  'hk-se-04': ['/images/categories/stationery.jpg'],

  // --- GIFTS & ACCESSORIES ---
  'hk-re-03': ['/images/categories/sub-eid-gifts.jpg'],
  'hk-gk-01': ['/images/categories/sub-gift-sets.jpg'],
  'hk-gk-03': ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800'],
  'hk-gk-04': ['/images/categories/sub-ramadan-kits.jpg'],
  'hk-gk-02': ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'],
  'hk-golden-student-trophy': ['/images/categories/sub-reading-rewards.jpg'],
  'hk-reading-champion-medals': ['/images/categories/reading-accessories.jpg'],
  'hk-eid-gift-box': ['/images/categories/gifts-accessories.jpg'],
  'hk-creative-art-gift-box': ['/images/categories/sub-wrapping.jpg'],
  'hk-re-04': ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'],

  // --- EDUCATIONAL TOYS ---
  'hk-lk-01': ['/images/categories/sub-arabic-alphabet.jpg'],
  'hk-pg-01': ['/images/categories/sub-building-blocks.jpg'],
  'hk-pg-02': ['/images/categories/sub-puzzles.jpg'],
  'hk-fc-01': ['/images/categories/sub-flashcards.jpg'],
  'hk-et-01': ['https://images.unsplash.com/photo-1575364289437-fb1479d52732?auto=format&fit=crop&q=80&w=800'],
  'hk-lk-02': ['/images/categories/educational-toys.jpg'],
  'hk-lk-04': ['/images/categories/sub-stem-toys.jpg'],
  'hk-fc-02': ['/images/categories/sub-daily-duas.jpg'],
  'hk-et-02': ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800'],
  'hk-lk-03': ['/images/categories/sub-prayer-guides.jpg'],
  'hk-et-03': ['/images/categories/sub-alphabet-numbers.jpg'],
  'hk-ramadan-kids-activity-kit': ['/images/categories/sub-ramadan-kits.jpg'],
  'hk-montessori-counting': ['/images/categories/sub-montessori.jpg'],
  'hk-wooden-alphabet-puzzle': ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800'],
  'hk-wooden-building-blocks': ['/images/categories/sub-building-blocks.jpg'],
  'hk-wooden-kitchen-play': ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800'],
  'hk-pg-03': ['/images/categories/sub-memory-games.jpg'],
  'hk-pg-04': ['https://images.unsplash.com/photo-1515041219749-89347f83291a?auto=format&fit=crop&q=80&w=800'],
  'hk-fc-03': ['/images/categories/sub-flashcards.jpg'],
  'hk-fc-04': ['/images/categories/sub-islamic-manners.jpg'],
  'hk-et-04': ['/images/categories/sub-montessori.jpg'],
  'hk-re-02': ['/images/categories/sub-stickers-bookmarks.jpg'],

  // --- BOOKS & READING ---
  'hk-ib-01': ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'],
  'hk-ib-02': ['https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'],
  'hk-ib-04': ['https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800'],
  'hk-qa-01': ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'],
  'hk-sb-01': ['https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800'],
  'hk-sb-03': ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'],
  'hk-ac-01': ['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800'],
  'hk-ac-03': ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'],
  'hk-re-01': ['https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800'],
  'hk-se-01': ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'],
  'hk-se-03': ['/images/categories/sub-educational-books.jpg'],
  'hk-qa-02': ['/images/categories/sub-arabic-books.jpg'],
  'hk-qa-04': ['/images/categories/sub-quran-stories.jpg'],
  'hk-quran-kids': ['/images/categories/islamic-learning.jpg'],
  'hk-my-first-library': ['/images/categories/books-reading.jpg'],
  'hk-savanna-tales': ['https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800'],
  'hk-dua-adhkar-cards': ['/images/categories/sub-daily-duas.jpg'],
  'hk-digital-arabic-activity-pack': ['https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80'],
  'hk-digital-ramadan-pack': ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800'],
  'hk-ib-03': ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800'],
  'hk-qa-03': ['/images/categories/sub-reading-accessories.jpg'],
  'hk-sb-02': ['https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800'],
  'hk-sb-04': ['https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800'],
  'hk-ac-02': ['/images/categories/sub-colouring-books.jpg'],
  'hk-ac-04': ['https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'],
  'hk-se-02': ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800']
};

const productsPath = path.join(__dirname, '../src/data/products.js');
let fileContent = fs.readFileSync(productsPath, 'utf8');

let updatedCount = 0;
for (const [id, newImages] of Object.entries(imageUpdates)) {
  const idRegex = new RegExp(`(["']?id["']?\\s*:\\s*["']${id}["'][\\s\\S]*?["']?images["']?\\s*:\\s*\\[)([\\s\\S]*?)(\\])`, 'm');
  if (idRegex.test(fileContent)) {
    fileContent = fileContent.replace(idRegex, (match, prefix, oldImages, suffix) => {
      updatedCount++;
      return `${prefix}\n      ${newImages.map(img => `"${img}"`).join(',\n      ')}\n    ${suffix}`;
    });
  } else {
    console.warn(`Could not find product ${id}`);
  }
}

fs.writeFileSync(productsPath, fileContent, 'utf8');
console.log(`Successfully updated ${updatedCount} products with genuine real photographs.`);
