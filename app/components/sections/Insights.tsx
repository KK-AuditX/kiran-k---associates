import Link from 'next/link';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { Card, CardTitle, CardDescription } from '@/app/components/ui/Card';
import { Grid } from '@/app/components/ui/Grid';

// Static fallback articles — replaced by live Sanity data in production
const fallbackInsights = [
  {
    slug: '01-ai-forensic-audits',
    title: 'AI in Forensic Audits: The Next Frontier',
    excerpt:
      'How machine learning is transforming fraud detection and giving forensic accountants an analytical edge never seen before.',
    date: '2024-12-15',
    tag: 'Forensic',
  },
  {
    slug: '02-gst-saas-companies',
    title: 'GST Compliance for SaaS Companies',
    excerpt:
      'A deep-dive into India\'s evolving GST landscape for cloud-driven software businesses and how to stay ahead of the curve.',
    date: '2025-01-10',
    tag: 'Taxation',
  },
  {
    slug: '03-cybersecurity-balance-sheet',
    title: 'Cybersecurity on the Balance Sheet',
    excerpt:
      'Why modern CFOs must treat cybersecurity as a financial asset — and how IS audits protect enterprise value.',
    date: '2025-02-01',
    tag: 'IS Audit',
  },
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  );
}

export function Insights() {
  return (
    <Section variant="light" id="insights">
      <div className="flex items-end justify-between mb-12">
        <SectionHeader
          eyebrow="Insights"
          title="Thought Leadership"
          subtitle="Perspectives on finance, technology, and governance from our practice."
        />
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-700 transition-colors whitespace-nowrap mb-[3.75rem]"
        >
          View all
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Grid cols={3} gap="lg">
        {fallbackInsights.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <Card className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                  {post.tag}
                </span>
                <time className="text-xs text-ink-muted" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
              <CardTitle className="mb-2 group-hover:text-accent transition-colors">{post.title}</CardTitle>
              <CardDescription className="flex-1">{post.excerpt}</CardDescription>
              <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-accent">
                Read article
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </Section>
  );
}
