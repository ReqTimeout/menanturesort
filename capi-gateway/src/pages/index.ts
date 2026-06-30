/**
 * /  — Landing page (public)
 * Quick docs + status check for the gateway.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ env }) => {
  return new Response(
    `Menantu CAPI Gateway — v0.1
═══════════════════════════
Status:           ${env.ENVIRONMENT}
Site:             ${env.SITE_URL}
Meta Pixel:       ${env.META_PIXEL_ID}
API Version:      ${env.META_API_VERSION}
Allowed Origin:   ${env.ALLOWED_ORIGIN}

Endpoints
─────────
POST   /api/track        — CAPI event intake
GET    /api/leads        — List leads (admin)
GET    /api/leads/:id    — Get lead detail
PATCH  /api/leads/:id    — Update lead (admin)
GET    /api/stats        — Dashboard stats (admin)
GET    /api/health       — Health check (public)

Admin UI
────────
Visit /admin for the dashboard.
`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
};
