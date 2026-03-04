import { Section } from '@/app/components/ui/Section';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { Card, CardTitle, CardDescription } from '@/app/components/ui/Card';
import { Grid } from '@/app/components/ui/Grid';
import { Badge } from '@/app/components/ui/Badge';
import { services } from '@/app/data/services';

// Icon map — simple SVG paths keyed by icon name
const iconPaths: Record<string, string> = {
  shield:
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  search:
    'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  cpu:
    'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  trending:
    'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  building:
    'M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3',
  coins:
    'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  clipboard:
    'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  lightbulb:
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

function ServiceIcon({ name }: { name: string }) {
  const d = iconPaths[name] ?? iconPaths.shield;
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      </svg>
    </div>
  );
}

export function Services() {
  return (
    <Section variant="light" id="services">
      <SectionHeader
        eyebrow="Our Services"
        title="Comprehensive CA Services"
        subtitle="From forensic audits to AI-driven compliance, our practice covers the full spectrum of modern financial advisory."
      />

      <Grid cols={4} gap="lg">
        {services.map((service) => (
          <Card key={service.id} className="group">
            <ServiceIcon name={service.icon} />
            <CardTitle className="mb-2">{service.title}</CardTitle>
            <CardDescription className="mb-4">{service.description}</CardDescription>
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <Badge key={tag} label={tag} variant="neutral" />
              ))}
            </div>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
