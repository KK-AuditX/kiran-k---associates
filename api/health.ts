import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS for simple checks (adjust for production if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const required = ['EMAIL_USER', 'EMAIL_PASSWORD', 'SMTP_HOST', 'SMTP_PORT'];
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) missing.push(key);
  }

  const emailConfigured = missing.length === 0;

  return res.status(200).json({
    emailConfigured,
    missing,
    message: emailConfigured
n      ? 'Email configuration is present.'
      : 'Email configuration is incomplete. See ZOHO_MAIL_SETUP.md or EMAIL_SETUP_GUIDE.md for instructions.'
  });
}
