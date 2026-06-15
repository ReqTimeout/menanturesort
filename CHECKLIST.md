# ✅ PRODUCTION CHECKLIST — Pre-Launch Menantu Resort v5.2

> Use ini setiap kali push ke production.

## 📋 Pre-Build

- [ ] `app/.env` configured (PUBLIC_GA4_ID, etc)
- [ ] `app/src/data/site.json` contact details correct
- [ ] `app/src/data/site.json` bank accounts correct (3 rekening)
- [ ] `app/src/data/villa.json` prices + specs updated
- [ ] No `*.bak`, `*.unused`, `*.tmp` di `src/`
- [ ] Git status clean (commit + push ke remote)
- [ ] Run `npm run build` → SUCCESS
- [ ] Verify `dist/client/index.html` exists
- [ ] Verify `dist/client/sitemap-index.xml` exists
- [ ] Verify `dist/client/.htaccess` exists
- [ ] Verify `dist/client/og/og-image.png` exists (1200x630)
- [ ] Verify no `id_rsa` atau secrets di `dist/`

## 🔍 Source Audit (Run di app/)

```bash
# No anti-fraud
grep -rn "anti-fraud\|Anti-fraud\|ANTI-FRAUD" src/ || echo "✓ Clean"

# No beriklan
grep -rn "beriklan" src/ || echo "✓ Clean"

# No text-gray (V4 legacy)
grep -rn "text-gray" src/ || echo "✓ Clean"

# No emoji in components
grep -rn "📧\|💬\|📍\|🛡️\|✅\|🛎\|⚡" src/components src/pages 2>/dev/null || echo "✓ Clean"

# No Svelte 4 patterns
grep -rn "export let\|<script lang=\"ts\"" src/components/svelte/ || echo "✓ Clean"

# No HeadlessUI / bits-ui (unused)
grep -rn "import {.*} from 'bits-ui'" src/ || echo "✓ Clean"
```

## 🏗️ Build Verification

- [ ] 16/16 pages generate
- [ ] No build warnings about missing imports
- [ ] Sitemap contains 16 URLs
- [ ] `.htaccess` has rewrite rules + 404 fallback
- [ ] `dist/client/` size < 100MB
- [ ] No `_astro/` files > 500KB (CSS/JS bundle sanity)

## 📦 Deploy (Mode A — Static)

- [ ] Backup `public_html/` jadi `public_html_backup_YYYYMMDD/`
- [ ] Empty `public_html/` (preserve `.well-known/`, `.git/`)
- [ ] Upload `dist/client/*` recursive
- [ ] Set permissions: 755 folders, 644 files
- [ ] Test `https://menantu-resort.com/` di browser
- [ ] Test `https://menantu-resort.com/villa/`
- [ ] Test `https://menantu-resort.com/investasi/`
- [ ] Test WhatsApp button → opens wa.me correctly
- [ ] Test panorama360 viewer (`/villa/` → "Lihat Panorama")
- [ ] Test 404 page (`/random-url`)
- [ ] Verify cookie consent muncul di first visit

## 📊 Post-Deploy Verification

- [ ] **Lighthouse** (Chrome DevTools):
  - [ ] Performance > 90
  - [ ] Accessibility > 95
  - [ ] Best Practices > 95
  - [ ] SEO > 95
- [ ] **Mobile test** (Chrome DevTools iPhone 13):
  - [ ] StickyMobileCTA muncul setelah scroll 50vh
  - [ ] Bottom bar tidak overlap dengan content
- [ ] **GA4 Realtime** (jika configured):
  - [ ] Pageview muncul dalam 30 detik
  - [ ] Web vitals event masuk
- [ ] **Schema.org** (Google Rich Results Test):
  - [ ] Organization markup valid
  - [ ] Product markup valid (villa listings)
- [ ] **Social preview** (Facebook Debugger):
  - [ ] OG image `og-image.png` muncul
  - [ ] Title + description correct
- [ ] **Health endpoint**:
  - [ ] `curl https://menantu-resort.com/api/health` returns 200
  - [ ] JSON berisi `"status": "ok"`

## 🔒 Security

- [ ] HTTPS aktif (no mixed content)
- [ ] No `.env` file di `public_html/`
- [ ] No SSH keys (`id_rsa*`) di repo
- [ ] No `node_modules/` di `dist/`
- [ ] `.htaccess` blocking sensitive files (`.env`, `.git`)
- [ ] Form submissions rate-limited (jika backend exists)

## 📣 Go-Live Announcement

- [ ] Submit sitemap ke Google Search Console
- [ ] Submit sitemap ke Bing Webmaster Tools
- [ ] Test social sharing (Facebook, Twitter, LinkedIn, WhatsApp)
- [ ] Email blast ke existing leads
- [ ] Update Meta Ads / Google Ads URL
- [ ] Monitor error logs 24 jam pertama
- [ ] Setup uptime monitoring (UptimeRobot)

---

**Sign-off:**
- [ ] Dev lead _____________
- [ ] QA _____________
- [ ] Project manager _____________

**Date deployed:** _____________

**Production URL:** https://menantu-resort.com/
