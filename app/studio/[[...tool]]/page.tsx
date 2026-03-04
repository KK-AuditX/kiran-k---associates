/**
 * Sanity Studio embedded at /studio
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET env vars
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import sanityConfig from '@/sanity/sanity.config';

export default function StudioPage() {
  return <NextStudio config={sanityConfig} />;
}
