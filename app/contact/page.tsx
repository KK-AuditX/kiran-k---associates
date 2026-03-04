import type { Metadata } from 'next';
import { Contact } from '@/app/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Schedule an audit consultation with Kiran K & Associates — CA firm specialising in IS audit, forensic accounting, risk management and AI-driven compliance.',
};

export default function ContactPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="pt-24">
        <Contact />
      </div>
    </div>
  );
}
