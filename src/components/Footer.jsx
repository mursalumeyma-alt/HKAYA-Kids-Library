import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import HkayaLogo from './HkayaLogo';
import {
  MessageCircle,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  Instagram,
  Facebook,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-sand-100 text-charcoal border-t border-sand-200/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-sand-200">
          {/* Column 1: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <HkayaLogo onClick={() => navigateTo('home')} />

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm">
              {STORE_CONFIG.brand.mission}
            </p>

            <div className="pt-2 text-xs text-charcoal-muted space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>{STORE_CONFIG.brand.locationNotes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest-700 shrink-0" />
                <span>{STORE_CONFIG.contacts.email.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {STORE_CONFIG.contacts.whatsapp.label}: {STORE_CONFIG.contacts.whatsapp.displayNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div>
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wider mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-muted">
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'books' })}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Books & Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'stationery' })}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Stationery & Journals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'islamic' })}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Islamic Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'toys' })}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Toys & Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'gifts' })}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Curated Gift Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('digital')}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Digital Resources
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: About Hkaya */}
          <div>
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wider mb-4">
              About Hkaya
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-muted">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Our Story & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Why Hkaya
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('reading-corner')}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Reading Corner Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-terracotta-700 transition-colors"
                >
                  Children's Library Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div>
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-forest-900 font-semibold block">
                  Secure Payments
                </span>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  M-Pesa • Mobile Money • Visa • Mastercard
                </p>
              </div>
              <div>
                <span className="text-forest-900 font-semibold block">
                  Shop With Confidence
                </span>
                <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
                  Quality kids' books, secure checkout, and reliable delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>
            © {STORE_CONFIG.brand.establishedYear} {STORE_CONFIG.brand.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-forest-900 font-medium">
            <span>{STORE_CONFIG.brand.tagline}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
          </p>

          <p className="text-[11px] text-charcoal-muted/80">
            Proudly serving families in Nairobi & across Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
