import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  X,
  ShieldCheck,
  FileText,
  Truck,
  RotateCcw,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const POLICIES_DATA = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How we protect your personal and payment information',
    icon: ShieldCheck,
    color: 'text-forest-700 bg-forest-100',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal-light leading-relaxed">
        <p>
          At <strong>Hikaya Kids Library (حكاية)</strong>, we take your family's privacy and data security seriously. We collect only the information necessary to fulfill orders and provide dependable customer service across Kenya.
        </p>

        <h4 className="font-bold text-forest-900 text-sm mt-3">1. Information We Collect</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal-muted">
          <li><strong>Contact Details:</strong> Your name, phone number, and delivery address to coordinate delivery via local couriers.</li>
          <li><strong>Email Address:</strong> Used strictly for order receipts, dispatch updates, and customer inquiries.</li>
          <li><strong>Order History:</strong> Stored securely in our backend database to help resolve order inquiries.</li>
        </ul>

        <h4 className="font-bold text-forest-900 text-sm mt-3">2. Payment Security</h4>
        <p>
          <strong>We never store your M-Pesa PIN, card numbers, or banking credentials.</strong> M-Pesa transactions are handled through Safaricom's official Daraja STK Push prompt directly on your device. Card payments are processed by PCI-DSS compliant tokenized gateways.
        </p>

        <h4 className="font-bold text-forest-900 text-sm mt-3">3. No Third-Party Sharing</h4>
        <p>
          We do not sell, rent, or trade your contact information with third-party advertisers or external marketing lists. Contact details are shared only with vetted dispatch riders for the sole purpose of delivering your parcel.
        </p>
      </div>
    )
  },

  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    subtitle: 'Guidelines for shopping at Hikaya Kids Library',
    icon: FileText,
    color: 'text-terracotta-700 bg-terracotta-100',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal-light leading-relaxed">
        <p>
          Welcome to <strong>Hikaya Kids Library</strong>. By accessing our catalog and purchasing products, you agree to these clear terms of service.
        </p>

        <h4 className="font-bold text-forest-900 text-sm mt-3">1. Product Quality & Catalog</h4>
        <p>
          All children's books, school supplies, bags, lunch boxes, and educational toys displayed on our platform are described with accurate specifications and photographs. We strive to maintain updated stock counts through our live catalog.
        </p>

        <h4 className="font-bold text-forest-900 text-sm mt-3">2. Pricing & Currency</h4>
        <p>
          All prices are listed in <strong>Kenyan Shillings (KSh)</strong>. Prices are verified by our backend server before any payment prompt is initiated.
        </p>

        <h4 className="font-bold text-forest-900 text-sm mt-3">3. Order Fulfillment</h4>
        <p>
          Orders placed on the website are verified and packed with care. Delivery is coordinated throughout Nairobi and across all counties in Kenya upon successful payment confirmation.
        </p>
      </div>
    )
  },

  shipping: {
    id: 'shipping',
    title: 'Shipping Policy',
    subtitle: 'Fast delivery across East Africa with same-day and next-day dispatch',
    icon: Truck,
    color: 'text-orange-700 bg-orange-100',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal-light leading-relaxed">
        <div className="p-4 rounded-2xl bg-[#FFF9F1] border border-orange-200">
          <p className="font-bold text-sm text-gray-900 mb-2">🚚 We deliver across East Africa.</p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-700">
            <li><strong>Same-day delivery:</strong> In Mombasa and Nairobi for orders placed before 3:00 PM.</li>
            <li><strong>Next-day delivery:</strong> For countrywide orders placed after 3:00 PM.</li>
            <li><strong>2–3 day delivery:</strong> For areas outside Nairobi and Mombasa.</li>
          </ul>
        </div>
        <p className="text-xs sm:text-sm text-gray-700">
          You&apos;ll receive a confirmation once your order is out for delivery.
        </p>
        <p className="text-xs sm:text-sm text-gray-700 font-medium">
          Shipping cost is calculated at checkout, and free pickup is available from our physical store.
        </p>
      </div>
    )
  },

  returns: {
    id: 'returns',
    title: 'Exchange Policy',
    subtitle: 'Exchanges within 72 hours of delivery for unused items',
    icon: RotateCcw,
    color: 'text-orange-700 bg-orange-100',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal-light leading-relaxed">
        <div className="p-4 rounded-2xl bg-[#FFF9F1] border border-orange-200">
          <p className="font-bold text-sm text-gray-900 mb-2">🔁 We accept exchanges within 72 hours of delivery.</p>
          <p className="text-xs sm:text-sm text-gray-700 mb-1.5 font-medium">Items must be:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-700">
            <li>Unused.</li>
            <li>In their original condition and packaging.</li>
          </ul>
        </div>
        <p className="text-xs sm:text-sm text-gray-700">
          We do not offer refunds, but we&apos;re happy to assist with an exchange.
        </p>
        <div className="pt-2">
          <p className="text-xs text-gray-600 mb-2">To request an exchange, contact us via WhatsApp:</p>
          <a
            href="https://wa.me/254793477288"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>WhatsApp: 0793 477 288</span>
          </a>
        </div>
      </div>
    )
  },

  payments: {
    id: 'payments',
    title: 'Payment Options',
    subtitle: 'Secure and verified payment methods',
    icon: CreditCard,
    color: 'text-orange-700 bg-orange-100',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal-light leading-relaxed">
        <p className="text-xs sm:text-sm text-gray-700">
          We accept the following secure payment methods:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-white rounded-lg p-2 border border-sand-200 flex items-center justify-center h-10 shadow-2xs">
            <img src="/images/reference/payment-mpesa.png" alt="M-PESA" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="bg-white rounded-lg p-2 border border-sand-200 flex items-center justify-center h-10 shadow-2xs">
            <img src="/images/reference/payment-pesapal.png" alt="Pesapal" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="bg-white rounded-lg p-2 border border-sand-200 flex items-center justify-center h-10 shadow-2xs">
            <img src="/images/reference/payment-visa.png" alt="Visa" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="bg-white rounded-lg p-2 border border-sand-200 flex items-center justify-center h-10 shadow-2xs">
            <img src="/images/reference/payment-mastercard.png" alt="Mastercard" className="max-h-full max-w-full object-contain" />
          </div>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 pt-2">
          <li><strong>M-PESA:</strong> STK Push directly to your phone.</li>
          <li><strong>Pesapal:</strong> Verified East African payment gateway.</li>
          <li><strong>Visa & Mastercard:</strong> PCI-DSS compliant encrypted card processing.</li>
        </ul>
      </div>
    )
  }
};

export default function PolicyModal() {
  const { activePolicy, closePolicy } = useStore();

  if (!activePolicy || !POLICIES_DATA[activePolicy]) return null;

  const policy = POLICIES_DATA[activePolicy];
  const Icon = policy.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      onClick={closePolicy}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sand-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-sand-200 flex items-center justify-between bg-cream-50/80">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${policy.color} shadow-2xs`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="policy-modal-title" className="text-lg sm:text-xl font-display font-bold text-forest-900">
                {policy.title}
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                {policy.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={closePolicy}
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-sand-200/80 transition-colors"
            aria-label="Close policy dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {policy.content}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-sand-200 bg-sand-50/80 flex items-center justify-between text-xs text-charcoal-muted">
          <span>Hikaya Kids Library (حكاية)</span>
          <button
            onClick={closePolicy}
            className="px-5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
