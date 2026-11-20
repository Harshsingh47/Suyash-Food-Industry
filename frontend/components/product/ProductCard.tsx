'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { buildWhatsAppUrl } from '@/lib/api';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    regularPrice: number;
    salePrice?: number | null;
    shortDescription?: string | null;
    category?: { name: string; slug: string } | null;
    brand?: { name: string; slug: string } | null;
    images?: Array<{ url: string; altText?: string | null }>;
    variations?: Array<{ id: string; name: string; weight: string; regularPrice: number; salePrice?: number | null }>;
    isInStock?: boolean;
    isFeatured?: boolean;
    isBestSeller?: boolean;
  };
  onQuickView?: (product: any) => void;
  businessWhatsApp?: string;
}

export default function ProductCard({
  product,
  onQuickView,
  businessWhatsApp = '+919805565679',
}: ProductCardProps) {
  const { addItem } = useEnquiry();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const mainImage = product.images?.[0]?.url || '/images/products/lal-chawal-suyash-food-industries.jpeg';
  const effectivePrice = product.salePrice && product.salePrice < product.regularPrice ? product.salePrice : product.regularPrice;
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100)
    : 0;

  const defaultWeight = product.variations?.[0]?.weight || product.variations?.[0]?.name || 'Standard Pack';

  const singleWhatsAppLink = buildWhatsAppUrl(
    businessWhatsApp,
    `Hello Suyash Food Industries,\n\nI am interested in:\nProduct: *${product.name}*\nSKU: *${product.sku}*\nPack Size: *${defaultWeight}*\nPrice: *₹${effectivePrice}*\n\nPlease confirm availability and delivery timeline.`
  );

  const handleAddToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: mainImage,
      weight: defaultWeight,
      variationId: product.variations?.[0]?.id,
      variationName: defaultWeight,
      price: effectivePrice,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-beige/80 overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-cream/40">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-gold text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}
          {hasDiscount && (
            <span className="bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="absolute bottom-2.5 right-2.5 bg-white/90 hover:bg-white text-forest p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-charcoal/60 mb-1.5">
            <span className="font-medium text-gold-dark truncate max-w-[150px]">
              {product.category?.name || 'Himalayan Produce'}
            </span>
            <span className="font-mono text-[10px] bg-cream px-2 py-0.5 rounded text-forest font-semibold">
              {product.sku}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif font-bold text-sm sm:text-base text-forest group-hover:text-forest-light transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Pack Weight / Size */}
          <p className="text-xs text-charcoal/60 mt-0.5">
            Pack: <span className="font-medium text-charcoal">{defaultWeight}</span>
          </p>

          {/* Excerpt */}
          {product.shortDescription && (
            <p className="text-xs text-charcoal/70 line-clamp-2 mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Price & Action Strip */}
        <div className="pt-4 mt-3 border-t border-beige/60">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif font-bold text-lg text-forest">₹{effectivePrice}</span>
            {hasDiscount && (
              <span className="text-xs text-charcoal/40 line-through">₹{product.regularPrice}</span>
            )}
            <span className="text-[10px] text-charcoal/50 ml-auto">
              {product.isInStock !== false ? 'In Stock' : 'Pre-Order'}
            </span>
          </div>

          {/* Dual CTAs */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* Primary: Enquire on WhatsApp */}
            <a
              href={singleWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-whatsapp hover:bg-green-600 text-white text-xs font-semibold py-2.5 px-2 rounded-xl shadow-xs transition duration-200"
              title="Chat on WhatsApp about this product"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white flex-shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>

            {/* Secondary: Add to Enquiry List */}
            <button
              onClick={handleAddToEnquiry}
              className={`flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-2 rounded-xl border transition duration-200 ${
                addedAnimation
                  ? 'bg-forest text-white border-forest'
                  : 'bg-cream hover:bg-beige text-forest border-beige-dark/40'
              }`}
              title="Add to My Enquiry List"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">+ Enquiry</span>
                </>
              )}
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
