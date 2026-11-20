'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MessageCircle, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Clock,
  Package,
  Leaf
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { buildWhatsAppUrl } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';

interface ProductDetailClientProps {
  product: any;
  businessWhatsApp?: string;
}

export default function ProductDetailClient({
  product,
  businessWhatsApp = '+919805565679',
}: ProductDetailClientProps) {
  const { addItem } = useEnquiry();
  const variations = product.variations || [];
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ url: '/images/products/lal-chawal-suyash-food-industries.jpeg', altText: product.name }];

  const currentImage = images[activeImageIndex]?.url || images[0]?.url;

  const selectedVar = variations[selectedVariationIndex] || {
    name: 'Standard',
    weight: '500g',
    regularPrice: product.regularPrice,
    salePrice: product.salePrice,
  };

  const effectivePrice = selectedVar.salePrice || selectedVar.regularPrice || product.salePrice || product.regularPrice;
  const regularPrice = selectedVar.regularPrice || product.regularPrice;
  const hasDiscount = effectivePrice < regularPrice;
  const discountPercent = hasDiscount ? Math.round(((regularPrice - effectivePrice) / regularPrice) * 100) : 0;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://suyashfoodindustries.in/product/${product.slug}`;

  // WhatsApp Pre-filled message generator as specified in Section 4.5
  const waMessage = `Hello Suyash Food Industries,\n\nI am interested in the following product:\n\n*Product:* ${product.name}\n*SKU:* ${product.sku}\n*Size / Variation:* ${selectedVar.weight || selectedVar.name}\n*Quantity:* ${quantity}\n*Price:* ₹${effectivePrice}\n*Product Link:* ${currentUrl}\n\nPlease share availability, pricing and further details.\nThank you!`;

  const waLink = buildWhatsAppUrl(businessWhatsApp, waMessage);

  const handleAddToEnquiry = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: currentImage,
      weight: selectedVar.weight || selectedVar.name,
      variationId: selectedVar.id,
      variationName: selectedVar.name,
      price: effectivePrice,
    }, quantity);

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="space-y-16">
      
      {/* Product Top Grid */}
      <div className="bg-white rounded-3xl border border-beige p-6 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Product Images & Thumbnails */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-cream/30 border border-beige/60 shadow-xs">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 relative rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    activeImageIndex === idx ? 'border-forest' : 'border-beige opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt={product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box / Enquiry Box */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            {/* Category & Brand Pills */}
            <div className="flex items-center gap-2 mb-2">
              {product.category && (
                <Link
                  href={`/category/${product.category.slug}`}
                  className="text-xs font-semibold text-gold-dark hover:underline uppercase tracking-wider"
                >
                  {product.category.name}
                </Link>
              )}
              {product.brand && (
                <>
                  <span className="text-charcoal/30">•</span>
                  <span className="text-xs text-charcoal/60 font-medium">
                    {product.brand.name}
                  </span>
                </>
              )}
            </div>

            {/* Title & SKU */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest font-bold tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-charcoal/60">
              <div>
                SKU: <span className="font-mono font-semibold text-forest">{product.sku}</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1 text-forest font-medium">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>Solan, HP Verified Produce</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-beige/60">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-forest">
                ₹{effectivePrice}
              </span>
              {hasDiscount && (
                <span className="text-base text-charcoal/40 line-through">
                  ₹{regularPrice}
                </span>
              )}
              <span className="text-xs font-medium text-forest-light bg-cream px-2.5 py-1 rounded-full ml-auto">
                {product.isInStock ? 'In Stock (Direct from Himachal)' : 'Pre-Order / Harvest Sourcing'}
              </span>
            </div>

            {/* Short Tagline / Excerpt */}
            {product.shortDescription && (
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mt-4 p-3.5 bg-cream/40 rounded-xl border border-beige/50 italic">
                "{product.shortDescription}"
              </p>
            )}

            {/* Variations / Pack Weights Selector */}
            {variations.length > 0 && (
              <div className="mt-6">
                <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-2">
                  Select Pack Size / Weight:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {variations.map((v: any, idx: number) => (
                    <button
                      key={v.id || idx}
                      onClick={() => setSelectedVariationIndex(idx)}
                      className={`text-xs px-4 py-2 rounded-xl font-semibold border transition ${
                        selectedVariationIndex === idx
                          ? 'border-forest bg-forest text-white shadow-sm'
                          : 'border-beige bg-white text-charcoal hover:border-forest/50'
                      }`}
                    >
                      {v.weight || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-6">
              <label className="text-xs font-bold text-forest uppercase tracking-wider">
                Quantity:
              </label>
              <div className="flex items-center border border-beige-dark/60 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-xs text-charcoal hover:bg-cream transition"
                  title="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold text-forest min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-xs text-charcoal hover:bg-cream transition"
                  title="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* DUAL ENQUIRY ACTIONS (Phase 4.5 Mandatory Requirement) */}
          <div className="space-y-3 pt-6 border-t border-beige">
            
            {/* Primary Action: Enquire on WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200 text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white text-whatsapp" />
              <span>Enquire on WhatsApp (Instant Chat)</span>
            </a>

            {/* Secondary Action: Add to My Enquiry */}
            <button
              onClick={handleAddToEnquiry}
              className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-2xl border text-sm transition duration-200 ${
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

            <p className="text-[11px] text-charcoal/60 text-center pt-1">
              💬 Enquiries directly connect you with our Solan production & dispatch team.
            </p>
          </div>

        </div>

      </div>

      {/* Product Deep Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ingredients */}
        <div className="bg-white p-6 rounded-2xl border border-beige shadow-card">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base mb-3">
            <Leaf className="w-4 h-4 text-gold-dark" />
            <span>Ingredients & Purity</span>
          </div>
          <p className="text-xs text-charcoal/80 leading-relaxed">
            {product.ingredients || '100% Pure, single-origin produce without additives, chemical polish, or artificial stabilizers.'}
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white p-6 rounded-2xl border border-beige shadow-card">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base mb-3">
            <Sparkles className="w-4 h-4 text-gold-dark" />
            <span>Health & Nutritional Benefits</span>
          </div>
          <p className="text-xs text-charcoal/80 leading-relaxed">
            {product.benefits || 'Packed with essential mountain minerals, dietary fiber, antioxidants, and digestible nutrition.'}
          </p>
        </div>

        {/* Storage Instructions */}
        <div className="bg-white p-6 rounded-2xl border border-beige shadow-card">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base mb-3">
            <Package className="w-4 h-4 text-gold-dark" />
            <span>Storage Instructions</span>
          </div>
          <p className="text-xs text-charcoal/80 leading-relaxed">
            {product.storageInstructions || 'Store in a clean, airtight container away from moisture, heat, and direct sunlight.'}
          </p>
        </div>

      </div>

      {/* Full Detailed Description */}
      <div className="bg-white rounded-3xl border border-beige p-6 sm:p-10 shadow-card space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest">
          About {product.name}
        </h2>
        <div className="text-xs sm:text-sm text-charcoal/80 leading-relaxed space-y-3">
          <p>{product.description}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-beige/60 text-xs">
          <div>
            <span className="text-charcoal/50 block">Origin</span>
            <span className="font-semibold text-forest">Solan, Himachal Pradesh</span>
          </div>
          <div>
            <span className="text-charcoal/50 block">Processing</span>
            <span className="font-semibold text-forest">Cold-Pressed / Stone-Ground</span>
          </div>
          <div>
            <span className="text-charcoal/50 block">Packaging</span>
            <span className="font-semibold text-forest">Food-Grade Sealed / Glass</span>
          </div>
          <div>
            <span className="text-charcoal/50 block">Inquiry Type</span>
            <span className="font-semibold text-forest">Retail & Wholesale Welcome</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-2xl text-forest">
              More from this Collection
            </h2>
            <Link
              href="/shop"
              className="text-xs font-bold text-forest hover:text-forest-light transition"
            >
              Browse All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((rel: any) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
