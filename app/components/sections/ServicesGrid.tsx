'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ServiceItem, type Industry, ALL_INDUSTRIES, services } from '@/app/data/services';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { Badge } from '@/app/components/ui/Badge';
import { ServiceModal } from './ServiceModal';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_PATHS: Record<string, string[]> = {
  cpu: [
    'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  ],
  shield: [
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'M9 12l2 2 4-4',
  ],
  search: [
    'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    'M8 11h6M11 8v6',
  ],
  clipboard: [
    'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'M9 12h6M9 16h4',
  ],
  building: [
    'M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3',
  ],
  lock: [
    'M5 11V7a7 7 0 0114 0v4',
    'M3 11h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V11z',
    'M12 15v3',
  ],
  trending: [
    'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  ],
  coins: [
    'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  ],
};

// Exported so ServiceModal can reuse it
export function ServiceIcon({
  name,
  dark = false,
}: {
  name: string;
  dark?: boolean;
}) {
  const paths = ICON_PATHS[name] ?? ICON_PATHS.shield;
  const bg  = dark ? 'bg-accent/15'     : 'bg-accent/10';
  const col = dark ? 'text-accent'       : 'text-accent';
  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${col}`}>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        {paths.map((d, i) => (
          <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
        ))}
      </svg>
    </div>
  );
}

// ─── Filter tab ───────────────────────────────────────────────────────────────
function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        active
          ? 'bg-primary text-white'
          : 'bg-white text-ink-muted border border-neutral-200 hover:border-accent hover:text-accent',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

// ─── Card animation ───────────────────────────────────────────────────────────
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  onLearnMore,
}: {
  service: ServiceItem;
  onLearnMore: (s: ServiceItem) => void;
}) {
  return (
    <motion.article
      layout
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200 shadow-card hover:shadow-card-hover hover:border-accent/30 transition-[border-color,box-shadow] duration-300 overflow-hidden"
    >
      {/* Top accent bar — slides in on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon */}
        <ServiceIcon name={service.icon} />

        {/* Title & tagline */}
        <h3 className="mt-4 text-base font-bold text-primary leading-snug">
          {service.title}
        </h3>
        <p className="mt-0.5 text-xs text-accent font-medium">{service.tagline}</p>

        {/* Description */}
        <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">
          {service.description}
        </p>

        {/* Value bullets */}
        <ul className="mt-4 space-y-1.5">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-ink-muted">
              <svg className="mt-0.5 flex-shrink-0 h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        {/* Industry tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.industries.map((ind) => (
            <Badge key={ind} label={ind} variant="neutral" />
          ))}
        </div>

        {/* Learn More */}
        <button
          onClick={() => onLearnMore(service)}
          className="mt-5 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-700 transition-colors focus-visible:outline-none focus-visible:underline"
          aria-label={`Learn more about ${service.title}`}
        >
          Learn More
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.article>
  );
}

// ─── Main grid ────────────────────────────────────────────────────────────────
export function ServicesGrid() {
  const [activeIndustry, setActiveIndustry] = useState<Industry | 'All'>('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filtered = useMemo(
    () =>
      activeIndustry === 'All'
        ? services
        : services.filter((s) => s.industries.includes(activeIndustry as Industry)),
    [activeIndustry],
  );

  return (
    <>
      <Section variant="light" id="services">
        <SectionHeader
          eyebrow="Our Services"
          title="Comprehensive CA Services"
          subtitle="Covering the full spectrum of audit, risk, forensic and compliance engagements — powered by technology."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by industry">
          <FilterTab
            label="All Services"
            active={activeIndustry === 'All'}
            onClick={() => setActiveIndustry('All')}
          />
          {ALL_INDUSTRIES.map((ind) => (
            <FilterTab
              key={ind}
              label={ind}
              active={activeIndustry === ind}
              onClick={() => setActiveIndustry(ind)}
            />
          ))}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={setSelectedService}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Count note */}
        <p className="mt-6 text-xs text-ink-muted text-right">
          Showing {filtered.length} of {services.length} services
          {activeIndustry !== 'All' && ` relevant to ${activeIndustry}`}
        </p>
      </Section>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
