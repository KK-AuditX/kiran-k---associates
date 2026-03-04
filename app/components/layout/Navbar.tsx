'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useScrolled } from '@/app/hooks/useScrolled';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Insights', href: '#insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="site-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Kiran K & Associates">
          <span className="text-xl font-bold text-primary tracking-tight">
            KK<span className="text-accent">&</span>A
          </span>
          <span
            className={cn(
              'hidden sm:block text-sm font-medium transition-colors',
              scrolled ? 'text-ink-muted' : 'text-white/70',
            )}
          >
            Kiran K & Associates
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                scrolled
                  ? 'text-ink-muted hover:text-primary hover:bg-neutral-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book a Consultation
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors',
            scrolled ? 'text-primary hover:bg-neutral-100' : 'text-white hover:bg-white/10',
          )}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg">
          <nav className="site-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 text-sm font-medium text-ink-muted hover:text-primary hover:bg-neutral-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-100 mt-2">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a Consultation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
