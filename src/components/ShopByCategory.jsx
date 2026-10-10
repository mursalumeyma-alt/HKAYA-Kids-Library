import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  BookOpen,
  Sparkles,
  BookMarked,
  Palette,
  PackageCheck,
  Puzzle,
  Layers,
  Shapes,
  Moon,
  Backpack,
  Gift,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  BookOpen,
  Sparkles,
  BookMarked,
  Palette,
  PackageCheck,
  Puzzle,
  Layers,
  Shapes,
  Moon,
  Backpack,
  Gift
};

export default function ShopByCategory() {
  const { navigateTo, categories, products } = useStore();

  const handleCategoryClick = (category) => {
    navigateTo('shop', { category: category.id });
  };

  // Helper to count active products per category
  const getCategoryCount = (catId) => {
    if (!products) return 0;
    return products.filter(p => p.category === catId).length;
  };

  return (
    <section className="py-14 sm:py-20 bg-sand-50/60 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-terracotta-600 uppercase tracking-widest mb-1.5">
              <span>Curated Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-1 max-w-2xl">
              Explore our full catalog of children's Islamic books, Arabic learning tools, puzzles, educational toys, and school essentials.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 11 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || BookOpen;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-sand-200/90 shadow-soft hover:shadow-soft-hover hover:border-terracotta-300 transition-all duration-200 text-left active:scale-[0.98]"
              >
                {/* Top Image Banner */}
                <div className="relative h-36 w-full bg-sand-100 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Emoji & Icon Floating Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-xs text-xs font-bold text-forest-900">
                    <span className="text-sm">{cat.emoji}</span>
                    <IconComponent className="w-3.5 h-3.5 text-terracotta-600" />
                  </div>

                  {/* Count Badge */}
                  {count > 0 && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-forest-900/90 text-white backdrop-blur-xs">
                      {count} items
                    </span>
                  )}

                  {/* Arabic subtitle overlay */}
                  {cat.arabic && (
                    <div className="absolute bottom-2.5 right-3 text-right">
                      <span className="text-xs font-arabic text-amber-200/90 drop-shadow-sm font-medium">
                        {cat.arabic}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-forest-900 group-hover:text-terracotta-600 transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-terracotta-700 mt-0.5">
                      {cat.tagline}
                    </p>
                    <p className="text-xs text-charcoal-muted line-clamp-2 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-bold text-terracotta-700">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
