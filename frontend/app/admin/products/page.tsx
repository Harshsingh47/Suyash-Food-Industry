'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    regularPrice: '' as any,
    salePrice: '' as any,
    weight: '',
    categoryId: '',
    brandId: '',
    imageUrl: '',
    shortDescription: '',
    description: '',
    ingredients: '',
    benefits: '',
    storageInstructions: '',
    stockQuantity: 100,
    isFeatured: false,
    isBestSeller: false,
    seoTitle: '',
    seoDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        fetchApi('/products?limit=100&publishedOnly=false'),
        fetchApi('/categories'),
        fetchApi('/brands'),
      ]);
      setProducts(prodRes?.data || []);
      setCategories(catRes || []);
      setBrands(brandRes || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      sku: `SFI-${products.length + 1}`,
      regularPrice: '' as any,
      salePrice: '' as any,
      weight: '',
      categoryId: categories[0]?.id || '',
      brandId: brands[0]?.id || '',
      imageUrl: '',
      shortDescription: '',
      description: '',
      ingredients: '',
      benefits: '',
      storageInstructions: '',
      stockQuantity: 100,
      isFeatured: false,
      isBestSeller: false,
      seoTitle: '',
      seoDescription: '',
      metaKeywords: '',
      canonicalUrl: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      regularPrice: p.regularPrice,
      salePrice: p.salePrice || '',
      weight: p.variations?.[0]?.weight || '',
      categoryId: p.categoryId,
      brandId: p.brandId || '',
      imageUrl: p.images?.[0]?.url || '',
      shortDescription: p.shortDescription || '',
      description: p.description,
      ingredients: p.ingredients || '',
      benefits: p.benefits || '',
      storageInstructions: p.storageInstructions || '',
      stockQuantity: p.stockQuantity || 100,
      isFeatured: p.isFeatured || false,
      isBestSeller: p.isBestSeller || false,
      seoTitle: p.seoTitle || '',
      seoDescription: p.seoDescription || '',
      metaKeywords: p.metaKeywords || '',
      canonicalUrl: p.canonicalUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        sku: formData.sku,
        regularPrice: Number(formData.regularPrice),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        categoryId: formData.categoryId || categories[0]?.id,
        brandId: formData.brandId || undefined,
        shortDescription: formData.shortDescription,
        description: formData.description,
        ingredients: formData.ingredients,
        benefits: formData.benefits,
        storageInstructions: formData.storageInstructions,
        stockQuantity: Number(formData.stockQuantity),
        isFeatured: Boolean(formData.isFeatured),
        isBestSeller: Boolean(formData.isBestSeller),
        seoTitle: formData.seoTitle || undefined,
        seoDescription: formData.seoDescription || undefined,
        metaKeywords: formData.metaKeywords || undefined,
        canonicalUrl: formData.canonicalUrl || undefined,
        images: formData.imageUrl ? [{ url: formData.imageUrl }] : [],
        variations: formData.weight
          ? [{ name: formData.weight, weight: formData.weight, regularPrice: Number(formData.regularPrice), salePrice: formData.salePrice ? Number(formData.salePrice) : null }]
          : [],
      };

      if (editingProduct) {
        await fetchApi(`/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(`Error saving product: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product '${name}'?`)) return;
    try {
      await fetchApi(`/products/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err: any) {
      alert(`Error deleting product: ${err.message}`);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'ALL' || p.category?.slug === selectedCat || p.categoryId === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest">
            Product Catalogue Management
          </h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Manage product descriptions, pricing, variations, stock, and SEO settings.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-light text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter / Search Row */}
      <div className="bg-white p-4 rounded-2xl border border-beige shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-3.5 py-2 rounded-xl border border-beige bg-cream/20 focus:outline-none focus:border-forest"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="text-xs border border-beige rounded-xl px-3 py-2 bg-cream/30 text-charcoal focus:outline-none focus:border-forest cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-beige shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-beige bg-cream/40 text-charcoal/60 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Badges</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/60">
              {filteredProducts.map((p) => {
                const img = p.images?.[0]?.url || '/images/products/lal-chawal-suyash-food-industries.jpeg';
                return (
                  <tr key={p.id} className="hover:bg-cream/20 transition">
                    <td className="p-3.5 flex items-center gap-3 min-w-[200px]">
                      <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-cream flex-shrink-0 border border-beige">
                        <Image src={img} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-forest block truncate max-w-[180px]">{p.name}</span>
                        <span className="text-[10px] text-charcoal/50">{p.brand?.name || 'Suyash Food'}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-forest">
                      {p.sku}
                    </td>
                    <td className="p-3.5 text-charcoal/70">
                      {p.category?.name}
                    </td>
                    <td className="p-3.5 font-bold text-charcoal">
                      ₹{p.salePrice || p.regularPrice}
                      {p.salePrice && p.salePrice < p.regularPrice && (
                        <span className="block text-[10px] text-charcoal/40 line-through">₹{p.regularPrice}</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stockQuantity <= 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {p.stockQuantity} in stock
                      </span>
                    </td>
                    <td className="p-3.5 space-x-1">
                      {p.isFeatured && (
                        <span className="bg-gold/20 text-gold-dark text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                      {p.isBestSeller && (
                        <span className="bg-forest/10 text-forest text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Best Seller
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1 text-forest hover:bg-cream rounded transition"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1 text-terracotta hover:bg-red-50 rounded transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] shadow-2xl border border-beige flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header (Fixed at top) */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-beige bg-white flex-shrink-0">
              <div>
                <h3 className="font-serif font-bold text-xl text-forest">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-[11px] text-charcoal/60 mt-0.5">
                  Configure product details, pricing, and upload an image
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-charcoal/40 hover:text-charcoal hover:bg-cream transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4 text-xs custom-scrollbar">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pure Wild Apricot Oil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-charcoal block mb-1">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Regular Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 399"
                      value={formData.regularPrice || ''}
                      onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value === '' ? ('' as any) : Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Sale Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 349 (optional)"
                      value={formData.salePrice || ''}
                      onChange={(e) => setFormData({ ...formData, salePrice: e.target.value === '' ? ('' as any) : Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Weight / Size</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="e.g. 500g, 250ml"
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Category *</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Brand / Collection</label>
                    <select
                      value={formData.brandId}
                      onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest bg-white"
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <ImageUpload
                  label="Product Image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  required
                  helperText="Upload JPG, PNG, or WEBP directly from your computer"
                />

                <div>
                  <label className="font-bold text-charcoal block mb-1">Short Description / Tagline</label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="e.g. Pure Unpolished Lal Chawal — पाएँ परंपरा का स्वाद"
                    className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Full Detailed Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Ingredients</label>
                    <input
                      type="text"
                      value={formData.ingredients}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Health Benefits</label>
                    <input
                      type="text"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-forest rounded"
                    />
                    <span>Mark as Featured Product</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="w-4 h-4 text-forest rounded"
                    />
                    <span>Mark as Best Seller</span>
                  </label>
                </div>

                {/* Search Engine Optimization (SEO) & Google SERP Preview */}
                <div className="pt-6 border-t border-beige/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-forest text-base flex items-center gap-2">
                        <span>Search Engine Optimization (SEO)</span>
                        <span className="text-[10px] bg-emerald-100 text-forest font-bold px-2 py-0.5 rounded-full">Google SERP Preview</span>
                      </h4>
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        Customize how this product appears in Google search results and social shares.
                      </p>
                    </div>
                  </div>

                  {/* Google SERP Live Simulator Box */}
                  <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1 font-sans">
                    <div className="text-[11px] text-stone-500 font-mono truncate">
                      https://suyashfoodindustries.in &gt; product &gt; <span className="text-stone-700">{formData.slug || (formData.name ? formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'product-slug')}</span>
                    </div>
                    <div className="text-blue-800 hover:underline text-base font-medium leading-tight cursor-pointer">
                      {formData.seoTitle || (formData.name ? `${formData.name} — Authentic Himalayan Produce` : 'Product Name — Suyash Food Industries')}
                    </div>
                    <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-0.5">
                      {formData.seoDescription || formData.shortDescription || 'Buy 100% natural and authentic Himalayan produce from Solan, Himachal Pradesh. Direct farm sourcing and fast WhatsApp enquiry.'}
                    </div>
                  </div>

                  {/* SEO Form Inputs */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-xs text-charcoal">SEO Meta Title</label>
                        <span className={`text-[10px] font-mono ${formData.seoTitle.length > 60 ? 'text-amber-600 font-bold' : 'text-charcoal/50'}`}>
                          {formData.seoTitle.length}/60 chars (Recommended: 50-60)
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Pure Wild Apricot Oil (Chulli) — Cold-Pressed | Solan HP"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest text-xs"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-xs text-charcoal">SEO Meta Description</label>
                        <span className={`text-[10px] font-mono ${formData.seoDescription.length > 160 ? 'text-amber-600 font-bold' : 'text-charcoal/50'}`}>
                          {formData.seoDescription.length}/160 chars (Recommended: 120-155)
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="e.g. Cold-pressed from wild high-altitude apricot kernels in Kinnaur & Solan. Zero refining or heat. Order genuine Chulli oil online via WhatsApp."
                        value={formData.seoDescription}
                        onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-xs text-charcoal block mb-1">Meta Keywords</label>
                        <input
                          type="text"
                          placeholder="e.g. apricot oil, chulli oil, solan himachal, cold pressed"
                          value={formData.metaKeywords}
                          onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-xs text-charcoal block mb-1">Custom Canonical URL (Optional)</label>
                        <input
                          type="text"
                          placeholder="Leave blank to use default URL"
                          value={formData.canonicalUrl}
                          onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer (Fixed at bottom) */}
              <div className="px-6 py-4 sm:px-8 border-t border-beige bg-gray-50/80 flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-beige rounded-xl hover:bg-cream text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-forest hover:bg-forest-light text-white font-semibold px-6 py-2 rounded-xl transition shadow text-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
