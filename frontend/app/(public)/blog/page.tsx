import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Mountain, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { SITE_URL, buildBreadcrumbSchema, buildArticleSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Mountain Recipes & Himalayan Wellness Blog | Suyash Food Industries',
  description:
    'Discover Himalayan recipes, wild apricot oil beauty and joint-relief benefits, Vedic bilona cow ghee traditions, and authentic nutrition wisdom from Solan, HP.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Himalayan Wellness & Recipe Blog | Suyash Food Industries',
    description:
      'Guides on cold-pressed Chulli oil, unpolished red rice, and mountain herbs from Solan, HP.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    siteName: 'Suyash Food Industries',
  },
};

const defaultArticles = [
  {
    id: 'blog-1',
    slug: 'benefits-of-cold-pressed-wild-apricot-oil',
    title: 'The Miracles of Wild Apricot Oil (Chuli): Himalayan Skincare & Hair Wisdom',
    excerpt: 'Cold-pressed from wild mountain apricot seeds in the high valleys of Himachal, Chuli oil is rich in vitamins A and E, oleic acids, and natural emollients.',
    date: 'August 14, 2026',
    author: 'Saroj Sharma',
    image: '/images/products/pure-wild-apricot-oil-suyash-industries.jpeg',
    category: 'Herbal Wellness',
  },
  {
    id: 'blog-2',
    slug: 'why-unpolished-red-rice-is-better',
    title: 'Why Unpolished Himalayan Lal Chawal Outperforms Commercial White Rice',
    excerpt: 'Unpolished red rice preserves the bran and germ layer where maximum dietary fiber, anthocyanin antioxidants, and trace minerals reside.',
    date: 'September 2, 2026',
    author: 'Dr. R. K. Verma',
    image: '/images/products/lal-chawal-suyash-food-industries.jpeg',
    category: 'Nutrition & Health',
  },
  {
    id: 'blog-3',
    slug: 'understanding-traditional-bilona-desi-ghee',
    title: 'The Ancient Art of Vedic Bilona Churned Desi Ghee in Mountain Villages',
    excerpt: 'How cultured whole cow curd is slow-churned in wooden pots to yield golden, aromatic, gut-healing clarified butterfat.',
    date: 'October 19, 2026',
    author: 'Dimple Chauhan',
    image: '/images/products/pure-desi-ghee-suyash-food-industries.png',
    category: 'Artisanal Heritage',
  },
];

export default async function BlogPage() {
  let articles = defaultArticles;
  try {
    const apiBlogs = await fetchApi('/blogs');
    if (apiBlogs && apiBlogs.length > 0) {
      articles = apiBlogs;
    }
  } catch (e) {
    // Fallback to verified default articles
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog & Recipes', path: '/blog' },
  ]);

  return (
    <div className="bg-cream/20 min-h-screen py-12 sm:py-16">
      {/* Blog & Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {articles.map((art) => (
        <script
          key={art.id || art.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(art)) }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">
            Himalayan Living & Wellness
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Mountain Recipes & Herbal Wisdom
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70">
            Read guides, culinary traditions, and nutrition facts written by our Himalayan sourcing team and food specialists.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-3xl border border-beige overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-video relative bg-cream">
                <Image
                  src={art.image || '/images/products/lal-chawal-suyash-food-industries.jpeg'}
                  alt={art.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider">
                    {art.category || 'Mountain Articles'}
                  </span>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-forest hover:text-forest-light transition-colors line-clamp-2">
                    {art.title}
                  </h2>
                  <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-beige flex items-center justify-between text-[11px] text-charcoal/60">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{art.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{art.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
