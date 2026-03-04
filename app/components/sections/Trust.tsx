// Trust signals: credentials, ICAI registration, compliance strip
export function Trust() {
  const signals = [
    { label: 'ICAI Registered Firm', detail: 'Statutory practising certificate' },
    { label: 'ISA 3.0 Certified', detail: 'Information Systems Auditor — ICAI' },
    { label: 'FAFD Certified', detail: 'Forensic Auditor & Fraud Detector — ICAI' },
    { label: 'AICA Level 2', detail: 'AI for Chartered Accountants — ICAI' },
    { label: 'Company Secretary', detail: 'ICSI certified CS professional' },
  ];

  return (
    <section aria-label="Trust signals" className="border-y border-neutral-200 bg-white">
      <div className="site-container py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted text-center mb-8">
          Credentials & Certifications
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {signals.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1">
              <span className="text-sm font-semibold text-primary">{s.label}</span>
              <span className="text-xs text-ink-muted">{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
