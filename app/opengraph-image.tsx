import { ImageResponse } from 'next/og';

// Next.js App Router auto-discovers this as the site-wide OG image
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt         = 'Kiran K & Associates — Tech-Forward Chartered Accountants';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,166,118,0.15) 0%, transparent 65%)',
          }}
        />

        {/* Logo / brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: '#00A676',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>KK</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, fontWeight: 500 }}>
            Kiran K &amp; Associates
          </span>
        </div>

        {/* Eyebrow */}
        <span
          style={{
            color: '#00A676',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Chartered Accountants · ISA · FAFD · AICA L2
        </span>

        {/* Headline */}
        <h1
          style={{
            color: '#fff',
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.08,
            margin: 0,
            maxWidth: 820,
          }}
        >
          Tech-Forward Audit &amp;{' '}
          <span style={{ color: '#00A676' }}>Risk Management</span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 20,
            lineHeight: 1.5,
            marginTop: 24,
            maxWidth: 680,
          }}
        >
          Advanced audit, forensic accounting and risk solutions for modern enterprises in Bengaluru.
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #00A676 0%, #0F172A 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
