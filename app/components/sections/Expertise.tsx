import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { Grid } from '@/app/components/ui/Grid';
import { credentials, expertiseAreas, stats } from '@/app/data/expertise';

function CredentialPill({ acronym, label, body }: { acronym: string; label: string; body: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
        {acronym.split(' ')[0]}
      </div>
      <div>
        <div className="text-sm font-semibold text-primary leading-tight">{label}</div>
        <div className="text-xs text-ink-muted">{body}</div>
      </div>
    </div>
  );
}

function StatCard({ value, label, description }: { value: string; label: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold text-accent tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-semibold text-primary">{label}</div>
      <div className="mt-1 text-xs text-ink-muted">{description}</div>
    </div>
  );
}

export function Expertise() {
  return (
    <Section variant="white" id="expertise">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — text content */}
        <div>
          <SectionHeader
            eyebrow="Our Expertise"
            title="Qualified. Certified. Technology-First."
            subtitle="We hold industry-leading credentials that give us the breadth to solve the most complex financial and technological challenges."
          />

          {/* Credentials pills */}
          <div className="space-y-3">
            {credentials.map((c) => (
              <CredentialPill key={c.id} acronym={c.acronym} label={c.label} body={c.body} />
            ))}
          </div>
        </div>

        {/* Right — expertise areas + stats */}
        <div className="space-y-10">
          {/* Expertise areas */}
          <div className="space-y-6">
            {expertiseAreas.map((area) => (
              <div
                key={area.id}
                className="flex gap-4 pl-4 border-l-2 border-accent"
              >
                <div>
                  <h3 className="text-base font-semibold text-primary mb-1">{area.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{area.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats grid */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
            <Grid cols={2} gap="lg">
              {stats.map((s) => (
                <StatCard key={s.label} value={s.value} label={s.label} description={s.description} />
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Section>
  );
}
