'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroParticles } from './HeroParticles';
import { HeroOrbit }    from './HeroOrbit';

// ─── Animation variants ───────────────────────────────────────────────────────

const STAGGER_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
};

// ─── Stats strip data ─────────────────────────────────────────────────────────
const STATS = [
  { value: '10+',  label: 'Years in Practice' },
  { value: '200+', label: 'Clients Served' },
  { value: 'ICAI', label: 'Registered Firm' },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Parallax: track scroll within the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%',   '-18%']); // particles
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%',   '-10%']); // copy
  const orbitY   = useTransform(scrollYProgress, [0, 1], ['0%',   '-6%']);  // orbit (slowest)
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);         // fade out on scroll

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative bg-primary overflow-hidden min-h-screen flex items-center"
      aria-label="Hero"
    >
      {/* ── Background layers ─────────────────────────────────────────────── */}

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Particles — parallax layer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ y: bgY, opacity }}
      >
        <HeroParticles />
      </motion.div>

      {/* Top-right accent glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,166,118,0.13) 0%, transparent 65%)' }}
      />
      {/* Bottom-left secondary glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-20 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,166,118,0.06) 0%, transparent 70%)' }}
      />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="site-container relative z-10 py-28 sm:py-32 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: Copy ─────────────────────────────────────────────────── */}
          <motion.div
            style={{ y: textY }}
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow badge */}
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 mb-7">
              <span className="h-px w-8 bg-accent flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Chartered Accountants · ISA · FAFD · AICA L2
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={FADE_UP}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white leading-[1.07] tracking-tight"
            >
              Tech-Forward Audit{' '}
              <span className="text-accent">&amp;</span> Risk
              <br />
              Management for the
              <br />
              <span className="text-accent">Digital Era</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={FADE_UP}
              className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-[480px]"
            >
              Advanced audit, forensic accounting and risk solutions powered by
              technology — built for modern enterprises navigating a complex regulatory landscape.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={FADE_UP} className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-accent text-white text-sm font-semibold shadow-accent transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Schedule Audit Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg border-2 border-white/25 text-white text-sm font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={FADE_IN}
              className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap gap-8 items-center"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Orbit visualization ─────────────────────────────────── */}
          <motion.div
            style={{ y: orbitY, opacity }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="scale-[0.72] sm:scale-[0.85] lg:scale-100 origin-center">
              <HeroOrbit />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/30 font-medium">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], transformOrigin: 'top' }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Bottom fade to next section ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0F172A)' }}
      />
    </section>
  );
}
