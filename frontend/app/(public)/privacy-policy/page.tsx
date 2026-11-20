import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream/20 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-beige shadow-card space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Disclosure</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal/60">
            Effective Date: July 6, 2026 • Suyash Food Industries, Solan, Himachal Pradesh
          </p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-beige shadow-card space-y-6 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-forest">1. Information We Collect</h2>
            <p>
              We only collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products (such as Saroj’s Heritage, Dimple’s Jar, Nilansh Gold, ND Fresh, etc.). This may include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Data:</strong> Name, Email Address, Phone Number / WhatsApp Mobile Number, and City / Shipping Address.</li>
              <li><strong>Inquiry Data:</strong> Specific product selections, pack sizes, quantities, and requirements you submit through our product enquiry forms or WhatsApp chat.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-forest">2. How We Use Your Information</h2>
            <p>
              We use the collected information for the following business purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond directly to your product enquiries, wholesale quotes, or customer support questions.</li>
              <li>To process and coordinate delivery of your requested Himalayan food products from our Solan facility.</li>
              <li>To share updates regarding upcoming seasonal harvests (such as wild apricot oils, dried mushrooms, and stone-ground flours).</li>
              <li>To improve our website’s functionality, speed, and user experience.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-forest">3. Payment & Transaction Security</h2>
            <p>
              Suyash Food Industries operates on a product discovery and direct WhatsApp enquiry model. We do not process online credit card transactions, collect CVVs, or store online payment tokens on this website. All commercial terms and payments are finalized securely and directly through verified business banking channels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-forest">4. Protection of Information</h2>
            <p>
              We implement reasonable security measures to maintain the safety of your personal information. We do not sell, trade, or transfer your personally identifiable information to outside commercial brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-forest">5. Contact Us Regarding Privacy</h2>
            <p>
              If you have any questions or suggestions regarding our Privacy Policy, please contact us at:
            </p>
            <div className="p-4 bg-cream/50 rounded-xl border border-beige space-y-1 text-xs">
              <p><strong>Company Name:</strong> Suyash Food Industries</p>
              <p><strong>Email:</strong> suyashfoodindustries@gmail.com</p>
              <p><strong>Phone / WhatsApp:</strong> +91 98055 65679</p>
              <p><strong>Address:</strong> Near Regional Hospital, Solan, Himachal Pradesh, INDIA</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
