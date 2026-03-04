import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

// ─── Input schema (mirrors ContactForm Zod schema) ────────────────────────────

const contactSchema = z.object({
  service:          z.string().min(1).max(60),
  industry:         z.string().min(1).max(60),
  subject:          z.string().min(5).max(120),
  message:          z.string().min(20).max(2000),
  urgency:          z.enum(['normal', 'high', 'asap']),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  name:             z.string().min(2).max(80),
  email:            z.string().email(),
  phone:            z.string().max(20).optional(),
  company:          z.string().max(80).optional(),
  consent:          z.boolean().refine((v) => v === true),
  recaptchaToken:   z.string().optional(),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags and trim — prevent HTML injection in email body */
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/** Verify reCAPTCHA v3 token — returns score (0–1) or -1 on failure */
async function verifyRecaptcha(token: string): Promise<number> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return 1;  // skip verification only when key is not configured
  if (!token)  return -1; // reject if key is configured but token is absent
  try {
    const res  = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json() as { success: boolean; score?: number };
    return data.success ? (data.score ?? 1) : -1;
  } catch {
    return -1;
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip                  = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed: withinLimit } = rateLimit(`contact:${ip}`, 10, 60_000);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests. Please wait before trying again.' }, { status: 429 });
  }

  // ── CSRF: verify Origin matches our domain ──────────────────────────────
  const origin  = req.headers.get('origin') ?? '';
  const allowed = [
    'https://kka.co.in',
    'https://www.kka.co.in',
    process.env.NEXTAUTH_URL ?? '',
    'http://localhost:3000',
  ].filter(Boolean);

  if (origin && !allowed.some((o) => origin.startsWith(o))) {
    return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });
  }

  // ── Require custom header (extra CSRF layer) ───────────────────────────
  if (req.headers.get('X-Requested-With') !== 'XMLHttpRequest') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 403 });
  }

  try {
    const raw = await req.json();

    // ── Schema validation ────────────────────────────────────────────────
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    const data = parsed.data;

    // ── reCAPTCHA check ──────────────────────────────────────────────────
    const score = await verifyRecaptcha(data.recaptchaToken ?? '');
    if (score < 0.4) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please refresh and try again.' }, { status: 400 });
    }

    // ── Sanitize all string fields ───────────────────────────────────────
    const { name, email, phone, company, service, industry, subject, message, urgency, preferredContact } = {
      name:             sanitize(data.name),
      email:            sanitize(data.email),
      phone:            sanitize(data.phone),
      company:          sanitize(data.company),
      service:          sanitize(data.service),
      industry:         sanitize(data.industry),
      subject:          sanitize(data.subject),
      message:          sanitize(data.message),
      urgency:          data.urgency,
      preferredContact: data.preferredContact,
    };

    // ── Email transport ──────────────────────────────────────────────────
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('[contact] Email env vars not configured — skipping send');
      return NextResponse.json({ success: true, note: 'Email not configured' });
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   ?? 'smtp.zoho.in',
      port:   parseInt(process.env.SMTP_PORT ?? '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth:   { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });

    const urgencyColour = { normal: '#00A676', high: '#f59e0b', asap: '#ef4444' }[urgency];
    const urgencyLabel  = { normal: 'Standard', high: 'Urgent', asap: 'Critical' }[urgency];

    // NOTE: email uses pre-sanitized variables — no raw user input in HTML
    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      process.env.EMAIL_TO ?? 'kiran@kka.co.in',
      replyTo: email,
      subject: `[KKA] ${subject} — ${service} (${urgencyLabel})`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2eaf2;">
      <!-- Header -->
      <tr><td style="background:#0F172A;padding:24px 32px;">
        <p style="color:#00A676;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin:0 0 4px;">New Enquiry</p>
        <h1 style="color:#fff;font-size:20px;font-weight:700;margin:0;">${subject}</h1>
      </td></tr>
      <!-- Meta row -->
      <tr><td style="padding:20px 32px;border-bottom:1px solid #f0f4f8;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="33%" style="padding:4px 0;">
              <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 2px;">Service</p>
              <p style="color:#0F172A;font-size:13px;font-weight:600;margin:0;">${service}</p>
            </td>
            <td width="33%" style="padding:4px 0;">
              <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 2px;">Industry</p>
              <p style="color:#0F172A;font-size:13px;font-weight:600;margin:0;">${industry}</p>
            </td>
            <td width="33%" style="padding:4px 0;">
              <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 2px;">Urgency</p>
              <span style="display:inline-block;background:${urgencyColour}20;color:${urgencyColour};padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;">${urgencyLabel}</span>
            </td>
          </tr>
        </table>
      </td></tr>
      <!-- Message -->
      <tr><td style="padding:24px 32px;border-bottom:1px solid #f0f4f8;">
        <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">Message</p>
        <p style="color:#475569;font-size:14px;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br>')}</p>
      </td></tr>
      <!-- Contact info -->
      <tr><td style="padding:20px 32px;background:#f8fafc;">
        <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 10px;">Contact Details</p>
        <table cellpadding="0" cellspacing="0">
          <tr><td style="padding:2px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Name</td><td style="color:#475569;font-size:13px;">${name}</td></tr>
          <tr><td style="padding:2px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Email</td><td><a href="mailto:${email}" style="color:#00A676;font-size:13px;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:2px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Phone</td><td style="color:#475569;font-size:13px;">${phone}</td></tr>` : ''}
          ${company ? `<tr><td style="padding:2px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Organisation</td><td style="color:#475569;font-size:13px;">${company}</td></tr>` : ''}
          <tr><td style="padding:2px 0;color:#0F172A;font-size:13px;font-weight:600;padding-right:16px;">Preferred</td><td style="color:#475569;font-size:13px;">${preferredContact}</td></tr>
        </table>
        <p style="color:#94a3b8;font-size:11px;margin-top:16px;margin-bottom:0;">Sent via kka.co.in contact form · reCAPTCHA score: ${score.toFixed(2)}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact route]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 },
    );
  }
}

// Legacy GET — health check
export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: 'contact' });
}
