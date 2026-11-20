'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, Edit, Trash2, CheckCircle2, XCircle, X, ExternalLink, ArrowUpDown } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaText: 'Explore Products',
    ctaLink: '/shop',
    imageUrl: '',
    order: 0,
    isActive: true,
  });

  const loadBanners = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi('/banners?all=true');
      setBanners(data || []);
    } catch (err) {
      console.error('Failed to load banners:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const openAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      ctaText: 'Explore Products',
      ctaLink: '/shop',
      imageUrl: '',
      order: banners.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (banner: any) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      ctaText: banner.ctaText || 'Explore Products',
      ctaLink: banner.ctaLink || '/shop',
      imageUrl: banner.imageUrl || '',
      order: banner.order ?? 0,
      isActive: banner.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        description: formData.description || null,
        ctaText: formData.ctaText || 'Explore Products',
        ctaLink: formData.ctaLink || '/shop',
        imageUrl: formData.imageUrl,
        order: Number(formData.order),
        isActive: formData.isActive,
      };

      if (editingBanner) {
        await fetchApi(`/banners/${editingBanner.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/banners', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      setIsModalOpen(false);
      loadBanners();
    } catch (err: any) {
      alert(`Error saving banner: ${err.message}`);
    }
  };

  const toggleStatus = async (banner: any) => {
    try {
      await fetchApi(`/banners/${banner.id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      loadBanners();
    } catch (err: any) {
      alert(`Error updating banner: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete banner '${title}'?`)) return;
    try {
      await fetchApi(`/banners/${id}`, { method: 'DELETE' });
      loadBanners();
    } catch (err: any) {
      alert(`Error deleting banner: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Hero & Promotional Banners</h1>
          <p className="text-sm text-stone-500">Manage interactive banners, visual slides, and promotional call-to-actions displayed across the website.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-green hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl p-8 border border-stone-200 text-center text-stone-500">
          Loading banners...
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-stone-200 text-center space-y-4">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-medium text-charcoal">No banners found</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Configure homepage hero slides and seasonal announcement cards to guide customers to specific products or collections.
          </p>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition"
          >
            <Plus className="w-4 h-4" />
            Add First Banner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((b) => (
            <div
              key={b.id}
              className={`bg-white rounded-xl border transition shadow-sm overflow-hidden flex flex-col justify-between ${
                b.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50'
              }`}
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden border-b border-stone-100">
                  {b.imageUrl ? (
                    <Image
                      src={b.imageUrl}
                      alt={b.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3 text-stone-500" /> #{b.order}
                  </div>
                  <button
                    onClick={() => toggleStatus(b)}
                    className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 backdrop-blur-sm shadow-sm transition ${
                      b.isActive ? 'bg-emerald-600/90 text-white hover:bg-emerald-700' : 'bg-stone-600/90 text-white hover:bg-stone-700'
                    }`}
                  >
                    {b.isActive ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Inactive
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  {b.subtitle && (
                    <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block">
                      {b.subtitle}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-lg text-charcoal">{b.title}</h3>
                  {b.description && (
                    <p className="text-xs text-stone-600 line-clamp-2">{b.description}</p>
                  )}
                  <div className="pt-2 flex items-center gap-2 text-xs text-primary-green font-medium">
                    <span>CTA: {b.ctaText}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-500 font-mono truncate max-w-[120px]">{b.ctaLink}</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 px-5 py-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(b)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-primary-green hover:bg-stone-100 rounded transition inline-flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id, b.title)}
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
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Banner Heading *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Pure Himalayan Produce"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Eyebrow / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. TRADITIONALLY SOURCED FROM SOLAN, HIMACHAL PRADESH"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Hand-picked, stone-ground, and sun-dried mountain superfoods packed with natural vitality."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Button (CTA) Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Explore Products"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Button Destination URL
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /shop or /category/apricot-oils"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Banner Image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  required
                  helperText="Upload wide banner or hero image from your system"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveBanner"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-primary-green focus:ring-primary-green w-4 h-4"
                />
                <label htmlFor="isActiveBanner" className="text-sm font-medium text-stone-700 cursor-pointer">
                  Display on website (Active)
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
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
