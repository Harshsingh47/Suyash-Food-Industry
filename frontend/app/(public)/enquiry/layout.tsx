import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Product Enquiry | Suyash Food Industries',
  description: 'Review your selected Himalayan produce and send a direct wholesale/retail enquiry via WhatsApp.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function EnquiryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
