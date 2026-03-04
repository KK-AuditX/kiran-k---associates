'use client';

/**
 * DPDPA-compliant cookie consent banner.
 * Stores consent in localStorage + a 365-day cookie (for SSR opt-in reading).
 * Shows only on first visit; dismisses permanently on choice.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_KEY = 'kka_cookie_consent';

type ConsentState = 'accepted' | 'rejected' | null;

function setConsentCookie(value: 'accepted' | 'rejected') {
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${maxAge}; SameSite=Strict; Secure`;
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | 'loading'>('loading');

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentState | null;
    setConsent(stored);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setConsentCookie('accepted');
    setConsent('accepted');
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    setConsentCookie('rejected');
    setConsent('rejected');
  };

  // Don't render during SSR or after consent is given
  if (consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
        className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 sm:pb-6"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden">
          {/* Accent top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-accent to-accent-300" aria-hidden="true" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5">
            {/* Icon */}
            <div className="flex-none h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-xl" aria-hidden="true">
              🍪
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary mb-1">
                We value your privacy
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                We use essential cookies to operate this website and analytics cookies to understand usage. 
                In line with the <strong>Digital Personal Data Protection Act, 2023</strong>, we collect minimal 
                data and do not sell your information. See our{' '}
                <Link href="/privacy" className="text-accent hover:underline font-medium">
                  Privacy Policy
                </Link>
                {' '}for details.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-none flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-ink-muted hover:border-neutral-300 hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-center"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-accent px-5 py-2 text-xs font-semibold text-white hover:bg-accent-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
