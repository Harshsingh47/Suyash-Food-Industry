'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import ComboCard from './ComboCard';

interface ComboSectionProps {
  combos: any[];
  title?: string;
  subtitle?: string;
  viewAllLink?: boolean;
}

export default function ComboSection({
  combos,
  title = 'Special Himalayan Combo Offers & Value Bundles',
  subtitle = 'Curated combinations of authentic cold-pressed oils, pure cow ghee, and high-altitude Kinnaur produce at exclusive bundled sale prices.',
  viewAllLink = false,
}: ComboSectionProps) {
  if (!combos || combos.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="text-xs font-bold text-gold-dark uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-forest" />
            <span>Limited Period Combos on Sale</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {viewAllLink && (
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-forest-light transition"
          >
            <span>Explore All Bundles & Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Grid of Combos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {combos.map((combo) => (
          <ComboCard key={combo.id} combo={combo} />
        ))}
      </div>
    </section>
  );
}