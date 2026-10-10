import React from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    grandTotal,
    freeThreshold,
    isFreeDelivery,
    remainingForFreeDelivery
  } = useCart();

  const { setIsCheckoutOpen, navigateTo } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const percentProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col justify-between border-l border-sand-200">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-sand-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-forest-900">Your Shopping Cart</h3>
                <p className="text-[11px] text-charcoal-muted">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-sand-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Progress Bar */}
          <div className="p-4 bg-cream-100 border-b border-sand-200 text-xs">
            <div className="flex items-center justify-between font-semibold mb-1.5 text-forest-900">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-terracotta-600" />
                {isFreeDelivery ? (
                  <span className="text-forest-700 font-bold">🎉 Free Delivery Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="text-terracotta-700">KSh {remainingForFreeDelivery.toLocaleString()}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-charcoal-muted">{percentProgress}%</span>
            </div>
            {/* Progress track */}
            <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-terracotta-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sand-200 text-charcoal-muted flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-50" />
                </div>
                <h4 className="font-bold text-base text-forest-900">Your cart is currently empty</h4>
                <p className="text-xs text-charcoal-muted mt-1 max-w-xs mx-auto">
                  Explore our curated books, Islamic resources, and educational toys to get started.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-6 px-6 py-3 rounded-2xl bg-terracotta-600 text-white font-bold text-xs shadow-soft hover:bg-terracotta-700 transition-all"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white border border-sand-200 flex gap-3.5 items-center justify-between shadow-xs"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-xs text-forest-900 line-clamp-1">{item.name}</h4>
                    <span className="text-[10px] text-charcoal-muted capitalize block">
                      {item.categoryLabel} • {item.ageRange}
                    </span>
                    <span className="text-xs font-extrabold text-terracotta-700 font-sans block mt-0.5">
                      KSh {item.price.toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center rounded-lg bg-sand-100 border border-sand-200 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-sand-200 rounded text-charcoal"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-sand-200 rounded text-charcoal"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal-muted hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-sand-200 space-y-3.5">
              <div className="space-y-1.5 text-xs text-charcoal-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-forest-900">KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Kenya Delivery</span>
                  <span className="font-bold text-forest-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      `KSh ${deliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-forest-900 pt-2 border-t border-sand-200">
                  <span>Total</span>
                  <span>KSh {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-soft hover:shadow-soft-hover transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs font-semibold text-charcoal-muted hover:text-charcoal pt-1"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
