import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';

/**
 * High-fidelity Official WhatsApp SVG Icon
 */
function WhatsAppIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 0 1-1.25-4.46c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.53c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
    </svg>
  );
}

/**
 * WhatsAppFloatingButton Component
 * 
 * Floating contact button visible across all pages in the bottom-right corner.
 * Features:
 * - Official WhatsApp green circular button with recognizable phone glyph
 * - WhatsApp number: 0793477288 (https://wa.me/254793477288)
 * - Pre-filled editable message: "Assalamu Alaikum! I would like to enquire about products from Hikaya Kids Library."
 * - Desktop hover tooltip: "Chat with us on WhatsApp"
 * - Mobile-friendly touch target (52px on mobile, 56px on desktop)
 * - Positioned safely above the mobile navigation bar without blocking content
 * - Full accessibility with accessible label: "Contact Hikaya Kids Library on WhatsApp"
 */
export default function WhatsAppFloatingButton() {
  const whatsappConfig = STORE_CONFIG?.contacts?.whatsapp;

  // Confirmed number: 0793477288 -> international 254793477288
  const phone = (whatsappConfig?.targetNumber || '254793477288').replace(/[^0-9]/g, '');
  const prefilledMessage = encodeURIComponent(
    whatsappConfig?.helpPrompt || "Assalamu Alaikum! I would like to enquire about products from Hikaya Kids Library."
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${prefilledMessage}`;
  const tooltipId = "whatsapp-floating-tooltip";

  return (
    <div
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center"
      aria-label="Direct WhatsApp Contact"
    >
      {/* Desktop Tooltip (Shown on hover and keyboard focus) */}
      <div
        id={tooltipId}
        role="tooltip"
        className="hidden sm:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-200 ease-out z-50"
      >
        <div className="relative bg-forest-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl whitespace-nowrap border border-forest-700 tracking-wide">
          <span>Chat with us on WhatsApp</span>
          {/* Subtle arrow pointing to the green circle */}
          <div
            className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-forest-900 rotate-45 border-r border-t border-forest-700"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Floating Circular WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Hikaya Kids Library on WhatsApp"
        aria-describedby={tooltipId}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1caa52] text-white flex items-center justify-center shadow-lg hover:shadow-2xl shadow-[#25D366]/35 hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" />
      </a>
    </div>
  );
}
