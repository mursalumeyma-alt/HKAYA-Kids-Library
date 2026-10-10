import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LearningStages() {
  const { navigateTo } = useStore();

  const stages = [
    { title: "First Arabic Letters", category: "quran-arabic-learning", tag: "Arabic Alphabet" },
    { title: "Prophet Stories for Toddlers", category: "islamic-books", tag: "Prophets" },
    { title: "Bedtime Storybooks", category: "childrens-story-books", tag: "Stories" },
    { title: "Screen-Free Wooden Toys", category: "educational-toys", tag: "Montessori" },
    { title: "Daily Duas & Wipe-Clean Cards", category: "flashcards-learning-cards", tag: "Flashcards" },
    { title: "Creative Tracing & Mazes", category: "activity-coloring-books", tag: "Activity" },
    { title: "Ramadan & Eid Celebrations", category: "ramadan-eid", tag: "Celebration" },
    { title: "School Supplies & Workbooks", category: "school-learning-essentials", tag: "Back to School" }
  ];

  return (
    <section className="py-12 bg-sand-50/70 border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-terracotta-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Popular Learning Goals</span>
          </div>
          <span className="text-xs text-charcoal-muted">Quick access to essential milestones</span>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {stages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo('shop', { category: stage.category })}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-sand-200/90 text-forest-900 text-xs sm:text-sm font-semibold shadow-xs hover:border-terracotta-300 hover:shadow-soft hover:text-terracotta-700 transition-all active:scale-95"
            >
              <span>{stage.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-terracotta-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
