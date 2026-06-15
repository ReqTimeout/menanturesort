# STATUS — Menantu Resort

> **Last updated:** 15 Juni 2026 (V10 deploy live)

## ✅ Live Production

- **URL:** https://menantu-resort.com/
- **Hosting:** IDCloudHost cPanel shared (LiteSpeed)
- **Document Root:** `/home/egokkcmq/menantu-resort.com/`
- **Mode:** Static (Astro `output: 'static'`)
- **Total files:** 199 (HTML + JS + CSS + images)
- **First deploy:** 15 Juni 2026

## 🟢 Verified

- ✅ Homepage load (LiteSpeed 200 OK)
- ✅ All static pages accessible (`/villa/`, `/investasi/`, `/kontak/`, `/lokasi/`, `/artikel/`, `/resort/`, `/faq/`, `/villa/bijak/`, `/villa/idaman/`, `/villa/mapan/`)
- ✅ Favicon, sitemap, robots.txt
- ✅ Schema.org JSON-LD (RealEstateAgent + Product list)
- ✅ Open Graph + Twitter card meta
- ✅ WhatsApp CTAs: 52+ across site
- ✅ Sticky mobile CTA (3 buttons) — z-60
- ✅ Floating WhatsApp — hidden on mobile
- ✅ Cookie banner — removed
- ✅ All animations live (marquee, counter, fade-in, hero gradient, gold glow)
- ✅ SSL via AutoSSL Let's Encrypt (https)
- ✅ GitHub repo synced: github.com/ReqTimeout/menanturesort

## 📂 Source

- **Repo:** `git@github.com:ReqTimeout/menanturesort.git`
- **Branch:** `main`
- **Latest commit:** `a6ba431` (DEPLOY.md rewrite + deploy scripts)
- **Local path:** `/Users/maabook/Desktop/menantu-resort.com/`

## 🛠️ Build & Deploy

```bash
# Build
cd app && npm run build
# → dist/client/ (~75MB)

# Deploy via lftp
export CPANEL_PASS='***'
./deploy-static.sh
# Or manually: see DEPLOY.md
```

## 📋 Next Steps (Future)

- [ ] Image CDN migration (panorama 17MB → Cloudflare R2)
- [ ] GA4 setup (PUBLIC_GA4_ID env)
- [ ] Schema.org validate di Google Search Console
- [ ] Sitemap submit ke Google Search Console
- [ ] A/B test CTA copy untuk optimasi konversi
- [ ] Custom 360° viewer di `/360/` (legacy) integrate ke Panorama360
