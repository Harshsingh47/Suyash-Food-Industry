'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, Search, History, ArrowRight, Check, X } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [filterLow, setFilterLow] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Adjustment Modal
  const [adjustingProduct, setAdjustingProduct] = useState<any | null>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [reason, setReason] = useState('Stock replenishment from Solan mill');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // History Modal
  const [historyModalProduct, setHistoryModalProduct] = useState<any | null>(null);
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      let url = '/inventory?';
      if (filterLow) url += 'lowStock=true&';
      if (search) url += `search=${encodeURIComponent(search)}&`;
      const res = await fetchApi(url);
      setInventory(res || []);
    } catch (err) {
      console.error('Failed to load inventory:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [filterLow, search]);

  const openAdjust = (p: any) => {
    setAdjustingProduct(p);
    setNewStock(p.stockQuantity);
    setReason('Stock replenishment from Solan packaging line');
  };

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;
    setIsSubmitting(true);

    try {
      await fetchApi('/inventory/adjust', {
        method: 'POST',
        body: JSON.stringify({
          productId: adjustingProduct.id,
          newStock: Number(newStock),
          reason: reason.trim(),
        }),
      });

      setAdjustingProduct(null);
      loadInventory();
    } catch (err: any) {
      alert(`Error adjusting stock: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const viewHistory = async (p: any) => {
    setHistoryModalProduct(p);
    try {
      const records = await fetchApi(`/inventory/history/${p.id}`);
      setHistoryRecords(records || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest">
            Inventory & Stock Management
          </h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Monitor available warehouse stock, record manual batch adjustments, and view stock change history.
          </p>
        </div>

        <button
          onClick={() => setFilterLow(!filterLow)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border transition ${
            filterLow
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-white text-charcoal border-beige hover:bg-cream'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-terracotta" />
          <span>{filterLow ? 'Showing Low Stock Only' : 'Filter Low Stock (≤ 10)'}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-beige shadow-card">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stock by SKU or product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-3.5 py-2 rounded-xl border border-beige bg-cream/20 focus:outline-none focus:border-forest"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-beige shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-beige bg-cream/40 text-charcoal/60 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Product Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Available Units</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/60">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-cream/20 transition">
                  <td className="p-3.5 font-mono font-bold text-forest">
                    {item.sku}
                  </td>
                  <td className="p-3.5 font-semibold text-charcoal">
                    {item.name}
                  </td>
                  <td className="p-3.5 text-charcoal/70">
                    {item.category?.name || 'Himalayan Produce'}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-base text-forest">
                    {item.stockQuantity}
                  </td>
                  <td className="p-3.5">
                    {item.stockQuantity <= 0 ? (
                      <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    ) : item.stockQuantity <= 10 ? (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Low Stock Alert
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openAdjust(item)}
                      className="bg-forest hover:bg-forest-light text-white text-[11px] font-semibold px-3 py-1 rounded-lg shadow-xs transition"
                    >
                      Adjust Stock
                    </button>
                    <button
                      onClick={() => viewHistory(item)}
                      className="text-charcoal/60 hover:text-forest p-1 rounded transition"
                      title="View audit logs"
                    >
                      <History className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-beige animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-beige mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-forest">Adjust Stock Level</h3>
                <p className="text-xs text-charcoal/60">{adjustingProduct.name} ({adjustingProduct.sku})</p>
              </div>
              <button onClick={() => setAdjustingProduct(null)}>
                <X className="w-5 h-5 text-charcoal/50" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-cream/40 rounded-xl border border-beige flex items-center justify-between">
                <span>Current Stock:</span>
                <span className="font-mono font-bold text-base text-forest">{adjustingProduct.stockQuantity} units</span>
              </div>

              <div>
                <label className="font-bold text-charcoal block mb-1">New Stock Count *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full text-base font-mono font-bold p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal block mb-1">Adjustment Reason *</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Warehouse restock, manual reconciliation..."
                  className="w-full p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                />
              </div>

              <div className="pt-3 border-t border-beige flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustingProduct(null)}
                  className="px-4 py-2 border border-beige rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-forest hover:bg-forest-light text-white font-semibold px-5 py-2 rounded-xl"
                >
                  {isSubmitting ? 'Saving...' : 'Update Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-beige animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-beige mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-forest">Inventory Audit History</h3>
                <p className="text-xs text-charcoal/60">{historyModalProduct.name}</p>
              </div>
              <button onClick={() => setHistoryModalProduct(null)}>
                <X className="w-5 h-5 text-charcoal/50" />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 text-xs custom-scrollbar">
              {historyRecords.length === 0 ? (
                <p className="text-center py-6 text-charcoal/50 italic">No previous adjustment records.</p>
              ) : (
                historyRecords.map((rec) => (
                  <div key={rec.id} className="p-3 bg-cream/40 rounded-xl border border-beige space-y-1">
                    <div className="flex items-center justify-between font-medium">
                      <span>Changed by {rec.adjustedBy?.name || 'Admin'}</span>
                      <span className="font-mono font-bold text-forest">
                        {rec.previousStock} → {rec.newStock} ({rec.changeQuantity > 0 ? `+${rec.changeQuantity}` : rec.changeQuantity})
                      </span>
                    </div>
                    <div className="text-charcoal/70">{rec.reason}</div>
                    <div className="text-[10px] text-charcoal/50">{new Date(rec.createdAt).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-beige text-right">
              <button
                onClick={() => setHistoryModalProduct(null)}
                className="px-4 py-2 bg-cream text-forest font-semibold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
