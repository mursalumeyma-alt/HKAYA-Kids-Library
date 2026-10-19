import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const targetDir = path.join(projectRoot, 'public', 'images', 'categories');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

export const CATEGORY_IMAGE_DATA = {
  // Main Categories
  "books-reading": {
    file: "books-reading.jpg",
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    alt: "Children's storybooks and reading collections on wooden shelves"
  },
  "stationery": {
    file: "stationery.jpg",
    url: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=600",
    alt: "Organized children's stationery, exercise books, pencils and art materials"
  },
  "school-bags": {
    file: "school-bags.jpg",
    url: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=600",
    alt: "Ergonomic children's school backpacks and book bags"
  },
  "lunch-boxes-bottles": {
    file: "lunch-boxes-bottles.jpg",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    alt: "Children's bento lunch boxes, thermal bags, and reusable water bottles"
  },
  "educational-toys": {
    file: "educational-toys.jpg",
    url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
    alt: "Montessori wooden educational learning toys, puzzles and building blocks"
  },
  "gifts-accessories": {
    file: "gifts-accessories.jpg",
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
    alt: "Curated children's gift hampers, birthday gift boxes, and bookmarks"
  },
  "islamic-learning": {
    file: "islamic-learning.jpg",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    alt: "Authentic Islamic children's books, Quran stories and Arabic alphabet tools"
  },

  // Category 1 Subcategories: Books & Reading
  "sub-storybooks": {
    file: "sub-storybooks.jpg",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=500",
    alt: "Colourful illustrated children's storybooks"
  },
  "sub-islamic-books": {
    file: "sub-islamic-books.jpg",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500",
    alt: "Children's Islamic learning books and Prophet stories"
  },
  "sub-arabic-books": {
    file: "sub-arabic-books.jpg",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500",
    alt: "Arabic alphabet and Huruf Al-Hijaa learning books"
  },
  "sub-educational-books": {
    file: "sub-educational-books.jpg",
    url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=500",
    alt: "Children's educational workbooks and phonics practice books"
  },
  "sub-colouring-books": {
    file: "sub-colouring-books.jpg",
    url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=500",
    alt: "Child-friendly activity and colouring books"
  },
  "sub-reading-accessories": {
    file: "sub-reading-accessories.jpg",
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=500",
    alt: "Bookmarks, book sleeves, and reading journals"
  },

  // Category 2 Subcategories: Stationery & Art Supplies
  "sub-notebooks": {
    file: "sub-notebooks.jpg",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=500",
    alt: "Neatly arranged school notebooks and handwriting exercise books"
  },
  "sub-pens-pencils": {
    file: "sub-pens-pencils.jpg",
    url: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=500",
    alt: "Ergonomic writing pens, graphite pencils and coloured pens"
  },
  "sub-erasers-sharpeners": {
    file: "sub-erasers-sharpeners.jpg",
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500",
    alt: "Dust-free colourful erasers and pencil sharpeners"
  },
  "sub-pencil-cases": {
    file: "sub-pencil-cases.jpg",
    url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=500",
    alt: "Cute and practical zippered pencil pouches"
  },
  "sub-crayons-pencils": {
    file: "sub-crayons-pencils.jpg",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500",
    alt: "Vibrant non-toxic crayons and coloured pencils"
  },
  "sub-art-craft": {
    file: "sub-art-craft.jpg",
    url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=500",
    alt: "Child-friendly craft materials, child scissors and glue"
  },
  "sub-stickers-bookmarks": {
    file: "sub-stickers-bookmarks.jpg",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500",
    alt: "Decorative reward stickers and illustrated reading bookmarks"
  },

  // Category 3 Subcategories: School Bags
  "sub-preschool-backpacks": {
    file: "sub-preschool-backpacks.jpg",
    url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=500",
    alt: "Small lightweight preschool backpacks for young children"
  },
  "sub-primary-bags": {
    file: "sub-primary-bags.jpg",
    url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500",
    alt: "Durable primary school backpacks with padded shoulder straps"
  },
  "sub-pencil-pouches": {
    file: "sub-pencil-pouches.jpg",
    url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=500",
    alt: "Multi-compartment zippered pencil pouch for school supplies"
  },
  "sub-book-bags": {
    file: "sub-book-bags.jpg",
    url: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=500",
    alt: "Reinforced children's book bags with reflective safety trim"
  },
  "sub-tote-bags": {
    file: "sub-tote-bags.jpg",
    url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500",
    alt: "Reusable durable fabric library tote bags"
  },

  // Category 4 Subcategories: Lunch Boxes & Bottles
  "sub-lunch-boxes": {
    file: "sub-lunch-boxes.jpg",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=500",
    alt: "Divided stainless steel bento lunch boxes for kids"
  },
  "sub-food-containers": {
    file: "sub-food-containers.jpg",
    url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=500",
    alt: "Leakproof snack and food storage containers"
  },
  "sub-lunch-bags": {
    file: "sub-lunch-bags.jpg",
    url: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=500",
    alt: "Insulated thermal kids lunch bags"
  },
  "sub-water-bottles": {
    file: "sub-water-bottles.jpg",
    url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=500",
    alt: "BPA-free reusable children's water bottles with flip straw"
  },
  "sub-reusable-cups": {
    file: "sub-reusable-cups.jpg",
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=500",
    alt: "Children's reusable drinking cups and tumblers"
  },
  "sub-bottle-accessories": {
    file: "sub-bottle-accessories.jpg",
    url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    alt: "Bottle cleaning brushes, straw cleaners and silicone boot accessories"
  },

  // Category 5 Subcategories: Educational Toys
  "sub-alphabet-numbers": {
    file: "sub-alphabet-numbers.jpg",
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500",
    alt: "Alphabet and counting wooden board learning materials"
  },
  "sub-puzzles": {
    file: "sub-puzzles.jpg",
    url: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?auto=format&fit=crop&q=80&w=500",
    alt: "Age-appropriate educational jigsaw and wooden peg puzzles"
  },
  "sub-flashcards": {
    file: "sub-flashcards.jpg",
    url: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=500",
    alt: "Colourful double-sided learning flashcards for vocabulary"
  },
  "sub-building-blocks": {
    file: "sub-building-blocks.jpg",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=500",
    alt: "Children's natural wooden building blocks and shapes"
  },
  "sub-memory-games": {
    file: "sub-memory-games.jpg",
    url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=500",
    alt: "Interactive visual memory matching games for children"
  },
  "sub-stem-toys": {
    file: "sub-stem-toys.jpg",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500",
    alt: "STEM science, engineering and mechanics learning sets"
  },
  "sub-montessori": {
    file: "sub-montessori.jpg",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=500",
    alt: "Practical hands-on Montessori wooden sensory sorting toys"
  },

  // Category 6 Subcategories: Gifts & Accessories
  "sub-gift-sets": {
    file: "sub-gift-sets.jpg",
    url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=500",
    alt: "Curated children's book gift hamper and storybook bundle"
  },
  "sub-birthday-gifts": {
    file: "sub-birthday-gifts.jpg",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=500",
    alt: "Age-appropriate children's birthday gift boxes with festive ribbons"
  },
  "sub-eid-gifts": {
    file: "sub-eid-gifts.jpg",
    url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=500",
    alt: "Thoughtful Eid gift sets, prayer mats, and Islamic activity kits"
  },
  "sub-teacher-gifts": {
    file: "sub-teacher-gifts.jpg",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=500",
    alt: "Teacher appreciation gifts, appreciation notes, and stationery sets"
  },
  "sub-wrapping": {
    file: "sub-wrapping.jpg",
    url: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=500",
    alt: "Festive children's gift bags, patterned tissue, and gift wrapping ribbon"
  },
  "sub-reading-rewards": {
    file: "sub-reading-rewards.jpg",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500",
    alt: "Reading achievement reward sets, medals, stickers, and certificates"
  },
  "sub-greeting-cards": {
    file: "sub-greeting-cards.jpg",
    url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=500",
    alt: "Charming artistic greeting cards for birthdays, Eid, and celebrations"
  },

  // Category 7 Subcategories: Islamic & Arabic Learning
  "sub-arabic-alphabet": {
    file: "sub-arabic-alphabet.jpg",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500",
    alt: "Arabic alphabet wooden learning boards and letter blocks"
  },
  "sub-quran-stories": {
    file: "sub-quran-stories.jpg",
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=500",
    alt: "Illustrated Quran stories and Tafsir for children"
  },
  "sub-daily-duas": {
    file: "sub-daily-duas.jpg",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500",
    alt: "Daily Duas and Hadith memory cards with Arabic and English"
  },
  "sub-islamic-manners": {
    file: "sub-islamic-manners.jpg",
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=500",
    alt: "Islamic character, manners, and Akhlaq storybooks for kids"
  },
  "sub-ramadan-kits": {
    file: "sub-ramadan-kits.jpg",
    url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=500",
    alt: "Ramadan deed calendar, tracker, and Eid learning activity kits"
  },
  "sub-prayer-guides": {
    file: "sub-prayer-guides.jpg",
    url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=500",
    alt: "Step-by-step visual Salah prayer and Wudu practice guides"
  }
};

async function downloadImages() {
  console.log(`Starting image download to: ${targetDir}`);
  const keys = Object.keys(CATEGORY_IMAGE_DATA);
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const key of keys) {
    const item = CATEGORY_IMAGE_DATA[key];
    const filePath = path.join(targetDir, item.file);

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`[EXISTS] ${item.file} (${fs.statSync(filePath).size} bytes)`);
      skipped++;
      continue;
    }

    try {
      console.log(`[FETCHING] ${key} -> ${item.file}`);
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);
      console.log(`[SAVED] ${item.file} (${buffer.length} bytes)`);
      downloaded++;
    } catch (err) {
      console.error(`[FAILED] ${key}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDownload summary: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed.`);
}

downloadImages().catch(console.error);
