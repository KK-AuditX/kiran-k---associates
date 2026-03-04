import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { client, blogDetailQuery, blogListQuery } from '@/lib/sanity';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/app/components/ui/Badge';

// Fallback blog content
const FALLBACK_CONTENT: Record<string, BlogPost> = {
  'ai-forensic-audits': {
    _id: '1',
    title: 'The Role of AI in Modern Forensic Audits',
    slug: { current: 'ai-forensic-audits' },
    publishedAt: '2023-10-12',
    summary: 'How machine learning algorithms are detecting anomalies faster than ever before.',
    tags: ['AI', 'Forensic'],
    body: [],
  },
  'gst-saas-companies': {
    _id: '2',
    title: 'GST Compliance for SaaS Companies',
    slug: { current: 'gst-saas-companies' },
    publishedAt: '2023-09-28',
    summary: 'Navigating cross-border taxation and digital service levies in India.',
    tags: ['GST', 'SaaS'],
    body: [],
  },
  'cybersecurity-balance-sheet': {
    _id: '3',
    title: 'Cybersecurity: The New Balance Sheet Risk',
    slug: { current: 'cybersecurity-balance-sheet' },
    publishedAt: '2023-08-15',
    summary: 'Why CFOs must prioritise information security.',
    tags: ['Cybersecurity', 'CFO'],
    body: [],
  },
};

export async function generateStaticParams() {
  try {
    const blogs = await client.fetch<BlogPost[]>(blogListQuery);
    return (blogs ?? []).map((b) => ({ slug: b.slug.current }));
  } catch (error) {
    console.error('[blog] generateStaticParams: Sanity fetch failed:', error);
    return Object.keys(FALLBACK_CONTENT).map((slug) => ({ slug }));
  }
}

// Next.js 15: params is a Promise
type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await client.fetch<BlogPost>(blogDetailQuery, { slug });
    if (blog) {
      return {
        title: blog.title,
        description: blog.summary,
        openGraph: {
          title: blog.title,
          description: blog.summary,
          type: 'article',
          publishedTime: blog.publishedAt,
          url: `https://kka.co.in/blog/${slug}`,
        },
        twitter: { card: 'summary', title: blog.title, description: blog.summary },
      };
    }
  } catch (error) {
    console.error('[blog] generateMetadata: Sanity fetch failed:', error);
  }
  const fb = FALLBACK_CONTENT[slug];
  return {
    title: fb?.title ?? 'Blog',
    description: fb?.summary ?? '',
  };
}

export default async function BlogDetailPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  let blog: BlogPost | null = null;

  try {
    blog = await client.fetch<BlogPost>(blogDetailQuery, { slug });
  } catch (error) {
    console.error('[blog] Page: Sanity fetch failed for slug:', slug, error);
  }

  if (!blog) {
    blog = FALLBACK_CONTENT[slug] ?? null;
  }

  if (!blog) return notFound();

  const jsonLd = {
    '@context':        'https://schema.org',
    '@type':           'Article',
    headline:          blog.title,
    description:       blog.summary,
    datePublished:     blog.publishedAt,
    dateModified:      blog.publishedAt,
    author: {
      '@type': 'Organization',
      name:    'Kiran K & Associates',
      url:     'https://kka.co.in',
    },
    publisher: {
      '@type': 'Organization',
      name:    'Kiran K & Associates',
      url:     'https://kka.co.in',
    },
    mainEntityOfPage: `https://kka.co.in/blog/${blog.slug.current}`,
  };

  return (
    <div className="bg-neutral-50 min-h-screen pt-24 pb-24">
      <Script
        id={`article-schema-${blog.slug.current}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-container">
        {/* Back */}
        <Link
          href="/#insights"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-accent transition-colors"
        >
          <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Back to Insights
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <time className="text-sm font-medium text-accent" dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
            {blog.tags?.map((tag) => (
              <Badge key={tag} label={tag} variant="accent" />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl">
            {blog.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{blog.summary}</p>

          {/* Body */}
          <div className="mt-12 rounded-xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-card">
            {blog.body?.length ? (
              <div className="prose max-w-none">
                <PortableText value={blog.body} />
              </div>
            ) : (
              <p className="text-center text-ink-muted italic py-10">
                Full article available when Sanity CMS is connected.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

