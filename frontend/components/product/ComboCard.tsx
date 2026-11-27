'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Layers, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  Gift,
  CheckCircle2
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { buildWhatsAppUrl } from '@/lib/api';

export interface ComboCardProps {
  combo: {
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    badgeText?: string | null;
    imageUrl?: string | null;
    originalPrice: number;
    salePrice: number;
    discountPercentage?: number | null;
    savingsAmount?: number | null;
    isFeatured?: boolean;
    items?: Array<{
      id: string;
      productId: string;
      quantity: number;
      customNote?: string | null;
      product?: {
        id: string;
        name: string;
        slug: string;
        sku: string;
        basePrice?: number;
        salePrice?: number;
        regularPrice?: number;
        category?: { name: string; slug: string } | null;
        images?: Array<{ url: string; altText?: string | null }>;
      };
    }>;
  };
  businessWhatsApp?: string;
}

export default function ComboCard({
  combo,
  businessWhatsApp = '+919805565679',
}: ComboCardProps) {
  const { addItem } = useEnquiry();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showItems, setShowItems] = useState(false);

  // Determine main image
  const firstProdImg = combo.items?.[0]?.product?.images?.[0]?.url;
  const mainImage =
    combo.imageUrl ||
    firstProdImg ||
    '/images/products/lal-chawal-suyash-food-industries.jpeg';

  const itemCount = combo.items?.length || 0;
  const savings = combo.savingsAmount && combo.savingsAmount > 0 
    ? combo.savingsAmount 
    : Math.max(0, combo.originalPrice - combo.salePrice);
  const discountPercent = combo.discountPercentage && combo.discountPercentage > 0
    ? combo.discountPercentage
    : (combo.originalPrice > 0 ? Math.round(((combo.originalPrice - combo.salePrice) / combo.originalPrice) * 100) : 0);

  // Build items summary for WhatsApp message
  const itemsSummary = (combo.items || [])
    .map(
      (it) =>
        `• ${it.quantity > 1 ? `${it.quantity}x ` : ''}${it.product?.name || 'Product'} (${it.product?.category?.name || 'Himalayan'})`
    )
    .join('\n');

  const comboWhatsAppLink = buildWhatsAppUrl(
    businessWhatsApp,
    `Hello Suyash Food Industries,\n\nI want to order this Combo Offer on Sale:\n🎁 *${combo.title}*\n💰 *Combo Sale Price: ₹${combo.salePrice.toLocaleString('en-IN')}* (Regular ₹${combo.originalPrice.toLocaleString('en-IN')})\n${savings > 0 ? `🔥 Discount: ${discountPercent}% OFF (Save ₹${savings.toLocaleString('en-IN')})\n` : ''}\n📦 *Included Products:*\n${itemsSummary}\n\nPlease confirm availability and share payment and delivery details.`
  );

  const handleAddToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: `combo-${combo.id}`,
      name: `[COMBO] ${combo.title}`,
      slug: combo.slug || `combo-${combo.id}`,
      sku: `COMBO-${combo.badgeText || 'SALE'}`,
      image: mainImage,
      weight: `${itemCount} Items Combo Bundle`,
      price: combo.salePrice,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <div className="group bg-white/95 backdrop-blur-sm hover:bg-white rounded-3xl border border-beige/90 overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between h-full relative">
      
      {/* Top Image & Badges */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream/30">
          <Image
            src={mainImage}
            alt={combo.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
            <div className="flex flex-col gap-1.5">
              {combo.badgeText && (
                <span className="bg-gold text-forest-dark text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Gift className="w-3 h-3" /> {combo.badgeText}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <span className="bg-forest-dark/90 text-white backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <Layers className="w-3 h-3 text-gold" /> {itemCount} Products
            </span>
          </div>

          {/* Overlay Title at bottom of image */}
          <div className="absolute bottom-3 left-3 right-3 text-white z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold drop-shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Multi-Product Value Bundle
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-tight drop-shadow-md">
              {combo.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {combo.description && (
            <p className="text-xs text-charcoal/75 line-clamp-2 leading-relaxed">
              {combo.description}
            </p>
          )}

          {/* Collapsible Included Products List */}
          <div className="bg-stone-50/80 rounded-2xl border border-stone-200/70 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowItems(!showItems)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-forest hover:bg-stone-100/60 transition"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gold-dark" />
                <span>What’s Inside ({itemCount} items)</span>
              </span>
              {showItems ? (
                <ChevronUp className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {/* List preview (shows first 2 always or full when open) */}
            <div className={`px-3.5 pb-2.5 space-y-1.5 divide-y divide-stone-100 ${showItems ? 'block' : 'max-h-24 overflow-hidden'}`}>
              {(combo.items || []).map((it, idx) => {
                const prod = it.product;
                const pImg = prod?.images?.[0]?.url || '/images/products/lal-chawal-suyash-food-industries.jpeg';
                return (
                  <div
                    key={it.id || idx}
                    className="pt-1.5 first:pt-0 flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 relative rounded-md bg-white overflow-hidden flex-shrink-0 border border-stone-200">
                        <Image src={pImg} alt={prod?.name || 'Item'} fill className="object-cover" />
                      </div>
                      <div className="truncate">
                        <span className="font-semibold text-charcoal block truncate">
                          {it.quantity > 1 ? `${it.quantity}x ` : ''}
                          {prod?.name || 'Produce'}
                        </span>
                        {it.customNote && (
                          <span className="text-[9px] text-stone-400 block truncate">{it.customNote}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-forest-dark/80 bg-forest/5 px-2 py-0.5 rounded-md flex-shrink-0 ml-2">
                      {prod?.category?.name || 'Organic'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Call to Actions */}
      <div className="p-4 sm:p-5 pt-0 space-y-3">
        {/* Price Box */}
        <div className="bg-forest/5 rounded-2xl p-3 border border-forest/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-charcoal/60 uppercase font-semibold tracking-wider block">
              Special Combo Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-serif text-forest">
                ₹{combo.salePrice.toLocaleString('en-IN')}
              </span>
              {combo.originalPrice > combo.salePrice && (
                <span className="text-xs text-charcoal/40 line-through">
                  ₹{combo.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {savings > 0 && (
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full inline-block">
                Save ₹{savings.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Add to Enquiry Basket */}
          <button
            type="button"
            onClick={handleAddToEnquiry}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              addedAnimation
                ? 'bg-forest text-white'
                : 'bg-white hover:bg-stone-50 text-forest border border-forest/20'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Bundle Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>+ Add to Enquiry</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Order */}
          <a
            href={comboWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-whatsapp hover:bg-green-600 text-white flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}