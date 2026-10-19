import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  matchesAgeGroup,
  getAgeGroupById,
  CATEGORY_ALIASES,
  getProductsForCategory,
  matchesSubcategory,
  getSubName,
  getSubImage,
  getSubAlt,
  getSubDesc
} from '../data/categories';
import ProductCard from '../components/ProductCard';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  ArrowDown,
  MessageCircle
} from 'lucide-react';

export default function ShopView() {
  const {
    products,
    categories,
    ageGroups,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory: storeSubcategory,
    setSelectedSubcategory: setStoreSubcategory,
    selectedAgeGroup,
    setSelectedAgeGroup,
    searchQuery,
    setSearchQuery,
    navigateTo
  } = useStore();

  // Local filter states
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(storeSubcategory || null);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [productType, setProductType] = useState('all'); // 'all' | 'physical' | 'digital'
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'newest' | 'price-low' | 'price-high' | 'bestseller'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync searchQuery prop changes
  useEffect(() => {
    if (searchQuery !== undefined) {
      setLocalSearch(searchQuery);
    }
  }, [searchQuery]);

  // Sync store subcategory when navigated to
  useEffect(() => {
    if (storeSubcategory !== undefined) {
      setSelectedSubcategory(storeSubcategory);
    }
  }, [storeSubcategory]);

  // Reset pagination when category, subcategory, search or sort changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, selectedSubcategory, localSearch, sortBy, maxPrice, productType]);

  // Reset subcategory when selectedCategory changes unless subcategory was specifically passed
  useEffect(() => {
    if (storeSubcategory === undefined) {
      setSelectedSubcategory(null);
    }
  }, [selectedCategory, storeSubcategory]);

  // Active Category & Age Objects
  const currentCategoryObj = useMemo(() => {
    if (!selectedCategory) return null;
    const resolvedId = CATEGORY_ALIASES[selectedCategory] || selectedCategory;
    return categories.find(c => c.id === resolvedId || c.slug === resolvedId || c.id === selectedCategory) || null;
  }, [selectedCategory, categories]);

  const currentAgeObj = useMemo(() => {
    if (!selectedAgeGroup) return null;
    return getAgeGroupById(selectedAgeGroup);
  }, [selectedAgeGroup]);

  // Filtered & Sorted products computation (Peekaboo-inspired category filtering)
  const filteredProducts = useMemo(() => {
    const list = products || [];

    return list.filter((item) => {
      // 1. Age group filter
      if (selectedAgeGroup) {
        if (!matchesAgeGroup(item, selectedAgeGroup)) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory) {
        const matchesCat = getProductsForCategory([item], selectedCategory).length > 0;
        if (!matchesCat) return false;
      }

      // 2.5 Subcategory filter within category
      if (selectedSubcategory && selectedSubcategory !== 'all') {
        if (!matchesSubcategory(item, selectedSubcategory)) {
          return false;
        }
      }

      // 3. Search query
      if (localSearch.trim() !== '') {
        const q = localSearch.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(q);
        const matchesCat = (item.categoryLabel || item.category)?.toLowerCase().includes(q);
        const matchesSub = (item.subCategory || item.subcategory)?.toLowerCase().includes(q);
        const matchesDesc = (item.description || item.shortDescription)?.toLowerCase().includes(q);
        const matchesArabic = item.arabicTitle && item.arabicTitle.includes(q);
        if (!matchesName && !matchesCat && !matchesSub && !matchesDesc && !matchesArabic) {
          return false;
        }
      }

      // 4. Max price
      if (item.price > maxPrice) {
        return false;
      }

      // 5. Product Type
      if (productType === 'physical' && item.isDigital) return false;
      if (productType === 'digital' && !item.isDigital) return false;

      // 6. In Stock
      if (inStockOnly && (item.stock === 0 || item.inStock === false)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return ((b.newArrival || b.new_arrival) ? 1 : 0) - ((a.newArrival || a.new_arrival) ? 1 : 0);
      }
      if (sortBy === 'bestseller') {
        return ((b.bestSeller || b.best_seller) ? 1 : 0) - ((a.bestSeller || a.best_seller) ? 1 : 0);
      }
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;

      // Default: featured
      const aWeight = ((a.featured || a.isStaffPick) ? 3 : 0) + ((a.bestSeller || a.best_seller) ? 2 : 0) + ((a.newArrival || a.new_arrival) ? 1 : 0);
      const bWeight = ((b.featured || b.isStaffPick) ? 3 : 0) + ((b.bestSeller || b.best_seller) ? 2 : 0) + ((b.newArrival || b.new_arrival) ? 1 : 0);
      return bWeight - aWeight;
    });
  }, [products, selectedAgeGroup, selectedCategory, selectedSubcategory, localSearch, maxPrice, productType, inStockOnly, sortBy]);

  // Paginated view of products
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const clearAllFilters = () => {
    setSelectedAgeGroup(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    if (setStoreSubcategory) setStoreSubcategory(null);
    setLocalSearch('');
    setSearchQuery('');
    setMaxPrice(5000);
    setProductType('all');
    setInStockOnly(false);
    setSortBy('featured');
    setVisibleCount(12);
  };

  const hasActiveFilters =
    selectedAgeGroup !== null ||
    selectedCategory !== null ||
    (selectedSubcategory !== null && selectedSubcategory !== 'all') ||
    localSearch.trim() !== '' ||
    maxPrice < 5000 ||
    productType !== 'all' ||
    inStockOnly;

  return (
    <div className="py-8 sm:py-12 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Collection Header */}
        <div className="mb-6 sm:mb-8">
          <div className="text-xs text-charcoal-muted mb-2 flex items-center gap-1.5 font-medium flex-wrap">
            <span
              className="cursor-pointer hover:text-terracotta-700"
              onClick={() => navigateTo('home')}
            >
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-sand-400" />
            <span
              className="cursor-pointer hover:text-terracotta-700"
              onClick={() => navigateTo('categories')}
            >
              Shop by Category
            </span>

            {currentCategoryObj && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-sand-400" />
                <span
                  className={`cursor-pointer hover:text-terracotta-700 ${!selectedSubcategory ? 'text-terracotta-700 font-bold' : ''}`}
                  onClick={() => setSelectedSubcategory(null)}
                >
                  {currentCategoryObj.name}
                </span>
              </>
            )}

            {selectedSubcategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-sand-400" />
                <span className="text-terracotta-700 font-bold">{selectedSubcategory}</span>
              </>
            )}

            {currentAgeObj && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-sand-400" />
                <span
                  className={`font-semibold cursor-pointer hover:text-terracotta-700 ${!currentCategoryObj ? 'text-terracotta-700 font-bold' : ''}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Ages {currentAgeObj.label}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 leading-tight">
                  {selectedSubcategory && currentCategoryObj ? (
                    <span className="flex items-center gap-2">
                      <span>{currentCategoryObj.emoji}</span>
                      <span>{selectedSubcategory}</span>
                    </span>
                  ) : selectedAgeGroup && selectedCategory ? (
                    <span className="flex items-center gap-2">
                      <span>{currentCategoryObj?.emoji}</span>
                      <span>{currentCategoryObj?.name} for Ages {currentAgeObj?.label}</span>
                    </span>
                  ) : selectedAgeGroup ? (
                    <span className="flex items-center gap-2">
                      <span>{currentAgeObj?.emoji}</span>
                      <span>Shopping for Ages {currentAgeObj?.label}</span>
                    </span>
                  ) : currentCategoryObj ? (
                    <span className="flex items-center gap-2">
                      <span>{currentCategoryObj.emoji}</span>
                      <span>{currentCategoryObj.name}</span>
                    </span>
                  ) : localSearch ? (
                    `Search Results for "${localSearch}"`
                  ) : (
                    "All Learning Resources & Books"
                  )}
                </h1>
                {currentCategoryObj?.arabic && !selectedAgeGroup && !selectedSubcategory && (
                  <span className="text-base font-arabic text-terracotta-700 hidden sm:inline">
                    {currentCategoryObj.arabic}
                  </span>
                )}
              </div>

              {/* Header Supporting Text */}
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-2xl leading-relaxed">
                {selectedSubcategory
                  ? `Showing curated ${selectedSubcategory.toLowerCase()} within ${currentCategoryObj?.name}.`
                  : selectedAgeGroup && selectedCategory
                    ? `Showing ${currentCategoryObj?.name.toLowerCase()} suitable for ${currentAgeObj?.label}.`
                    : selectedAgeGroup
                      ? "Explore books, school essentials, learning resources, toys and gifts suitable for this age group."
                      : currentCategoryObj
                        ? currentCategoryObj.description
                        : "Explore our complete collection of storybooks, classroom stationery, school backpacks, bento lunch boxes, educational toys, and celebration gifts."}
              </p>

              {/* Peekaboo-Inspired Subcategory Filter Pills with Images */}
              {currentCategoryObj && currentCategoryObj.subcategories && currentCategoryObj.subcategories.length > 0 && (
                <div className="mt-4 pt-3 border-t border-sand-200/60 flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                  <span className="text-xs font-bold text-forest-900 shrink-0">Subcategories:</span>
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                      selectedSubcategory === null
                        ? 'bg-terracotta-600 text-white shadow-xs font-bold'
                        : 'bg-white border border-sand-200 text-charcoal hover:border-terracotta-300'
                    }`}
                  >
                    All {currentCategoryObj.name} ({getProductsForCategory(products, currentCategoryObj.id).length})
                  </button>
                  {currentCategoryObj.subcategories.map(sub => {
                    const subName = getSubName(sub);
                    const subImg = getSubImage(sub);
                    const subAlt = getSubAlt(sub);
                    const isSelected = selectedSubcategory === subName;
                    const subCount = getProductsForCategory(products, currentCategoryObj.id).filter(p => matchesSubcategory(p, subName)).length;

                    return (
                      <button
                        key={subName}
                        onClick={() => setSelectedSubcategory(isSelected ? null : subName)}
                        className={`shrink-0 px-2.5 py-1.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-terracotta-600 text-white shadow-xs font-bold ring-2 ring-terracotta-400'
                            : 'bg-white border border-sand-200 text-charcoal hover:border-terracotta-300 hover:bg-sand-50/60'
                        }`}
                      >
                        {subImg && (
                          <img
                            src={subImg}
                            alt={subAlt}
                            className="w-5 h-5 rounded-md object-cover shrink-0 border border-sand-200 shadow-2xs"
                            loading="lazy"
                          />
                        )}
                        <span>{subName}</span>
                        {subCount > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${isSelected ? 'bg-terracotta-800 text-white' : 'bg-sand-100 text-charcoal-muted'}`}>
                            {subCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Total matching items badge */}
            <div className="shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-sand-200/90 text-charcoal-light text-xs font-bold border border-sand-300/60">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
              </span>
            </div>
          </div>
        </div>

        {/* Quick Horizontal Department Scrolling Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
            className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === null
                ? 'bg-terracotta-600 text-white shadow-soft'
                : 'bg-white border border-sand-200 text-charcoal hover:border-terracotta-300'
            }`}
          >
            All Departments
          </button>
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id || CATEGORY_ALIASES[selectedCategory] === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? null : c.id);
                  setSelectedSubcategory(null);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-terracotta-600 text-white shadow-soft'
                    : 'bg-white border border-sand-200 text-charcoal hover:border-terracotta-300'
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Top Search & Sorting Toolbar */}
        <div className="bg-white p-4 rounded-3xl border border-sand-200 shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-terracotta-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={currentCategoryObj ? `Search within ${currentCategoryObj.name}...` : "Search by title, topic, or keyword..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-sand-50 border border-sand-200 text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right: Mobile Filter Trigger & Sort Dropdown */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cream-100 border border-sand-200 text-xs font-bold text-forest-900"
            >
              <SlidersHorizontal className="w-4 h-4 text-terracotta-600" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-muted hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl bg-sand-50 border border-sand-200 text-xs font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-400"
              >
                <option value="featured">Featured / Curated</option>
                <option value="bestseller">Best Sellers First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-3xl border border-sand-200 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <h3 className="font-bold text-sm text-forest-900 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-terracotta-600" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-terracotta-700 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset All
                </button>
              )}
            </div>

            {/* 1. Departments Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-forest-900">Departments</h4>
                {selectedCategory && (
                  <button
                    onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                    className="text-[10px] font-bold text-terracotta-700 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1 text-xs max-h-80 overflow-y-auto pr-1">
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex justify-between ${
                    selectedCategory === null
                      ? 'bg-terracotta-50 text-terracotta-800 font-bold'
                      : 'text-charcoal hover:bg-sand-100'
                  }`}
                >
                  <span>All Departments</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = getProductsForCategory(products, cat.id).length;
                  const isSelected = selectedCategory === cat.id || CATEGORY_ALIASES[selectedCategory] === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : cat.id);
                        setSelectedSubcategory(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex justify-between items-center ${
                        isSelected
                          ? 'bg-terracotta-50 text-terracotta-800 font-bold'
                          : 'text-charcoal hover:bg-sand-100'
                      }`}
                    >
                      <span className="truncate pr-2">
                        {cat.emoji} {cat.name}
                      </span>
                      <span className="text-charcoal-muted text-[11px] shrink-0">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Subcategories Sidebar Filter (when a department is active) */}
            {currentCategoryObj && currentCategoryObj.subcategories && (
              <div className="pt-4 border-t border-sand-200">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-bold text-forest-900">Subcategories</h4>
                  {selectedSubcategory && (
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className="text-[10px] font-bold text-terracotta-700 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex justify-between ${
                      selectedSubcategory === null
                        ? 'bg-forest-900 text-white font-bold'
                        : 'text-charcoal hover:bg-sand-100'
                    }`}
                  >
                    <span>All Subcategories</span>
                    <span>{getProductsForCategory(products, currentCategoryObj.id).length}</span>
                  </button>
                  {currentCategoryObj.subcategories.map(sub => {
                    const subName = getSubName(sub);
                    const subImg = getSubImage(sub);
                    const subAlt = getSubAlt(sub);
                    const isSelected = selectedSubcategory === subName;
                    const subCount = getProductsForCategory(products, currentCategoryObj.id).filter(p => matchesSubcategory(p, subName)).length;

                    return (
                      <button
                        key={subName}
                        onClick={() => setSelectedSubcategory(isSelected ? null : subName)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors font-medium flex justify-between items-center gap-2 ${
                          isSelected
                            ? 'bg-forest-900 text-white font-bold'
                            : 'text-charcoal hover:bg-sand-100'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {subImg && (
                            <img
                              src={subImg}
                              alt={subAlt}
                              className="w-5 h-5 rounded-md object-cover shrink-0 border border-sand-200"
                              loading="lazy"
                            />
                          )}
                          <span className="truncate">{subName}</span>
                        </span>
                        <span className={`text-xs shrink-0 ${isSelected ? 'text-gold-300 font-bold' : 'text-charcoal-muted'}`}>
                          {subCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Price Filter Slider */}
            <div className="pt-4 border-t border-sand-200">
              <div className="flex justify-between items-center text-xs font-bold text-forest-900 mb-2">
                <span>Max Price:</span>
                <span className="text-terracotta-700">KSh {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-terracotta-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-muted mt-1">
                <span>KSh 500</span>
                <span>KSh 5,000</span>
              </div>
            </div>

            {/* 4. Product Format */}
            <div className="pt-4 border-t border-sand-200">
              <h4 className="text-xs font-bold text-forest-900 mb-2">Format</h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Formats' },
                  { id: 'physical', label: 'Physical Products' },
                  { id: 'digital', label: 'Printable Digital PDFs' }
                ].map(type => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="prodType"
                      checked={productType === type.id}
                      onChange={() => setProductType(type.id)}
                      className="text-terracotta-600 focus:ring-terracotta-500"
                    />
                    <span className="text-charcoal font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. In Stock Toggle */}
            <div className="pt-4 border-t border-sand-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-terracotta-600 focus:ring-terracotta-500"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            
            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3.5 bg-white rounded-2xl border border-sand-200 shadow-xs">
                <span className="text-xs text-charcoal-muted font-bold">Active Filters:</span>
                
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-900 text-xs font-bold border border-terracotta-200">
                    <span>Department: {currentCategoryObj?.name}</span>
                    <button
                      onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                      className="hover:text-rose-600 transition-colors"
                      title="Clear Department Filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedSubcategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-bold border border-forest-200">
                    <span>Subcategory: {selectedSubcategory}</span>
                    <button
                      onClick={() => setSelectedSubcategory(null)}
                      className="hover:text-rose-600 transition-colors"
                      title="Clear Subcategory Filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {localSearch && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 text-forest-900 text-xs font-bold">
                    <span>Query: "{localSearch}"</span>
                    <button
                      onClick={() => setLocalSearch('')}
                      className="hover:text-rose-600 transition-colors"
                      title="Clear Search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-charcoal-muted hover:text-charcoal hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-sand-200 shadow-soft">
                {(() => {
                  const activeSubObj = currentCategoryObj?.subcategories?.find(s => getSubName(s) === selectedSubcategory);
                  const activeSubImg = getSubImage(activeSubObj);
                  const activeSubAlt = getSubAlt(activeSubObj);

                  if (activeSubImg) {
                    return (
                      <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 border border-sand-200/90 shadow-sm bg-sand-100">
                        <img
                          src={activeSubImg}
                          alt={activeSubAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  }

                  return (
                    <div className="w-16 h-16 rounded-2xl bg-sand-200 text-charcoal-muted flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 opacity-40" />
                    </div>
                  );
                })()}

                <h3 className="font-bold text-lg text-forest-900">
                  {selectedSubcategory ? `Curating items for "${selectedSubcategory}"` : "No matching products found"}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-md mx-auto leading-relaxed">
                  {selectedSubcategory
                    ? `We are curating and stocking new products for this subcategory. Check back soon, or chat with our team on WhatsApp to request specific items or reserve copies!`
                    : `No products currently match this combination within ${currentCategoryObj?.name || 'this department'}. Try selecting a different subcategory or clearing the search terms.`}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {selectedSubcategory && (
                    <>
                      <a
                        href="https://wa.me/254700000000?text=Hello%20Hikaya!%20I%20am%20looking%20for%20items%20in%20the%20collection"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-soft transition-colors inline-flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setSelectedSubcategory(null)}
                        className="px-5 py-2.5 rounded-2xl bg-sand-100 hover:bg-sand-200 text-forest-900 font-bold text-xs transition-colors"
                      >
                        Show All in {currentCategoryObj?.name}
                      </button>
                    </>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-soft transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Peekaboo-Style Pagination / Load More Option */}
                {filteredProducts.length > visibleCount && (
                  <div className="mt-12 text-center bg-white rounded-3xl p-6 sm:p-8 border border-sand-200/90 shadow-soft">
                    <p className="text-xs text-charcoal-muted mb-2 font-medium">
                      Showing <span className="font-bold text-forest-900">{visibleCount}</span> of <span className="font-bold text-forest-900">{filteredProducts.length}</span> products
                    </p>
                    <div className="w-56 h-1.5 bg-sand-200 rounded-full mx-auto mb-5 overflow-hidden">
                      <div
                        className="h-full bg-terracotta-600 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.round((visibleCount / filteredProducts.length) * 100))}%` }}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-soft transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>Load More Products</span>
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setVisibleCount(filteredProducts.length)}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-sand-100 hover:bg-sand-200 text-forest-900 font-semibold text-xs transition-colors"
                      >
                        View All ({filteredProducts.length})
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-cream-50 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                  <h3 className="font-bold text-base text-forest-900">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-xl text-charcoal hover:bg-sand-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Departments */}
                <div>
                  <h4 className="text-xs font-bold text-forest-900 mb-2">Departments</h4>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCategory(c.id);
                          setSelectedSubcategory(null);
                          setMobileFiltersOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                          selectedCategory === c.id ? 'bg-terracotta-600 text-white' : 'bg-white text-charcoal'
                        }`}
                      >
                        <span>{c.emoji} {c.name}</span>
                        <span>{getProductsForCategory(products, c.id).length}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Subcategories */}
                {currentCategoryObj && (
                  <div>
                    <h4 className="text-xs font-bold text-forest-900 mb-2">Subcategories</h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => { setSelectedSubcategory(null); setMobileFiltersOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                          selectedSubcategory === null ? 'bg-forest-900 text-white' : 'bg-white text-charcoal'
                        }`}
                      >
                        All in {currentCategoryObj.name}
                      </button>
                      {currentCategoryObj.subcategories.map((sub) => {
                        const subName = getSubName(sub);
                        const subImg = getSubImage(sub);
                        const subAlt = getSubAlt(sub);

                        return (
                          <button
                            key={subName}
                            onClick={() => {
                              setSelectedSubcategory(subName);
                              setMobileFiltersOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                              selectedSubcategory === subName ? 'bg-forest-900 text-white' : 'bg-white text-charcoal'
                            }`}
                          >
                            {subImg && (
                              <img
                                src={subImg}
                                alt={subAlt}
                                className="w-6 h-6 rounded-md object-cover shrink-0 border border-sand-200"
                                loading="lazy"
                              />
                            )}
                            <span className="truncate">{subName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-sand-200">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 rounded-2xl bg-terracotta-600 text-white text-xs font-bold shadow-soft"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
