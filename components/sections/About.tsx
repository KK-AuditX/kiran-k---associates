import FadeIn from '@/components/ui/FadeIn';
import Badge from '@/components/ui/Badge';
import { CheckCircleIcon } from '@/components/ui/Icons';
import NetworkBackground from '@/components/ui/NetworkBackground';

const credentials = ['CA', 'CS', 'ISA 3.0', 'FAFD', 'AICA L2'];

const specialties = [
  'Expert in Forensic Audit & Fraud Detection',
  'Specialist in Information Systems Audit (ISA)',
  'Pioneer in AI-driven Financial Automations',
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-28">
      <NetworkBackground opacity={0.2} interactive={false} />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-teal-500">
            The Mind Behind the Firm
          </span>
          <h2 className="text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
            Kiran.K
          </h2>
          <h3 className="mt-3 text-2xl font-semibold text-teal-400 sm:text-3xl">
            Managing Partner — Finance &amp; Audit
          </h3>
        </FadeIn>

        <FadeIn delay={0.1}>
          <blockquote className="mx-auto mt-10 max-w-2xl text-xl font-medium italic leading-relaxed text-text-secondary sm:text-2xl">
            "A multidimensional leader blending financial expertise with advanced technical
            proficiency in Information Systems and AI."
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-text-secondary">
            <p>
              Kiran K represents a new breed of Chartered Accountants who understand that in a
              digital world, financial oversight must be technological oversight.
            </p>
            <p>
              With a unique blend of traditional CA rigour and cutting-edge certifications in
              Information Systems Audit and Forensic Accounting, he leads the firm with a vision
              to modernise the Indian financial compliance landscape.
            </p>
          </div>
        </FadeIn>

        {/* Credentials */}
        <FadeIn delay={0.25}>
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Credentials &amp; Certifications
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {credentials.map((c) => (
                <Badge key={c} variant="outline" className="text-sm px-4 py-2">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Specialties */}
        <FadeIn delay={0.3}>
          <ul className="mx-auto mt-10 max-w-lg space-y-3">
            {specialties.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-surface px-5 py-3 text-sm text-text-secondary"
              >
                <CheckCircleIcon size={18} className="shrink-0 text-teal-400" />
                {s}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
