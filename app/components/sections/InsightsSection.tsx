'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { BlogCard } from '@/app/components/sections/BlogCard';
import {
  fallbackArticles,
  ALL_CATEGORIES,
  PAGE_SIZE,
  type Article,
  type ArticleCategory,
} from '@/app/data/insights';

// ─── Sanity integration stub ──────────────────────────────────────────────────
//
// To connect Sanity, replace `fallbackArticles` with a live fetch:
//
//   // In a parent Server Component:
//   import { sanityClient } from '@/lib/sanity';
//   import { ARTICLES_QUERY } from '@/app/data/insights';
//   const articles = await sanityClient.fetch<Article[]>(ARTICLES_QUERY);
//   // Then pass as: <InsightsSection articles={articles} />
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Category tab ─────────────────────────────────────────────────────────────

function CategoryTab({
  label,
  active,
  count,
  onClick,
}: {
  label: ArticleCategory;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        'relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        active
          ? 'bg-primary text-white shadow-sm'
          : 'bg-white border border-neutral-200 text-ink-muted hover:border-accent hover:text-accent',
      ].join(' ')}
    >
      {label}
      <span
        className={[
          'rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
          active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-ink-subtle',
        ].join(' ')}
      >
        {count}
      </span>
      {active && (
        <motion.span
          layoutId="insights-category-pill"
          className="absolute inset-0 rounded-full bg-primary -z-10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

// ─── Search input ─────────────────────────────────────────────────────────────

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xs">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-subtle"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="search"
        placeholder="Search articles…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-neutral-200 bg-white py-2 pl-9 pr-4 text-sm text-primary placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200"
        aria-label="Search articles"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink transition-colors"
          aria-label="Clear search"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Mobile carousel strip ────────────────────────────────────────────────────

function MobileCarousel({ articles }: { articles: Article[] }) {
  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide sm:hidden"
      role="list"
      aria-label="Article carousel"
    >
      {articles.map((article, i) => (
        <div
          key={article.slug}
          className="flex-none w-[82vw] snap-start"
          role="listitem"
        >
          <BlogCard article={article} index={i} />
        </div>
      ))}
    </div>
  );
}

// ─── InsightsSection ──────────────────────────────────────────────────────────

interface InsightsSectionProps {
  /** Pass live Sanity articles here; falls back to static data */
  articles?: Article[];
}

export function InsightsSection({ articles = fallbackArticles }: InsightsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>('All');
  const [searchRaw, setSearchRaw] = useState('');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  // Debounce search input 300 ms
  useEffect(() => {
    const id = setTimeout(() => setSearch(searchRaw.trim().toLowerCase()), 300);
    return () => clearTimeout(id);
  }, [searchRaw]);

  // Reset visible count on filter/search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, search]);

  // Per-category counts (for tabs)
  const categoryCounts = useMemo(() => {
    const counts: Record<ArticleCategory, number> = { All: articles.length, Audit: 0, Risk: 0, AI: 0, Compliance: 0, Forensics: 0 };
    articles.forEach((a) => { counts[a.category] += 1; });
    return counts;
  }, [articles]);

  // Filtered list
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = activeCategory === 'All' || a.category === activeCategory;
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search) ||
        a.excerpt.toLowerCase().includes(search) ||
        a.category.toLowerCase().includes(search);
      return matchCat && matchSearch;
    });
  }, [articles, activeCategory, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount((n) => n + PAGE_SIZE);
  }, []);

  const hasResults = visible.length > 0;

  return (
    <Section variant="light" id="insights">
      {/* Header + view-all link */}
      <div className="flex items-end justify-between mb-10">
        <SectionHeader
          eyebrow="Insights"
          title="Thought Leadership"
          subtitle="Perspectives on audit, technology, and governance from our practice."
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

      {/* Filter + Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
        <div
          className="flex items-center gap-2 flex-wrap"
          role="group"
          aria-label="Filter articles by category"
        >
          {ALL_CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              label={cat}
              active={activeCategory === cat}
              count={categoryCounts[cat]}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
        <div className="sm:ml-auto">
          <SearchInput value={searchRaw} onChange={setSearchRaw} />
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-ink-subtle mb-6" aria-live="polite">
        {hasResults
          ? `Showing ${visible.length} of ${filtered.length} article${filtered.length === 1 ? '' : 's'}`
          : 'No articles found'}
      </p>

      {/* ── Mobile carousel (horizontal scroll snap) ─────────────── */}
      {hasResults && <MobileCarousel articles={visible} />}

      {/* ── Desktop grid ─────────────────────────────────────────── */}
      {hasResults ? (
        <div className="hidden sm:block">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visible.map((article, i) => (
                <BlogCard key={article.slug} article={article} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden sm:flex flex-col items-center justify-center py-20 text-center"
        >
          <svg className="h-12 w-12 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
          <p className="text-sm font-medium text-ink-muted">No articles matched your search.</p>
          <button
            className="mt-3 text-sm text-accent hover:underline"
            onClick={() => { setSearchRaw(''); setActiveCategory('All'); }}
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Load more */}
      <AnimatePresence>
        {hasMore && hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 flex justify-center"
          >
            <button
              ref={loadMoreRef}
              onClick={loadMore}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm hover:border-accent hover:text-accent hover:shadow-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Load more articles
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
