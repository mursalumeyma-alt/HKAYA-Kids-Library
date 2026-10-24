import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { getProductsForCategory, getSubName, getSubImage, getSubAlt, getSubDesc } from '../data/categories';
import {
  BookOpen,
  Palette,
  Backpack,
  Utensils,
  Puzzle,
  Gift,
  Compass,
  Watch,
  ArrowRight,
  Search,
  Sparkles,
  ChevronRight,
  Home
} from 'lucide-react';

const iconMap = {
  BookOpen,
  Palette,
  Backpack,
  Utensils,
  Puzzle,
  Gift,
  Compass,
  Watch
};

export default function CategoriesView() {
  const { navigateTo, categories, products } = useStore();
  const [searchFilter, setSearchFilter] = useState('');

  const getCategoryCount = (catId) => {
    return getProductsForCategory(products, catId).length;
  };

  const filteredCategories = categories.filter(cat => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    const nameMatch = cat.name.toLowerCase().includes(q);
    const subMatch = cat.subcategories?.some(s => getSubName(s).toLowerCase().includes(q));
    return nameMatch || descMatch || subMatch;
  });

  const handleSubcategoryClick = (catId, subName, e) => {
    e.stopPropagation();
    navigateTo('shop', { category: catId, subcategory: subName });
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1 hover:text-terracotta-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          <span className="font-bold text-forest-900">Shop by Category</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand-200/90 shadow-sm mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-100/80 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Hikaya Shopping Departments • Kenya</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-forest-900 tracking-tight">
              Shop by Category
            </h1>

            <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed">
              Explore our curated educational shopping departments inspired by top retail discovery. From engaging storybooks and classroom stationery to ergonomic backpacks, bento lunch boxes, educational toys, and meaningful gifts.
            </p>

            {/* In-page Category Search */}
            <div className="mt-6 max-w-md">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-terracotta-600 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter departments or subcategories..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-cream-50 border border-sand-200 text-sm text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || BookOpen;
            const count = getCategoryCount(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => navigateTo('shop', { category: cat.id })}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-sand-200/90 shadow-soft hover:shadow-xl hover:border-terracotta-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Banner */}
                <div className="relative h-56 w-full bg-sand-100 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xs text-xs font-bold text-forest-900 border border-white/60">
                    <span className="text-base">{cat.emoji}</span>
                    <IconComponent className="w-4 h-4 text-terracotta-600" />
                    <span>{cat.name}</span>
                  </div>

                  {/* Count Pill */}
                  {count > 0 && (
                    <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-xl bg-forest-900/90 text-gold-200 backdrop-blur-md shadow-xs">
                      {count} items
                    </span>
                  )}

                  {/* Bottom Arabic & Tagline */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <span className="text-xs font-medium text-cream-100/90 drop-shadow-sm line-clamp-1">
                      {cat.tagline}
                    </span>
                    {cat.arabic && (
                      <span className="text-sm font-arabic font-semibold text-gold-300 drop-shadow-sm shrink-0 ml-2">
                        {cat.arabic}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-forest-900 group-hover:text-terracotta-600 transition-colors">
                      {cat.name}
                    </h2>

                    <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Subcategories visual cards */}
                    {cat.subcategories && (
                      <div className="mt-4 pt-4 border-t border-sand-100">
                        <div className="flex items-center justify-between mb-2.5">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted/80">
                            Subcategories:
                          </p>
                          <span className="text-[11px] text-terracotta-600 font-semibold">
                            {cat.subcategories.length} subcategories
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {cat.subcategories.map((sub) => {
                            const subName = getSubName(sub);
                            const subImg = getSubImage(sub);
                            const subAlt = getSubAlt(sub);

                            return (
                              <button
                                key={subName}
                                onClick={(e) => handleSubcategoryClick(cat.id, subName, e)}
                                className="flex items-center gap-2 p-1.5 rounded-xl bg-sand-50/80 hover:bg-terracotta-50/90 hover:shadow-xs border border-sand-200/60 hover:border-terracotta-300 transition-all text-left group/subbtn"
                                title={`Explore ${subName}`}
                              >
                                {subImg && (
                                  <img
                                    src={subImg}
                                    alt={subAlt}
                                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-sand-200/80 shadow-2xs group-hover/subbtn:scale-105 transition-transform"
                                    loading="lazy"
                                  />
                                )}
                                <span className="text-[11px] font-semibold text-forest-900 group-hover/subbtn:text-terracotta-700 line-clamp-2 leading-tight">
                                  {subName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('shop', { category: cat.id });
                      }}
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-cream-100 hover:bg-terracotta-600 hover:text-white text-forest-900 font-bold text-xs tracking-wide transition-colors group/btn"
                    >
                      <span>Explore Department Products</span>
                      <ArrowRight className="w-4 h-4 text-terracotta-600 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
