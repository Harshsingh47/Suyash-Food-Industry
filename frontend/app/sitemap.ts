import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { fetchApi } from '@/lib/api';

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static indexable public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sourcing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/return-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Fetch dynamic products
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const productsRes = await fetchApi('/products?limit=200').catch(() => null);
    const products = productsRes?.data || [];
    productRoutes = products
      .filter((p: any) => p.slug && p.isPublished !== false)
      .map((p: any) => ({
        url: `${SITE_URL}/product/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (err) {
    console.warn('Sitemap: Failed to load products dynamically:', err);
  }

  // Fetch dynamic categories
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await fetchApi('/categories').catch(() => []);
    if (Array.isArray(categories)) {
      categoryRoutes = categories
        .filter((c: any) => c.slug && c.isActive !== false)
        .map((c: any) => ({
          url: `${SITE_URL}/category/${c.slug}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
    }
  } catch (err) {
    console.warn('Sitemap: Failed to load categories dynamically:', err);
  }

  // Default blog articles
  const defaultBlogSlugs = [
    'benefits-of-cold-pressed-wild-apricot-oil',
    'why-unpolished-red-rice-is-better',
    'understanding-traditional-bilona-desi-ghee',
  ];
  const blogRoutes: MetadataRoute.Sitemap = defaultBlogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
