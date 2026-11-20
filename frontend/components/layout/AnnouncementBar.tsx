'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  phone?: string;
  announcement?: string;
}

export default function AnnouncementBar({
  phone = '+91 98055 65679',
  announcement = '🌿 Authentic Himalayan Produce from Solan, HP • Direct Farm Sourcing • Retail & Wholesale Enquiries Welcome',
}: AnnouncementBarProps) {
  return (
    <div className="bg-forest-dark text-cream-light text-xs font-medium py-2 px-4 border-b border-forest">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center md:text-left">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse flex-shrink-0" />
          <span>{announcement}</span>
        </div>

        <div className="hidden md:flex items-center gap-5 text-cream-dark">
          <div className="flex items-center gap-1.5 hover:text-white transition">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>Solan, Himachal Pradesh</span>
          </div>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
