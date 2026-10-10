import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { ArrowRight, Moon, Sparkles, Gift } from 'lucide-react';

export default function FeaturedCollections() {
  const { products, navigateTo } = useStore();

  // Pick items for Collection 1: Islamic Learning
  const islamicProducts = (products || [])
    .filter(p => ['islamic-books', 'quran-arabic-learning', 'ramadan-eid'].includes(p.category))
    .slice(0, 3);

  // Pick items for Collection 2: Play & Discover
  const playProducts = (products || [])
    .filter(p => ['educational-toys', 'puzzles-educational-games', 'learning-kits', 'flashcards-learning-cards'].includes(p.category))
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-cream-100/50 space-y-16 sm:space-y-24 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curated Collection 1: Islamic Learning for Little Hearts */}
        <div className="space-y-8">
          {/* Banner Card */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 to-forest-900 text-white p-8 sm:p-12 shadow-md">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Moon className="w-3.5 h-3.5" />
                <span>Featured Collection</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-white leading-tight">
                Islamic Learning for Little Hearts
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Nurture a deep love for Allah, the Prophet ﷺ, the Holy Qur'an, and daily morning and evening duas with gentle, joyful board books and Arabic learning cards.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('shop', { category: 'islamic-books' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-forest-900 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors shadow-xs"
                >
                  <span>Explore Islamic Collection</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            </div>
            {/* Soft decorative background glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-300 via-emerald-600 to-transparent" />
          </div>

          {/* 3 Featured Products in this Collection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {islamicProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Curated Collection 2: Play. Learn. Discover. */}
        <div className="space-y-8 pt-8 border-t border-sand-200/80">
          {/* Banner Card */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-terracotta-800 to-amber-900 text-white p-8 sm:p-12 shadow-md">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-900/80 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hands-On Learning</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-white leading-tight">
                Play. Learn. Discover.
              </h3>
              <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
                Screen-free educational toys, solid wooden puzzles, and tactile multi-sensory kits that inspire spatial curiosity, fine motor precision, and creative problem solving.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('shop', { category: 'educational-toys' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-forest-900 font-bold text-xs sm:text-sm hover:bg-amber-50 transition-colors shadow-xs"
                >
                  <span>Explore Educational Toys & Puzzles</span>
                  <ArrowRight className="w-4 h-4 text-terracotta-700" />
                </button>
              </div>
            </div>
            {/* Soft decorative background glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-orange-600 to-transparent" />
          </div>

          {/* 3 Featured Products in this Collection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
