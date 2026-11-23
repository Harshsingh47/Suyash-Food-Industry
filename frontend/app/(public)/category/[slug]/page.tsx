import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Mountain, Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { fetchApi } from '@/lib/api';

export const revalidate = 120;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string) {
  try {
    const category = await fetchApi(`/categories/${slug}`);
    return category;
  } catch (err) {
    return null;
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = category.products || [];

  return (
    <div className="bg-cream/20 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-charcoal/60 mb-6">
          <Link href="/" className="hover:text-forest transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest transition">Shop</Link>
          <span>/</span>
          <span className="text-forest font-semibold">{category.name}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="bg-gradient-to-r from-forest to-deep-green text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-gold/20 text-gold-light px-3 py-1 rounded-full text-xs font-semibold">
              <Mountain className="w-3.5 h-3.5" />
              <span>Himalayan Collection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
              {category.description || 'Pristine mountain produce sourced directly from Solan, Himachal Pradesh.'}
            </p>
          </div>
        </div>

        {/* Product Listing */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-charcoal/70">
            <div>
              Showing <span className="font-bold text-forest">{products.length}</span> authentic products
            </div>
            <Link href="/shop" className="text-xs font-semibold text-forest hover:underline">
              View All Categories →
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-beige shadow-card">
              <p className="text-sm text-charcoal/70">No products currently available in this category.</p>
              <Link
                href="/shop"
                className="mt-4 inline-block bg-forest text-white text-xs font-semibold px-5 py-2.5 rounded-full"
              >
                Browse Shop Catalogue
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((p: any) => (
                <ProductCard key={p.id} product={{ ...p, category }} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
