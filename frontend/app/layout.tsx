import type { Metadata } from 'next';
import Script from 'next/script';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { EnquiryProvider } from '@/context/EnquiryContext';
import { AuthProvider } from '@/context/AuthContext';
import EnquiryDrawer from '@/components/enquiry/EnquiryDrawer';
import { SITE_URL } from '@/lib/seo';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmsans',
  weight: ['400', '500', '600', '700', '800'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Suyash Food Industries | Pure Himalayan Organic Produce & Cold-Pressed Apricot Oils',
    template: '%s | Suyash Food Industries',
  },
  description:
    'Pure, authentic, unpolished Himalayan staples, wild cold-pressed apricot oils, Vedic bilona cow ghee, and sun-dried gourmet specialties directly from Solan, Himachal Pradesh. Enquire on WhatsApp for retail & wholesale.',
  keywords: [
    'Suyash Food Industries',
    'Suyash Organics',
    'Himalayan red rice',
    'unpolished grains',
    'wild apricot oil',
    'chulli oil',
    'pure desi ghee',
    'vedic bilona ghee',
    'buckwheat flour',
    'sattu',
    'Solan Himachal Pradesh',
    'Himalayan dry fruits',
    'Saroj Heritage',
    'Dimple Jar',
    'Nilansh Gold',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Suyash Food Industries — Pure Himalayan Heritage & Cold-Pressed Oils',
    description:
      'Authentic organic produce and cold-pressed wild apricot oils directly sourced from the foothills of Solan, Himachal Pradesh.',
    url: SITE_URL,
    siteName: 'Suyash Food Industries',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/wholesale-showcase-b2b.webp',
        width: 1200,
        height: 630,
        alt: 'Suyash Food Industries Authentic Himalayan Produce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suyash Food Industries — Authentic Himalayan Produce & Apricot Oils',
    description:
      'Pure Himalayan red rice, cold-pressed apricot oils, and Vedic bilona cow ghee from Solan, HP.',
    images: ['/images/wholesale-showcase-b2b.webp'],
  },
  icons: {
    icon: '/images/logo-emblem.png',
    apple: '/images/logo-emblem.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col custom-scrollbar font-sans">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <AuthProvider>
          <EnquiryProvider>
            {children}
            <EnquiryDrawer />
          </EnquiryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
