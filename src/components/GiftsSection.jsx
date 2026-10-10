import React from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function GiftsSection() {
  const { navigateTo } = useStore();

  const occasions = [
    { emoji: "🎂", name: "Birthday", desc: "Joyful milestone book sets & toys" },
    { emoji: "👶", name: "New Baby", desc: "Sensory cloth books & organic wooden rattles" },
    { emoji: "🌙", name: "Eid", desc: "Festive celebration boxes & glowing lanterns" },
    { emoji: "🌙", name: "Ramadan", desc: "Deed countdown charts & reflection journals" },
    { emoji: "🎓", name: "Teacher Gifts", desc: "Inspiring stationery & appreciation notes" },
    { emoji: "❤️", name: "Just Because", desc: "Unexpected delights for quiet afternoons" }
  ];

  return (
    <section className="py-16 sm:py-20 bg-rose-50/50 border-b border-sand-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-rose-600" />
                <span>Meaningful Celebrations</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
                Gifts for Every Occasion
              </h2>

              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                Whether celebrating a precious new arrival, an Eid morning, or simply nurturing a child's milestone, Hkaya gift sets bring beauty and learning together.
              </p>

              <div className="p-4 rounded-2xl bg-cream-50 border border-sand-200 text-xs text-charcoal-muted space-y-1">
                <p className="font-bold text-forest-900">✨ Gift Wrapping Available at Checkout</p>
                <p>Includes handmade satin ribbon wrapping and an optional handwritten personalized greeting card.</p>
              </div>

              <button
                onClick={() => navigateTo('shop', { category: 'gifts' })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-soft transition-all active:scale-95"
              >
                <span>Find a Gift</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Occasions Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {occasions.map((occ, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo('shop', { category: 'gifts' })}
                  className="p-4 rounded-2xl bg-cream-50 hover:bg-white border border-sand-200/90 hover:border-rose-300 hover:shadow-md transition-all text-left flex flex-col justify-between group active:scale-95"
                >
                  <div className="text-2xl mb-2">{occ.emoji}</div>
                  <div>
                    <h3 className="text-sm font-bold text-forest-900 group-hover:text-rose-700 transition-colors">
                      {occ.name}
                    </h3>
                    <p className="text-[11px] text-charcoal-muted mt-0.5 line-clamp-2">
                      {occ.desc}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 mt-3 block group-hover:translate-x-0.5 transition-transform">
                    Shop Gifts →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
