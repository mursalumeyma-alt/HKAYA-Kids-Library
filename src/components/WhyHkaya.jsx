import React from 'react';
import { BookOpen, HeartHandshake, Truck, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export default function WhyHkaya() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Curated with Intention",
      description: "Every title, puzzle, and educational tool is chosen with care for developmental value, tactile quality, and lasting impact.",
      bg: "bg-terracotta-50",
      accent: "text-terracotta-700"
    },
    {
      icon: HeartHandshake,
      title: "Faith, Empathy & Character",
      description: "Resources that nurture a love for Allah, the Prophet ﷺ, kindness, family respect, and positive universal morals.",
      bg: "bg-emerald-50",
      accent: "text-emerald-800"
    },
    {
      icon: Truck,
      title: "Careful Dispatch Across Kenya",
      description: "Orders are thoughtfully packed in protective wrapping and dispatched reliably to Nairobi and all 47 counties.",
      bg: "bg-amber-50",
      accent: "text-amber-800"
    },
    {
      icon: MessageCircle,
      title: "Personal Family Guidance",
      description: "Chat with us directly on WhatsApp for tailored book recommendations matched to your child's exact age and reading stage.",
      bg: "bg-sky-50",
      accent: "text-sky-800"
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-sand-100/50 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-terracotta-700 uppercase tracking-widest block mb-2">
            Why Parents Trust HKAYA
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
            Nurturing Little Minds, Together
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2">
            We are dedicated to providing meaningful literature, Arabic learning, and screen-free educational tools for Kenyan families.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-sand-200/80 shadow-soft hover:shadow-soft-hover transition-all duration-200 flex flex-col items-start"
              >
                <div className={`w-12 h-12 rounded-2xl ${pillar.bg} ${pillar.accent} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-forest-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
