import Link from 'next/link';
import Image from 'next/image';
import { MailIcon, MapPinIcon, LinkedInIcon } from '@/components/ui/Icons';

const serviceLinks = [
  'Information System Audit',
  'Forensic Accounting',
  'AI & Process Automation',
  'Virtual CFO',
  'Taxation',
  'Advisory',
];

const quickLinks = [
  { label: 'ICAI', href: 'https://www.icai.org/' },
  { label: 'ICSI', href: 'https://www.icsi.edu/' },
  { label: 'GST Portal', href: 'https://www.gst.gov.in/' },
  { label: 'Income Tax', href: 'https://www.incometax.gov.in/' },
  { label: 'MCA', href: 'https://www.mca.gov.in/' },
  { label: 'RBI', href: 'https://www.rbi.org.in/' },
  { label: 'SEBI', href: 'https://www.sebi.gov.in/' },
  { label: 'CERT-IN', href: 'https://www.cert-in.org.in/' },
  { label: 'NIST', href: 'https://www.nist.gov/' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image src="/download.png" alt="KKA Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">
                  Kiran K <span className="text-teal-500">&amp; Associates</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-text-muted">
                  Chartered Accountants
                </p>
              </div>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              A future-ready CA firm blending financial expertise with digital trust — ISA, Forensic
              Accounting, AI Automation.
            </p>

            <div className="mt-5 space-y-2 text-sm text-text-secondary">
              <div className="flex items-start gap-2">
                <MapPinIcon size={16} className="mt-0.5 shrink-0 text-teal-500" />
                <span>
                  #24, 1st Floor, Beside Sai Castle,<br />
                  Balaji Layout, Kodigehalli,<br />
                  Bangalore — 560092
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/zBfn6gb6mMN6htCb9?g_st=awb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal-500 hover:text-teal-400 transition-colors"
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-primary">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/#services"
                    className="text-sm text-text-secondary hover:text-teal-400 transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-primary">
              Regulatory Links
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-teal-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-primary">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:Kiran@kka.co.in"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-teal-400 transition-colors"
                >
                  <MailIcon size={16} className="text-teal-500" />
                  Kiran@kka.co.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kiran-k-46b22516a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-teal-400 transition-colors"
                >
                  <LinkedInIcon size={16} className="text-teal-500" />
                  LinkedIn
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs text-text-muted">
                ICAI Registered Firm<br />ISO 27001 Practices<br />FAFD · ISA 3.0 · AICA L2
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Kiran K &amp; Associates. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            ICAI Compliant · Designed for the Digital Age
          </p>
        </div>
      </div>
    </footer>
  );
}
