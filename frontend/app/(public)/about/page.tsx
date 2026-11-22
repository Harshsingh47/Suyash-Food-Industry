import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mountain, ShieldCheck, Heart, Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section with Himalayan Mountain Origin Theme */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-4 border border-beige/80 shadow-card bg-white/80 backdrop-blur-md">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src="/images/himalayan-valley-origin-theme.jpg"
              alt="Himalayan Mountain Range Solan Himachal Pradesh"
              fill
              className="object-cover object-[center_35%] opacity-35 filter contrast-110 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/70 to-cream/90" />
            
            {/* Subtle Mountain Contour Ridge along bottom */}
            <svg
              className="absolute bottom-0 inset-x-0 w-full h-16 text-forest/[0.04] pointer-events-none"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,120 L0,75 L80,50 L160,82 L260,28 L370,85 L460,40 L580,78 L690,15 L780,60 L870,35 L980,70 L1080,20 L1150,55 L1200,45 L1200,120 Z" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-forest text-cream px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              <Mountain className="w-3.5 h-3.5 text-gold" />
              <span>ROOTED IN SOLAN, HIMACHAL PRADESH</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-forest font-bold tracking-tight">
              Our Story & Himalayan Heritage
            </h1>
            <p className="text-xs sm:text-base text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
              At Suyash Food Industries, we believe that the true essence of wholesome living comes from nature’s purest mountain roots. Nestled in the serene hills of Solan, Himachal Pradesh, our journey began with a singular purpose: to make authentic, unadulterated, and traditional Himalayan produce accessible to every home across India.
            </p>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">
              Preserving Mountain Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
              Purely Sourced from the Foothills
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              From nutrient-rich cold-pressed wild apricot oils (*Chuli*) and natural sun-dried orchard fruits to traditional stone-ground flours and unpolished heritage rice, every product we craft reflects our enduring dedication to purity, health, and mountain sustainability.
            </p>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              We work in close synergy with smallholder hill farming families in Himachal Pradesh. By safeguarding indigenous seeds like Ogla, Kafra, and unpolished Red Rice, we keep ancient agricultural biodiversity thriving while eliminating chemical middlemen.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow"
              >
                <span>Browse Our Himalayan Shop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-video sm:aspect-square relative rounded-2xl overflow-hidden bg-cream shadow-inner">
            <Image
              src="/images/products/lal-rajma-suyash-food-industries.jpeg"
              alt="Himalayan Lal Rajma and Staples"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-wider">
              Our Four Commitments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
              Why Suyash Food Industries?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-beige/80 shadow-card">
              <div className="text-3xl font-serif font-bold text-gold mb-3">01</div>
              <h3 className="font-serif font-bold text-base text-forest mb-2">Authentic Himalayan Sourcing</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Direct from pristine mountain orchards and terraced fields in Solan and higher reaches of Himachal.
              </p>
            </div>

            <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-beige/80 shadow-card">
              <div className="text-3xl font-serif font-bold text-gold mb-3">02</div>
              <h3 className="font-serif font-bold text-base text-forest mb-2">100% Wholesome & Pure</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Carefully processed using stone mills and cold-presses to retain natural aroma, flavor, and minerals.
              </p>
            </div>

            <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-beige/80 shadow-card">
              <div className="text-3xl font-serif font-bold text-gold mb-3">03</div>
              <h3 className="font-serif font-bold text-base text-forest mb-2">Doorstep Freshness</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Packaged carefully in food-grade packaging to keep your pantry stocked with farm-fresh mountain produce.
              </p>
            </div>

            <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-beige/80 shadow-card">
              <div className="text-3xl font-serif font-bold text-gold mb-3">04</div>
              <h3 className="font-serif font-bold text-base text-forest mb-2">Sustainably Crafted</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Supporting mountain communities, fair remuneration for growers, and eco-friendly practices at every step.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="bg-forest text-cream rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Have Questions About Sourcing, Purity, or Wholesale?
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-xl mx-auto leading-relaxed">
            Our team is available directly on WhatsApp to answer questions regarding product provenance, seasonal harvest dates, and customized delivery.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20would%20like%20to%20know%20more%20about%20your%20sourcing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
              <span>Contact Sourcing Team on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
