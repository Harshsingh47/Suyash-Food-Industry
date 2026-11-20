'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  MessageSquare, 
  Boxes, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchApi('/analytics/overview');
        setData(res);
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const metrics = data?.metrics || {
    totalProducts: 21,
    activeProducts: 21,
    totalEnquiries: 0,
    newEnquiries: 0,
    contactedEnquiries: 0,
    convertedEnquiries: 0,
    lowStockProducts: 0,
    conversionRate: 0,
  };

  const recentEnquiries = data?.recentEnquiries || [];

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest">
            Dashboard Overview
          </h1>
          <p className="text-xs text-charcoal/60 mt-1">
            Real-time operations, product catalog metrics, and customer WhatsApp enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-light text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 bg-white border border-beige hover:bg-cream text-forest font-semibold text-xs px-4 py-2.5 rounded-xl transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Manage Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-beige shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal/60 font-medium">Catalogue Products</span>
            <div className="text-2xl font-serif font-bold text-forest mt-1">
              {metrics.totalProducts}
            </div>
            <span className="text-[11px] text-green-700 font-medium">
              {metrics.activeProducts} active on site
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-beige shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal/60 font-medium">Total Enquiries</span>
            <div className="text-2xl font-serif font-bold text-forest mt-1">
              {metrics.totalEnquiries}
            </div>
            <span className="text-[11px] text-gold-dark font-medium">
              {metrics.newEnquiries} new uncontacted
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-beige shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal/60 font-medium">Enquiry Conversion</span>
            <div className="text-2xl font-serif font-bold text-forest mt-1">
              {metrics.conversionRate}%
            </div>
            <span className="text-[11px] text-forest font-medium">
              {metrics.convertedEnquiries} converted orders
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-beige shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal/60 font-medium">Stock Status</span>
            <div className="text-2xl font-serif font-bold text-forest mt-1">
              {metrics.lowStockProducts}
            </div>
            <span className="text-[11px] text-terracotta font-medium">
              items low on stock
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-terracotta">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Enquiries CRM Card */}
      <div className="bg-white rounded-2xl border border-beige shadow-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-beige">
          <div>
            <h2 className="font-serif font-bold text-lg text-forest">
              Recent Customer Enquiries
            </h2>
            <p className="text-xs text-charcoal/60">
              Latest product enquiries submitted by customers.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="text-center py-8 text-xs text-charcoal/50">
            No customer enquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-beige text-charcoal/50 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige/60">
                {recentEnquiries.map((enq: any) => {
                  const cleanPhone = enq.customerPhone?.replace(/[^0-9]/g, '');
                  const waReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${enq.customerName}, this is regarding your enquiry (${enq.referenceNumber}) with Suyash Food Industries.`
                  )}`;

                  return (
                    <tr key={enq.id} className="hover:bg-cream/30 transition">
                      <td className="py-3.5 font-mono font-semibold text-forest">
                        {enq.referenceNumber}
                      </td>
                      <td className="py-3.5 font-medium text-charcoal">
                        {enq.customerName}
                        <span className="block text-[10px] text-charcoal/50 font-normal">
                          {enq.customerPhone} {enq.customerCity ? `• ${enq.customerCity}` : ''}
                        </span>
                      </td>
                      <td className="py-3.5 text-charcoal/80">
                        {enq.items?.map((i: any) => i.productName).join(', ') || `${enq._count?.items || 1} products`}
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'CONVERTED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-charcoal/60 text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <a
                          href={waReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-whatsapp text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs hover:bg-green-600 transition"
                          title="Open WhatsApp chat with customer"
                        >
                          <MessageCircle className="w-3 h-3 fill-white" />
                          <span>WhatsApp</span>
                        </a>
                        <Link
                          href={`/admin/enquiries?id=${enq.id}`}
                          className="inline-flex items-center text-forest hover:underline text-[11px] font-medium"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
