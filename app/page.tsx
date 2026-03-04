import dynamic from 'next/dynamic';
import { Hero }              from '@/app/components/sections/Hero';
import { Trust }             from '@/app/components/sections/Trust';
import { ServicesGrid }      from '@/app/components/sections/ServicesGrid';
import { InsightsSection }   from '@/app/components/sections/InsightsSection';
import { TrustSection }      from '@/app/components/sections/TrustSection';
import { PortalTeaser }      from '@/app/components/sections/PortalTeaser';
import { ContactForm }       from '@/app/components/sections/ContactForm';
import { ServiceSchema }     from '@/app/components/ServiceSchema';

// Dynamically import Recharts-heavy component — keeps initial JS bundle lean
// Note: ssr:false not used here since page.tsx is a Server Component;
// the child component's 'use client' directive handles client rendering.
const ExpertiseTimeline = dynamic(
  () => import('@/app/components/sections/ExpertiseTimeline').then((m) => m.ExpertiseTimeline),
  { loading: () => <div className="h-64 animate-pulse rounded-xl bg-neutral-100" aria-label="Loading chart" /> },
);

export default function HomePage() {
  return (
    <>
      <ServiceSchema />
      <Hero />
      <Trust />
      <ServicesGrid />
      <ExpertiseTimeline />
      <InsightsSection />
      <TrustSection />
      <PortalTeaser />
      <ContactForm />
    </>
  );
}
