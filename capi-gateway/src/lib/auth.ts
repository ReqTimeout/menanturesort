/**
 * auth.ts — Simple API key auth for admin endpoints
 *
 * For production, consider Cloudflare Access (free for 50 users):
 *   https://developers.cloudflare.com/cloudflare-one/policies/access/
 *
 * This module provides a simple bearer token check via ADMIN_API_KEY secret.
 * For the admin UI, the user pastes the key once and it's stored in localStorage.
 */

export function checkAuth(request: Request, expectedKey: string | undefined): boolean {
  if (!expectedKey) return false;

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  // Timing-safe comparison
  return timingSafeEqual(match[1].trim(), expectedKey);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function unauthorized(): Response {
  return new Response(
    JSON.stringify({ error: 'Unauthorized', message: 'Missing or invalid API key' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } },
  );
}

export function corsHeaders(origin: string, allowed: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export function handleCors(request: Request, allowed: string): Response | null {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request.headers.get('Origin') || '*', allowed),
    });
  }
  return null;
}
