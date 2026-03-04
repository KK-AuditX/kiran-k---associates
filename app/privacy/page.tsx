import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Kiran K & Associates collects, uses, and protects personal data under the Digital Personal Data Protection Act, 2023.',
};

const EFFECTIVE = '1 March 2025';
const CONTACT_EMAIL = 'privacy@kka.co.in';

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-primary mt-10 mb-3">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-primary mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-ink-muted leading-relaxed mb-3">{children}</p>;
}
function UL({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-sm text-ink-muted mb-4">
      {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-primary">
        <div className="site-container py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-sm text-white/60">Effective date: {EFFECTIVE}</p>
        </div>
      </div>

      {/* Body */}
      <div className="site-container py-14 max-w-3xl">

        <P>
          This Privacy Policy explains how Kiran K &amp; Associates (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) — a Chartered Accountancy firm registered with the Institute of Chartered Accountants of India (ICAI) — collects, uses, and protects personal data you provide through this website. We operate in compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and applicable ICAI regulations.
        </P>

        <H2>1. Data Fiduciary</H2>
        <P>
          Kiran K &amp; Associates is the Data Fiduciary under the DPDPA. For privacy-related queries, contact:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
        </P>

        <H2>2. Personal Data We Collect</H2>
        <H3>2.1 Contact Enquiries</H3>
        <P>When you submit the contact form, we collect:</P>
        <UL items={[
          'Full name',
          'Email address',
          'Phone number (optional)',
          'Organisation name (optional)',
          'Service enquiry and message',
          'reCAPTCHA v3 score (Google — not stored by us)',
        ]} />

        <H3>2.2 Website Usage</H3>
        <P>
          If you accept analytics cookies, we collect anonymous usage data (pages visited, session duration) via privacy-respecting analytics. No cross-site tracking or fingerprinting is used.
        </P>

        <H3>2.3 What We Do Not Collect</H3>
        <UL items={[
          'Financial account numbers or payment details',
          'Aadhaar, PAN, or government ID numbers via this website',
          'Sensitive personal data as defined under DPDPA Section 2(34)',
        ]} />

        <H2>3. Purpose and Legal Basis of Processing</H2>
        <P>
          We process personal data solely to respond to your enquiry and provide the professional services you request. The legal basis is your explicit consent given at the time of form submission (DPDPA Section 7). You may withdraw consent at any time.
        </P>

        <H2>4. Data Retention</H2>
        <P>
          Contact enquiry data is retained for a maximum of 2 years, or for the duration of client engagement if a service relationship is established. After that period, data is permanently deleted from our systems and email archives.
        </P>

        <H2>5. Data Sharing</H2>
        <P>We do not sell, rent, or trade your personal data. We may share data only with:</P>
        <UL items={[
          'Email service provider (Zoho Mail, for delivery of your message — GDPR-compliant)',
          'reCAPTCHA (Google) for spam prevention — subject to Google\'s Privacy Policy',
          'Our professional indemnity insurers or ICAI, if legally required',
        ]} />

        <H2>6. Cookies</H2>
        <P>
          We use essential cookies for site functionality and optional analytics cookies. You control analytics cookies through our cookie consent banner. For more details, see our{' '}
          <Link href="/privacy#cookies" className="text-accent hover:underline">Cookie Policy</Link> below.
        </P>
        <h3 id="cookies" className="text-base font-semibold text-primary mt-6 mb-2">6.1 Cookie Categories</h3>
        <UL items={[
          'Essential: session management, form CSRF protection — cannot be disabled',
          'Analytics (optional): anonymous traffic measurement — disabled by default',
          'Marketing: none used on this website',
        ]} />

        <H2>7. Your Rights Under DPDPA</H2>
        <P>As a Data Principal, you have the right to:</P>
        <UL items={[
          'Access: request a copy of your personal data we hold',
          'Correction: request correction of inaccurate data',
          'Erasure: request deletion of your data (subject to legal retention obligations)',
          'Withdraw consent: withdraw consent for processing at any time',
          'Nominate: nominate another person to exercise rights in the event of incapacity or death',
          'Grievance: raise a complaint with our Data Protection Officer, or with the Data Protection Board of India',
        ]} />
        <P>
          To exercise any right, email <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>. We will respond within 30 days.
        </P>

        <H2>8. Security Measures</H2>
        <UL items={[
          'HTTPS with HSTS (2-year max-age, preload)',
          'Content Security Policy (CSP) headers',
          'Server-side input sanitisation on all form endpoints',
          'reCAPTCHA v3 for spam and bot protection',
          'Regular security reviews by our IS audit team',
        ]} />

        <H2>9. ICAI Compliance Note</H2>
        <P>
          This website is operated by a Chartered Accountant firm regulated by ICAI. We comply with ICAI guidelines on advertising and solicitation. Information on this website is for general guidance only and does not constitute professional advice or solicitation.
        </P>

        <H2>10. Changes to This Policy</H2>
        <P>
          We may update this policy to reflect changes in law or our practices. Material changes will be communicated via the website. The effective date above indicates the most recent revision.
        </P>

        <H2>11. Contact</H2>
        <P>
          Kiran K &amp; Associates<br />
          Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a><br />
          ICAI Firm Registration: on record with ICAI
        </P>

        <div className="mt-10 border-t border-neutral-100 pt-6 flex flex-wrap gap-4 text-xs text-ink-subtle">
          <Link href="/terms" className="hover:text-accent transition-colors">Terms of Use</Link>
          <Link href="/#contact" className="hover:text-accent transition-colors">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
