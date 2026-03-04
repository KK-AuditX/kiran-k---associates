'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NetworkBackground from '@/components/ui/NetworkBackground';
import Button from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '200+', label: 'Clients Served' },
  { value: '100%', label: 'ICAI Compliant' },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background">
      {/* Animated background */}
      <NetworkBackground opacity={0.45} interactive />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[560px] w-[560px] rounded-full bg-teal-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
            Future-Ready{' '}
            <span className="text-teal-500">Financial Intelligence</span>
            <br />
            &amp; Compliance.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          Bridging the gap between traditional Audit and the Digital Age. Specialising in{' '}
          <span className="text-text-primary">Forensic Analytics</span>,{' '}
          <span className="text-text-primary">AI Automation</span>, and{' '}
          <span className="text-text-primary">Information System Security</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" onClick={() => scrollTo('contact')}>
            Reach Out
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo('services')}>
            Explore Services <ArrowRightIcon size={18} />
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-teal-400">{s.value}</p>
              <p className="mt-1 text-sm text-text-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-teal-500/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
