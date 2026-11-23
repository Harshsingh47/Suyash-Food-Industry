import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { EnquiryProvider } from '@/context/EnquiryContext';
import { AuthProvider } from '@/context/AuthContext';
import EnquiryDrawer from '@/components/enquiry/EnquiryDrawer';

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
  title: 'Suyash Food Industries | Authentic Himalayan Organic Produce & Apricot Oils',
  description: 'Pure, authentic, unpolished Himalayan staples, wild cold-pressed apricot oils, bilona cow ghee, and sun-dried gourmet specialties directly from Solan, Himachal Pradesh. Enquire on WhatsApp for retail & wholesale.',
  keywords: 'Himalayan red rice, unpolished grains, wild apricot oil, pure desi ghee, buckwheat flour, sattu, Solan Himachal Pradesh food industry',
  openGraph: {
    title: 'Suyash Food Industries — Pure Himalayan Heritage',
    description: 'Authentic organic produce directly sourced from the foothills of Himachal Pradesh.',
    url: 'https://suyashfoodindustries.in',
    siteName: 'Suyash Food Industries',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/images/logo-emblem.png',
    apple: '/images/logo-emblem.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col custom-scrollbar font-sans">
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
