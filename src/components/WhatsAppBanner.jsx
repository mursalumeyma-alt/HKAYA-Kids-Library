import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function WhatsAppBanner({ className = "" }) {
  const whatsappConfig = STORE_CONFIG.contacts.whatsapp;
  const phone = whatsappConfig.targetNumber || '254700000000';
  const defaultText = encodeURIComponent('Hello HKAYA Kids Library! Need help finding the right book or gift for my child.');
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${defaultText}`;

  return (
    <div id="whatsapp-banner" className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-cream-50 to-emerald-50/70 border border-emerald-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-5 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <MessageCircle className="w-6 h-6 fill-current" />
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Personal Book & Gift Guidance</span>
          </p>
          <h3 className="text-base sm:text-lg font-bold text-forest-900 leading-snug max-w-xl">
            Need help finding the right book or gift for your child? Chat with our team on WhatsApp.
          </h3>
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with HKAYA Kids Library"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-soft hover:shadow-soft-hover transition-all duration-200 shrink-0 transform hover:-translate-y-0.5"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
