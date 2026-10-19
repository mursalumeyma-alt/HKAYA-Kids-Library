import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import DemoNoticeBanner from './components/DemoNoticeBanner';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import SearchModal from './components/SearchModal';
import RecommendationWizard from './components/RecommendationWizard';
import ArticleModal from './components/ArticleModal';
import AccountModal from './components/AccountModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import PolicyModal from './components/PolicyModal';

// Views
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import CategoriesView from './views/CategoriesView';
import ReadingCornerView from './views/ReadingCornerView';
import DigitalResourcesView from './views/DigitalResourcesView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import PoliciesView from './views/PoliciesView';
import AdminView from './views/AdminView';

import { Home, Compass, ShoppingBag, Heart, BookOpen } from 'lucide-react';

function AppContent() {
  const { currentView, navigateTo, setIsWizardOpen, setIsCheckoutOpen } = useStore();
  const { toastMessage, itemCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  if (typeof window !== 'undefined') {
    window.__openCheckout = () => setIsCheckoutOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-[#FFF9F1] text-charcoal pb-16 sm:pb-0">
      {/* 1. Top Demo Notice Banner */}
      <DemoNoticeBanner />

      {/* 2. Main Sticky Header */}
      <Header />

      {/* 3. Dynamic Page View */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'reading-corner' && <ReadingCornerView />}
        {currentView === 'digital' && <DigitalResourcesView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {(currentView === 'policies' || currentView === 'payment' || currentView === 'payments' || currentView === 'payment-policy') && <PoliciesView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* 4. Multi-column Footer */}
      <Footer />

      {/* 5. Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SearchModal />
      <RecommendationWizard />
      <ArticleModal />
      <AccountModal />
      <WhatsAppFloatingButton />
      <PolicyModal />

      {/* 6. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-forest-900 text-cream-50 px-4 py-3 rounded-2xl shadow-xl border border-forest-700 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-terracotta-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 7. Sticky Mobile Bottom Navigation Bar for Effortless Thumb Usage */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-sand-200 z-40 py-2 px-6 flex items-center justify-between text-[10px] font-bold text-charcoal-muted">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-terracotta-600' : ''}`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateTo('categories')}
          className={`flex flex-col items-center gap-1 ${currentView === 'categories' ? 'text-terracotta-600' : ''}`}
        >
          <Compass className="w-5 h-5" />
          <span>Categories</span>
        </button>

        <button
          onClick={() => setIsWizardOpen(true)}
          className="flex flex-col items-center gap-1 text-forest-800"
        >
          <span className="w-5 h-5 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold">
            ?
          </span>
          <span>Guide</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-1"
        >
          <Heart className="w-5 h-5" />
          <span>Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-terracotta-700 font-extrabold"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-terracotta-600 text-white text-[9px] flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
