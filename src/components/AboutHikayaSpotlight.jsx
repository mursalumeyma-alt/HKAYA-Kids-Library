import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function AboutHikayaSpotlight() {
  const { navigateTo } = useStore();

  return (
    <section className="py-8 sm:py-14 bg-[#FCF4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Stack of Read, Learn, Grow Books */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative rounded-2xl overflow-hidden shadow-xs max-w-sm w-full">
              <img
                src="/images/reference/about-books-stack.jpg"
                alt="Read, Learn, Grow books on table with potted plant and heart"
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Center Column: About Hikaya Story & Learn More CTA */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-3.5 px-2">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F97316] tracking-tight">
              About Hikaya
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              At Hikaya Kids Library, we believe every child deserves access to quality
              books, engaging learning tools and inspiring products. Our goal is to
              support children&apos;s curiosity, creativity and confidence — one book,
              one toy, one dream at a time.
            </p>
            <div className="pt-1 flex justify-center lg:justify-start">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigateTo('about');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#C2410C] active:bg-[#9A3412] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 transform hover:scale-102 active:scale-98"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Decorative 'Better Readers Brighter Futures' Badge */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="w-32 sm:w-40 lg:w-44 transition-transform hover:scale-105 duration-300">
              <img
                src="/images/reference/badge-better-readers.png"
                alt="Better Readers Brighter Futures"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
