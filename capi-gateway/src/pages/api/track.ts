/**
 * /api/track — CAPI event intake
 *
 * Receives events from the browser (via sendBeacon) and:
 *   1. Validates + enriches with IP/UA from Cloudflare
 *   2. Deduplicates via KV
 *   3. Forwards to Meta CAPI
 *   4. Saves to D1 (leads + events)
 *   5. Webhook to Google Sheets (if lead)
 *
 * Called by LeadForm.svelte and InlineLeadForm.svelte with `enableCAPI=true`.
 */

import type { APIRoute } from 'astro';
import { hashPII } from '@lib/hash';
import { isDuplicate } from '@lib/dedup';
import { sendCapiEvent } from '@lib/meta-capi';
import { notifySheets } from '@lib/sheets';
import { insertLead, insertEvent, findLeadByPhone, findLeadByEmail } from '@lib/storage';
import { checkAuth, handleCors, corsHeaders, unauthorized } from '@lib/auth';
import { logger } from '@lib/logger';

export const prerender = false;

interface IncomingEvent {
  event_name: string;
  event_id: string;
  event_time: number;
  event_source_url?: string;
  action_source?: string;
  user_data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
  };
  custom_data?: Record<string, any>;
  trigger_reason?: string;
}

export const POST: APIRoute = async ({ request, env }) => {
  // CORS preflight + same-origin checks
  const cors = handleCors(request, env.ALLOWED_ORIGIN);
  if (cors) return cors;

  // Auth check (Bearer token from browser, OR Cloudflare Access)
  if (!checkAuth(request, env.ADMIN_API_KEY)) {
    // For sendBeacon from browser, allow without auth (origin check is enough)
    const origin = request.headers.get('Origin');
    if (origin !== env.ALLOWED_ORIGIN) {
      logger.warn('Unauthorized /api/track call', { origin });
      return new Response(
        JSON.stringify({ error: 'Forbidden', message: 'Invalid origin' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }

  let payload: IncomingEvent;
  try {
    payload = await request.json() as IncomingEvent;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Bad Request', message: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Basic validation
  if (!payload.event_name || !payload.event_id || !payload.event_time) {
    return new Response(
      JSON.stringify({ error: 'Bad Request', message: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Server-side enrichment from Cloudflare request context
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const country = request.headers.get('CF-IPCountry') || '';
  const city = request.headers.get('CF-IPCity') || '';
  const userAgent = request.headers.get('User-Agent') || '';
  const referer = request.headers.get('Referer') || '';
  const url = new URL(request.url);

  // Parse UTM from referer or payload
  const utm = parseUtm(payload.custom_data?.utm || referer);

  // Deduplicate via KV
  if (await isDuplicate(env.DEDUP, payload.event_id)) {
    logger.info('Duplicate event skipped', { event_id: payload.event_id });
    return new Response(
      JSON.stringify({ ok: true, deduped: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Hash PII
  const userDataHashed = await hashPII(payload.user_data || {});

  // Build Meta CAPI event
  const capiEvent = {
    event_name: payload.event_name,
    event_id: payload.event_id,
    event_time: payload.event_time,
    event_source_url: payload.event_source_url || referer || url.toString(),
    action_source: (payload.action_source || 'website') as any,
    user_data: {
      ...userDataHashed,
      client_ip_address: ip,
      client_user_agent: userAgent,
    },
    custom_data: payload.custom_data,
  };

  // Forward to Meta CAPI (in parallel with D1 writes via waitUntil)
  const capiPromise = env.META_ACCESS_TOKEN
    ? sendCapiEvent(
        env.META_PIXEL_ID,
        env.META_ACCESS_TOKEN,
        env.META_API_VERSION,
        capiEvent,
      )
    : Promise.resolve({ ok: false, error: 'META_ACCESS_TOKEN not configured' });

  // Persist to D1
  let leadId: number | undefined;
  const isLeadEvent = payload.event_name === 'Lead' || payload.custom_data?.lead_type;

  if (isLeadEvent) {
    // Try to match existing lead by phone or email
    let existingLead = null;
    if (payload.user_data?.phone) {
      existingLead = await findLeadByPhone(env.DB, payload.user_data.phone);
    }
    if (!existingLead && payload.user_data?.email) {
      existingLead = await findLeadByEmail(env.DB, payload.user_data.email);
    }

    if (!existingLead) {
      // Insert new lead
      leadId = await insertLead(env.DB, {
        event_id: payload.event_id,
        name: [payload.user_data?.firstName, payload.user_data?.lastName].filter(Boolean).join(' ') || undefined,
        phone: payload.user_data?.phone,
        email: payload.user_data?.email,
        villa_pref: payload.custom_data?.villa_pref,
        source: payload.custom_data?.source,
        page_path: payload.custom_data?.page_path || url.pathname,
        message: payload.custom_data?.message,
        ip_country: country,
        ip_city: city,
        user_agent: userAgent,
        utm_source: utm.source,
        utm_medium: utm.medium,
        utm_campaign: utm.campaign,
        utm_content: utm.content,
        utm_term: utm.term,
        referer: referer,
      });
    } else {
      leadId = existingLead.id;
    }
  }

  // Save event
  const eventInput: any = {
    event_id: payload.event_id,
    event_name: payload.event_name,
    event_time: payload.event_time,
    user_email_hash: userDataHashed.em?.[0],
    user_phone_hash: userDataHashed.ph?.[0],
    user_name_hash: userDataHashed.fn?.[0],
    ip_country: country,
    ip_city: city,
    user_agent: userAgent,
    page_path: payload.custom_data?.page_path || url.pathname,
    custom_data: payload.custom_data ? JSON.stringify(payload.custom_data) : undefined,
    lead_id: leadId,
    trigger_reason: payload.trigger_reason,
  };

  // Wait for Meta CAPI result, then save event with result
  const capiResult = await capiPromise;
  eventInput.meta_event_id = capiResult.meta_event_id;
  eventInput.meta_response_code = capiResult.response_code;
  eventInput.meta_response_body = capiResult.response_body || capiResult.error;

  await insertEvent(env.DB, eventInput);

  // Sheets webhook (fire-and-forget but wait for result to log)
  if (isLeadEvent && env.SHEETS_WEBHOOK_URL && leadId) {
    const sheetsResult = await notifySheets(env.SHEETS_WEBHOOK_URL, {
      timestamp: new Date(payload.event_time * 1000).toISOString(),
      name: [payload.user_data?.firstName, payload.user_data?.lastName].filter(Boolean).join(' '),
      phone: payload.user_data?.phone || '',
      email: payload.user_data?.email || '',
      villa_pref: payload.custom_data?.villa_pref || '',
      source: payload.custom_data?.source || '',
      page_path: payload.custom_data?.page_path || url.pathname,
      ip_country: country,
      utm_source: utm.source || '',
      utm_medium: utm.medium || '',
      utm_campaign: utm.campaign || '',
      user_agent: userAgent,
      event_id: payload.event_id,
      notes: payload.custom_data?.notes || '',
    });
    logger.info('Sheets webhook result', { event_id: payload.event_id, ok: sheetsResult.ok });
  }

  logger.info('Event processed', {
    event_id: payload.event_id,
    event_name: payload.event_name,
    lead_id: leadId,
    capi_ok: capiResult.ok,
    capi_code: capiResult.response_code,
  });

  return new Response(
    JSON.stringify({
      ok: true,
      event_id: payload.event_id,
      lead_id: leadId,
      capi: { ok: capiResult.ok, code: capiResult.response_code },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(request.headers.get('Origin') || '', env.ALLOWED_ORIGIN),
      },
    },
  );
};

export const GET: APIRoute = async ({ request, env }) => {
  return new Response(
    JSON.stringify({
      endpoint: '/api/track',
      method: 'POST',
      description: 'CAPI event intake. Sends to Meta CAPI, D1, Google Sheets.',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};

// Helpers

function parseUtm(input: string): {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
} {
  const result = { source: '', medium: '', campaign: '', content: '', term: '' };
  if (!input) return result;

  try {
    const url = input.startsWith('http') ? new URL(input) : null;
    const params = url ? url.searchParams : new URLSearchParams(input);
    result.source = params.get('utm_source') || '';
    result.medium = params.get('utm_medium') || '';
    result.campaign = params.get('utm_campaign') || '';
    result.content = params.get('utm_content') || '';
    result.term = params.get('utm_term') || '';
  } catch {
    // ignore parse errors
  }
  return result;
}
