'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit, Trash2, Calendar, CheckCircle2, XCircle, X } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    badgeText: 'SEASON SPECIAL',
    discountPercentage: '',
    bannerUrl: '',
    targetCategoryId: '',
    targetProductId: '',
    isActive: true,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [offersData, catsData, prodsData] = await Promise.all([
        fetchApi('/offers?all=true'),
        fetchApi('/categories'),
        fetchApi('/products?limit=100'),
      ]);
      setOffers(offersData || []);
      setCategories(catsData || []);
      setProducts(prodsData?.data || []);
    } catch (err) {
      console.error('Failed to load offers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      subtitle: '',
      badgeText: 'SPECIAL OFFER',
      discountPercentage: '',
      bannerUrl: '',
      targetCategoryId: '',
      targetProductId: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (offer: any) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      subtitle: offer.subtitle || '',
      badgeText: offer.badgeText || '',
      discountPercentage: offer.discountPercentage ? String(offer.discountPercentage) : '',
      bannerUrl: offer.bannerUrl || '',
      targetCategoryId: offer.targetCategoryId || '',
      targetProductId: offer.targetProductId || '',
      isActive: offer.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        badgeText: formData.badgeText || null,
        discountPercentage: formData.discountPercentage ? parseFloat(formData.discountPercentage) : null,
        bannerUrl: formData.bannerUrl || null,
        targetCategoryId: formData.targetCategoryId || null,
        targetProductId: formData.targetProductId || null,
        isActive: formData.isActive,
      };

      if (editingOffer) {
        await fetchApi(`/offers/${editingOffer.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/offers', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(`Error saving offer: ${err.message}`);
    }
  };

  const toggleStatus = async (offer: any) => {
    try {
      await fetchApi(`/offers/${offer.id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: !offer.isActive }),
      });
      loadData();
    } catch (err: any) {
      alert(`Error updating offer: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete offer '${title}'?`)) return;
    try {
      await fetchApi(`/offers/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err: any) {
      alert(`Error deleting offer: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Promotions & Offers</h1>
          <p className="text-sm text-stone-500">Create and manage seasonal campaigns, promotional discounts, and catalogue highlight badges.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-green hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Offer
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl p-8 border border-stone-200 text-center text-stone-500">
          Loading promotions...
        </div>
      ) : offers.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-stone-200 text-center space-y-4">
          <Tag className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-medium text-charcoal">No promotional offers created yet</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Create your first offer to showcase seasonal discounts or highlight specific categories and products across the website.
          </p>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition"
          >
            <Plus className="w-4 h-4" />
            Create First Offer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-xl border transition shadow-sm overflow-hidden flex flex-col justify-between ${
                offer.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50'
              }`}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {offer.badgeText && (
                      <span className="px-2 py-0.5 bg-accent-gold/20 text-accent-gold rounded text-xs font-bold uppercase tracking-wider">
                        {offer.badgeText}
                      </span>
                    )}
                    {offer.discountPercentage && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">
                        {offer.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleStatus(offer)}
                    className={`text-xs px-2 py-1 rounded-full font-medium inline-flex items-center gap-1 transition ${
                      offer.isActive ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                    }`}
                  >
                    {offer.isActive ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Inactive
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-charcoal">{offer.title}</h3>
                  {offer.subtitle && <p className="text-sm text-stone-600 mt-1">{offer.subtitle}</p>}
                </div>

                <div className="pt-2 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                  {offer.targetCategory && (
                    <p>
                      <span className="font-medium text-stone-700">Category:</span> {offer.targetCategory.name}
                    </p>
                  )}
                  {offer.targetProduct && (
                    <p>
                      <span className="font-medium text-stone-700">Product:</span> {offer.targetProduct.name} ({offer.targetProduct.sku})
                    </p>
                  )}
                  <p className="flex items-center gap-1 text-stone-400">
                    <Calendar className="w-3 h-3" /> Created {new Date(offer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 px-5 py-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(offer)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-primary-green hover:bg-stone-100 rounded transition inline-flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id, offer.title)}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-charcoal">
                {editingOffer ? 'Edit Promotion' : 'Create New Promotion'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Himalayan Harvest Festival"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Direct cold-pressed Himalayan Apricot Oil at exclusive wholesale prices"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SPECIAL OFFER"
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    placeholder="e.g. 15"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Target Category (Optional)
                  </label>
                  <select
                    value={formData.targetCategoryId}
                    onChange={(e) => setFormData({ ...formData, targetCategoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  >
                    <option value="">-- All Categories --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Target Product (Optional)
                  </label>
                  <select
                    value={formData.targetProductId}
                    onChange={(e) => setFormData({ ...formData, targetProductId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  >
                    <option value="">-- All Products --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.sku})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveOffer"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-primary-green focus:ring-primary-green w-4 h-4"
                />
                <label htmlFor="isActiveOffer" className="text-sm font-medium text-stone-700 cursor-pointer">
                  Activate this offer immediately
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-green hover:bg-primary-dark text-white rounded-lg text-sm font-medium shadow-sm transition"
                >
                  {editingOffer ? 'Update Offer' : 'Save Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
