import { NextResponse } from 'next/server';

export async function GET() {
  // Never expose env var names or configuration details in production.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }

  // Developer-only diagnostics — never reaches production.
  const required = ['EMAIL_USER', 'EMAIL_PASSWORD', 'SMTP_HOST', 'SMTP_PORT'];
  const missing  = required.filter((k) => !process.env[k]);
  return NextResponse.json({
    configured: missing.length === 0,
    missing,
    message: missing.length === 0 ? 'All env vars configured.' : `Missing: ${missing.join(', ')}`,
  });
}
