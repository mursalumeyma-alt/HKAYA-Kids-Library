import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import {
  GraduationCap,
  Layers,
  BookMarked,
  PenTool,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';

export default function TeachersCornerSection() {
  const { navigateTo } = useStore();

  const teacherSubcategories = [
    { title: "Classroom Supplies", icon: Layers, desc: "Caddies, bins & storage" },
    { title: "Exercise Books", icon: BookMarked, desc: "Ruled & squared packs" },
    { title: "Teacher Stationery", icon: PenTool, desc: "Grading pens & stamps" },
    { title: "Learning Resources", icon: Sparkles, desc: "Visual charts & flashcards" },
    { title: "Classroom Organization", icon: Layers, desc: "Desk & station organizers" },
    { title: "Trophies & Awards", icon: Trophy, desc: "Medals, ribbons & prizes" }
  ];

  const teacherProducts = PRODUCTS.filter(p => p.category === 'teachers').slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-purple-50/40 border-b border-sand-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-purple-700" />
            <span>Dedicated Educator Collection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-forest-900 tracking-tight">
            Teachers' Corner
          </h2>

          <p className="text-base sm:text-lg text-charcoal-muted mt-2 max-w-xl mx-auto leading-relaxed">
            Resources and classroom essentials to make teaching and learning easier.
          </p>
        </div>

        {/* 6 Subcategory Quick Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {teacherSubcategories.map((sub, i) => {
            const Icon = sub.icon;
            return (
              <button
                key={i}
                onClick={() => navigateTo('shop', { category: 'teachers' })}
                className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-soft transition-all text-center flex flex-col items-center justify-between group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-forest-900 group-hover:text-purple-800 transition-colors leading-tight">
                  {sub.title}
                </h4>
                <p className="text-[10px] text-charcoal-muted mt-1">
                  {sub.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Teacher Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {teacherProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('shop', { category: 'teachers' })}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-sm shadow-soft transition-all active:scale-95"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Shop Teachers' Supplies</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
