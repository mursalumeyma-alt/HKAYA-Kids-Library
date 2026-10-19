import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { Sparkles, ExternalLink, ArrowRight, Heart, BookOpen, Video, Camera } from 'lucide-react';

/**
 * High-fidelity Official TikTok Icon with Signature Neon Chromatic Glitch
 */
function TikTokOfficialBadge({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Cyan/Aqua offset shadow */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74l-.07-.09a2.9 2.9 0 0 1 2.37-4.53c.31 0 .6.05.88.14V9.39a6.38 6.38 0 0 0-1.02-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.48l.06-.06a6.3 6.3 0 0 0 1.8-4.42V8.82c1.47.96 3.23 1.52 5.12 1.56V6.94a4.83 4.83 0 0 1-.4-.25z"
        fill="#25F4EE"
        transform="translate(-0.6, -0.3)"
        opacity="0.9"
      />
      {/* Magenta/Red-Pink offset shadow */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74l-.07-.09a2.9 2.9 0 0 1 2.37-4.53c.31 0 .6.05.88.14V9.39a6.38 6.38 0 0 0-1.02-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.48l.06-.06a6.3 6.3 0 0 0 1.8-4.42V8.82c1.47.96 3.23 1.52 5.12 1.56V6.94a4.83 4.83 0 0 1-.4-.25z"
        fill="#FE2C55"
        transform="translate(0.6, 0.3)"
        opacity="0.9"
      />
      {/* Crisp White core note */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74l-.07-.09a2.9 2.9 0 0 1 2.37-4.53c.31 0 .6.05.88.14V9.39a6.38 6.38 0 0 0-1.02-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.48l.06-.06a6.3 6.3 0 0 0 1.8-4.42V8.82c1.47.96 3.23 1.52 5.12 1.56V6.94a4.83 4.83 0 0 1-.4-.25z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * HomeSocialSection Component
 * 
 * Beautiful, responsive social media section for the HKAYA Kids Library homepage.
 * Meets all specifications:
 * - Heading: "Follow HKAYA Kids Library"
 * - Subtitle: "Discover our latest books, stationery, learning supplies, and updates."
 * - TikTok & Instagram clickable cards with official URLs and handles
 * - Target="_blank" and rel="noopener noreferrer" for security
 * - Terracotta, warm cream, sage, and forest green palette
 */
export default function HomeSocialSection() {
  const { instagram, tiktok } = STORE_CONFIG.social;

  const tiktokUrl = tiktok?.url || "https://www.tiktok.com/@hkaya_kids_library";
  const instagramUrl = instagram?.url || "https://www.instagram.com/hkaya_kids_library/";
  const tiktokHandle = tiktok?.handle || "@hkaya_kids_library";
  const instagramHandle = instagram?.handle || "@hkaya_kids_library";

  return (
    <section id="follow-hkaya" className="py-14 sm:py-20 bg-[#FFF9F1] border-t border-sand-200/70 relative overflow-hidden scroll-mt-20">
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-forest-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-200/80 text-[#C2410C] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Join Our Young Readers Community</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-gray-900 tracking-tight">
            Follow HKAYA Kids Library
          </h2>

          <p className="text-base sm:text-lg text-charcoal-muted mt-3 leading-relaxed max-w-2xl mx-auto font-sans">
            Discover our latest books, stationery, learning supplies, and updates.
          </p>
        </div>

        {/* 2 Responsive Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: TikTok */}
          <div className="group bg-white rounded-3xl p-6 sm:p-8 border border-sand-200/90 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top accent badge & icon */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <TikTokOfficialBadge className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <Video className="w-3 h-3 text-[#FE2C55]" />
                  <span>Short Videos & Unboxings</span>
                </span>
              </div>

              {/* Title & Handle */}
              <div className="mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#C2410C] transition-colors flex items-center gap-2">
                  <span>TikTok</span>
                </h3>
                <span className="inline-block text-sm font-semibold text-[#F97316] font-mono mt-0.5">
                  {tiktokHandle}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed mb-6">
                Watch engaging children's book reviews, creative stationery showcases, fun reading prompts, and behind-the-scenes moments at Hikaya.
              </p>
            </div>

            {/* Clickable Action Link */}
            <div className="pt-4 border-t border-sand-100">
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow HKAYA Kids Library on TikTok (@hkaya_kids_library) - opens in a new tab"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black hover:bg-neutral-800 text-white font-bold text-sm shadow-sm transition-all duration-200 group-hover:shadow-md"
              >
                <TikTokIcon className="w-4 h-4 text-white" />
                <span>Follow on TikTok</span>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform ml-1" />
              </a>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="group bg-white rounded-3xl p-6 sm:p-8 border border-sand-200/90 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top accent badge & icon */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
                  }}
                >
                  <InstagramIcon className="w-8 h-8 text-white stroke-[2]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-100">
                  <Camera className="w-3 h-3 text-pink-600" />
                  <span>Stories & Recommendations</span>
                </span>
              </div>

              {/* Title & Handle */}
              <div className="mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors flex items-center gap-2">
                  <span>Instagram</span>
                </h3>
                <span className="inline-block text-sm font-semibold text-pink-600 font-mono mt-0.5">
                  {instagramHandle}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed mb-6">
                Explore curated book lists, colorful school essentials, Islamic children's titles, and tips for parents raising enthusiastic readers.
              </p>
            </div>

            {/* Clickable Action Link */}
            <div className="pt-4 border-t border-sand-100">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow HKAYA Kids Library on Instagram (@hkaya_kids_library) - opens in a new tab"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-white font-bold text-sm shadow-sm transition-all duration-200 group-hover:shadow-md"
                style={{
                  background: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)'
                }}
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform ml-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Community Trust Strip below cards */}
        <div className="mt-10 max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-charcoal-muted bg-white/70 backdrop-blur-xs py-2 px-4 rounded-full border border-sand-200/60 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316]" />
            <span>Tag <strong>#HkayaKids</strong> to share your child's reading journey with us!</span>
          </div>
        </div>

      </div>
    </section>
  );
}
