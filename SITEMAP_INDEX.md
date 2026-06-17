# 🗺️ Sitemap & Indexing — Menantu Resort

**Tanggal:** 17 Juni 2026
**Domain:** https://menantu-resort.com
**Total URL:** 175 URL ter-index

---

## 🎯 5 Sitemap URL yang Tersedia

| # | URL | Type | URLs | Tujuan |
|---|---|---|---|---|
| 1 | **`https://menantu-resort.com/sitemap.xml`** | **Main** | **175** | **Submit INI ke GSC** — semua URL |
| 2 | `https://menantu-resort.com/sitemap-index.xml` | Index | 1 | Reference ke sitemap-0.xml (auto-gen) |
| 3 | `https://menantu-resort.com/news-sitemap.xml` | News | 147 | Google News crawler (Top Stories) |
| 4 | `https://menantu-resort.com/image-sitemap.xml` | Image | 153 | Google Image search |
| 5 | `https://menantu-resort.com/sitemap-0.xml` | Auto-gen | 175 | Backup (dari @astrojs/sitemap plugin) |

**URL yang harus di-submit ke Google Search Console:**

```
https://menantu-resort.com/sitemap.xml
```

Submit **hanya 1 URL** ini. Google akan auto-crawl sitemap-index → sitemap-0 + news-sitemap + image-sitemap via internal references di robots.txt.

---

## 🚀 Submit ke Google Search Console (5 menit)

### Step 1: Buka Search Console
https://search.google.com/search-console/

### Step 2: Pilih Property
Pilih `https://menantu-resort.com` (kalau belum ada, tambahkan → Domain `menantu-resort.com`)

### Step 3: Verifikasi Property
- Meta tag `google-site-verification` sudah ada di `<head>` BaseLayout: `d-7Ysdp2HpFgntspeuC4-jsiy_cvgq3LxNVubodaYyU`
- Klik "Verify" → otomatis verified

### Step 4: Submit Sitemap
1. Menu **Sitemaps** (sidebar kiri)
2. Input field "Add a new sitemap": `sitemap.xml`
3. Klik **Submit**
4. Status → "Success" (refresh dalam 5-15 menit)

### Step 5: (Optional) Submit News Sitemap
1. Sitemap yang sama → "Add a new sitemap"
2. Input: `news-sitemap.xml`
3. Submit

**Optional:** Submit juga `image-sitemap.xml` untuk Google Image search.

---

## 🔍 Verifikasi Sitemap Live (Cek Sendiri)

Buka di browser:
- https://menantu-resort.com/sitemap.xml → harusnya XML dengan 175 URL
- https://menantu-resort.com/robots.txt → harusnya list 5 sitemap

Atau via terminal:
```bash
curl -s https://menantu-resort.com/sitemap.xml | head -20
# Expected: XML dengan <url><loc>https://menantu-resort.com/...
```

---

## 📊 Schema Markup yang Sudah Terpasang

Setiap halaman sudah punya schema JSON-LD. Cek via [Schema Markup Validator](https://validator.schema.org/):

| Tipe Schema | Lokasi | Schema |
|---|---|---|
| `Organization` | Homepage | Brand, logo, contact, social |
| `WebSite` | Homepage | Search box |
| `BreadcrumbList` | Semua halaman | Navigation breadcrumb |
| `Product` | `/villa/[tipe]/` | Villa specs, harga, availability |
| `FAQPage` | `/artikel/[slug]/` | 3-5 Q&A per artikel |
| `Article` | `/artikel/[slug]/` | headline, image, author, date |
| `LocalBusiness` | `/lokasi/` | Address, geo, opening hours |
| `Place` | `/resort/` | Resort info, amenities |

**Test schema validity:**
```
https://validator.schema.org/
→ Paste URL artikel
→ Expected: Article + FAQPage valid (0 errors)
```

---

## 🤖 Robots.txt — Optimized for Daily Crawl

File `https://menantu-resort.com/robots.txt` punya:

**Bot-specific rules:**
- `Googlebot` — Allow all, Crawl-delay 0
- `Googlebot-Image` — Allow all
- `Googlebot-News` — Allow /artikel/
- `Googlebot-Video` — Allow all
- `Bingbot` — Allow all, Crawl-delay 0
- `YandexBot` — Allow all (untuk market Rusia)
- `Baiduspider` — Allow all (untuk market China)

**AI/LLM Crawlers — Allowed:**
- GPTBot, ChatGPT-User (OpenAI)
- Claude-Web, anthropic-ai (Anthropic)
- PerplexityBot
- Google-Extended

**Blocked (SEO spam):**
- AhrefsBot, SemrushBot, MJ12bot, DotBot, BLEXBot

**Sitemap declarations:**
- 5 sitemap URLs di-define di robots.txt
- Host directive untuk Yandex

---

## ⚡ Strategi Percepatan Indexing

### Tier 1: Sitemap Submit (D-0)
- Submit `sitemap.xml` ke GSC
- Google akan mulai crawl dalam 1-3 hari
- News sitemap → Google News crawler mulai crawl dalam 1-2 hari
- Image sitemap → Google Image crawler mulai crawl dalam 3-5 hari

### Tier 2: URL Inspection Request (D-1 sampai D-15)
- 10-12 URL per hari, total 148 artikel = 12-15 hari
- Prioritas: high-intent keyword (harga, simulasi KPR, summarecon, podomoro)
- Panduan batch ada di `SUBMIT_GSC.md`

### Tier 3: Backlink (D-7+)
- Share ke social media (FB, IG, LinkedIn)
- Submit ke direktori bisnis (Yellow Pages, Kaskus, dll)
- Guest post di blog properti (Brainstorm, Rumah123, dll)
- Press release di media online

### Tier 4: Indexing API (Optional, D-1)
Gunakan Google Indexing API untuk ping Google langsung:
```bash
curl -X POST "https://indexing.googleapis.com/v3/urlNotifications:publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -d '{
    "url": "https://menantu-resort.com/artikel/menantu-resort-harga-simulasi-bijak-idaman-mapan-2026/",
    "type": "URL_UPDATED"
  }'
```

---

## 📈 Monitoring Indexing Progress

### Cek URL yang sudah ter-index:
Search Console → **URL Inspection** → paste URL → enter

Atau query di Google:
```
site:menantu-resort.com/artikel/
```

### Cek Schema Markup:
[Rich Results Test](https://search.google.com/test/rich-results) → paste URL artikel → expected: FAQ detected

### Cek Index Coverage:
Search Console → **Coverage** → lihat graph "Valid", "Excluded", "Error"

---

## 🗂️ File-file Sitemap

| File | Fungsi |
|---|---|
| `app/src/pages/sitemap.xml.ts` | Main sitemap endpoint (175 URLs) |
| `app/src/pages/news-sitemap.xml.ts` | Google News sitemap (147 news) |
| `app/src/pages/image-sitemap.xml.ts` | Google Image sitemap (153 images) |
| `app/src/pages/robots.txt.ts` | Bot directives + 5 sitemap refs |
| `app/dist/client/sitemap-0.xml` | Auto-gen dari @astrojs/sitemap (175 URLs) |
| `app/dist/client/sitemap-index.xml` | Reference ke sitemap-0.xml |
| `SUBMIT_GSC.md` | Panduan submit + 12-batch indexing plan |
| `SITEMAP_INDEX.md` | File ini — overview semua sitemap |

---

## 🎯 Quick Reference

**Submit INI ke Google Search Console:**
```
https://menantu-resort.com/sitemap.xml
```

**Cek live:**
```
https://menantu-resort.com/sitemap.xml → 175 URL
https://menantu-resort.com/news-sitemap.xml → 147 news
https://menantu-resort.com/image-sitemap.xml → 153 images
https://menantu-resort.com/robots.txt → bot rules
```

**Schema untuk test:**
- Article + FAQPage → https://search.google.com/test/rich-results
- Organization → https://validator.schema.org/

**Performance tracking:**
- 7 hari setelah submit → Search Console → Performance
- 30 hari → cek average position per keyword
- 60 hari → cek apakah ranking di page 1-3 untuk high-intent keyword

---

*Last updated: 2026-06-17 · Menantu Resort SEO Build · 5 sitemaps + 175 URLs + 147 news + 153 images*
