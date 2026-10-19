import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { POLICIES, POLICIES_METADATA } from '../data/policies';
import {
  ShieldCheck,
  FileText,
  Truck,
  RotateCcw,
  CreditCard,
  MessageCircle,
  Mail,
  Home,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Calendar,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const iconMap = {
  ShieldCheck,
  FileText,
  Truck,
  RotateCcw,
  CreditCard
};

export default function PoliciesView() {
  const { navigateTo, policySection, setPolicySection } = useStore();
  const [activeSection, setActiveSection] = useState(policySection || 'privacy');

  // Synchronize with external policySection changes (e.g. from footer click)
  useEffect(() => {
    if (policySection) {
      setActiveSection(policySection);
      const el = document.getElementById(policySection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [policySection]);

  // Modern scrollspy to sync active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const policy of POLICIES) {
        const el = document.getElementById(policy.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(policy.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setPolicySection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const whatsapp = STORE_CONFIG.contacts.whatsapp;
  const whatsappUrl = `https://wa.me/254793477288?text=${encodeURIComponent(
    whatsapp?.helpPrompt || "Assalamu Alaikum! I would like to enquire about products from Hikaya Kids Library."
  )}`;

  return (
    <div className="min-h-screen bg-[#FFF9F1] text-charcoal pb-16 sm:pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-sand-100/70 border-b border-sand-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-charcoal-muted" aria-label="Breadcrumb">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1 hover:text-[#F97316] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-sand-300" />
            <span className="text-gray-900 font-bold">Our Policies</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Store Standards & Customer Care</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-semibold text-gray-900 tracking-tight">
            Our Policies
          </h1>

          <p className="text-base sm:text-lg text-charcoal-light mt-3 leading-relaxed">
            “We want shopping with Hikaya to be clear, convenient, and reassuring. Please review our policies before placing an order.”
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-charcoal-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sand-200/80 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Last updated: {POLICIES_METADATA.lastUpdated}</span>
            </span>
            <span className="text-sand-300">•</span>
            <span>Applicable across East Africa</span>
          </div>
        </div>

        {/* Mobile Horizontal Navigation Tabs (Sticky Strip) */}
        <div className="lg:hidden sticky top-16 z-30 bg-[#FFF9F1]/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-sand-200/80 mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {POLICIES.map((p) => {
              const Icon = iconMap[p.icon] || ShieldCheck;
              const isActive = activeSection === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleNavClick(p.id)}
                  aria-current={isActive ? 'true' : 'false'}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'bg-white border border-sand-200 text-charcoal hover:bg-sand-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Desktop Sticky Sidebar + Long-form Policy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Desktop Sticky Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-sand-200/90 shadow-soft">
              <h2 className="text-xs font-bold text-[#F97316] uppercase tracking-wider px-3 mb-3">
                Policy Navigation
              </h2>

              <nav className="space-y-1.5" aria-label="Policies Table of Contents">
                {POLICIES.map((p) => {
                  const Icon = iconMap[p.icon] || ShieldCheck;
                  const isActive = activeSection === p.id;

                  return (
                    <button
                      key={p.id}
                      onClick={() => handleNavClick(p.id)}
                      aria-current={isActive ? 'true' : 'false'}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 group ${
                        isActive
                          ? 'bg-orange-50 text-[#C2410C] font-bold border-l-4 border-[#F97316] shadow-2xs'
                          : 'text-charcoal-muted hover:bg-sand-50 hover:text-charcoal'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-orange-100 text-[#F97316]' : 'bg-sand-100 text-charcoal-muted group-hover:text-charcoal'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm block truncate">
                          {p.title}
                        </span>
                        <span className="text-[11px] font-normal text-charcoal-muted block truncate mt-0.5">
                          {p.shortTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Quick Assistance Card */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FFF9F1] border border-sand-200/80 space-y-2">
                <span className="text-xs font-bold text-gray-900 block">
                  Questions About an Order?
                </span>
                <p className="text-[11px] text-charcoal-muted leading-relaxed">
                  Our customer care team is available to assist with deliveries, book recommendations, and exchanges.
                </p>
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#F97316] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                >
                  <span>Contact Customer Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Policy Sections */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            {POLICIES.map((policy) => {
              const Icon = iconMap[policy.icon] || ShieldCheck;

              return (
                <section
                  key={policy.id}
                  id={policy.id}
                  className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-10 border border-sand-200/90 shadow-soft hover:shadow-md transition-shadow"
                  aria-labelledby={`${policy.id}-heading`}
                >
                  {/* Policy Header */}
                  <div className="flex items-start gap-4 pb-6 border-b border-sand-100">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2
                        id={`${policy.id}-heading`}
                        className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight"
                      >
                        {policy.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
                        {policy.summary}
                      </p>
                    </div>
                  </div>

                  {/* Policy Subsections */}
                  <div className="pt-6 space-y-6">
                    {policy.sections.map((sub, idx) => (
                      <div key={idx} className="space-y-2">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">
                          {sub.heading}
                        </h3>
                        <div className="text-xs sm:text-sm text-charcoal-light leading-relaxed whitespace-pre-line pl-1 border-l-2 border-orange-200">
                          {sub.content}
                        </div>
                      </div>
                    ))}

                    {/* Enhanced Payment Badges for Payments Section */}
                    {policy.id === 'payments' && (
                      <div className="mt-6 pt-5 border-t border-sand-100">
                        <div className="flex items-center justify-between mb-3.5">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                              <CreditCard className="w-4 h-4 text-[#F97316]" />
                              <span>Secure Payments</span>
                            </h4>
                            <p className="text-xs text-charcoal-muted mt-0.5">
                              We accept secure payment methods.
                            </p>
                          </div>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                            100% Encrypted & PCI Verified
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-xl">
                          <div className="bg-[#FFF9F1] rounded-2xl p-2.5 sm:p-3 border border-sand-200 shadow-2xs flex flex-col items-center justify-center h-20 gap-1.5 hover:border-[#F97316]/60 transition-all group">
                            <img src="/images/reference/payment-mpesa.png" alt="M-PESA" className="max-h-7 sm:max-h-8 max-w-full object-contain group-hover:scale-105 transition-transform" />
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800">M-PESA</span>
                          </div>
                          <div className="bg-[#FFF9F1] rounded-2xl p-2.5 sm:p-3 border border-sand-200 shadow-2xs flex flex-col items-center justify-center h-20 gap-1.5 hover:border-[#F97316]/60 transition-all group">
                            <img src="/images/reference/payment-pesapal.png" alt="Pesapal" className="max-h-7 sm:max-h-8 max-w-full object-contain group-hover:scale-105 transition-transform" />
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800">Pesapal</span>
                          </div>
                          <div className="bg-[#FFF9F1] rounded-2xl p-2.5 sm:p-3 border border-sand-200 shadow-2xs flex flex-col items-center justify-center h-20 gap-1.5 hover:border-[#F97316]/60 transition-all group">
                            <img src="/images/reference/payment-visa.png" alt="Visa" className="max-h-7 sm:max-h-8 max-w-full object-contain group-hover:scale-105 transition-transform" />
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800">Visa</span>
                          </div>
                          <div className="bg-[#FFF9F1] rounded-2xl p-2.5 sm:p-3 border border-sand-200 shadow-2xs flex flex-col items-center justify-center h-20 gap-1.5 hover:border-[#F97316]/60 transition-all group">
                            <img src="/images/reference/payment-mastercard.png" alt="Mastercard" className="max-h-7 sm:max-h-8 max-w-full object-contain group-hover:scale-105 transition-transform" />
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800">Mastercard</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Direct WhatsApp Action for Exchange Policy */}
                    {policy.id === 'returns' && (
                      <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-900 block">
                              Request an Exchange via WhatsApp
                            </span>
                            <span className="text-[11px] text-emerald-700">
                              Direct Support: 0793 477 288 (Within 72 Hours)
                            </span>
                          </div>
                        </div>
                        <a
                          href="https://wa.me/254793477288"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                        >
                          <span>Open WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Policy Footer Note */}
                  <div className="mt-8 pt-4 border-t border-sand-100 flex items-center justify-between text-[11px] text-charcoal-muted">
                    <span>Hikaya Kids Library • Kenya</span>
                    <button
                      onClick={() => handleNavClick(policy.id)}
                      className="hover:text-[#F97316] transition-colors"
                    >
                      Back to top of section ↑
                    </button>
                  </div>
                </section>
              );
            })}

            {/* Need Help CTA Banner */}
            <section
              aria-labelledby="policies-help-heading"
              className="rounded-3xl bg-[#F97316] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Customer Support</span>
                </div>

                <h2
                  id="policies-help-heading"
                  className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight"
                >
                  Need help with an order?
                </h2>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  “If you have questions about an order or any of our policies, please contact Hikaya through the customer-support options available on our website.”
                </p>

                {/* Direct Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="px-6 py-3.5 rounded-2xl bg-white text-[#F97316] hover:bg-orange-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/254793477288"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                    aria-label="Chat with Hikaya support on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp: 0793 477 288</span>
                  </a>

                  <a
                    href="mailto:info@hikayakidslibrary.co.ke"
                    className="px-5 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </a>
                </div>

                <div className="pt-2 text-xs text-white/80 flex items-center gap-2">
                  <span>Mombasa, Kenya</span>
                  <span>•</span>
                  <span>info@hikayakidslibrary.co.ke</span>
                  <span>•</span>
                  <span>0793 477 288</span>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
