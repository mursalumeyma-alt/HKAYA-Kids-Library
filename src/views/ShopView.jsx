import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { matchesAgeGroup, getAgeGroupById } from '../data/categories';
import ProductCard from '../components/ProductCard';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function ShopView() {
  const {
    products,
    categories,
    ageGroups,
    selectedCategory,
    setSelectedCategory,
    selectedAgeGroup,
    setSelectedAgeGroup,
    searchQuery,
    setSearchQuery
  } = useStore();

  // Local filter states
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [productType, setProductType] = useState('all'); // 'all' | 'physical' | 'digital'
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'newest' | 'price-low' | 'price-high' | 'bestseller'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Active Category & Age Objects
  const currentCategoryObj = useMemo(() => {
    if (!selectedCategory) return null;
    return categories.find(c => c.id === selectedCategory || c.slug === selectedCategory) || null;
  }, [selectedCategory, categories]);

  const currentAgeObj = useMemo(() => {
    if (!selectedAgeGroup) return null;
    return getAgeGroupById(selectedAgeGroup);
  }, [selectedAgeGroup]);

  // Filtered & Sorted products computation (Mixed collection)
  const filteredProducts = useMemo(() => {
    const list = products || [];

    return list.filter((item) => {
      // 1. Age group filter using interval boundary overlap
      if (selectedAgeGroup) {
        if (!matchesAgeGroup(item, selectedAgeGroup)) {
          return false;
        }
      }

      // 2. Category filter (works alongside age filter)
      if (selectedCategory) {
        if (item.category !== selectedCategory && item.slug !== selectedCategory) {
          return false;
        }
      }

      // 3. Search query (works alongside age filter without resetting it)
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
  }, [products, selectedAgeGroup, selectedCategory, localSearch, maxPrice, productType, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedAgeGroup(null);
    setSelectedCategory(null);
    setLocalSearch('');
    setMaxPrice(5000);
    setProductType('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedAgeGroup !== null ||
    selectedCategory !== null ||
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
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span
              className="cursor-pointer hover:text-terracotta-700"
              onClick={() => { setSelectedAgeGroup(null); setSelectedCategory(null); }}
            >
              Store Catalog
            </span>

            {currentAgeObj && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span
                  className={`font-semibold cursor-pointer hover:text-terracotta-700 ${!currentCategoryObj ? 'text-terracotta-700 font-bold' : ''}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Ages {currentAgeObj.label}
                </span>
              </>
            )}

            {currentCategoryObj && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-terracotta-700 font-bold">{currentCategoryObj.name}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-forest-900 leading-tight">
                  {selectedAgeGroup && selectedCategory ? (
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
                  ) : (
                    "All Learning Resources & Books"
                  )}
                </h1>
                {currentCategoryObj?.arabic && !selectedAgeGroup && (
                  <span className="text-base font-arabic text-terracotta-700 hidden sm:inline">
                    {currentCategoryObj.arabic}
                  </span>
                )}
              </div>

              {/* Header Supporting Text */}
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-2xl leading-relaxed">
                {selectedAgeGroup && selectedCategory
                  ? `Showing ${currentCategoryObj?.name.toLowerCase()} suitable for ${currentAgeObj?.label}.`
                  : selectedAgeGroup
                    ? "Explore books, school essentials, learning resources, toys and gifts suitable for this age group."
                    : currentCategoryObj
                      ? currentCategoryObj.description
                      : "Explore our complete collection of Islamic books, Qur'an Arabic tools, children's storybooks, puzzles, and school essentials."}
              </p>
            </div>

            {/* Total matching items badge */}
            <div className="shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-sand-200/90 text-charcoal-light text-xs font-bold border border-sand-300/60">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
              </span>
            </div>
          </div>
        </div>

        {/* Quick Age Filter Bar */}
        <div className="mb-4 bg-white p-3.5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-forest-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Shop by Age:</span>
            </span>
            {selectedAgeGroup && (
              <button
                onClick={() => setSelectedAgeGroup(null)}
                className="text-[11px] font-bold text-terracotta-700 hover:underline"
              >
                Clear Age
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedAgeGroup(null)}
              className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedAgeGroup === null
                  ? 'bg-forest-900 text-white shadow-soft'
                  : 'bg-sand-50 border border-sand-200 text-charcoal hover:border-terracotta-300'
              }`}
            >
              All Ages
            </button>
            {ageGroups.map((a) => {
              const isSelected = selectedAgeGroup === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedAgeGroup(isSelected ? null : a.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-forest-950 shadow-soft ring-2 ring-amber-300'
                      : 'bg-sand-50 border border-sand-200 text-charcoal hover:border-terracotta-300'
                  }`}
                >
                  <span>{a.emoji}</span>
                  <span>{a.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Horizontal Category Scrolling Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === null
                ? 'bg-terracotta-600 text-white shadow-soft'
                : 'bg-white border border-sand-200 text-charcoal hover:border-terracotta-300'
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(isSelected ? null : c.id)}
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
          {/* Search Input (Coexists with selected age!) */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-terracotta-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={selectedAgeGroup ? `Search within ages ${currentAgeObj?.label}...` : "Search by title, topic, or keyword..."}
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

            {/* 1. Shop by Age Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-forest-900 flex items-center gap-1.5">
                  <span>👶 Shop by Age</span>
                </h4>
                {selectedAgeGroup && (
                  <button
                    onClick={() => setSelectedAgeGroup(null)}
                    className="text-[10px] font-bold text-terracotta-700 hover:underline"
                  >
                    Clear Age
                  </button>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedAgeGroup(null)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex justify-between ${
                    selectedAgeGroup === null
                      ? 'bg-forest-900 text-white font-bold'
                      : 'text-charcoal hover:bg-sand-100'
                  }`}
                >
                  <span>All Ages</span>
                  <span className={selectedAgeGroup === null ? 'text-forest-200' : 'text-charcoal-muted'}>
                    {products.length}
                  </span>
                </button>
                {ageGroups.map((age) => {
                  const count = products.filter(p => matchesAgeGroup(p, age.id)).length;
                  const isSelected = selectedAgeGroup === age.id;
                  return (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAgeGroup(isSelected ? null : age.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex justify-between items-center ${
                        isSelected
                          ? 'bg-amber-500 text-forest-950 font-bold'
                          : 'text-charcoal hover:bg-sand-100'
                      }`}
                    >
                      <span>{age.emoji} {age.label}</span>
                      <span className={`text-[11px] ${isSelected ? 'text-forest-950/80 font-bold' : 'text-charcoal-muted'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Shop by Category Section */}
            <div className="pt-4 border-t border-sand-200">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-forest-900">Category</h4>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] font-bold text-terracotta-700 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1 text-xs max-h-80 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex justify-between ${
                    selectedCategory === null
                      ? 'bg-terracotta-50 text-terracotta-800 font-bold'
                      : 'text-charcoal hover:bg-sand-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = (products || []).filter(p => {
                    const matchCat = p.category === cat.id;
                    const matchAge = selectedAgeGroup ? matchesAgeGroup(p, selectedAgeGroup) : true;
                    return matchCat && matchAge;
                  }).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
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
                  { id: 'physical', label: 'Physical Books & Toys' },
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

          {/* Right Product Grid (Mixed Age Collection) */}
          <main className="lg:col-span-9">
            
            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3.5 bg-white rounded-2xl border border-sand-200 shadow-xs">
                <span className="text-xs text-charcoal-muted font-bold">Active Filters:</span>
                
                {/* Age Pill */}
                {selectedAgeGroup && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold border border-amber-200">
                    <span>Age: {currentAgeObj?.emoji} {currentAgeObj?.label}</span>
                    <button
                      onClick={() => setSelectedAgeGroup(null)}
                      className="hover:text-rose-600 transition-colors"
                      title="Clear Age Filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {/* Category Pill */}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-900 text-xs font-bold border border-terracotta-200">
                    <span>Category: {currentCategoryObj?.name}</span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:text-rose-600 transition-colors"
                      title="Clear Category Filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {/* Search Query Pill */}
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

                {/* Quick Clear Buttons */}
                <div className="flex items-center gap-3 ml-auto">
                  {selectedAgeGroup && (
                    <button
                      onClick={() => setSelectedAgeGroup(null)}
                      className="text-xs font-bold text-terracotta-700 hover:underline"
                    >
                      Clear Age
                    </button>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-charcoal-muted hover:text-charcoal hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Mixed Collection Grid */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-sand-200 shadow-soft">
                <div className="w-16 h-16 rounded-2xl bg-sand-200 text-charcoal-muted flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-bold text-base text-forest-900">No matching products found</h3>
                <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto leading-relaxed">
                  {selectedAgeGroup
                    ? `No products currently match this combination for Ages ${currentAgeObj?.label}. Try clearing the category or search filter.`
                    : "Try adjusting your filters, price range, or search terms to discover more items."}
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-5 py-2.5 rounded-2xl bg-sand-100 hover:bg-sand-200 text-forest-900 font-bold text-xs"
                    >
                      Clear Category (Show All for {currentAgeObj?.label})
                    </button>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 rounded-2xl bg-terracotta-600 text-white font-bold text-xs shadow-soft"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                   <ProductCard key={product.id} product={product} />
                ))}
              </div>
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
                  <h3 className="font-bold text-base text-forest-900">Filters & Ages</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-lg text-charcoal-muted hover:text-charcoal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Shop by Age */}
                <div>
                  <h4 className="text-xs font-bold text-forest-900 mb-2">👶 Shop by Age</h4>
                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => { setSelectedAgeGroup(null); setMobileFiltersOpen(false); }}
                      className={`w-full text-left py-2 px-2.5 rounded-xl font-medium ${
                        selectedAgeGroup === null ? 'bg-forest-900 text-white font-bold' : 'text-charcoal'
                      }`}
                    >
                      All Ages
                    </button>
                    {ageGroups.map(a => (
                      <button
                        key={a.id}
                        onClick={() => { setSelectedAgeGroup(selectedAgeGroup === a.id ? null : a.id); setMobileFiltersOpen(false); }}
                        className={`w-full text-left py-2 px-2.5 rounded-xl font-medium flex items-center justify-between ${
                          selectedAgeGroup === a.id ? 'bg-amber-500 text-forest-950 font-bold' : 'text-charcoal'
                        }`}
                      >
                        <span>{a.emoji} {a.label}</span>
                        <span className="text-[10px] text-charcoal-muted">
                          {products.filter(p => matchesAgeGroup(p, a.id)).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Categories */}
                <div className="pt-4 border-t border-sand-200">
                  <h4 className="text-xs font-bold text-forest-900 mb-2">Category</h4>
                  <div className="space-y-1 text-xs max-h-60 overflow-y-auto">
                    <button
                      onClick={() => { setSelectedCategory(null); setMobileFiltersOpen(false); }}
                      className={`w-full text-left py-2 px-2.5 rounded-xl font-medium ${
                        selectedCategory === null ? 'bg-terracotta-600 text-white font-bold' : 'text-charcoal'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCategory(selectedCategory === c.id ? null : c.id); setMobileFiltersOpen(false); }}
                        className={`w-full text-left py-2 px-2.5 rounded-xl font-medium ${
                          selectedCategory === c.id ? 'bg-terracotta-50 text-terracotta-800 font-bold' : 'text-charcoal'
                        }`}
                      >
                        {c.emoji} {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-sand-200 space-y-2">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 rounded-2xl bg-forest-800 text-white font-bold text-xs shadow-soft"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={() => { clearAllFilters(); setMobileFiltersOpen(false); }}
                    className="w-full py-2.5 rounded-2xl bg-white border border-sand-200 text-charcoal font-bold text-xs"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
