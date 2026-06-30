/**
 * dedup.ts — Event deduplication via Cloudflare KV
 *
 * Each CAPI event has a unique event_id (UUID v4). Meta CAPI uses
 * this ID to dedup with the browser pixel (which also passes event_id).
 *
 * Server-side dedup ensures we don't double-fire the same event
 * to Meta even if the browser retries sendBeacon.
 */

const TTL_SECONDS = 600; // 10 minutes — matches Meta's default dedup window

export async function isDuplicate(kv: KVNamespace, eventId: string): Promise<boolean> {
  const key = `dedup:${eventId}`;
  const existing = await kv.get(key);
  if (existing) return true;
  await kv.put(key, '1', { expirationTtl: TTL_SECONDS });
  return false;
}
