import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Mountain, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  ShoppingBag, 
  ArrowLeft,
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  Leaf
} from 'lucide-react';
import ProductDetailClient from './ProductDetailClient';
import { fetchApi } from '@/lib/api';

export const revalidate = 120;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const product = await fetchApi(`/products/slug/${slug}`);
    return product;
  } catch (err) {
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-cream/20 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-forest transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest transition">Shop</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/category/${product.category.slug}`} className="hover:text-forest transition">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-forest font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Client Product Detail Interactive Component */}
        <ProductDetailClient product={product} />

      </div>
    </div>
  );
}
