# 🗺️ Sitemap & Indexing — Menantu Resort

**Tanggal:** 17 Juni 2026
**Domain:** https://menantu-resort.com
**Total URL:** 175 URL ter-index

---

## 🎯 Submit INI ke Google Search Console

**HANYA submit 1 URL:**
```
https://menantu-resort.com/sitemap.xml
```

**Jangan** submit `sitemap-index.xml` atau `sitemap-0.xml` — itu sudah dihapus (generate oleh @astrojs/sitemap plugin yang sudah di-remove untuk menghindari konflik).

---

## ✅ Fix yang Sudah Dilakukan

**Root cause error "Sitemap could not be read":**

1. ❌ **Custom `/sitemap.xml.ts` punya `X-Robots-Tag: noindex` header** → Google skip
2. ❌ **`@astrojs/sitemap` plugin** generate `sitemap-0.xml` dengan `changefreq="weekly"` & priority berbeda → konflik dengan custom
3. ❌ `sitemap-index.xml` reference ke plugin sitemap (yang override)

**Fix:**

1. ✅ **Hapus `X-Robots-Tag: noindex`** dari semua sitemap endpoint
2. ✅ **Hapus `@astrojs/sitemap` plugin** dari `astro.config.mjs`
3. ✅ **Hapus `sitemap-0.xml` dan `sitemap-index.xml`** dari server (404 now)
4. ✅ **Update `robots.txt`**: hanya reference 3 sitemap aktif
5. ✅ **Update `sitemap.xml.ts`**: 
   - All artikel: `<changefreq>daily</changefreq>` `<priority>0.9</priority>`
   - Featured: `<priority>1.0</priority>`
   - Cache: 5 min (sebelumnya 1 jam)
6. ✅ **Update `news-sitemap.xml.ts`**: NO X-Robots-Tag
7. ✅ **Update `image-sitemap.xml.ts`**: NO X-Robots-Tag

**Live verification:**
```bash
curl -sI https://menantu-resort.com/sitemap.xml
# Expected: 200 OK, no X-Robots-Tag, content-type application/xml

curl -s https://menantu-resort.com/sitemap.xml | grep -A1 "menantu-resort-promo"
# Expected:
#   <loc>https://menantu-resort.com/artikel/menantu-resort-promo/</loc>
#   <lastmod>2026-06-17</lastmod>
#   <changefreq>daily</changefreq>
#   <priority>0.9</priority>
```

---

## 🗺️ 3 Sitemap Aktif

| URL | URLs | Type | Prioritas |
|---|---|---|---|
| **`sitemap.xml`** | 175 | Main | Submit INI ke GSC |
| `news-sitemap.xml` | 147 | News | Submit juga (Top Stories) |
| `image-sitemap.xml` | 153 | Image | Submit juga (Image Search) |

**Verifikasi live:**
- https://menantu-resort.com/sitemap.xml
- https://menantu-resort.com/news-sitemap.xml
- https://menantu-resort.com/image-sitemap.xml

---

## 🚀 Submit ke Google Search Console (5 menit)

### Step 1: Hapus Sitemap Lama yang Error

1. Buka [Google Search Console](https://search.google.com/search-console/)
2. Pilih property `https://menantu-resort.com`
3. Menu **Sitemaps** (sidebar)
4. Lihat list sitemap — kalau ada `sitemap-index.xml` atau `sitemap-0.xml` dengan status "Couldn't fetch":
   - Klik 3 titik di kanan
   - Pilih **"Remove sitemap"**
5. Tunggu 24 jam untuk propagasi

### Step 2: Submit Sitemap Baru

1. Menu **Sitemaps** (sidebar)
2. Input field: `sitemap.xml`
3. Klik **Submit**
4. Status: **"Success"** (refresh dalam 5-15 menit)
5. Ulangi untuk `news-sitemap.xml`

### Step 3: Verify Status

Search Console → Sitemaps → klik "sitemap.xml" → lihat:
- **Status:** Success
- **Discovered URLs:** 175
- **Last read:** 17 Juni 2026

---

## ⚡ Priority & Changefreq Strategy

**Kenapa `daily` + `0.9` priority?**

Google tidak guarantee crawl frequency sesuai `<changefreq>`, tapi **ini signals**:
- `daily` → "URL ini sering update, crawl sesering mungkin"
- `0.9` → "URL ini penting, prioritaskan dari URL lain"

**Untuk artikel baru SEO:**

```xml
<url>
  <loc>https://menantu-resort.com/artikel/[slug]/</loc>
  <lastmod>2026-06-17</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>
```

**Berlaku untuk:**
- ✅ Semua 147 artikel (priority 0.9)
- ✅ Featured article "menantu-resort-harga-simulasi-bijak-idaman-mapan-2026" (priority 1.0)
- ✅ Static pages (priority 0.4-1.0, daily/weekly/yearly sesuai update frequency)
- ✅ Pagination pages (priority 0.7, daily)

---

## 📊 Schema Markup Tetap Aktif

Setiap halaman tetap punya schema JSON-LD:
- `Organization`, `WebSite`, `BreadcrumbList` di semua halaman
- `Product` di `/villa/[tipe]/`
- `FAQPage`, `Article` di `/artikel/[slug]/`
- `LocalBusiness` di `/lokasi/`

---

## 🧪 Test Sitemap Validity

### 1. Google Search Console Test
- Buka sitemap.xml di GSC
- Status harus "Success"

### 2. XML Validator
- [xml-sitemaps.com/validator](https://www.xml-sitemaps.com/validator.html)
- Paste URL → Expected: No errors

### 3. Schema Test
- [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- Test 1 URL artikel → Expected: FAQ + Article detected

### 4. Manual Verify
```bash
# Should return 200 with 175 URLs
curl -sI https://menantu-resort.com/sitemap.xml
curl -s https://menantu-resort.com/sitemap.xml | grep -oE "<loc>" | wc -l
```

---

## 🔧 Cache Busting (Penting!)

LiteSpeed serve `cache-control: max-age=2592000` (30 hari) — artinya GSC mungkin lihat file cache lama.

**Cara fix:**
1. **Submit ulang sitemap** di GSC → trigger re-fetch
2. **Tunggu 24-48 jam** → GSC akan crawl fresh
3. **Gunakan URL Inspection** di GSC untuk test 1-2 URL artikel:
   - URL Inspection → paste URL → "Request Indexing"
   - Lihat "Last crawl" → kalau masih tanggal lama, tunggu

**Atau** minta support IDCloudHost untuk flush LiteSpeed cache untuk path `/sitemap.xml`.

---

## 📈 Timeline Indexing

| Hari | Action | Expected |
|---|---|---|
| D-0 | Submit sitemap.xml ke GSC | Status: Pending/Success |
| D-1 | Status berubah ke Success | 175 URL discovered |
| D-1-3 | Google mulai crawl sitemap | 30-50 URL crawled |
| D-3-7 | Bulk crawl artikel baru | 100-148 URL indexed |
| D-7-14 | Request indexing manual untuk 12 batch | 148 URL indexed |
| D-14-30 | Ranking muncul di SERP | Top 50 untuk long-tail keyword |
| D-30-60 | Ranking stabil | Top 10-20 untuk branded keyword |

---

## 📚 Quick Reference

**Submit INI ke Google Search Console:**
```
https://menantu-resort.com/sitemap.xml
```

**Cek live:**
```bash
curl -s https://menantu-resort.com/sitemap.xml | head -3
curl -s https://menantu-resort.com/sitemap.xml | grep -oE "<loc>" | wc -l
```

**Schema test:**
- https://search.google.com/test/rich-results
- https://validator.schema.org/

**Files:**
- `app/src/pages/sitemap.xml.ts` — Main sitemap (175 URLs)
- `app/src/pages/news-sitemap.xml.ts` — News (147 entries)
- `app/src/pages/image-sitemap.xml.ts` — Image (153 images)
- `app/src/pages/robots.txt.ts` — Bot rules + sitemap refs
- `app/astro.config.mjs` — Config (no sitemap plugin)

---

*Last updated: 2026-06-18 · Menantu Resort SEO Build · Fixed sitemap error + daily priority*
