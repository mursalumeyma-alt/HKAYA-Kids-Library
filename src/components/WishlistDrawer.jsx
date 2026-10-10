import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openProductModal } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col justify-between border-l border-sand-200">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-sand-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-base text-forest-900">Your Wishlist</h3>
                <p className="text-[11px] text-charcoal-muted">
                  {wishlistItems.length} saved {wishlistItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-sand-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sand-200 text-charcoal-muted flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-bold text-base text-forest-900">No items saved yet</h4>
                <p className="text-xs text-charcoal-muted mt-1 max-w-xs mx-auto">
                  Click the heart icon on any product to save it here for later.
                </p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white border border-sand-200 flex gap-3.5 items-center justify-between shadow-xs"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(item);
                    }}
                  />

                  <div className="flex-1 overflow-hidden">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductModal(item);
                      }}
                      className="font-bold text-xs text-forest-900 line-clamp-1 cursor-pointer hover:text-terracotta-600"
                    >
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-charcoal-muted block">
                      {item.ageRange}
                    </span>
                    <span className="text-xs font-extrabold text-terracotta-700 font-sans block mt-0.5">
                      KSh {item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        addToCart(item, 1);
                      }}
                      className="p-2.5 rounded-xl bg-terracotta-600 text-white hover:bg-terracotta-700 transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-2.5 rounded-xl hover:bg-sand-200 text-charcoal-muted hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-5 bg-white border-t border-sand-200">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3 rounded-2xl bg-cream-100 hover:bg-cream-200 text-forest-900 font-bold text-xs border border-sand-300"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
