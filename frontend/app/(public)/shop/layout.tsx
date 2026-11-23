import type { Metadata } from 'next';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shop Authentic Himalayan Produce & Cold-Pressed Oils | Suyash Food Industries',
  description:
    'Browse the complete catalogue of authentic Himalayan produce: unpolished red rice, raw pulses, cold-pressed wild apricot oils, Vedic bilona cow ghee, and sun-dried specialties. Direct farm sourcing from Solan, HP.',
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: 'Shop Authentic Himalayan Produce | Suyash Food Industries',
    description:
      'Order farm-direct Himalayan grains, pure apricot oils, and Vedic bilona ghee. High-altitude purity from Solan, HP.',
    url: `${SITE_URL}/shop`,
    type: 'website',
    siteName: 'Suyash Food Industries',
    images: [
      {
        url: '/images/wholesale-showcase-b2b.webp',
        width: 1200,
        height: 630,
        alt: 'Suyash Food Industries Shop Catalogue',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Authentic Himalayan Produce | Suyash Food Industries',
    description:
      'Farm-direct Himalayan red rice, wild apricot oils, and Vedic bilona cow ghee from Solan, HP.',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Shop Catalogue', path: '/shop' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
