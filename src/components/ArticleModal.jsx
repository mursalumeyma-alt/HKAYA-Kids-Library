import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, Clock, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

export default function ArticleModal() {
  const { selectedArticle, setSelectedArticle, openProductModal } = useStore();
  const { addToCart } = useCart();

  if (!selectedArticle) return null;

  const recommendedProduct = PRODUCTS.find(p => p.id === selectedArticle.recommendedProductId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedArticle(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-cream-50 rounded-3xl shadow-2xl border border-sand-200 overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-white/90 text-charcoal hover:bg-white hover:text-terracotta-700 shadow-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Header Image */}
          <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-sand-200 relative">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-forest-900">
              {selectedArticle.category}
            </div>
          </div>

          {/* Article Metadata */}
          <div>
            <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-terracotta-600" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span>•</span>
              <span className="font-semibold text-forest-800">{selectedArticle.author}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-forest-900 leading-tight">
              {selectedArticle.title}
            </h2>
          </div>

          {/* Article Content Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-charcoal leading-relaxed border-t border-sand-200/80 pt-4">
            {selectedArticle.content.map((para, i) => (
              <p key={i} className="text-charcoal-light">
                {para}
              </p>
            ))}
          </div>

          {/* Recommended Companion Book */}
          {recommendedProduct && (
            <div className="p-5 rounded-3xl bg-white border border-sand-200 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={recommendedProduct.images[0]}
                  alt={recommendedProduct.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider block">
                    Recommended Resource
                  </span>
                  <h4 className="font-bold text-sm text-forest-900">{recommendedProduct.name}</h4>
                  <p className="text-xs font-extrabold text-forest-900 mt-0.5">
                    KSh {recommendedProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    openProductModal(recommendedProduct);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-sand-300 text-xs font-bold text-charcoal hover:bg-sand-100"
                >
                  View Book
                </button>
                <button
                  onClick={() => {
                    addToCart(recommendedProduct, 1);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
