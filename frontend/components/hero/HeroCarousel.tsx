'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface SlideSpec {
  label: string;
  value: string;
}

interface SlideItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
  badgeText: string;
  stats: {
    val: string;
    label: string;
  }[];
  specs: SlideSpec[];
}

const slides: SlideItem[] = [
  {
    id: 'superfood-mix',
    eyebrow: 'I N T R O',
    title: 'Nilansh Gold Organic Superfood Mix',
    description:
      'Get clean, natural energy support with roasted Himalayan superfoods: a potent blend of organic grains, nuts, and raw superfoods, gently stone-ground to preserve purity and deliver sustained daily nutrition.',
    price: '₹299',
    ctaText: 'Order Now',
    ctaLink: '/shop?brand=nilansh-gold',
    image: '/images/hero-showcase-superfood-greens.png',
    imageAlt: 'Nilansh Gold Organic Superfood Mix — Suyash Food Industries',
    accentBg: 'bg-[#488F7D]',
    accentText: 'text-[#488F7D]',
    badgeText: 'ORGANIC',
    stats: [
      { val: '100%', label: 'Organic Raw Food' },
      { val: '24g', label: 'Plant Protein' },
      { val: '4.9 ★', label: 'Verified Reviews' },
    ],
    specs: [
      { label: 'Fat', value: '0.5g' },
      { label: 'Sodium', value: '85mg' },
      { label: 'Carbs', value: '13.0g' },
      { label: 'Fiber', value: '7.0g' },
      { label: 'Sugar', value: '0.0g' },
      { label: 'Protein', value: '21.0g' },
      { label: 'Calcium', value: '150mg' },
      { label: 'Iron', value: '13mg' },
      { label: 'Potassium', value: '409mg' },
    ],
  },
  {
    id: 'wild-apricot-oil',
    eyebrow: 'I N T R O',
    title: "Saroj's Heritage Pure Wild Apricot Oil",
    description:
      'Extracted from hand-selected wild Himalayan apricot kernels using traditional cold-press wooden kohlus. Preserves natural Vitamin E, essential oleic fatty acids, and delicate nutty aroma with zero chemical refining.',
    price: '₹880',
    ctaText: 'Order Now',
    ctaLink: '/shop?cat=apricot-oils',
    image: '/images/hero-showcase-apricot-oil.png',
    imageAlt: "Saroj's Heritage Pure Wild Apricot Oil — Suyash Food Industries",
    accentBg: 'bg-[#3A6B56]',
    accentText: 'text-[#3A6B56]',
    badgeText: 'COLD-PRESSED',
    stats: [
      { val: '100%', label: 'Cold-Pressed Purity' },
      { val: 'Omega-9', label: '68% Oleic Acid' },
      { val: 'Solan, HP', label: 'Terroir Origin' },
    ],
    specs: [
      { label: 'Oleic Acid', value: '68.4%' },
      { label: 'Linoleic Acid', value: '24.2%' },
      { label: 'Vitamin E', value: 'Active' },
      { label: 'Extraction', value: 'Wood Kohlu' },
      { label: 'Free Acidity', value: '< 0.8%' },
      { label: 'Chemicals', value: '0.0%' },
      { label: 'Refining', value: '0.0%' },
      { label: 'Volume', value: '250ml' },
      { label: 'Origin', value: 'Solan, HP' },
    ],
  },
  {
    id: 'vedic-bilona-ghee',
    eyebrow: 'I N T R O',
    title: "Saroj's Heritage Vedic Bilona Pure Desi Ghee",
    description:
      'Crafted with ancient Vedic curd-churning methods from free-grazing mountain cows. Slow-simmered in earthen pots to produce a rich golden granular texture and sacred aroma packed with natural CLA and fat-soluble vitamins.',
    price: '₹850',
    ctaText: 'Order Now',
    ctaLink: '/product/pure-desi-ghee-bilona-method',
    image: '/images/hero-showcase-bilona-ghee.png',
    imageAlt: "Saroj's Heritage Vedic Bilona Desi Ghee — Suyash Food Industries",
    accentBg: 'bg-[#7B5936]',
    accentText: 'text-[#7B5936]',
    badgeText: 'A2 BILONA',
    stats: [
      { val: '100%', label: 'Curd-Churned' },
      { val: 'Danedaar', label: 'Granular Aroma' },
      { val: 'Grass-Fed', label: 'Mountain Cows' },
    ],
    specs: [
      { label: 'Method', value: 'Vedic Bilona' },
      { label: 'Milk Source', value: 'A2 Cow Milk' },
      { label: 'Texture', value: 'Danedaar' },
      { label: 'Melting Point', value: '36°C' },
      { label: 'Omega-3', value: 'Natural' },
      { label: 'Preservatives', value: '0.0%' },
      { label: 'Smoke Point', value: '250°C' },
      { label: 'Volume', value: '500ml' },
      { label: 'Origin', value: 'Solan, HP' },
    ],
  },
  {
    id: 'apple-slices',
    eyebrow: 'I N T R O',
    title: 'Sun-Dried Himalayan Apple Slices',
    description:
      'Naturally dehydrated under the crisp mountain sun in high-altitude orchards of Himachal. Pure, wholesome fruit chew with zero added sugar, sulphur (SO2), or artificial preservatives.',
    price: '₹260',
    ctaText: 'Order Now',
    ctaLink: '/product/sun-dried-apple-slices',
    image: '/images/hero-showcase-apple-slices.png',
    imageAlt: 'Sun-Dried Himalayan Apple Slices — Suyash Food Industries',
    accentBg: 'bg-[#8F4835]',
    accentText: 'text-[#8F4835]',
    badgeText: 'SUN-DRIED',
    stats: [
      { val: '100%', label: 'Mountain Sun-Dried' },
      { val: 'Zero', label: 'Added Sugar' },
      { val: 'Kinnaur', label: 'Orchard Apples' },
    ],
    specs: [
      { label: 'Fruit', value: '100% Apple' },
      { label: 'Added Sugar', value: '0.0g' },
      { label: 'Sulphur (SO2)', value: '0.0%' },
      { label: 'Fiber', value: '14.2g' },
      { label: 'Vitamin C', value: 'Natural' },
      { label: 'Fat', value: '0.1g' },
      { label: 'Shelf Life', value: '9 Months' },
      { label: 'Net Weight', value: '200g' },
      { label: 'Origin', value: 'Himachal' },
    ],
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-play timer (6s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[current];

  return (
    <section
      aria-label="Hero Showcase"
      className="w-full bg-[#FAF9F6] py-5 sm:py-8 lg:py-10 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card exactly styled as reference */}
        <div className="relative bg-white rounded-3xl lg:rounded-[36px] overflow-hidden shadow-sm border border-stone-200/70 flex flex-col lg:flex-row min-h-[520px] transition-all duration-500">
          
          {/* LEFT COLUMN: INTRO, Heading, Paragraph, Order Button, Metrics, Carousel Nav */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
            <div>
              <span className={`text-xs font-bold tracking-[0.25em] ${currentSlide.accentText} uppercase`}>
                {currentSlide.eyebrow}
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#1E3A2F] leading-[1.14] tracking-tight mt-3">
                {currentSlide.title}
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed mt-4 max-w-md">
                {currentSlide.description}
              </p>

              <div className="pt-6 sm:pt-7">
                <a
                  href={`https://wa.me/919805565679?text=${encodeURIComponent(
                    `Hello Suyash Food Industries, I would like to order / enquire about ${currentSlide.title} (${currentSlide.price}). Please share details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#EF5435] hover:bg-[#D84325] active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Bottom Metrics + Carousel Navigation */}
            <div className="mt-8 pt-8 border-t border-stone-100">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
                {currentSlide.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-sans font-extrabold text-lg sm:text-2xl text-[#1E3A2F] tracking-tight">
                      {stat.val}
                    </span>
                    <span className="text-stone-500 text-[11px] sm:text-xs font-medium mt-0.5 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Carousel Arrows + Indicator Dots */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        i === current
                          ? 'w-6 h-2 bg-[#1E3A2F]'
                          : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: 3D Product & Raw Botanicals + Floating Stamp Badge */}
          <div className="relative flex flex-col items-center justify-center p-6 lg:p-8 shrink-0 min-w-[320px] lg:w-[410px]">
            
            {/* Floating Green Circular Stamp Badge */}
            <div className="absolute top-6 left-6 z-20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2BB673] text-white flex flex-col items-center justify-center shadow-lg border-2 border-white transform -rotate-12 select-none">
                <span className="text-[8px] font-black tracking-widest leading-none">NEW!</span>
                <Sparkles className="w-3.5 h-3.5 my-0.5 text-white fill-white" />
                <span className="text-[7px] font-black tracking-wider leading-none">{currentSlide.badgeText}</span>
              </div>
            </div>

            {/* 3D Product with Botanical Base */}
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[430px] flex items-center justify-center animate-3d-float">
              <Image
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.imageAlt}
                fill
                priority={current === 0}
                className="object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.10)] transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
              />
            </div>

            {/* Soft Contact Ground Shadow */}
            <div className="relative -mt-4 flex items-center justify-center pointer-events-none animate-3d-shadow">
              <div className="w-48 sm:w-64 h-5 rounded-full bg-stone-900/10 blur-xl" />
            </div>

          </div>

          {/* RIGHT COLUMN: Vertical Nutrition / Purity Fact Sheet Panel */}
          <div className={`${currentSlide.accentBg} text-white px-6 py-8 lg:py-10 flex flex-col justify-center rounded-tl-[36px] lg:rounded-tl-[44px] shrink-0 w-full lg:w-[220px] shadow-inner transition-colors duration-500`}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 pb-3 mb-2 border-b border-white/20">
              Purity & Facts
            </div>
            <div className="space-y-2.5">
              {currentSlide.specs.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-[13px] leading-tight">
                  <span className="text-white/80 font-normal">{item.label}</span>
                  <span className="text-white font-bold tracking-wide">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
