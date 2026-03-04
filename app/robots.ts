import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block Sanity Studio, admin, and API routes from being indexed
        disallow: ['/studio/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://kka.co.in/sitemap.xml',
    host:    'https://kka.co.in',
  };
}
