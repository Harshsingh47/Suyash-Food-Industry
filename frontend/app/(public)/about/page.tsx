import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mountain, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sprout, 
  Sun, 
  Droplet, 
  Users, 
  Award,
  PackageCheck,
  Wheat,
  Scale
} from 'lucide-react';

export const metadata = {
  title: 'About Our Sourcing & Tradition (हमारी सोर्सिंग और परंपरा) | Suyash Food Industries',
  description: 'Pure and authentic Himalayan sourcing from Kinnaur, Solan, and Sirmaur. Traditional craftsmanship, gharat watermill grinding, zero refined sugar, and rural women empowerment.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* 1. HERO SECTION WITH AUTHENTIC HIMALAYAN ORIGIN THEME */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 lg:p-16 text-center max-w-5xl mx-auto space-y-5 border border-beige/80 shadow-card bg-white/85 backdrop-blur-md">
          {/* Enhanced Himalayan Valley Panorama Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src="/images/himalayan-valley-origin-theme.jpg"
              alt="Himalayan Mountain Range Solan Himachal Pradesh"
              fill
              className="object-cover object-[center_35%] opacity-35 filter contrast-110 saturate-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EE]/85 via-[#F7F5EE]/65 to-[#F7F5EE]/90" />
            
            {/* Mountain Contour Ridge Silhouette */}
            <svg
              className="absolute bottom-0 inset-x-0 w-full h-16 text-forest/[0.05] pointer-events-none"
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
              <span>HAMARI SOURCING AUR PARAMPARA • हमारी सोर्सिंग और परंपरा</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest font-bold tracking-tight">
              About Our Sourcing
            </h1>

            <p className="font-serif italic text-base sm:text-xl text-gold-dark font-medium">
              Rooted in Tradition, Crafted with Care
            </p>

            <p className="text-xs sm:text-base text-charcoal/80 leading-relaxed max-w-3xl mx-auto pt-2">
              At <strong>Suyash Food Industries</strong> (operating as <strong>Suyash Organics</strong>), we believe that pure and authentic food begins at the source. Founded in Solan, Himachal Pradesh, our mission is to bridge the gap between high-altitude Himalayan farmers and your dining table—without middlemen, artificial preservatives, or shortcuts.
            </p>
          </div>
        </div>

        {/* 2. DIRECT FROM HIMALAYAN ORCHARDS & VALLEYS (THE TWO REGIONAL PILLARS) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sprout className="w-4 h-4 text-forest" />
              <span>Terroir & Provenance</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-forest font-bold">
              Direct from the Himalayan Orchards & Valleys
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70">
              Single-origin produce harvested from high-altitude valleys and mid-hill farming clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Pillar A: High-Altitude Kinnaur Produce */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-7 sm:p-9 shadow-card flex flex-col justify-between space-y-6 hover:shadow-soft transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-beige/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center">
                      <Mountain className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-forest">
                        High-Altitude Kinnaur Produce
                      </h3>
                      <p className="text-[11px] text-charcoal/60">Bhawanagar • Sangla • Kinnaur Valley (Elev. 2,200m–3,500m)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full uppercase">
                    Highland
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                  The Kinnaur valley is renowned for its unpolluted mountain breezes, mineral-rich glacial runoff, and cold alpine climate. We source directly from trusted family-run orchards and remote village farming clusters across Bhawanagar, Sangla, and Kinnaur.
                </p>

                <div className="bg-cream/60 rounded-2xl p-4 border border-beige/60 space-y-2">
                  <span className="text-xs font-bold text-forest block">Specialty Kinnauri Harvest:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-charcoal/80">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Kagzi Paper-Shell Walnuts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Mountain Sweet Almonds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Sun-Dried Wild Apricots</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Pure Wild Apricot Oil (Chulli)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Kinnauri Red Rajma (Spotted)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Highland Lal Chawal (Red Rice)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-forest font-semibold flex items-center gap-1.5 pt-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>100% Free from Chemical Polishes & Sulfur Bleaching</span>
              </div>
            </div>

            {/* Pillar B: Mid-Hills Farm Clusters (Solan & Sirmaur) */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-7 sm:p-9 shadow-card flex flex-col justify-between space-y-6 hover:shadow-soft transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-beige/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-forest/15 text-forest flex items-center justify-center">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-forest">
                        Mid-Hills Farm Clusters
                      </h3>
                      <p className="text-[11px] text-charcoal/60">Solan • Sirmaur District • Local Farmer FPOs</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full uppercase">
                    Mid-Hills
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                  Solan is known as the "Mushroom City of India" and the vegetable bowl of Himachal. We procure fresh, naturally cultivated vegetables and fruits directly from local farming communities and Farmer Producer Organizations (FPOs) across Solan and Sirmaur.
                </p>

                <div className="bg-cream/60 rounded-2xl p-4 border border-beige/60 space-y-2">
                  <span className="text-xs font-bold text-forest block">Farm-Gate Procurement:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-charcoal/80">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Naturally Grown Tomatoes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Pungent Mountain Garlic</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Fresh Hill Ginger (Adrak)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Spicy Mountain Green Chillies</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Seasonal Orchard Apples & Plums</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>Galgal & Hill Lemons for Pickles</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-forest font-semibold flex items-center gap-1.5 pt-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Zero Middlemen • Transparent Farm-Gate Prices</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. TRADITIONAL CRAFTSMANSHIP & HYGIENE (3 KEY PRINCIPLES) */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-8 sm:p-12 shadow-card space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">
              Parampara Meets Quality
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-forest font-bold">
              Traditional Craftsmanship & Hygiene
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70">
              We preserve ancient Himachali recipes using clean, unrefined ingredients and modern food safety protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Craft Principle 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest">
                Slow-Matured & Sun-Dried
              </h3>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Our artisanal pickles (<strong>Saroj’s Heritage</strong>), jams and chutneys (<strong>Dimple’s Jar</strong>), and dried fruits (<strong>Nilansh Gold</strong>) are crafted using time-honored Himachali methods:
              </p>
              <ul className="text-xs text-charcoal/70 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Natural mountain sun-drying without sulfur tunnels.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Slow fire-roasting in traditional vessels for deep aroma.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Watermill (<strong>Gharat</strong>) cold stone-grinding for our barley (<em>jau</em>), sattu, and millet flours to keep grain enzymes intact.</span>
                </li>
              </ul>
            </div>

            {/* Craft Principle 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest/15 text-forest flex items-center justify-center">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest">
                Clean, Unrefined Ingredients
              </h3>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                We never use refined white sugar, artificial food coloring, or synthetic chemical flavors. Every recipe is formulated with wholesome, restorative kitchen staples:
              </p>
              <ul className="text-xs text-charcoal/70 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>100% Pure Vedic Cow Bilona Desi Ghee.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Natural unbleached Desi Khand & Thread Mishri (<em>Dhage Wali Mishri</em>).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Traditional wooden kohlu cold-pressed apricot kernel oil (<em>Chulli</em>).</span>
                </li>
              </ul>
            </div>

            {/* Craft Principle 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest">
                FSSAI-Compliant Food Safety
              </h3>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Every batch is prepared and packed under strict FSSAI hygiene guidelines in our sanitary Solan facility:
              </p>
              <ul className="text-xs text-charcoal/70 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Heavy-duty, food-grade protective glass jars.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Tamper-evident induction seals to retain mountain freshness and prevent oxidation.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gold font-bold">•</span>
                  <span>Batch-coded quality tracking with zero artificial preservatives.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. EMPOWERING RURAL WOMEN & HILL FARMERS */}
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Himalayan Forest Trail Background Watermark */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
            <Image
              src="/images/himalayan-forest-trail-theme.jpg"
              alt="Himalayan Forest Trail Solan"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest to-forest-dark/95" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-light px-3.5 py-1 rounded-full text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>COMMUNITY & SOCIAL RESPONSIBILITY</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Empowering Rural Women & Hill Farmers
              </h2>

              <p className="text-xs sm:text-sm text-cream/90 leading-relaxed">
                Every jar and pack you purchase directly supports rural livelihoods in Himachal Pradesh. We actively train and collaborate with local village women around Solan in traditional pickle-making, laddu preparation, and hygienic food processing—creating sustainable village-level employment and helping preserve our rich culinary heritage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm">
                  <h4 className="font-serif font-bold text-sm text-gold">Village Employment</h4>
                  <p className="text-[11px] text-cream/70 mt-1">Direct home-grown wages for women artisans</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm">
                  <h4 className="font-serif font-bold text-sm text-gold">Heritage Preservation</h4>
                  <p className="text-[11px] text-cream/70 mt-1">Passing traditional recipes to future generations</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm">
                  <h4 className="font-serif font-bold text-sm text-gold">Fair Grower Income</h4>
                  <p className="text-[11px] text-cream/70 mt-1">Premium guaranteed pricing for Kinnaur & Solan FPOs</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md space-y-4">
              <Award className="w-12 h-12 text-gold" />
              <h4 className="font-serif font-bold text-base text-white">Ethical Himalayan Origin</h4>
              <p className="text-xs text-cream/80 leading-relaxed">
                Thank you for choosing conscious, sustainable nutrition that nourishes both your health and mountain communities.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs px-6 py-3 rounded-full transition shadow"
              >
                <span>Explore Sourced Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 5. WHATSAPP & SOURCING INQUIRIES */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-8 sm:p-12 text-center space-y-4 shadow-card">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Questions About Our Sourcing or Bulk Partnerships?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 max-w-xl mx-auto leading-relaxed">
            Whether you are an organic retailer, ayurvedic doctor, or a conscious consumer looking to trace your food back to Himachal's soil, we are happy to share batch details and seasonal harvest dates.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20would%20like%20to%20know%20more%20about%20your%20sourcing%20and%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
              <span>Chat with Our Sourcing Team (+91 98055-65679)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cream hover:bg-cream-dark text-forest font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-beige transition"
            >
              <span>Visit Facility & Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
