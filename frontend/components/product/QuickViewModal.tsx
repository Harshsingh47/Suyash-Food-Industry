'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, MessageCircle, ShoppingBag, Plus, Minus, Check, ShieldCheck } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { buildWhatsAppUrl } from '@/lib/api';

interface QuickViewModalProps {
  product: any | null;
  onClose: () => void;
  businessWhatsApp?: string;
}

export default function QuickViewModal({
  product,
  onClose,
  businessWhatsApp = '+919805565679',
}: QuickViewModalProps) {
  const { addItem } = useEnquiry();
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const variations = product.variations || [];
  const selectedVar = variations[selectedVariationIndex] || {
    name: 'Standard',
    weight: '500g',
    regularPrice: product.regularPrice,
    salePrice: product.salePrice,
  };

  const effectivePrice = selectedVar.salePrice || selectedVar.regularPrice || product.salePrice || product.regularPrice;
  const mainImage = product.images?.[0]?.url || '/images/products/lal-chawal-suyash-food-industries.jpeg';

  const waText = `Hello Suyash Food Industries,\n\nI would like to enquire about:\nProduct: *${product.name}*\nSKU: *${product.sku}*\nSize: *${selectedVar.weight || selectedVar.name}*\nQuantity: *${quantity}*\nPrice: *₹${effectivePrice}*\n\nPlease confirm availability and details.`;
  const waLink = buildWhatsAppUrl(businessWhatsApp, waText);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: mainImage,
      weight: selectedVar.weight || selectedVar.name,
      variationId: selectedVar.id,
      variationName: selectedVar.name,
      price: effectivePrice,
    }, quantity);

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-beige flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-beige text-charcoal transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 aspect-square relative bg-cream/40">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-gold-dark uppercase tracking-wider">
              {product.category?.name || 'Himalayan Produce'}
            </span>
            <h2 className="font-serif font-bold text-xl text-forest mt-1">
              {product.name}
            </h2>
            <div className="text-xs text-charcoal/60 mt-0.5">
              SKU: <span className="font-mono font-semibold text-forest">{product.sku}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-serif font-bold text-2xl text-forest">₹{effectivePrice}</span>
              {selectedVar.salePrice && selectedVar.salePrice < selectedVar.regularPrice && (
                <span className="text-sm text-charcoal/40 line-through">₹{selectedVar.regularPrice}</span>
              )}
            </div>

            {/* Excerpt */}
            <p className="text-xs text-charcoal/70 mt-3 leading-relaxed">
              {product.shortDescription || product.description?.slice(0, 160) + '...'}
            </p>

            {/* Pack Variations */}
            {variations.length > 1 && (
              <div className="mt-4">
                <label className="text-xs font-semibold text-charcoal block mb-1.5">
                  Available Pack Sizes:
                </label>
                <div className="flex flex-wrap gap-2">
                  {variations.map((v: any, idx: number) => (
                    <button
                      key={v.id || idx}
                      onClick={() => setSelectedVariationIndex(idx)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                        selectedVariationIndex === idx
                          ? 'border-forest bg-forest text-white'
                          : 'border-beige bg-cream/40 text-charcoal hover:border-forest/50'
                      }`}
                    >
                      {v.weight || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs font-semibold text-charcoal">Quantity:</span>
              <div className="flex items-center border border-beige-dark/50 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-xs hover:bg-cream transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-forest min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-xs hover:bg-cream transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-4 border-t border-beige space-y-2.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-xl text-xs transition border ${
                addedSuccess
                  ? 'bg-forest text-white border-forest'
                  : 'bg-cream hover:bg-beige text-forest border-beige-dark/50'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to My Enquiry!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to My Enquiry List</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
