import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { Backpack, ArrowRight, Sparkles } from 'lucide-react';

export default function SchoolEssentialsSection() {
  const { navigateTo } = useStore();

  // School essentials: bags, stationery, exercise books, dishes-lunch
  const schoolProducts = PRODUCTS.filter(p =>
    ['bags', 'stationery', 'exercise-books', 'dishes-lunch'].includes(p.category)
  ).slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Backpack className="w-3.5 h-3.5 text-blue-600" />
              <span>Back to School & Daily Learning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              School Essentials
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-1 max-w-xl">
              Everyday essentials for school, study and learning.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop', { category: 'stationery' })}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group shrink-0"
          >
            <span>Explore All School Supplies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {schoolProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
