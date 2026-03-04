'use client';

/**
 * PortalTeaser — promotes the secure client dashboard.
 * Architecture: NextAuth credentials (admin) + future client portal.
 * The portal section lives at /admin for internal use; client portal is /portal.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

// ─── Feature cards data ────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Secure Document Sharing',
    description: 'Upload and exchange financial documents inside an encrypted, access-controlled workspace — no email attachments required.',
    badge: 'AES-256 encrypted',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Audit Reports Access',
    description: 'Access finalised audit reports, management letters, and compliance certificates directly from your dashboard — anytime, anywhere.',
    badge: 'Version-controlled',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Direct Audit Communication',
    description: 'Raise queries, submit management responses, and track resolution — all within a structured, audit-trail-aware messaging system.',
    badge: 'Full audit trail',
  },
];

const SECURITY_BADGES = [
  { label: 'NextAuth v4', detail: 'JWT sessions, 8-hour expiry' },
  { label: 'HTTPS + HSTS', detail: 'Strict transport security' },
  { label: 'RBAC', detail: 'Role-based access control' },
  { label: 'DPDPA Ready', detail: 'Minimal data retention' },
];

// ─── Mock document preview ────────────────────────────────────────────────

function DocumentPreview() {
  const docs = [
    { name: 'IS Audit Report — FY 2024-25', date: '28 Feb 2025', type: 'PDF', status: 'Final',   colour: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { name: 'Internal Audit — Q3 2024',     date: '15 Jan 2025', type: 'PDF', status: 'Review',  colour: 'text-amber-600  bg-amber-50  border-amber-200' },
    { name: 'DPDPA Compliance Checklist',   date: '10 Dec 2024', type: 'XLSX', status: 'Final',  colour: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">Recent Documents</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] text-white/40">Secure</span>
        </div>
      </div>
      <ul className="space-y-2.5">
        {docs.map((doc) => (
          <li key={doc.name} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5 border border-white/5">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/10 text-[10px] font-bold text-white/60">
              {doc.type}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white/80 truncate">{doc.name}</p>
              <p className="text-[10px] text-white/40">{doc.date}</p>
            </div>
            <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase ${doc.colour}`}>
              {doc.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── PortalTeaser ───────────────────────────────────────────────────────────

export function PortalTeaser() {
  return (
    <Section variant="dark" id="portal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — copy */}
        <div>
          <SectionHeader
            eyebrow="Client Portal"
            title="Your Secure Audit Workspace"
            subtitle="A private dashboard where our clients access reports, share documents, and communicate directly with the audit team — with full data sovereignty and traceability."
            dark
          />

          {/* Feature list */}
          <ul className="space-y-5 mb-10">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-accent">
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{f.title}</h4>
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {f.badge}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Security badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SECURITY_BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                title={b.detail}
              >
                <svg className="h-3 w-3 text-accent flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                <span className="text-[11px] font-medium text-white/70">{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-accent hover:bg-accent-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login to Portal
            </Link>
            <Link
              href="#contact"
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1"
            >
              Request portal access
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right — mock portal UI */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Portal chrome */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Browser-like top bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-3 py-1">
                <svg className="h-3 w-3 text-accent flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] text-white/40 font-mono">portal.kka.co.in</span>
              </div>
            </div>

            <div className="grid grid-cols-5 min-h-[360px]">
              {/* Sidebar */}
              <nav className="col-span-1 border-r border-white/10 bg-white/3 p-3 space-y-1" aria-label="Portal navigation">
                {[
                  { icon: '🏠', label: 'Dashboard' },
                  { icon: '📁', label: 'Documents', active: true },
                  { icon: '📊', label: 'Reports' },
                  { icon: '💬', label: 'Messages' },
                  { icon: '⚙️', label: 'Settings' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-2 py-2 cursor-default',
                      item.active ? 'bg-accent/20 text-accent' : 'text-white/40 hover:text-white/60',
                    )}
                    aria-hidden="true"
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-[11px] font-medium hidden sm:block">{item.label}</span>
                  </div>
                ))}
              </nav>

              {/* Main content */}
              <div className="col-span-4 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[11px] text-white/40">Welcome back,</p>
                    <p className="text-sm font-semibold text-white">Client Dashboard</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] font-semibold text-accent">Verified</span>
                  </div>
                </div>
                <DocumentPreview />
              </div>
            </div>
          </div>

          {/* Glow decoration */}
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
        </motion.div>

      </div>
    </Section>
  );
}

// Helper (cn) — re-export to avoid import issue in this file
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
