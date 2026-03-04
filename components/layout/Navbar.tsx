'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/8 bg-background/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image src="/download.png" alt="KKA Logo" fill className="object-contain" priority />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-text-primary group-hover:text-teal-400 transition-colors">
                Kiran K <span className="text-teal-500">&amp; Associates</span>
              </p>
              <p className="text-[10px] uppercase tracking-widest text-text-muted">
                Chartered Accountants
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="primary"
              size="sm"
              className="ml-3"
              onClick={() => router.push('/contact')}
            >
              Contact Us
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-secondary md:hidden hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background pt-16"
          >
            <nav className="flex flex-col gap-2 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-xl py-4 text-lg font-semibold text-text-primary border-b border-white/5 hover:text-teal-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    router.push('/contact');
                  }}
                >
                  Contact Us
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
