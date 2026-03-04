import type { Metadata } from 'next';
import { Trust } from '@/app/components/sections/Trust';
import { TrustSection } from '@/app/components/sections/TrustSection';

export const metadata: Metadata = {
  title: 'About Us | Kiran K & Associates – Chartered Accountants',
  description:
    'Learn about Kiran K & Associates — a technology-forward CA firm in Bengaluru specialising in IS audit, forensic accounting, risk advisory and AI-driven compliance.',
  openGraph: {
    title: 'About Us | Kiran K & Associates',
    description:
      'Meet the team and learn about our credentials, track record, and the values that drive our CA practice.',
    url: 'https://kka.co.in/about',
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-50 pt-16">
      {/* Hero band */}
      <div className="bg-primary py-16">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Who We Are
            </span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Built on Trust, <span className="text-accent">Driven by Technology</span>
          </h1>
          <p className="mt-5 text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Kiran K &amp; Associates is a Bengaluru-based Chartered Accountancy firm at the
            intersection of finance, technology, and governance. We combine deep CA expertise
            with cutting-edge tools — from AI-assisted forensics to GRC platforms — to deliver
            audit and advisory work that is rigorous, practical, and future-ready.
          </p>
        </div>
      </div>

      {/* Credentials strip */}
      <Trust />

      {/* Stats, testimonials, partners, disclaimer */}
      <TrustSection />
    </main>
  );
}
