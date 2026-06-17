# 📊 Submit Sitemap ke Google Search Console — Menantu Resort

**Tanggal generate:** 17 Juni 2026
**Domain:** https://menantu-resort.com
**Sitemap URL:** https://menantu-resort.com/sitemap-index.xml
**Total URL ter-index:** 27 URL (11 artikel SEO baru + 16 halaman utama)

---

## ✅ Step 1: Verifikasi Sitemap Live (30 detik)

Cek sitemap sudah live dan accessible:

```bash
curl -I https://menantu-resort.com/sitemap-index.xml
# Expected: HTTP/1.1 200 OK
```

Cek URL artikel baru sudah di-sitemap:

```bash
curl -s https://menantu-resort.com/sitemap-0.xml | grep "artikel/"
# Expected: 11 URL artikel
```

---

## 🚀 Step 2: Submit Sitemap ke Google Search Console (2 menit)

1. **Buka** [Google Search Console](https://search.google.com/search-console/)
2. **Pilih property** `https://menantu-resort.com` (kalau belum, tambahkan property baru → Domain atau URL Prefix)
3. **Verifikasi** — kalau sudah ada meta tag `d-7Ysdp2HpFgntspeuC4-jsiy_cvgq3LxNVubodaYyU` di `<head>` semua halaman, property otomatis verified.
4. **Menu Sitemaps** (sidebar kiri)
5. **Input field** "Add a new sitemap" → masukkan: `sitemap-index.xml`
6. Klik **Submit**
7. Status akan jadi:
   - ✅ "Success" → sitemap berhasil di-submit
   - ⏳ "Pending" → tunggu 5-15 menit, refresh

> **Note:** Google mungkin split jadi 2 sitemap (sitemap-0.xml + sitemap-1.xml) kalau URL > 50.000. Sekarang masih 27 URL, jadi 1 file cukup.

---

## 🔥 Step 3: Request Indexing untuk 11 Artikel Baru (5 menit)

Sitemap submit saja butuh **3-7 hari** untuk di-crawl Google. Untuk percepat, **request indexing manual** untuk artikel SEO baru (high-intent keywords dari Google Ads CSV):

1. **Search Console → URL Inspection** (top bar)
2. **Paste URL** satu per satu, lalu tekan Enter
3. Klik **"Request Indexing"**
4. Ulangi untuk 11 URL di bawah ini:

| # | URL | Focus Keyword |
|---|---|---|
| 1 | `https://menantu-resort.com/artikel/menantu-resort-harga-simulasi-bijak-idaman-mapan-2026/` | menantu resort harga |
| 2 | `https://menantu-resort.com/artikel/menantu-resort-simulasi-kpr-cicilan-9-juta/` | menantu resort simulasi kpr |
| 3 | `https://menantu-resort.com/artikel/investasi-passive-income-villa-bandung-9-persen-pa/` | investasi passive income |
| 4 | `https://menantu-resort.com/artikel/summarecon-bandung-vs-menantu-resort-investasi-villa/` | summarecon bandung |
| 5 | `https://menantu-resort.com/artikel/podomoro-park-bandung-review-vs-menantu-resort/` | podomoro bandung |
| 6 | `https://menantu-resort.com/artikel/rumah-bandung-timur-cicalengka-hidden-gem-properti-2026/` | rumah bandung |
| 7 | `https://menantu-resort.com/artikel/perumahan-bandung-timur-eco-resort-vs-rumah-tapak-2026/` | perumahan bandung |
| 8 | `https://menantu-resort.com/artikel/perumahan-elit-bandung-villa-premium-investasi-bandung-timur/` | perumahan elit bandung |
| 9 | `https://menantu-resort.com/artikel/setraduta-bandung-review-vs-menantu-resort-2026/` | setraduta bandung |
| 10 | `https://menantu-resort.com/artikel/villa-di-bandung-yang-disewakan-9-persen-yield-2026/` | villa disewakan bandung |
| 11 | `https://menantu-resort.com/artikel/properti-investasi-bandung-2026-villa-yield-9-persen/` | properti investasi bandung |

> **Limit:** Google hanya izinkan 10-12 URL request per hari. Submit batch 5 dulu, sisanya besok.

---

## 📈 Step 4: Monitor Performance (1 minggu kemudian)

Search Console → **Performance** → filter:
- **Query:** contains "menantu resort" atau "villa bandung investasi" (top 10 keyword target)
- **Page:** /artikel/* (artikel baru)
- **Date range:** Last 7 days → Last 28 days

Yang dimonitor:
- **Impressions** — berapa kali muncul di hasil pencarian
- **Clicks** — berapa kali di-klik
- **Average CTR** — kalau di bawah 3%, perlu improve title/meta
- **Average position** — kalau di atas 20, butuh backlink

---

## 🎯 Step 5: Schema & Rich Results Test (1 menit)

Cek FAQ schema valid (penting untuk Google AI / featured snippet):

1. Buka [Rich Results Test](https://search.google.com/test/rich-results)
2. Paste URL: `https://menantu-resort.com/artikel/menantu-resort-harga-simulasi-bijak-idaman-mapan-2026/`
3. Expected: **FAQ** detected, 5 pertanyaan terdaftar

Cek Article schema:
1. Buka [Schema Markup Validator](https://validator.schema.org/)
2. Paste URL yang sama
3. Expected: **Article + FAQPage** valid (0 errors)

---

## 🔄 Maintenance Berkala

| Frekuensi | Aksi |
|---|---|
| **Harian** | Cek URL Inspection → "Discovered → Currently not indexed" untuk artikel baru |
| **Mingguan** | Performance report → identifikasi artikel CTR rendah, optimize title |
| **Bulanan** | Cek Coverage report → fix errors, submit ulang URL yang error |
| **Kuartalan** | Audit backlink via [Ahrefs](https://ahrefs.com) atau [Search Console Links](https://search.google.com/search-console/links) |

---

## 🚨 Troubleshooting

**Q: Artikel tidak muncul di Google setelah 7 hari?**
A: Cek di URL Inspection → "Why not indexed" → biasanya:
- **"Crawled, currently not indexed"** → Google anggap konten duplicate/thin. Tambah internal link dari halaman lain, lebih banyak konten original.
- **"Discovered, currently not indexed"** → belum diprioritaskan. Request indexing manual, atau tambah backlink.
- **"404 / Soft 404"** → URL error. Cek path di cPanel.

**Q: Sitemap status "Couldn't fetch"?**
A: Cek robots.txt → Search Console → Settings → pastikan `Sitemap: https://menantu-resort.com/sitemap-index.xml` ada. Cek juga file `app/dist/client/robots.txt` ada baris `Sitemap: https://menantu-resort.com/sitemap-index.xml`.

**Q: Rich Results Test bilang FAQ "Warning"?**
A: FAQ schema butuh minimal 2 pertanyaan. Semua 11 artikel kita punya 3-5 FAQ, jadi harusnya aman. Cek juga tidak ada duplicate question.

---

## 📚 Resources

- [Google Search Console Help](https://support.google.com/webmasters/)
- [Sitemap best practices](https://developers.google.com/search/docs/sitemaps/build-sitemap)
- [FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)

---

*Last updated: 2026-06-17 · Menantu Resort SEO Build · Generated by Codex*
