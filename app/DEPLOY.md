# 🚀 DEPLOY GUIDE — Menantu Resort v5.2

> **Last updated:** 15 Juni 2026
> **Stack:** Astro 5 + Svelte 5 + Tailwind 3 + Node adapter (hybrid)
> **Hosting:** IDCloudHost shared (LiteSpeed + cPanel) — IP 103.63.24.139
> **No SSH** (port 22 closed confirmed) — pakai cPanel/FTP

---

## 📋 PRASYARAT

- Akses cPanel: `https://103.63.24.139:2083/`
- Node.js 18+ di server (via cPanel "Setup Node.js App")
- Domain `menantu-resort.com` pointing ke server (DNS A record)
- SSL via AutoSSL atau Let's Encrypt (recommended)
- File `dist/client/*` hasil build (lihat step Build)

---

## 🏗️ ARSITEKTUR DEPLOY

Project ini hybrid — `output: 'static'` + Node adapter. **2 mode deployment:**

### Mode A: Pure Static (RECOMMENDED)
- Upload `dist/client/*` ke `public_html/`
- 16/16 pages pre-rendered jadi HTML
- LiteSpeed serve langsung, no Node process
- **Paling cepat, paling murah, paling reliable**
- Svelte islands (KprCalculator, ROISimulator, BookingFlow, dll) di-hydrate client-side
- ✅ **Pakai Mode A untuk production**

### Mode B: Node SSR (untuk dynamic pages future)
- Run `node dist/server/entry.mjs` via cPanel Node.js selector
- Default listen port di-override cPanel (lihat PORT env)
- Bisa serve SSR pages
- ⚠️ Saat ini TIDAK dipakai — semua page static

---

## 📦 STEP-BY-STEP DEPLOY

### 1. Build di local

```bash
cd /Users/maabook/Desktop/menantu-resort.com/app
npm install
npm run build

# Output:
#   dist/client/  (~74MB) — static assets, upload ini
#   dist/server/  (~470KB) — Node SSR entry (jika Mode B)
```

### 2. Pre-flight checklist

Jalankan sebelum upload:

```bash
# 1. Verify build success
ls -la dist/client/index.html
ls -la dist/client/sitemap-index.xml
ls -la dist/client/.htaccess
ls -la dist/client/og/og-image.png

# 2. Verify no anti-fraud or beriklan.co.id in source
grep -rn "anti-fraud\|beriklan" src/ || echo "✓ Clean"

# 3. Verify GA4 ID configured (optional)
cat .env  # or .env.production
# Should have: PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### 3. Upload ke cPanel (Mode A)

#### Option A1: cPanel File Manager (Recommended)
1. Login ke `https://103.63.24.139:2083/`
2. Buka **File Manager** → navigasi ke `public_html/`
3. Backup folder `public_html` lama (rename jadi `public_html_backup_YYYYMMDD`)
4. **Empty `public_html/`** (jangan hapus .well-known atau .git)
5. Upload file `menantu-resort-deploy.zip` (atau extract `dist/client/*` langsung)
6. **Extract** di dalam `public_html/`
7. Pastikan file `public_html/.htaccess` ada (dari build)
8. Set permission: `chmod 755` untuk folders, `644` untuk files

#### Option A2: FTP (FileZilla)
1. Connect ke `ftp://103.63.24.139` (user: cPanel user, port 21)
2. Navigate ke `/public_html/`
3. Upload semua file dari `dist/client/*` (recursive)
4. Verify upload size matches

### 4. Setup Node.js App (Mode B, optional)

> Skip jika pakai Mode A.

1. cPanel → **Setup Node.js App**
2. **Create Application:**
   - Node version: 18.x atau 20.x
   - Application mode: Production
   - Application root: `menantu-resort.com/app` (atau path ke folder app)
   - Application URL: domain
   - Application startup file: `dist/server/entry.mjs`
3. **Run npm install** (di UI cPanel)
4. **Restart** app
5. Set environment variables:
   ```
   HOST=0.0.0.0
   PORT=3000  # atau port yang tersedia
   NODE_ENV=production
   ```
6. Test: buka `https://menantu-resort.com/`

---

## 🔐 POST-DEPLOY VERIFICATION

Setelah upload, test di browser:

### Wajib ✅
- [ ] Homepage `https://menantu-resort.com/` load dengan benar
- [ ] Villa listing `/villa/` menampilkan 3 tipe
- [ ] Villa detail `/villa/bijak/`, `/villa/idaman/`, `/villa/mapan/` ada hero + carousel
- [ ] KPR calculator interaktif (slider berfungsi)
- [ ] ROI simulator (chart SVG muncul)
- [ ] Villa compare table (3 kolom side-by-side)
- [ ] BookingFlow 3-step wizard (Submit → WhatsApp deep link)
- [ ] Panorama360 (CDN-based @photo-sphere-viewer) load panorama image
- [ ] WhatsApp button floating muncul di semua page
- [ ] Footer BNI/BCA/BSI bank logos tampil
- [ ] Cookie consent muncul di first visit
- [ ] 404 page (`/random-url`) tampil dengan design V5.2
- [ ] Sitemap `https://menantu-resort.com/sitemap-index.xml` accessible
- [ ] Robots.txt `https://menantu-resort.com/robots.txt` accessible
- [ ] OG image `https://menantu-resort.com/og/og-image.png` accessible (1200x630)

### SEO & A11y ✅
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] View page source — meta tags lengkap (title, description, og, twitter)
- [ ] Schema.org JSON-LD valid (test di Google Rich Results)
- [ ] Mobile responsive — test di Chrome DevTools iPhone 13
- [ ] `prefers-reduced-motion` di-hormati

### Security ✅
- [ ] HTTPS aktif (AutoSSL Let's Encrypt)
- [ ] No `text-http://` di page (semua asset HTTPS)
- [ ] No leaked `.env` or secrets di `dist/`
- [ ] No `id_rsa` / SSH keys ter-commit

---

## 📊 MONITORING (Phase 8)

### Health Endpoint
```bash
curl https://menantu-resort.com/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-06-15T00:00:00.000Z",
  "uptime": "1234s",
  "version": "5.2",
  "environment": "production",
  "responseTime": "3ms",
  "memory": { "rss": "120MB", "heap": "45MB" },
  "checks": {
    "siteData": true,
    "villaData": true,
    "bankAccounts": true
  },
  "endpoints": {
    "sitemap": "/sitemap-index.xml",
    "robots": "/robots.txt",
    "og": "/og/og-image.png"
  }
}
```

### Setup uptime monitoring (recommended)
- **UptimeRobot.com** (free) — ping `/api/health` setiap 5 menit
- **Better Stack** (paid) — better incident management
- **Pingdom** (paid) — global check dari multiple regions

### Google Analytics 4
1. Setup GA4 property di [analytics.google.com](https://analytics.google.com)
2. Dapatkan Measurement ID (format: `G-XXXXXXXXXX`)
3. Tambahkan ke `app/.env`:
   ```
   PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```
4. Rebuild: `npm run build`
5. Upload `dist/client/*` baru
6. Verify di GA4 **Realtime** report

**Events tracked otomatis:**
- `page_view` (every page)
- `web_vital` (LCP, FID, CLS, FCP, TTFB)
- `js_error` (uncaught errors)

**Events untuk track manual (di business code):**
```js
import { trackEvent, EVENTS } from '@lib/analytics';

trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'header' });
trackEvent(EVENTS.BOOKING_SUBMIT, { villa: 'idaman' });
```

---

## 🆘 TROUBLESHOOTING

### 1. Page 500 — Internal Server Error
- Check cPanel → Errors log
- Pastikan `dist/server/entry.mjs` path benar (Mode B)
- Verify Node version: `node --version` (min 18.17)

### 2. Images not loading
- Check folder `public_html/images/` exists
- Check file permissions (644 untuk files, 755 untuk folders)
- Verify path di src/data/site.json match

### 3. Sitemap not generating
- Pastikan `@astrojs/sitemap` di integrations
- Run `npm run build` di local, check `dist/client/sitemap-index.xml`

### 4. Cookie consent tidak muncul
- Clear browser localStorage: `localStorage.clear()`
- Hard reload (Cmd+Shift+R / Ctrl+Shift+F5)
- Check console — ada error di CookieConsent.svelte?

### 5. 404 untuk semua halaman
- Pastikan `.htaccess` ada di `public_html/`
- Check rewrite rules aktif di cPanel → Apache Configuration
- Verify `mod_rewrite` enabled

### 6. WhatsApp button tidak berfungsi
- Check `siteData.contact.whatsapp` di `src/data/site.json`
- Format: `6281234567890` (62 + nomor, tanpa + atau 0)
- Test link di browser: `https://wa.me/6281234567890?text=Hello`

---

## 📈 FUTURE ENHANCEMENTS (Phase 7+)

- [ ] Custom illustrations via nanobanana-skill (Gemini Flash 3.1)
- [ ] Real 360° panorama per villa (saat ini: generic panorama)
- [ ] Live availability calendar (integration dengan booking system)
- [ ] Multi-language (EN) — konten untuk buyer Singapore/Malaysia
- [ ] A/B testing untuk hero copy
- [ ] Email autoresponder (Mailchimp/Sendinblue integration)
- [ ] Chatbot AI (untuk after-hours inquiry)
- [ ] Virtual staging / interior design gallery
- [ ] Investor portal (login untuk owner existing)

---

## 📞 EMERGENCY CONTACTS

- **Hosting support:** IDCloudHost 24/7 chat
- **Domain registrar:** (sesuai catatan pribadi)
- **Project lead:** PT Cipta Multikarya Propertindo
- **WhatsApp dev:** (lihat siteData.contact.whatsappDisplay)

---

*Generated by Codex — 15 Juni 2026*
