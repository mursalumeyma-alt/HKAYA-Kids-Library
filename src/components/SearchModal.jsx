import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, openProductModal, navigateTo } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          (p.arabicTitle && p.arabicTitle.includes(q)) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      });

  const popularSearches = [
    "Quran for Kids",
    "Board books",
    "Montessori",
    "Ramadan",
    "Stationery",
    "Ages 3-5"
  ];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    openProductModal(product);
  };

  const handleViewAllInShop = () => {
    setIsSearchOpen(false);
    navigateTo('shop', { searchQuery: query });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-2xl border border-sand-200 overflow-hidden z-10 flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-sand-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-terracotta-600 shrink-0" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handleViewAllInShop();
            }}
            className="flex-1 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, Islamic resources, toys, stationery..."
              className="w-full bg-transparent text-sm sm:text-base font-semibold text-charcoal placeholder-charcoal-muted/60 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-charcoal-muted hover:text-charcoal p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-charcoal-muted hover:text-charcoal px-2.5 py-1 rounded-lg bg-sand-100 border border-sand-200"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-2.5">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-sand-200 hover:border-terracotta-400 hover:text-terracotta-700 text-xs font-medium text-charcoal transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2">
                <span>{results.length} results found</span>
                <button
                  onClick={handleViewAllInShop}
                  className="font-bold text-terracotta-700 hover:underline inline-flex items-center gap-1"
                >
                  View full results in Shop <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3 rounded-2xl bg-white border border-sand-200 hover:border-terracotta-400 hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-terracotta-600">
                          {product.categoryLabel}
                        </span>
                        <span className="text-[10px] text-charcoal-muted">
                          • {product.ageRange}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-forest-900 truncate group-hover:text-terracotta-600 transition-colors">
                        {product.name}
                      </h4>
                    </div>
                  </div>

                  <span className="font-extrabold text-xs text-forest-900 shrink-0 font-sans">
                    KSh {product.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-charcoal-muted">
              <p className="font-semibold text-forest-900 text-sm">No items found for "{query}"</p>
              <p className="mt-1">Try searching for keywords like "Quran", "Board books", "Toys", or "Stationery".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
