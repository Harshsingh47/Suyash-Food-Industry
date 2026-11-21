import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mountain, Phone, Mail, MapPin, MessageCircle, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream border-t border-forest pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Value Proposition Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-forest-light/40">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-gold flex-shrink-0">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Himalayan Sourced</h4>
              <p className="text-xs text-cream/70 mt-1">Direct from mountain terraced farms and high-altitude orchards in Solan, HP.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">100% Pure & Unpolished</h4>
              <p className="text-xs text-cream/70 mt-1">Free from chemical polish, dyes, lead chromate, and artificial preservatives.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-gold flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Direct WhatsApp Enquiry</h4>
              <p className="text-xs text-cream/70 mt-1">Instant availability confirmation, personalized bulk rates, and prompt answers.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-gold flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Supporting Hill Farmers</h4>
              <p className="text-xs text-cream/70 mt-1">Empowering local agricultural families and preserving indigenous seeds.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white/95 hover:bg-white px-3.5 py-2 rounded-2xl shadow-sm transition-all duration-300 group">
              <Image
                src="/images/logo.png"
                alt="Suyash Food Industries"
                width={170}
                height={58}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-cream/80 leading-relaxed max-w-sm">
              Nestled in the serene foothills of Solan, Himachal Pradesh, Suyash Food Industries crafts unadulterated cold-pressed wild apricot oils, heritage unpolished grains, pure Bilona cow ghee, and natural sun-dried orchard specialties.
            </p>
            
            <div className="pt-2">
              <a
                href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enquire via WhatsApp (+91 98055 65679)</span>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">Our Collections</h5>
            <ul className="space-y-2 text-xs text-cream/80">
              <li><Link href="/category/himalayan-organic-staples" className="hover:text-gold transition">Himalayan Staples</Link></li>
              <li><Link href="/category/apricot-oils" className="hover:text-gold transition">Apricot Oils (Chuli)</Link></li>
              <li><Link href="/category/sarojs-heritage" className="hover:text-gold transition">Saroj’s Heritage</Link></li>
              <li><Link href="/category/dimples-jar" className="hover:text-gold transition">Dimple’s Jar Ghee & Jam</Link></li>
              <li><Link href="/category/nilansh-gold" className="hover:text-gold transition">Nilansh Gold Mix</Link></li>
              <li><Link href="/category/dried-gourmet-flakes" className="hover:text-gold transition">Dried Gourmet & Apples</Link></li>
              <li><Link href="/category/wellness-superfood-range" className="hover:text-gold transition">Wellness & Sattu</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-xs text-cream/80">
              <li><Link href="/shop" className="hover:text-gold transition">Shop Catalogue</Link></li>
              <li><Link href="/about" className="hover:text-gold transition">About Our Sourcing</Link></li>
              <li><Link href="/enquiry" className="hover:text-gold transition">My Enquiry List</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition">Himalayan Recipes & Blog</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition">Contact & Wholesale</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-gold transition">Privacy Policy</Link></li>
              <li><Link href="/admin/login" className="hover:text-gold transition text-cream/50">Staff / Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">Headquarters</h5>
            <div className="space-y-3 text-xs text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Near Regional Hospital, Solan, Himachal Pradesh, INDIA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+919805565679" className="hover:text-gold transition">+91 98055 65679</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:suyashfoodindustries@gmail.com" className="hover:text-gold transition">suyashfoodindustries@gmail.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 mt-4 border-t border-forest-light/40 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <div>
            © {currentYear} Suyash Food Industries. All Rights Reserved. Solan, Himachal Pradesh.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-cream transition">Privacy Policy</Link>
            <Link href="/shop" className="hover:text-cream transition">All Products</Link>
            <Link href="/contact" className="hover:text-cream transition">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
