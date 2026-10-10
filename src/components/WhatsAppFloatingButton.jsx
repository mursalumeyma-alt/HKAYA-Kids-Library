import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const whatsappConfig = STORE_CONFIG.contacts.whatsapp;

  // Use configured business number from storeConfig, or fall back to prefilled message if unconfigured
  const phone = (whatsappConfig.targetNumber || '').replace(/[^0-9]/g, '');
  const defaultText = encodeURIComponent(
    whatsappConfig.helpPrompt || "Hello HKAYA Kids Library! I would like to inquire about children's books and learning resources."
  );

  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${defaultText}`
    : `https://wa.me/?text=${defaultText}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with HKAYA Kids Library on WhatsApp"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-bold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
