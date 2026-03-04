'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Capability {
  id: string;
  label: string;
  shortLabel: string;
  year: number;
  maturity: number;       // 1–10
  color?: string;
  tools: string[];
  description: string;
  highlights: string[];
}

const CAPABILITIES: Capability[] = [
  {
    id: 'ai-audit',
    label: 'AI Assisted Auditing',
    shortLabel: 'AI Audit',
    year: 2022,
    maturity: 9,
    tools: ['Python + Pandas', 'Anomaly Detection', 'OpenAI API', 'LangChain'],
    description:
      'We use AI-powered scripts and LLM chains to analyse large transaction datasets, detect outliers, and auto-generate audit observations — reducing sampling effort by up to 70%.',
    highlights: [
      'Automated journal-entry anomaly detection',
      'LLM-generated draft audit observations',
      'Pattern-matching across 100k+ transactions',
    ],
  },
  {
    id: 'local-llm',
    label: 'Local LLM Tools',
    shortLabel: 'Local LLM',
    year: 2023,
    maturity: 8,
    tools: ['Ollama', 'LLaMA 3', 'Mistral 7B', 'Llama-Index'],
    description:
      'We operate local large language models on air-gapped setups for client-data privacy — enabling document summarisation, contract review, and policy analysis without any data leaving the client environment.',
    highlights: [
      'Air-gapped, on-premise LLM deployment',
      'Financial document summarisation at scale',
      'Policy and contract compliance Q&A',
    ],
  },
  {
    id: 'siem',
    label: 'SIEM Integration',
    shortLabel: 'SIEM',
    year: 2021,
    maturity: 9,
    tools: ['Splunk', 'Microsoft Sentinel', 'Elastic SIEM', 'QRadar'],
    description:
      'We review and validate SIEM configurations — writing correlation rules, assessing alert fidelity, and providing SOC advisory to ensure security events translate into actionable audit evidence.',
    highlights: [
      'Correlation-rule design for financial controls',
      'Alert-fidelity review and false-positive reduction',
      'SIEM log analysis as audit evidence',
    ],
  },
  {
    id: 'iso27001',
    label: 'ISO 27001 Readiness',
    shortLabel: 'ISO 27001',
    year: 2020,
    maturity: 10,
    tools: ['27001 Annex A', 'ISMS Doc Suite', 'Risk Register', 'PDCA Cycle'],
    description:
      'Our ISO 27001 practice has guided multiple organisations from zero baseline to successful certification. We conduct gap assessments, build the ISMS documentation suite, and prepare teams for Stage 1 and Stage 2 audits.',
    highlights: [
      'Full ISMS documentation and policy suite',
      'Annex A control-mapping and gap analysis',
      'Stage 1 and Stage 2 audit preparation',
    ],
  },
  {
    id: 'forensics-ai',
    label: 'Smart Forensic Analysis',
    shortLabel: 'Smart Forensics',
    year: 2022,
    maturity: 8,
    tools: ['ACL Analytics', 'IDEA', 'Excel Power Query', 'Custom Python'],
    description:
      'Combining FAFD-certified methodology with custom analytics scripts, we perform intelligent forensic investigations — tracing fund flows, matching related parties, and reconstructing financial timelines at speed.',
    highlights: [
      'Automated related-party and round-trip detection',
      'Fund-flow reconstruction across group entities',
      'Timeline visualisation for litigation support',
    ],
  },
];

const ACCENT   = '#00A676';
const INACTIVE = '#e2eaf2';

// ─── Custom tooltip ───────────────────────────────────────────────────────────
interface TooltipPayload {
  payload?: { year: number; maturity: number; label: string };
}
function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (!d) return null;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-primary">{d.label}</p>
      <p className="text-ink-muted">Since {d.year} · Maturity {d.maturity}/10</p>
    </div>
  );
}

// ─── Tool chip ────────────────────────────────────────────────────────────────
function ToolChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </span>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function CapabilityDetail({ cap }: { cap: Capability }) {
  return (
    <motion.div
      key={cap.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5"
    >
      {/* Year badge */}
      <div className="inline-flex items-center gap-2">
        <span className="h-px w-5 bg-accent" />
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          In practice since {cap.year}
        </span>
      </div>

      <h3 className="text-xl font-bold text-primary leading-snug">{cap.label}</h3>
      <p className="text-sm text-ink-muted leading-relaxed">{cap.description}</p>

      {/* Highlights */}
      <ul className="space-y-2">
        {cap.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-primary">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {h}
          </li>
        ))}
      </ul>

      {/* Tools */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-2">Tools &amp; Tech</p>
        <div className="flex flex-wrap gap-2">
          {cap.tools.map((t) => (
            <ToolChip key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Maturity bar */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-ink-muted uppercase tracking-wide">Capability Maturity</span>
          <span className="font-bold text-accent">{cap.maturity} / 10</span>
        </div>
        <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
          <motion.div
            key={cap.id + '-bar'}
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${cap.maturity * 10}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Timeline row ─────────────────────────────────────────────────────────────
function TimelineRow({
  cap,
  active,
  onHover,
}: {
  cap: Capability;
  active: boolean;
  onHover: (id: string) => void;
}) {
  return (
    <motion.div
      onHoverStart={() => onHover(cap.id)}
      onFocus={() => onHover(cap.id)}
      tabIndex={0}
      role="button"
      aria-selected={active}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={[
        'flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        active ? 'bg-accent/8 border border-accent/20' : 'hover:bg-neutral-50 border border-transparent',
      ].join(' ')}
    >
      {/* Dot */}
      <div className={`h-2.5 w-2.5 flex-shrink-0 rounded-full transition-colors ${active ? 'bg-accent' : 'bg-neutral-300'}`} />
      {/* Label */}
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-semibold leading-none ${active ? 'text-primary' : 'text-ink-muted'}`}>
          {cap.label}
        </span>
      </div>
      {/* Year */}
      <span className="text-xs text-ink-muted flex-shrink-0">{cap.year}</span>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ExpertiseTimeline() {
  const [activeId, setActiveId] = useState<string>(CAPABILITIES[0].id);
  const activeCap = CAPABILITIES.find((c) => c.id === activeId)!;

  const chartData = CAPABILITIES.map((c) => ({
    label:    c.label,
    shortLabel: c.shortLabel,
    maturity: c.maturity,
    year:     c.year,
    id:       c.id,
  }));

  return (
    <Section variant="white" id="expertise">
      <SectionHeader
        eyebrow="KKA DNA"
        title="Technology Capabilities"
        subtitle="A snapshot of the tools and methodologies that power every engagement — updated as the landscape evolves."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* ── Left: timeline list + chart ─────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Maturity bar chart */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">
              Capability Maturity Index
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
                barSize={14}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2eaf2" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 10]}
                  tick={{ fontSize: 10, fill: '#475569' }}
                  tickCount={6}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="shortLabel"
                  width={88}
                  tick={{ fontSize: 10, fill: '#475569' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(226,234,242,0.5)' }} />
                <Bar
                  dataKey="maturity"
                  radius={[0, 6, 6, 0]}
                  onClick={(d) => setActiveId(d.id)}
                  cursor="pointer"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={entry.id === activeId ? ACCENT : INACTIVE}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Clickable timeline list */}
          <div className="space-y-1">
            {CAPABILITIES.map((cap) => (
              <TimelineRow
                key={cap.id}
                cap={cap}
                active={cap.id === activeId}
                onHover={setActiveId}
              />
            ))}
          </div>
        </div>

        {/* ── Right: detail panel ──────────────────────────────────────────── */}
        <div className="lg:col-span-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 min-h-[420px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <CapabilityDetail key={activeCap.id} cap={activeCap} />
          </AnimatePresence>
        </div>

      </div>
    </Section>
  );
}
