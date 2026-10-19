import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  X,
  Heart,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';

export default function ProductModal() {
  const { selectedProduct, closeProductModal, setIsCheckoutOpen, openProductModal, products } = useStore();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits'); // 'benefits' | 'included' | 'why'

  if (!selectedProduct) return null;

  const inWishlist = isInWishlist(selectedProduct.id);
  const comparePrice = selectedProduct.compareAtPrice || selectedProduct.compare_at_price;
  const isSale = comparePrice && comparePrice > selectedProduct.price;
  const discountPercent = isSale ? Math.round(((comparePrice - selectedProduct.price) / comparePrice) * 100) : 0;
  const isOutOfStock = selectedProduct.stock === 0;

  // Normalized images array
  const images = Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [typeof selectedProduct.images === 'string' ? selectedProduct.images : '/images/placeholder.jpg'];

  // Normalized learning benefits
  let benefits = selectedProduct.learningBenefits || selectedProduct.learning_benefits || [];
  if (typeof benefits === 'string') {
    try {
      benefits = JSON.parse(benefits);
    } catch {
      benefits = benefits.split('\n').filter(Boolean);
    }
  }

  // Find related products in SAME category first
  const relatedProducts = (products || []).filter(
    p => p.id !== selectedProduct.id && p.category === selectedProduct.category
  ).slice(0, 3);

  // Companion product for bundle suggestion
  const companion = (products || []).find(
    p => p.id !== selectedProduct.id && p.category === selectedProduct.category && !p.isDigital
  ) || (products || []).find(p => p.id !== selectedProduct.id && !p.isDigital);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    closeProductModal();
    setIsCheckoutOpen(true);
  };

  const handleAddBundle = () => {
    if (companion) {
      addToCart(selectedProduct, 1);
      addToCart(companion, 1);
      closeProductModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={closeProductModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-cream-50 rounded-3xl shadow-2xl border border-sand-200 overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-white/90 text-charcoal hover:bg-white hover:text-terracotta-700 shadow-sm transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Preview Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-sand-200 border border-sand-200 shadow-sm">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  {isSale && (
                    <span className="bg-terracotta-600 text-white text-[11px] font-black px-3 py-1 rounded-xl shadow-xs uppercase">
                      Save {discountPercent}%
                    </span>
                  )}
                  {selectedProduct.badge && (
                    <span className="bg-forest-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-xl">
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-terracotta-600 scale-95 shadow-xs'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Kenya Delivery / Safety assurance */}
              <div className="p-3.5 rounded-2xl bg-white border border-sand-200/90 text-xs text-charcoal-muted space-y-2 mt-4">
                <div className="flex items-center gap-2 text-forest-900 font-semibold">
                  <Truck className="w-4 h-4 text-terracotta-600" />
                  <span>Delivery across Nairobi and all 47 Kenyan counties</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest-700" />
                  <span>Quality checked & protective bubble wrapping</span>
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                {/* Category & Arabic title */}
                <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
                  <span className="font-bold text-terracotta-700 uppercase tracking-wide">
                    {selectedProduct.categoryLabel || selectedProduct.category?.replace(/-/g, ' ')}
                  </span>
                  {selectedProduct.arabicTitle && (
                    <span className="font-semibold text-forest-800 text-sm font-arabic">
                      {selectedProduct.arabicTitle}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-forest-900 leading-tight">
                  {selectedProduct.name}
                </h2>

                {/* Age Tag & Stock Status */}
                <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                  {selectedProduct.ageRange && (
                    <span className="px-3 py-1 rounded-xl bg-forest-100 text-forest-900 text-xs font-bold">
                      Age: {selectedProduct.ageRange}
                    </span>
                  )}

                  {isOutOfStock ? (
                    <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Sold Out
                    </span>
                  ) : selectedProduct.stock <= 5 ? (
                    <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs">
                      Only {selectedProduct.stock} left in stock
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-semibold text-xs">
                      In Stock
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-4 py-3 border-y border-sand-200/80 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#C2410C] font-sans">
                    KSh {Number(selectedProduct.price || 0).toLocaleString()}
                  </span>
                  {isSale && (
                    <span className="text-sm text-charcoal-muted line-through font-sans">
                      KSh {Number(comparePrice).toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-charcoal-muted ml-auto">VAT Inclusive</span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-charcoal-light mt-4 leading-relaxed">
                  {selectedProduct.description || selectedProduct.shortDescription}
                </p>

                {/* Detailed Information Tabs */}
                <div className="mt-6">
                  <div className="flex gap-3 border-b border-sand-200 pb-1 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`pb-2 px-1 border-b-2 transition-colors ${
                        activeTab === 'benefits'
                          ? 'border-terracotta-600 text-terracotta-700'
                          : 'border-transparent text-charcoal-muted hover:text-charcoal'
                      }`}
                    >
                      Learning Benefits
                    </button>
                    {selectedProduct.whatsIncluded && (
                      <button
                        onClick={() => setActiveTab('included')}
                        className={`pb-2 px-1 border-b-2 transition-colors ${
                          activeTab === 'included'
                            ? 'border-terracotta-600 text-terracotta-700'
                            : 'border-transparent text-charcoal-muted hover:text-charcoal'
                        }`}
                      >
                        What's Included
                      </button>
                    )}
                    {selectedProduct.whyParentsLoveIt && (
                      <button
                        onClick={() => setActiveTab('why')}
                        className={`pb-2 px-1 border-b-2 transition-colors ${
                          activeTab === 'why'
                            ? 'border-terracotta-600 text-terracotta-700'
                            : 'border-transparent text-charcoal-muted hover:text-charcoal'
                        }`}
                      >
                        Why Parents Love It
                      </button>
                    )}
                  </div>

                  <div className="pt-3 text-xs text-charcoal-light leading-relaxed min-h-[90px]">
                    {activeTab === 'benefits' && (
                      <ul className="space-y-1.5">
                        {Array.isArray(benefits) && benefits.length > 0 ? (
                          benefits.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start gap-2 text-charcoal-muted">
                            <Sparkles className="w-3.5 h-3.5 text-terracotta-600 shrink-0 mt-0.5" />
                            <span>Develops vocabulary, values, and curiosity through hands-on learning.</span>
                          </li>
                        )}
                      </ul>
                    )}

                    {activeTab === 'included' && selectedProduct.whatsIncluded && (
                      <ul className="space-y-1.5">
                        {selectedProduct.whatsIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === 'why' && selectedProduct.whyParentsLoveIt && (
                      <div className="p-3 rounded-2xl bg-sand-100 border border-sand-200 italic">
                        "{selectedProduct.whyParentsLoveIt}"
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="pt-5 mt-4 border-t border-sand-200 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center rounded-2xl bg-white border border-sand-200 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={isOutOfStock}
                      className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-sand-100 rounded-xl disabled:opacity-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-forest-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={isOutOfStock}
                      className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-sand-100 rounded-xl disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(selectedProduct, quantity)}
                    disabled={isOutOfStock}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-sm shadow-soft transition-all active:scale-95 ${
                      isOutOfStock
                        ? 'bg-sand-300 text-charcoal-muted cursor-not-allowed'
                        : 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
                  </button>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      inWishlist
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'bg-white border-sand-200 text-charcoal-muted hover:text-rose-500'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Buy Now (Immediate Checkout) */}
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-900 disabled:bg-sand-300 text-gold-200 disabled:text-charcoal-muted font-bold text-sm shadow-sm transition-all active:scale-95"
                >
                  Buy Now with Express Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Companion */}
          {companion && (
            <div className="mt-8 p-4 sm:p-5 rounded-3xl bg-white border border-sand-200">
              <h4 className="text-xs font-bold text-terracotta-700 uppercase tracking-wider mb-3">
                Frequently Paired in {selectedProduct.categoryLabel || 'This Collection'}
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={Array.isArray(companion.images) ? companion.images[0] : companion.images}
                    alt={companion.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-forest-900">{companion.name}</p>
                    <p className="text-xs font-extrabold text-terracotta-600">
                      + KSh {Number(companion.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 border border-sand-300 text-forest-900 text-xs font-bold transition-all shrink-0"
                >
                  Add Both to Cart
                </button>
              </div>
            </div>
          )}

          {/* Related Products from the SAME category */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-sand-200">
              <h3 className="text-base sm:text-lg font-display font-semibold text-forest-900 mb-3">
                More in {selectedProduct.categoryLabel || selectedProduct.category?.replace(/-/g, ' ')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      openProductModal(rel);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 rounded-2xl bg-white border border-sand-200 hover:border-terracotta-300 transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={Array.isArray(rel.images) ? rel.images[0] : rel.images}
                      alt={rel.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden min-w-0">
                      <p className="text-xs font-bold text-forest-900 truncate">{rel.name}</p>
                      <p className="text-xs font-extrabold text-terracotta-700">
                        KSh {Number(rel.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
