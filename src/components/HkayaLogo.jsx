import React from 'react';
import logoImg from '../assets/hkaya-logo.png';
import { STORE_CONFIG } from '../config/storeConfig';

/**
 * HKAYA Brand Logo Component
 * Uses the supplied official Hkaya logo asset as the primary brand identity.
 */
export default function HkayaLogo({
  variant = 'default', // 'default' | 'large' | 'compact' | 'footer'
  className = '',
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-3 cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      role="banner"
    >
      {/* Official Provided Hkaya Logo Asset */}
      <div className="relative rounded-2xl overflow-hidden shadow-xs border border-terracotta-200/60 bg-terracotta-500 flex items-center justify-center transition-all group-hover:shadow-md">
        <img
          src={logoImg}
          alt={`${STORE_CONFIG.brand.name} ${STORE_CONFIG.brand.subName}`}
          className={`object-cover ${
            variant === 'large'
              ? 'w-16 h-16 sm:w-20 sm:h-20'
              : variant === 'compact'
              ? 'w-9 h-9'
              : 'w-11 h-11 sm:w-12 sm:h-12'
          }`}
        />
      </div>

      {/* Brand Identification */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-forest-900 font-sans group-hover:text-terracotta-600 transition-colors">
            {STORE_CONFIG.brand.name}
          </span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-terracotta-100 text-terracotta-800 font-sans">
            {STORE_CONFIG.brand.arabicName}
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-charcoal-muted tracking-wider uppercase mt-1">
          {STORE_CONFIG.brand.subName}
        </span>
      </div>
    </div>
  );
}
