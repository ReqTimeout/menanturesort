/**
 * sheets.ts — Google Sheets webhook integration
 *
 * Forwards leads to a Google Apps Script webhook which appends
 * a row to the configured Google Sheet. Free, no Google API key needed.
 *
 * Apps Script setup (one-time):
 *   1. Open Google Sheet → Extensions → Apps Script
 *   2. Paste the doPost handler from DEPLOY_CAPI.md §Google Sheets
 *   3. Deploy → Web app → "Anyone" access
 *   4. Copy URL → wrangler secret put SHEETS_WEBHOOK_URL
 */

export interface SheetLeadPayload {
  timestamp: string;     // ISO
  name: string;
  phone: string;
  email: string;
  villa_pref: string;
  source: string;
  page_path: string;
  ip_country: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  user_agent: string;
  event_id: string;
  notes: string;
}

export async function notifySheets(
  webhookUrl: string,
  lead: SheetLeadPayload,
): Promise<{ ok: boolean; status?: number; error?: string }> {
  if (!webhookUrl) {
    return { ok: false, error: 'SHEETS_WEBHOOK_URL not configured' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });

    return {
      ok: response.ok,
      status: response.status,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
