import React from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import {
  Star,
  Heart,
  ShoppingBag,
  Eye,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HkayaPicks() {
  const { openProductModal, navigateTo } = useStore();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Show top 6 curated picks on homepage
  const featuredPicks = PRODUCTS.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-sand-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 tracking-tight">
              Hkaya Picks
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-1 max-w-xl">
              Loved by parents. Chosen for growing minds.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group"
          >
            <span>Explore Entire Shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPicks.map((product) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group relative rounded-3xl bg-cream-50/60 border border-sand-200 hover:border-terracotta-300 shadow-soft hover:shadow-soft-hover transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.badge && (
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-forest-900/90 backdrop-blur-md text-white shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    {product.isDigital && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-sky-600 text-white">
                        Digital Download
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition-all ${
                      inWishlist
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-white/90 text-charcoal-muted hover:text-rose-500 hover:bg-white shadow-xs'
                    }`}
                    aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-forest-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 text-forest-900 text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-terracotta-600" /> Quick View
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Age Recommendation */}
                    <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2">
                      <span className="font-semibold text-terracotta-700 capitalize">
                        {product.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sand-200 text-charcoal-light font-medium text-[11px]">
                        {product.ageRange}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openProductModal(product)}
                      className="font-bold text-base sm:text-lg text-forest-900 group-hover:text-terracotta-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-charcoal-muted line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-4 mt-3 border-t border-sand-200/70 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-charcoal-muted block leading-none">Price</span>
                      <span className="text-lg sm:text-xl font-extrabold text-forest-900 font-sans">
                        KSh {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-soft transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
