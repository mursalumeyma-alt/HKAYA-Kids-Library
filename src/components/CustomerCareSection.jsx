import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CustomerCareSection() {
  return (
    <section id="customer-care" className="py-8 sm:py-10 bg-cream-50/90 border-b border-sand-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          
          {/* Pillar 1: Secure Payments */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-forest-900">
                Secure Payments
              </h3>
              <p className="text-xs sm:text-sm text-charcoal font-medium mt-0.5">
                M-Pesa • Mobile Money • Visa • Mastercard
              </p>
              <p className="text-[11px] text-charcoal-muted mt-1 select-none pointer-events-none">
                Supported payment methods for checkout
              </p>
            </div>
          </div>

          {/* Pillar 2: Shop With Confidence */}
          <div className="flex items-start gap-3.5 md:border-l md:border-sand-200/80 md:pl-8">
            <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-forest-900">
                Shop With Confidence
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mt-0.5">
                Quality kids' books, secure checkout, and reliable delivery.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
