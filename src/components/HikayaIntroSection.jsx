import React from 'react';
import { useStore } from '../context/StoreContext';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Hikaya Kids Library - Homepage Introduction Section (Section 4)
 * Warm, friendly welcome explaining the store's purpose.
 * Highlights that Hikaya is based in Kenya and supports young readers, parents, and schools.
 */
export default function HikayaIntroSection() {
  const { navigateTo } = useStore();

  return (
    <section id="hikaya-introduction" className="py-16 sm:py-20 bg-cream-100/70 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Visual Showcase: Real photograph of children reading in library */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-premium border border-sand-200 max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-sand-100">
                <img
                  src="/images/reading-corner-child.jpg"
                  alt="Young reader exploring stories at Hikaya Kids Library in Kenya"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-xs text-xs font-bold text-forest-900 flex items-center gap-1.5 border border-sand-100">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>Nairobi • Kenya</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-forest-700" />
              <span>Welcome to Hikaya حكاية</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight leading-tight">
              Nurturing Young Minds Across Kenya
            </h2>

            <div className="space-y-3.5 text-sm sm:text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                Based in <strong>Kenya</strong>, Hikaya Kids Library is a welcoming children’s bookstore, learning supply haven, and educational gift shop created to support young readers, parents, and schools.
              </p>
              <p>
                We believe that every child deserves access to inspiring literature, enriching Arabic and Islamic books, creative stationery, dependable school gear, and purposeful toys that spark lifelong curiosity and character.
              </p>
              <p className="text-xs sm:text-sm text-charcoal-muted">
                Whether you are a parent building a bedtime reading routine, a teacher preparing classroom essentials, or a caregiver searching for a thoughtful gift, Hikaya is here to serve your family with warmth and care.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs tracking-wide shadow-soft hover:shadow-soft-hover transition-all"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('categories')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-100 text-forest-900 font-bold text-xs border border-sand-200 transition-all shadow-xs"
              >
                <span>Browse Categories</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
