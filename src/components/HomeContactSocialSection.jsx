import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

/**
 * Hikaya Kids Library - Homepage Contact and Social Media Section (Section 6)
 * Displays business email, phone number, WhatsApp, and social media handles (Instagram, TikTok) as configured.
 */
export default function HomeContactSocialSection() {
  const { navigateTo } = useStore();
  const { email, phone, whatsapp } = STORE_CONFIG.contacts;
  const { instagram, tiktok } = STORE_CONFIG.social;

  const whatsappUrl = whatsapp.targetNumber
    ? `https://wa.me/${whatsapp.targetNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsapp.helpPrompt || "Hello Hikaya Kids Library! I have an inquiry about books and educational materials.")}`
    : `https://wa.me/?text=${encodeURIComponent(whatsapp.helpPrompt || "Hello Hikaya Kids Library! I have an inquiry about books and educational materials.")}`;

  return (
    <section id="home-contact-social" className="py-16 sm:py-20 bg-sand-100/60 border-b border-sand-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/90 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Connect with Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
            Contact & Follow Hikaya
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted mt-2 leading-relaxed">
            Have a question about a storybook, school supplies, or delivery across Kenya? We are delighted to assist you.
          </p>
        </div>

        {/* Contact & Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Direct Business Contact */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200/90 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center mb-5 border border-terracotta-100 shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold text-forest-900 mb-1">
                Email & Phone
              </h3>
              <p className="text-xs text-charcoal-muted mb-4">
                Reach our customer care team directly.
              </p>

              <div className="space-y-3 pt-2 border-t border-sand-100">
                {/* Email */}
                {email && email.address && (
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block">
                        Email Inquiries
                      </span>
                      <a
                        href={`mailto:${email.address}`}
                        className="text-xs sm:text-sm font-semibold text-forest-900 hover:text-terracotta-600 hover:underline transition-colors"
                      >
                        {email.address}
                      </a>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {phone && phone.displayNumber && (
                  <div className="flex items-start gap-2.5 pt-1">
                    <Phone className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block">
                        Telephone Support
                      </span>
                      <a
                        href={phone.isConfigured && phone.rawNumber ? `tel:${phone.rawNumber}` : '#'}
                        className="text-xs sm:text-sm font-semibold text-forest-900 hover:text-terracotta-600 hover:underline transition-colors"
                      >
                        {phone.displayNumber}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5 pt-1">
                  <MapPin className="w-4 h-4 text-sand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-xs text-charcoal-light font-medium">
                      {STORE_CONFIG.brand.locationNotes} • Kenya
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-sand-100">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-sand-50 hover:bg-terracotta-50 text-forest-900 hover:text-terracotta-700 font-bold text-xs transition-colors"
              >
                <span>Visit Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: WhatsApp Instant Chat */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200/90 shadow-soft flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none" />

            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 border border-emerald-100 shadow-2xs">
                <MessageCircle className="w-5 h-5" />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-forest-900">
                  WhatsApp Orders
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Quick Reply
                </span>
              </div>

              <p className="text-xs text-charcoal-muted mb-4 leading-relaxed">
                Chat with our team for quick book recommendations, custom school bundles, or gift wrapping.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-sand-100 text-xs text-charcoal-light">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Number: {whatsapp.displayNumber || "+254 700 000 000"}</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-muted">
                  <Clock className="w-3.5 h-3.5 text-sand-500" />
                  <span>Mon – Sat: 8:30 AM – 6:00 PM EAT</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-sand-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-soft transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Card 3: Social Media Channels */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200/90 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 border border-purple-100 shadow-2xs">
                <InstagramIcon className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold text-forest-900 mb-1">
                Follow Hikaya
              </h3>
              <p className="text-xs text-charcoal-muted mb-4">
                Join our community of young readers, parents, and educators in Kenya.
              </p>

              <div className="space-y-3 pt-2 border-t border-sand-100">
                {/* Instagram */}
                {instagram && instagram.isConfigured && (
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-pink-50/70 hover:bg-pink-100/90 border border-pink-200/70 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-xs">
                        <InstagramIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-forest-900 block group-hover:text-pink-700 transition-colors">
                          Instagram
                        </span>
                        <span className="text-[11px] text-charcoal-muted">
                          {instagram.handle || "@hikayakids"}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-sand-400 group-hover:text-pink-600 transition-colors mr-1" />
                  </a>
                )}

                {/* TikTok */}
                {tiktok && tiktok.isConfigured && (
                  <a
                    href={tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                        <TikTokIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-forest-900 block group-hover:text-terracotta-700 transition-colors">
                          TikTok
                        </span>
                        <span className="text-[11px] text-charcoal-muted">
                          {tiktok.handle || "@hikayakids"}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-sand-400 group-hover:text-charcoal transition-colors mr-1" />
                  </a>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-sand-100 flex items-center justify-between text-xs text-charcoal-muted">
              <span>Stories, updates & new arrivals</span>
              <ShieldCheck className="w-4 h-4 text-forest-700" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
