import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import HkayaLogo from './HkayaLogo';
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';

export default function Footer() {
  const { navigateTo } = useStore();

  const { email, phone } = STORE_CONFIG.contacts;
  const { instagram, tiktok } = STORE_CONFIG.social;

  return (
    <footer className="w-full text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Main Footer Section (Rich Terracotta #F97316) */}
      <div className="bg-[#F97316] pt-12 pb-10 sm:pt-14 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            
            {/* Column 1: Hikaya Logo, Tagline & Direct Contact */}
            <div className="space-y-4">
              <HkayaLogo
                variant="footer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigateTo('home');
                }}
              />

              <p className="text-xs text-white/90 leading-relaxed">
                {STORE_CONFIG.brand.tagline}
              </p>

              <div className="space-y-2 pt-1 text-xs text-white/95">
                <a
                  href={`tel:${phone.rawNumber || '+254793477288'}`}
                  className="flex items-center gap-2 hover:text-white/80 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  <span>0793 477 288</span>
                </a>

                <a
                  href={`mailto:${email.address || 'info@hikayakidslibrary.co.ke'}`}
                  className="flex items-center gap-2 hover:text-white/80 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  <span>info@hikayakidslibrary.co.ke</span>
                </a>

                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-bold text-sm tracking-wide mb-3 sm:mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs text-white/90">
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('home');
                    }}
                    className="flex items-center justify-between w-full max-w-[130px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Home</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('shop');
                    }}
                    className="flex items-center justify-between w-full max-w-[130px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Shop</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('about');
                    }}
                    className="flex items-center justify-between w-full max-w-[130px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>About Us</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('contact');
                    }}
                    className="flex items-center justify-between w-full max-w-[130px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Contact Us</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('policies');
                    }}
                    className="flex items-center justify-between w-full max-w-[130px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Policies</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h3 className="font-bold text-sm tracking-wide mb-3 sm:mb-4 text-white">
                Customer Service
              </h3>
              <ul className="space-y-2 text-xs text-white/90">
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('policies', { section: 'shipping' });
                    }}
                    className="flex items-center justify-between w-full max-w-[150px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Shipping Policy</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('policies', { section: 'returns' });
                    }}
                    className="flex items-center justify-between w-full max-w-[150px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Exchange Policy</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('policies', { section: 'payments' });
                    }}
                    className="flex items-center justify-between w-full max-w-[150px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Payment Options</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('contact');
                    }}
                    className="flex items-center justify-between w-full max-w-[150px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>FAQs</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigateTo('contact');
                    }}
                    className="flex items-center justify-between w-full max-w-[150px] hover:text-white hover:translate-x-0.5 transition-all text-left"
                  >
                    <span>Support</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div>
              <h3 className="font-bold text-sm tracking-wide mb-3 sm:mb-4 text-white">
                Follow Us
              </h3>
              <p className="text-xs text-white/90 leading-relaxed mb-4">
                Stay connected for updates, new arrivals and more!
              </p>
              
              <div className="space-y-3 text-xs">
                {instagram && instagram.url && (
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-white/95 hover:text-white transition-colors group py-0.5"
                    aria-label="Follow HKAYA Kids Library on Instagram (@hkaya_kids_library) - opens in a new tab"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <InstagramIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="leading-tight">
                      <span className="font-semibold block text-xs">Instagram</span>
                      <span className="text-[11px] text-white/80">{instagram.handle || '@hkaya_kids_library'}</span>
                    </div>
                  </a>
                )}

                {tiktok && tiktok.url && (
                  <a
                    href={tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-white/95 hover:text-white transition-colors group py-0.5"
                    aria-label="Follow HKAYA Kids Library on TikTok (@hkaya_kids_library) - opens in a new tab"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <TikTokIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="leading-tight">
                      <span className="font-semibold block text-xs">TikTok</span>
                      <span className="text-[11px] text-white/80">{tiktok.handle || '@hkaya_kids_library'}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Column 5: Secure Payments */}
            <div>
              <h3 className="font-bold text-sm tracking-wide mb-3 sm:mb-4 text-white">
                Secure Payments
              </h3>
              <p className="text-xs text-white/90 leading-relaxed mb-3.5">
                We accept secure payment methods:
              </p>

              {/* 2x2 Payment Badge Grid */}
              <div className="grid grid-cols-2 gap-2 max-w-[160px]">
                {/* M-PESA */}
                <div className="bg-white rounded-md p-1.5 flex items-center justify-center shadow-2xs h-7">
                  <img
                    src="/images/reference/payment-mpesa.png"
                    alt="M-PESA"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Pesapal */}
                <div className="bg-white rounded-md p-1.5 flex items-center justify-center shadow-2xs h-7">
                  <img
                    src="/images/reference/payment-pesapal.png"
                    alt="Pesapal"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* VISA */}
                <div className="bg-white rounded-md p-1.5 flex items-center justify-center shadow-2xs h-7">
                  <img
                    src="/images/reference/payment-visa.png"
                    alt="Visa"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Mastercard */}
                <div className="bg-white rounded-md p-1.5 flex items-center justify-center shadow-2xs h-7">
                  <img
                    src="/images/reference/payment-mastercard.png"
                    alt="Mastercard"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Sub-footer: Dark Terracotta Bar (#C2410C) */}
      <div className="bg-[#C2410C] py-3.5 text-center text-xs text-white/90 font-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© 2025 Hikaya Kids Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
