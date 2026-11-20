import type { Metadata } from 'next';
import './globals.css';
import { EnquiryProvider } from '@/context/EnquiryContext';
import { AuthProvider } from '@/context/AuthContext';
import EnquiryDrawer from '@/components/enquiry/EnquiryDrawer';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col custom-scrollbar">
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
