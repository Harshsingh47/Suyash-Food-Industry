import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mountain, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  Star,
  Quote,
  ShoppingBag,
  HeartHandshake,
  Sprout,
  Phone,
  Truck,
  Package
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import HeroCarousel from '@/components/hero/HeroCarousel';
import { fetchApi } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getHomeData() {
  try {
    const [productsRes, categoriesRes, bannersRes, testimonialsRes] = await Promise.all([
      fetchApi('/products?limit=24'),
      fetchApi('/categories'),
      fetchApi('/banners'),
      fetchApi('/testimonials'),
    ]);

    return {
      products: productsRes?.data || [],
      categories: categoriesRes || [],
      banners: bannersRes || [],
      testimonials: testimonialsRes || [],
    };
  } catch (err) {
    console.error('Error fetching home data:', err);
    return {
      products: [],
      categories: [],
      banners: [],
      testimonials: [],
    };
  }
}

export default async function HomePage() {
  const { products, categories, banners, testimonials } = await getHomeData();

  const featuredProducts = products.filter((p: any) => p.isFeatured).slice(0, 6);
  const bestSellers = products.filter((p: any) => p.isBestSeller).slice(0, 6);

  return (
    <div className="space-y-12 sm:space-y-20">
      
      {/* 1. HERO CAROUSEL SECTION */}
      <HeroCarousel />

      {/* 2. PROMOTIONAL PILLARS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-beige p-6 sm:p-8 shadow-card grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest">Authentic Sourcing</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Terraced farms in Solan, HP</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest">Stone Ground & Cold Pressed</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Zero heat or chemical loss</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest">WhatsApp Inquiries</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Fast retail & wholesale chat</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest">Doorstep Purity</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Pristine freshness guaranteed</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SHOP BY HIMALAYAN CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-gold-dark uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mountain Harvest</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
              Shop by Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-forest-light transition"
          >
            <span>View Full Catalogue ({products.length} Products)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl border border-beige overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between"
            >
              <div className="aspect-square relative rounded-xl overflow-hidden bg-cream mb-4">
                {cat.imageUrl && (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-forest group-hover:text-forest-light transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-gold-dark">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="bg-cream/40 py-16 border-y border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              Handpicked Mountain Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
              Featured Himalayan Products
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70">
              Cultivated in unpolluted soil and cold mountain breezes. Free from synthetic glazes and artificial dyes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md transition"
            >
              <span>Explore All {products.length} Products in Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WILD APRICOT OIL SPOTLIGHT (SAROJ'S HERITAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-dark text-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-light px-3.5 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SAROJ’S HERITAGE ELIXIR</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                100% Pure Cold-Pressed <br />
                <span className="text-gold">Wild Apricot Oil (Chuli)</span>
              </h2>

              <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
                Extracted by cold-pressing wild mountain apricot kernels (Chuli) gathered from high-altitude Himachal valleys. Rich in vitamins A and E, oleic acids, and cellular emollients. Renowned for centuries as a therapeutic skin hydrator, scalp nourishment elixir, and restorative massage oil.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="flex items-center gap-2 text-cream">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Zero Thermal Heat Extraction</span>
                </div>
                <div className="flex items-center gap-2 text-cream">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Deep Non-Greasy Absorption</span>
                </div>
                <div className="flex items-center gap-2 text-cream">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>For Skin, Hair & Joints</span>
                </div>
                <div className="flex items-center gap-2 text-cream">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>100% Raw & Chemical-Free</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a
                  href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20would%20like%20to%20enquire%20about%20Pure%20Wild%20Apricot%20Oil."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enquire for Apricot Oil on WhatsApp</span>
                </a>

                <Link
                  href="/product/pure-wild-apricot-oil"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-cream hover:text-white underline underline-offset-4 font-medium"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-square lg:h-full min-h-[350px]">
              <Image
                src="/images/products/pure-wild-apricot-oil-suyash-industries.jpeg"
                alt="Wild Apricot Oil Saroj's Heritage"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-gold-dark uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
              Best-Selling Mountain Staples
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-forest-light transition"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE SUYASH FOOD INDUSTRIES (4 Pillars) */}
      <section className="bg-cream/60 py-16 sm:py-20 border-y border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              Mountain Heritage & Trust
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
              Why Choose Suyash Food Industries?
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70">
              From our origin in Solan, HP to your dining table, our commitment is rooted in authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-7 rounded-2xl border border-beige shadow-card relative">
              <div className="text-4xl font-serif font-bold text-beige-dark/50 absolute top-4 right-6">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-forest mb-2">Authentic Sourcing</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Direct from pristine mountain orchards and terraced hillside fields of Himachal Pradesh.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-beige shadow-card relative">
              <div className="text-4xl font-serif font-bold text-beige-dark/50 absolute top-4 right-6">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-forest mb-2">100% Wholesome</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Carefully stone-ground and processed to retain natural mountain aroma, color, and trace minerals.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-beige shadow-card relative">
              <div className="text-4xl font-serif font-bold text-beige-dark/50 absolute top-4 right-6">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-forest mb-2">Doorstep Freshness</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Packaged securely at our facility near Regional Hospital, Solan, ensuring pantry-ready freshness.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-beige shadow-card relative">
              <div className="text-4xl font-serif font-bold text-beige-dark/50 absolute top-4 right-6">
                04
              </div>
              <h3 className="font-serif font-bold text-lg text-forest mb-2">Sustainably Crafted</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Supporting smallholder hill farmers, traditional agriculture, and environmentally sound harvesting.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. REAL CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
            Customer Satisfaction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Real Stories, Real Satisfaction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t: any) => (
            <div
              key={t.id}
              className="bg-white p-7 rounded-2xl border border-beige shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-gold mb-3">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-charcoal/80 italic leading-relaxed mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-cream-dark">
                <h4 className="font-serif font-bold text-sm text-forest">{t.name}</h4>
                <p className="text-[11px] text-charcoal/60">{t.role} • {t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. WHATSAPP ENQUIRY BANNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#123020] via-[#1A422D] to-[#0A1F15] border border-emerald-500/25 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          
          {/* Ambient Lighting & Pattern */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direct Solan Farm-Gate Supply</span>
              </div>

              {/* High-Contrast Luminous Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.2]">
                Looking for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#E8B86D] to-amber-300">
                  Bulk, Wholesale
                </span>{' '}
                or Custom Orders?
              </h2>

              {/* Crisp Subtitle */}
              <p className="text-sm sm:text-base text-stone-200/90 leading-relaxed max-w-xl font-normal">
                We supply retail pantries, organic stores, ayurvedic practitioners, hospitality brands, and wellness retreats across India. Custom grinding, bespoke batch packing, and direct farm dispatch with zero middlemen.
              </p>

              {/* 3 Key Trust Micro-Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Single-Origin</h4>
                  <p className="text-[11px] text-stone-300 mt-0.5">Himachal valley organic clusters</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Custom Packing</h4>
                  <p className="text-[11px] text-stone-300 mt-0.5">Bulk food-service & private labeling</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-2">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Pan-India Transit</h4>
                  <p className="text-[11px] text-stone-300 mt-0.5">Insured safe freight to your doorstep</p>
                </div>
              </div>

              {/* Action Buttons & Direct Call */}
              <div className="pt-3 space-y-4">
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20would%20like%20to%20enquire%20about%20bulk%20%2F%20wholesale%20rates%20for%20your%20Himalayan%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20be5b] text-white font-bold px-7 py-3.5 rounded-2xl text-sm shadow-xl shadow-green-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366] group-hover:rotate-12 transition-transform" />
                    <span>Chat on WhatsApp for Wholesale Rates</span>
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-2xl text-sm border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all"
                  >
                    <span>Request Quotation Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Direct Solan Office:</span>
                  <a
                    href="tel:+919805565679"
                    className="text-gold hover:text-amber-300 font-bold underline underline-offset-2"
                  >
                    +91 98055 65679
                  </a>
                  <span className="text-stone-400">• Available Mon - Sat (9 AM - 7 PM)</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/15 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
                
                {/* Top Badge on Card */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Certified Himalayan Produce</span>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                    B2B & Retail
                  </span>
                </div>

                {/* Visual Imagery of Products */}
                <div className="relative py-6 flex items-center justify-center">
                  <div className="relative w-48 h-56 sm:w-56 sm:h-64 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 to-emerald-400/20 blur-xl scale-95" />
                    
                    {/* Apricot Oil Bottle */}
                    <div className="relative z-10 w-28 h-52 sm:w-32 sm:h-60 drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                      <Image
                        src="/images/hero-apricot-oil-3d.png"
                        alt="Pure Wild Apricot Oil"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Desi Ghee Jar */}
                    <div className="absolute right-0 bottom-2 z-20 w-24 h-28 sm:w-28 sm:h-32 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] transform translate-x-3 hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/images/hero-desi-ghee-3d.png"
                        alt="Traditional Bilona Cow Ghee"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Footer on Card */}
                <div className="bg-emerald-950/70 rounded-2xl p-3.5 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300 font-medium">Minimum Order Quantity</span>
                    <span className="text-white font-bold">Flexible (Retail or Bulk)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300 font-medium">Dispatch Origin</span>
                    <span className="text-gold font-bold">Solan, Himachal Pradesh</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                    <span className="text-stone-300 font-medium">Lab Test & Certificate</span>
                    <span className="text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Provided on request
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
