import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-primary text-center px-4 overflow-hidden">
      {/* Subtle dot grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,166,118,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-md">
        <p className="text-[7rem] sm:text-[9rem] font-extrabold leading-none text-accent select-none" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-white/50 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg bg-accent text-white text-sm font-semibold shadow-accent transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg border-2 border-white/25 text-white text-sm font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
