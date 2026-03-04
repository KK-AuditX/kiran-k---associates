import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions governing the use of the Kiran K & Associates website.',
};

const EFFECTIVE = '1 March 2025';

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-primary mt-10 mb-3">{children}</h2>;
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

export default function TermsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-primary">
        <div className="site-container py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Terms of Use</h1>
          <p className="text-sm text-white/60">Effective date: {EFFECTIVE}</p>
        </div>
      </div>

      {/* Body */}
      <div className="site-container py-14 max-w-3xl">

        <P>
          By accessing this website (kka.co.in), you agree to be bound by these Terms of Use. If you do not agree, please do not use this website. These terms are governed by the laws of India, with jurisdiction in the courts of Bengaluru.
        </P>

        <H2>1. About This Website</H2>
        <P>
          This website is owned and operated by Kiran K &amp; Associates, a firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI). The website provides general information about our professional services.
        </P>

        <H2>2. ICAI Compliance &amp; No Solicitation</H2>
        <P>
          In accordance with the Chartered Accountants Act, 1949 and ICAI regulations:
        </P>
        <UL items={[
          'Information on this website is for general guidance only and does not constitute professional advice.',
          'Nothing on this website constitutes solicitation of clients in violation of ICAI or Bar Council rules.',
          'No client relationship is established merely by visiting this website or submitting an enquiry.',
          'Past audit or advisory work referenced is illustrative only and does not guarantee similar results.',
        ]} />

        <H2>3. No Professional Advice</H2>
        <P>
          Content published on this website — including blog articles, case studies, and service descriptions — is informational only. It does not constitute legal, tax, financial, or audit advice. You should seek qualified professional guidance before acting on any information from this website.
        </P>

        <H2>4. Intellectual Property</H2>
        <P>
          All content on this website — including text, graphics, logos, design, and code — is the property of Kiran K &amp; Associates or its licensors and is protected under Indian copyright law. You may not reproduce, distribute, or create derivative works without our written consent.
        </P>

        <H2>5. Acceptable Use</H2>
        <P>You agree not to:</P>
        <UL items={[
          'Use this website for any unlawful purpose',
          'Attempt to gain unauthorised access to any part of the website or its servers',
          'Introduce malicious code (viruses, trojans, etc.)',
          'Scrape, harvest, or extract data in bulk without permission',
          'Impersonate us or any other person or entity',
        ]} />

        <H2>6. Data Protection</H2>
        <P>
          Use of analytics cookies and form submission is governed by our{' '}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> and the Digital Personal Data Protection Act, 2023. We collect minimal personal data and do not sell it to third parties.
        </P>

        <H2>7. Third-Party Links</H2>
        <P>
          This website may contain links to third-party websites (e.g., ICAI, MCA21, Google reCAPTCHA, Calendly). We are not responsible for the privacy practices or content of those sites.
        </P>

        <H2>8. Limitation of Liability</H2>
        <P>
          To the maximum extent permitted by applicable law, Kiran K &amp; Associates shall not be liable for any direct, indirect, incidental, or consequential loss arising from your use of, or reliance on, information on this website. Our liability in relation to any professional engagement is governed by the signed engagement letter and applicable ICAI standards.
        </P>

        <H2>9. Disclaimer of Warranties</H2>
        <P>
          This website is provided &quot;as is&quot; without warranties of any kind, express or implied, including but not limited to fitness for a particular purpose, accuracy, or completeness. We do not warrant that the site will be error-free or uninterrupted.
        </P>

        <H2>10. Changes to These Terms</H2>
        <P>
          We reserve the right to update these Terms at any time. The effective date above reflects the most recent revision. Continued use of the website after changes constitutes acceptance.
        </P>

        <H2>11. Governing Law &amp; Jurisdiction</H2>
        <P>
          These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of courts located in Bengaluru, Karnataka.
        </P>

        <H2>12. Contact</H2>
        <P>
          For any questions about these Terms, contact us at:{' '}
          <a href="mailto:legal@kka.co.in" className="text-accent hover:underline">legal@kka.co.in</a>.
        </P>

        <div className="mt-10 border-t border-neutral-100 pt-6 flex flex-wrap gap-4 text-xs text-ink-subtle">
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link href="/#contact" className="hover:text-accent transition-colors">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
