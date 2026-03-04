import { ImageResponse } from 'next/og';

// Next.js App Router auto-discovers this as the site favicon
export const size        = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F172A',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#00A676',
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            letterSpacing: '-1px',
          }}
        >
          KK
        </span>
      </div>
    ),
    { ...size },
  );
}
