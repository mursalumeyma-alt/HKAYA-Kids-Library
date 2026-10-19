import React from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { openProductModal } = useStore();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const comparePrice = product.compareAtPrice || product.compare_at_price;
  const isSale = comparePrice && comparePrice > product.price;
  const discountPercent = isSale ? Math.round(((comparePrice - product.price) / comparePrice) * 100) : 0;
  const isNew = product.newArrival || product.new_arrival;
  const isBestSeller = product.bestSeller || product.best_seller;
  const mainImage = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : (typeof product.images === 'string' ? product.images : '/images/placeholder.jpg');

  return (
    <div className="group relative rounded-3xl bg-white border border-sand-200/90 hover:border-terracotta-300 shadow-soft hover:shadow-soft-hover transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Product Image Area */}
      <div
        className="relative aspect-[4/3] bg-sand-100 overflow-hidden cursor-pointer"
        onClick={() => openProductModal(product)}
      >
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges on Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {isSale && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-terracotta-600 text-white shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {isBestSeller && !isSale && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-amber-500 text-forest-950 shadow-xs">
              Best Seller
            </span>
          )}
          {isNew && !isBestSeller && !isSale && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-sage-600 text-white shadow-xs">
              New Arrival
            </span>
          )}
          {product.badge && !isSale && !isBestSeller && !isNew && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-forest-900/90 backdrop-blur-md text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {product.isDigital && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-sky-600 text-white shadow-xs">
              Digital
            </span>
          )}
        </div>

        {/* Sample / Demo Tag */}
        {product.isDemo && (
          <span className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 text-charcoal-muted border border-sand-200/80 backdrop-blur-xs">
            Sample Product
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition-all z-10 ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/90 text-charcoal-muted hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Age */}
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2 gap-2">
            <span className="font-semibold text-terracotta-700 capitalize truncate">
              {product.categoryLabel || product.category?.replace(/-/g, ' ')}
            </span>
            {product.ageRange && (
              <span className="px-2 py-0.5 rounded-md bg-sand-200 text-charcoal-light font-medium text-[11px] shrink-0">
                {product.ageRange}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => openProductModal(product)}
            className="font-bold text-base text-forest-900 group-hover:text-terracotta-600 transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-charcoal-muted line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Price & Actions Footer */}
        <div className="pt-4 mt-3 border-t border-sand-200/70 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-lg font-extrabold text-[#C2410C] font-sans">
                KSh {Number(product.price || 0).toLocaleString()}
              </span>
              {isSale && (
                <span className="text-xs text-charcoal-muted line-through font-sans">
                  KSh {Number(comparePrice).toLocaleString()}
                </span>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                Only {product.stock} left
              </span>
            )}
            {product.stock === 0 && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 shrink-0">
                Sold Out
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openProductModal(product)}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-bold transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Details</span>
            </button>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stock === 0}
              className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs font-bold shadow-soft transition-all active:scale-95 ${
                product.stock === 0
                  ? 'bg-sand-300 text-charcoal-muted cursor-not-allowed'
                  : 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.stock === 0 ? 'Sold Out' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
