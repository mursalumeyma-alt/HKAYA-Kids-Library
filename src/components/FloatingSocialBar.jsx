import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';

/**
 * High-fidelity Official WhatsApp SVG Icon
 */
function WhatsAppGlyph({ className = "w-6 h-6" }) {
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
 * High-fidelity Official Instagram Camera SVG Icon
 */
function InstagramGlyph({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * High-fidelity Official TikTok SVG Icon with Cyan & Pink Accents
 */
function TikTokGlyph({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {/* Cyan/Aqua offset shadow */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74l-.07-.09a2.9 2.9 0 0 1 2.37-4.53c.31 0 .6.05.88.14V9.39a6.38 6.38 0 0 0-1.02-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.48l.06-.06a6.3 6.3 0 0 0 1.8-4.42V8.82c1.47.96 3.23 1.52 5.12 1.56V6.94a4.83 4.83 0 0 1-.4-.25z"
        fill="#25F4EE"
        transform="translate(-0.8, -0.4)"
        opacity="0.95"
      />
      {/* Magenta/Red-Pink offset shadow */}
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74l-.07-.09a2.9 2.9 0 0 1 2.37-4.53c.31 0 .6.05.88.14V9.39a6.38 6.38 0 0 0-1.02-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.48l.06-.06a6.3 6.3 0 0 0 1.8-4.42V8.82c1.47.96 3.23 1.52 5.12 1.56V6.94a4.83 4.83 0 0 1-.4-.25z"
        fill="#FE2C55"
        transform="translate(0.8, 0.4)"
        opacity="0.95"
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
 * FloatingSocialBar Component
 * 
 * Renders a fixed, accessible vertical stack of three recognizable floating icons
 * at the bottom-right of the screen across all pages:
 * 1. WhatsApp (Green #25D366) with confirmed number & prefilled inquiry
 * 2. Instagram (Official purple, pink, orange, yellow gradient)
 * 3. TikTok (Black background with signature cyan and pink chromatic accents)
 * 
 * Features:
 * - Desktop hover tooltips ("Chat with us on WhatsApp", "Follow us on Instagram", "Follow us on TikTok")
 * - Mobile-friendly sizing (44px tap targets, positioned safely above bottom navigation bar)
 * - Safe handling of configured vs placeholder social URLs
 * - Zero interference with cart drawer, checkout modal, or product controls
 */
export default function FloatingSocialBar() {
  const { showToast } = useCart();
  const whatsappConfig = STORE_CONFIG.contacts.whatsapp;
  const instagramConfig = STORE_CONFIG.social.instagram;
  const tiktokConfig = STORE_CONFIG.social.tiktok;

  // Confirmed official WhatsApp link: https://wa.me/254793477288
  const whatsappPhone = (whatsappConfig?.targetNumber || '254793477288').replace(/[^0-9]/g, '');
  const whatsappPrefill = encodeURIComponent(
    whatsappConfig?.helpPrompt || "Assalamu Alaikum! I would like to enquire about products from Hikaya Kids Library."
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappPrefill}`;

  // Social URLs with fallback check
  const isInstagramReady = Boolean(instagramConfig?.isConfigured && instagramConfig?.url && instagramConfig.url !== '#');
  const isTikTokReady = Boolean(tiktokConfig?.isConfigured && tiktokConfig?.url && tiktokConfig.url !== '#');

  const handleSocialClick = (e, platform, isReady, targetUrl) => {
    if (!isReady || !targetUrl) {
      e.preventDefault();
      showToast(`Hikaya's official ${platform} profile is coming soon! Feel free to chat with us on WhatsApp.`);
    }
  };

  const actions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      tooltip: 'Chat with us on WhatsApp',
      ariaLabel: 'Chat with us on WhatsApp',
      href: whatsappUrl,
      isExternal: true,
      onClick: null,
      icon: WhatsAppGlyph,
      className: 'bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[#25D366]/30',
      ringColor: 'focus-visible:ring-[#25D366]',
      style: {}
    },
    {
      id: 'instagram',
      label: 'Instagram',
      tooltip: 'Follow us on Instagram',
      ariaLabel: 'Follow HKAYA Kids Library on Instagram (@hkaya_kids_library)',
      href: isInstagramReady ? instagramConfig.url : '#',
      isExternal: isInstagramReady,
      onClick: (e) => handleSocialClick(e, 'Instagram', isInstagramReady, instagramConfig?.url),
      icon: InstagramGlyph,
      className: 'text-white shadow-pink-500/30',
      ringColor: 'focus-visible:ring-pink-500',
      style: {
        background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
      }
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      tooltip: 'Follow us on TikTok',
      ariaLabel: 'Follow HKAYA Kids Library on TikTok (@hkaya_kids_library)',
      href: isTikTokReady ? tiktokConfig.url : '#',
      isExternal: isTikTokReady,
      onClick: (e) => handleSocialClick(e, 'TikTok', isTikTokReady, tiktokConfig?.url),
      icon: TikTokGlyph,
      className: 'bg-black text-white border border-white/10 shadow-black/40',
      ringColor: 'focus-visible:ring-cyan-400',
      style: {}
    }
  ];

  return (
    <aside
      aria-label="Contact and Social Media Channels"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3"
    >
      {actions.map((item) => {
        const GlyphComponent = item.icon;
        const tooltipId = `tooltip-${item.id}`;

        return (
          <div key={item.id} className="relative group flex items-center">
            {/* Desktop Tooltip (Shown on hover and keyboard focus) */}
            <div
              id={tooltipId}
              role="tooltip"
              className="hidden sm:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-200 ease-out z-50"
            >
              <div className="relative bg-forest-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-forest-700 tracking-wide">
                <span>{item.tooltip}</span>
                {/* Pointer arrow pointing to the icon button */}
                <div
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-forest-900 rotate-45 border-r border-t border-forest-700"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Floating Action Button */}
            <a
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onClick={item.onClick}
              aria-label={item.ariaLabel}
              aria-describedby={tooltipId}
              style={item.style}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${item.className} ${item.ringColor}`}
            >
              <GlyphComponent className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        );
      })}
    </aside>
  );
}
