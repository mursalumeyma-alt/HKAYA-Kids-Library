import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function NewArrivalsSection() {
  const { products, navigateTo } = useStore();

  // Filter for products marked as new arrival, or fallback to first 4
  const newArrivals = (products || []).filter(p => p.newArrival || p.new_arrival).slice(0, 4);
  const displayProducts = newArrivals.length > 0 ? newArrivals : (products || []).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-cream-50 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sage-700" />
              <span>Just Arrived</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-1 max-w-xl">
              Fresh additions to our children's library, tactile Arabic flashcards, and new educational workbooks.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group shrink-0"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
