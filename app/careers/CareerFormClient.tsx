'use client';

/**
 * Career application form \u2014 client component.
 * Stack: React Hook Form + Zod + reCAPTCHA v3 + Framer Motion
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

// \u2500\u2500\u2500 reCAPTCHA global type \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

// \u2500\u2500\u2500 Validation schema \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const careerSchema = z.object({
  firstName:     z.string().min(2, 'Minimum 2 characters').max(50),
  lastName:      z.string().min(2, 'Minimum 2 characters').max(50),
  email:         z.string().email('Enter a valid email address'),
  phone:         z.string().regex(/^[+]?[0-9\s\-]{10,15}$/, 'Enter a valid phone number'),
  experience:    z.string().min(1, 'Required').max(5),
  qualification: z.string().min(1, 'Please select a qualification'),
  message:       z.string().max(1000).optional(),
});

type CareerFormData = z.infer<typeof careerSchema>;

// \u2500\u2500\u2500 Helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function inputCls(hasError: boolean) {
  return [
    'block w-full rounded-lg border px-4 py-2.5 text-sm text-primary placeholder:text-ink-subtle',
    'bg-white focus:outline-none focus:ring-2 transition-all duration-200',
    hasError
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
      : 'border-neutral-200 focus:border-accent focus:ring-accent/20',
  ].join(' ');
}

function Field({
  label,
  required = true,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-ink-muted mb-1.5">
        {label}
        {required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
          <svg className="h-3.5 w-3.5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm0 6a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// \u2500\u2500\u2500 Component \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

type Status = 'idle' | 'sending' | 'success' | 'error';

export function CareerFormClient() {
  const [status, setStatus]     = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerFormData>({ resolver: zodResolver(careerSchema), mode: 'onTouched' });

  // Load reCAPTCHA script on mount
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || document.getElementById('recaptcha-script')) return;
    const script     = document.createElement('script');
    script.id        = 'recaptcha-script';
    script.src       = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async     = true;
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = async (): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) return '';
    return new Promise((resolve) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(siteKey, { action: 'careers' });
          resolve(token);
        } catch {
          resolve('');
        }
      });
    });
  };

  const onSubmit = async (data: CareerFormData) => {
    setStatus('sending');
    setErrorMsg('');
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch('/api/career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ ...data, resumeNote: !fileName, recaptchaToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(body.error ?? 'Request failed');
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white shadow-card overflow-hidden">
      {/* Accent top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent to-accent/60" aria-hidden="true" />

      <div className="p-8 sm:p-10">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 py-12 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">Application Submitted!</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Thank you for your interest. We will review your application and get back to you soon.
                </p>
              </div>
              <button
                onClick={() => { setStatus('idle'); setFileName(''); reset(); }}
                className="h-10 px-6 rounded-lg border-2 border-neutral-200 text-sm font-medium text-ink-muted hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Submit Another Response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              {status === 'error' && (
                <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMsg || 'Something went wrong. Please try again.'}
                </div>
              )}

              {/* Name row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First Name" error={errors.firstName?.message}>
                  <input {...register('firstName')} placeholder="First name" className={inputCls(!!errors.firstName)} autoComplete="given-name" />
                </Field>
                <Field label="Last Name" error={errors.lastName?.message}>
                  <input {...register('lastName')} placeholder="Last name" className={inputCls(!!errors.lastName)} autoComplete="family-name" />
                </Field>
              </div>

              {/* Contact row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email Address" error={errors.email?.message}>
                  <input {...register('email')} type="email" placeholder="you@example.com" className={inputCls(!!errors.email)} autoComplete="email" />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <input {...register('phone')} type="tel" placeholder="+91 98765 43210" className={inputCls(!!errors.phone)} autoComplete="tel" />
                </Field>
              </div>

              {/* Experience + Qualification row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Experience (Years)" error={errors.experience?.message}>
                  <input
                    {...register('experience')}
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    placeholder="e.g. 3.5"
                    className={inputCls(!!errors.experience)}
                  />
                </Field>
                <Field label="Qualification" error={errors.qualification?.message}>
                  <select {...register('qualification')} className={inputCls(!!errors.qualification)}>
                    <option value="">Select qualification…</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="CA Completed">CA Completed</option>
                    <option value="Pursuing CA">Pursuing CA</option>
                    <option value="CPA / ACCA">CPA / ACCA</option>
                  </select>
                </Field>
              </div>

              {/* Cover note */}
              <Field label="Cover Note" required={false} error={errors.message?.message}>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about yourself and why you want to join KKA…"
                  className={inputCls(!!errors.message)}
                />
              </Field>

              {/* Resume upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-ink-muted mb-1.5" htmlFor="resume-upload">
                  Resume <span className="text-ink-subtle font-normal normal-case tracking-normal">(PDF, DOC, DOCX)</span>
                </label>
                <label
                  htmlFor="resume-upload"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-5 py-4 transition-colors hover:border-accent hover:bg-accent/[0.03] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20"
                >
                  <svg className="h-5 w-5 text-accent flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-sm text-ink-muted">
                    {fileName ? (
                      <span className="font-medium text-accent">{fileName}</span>
                    ) : (
                      'Click to select your resume'
                    )}
                  </span>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                    aria-label="Upload resume"
                  />
                </label>
                <p className="mt-1.5 text-xs text-ink-subtle">Max 5 MB. We will follow up by email if the file is not received.</p>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full h-12 rounded-lg bg-accent text-white text-sm font-semibold shadow-accent transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {status === 'sending' ? 'Submitting…' : 'Submit Application'}
              </button>

              <p className="text-center text-[11px] text-ink-subtle">
                Protected by reCAPTCHA. By submitting you agree to our{' '}
                <a href="/privacy" className="underline hover:text-accent">Privacy Policy</a>.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
