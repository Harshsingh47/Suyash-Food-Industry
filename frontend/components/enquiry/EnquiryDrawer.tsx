'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ArrowRight, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

interface EnquiryDrawerProps {
  businessWhatsApp?: string;
}

export default function EnquiryDrawer({ businessWhatsApp = '+919805565679' }: EnquiryDrawerProps) {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearEnquiry, 
    totalCount, 
    estimatedTotal,
    isDrawerOpen, 
    setIsDrawerOpen,
    generateWhatsAppLink
  } = useEnquiry();

  if (!isDrawerOpen) return null;

  const waLink = generateWhatsAppLink(businessWhatsApp);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-beige flex items-center justify-between bg-cream">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <div>
                <h3 className="font-serif font-bold text-lg text-forest">My Enquiry List</h3>
                <p className="text-xs text-charcoal/70">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} selected for enquiry
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-beige text-charcoal/70 hover:text-charcoal transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-forest mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-50" />
                </div>
                <h4 className="font-serif font-bold text-base text-forest mb-1">Your Enquiry List is Empty</h4>
                <p className="text-xs text-charcoal/60 max-w-xs mb-6">
                  Browse our authentic Himalayan catalogue and add products you would like to enquire about.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-forest hover:bg-forest-light text-white text-xs font-semibold px-5 py-2.5 rounded-full transition shadow"
                >
                  Explore Himalayan Catalogue
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.productId}-${item.variationId || 'std'}`}
                  className="flex gap-3.5 p-3 rounded-xl border border-beige bg-cream/30 hover:bg-cream/60 transition"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white border border-beige/60 flex-shrink-0">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-cream text-forest text-xs font-bold">
                        SFI
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <Link 
                        href={`/product/${item.slug}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-xs font-bold text-forest hover:text-forest-light line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => removeItem(item.productId, item.variationId)}
                        className="text-charcoal/40 hover:text-terracotta p-0.5 transition"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-charcoal/60 mt-0.5">
                      {item.variationName || item.weight || 'Standard Pack'} • <span className="font-medium text-forest">SKU: {item.sku}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-beige-dark/50 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variationId)}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-cream transition"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-forest min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variationId)}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-cream transition"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Reference Price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-forest">₹{item.price * item.quantity}</span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-charcoal/50">₹{item.price}/each</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-beige bg-cream/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-charcoal/70">Estimated Catalogue Value:</span>
                <span className="font-serif font-bold text-base text-forest">₹{estimatedTotal.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-charcoal/60 leading-tight">
                * Note: Wholesale discounts, exact shipping, and bulk tiers are finalized directly via WhatsApp.
              </p>

              {/* Primary Action: Send on WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200 text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white text-whatsapp" />
                <span>Send Enquiry on WhatsApp Now</span>
              </a>

              {/* Secondary Action: Review / Submit Form */}
              <div className="flex gap-2 pt-1">
                <Link
                  href="/enquiry"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-forest hover:bg-forest-light text-white font-medium py-2 px-3 rounded-lg text-xs transition"
                >
                  <span>Submit Enquiry Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={clearEnquiry}
                  className="px-3 py-2 text-xs font-medium text-charcoal/60 hover:text-terracotta border border-beige rounded-lg hover:bg-white transition"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
