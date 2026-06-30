/**
 * /api/leads/[id] — Get + update single lead
 * Admin only (Bearer token required).
 */

import type { APIRoute } from 'astro';
import { findLeadById, updateLead, insertActivity, listActivities } from '@lib/storage';
import { checkAuth, handleCors, corsHeaders, unauthorized } from '@lib/auth';
import { logger } from '@lib/logger';

export const prerender = false;

export const GET: APIRoute = async ({ request, env, params }) => {
  const cors = handleCors(request, env.ALLOWED_ORIGIN);
  if (cors) return cors;

  if (!checkAuth(request, env.ADMIN_API_KEY)) return unauthorized();

  const id = parseInt(params.id as string);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const lead = await findLeadById(env.DB, id);
  if (!lead) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const activities = await listActivities(env.DB, id);

  return new Response(
    JSON.stringify({ lead, activities }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(request.headers.get('Origin') || '', env.ALLOWED_ORIGIN),
      },
    },
  );
};

export const PATCH: APIRoute = async ({ request, env, params }) => {
  const cors = handleCors(request, env.ALLOWED_ORIGIN);
  if (cors) return cors;

  if (!checkAuth(request, env.ADMIN_API_KEY)) return unauthorized();

  const id = parseInt(params.id as string);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const existing = await findLeadById(env.DB, id);
  if (!existing) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const allowedFields = ['status', 'notes', 'assigned_to', 'score', 'tags'];
  const updates: any = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) updates[field] = body[field];
  }

  // Track status changes
  if (updates.status && updates.status !== existing.status) {
    await insertActivity(env.DB, {
      lead_id: id,
      activity_type: 'status_change',
      description: `Status changed from "${existing.status}" to "${updates.status}"`,
      created_by: request.headers.get('X-User-Name') || 'admin',
    });
  }

  // Track notes
  if (updates.notes !== undefined && updates.notes !== existing.notes) {
    await insertActivity(env.DB, {
      lead_id: id,
      activity_type: 'note',
      description: updates.notes,
      created_by: request.headers.get('X-User-Name') || 'admin',
    });
  }

  if (Object.keys(updates).length > 0) {
    updates.last_contacted_at = Math.floor(Date.now() / 1000);
    await updateLead(env.DB, id, updates);
  }

  const updated = await findLeadById(env.DB, id);
  logger.info('Lead updated', { lead_id: id, updates: Object.keys(updates) });

  return new Response(
    JSON.stringify({ lead: updated }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(request.headers.get('Origin') || '', env.ALLOWED_ORIGIN),
      },
    },
  );
};
