'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Mountain
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

interface HeaderProps {
  whatsappNumber?: string;
}

export default function Header({ whatsappNumber = '+919805565679' }: HeaderProps) {
  const pathname = usePathname();
  const { totalCount, setIsDrawerOpen } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const categories = [
    { name: 'Himalayan Organic Staples', slug: 'himalayan-organic-staples', count: 11 },
    { name: 'Apricot Oils', slug: 'apricot-oils', count: 2 },
    { name: 'Saroj’s Heritage', slug: 'sarojs-heritage', count: 2 },
    { name: 'Dimple’s Jar', slug: 'dimples-jar', count: 2 },
    { name: 'Nilansh Gold', slug: 'nilansh-gold', count: 2 },
    { name: 'Dried Gourmet & Flakes', slug: 'dried-gourmet-flakes', count: 2 },
    { name: 'Wellness & Superfood Range', slug: 'wellness-superfood-range', count: 3 },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Catalogue', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog & Recipes', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const waLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Suyash Food Industries, I would like to enquire about your authentic Himalayan products.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-beige shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-forest flex items-center justify-center text-gold shadow-md group-hover:scale-105 transition-transform duration-300">
              <Mountain className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-forest tracking-tight group-hover:text-forest-light transition-colors">
                SUYASH
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium -mt-1">
                Food Industries • Solan
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-forest font-semibold border-b-2 border-forest pb-1'
                      : 'text-charcoal hover:text-forest'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoryDropdown(true)}
              onMouseLeave={() => setCategoryDropdown(false)}
            >
              <button 
                className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-forest py-2 transition-colors"
              >
                <span>Collections</span>
                <ChevronDown className="w-4 h-4 text-forest/70 transition-transform duration-200" />
              </button>

              {categoryDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-dropdown border border-beige p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider px-3 py-1.5 mb-1 border-b border-cream-dark">
                    Himalayan Categories
                  </div>
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-charcoal rounded-lg hover:bg-cream hover:text-forest transition"
                      onClick={() => setCategoryDropdown(false)}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-white bg-forest/80 px-2 py-0.5 rounded-full">
                        {c.count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* My Enquiry Cart-Alternative Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-cream hover:bg-beige text-forest px-3.5 py-2 rounded-full font-medium text-xs sm:text-sm border border-beige-dark/30 transition shadow-sm"
              title="View Product Enquiry List"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              <span className="hidden sm:inline">My Enquiry</span>
              {totalCount > 0 && (
                <span className="bg-forest text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal hover:text-forest transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-beige px-5 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-charcoal hover:text-forest py-1.5 border-b border-cream"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2">
              <div className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
                Himalayan Collections
              </div>
              <div className="grid grid-cols-1 gap-1.5 pl-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="text-sm text-charcoal/80 hover:text-forest py-1 flex items-center justify-between"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-white bg-forest/70 px-2 py-0.5 rounded-full">
                      {c.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-beige flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDrawerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-cream text-forest py-2.5 rounded-lg font-medium text-sm border border-beige"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Enquiry List ({totalCount})</span>
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-2.5 rounded-lg font-medium text-sm shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Suyash Food on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
