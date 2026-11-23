import React from 'react';
import Link from 'next/link';
import { 
  RotateCcw, 
  ShieldAlert, 
  Video, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

export const metadata = {
  title: 'Return, Replacement & Refund Policy | Suyash Food Industries',
  description: 'Our customer hygiene, food safety, return, replacement, and refund policies for authentic Himalayan food products. Solan, Himachal Pradesh.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-beige/80 shadow-card space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>Customer Protection & Food Safety</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Return, Replacement & Refund Policy
          </h1>
          <p className="text-xs text-charcoal/60">
            Effective Date: November 2026 • Brand: Suyash Food Industries (operating as Suyash Organics) • www.suyashfoodindustries.in
          </p>
        </div>

        {/* Food Safety & Hygiene Notice */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-amber-800 font-serif font-bold text-base sm:text-lg">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Strict Food Safety & Hygiene Assurance</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
            Because we deal in <strong>100% natural, preservative-free edible food products</strong>, customer hygiene and food safety are our highest priorities. Please review our policy carefully before placing an order.
          </p>
        </div>

        {/* Core Policy Blocks */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-beige/80 shadow-card space-y-10 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          
          {/* Section 1: Non-Returnable Items */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-terracotta flex-shrink-0" />
              <h2 className="font-serif font-bold text-lg text-forest">
                1. No General Returns on Opened/Consumed Food Items
              </h2>
            </div>
            <p>
              Once delivered, food items—including artisanal pickles (<em>Saroj’s Heritage</em>), jams and chutneys (<em>Dimple’s Jar</em>), laddus, sattu, protein mixes, dry fruits (<em>Nilansh Gold</em>), cold-pressed oils, and juices—<strong>cannot be returned or exchanged due to change of mind or personal taste preferences</strong>.
            </p>
            <p className="text-charcoal/60 text-xs italic">
              This policy is mandatory to ensure every customer receives only freshly packed, uncontaminated products straight from our Solan facility.
            </p>
          </section>

          {/* Section 2: Eligible Cases */}
          <section className="space-y-4 pt-4 border-t border-beige/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0" />
              <h2 className="font-serif font-bold text-lg text-forest">
                2. Eligible Cases for 100% Free Replacement or Refund
              </h2>
            </div>
            <p>
              We offer a <strong>100% free replacement</strong> or <strong>full refund</strong> only under the following validated conditions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="bg-cream/50 p-4 rounded-2xl border border-beige/80 space-y-1.5">
                <span className="font-bold text-forest text-xs block">Transit Damage</span>
                <p className="text-xs text-charcoal/70">
                  You receive a broken, cracked, or leaking glass jar/package during courier transit.
                </p>
              </div>
              <div className="bg-cream/50 p-4 rounded-2xl border border-beige/80 space-y-1.5">
                <span className="font-bold text-forest text-xs block">Tampered Seal</span>
                <p className="text-xs text-charcoal/70">
                  The induction seal or tamper-evident safety packaging is broken at the time of delivery.
                </p>
              </div>
              <div className="bg-cream/50 p-4 rounded-2xl border border-beige/80 space-y-1.5">
                <span className="font-bold text-forest text-xs block">Incorrect or Expired Item</span>
                <p className="text-xs text-charcoal/70">
                  You receive an incorrect product, wrong size, or an item past its stated best-before date.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Mandatory Unboxing Video Proof */}
          <section className="space-y-3 pt-4 border-t border-beige/60">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <h2 className="font-serif font-bold text-lg text-forest">
                3. Mandatory Unboxing Video Proof (Within 24 Hours)
              </h2>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-2">
              <p className="font-semibold text-forest text-xs sm:text-sm">
                To claim a replacement or refund for transit damage, broken seals, or missing items:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal/80">
                <li>
                  You must record a <strong>clear, continuous, uncut unboxing video</strong> starting from the sealed outer courier flyer/box showing the shipping label.
                </li>
                <li>
                  The video must capture the parcel being cut open, showing the internal packaging and the exact condition of the product inside.
                </li>
                <li>
                  This video must be shared with our support team on WhatsApp or email <strong>within 24 hours of delivery</strong>.
                </li>
              </ul>
              <p className="text-[11px] text-charcoal/60 pt-1">
                *Claims submitted without a continuous unboxing video or after 24 hours of delivery cannot be entertained due to courier insurance restrictions.
              </p>
            </div>
          </section>

          {/* Section 4: How to Raise a Claim */}
          <section className="space-y-4 pt-4 border-t border-beige/60">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-whatsapp flex-shrink-0" />
              <h2 className="font-serif font-bold text-lg text-forest">
                4. How to Raise a Replacement / Refund Claim
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <p>
                <strong>Step 1:</strong> Share your Order ID, parcel photos, and the unboxing video via WhatsApp at{' '}
                <a href="https://wa.me/919805565679" target="_blank" rel="noopener noreferrer" className="text-forest font-bold underline">
                  +91 98055-65679
                </a>{' '}
                or email us at{' '}
                <a href="mailto:suyashfoodindustries@gmail.com" className="text-forest font-bold underline">
                  suyashfoodindustries@gmail.com
                </a>.
              </p>
              <p>
                <strong>Step 2:</strong> Our quality assurance team in Solan will review and verify your claim within <strong>24–48 business hours</strong>.
              </p>
              <p>
                <strong>Step 3:</strong> Once verified, we will dispatch a fresh replacement at <strong>zero extra cost</strong> or initiate a full refund to your original payment method within <strong>5–7 business days</strong>.
              </p>
            </div>
          </section>

          {/* Section 5: Order Cancellation */}
          <section className="space-y-3 pt-4 border-t border-beige/60">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-forest flex-shrink-0" />
              <h2 className="font-serif font-bold text-lg text-forest">
                5. Order Cancellation Policy
              </h2>
            </div>
            <p>
              Orders can be cancelled <strong>within 4 hours of placement</strong> (strictly before parcel dispatch) by calling or messaging our customer support number on WhatsApp.
            </p>
            <p className="text-xs text-charcoal/70">
              Once an order has been packed and handed over to our courier partner from Solan, it enters active transit and <strong>cannot be cancelled or redirected</strong>.
            </p>
          </section>

          {/* Section 6: Grievance Redressal & Office Details */}
          <section className="space-y-3 pt-4 border-t border-beige/60">
            <h2 className="font-serif font-bold text-lg text-forest">
              6. Contact & Grievance Redressal
            </h2>
            <div className="bg-cream/60 p-5 rounded-2xl border border-beige/80 space-y-2 text-xs text-charcoal/80">
              <p><strong>Company:</strong> Suyash Food Industries (operating as Suyash Organics)</p>
              <p><strong>Store & Office Address:</strong> Aakanksha Building, Shop-1, Near Regional Hospital, Opposite HP Gas Office, Solan, Himachal Pradesh – 173212</p>
              <p><strong>Phone / WhatsApp:</strong> <a href="tel:+919805565679" className="text-forest font-bold underline">+91 98055-65679</a></p>
              <p><strong>Official Email:</strong> <a href="mailto:suyashfoodindustries@gmail.com" className="text-forest font-bold underline">suyashfoodindustries@gmail.com</a></p>
              <p><strong>Official Website:</strong> <a href="https://www.suyashfoodindustries.in" target="_blank" rel="noopener noreferrer" className="text-forest font-bold underline">www.suyashfoodindustries.in</a></p>
            </div>
          </section>

        </div>

        {/* Quick Action Button */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20have%20a%20query%20regarding%20my%20order%20%2F%20return."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
            <span>Chat with Customer Support on WhatsApp (+91 98055-65679)</span>
          </a>
        </div>

      </div>
    </div>
  );
}
