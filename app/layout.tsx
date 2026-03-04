import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { CookieBanner } from '@/app/components/layout/CookieBanner';
import { WhatsAppButton } from '@/app/components/sections/ContactForm';
import AuthProvider from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://kka.co.in'),
  title: {
    default: 'Kiran K & Associates | Chartered Accountants',
    template: '%s | Kiran K & Associates',
  },
  description:
    'Future-ready Chartered Accountancy firm in Bengaluru specialising in Information System Audit, Forensic Accounting, AI Automation, Virtual CFO, Taxation, and Compliance.',
  keywords: [
    'Chartered Accountants',
    'CA firm Bengaluru',
    'Information System Audit',
    'Forensic Accounting',
    'Virtual CFO',
    'Tax Compliance',
    'ISA',
    'AI Automation',
  ],
  authors: [{ name: 'Kiran K & Associates' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://kka.co.in',
    siteName: 'Kiran K & Associates',
    title: 'Kiran K & Associates | Chartered Accountants',
    description:
      'Future-ready CA firm specialising in Information System Audit, Forensic Accounting, and AI-driven financial solutions.',
    // opengraph-image.tsx is auto-discovered by Next.js App Router
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran K & Associates',
    description: 'Future-ready Chartered Accountancy firm in Bengaluru.',
    // opengraph-image.tsx is used automatically
  },
  icons: {
    // icon.tsx is auto-discovered — no static file reference needed
  },
  alternates: { canonical: 'https://kka.co.in' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>
          {/* Skip to main content — WCAG 2.4.1 bypass block */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] px-5 py-3 rounded-lg bg-accent text-white text-sm font-semibold shadow-lg transition-all"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
