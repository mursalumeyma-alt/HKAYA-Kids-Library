import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  ShoppingBag,
  X,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

export default function RecommendationWizard({ isInline = false }) {
  const { isWizardOpen, setIsWizardOpen, openProductModal } = useStore();
  const { addToCart } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: '',
    interest: '',
    goal: '',
    budget: '',
    category: ''
  });

  const [matches, setMatches] = useState([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const resetWizard = () => {
    setStep(1);
    setAnswers({ age: '', interest: '', goal: '', budget: '', category: '' });
    setMatches([]);
    setHasCalculated(false);
  };

  const handleSelectOption = (field, value) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);

    if (step < 5) {
      setStep(step + 1);
    } else {
      // Calculate matches
      calculateRecommendations(updated);
    }
  };

  const calculateRecommendations = (userAnswers) => {
    let filtered = [...PRODUCTS];

    // Filter or rank by category if chosen
    if (userAnswers.category && userAnswers.category !== 'any') {
      const catMatches = filtered.filter(p => p.category === userAnswers.category);
      if (catMatches.length > 0) filtered = catMatches;
    }

    // Filter or rank by age
    if (userAnswers.age) {
      const ageMatches = filtered.filter(p => p.ageGroupId === userAnswers.age);
      if (ageMatches.length > 0) filtered = ageMatches;
    }

    // Filter or rank by budget
    if (userAnswers.budget === 'under1500') {
      filtered = filtered.filter(p => p.price <= 1500);
    } else if (userAnswers.budget === '1500-3000') {
      filtered = filtered.filter(p => p.price > 1000 && p.price <= 3000);
    } else if (userAnswers.budget === 'over3000') {
      filtered = filtered.filter(p => p.price >= 2000);
    }

    // Fallback if too strict
    if (filtered.length === 0) {
      filtered = PRODUCTS.slice(0, 3);
    }

    setMatches(filtered.slice(0, 3));
    setHasCalculated(true);
  };

  // Inline Banner for Homepage
  if (isInline) {
    return (
      <section className="py-16 sm:py-20 bg-cream-100 border-b border-sand-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Interactive Shopping Assistant</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
            Need help choosing?
          </h2>

          <p className="text-base text-charcoal-muted mt-2 max-w-xl mx-auto">
            Tell us about your child and we'll help you find something they'll love. Tailored for their age, interests, and family goals.
          </p>

          <div className="mt-8">
            <button
              onClick={() => {
                resetWizard();
                setIsWizardOpen(true);
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-soft hover:shadow-soft-hover transition-all active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Get Recommendations</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Modal View
  if (!isWizardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWizardOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-2xl border border-sand-200 overflow-hidden z-10 flex flex-col my-auto max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-sand-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-forest-900">
                Hkaya Child Recommendation Guide
              </h3>
              <p className="text-[11px] text-charcoal-muted">
                Step-by-step assistance for parents
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWizardOpen(false)}
            className="p-2 rounded-xl text-charcoal hover:bg-sand-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!hasCalculated && (
          <div className="w-full bg-sand-200 h-1.5">
            <div
              className="bg-terracotta-600 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!hasCalculated ? (
            <div>
              {/* Question 1: Age */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center sm:text-left mb-6">
                    <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">
                      Step 1 of 5
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-semibold text-forest-900 mt-1">
                      What is your child's age?
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: '0-2', label: '0–2 Years', sub: 'Sensory touch & sturdy board books' },
                      { id: '3-5', label: '3–5 Years', sub: 'Preschool, first readers & wooden play' },
                      { id: '6-8', label: '6–8 Years', sub: 'Early chapter books & creative discovery' },
                      { id: '9-12', label: '9–12 Years', sub: 'Independent reading & science kits' },
                      { id: 'teens', label: '13+ Years', sub: 'Teen fiction & mindful self-growth' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('age', opt.id)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          answers.age === opt.id
                            ? 'bg-terracotta-50 border-terracotta-500 shadow-sm'
                            : 'bg-white border-sand-200 hover:border-sand-300'
                        }`}
                      >
                        <p className="font-bold text-sm text-forest-900">{opt.label}</p>
                        <p className="text-xs text-charcoal-muted mt-0.5">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Interests */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-center sm:text-left mb-6">
                    <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">
                      Step 2 of 5
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-semibold text-forest-900 mt-1">
                      What sparks their curiosity most?
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'animals', label: '🦁 Savanna Animals & Nature' },
                      { id: 'faith', label: '🌙 Islamic Faith & Prophetic Stories' },
                      { id: 'building', label: '🧩 Building, Puzzles & Montessori' },
                      { id: 'art', label: '🎨 Drawing, Coloring & Journals' },
                      { id: 'stories', label: '📖 Adventure & Bedtime Tales' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('interest', opt.id)}
                        className="p-4 rounded-2xl text-left bg-white border border-sand-200 hover:border-terracotta-400 hover:bg-cream-100 transition-all font-semibold text-sm text-forest-900"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3: Learning Goal */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center sm:text-left mb-6">
                    <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">
                      Step 3 of 5
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-semibold text-forest-900 mt-1">
                      What is your main priority for them?
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'reading', label: 'Build a joyful daily reading habit at home' },
                      { id: 'character', label: 'Instill gentle spiritual & moral character values' },
                      { id: 'motor', label: 'Fine motor coordination & tactile, screen-free play' },
                      { id: 'school', label: 'Early Arabic/English phonics & handwriting preparation' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('goal', opt.id)}
                        className="p-4 rounded-2xl text-left bg-white border border-sand-200 hover:border-terracotta-400 hover:bg-cream-100 transition-all font-semibold text-sm text-forest-900"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4: Budget */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-center sm:text-left mb-6">
                    <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">
                      Step 4 of 5
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-semibold text-forest-900 mt-1">
                      What budget range are you planning?
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'under1500', label: 'Under KSh 1,500', sub: 'Stationery, flashcards & digital' },
                      { id: '1500-3000', label: 'KSh 1,500 – 3,000', sub: 'Illustrated books & wooden sets' },
                      { id: 'over3000', label: 'KSh 3,000+', sub: 'Comprehensive gift sets & chef kits' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('budget', opt.id)}
                        className="p-4 rounded-2xl text-left bg-white border border-sand-200 hover:border-terracotta-400 hover:bg-cream-100 transition-all"
                      >
                        <p className="font-bold text-sm text-forest-900">{opt.label}</p>
                        <p className="text-[11px] text-charcoal-muted mt-1">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 5: Category Preference */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="text-center sm:text-left mb-6">
                    <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">
                      Step 5 of 5
                    </span>
                    <h4 className="text-xl sm:text-2xl font-display font-semibold text-forest-900 mt-1">
                      What category would you like to explore?
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'books', label: '📚 Books & Stories' },
                      { id: 'islamic', label: '🌙 Islamic Learning' },
                      { id: 'toys', label: '🧸 Toys & Learning' },
                      { id: 'gifts', label: '🎁 Gift Hampers' },
                      { id: 'digital', label: '💻 Digital Printable Packs' },
                      { id: 'any', label: '✨ Any Suitable Category' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('category', opt.id)}
                        className="p-4 rounded-2xl text-left bg-white border border-sand-200 hover:border-terracotta-400 hover:bg-cream-100 transition-all font-semibold text-sm text-forest-900"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Back */}
              {step > 1 && (
                <div className="mt-6 pt-4 border-t border-sand-200 flex justify-start">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-forest-800 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-2xl font-display font-semibold text-forest-900">
                  Recommended for Your Child
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-md mx-auto">
                  Based on your preferences, here are thoughtfully curated selections from the Hkaya collection.
                </p>
              </div>

              {/* Matches List */}
              <div className="space-y-3.5">
                {matches.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-sand-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between"
                  >
                    <div
                      className="flex items-center gap-3.5 cursor-pointer w-full sm:w-auto"
                      onClick={() => {
                        setIsWizardOpen(false);
                        openProductModal(item);
                      }}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sand-200 text-charcoal">
                            {item.ageRange}
                          </span>
                          <span className="text-xs text-terracotta-600 font-semibold">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-forest-900 line-clamp-1 hover:text-terracotta-600">
                          {item.name}
                        </h5>
                        <p className="text-xs font-extrabold text-forest-900">
                          KSh {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          setIsWizardOpen(false);
                          openProductModal(item);
                        }}
                        className="px-3 py-2 rounded-xl border border-sand-200 hover:bg-sand-100 text-xs font-bold text-charcoal"
                      >
                        View
                      </button>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Personalized Help */}
              {STORE_CONFIG.contacts.whatsapp && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <p className="text-xs text-forest-900 font-medium">
                    Need personal guidance choosing for your child?
                  </p>
                  <a
                    href={
                      STORE_CONFIG.contacts.whatsapp.targetNumber
                        ? `https://wa.me/${STORE_CONFIG.contacts.whatsapp.targetNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello HKAYA! Need help finding the right book or gift for my child.')}`
                        : `https://wa.me/?text=${encodeURIComponent('Hello HKAYA! Need help finding the right book or gift for my child.')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              )}

              {/* Wizard Footer Actions */}
              <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                <button
                  onClick={resetWizard}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Start Over
                </button>

                <button
                  onClick={() => setIsWizardOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-900"
                >
                  Close Assistant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
