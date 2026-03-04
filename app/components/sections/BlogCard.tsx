'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORY_GRADIENT, CATEGORY_RING, type Article } from '@/app/data/insights';
import { cn } from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

// ─── Category thumbnail gradient ─────────────────────────────────────────────

function Thumbnail({ category, featured }: { category: Article['category']; featured?: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-t-xl',
        featured ? 'h-52' : 'h-40',
        'bg-gradient-to-br',
        CATEGORY_GRADIENT[category],
      )}
      aria-hidden="true"
    >
      {/* Abstract shape decoration */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
        <span className="text-xs font-medium text-white/70 tracking-wide">
          {category}
        </span>
      </div>
      {featured && (
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}
    </div>
  );
}

// ─── BlogCard ─────────────────────────────────────────────────────────────────

interface BlogCardProps {
  article: Article;
  index?: number;
  /** Compact layout — no gradient thumbnail, used in list view */
  compact?: boolean;
}

export function BlogCard({ article, index = 0, compact = false }: BlogCardProps) {
  const { slug, title, excerpt, date, category, readTime, author, authorRole, featured } = article;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <Link href={`/blog/${slug}`} className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl">
        {!compact && (
          <Thumbnail category={category} featured={featured} />
        )}

        <div className={cn('flex flex-col flex-1 p-5', compact && 'p-5')}>
          {/* Category + read time row */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                CATEGORY_RING[category],
              )}
            >
              {category}
            </span>
            <span className="text-xs text-ink-subtle flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold leading-snug text-primary mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 flex-1 mb-4">
            {excerpt}
          </p>

          {/* Footer: author + date + arrow */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              {/* Author avatar placeholder */}
              <div className="h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-accent">
                  {author.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-primary leading-tight">{author}</span>
                {authorRole && (
                  <span className="text-[10px] text-ink-subtle leading-tight">{authorRole}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <time className="text-[11px] text-ink-subtle" dateTime={date}>
                {formatDate(date)}
              </time>
              <svg
                className="h-4 w-4 text-accent opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
