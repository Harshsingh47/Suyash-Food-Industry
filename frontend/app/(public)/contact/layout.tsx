import type { Metadata } from 'next';
import { SITE_URL, buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us & Wholesale Enquiries | Suyash Food Industries, Solan HP',
  description:
    'Contact Suyash Food Industries in Solan, Himachal Pradesh for retail orders, B2B wholesale partnership, and custom food processing enquiries. Phone & WhatsApp: +91 98055-65679.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Suyash Food Industries | Solan, Himachal Pradesh',
    description:
      'Reach out for Himalayan produce distribution, wholesale enquiries, and customer support. Solan, HP.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'Suyash Food Industries',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = buildLocalBusinessSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact & Enquiries', path: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
