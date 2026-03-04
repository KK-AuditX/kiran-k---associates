import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

// ─── Security response headers ────────────────────────────────────────────────
const securityHeaders = [
  // Strict Transport Security: force HTTPS for 2 years, include subdomains
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Block MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Referrer leakage control
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable browser features not needed for a CA firm site
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Legacy XSS filter for older browsers
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js inline scripts + Vercel + reCAPTCHA
      // unsafe-eval is only allowed in development (Next.js HMR requirement)
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://vercel.live https://va.vercel-scripts.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
      // Styles: same-origin + Google Fonts + inline (Tailwind) + Calendly
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: same-origin + Sanity CDN + reCAPTCHA + Calendly
      "img-src 'self' data: blob: https://cdn.sanity.io https://www.gstatic.com https://assets.calendly.com",
      // Media – none
      "media-src 'none'",
      // API connections + reCAPTCHA verify + Sanity
      "connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://www.google.com/recaptcha/ https://recaptchaenterprise.googleapis.com",
      // Allow Calendly embed iframe
      "frame-src 'self' https://calendly.com",
      // No plugins (Flash, etc.)
      "object-src 'none'",
      // Upgrade insecure requests in production
      "upgrade-insecure-requests",
    ].join('; '),
  },
  // Remove the X-Powered-By header (don't expose server tech)
  {
    key: 'X-Powered-By',
    value: '',
  },
];

const nextConfig: NextConfig = {
  // Remove X-Powered-By header globally
  poweredByHeader: false,

  // Compress responses
  compress: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: securityHeaders.filter((h) => h.value !== ''),
      },
    ];
  },

  // Sanity Studio edge-runtime compatibility
  experimental: {
    taint: true,
  },
};

export default nextConfig;
