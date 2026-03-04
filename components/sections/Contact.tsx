'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import NetworkBackground from '@/components/ui/NetworkBackground';
import { CheckCircleIcon } from '@/components/ui/Icons';
import { ContactFormValues } from '@/types';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+]?[0-9\s\-]{10,15}$/, 'Please enter a valid phone number (10–15 digits)'),
  query: z.string().min(10, 'Please describe your query in at least 10 characters'),
});

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to send');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#060d1a] py-28">
      <NetworkBackground opacity={0.25} interactive={false} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Get In Touch"
            title="Reach Out"
            description="Questions about our services? Ready to transform your financial operations? We'd love to hear from you."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto max-w-2xl">
          <Card glow className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
                    <CheckCircleIcon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Message Sent!</h3>
                    <p className="mt-2 text-text-secondary">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => { setStatus('idle'); reset(); }}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {status === 'error' && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                      ⚠️ {errorMsg || 'Something went wrong. Please try again.'}
                    </div>
                  )}

                  {/* Name */}
                  <Field label="Name" error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="Your Name"
                      className={inputClass(!!errors.name)}
                    />
                  </Field>

                  {/* Email */}
                  <Field label="Email Address" error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass(!!errors.email)}
                    />
                  </Field>

                  {/* Phone */}
                  <Field label="Phone Number" error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={inputClass(!!errors.phone)}
                    />
                  </Field>

                  {/* Query */}
                  <Field label="Your Query" error={errors.query?.message}>
                    <textarea
                      {...register('query')}
                      rows={5}
                      placeholder="Tell us about your requirements or questions…"
                      className={inputClass(!!errors.query) + ' resize-y'}
                    />
                  </Field>

                  <Button
                    type="submit"
                    size="lg"
                    loading={status === 'sending'}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-secondary">
        {label} <span className="text-teal-500">*</span>
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted',
    'border outline-none transition-all duration-150',
    'focus:ring-2 focus:ring-teal-500/40',
    hasError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-teal-500/60',
  ].join(' ');
}
