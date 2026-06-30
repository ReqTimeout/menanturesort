# 🚀 DEPLOY CAPI GATEWAY — Cloudflare Worker

> **Last verified:** 30 Juni 2026
> **Stack:** Astro 5 + @astrojs/cloudflare + D1 + KV
> **Custom domain:** `menantucapi.beriklan.co.id`
> **Repo:** `capi-gateway/` (di root project Menantu Resort)

---

## 📋 PRASYARAT

- Cloudflare account (free tier cukup — D1 + KV + Worker semua ada di free)
- Domain `beriklan.co.id` sudah di Cloudflare (atau add sebagai site)
- Meta Business account dengan **System User Token** (bukan Personal Access Token)
- Wrangler CLI terinstall: `npm install -g wrangler`
- Node.js 18.17+ dan npm
- Akses ke repo `menantu-resort.com` (untuk jalanin deploy)

---

## 🚀 STEP-BY-STEP DEPLOY (pertama kali)

### STEP 1: Login Cloudflare via Wrangler

```bash
cd capi-gateway
wrangler login
# Browser akan terbuka — authorize Wrangler
```

### STEP 2: Create D1 database

```bash
wrangler d1 create menantu-leads
```

**Output:**
```
✅ Successfully created DB 'menantu-leads' in region APAC
database_id = "a1b2c3d4-e5f6-..."
```

**Copy `database_id` ke `wrangler.jsonc`:**
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "menantu-leads",
      "database_id": "a1b2c3d4-e5f6-...",  // ← paste here
      "migrations_dir": "migrations"
    }
  ]
}
```

### STEP 3: Create KV namespace

```bash
wrangler kv:namespace create DEDUP
```

**Output:**
```
✅ Successfully created namespace 'DEDUP'
id = "f1e2d3c4b5..."
```

**Copy ke `wrangler.jsonc`:**
```jsonc
{
  "kv_namespaces": [
    {
      "binding": "DEDUP",
      "id": "f1e2d3c4b5..."  // ← paste here
    }
  ]
}
```

### STEP 4: Run migrations

**Local first (testing):**
```bash
npm run db:migrate:local
```

**Remote (production):**
```bash
npm run db:migrate:remote
```

Expected output:
```
🌀 Mapping local DB...
🌀 Executing migration 0001_initial.sql...
✅ Migration complete!
```

### STEP 5: Setup Meta CAPI access token

1. Buka https://business.facebook.com/settings/system-users
2. **System Users** → Create new user (Admin, Full Control)
3. **Generate Token** → pilih app `Menantu Resort`
4. Pilih permissions:
   - `ads_management`
   - `business_management`
   - `pages_show_list` (optional, untuk CAPI verify)
5. Copy token (terlihat sekali saja!)

**Set di Worker:**
```bash
npm run secret:meta
# Paste token, Enter
```

### STEP 6: Setup Google Sheets webhook (opsional tapi recommended)

1. Buka Google Sheet baru: `Menantu Resort — Leads Dashboard`
2. Setup kolom (row 1):
   ```
   A1: Timestamp | B1: Name | C1: Phone | D1: Email | E1: Villa | F1: Source |
   G1: Page | H1: Country | I1: UTM Source | J1: UTM Medium | K1: UTM Campaign |
   L1: User Agent | M1: Event ID | N1: Notes
   ```
3. **Extensions → Apps Script**
4. Paste code berikut:
   ```javascript
   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const data = JSON.parse(e.postData.contents);
       const row = [
         data.timestamp || new Date().toISOString(),
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
         data.notes || ''
       ];
       sheet.appendRow(row);
       return ContentService
         .createTextOutput(JSON.stringify({ success: true, row: sheet.getLastRow() }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ success: false, error: err.message }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
5. **Deploy → New deployment → Web app**
6. **Execute as:** Me
7. **Who has access:** Anyone
8. **Deploy** → Copy URL
9. Set di Worker:
   ```bash
   npm run secret:sheets
   # Paste Apps Script URL
   ```

### STEP 7: Setup Admin API Key (untuk akses admin UI)

```bash
# Generate random key (save this somewhere safe!)
openssl rand -base64 32
# Output: e.g. "mr_crm_AbCdEf123..."

# Set di Worker
npm run secret:admin
# Paste the key
```

**Save key ini!** Akan diminta saat pertama kali buka `/admin`.

### STEP 8: Setup custom domain

**Option A — via wrangler:**
```bash
# Domain sudah di Cloudflare via parent account
wrangler routes put menantucapi.beriklan.co.id/*
# Atau edit wrangler.jsonc (sudah ada di config):
"routes": [
  { "pattern": "menantucapi.beriklan.co.id", "custom_domain": true }
]
```

**Option B — via Cloudflare Dashboard:**
1. Buka **Workers & Pages** → pilih Worker `menantu-capi-gateway`
2. **Settings → Triggers → Custom Domains**
3. **Add Custom Domain** → `menantucapi.beriklan.co.id`
4. Cloudflare otomatis create DNS record

### STEP 9: Generate types

```bash
npm run types
```

Ini generate `worker-configuration.d.ts` dengan binding types yang benar. Auto-detected dari wrangler config.

### STEP 10: Test locally (opsional)

```bash
npm run dev
# Astro dev server jalan di :4321
# Test: curl http://localhost:4321/api/health
```

Expected:
```json
{
  "status": "ok",
  "duration_ms": 12,
  "checks": { "d1": "ok" },
  "env": "production"
}
```

### STEP 11: Deploy to production

```bash
npm run deploy
```

Expected:
```
Uploaded menantu-capi-gateway (3.45 sec)
Published menantu-capi-gateway (1.23 sec)
  menantucapi.beriklan.co.id
```

### STEP 12: Verify

```bash
# Health check
curl https://menantucapi.beriklan.co.id/api/health

# Landing
curl https://menantucapi.beriklan.co.id/

# Admin
open https://menantucapi.beriklan.co.id/admin
# Masukkan ADMIN_API_KEY → masuk dashboard
```

### STEP 13: Enable CAPI di Main Site

Edit `app/src/layouts/BaseLayout.astro`:
```astro
<LeadForm enableCAPI={true} client:only="svelte" />
```

Build + deploy main site:
```bash
cd /Users/maabook/Desktop/menantu-resort.com
./deploy-lftp.sh
```

---

## 🔄 UPDATE / REDEPLOY

Setiap kali ada code change:

```bash
cd capi-gateway
npm run deploy
# Done! Cloudflare otomatis zero-downtime deploy
```

Lihat logs:
```bash
wrangler tail
# atau di Dashboard: Workers & Pages → menantu-capi-gateway → Logs
```

---

## 🛠️ TROUBLESHOOTING

### Error: "d1_databases[0].database_id is required"
→ Lupa paste `database_id` di wrangler.jsonc. Run `wrangler d1 create menantu-leads` lagi dan copy ID.

### Error: "Authentication error [code 4]" dari Meta CAPI
→ System User Token salah atau permissions kurang. Generate ulang di Business Settings.

### Error: 401 Unauthorized di /admin
→ `ADMIN_API_KEY` belum di-set atau key yang di-input salah. Run `wrangler secret put ADMIN_API_KEY` di Worker, lalu input key yang sama persis.

### Google Sheets tidak ter-update
1. Pastikan Apps Script di-deploy sebagai **Web app** (bukan hanya saved)
2. **Who has access:** Anyone (bukan "Only myself")
3. Cek Execution Log di Apps Script editor untuk error detail
4. Verify `SHEETS_WEBHOOK_URL` di Worker secret

### CORS error dari main site
- Verify `ALLOWED_ORIGIN` di wrangler.jsonc = `https://menantu-resort.com` (tanpa trailing slash)
- Browser `Origin` header harus match

### D1 "no such table: leads"
→ Belum run migration. `npm run db:migrate:remote`

---

## 📊 POST-DEPLOY

### 1. Smoke test lead flow
1. Buka `https://menantu-resort.com/` di tab incognito
2. Isi form di Hero (nama, WhatsApp, email)
3. Submit → form akan fire ke CAPI
4. Cek:
   - `https://menantucapi.beriklan.co.id/admin` → lead baru muncul
   - Google Sheet → row baru
   - Meta Events Manager → Test Events → "PageView" + "Lead" diterima

### 2. Setup uptime monitor
- Endpoint: `https://menantucapi.beriklan.co.id/api/health`
- Expected: `{"status":"ok",...}`
- Recommended: UptimeRobot (free)

### 3. Setup Meta CAPI test
- Buka Meta Events Manager → pilih pixel `866468102744117`
- **Test Events** → masukkan `test_event` sebagai test code
- Submit form di main site
- Verify `Lead` event muncul dalam 30 detik

### 4. Backups
- D1 free tier: 5M rows, 100k writes/day — auto-backup daily
- Recommended: periodic export leads ke CSV (admin UI "Export" button — coming soon)

---

## 🔐 SECURITY CHECKLIST

- [ ] `META_ACCESS_TOKEN` di-set via `wrangler secret put` (bukan hardcode)
- [ ] `SHEETS_WEBHOOK_URL` di-set via secret
- [ ] `ADMIN_API_KEY` random 32+ char
- [ ] `ALLOWED_ORIGIN` set ke `https://menantu-resort.com` (production)
- [ ] `.env` & `.dev.vars` di-`.gitignore`
- [ ] D1 + KV IDs di-`wrangler.jsonc` BUKAN di source code (sudah benar)
- [ ] Custom domain pakai HTTPS otomatis (Cloudflare)
- [ ] CORS preflight di-handle (`Access-Control-Allow-Origin: https://menantu-resort.com`)

---

## 💰 COST

| Item | Free tier | Est. usage | Cost |
|---|---|---|---|
| Workers requests | 100k/day | ~5-20k/day | $0 |
| D1 reads | 5M/day | ~1k/day | $0 |
| D1 writes | 100k/day | ~50/day | $0 |
| KV | 100k reads, 1k writes/day | ~5k/day | $0 |
| Custom domain | Free (parent account) | — | $0 |
| **Total** | | | **$0/bln** |

---

## 🔄 ROLLBACK

```bash
# Rollback ke deployment sebelumnya
wrangler rollback
# Pilih deployment yang mau di-restore
```

---

## 📞 SUPPORT

- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Meta CAPI docs: https://developers.facebook.com/docs/marketing-api/conversions-api
- D1 docs: https://developers.cloudflare.com/d1/
- Project context: `AGENTS.md` + `ARCHITECTURE_CAPI.md`

---

*Verified 30 Juni 2026 — ready untuk deploy pertama*
