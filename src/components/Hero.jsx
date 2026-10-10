import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function Hero() {
  const { navigateTo, setIsWizardOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100 pt-6 pb-14 lg:pt-12 lg:pb-20 border-b border-sand-200/50">
      {/* Background Decorative SVG flourishes */}
      <div className="absolute top-8 left-6 text-terracotta-200/40 pointer-events-none select-none animate-gentle-float">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M6 6h10"/>
          <path d="M6 10h8"/>
        </svg>
      </div>

      <div className="absolute top-16 right-10 text-gold-300/40 pointer-events-none select-none animate-gentle-pulse">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Desktop) / Main Content */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/90 border border-terracotta-200/80 text-terracotta-800 text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-ping" />
              <span>Children's Library & Learning Store • Kenya</span>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-terracotta-700 block">
                HKAYA Kids Library
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-forest-900 leading-[1.12]">
                Little minds.{' '}
                <span className="text-terracotta-600 block sm:inline italic font-normal">
                  Big dreams.
                </span>
              </h1>
            </div>

            {/* Mobile / Tablet Image: Visible Above the Fold */}
            <div className="lg:hidden my-4">
              <div className="relative rounded-3xl overflow-hidden bg-white p-2.5 shadow-premium border border-sand-200/90 max-w-md mx-auto">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-sand-100">
                  <img
                    src="/images/children-reading-hero.jpg"
                    alt="Happy school-age children reading storybooks together at HKAYA Kids Library"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Subtle caption tag */}
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-xs text-[10px] font-bold text-forest-900 flex items-center gap-1.5 border border-sand-100">
                    <BookOpen className="w-3 h-3 text-terracotta-600" />
                    <span>Joyful Readers at HKAYA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Mission Statement */}
            <p className="text-base sm:text-lg text-charcoal-light max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              A warm children's library where young readers can discover quality books, Islamic learning resources, educational materials, and meaningful gifts to learn, imagine, and grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm tracking-wide shadow-soft hover:shadow-soft-hover transition-all active:scale-95 group"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsWizardOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-cream-100 text-forest-800 font-semibold text-sm border border-sand-200 shadow-xs hover:border-sand-300 transition-all active:scale-95"
              >
                <Compass className="w-4 h-4 text-terracotta-600" />
                <span>Need Help Choosing?</span>
              </button>
            </div>

            {/* Reassurance Points */}
            <div className="pt-4 border-t border-sand-200/80 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-charcoal-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Thoughtfully selected for growing minds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>Designed with families in mind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop): Large Prominent Hero Photo of Children Reading */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg xl:max-w-xl">
              {/* Soft warm ambient glow behind image */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-terracotta-200/35 via-gold-100/25 to-sage-200/35 rounded-3xl blur-2xl pointer-events-none" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-premium border border-sand-200/90 group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-sand-100">
                  <img
                    src="/images/children-reading-hero.jpg"
                    alt="Happy school-age children reading colorful storybooks together in a sunlit warm library"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />

                  {/* Clean, unobtrusive bottom-left badge */}
                  <div className="absolute bottom-4 left-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-forest-900 flex items-center gap-2 border border-sand-100/80">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Joyful Readers • Little Minds. Big Dreams.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
