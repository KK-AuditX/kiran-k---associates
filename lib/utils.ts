import { type ClassValue, clsx } from 'clsx';

// Simple className merger (avoids adding clsx as dep by inlining it)
function clsxLite(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ');
}

export function cn(...inputs: ClassValue[]): string {
  return clsxLite(...inputs);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
