# Menantu Resort — CAPI Gateway + Custom CRM

Cloudflare Worker + Astro 5 + D1 + KV. Handles Meta CAPI event forwarding, lead persistence, and custom CRM admin UI.

**Domain:** `menantucapi.beriklan.co.id`

## Quick Start

```bash
# 1. Install
npm install

# 2. Create D1 database (one-time)
npx wrangler d1 create menantu-leads
# Copy the database_id from output → paste into wrangler.jsonc

# 3. Create KV namespace (one-time)
npx wrangler kv:namespace create DEDUP
# Copy the id → paste into wrangler.jsonc

# 4. Run migrations (local first)
npm run db:migrate:local

# 5. Set secrets
npm run secret:meta    # Meta Conversions API access token
npm run secret:sheets  # Google Apps Script webhook URL (optional)
npm run secret:admin   # Admin API key (any random string)

# 6. Dev mode (local + remote D1)
npm run dev

# 7. Deploy
npm run deploy
```

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/track` | Origin check | CAPI event intake from browser |
| GET | `/api/leads` | Bearer | List leads (filterable) |
| GET | `/api/leads/:id` | Bearer | Get lead detail + activities |
| PATCH | `/api/leads/:id` | Bearer | Update lead (status, notes, assigned_to) |
| GET | `/api/stats` | Bearer | Dashboard stats |
| GET | `/api/health` | Public | Health check |
| GET | `/admin` | Browser | Dashboard UI |
| GET | `/admin/leads` | Browser | Lead list UI |
| GET | `/admin/leads/:id` | Browser | Lead detail + edit UI |
| GET | `/` | Public | Landing/API docs |

## Architecture

```
Browser (menantu-resort.com)
    ↓ sendBeacon
menantucapi.beriklan.co.id/api/track
    ↓
Cloudflare Worker
    ├── Validate + enrich (IP, UA, geo)
    ├── KV dedup (10min TTL)
    ├── D1 insert (leads + events)
    ├── Meta CAPI forward (graph.facebook.com)
    ├── Google Sheets webhook (Apps Script)
    └── Structured log → Workers Logs
```

## Files

```
capi-gateway/
├── wrangler.jsonc          # Worker config (D1, KV, routes, vars)
├── package.json            # npm scripts
├── astro.config.mjs        # Astro + Cloudflare adapter
├── tsconfig.json
├── migrations/
│   └── 0001_initial.sql    # leads, events, activities tables
└── src/
    ├── env.d.ts            # Env bindings (auto-gen via wrangler types)
    ├── pages/
    │   ├── index.ts        # Landing / API docs
    │   ├── admin/
    │   │   ├── index.astro
    │   │   └── leads/
    │   │       ├── index.astro
    │   │       └── [id].astro
    │   └── api/
    │       ├── track.ts
    │       ├── health.ts
    │       ├── stats.ts
    │       └── leads/
    │           ├── index.ts
    │           └── [id].ts
    └── lib/
        ├── hash.ts         # SHA-256 PII hashing
        ├── dedup.ts        # KV dedup
        ├── meta-capi.ts    # Meta CAPI client
        ├── sheets.ts       # Google Sheets webhook
        ├── storage.ts      # D1 query helpers
        ├── auth.ts          # Bearer token + CORS
        └── logger.ts        # Structured JSON logs
```

## Enabling CAPI in Main Site

In `app/src/components/svelte/LeadForm.svelte` and `InlineLeadForm.svelte`, the `enableCAPI` prop defaults to `false`. Once this gateway is deployed and tested, set it to `true` in `app/src/layouts/BaseLayout.astro`:

```astro
<LeadForm enableCAPI={true} client:only="svelte" />
```

## See also

- `DEPLOY_CAPI.md` (in repo root) — full deploy guide + Google Apps Script setup
- `ARCHITECTURE_CAPI.md` — design doc
- `AGENTS.md` — project memory
