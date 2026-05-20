import crypto from 'crypto';

/**
 * Verify Tap webhook signature via HMAC-SHA256 (assumed).
 * Tap docs state a signature header is included; header name can vary.
 * Configure:
 *  - TAP_WEBHOOK_SECRET (string)
 *  - TAP_SIGNATURE_HEADER (default: 'tap-signature')
 */
export function verifyTapSignature(rawBody: Buffer | string, headers: Record<string, any>) {
  const secret = process.env.TAP_WEBHOOK_SECRET || '';
  if (!secret) return { ok: false, reason: 'no-secret' };

  const headerName = (process.env.TAP_SIGNATURE_HEADER || 'tap-signature').toLowerCase();
  const provided = (headers[headerName] || headers[headerName.toUpperCase()] || '').toString().trim();
  if (!provided) return { ok: false, reason: 'no-header' };

  const bodyBuf = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf8');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(bodyBuf);
  const computed = hmac.digest('hex');

  // constant-time compare
  const a = Buffer.from(provided, 'utf8');
  const b = Buffer.from(computed, 'utf8');
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { ok, computed, provided };
}
