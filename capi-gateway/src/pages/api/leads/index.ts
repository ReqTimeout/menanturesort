/**
 * /api/leads — Lead list + create
 * Admin only (Bearer token required).
 *
 * GET    /api/leads              — list leads (filterable)
 * GET    /api/leads?status=new   — filter by status
 * GET    /api/leads?search=budi  — search by name/phone/email
 */

import type { APIRoute } from 'astro';
import { listLeads, countLeads, type ListLeadsOptions } from '@lib/storage';
import { checkAuth, handleCors, corsHeaders, unauthorized } from '@lib/auth';
import { logger } from '@lib/logger';

export const prerender = false;

export const GET: APIRoute = async ({ request, env, url }) => {
  const cors = handleCors(request, env.ALLOWED_ORIGIN);
  if (cors) return cors;

  if (!checkAuth(request, env.ADMIN_API_KEY)) return unauthorized();

  const opts: ListLeadsOptions = {
    status: url.searchParams.get('status') || undefined,
    source: url.searchParams.get('source') || undefined,
    search: url.searchParams.get('search') || undefined,
    limit: parseInt(url.searchParams.get('limit') || '50'),
    offset: parseInt(url.searchParams.get('offset') || '0'),
  };

  try {
    const [leads, total] = await Promise.all([
      listLeads(env.DB, opts),
      countLeads(env.DB, opts),
    ]);

    return new Response(
      JSON.stringify({ leads, total, limit: opts.limit, offset: opts.offset }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request.headers.get('Origin') || '', env.ALLOWED_ORIGIN),
        },
      },
    );
  } catch (err) {
    logger.error('List leads failed', { error: err instanceof Error ? err.message : String(err) });
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
