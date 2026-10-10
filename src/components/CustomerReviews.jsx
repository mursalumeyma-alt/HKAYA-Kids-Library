import React, { useState } from 'react';
import { DEMO_REVIEWS, REVIEWS_CONFIG } from '../data/reviews';
import { Star, MessageSquareQuote, Info, CheckCircle } from 'lucide-react';

export default function CustomerReviews() {
  const [showDemoReviews, setShowDemoReviews] = useState(true);

  return (
    <section className="py-16 sm:py-20 bg-cream-50 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200 text-charcoal-light text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
            {REVIEWS_CONFIG.sectionTitle}
          </h2>
          <p className="text-sm text-charcoal-muted mt-2">
            Real feedback from Kenyan parents and educators will appear here.
          </p>

          {/* Transparent Preview Toggle for Prototype */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-charcoal-muted">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sand-200/80 text-[11px] font-medium">
              <Info className="w-3 h-3 text-terracotta-600" />
              Prototype preview
            </span>
            <button
              onClick={() => setShowDemoReviews(!showDemoReviews)}
              className="underline hover:text-terracotta-700 text-[11px] font-semibold"
            >
              {showDemoReviews ? "Switch to Empty State" : "Show Sample Layout"}
            </button>
          </div>
        </div>

        {/* Reviews Cards or Empty State */}
        {showDemoReviews ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-3xl bg-white border border-sand-200 shadow-soft flex flex-col justify-between relative"
              >
                <div>
                  {/* Rating Stars & Demo Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-terracotta-700 bg-terracotta-50 px-2.5 py-1 rounded-lg">
                      Sample Reader Reflection
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand-200 text-charcoal-muted uppercase">
                      Demo Content
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-charcoal italic leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="mt-5 pt-4 border-t border-sand-200/80 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-forest-900">{review.authorName}</p>
                    <p className="text-charcoal-muted text-[11px] mt-0.5">
                      Regarding: <span className="text-terracotta-700 font-medium">{review.productMentioned}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Real Production Launch */
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-dashed border-sand-300 text-center">
            <MessageSquareQuote className="w-10 h-10 text-sand-300 mx-auto mb-3" />
            <h4 className="font-bold text-base text-forest-900">No customer reviews yet</h4>
            <p className="text-xs text-charcoal-muted mt-1.5 leading-relaxed">
              {REVIEWS_CONFIG.emptyStateMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
