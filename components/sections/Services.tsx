import { client, servicesQuery } from '@/lib/sanity';
import { Service } from '@/types';
import { iconMap, ArrowRightIcon } from '@/components/ui/Icons';
import Card from '@/components/ui/Card';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import NetworkBackground from '@/components/ui/NetworkBackground';

// Static fallback services (shown when Sanity is not yet configured)
const FALLBACK_SERVICES: Omit<Service, '_id' | 'slug'>[] = [
  { title: 'Information System Audit', icon: 'shield', description: 'Comprehensive assessment of IT infrastructure — data integrity, security compliance, and cyber resilience.', order: 1 },
  { title: 'Forensic Accounting', icon: 'search', description: 'Advanced financial investigation to detect fraud, analyse complex data trails, and support litigation.', order: 2 },
  { title: 'AI & Process Automation', icon: 'brain', description: 'Leveraging AI to streamline financial workflows, automate tax compliance, and generate predictive insights.', order: 3 },
  { title: 'Virtual CFO', icon: 'trending', description: 'Strategic financial leadership for startups and growth-stage companies. Numbers handled, scale achieved.', order: 4 },
  { title: 'Internal & Statutory Audit', icon: 'building', description: 'Rigorous independent examination of financial statements ensuring transparency and global standards.', order: 5 },
  { title: 'Accounting', icon: 'calculator', description: 'End-to-end bookkeeping and accounting services — accurate, up-to-date, and fully compliant.', order: 6 },
  { title: 'Compliances', icon: 'clipboard', description: 'All regulatory filings and corporate governance requirements — penalty-free and legally sound.', order: 7 },
  { title: 'Taxation', icon: 'coins', description: 'Expert direct and indirect tax planning, filing, and dispute resolution to optimise liabilities.', order: 8 },
  { title: 'Advisory', icon: 'lightbulb', description: 'Strategic business consulting, deal structuring, and financial guidance for complex decisions.', order: 9 },
];

async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[]>(servicesQuery, {}, { next: { revalidate: 3600 } });
    return data?.length ? data : (FALLBACK_SERVICES as Service[]);
  } catch {
    return FALLBACK_SERVICES as Service[];
  }
}

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="relative overflow-hidden bg-background py-28">
      <NetworkBackground opacity={0.2} interactive={false} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Our Expertise"
            title="Strategic Solutions for the Digital Era"
            description="Comprehensive financial and technology advisory built for India's digital economy."
          />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? iconMap.lightbulb;
            return (
              <FadeIn key={service._id ?? service.title} delay={i * 0.06}>
                <Card hover className="group flex h-full flex-col p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50/10 text-teal-400 transition-colors group-hover:bg-teal-500/15">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-text-primary">{service.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">{service.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-teal-500 opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRightIcon size={14} />
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
