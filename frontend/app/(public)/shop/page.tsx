'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpDown, 
  SlidersHorizontal,
  Mountain,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ComboCard from '@/components/product/ComboCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { fetchApi } from '@/lib/api';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [combos, setCombos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [prodRes, catRes, brandRes, combosRes] = await Promise.all([
          fetchApi('/products?limit=100'),
          fetchApi('/categories'),
          fetchApi('/brands'),
          fetchApi('/offers/combos').catch(() => []),
        ]);
        setProducts(prodRes?.data || []);
        setCategories(catRes || []);
        setBrands(brandRes || []);
        setCombos(Array.isArray(combosRes) ? combosRes : []);
      } catch (err) {
        console.error('Failed to load shop data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter & Sort logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      p.category?.slug === selectedCategory ||
      p.category?.id === selectedCategory;

    const matchesBrand =
      selectedBrand === 'all' ||
      p.brand?.slug === selectedBrand ||
      p.brand?.id === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.salePrice || a.regularPrice;
    const priceB = b.salePrice || b.regularPrice;

    if (sortBy === 'price_asc') return priceA - priceB;
    if (sortBy === 'price_desc') return priceB - priceA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // default order
  });

  return (
    <div className="bg-cream/20 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Mountain className="w-3.5 h-3.5" />
            <span>Solan Mountain Sourced</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Shop Authentic Himalayan Produce
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl">
            Browse our complete catalogue of unpolished staples, cold-pressed oils, and artisanal mountain treats. Select items to enquire via WhatsApp.
          </p>
        </div>

        {/* Search & Mobile Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-beige shadow-card mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by name, SKU (e.g. SFI-1), or grains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-beige bg-cream/30 focus:outline-none focus:border-forest transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-cream text-forest text-xs font-semibold px-4 py-2 rounded-xl border border-beige"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-charcoal/60 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream/40 border border-beige text-charcoal text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-forest cursor-pointer"
              >
                <option value="featured">Featured / Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Main Layout: Filters Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            
            {/* Categories Filter */}
            <div className="bg-white/85 backdrop-blur-md p-5 rounded-2xl border border-beige/80 shadow-card">
              <h3 className="font-serif font-bold text-sm text-forest mb-3 flex items-center justify-between">
                <span>Categories</span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-[11px] font-sans text-terracotta hover:underline font-normal"
                  >
                    Reset
                  </button>
                )}
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-forest text-white'
                      : 'text-charcoal/80 hover:bg-cream hover:text-forest'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>

                {categories.map((c: any) => (
                  <button
                    key={c.slug}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition flex items-center justify-between ${
                      selectedCategory === c.slug
                        ? 'bg-forest text-white'
                        : 'text-charcoal/80 hover:bg-cream hover:text-forest'
                    }`}
                  >
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="text-[10px] opacity-75">{c._count?.products || ''}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Collections Filter */}
            <div className="bg-white/85 backdrop-blur-md p-5 rounded-2xl border border-beige/80 shadow-card">
              <h3 className="font-serif font-bold text-sm text-forest mb-3 flex items-center justify-between">
                <span>Collections / Brands</span>
                {selectedBrand !== 'all' && (
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className="text-[11px] font-sans text-terracotta hover:underline font-normal"
                  >
                    Reset
                  </button>
                )}
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedBrand('all')}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition ${
                    selectedBrand === 'all'
                      ? 'bg-forest text-white'
                      : 'text-charcoal/80 hover:bg-cream hover:text-forest'
                  }`}
                >
                  All Brands
                </button>
                {brands.map((b: any) => (
                  <button
                    key={b.slug}
                    onClick={() => setSelectedBrand(b.slug)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition ${
                      selectedBrand === b.slug
                        ? 'bg-forest text-white'
                        : 'text-charcoal/80 hover:bg-cream hover:text-forest'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sourcing Guarantee Box */}
            <div className="bg-forest text-cream p-5 rounded-2xl border border-forest-light">
              <div className="flex items-center gap-2 text-gold font-serif font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Purity Assurance</span>
              </div>
              <p className="text-xs text-cream/80 leading-relaxed">
                Every grain, flour, and oil is processed without artificial polishing or synthetic chemical agents. Pure Himalayan heritage from Solan, HP.
              </p>
            </div>

          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            
            {/* Active Filters Display */}
            <div className="flex items-center justify-between mb-4 text-xs text-charcoal/70">
              <div>
                Showing <span className="font-bold text-forest">{sortedProducts.length}</span> of {products.length} products
              </div>
              {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="text-terracotta hover:underline font-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Featured Combo Bundles on Sale */}
            {combos.length > 0 && selectedCategory === 'all' && !searchQuery && (
              <div className="mb-10 bg-forest/5 rounded-3xl p-5 sm:p-6 border border-forest/15 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-forest" />
                      <span>Value Bundles</span>
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest">
                      Himalayan Combo Offers on Sale
                    </h3>
                  </div>
                  <span className="text-xs text-charcoal/60">
                    Hand-curated bundles with special discounted pricing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {combos.map((combo) => (
                    <ComboCard key={combo.id} combo={combo} />
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-beige p-4 h-80 animate-pulse" />
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-beige p-12 text-center space-y-4 shadow-card">
                <ShoppingBag className="w-12 h-12 text-charcoal/30 mx-auto" />
                <h3 className="font-serif font-bold text-lg text-forest">No Products Found</h3>
                <p className="text-xs text-charcoal/60 max-w-sm mx-auto">
                  No products matched your selected filters or search query. Try resetting your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="bg-forest text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-xl flex flex-col p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-beige mb-4">
                <h3 className="font-serif font-bold text-base text-forest">Filter Products</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-charcoal/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category List */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded ${
                      selectedCategory === 'all' ? 'bg-forest text-white' : 'text-charcoal'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c: any) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setMobileFiltersOpen(false);
                      }}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded truncate ${
                        selectedCategory === c.slug ? 'bg-forest text-white' : 'text-charcoal'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brands List */}
              <div>
                <h4 className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-2">
                  Brand / Line
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedBrand('all');
                      setMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded ${
                      selectedBrand === 'all' ? 'bg-forest text-white' : 'text-charcoal'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b: any) => (
                    <button
                      key={b.slug}
                      onClick={() => {
                        setSelectedBrand(b.slug);
                        setMobileFiltersOpen(false);
                      }}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded ${
                        selectedBrand === b.slug ? 'bg-forest text-white' : 'text-charcoal'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
