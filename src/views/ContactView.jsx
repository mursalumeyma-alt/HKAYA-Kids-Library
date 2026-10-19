import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { InstagramIcon, TikTokIcon } from '../components/SocialIcons';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  Home,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Heart
} from 'lucide-react';

export default function ContactView() {
  const { navigateTo } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Book & Product Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const { email, phone, whatsapp, supportHours } = STORE_CONFIG.contacts;
  const { instagram, tiktok } = STORE_CONFIG.social;

  const whatsappUrl = whatsapp.targetNumber
    ? `https://wa.me/${whatsapp.targetNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsapp.helpPrompt || "Hello Hikaya Kids Library! I would like to inquire about children's books and learning resources.")}`
    : `https://wa.me/?text=${encodeURIComponent(whatsapp.helpPrompt || "Hello Hikaya Kids Library! I would like to inquire about children's books and learning resources.")}`;

  return (
    <div className="min-h-screen bg-[#FFF9F1] py-8 sm:py-14 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-6" aria-label="Breadcrumb">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1 hover:text-terracotta-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          <span className="font-bold text-forest-900">Contact Us</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>GET IN TOUCH</span>
          </div>

          {/* Friendly Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-forest-900 tracking-tight">
            We'd Love to Hear from You!
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed max-w-2xl mx-auto">
            “Have a question about a book, school essential, order, or delivery? Get in touch with Hikaya.”
          </p>
        </div>

        {/* Contact Grid: Info Cards + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1. Business Email Card (Clickable mailto: link) */}
            {email && email.address && (
              <div className="p-6 rounded-3xl bg-white border border-sand-200/90 shadow-soft hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-base text-forest-900">
                      Business Email
                    </h2>
                    <p className="text-xs text-charcoal-muted mt-1">
                      For general inquiries, school orders, and partnerships.
                    </p>
                    <a
                      href={`mailto:${email.address}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 hover:text-terracotta-800 hover:underline mt-2.5 transition-colors"
                      aria-label={`Send email to ${email.address}`}
                    >
                      <span>{email.address}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Business Phone Card (Clickable tel: link) */}
            {phone && phone.displayNumber && (
              <div className="p-6 rounded-3xl bg-white border border-sand-200/90 shadow-soft hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-base text-forest-900">
                      Business Phone
                    </h2>
                    <p className="text-xs text-charcoal-muted mt-1">
                      Direct customer assistance and order support.
                    </p>
                    {phone.isConfigured && phone.rawNumber ? (
                      <a
                        href={`tel:${phone.rawNumber}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-800 hover:text-forest-900 hover:underline mt-2.5 transition-colors"
                        aria-label={`Call Hikaya at ${phone.displayNumber}`}
                      >
                        <span>{phone.displayNumber}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-charcoal-muted mt-2">
                        {phone.displayNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. WhatsApp Support Card (if configured) */}
            {whatsapp && whatsapp.isConfigured && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-3xl bg-white border border-sand-200/90 shadow-soft hover:shadow-md hover:border-emerald-400 transition-all group"
                aria-label="Chat with Hikaya on WhatsApp (opens in new tab)"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-base text-forest-900">
                        WhatsApp Support
                      </h2>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Fastest Reply
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      Message us directly for book recommendations, order updates, and quick questions.
                    </p>
                    <p className="text-sm font-bold text-emerald-700 mt-2.5 flex items-center gap-1 group-hover:underline">
                      <span>{whatsapp.displayNumber || "Chat on WhatsApp"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </div>
              </a>
            )}

            {/* 4. Follow HKAYA Kids Library (Instagram and TikTok Profile Links) */}
            {((instagram && instagram.isConfigured && instagram.url) || (tiktok && tiktok.isConfigured && tiktok.url)) && (
              <div className="p-6 rounded-3xl bg-white border border-sand-200/90 shadow-soft space-y-4">
                <div>
                  <h2 className="font-bold text-base text-forest-900">
                    Follow HKAYA Kids Library
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Connect with our community on Instagram and TikTok for learning ideas, book recommendations, and new arrivals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Instagram Link */}
                  {instagram && instagram.isConfigured && instagram.url && (
                    <a
                      href={instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow HKAYA Kids Library on Instagram (@hkaya_kids_library) - opens in new tab"
                      className="p-3.5 rounded-2xl bg-sand-50/80 hover:bg-pink-50 border border-sand-200 hover:border-pink-300 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-sand-200/70 flex items-center justify-center text-charcoal group-hover:text-pink-600 transition-colors shadow-2xs">
                          <InstagramIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-forest-900 block group-hover:text-pink-600 transition-colors">
                            Instagram
                          </span>
                          <span className="text-[11px] text-charcoal-muted">
                            {instagram.handle || "@hkaya_kids_library"}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-sand-400 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  )}

                  {/* TikTok Link */}
                  {tiktok && tiktok.isConfigured && tiktok.url && (
                    <a
                      href={tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow HKAYA Kids Library on TikTok (@hkaya_kids_library) - opens in a new tab"
                      className="p-3.5 rounded-2xl bg-sand-50/80 hover:bg-sand-200 border border-sand-200 hover:border-charcoal/40 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-sand-200/70 flex items-center justify-center text-charcoal shadow-2xs">
                          <TikTokIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-forest-900 block group-hover:text-charcoal transition-colors">
                            TikTok
                          </span>
                          <span className="text-[11px] text-charcoal-muted">
                            {tiktok.handle || "@hkaya_kids_library"}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-sand-400 group-hover:text-charcoal group-hover:translate-x-0.5 transition-all" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* 5. Customer Support Hours (Displayed ONLY if confirmed) */}
            {supportHours && supportHours.isConfirmed && (
              <div className="p-6 rounded-3xl bg-white border border-sand-200/90 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sand-200 text-charcoal flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-forest-900">
                      Customer Support Hours
                    </h2>
                    <p className="text-xs text-charcoal-muted mt-1">
                      {supportHours.days}: {supportHours.hours}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Location & Delivery Context */}
            <div className="p-6 rounded-3xl bg-cream-100/90 border border-sand-200/90 text-xs text-charcoal-muted space-y-2">
              <div className="flex items-center gap-2 font-semibold text-forest-900">
                <MapPin className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>{STORE_CONFIG.brand.locationNotes}</span>
              </div>
              <p className="leading-relaxed">
                Online orders are accepted 24/7 with reliable doorstep delivery across Nairobi and all counties in Kenya.
              </p>
            </div>

          </div>

          {/* Right: Message Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand-200/90 shadow-soft">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-forest-900">
                    Thank You for Reaching Out!
                  </h2>
                  <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
                    We have received your message. Our team at Hikaya Kids Library will get back to you shortly via email or phone.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl border border-sand-300 text-xs font-bold text-charcoal hover:bg-sand-100 transition-colors"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={() => navigateTo('categories')}
                      className="px-6 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold transition-colors"
                    >
                      Browse Categories
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Customer inquiry form">
                  <div>
                    <h2 className="text-xl font-bold text-forest-900">Send Us a Message</h2>
                    <p className="text-xs text-charcoal-muted mt-1">
                      Fill out the form below and we'll reply as soon as possible.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-charcoal-muted mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Amina Hassan"
                        className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-charcoal-muted mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. amina@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-charcoal-muted mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0712 345 678"
                        className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-charcoal-muted mb-1.5">
                        Topic
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all"
                      >
                        <option value="Book & Product Inquiry">Book & Product Inquiry</option>
                        <option value="School Bags & Stationery">School Bags & Stationery</option>
                        <option value="Educational Toys">Educational Toys</option>
                        <option value="Custom Gift Hampers">Custom Gift Hampers</option>
                        <option value="Order & Delivery Status">Order & Delivery Status</option>
                        <option value="Bulk / School Orders">Bulk / School Orders</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-charcoal-muted mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what books, school supplies, or learning materials you are looking for..."
                      className="w-full px-4 py-3 rounded-2xl bg-cream-50 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm tracking-wide shadow-soft transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
