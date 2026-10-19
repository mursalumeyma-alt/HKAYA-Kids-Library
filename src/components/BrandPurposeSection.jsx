import React from 'react';
import { BookOpen, Compass, Backpack, HeartHandshake, Sparkles } from 'lucide-react';

/**
 * Hikaya Kids Library - Brand Purpose Section (Section 5)
 * Simple, elegant feature boxes illustrating Hikaya's core commitments:
 * 1. Carefully Selected Stories
 * 2. Learning Beyond the Classroom
 * 3. Practical School Essentials
 * 4. Family-Centred Service
 */
export default function BrandPurposeSection() {
  const purposes = [
    {
      title: "Carefully Selected Stories",
      description: "Inspiring children's books, Islamic literature, and moral stories curated for developmental depth, gentle illustrations, and positive values.",
      icon: BookOpen,
      bg: "bg-terracotta-50",
      border: "border-terracotta-200/80",
      iconColor: "text-terracotta-700"
    },
    {
      title: "Learning Beyond the Classroom",
      description: "Hands-on Arabic learning tools, wooden Montessori puzzles, sensory blocks, and creative STEM sets that make discovery joyful and screen-free.",
      icon: Compass,
      bg: "bg-emerald-50",
      border: "border-emerald-200/80",
      iconColor: "text-forest-700"
    },
    {
      title: "Practical School Essentials",
      description: "Ergonomic primary school backpacks, leakproof bento lunchboxes, BPA-free water bottles, and reliable stationery built for everyday school life.",
      icon: Backpack,
      bg: "bg-amber-50",
      border: "border-amber-200/80",
      iconColor: "text-amber-800"
    },
    {
      title: "Family-Centred Service",
      description: "Thoughtful recommendations, responsive WhatsApp guidance, secure payment options, and dependable delivery across Nairobi and Kenya.",
      icon: HeartHandshake,
      bg: "bg-purple-50",
      border: "border-purple-200/80",
      iconColor: "text-purple-800"
    }
  ];

  return (
    <section id="brand-purpose" className="py-16 sm:py-20 bg-cream-50 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-100 text-charcoal-muted text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Our Commitment to Families</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
            Our Brand Purpose
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted mt-2.5 leading-relaxed">
            Every book, school essential, and learning toy is selected with intentionality to support little minds and big dreams.
          </p>
        </div>

        {/* 4 Feature Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {purposes.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200/90 shadow-soft hover:shadow-soft-hover hover:border-terracotta-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Badge */}
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} border ${item.border} ${item.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-2xs`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-forest-900 group-hover:text-terracotta-700 transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-sand-100 flex items-center justify-between text-[11px] font-bold text-forest-800">
                  <span>Hikaya Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
