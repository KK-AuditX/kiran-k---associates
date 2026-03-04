'use client';

import { motion } from 'framer-motion';

interface ServiceNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  /** angle in degrees (0 = top, clockwise) */
  angle: number;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function TechAuditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v2m0 4v-2m0 0h-2m2 0h2M14 17h2" />
    </svg>
  );
}

function RiskManagementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5-4 8.5-8 10-4-1.5-8-5-8-10V7l8-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ForensicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h6M11 8v6" />
    </svg>
  );
}

function InternalControlsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_NODES: ServiceNode[] = [
  { id: 'ta',  label: 'TECH Audit',         sublabel: 'ISA 3.0',   icon: <TechAuditIcon />,       angle: 0   },
  { id: 'rm',  label: 'Risk Management',    sublabel: 'Enterprise', icon: <RiskManagementIcon />,  angle: 90  },
  { id: 'fa',  label: 'Forensic Accounting', sublabel: 'FAFD',      icon: <ForensicIcon />,        angle: 180 },
  { id: 'ic',  label: 'Internal Controls',  sublabel: 'ICAI',      icon: <InternalControlsIcon />, angle: 270 },
];

// Convert polar (angle°, radius) → cartesian (x, y) from centre
function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0° = top
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroOrbit() {
  const ORBIT_RADIUS   = 155;       // px — distance from centre
  const HUB_SIZE       = 96;        // px — centre circle diameter
  const RING_DURATION  = 32;        // seconds per full rotation

  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center select-none"
      style={{ width: 420, height: 420 }}
    >
      {/* ── Outer decorative ring ──────────────────────────────────────────── */}
      <div
        className="absolute rounded-full border border-white/[0.06]"
        style={{ width: ORBIT_RADIUS * 2 + 110, height: ORBIT_RADIUS * 2 + 110 }}
      />
      {/* ── Mid decorative ring ────────────────────────────────────────────── */}
      <div
        className="absolute rounded-full border border-accent/[0.12]"
        style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
      />

      {/* ── Rotating orbit wrapper ─────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: RING_DURATION, repeat: Infinity, ease: 'linear' }}
      >
        {SERVICE_NODES.map((node) => {
          const { x, y } = polar(node.angle, ORBIT_RADIUS);
          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                // place card centre at orbit position, relative to wrapper centre
                left: '50%',
                top:  '50%',
                x: x - 64,   // card is ~128px wide
                y: y - 40,   // card is ~80px tall
                width: 128,
                height: 80,
              }}
              // Counter-rotate so label always reads upright
              animate={{ rotate: -360 }}
              transition={{ duration: RING_DURATION, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
                whileHover={{ scale: 1.08, borderColor: 'rgba(0,166,118,0.45)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="text-accent">{node.icon}</span>
                <span className="text-white text-[10px] font-semibold leading-tight text-center whitespace-nowrap">
                  {node.label}
                </span>
                <span className="text-white/40 text-[9px] leading-none">{node.sublabel}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Hub ──────────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full border border-accent/30 bg-primary text-white text-lg font-bold"
        style={{ width: HUB_SIZE, height: HUB_SIZE }}
        animate={{ boxShadow: ['0 0 0 0 rgba(0,166,118,0)', '0 0 0 18px rgba(0,166,118,0.07)', '0 0 0 0 rgba(0,166,118,0)'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner glow ring */}
        <div className="absolute inset-2 rounded-full bg-accent/10" />
        {/* Logo */}
        <span className="relative z-10 tracking-tight">
          KK<span className="text-accent">&</span>A
        </span>
      </motion.div>

      {/* ── Ambient glow beneath hub ─────────────────────────────────────────── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 240,
          height: 240,
          background: 'radial-gradient(circle, rgba(0,166,118,0.09) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
