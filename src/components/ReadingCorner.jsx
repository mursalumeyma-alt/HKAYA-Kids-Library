import React from 'react';
import { useStore } from '../context/StoreContext';
import { READING_ARTICLES } from '../data/articles';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function ReadingCorner() {
  const { navigateTo, setSelectedArticle } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-sage-600" />
              <span>Editorial & Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              Hkaya Reading Corner
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-1 max-w-xl">
              More than a shop — a place for growing minds, thoughtful book guides, and everyday parenting inspiration.
            </p>
          </div>

          <button
            onClick={() => navigateTo('reading-corner')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group"
          >
            <span>Visit Reading Corner</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {READING_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white rounded-3xl overflow-hidden border border-sand-200 hover:border-terracotta-300 shadow-soft hover:shadow-soft-hover transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-charcoal text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {article.category}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-charcoal-muted mb-2">
                    <Clock className="w-3 h-3 text-terracotta-500" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>

                  <h3 className="font-bold text-base text-forest-900 group-hover:text-terracotta-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200/60 flex items-center gap-1.5 text-xs font-bold text-terracotta-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
