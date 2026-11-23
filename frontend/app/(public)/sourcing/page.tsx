import type { Metadata } from 'next';
import AboutPage from '../about/page';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Himalayan Produce Sourcing & Farm Clusters | Suyash Food Industries',
  description:
    'Learn how Suyash Food Industries procures high-altitude Kagzi walnuts, wild apricots, red rajma, and herbs directly from Kinnaur, Solan, and Sirmaur farming clusters.',
  alternates: {
    canonical: `${SITE_URL}/sourcing`,
  },
  openGraph: {
    title: 'Himalayan Produce Sourcing | Suyash Food Industries',
    description:
      'Direct farm procurement from Himachal Pradesh. Empowering rural farmers and women collectives with sustainable value addition.',
    url: `${SITE_URL}/sourcing`,
    type: 'website',
  },
};

export default AboutPage;
