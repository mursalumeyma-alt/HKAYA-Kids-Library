import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { Shapes, ArrowRight, Sparkles } from 'lucide-react';

export default function LearnAndPlaySection() {
  const { navigateTo } = useStore();

  const educationalToys = PRODUCTS.filter(p => p.category === 'toys').slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-teal-50/40 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Shapes className="w-3.5 h-3.5 text-sage-600" />
              <span>Sensory & STEM Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              Learn & Play
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-1 max-w-xl">
              Age-appropriate educational toys, wooden puzzles, counting boards, and building sets that spark hands-on discovery.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop', { category: 'toys' })}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group shrink-0"
          >
            <span>Explore Educational Toys</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {educationalToys.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
