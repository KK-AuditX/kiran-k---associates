import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

// ─── Validation schema ────────────────────────────────────────────────────────
const careerSchema = z.object({
  firstName:     z.string().min(2, 'First name too short').max(50),
  lastName:      z.string().min(2, 'Last name too short').max(50),
  email:         z.string().email('Invalid email address'),
  phone:         z.string().regex(/^[+]?[0-9\s\-]{10,15}$/, 'Invalid phone number'),
  experience:    z.string().min(1).max(5),
  qualification: z.string().min(2).max(100),
  message:       z.string().max(2000).optional(),
  resumeNote:    z.boolean().optional(),
  recaptchaToken: z.string().optional(),
});

// ─── HTML sanitizer ───────────────────────────────────────────────────────────
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// ─── reCAPTCHA v3 verification ────────────────────────────────────────────────
async function verifyRecaptcha(token: string): Promise<number> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return 1; // skip if not configured
  if (!token)  return -1; // reject if expected but missing
  try {
    const res  = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json() as { success: boolean; score?: number };
    return data.success ? (data.score ?? 1) : -1;
  } catch {
    return -1;
  }
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = rateLimit(`career:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait before trying again.' }, { status: 429 });
  }

  // ── CSRF: verify origin ──────────────────────────────────────────────────
  const origin  = req.headers.get('origin') ?? '';
  const allowed_origins = [
    'https://kka.co.in',
    'https://www.kka.co.in',
    process.env.NEXTAUTH_URL ?? '',
    'http://localhost:3000',
  ].filter(Boolean);
  if (origin && !allowed_origins.some((o) => origin.startsWith(o))) {
    return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });
  }
  if (req.headers.get('X-Requested-With') !== 'XMLHttpRequest') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 403 });
  }

  try {
    const raw    = await req.json();
    const parsed = careerSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    const data = parsed.data;

    // ── reCAPTCHA ──────────────────────────────────────────────────────────
    const score = await verifyRecaptcha(data.recaptchaToken ?? '');
    if (score < 0.4) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please refresh and try again.' }, { status: 400 });
    }

    // ── Sanitize all fields ────────────────────────────────────────────────
    const firstName     = sanitize(data.firstName);
    const lastName      = sanitize(data.lastName);
    const email         = sanitize(data.email);
    const phone         = sanitize(data.phone);
    const experience    = sanitize(data.experience);
    const qualification = sanitize(data.qualification);
    const message       = sanitize(data.message);
    const resumeNote    = data.resumeNote ?? false;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('[career] Email env vars not configured — skipping send');
      return NextResponse.json({ success: true, note: 'Email not configured' });
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   ?? 'smtp.zoho.in',
      port:   parseInt(process.env.SMTP_PORT ?? '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth:   { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });

    // NOTE: All variables are pre-sanitized — no raw user input in HTML.
    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      process.env.EMAIL_TO ?? 'kiran@kka.co.in',
      replyTo: email,
      subject: `[KKA Careers] Application from ${firstName} ${lastName}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2eaf2;">
      <tr><td style="background:#0F172A;padding:24px 32px;">
        <p style="color:#00A676;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin:0 0 4px;">Career Application</p>
        <h1 style="color:#fff;font-size:20px;font-weight:700;margin:0;">${firstName} ${lastName}</h1>
      </td></tr>
      <tr><td style="padding:24px 32px;">
        <table cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Email</td><td><a href="mailto:${email}" style="color:#00A676;font-size:13px;">${email}</a></td></tr>
          <tr><td style="padding:4px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Phone</td><td style="color:#475569;font-size:13px;">${phone}</td></tr>
          <tr><td style="padding:4px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Experience</td><td style="color:#475569;font-size:13px;">${experience} years</td></tr>
          <tr><td style="padding:4px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Qualification</td><td style="color:#475569;font-size:13px;">${qualification}</td></tr>
        </table>
        ${message ? `<div style="margin-top:16px;padding:12px 16px;background:#f8fafc;border-radius:8px;"><p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 6px;">Message</p><p style="color:#475569;font-size:13px;line-height:1.6;margin:0;">${message.replace(/\n/g, '<br>')}</p></div>` : ''}
        ${resumeNote ? `<div style="margin-top:16px;padding:12px 16px;background:#fef3c7;border-radius:8px;border-left:3px solid #f59e0b;"><p style="color:#92400e;font-size:13px;margin:0;"><strong>Note:</strong> Please follow up and request the resume by email.</p></div>` : ''}
        <p style="color:#94a3b8;font-size:11px;margin-top:20px;margin-bottom:0;">Submitted via kka.co.in careers page</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[career route]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
