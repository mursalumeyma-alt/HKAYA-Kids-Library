import React from 'react';
import { useStore } from '../context/StoreContext';
import { matchesAgeGroup } from '../data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ShopByAge() {
  const { navigateTo, ageGroups, products } = useStore();

  const getProductCountForAge = (ageId) => {
    if (!products) return 0;
    return products.filter(p => matchesAgeGroup(p, ageId)).length;
  };

  return (
    <section className="py-12 sm:py-16 bg-cream-50 border-b border-sand-200/60" id="shop-by-age">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find Products for Your Child</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              Shop by Age
            </h2>
            <p className="text-sm text-charcoal-muted mt-1 max-w-2xl">
              Find books, learning materials, school essentials, toys and gifts selected for your child's age.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group shrink-0"
          >
            <span>View All Ages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Age Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {ageGroups.map((age) => {
            const count = getProductCountForAge(age.id);

            return (
              <button
                key={age.id}
                onClick={() => navigateTo('shop', { ageGroup: age.id })}
                className={`group flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-gradient-to-b ${age.color} border shadow-soft hover:shadow-soft-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/85 backdrop-blur-xs font-extrabold text-xs sm:text-sm shadow-2xs">
                      <span>{age.emoji}</span>
                      <span>{age.label}</span>
                    </span>
                    {count > 0 && (
                      <span className="text-[10px] font-bold text-forest-900/70 bg-white/60 px-1.5 py-0.5 rounded-md">
                        {count} items
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-forest-950 leading-tight">
                    {age.title}
                  </h3>
                  <p className="text-[11px] text-charcoal-light/90 mt-1.5 line-clamp-2 leading-relaxed">
                    {age.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-bold text-forest-900 group-hover:text-terracotta-700 transition-colors">
                  <span>{age.cta || `Explore Ages ${age.label} →`}</span>
                  <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 text-forest-800" />
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
