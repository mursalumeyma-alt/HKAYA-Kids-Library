import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import HkayaLogo from '../components/HkayaLogo';
import {
  Heart,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Compass,
  Users,
  Feather,
  ArrowRight
} from 'lucide-react';

export default function AboutView() {
  const { navigateTo } = useStore();

  const brandValues = [
    {
      title: "Quality & Durability",
      desc: "We prioritize sturdy board books, sustainably crafted wooden toys, and heirloom quality that can be passed down between siblings."
    },
    {
      title: "Lifelong Curiosity",
      desc: "Every resource is chosen to ignite 'why' questions, self-directed exploration, and wonder about our world."
    },
    {
      title: "Faith & Gentle Values",
      desc: "Our Islamic learning materials celebrate kindness, daily gratitude, and prophetic character with warmth, beauty, and emotional security."
    },
    {
      title: "Kenyan Family Centered",
      desc: "Rooted in Nairobi, we understand the aspirations of local families who seek literature that honors diverse perspectives and rich African heritage."
    },
    {
      title: "Screen-Free Discovery",
      desc: "Tactile Montessori toys, hands-on activity books, and cozy bedside read-alouds that create peaceful moments of connection."
    },
    {
      title: "Parent Partnership",
      desc: "We stand with parents as friendly guides, providing age-based roadmaps and recommendations for every milestone."
    }
  ];

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Feather className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Our Origin & Purpose</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-semibold text-forest-900 tracking-tight leading-tight">
            Growing curious minds,{' '}
            <span className="text-terracotta-600 italic block sm:inline">
              one story at a time.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal-light mt-4 leading-relaxed font-normal">
            Hkaya was born out of a parent's quest in Kenya: to find a single, trustworthy haven where quality children's literature, beautiful Islamic resources, and screen-free educational toys live side by side.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-charcoal-light leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest-900">
              Why We Created Hkaya
            </h2>

            <p>
              The name <strong className="text-forest-900">حكاية (Hkaya)</strong> means "story"—the narrative that shapes how a child perceives themselves, their family, their faith, and their potential in this world.
            </p>

            <p>
              Too often, finding inspiring books or Montessori learning materials in East Africa requires navigating fragmented suppliers or compromising on quality. We wanted to build something different: a calm, elevated space that speaks primarily to parents with honesty and care, while exciting children with every page turn.
            </p>

            <p>
              Whether it is a child's very first high-contrast board book, an illustrated Quranic reflection that makes bedtime peaceful, or a handcrafted wooden puzzle that builds motor confidence, each item in the Hkaya collection is vetted with genuine educational intention.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 text-xs text-charcoal space-y-1">
              <span className="font-bold text-terracotta-700 block">Our Promise to Families:</span>
              <span>We never stock items simply to fill shelf space. Every title and toy must earn its place by offering genuine cognitive, emotional, or spiritual value.</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-premium border border-sand-200">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80"
                alt="Reading and learning together with Hkaya"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest-900">
              The Six Pillars of Hkaya
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
              The foundational values guiding our library and catalog curation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-sand-200 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-forest-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-3xl bg-forest-900 text-cream-50 p-8 sm:p-12 text-center max-w-4xl mx-auto border border-forest-800">
          <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
            Ready to explore our curated collections?
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 mt-2 max-w-md mx-auto">
            Discover books and learning tools designed for your child's exact developmental stage.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="px-7 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-soft transition-all"
            >
              Explore the Shop
            </button>
            <button
              onClick={() => navigateTo('reading-corner')}
              className="px-7 py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-200 font-bold text-xs border border-forest-600 transition-all"
            >
              Visit Reading Corner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
