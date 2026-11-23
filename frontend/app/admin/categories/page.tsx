'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Layers, X } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    order: 0,
    seoTitle: '',
    seoDescription: '',
  });

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi('/categories');
      setCategories(data || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      imageUrl: '',
      order: categories.length + 1,
      seoTitle: '',
      seoDescription: '',
    });
    setIsModalOpen(true);
  };

  const openEdit = (cat: any) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      imageUrl: cat.imageUrl || '',
      order: cat.order || 0,
      seoTitle: cat.seoTitle || '',
      seoDescription: cat.seoDescription || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description,
        imageUrl: formData.imageUrl,
        order: Number(formData.order),
        seoTitle: formData.seoTitle || undefined,
        seoDescription: formData.seoDescription || undefined,
      };

      if (editingCategory) {
        await fetchApi(`/categories/${editingCategory.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/categories', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      setIsModalOpen(false);
      loadCategories();
    } catch (err: any) {
      alert(`Error saving category: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category '${name}'?`)) return;
    try {
      await fetchApi(`/categories/${id}`, { method: 'DELETE' });
      loadCategories();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest">
            Categories & Collections
          </h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Manage product categories, menu slugs, and collection display order.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-light text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-beige p-5 shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="aspect-video relative rounded-xl overflow-hidden bg-cream mb-4">
                {c.imageUrl && (
                  <Image src={c.imageUrl} alt={c.name} fill className="object-cover" />
                )}
                <span className="absolute top-2 left-2 bg-forest text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Order: #{c.order}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-forest">{c.name}</h3>
              <p className="font-mono text-[11px] text-gold-dark mt-0.5">/{c.slug}</p>
              <p className="text-xs text-charcoal/70 mt-2 line-clamp-2 leading-relaxed">
                {c.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-beige flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal/60">
                {c._count?.products || 0} Products
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => openEdit(c)}
                  className="p-1.5 text-forest hover:bg-cream rounded transition"
                  title="Edit category"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="p-1.5 text-terracotta hover:bg-red-50 rounded transition"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] sm:max-h-[90vh] shadow-2xl border border-beige flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-beige bg-white flex-shrink-0">
              <div>
                <h3 className="font-serif font-bold text-lg text-forest">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h3>
                <p className="text-[11px] text-charcoal/60 mt-0.5">
                  Organize your catalog by Himalayan categories
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

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 space-y-3.5 text-xs custom-scrollbar">
                <div>
                  <label className="font-bold text-charcoal block mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated if empty"
                    className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest font-mono text-[11px]"
                  />
                </div>

                <div>
                  <ImageUpload
                    label="Category Image"
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                    helperText="Upload category thumbnail from your system"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="pt-4 border-t border-beige/80 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-forest">Category SEO Optimization</h4>
                  <div>
                    <label className="font-bold text-xs text-charcoal block mb-1">Custom SEO Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Pure Wild Apricot Oils — Solan Terroir Harvest"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-xs text-charcoal block mb-1">Custom SEO Description</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Cold-pressed from wild Himachal kernels. 100% natural, unrefined, and chemical-free."
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-6 py-4 border-t border-beige bg-gray-50/80 flex justify-end gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-beige rounded-xl hover:bg-cream text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-forest hover:bg-forest-light text-white font-semibold px-5 py-2 rounded-xl transition shadow text-xs"
                >
                  Save Category
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
