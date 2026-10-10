import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Moon, Sparkles, BookOpen, Heart, ArrowRight, Star } from 'lucide-react';

export default function IslamicLearning() {
  const { navigateTo, openProductModal } = useStore();
  const { addToCart } = useCart();

  const islamicSubcategories = [
    { title: "Quran for Kids", arabic: "القرآن للأطفال", desc: "Tafseer & gentle reflections" },
    { title: "Islamic Stories", arabic: "قصص الأنبياء", desc: "Prophetic virtues & courage" },
    { title: "Dua & Adhkar", arabic: "أدعية وأذكار", desc: "Daily gratitude cards & charts" },
    { title: "Ramadan Resources", arabic: "أنشطة رمضان", desc: "Countdowns, crafts & planners" },
    { title: "Islamic Activity Books", arabic: "كتب الأنشطة", desc: "Puzzles, mazes & coloring" },
    { title: "Muslim Children's Gifts", arabic: "هدايا الأطفال", desc: "Eid boxes & celebratory sets" }
  ];

  // Curate Islamic products from catalog
  const islamicItems = PRODUCTS.filter(p => p.category === 'islamic').slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-forest-900 to-forest-800 text-cream-50 relative overflow-hidden">
      {/* Subtle Star & Moon background flourish */}
      <div className="absolute top-10 right-10 text-gold-400/20 pointer-events-none select-none">
        <Moon className="w-40 h-40" />
      </div>
      <div className="absolute bottom-8 left-12 text-sage-400/10 pointer-events-none select-none">
        <Sparkles className="w-28 h-28" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-700/80 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Moon className="w-3.5 h-3.5 text-gold-400" />
            <span>Islamic Learning Collection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
            Growing Hearts.{' '}
            <span className="text-gold-300 italic font-normal block sm:inline">
              Growing Knowledge.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed font-light">
            Meaningful Islamic books and learning resources designed to help children learn, explore and grow with love.
          </p>
        </div>

        {/* Subcategories Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-14">
          {islamicSubcategories.map((sub, i) => (
            <div
              key={i}
              onClick={() => navigateTo('shop', { category: 'islamic' })}
              className="p-4 rounded-2xl bg-forest-800/80 hover:bg-forest-700/80 border border-forest-600/60 hover:border-gold-400/40 transition-all cursor-pointer text-center group"
            >
              <span className="text-xs font-semibold text-gold-300 block mb-0.5">
                {sub.arabic}
              </span>
              <p className="text-xs font-bold text-white group-hover:text-gold-200 transition-colors leading-snug">
                {sub.title}
              </p>
              <p className="text-[10px] text-cream-200/70 mt-1 line-clamp-1">
                {sub.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Curated Islamic Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {islamicItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-cream-50 text-charcoal overflow-hidden shadow-xl border border-gold-200/40 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className="relative aspect-[4/3] bg-sand-200 overflow-hidden cursor-pointer"
                onClick={() => openProductModal(item)}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-forest-900 text-gold-300 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {item.subCategory}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
                    <span className="font-semibold text-emerald-800">{item.arabicTitle}</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-sand-200">{item.ageRange}</span>
                  </div>

                  <h3
                    onClick={() => openProductModal(item)}
                    className="font-bold text-base text-forest-900 group-hover:text-terracotta-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-sand-200 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-forest-900 font-sans">
                    KSh {item.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="px-3.5 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-gold-200 text-xs font-bold transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('shop', { category: 'islamic' })}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <span>Explore Islamic Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
