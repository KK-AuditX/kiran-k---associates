import Link from 'next/link';

const services = [
  'IS Audit',
  'Forensic Accounting',
  'Taxation',
  'Virtual CFO',
  'Internal Audit',
  'Business Advisory',
];

const companyLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact',  href: '#contact' },
  { label: 'Portal',   href: '/admin' },
];

const legalLinks = [
  { label: 'Privacy Policy',          href: '/privacy' },
  { label: 'Terms of Use',            href: '/terms' },
  { label: 'Data Protection Notice',  href: '/privacy#data-protection' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main footer grid */}
      <div className="site-container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="text-2xl font-bold tracking-tight mb-3">
            KK<span className="text-accent">&</span>A
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Kiran K & Associates — Chartered Accountants delivering forensic, IS audit, AI
            automation, and strategic advisory services to modern businesses.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/50 hover:text-accent transition-colors"
            >
              {/* LinkedIn icon */}
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Services
          </h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s}>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-default">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Company
          </h3>
          <ul className="space-y-2 mb-6">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
            Legal
          </h3>
          <ul className="space-y-2 mb-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
              Contact
            </h3>
            <a
              href="mailto:kiran@kirankassociates.com"
              className="text-sm text-accent hover:text-accent-200 transition-colors"
            >
              kiran@kirankassociates.com
            </a>
          </div>
        </div>
      </div>

      {/* ICAI Disclaimer */}
      <div className="border-t border-white/10">
        <div className="site-container py-5">
          <p className="text-[11px] text-white/30 leading-relaxed max-w-3xl mx-auto text-center">
            <strong className="text-white/40 font-semibold">ICAI Compliance: </strong>
            Information on this website is for general guidance only and does not constitute solicitation
            or professional advice. Engagement of professional services is subject to applicable ICAI
            regulations and a formal engagement letter.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="site-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Kiran K &amp; Associates. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <span>ICAI Reg · ISA · FAFD · AICA L2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
