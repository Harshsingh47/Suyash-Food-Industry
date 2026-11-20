'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { fetchApi } from '@/lib/api';

export default function EnquiryPage() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearEnquiry, 
    totalCount, 
    estimatedTotal,
    generateWhatsAppLink
  } = useEnquiry();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please provide your name and mobile number.');
      return;
    }

    if (items.length === 0) {
      setFormError('Your enquiry list is empty. Add products from the shop catalogue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerCity: customerCity.trim() || undefined,
        customerMessage: customerMessage.trim() || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          variationId: i.variationId,
          productName: i.name,
          variationName: i.variationName || i.weight,
          quantity: i.quantity,
          unitPrice: i.price,
        })),
      };

      const res = await fetchApi('/enquiries', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setSubmissionSuccess(res);
      clearEnquiry();
    } catch (err: any) {
      console.error('Submission failed:', err);
      setFormError(err.message || 'Failed to submit enquiry. Please try again or message via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const directWaLink = generateWhatsAppLink('+919805565679', {
    name: customerName,
    city: customerCity,
    note: customerMessage,
  });

  return (
    <div className="bg-cream/20 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-cream text-forest px-3.5 py-1 rounded-full text-xs font-semibold border border-beige">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Product Enquiry System (No Online Payment Required)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            My Product Enquiry
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70">
            Review your selected Himalayan products and send your enquiry. Our team in Solan, HP will contact you promptly with availability, batch freshness, and wholesale/retail rates.
          </p>
        </div>

        {/* Submission Success Screen */}
        {submissionSuccess ? (
          <div className="bg-white rounded-3xl border border-beige p-8 sm:p-12 max-w-xl mx-auto text-center shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-forest mx-auto">
              <CheckCircle2 className="w-10 h-10 text-forest" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif font-bold text-2xl text-forest">
                Enquiry Recorded Successfully!
              </h2>
              <div className="p-3 bg-cream rounded-xl border border-beige font-mono text-sm font-bold text-forest">
                Reference Code: {submissionSuccess.enquiry?.referenceNumber}
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Thank you, <span className="font-semibold text-forest">{submissionSuccess.enquiry?.customerName}</span>. Your enquiry has been received and assigned to our sales desk.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={submissionSuccess.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition duration-200 text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white text-whatsapp" />
                <span>Continue on WhatsApp Now</span>
              </a>

              <Link
                href="/shop"
                className="inline-block text-xs font-semibold text-forest hover:underline pt-2"
              >
                ← Return to Shop Catalogue
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-beige p-12 max-w-lg mx-auto text-center shadow-card space-y-4">
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-forest mx-auto">
              <ShoppingBag className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="font-serif font-bold text-xl text-forest">Your Enquiry List is Empty</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed max-w-sm mx-auto">
              You have not added any products to your enquiry list yet. Explore our authentic Himalayan catalogue and select items to enquire.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="bg-forest hover:bg-forest-light text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow inline-flex items-center gap-2"
              >
                <span>Browse Products Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product List */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-beige p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-beige">
                <h2 className="font-serif font-bold text-lg text-forest">
                  Selected Products ({totalCount})
                </h2>
                <button
                  onClick={clearEnquiry}
                  className="text-xs text-charcoal/60 hover:text-terracotta transition"
                >
                  Clear List
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variationId || 'std'}`}
                    className="flex gap-4 p-3.5 rounded-2xl border border-beige bg-cream/20 hover:bg-cream/40 transition"
                  >
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white border border-beige/60 flex-shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-serif font-bold text-sm text-forest hover:text-forest-light line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.variationId)}
                          className="text-charcoal/40 hover:text-terracotta p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-charcoal/60 mt-0.5">
                        {item.variationName || item.weight} • <span className="font-mono text-forest">SKU: {item.sku}</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-beige-dark/50 rounded-lg bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variationId)}
                            className="px-2 py-1 text-xs text-charcoal hover:bg-cream transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-forest min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variationId)}
                            className="px-2 py-1 text-xs text-charcoal hover:bg-cream transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-forest">₹{item.price * item.quantity}</span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-charcoal/50">₹{item.price} each</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-beige flex items-center justify-between text-sm">
                <span className="text-charcoal/70">Estimated Catalogue Subtotal:</span>
                <span className="font-serif font-bold text-xl text-forest">₹{estimatedTotal.toLocaleString()}</span>
              </div>

              <div className="p-4 bg-cream/60 rounded-2xl border border-beige/60 text-xs text-charcoal/70 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-forest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>No Payment Taken Here</span>
                </div>
                <p>
                  This enquiry generates a formal checklist. Our dispatch team will confirm packing sizes, state tax/shipping, and provide direct wholesale/retail invoice options.
                </p>
              </div>

              {/* Direct Instant WhatsApp Chat Action */}
              <div className="pt-2">
                <a
                  href={directWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Directly via WhatsApp (Without Form)</span>
                </a>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-beige p-6 sm:p-8 shadow-card space-y-5">
              <div>
                <h2 className="font-serif font-bold text-lg text-forest">
                  Submit Enquiry Form
                </h2>
                <p className="text-xs text-charcoal/60 mt-1">
                  Save your enquiry to our database to receive a tracked reference number.
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Your Name <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Verma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Mobile Number (WhatsApp Preferred) <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98055 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chandigarh, PB"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@email.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Requirement Notes / Wholesale Quantity
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Special requests, wholesale bulk requirements, or preferred delivery dates..."
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Recording Enquiry...' : 'Submit Enquiry & Get WhatsApp Link'}</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
