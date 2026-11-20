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
  Sprout
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest to-deep-green text-white rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Direct Business Communication
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Looking for Bulk / Wholesale or Custom Household Orders?
            </h2>
            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
              We supply retail pantries, organic stores, ayurvedic practitioners, and wellness retreats across India. Reach out on WhatsApp with your product checklist.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20have%20a%20wholesale%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md transition"
              >
                <MessageCircle className="w-5 h-5 fill-white text-whatsapp" />
                <span>Start WhatsApp Conversation</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-cream hover:text-white underline underline-offset-4"
              >
                <span>Or Submit Contact Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
