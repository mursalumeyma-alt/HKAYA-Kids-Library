import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { Sparkles, Info, X } from 'lucide-react';

export default function DemoNoticeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !STORE_CONFIG.prototype.isDemo) return null;

  return (
    <div className="bg-forest-900 text-cream-100 text-xs py-1.5 px-4 border-b border-forest-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-700/80 text-gold-200 text-[10px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-gold-400" /> Prototype Mode
          </span>
          <p className="truncate text-cream-200/90 text-[11px] sm:text-xs">
            {STORE_CONFIG.prototype.bannerText}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-cream-300 hover:text-white p-1 rounded transition-colors"
          title="Dismiss preview notice"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
