'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: 100,
    suffix: '+',
    label: 'Audits Completed',
    detail: 'Statutory, internal, and IS audits across multiple sectors',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: 12,
    suffix: '+',
    label: 'Industries Served',
    detail: 'Banking, SaaS, manufacturing, healthcare, NBFCs, and more',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: 8,
    suffix: '+',
    label: 'Technology Stacks',
    detail: 'AI/ML, SIEM, GRC platforms, ERP audit tools, and local LLMs',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: 5,
    suffix: '',
    label: 'ICAI Certifications',
    detail: 'ISA, FAFD, AICA Level 2, DISA, and CS credentials held',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Kiran's team brought a level of rigour to our IS audit that we had never seen before. They identified three critical control gaps within the first week — gaps that prior auditors had missed entirely.",
    name: 'Head of Technology Risk',
    company: 'Mid-sized Private Bank',
    initials: 'TR',
  },
  {
    quote:
      "Their DPDPA compliance roadmap was practical, actionable, and tailored to our size. Most consultants give you a framework document — Kiran's team gave us a genuine implementation plan with timelines.",
    name: 'Chief Compliance Officer',
    company: 'SaaS Startup, Bengaluru',
    initials: 'CC',
  },
  {
    quote:
      "The forensic investigation was handled with remarkable discretion and technical depth. Their AI-assisted data analysis surfaced patterns that would have taken months to find manually.",
    name: 'Managing Director',
    company: 'Family Office & NBFC',
    initials: 'MD',
  },
  {
    quote:
      "Risk-based internal audit transformed how our board views the audit committee's work. The maturity benchmarking report they produced was immediately presented to our external auditors and accepted without query.",
    name: 'CEO',
    company: 'Listed Manufacturing Firm',
    initials: 'CE',
  },
];

const PARTNER_PLACEHOLDERS = [
  'ICAI',
  'ISACA',
  'IIA',
  'NASSCOM',
  'DPIIT',
  'MCA',
];

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix: sfx = '',
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const raw = useMotionValue(0);
  const rounded = useTransform(raw, Math.round);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(raw, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, raw, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {sfx}
    </span>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 border border-neutral-200 shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        {stat.icon}
      </div>
      <div className="text-4xl font-bold text-primary tracking-tight mb-1">
        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      </div>
      <div className="text-sm font-semibold text-primary mb-1">{stat.label}</div>
      <p className="text-xs text-ink-muted leading-relaxed max-w-[180px]">{stat.detail}</p>
    </motion.div>
  );
}

// ─── Testimonials carousel ────────────────────────────────────────────────────

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  const advance = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  };

  // Autoplay
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(advance, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  const t = TESTIMONIALS[index];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      {/* Quote mark decoration */}
      <div className="absolute -top-2 left-6 text-7xl font-serif text-accent/10 leading-none select-none pointer-events-none" aria-hidden="true">
        &ldquo;
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center px-6 sm:px-12 py-8"
        >
          <p className="text-base sm:text-lg text-ink leading-relaxed max-w-2xl mx-auto mb-8 italic">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
              <span className="text-sm font-bold text-accent">{t.initials}</span>
            </div>
            <span className="text-sm font-semibold text-primary">{t.name}</span>
            <span className="text-xs text-ink-muted">{t.company}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 pb-2" role="tablist" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => go(i)}
            className={[
              'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              i === index
                ? 'bg-accent h-2 w-6'
                : 'bg-neutral-200 h-2 w-2 hover:bg-accent/40',
            ].join(' ')}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          onClick={() => go((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="rounded-full bg-white border border-neutral-200 p-1.5 shadow-sm text-ink-muted hover:text-accent hover:border-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Previous testimonial"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          onClick={() => go((index + 1) % TESTIMONIALS.length)}
          className="rounded-full bg-white border border-neutral-200 p-1.5 shadow-sm text-ink-muted hover:text-accent hover:border-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Next testimonial"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Partner logos strip ──────────────────────────────────────────────────────

function PartnerLogos() {
  return (
    <div className="mt-14">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-subtle mb-6">
        Professional Affiliations &amp; Standards Bodies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        {PARTNER_PLACEHOLDERS.map((name) => (
          <div
            key={name}
            className="flex h-12 min-w-[80px] items-center justify-center rounded-lg border border-neutral-200 bg-white px-5 shadow-sm text-sm font-bold text-ink-muted tracking-wide hover:border-accent hover:text-accent transition-colors duration-200"
            title={name}
            aria-label={name}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ICAI disclaimer ─────────────────────────────────────────────────────────

function ICAIDisclaimer() {
  return (
    <div className="mt-14 border-t border-neutral-200 pt-6">
      <div className="flex items-start gap-3 max-w-3xl mx-auto text-center">
        <svg
          className="mt-0.5 h-4 w-4 flex-none text-ink-subtle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
        <p className="text-xs text-ink-subtle leading-relaxed">
          <strong className="font-semibold text-ink-muted">ICAI Compliance Notice: </strong>
          Information provided on this website is for general guidance only and does not constitute
          solicitation or professional advice. Engagement of professional services is subject to
          applicable ICAI regulations and a formal engagement letter. Past results do not guarantee
          future outcomes.
        </p>
      </div>
    </div>
  );
}

// ─── TrustSection ─────────────────────────────────────────────────────────────

export function TrustSection() {
  return (
    <Section variant="muted" id="trust">
      {/* Section header */}
      <div className="mb-14">
        <SectionHeader
          eyebrow="Why Us"
          title="Built on Trust, Driven by Technology"
          subtitle="A track record of rigorous audit work, advisory depth, and technology-led insights that clients across India rely on."
          align="center"
        />
      </div>

      {/* Stats counters grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl bg-white border border-neutral-200 shadow-card overflow-hidden"
      >
        {/* Testimonials header band */}
        <div className="border-b border-neutral-100 px-6 py-4 flex items-center gap-2">
          <div className="flex gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-ink-muted">Client Testimonials</span>
        </div>
        <TestimonialsCarousel />
      </motion.div>

      {/* Partner logos */}
      <PartnerLogos />

      {/* ICAI disclaimer */}
      <ICAIDisclaimer />
    </Section>
  );
}
