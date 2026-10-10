import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-300 flex items-center justify-center mx-auto mb-4 border border-forest-700">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white">
          {STORE_CONFIG.newsletter.title}
        </h2>

        <p className="text-sm sm:text-base text-cream-200/80 mt-2 max-w-xl mx-auto">
          {STORE_CONFIG.newsletter.subtitle}
        </p>

        {subscribed ? (
          <div className="mt-8 p-6 rounded-3xl bg-forest-800/80 border border-gold-400/40 max-w-md mx-auto text-center">
            <CheckCircle2 className="w-8 h-8 text-gold-400 mx-auto mb-2" />
            <h4 className="font-bold text-white text-base">Welcome to the Hkaya Family!</h4>
            <p className="text-xs text-cream-200 mt-1">
              Thank you for subscribing. We will send you thoughtful book guides and learning ideas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white text-charcoal placeholder-charcoal-muted/70 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 border border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-bold text-sm shadow-soft transition-all active:scale-95 shrink-0"
            >
              <span>Join Us</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-cream-300/60 mt-4">
          We respect your family's privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
