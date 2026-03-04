'use client';

/**
 * Multi-step contact form — 4 steps:
 *   1) Select Service  2) Industry Type  3) Message Details  4) Contact Info
 *
 * Stack: React Hook Form + Zod + reCAPTCHA v3 + Framer Motion
 * Extras: Optional Calendly embed, WhatsApp CTA, DPDPA consent checkbox
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';

// ─── reCAPTCHA global type ─────────────────────────────────────────────────

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

// ─── Full Zod schema ──────────────────────────────────────────────────────

const formSchema = z.object({
  service:          z.string().min(1, 'Please select a service'),
  industry:         z.string().min(1, 'Please select your industry'),
  subject:          z.string().min(5, 'Minimum 5 characters').max(120),
  message:          z.string().min(20, 'Minimum 20 characters').max(2000),
  urgency:          z.enum(['normal', 'high', 'asap']),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  name:             z.string().min(2, 'Name is required').max(80),
  email:            z.string().email('Enter a valid email'),
  phone:            z.string().max(20).optional().or(z.literal('')),
  company:          z.string().max(80).optional().or(z.literal('')),
  consent:          z.boolean().refine((v) => v === true, 'You must accept the privacy policy'),
  recaptchaToken:   z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Fields validated per step
const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
  1: ['service'],
  2: ['industry'],
  3: ['subject', 'message', 'urgency', 'preferredContact'],
  4: ['name', 'email', 'phone', 'company', 'consent'],
};

// ─── Static data ───────────────────────────────────────────────────────────

const SERVICES = [
  { id: 'is-audit',       label: 'IS / Tech Audit',       icon: '🖥️', desc: 'Information system & cybersecurity audits' },
  { id: 'forensic',       label: 'Forensic Accounting',   icon: '🔍', desc: 'Fraud investigation & forensic review' },
  { id: 'internal-audit', label: 'Internal Audit',         icon: '📋', desc: 'Risk-based internal audit framework' },
  { id: 'compliance',     label: 'Compliance Advisory',   icon: '⚖️', desc: 'DPDPA, ISO 27001, regulatory' },
  { id: 'risk',           label: 'Risk Management',       icon: '🛡️', desc: 'Enterprise risk assessment' },
  { id: 'virtual-cfo',    label: 'Virtual CFO',           icon: '📊', desc: 'Strategic finance & board reporting' },
  { id: 'taxation',       label: 'Taxation & GST',        icon: '🧾', desc: 'Direct and indirect tax advisory' },
  { id: 'cyber-risk',     label: 'Cyber Risk',            icon: '🔒', desc: 'Cyber security risk assessment' },
];

const INDUSTRIES = [
  { id: 'banking',        label: 'Banking & Finance',     icon: '🏦' },
  { id: 'saas',           label: 'SaaS / Tech',           icon: '💻' },
  { id: 'msme',           label: 'MSME',                  icon: '🏪' },
  { id: 'manufacturing',  label: 'Manufacturing',         icon: '🏭' },
  { id: 'healthcare',     label: 'Healthcare',            icon: '🏥' },
  { id: 'nbfc',           label: 'NBFC',                  icon: '📈' },
  { id: 'startup',        label: 'Startup',               icon: '🚀' },
  { id: 'other',          label: 'Other',                 icon: '🔹' },
];

const URGENCY_OPTIONS = [
  { id: 'normal', label: 'Standard',      desc: 'No immediate deadline' },
  { id: 'high',   label: 'Urgent',        desc: 'Within the next 2 weeks' },
  { id: 'asap',   label: 'Critical',      desc: 'Immediate action needed' },
] as const;

const CONTACT_PREFS = [
  { id: 'email',     label: 'Email',     icon: '✉️' },
  { id: 'phone',     label: 'Phone',     icon: '📞' },
  { id: 'whatsapp',  label: 'WhatsApp',  icon: '💬' },
] as const;

const STEP_LABELS = ['Service', 'Industry', 'Details', 'Contact'];
const TOTAL_STEPS = 4;

// ─── Framer Motion variants ───────────────────────────────────────────────

const slideVariants = {
  enter: (d: number) => ({ x: d * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d * -56, opacity: 0 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="Form progress" className="mb-8">
      <ol className="flex items-center justify-between relative">
        {/* connector line */}
        <div className="absolute top-4 left-0 right-0 h-px bg-neutral-200 -z-10" aria-hidden="true">
          <motion.div
            className="h-full bg-accent origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (current - 1) / (TOTAL_STEPS - 1) }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {STEP_LABELS.map((label, i) => {
          const num = i + 1;
          const done = num < current;
          const active = num === current;
          return (
            <li key={label} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
                  done   && 'bg-accent border-accent text-white',
                  active && 'bg-white border-accent text-accent shadow-accent',
                  !done && !active && 'bg-white border-neutral-200 text-ink-subtle',
                )}
                aria-current={active ? 'step' : undefined}
              >
                {done ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span className={cn('text-[11px] font-medium hidden sm:block', active ? 'text-accent' : 'text-ink-subtle')}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
      <svg className="h-3.5 w-3.5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm0 6a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}

const inputCls = 'block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200';
const labelCls = 'block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5';

// ─── WhatsApp floating button ─────────────────────────────────────────────

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210';
  const msg = encodeURIComponent('Hello, I would like to enquire about your CA services.');
  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── ContactForm ──────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [step, setStep]           = useState(1);
  const [direction, setDirection] = useState(1);
  const [status, setStatus]       = useState<Status>('idle');
  const [errorMsg, setErrorMsg]   = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [isValidating, setIsValidating] = useState(false); // prevents double-advance on rapid clicks

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: '', industry: '', subject: '', message: '',
      urgency: 'normal', preferredContact: 'email',
      name: '', email: '', phone: '', company: '',
      consent: false, recaptchaToken: '',
    },
    mode: 'onTouched',
  });

  const { register, watch, setValue, trigger, handleSubmit, formState: { errors } } = form;

  const watchedService  = watch('service');
  const watchedIndustry = watch('industry');
  const watchedUrgency  = watch('urgency');
  const watchedContact  = watch('preferredContact');

  // Load reCAPTCHA script when user reaches step 4
  useEffect(() => {
    if (step !== 4) return;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || document.getElementById('recaptcha-script')) return;
    const script = document.createElement('script');
    script.id  = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, [step]);

  const goNext = async () => {
    if (isValidating) return; // prevent double-advance on rapid clicks
    setIsValidating(true);
    const fields = STEP_FIELDS[step];
    const valid  = await trigger(fields);
    if (valid) {
      setDirection(1);
      setStep((s) => s + 1);
    }
    setIsValidating(false);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const getRecaptchaToken = async (): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) return '';
    return new Promise((resolve) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(siteKey, { action: 'contact' });
          resolve(token);
        } catch {
          resolve('');
        }
      });
    });
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(body.error ?? 'Request failed');
      }
      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  // ─── Success state ─────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <section className="bg-neutral-50 py-20 sm:py-28" id="contact">
        <div className="site-container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-accent/20 bg-white p-10 text-center shadow-card"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">Message Received</h3>
            <p className="text-sm text-ink-muted max-w-sm mx-auto mb-8">
              Thank you. We will respond within 24 business hours. For urgent matters, reach us directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {calendlyUrl && (
                <Button variant="primary" size="md" onClick={() => setShowCalendly(!showCalendly)}>
                  {showCalendly ? 'Hide Calendar' : 'Book a Call'}
                </Button>
              )}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Calendly embed */}
            <AnimatePresence>
              {showCalendly && calendlyUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 650 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden rounded-xl border border-neutral-200"
                >
                  <iframe
                    src={`${calendlyUrl}?hide_gdpr_banner=1&background_color=ffffff&text_color=0F172A&primary_color=00A676`}
                    width="100%"
                    height="650"
                    frameBorder="0"
                    title="Book a consultation"
                    allow="payment"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── Form ───────────────────────────────────────────────────────────────

  return (
    <Section variant="light" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

        {/* Left — info panel */}
        <div className="lg:col-span-2">
          <SectionHeader
            eyebrow="Contact"
            title="Let's Start a Conversation"
            subtitle={`We'll guide you through a quick intake — it takes about 2 minutes and helps us prepare for your specific situation.`}
          />

          <dl className="space-y-5 text-sm mb-8">
            {[
              { dt: 'Email',
                dd: <a href="mailto:kiran@kirankassociates.com" className="text-accent hover:text-accent-700 font-medium">kiran@kirankassociates.com</a> },
              { dt: 'Hours',
                dd: <span className="text-ink-muted">Mon – Sat · 9 AM – 6 PM IST</span> },
              { dt: 'Response',
                dd: <span className="text-ink-muted">Within 24 business hours</span> },
            ].map(({ dt, dd }) => (
              <div key={dt}>
                <dt className="text-xs font-semibold uppercase tracking-widest text-ink-subtle mb-0.5">{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>

          {/* WhatsApp inline CTA */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-5 py-3 text-sm font-semibold text-[#075E54] hover:bg-[#25D366]/10 transition-colors duration-200"
          >
            <svg className="h-5 w-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Prefer WhatsApp? Chat instantly
          </a>
        </div>

        {/* Right — multi-step form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 sm:p-9 shadow-card">
            <StepIndicator current={step} />

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="overflow-hidden" style={{ minHeight: 320 }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >

                    {/* ── Step 1: Service ──────────────────────────────── */}
                    {step === 1 && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-1">Which service are you looking for?</h3>
                        <p className="text-sm text-ink-muted mb-5">Select the area that best fits your needs.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {SERVICES.map((svc) => (
                            <button
                              key={svc.id}
                              type="button"
                              onClick={() => setValue('service', svc.id, { shouldValidate: true })}
                              className={cn(
                                'flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                watchedService === svc.id
                                  ? 'border-accent bg-accent/5 shadow-accent'
                                  : 'border-neutral-100 hover:border-accent/40',
                              )}
                              aria-pressed={watchedService === svc.id}
                            >
                              <span className="text-2xl" aria-hidden="true">{svc.icon}</span>
                              <span className={cn('text-xs font-semibold leading-tight', watchedService === svc.id ? 'text-accent' : 'text-primary')}>
                                {svc.label}
                              </span>
                            </button>
                          ))}
                        </div>
                        <FieldError message={errors.service?.message} />
                      </div>
                    )}

                    {/* ── Step 2: Industry ─────────────────────────────── */}
                    {step === 2 && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-1">What is your industry?</h3>
                        <p className="text-sm text-ink-muted mb-5">This helps us tailor our approach to your regulatory context.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {INDUSTRIES.map((ind) => (
                            <button
                              key={ind.id}
                              type="button"
                              onClick={() => setValue('industry', ind.id, { shouldValidate: true })}
                              className={cn(
                                'flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                watchedIndustry === ind.id
                                  ? 'border-accent bg-accent/5 shadow-accent'
                                  : 'border-neutral-100 hover:border-accent/40',
                              )}
                              aria-pressed={watchedIndustry === ind.id}
                            >
                              <span className="text-2xl" aria-hidden="true">{ind.icon}</span>
                              <span className={cn('text-xs font-semibold leading-tight', watchedIndustry === ind.id ? 'text-accent' : 'text-primary')}>
                                {ind.label}
                              </span>
                            </button>
                          ))}
                        </div>
                        <FieldError message={errors.industry?.message} />
                      </div>
                    )}

                    {/* ── Step 3: Message details ───────────────────────── */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">Tell us about your needs</h3>
                          <p className="text-sm text-ink-muted">The more context you share, the better prepared we will be.</p>
                        </div>

                        {/* Subject */}
                        <div>
                          <label htmlFor="subject" className={labelCls}>Subject *</label>
                          <input
                            id="subject"
                            {...register('subject')}
                            placeholder="e.g. IS audit for our core banking system"
                            className={cn(inputCls, errors.subject && 'border-rose-400 focus:border-rose-400 focus:ring-rose-200')}
                          />
                          <FieldError message={errors.subject?.message} />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className={labelCls}>Message *</label>
                          <textarea
                            id="message"
                            {...register('message')}
                            rows={4}
                            placeholder="Describe your situation, timeline, and any specific concerns…"
                            className={cn(inputCls, 'resize-none', errors.message && 'border-rose-400 focus:border-rose-400 focus:ring-rose-200')}
                          />
                          <div className="flex justify-between items-center mt-1">
                            <FieldError message={errors.message?.message} />
                            <span className="text-[11px] text-ink-subtle ml-auto">
                              {watch('message')?.length ?? 0} / 2000
                            </span>
                          </div>
                        </div>

                        {/* Urgency */}
                        <div>
                          <fieldset>
                            <legend className={labelCls}>Urgency *</legend>
                            <div className="grid grid-cols-3 gap-2">
                              {URGENCY_OPTIONS.map((opt) => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setValue('urgency', opt.id, { shouldValidate: true })}
                                  className={cn(
                                    'flex flex-col rounded-xl border-2 p-3 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                    watchedUrgency === opt.id
                                      ? 'border-accent bg-accent/5'
                                      : 'border-neutral-100 hover:border-accent/40',
                                  )}
                                  aria-pressed={watchedUrgency === opt.id}
                                >
                                  <span className={cn('text-xs font-semibold mb-0.5', watchedUrgency === opt.id ? 'text-accent' : 'text-primary')}>
                                    {opt.label}
                                  </span>
                                  <span className="text-[11px] text-ink-subtle leading-tight">{opt.desc}</span>
                                </button>
                              ))}
                            </div>
                          </fieldset>
                        </div>

                        {/* Preferred contact method */}
                        <div>
                          <fieldset>
                            <legend className={labelCls}>Preferred Contact Method</legend>
                            <div className="flex gap-2">
                              {CONTACT_PREFS.map((opt) => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setValue('preferredContact', opt.id, { shouldValidate: true })}
                                  className={cn(
                                    'flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                    watchedContact === opt.id
                                      ? 'border-accent bg-accent/5 text-accent'
                                      : 'border-neutral-100 text-ink-muted hover:border-accent/40',
                                  )}
                                  aria-pressed={watchedContact === opt.id}
                                >
                                  <span aria-hidden="true">{opt.icon}</span> {opt.label}
                                </button>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    )}

                    {/* ── Step 4: Contact info ──────────────────────────── */}
                    {step === 4 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">Your contact details</h3>
                          <p className="text-sm text-ink-muted">Minimal data collected — only what we need to reply.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div>
                            <label htmlFor="name" className={labelCls}>Full Name *</label>
                            <input id="name" {...register('name')} placeholder="Your name"
                              className={cn(inputCls, errors.name && 'border-rose-400')} />
                            <FieldError message={errors.name?.message} />
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="email" className={labelCls}>Email *</label>
                            <input id="email" type="email" {...register('email')} placeholder="you@company.com"
                              className={cn(inputCls, errors.email && 'border-rose-400')} />
                            <FieldError message={errors.email?.message} />
                          </div>

                          {/* Phone */}
                          <div>
                            <label htmlFor="phone" className={labelCls}>Phone <span className="font-normal normal-case text-ink-subtle">(optional)</span></label>
                            <input id="phone" type="tel" {...register('phone')} placeholder="+91 98765 43210"
                              className={inputCls} />
                          </div>

                          {/* Company */}
                          <div>
                            <label htmlFor="company" className={labelCls}>Organisation <span className="font-normal normal-case text-ink-subtle">(optional)</span></label>
                            <input id="company" {...register('company')} placeholder="Company or firm name"
                              className={inputCls} />
                          </div>
                        </div>

                        {/* Consent checkbox */}
                        <div className={cn('flex items-start gap-3 rounded-lg border p-3', errors.consent ? 'border-rose-300 bg-rose-50' : 'border-neutral-100 bg-neutral-50')}>
                          <input
                            id="consent"
                            type="checkbox"
                            {...register('consent')}
                            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"
                          />
                          <label htmlFor="consent" className="text-xs text-ink-muted leading-relaxed">
                            I consent to Kiran K & Associates processing my personal data to respond to this enquiry,
                            in accordance with the{' '}
                            <Link href="/privacy" className="text-accent hover:underline" target="_blank">
                              Privacy Policy
                            </Link>{' '}
                            and the provisions of the DPDPA, 2023.
                          </label>
                        </div>
                        <FieldError message={errors.consent?.message} />

                        {/* Error banner */}
                        {status === 'error' && (
                          <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {errorMsg}
                          </div>
                        )}

                        {/* reCAPTCHA notice */}
                        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                          <p className="text-[10px] text-ink-subtle leading-relaxed">
                            This form is protected by reCAPTCHA v3.{' '}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:underline">Privacy</a>{' '}
                            &amp;{' '}
                            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:underline">Terms</a>.
                          </p>
                        )}
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
                <div>
                  {step > 1 && (
                    <Button type="button" variant="ghost" size="md" onClick={goBack}>
                      ← Back
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-subtle">Step {step} of {TOTAL_STEPS}</span>
                  {step < TOTAL_STEPS ? (
                    <Button type="button" variant="primary" size="md" onClick={goNext}>
                      Continue →
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      loading={status === 'loading'}
                    >
                      Send Enquiry
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
