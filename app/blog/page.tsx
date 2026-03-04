import type { Metadata } from 'next';
import { InsightsSection } from '@/app/components/sections/InsightsSection';

export const metadata: Metadata = {
  title: 'Insights & Thought Leadership | Kiran K & Associates',
  description:
    'Expert perspectives on audit, AI, forensic accounting, GST compliance, and governance from Kiran K & Associates — Chartered Accountants, Bengaluru.',
  openGraph: {
    title: 'Insights | Kiran K & Associates',
    description:
      'Perspectives on audit, technology, and governance from our CA practice.',
    url: 'https://kka.co.in/blog',
  },
};

/**
 * Server component — when Sanity is live, fetch articles here and pass them down:
 *
 *   import { client } from '@/lib/sanity';
 *   import { ARTICLES_QUERY, type Article } from '@/app/data/insights';
 *   const articles = await client.fetch<Article[]>(ARTICLES_QUERY);
 *   return <InsightsSection articles={articles} />;
 */
export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-50 pt-16">
      {/* Hero band */}
      <div className="bg-primary py-16">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Knowledge Hub
            </span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Insights &amp; <span className="text-accent">Thought Leadership</span>
          </h1>
          <p className="mt-5 text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Perspectives on audit, technology, forensics, and governance — from our
            CA practice.
          </p>
        </div>
      </div>

      {/* Full filterable articles grid */}
      <InsightsSection />
    </main>
  );
}
