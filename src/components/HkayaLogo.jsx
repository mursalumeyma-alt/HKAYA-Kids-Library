import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';

/**
 * Sun rising behind an open book SVG symbol matching Hikaya reference branding
 */
export function HikayaSunBookIcon({ className = "w-8 h-8", color = "#F97316" }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Sun disk rising */}
      <circle cx="24" cy="18" r="8" fill={color} />
      
      {/* Sun rays */}
      <line x1="24" y1="2" x2="24" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="7" x2="15" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="7" x2="33" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="5" y1="18" x2="9" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="18" x2="39" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      {/* Open Book - Left Page */}
      <path
        d="M23 18C16 16 7 17 5 18V35C8 34 16 33 23 35.5V18Z"
        fill={color}
      />
      {/* Open Book - Right Page */}
      <path
        d="M25 18C32 16 41 17 43 18V35C40 34 32 33 25 35.5V18Z"
        fill={color}
      />
      {/* Subtle page fold lines */}
      <path
        d="M6 32C11 31 18 31.5 22 33"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M42 32C37 31 30 31.5 26 33"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

/**
 * HKAYA Brand Logo Component
 * Matches the reference mockup with the sun-book symbol and warm typography.
 * Supports 'default' (orange on light) and 'footer' (white on orange).
 */
export default function HkayaLogo({
  variant = 'default', // 'default' | 'footer' | 'compact'
  className = '',
  onClick
}) {
  const isFooter = variant === 'footer';
  const brandColor = isFooter ? '#FFFFFF' : '#F97316';

  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      role="banner"
    >
      {/* Sun rising behind Open Book Icon */}
      <div className="shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
        <HikayaSunBookIcon className="w-10 h-10 sm:w-11 sm:h-11" color={brandColor} />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black text-2xl sm:text-[26px] tracking-tight font-display transition-colors ${
              isFooter ? 'text-white' : 'text-[#F97316] group-hover:text-[#C2410C]'
            }`}
          >
            Hikaya
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`text-xs font-bold tracking-wide uppercase ${
              isFooter ? 'text-white/90' : 'text-[#F97316]/90'
            }`}
          >
            Kids Library
          </span>
          <span
            className={`text-xs font-bold ${
              isFooter ? 'text-white/80' : 'text-[#F97316]'
            }`}
          >
            حكاية
          </span>
        </div>
      </div>
    </div>
  );
}
