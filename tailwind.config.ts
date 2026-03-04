import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      /* ── Brand colours ──────────────────────────────── */
      colors: {
        primary: '#0F172A',
        accent: {
          DEFAULT: '#00A676',
          50:  '#f0fdf8',
          100: '#ccfbee',
          200: '#9af5dc',
          300: '#5de8c1',
          400: '#1fd1a5',
          500: '#00A676',
          600: '#00956a',
          700: '#007857',
        },
        neutral: {
          DEFAULT: '#F8FAFC',
          50:  '#F8FAFC',
          100: '#f0f4f8',
          200: '#e2eaf2',
          300: '#c9d5e4',
          400: '#9aafc5',
          600: '#4e6986',
          700: '#3d5570',
          800: '#2d405a',
        },
        ink: {
          DEFAULT: '#0F172A',
          light:   '#1e293b',
          muted:   '#475569',
          subtle:  '#94a3b8',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark:    '#0F172A',
          muted:   '#F8FAFC',
        },
      },

      /* ── Typography ─────────────────────────────────── */
      fontFamily: {
        sans:    ['Inter', ...fontFamily.sans],
        display: ['Inter', ...fontFamily.sans],
      },
      letterSpacing: {
        widest: '0.16em',
        wider:  '0.08em',
        wide:   '0.04em',
      },

      /* ── Layout ─────────────────────────────────────── */
      maxWidth: { site: '1280px', '8xl': '88rem' },

      /* ── Shadows ────────────────────────────────────── */
      boxShadow: {
        card:       '0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)',
        'card-hover':'0 4px 16px rgba(15,23,42,0.10), 0 12px 32px rgba(15,23,42,0.06)',
        accent:     '0 4px 24px rgba(0,166,118,0.20)',
      },

      /* ── Border radius ──────────────────────────────── */
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ── Animation ──────────────────────────────────── */
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.4s ease both',
      },

      /* ── Prose ──────────────────────────────────────── */
      typography: {
        DEFAULT: {
          css: {
            color: '#475569',
            maxWidth: 'none',
            h2: { color: '#0F172A', fontWeight: '700' },
            h3: { color: '#0F172A', fontWeight: '600' },
            strong: { color: '#0F172A' },
            a: { color: '#00A676', textDecorationColor: '#00A676' },
            code: { color: '#0F172A', background: '#F8FAFC', padding: '2px 6px', borderRadius: '4px' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
