import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ServicesGrid } from '@/app/components/sections/ServicesGrid';

// ExpertiseTimeline is heavy (Recharts) — keep it lazy
const ExpertiseTimeline = dynamic(
  () =>
    import('@/app/components/sections/ExpertiseTimeline').then((m) => m.ExpertiseTimeline),
  {
    loading: () => (
      <div className="h-64 animate-pulse rounded-xl bg-neutral-100" aria-label="Loading chart" />
    ),
  },
);

export const metadata: Metadata = {
  title: 'Our Services | Kiran K & Associates – Chartered Accountants',
  description:
    'Comprehensive CA services covering IS audit, forensic accounting, risk advisory, GST compliance, virtual CFO, and cybersecurity — powered by AI and technology.',
  openGraph: {
    title: 'Our Services | Kiran K & Associates',
    description:
      'Explore the full spectrum of audit, risk, forensic and compliance engagements offered by Kiran K & Associates.',
    url: 'https://kka.co.in/services',
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-50 pt-16">
      {/* Hero band */}
      <div className="bg-primary py-16">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              What We Do
            </span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Comprehensive <span className="text-accent">CA Services</span>
          </h1>
          <p className="mt-5 text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Covering the full spectrum of audit, risk, forensic and compliance engagements —
            powered by technology and deep domain expertise.
          </p>
        </div>
      </div>

      {/* Services grid with filter tabs (reuses homepage component) */}
      <ServicesGrid />

      {/* Expertise / capability timeline */}
      <ExpertiseTimeline />
    </main>
  );
}
