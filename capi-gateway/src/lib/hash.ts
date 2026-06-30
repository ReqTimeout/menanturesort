/**
 * hash.ts — SHA-256 PII hashing for Meta CAPI + Google EC
 *
 * PII is normalized per Meta spec:
 *   - email: trim, lowercase
 *   - phone: digits only, country code (62...) for ID
 *   - name: trim, lowercase
 */

const SHA_256_RE = /^[a-f0-9]{64}$/i;

export const normalize = {
  email: (s: string | undefined | null): string =>
    String(s || '').trim().toLowerCase(),

  phone: (s: string | undefined | null): string =>
    String(s || '').replace(/[^0-9]/g, ''),

  text: (s: string | undefined | null): string =>
    String(s || '').trim().toLowerCase(),
};

/**
 * Hash a single value with SHA-256.
 * Returns undefined if input is empty/invalid.
 */
export async function sha256(value: string): Promise<string | undefined> {
  if (!value) return undefined;
  try {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return undefined;
  }
}

/**
 * Hash a PII record and return Meta CAPI user_data format.
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information
 */
export interface PIIInput {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export async function hashPII(data: PIIInput): Promise<Record<string, string | string[]>> {
  const result: Record<string, string | string[]> = {};

  const email = normalize.email(data.email);
  if (email) {
    const h = await sha256(email);
    if (h) result.em = [h];
  }

  let phone = normalize.phone(data.phone);
  // ID phone: ensure starts with 62
  if (phone && !phone.startsWith('62') && phone.startsWith('0')) {
    phone = '62' + phone.substring(1);
  }
  if (phone && phone.length >= 8) {
    const h = await sha256(phone);
    if (h) result.ph = [h];
  }

  const firstName = normalize.text(data.firstName);
  if (firstName) {
    const h = await sha256(firstName);
    if (h) result.fn = [h];
  }

  const lastName = normalize.text(data.lastName);
  if (lastName) {
    const h = await sha256(lastName);
    if (h) result.ln = [h];
  }

  return result;
}

export function isValidSha256(s: string): boolean {
  return SHA_256_RE.test(s);
}
