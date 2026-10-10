import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, AGE_GROUPS } from '../data/categories';
import { api } from '../services/api';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'reading-corner' | 'digital' | 'about' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Live products loaded from SQLite backend API
  const [products, setProducts] = useState(PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(false);
  
  // Modals & Overlays
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Fetch products from SQLite database on mount
  const refreshProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const res = await api.products.getAll({ activeOnly: '1' });
      if (res.success && Array.isArray(res.products) && res.products.length > 0) {
        setProducts(res.products);
      }
    } catch (err) {
      console.warn('[StoreContext] Falling back to pre-seeded catalog:', err.message);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Smooth scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Global keyboard shortcut for search (Cmd/Ctrl + K or Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSelectedProduct(null);
        setSelectedArticle(null);
        setIsWizardOpen(false);
        setIsCheckoutOpen(false);
        setIsAccountOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (view, options = {}) => {
    setCurrentView(view);
    if (options.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options.ageGroup !== undefined) {
      setSelectedAgeGroup(options.ageGroup);
    }
    if (options.searchQuery !== undefined) {
      setSearchQuery(options.searchQuery);
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedAgeGroup,
        setSelectedAgeGroup,
        searchQuery,
        setSearchQuery,
        products,
        setProducts,
        productsLoading,
        refreshProducts,
        categories: CATEGORIES,
        ageGroups: AGE_GROUPS,
        selectedProduct,
        openProductModal,
        closeProductModal,
        selectedArticle,
        setSelectedArticle,
        isSearchOpen,
        setIsSearchOpen,
        isWizardOpen,
        setIsWizardOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        navigateTo
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
