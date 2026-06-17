# 📊 Submit Sitemap ke Google Search Console — Menantu Resort

**Tanggal generate:** 17 Juni 2026
**Domain:** https://menantu-resort.com
**Sitemap URL:** https://menantu-resort.com/sitemap-index.xml
**Total URL ter-index:** 163 URL (148 artikel SEO + 15 halaman utama)

---

## ✅ Step 1: Verifikasi Sitemap Live (30 detik)

Cek sitemap sudah live dan accessible:

```bash
curl -I https://menantu-resort.com/sitemap-index.xml
# Expected: HTTP/1.1 200 OK
```

Cek URL artikel baru sudah di-sitemap:

```bash
curl -s https://menantu-resort.com/sitemap-0.xml | grep -oE "<url>" | wc -l
# Expected: 163 URLs (148 artikel + 15 halaman utama)
```

Cek artikel sample sudah live dengan FAQ schema:

```bash
curl -s https://menantu-resort.com/artikel/menantu-resort-promo/ | grep -c "FAQPage"
# Expected: 1
```

---

## 🚀 Step 2: Submit Sitemap ke Google Search Console (2 menit)

1. **Buka** [Google Search Console](https://search.google.com/search-console/)
2. **Pilih property** `https://menantu-resort.com` (kalau belum, tambahkan property baru → Domain atau URL Prefix)
3. **Verifikasi** — property otomatis verified (meta tag `d-7Ysdp2HpFgntspeuC4-jsiy_cvgq3LxNVubodaYyU` sudah ada di `<head>`)
4. **Menu Sitemaps** (sidebar kiri)
5. **Input field** "Add a new sitemap" → masukkan: `sitemap-index.xml`
6. Klik **Submit**
7. Status akan jadi:
   - ✅ "Success" → sitemap berhasil di-submit
   - ⏳ "Pending" → tunggu 5-15 menit, refresh

> **Note:** Google mungkin split jadi 2 sitemap (sitemap-0.xml + sitemap-1.xml) kalau URL > 50.000. Sekarang masih 163 URL, jadi 1 file cukup.

---

## 🔥 Step 3: Request Indexing — Batch Strategy (10-15 hari)

Sitemap submit butuh **3-7 hari** untuk di-crawl Google. **Request indexing manual** mempercepat menjadi **1-2 hari**.

> **Limit Google:** 10-12 URL request per hari per property. Total 148 artikel butuh **~15 hari batch**.

### 📋 Batch 1 — HIGH INTENT (Top 10 — submit hari pertama)

| # | URL | Focus Keyword |
|---|---|---|
| 1 | `https://menantu-resort.com/artikel/menantu-resort-harga-simulasi-bijak-idaman-mapan-2026/` | menantu resort harga |
| 2 | `https://menantu-resort.com/artikel/menantu-resort-simulasi-kpr-cicilan-9-juta/` | menantu resort simulasi kpr |
| 3 | `https://menantu-resort.com/artikel/menantu-resort-promo/` | menantu resort promo |
| 4 | `https://menantu-resort.com/artikel/summarecon-bandung-vs-menantu-resort-investasi-villa/` | summarecon bandung |
| 5 | `https://menantu-resort.com/artikel/podomoro-park-bandung-review-vs-menantu-resort/` | podomoro bandung |
| 6 | `https://menantu-resort.com/artikel/setraduta-bandung-review-vs-menantu-resort-2026/` | setraduta bandung |
| 7 | `https://menantu-resort.com/artikel/harga-rumah-di-bandung/` | harga rumah di bandung |
| 8 | `https://menantu-resort.com/artikel/perumahan-bandung-timur-eco-resort-vs-rumah-tapak-2026/` | perumahan bandung |
| 9 | `https://menantu-resort.com/artikel/investasi-passive-income-villa-bandung-9-persen-pa/` | investasi passive income |
| 10 | `https://menantu-resort.com/artikel/villa-di-bandung-yang-disewakan-9-persen-yield-2026/` | villa disewakan bandung |

### 📋 Batch 2 — BRAND & LOKASI (10 URL — hari ke-2)

`https://menantu-resort.com/artikel/menantu-resort-sahid/`
`https://menantu-resort.com/artikel/menantu-resort-cicalengka/`
`https://menantu-resort.com/artikel/menantu-resort-jatinangor/`
`https://menantu-resort.com/artikel/menantu-resort-cimahi/`
`https://menantu-resort.com/artikel/menantu-resort-WhatsApp/`
`https://menantu-resort.com/artikel/menantu-resort-contact/`
`https://menantu-resort.com/artikel/menantu-resort-booking/`
`https://menantu-resort.com/artikel/menantu-resort-site-visit/`
`https://menantu-resort.com/artikel/menantu-resort-kpr-developer/`
`https://menantu-resort.com/artikel/menantu-resort-showroom/`

### 📋 Batch 3 — VILLA INVESTASI (10 URL — hari ke-3)

`https://menantu-resort.com/artikel/villa-investasi-bandung/`
`https://menantu-resort.com/artikel/villa-managed-bandung/`
`https://menantu-resort.com/artikel/villa-resort-investasi/`
`https://menantu-resort.com/artikel/villa-bandung-yang-disewakan/`
`https://menantu-resort.com/artikel/villa-investasi-bandung-timur/`
`https://menantu-resort.com/artikel/villa-di-bandung-timur-investasi/`
`https://menantu-resort.com/artikel/villa-dikelola-hotel/`
`https://menantu-resort.com/artikel/villa-disewa-operator-hotel/`
`https://menantu-resort.com/artikel/villa-untuk-passive-income/`
`https://menantu-resort.com/artikel/villa-resort-yield-9-persen/`

### 📋 Batch 4 — SUMMARECON (10 URL — hari ke-4)

`https://menantu-resort.com/artikel/summarecon-bandung/`
`https://menantu-resort.com/artikel/harga-rumah-summarecon-bandung/`
`https://menantu-resort.com/artikel/harga-rumah-di-summarecon-bandung/`
`https://menantu-resort.com/artikel/cluster-summarecon-bandung/`
`https://menantu-resort.com/artikel/kawasan-summarecon-bandung/`
`https://menantu-resort.com/artikel/summarecon-bandung-dimana/`
`https://menantu-resort.com/artikel/summarecon-bandung-review/`
`https://menantu-resort.com/artikel/villa-summarecon-bandung/`
`https://menantu-resort.com/artikel/villa-investasi-summarecon/`
`https://menantu-resort.com/artikel/pt-summarecon-bandung/`

### 📋 Batch 5 — PODOMORO (10 URL — hari ke-5)

`https://menantu-resort.com/artikel/podomoro-bandung/`
`https://menantu-resort.com/artikel/podomoro-park-bandung/`
`https://menantu-resort.com/artikel/harga-podomoro-park-bandung/`
`https://menantu-resort.com/artikel/podomoro-park-bandung-harga/`
`https://menantu-resort.com/artikel/podomoro-park-bandung-price-list/`
`https://menantu-resort.com/artikel/cluster-podomoro-bandung/`
`https://menantu-resort.com/artikel/podomoro-bandung-review/`
`https://menantu-resort.com/artikel/villa-podomoro-bandung/`
`https://menantu-resort.com/artikel/rumah-podomoro-bandung/`
`https://menantu-resort.com/artikel/podomoro-bandung-dimana/`

### 📋 Batch 6 — PODOMORO LANJUTAN (10 URL — hari ke-6)

`https://menantu-resort.com/artikel/agung-podomoro-bandung/`
`https://menantu-resort.com/artikel/agung-podomoro-park-bandung/`
`https://menantu-resort.com/artikel/podomoro-buah-batu/`
`https://menantu-resort.com/artikel/podomoro-park-buah-batu/`
`https://menantu-resort.com/artikel/podomoro-buah-batu-bandung/`
`https://menantu-resort.com/artikel/podomoro-park-bojongsoang/`
`https://menantu-resort.com/artikel/podomoro-view-golf/`
`https://menantu-resort.com/artikel/bukit-podomoro-jakarta/`
`https://menantu-resort.com/artikel/komplek-podomoro/`
`https://menantu-resort.com/artikel/villa-managed-podomoro/`

### 📋 Batch 7 — PASSIVE INCOME (10 URL — hari ke-7)

`https://menantu-resort.com/artikel/investasi-pasif-income/`
`https://menantu-resort.com/artikel/passive-income-terbaik/`
`https://menantu-resort.com/artikel/pasif-income-terbaik/`
`https://menantu-resort.com/artikel/passive-income-bulanan/`
`https://menantu-resort.com/artikel/mendapatkan-pasif-income/`
`https://menantu-resort.com/artikel/pemasukan-pasif/`
`https://menantu-resort.com/artikel/aset-pasif-income/`
`https://menantu-resort.com/artikel/aset-passive-income/`
`https://menantu-resort.com/artikel/investasi-pasif-income-terpercaya/`
`https://menantu-resort.com/artikel/investasi-untuk-passive-income/`

### 📋 Batch 8 — RUMAH & PERUMAHAN (10 URL — hari ke-8)

`https://menantu-resort.com/artikel/rumah-bandung/`
`https://menantu-resort.com/artikel/rumah-di-bandung/`
`https://menantu-resort.com/artikel/rumah-dijual-di-bandung/`
`https://menantu-resort.com/artikel/jual-rumah-bandung/`
`https://menantu-resort.com/artikel/jual-rumah-di-bandung/`
`https://menantu-resort.com/artikel/rumah-investasi-bandung/`
`https://menantu-resort.com/artikel/perumahan-bandung/`
`https://menantu-resort.com/artikel/perumahan-di-bandung/`
`https://menantu-resort.com/artikel/perumahan-murah-di-bandung/`
`https://menantu-resort.com/artikel/perumahan-baru-di-bandung/`

### 📋 Batch 9 — PERUMAHAN ELIT (10 URL — hari ke-9)

`https://menantu-resort.com/artikel/perumahan-elit-bandung/`
`https://menantu-resort.com/artikel/perumahan-elit-di-bandung/`
`https://menantu-resort.com/artikel/perumahan-bandung-elite/`
`https://menantu-resort.com/artikel/perumahan-elite-bandung/`
`https://menantu-resort.com/artikel/kawasan-elit-bandung/`
`https://menantu-resort.com/artikel/komplek-perumahan-elit-di-bandung/`
`https://menantu-resort.com/artikel/perumahan-setraduta/`
`https://menantu-resort.com/artikel/cluster-bandung/`
`https://menantu-resort.com/artikel/kavling-investasi-bandung/`
`https://menantu-resort.com/artikel/properti-investasi-1-milyar/`

### 📋 Batch 10 — PROPERTI INVESTASI (10 URL — hari ke-10)

`https://menantu-resort.com/artikel/properti-investasi-bandung/`
`https://menantu-resort.com/artikel/properti-investasi-2026/`
`https://menantu-resort.com/artikel/properti-investasi-menguntungkan/`
`https://menantu-resort.com/artikel/properti-investasi-shm/`
`https://menantu-resort.com/artikel/properti-investasi-jangka-panjang/`
`https://menantu-resort.com/artikel/beli-villa-untuk-investasi/`
`https://menantu-resort.com/artikel/beli-villa-untuk-disewakan/`
`https://menantu-resort.com/artikel/villa-investasi-jangka-panjang/`
`https://menantu-resort.com/artikel/villa-investasi-cicalengka/`
`https://menantu-resort.com/artikel/villa-produktif-bandung/`

### 📋 Batch 11 — SETRADUTA & VILLA (10 URL — hari ke-11)

`https://menantu-resort.com/artikel/setraduta-bandung/`
`https://menantu-resort.com/artikel/setraduta-bandung-mana/`
`https://menantu-resort.com/artikel/rumah-setraduta-bandung/`
`https://menantu-resort.com/artikel/rumah-baru-setraduta/`
`https://menantu-resort.com/artikel/villa-setraduta-bandung/`
`https://menantu-resort.com/artikel/villa-investasi-setraduta/`
`https://menantu-resort.com/artikel/villa-produktif-east-bandung/`
`https://menantu-resort.com/artikel/villa-resort-passive-income/`
`https://menantu-resort.com/artikel/villa-resort-yang-menghasilkan/`
`https://menantu-resort.com/artikel/resort-investasi-bandung/`

### 📋 Batch 12 — SISA (8 URL — hari ke-12)

`https://menantu-resort.com/artikel/podomoro-land-bandung/`
`https://menantu-resort.com/artikel/podomoro-park-bandung-logo/`
`https://menantu-resort.com/artikel/marketing-gallery-podomoro-park-bandung/`
`https://menantu-resort.com/artikel/rumah-podomoro-park-bandung/`
`https://menantu-resort.com/artikel/brosur-podomoro-park-bandung/`
`https://menantu-resort.com/artikel/harga-rumah-di-podomoro-bandung/`
`https://menantu-resort.com/artikel/harga-rumah-di-podomoro-park-bandung/`
`https://menantu-resort.com/artikel/harga-rumah-podomoro-park-bandung/`

**Total: 12 batches × 8-10 URL = 12 hari. Submit 1 batch per hari.**

**Cara submit per URL:**
1. Search Console → **URL Inspection** (top bar)
2. Paste URL → Enter
3. Klik **"Request Indexing"**
4. Ulangi untuk URL berikutnya dalam batch

---

## 📈 Step 4: Monitor Performance (1 minggu kemudian)

Search Console → **Performance** → filter:
- **Query:** contains "menantu resort", "villa bandung investasi", "summarecon bandung", "podomoro bandung"
- **Page:** /artikel/* (artikel baru)
- **Date range:** Last 7 days → Last 28 days

Yang dimonitor:
- **Impressions** — berapa kali muncul di hasil pencarian
- **Clicks** — berapa kali di-klik
- **Average CTR** — kalau di bawah 3%, perlu improve title/meta
- **Average position** — kalau di atas 20, butuh backlink

**Top 5 keyword target untuk monitor:**
1. menantu resort harga
2. investasi passive income
3. villa di bandung yang disewakan
4. summarecon bandung
5. podomoro bandung

---

## 🎯 Step 5: Schema & Rich Results Test (2 menit)

Cek FAQ schema valid (penting untuk Google AI / featured snippet):

1. Buka [Rich Results Test](https://search.google.com/test/rich-results)
2. Test 3-5 URL sample dari berbagai cluster:
   - `https://menantu-resort.com/artikel/menantu-resort-harga-simulasi-bijak-idaman-mapan-2026/`
   - `https://menantu-resort.com/artikel/summarecon-bandung-vs-menantu-resort-investasi-villa/`
   - `https://menantu-resort.com/artikel/villa-managed-bandung/`
3. Expected: **FAQ** detected, 3-5 pertanyaan terdaftar per artikel

Cek Article schema:
1. Buka [Schema Markup Validator](https://validator.schema.org/)
2. Paste URL yang sama
3. Expected: **Article + FAQPage** valid (0 errors)

---

## 🔄 Maintenance Berkala

| Frekuensi | Aksi |
|---|---|
| **Harian** | Request indexing 8-10 URL baru dari batch list |
| **Mingguan** | Performance report → identifikasi artikel CTR rendah, optimize title |
| **Bulanan** | Cek Coverage report → fix errors, submit ulang URL yang error |
| **Kuartalan** | Audit backlink via [Ahrefs](https://ahrefs.com) atau Search Console Links |

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
A: FAQ schema butuh minimal 2 pertanyaan. Semua 148 artikel kita punya 3-5 FAQ, jadi harusnya aman. Cek juga tidak ada duplicate question.

**Q: Artikel tidak masuk batch list?**
A: Total ada 148 artikel. 12 batches × 8-10 URL = ~120 URL di list. Sisa 28 artikel bisa di-request ad-hoc atau di-skip (Google akan crawl via sitemap dalam 2-4 minggu).

**Q: 12 hari terlalu lama, bisa lebih cepat?**
A: Google limit 10-12 URL per hari. Alternatif:
- Pakai **Indexing API** (untuk konten news/job posting, bukan real estate)
- **Ping Google** dengan `curl "https://www.google.com/ping?sitemap=https://menantu-resort.com/sitemap-index.xml"`
- Tambah **backlink berkualitas** dari direktori bisnis / press release
- Share ke **social media** (Google crawl dari sinyal sosial)

---

## 📚 Resources

- [Google Search Console Help](https://support.google.com/webmasters/)
- [Sitemap best practices](https://developers.google.com/search/docs/sitemaps/build-sitemap)
- [FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)

---

*Last updated: 2026-06-17 · Menantu Resort SEO Build · 148 artikel SEO + 163 URL sitemap · Generated by Codex*
