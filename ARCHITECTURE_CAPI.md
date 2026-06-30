# 🏗️ CAPI GATEWAY ARCHITECTURE — Menantu Resort

> **Status:** Design approved, code implemented (Phase 1), deploy pending
> **Last updated:** 30 Juni 2026
> **Author:** Codex (architect mode)
> **Stack:** Cloudflare Worker (Astro 5) + D1 + KV + Google Sheets + Custom CRM
> **Custom domain:** `menantucapi.beriklan.co.id`
> **Repo:** `capi-gateway/`
> **Deploy guide:** `DEPLOY_CAPI.md`

Dokumen ini adalah **design lengkap** untuk Conversions API Gateway + Custom CRM Menantu Resort. Untuk konteks bisnis & funnel lihat `MASTER_PLAN.md`. Untuk tracking pixel yang sudah ada, lihat `app/src/components/astro/AnalyticsBoot.astro`. Untuk deploy step-by-step lihat `DEPLOY_CAPI.md`.

---

## 📋 TL;DR

Cloudflare Worker terpisah dari main site, menerima event dari browser via `sendBeacon`, enrich dengan server-side context (IP, UA, geo, server-time), forward ke Meta CAPI dengan `event_id` matching untuk dedup, simpan ke D1 untuk lead persistence, dan webhook ke Google Sheets untuk sales follow-up.

**Goals:**
1. Lead form submission **tercatat di server** (saat ini hanya open wa.me — tidak ada data masuk)
2. Conversion event **bypass ad-blocker & iOS ITP**
3. Sales team lihat semua leads di Google Sheet real-time
4. Behavior tracking granular (scroll, time, section, exit intent)
5. Server-side dedup dengan Meta Pixel via `event_id`

---

## 1. 📊 BUSINESS CONTEXT (recap)

| Aspek | Detail |
|---|---|
| **Produk** | Villa produktif 3 tipe (Bijak 1.2M / Idaman 1.6M / Mapan 2M), eco-resort 3.5Ha, Cicalengka Bandung |
| **Stock** | 74 unit, **58 terjual, 16 sisa** |
| **Harga masuk** | Cicilan Rp 9 jt/bln, booking fee Rp 10 jt |
| **Promise** | SHM, ROI 10% p.a. guarantee 2 tahun, profit share 70% |
| **Trust** | Sahid Hotel 50+ tahun, MK Land 15+ tahun |
| **Pain utama** | Legalitas, villa terbengkalai, operasional ribet, transparansi bagi hasil |
| **CTA primer** | WhatsApp (semua page) + LeadForm modal + KPR simulator |
| **Promo aktif** | Diskon Rp 200 jt + bonus mobil listrik, deadline 30 Jul 2026 |

---

## 2. 👥 AUDIENCE PERSONAS

### Segment A — HNW Property Investor (Primary, 60%)
- **Usia:** 35–55, **Domisili:** Jakarta, Surabaya, Bandung, Semarang
- **Income:** Rp 30–100 jt/bln
- **Behavior:** Google "villa investasi Bandung", baca artikel SEO panjang, banding yield, cek legalitas
- **Concern:** ROI certainty, sengketa legalitas, maintenance burden
- **Trigger:** Promo deadline, unit scarcity, "Sahid 50 tahun"
- **Source:** Google Ads, organic SEO, FB/IG Ads

### Segment B — Family Vacation + Investment (Secondary, 25%)
- **Usia:** 30–45, **Domisili:** Jabodetabek
- **Behavior:** Lihat foto, 360° panorama, tanya "boleh pakai sendiri?", fokus family-friendly
- **Concern:** Bisa dipakai pribadi? Maintenance? Fasilitas anak?
- **Source:** Instagram, Facebook, organic review

### Segment C — Out-of-town Yield Hunter (Tertiary, 15%)
- **Usia:** 40–60, **Domisili:** Luar Bandung
- **Behavior:** Hitung KPR yield, banding dengan reksa dana / deposito, baca FAQ end-to-end
- **Source:** Email marketing, Google Ads long-tail, artikel komparasi

---

## 3. 🎯 FUNNEL & EVENT TAXONOMY

```
TOFU (Awareness) → MOFU (Consideration) → BOFU (Decision) → POST (Retention)
   PageView          ViewContent              Lead             Schedule
   ViewContent       AddToInfo (KPR)          Contact          Purchase
   (artikel)         AddToInfo (FAQ)          (WA click)
                     Contact (WA warm)
```

| Stage | Event Name (Meta) | Trigger | Value (IDR) | Custom Data |
|---|---|---|---|---|
| TOFU | `PageView` | Every page load | 0 | source, medium, content_name, page_depth |
| TOFU | `ViewContent` | Villa detail page | 1.2M / 1.6M / 2M | villa_id, villa_label, content_category |
| TOFU | `ViewContent` (custom) | 360° panorama open | 0 | content_name: '360_panorama' |
| TOFU | `ViewContent` (custom) | Article read 50%+ | 0 | article_slug, read_time_sec |
| MOFU | `ViewContent` | Promo page view | 0 | content_name: 'promo_jul26' |
| MOFU | `AddToInfo` (custom) | KPR calculate | 0 | kpr_amount, kpr_tenor, kpr_rate, kpr_monthly |
| MOFU | `AddToInfo` (custom) | FAQ deep-read (3+ Q) | 0 | faq_category, faq_count |
| MOFU | `ViewContent` (custom) | Scroll depth 75% | 0 | page_path, scroll_pct |
| MOFU | `ViewContent` (custom) | Time on page 60s+ | 0 | page_path, time_on_page |
| MOFU | `ViewContent` (custom) | Section visibility (h2) | 0 | section_id, page_path |
| MOFU | `Contact` | **WA click** (organic) | 100K | wa_source, page_path, is_form: false |
| MOFU | `Contact` (custom) | Exit intent detected | 0 | last_page, time_on_site |
| BOFU | `Lead` | **LeadForm submit** | 10M (booking fee) | villa_pref, lead_type, user_data |
| BOFU | `Contact` | **WA click from form** | 100K | form_prefilled: true, lead_id |
| BOFU | `Schedule` (custom) | Request survey | 0 | survey_date_pref, villa_pref |
| BOFU | `Contact` (custom) | Download brosur click | 0 | asset: 'brosur_pdf' |
| POST | `Schedule` | Survey booked (offline) | 0 | survey_date, sales_name |
| POST | `Purchase` | Booking fee confirmed (offline) | 10M | villa_id, transaction_id |

---

## 4. ⚠️ WHY CAPI GATEWAY — Gap Analysis

### Current state (browser-only)

| Issue | Impact | Lost leads/mo (est) |
|---|---|---|
| iOS 14+ Safari ITP | 7-day attribution → 1-7 day window | ~15% |
| Ad-blockers (30%+ user ID) | Pixel tidak fire | ~30% |
| Consent-gated | Decline = no data | ~10-20% |
| LeadForm = WA only | User data cuma di wa.me message | 100% server-side gap |
| No scroll/time/section | Tidak ada engagement quality signal | — |
| No follow-up automation | Sales monitor WA manual | — |

### Target state (with CAPI Gateway)

| Improvement | Mechanism |
|---|---|
| Server-side tracking | Cloudflare Worker forward ke Meta CAPI |
| Ad-blocker bypass | Browser → Worker → Meta (pixel tidak langsung ke Meta) |
| iOS ITP bypass | Server-side attribution |
| Lead capture reliability | `sendBeacon` + Worker stores even if user navigates |
| Engagement signals | Scroll / time / section / exit intent via IntersectionObserver |
| Sales follow-up | Worker → Google Sheets webhook → sales team |

---

## 5. 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    BROWSER (menantu-resort.com)                         │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │ Meta Pixel   │  │ GA4 + Ads    │  │ TrackJS      │  │ LeadForm    │  │
│  │ (existing)   │  │ (existing)   │  │ beacon.ts    │  │ (enhanced)  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘  │
│         │ event_id        │                 │ sendBeacon     │ POST     │
└─────────┼─────────────────┼─────────────────┼─────────────────┼──────────┘
          │                 │                 │                │
          ▼                 ▼                 ▼                ▼
   ┌─────────────┐   ┌─────────────┐   ┌──────────────────────────────────┐
   │ Meta Pixel  │   │ GA4         │   │   CLOUDFLARE WORKER              │
   │ (browser)   │   │ + Google    │   │   capi.menantu-resort.com        │
   │ dedup via   │   │   Ads       │   │                                  │
   │ event_id    │   │             │   │   1. Receive event (POST /track) │
   └─────────────┘   └─────────────┘   │   2. Validate + enrich           │
                                       │      (IP, UA, geo, server-time)  │
                                       │   3. Generate/preserve event_id  │
                                       │   4. Hash PII (SHA-256)          │
                                       │   5. Forward to Meta CAPI        │
                                       │      (server, with event_id)     │
                                       │   6. Save to D1 (90d retention)  │
                                       │   7. If lead_type=lead →         │
                                       │      - Webhook Google Sheets     │
                                       │      - Webhook CRM (Notion/Hub)  │
                                       │      - Trigger WA Cloud API (opt)│
                                       │   8. Dedupe via KV (10min TTL)   │
                                       └──────────────────────────────────┘
                                                      │
                                                      ▼
                                       ┌──────────────────────────────────┐
                                       │   STORAGE (Cloudflare)           │
                                       │   • D1: leads, sessions, events  │
                                       │   • KV: dedupe (10min TTL)       │
                                       │   • Secrets: META_ACCESS_TOKEN,  │
                                       │              SHEETS_WEBHOOK_URL  │
                                       └──────────────────────────────────┘
```

### Request flow (1 event = ~200ms)

1. **Browser** fires event → `navigator.sendBeacon('/capi/track', body)`
2. **Worker** receives → validates schema
3. **Worker** enriches:
   - Real IP (CF-Connecting-IP)
   - Geo (CF-IPCountry, CF-Region, CF-City)
   - User agent
   - Referer (if any)
   - Server timestamp (timezone-correct)
4. **Worker** generates/extracts `event_id` (UUID v4)
5. **Worker** hashes PII (SHA-256: email, phone, name)
6. **Worker** dedupes via KV (10-min window by `event_id`)
7. **Worker** forwards to Meta CAPI:
   ```
   POST https://graph.facebook.com/v18.0/{pixel_id}/events
   ```
8. **Worker** saves to D1 (event + session + user)
9. **Worker** if lead → webhook to Google Sheets via Apps Script

---

## 6. 📁 FILE STRUCTURE

```
capi-gateway/                          # NEW: Cloudflare Worker project
├── src/
│   ├── index.ts                       # Main entry, routing
│   ├── handlers/
│   │   ├── track.ts                   # POST /track — main event endpoint
│   │   ├── health.ts                  # GET /health
│   │   └── debug.ts                   # GET /debug/events (last 100)
│   ├── services/
│   │   ├── meta-capi.ts               # Meta CAPI client
│   │   ├── enrich.ts                  # IP/UA/geo enrichment
│   │   ├── hash.ts                    # SHA-256 PII
│   │   ├── dedup.ts                   # KV dedupe
│   │   ├── sheets.ts                  # Google Sheets webhook
│   │   └── storage.ts                 # D1 query helpers
│   ├── types/
│   │   ├── event.ts                   # CapiEvent, CustomData, UserData
│   │   └── meta.ts                    # Meta CAPI types
│   └── utils/
│       ├── logger.ts                  # Structured JSON log
│       └── response.ts                # CORS, JSON helpers
├── migrations/
│   └── 0001_initial.sql               # D1 schema
├── wrangler.toml                      # Worker config
├── package.json
├── tsconfig.json
└── README.md

app/src/lib/                           # NEW: Browser tracking
├── track-beacon.ts                    # sendBeacon wrapper
├── track-engagement.ts                # Scroll / time / section observer
├── track-exit-intent.ts               # Exit intent detection
└── track-helpers.ts                   # event_id gen, dedup hint

app/src/components/astro/              # MODIFIED
└── AnalyticsBoot.astro                # + inject track-beacon + engagement

app/src/components/svelte/             # MODIFIED
├── LeadForm.svelte                    # + POST to CAPI before WA open
├── StickyMobileCTA.svelte             # + WA click → beacon
├── WhatsAppFloating.astro             # + WA click → beacon (server-side interceptor already in AnalyticsBoot)
└── KprSimulator.astro                 # + KPR calculate → beacon

app/src/pages/                          # MODIFIED (add 360 + article tracking)
├── resort.astro                      # 360 panorama view
└── artikel/[slug].astro               # article read 50%+
```

---

## 7. 💻 IMPLEMENTATION PHASES (12-16 jam kerja)

### Phase 1: Worker foundation (3-4 jam)
- [ ] `npm create cloudflare@latest` → capi-gateway
- [ ] `wrangler d1 create menantu-leads` → get database_id
- [ ] `wrangler kv:namespace create DEDUP` → get namespace_id
- [ ] D1 migration: `leads`, `sessions`, `events` tables
- [ ] TypeScript types: `CapiEvent`, `UserData`, `CustomData`
- [ ] `POST /track` route — receive + validate + log
- [ ] Deploy to `capi-gateway.<account>.workers.dev`
- [ ] Smoke test with `curl POST /track {event: "PageView"}`

### Phase 2: Meta CAPI integration (2-3 jam)
- [ ] `services/meta-capi.ts` — POST to graph.facebook.com
- [ ] SHA-256 hashing (`services/hash.ts`)
- [ ] `services/enrich.ts` — CF-Connecting-IP, CF-IPCountry, etc.
- [ ] `services/dedup.ts` — KV-based 10-min dedupe
- [ ] Test Events di Meta Events Manager (pixel: 866468102744117)
- [ ] Verify `event_id` matches browser pixel for dedup

### Phase 3: D1 storage + lead persistence (1-2 jam)
- [ ] D1 schema migration:
  ```sql
  CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT UNIQUE NOT NULL,
    event_name TEXT NOT NULL,
    event_time INTEGER NOT NULL,
    user_email_hash TEXT,
    user_phone_hash TEXT,
    user_name_hash TEXT,
    ip_country TEXT,
    ip_city TEXT,
    user_agent TEXT,
    page_path TEXT,
    custom_data TEXT,  -- JSON
    source TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  );
  CREATE INDEX idx_events_email ON events(user_email_hash);
  CREATE INDEX idx_events_phone ON events(user_phone_hash);
  CREATE INDEX idx_events_time ON events(event_time);

  CREATE TABLE leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    villa_pref TEXT,
    message TEXT,
    source TEXT,
    page_path TEXT,
    ip_country TEXT,
    user_agent TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  );
  CREATE INDEX idx_leads_phone ON leads(phone);
  CREATE INDEX idx_leads_email ON leads(email);
  CREATE INDEX idx_leads_created ON leads(created_at);
  ```
- [ ] `services/storage.ts` — `saveEvent()`, `saveLead()`, `getRecentLeads()`

### Phase 4: Google Sheets webhook (1-2 jam)
- [ ] Google Apps Script (GAS) — webhook URL
- [ ] GAS handler — append row to sheet
- [ ] `services/sheets.ts` — POST to GAS webhook
- [ ] Sheet schema:
  ```
  A: timestamp
  B: name
  C: phone
  D: email
  E: villa_pref
  F: source
  G: page_path
  H: ip_country
  I: utm_source
  J: utm_medium
  K: utm_campaign
  L: user_agent
  M: event_id
  N: notes
  ```
- [ ] Test with curl → verify row appears

### Phase 5: Browser beacon integration (2-3 jam)
- [ ] `app/src/lib/track-beacon.ts`:
  ```ts
  const CAPI_URL = 'https://capi.menantu-resort.com/track';

  export function beacon(eventName, params) {
    const eventId = params.event_id || crypto.randomUUID();
    if (navigator.sendBeacon) {
      navigator.sendBeacon(CAPI_URL, JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        url: location.href,
        referer: document.referrer,
        user_data: { em: hash(params.email), ph: hash(params.phone), fn: hash(params.firstName), ln: hash(params.lastName) },
        custom_data: params,
      }));
    }
    return eventId;
  }
  ```
- [ ] `app/src/lib/track-engagement.ts`:
  - Scroll depth: 25/50/75/100% via IntersectionObserver on `<body>`
  - Time on page: `document.hidden` listener, active time accumulator
  - Section visibility: tag all `<h2>` with `data-section-id`, observe
  - Heartbeat: every 30s, batch fire pending events
- [ ] `app/src/lib/track-exit-intent.ts`:
  - `mouseleave` on `document.documentElement` (top of viewport) → fire `Contact` custom
  - Listen only once per page
- [ ] `AnalyticsBoot.astro` — inject beacon + engagement scripts after consent
- [ ] `LeadForm.svelte` — POST to beacon BEFORE `gtag_report_conversion` opens WA
- [ ] `WhatsAppFloating.astro` + `StickyMobileCTA.svelte` — fire beacon alongside fbq

### Phase 6: Test & verify (2-3 jam)
- [ ] **Test 1: Dedup**
  - Submit lead form
  - Verify 1 event in Meta Events Manager (browser fbq + server CAPI deduped by event_id)
- [ ] **Test 2: Lead persistence**
  - Submit form, close tab immediately
  - Verify row in Google Sheet + D1 `leads` table
- [ ] **Test 3: Engagement signals**
  - Scroll to 50% on villa page, leave open 60s
  - Verify `ViewContent` (scroll_50) + `ViewContent` (time_60s) in Meta + D1
- [ ] **Test 4: Section visibility**
  - View "ROI 10% guarantee" section
  - Verify event with `section_id: 'roi_guarantee'`
- [ ] **Test 5: Exit intent**
  - Move mouse to top of viewport on /
  - Verify `Contact` (exit_intent) fires
- [ ] **Test 6: Ad-blocker bypass**
  - Enable uBlock Origin
  - Submit form
  - Verify lead still in Google Sheet (server-side)

### Phase 7: Production deploy (1 jam)
- [ ] `wrangler secret put META_ACCESS_TOKEN`
- [ ] `wrangler secret put SHEETS_WEBHOOK_URL`
- [ ] Custom domain: `capi.menantu-resort.com` (CNAME → Worker)
- [ ] Update CAPI_URL in browser beacon
- [ ] Deploy main site (lftp) — no changes needed, only beacon script
- [ ] Monitor 24h, check Test Events, dedup rate

---

## 8. 🔌 EVENT SCHEMA (TypeScript)

```ts
// types/event.ts
export interface CapiEvent {
  // Required
  event_name: 'PageView' | 'ViewContent' | 'Lead' | 'Contact' | 'Schedule'
              | 'AddToInfo' | 'Purchase' | string;
  event_id: string;        // UUID v4, MUST match browser fbq event_id
  event_time: number;      // Unix timestamp (sec)
  event_source_url: string; // Page URL

  // User data (hashed)
  user_data: {
    em?: string[];         // SHA-256 email
    ph?: string[];         // SHA-256 phone (E.164)
    fn?: string[];         // SHA-256 first name
    ln?: string[];         // SHA-256 last name
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;          // fbclid cookie
    fbp?: string;          // _fbp cookie
  };

  // Custom data
  custom_data?: {
    value?: number;
    currency?: 'IDR';
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;

    // Custom for Menantu
    villa_id?: 'bijak' | 'idaman' | 'mapan';
    villa_label?: string;
    villa_pref?: string;
    lead_type?: 'villa_inquiry' | 'brosur_request' | 'survey_request' | 'konsultasi';
    source?: string;       // 'floating_button', 'sticky_mobile_cta', 'lead_form', etc.
    page_path?: string;
    page_depth?: number;
    scroll_pct?: 25 | 50 | 75 | 100;
    time_on_page_sec?: number;
    section_id?: string;
    is_exit_intent?: boolean;
    is_form_prefilled?: boolean;

    // KPR
    kpr_amount?: number;
    kpr_tenor?: number;
    kpr_rate?: number;
    kpr_monthly?: number;

    // Article
    article_slug?: string;
    read_time_sec?: number;
  };

  // Source / action
  action_source: 'website' | 'app' | 'phone_call' | 'chat' | 'email' | 'other';

  // Optional
  opt_out?: boolean;
  event_metadata?: Record<string, string>;
}
```

---

## 9. 📊 BEHAVIOR TRACKING SPECS

### 9.1 Scroll Depth (25/50/75/100%)
**Trigger:** IntersectionObserver on document height
**Implementation:**
```ts
const thresholds = [0.25, 0.5, 0.75, 1.0];
const fired = new Set<string>();
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const ratio = Math.floor(entry.intersectionRatio * 4) / 4; // 0.25, 0.5, 0.75, 1
    if (entry.isIntersecting && ratio > 0 && !fired.has(`scroll_${ratio}`)) {
      fired.add(`scroll_${ratio}`);
      beacon('ViewContent', { scroll_pct: ratio * 100, content_name: `scroll_${ratio * 100}pct` });
    }
  }
}, { threshold: thresholds });
observer.observe(document.body);
```

### 9.2 Time on Page (active time only)
**Trigger:** `visibilitychange` + `beforeunload`
**Implementation:**
```ts
let activeTime = 0;
let lastActive = Date.now();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    activeTime += Date.now() - lastActive;
  } else {
    lastActive = Date.now();
  }
});
// Fire at 30s, 60s, 120s, 300s marks
const marks = [30, 60, 120, 300];
const fired = new Set<number>();
setInterval(() => {
  const total = activeTime + (document.hidden ? 0 : Date.now() - lastActive);
  const next = marks.find(m => total >= m * 1000 && !fired.has(m));
  if (next) { fired.add(next); beacon('ViewContent', { time_on_page_sec: next }); }
}, 5000);
```

### 9.3 Section Visibility (h2/h3)
**Trigger:** IntersectionObserver on section markers
**Implementation:**
```ts
// Add data-section-id to all h2/h3 in build
// (or query: document.querySelectorAll('h2, h3'))
const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const id = entry.target.dataset.sectionId || entry.target.textContent.slice(0, 50);
      beacon('ViewContent', { section_id: id, content_name: id });
    }
  }
}, { threshold: 0.5 });
document.querySelectorAll('h2, h3').forEach(el => sectionObserver.observe(el));
```

### 9.4 Exit Intent
**Trigger:** `mouseleave` on `documentElement` when y < 0
**Implementation:**
```ts
let fired = false;
document.documentElement.addEventListener('mouseleave', (e) => {
  if (e.clientY < 10 && !fired) {
    fired = true;
    beacon('Contact', { is_exit_intent: true, source: 'exit_intent' });
  }
});
```

---

## 10. 📊 GOOGLE SHEETS INTEGRATION

### Apps Script Webhook

**Setup:**
1. Buat Google Sheet baru: `Menantu Resort — Leads Dashboard`
2. Extensions → Apps Script → paste:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  const row = [
    new Date().toISOString(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.villa_pref || '',
    data.source || '',
    data.page_path || '',
    data.ip_country || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.user_agent || '',
    data.event_id || '',
    '' // notes (manual)
  ];
  sheet.appendRow(row);
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, row: sheet.getLastRow() }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → Web app → Anyone with link → Copy URL
4. `wrangler secret put SHEETS_WEBHOOK_URL` → paste URL

**Worker integration:**
```ts
// services/sheets.ts
export async function notifySheets(lead: Lead): Promise<void> {
  const url = env.SHEETS_WEBHOOK_URL;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  });
}
```

---

## 11. 🔁 DEDUPLICATION STRATEGY

### Event ID generation
- **Browser:** `crypto.randomUUID()` at event creation
- **Worker:** extract from request body, generate if missing

### Server-side dedup (KV)
```ts
// services/dedup.ts
export async function isDuplicate(eventId: string): Promise<boolean> {
  const key = `dedup:${eventId}`;
  const existing = await env.DEDUP.get(key);
  if (existing) return true;
  await env.DEDUP.put(key, '1', { expirationTtl: 600 }); // 10 min
  return false;
}
```

### Client-server dedup (Meta)
- Browser fbq fires with `event_id: 'abc-123'`
- Worker forwards to Meta CAPI with same `event_id: 'abc-123'`
- Meta auto-dedupes

---

## 12. 🧪 TEST PLAN

| Test | Action | Expected |
|---|---|---|
| T1: Connectivity | `curl POST /track {event:"PageView"}` | 200 OK |
| T2: Meta CAPI dedup | Submit form, check Meta Events Manager | 1 event (not 2) |
| T3: Lead persistence | Submit form, close tab, check Sheet | Row appears in <5s |
| T4: D1 save | `wrangler d1 execute --command "SELECT * FROM leads ORDER BY id DESC LIMIT 5"` | New row |
| T5: Scroll 50% | Scroll, wait 5s, check Meta | `ViewContent` with `scroll_pct: 50` |
| T6: Time 60s | Stay on page 65s, check Meta | `ViewContent` with `time_on_page_sec: 60` |
| T7: Section view | Scroll to "ROI 10% guarantee" h2, check Meta | `ViewContent` with `section_id: 'roi-guarantee'` |
| T8: Exit intent | Mouse to top, check Meta | `Contact` with `is_exit_intent: true` |
| T9: Ad-blocker | uBlock Origin ON, submit form | Lead still in Sheet (server-side) |
| T10: Consent denied | Decline cookies, submit form | Beacon still fires (server-side) |
| T11: KV dedup | Same event_id POSTed 2x | Only 1 in Meta |
| T12: D1 retention | `SELECT * FROM events WHERE created_at < now - 90d` | Auto-cleaned via cron |

---

## 13. 💰 COST ESTIMATE

| Item | Free tier | Est. usage | Cost |
|---|---|---|---|
| Cloudflare Worker | 100k req/day | ~5-20k req/day | $0 |
| Cloudflare D1 | 5M rows read, 100k write/day | ~1k write/day | $0 |
| Cloudflare KV | 100k read, 1k write/day | ~5k read/day | $0 |
| Google Sheets API | Unlimited (via Apps Script) | ~50 rows/day | $0 |
| Domain (capi.menantu-resort.com) | Existing | — | $0 |
| **Total** | | | **$0/bln** |

---

## 14. 📂 DEPLOYMENT ARTIFACTS (after build)

```
capi-gateway/                  # Subdir di menantu-resort.com repo (atau separate repo)
app/src/lib/track-*.ts         # Git: menantu-resort.com
```

`wrangler.jsonc` (canonical, lihat `capi-gateway/wrangler.jsonc`):
```jsonc
{
  "name": "menantu-capi-gateway",
  "compatibility_date": "2026-06-30",
  "compatibility_flags": ["nodejs_compat"],
  "main": "./dist/_worker.js/index.js",
  "observability": { "enabled": true, "head_sampling_rate": 1.0 },
  "placement": { "mode": "smart" },
  "routes": [
    { "pattern": "menantucapi.beriklan.co.id", "custom_domain": true }
  ],
  "vars": {
    "SITE_URL": "https://menantu-resort.com",
    "META_PIXEL_ID": "866468102744117",
    "META_API_VERSION": "v18.0",
    "ALLOWED_ORIGIN": "https://menantu-resort.com",
    "ENVIRONMENT": "production"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "menantu-leads",
      "database_id": "<from wrangler d1 create>",
      "migrations_dir": "migrations"
    }
  ],
  "kv_namespaces": [
    { "binding": "DEDUP", "id": "<from wrangler kv:namespace create>" }
  ]
}
```

**Secrets** (set via `wrangler secret put`):
- `META_ACCESS_TOKEN` — Meta System User Token (bukan Personal Access Token)
- `SHEETS_WEBHOOK_URL` — Google Apps Script webhook (opsional, untuk sales sheet)
- `ADMIN_API_KEY` — Random 32+ char, untuk akses admin UI

---

## 15. 📋 DECISIONS LOG

| Decision | Choice | Reason |
|---|---|---|
| Architecture | Cloudflare Worker | Free, fast, separate, scalable |
| Storage | D1 (relational) | Lead data needs queries by email/phone |
| Dedup | KV (10min TTL) | Cheap, fast, no false positives |
| CRM | Google Sheets | User requested simple, free |
| WhatsApp follow-up | **NOT IN SCOPE v1** | But event data persisted, easy to add later via same Worker |
| Event_id source | UUID v4 in browser | Standard, matches Meta spec |
| Schema | Standard Meta + custom fields | Mix in `custom_data` |
| Time tracking | Active time only (idle excluded) | More accurate engagement |
| Behavior triggers | All 4: scroll / time / section / exit | User requested all |

---

## 16. 🚧 OPEN ITEMS (defer to v1.1)

- [ ] **WhatsApp Cloud API** — auto-reply template saat lead masuk. Butuh Meta Business verification. Bisa ditambah nanti tanpa ubah arsitektur.
- [ ] **Retargeting audiences** — sync 3+ PageView 0 Lead ke Meta Custom Audience
- [ ] **Server-side booking confirmation** — POST `Purchase` event saat sales input manual
- [ ] **Heatmap integration** (Hotjar/Microsoft Clarity)
- [ ] **A/B testing** — variant assignment via CAPI
- [ ] **Email follow-up** (Mailchimp integration)

---

## 17. 📚 REFERENCES

- [Meta Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Meta CAPI Event Deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [Meta CAPI Parameters](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare KV](https://developers.cloudflare.com/kv/)
- [Navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)
- [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)

---

## 18. 🚀 NEXT STEPS (when ready to code)

1. Load skill `cloudflare` + `workers-best-practices` + `wrangler`
2. Setup Worker project (Phase 1)
3. Build incrementally, test each phase
4. Deploy to production in one shot after Phase 6 passes
5. Update AGENTS.md to reference this doc + new files

**Owner:** dev team
**Estimated effort:** 12-16 jam kerja (1-2 sprint)
**Priority:** HIGH (current lead capture = 0% reliable)

---

## 20. 🎨 CUSTOM CRM — Design Spec (Added 30 Jun 2026)

> **Decision:** Custom CRM (Astro + D1), bukan Notion/HubSpot.
> **Reason:** Full control, no vendor lock-in, integrates natively dengan CAPI Gateway.

### 20.1 Why custom over Notion/HubSpot

| Aspek | Notion | HubSpot Free | **Custom (pilih ini)** |
|---|---|---|---|
| Cost | $0 | $0 | $0 |
| Setup time | 1-2 hari | 2-3 hari | 5-8 hari (one-time) |
| Vendor lock-in | Medium | High | None (open source) |
| Native CAPI integration | Manual sync | Zapier | **Native** (same Worker) |
| Custom events | Limited | Limited | **Unlimited** |
| Real-time dashboard | View-only | View-only | **Full CRUD + charts** |
| WhatsApp follow-up | Third-party | Built-in | **Native (Phase 2)** |
| Email follow-up | Gmail/Outlook | HubSpot | **Resend (Phase 2)** |
| Team collaboration | Yes | Yes | **Yes (via CF Access)** |
| Mobile UX | Native app | Native app | **Responsive web (v1)** |

### 20.2 Architecture

Single Astro 5 project on Cloudflare Worker. Same domain (`menantucapi.beriklan.co.id`) hosts both API + admin UI.

```
menantucapi.beriklan.co.id
├── /api/*        — JSON API (CORS-protected, Bearer auth for admin)
├── /admin/*      — HTML UI (browser-side, API key in localStorage)
├── /             — Landing / API docs (plain text)
└── /static/*     — Built assets (favicon, etc.)
```

### 20.3 Database schema (D1)

3 tables: `leads`, `events`, `activities`. Full SQL di `capi-gateway/migrations/0001_initial.sql`.

**leads** — one row per unique lead:
- Identity: `event_id`, `name`, `phone`, `email`
- Context: `villa_pref`, `source`, `page_path`, `message`
- Geo/device: `ip_country`, `ip_city`, `user_agent`
- UTM: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referer`
- CRM: `status` (new/contacted/qualified/tour_scheduled/won/lost/abandoned), `score`, `assigned_to`, `notes`, `tags`
- Timestamps: `created_at`, `updated_at`, `last_contacted_at`, `last_activity_at`

**events** — every CAPI event (Lead, ViewContent, Contact, etc.) with hashed PII + Meta response code.

**activities** — per-lead activity log (notes, calls, status changes) for full history.

### 20.4 API endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/track` | Origin check | CAPI event intake from browser |
| GET | `/api/leads` | Bearer | List leads (filter: status, source, search) |
| GET | `/api/leads/:id` | Bearer | Get lead detail + activities |
| PATCH | `/api/leads/:id` | Bearer | Update lead (status, notes, assigned_to) |
| GET | `/api/stats` | Bearer | Dashboard aggregates |
| GET | `/api/health` | Public | Health check |

### 20.5 Admin UI (Astro pages)

- `/admin` — Dashboard (8 stat cards + top sources/villa + recent leads)
- `/admin/leads` — Lead list (filter by status, search, sort)
- `/admin/leads/:id` — Lead detail + activity timeline + edit form

Auth: simple API key (set via `wrangler secret put ADMIN_API_KEY`). User enters on first visit, stored in localStorage. For multi-user + SSO, swap to Cloudflare Access (free for 50 users).

### 20.6 Status workflow

```
new → contacted → qualified → tour_scheduled → won
                       ↓
                     lost / abandoned
```

Transitions logged as `activities` (type='status_change') with timestamp + user.

### 20.7 Future enhancements (v2)

- [ ] WhatsApp Cloud API auto-reply (per event)
- [ ] Email follow-up via Resend (template-based)
- [ ] Multi-user + role-based access (Cloudflare Access)
- [ ] CSV export per lead list
- [ ] Lead scoring algorithm (engagement signals)
- [ ] Slack/Discord webhook for new leads
- [ ] Mobile-optimized PWA (offline mode for sales team)
- [ ] Audit log (who changed what, when)

### 20.8 Files

```
capi-gateway/
├── wrangler.jsonc
├── package.json
├── astro.config.mjs
├── migrations/0001_initial.sql
├── README.md
└── src/
    ├── env.d.ts
    ├── lib/
    │   ├── hash.ts          # SHA-256 PII
    │   ├── dedup.ts         # KV dedup
    │   ├── meta-capi.ts     # Meta CAPI client
    │   ├── sheets.ts        # Google Sheets webhook
    │   ├── storage.ts       # D1 queries (leads, events, activities)
    │   ├── auth.ts          # Bearer + CORS
    │   └── logger.ts        # Structured JSON logs
    └── pages/
        ├── index.ts
        ├── admin/
        │   ├── index.astro
        │   └── leads/
        │       ├── index.astro
        │       └── [id].astro
        └── api/
            ├── track.ts
            ├── health.ts
            ├── stats.ts
            └── leads/
                ├── index.ts
                └── [id].ts
```

---

## 19. 📝 LEAD FORM — Component Spec (Updated 30 Jun 2026)

> **File:** `app/src/components/svelte/LeadForm.svelte`
> **Status:** ✅ Refactored to reusable component with persuasive copy (NO FOMO)
> **CAPI-ready:** Yes — `sendBeacon` ke gateway fires BEFORE WhatsApp opens

### 19.1 Design Goals

| Goal | Implementation |
|---|---|
| **Reusable anywhere** | Svelte 5 `$props()` — semua copy, trigger, behavior configurable |
| **NO FOMO copy** | Removed "respon 5 menit", "diskon terbatas" — diganti trust signals |
| **NO "belum yakin"** | Villa select hanya 3 opsi (Bijak, Idaman, Mapan) |
| **Persuasive, not pushy** | Cialdini's principles: reciprocity, authority, specificity, risk reversal |
| **Beautiful** | Sharp corners, gold top-border, Playfair headline, value-prop pills |
| **Frame as form submit, not chat** | CTA "Kirim Simulasi Personal" + Send icon + WhatsApp as hint |
| **Lead persists even if user leaves** | `sendBeacon` fires before WA opens |

### 19.2 Copy Strategy (No FOMO, Persuasive)

**Removed (FOMO/simulation):**
- ❌ "Tim Sahid akan menghubungi Anda dalam **5 menit**" → fake promise, can't guarantee
- ❌ "Diskon Rp 200 juta terbatas" → creates pressure, not trust
- ❌ "16 unit tersisa" → not relevant to form intent (not a purchase form)
- ❌ "Belum yakin, butuh konsultasi" → too indecisive, removes from intent

**Added (persuasive principles):**

| Principle | Copy Element | Example |
|---|---|---|
| Reciprocity | "Gratis" in disclaimer | "Gratis · Tanpa komitmen · Data aman" |
| Authority | "Sahid 50+ tahun" | "Tim konsultan Sahid" |
| Specificity | Concrete numbers | "Simulasi yield 9–15% p.a." |
| Risk reversal | "Tanpa komitmen" | Same disclaimer |
| Personalization | "Untuk profil Anda" | "Simulasi sesuai profil investasi Anda" |
| Concrete deliverable | 3 value props | "Simulasi yield, Proyeksi cicilan, Rekomendasi villa" |

**Final copy (default):**
- Badge: `Simulasi Personal`
- Headline: `Rencanakan` *(italic gold)* `Investasi Villa Anda`
- Subhead: `Tim konsultan Sahid akan menghubungi Anda via WhatsApp untuk menyusun rekomendasi villa, simulasi yield, dan proyeksi cicilan sesuai profil investasi Anda.`
- Value props (3 pills):
  - `Simulasi yield 9–15% p.a. sesuai profil Anda`
  - `Proyeksi cicilan KPR Bank & Developer`
  - `Rekomendasi villa dari 3 tipe (Bijak, Idaman, Mapan)`
- Submit: `Kirim Simulasi Personal` (with Send icon)
- Submit hint: `→ Via WhatsApp`
- Disclaimer: `Gratis · Tanpa komitmen · Data aman sesuai UU PDP`

### 19.3 Component API (Props)

```ts
interface LeadFormProps {
  // --- Trigger behavior ---
  trigger?: 'auto' | 'manual' | 'scroll' | 'time';  // default: 'auto'
  triggerDelay?: number;        // ms for time/auto, default 30000
  triggerScrollPx?: number;     // px for scroll/auto, default 1500
  dismissible?: boolean;        // default true

  // --- Display ---
  showVilla?: boolean;          // default true
  showEmail?: boolean;          // default true

  // --- Copy (all overrideable) ---
  badge?: string;
  headlinePart1?: string;
  headlinePart2?: string;       // rendered as italic gold
  subhead?: string;
  valueProps?: string[];
  submitLabel?: string;
  submittingLabel?: string;
  submitHint?: string;
  successTitle?: string;
  successBody?: string;
  disclaimer?: string;

  // --- Villa options ---
  villaOptions?: Array<{ value: string; label: string }>;
  defaultVilla?: string;

  // --- Tracking ---
  source?: string;              // tracked in WA message + beacon
  capiEndpoint?: string;        // default '/capi/track'
  leadValue?: number;           // IDR, for Smart Bidding
}
```

**Public methods (via `bind:this`):**
- `show()` — programmatically show modal
- `hide()` — programmatically hide
- `reset()` — clear all state (for re-use across SPA routes)

### 19.4 Usage Patterns

**Default (auto modal in BaseLayout):**
```svelte
<LeadForm client:idle />
```
Triggers 30s idle OR 1500px scroll. Shows once per session (sessionStorage flag).

**Manual trigger from a button (e.g., hero CTA):**
```svelte
<script>
  let formRef;
</script>

<LeadForm bind:this={formRef} trigger="manual" source="hero_cta" />
<button onclick={() => formRef?.show()}>Konsultasi Gratis</button>
```

**Custom copy for landing page:**
```svelte
<LeadForm
  badge="VIP Konsultasi"
  headlinePart1="Akses"
  headlinePart2="Konsultasi Eksklusif"
  submitLabel="Mulai Konsultasi VIP"
  source="vip_landing"
  villaOptions={[
    { value: 'mapan', label: 'Mapan — Rp 2 M (Most Premium)' },
    { value: 'idaman', label: 'Idaman — Rp 1,6 M' }
  ]}
  defaultVilla="mapan"
  client:load
/>
```

**KPR-specific landing:**
```svelte
<LeadForm
  badge="Simulasi KPR"
  headlinePart1="Hitung"
  headlinePart2="Cicilan Anda"
  valueProps={[
    'Cicilan KPR Bank mulai Rp 9 jt/bulan',
    'Bunga flat 5%, tenor sampai 20 tahun',
    'Simulasi dalam 60 detik via WhatsApp'
  ]}
  submitLabel="Hitung Cicilan Saya"
  source="kpr_landing"
  client:visible
/>
```

### 19.5 CAPI Integration Flow

```
User clicks "Kirim Simulasi Personal"
        ↓
[1] sendBeacon('/capi/track', { event_name: 'Lead', event_id: uuid })
        ↓
[2] fbq('track', 'Lead', { event_id: same uuid })
        ↓
[3] async: mrAnalytics.trackLead() (Enhanced Conversions)
        ↓
[4] gtag_report_conversion(waUrl) → opens WhatsApp in new tab
        ↓
[5] show success state → auto-dismiss in 7s
```

**Critical: sendBeacon happens BEFORE WhatsApp opens.** If user closes tab between submit and WA load, the lead is still captured server-side.

**Event payload (CAPI gateway receives):**
```json
{
  "event_name": "Lead",
  "event_id": "550e8400-e29b-41d4-a716-446655440000",
  "event_time": 1719748800,
  "event_source_url": "https://menantu-resort.com/villa/idaman/",
  "action_source": "website",
  "user_data": {
    "firstName": "Budi",
    "lastName": "Santoso",
    "phone": "+6281234567890",
    "email": "budi@email.com"
  },
  "custom_data": {
    "value": 10000000,
    "currency": "IDR",
    "lead_type": "simulation_request",
    "villa_pref": "idaman",
    "source": "lead_form",
    "content_name": "simulation_request",
    "content_category": "villa_investment"
  }
}
```

**Worker hashes PII + forwards to Meta CAPI + saves to D1 + webhook to Google Sheets.**

### 19.6 Design Notes (Visual)

| Element | Choice | Why |
|---|---|---|
| **Top border** | `border-t-4 border-gold-500` | Signature gold accent, premium feel |
| **Modal width** | `max-w-lg` (was `max-w-md`) | More breathing room for 3 value props + form |
| **Headline font** | Playfair Display 3xl → 4xl | Editorial feel, brand-consistent |
| **Italic accent** | `headlinePart2` in gold-700 italic | Draws eye to value keyword |
| **Value props** | `border-l-2 border-gold-500 pl-4` + check icons | Editorial "pull quote" feel |
| **Submit button** | Forest-900 bg + cream-50 text | Primary brand color, "official" feel (not chat) |
| **Submit icon** | `Send` (not WhatsApp icon) | Reframes action as form submit |
| **Submit hint** | `→ Via WhatsApp` below | Honest about destination |
| **Disclaimer** | `Gratis · Tanpa komitmen · Data aman` | Reciprocity + risk reversal + trust |
| **Loading state** | Spinner + "Mengirim..." | Reassures during async operations |
| **Success state** | CheckCircle2 + "Simulasi Anda Terkirim" | Acknowledgment, sets expectation (no time promise) |

### 19.7 Backward Compatibility

- Default props match old behavior — `<LeadForm client:idle />` works unchanged
- `bind:this` pattern: parents can use new `open()`/`close()`/`reset()` methods
- `source` prop now first-class — better attribution across embeds
- `villaOptions` prop replaces hardcoded list — drop-in compatible (just 3 options by default vs old 4)

### 19.8 What Changed vs Old Component

| Aspect | Old | New |
|---|---|---|
| Reusability | Hardcoded for one place | `$props()` — all config |
| CTA button | "Chat WhatsApp Sekarang" + WA icon | "Kirim Simulasi Personal" + Send icon |
| Subhead | "Tim Sahid akan menghubungi dalam 5 menit" (FOMO) | Trust signals, no time promise |
| Villa options | 4 (incl. "Belum yakin") | 3 (Bijak, Idaman, Mapan) |
| Default villa | `belum-tahu` | `idaman` (mid-tier, most popular) |
| Form frame | "Konsultasi WhatsApp" | "Kirim Simulasi Personal" (form submit) |
| Value props | None | 3 benefit pills (yield, cicilan, rekomendasi) |
| CAPI integration | None (browser-only) | `sendBeacon` to gateway + fbq dedup |
| Public methods | None | `show()`, `hide()`, `reset()` |
| Modal width | `max-w-md` | `max-w-lg` (wider, more premium) |
| Border | `border-2 border-gold-500` (full) | `border-t-4 border-gold-500` (signature top) |
| Disclaimer | "Respon 5 menit · Tanpa spam · UU PDP" (FOMO + redundant) | "Gratis · Tanpa komitmen · Data aman" (3 trust signals) |

### 19.9 InlineLeadForm.svelte — Companion (Inline variant)

> **File:** `app/src/components/svelte/InlineLeadForm.svelte`
> **Used in:** `index.astro`, `promo.astro`, `investasi/index.astro`, `PromoHero.svelte`

Same copy principles, inline (non-modal) layout. Used in landing pages where modal would interrupt the flow.

| Aspect | InlineLeadForm (was) | InlineLeadForm (now) |
|---|---|---|
| Badge | "Konsultasi Gratis" | "Simulasi Personal" |
| Subhead | "Tim Sahid akan menghubungi dalam 5 menit" | Trust signals, no time promise |
| Villa options | 4 (incl. "Konsultasi dulu (belum yakin)") | 3 (Bijak, Idaman, Mapan) |
| CTA | "Kirim Simulasi via WhatsApp" + WA icon | "Kirim Simulasi Personal" + Send icon |
| Submit hint | (none) | "→ Via WhatsApp" |
| Trust line | "Data aman · Respon 5 menit · UU PDP" | "Gratis · Tanpa komitmen · Data aman" |
| CAPI integration | None (browser-only) | `sendBeacon` to gateway + fbq dedup |
| Loading state | "Menghubungkan ke WhatsApp..." | "Mengirim..." + spinner |
| Success state | "WhatsApp Terbuka!" + "Mereka akan merespon dalam 5 menit" | "Simulasi Anda Terkirim" + honest next-step body |

### 19.10 Consolidation Path (v1.1, non-blocking)

Currently **2 components**: `LeadForm.svelte` (modal) + `InlineLeadForm.svelte` (inline). Both share copy principles but have separate codebases.

**v1.1 plan:** Merge into single `LeadForm.svelte` with `variant: 'modal' | 'inline' | 'sticky'` prop. Backward-compatible wrapper exports:
```ts
// app/src/components/svelte/InlineLeadForm.svelte (v1.1)
export { default as InlineLeadForm } from './LeadForm.svelte';
// Override default props for inline usage
```
No breaking changes for pages already importing `InlineLeadForm`.

---

*Designed 30 Juni 2026. Approved by project owner. Pending Worker implementation.*
