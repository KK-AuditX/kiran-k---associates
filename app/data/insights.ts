/**
 * Insights data layer — Sanity CMS ready.
 *
 * Swap `fallbackArticles` with live Sanity data:
 *
 *   import { sanityClient } from '@/lib/sanity';
 *   import { ARTICLES_QUERY } from '@/app/data/insights';
 *   const articles = await sanityClient.fetch<Article[]>(ARTICLES_QUERY);
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleCategory = 'All' | 'Audit' | 'Risk' | 'AI' | 'Compliance' | 'Forensics';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO-8601 date string
  category: Exclude<ArticleCategory, 'All'>;
  readTime: number;       // minutes
  author: string;
  authorRole?: string;
  featured?: boolean;
}

// ─── Sanity GROQ projection (drop into lib/sanity.ts when CMS is live) ────────

export const ARTICLES_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "excerpt": pt::text(body)[0..220],
    "date": publishedAt,
    "category": categories[0]->title,
    readTime,
    "author": author->name,
    "authorRole": author->role,
    featured
  }
` as const;

// Single article detail query
export const ARTICLE_DETAIL_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    "date": publishedAt,
    "category": categories[0]->title,
    readTime,
    "author": author->name,
    "authorRole": author->role
  }
` as const;

// ─── Category metadata ────────────────────────────────────────────────────────

export const ALL_CATEGORIES: ArticleCategory[] = [
  'All', 'Audit', 'Risk', 'AI', 'Compliance', 'Forensics',
];

/** Tailwind gradient classes per category (for BlogCard thumbnail) */
export const CATEGORY_GRADIENT: Record<Exclude<ArticleCategory, 'All'>, string> = {
  Audit:      'from-blue-700 to-blue-900',
  Risk:       'from-amber-500 to-orange-700',
  AI:         'from-emerald-500 to-teal-700',
  Compliance: 'from-violet-600 to-purple-900',
  Forensics:  'from-rose-600 to-red-900',
};

/** Accent ring colour per category */
export const CATEGORY_RING: Record<Exclude<ArticleCategory, 'All'>, string> = {
  Audit:      'bg-blue-100 text-blue-800',
  Risk:       'bg-amber-100 text-amber-800',
  AI:         'bg-emerald-100 text-emerald-800',
  Compliance: 'bg-violet-100 text-violet-800',
  Forensics:  'bg-rose-100 text-rose-800',
};

// ─── Static fallback articles ─────────────────────────────────────────────────

export const fallbackArticles: Article[] = [
  {
    slug: 'ai-forensic-audits',
    title: 'AI in Forensic Audits: The Next Frontier',
    excerpt:
      'How machine learning is transforming fraud detection and giving forensic accountants an analytical edge never seen before in the profession.',
    date: '2025-12-15',
    category: 'Forensics',
    readTime: 7,
    author: 'Kiran K',
    authorRole: 'Forensic Auditor',
    featured: true,
  },
  {
    slug: 'dpdpa-compliance-msmes',
    title: 'DPDPA Compliance for MSMEs: A Practical Roadmap',
    excerpt:
      "India's Digital Personal Data Protection Act demands immediate action from MSMEs. We break down what you actually need to do before the deadline.",
    date: '2025-01-22',
    category: 'Compliance',
    readTime: 9,
    author: 'Kiran K',
    authorRole: 'Compliance Advisor',
  },
  {
    slug: 'digital-risk-banking',
    title: 'Digital Risk in Banking: IS Audit Perspectives',
    excerpt:
      'The rapid digitisation of banking creates systemic vulnerabilities that IS auditors must understand — from core banking systems to UPI payment rails.',
    date: '2025-02-10',
    category: 'Risk',
    readTime: 8,
    author: 'Kiran K',
    authorRole: 'IS Auditor',
    featured: true,
  },
  {
    slug: 'ai-audit-readiness',
    title: 'Is Your Organisation AI Audit-Ready?',
    excerpt:
      'As AI governance frameworks mature globally, Indian organisations need a clear checklist to assess their readiness for AI-specific audit engagements.',
    date: '2025-03-01',
    category: 'AI',
    readTime: 10,
    author: 'Kiran K',
    authorRole: 'AI Auditor',
  },
  {
    slug: 'cybersecurity-balance-sheet',
    title: 'Cybersecurity on the Balance Sheet',
    excerpt:
      'Why modern CFOs must treat cybersecurity as a financial asset — and how IS audits protect enterprise value across the organisation.',
    date: '2025-02-01',
    category: 'Audit',
    readTime: 5,
    author: 'Kiran K',
    authorRole: 'IS Auditor',
  },
  {
    slug: 'gst-saas-companies',
    title: 'GST Compliance for SaaS Companies',
    excerpt:
      "India's evolving GST landscape for cloud-driven software businesses is complex. Here is how to stay audit-ready and ahead of the curve.",
    date: '2025-01-10',
    category: 'Compliance',
    readTime: 6,
    author: 'Kiran K',
    authorRole: 'Tax Advisor',
  },
  {
    slug: 'risk-based-internal-audit',
    title: 'Shifting to Risk-Based Internal Audit',
    excerpt:
      'Traditional tick-box audits no longer meet board expectations. A risk-based approach aligns internal audit with strategic organisational objectives.',
    date: '2024-11-20',
    category: 'Risk',
    readTime: 6,
    author: 'Kiran K',
    authorRole: 'Internal Auditor',
  },
  {
    slug: 'local-llm-fraud-detection',
    title: 'Local LLMs for Fraud Detection: A Practitioner View',
    excerpt:
      'Running large language models on-premises for forensic data analysis without exposing sensitive client data to third-party cloud services.',
    date: '2024-10-08',
    category: 'AI',
    readTime: 11,
    author: 'Kiran K',
    authorRole: 'AI Auditor',
  },
  {
    slug: 'icai-peer-review-checklist',
    title: 'ICAI Peer Review: What Auditors Must Prepare',
    excerpt:
      'A firm-level checklist covering working paper documentation, quality control policies, and partner-level responsibilities for a smooth peer review.',
    date: '2024-09-15',
    category: 'Audit',
    readTime: 8,
    author: 'Kiran K',
    authorRole: 'Statutory Auditor',
  },
];

export const PAGE_SIZE = 6; // articles per "load more" increment
