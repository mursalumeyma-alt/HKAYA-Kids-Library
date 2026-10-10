import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAuth } from '../context/AuthContext';
import HkayaLogo from './HkayaLogo';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  ShieldAlert
} from 'lucide-react';

export default function Header() {
  const {
    currentView,
    navigateTo,
    setIsSearchOpen,
    setIsAccountOpen,
    setSelectedCategory
  } = useStore();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    { text: "Secure payments with M-Pesa • Mobile Money • Card", icon: ShieldCheck },
    { text: "Quality kids' books, learning resources & educational toys", icon: Sparkles }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop All', view: 'shop', category: null, ageGroup: null },
    { label: 'Shop by Age', view: 'shop', isAgeMenu: true },
    { label: 'Books', view: 'shop', category: 'islamic-books' },
    { label: 'School Essentials', view: 'shop', category: 'school-learning-essentials' },
    { label: 'Educational Toys', view: 'shop', category: 'educational-toys' },
    { label: 'Gifts', view: 'shop', category: 'gifts-for-kids' },
    { label: 'Reading Corner', view: 'reading-corner' }
  ];

  const handleNavClick = (link) => {
    if (link.isAgeMenu) {
      if (currentView === 'home') {
        const el = document.getElementById('shop-by-age');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
          return;
        }
      }
      navigateTo('shop', { ageGroup: '6-8' });
    } else if (link.category !== undefined) {
      navigateTo(link.view, { category: link.category, ageGroup: null });
    } else {
      navigateTo(link.view, { ageGroup: null, category: null });
    }
    setMobileMenuOpen(false);
  };

  const CurrentIcon = announcements[announcementIndex].icon;

  return (
    <header className="w-full sticky top-0 z-40 transition-shadow">
      {/* 1. Top Announcement Bar */}
      <div className="bg-sand-100 border-b border-sand-200/80 text-charcoal-muted text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Rotating Message */}
          <div className="flex items-center gap-2 font-medium">
            <CurrentIcon className="w-3.5 h-3.5 text-terracotta-600 animate-gentle-pulse" />
            <span className="text-charcoal-light font-semibold">
              {announcements[announcementIndex].text}
            </span>
          </div>

          {/* Right Announcement Info */}
          <div className="hidden md:flex items-center gap-4 text-charcoal-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
              <span>Safe & Trusted</span>
            </span>
            <span className="text-sand-300">•</span>
            <div className="flex items-center gap-1 text-terracotta-700">
              <MessageCircle className="w-3.5 h-3.5" />
              <span title={STORE_CONFIG.contacts.whatsapp.displayNumber}>
                {STORE_CONFIG.contacts.whatsapp.label}: {STORE_CONFIG.contacts.whatsapp.displayNumber}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`bg-cream-100/95 backdrop-blur-md border-b transition-all duration-200 ${
          isScrolled ? 'border-sand-200 shadow-sm py-2.5' : 'border-sand-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-xl text-charcoal hover:bg-sand-200/60 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <HkayaLogo onClick={() => navigateTo('home')} />
            </div>

            {/* Desktop Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between bg-white/90 hover:bg-white text-charcoal-muted px-4 py-2.5 rounded-2xl border border-sand-200 shadow-inner text-sm transition-all group"
              >
                <span className="flex items-center gap-2.5 text-charcoal-muted/80">
                  <Search className="w-4 h-4 text-terracotta-500 group-hover:scale-110 transition-transform" />
                  <span>Search books, toys, stationery, Islamic...</span>
                </span>
                <kbd className="hidden lg:inline-block text-[10px] uppercase font-bold text-charcoal-muted/70 bg-sand-100 px-2 py-0.5 rounded-md border border-sand-200">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Right Action Icons: Search (mobile), Wishlist, Account, Cart */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-xl text-charcoal hover:bg-sand-200/60 transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-2xl text-charcoal hover:bg-sand-200/60 hover:text-terracotta-600 transition-colors"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-gentle-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account button */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="p-2 sm:px-3 rounded-2xl text-charcoal hover:bg-sand-200/60 hover:text-forest-700 transition-colors flex items-center gap-1.5"
                aria-label="Account details"
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="text-xs font-bold text-forest-900 hidden sm:inline max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* Admin Dashboard shortcut if Admin */}
              {isAdmin && (
                <button
                  onClick={() => navigateTo('admin')}
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-forest-800 text-gold-200 hover:bg-forest-900 text-xs font-bold shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
                  <span>Admin</span>
                </button>
              )}

              {/* Cart Drawer Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white px-3.5 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 ml-1"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-white text-terracotta-700 text-xs font-extrabold flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Sub-navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-8 pt-2.5 border-t border-sand-200/60 mt-2 text-[13px] font-semibold text-charcoal-light">
            {navLinks.map((link) => {
              const isActive =
                currentView === link.view &&
                (link.category === undefined || false);

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`py-1.5 transition-colors relative hover:text-terracotta-600 ${
                    isActive ? 'text-terracotta-600 font-bold' : ''
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-cream-100 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header with Close */}
              <div className="flex items-center justify-between pb-5 border-b border-sand-200">
                <HkayaLogo onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-charcoal hover:bg-sand-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline */}
              <div className="py-3 text-xs text-charcoal-muted font-medium border-b border-sand-200/60">
                "{STORE_CONFIG.brand.tagline}"
              </div>

              {/* Links */}
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-charcoal hover:bg-terracotta-50 hover:text-terracotta-700 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Quick Shop by Age */}
              <div className="py-3 border-t border-sand-200/80">
                <p className="px-3 text-[11px] font-bold text-terracotta-700 uppercase tracking-wider mb-2">
                  Shop by Age
                </p>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  {[
                    { id: '0-2', label: '👶 0–2 Years' },
                    { id: '3-5', label: '🧒 3–5 Years' },
                    { id: '6-8', label: '🎒 6–8 Years' },
                    { id: '9-12', label: '📚 9–12 Years' },
                    { id: '13+', label: '🌟 13+ Years' }
                  ].map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        navigateTo('shop', { ageGroup: a.id });
                        setMobileMenuOpen(false);
                      }}
                      className="text-left px-2.5 py-2 rounded-xl bg-white border border-sand-200/90 text-xs font-semibold text-forest-900 hover:border-terracotta-300 active:bg-sand-50"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-sand-200 text-xs text-charcoal-muted space-y-2">
              <div className="p-3 rounded-2xl bg-white border border-sand-200 text-[11px]">
                <p className="font-semibold text-forest-800">Delivery Across Kenya</p>
                <p className="text-charcoal-muted mt-0.5">
                  Free over KSh {STORE_CONFIG.delivery.freeDeliveryThreshold.toLocaleString()}
                </p>
              </div>
              <p className="text-[11px] text-center text-charcoal-muted/70">
                © {STORE_CONFIG.brand.establishedYear} {STORE_CONFIG.brand.name} Kids Library
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
