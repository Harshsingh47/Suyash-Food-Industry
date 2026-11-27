'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  X, 
  ShoppingBag, 
  Package, 
  Sparkles, 
  Star, 
  Percent, 
  Search, 
  ArrowRight, 
  Check, 
  Layers,
  Info,
  TrendingDown,
  Gift
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import ImageUpload from '@/components/admin/ImageUpload';

interface SelectedProductItem {
  productId: string;
  quantity: number;
  customNote?: string;
  product?: any;
}

export default function AdminOffersPage() {
  const [activeTab, setActiveTab] = useState<'combos' | 'promotions'>('combos');
  
  // Data states
  const [combos, setCombos] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Standard Offer Modal State
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<any | null>(null);
  const [offerFormData, setOfferFormData] = useState({
    title: '',
    subtitle: '',
    badgeText: 'SEASON SPECIAL',
    discountPercentage: '',
    bannerUrl: '',
    targetCategoryId: '',
    targetProductId: '',
    isActive: true,
  });

  // Combo Modal State
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<any | null>(null);
  const [comboFormData, setComboFormData] = useState({
    title: '',
    slug: '',
    description: '',
    badgeText: 'COMBO SAVER',
    imageUrl: '',
    salePrice: '',
    isActive: true,
    isFeatured: false,
    startDate: '',
    endDate: '',
  });
  const [selectedItems, setSelectedItems] = useState<SelectedProductItem[]>([]);
  
  // Product picker filters inside Combo Modal
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerCategory, setPickerCategory] = useState('ALL');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [combosData, offersData, catsData, prodsData] = await Promise.all([
        fetchApi('/offers/combos?all=true').catch(() => []),
        fetchApi('/offers?all=true').catch(() => []),
        fetchApi('/categories').catch(() => []),
        fetchApi('/products?limit=100&publishedOnly=false').catch(() => ({ data: [] })),
      ]);
      setCombos(Array.isArray(combosData) ? combosData : []);
      setOffers(Array.isArray(offersData) ? offersData : []);
      setCategories(Array.isArray(catsData) ? catsData : []);
      setProducts(prodsData?.data || (Array.isArray(prodsData) ? prodsData : []));
    } catch (err) {
      console.error('Failed to load promotions & combos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Helper to extract a product's price
  const getProductPrice = (p: any): number => {
    if (!p) return 0;
    if (p.salePrice && p.salePrice > 0) return Number(p.salePrice);
    if (p.regularPrice && p.regularPrice > 0) return Number(p.regularPrice);
    if (p.basePrice && p.basePrice > 0) return Number(p.basePrice);
    if (p.variations && p.variations.length > 0) {
      const firstVar = p.variations[0];
      return Number(firstVar.salePrice || firstVar.regularPrice || 0);
    }
    return 0;
  };

  // Helper to get product image
  const getProductImage = (p: any): string => {
    if (!p) return '/images/products/lal-chawal-suyash-food-industries.jpeg';
    if (p.images && p.images.length > 0 && p.images[0].url) {
      return p.images[0].url;
    }
    if (p.imageUrl) return p.imageUrl;
    return '/images/products/lal-chawal-suyash-food-industries.jpeg';
  };

  // Calculate live total original price of selected items in combo modal
  const totalOriginalPrice = useMemo(() => {
    return selectedItems.reduce((acc, item) => {
      const prod = products.find((p) => p.id === item.productId) || item.product;
      const unitPrice = getProductPrice(prod);
      return acc + unitPrice * (item.quantity || 1);
    }, 0);
  }, [selectedItems, products]);

  // Live discount percentage and savings
  const liveSavings = useMemo(() => {
    const saleNum = parseFloat(comboFormData.salePrice) || 0;
    if (saleNum > 0 && totalOriginalPrice > saleNum) {
      return totalOriginalPrice - saleNum;
    }
    return 0;
  }, [totalOriginalPrice, comboFormData.salePrice]);

  const liveDiscountPercent = useMemo(() => {
    if (totalOriginalPrice > 0 && liveSavings > 0) {
      return Math.round((liveSavings / totalOriginalPrice) * 100);
    }
    return 0;
  }, [totalOriginalPrice, liveSavings]);

  // Filter products for the picker modal
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = pickerCategory === 'ALL' || p.categoryId === pickerCategory;
      const matchesSearch =
        !pickerSearch.trim() ||
        p.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(pickerSearch.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [products, pickerCategory, pickerSearch]);

  // -------------------------------------------------------------
  // Combo Offer Handlers
  // -------------------------------------------------------------
  const openAddCombo = () => {
    setEditingCombo(null);
    setComboFormData({
      title: '',
      slug: '',
      description: '',
      badgeText: 'SPECIAL COMBO',
      imageUrl: '',
      salePrice: '',
      isActive: true,
      isFeatured: false,
      startDate: '',
      endDate: '',
    });
    setSelectedItems([]);
    setPickerSearch('');
    setPickerCategory('ALL');
    setIsComboModalOpen(true);
  };

  const openEditCombo = (combo: any) => {
    setEditingCombo(combo);
    setComboFormData({
      title: combo.title || '',
      slug: combo.slug || '',
      description: combo.description || '',
      badgeText: combo.badgeText || '',
      imageUrl: combo.imageUrl || '',
      salePrice: combo.salePrice ? String(combo.salePrice) : '',
      isActive: combo.isActive ?? true,
      isFeatured: combo.isFeatured ?? false,
      startDate: combo.startDate ? combo.startDate.slice(0, 10) : '',
      endDate: combo.endDate ? combo.endDate.slice(0, 10) : '',
    });

    const items: SelectedProductItem[] = (combo.items || []).map((it: any) => ({
      productId: it.productId,
      quantity: it.quantity || 1,
      customNote: it.customNote || '',
      product: it.product,
    }));
    setSelectedItems(items);
    setPickerSearch('');
    setPickerCategory('ALL');
    setIsComboModalOpen(true);
  };

  const toggleProductInCombo = (prod: any) => {
    const existingIndex = selectedItems.findIndex((it) => it.productId === prod.id);
    if (existingIndex >= 0) {
      // Remove
      setSelectedItems(selectedItems.filter((it) => it.productId !== prod.id));
    } else {
      // Add with default qty 1
      const newItem: SelectedProductItem = {
        productId: prod.id,
        quantity: 1,
        customNote: '',
        product: prod,
      };
      setSelectedItems([...selectedItems, newItem]);

      // If no combo image yet, auto-suggest this product's image
      if (!comboFormData.imageUrl) {
        const prodImg = getProductImage(prod);
        if (prodImg) {
          setComboFormData((prev) => ({ ...prev, imageUrl: prodImg }));
        }
      }
    }
  };

  const updateItemQuantity = (productId: string, delta: number) => {
    setSelectedItems(
      selectedItems.map((it) => {
        if (it.productId === productId) {
          const newQty = Math.max(1, (it.quantity || 1) + delta);
          return { ...it, quantity: newQty };
        }
        return it;
      })
    );
  };

  const updateItemNote = (productId: string, customNote: string) => {
    setSelectedItems(
      selectedItems.map((it) => {
        if (it.productId === productId) {
          return { ...it, customNote };
        }
        return it;
      })
    );
  };

  const handleComboSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length < 2) {
      alert('A Combo Offer must contain at least 2 products from any categories.');
      return;
    }

    const saleNum = parseFloat(comboFormData.salePrice);
    if (!saleNum || saleNum <= 0) {
      alert('Please enter a valid Combo Sale Price.');
      return;
    }

    setIsSaving(true);
    try {
      const payload: any = {
        title: comboFormData.title.trim(),
        slug: comboFormData.slug.trim() || undefined,
        description: comboFormData.description.trim() || null,
        badgeText: comboFormData.badgeText.trim() || 'COMBO OFFER',
        imageUrl: comboFormData.imageUrl.trim() || null,
        originalPrice: totalOriginalPrice,
        salePrice: saleNum,
        savingsAmount: Math.max(0, totalOriginalPrice - saleNum),
        discountPercentage: liveDiscountPercent,
        isActive: comboFormData.isActive,
        isFeatured: comboFormData.isFeatured,
        startDate: comboFormData.startDate ? new Date(comboFormData.startDate).toISOString() : null,
        endDate: comboFormData.endDate ? new Date(comboFormData.endDate).toISOString() : null,
        items: selectedItems.map((it) => ({
          productId: it.productId,
          quantity: it.quantity || 1,
          customNote: it.customNote?.trim() || null,
        })),
      };

      if (editingCombo) {
        await fetchApi(`/offers/combos/${editingCombo.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/offers/combos', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      setIsComboModalOpen(false);
      await loadData();
    } catch (err: any) {
      alert(`Error saving combo offer: ${err.message || err}`);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleComboStatus = async (combo: any) => {
    try {
      await fetchApi(`/offers/combos/${combo.id}/toggle`, {
        method: 'PATCH',
      });
      loadData();
    } catch (err: any) {
      alert(`Error toggling combo status: ${err.message}`);
    }
  };

  const handleDeleteCombo = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete combo offer "${title}"?`)) return;
    try {
      await fetchApi(`/offers/combos/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err: any) {
      alert(`Error deleting combo offer: ${err.message}`);
    }
  };

  // -------------------------------------------------------------
  // Standard Offer / Banner Handlers
  // -------------------------------------------------------------
  const openAddOffer = () => {
    setEditingOffer(null);
    setOfferFormData({
      title: '',
      subtitle: '',
      badgeText: 'SEASON SPECIAL',
      discountPercentage: '',
      bannerUrl: '',
      targetCategoryId: '',
      targetProductId: '',
      isActive: true,
    });
    setIsOfferModalOpen(true);
  };

  const openEditOffer = (offer: any) => {
    setEditingOffer(offer);
    setOfferFormData({
      title: offer.title,
      subtitle: offer.subtitle || '',
      badgeText: offer.badgeText || '',
      discountPercentage: offer.discountPercentage ? String(offer.discountPercentage) : '',
      bannerUrl: offer.bannerUrl || '',
      targetCategoryId: offer.targetCategoryId || '',
      targetProductId: offer.targetProductId || '',
      isActive: offer.isActive ?? true,
    });
    setIsOfferModalOpen(true);
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: offerFormData.title,
        subtitle: offerFormData.subtitle || null,
        badgeText: offerFormData.badgeText || null,
        discountPercentage: offerFormData.discountPercentage ? parseFloat(offerFormData.discountPercentage) : null,
        bannerUrl: offerFormData.bannerUrl || null,
        targetCategoryId: offerFormData.targetCategoryId || null,
        targetProductId: offerFormData.targetProductId || null,
        isActive: offerFormData.isActive,
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

      setIsOfferModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(`Error saving offer: ${err.message}`);
    }
  };

  const toggleOfferStatus = async (offer: any) => {
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

  const handleDeleteOffer = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete promotional banner "${title}"?`)) return;
    try {
      await fetchApi(`/offers/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err: any) {
      alert(`Error deleting offer: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-forest/10 text-forest rounded-xl">
              <Gift className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-serif font-bold text-charcoal">
              Offers & Promotions Manager
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Create high-converting multi-product combo bundles on sale, and manage promotional discount banners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'combos' ? (
            <button
              onClick={openAddCombo}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-forest hover:bg-forest-light text-white rounded-xl text-xs font-semibold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Combo Offer
            </button>
          ) : (
            <button
              onClick={openAddOffer}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-forest hover:bg-forest-light text-white rounded-xl text-xs font-semibold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Promotional Banner
            </button>
          )}
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('combos')}
          className={`relative pb-3 px-4 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'combos'
              ? 'text-forest border-b-2 border-forest'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Combo Offers & Bundles</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest/10 text-forest">
            {combos.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`relative pb-3 px-4 text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'promotions'
              ? 'text-forest border-b-2 border-forest'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Promotional Badges & Banners</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600">
            {offers.length}
          </span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: COMBO OFFERS & BUNDLES                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'combos' && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center text-stone-400">
              <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading combo offers...
            </div>
          ) : combos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center space-y-4 max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal">No Combo Offers Created Yet</h3>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                  Combine 2 or more products from different categories (e.g. Desi Cow Ghee + Himalayan Apricot Oil + Kinnauri Red Rajma) into an attractive value bundle with a discounted sale price.
                </p>
              </div>
              <button
                onClick={openAddCombo}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white rounded-xl text-xs font-semibold hover:bg-forest-light transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create First Combo Offer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combos.map((combo) => {
                const comboImg =
                  combo.imageUrl ||
                  (combo.items?.[0]?.product ? getProductImage(combo.items[0].product) : '/images/products/lal-chawal-suyash-food-industries.jpeg');

                return (
                  <div
                    key={combo.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md ${
                      combo.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50/50'
                    }`}
                  >
                    <div>
                      {/* Combo Cover Image with Badges */}
                      <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                        <Image
                          src={comboImg}
                          alt={combo.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {combo.badgeText && (
                              <span className="px-2.5 py-1 bg-gold text-forest-dark font-bold text-[10px] rounded-lg tracking-wider uppercase shadow-sm">
                                {combo.badgeText}
                              </span>
                            )}
                            {combo.discountPercentage > 0 && (
                              <span className="px-2.5 py-1 bg-red-600 text-white font-bold text-[10px] rounded-lg shadow-sm">
                                {combo.discountPercentage}% OFF
                              </span>
                            )}
                            {combo.isFeatured && (
                              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-forest font-bold text-[10px] rounded-lg inline-flex items-center gap-1 shadow-sm">
                                <Star className="w-3 h-3 fill-gold text-gold" /> Featured
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => toggleComboStatus(combo)}
                            className={`text-[10px] px-2.5 py-1 rounded-lg font-bold inline-flex items-center gap-1 backdrop-blur-md shadow-sm transition ${
                              combo.isActive
                                ? 'bg-emerald-600/90 text-white hover:bg-emerald-700'
                                : 'bg-stone-800/80 text-stone-200 hover:bg-stone-900'
                            }`}
                          >
                            {combo.isActive ? (
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

                        {/* Bottom overlay title info */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-gold drop-shadow-sm">
                            {combo.items?.length || 0} Products Bundled
                          </p>
                          <h3 className="font-serif font-bold text-base leading-tight drop-shadow-md">
                            {combo.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-3.5">
                        {combo.description && (
                          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                            {combo.description}
                          </p>
                        )}

                        {/* Included Products List */}
                        <div className="space-y-1.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            Bundled Products ({combo.items?.length || 0}):
                          </p>
                          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                            {combo.items?.map((it: any) => {
                              const p = it.product;
                              const pImg = getProductImage(p);
                              return (
                                <div
                                  key={it.id || it.productId}
                                  className="flex items-center justify-between text-xs py-1 border-b border-stone-200/60 last:border-0"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-6 h-6 relative rounded bg-white overflow-hidden flex-shrink-0 border border-stone-200">
                                      <Image src={pImg} alt={p?.name || 'Product'} fill className="object-cover" />
                                    </div>
                                    <div className="truncate">
                                      <span className="font-medium text-stone-800 block truncate">
                                        {it.quantity > 1 ? `${it.quantity}x ` : ''}
                                        {p?.name || 'Product'}
                                      </span>
                                      {it.customNote && (
                                        <span className="text-[9px] text-stone-400 block truncate">
                                          {it.customNote}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-semibold text-stone-500 flex-shrink-0 ml-2">
                                    {p?.category?.name || ''}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Price Card */}
                        <div className="bg-forest/5 rounded-xl p-3 border border-forest/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-stone-500 block">Combo Sale Price</span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold font-serif text-forest">
                                ₹{combo.salePrice?.toLocaleString('en-IN')}
                              </span>
                              {combo.originalPrice > combo.salePrice && (
                                <span className="text-xs text-stone-400 line-through">
                                  ₹{combo.originalPrice?.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                          </div>

                          {combo.savingsAmount > 0 && (
                            <div className="text-right">
                              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                                Save ₹{combo.savingsAmount?.toLocaleString('en-IN')}
                              </span>
                              <span className="block text-[9px] text-stone-400 mt-0.5">
                                ({combo.discountPercentage}% off)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-stone-50 px-4 py-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(combo.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditCombo(combo)}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-forest hover:bg-stone-100 rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCombo(combo.id, combo.title)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: PROMOTIONAL BANNERS / BADGES                           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'promotions' && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center text-stone-400">
              Loading banners...
            </div>
          ) : offers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center space-y-4 max-w-xl mx-auto shadow-sm">
              <Tag className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-charcoal">No Promotional Banners Created</h3>
              <p className="text-stone-500 text-xs">
                Create promotional banners to highlight seasonal discounts on specific categories or single products.
              </p>
              <button
                onClick={openAddOffer}
                className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white rounded-xl text-xs font-semibold hover:bg-forest-light transition"
              >
                <Plus className="w-4 h-4" />
                Add First Banner
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`bg-white rounded-2xl border transition shadow-sm overflow-hidden flex flex-col justify-between ${
                    offer.isActive ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50'
                  }`}
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {offer.badgeText && (
                          <span className="px-2 py-0.5 bg-gold/20 text-forest-dark rounded-md text-[10px] font-bold uppercase tracking-wider">
                            {offer.badgeText}
                          </span>
                        )}
                        {offer.discountPercentage && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-md text-[10px] font-bold">
                            {offer.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleOfferStatus(offer)}
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 transition ${
                          offer.isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                      >
                        {offer.isActive ? (
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

                    <div>
                      <h3 className="font-serif font-bold text-base text-charcoal">{offer.title}</h3>
                      {offer.subtitle && <p className="text-xs text-stone-600 mt-1">{offer.subtitle}</p>}
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
                      <p className="flex items-center gap-1 text-stone-400 text-[10px]">
                        <Calendar className="w-3 h-3" /> Created {new Date(offer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-50 px-4 py-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditOffer(offer)}
                      className="px-3 py-1 text-xs font-semibold text-stone-700 hover:text-forest hover:bg-stone-100 rounded-lg transition inline-flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer.id, offer.title)}
                      className="px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* COMBO OFFER CREATOR / EDITOR MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {isComboModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-stone-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-forest/10 text-forest rounded-xl">
                  <Gift className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-serif font-bold text-charcoal">
                    {editingCombo ? 'Edit Combo Offer' : 'Create New Combo Offer'}
                  </h2>
                  <p className="text-[11px] text-stone-500">
                    Bundle products from multiple categories and set a special discounted combo price.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsComboModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 2 Column Grid */}
            <form onSubmit={handleComboSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Combo Metadata & Cover Image (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-stone-50/60 p-4 rounded-2xl border border-stone-200/80 space-y-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> 1. Bundle Details
                    </h3>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Combo Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Himalayan Purity Trio (Ghee + Apricot Oil + Rajma)"
                        value={comboFormData.title}
                        onChange={(e) => setComboFormData({ ...comboFormData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        URL Slug (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. himalayan-purity-trio (auto-generated if empty)"
                        value={comboFormData.slug}
                        onChange={(e) => setComboFormData({ ...comboFormData, slug: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SPECIAL COMBO, SAVE 25%, BESTSELLER BUNDLE"
                        value={comboFormData.badgeText}
                        onChange={(e) => setComboFormData({ ...comboFormData, badgeText: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe what makes this combo special, health benefits, authentic high-altitude origins..."
                        value={comboFormData.description}
                        onChange={(e) => setComboFormData({ ...comboFormData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest leading-relaxed"
                      />
                    </div>

                    {/* Image Upload for Combo */}
                    <div className="pt-2">
                      <ImageUpload
                        value={comboFormData.imageUrl}
                        onChange={(url) => setComboFormData({ ...comboFormData, imageUrl: url })}
                        label="Combo Cover Image"
                        helperText="Upload or enter URL for combo banner image"
                      />
                    </div>

                    {/* Toggles */}
                    <div className="pt-2 border-t border-stone-200/80 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={comboFormData.isActive}
                          onChange={(e) => setComboFormData({ ...comboFormData, isActive: e.target.checked })}
                          className="rounded text-forest focus:ring-forest w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-stone-700">
                          Active & Visible on Website
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={comboFormData.isFeatured}
                          onChange={(e) => setComboFormData({ ...comboFormData, isFeatured: e.target.checked })}
                          className="rounded text-forest focus:ring-forest w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-gold fill-gold" /> Feature on Homepage
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column: Multi-Product Picker (Across Multiple Categories) (7 cols) */}
                <div className="lg:col-span-7 space-y-4 flex flex-col">
                  <div className="bg-stone-50/60 p-4 rounded-2xl border border-stone-200/80 flex-1 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> 2. Select Products (Any Categories)
                      </h3>
                      <span className="text-[11px] font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-full">
                        {selectedItems.length} Selected
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Pick products from different categories to bundle together. You can adjust quantities and add custom notes per product.
                    </p>

                    {/* Search & Category Filter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search product by name or SKU..."
                          value={pickerSearch}
                          onChange={(e) => setPickerSearch(e.target.value)}
                          className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                        />
                      </div>

                      <select
                        value={pickerCategory}
                        onChange={(e) => setPickerCategory(e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                      >
                        <option value="ALL">All Categories ({categories.length})</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Scrollable Products List */}
                    <div className="flex-1 border border-stone-200 rounded-xl overflow-hidden bg-white max-h-64 overflow-y-auto divide-y divide-stone-100">
                      {filteredProducts.length === 0 ? (
                        <div className="p-8 text-center text-xs text-stone-400">
                          No products found matching your filter.
                        </div>
                      ) : (
                        filteredProducts.map((p) => {
                          const isSelected = selectedItems.some((it) => it.productId === p.id);
                          const pImg = getProductImage(p);
                          const price = getProductPrice(p);

                          return (
                            <div
                              key={p.id}
                              onClick={() => toggleProductInCombo(p)}
                              className={`p-2.5 flex items-center justify-between gap-3 cursor-pointer transition ${
                                isSelected ? 'bg-forest/5 hover:bg-forest/10' : 'hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition border ${
                                    isSelected
                                      ? 'bg-forest text-white border-forest'
                                      : 'border-stone-300 bg-white text-transparent'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </div>

                                <div className="w-8 h-8 relative rounded-lg bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                                  <Image src={pImg} alt={p.name} fill className="object-cover" />
                                </div>

                                <div className="truncate">
                                  <p className="text-xs font-semibold text-stone-800 truncate">{p.name}</p>
                                  <div className="flex items-center gap-2 text-[10px] text-stone-400">
                                    <span>{p.category?.name || 'Uncategorized'}</span>
                                    <span>•</span>
                                    <span className="font-mono">{p.sku}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right flex-shrink-0">
                                <span className="text-xs font-bold text-stone-800 block">
                                  ₹{price.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Selected Products Configuration (Qty & Notes) */}
                    <div className="space-y-2 pt-2 border-t border-stone-200/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                        Included Products in this Combo ({selectedItems.length}):
                      </span>

                      {selectedItems.length === 0 ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center text-amber-800 text-xs">
                          Please select at least 2 products from the list above to create a combo bundle.
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {selectedItems.map((item) => {
                            const prod = products.find((p) => p.id === item.productId) || item.product;
                            const pImg = getProductImage(prod);
                            const unitPrice = getProductPrice(prod);

                            return (
                              <div
                                key={item.productId}
                                className="bg-white rounded-xl p-2.5 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-8 h-8 relative rounded bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                                    <Image src={pImg} alt={prod?.name || 'Product'} fill className="object-cover" />
                                  </div>
                                  <div className="truncate">
                                    <p className="text-xs font-semibold text-stone-800 truncate">
                                      {prod?.name || 'Product'}
                                    </p>
                                    <span className="text-[10px] text-stone-400">
                                      ₹{unitPrice} × {item.quantity} = ₹{unitPrice * item.quantity}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-center">
                                  {/* Quantity Controls */}
                                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                                    <button
                                      type="button"
                                      onClick={() => updateItemQuantity(item.productId, -1)}
                                      className="px-2 py-0.5 text-xs font-bold hover:bg-stone-200"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 py-0.5 text-xs font-semibold bg-white min-w-[24px] text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateItemQuantity(item.productId, 1)}
                                      className="px-2 py-0.5 text-xs font-bold hover:bg-stone-200"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Custom Note Input */}
                                  <input
                                    type="text"
                                    placeholder="Note (e.g. 500ml)"
                                    value={item.customNote || ''}
                                    onChange={(e) => updateItemNote(item.productId, e.target.value)}
                                    className="text-[10px] px-2 py-1 border border-stone-300 rounded-lg w-24 sm:w-28 focus:outline-none focus:border-forest"
                                  />

                                  {/* Remove Button */}
                                  <button
                                    type="button"
                                    onClick={() => toggleProductInCombo(prod)}
                                    className="p-1 text-stone-400 hover:text-red-600 rounded"
                                    title="Remove from combo"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* Pricing & Financial Math Summary Bar                          */}
              {/* ------------------------------------------------------------- */}
              <div className="bg-forest/5 rounded-2xl p-4 sm:p-5 border border-forest/15 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                  <Percent className="w-4 h-4" /> 3. Combo Sale Pricing & Live Discount Calculator
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  {/* Total Original Price (Auto-Calculated) */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                      Total MRP / Original Price
                    </span>
                    <span className="text-lg font-bold text-stone-700 font-mono">
                      ₹{totalOriginalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] text-stone-400 block mt-0.5">
                      Sum of {selectedItems.length} selected items
                    </span>
                  </div>

                  {/* Combo Sale Price Input */}
                  <div className="bg-white p-3 rounded-xl border-2 border-forest shadow-sm">
                    <label className="text-[10px] font-bold text-forest uppercase tracking-wider block mb-1">
                      Combo Sale Price (₹) *
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      required
                      placeholder="e.g. 1499"
                      value={comboFormData.salePrice}
                      onChange={(e) => setComboFormData({ ...comboFormData, salePrice: e.target.value })}
                      className="w-full text-lg font-bold text-forest font-mono focus:outline-none border-b border-forest/30 pb-0.5"
                    />
                  </div>

                  {/* Live Savings (₹) */}
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Customer Savings
                    </span>
                    <span className="text-lg font-bold text-emerald-700 font-mono">
                      {liveSavings > 0 ? `₹${liveSavings.toLocaleString('en-IN')}` : '₹0'}
                    </span>
                    <span className="text-[9px] text-emerald-600 block mt-0.5">
                      Direct cash discount
                    </span>
                  </div>

                  {/* Live Discount % */}
                  <div className="bg-gold/15 p-3 rounded-xl border border-gold/30">
                    <span className="text-[10px] font-bold text-forest-dark uppercase tracking-wider block">
                      Effective Discount
                    </span>
                    <span className="text-lg font-bold text-forest-dark font-mono">
                      {liveDiscountPercent}% OFF
                    </span>
                    <span className="text-[9px] text-stone-500 block mt-0.5">
                      Calculated automatically
                    </span>
                  </div>
                </div>

                {liveSavings <= 0 && comboFormData.salePrice && totalOriginalPrice > 0 && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0" /> Note: Sale price is equal to or greater than the original total price.
                  </p>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsComboModalOpen(false)}
                  className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || selectedItems.length < 2 || !comboFormData.salePrice}
                  className="px-6 py-2.5 bg-forest hover:bg-forest-light disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition inline-flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving Combo...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {editingCombo ? 'Update Combo Offer' : 'Publish Combo Offer'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STANDARD PROMOTIONAL BANNER MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-charcoal">
                {editingOffer ? 'Edit Promotional Banner' : 'Create Promotional Banner'}
              </h2>
              <button onClick={() => setIsOfferModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOfferSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Himalayan Harvest Festival"
                  value={offerFormData.title}
                  onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Direct cold-pressed Himalayan Apricot Oil at exclusive wholesale prices"
                  value={offerFormData.subtitle}
                  onChange={(e) => setOfferFormData({ ...offerFormData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SPECIAL OFFER"
                    value={offerFormData.badgeText}
                    onChange={(e) => setOfferFormData({ ...offerFormData, badgeText: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    placeholder="e.g. 15"
                    value={offerFormData.discountPercentage}
                    onChange={(e) => setOfferFormData({ ...offerFormData, discountPercentage: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Target Category (Optional)
                  </label>
                  <select
                    value={offerFormData.targetCategoryId}
                    onChange={(e) => setOfferFormData({ ...offerFormData, targetCategoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
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
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Target Product (Optional)
                  </label>
                  <select
                    value={offerFormData.targetProductId}
                    onChange={(e) => setOfferFormData({ ...offerFormData, targetProductId: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
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
                  id="isActiveBanner"
                  checked={offerFormData.isActive}
                  onChange={(e) => setOfferFormData({ ...offerFormData, isActive: e.target.checked })}
                  className="rounded text-forest focus:ring-forest w-4 h-4"
                />
                <label htmlFor="isActiveBanner" className="text-xs font-semibold text-stone-700 cursor-pointer">
                  Activate this promotional banner immediately
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest hover:bg-forest-light text-white rounded-xl text-xs font-semibold shadow-sm transition"
                >
                  {editingOffer ? 'Update Banner' : 'Save Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}