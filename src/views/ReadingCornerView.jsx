import React from 'react';
import { useStore } from '../context/StoreContext';
import { READING_ARTICLES } from '../data/articles';
import { BookOpen, Clock, ArrowRight, Sparkles, BookMarked } from 'lucide-react';

export default function ReadingCornerView() {
  const { setSelectedArticle } = useStore();

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-sage-600" />
            <span>The Hkaya Reading Corner</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-semibold text-forest-900 tracking-tight">
            More than a shop — a place for growing minds.
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed font-light">
            Thoughtful reading guides, developmental book recommendations, and gentle parenting insights designed to foster a lifelong love of literature in Kenyan homes.
          </p>
        </div>

        {/* Featured Editorial Banner */}
        <div
          onClick={() => setSelectedArticle(READING_ARTICLES[0])}
          className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-soft hover:shadow-soft-hover transition-all cursor-pointer mb-12 grid grid-cols-1 lg:grid-cols-12 gap-0 group"
        >
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-sand-200 overflow-hidden">
            <img
              src={READING_ARTICLES[0].image}
              alt={READING_ARTICLES[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block mb-2">
                Featured Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest-900 group-hover:text-terracotta-600 transition-colors leading-tight">
                {READING_ARTICLES[0].title}
              </h2>
              <p className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                {READING_ARTICLES[0].excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-sand-200 mt-6 flex items-center justify-between text-xs">
              <span className="text-charcoal-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-terracotta-600" />
                <span>{READING_ARTICLES[0].readTime}</span>
              </span>
              <span className="font-bold text-terracotta-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Complete Guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {READING_ARTICLES.slice(1).map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white rounded-3xl overflow-hidden border border-sand-200 hover:border-terracotta-300 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-charcoal px-2.5 py-1 rounded-lg">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
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

                  <p className="text-xs text-charcoal-muted mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs font-bold text-terracotta-600">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
