'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { buildWhatsAppUrl } from '@/lib/api';

export interface EnquiryItem {
  productId: string;
  name: string;
  slug: string;
  sku: string;
  image?: string;
  weight?: string;
  variationId?: string;
  variationName?: string;
  price: number;
  quantity: number;
}

interface EnquiryContextType {
  items: EnquiryItem[];
  addItem: (item: Omit<EnquiryItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string, variationId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variationId?: string) => void;
  clearEnquiry: () => void;
  totalCount: number;
  estimatedTotal: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  generateWhatsAppLink: (businessNumber: string, customerInfo?: { name?: string; city?: string; note?: string }) => string;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('sfi_enquiry_items');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load saved enquiries:', e);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('sfi_enquiry_items', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save enquiries to localStorage:', e);
      }
    }
  }, [items, isMounted]);

  const addItem = (item: Omit<EnquiryItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.variationId === item.variationId
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { ...item, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string, variationId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variationId === variationId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variationId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variationId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && i.variationId === variationId) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearEnquiry = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const estimatedTotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const generateWhatsAppLink = (
    businessNumber: string,
    customerInfo?: { name?: string; city?: string; note?: string }
  ) => {
    let msg = `Hello Suyash Food Industries,\n\nI would like to enquire about the following products:\n\n`;
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}*`;
      if (item.variationName) msg += ` (${item.variationName})`;
      else if (item.weight) msg += ` (${item.weight})`;
      msg += ` — Qty: *${item.quantity}* (Ref Price: ₹${item.price})\n`;
    });

    if (customerInfo?.name) msg += `\n*Name:* ${customerInfo.name}`;
    if (customerInfo?.city) msg += `\n*Location:* ${customerInfo.city}`;
    if (customerInfo?.note) msg += `\n*Note:* ${customerInfo.note}`;

    msg += `\n\nPlease share availability, bulk/retail pricing, and delivery timeline.\nThank you!`;

    return buildWhatsAppUrl(businessNumber, msg);
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearEnquiry,
        totalCount,
        estimatedTotal,
        isDrawerOpen,
        setIsDrawerOpen,
        generateWhatsAppLink,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
