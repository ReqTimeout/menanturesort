/**
 * /api/stats — Dashboard stats
 * Admin only.
 */

import type { APIRoute } from 'astro';
import { getDashboardStats } from '@lib/storage';
import { checkAuth, handleCors, corsHeaders, unauthorized } from '@lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, env }) => {
  const cors = handleCors(request, env.ALLOWED_ORIGIN);
  if (cors) return cors;

  if (!checkAuth(request, env.ADMIN_API_KEY)) return unauthorized();

  const stats = await getDashboardStats(env.DB);

  return new Response(
    JSON.stringify(stats),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(request.headers.get('Origin') || '', env.ALLOWED_ORIGIN),
      },
    },
  );
};
