# KKA Website — Next.js 15 Rebuild

High-performance, Big4-inspired CA firm website for **Kiran K & Associates**.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| CMS | Sanity v3 (hosted) |
| Forms | React Hook Form + Zod |
| Auth | NextAuth v4 (Credentials) |
| Charts | Recharts |
| Deploy | Vercel |

## Quick Start

```bash
cd kiran-k-associates-nextjs
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev                         # → http://localhost:3000
npm run sanity                      # → Sanity Studio at http://localhost:3333
```

## Environment Variables

See [.env.local.example](.env.local.example) for all required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (get from sanity.io) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (default) |
| `SANITY_API_TOKEN` | Sanity write token |
| `EMAIL_USER` | Zoho/Gmail SMTP username |
| `EMAIL_PASSWORD` | SMTP app password |
| `SMTP_HOST` | `smtp.zoho.in` or `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `NEXTAUTH_SECRET` | Random 32-char string (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `http://localhost:3000` (prod: `https://kka.co.in`) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

## Project Structure

```
app/
  page.tsx              ← Home page
  careers/page.tsx      ← Careers + application form
  blog/[slug]/page.tsx  ← Dynamic blog detail
  admin/page.tsx        ← Protected admin dashboard (Recharts)
  studio/[[...tool]]/   ← Embedded Sanity Studio at /studio
  api/
    auth/[...nextauth]/ ← NextAuth handler
    contact/            ← Contact form → email
    career/             ← Career form → email
    health/             ← Email config health check

components/
  layout/   Navbar, Footer
  sections/ Hero, Services, Blogs, About, Contact
  ui/       Button, Badge, Card, FadeIn, Icons, NetworkBackground, ScrollToTop

sanity/
  schemas/  post.ts, service.ts   ← Sanity content types
  schema.ts
  sanity.config.ts
```

## Sanity CMS Setup

1. Create a new project at [sanity.io](https://sanity.io)
2. Copy the Project ID into `.env.local`
3. Run `npm run sanity` to open the Studio
4. Add your blog posts and services there

## Deployment (Vercel)

1. Push to GitHub
2. Import repository in Vercel
3. Add all env vars in Vercel project settings
4. Deploy — done

## Health Check

```bash
curl http://localhost:3000/api/health
```
