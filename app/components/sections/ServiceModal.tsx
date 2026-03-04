'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ServiceItem } from '@/app/data/services';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import { ServiceIcon } from '@/app/components/sections/ServicesGrid';

const BACKDROP = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, transition: { duration: 0.18, delay: 0.08 } },
};

const DIALOG = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2, ease: 'easeIn' } },
};

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (service) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [service]);

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            variants={BACKDROP}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[60] bg-primary/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Dialog ───────────────────────────────────────────────────── */}
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            variants={DIALOG}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
              {/* ── Close button ─────────────────────────────────────────── */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-ink-muted transition-colors hover:bg-neutral-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* ── Header band ──────────────────────────────────────────── */}
              <div className="bg-primary px-8 pt-8 pb-6 rounded-t-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <ServiceIcon name={service.icon} dark />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
                      {service.tagline}
                    </p>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      {service.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* ── Body ─────────────────────────────────────────────────── */}
              <div className="px-8 py-7 space-y-6">
                {/* Long description */}
                <p className="text-sm text-ink-muted leading-relaxed">
                  {service.longDescription}
                </p>

                {/* Value bullets */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
                    What you get
                  </h3>
                  <ul className="space-y-2.5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                          <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm text-primary leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industry tags */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
                    Relevant for
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.industries.map((ind) => (
                      <Badge key={ind} label={ind} variant="accent" />
                    ))}
                    {service.tags.map((tag) => (
                      <Badge key={tag} label={tag} variant="neutral" />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 border-t border-neutral-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-accent text-white text-sm font-semibold shadow-accent transition-all hover:bg-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    onClick={onClose}
                  >
                    Schedule a Consultation
                  </Link>
                  <Button variant="ghost" size="md" onClick={onClose}>
                    Back to Services
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
