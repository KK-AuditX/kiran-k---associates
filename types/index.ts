// ─── Sanity Blog Post ────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  body: PortableTextBlock[];
  mainImage?: SanityImage;
  tags?: string[];
}

// ─── Sanity Service ───────────────────────────────────────────────────────────
export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  icon: string;
  order: number;
}

// ─── Portable Text ─────────────────────────────────────────────────────────
export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

// ─── Sanity Image ──────────────────────────────────────────────────────────
export interface SanityImage {
  asset: { _ref: string; _type: string };
  alt?: string;
}

// ─── Forms ──────────────────────────────────────────────────────────────────
export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  query: string;
}

export interface CareerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  section?: string;
}
