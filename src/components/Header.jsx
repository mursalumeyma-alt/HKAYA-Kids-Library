import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/categories';
import HkayaLogo from './HkayaLogo';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ShieldAlert,
  Truck,
  Phone,
  Mail
} from 'lucide-react';

export default function Header() {
  const {
    currentView,
    navigateTo,
    setIsSearchOpen,
    setIsAccountOpen
  } = useStore();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const dropdownTimeoutRef = useRef(null);

  const handleHeaderSearch = (e) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      navigateTo('shop', { searchQuery: headerSearch.trim(), category: null });
      setHeaderSearch('');
    }
  };

  const handleMouseEnterShop = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setShopDropdownOpen(true);
  };

  const handleMouseLeaveShop = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 200);
  };

  const handleCategoryClick = (catId) => {
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    navigateTo('shop', { category: catId });
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-2xs">
      {/* 1. Top Announcement Bar (Rich Orange / Terracotta) */}
      <div className="bg-[#F97316] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Fast Delivery */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            <span>Fast Delivery Across East Africa</span>
          </div>

          {/* Right: Phone & Email */}
          <div className="hidden sm:flex items-center gap-5 text-white/95 text-xs font-medium">
            <a
              href="tel:+254793477288"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0793 477 288</span>
            </a>
            <span className="text-white/40">•</span>
            <a
              href="mailto:info@hikayakidslibrary.co.ke"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@hikayakidslibrary.co.ke</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-white border-b border-sand-200/70 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 -ml-1 rounded-xl text-gray-700 hover:bg-sand-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <HkayaLogo onClick={() => navigateTo('home')} />
            </div>

            {/* Center Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
              {/* Home */}
              <button
                onClick={() => navigateTo('home')}
                className={`relative py-1 transition-colors hover:text-[#F97316] ${
                  currentView === 'home'
                    ? 'text-[#F97316] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F97316]'
                    : ''
                }`}
              >
                Home
              </button>

              {/* Shop with Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterShop}
                onMouseLeave={handleMouseLeaveShop}
              >
                <button
                  onClick={() => navigateTo('shop')}
                  className={`flex items-center gap-1 py-1 transition-colors hover:text-[#F97316] ${
                    currentView === 'shop' || currentView === 'categories'
                      ? 'text-[#F97316] font-bold'
                      : ''
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F97316]" />
                </button>

                {/* Dropdown Menu */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-sand-200/90 py-2.5 z-50 animate-fade-in">
                    <button
                      onClick={() => {
                        setShopDropdownOpen(false);
                        navigateTo('shop');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-[#F97316] hover:bg-sand-50 transition-colors flex items-center justify-between"
                    >
                      <span>All Products & Categories</span>
                      <span>→</span>
                    </button>
                    <div className="h-px bg-sand-200 my-1" />
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:text-[#F97316] hover:bg-sand-50 transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]/60" />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* About Us */}
              <button
                onClick={() => navigateTo('about')}
                className={`py-1 transition-colors hover:text-[#F97316] ${
                  currentView === 'about'
                    ? 'text-[#F97316] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F97316]'
                    : ''
                }`}
              >
                About Us
              </button>

              {/* Contact Us */}
              <button
                onClick={() => navigateTo('contact')}
                className={`py-1 transition-colors hover:text-[#F97316] ${
                  currentView === 'contact'
                    ? 'text-[#F97316] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F97316]'
                    : ''
                }`}
              >
                Contact Us
              </button>

              {/* Policies */}
              <button
                onClick={() => navigateTo('policies')}
                className={`py-1 transition-colors hover:text-[#F97316] ${
                  currentView === 'policies'
                    ? 'text-[#F97316] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F97316]'
                    : ''
                }`}
              >
                Policies
              </button>
            </div>

            {/* Right: Search Input + Wishlist + Account + Cart */}
            <div className="flex items-center gap-3">
              {/* Search Bar matching reference mockup */}
              <form onSubmit={handleHeaderSearch} className="hidden md:flex items-center relative w-56 lg:w-64 xl:w-72">
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Search for books, toys, and more..."
                  className="w-full bg-white text-gray-800 text-xs px-3.5 py-2 pr-10 rounded-full border border-sand-200/90 shadow-2xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition-all"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#F97316] hover:bg-[#C2410C] text-white flex items-center justify-center transition-colors shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-sand-100 transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-xl text-gray-700 hover:text-[#F97316] hover:bg-sand-100 transition-colors"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account Icon */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="p-2 rounded-xl text-gray-700 hover:text-[#F97316] hover:bg-sand-100 transition-colors"
                aria-label="Account details"
              >
                <User className="w-5 h-5" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => navigateTo('admin')}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-forest-800 text-gold-200 text-xs font-bold"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
                  <span>Admin</span>
                </button>
              )}

              {/* Cart Icon with Orange Badge matching reference */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-800 hover:text-[#F97316] transition-colors flex items-center"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#F97316] text-white text-[11px] font-bold leading-none min-w-[18px] text-center">
                  {itemCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                <HkayaLogo onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-gray-500 hover:bg-sand-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm ${
                    currentView === 'home' ? 'bg-[#F97316]/10 text-[#F97316]' : 'text-gray-700'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('shop'); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm ${
                    currentView === 'shop' ? 'bg-[#F97316]/10 text-[#F97316]' : 'text-gray-700'
                  }`}
                >
                  Shop All
                </button>

                <div className="pl-3 py-1 space-y-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Categories
                  </span>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-[#F97316] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]/60" />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('about'); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm ${
                    currentView === 'about' ? 'bg-[#F97316]/10 text-[#F97316]' : 'text-gray-700'
                  }`}
                >
                  About Us
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('contact'); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm ${
                    currentView === 'contact' ? 'bg-[#F97316]/10 text-[#F97316]' : 'text-gray-700'
                  }`}
                >
                  Contact Us
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('policies'); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm ${
                    currentView === 'policies' ? 'bg-[#F97316]/10 text-[#F97316]' : 'text-gray-700'
                  }`}
                >
                  Policies
                </button>
              </div>
            </div>

            {/* Mobile Footer Contact Details */}
            <div className="p-5 bg-sand-50 border-t border-sand-200 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F97316]" />
                <span>0793 477 288</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F97316]" />
                <span>info@hikayakidslibrary.co.ke</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
