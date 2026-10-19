import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Heart } from 'lucide-react';

export default function Hero() {
  const { navigateTo } = useStore();

  const handleShopNow = () => {
    const catSection = document.getElementById('shop-by-category');
    if (catSection) {
      catSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('shop');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FCF4E8] py-8 sm:py-12 lg:py-16">
      {/* Decorative Organic Backdrop Blobs */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FCECDD]/60 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#FAE4D0]/50 blur-2xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Shop Now CTA */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-bold text-[#F97316] tracking-wide">
                Welcome to Hikaya Kids Library
              </span>
            </div>

            {/* Main Headline with Hand-Drawn Sunburst Accents */}
            <div className="relative">
              {/* Radiating Sunshine Rays */}
              <div className="absolute -left-6 top-1 text-[#F97316] hidden sm:block pointer-events-none opacity-80" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="4" y1="8" x2="1" y2="6" />
                  <line x1="8" y1="4" x2="6" y2="1" />
                </svg>
              </div>
              <div className="absolute right-12 top-0 text-[#F97316] hidden sm:block pointer-events-none opacity-80" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="20" y1="8" x2="23" y2="6" />
                  <line x1="16" y1="4" x2="18" y2="1" />
                </svg>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
                <span className="text-[#1F2937] block">Little Minds.</span>
                <span className="text-[#F97316] block mt-1">Big Dreams.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Quality books, learning tools and more — for every child's journey.
            </p>

            {/* CTA Button & Floating Heart Accent */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleShopNow}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#F97316] hover:bg-[#C2410C] active:bg-[#9A3412] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-102 active:scale-98"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Decorative Floating Heart */}
              <div className="text-[#F97316] animate-gentle-pulse" aria-hidden="true">
                <Heart className="w-5 h-5 fill-[#F97316]" />
              </div>
            </div>
          </div>

          {/* Right Column: Hero Children Photo matching reference mockup */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-lg w-full">
              <img
                src="/images/reference/hero-children.jpg"
                alt="Two African children happily reading a book together at Hikaya Kids Library"
                className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
