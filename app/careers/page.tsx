import type { Metadata } from 'next';
import { CareerFormClient } from './CareerFormClient';

export const metadata: Metadata = {
  title: 'Careers | Join Kiran K & Associates',
  description:
    'Join a future-ready Chartered Accountancy firm in Bengaluru. We are hiring for IS Audit, Forensic Accounting, Tax, and Advisory roles.',
  openGraph: {
    title: 'Careers | Kiran K & Associates',
    description: 'Apply to join our team of CA professionals specialising in technology-driven audit and advisory.',
    url: 'https://kka.co.in/careers',
  },
};

const OPENINGS = [
  { role: 'IS / IT Auditor',             exp: '2–5 years',  tags: ['IS Audit', 'CISA', 'Risk'] },
  { role: 'Forensic Accounting Analyst',  exp: '1–3 years',  tags: ['Forensics', 'Excel', 'Investigation'] },
  { role: 'Tax & Compliance Associate',   exp: '0–2 years',  tags: ['GST', 'Income Tax', 'TDS'] },
  { role: 'Virtual CFO Associate',        exp: '3–6 years',  tags: ['MIS', 'FP&A', 'Boards'] },
];

export default function CareersPage() {
  return (
    <div className="bg-neutral-50 min-h-screen pt-24 pb-24">
      {/* Hero band */}
      <div className="bg-primary py-16">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Join Our Team</span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Build the Future of <span className="text-accent">CA Practice</span>
          </h1>
          <p className="mt-5 text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            We are a technology-forward audit and advisory firm. We value intellectual curiosity,
            integrity, and a passion for using technology to solve complex financial problems.
          </p>
        </div>
      </div>

      <div className="site-container mt-16 space-y-16">
        {/* Open positions */}
        <section aria-labelledby="openings-heading">
          <h2 id="openings-heading" className="text-xl font-bold text-primary mb-6">
            Current Openings
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {OPENINGS.map((o) => (
              <div
                key={o.role}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card hover:border-accent/30 transition-colors"
              >
                <h3 className="font-semibold text-primary text-sm">{o.role}</h3>
                <p className="text-xs text-ink-muted mt-0.5">{o.exp} experience</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {o.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application form */}
        <section aria-labelledby="apply-heading">
          <h2 id="apply-heading" className="text-xl font-bold text-primary mb-6">
            Apply Now
          </h2>
          <CareerFormClient />
        </section>
      </div>
    </div>
  );
}
