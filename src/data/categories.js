/**
 * Hikaya Kids Library - Shopping Categories & Subcategories
 * Inspired by Peekaboo Kenya's clean department organization.
 * 
 * CRITICAL REQUIREMENT: Every category and subcategory has its own unique, relevant image.
 * Distinctive Hikaya Identity: Children's bookstore, educational supplies & gifts.
 */

export const getSubName = (sub) => (typeof sub === 'string' ? sub : sub?.name || '');
export const getSubImage = (sub) => (typeof sub === 'string' ? '' : sub?.image || '');
export const getSubAlt = (sub) => (typeof sub === 'string' ? sub : sub?.alt || sub?.name || '');
export const getSubSlug = (sub) => (typeof sub === 'string' ? sub.toLowerCase().replace(/[^a-z0-9]+/g, '-') : sub?.slug || '');
export const getSubDesc = (sub) => (typeof sub === 'string' ? '' : sub?.description || '');

export const CATEGORIES = [
  {
    id: "books-reading",
    name: "Books & Reading",
    slug: "books-reading",
    arabic: "الكتب والقراءة",
    icon: "BookOpen",
    emoji: "📚",
    tagline: "Storybooks, Islamic Literature & Early Readers",
    description: "Engaging children's storybooks, Islamic literature, Arabic learning books, educational books, activity and colouring books, and reading accessories.",
    image: "/images/categories/books-reading.jpg",
    bgColor: "bg-orange-50",
    accentColor: "text-terracotta-700",
    subcategories: [
      {
        name: "Children's Storybooks",
        slug: "childrens-storybooks",
        description: "Colourful illustrated children's storybooks full of adventure and imagination",
        image: "/images/categories/sub-storybooks.jpg",
        alt: "Colourful illustrated children's storybooks"
      },
      {
        name: "Islamic Children's Books",
        slug: "islamic-childrens-books",
        description: "Children's Islamic learning books, Prophet stories and daily duas",
        image: "/images/categories/sub-islamic-books.jpg",
        alt: "Children's Islamic learning books and Prophet stories"
      },
      {
        name: "Arabic Learning Books",
        slug: "arabic-learning-books",
        description: "Arabic alphabet and Huruf Al-Hijaa foundational reading books",
        image: "/images/categories/sub-arabic-books.jpg",
        alt: "Arabic alphabet and Huruf Al-Hijaa learning books"
      },
      {
        name: "Educational Books",
        slug: "educational-books",
        description: "Children's educational books, phonics and primary workbooks",
        image: "/images/categories/sub-educational-books.jpg",
        alt: "Children's educational workbooks and phonics practice books"
      },
      {
        name: "Activity & Colouring Books",
        slug: "activity-colouring-books",
        description: "Colouring, mazes, and creative activity books for growing minds",
        image: "/images/categories/sub-colouring-books.jpg",
        alt: "Child-friendly activity and colouring books"
      },
      {
        name: "Reading Accessories",
        slug: "reading-accessories",
        description: "Bookmarks, book sleeves, reading pointers, and book journals",
        image: "/images/categories/sub-reading-accessories.jpg",
        alt: "Bookmarks, book sleeves, and reading journals"
      }
    ]
  },
  {
    id: "stationery",
    name: "Stationery & Art Supplies",
    slug: "stationery-art-supplies",
    arabic: "الأدوات المدرسية ومستلزمات الرسم",
    icon: "Palette",
    emoji: "✏️",
    tagline: "Exercise Books, Pencils, Cases & Creative Art",
    description: "High quality school exercise books, ergonomic writing pencils, non-dust erasers, structured pencil cases, wax crayons, and craft materials.",
    image: "/images/categories/stationery.jpg",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-800",
    subcategories: [
      {
        name: "Notebooks & Exercise Books",
        slug: "notebooks-exercise-books",
        description: "Neatly arranged school exercise books, ruled notebooks and journals",
        image: "/images/categories/sub-notebooks.jpg",
        alt: "Neatly arranged school notebooks and handwriting exercise books"
      },
      {
        name: "Pens & Pencils",
        slug: "pens-pencils",
        description: "Ergonomic triangular pencils, smooth gel pens and handwriting aids",
        image: "/images/categories/sub-pens-pencils.jpg",
        alt: "Ergonomic writing pens, graphite pencils and coloured pens"
      },
      {
        name: "Erasers & Sharpeners",
        slug: "erasers-sharpeners",
        description: "Dust-free colourful erasers, safety blade sharpeners and novelty shapes",
        image: "/images/categories/sub-erasers-sharpeners.jpg",
        alt: "Dust-free colourful erasers and pencil sharpeners"
      },
      {
        name: "Pencil Cases",
        slug: "pencil-cases",
        description: "Cute and practical zippered pencil pouches and hardtop pencil boxes",
        image: "/images/categories/sub-pencil-cases.jpg",
        alt: "Cute and practical zippered pencil pouches"
      },
      {
        name: "Crayons & Coloured Pencils",
        slug: "crayons-coloured-pencils",
        description: "Vibrant washable wax crayons and soft core coloured pencils",
        image: "/images/categories/sub-crayons-pencils.jpg",
        alt: "Vibrant non-toxic crayons and coloured pencils"
      },
      {
        name: "Art & Craft Supplies",
        slug: "art-craft-supplies",
        description: "Child-friendly craft materials, safety scissors, glue sticks and paints",
        image: "/images/categories/sub-art-craft.jpg",
        alt: "Child-friendly craft materials, child scissors and glue"
      },
      {
        name: "Stickers & Bookmarks",
        slug: "stickers-bookmarks",
        description: "Decorative praise stickers, planner markers and reading bookmarks",
        image: "/images/categories/sub-stickers-bookmarks.jpg",
        alt: "Decorative reward stickers and illustrated reading bookmarks"
      }
    ]
  },
  {
    id: "school-bags",
    name: "School Bags",
    slug: "school-bags",
    arabic: "الحقائب المدرسية",
    icon: "Backpack",
    emoji: "🎒",
    tagline: "Backpacks, Book Bags & Pencil Pouches",
    description: "Ergonomic, water-resistant primary backpacks, preschool bags, zippered pencil pouches, reinforced book bags, and library canvas totes.",
    image: "/images/categories/school-bags.jpg",
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-800",
    subcategories: [
      {
        name: "Preschool Backpacks",
        slug: "preschool-backpacks",
        description: "Small lightweight preschool backpacks designed for young shoulders",
        image: "/images/categories/sub-preschool-backpacks.jpg",
        alt: "Small lightweight preschool backpacks for young children"
      },
      {
        name: "Primary School Bags",
        slug: "primary-school-bags",
        description: "Durable primary school backpacks with padded ergonomic support",
        image: "/images/categories/sub-primary-bags.jpg",
        alt: "Durable primary school backpacks with padded shoulder straps"
      },
      {
        name: "Pencil Pouches",
        slug: "pencil-pouches",
        description: "Multi-compartment practical pencil cases and expandable organizers",
        image: "/images/categories/sub-pencil-pouches.jpg",
        alt: "Multi-compartment zippered pencil pouch for school supplies"
      },
      {
        name: "Book Bags",
        slug: "book-bags",
        description: "Reinforced children's book bags with reflective safety accents",
        image: "/images/categories/sub-book-bags.jpg",
        alt: "Reinforced children's book bags with reflective safety trim"
      },
      {
        name: "Tote Bags",
        slug: "tote-bags",
        description: "Reusable durable fabric library tote bags for books and activities",
        image: "/images/categories/sub-tote-bags.jpg",
        alt: "Reusable durable fabric library tote bags"
      }
    ]
  },
  {
    id: "lunch-boxes-bottles",
    name: "Lunch Boxes & Bottles",
    slug: "lunch-boxes-bottles",
    arabic: "علب الطعام وزجاجات الماء",
    icon: "Utensils",
    emoji: "🍱",
    tagline: "Bento Boxes, Thermal Bags & Water Bottles",
    description: "BPA-free stainless steel bento boxes, leakproof food containers, insulated lunch bags, reusable drinking bottles, and kid-safe tableware.",
    image: "/images/categories/lunch-boxes-bottles.jpg",
    bgColor: "bg-amber-50",
    accentColor: "text-amber-800",
    subcategories: [
      {
        name: "Lunch Boxes",
        slug: "lunch-boxes",
        description: "Divided stainless steel bento boxes with leakproof silicone seals",
        image: "/images/categories/sub-lunch-boxes.jpg",
        alt: "Divided stainless steel bento lunch boxes for kids"
      },
      {
        name: "Food Containers",
        slug: "food-containers",
        description: "Airtight snack cups and reusable food storage containers",
        image: "/images/categories/sub-food-containers.jpg",
        alt: "Leakproof snack and food storage containers"
      },
      {
        name: "Lunch Bags",
        slug: "lunch-bags",
        description: "Insulated thermal lunch bags with easy-clean wipeable lining",
        image: "/images/categories/sub-lunch-bags.jpg",
        alt: "Insulated thermal kids lunch bags"
      },
      {
        name: "Water Bottles",
        slug: "water-bottles",
        description: "Reusable children's drinking bottles with spill-proof flip straws",
        image: "/images/categories/sub-water-bottles.jpg",
        alt: "BPA-free reusable children's water bottles with flip straw"
      },
      {
        name: "Reusable Cups",
        slug: "reusable-cups",
        description: "Eco-friendly children's drinking cups, silicone tumblers and mugs",
        image: "/images/categories/sub-reusable-cups.jpg",
        alt: "Children's reusable drinking cups and tumblers"
      },
      {
        name: "Bottle Accessories",
        slug: "bottle-accessories",
        description: "Bottle cleaning brushes, straw cleaners, handles and silicone boots",
        image: "/images/categories/sub-bottle-accessories.jpg",
        alt: "Bottle cleaning brushes, straw cleaners and silicone boot accessories"
      }
    ]
  },
  {
    id: "educational-toys",
    name: "Educational Toys",
    slug: "educational-toys",
    arabic: "ألعاب تعليمية هادفة",
    icon: "Puzzle",
    emoji: "🧩",
    tagline: "Puzzles, Wooden Blocks, STEM & Montessori",
    description: "Alphabet & number learning toys, wooden puzzles, bilingual flashcards, building blocks, memory games, STEM sets, and Montessori materials.",
    image: "/images/categories/educational-toys.jpg",
    bgColor: "bg-teal-50",
    accentColor: "text-teal-800",
    subcategories: [
      {
        name: "Alphabet & Number Toys",
        slug: "alphabet-number-toys",
        description: "Wooden alphabet boards, abacus counting frames and numeral blocks",
        image: "/images/categories/sub-alphabet-numbers.jpg",
        alt: "Alphabet and counting wooden board learning materials"
      },
      {
        name: "Puzzles",
        slug: "puzzles",
        description: "Age-appropriate educational jigsaw puzzles and wooden peg boards",
        image: "/images/categories/sub-puzzles.jpg",
        alt: "Age-appropriate educational jigsaw and wooden peg puzzles"
      },
      {
        name: "Flashcards",
        slug: "flashcards",
        description: "Colourful double-sided learning flashcards for words and numbers",
        image: "/images/categories/sub-flashcards.jpg",
        alt: "Colourful double-sided learning flashcards for vocabulary"
      },
      {
        name: "Building Blocks",
        slug: "building-blocks",
        description: "Natural hardwood blocks and architectural geometric shape sets",
        image: "/images/categories/sub-building-blocks.jpg",
        alt: "Children's natural wooden building blocks and shapes"
      },
      {
        name: "Memory Games",
        slug: "memory-games",
        description: "Matching picture card games that develop focus and visual recall",
        image: "/images/categories/sub-memory-games.jpg",
        alt: "Interactive visual memory matching games for children"
      },
      {
        name: "STEM Learning Toys",
        slug: "stem-learning-toys",
        description: "Hands-on science, technology, engineering and math exploration kits",
        image: "/images/categories/sub-stem-toys.jpg",
        alt: "STEM science, engineering and mechanics learning sets"
      },
      {
        name: "Montessori-Inspired Learning Materials",
        slug: "montessori-learning-materials",
        description: "Self-correcting wooden sensory sorters and fine-motor activity toys",
        image: "/images/categories/sub-montessori.jpg",
        alt: "Practical hands-on Montessori wooden sensory sorting toys"
      }
    ]
  },
  {
    id: "gifts-accessories",
    name: "Gifts & Accessories",
    slug: "gifts-accessories",
    arabic: "هدايا وباقات مميزة",
    icon: "Gift",
    emoji: "🎁",
    tagline: "Hampers, Birthday Gifts, Eid Boxes & Awards",
    description: "Curated children's gift sets, birthday bundles, Eid hampers, teacher appreciation gifts, gift bags, reading reward sets, and celebration cards.",
    image: "/images/categories/gifts-accessories.jpg",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-800",
    subcategories: [
      {
        name: "Children's Gift Sets",
        slug: "childrens-gift-sets",
        description: "Beautifully curated gift hampers with storybooks and treasures",
        image: "/images/categories/sub-gift-sets.jpg",
        alt: "Curated children's book gift hamper and storybook bundle"
      },
      {
        name: "Birthday Gifts",
        slug: "birthday-gifts",
        description: "Age-appropriate celebratory birthday presents with gift wrap",
        image: "/images/categories/sub-birthday-gifts.jpg",
        alt: "Age-appropriate children's birthday gift boxes with festive ribbons"
      },
      {
        name: "Eid Gifts",
        slug: "eid-gifts",
        description: "Thoughtful Eid hampers, prayer kits, dates and Islamic rewards",
        image: "/images/categories/sub-eid-gifts.jpg",
        alt: "Thoughtful Eid gift sets, prayer mats, and Islamic activity kits"
      },
      {
        name: "Teacher Gifts",
        slug: "teacher-gifts",
        description: "Teacher appreciation sets, thank you stationery and desk planners",
        image: "/images/categories/sub-teacher-gifts.jpg",
        alt: "Teacher appreciation gifts, appreciation notes, and stationery sets"
      },
      {
        name: "Gift Bags & Wrapping",
        slug: "gift-bags-wrapping",
        description: "Festive children's gift bags, craft wrapping paper and satin ribbons",
        image: "/images/categories/sub-wrapping.jpg",
        alt: "Festive children's gift bags, patterned tissue, and gift wrapping ribbon"
      },
      {
        name: "Reading Reward Sets",
        slug: "reading-reward-sets",
        description: "Reading achievement medals, star certificates and reward stickers",
        image: "/images/categories/sub-reading-rewards.jpg",
        alt: "Reading achievement reward sets, medals, stickers, and certificates"
      },
      {
        name: "Greeting Cards",
        slug: "greeting-cards",
        description: "Attractive illustrated greeting cards for birthdays, Eid and milestones",
        image: "/images/categories/sub-greeting-cards.jpg",
        alt: "Charming artistic greeting cards for birthdays, Eid, and celebrations"
      }
    ]
  },
  {
    id: "islamic-learning",
    name: "Islamic & Arabic Learning",
    slug: "islamic-learning",
    arabic: "التعليم الإسلامي واللغة العربية",
    icon: "Compass",
    emoji: "🌙",
    tagline: "Quran Stories, Arabic Alphabets & Islamic Values",
    description: "Authentic Islamic children's storybooks, Arabic alphabet learning blocks, daily Dua flashcards, Seerah guides, and Ramadan deed kits.",
    image: "/images/categories/islamic-learning.jpg",
    bgColor: "bg-emerald-50",
    accentColor: "text-forest-800",
    subcategories: [
      {
        name: "Arabic Alphabet & First Words",
        slug: "arabic-alphabet-first-words",
        description: "Arabic alphabet wooden learning boards and tactile letter blocks",
        image: "/images/categories/sub-arabic-alphabet.jpg",
        alt: "Arabic alphabet wooden learning boards and letter blocks"
      },
      {
        name: "Quran Stories & Tafsir for Kids",
        slug: "quran-stories-tafsir",
        description: "Illustrated Quran stories and Tafsir written gently for young hearts",
        image: "/images/categories/sub-quran-stories.jpg",
        alt: "Illustrated Quran stories and Tafsir for children"
      },
      {
        name: "Daily Duas & Hadith Cards",
        slug: "daily-duas-hadith-cards",
        description: "Daily supplication memory cards with Arabic text and English meanings",
        image: "/images/categories/sub-daily-duas.jpg",
        alt: "Daily Duas and Hadith memory cards with Arabic and English"
      },
      {
        name: "Islamic Manners & Character Books",
        slug: "islamic-manners-character",
        description: "Inspiring character, kindness, gratitude and Akhlaq storybooks",
        image: "/images/categories/sub-islamic-manners.jpg",
        alt: "Islamic character, manners, and Akhlaq storybooks for kids"
      },
      {
        name: "Ramadan & Eid Learning Kits",
        slug: "ramadan-eid-learning-kits",
        description: "Ramadan deed calendar trackers and festive Eid family activity kits",
        image: "/images/categories/sub-ramadan-kits.jpg",
        alt: "Ramadan deed calendar, tracker, and Eid learning activity kits"
      },
      {
        name: "Prayer & Wudu Practice Guides",
        slug: "prayer-wudu-guides",
        description: "Step-by-step visual guides and flashcards for Salah and Wudu",
        image: "/images/categories/sub-prayer-guides.jpg",
        alt: "Step-by-step visual Salah prayer and Wudu practice guides"
      }
    ]
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    slug: "smart-watch",
    arabic: "ساعات ذكية وإكسسواراتها",
    icon: "Watch",
    emoji: "⌚",
    tagline: "Kids' Smart Watches, Fitness Bands, Straps & Accessories",
    description: "Explore our complete smart watch collection: child-friendly 4G GPS and calling watches, educational learning watches, adult smart watches, fitness bands, and authentic accessories including straps, screen protectors, chargers, and protective cases.",
    image: "/images/categories/smart-watch.jpg",
    bgColor: "bg-cyan-50",
    accentColor: "text-cyan-800",
    subcategories: [
      {
        name: "Kids' Smart Watches",
        slug: "kids-smart-watches",
        description: "Colorful, durable smart watches designed especially for children with safety and entertainment features",
        image: "/images/categories/sub-kids-smart-watches.jpg",
        alt: "Colorful kids smart watches designed for children"
      },
      {
        name: "Educational Smart Watches for Children",
        slug: "educational-smart-watches",
        description: "Interactive smart watches packed with educational learning games, math puzzles, time management and daily habits",
        image: "/images/categories/sub-educational-smart-watches.jpg",
        alt: "Educational smart watches for children with learning games"
      },
      {
        name: "Smart Watches with Calling and SIM Support",
        slug: "smart-watches-calling-sim",
        description: "Cellular 4G smart watches with SIM card slots for clear two-way HD voice and video calling across Kenya",
        image: "/images/categories/sub-smart-watches-calling-sim.jpg",
        alt: "Smart watches with calling and SIM card support"
      },
      {
        name: "Smart Watches with GPS Tracking",
        slug: "smart-watches-gps-tracking",
        description: "Real-time location-tracking smart watches with GPS geofencing, route history, and instant SOS alerts",
        image: "/images/categories/sub-smart-watches-gps.jpg",
        alt: "Smart watches with real-time GPS location tracking"
      },
      {
        name: "Adult Smart Watches",
        slug: "adult-smart-watches",
        description: "Stylish, modern smart watches for everyday productivity, health monitoring, calls, and notifications",
        image: "/images/categories/sub-adult-smart-watches.jpg",
        alt: "Stylish adult smart watches for everyday use"
      },
      {
        name: "Fitness Bands",
        slug: "fitness-bands",
        description: "Slim, lightweight fitness wristbands for tracking daily steps, workouts, heart rate, and sleep quality",
        image: "/images/categories/sub-fitness-bands.jpg",
        alt: "Fitness bands and activity tracker wristbands"
      },
      {
        name: "Smart Watch Replacement Straps",
        slug: "smart-watch-replacement-straps",
        description: "Comfortable silicone, sport nylon, and Milanese metal replacement bands in various colors and sizes",
        image: "/images/categories/sub-replacement-straps.jpg",
        alt: "Smart watch replacement straps in various colors and materials"
      },
      {
        name: "Smart Watch Screen Protectors",
        slug: "smart-watch-screen-protectors",
        description: "Ultra-clear tempered glass and flexible scratch-resistant protective films for smart watch screens",
        image: "/images/categories/sub-screen-protectors.jpg",
        alt: "Smart watch tempered glass and protective screen protectors"
      },
      {
        name: "Smart Watch Charging Cables and Chargers",
        slug: "smart-watch-charging-cables-chargers",
        description: "Compatible magnetic 2-pin/4-pin USB charging cables, fast-charging cords, and magnetic charging stands",
        image: "/images/categories/sub-charging-cables.jpg",
        alt: "Smart watch USB magnetic charging cables and chargers"
      },
      {
        name: "Smart Watch Protective Cases",
        slug: "smart-watch-protective-cases",
        description: "All-around shockproof silicone bumpers and rugged protective covers in various colors and finishes",
        image: "/images/categories/sub-protective-cases.jpg",
        alt: "Smart watch protective bumper cases and covers"
      }
    ]
  }
];

// Mapping for backward-compatibility with category slugs
export const CATEGORY_ALIASES = {
  'books': 'books-reading',
  'books-reading': 'books-reading',
  'stationery': 'stationery',
  'stationery-art-supplies': 'stationery',
  'school-bags': 'school-bags',
  'lunch-boxes-bottles': 'lunch-boxes-bottles',
  'lunch-boxes': 'lunch-boxes-bottles',
  'educational-toys': 'educational-toys',
  'toys': 'educational-toys',
  'gifts-accessories': 'gifts-accessories',
  'gifts': 'gifts-accessories',
  'islamic-learning': 'islamic-learning',
  'smart-watch': 'smart-watch',
  'smart-watches': 'smart-watch',
  'smartwatch': 'smart-watch',
  'smartwatches': 'smart-watch',
  'watches': 'smart-watch',
  'watch': 'smart-watch'
};

export const AGE_GROUPS = [
  {
    id: "0-2",
    label: "0–2 Years",
    title: "Babies & Toddlers",
    emoji: "👶",
    minAge: 0,
    maxAge: 2,
    cta: "Explore Ages 0–2 →",
    description: "High-contrast board books, sensory toys, baby dishes & gentle first words",
    color: "from-amber-50 to-orange-100 text-amber-900 border-amber-200"
  },
  {
    id: "3-5",
    label: "3–5 Years",
    title: "Preschool Minds",
    emoji: "🧒",
    minAge: 3,
    maxAge: 5,
    cta: "Explore Ages 3–5 →",
    description: "Alphabet blocks, storybooks, first duas, backpacks & coloring fun",
    color: "from-emerald-50 to-teal-100 text-emerald-900 border-emerald-200"
  },
  {
    id: "6-8",
    label: "6–8 Years",
    title: "Early Readers & School Prep",
    emoji: "🎒",
    minAge: 6,
    maxAge: 8,
    cta: "Explore Ages 6–8 →",
    description: "School supplies, chapter books, wooden puzzles, games & STEM kits",
    color: "from-sky-50 to-blue-100 text-sky-900 border-sky-200"
  },
  {
    id: "9-12",
    label: "9–12 Years",
    title: "Independent Learners",
    emoji: "📚",
    minAge: 9,
    maxAge: 12,
    cta: "Explore Ages 9–12 →",
    description: "Prophet biographies, complex puzzles, geometry sets & adventure stories",
    color: "from-purple-50 to-indigo-100 text-purple-900 border-purple-200"
  },
  {
    id: "13+",
    label: "13+ Years",
    title: "Teens & Young Scholars",
    emoji: "🌟",
    minAge: 13,
    maxAge: 99,
    cta: "Explore Ages 13+ →",
    description: "Seerah classics, secondary stationery, art sets & thoughtful gifts",
    color: "from-rose-50 to-orange-100 text-rose-900 border-rose-200"
  }
];

export function getCategoryById(id) {
  if (!id) return null;
  const canonicalId = CATEGORY_ALIASES[id] || id;
  return CATEGORIES.find(c => c.id === canonicalId || c.slug === canonicalId || c.id === id) || null;
}

export function getAgeGroupById(id) {
  if (!id) return null;
  if (id === '0-3') return AGE_GROUPS.find(a => a.id === '0-2');
  if (id === '5-7') return AGE_GROUPS.find(a => a.id === '6-8');
  if (id === '7-10' || id === '10-12') return AGE_GROUPS.find(a => a.id === '9-12');
  return AGE_GROUPS.find(a => a.id === id) || null;
}

/**
 * Filter products for a category, supporting both direct category assignment
 * and the specialized Islamic & Arabic Learning cross-cutting department.
 */
export function getProductsForCategory(products, categoryId) {
  if (!categoryId) return products || [];
  const targetId = CATEGORY_ALIASES[categoryId] || categoryId;

  return (products || []).filter(p => {
    if (targetId === 'islamic-learning') {
      const isDirect = p.category === 'islamic-learning';
      const isIslamicBook = p.category === 'books-reading' && (
        p.name.toLowerCase().includes('dua') ||
        p.name.toLowerCase().includes('prophet') ||
        p.name.toLowerCase().includes('seerah') ||
        p.name.toLowerCase().includes('qur') ||
        p.name.toLowerCase().includes('arabic') ||
        p.name.toLowerCase().includes('allah') ||
        p.name.toLowerCase().includes('ramadan') ||
        p.name.toLowerCase().includes('tajweed') ||
        p.name.toLowerCase().includes('islamic') ||
        (p.arabicTitle && p.arabicTitle.length > 0)
      );
      const isIslamicToy = p.category === 'educational-toys' && (
        p.name.toLowerCase().includes('arabic') ||
        p.name.toLowerCase().includes('masjid') ||
        p.name.toLowerCase().includes('prophet') ||
        p.name.toLowerCase().includes('dua') ||
        p.name.toLowerCase().includes('ramadan') ||
        p.name.toLowerCase().includes('qur') ||
        p.name.toLowerCase().includes('muslim')
      );
      const isIslamicGift = p.category === 'gifts-accessories' && (
        p.name.toLowerCase().includes('eid') ||
        p.name.toLowerCase().includes('ramadan') ||
        p.name.toLowerCase().includes('muslim')
      );
      const isIslamicWatch = p.category === 'smart-watch' && (
        p.name.toLowerCase().includes('islamic') ||
        p.name.toLowerCase().includes('prayer') ||
        p.name.toLowerCase().includes('azkar') ||
        p.name.toLowerCase().includes('quran') ||
        p.name.toLowerCase().includes('believer')
      );
      return isDirect || isIslamicBook || isIslamicToy || isIslamicGift || isIslamicWatch;
    }

    const itemCat = CATEGORY_ALIASES[p.category] || p.category;
    return itemCat === targetId || p.category === categoryId;
  });
}

/**
 * Intelligent subcategory matching for Peekaboo-inspired departments.
 * Accepts either a string subcategory name or a subcategory object.
 */
export function matchesSubcategory(product, subcategoryInput) {
  if (!subcategoryInput || subcategoryInput === 'all') return true;
  const targetName = getSubName(subcategoryInput);
  const target = targetName.toLowerCase().trim();
  const prodSub = (product.subcategory || product.subCategory || '').toLowerCase();
  const prodName = (product.name || '').toLowerCase();
  const prodDesc = (product.description || product.shortDescription || '').toLowerCase();
  const fullText = `${prodName} ${prodSub} ${prodDesc}`;

  // Direct match
  if (prodSub.includes(target) || target.includes(prodSub)) {
    return true;
  }

  // Canonical keyword definitions
  const map = {
    "children's storybooks": ['story', 'adventure', 'tale', 'savanna', 'wildlife', 'lantern', 'serengeti', 'friend'],
    "islamic children's books": ['dua', 'prophet', 'seerah', 'allah', 'islamic', 'merciful', 'hearts', 'hadith'],
    "arabic learning books": ['arabic', 'qur', 'tajweed', 'alphabet', 'tracing'],
    "educational books": ['phonics', 'science', 'math', 'geography', 'workbook', 'words', 'reader'],
    "activity and colouring books": ['coloring', 'colouring', 'activity', 'poster', 'mazes', 'puzzle'],
    "activity & colouring books": ['coloring', 'colouring', 'activity', 'poster', 'mazes', 'puzzle'],
    "reading accessories": ['pointer', 'bookmark', 'holder', 'magnifier', 'light', 'tote'],

    "notebooks and exercise books": ['exercise', 'notebook', 'ruled', 'grid', 'handwriting'],
    "notebooks & exercise books": ['exercise', 'notebook', 'ruled', 'grid', 'handwriting'],
    "pens and pencils": ['pencil', 'pen', 'grip', 'writing'],
    "pens & pencils": ['pencil', 'pen', 'grip', 'writing'],
    "erasers and sharpeners": ['eraser', 'sharpener', 'non-dust'],
    "erasers & sharpeners": ['eraser', 'sharpener', 'non-dust'],
    "pencil cases": ['pencil case', 'hardtop', 'pouch'],
    "crayons and coloured pencils": ['crayon', 'colored pencil', 'wax', 'pastel'],
    "crayons & coloured pencils": ['crayon', 'colored pencil', 'wax', 'pastel'],
    "art and craft supplies": ['caddy', 'ruler', 'geometry', 'craft', 'art'],
    "art & craft supplies": ['caddy', 'ruler', 'geometry', 'craft', 'art'],
    "stickers and bookmarks": ['stamp', 'planner', 'sticker', 'bookmark', 'praise'],
    "stickers & bookmarks": ['stamp', 'planner', 'sticker', 'bookmark', 'praise'],

    "preschool backpacks": ['junior', 'safari', 'lightweight', 'preschool', 'daypack'],
    "primary school bags": ['ergonomic', 'primary', 'reflective', 'waterproof', 'drawstring', 'backpack'],
    "pencil pouches": ['pouch', 'pencil', 'zipper', 'expandable'],
    "book bags": ['book bag', 'drawstring', 'pe & activity', 'heavy-duty'],
    "tote bags": ['tote', 'canvas', 'library', 'storybook'],

    "lunch boxes": ['bento', 'lunch box', 'compartment', 'stainless'],
    "food containers": ['snack', 'fruit', 'container', 'bamboo', 'plate', 'dining'],
    "lunch bags": ['lunch bag', 'insulated', 'thermal'],
    "water bottles": ['water bottle', 'double-wall', 'insulated', 'stainless'],
    "reusable cups": ['cup', 'dining set', 'plate', 'bamboo'],
    "bottle accessories": ['straw', 'cleaning', 'brush', 'tritan', 'easy-sip'],

    "alphabet and number toys": ['alphabet', 'counting', 'number', 'pegs', 'blocks'],
    "alphabet & number toys": ['alphabet', 'counting', 'number', 'pegs', 'blocks'],
    "puzzles": ['puzzle', 'sorting', 'peg', 'masjid', 'floor'],
    "flashcards": ['flashcard', 'cards', 'math cards', 'dua cards', 'arabic cards'],
    "building blocks": ['building block', 'geometric block', 'wooden block', 'masjid block'],
    "memory games": ['memory', 'matching', 'game', 'prophets game'],
    "stem learning toys": ['stem', 'discovery', 'science', 'balance', 'scale'],
    "montessori-inspired learning materials": ['montessori', 'chef', 'kitchen', 'sorter', 'stacking', 'wooden'],

    "children's gift sets": ['gift box', 'gift set', 'gift bundle', 'explorer', 'art & story'],
    "birthday gifts": ['gift bundle', 'young reader', 'scholar', 'box'],
    "eid gifts": ['eid', 'ramadan', 'hamper', 'celebration'],
    "teacher gifts": ['teacher', 'stamps', 'planner', 'appreciation'],
    "gift bags and wrapping": ['wrapping', 'bag', 'keepsake', 'kit'],
    "gift bags & wrapping": ['wrapping', 'bag', 'keepsake', 'kit'],
    "reading reward sets": ['medal', 'trophy', 'champion', 'achievement'],
    "greeting cards": ['greeting', 'cards', 'postcard', 'pack'],

    "arabic alphabet & first words": ['alphabet', 'blocks', 'puzzle', 'tracing'],
    "quran stories & tafsir for kids": ['prophet', 'seerah', 'stories', 'quran'],
    "daily duas & hadith cards": ['dua', 'hadith', 'cards'],
    "islamic manners & character books": ['manners', 'habits', 'merciful', 'character'],
    "ramadan & eid learning kits": ['ramadan', 'calendar', 'deed', 'eid'],
    "prayer & wudu practice guides": ['starter kit', 'prayer', 'wudu', 'workbook'],

    "kids' smart watches": ['kids smart watch', 'children watch', 'safetrack', 'junior watch', 'child watch', 'colorful watch', 'dual camera'],
    "educational smart watches for children": ['educational', 'learning watch', 'puzzle', 'math', 'believer', 'islamic watch', 'quiz', 'game'],
    "smart watches with calling and sim support": ['calling', 'sim', 'cellular', 'voice call', 'video call', 'safaricom', 'airtel', 'call'],
    "smart watches with gps tracking": ['gps', 'tracking', 'location', 'geofence', 'sos', 'safetrack', 'guardian'],
    "adult smart watches": ['adult', 'elegance', 'classic', 'bluetooth calling', 'amoled', 'men', 'women'],
    "fitness bands": ['fitness', 'band', 'wristband', 'activity tracker', 'heart rate', 'step counter', 'pulsetrack'],
    "smart watch replacement straps": ['strap', 'straps', 'band', 'silicone strap', 'nylon loop', 'replacement strap'],
    "smart watch screen protectors": ['screen protector', 'tempered glass', 'protective film', 'protector', 'film'],
    "smart watch charging cables and chargers": ['charging cable', 'charger', 'dock', 'magnetic cable', 'usb charger', 'charging'],
    "smart watch protective cases": ['case', 'bumper', 'protective case', 'cover', 'armor', 'shockproof case']
  };

  const keywords = map[target];
  if (keywords) {
    return keywords.some(k => fullText.includes(k));
  }

  // Fallback: search key words
  const tokens = target.split(/[\s,&]+/).filter(t => t.length > 3);
  return tokens.some(t => fullText.includes(t));
}

/**
 * Checks whether a product matches a target age group using numeric boundary intervals.
 */
export function matchesAgeGroup(product, ageGroupId) {
  if (!ageGroupId) return true;
  const bracket = getAgeGroupById(ageGroupId);
  if (!bracket) return true;

  let pMin = product.ageMin;
  let pMax = product.ageMax;

  if (pMin === undefined || pMax === undefined || pMin === null || pMax === null) {
    const range = product.ageRange || product.age_range || '';
    if (range.includes('Teachers')) return false;
    if (range === 'All Ages') {
      pMin = 3;
      pMax = 14;
    } else {
      const match = range.match(/(\d+)\s*[–\-to]+\s*(\d+)/i);
      if (match) {
        pMin = parseInt(match[1], 10);
        pMax = parseInt(match[2], 10);
      } else {
        const plusMatch = range.match(/(\d+)\s*\+/);
        if (plusMatch) {
          pMin = parseInt(plusMatch[1], 10);
          pMax = 18;
        } else {
          return false;
        }
      }
    }
  }

  return pMin <= bracket.maxAge && pMax >= bracket.minAge;
}
