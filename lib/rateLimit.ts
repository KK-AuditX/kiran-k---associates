/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Limits to `maxRequests` per `windowMs` milliseconds per key (usually IP).
 *
 * NOTE: This resets on cold starts (deploy/restart). For persistent rate
 * limiting across serverless instances, use Upstash Redis with @upstash/ratelimit.
 */

interface Bucket {
  count:     number;
  resetAt:   number;
}

const store = new Map<string, Bucket>();

export function rateLimit(
  key:         string,
  maxRequests: number,
  windowMs:    number,
): { allowed: boolean; remaining: number } {
  const now    = Date.now();
  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (bucket.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: maxRequests - bucket.count };
}
