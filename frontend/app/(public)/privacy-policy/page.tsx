import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  RotateCcw, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Cookie, 
  MessageCircle,
  Video,
  Clock,
  ArrowRight
} from 'lucide-react';

import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: 'Privacy Policy & Terms | Suyash Food Industries (Suyash Organics)',
  description: 'Official Privacy Policy, Data Protection, Terms, and Return/Refund guidelines for Suyash Food Industries. Solan, Himachal Pradesh.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-beige/80 shadow-card space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>Legal Disclosure & Consumer Protection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Privacy Policy, Terms & Return/Refund Policy
          </h1>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-charcoal/70 pt-1">
            <span><strong>Effective Date:</strong> November 2026</span>
            <span>•</span>
            <span><strong>Brand Name:</strong> Suyash Food Industries (operating as Suyash Organics)</span>
            <span>•</span>
            <span><strong>Website:</strong> www.suyashfoodindustries.in</span>
          </div>

          {/* Quick Jump Links */}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <a href="#privacy-policy" className="text-xs bg-cream hover:bg-cream-dark text-forest font-semibold px-3 py-1.5 rounded-full border border-beige transition">
              A. Privacy Policy
            </a>
            <a href="#return-policy" className="text-xs bg-cream hover:bg-cream-dark text-forest font-semibold px-3 py-1.5 rounded-full border border-beige transition">
              B. Return & Refund Policy
            </a>
            <a href="#grievance" className="text-xs bg-cream hover:bg-cream-dark text-forest font-semibold px-3 py-1.5 rounded-full border border-beige transition">
              C. Contact & Grievance Redressal
            </a>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-beige/80 shadow-card space-y-10 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          
          {/* ============================================================ */}
          {/* SECTION A: PRIVACY POLICY */}
          {/* ============================================================ */}
          <div id="privacy-policy" className="space-y-6 scroll-mt-24">
            <div className="border-b border-beige/80 pb-3">
              <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">Section A</span>
              <h2 className="font-serif text-2xl font-bold text-forest">
                Privacy Policy
              </h2>
            </div>
            
            <p>
              At <strong>Suyash Food Industries</strong>, we respect your privacy and are committed to protecting the personal information you share with us.
            </p>

            {/* A1: Information We Collect */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold-dark" />
                <span>1. Information We Collect</span>
              </h3>
              <p>
                When you place an order, submit an enquiry, or contact us for wholesale/B2B partnerships, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-charcoal/80">
                <li><strong>Personal Identity Data:</strong> Your full name, designation, and company name (if applicable).</li>
                <li><strong>Contact Information:</strong> Active phone number / WhatsApp number and email address.</li>
                <li><strong>Logistics Data:</strong> Shipping address, delivery pin code, and billing address.</li>
                <li><strong>Commercial / Tax Information:</strong> GST details and business identification (strictly for B2B wholesale orders and invoices).</li>
              </ul>
            </div>

            {/* A2: How We Use Your Information */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>2. How We Use Your Information</span>
              </h3>
              <p>We use the information collected strictly for legitimate business purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-charcoal/80">
                <li>To process, pack, and deliver your orders accurately from our Solan facility.</li>
                <li>To communicate order status, dispatch tracking, invoices, and customer support responses via WhatsApp, SMS, phone, or email.</li>
                <li>To improve our product offerings, packaging quality, and website experience based on customer feedback.</li>
              </ul>
            </div>

            {/* A3: Data Protection & Sharing */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>3. Data Protection & Sharing</span>
              </h3>
              <p>
                <strong>We do not sell, rent, or trade your personal information to third parties.</strong> Your contact and address details are shared strictly with trusted logistics/courier partners and payment gateways solely for completing your order delivery and generating valid courier manifests.
              </p>
            </div>

            {/* A4: Cookies */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <Cookie className="w-4 h-4 text-amber-700" />
                <span>4. Cookies Policy</span>
              </h3>
              <p>
                Our website uses basic, essential cookies to remember your enquiry list, preserve session preferences, and ensure smooth browsing. You can manage or disable cookie settings through your browser at any time.
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SECTION B: RETURN, REPLACEMENT & REFUND POLICY */}
          {/* ============================================================ */}
          <div id="return-policy" className="space-y-6 pt-8 border-t border-beige/80 scroll-mt-24">
            <div className="border-b border-beige/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">Section B</span>
                <h2 className="font-serif text-2xl font-bold text-forest">
                  Return, Replacement & Refund Policy
                </h2>
              </div>
              <Link
                href="/return-policy"
                className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-forest-light font-bold underline"
              >
                <span>View Dedicated Return Policy Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-amber-900/90 text-xs sm:text-sm">
              Because we deal in <strong>100% natural, preservative-free edible food products</strong>, customer hygiene and food safety are our highest priorities. Please review our policy carefully before placing an order:
            </div>

            {/* B1: No General Returns */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest">
                1. No General Returns on Opened/Consumed Food Items
              </h3>
              <p>
                Once delivered, food items (pickles, jams, chutneys, laddus, protein mixes, dry fruits, oils, and juices) <strong>cannot be returned or exchanged due to change of mind or taste preferences</strong>.
              </p>
            </div>

            {/* B2: Eligible Cases */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-forest">
                2. Eligible Cases for Replacement or Refund
              </h3>
              <p>We offer a 100% free replacement or full refund only if:</p>
              <ul className="list-disc pl-5 space-y-1 text-charcoal/80">
                <li>You receive a damaged, broken, or leaking jar/package during transit.</li>
                <li>The induction seal or tamper-evident packaging is broken at the time of delivery.</li>
                <li>You receive an incorrect product or an item past its best-before date.</li>
              </ul>
            </div>

            {/* B3: Mandatory Unboxing Video Proof */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-600" />
                <span>3. Mandatory Unboxing Video Proof</span>
              </h3>
              <div className="bg-cream/70 p-4 rounded-2xl border border-beige/80">
                <p>
                  To claim a replacement or refund for transit damage or missing items, you must record a <strong>clear, uncut unboxing video</strong> starting from the sealed outer parcel and share it with us <strong>within 24 hours of delivery</strong>.
                </p>
              </div>
            </div>

            {/* B4: How to Raise a Claim */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-whatsapp" />
                <span>4. How to Raise a Claim</span>
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-charcoal/80">
                <li>
                  Share your Order ID, photos, and unboxing video on WhatsApp at{' '}
                  <a href="https://wa.me/919805565679" target="_blank" rel="noopener noreferrer" className="text-forest font-bold underline">
                    +91 98055-65679
                  </a>{' '}
                  or email us at{' '}
                  <a href="mailto:suyashfoodindustries@gmail.com" className="text-forest font-bold underline">
                    suyashfoodindustries@gmail.com
                  </a>.
                </li>
                <li>
                  Once verified by our quality team within <strong>24–48 business hours</strong>, we will dispatch a fresh replacement at no extra cost or initiate a refund to your original payment method within <strong>5–7 business days</strong>.
                </li>
              </ul>
            </div>

            {/* B5: Order Cancellation */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <Clock className="w-4 h-4 text-forest" />
                <span>5. Order Cancellation</span>
              </h3>
              <p>
                Orders can be cancelled <strong>within 4 hours of placement</strong> (before dispatch) by calling or messaging our customer support number. Once dispatched, orders cannot be cancelled.
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SECTION C: CONTACT & GRIEVANCE REDRESSAL */}
          {/* ============================================================ */}
          <div id="grievance" className="space-y-4 pt-8 border-t border-beige/80 scroll-mt-24">
            <div className="border-b border-beige/80 pb-3">
              <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">Section C</span>
              <h2 className="font-serif text-2xl font-bold text-forest">
                Contact & Grievance Redressal
              </h2>
            </div>

            <p>
              For any questions regarding our sourcing, privacy practices, wholesale enquiries, or order support, please reach out to our dedicated grievance officer:
            </p>

            <div className="p-6 bg-cream/60 rounded-2xl border border-beige/80 space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-charcoal/60 block mb-0.5 text-[11px] uppercase tracking-wider font-bold">Company</span>
                  <span className="font-bold text-forest text-sm">Suyash Food Industries</span>
                  <span className="text-charcoal/70 block text-xs">(operating as Suyash Organics)</span>
                </div>

                <div>
                  <span className="text-charcoal/60 block mb-0.5 text-[11px] uppercase tracking-wider font-bold">Official Website</span>
                  <a href="https://www.suyashfoodindustries.in" target="_blank" rel="noopener noreferrer" className="font-bold text-forest underline">
                    www.suyashfoodindustries.in
                  </a>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-charcoal/60 block mb-0.5 text-[11px] uppercase tracking-wider font-bold">Store & Office Address</span>
                  <span className="font-medium text-charcoal/90">
                    Aakanksha Building, Shop-1, Near Regional Hospital, Opposite HP Gas Office, Solan, Himachal Pradesh – 173212
                  </span>
                </div>

                <div>
                  <span className="text-charcoal/60 block mb-0.5 text-[11px] uppercase tracking-wider font-bold">Phone / WhatsApp</span>
                  <a href="tel:+919805565679" className="font-bold text-forest hover:text-gold-dark transition">
                    +91 98055-65679
                  </a>
                </div>

                <div>
                  <span className="text-charcoal/60 block mb-0.5 text-[11px] uppercase tracking-wider font-bold">Official Email</span>
                  <a href="mailto:suyashfoodindustries@gmail.com" className="font-bold text-forest hover:text-gold-dark transition">
                    suyashfoodindustries@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20have%20a%20legal%20%2F%20privacy%20%2F%20grievance%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold text-xs px-5 py-3 rounded-full transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
                <span>Contact Grievance Officer on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
