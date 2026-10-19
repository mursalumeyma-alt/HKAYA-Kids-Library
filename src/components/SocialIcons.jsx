import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';

/**
 * Recognizable Instagram SVG icon
 */
export function InstagramIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Recognizable TikTok SVG icon
 */
export function TikTokIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.088a2.896 2.896 0 0 1 2.37-4.527c.306 0 .602.048.88.138V9.387a6.376 6.376 0 0 0-1.02-.082 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.482l.06-.063a6.3 6.3 0 0 0 1.8-4.419V8.817c1.47.96 3.23 1.523 5.124 1.564V6.936a4.834 4.834 0 0 1-.41-.25z" />
    </svg>
  );
}

/**
 * Reusable Follow Hikaya Social Links Component
 * Renders Instagram and TikTok links safely with proper security attributes
 * (target="_blank", rel="noopener noreferrer") and accessible labels.
 */
export function SocialFollowLinks({ variant = "default", className = "" }) {
  const { instagram, tiktok } = STORE_CONFIG.social;

  // Filter only configured social profiles to prevent broken/misleading links
  const socialList = [
    {
      key: 'instagram',
      config: instagram,
      icon: InstagramIcon,
      hoverClass: 'hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50'
    },
    {
      key: 'tiktok',
      config: tiktok,
      icon: TikTokIcon,
      hoverClass: 'hover:text-charcoal hover:border-charcoal hover:bg-sand-100'
    }
  ].filter(item => item.config && item.config.isConfigured && item.config.url);

  if (socialList.length === 0) return null;

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {socialList.map(({ key, config, icon: IconComponent, hoverClass }) => (
          <a
            key={key}
            href={config.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${config.label} (opens in a new tab)`}
            className={`w-9 h-9 rounded-xl bg-white border border-sand-200/90 text-charcoal-light flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 ${hoverClass}`}
          >
            <IconComponent className="w-4 h-4" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 ${className}`}>
        {socialList.map(({ key, config, icon: IconComponent, hoverClass }) => (
          <a
            key={key}
            href={config.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${config.label} (opens in a new tab)`}
            className={`p-4 rounded-2xl bg-white border border-sand-200/90 shadow-2xs flex items-center justify-between transition-all group hover:shadow-md ${hoverClass}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center text-charcoal group-hover:scale-110 transition-transform">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-forest-900 block group-hover:text-terracotta-700 transition-colors">
                  {config.platform}
                </span>
                <span className="text-xs text-charcoal-muted">
                  {config.handle || config.label}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-terracotta-600 group-hover:translate-x-1 transition-transform">
              Follow →
            </span>
          </a>
        ))}
      </div>
    );
  }

  // Default pill style
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socialList.map(({ key, config, icon: IconComponent, hoverClass }) => (
        <a
          key={key}
          href={config.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${config.label} (opens in a new tab)`}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-sand-200/90 text-xs font-bold text-charcoal-light transition-all shadow-2xs hover:shadow-sm ${hoverClass}`}
        >
          <IconComponent className="w-4 h-4" />
          <span>{config.platform}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialFollowLinks;
