'use client';

import { useState } from 'react';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { Button } from '@/app/components/ui/Button';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  const inputClass =
    'block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-ink-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

  const labelClass = 'block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5';

  return (
    <Section variant="light" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left — info */}
        <div className="lg:col-span-2">
          <SectionHeader
            eyebrow="Contact"
            title="Let's Start a Conversation"
            subtitle="Whether you need an IS audit, forensic investigation, or just want to understand how AI can transform your compliance — reach out."
          />

          <dl className="space-y-5 text-sm">
            {[
              {
                dt: 'Email',
                dd: (
                  <a
                    href="mailto:kiran@kirankassociates.com"
                    className="text-accent hover:text-accent-700 font-medium"
                  >
                    kiran@kirankassociates.com
                  </a>
                ),
              },
              {
                dt: 'Hours',
                dd: <span className="text-ink-muted">Mon – Sat · 9 AM – 6 PM IST</span>,
              },
              {
                dt: 'Response time',
                dd: <span className="text-ink-muted">Within 24 business hours</span>,
              },
            ].map(({ dt, dd }) => (
              <div key={dt}>
                <dt className="text-xs font-semibold uppercase tracking-widest text-ink-muted/60 mb-0.5">
                  {dt}
                </dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="text-lg font-semibold text-primary mb-2">Message Received</h3>
              <p className="text-sm text-ink-muted">
                Thank you! We'll respond within 24 business hours.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setStatus('idle')}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl border border-neutral-200 bg-white p-8 shadow-card"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Priya Sharma"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="priya@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service Required
                  </label>
                  <select id="service" name="service" className={inputClass}>
                    <option value="">Select a service…</option>
                    <option>IS Audit</option>
                    <option>Forensic Accounting</option>
                    <option>Taxation</option>
                    <option>Virtual CFO</option>
                    <option>Internal Audit</option>
                    <option>AI Automation</option>
                    <option>Business Advisory</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Briefly describe what you're looking for…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="text-sm text-red-600 rounded-lg bg-red-50 px-4 py-3">
                  {errorMsg || 'Something went wrong. Please try again.'}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                loading={status === 'loading'}
                className="w-full"
              >
                Send Message
              </Button>

              <p className="text-xs text-ink-muted text-center">
                By submitting, you agree to our privacy policy. We never share your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
