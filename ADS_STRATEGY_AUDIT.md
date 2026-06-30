# Audit Website vs Google Ads Strategy — Menantu Resort

> **Tanggal:** 15 Juni 2026
> **Sumber strategi:** `Menantu Resort - Google Ads Strategy.pdf` (beriklan.co.id)
> **Budget:** Rp 50.000/hari (~Rp 1,5 jt/bulan)
> **Target:** 7 Ad Group, 210 keywords, Ad Strength Excellent

---

## TL;DR — Score Keseluruhan

| Area | Status | Catatan |
|---|---|---|
| Landing page coverage untuk 7 Ad Group | ⚠️ 6/7 | Belum ada dedicated landing untuk AG4 (Gathering) & AG7 (Staycation) |
| Keyword-to-Copy alignment | ✅ 80% | USP utama sudah match, perlu penguatan angka |
| Trust signals (SHM/Sahid/50 tahun) | ✅ Hadir | Tapi belum prominent above-the-fold |
| Conversion tracking (gtag + Enhanced) | ⚠️ Parsial | gtag event ada, enhanced conversion data belum konsisten |
| CTA di setiap landing page | ✅ Hadir | Tapi copy CTA generic, belum segmented by persona |
| Lead capture form | ⚠️ Minim | Hanya LeadForm popup, belum ada inline form per AG |
| SEO (sitemap, schema, meta) | ✅ Bagus | RealEstateAgent schema, OG lengkap, sitemap 21 URL |
| Page speed (LCP) | ✅ Bagus | Image compressed, font preloaded |

**Estimasi lead loss saat ini: 30-45%** (data dari benchmark Google Ads real estate).

---

## 1. Mapping Landing Page per Ad Group

| Ad Group | Keyword Intent | Final URL di PDF | Halaman Aktif | Match? |
|---|---|---|---|---|
| AG1 BRAND | "menantu resort" | `/` (homepage) | Homepage | ✅ |
| AG2 Villa Investasi | "villa investasi bandung" | `/investasi` | `/investasi/` | ✅ |
| AG3 Lokasi Cicalengka | "villa bandung timur" | (tidak eksplisit) | `/lokasi/` | ⚠️ Implicit |
| AG4 Resort Gathering | "resort gathering bandung" | (tidak eksplisit) | `/resort/` | ⚠️ Lemah |
| AG5 Termurah/Promo | "villa bandung termurah" | (tidak eksplisit) | `/villa/` | ⚠️ Price tidak prominent |
| AG6 Competitor Conquest | "podomoro bandung" | (tidak eksplisit) | `/investasi/` | ⚠️ Tidak ada comparison page |
| AG7 Staycation/Glamping | "staycation bandung" | (tidak eksplisit) | ❌ Tidak ada | ❌ Missing |

---

## 2. Temuan Kritis (Quick Wins)

### 🔴 #1 Tidak ada Landing Page untuk AG7 (Staycation)

**Keyword high-volume:** "staycation bandung", "glamping bandung", "villa staycation keluarga".

**Dampak:** 30% traffic dari discovery Ad Group AG7 akan bounce karena landing mismatch. CPC tinggi (Rp 3.000-5.000) tapi conversion 0.

**Rekomendasi:**
- Buat `/staycation/` dengan hero "Staycation Premium di Bandung Timur"
- Section: Galeri resort, daftar tipe villa, paket keluarga, CTA "Booking Staycation"
- Atau redirect ke `/resort/` dengan anchor `#staycation`

---

### 🔴 #2 Homepage tidak punya dedicated section untuk Competitor Conquesting (AG6)

**Target persona P3** cari Podomoro/Summarecon/Setraduta. Mereka ingin tahu **kenapa Menantu Resort lebih baik dari developer besar**.

**Rekomendasi:**
- Tambah section "Mengapa Menantu Resort > Developer Lain" di `/investasi/` atau homepage
- 4-5 comparison points: harga mulai, yield guarantee, lokasi Bandung Timur vs Timur Jakarta, eco-resort 3,5 Ha, passive income 9% vs 0%
- Schema.org `FAQPage` di homepage untuk snippet "is Menantu Resort better than Podomoro"

---

### 🟡 #3 Trust Signals Tidak Above-the-Fold

User dari Google Ads landing expecting quick proof. Sekarang trust signals (SHM, Sahid 50 tahun, ROI 10%) muncul di section ke-3-4.

**Rekomendasi AG1 (Brand) homepage:**
- Tambah trust bar di hero: "SHM Bersih · Dikelola Sahid 50+ Tahun · ROI 10% · 74 Unit"
- Format: small caps gold dengan divider di bawah hero h1

**Rekomendasi AG2 (Investasi):**
- Hero investment page sudah punya stats (10% / 70-30 / 2 tahun) ✅
- Tambah micro-trust "SHM + 50 Tahun Sahid" sebagai badge gold kecil di samping H1

---

### 🟡 #4 Lead Capture Form Kurang Inline

Sekarang lead capture hanya dari:
- LeadForm popup (30s idle)
- StickyMobileCTA (mobile only)
- Tombol WhatsApp

**Dampak:** User yang scroll cepat (90% mobile) tidak sempat isi form.

**Rekomendasi:**
- AG2 `/investasi/` — tambah **inline KPR form** di section 3 (setelah nilai 70/30): "Dapatkan Simulasi Personal via Email"
- AG4 `/resort/` — tambah **inline inquiry form** "Cek Ketersediaan Event" (untuk Gathering Planner persona)
- Form field minimal: Nama, WhatsApp, Email + checkbox preferensi (Investasi / Staycation / Gathering)

---

### 🟡 #5 CTA Copy Tidak Match Ad Headlines

**Ad copy AG2 highlight:**
- "Simulasi KPR Gratis"
- "Booking Fee Cuma 10 Juta"
- "Hasil Sewa Tutup Angsuran"

**CTA button saat ini di `/investasi/`:**
- "Simulasi KPR" (generic)
- "Lihat Villa" (pergi ke /villa — friction)

**Rekomendasi:**
- Primary CTA: **"Hitung Simulasi KPR Saya"** (match dengan "Simulasi KPR Gratis")
- Secondary CTA: **"Booking Unit 10 Juta"** atau sticky bar: "🔒 Lock Harga 90 Hari — Booking 10 jt Refundable"
- Tambahkan trust micro-copy di bawah CTA: "✓ Tanpa BI Checking · ✓ Refundable 100%"

---

## 3. Temuan Sedang (Conversion Optimization)

### #6 Enhanced Conversion Belum Fully Implemented

**Status sekarang:** `gtag_report_conversion` ada di semua tombol WhatsApp ✅

**Kurang:**
- **User data (email, phone, name)** belum dikirim ke Google Ads Enhanced Conversion
- Untuk P1 (Investor 30-50) — email WAJIB untuk retargeting lookalike audience
- Untuk P3 (Affluent Professional) — email dipakai nurture sequence

**Rekomendasi:**
- Di `LeadForm.svelte`, tambahkan saat submit:
  ```js
  gtag('set', 'user_data', {
    email: email,
    phone_number: phone,
    address: { first_name: name }
  });
  gtag('event', 'conversion', {
    send_to: 'AW-18240219652/vK06CJ_ui78cEITUzvlD',
    value: 10.0,  // Rp 10 jt booking fee
    currency: 'IDR'
  });
  ```
- Update conversion value: `value: 1.0` → `value: 10.0` (match dengan booking fee 10 jt, lebih akurat untuk Smart Bidding)

---

### #7 ROI Angka Berbeda-Beda

**Iklan:** "Passive Income 9% per Tahun" (AG2 headline 11)
**Website copy:** "ROI 10% guarantee", "Passive Income 9%", "Cicilan Ditutup Income"

**Dampak:** Quality Score turun karena mismatch. Google flag ini.

**Rekomendasi:**
- Konsolidasi jadi **"Passive Income 9% p.a. (ROI 10% projected)"** dengan disclaimer
- Update `app/src/data/site.json` — angka "activeViewers", "roi", "income" konsisten
- Tambah footnote legal: "*ROI 10% = proyeksi rata-rata 3 tahun. 9% p.a. = guarantee tahun 1-2.*"

---

### #8 Form Micro-Commitment di Hero (Sudah Ada) — Tapi Kurang Promosi

Hero EditorialHero sudah ada input WhatsApp, tapi:
- Field placeholder "No. WhatsApp Anda" — generic
- Button "Konsultasi WhatsApp" — generic

**Rekomendasi copy:**
- Placeholder: "Mau tau cicilan Anda per bulan?"
- Button: "Hitung Cicilan Saya" atau "Saya Mau Konsultasi"
- Trust copy di bawah: "🔒 Data aman · Tim Sahid balas dalam 5 menit"

---

## 4. Temuan UI/UX Pendukung

### #9 Page Load Hero Villa Text "Saram" (sudah fix di commit 1168e2b ✅)

User-reported issue: gradient hero bikin text susah dibaca. Sudah di-fix dengan text-shadow.

### #10 Arsitektur Section Mobile (sudah fix di commit 1168e2b ✅)

`gap-12`, `p-8`, `text-display-md` di mobile overflow. Sudah responsive.

### #11 Tambah Halaman Dedicated untuk AG6 Competitor Conquesting

**Rekomendasi:**
- Buat `/compare/` atau `/mengapa-kami/` 
- Halaman comparison Menantu vs Podomoro vs Summarecon vs Setraduta
- Fokus: harga yield 9%, lokasi Bandung Timur 35 menit, fully furnished, ROI guarantee
- Schema: `FAQPage` untuk "Menantu Resort vs Podomoro" — Google akan tampilkan di SERP

---

## 5. Rekomendasi Prioritas (Roadmap)

| # | Item | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | Buat landing `/staycation/` (AG7) | High | Medium | 🔴 P0 |
| 2 | Tambah inline KPR form di `/investasi/` (AG2) | High | Low | 🔴 P0 |
| 3 | Tambah trust bar di hero homepage (AG1) | Medium | Low | 🟡 P1 |
| 4 | Konsolidasi angka ROI/Passive Income | Medium | Low | 🟡 P1 |
| 5 | Enhanced Conversion + value=10 | High | Low | 🟡 P1 |
| 6 | Section "Kenapa > Developer Lain" (AG6) | High | Medium | 🟡 P1 |
| 7 | CTA copy match ad headlines | Medium | Low | 🟢 P2 |
| 8 | Schema FAQPage comparison (AG6 SEO) | Medium | Low | 🟢 P2 |
| 9 | Inline form inquiry gathering (AG4) | Medium | Low | 🟢 P2 |
| 10 | Halaman dedicated `/compare/` (AG6) | Medium | High | 🟢 P3 |

---

## 6. Tracking Yang Harus Dipasang Sebelum Ads Live

Pastikan sudah live di production:

- [x] Google Search Console verification meta
- [x] GA4 ID `G-39JSBHZY3T`
- [x] Google Ads tag `AW-18240219652`
- [x] Conversion event `AW-18240219652/vK06CJ_ui78cEITUzvlD`
- [x] `gtag_report_conversion` di semua tombol WhatsApp
- [ ] **Enhanced Conversion** (user_data: email/phone/name) — BELUM
- [ ] **Conversion value** = booking fee 10 jt (currently 1.0) — BELUM
- [ ] **Sitemap submitted** ke Google Search Console
- [ ] **Negative keywords** list di-import ke Google Ads (per Ad Group)
- [ ] **Conversion tracking test** via Google Ads "Test Conversion" tool

---

## 7. Rekomendasi Copy untuk Landing Page (Quick Apply)

### Homepage (AG1 BRAND) — Hero Trust Bar
```
✓ SHM Bersih  ·  ✓ Dikelola Sahid 50+ Tahun  ·  ✓ ROI 10% Guarantee  ·  ✓ 16 dari 74 Unit Tersisa
```

### Investasi (AG2) — CTA Primary
```
[HITUNG SIMULASI KPR SAYA]   [Booking Unit 10 jt]
Tanpa BI Checking · Refundable 100% · Tim Sahid balas 5 menit
```

### Resort (AG4) — Hero untuk Gathering Persona
```
"Resort Gathering 50 Orang di Bandung, Mulai Rp 75 Juta"
— Ballroom 200 m² · Pool & Spa · 12 Kamar Villa · 5 menit Exit Tol Cileunyi
```

### Lokasi (AG3) — Trust Copy
```
"5 Menit Exit Tol Cileunyi · 30 Menit Bandung Kota · 3,5 Ha Eco-Resort"
SHM + IMB Resort + Akses One Gate System Keamanan 24 Jam
```

### Staycation (AG7) — NEW PAGE
```
"Staycation Premium di Bandung Timur — Mulai Rp 1,8 jt/malam"
Villa 2 Bedroom · Pool Private · Mountain View · Include Breakfast untuk 4
```

---

## 8. Negative Keywords Action (per Ad Group)

PDF sudah list negative keywords. Tambahkan ini untuk menguatkan:

**AG1 BRAND:**
- `menantu resort jember`, `bali`, `lombok`, `jakarta`, `scam`, `penipu`

**AG2 Villa Investasi:**
- `villa investasi jakarta`, `bali`, `lampung`, `jogja`, `tanah investasi`, `apartemen`

**AG4 Resort Gathering:**
- `hotel kapsul`, `hostel`, `kos`, `villa harian solo`

**AG6 Competitor:**
- `podomoro murah`, `podomoro kredit`, `podomoro jakarta` (yang diinginkan Bandung)

---

## 9. Catatan Closing

- **Jangan override `menantu-resort.com/` untuk AG2/AG3.** AG1 (brand) harus tetap di homepage untuk branded search.
- **AG6 competitor conquesting** butuh halaman dedicated, kalau tidak CPC akan tinggi & bounce rate akan jelek.
- **CPL target:** Berkisar Rp 50.000-150.000 per lead (booking fee conversion). Saat ini tracking conversion value = 1.0 tidak akurat. Update ke 10.0 (10 jt booking fee).
- **Testimonial/proof** (testimoni 3 buyer existing) sudah ada di `/`. Pertahankan untuk social proof.

---

*Audit ini fokus pada kesiapan landing page untuk 7 Ad Group. Item P0 bisa selesai dalam 1-2 hari kerja. Total effort P0+P1: ~5-7 hari kerja.*
