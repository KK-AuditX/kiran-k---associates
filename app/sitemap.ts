import type { MetadataRoute } from 'next';
import { client, blogListQuery } from '@/lib/sanity';
import type { BlogPost } from '@/types';

const BASE = 'https://kka.co.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`,      lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/careers`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacy`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/terms`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  ];

  // Dynamic blog routes from Sanity
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await client.fetch<BlogPost[]>(blogListQuery);
    blogRoutes = (blogs ?? []).map((b) => ({
      url:              `${BASE}/blog/${b.slug.current}`,
      lastModified:     b.publishedAt ? new Date(b.publishedAt) : new Date(),
      changeFrequency:  'monthly' as const,
      priority:         0.7,
    }));
  } catch (error) {
    console.error('[sitemap] Failed to fetch blog posts from Sanity:', error);
  }

  return [...staticRoutes, ...blogRoutes];
}
