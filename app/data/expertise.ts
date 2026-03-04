// ─── Expertise / credentials data ────────────────────────────────────────────
export interface Credential {
  id: string;
  acronym: string;
  label: string;
  body: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export const credentials: Credential[] = [
  { id: 'ca',   acronym: 'CA',      label: 'Chartered Accountant', body: 'ICAI' },
  { id: 'cs',   acronym: 'CS',      label: 'Company Secretary',    body: 'ICSI' },
  { id: 'isa',  acronym: 'ISA 3.0', label: 'Information Systems Auditor', body: 'ICAI' },
  { id: 'fafd', acronym: 'FAFD',    label: 'Forensic Auditor & Fraud Detector', body: 'ICAI' },
  { id: 'aica', acronym: 'AICA L2', label: 'AI for Chartered Accountants', body: 'ICAI' },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'forensic',
    title: 'Forensic Audit & Fraud Detection',
    description:
      'Using advanced data analytics and AI to uncover financial irregularities, trace fund flows, and support litigation proceedings.',
  },
  {
    id: 'isa',
    title: 'Information Systems Audit',
    description:
      'Evaluating IT governance frameworks, ERP audit trails, and cyber controls aligned to ISO 27001 and ISACA standards.',
  },
  {
    id: 'ai',
    title: 'AI-driven Financial Automation',
    description:
      'Building intelligent workflows that automate compliance filings, reconciliation, and financial reporting for modern enterprises.',
  },
];

export const stats: StatItem[] = [
  {
    value: '10+',
    label: 'Years of Practice',
    description: 'Deep domain experience across industries',
  },
  {
    value: '200+',
    label: 'Clients Served',
    description: 'From startups to listed enterprises',
  },
  {
    value: '5',
    label: 'Credentials',
    description: 'CA · CS · ISA · FAFD · AICA L2',
  },
  {
    value: '100%',
    label: 'ICAI Compliant',
    description: 'Every engagement follows ICAI guidelines',
  },
];
