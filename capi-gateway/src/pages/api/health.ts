/**
 * /api/health — Health check endpoint
 * Public, no auth required. Used by uptime monitors + smoke tests.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ env }) => {
  const start = Date.now();
  let dbOk = false;
  let dbError: string | undefined;

  try {
    const result = await env.DB.prepare(`SELECT 1 as ok`).first();
    dbOk = result?.ok === 1;
  } catch (err) {
    dbError = err instanceof Error ? err.message : String(err);
  }

  return new Response(
    JSON.stringify({
      status: dbOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      duration_ms: Date.now() - start,
      checks: {
        d1: dbOk ? 'ok' : 'error',
        d1_error: dbError,
      },
      env: env.ENVIRONMENT,
    }),
    {
      status: dbOk ? 200 : 503,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
