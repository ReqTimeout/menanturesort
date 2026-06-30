/**
 * meta-capi.ts — Meta Conversions API client
 *
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api
 *
 * Sends server-side events to Meta CAPI. Deduplicates with browser
 * pixel via shared event_id.
 */

const META_GRAPH_URL = 'https://graph.facebook.com';

export interface CapiUserData {
  em?: string[];          // SHA-256 emails
  ph?: string[];          // SHA-256 phones
  fn?: string[];          // SHA-256 first names
  ln?: string[];          // SHA-256 last names
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;           // fbclid cookie
  fbp?: string;           // _fbp cookie
}

export interface CapiCustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  // Custom fields for Menantu
  villa_pref?: string;
  lead_type?: string;
  source?: string;
  trigger_reason?: string;
  page_path?: string;
}

export interface CapiEvent {
  event_name: string;
  event_id: string;            // UUID v4
  event_time: number;          // Unix seconds
  event_source_url: string;
  action_source: 'website' | 'app' | 'phone_call' | 'chat' | 'email' | 'other';
  user_data: CapiUserData;
  custom_data?: CapiCustomData;
  opt_out?: boolean;
  event_metadata?: Record<string, string>;
}

export interface CapiResult {
  ok: boolean;
  meta_event_id?: string;
  response_code?: number;
  response_body?: string;
  error?: string;
}

/**
 * Send a single event to Meta CAPI.
 * Returns detailed result for logging.
 */
export async function sendCapiEvent(
  pixelId: string,
  accessToken: string,
  apiVersion: string,
  event: CapiEvent,
): Promise<CapiResult> {
  const url = `${META_GRAPH_URL}/${apiVersion}/${pixelId}/events`;

  const body = {
    data: [event],
    access_token: accessToken,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    let parsed: any = {};
    try { parsed = JSON.parse(responseText); } catch {}

    return {
      ok: response.ok && !parsed.error,
      meta_event_id: parsed.events?.[0]?.event_id,
      response_code: response.status,
      response_body: responseText.slice(0, 500),
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Send multiple events in one batch (more efficient).
 */
export async function sendCapiBatch(
  pixelId: string,
  accessToken: string,
  apiVersion: string,
  events: CapiEvent[],
): Promise<CapiResult[]> {
  const url = `${META_GRAPH_URL}/${apiVersion}/${pixelId}/events`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: events, access_token: accessToken }),
    });

    const responseText = await response.text();
    let parsed: any = {};
    try { parsed = JSON.parse(responseText); } catch {}

    if (response.ok && !parsed.error) {
      return events.map((e) => ({
        ok: true,
        meta_event_id: parsed.events?.find((r: any) => r.event_id === e.event_id)?.event_id,
        response_code: response.status,
      }));
    }

    return events.map(() => ({
      ok: false,
      response_code: response.status,
      response_body: responseText.slice(0, 500),
    }));
  } catch (err) {
    return events.map(() => ({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    }));
  }
}
