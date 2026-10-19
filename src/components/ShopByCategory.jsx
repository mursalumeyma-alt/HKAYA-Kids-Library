import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    id: 'books-reading',
    name: 'Books & Reading',
    image: '/images/reference/cat-prod-books.png',
    alt: "Children's books and reading collection"
  },
  {
    id: 'stationery-art',
    name: 'Stationery & Art Supplies',
    image: '/images/reference/cat-prod-stationery.png',
    alt: 'Colorful stationery, pencils and art supplies'
  },
  {
    id: 'school-bags',
    name: 'School Bags',
    image: '/images/reference/cat-prod-school-bags.png',
    alt: "Children's school backpacks and book bags"
  },
  {
    id: 'lunch-boxes-bottles',
    name: 'Lunch Boxes & Bottles',
    image: '/images/reference/cat-prod-lunch-boxes.png',
    alt: "Children's lunch boxes and water bottles"
  },
  {
    id: 'educational-toys',
    name: 'Educational Toys',
    image: '/images/reference/cat-prod-toys.png',
    alt: 'Wooden educational toys and learning blocks'
  },
  {
    id: 'gifts-accessories',
    name: 'Gifts & Accessories',
    image: '/images/reference/cat-prod-gifts.png',
    alt: 'Teddy bear and children gift box accessories'
  },
  {
    id: 'reading-learning-accessories',
    name: 'Reading & Learning Accessories',
    image: '/images/reference/cat-prod-reading-acc.png',
    alt: 'Adjustable reading stands and study accessories'
  }
];

export default function ShopByCategory() {
  const { navigateTo } = useStore();

  const handleCardClick = (catId) => {
    navigateTo('shop', { category: catId });
  };

  return (
    <section id="shop-by-category" className="py-6 sm:py-10 bg-[#FCF4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 7 Horizontal Category Cards matching reference mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3 lg:gap-3.5">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className="group bg-[#FCF4E8] rounded-2xl border border-[#D8BC9F] p-2.5 sm:p-3 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(cat.id);
                }
              }}
              aria-label={`Browse ${cat.name}`}
            >
              {/* Product Photograph on seamless matching background */}
              <div className="h-24 sm:h-26 lg:h-28 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="max-h-full max-w-full object-contain transform group-hover:scale-106 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Card Footer: Category Title + Circular Arrow Button */}
              <div className="pt-2 flex items-center justify-between gap-1 mt-auto">
                <span className="font-bold text-[11px] sm:text-[11.5px] lg:text-[12px] text-gray-900 group-hover:text-[#F97316] transition-colors leading-[1.25] pr-1">
                  {cat.name}
                </span>

                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F97316] group-hover:bg-[#C2410C] text-white flex items-center justify-center shrink-0 shadow-2xs transition-colors"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
