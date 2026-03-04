// ─── Services data ────────────────────────────────────────────────────────────
export type Industry = 'Banks' | 'MSMEs' | 'Startups' | 'Tech Firms';

export const ALL_INDUSTRIES: Industry[] = ['Banks', 'MSMEs', 'Startups', 'Tech Firms'];

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  tags: string[];
  bullets: string[];
  industries: Industry[];
}

export const services: ServiceItem[] = [
  {
    id: 'tech-audit',
    title: 'TECH Audit',
    tagline: 'ISA 3.0 standard information systems audit',
    description:
      'End-to-end assessment of IT systems, ERP controls, and digital infrastructure against ISA 3.0 and ISACA frameworks.',
    longDescription:
      "Our TECH Audit practice delivers a comprehensive review of your organisation's technology landscape — from network architecture and access controls to ERP audit trails and cloud configurations. We align findings to ISA 3.0, COBIT, and ISACA standards and provide actionable remediation roadmaps prioritised by risk.",
    icon: 'cpu',
    tags: ['ISA 3.0', 'ISACA', 'ERP Audit'],
    bullets: [
      'Full IT general controls (ITGC) assessment',
      'ERP access-control and segregation-of-duties review',
      'Remediation roadmap with risk-ranked findings',
    ],
    industries: ['Banks', 'Tech Firms'],
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    tagline: 'Enterprise risk identification and mitigation',
    description:
      'Identify, quantify, and mitigate financial, operational, and technology risks before they become material events.',
    longDescription:
      'We deploy a structured Enterprise Risk Management (ERM) framework to map risk appetite, assess inherent and residual risks, and design controls — covering financial, operational, cyber, and strategic categories. Outputs include a live risk register, heat-map dashboards, and board-ready reporting.',
    icon: 'shield',
    tags: ['ERM', 'Risk Register', 'Heat Maps'],
    bullets: [
      'Risk appetite definition and heat-map visualisation',
      'Inherent vs residual risk quantification',
      'Quarterly risk register with board-ready reporting',
    ],
    industries: ['Banks', 'MSMEs', 'Tech Firms'],
  },
  {
    id: 'forensic',
    title: 'Forensic Accounting',
    tagline: 'FAFD-certified fraud detection and investigation',
    description:
      'AI-powered financial investigations to uncover fraud, trace fund flows, and deliver litigation-ready expert reports.',
    longDescription:
      'Combining FAFD certification with AI-powered analytics, we investigate complex fraud scenarios — from embezzlement and billing schemes to cyber-enabled financial crime. Our team traces fund flows across multi-entity structures, preserves digital evidence in court-admissible formats, and provides expert witness testimony when required.',
    icon: 'search',
    tags: ['FAFD', 'Fraud Detection', 'Litigation'],
    bullets: [
      'AI-assisted anomaly detection across transaction sets',
      'Court-admissible digital evidence preservation',
      'Expert witness and litigation support',
    ],
    industries: ['Banks', 'MSMEs', 'Startups'],
  },
  {
    id: 'internal-controls',
    title: 'Internal Controls',
    tagline: 'Design, test, and strengthen control frameworks',
    description:
      'Design and evaluate internal control frameworks aligned to COSO and IFC standards to reduce fraud risk and improve operational efficiency.',
    longDescription:
      'We assess your existing control environment against COSO, IFC, and SOX-equivalent standards — identifying design gaps, operating failures, and segregation-of-duties weaknesses. Our deliverables include a controls-gap report, a remediation tracker, and process-level walkthroughs your team can own.',
    icon: 'clipboard',
    tags: ['COSO', 'SOX', 'Control Testing'],
    bullets: [
      'COSO-aligned control design and gap analysis',
      'Segregation-of-duties mapping and remediation',
      'Management letter with ranked control deficiencies',
    ],
    industries: ['Banks', 'MSMEs', 'Tech Firms'],
  },
  {
    id: 'compliance',
    title: 'Compliance Advisory',
    tagline: 'Regulatory navigation across SEBI, FEMA, RBI & MCA',
    description:
      "Navigate India's complex regulatory landscape with confidence — ROC filings, FEMA, RBI, SEBI, and DPDP Act compliance covered end-to-end.",
    longDescription:
      'Our compliance practice covers the full spectrum of Indian regulatory requirements: annual ROC filings and secretarial compliance, FEMA and RBI reporting, SEBI LODR obligations, and the newly enacted Digital Personal Data Protection Act (DPDP). We maintain a compliance calendar, flag upcoming obligations, and handle representations before regulatory authorities.',
    icon: 'building',
    tags: ['ROC', 'FEMA', 'DPDP Act'],
    bullets: [
      'Proactive compliance calendar with automated alerts',
      'DPDP Act data-inventory and consent-mechanism review',
      'Regulatory response drafting and authority liaisons',
    ],
    industries: ['Banks', 'MSMEs', 'Startups', 'Tech Firms'],
  },
  {
    id: 'cyber-risk',
    title: 'Data & Cyber Risk',
    tagline: 'SIEM, ISO 27001, and cyber posture assessments',
    description:
      "Assess and strengthen your organisation's cybersecurity posture with SIEM integration, vulnerability assessments, and ISO 27001 readiness.",
    longDescription:
      'From penetration testing and SIEM log-analysis to ISO 27001 gap assessments and VAPT reviews, we provide a full cyber-risk service line. Our team configures SIEM correlation rules, reviews cloud security posture (CSPM), and prepares organisations for ISO 27001 certification — delivering a prioritised security roadmap at every stage.',
    icon: 'lock',
    tags: ['ISO 27001', 'SIEM', 'VAPT'],
    bullets: [
      'ISO 27001 gap assessment and certification roadmap',
      'SIEM rule-set review and log correlation analysis',
      'Cloud security posture (CSPM) and VAPT reporting',
    ],
    industries: ['Tech Firms', 'Banks', 'Startups'],
  },
  {
    id: 'internal-audit',
    title: 'Internal Audit',
    tagline: 'Risk-based internal audit as a managed service',
    description:
      'Risk-based internal audit plans, process walkthroughs, and management reporting delivered as a co-sourced or outsourced engagement.',
    longDescription:
      "Our risk-based internal audit service is designed to plug resource gaps without sacrificing quality. We prepare annual audit plans aligned to your board's risk priorities, execute process walkthroughs, perform substantive testing, and issue management-action-plan (MAP) reports — all under ICAI professional standards.",
    icon: 'trending',
    tags: ['Risk-Based Audit', 'ICAI', 'MAP Reports'],
    bullets: [
      'Annual risk-based audit plan with board alignment',
      'Process walkthroughs and control-effectiveness testing',
      'Management action plans with tracking dashboard',
    ],
    industries: ['MSMEs', 'Banks'],
  },
  {
    id: 'financial-investigations',
    title: 'Financial Investigations',
    tagline: 'Asset tracing, insolvency support, and dispute resolution',
    description:
      'Follow the money — asset tracing, insolvency investigations, and financial modelling for legal disputes and regulatory inquiries.',
    longDescription:
      'When financial disputes escalate to litigation or insolvency, our financial investigations team steps in. We trace diverted assets across complex corporate structures, rebuild accounting records for insolvent entities, quantify financial losses for damages calculations, and prepare expert reports for NCLT, arbitration, and court proceedings.',
    icon: 'coins',
    tags: ['Asset Tracing', 'NCLT', 'Dispute Resolution'],
    bullets: [
      'Cross-border asset tracing through layered structures',
      'Insolvency accounting reconstruction for NCLT filings',
      'Expert financial reports for arbitration and courts',
    ],
    industries: ['Banks', 'MSMEs', 'Startups'],
  },
];
