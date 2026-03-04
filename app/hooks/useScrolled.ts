'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 * Used to toggle navbar background, sticky CTAs, etc.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    // Set initial value
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return scrolled;
}
