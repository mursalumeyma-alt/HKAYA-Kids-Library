import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export default function OrderReadyCTA() {
  const { navigateTo } = useStore();

  return (
    <section id="order-ready-cta" className="py-16 sm:py-20 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900 text-cream-50 relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Book Flourish Icon */}
      <div className="absolute top-8 left-8 text-cream-100/10 hidden md:block pointer-events-none">
        <BookOpen className="w-24 h-24" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/80 border border-forest-700/80 text-gold-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Start Your Child's Journey</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-tight mb-5">
          Ready to Start Reading?
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-cream-100/90 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
          Give your little reader a new adventure today. Order now and get their next favorite book on the way!
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-bold text-base shadow-premium hover:shadow-soft-hover transition-all duration-200 transform hover:-translate-y-0.5 group"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Note */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-cream-200/70 pt-4 border-t border-forest-800/60">
          <span>M-Pesa • Mobile Money • Card Checkout</span>
          <span className="hidden sm:inline">•</span>
          <span>Quality Kids' Books & Learning Resources</span>
          <span className="hidden sm:inline">•</span>
          <span>Carefully Packaged with Love</span>
        </div>
      </div>
    </section>
  );
}
