import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { fetchApi } from '@/lib/api';
import { SITE_URL, buildProductSchema, buildBreadcrumbSchema } from '@/lib/seo';

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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Suyash Food Industries',
      description: 'The requested Himalayan product could not be located.',
      robots: { index: false, follow: true },
    };
  }

  const effectivePrice = product.salePrice && product.salePrice < product.regularPrice
    ? product.salePrice
    : product.regularPrice;

  const title = product.seoTitle || `${product.name} — Authentic Himalayan Range`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `Buy 100% natural ${product.name} from Suyash Food Industries, Solan, Himachal Pradesh. Starting at ₹${effectivePrice}. Direct WhatsApp inquiry and fast shipping.`;

  const canonicalUrl = product.canonicalUrl || `${SITE_URL}/product/${product.slug}`;

  const ogImages = product.images && product.images.length > 0
    ? product.images.map((img: any) => ({
        url: img.url.startsWith('http') ? img.url : `${SITE_URL}${img.url.startsWith('/') ? img.url : `/${img.url}`}`,
        alt: img.altText || product.name,
      }))
    : [{ url: `${SITE_URL}/images/wholesale-showcase-b2b.webp`, alt: product.name }];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Suyash Food Industries`,
      description,
      url: canonicalUrl,
      type: 'website',
      images: ogImages,
      siteName: 'Suyash Food Industries',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Suyash Food Industries`,
      description,
      images: [ogImages[0]?.url || `${SITE_URL}/images/wholesale-showcase-b2b.webp`],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productSchema = buildProductSchema(product);
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    ...(product.category
      ? [{ name: product.category.name, path: `/category/${product.category.slug}` }]
      : []),
    { name: product.name, path: `/product/${product.slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="bg-cream/20 min-h-screen py-10 sm:py-14">
      {/* Product & Breadcrumb Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-charcoal/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-forest transition">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:text-forest transition">Shop</Link>
          <span aria-hidden="true">/</span>
          {product.category && (
            <>
              <Link href={`/category/${product.category.slug}`} className="hover:text-forest transition">
                {product.category.name}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="text-forest font-semibold truncate max-w-xs" aria-current="page">
            {product.name}
          </span>
        </nav>

        {/* Client Product Detail Interactive Component */}
        <ProductDetailClient product={product} />

      </div>
    </div>
  );
}
