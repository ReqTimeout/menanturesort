# 📋 PLAN PROMO PAGE — `/promo` Campaign Landing

> **Tujuan:** Halaman campaign dedicated untuk Google Ads + Meta Ads dengan fokus 1 KPI — **lead WhatsApp masuk**.
> **Stack:** Astro 5 (static) + Svelte 5 (islands) + Tailwind 3 + existing design system.
> **Tidak ada video** di project — strategi visual: drone aerial + render villa + 360° panorama interaktif.
> **Tracking:** GA4 (✅ ada) + Google Ads (✅ ada) + Meta Pixel (❌ perlu ditambah).

---

## 🎯 0. Ringkasan Eksekutif

### Target KPI

| Metric | Target | Rationale |
|---|---|---|
| **Bounce rate** | < 40% | Landing page campaign ideal 30-45% |
| **Form submit → WA** | > 25% | Standard landing form conversion 15-30% |
| **Exit-intent capture** | +5-10% additional leads | Safety net untuk non-converters |
| **LCP (Largest Contentful Paint)** | < 2.5 detik | Google Ads Quality Score |
| **Mobile load** | < 3 detik 3G | 60-70% traffic Ads = mobile |
| **CTR WhatsApp button** | > 8% | Direct conversion path |

### Page Architecture (1 page, 11 sections)

```
┌─────────────────────────────────────────────────────────┐
│ 1. STICKY NAV (minimal — scroll-aware, hidden on scroll down)│
├─────────────────────────────────────────────────────────┤
│ 2. HERO — Countdown + headline + form inline + hero image│
├─────────────────────────────────────────────────────────┤
│ 3. PROOF BAR — 58/74 unit terjual + 12 closing bulan ini │
├─────────────────────────────────────────────────────────┤
│ 4. PROMO 3 PILLAR — Diskon + Bonus + Booking Lock-harga │
├─────────────────────────────────────────────────────────┤
│ 5. SCARCITY LIVE — Stok real-time + progress bar         │
├─────────────────────────────────────────────────────────┤
│ 6. WHY NOW — Story (3 why now)                          │
├─────────────────────────────────────────────────────────┤
│ 7. VILLA SHOWCASE — 3 tipe dengan "best value" anchor   │
├─────────────────────────────────────────────────────────┤
│ 8. PROMO MATH — Visual: tanpa promo vs dengan promo     │
├─────────────────────────────────────────────────────────┤
│ 9. TRUST BAND — SHM + Sahid + Bank resmi               │
├─────────────────────────────────────────────────────────┤
│ 10. FAQ SNIPPET — 5 critical questions                  │
├─────────────────────────────────────────────────────────┤
│ 11. FINAL CTA — Dark forest + countdown + double CTA    │
└─────────────────────────────────────────────────────────┘
        + Exit-intent popup (overlay) — desktop mouse + mobile back
        + Sticky mobile CTA bar
        + WhatsApp floating (desktop)
```

---

## 📦 1. Audit Aset yang Tersedia

### 1.1 Foto (production-ready, 100% usable)

| Path | Size | Pakai Untuk |
|---|---|---|
| `app/public/images/hero/hero-aerial-{800,1280,1920}.{webp,jpg}` | 50-291 KB | Hero (pakai webp 1920) |
| `app/public/images/villa/idaman/hero-row.jpeg` | 375 KB | Villa showcase (Best Value) |
| `app/public/images/villa/mapan/hero-detail.jpeg` | 368 KB | Hero section (kiri/kanan) |
| `app/public/images/villa/bijak/hero-row.jpeg` | 373 KB | Villa showcase |
| `app/public/images/villa/mapan/street-view.jpeg` | 404 KB | Trust band (sudah delivered) |
| `app/public/images/interior/hero/bathroom-bathtub.jpg` | 332 KB | Interior carousel |
| `app/public/images/interior/hero/kitchen-sink.jpg` | 362 KB | Interior carousel |
| `app/public/images/interior/hero/stairs-cream.jpg` | 275 KB | Interior carousel |
| `app/public/images/360/panorama-main.jpg` | 3.0 MB | Interactive 360° viewer |
| `app/public/images/360/panorama-poster.jpg` | 51 KB | 360° poster/loading state |
| `app/public/og/og-image.png` | 731 KB | Open Graph fallback |

### 1.2 Yang TIDAK ADA (jangan dijanjikan di copy)

- ❌ Video marketing (0 file `.mp4/.webm/.mov`)
- ❌ Lifestyle photos (folder `lifestyle/` kosong)
- ❌ Testimoni avatar/foto (semua SVG placeholder)
- ❌ Foto facilities (folder kosong, pakai SVG placeholder)

> **Strategi:** Jangan tulis "lihat video tour" di copy. Ganti dengan **"Lihat 360° Virtual Tour"** (asset panorama sudah ada).

### 1.3 Saran tambahan (optional, non-blocking)

- Pakai **pano poster + Photo Sphere Viewer** interaktif untuk Section 7 Villa Showcase (existing component `Panorama360.svelte` di `app/src/components/svelte/Panorama360.svelte`).
- Generate 1 foto lifestyle "keluarga di villa" via nanobanana (Phase 7 existing) untuk Section 6 *Why Now*.

---

## 🏷️ 2. Audit Promo Saat Ini (dari `app/src/data/site.json:363-374`)

```json
"promo": {
  "title": "Promo Spesial Pembelian Bulan Ini",
  "subtitle": "Amankan unit terbaik + bonus eksklusif minggu ini",
  "discount": "Rp 200 Juta",
  "discountDesc": "Potongan harga langsung untuk Master Suite & Deluxe",
  "bonus": "Mobil Listrik Baru",
  "bonusDesc": "Bonus langsung untuk 10 pendaftar pertama",
  "deadline": "2026-07-30T23:59:59+07:00",   // ⚠️ Update dari 2026-06-30 ke 2026-07-30
  "deadlineLabel": "30 Juli 2026, 23:59 WIB", // ⚠️ Update dari "30 Juni" ke "30 Juli"
  "quota": "10 pendaftar pertama",
  "sk": "Berlaku untuk unit Master Suite & Deluxe. Tidak dapat digabung dengan promo lain. S&K berlaku."
}
```

> **⚠️ ACTION REQUIRED:** Edit `app/src/data/site.json` line 370-371 — ubah `2026-06-30` ke `2026-07-30` dan `"30 Juni 2026"` ke `"30 Juli 2026"`. Hal yang sama untuk hardcoded values di `PromoSpesialSection.svelte:23-24`, `FinalCTASection.svelte:18`, dan `CountdownTimer.svelte:6` (comment).

**Stats relevan** (site.json line 80-83):
```json
"promoDiscount": "Rp 200 Juta",
"promoBonus": "Mobil listrik + survei gratis",
"soldThisMonth": 12,
"activeViewers": 8
```

**Stats unit** (site.json line 75-78):
```json
"totalUnits": 74, "unitsSold": 58, "kawasanSize": "3.5 Ha"
```
→ **Sisa 16 unit** (FOMO scarcity real-data)

> **⚠️ CORRECTION:** Deadline promo **30 Juli 2026** (bukan 30 Juni). Update semua referensi `2026-06-30` dan `30 Juni 2026` di bawah ke `2026-07-30` dan `30 Juli 2026`. Yang lain (diskon, bonus, kuota) tetap.

---

### 2.1 Inventarisasi komponen yang bisa di-reuse

| Komponen | Path | Pakai Di |
|---|---|---|
| `PageHero.astro` | `app/src/components/astro/PageHero.astro` | Section 2 (Hero) |
| `SectionDivider.astro` | `app/src/components/astro/SectionDivider.astro` | Between sections |
| `SectionBackground.astro` | `app/src/components/astro/SectionBackground.astro` | Backdrop atmosferik |
| `Pattern.astro` | `app/src/components/astro/Pattern.astro` | Gold dots texture |
| `Footer.astro` | `app/src/components/astro/Footer.astro` | Bottom |
| `PromoSpesialSection.svelte` | `app/src/components/svelte/PromoSpesialSection.svelte` | Section 4 (extended) |
| `CountdownTimer.svelte` | `app/src/components/svelte/CountdownTimer.svelte` | Hero + Section 11 |
| `UrgencyBanner.svelte` | `app/src/components/svelte/UrgencyBanner.svelte` | Section 5 |
| `InlineLeadForm.svelte` | `app/src/components/svelte/InlineLeadForm.svelte` | Section 2 (Hero form) |
| `WhatsAppButton.svelte` | `app/src/components/svelte/WhatsAppButton.svelte` | All CTAs |
| `FinalCTASection.svelte` | `app/src/components/svelte/FinalCTASection.svelte` | Section 11 |
| `LiveActivityTicker.svelte` | `app/src/components/svelte/LiveActivityTicker.svelte` | Section 5 |
| `StockToast.svelte` | `app/src/components/svelte/StockToast.svelte` | Already in BaseLayout |
| `LiveActivity.svelte` | `app/src/components/svelte/LiveActivity.svelte` | Already in BaseLayout |
| `Marquee.svelte` | `app/src/components/svelte/Marquee.svelte` | Section 3 (Proof bar) |
| `NavMenu.svelte` | `app/src/components/svelte/NavMenu.svelte` | Sticky nav |
| `WhatsAppFloating.astro` | `app/src/components/astro/WhatsAppFloating.astro` | Desktop WA button |

### 2.2 Komponen BARU yang perlu dibuat

| Komponen | Path | Fungsi |
|---|---|---|
| `PromoHero.svelte` | `app/src/components/svelte/PromoHero.svelte` | Hero khusus promo: count down + form inline + visual stack |
| `ExitIntentPopup.svelte` | `app/src/components/svelte/ExitIntentPopup.svelte` | Desktop mouse-leave + mobile back-button + scroll-out |
| `PromoVillaShowcase.svelte` | `app/src/components/svelte/PromoVillaShowcase.svelte` | 3 villa cards + "best value" anchor + price cut visual |
| `PromoMathSection.svelte` | `app/src/components/svelte/PromoMathSection.svelte` | Visual perbandingan tanpa vs dengan promo |
| `WhyNowSection.svelte` | `app/src/components/svelte/WhyNowSection.svelte` | 3 reasons why book now (FOMO narrative) |
| `PromoFAQSection.svelte` | `app/src/components/svelte/PromoFAQSection.svelte` | 5 critical questions accordion |

---

## 📝 3. Copywriting — Storytelling Framework

> **Prinsip:** Bahasa Indonesia conversational, "Anda", power words dari `MASTER_PLAN.md` line 338-343.
> **Anti-power words** (line 419-421): hindari "Murah, Diskon, Ayo, Yuk, Gratis, Cashback" — pakai alternatif premium.

### 3.0 Target Audience Persona & Pain Framework

#### 3.0.1 Primary Persona — "Budi, 38, Profesional Jakarta"

- **Demographic:** Laki-laki/empuan, 32-50 tahun, domisili Jabodetabek/Bandung, income Rp 25-80 jt/bulan
- **Pekerjaan:** Profesional korporat, wirausaha mapan, expatriat return
- **Aset:** Deposito Rp 500jt-2M, reksadana, mungkin sudah punya 1 rumah tinggal
- **Mindset:** Risk-averse tapi sadar deposito "kalah" sama inflasi. Cari sesuatu yang *tangible* dan *cashflow*
- **Pain utama:**
  1. *"Uang saya di deposito diam, malah tergerus inflasi 5-6% per tahun."*
  2. *"Saya pernah lihat teman investasi bodong. Saya tidak mau jadi korban."*
  3. *"Saya sibuk kerja, tidak ada waktu urus properti."*
  4. *"Saya tidak yakin property masih naik di 2026 — banyak yang bilang 'gelembung'."*
  5. *"Saya sudah lihat banyak brosur, semua janji manis. Apa bedanya ini?"*
- **Aspirasi:**
  1. *"Saya mau passive income yang jelas, bukan angka di spreadsheet."*
  2. *"Saya mau tempat retreat keluarga yang bisa diwariskan."*
  3. *"Saya mau bebas dari keputusan 'uang diam di bank' setiap akhir bulan."*
- **Objection killer:** Booking fee refundable 100% (zero risk untuk mulai), Sahid brand 50 tahun, SHM legalitas tertinggi
- **Trigger decision:** Lihat orang-orang di kota yang *sudah* pesan (FOMO), atau hitung "rugi diam" deposito 1 tahun

#### 3.0.2 Story Arc Framework (per section)

Setiap section mengikuti **5-act emotional arc**:

```
1. HOOK       — Tahan attention 3 detik pertama
2. PROBLEM    — Sentuh rasa sakit / ketakutan / keraguan
3. INSIGHT    — Beri cara pandang baru / angle yang belum terpikirkan
4. PROMISE    — Tawarkan transformasi konkret
5. PROOF + CTA — Bukti + langkah aksi
```

#### 3.0.3 Power Words Bank (Indonesian-context, sesuai brand)

| Kategori | Words | Pakai Di |
|---|---|---|
| **Trust** | Sahid, 50 tahun, SHM, refundable, transparan, tersertifikasi | Hero, Trust band, FAQ |
| **Cashflow** | Cicilan ringan, passive income, surplus bulanan, cashflow positif | Hero, Promo Math, FAQ |
| **Growth** | Naik 28% YoY, capital gain, aset masa depan, berkembang | Hero, Why Now, Final CTA |
| **Freedom** | Bebas urus, otomatis, warisan keluarga, pensiun tenang | Hero, Final CTA |
| **Scarcity** | 16 unit tersisa, 10 pendaftar, 90 hari lock-harga, slot terbatas | Hero, Scarcity, Final CTA |
| **Restraint** | Sebanding, terukur, rasional, terstruktur, pasti | Math section, FAQ |

#### 3.0.4 Anti-Power Words (JANGAN DIPAKAI)

❌ Murah · Diskon · Ayo · Yuk · Gratis · Cashback · Buru-buru · Cepat · Special · Limited

**Pengganti yang brand-aligned:**
- Murah → **"harga Q2 2026"** atau **"cicilan ringan"**
- Diskon → **"potongan langsung"** atau **"hemat Rp X juta"**
- Ayo/Yuk → **"mulai"** atau **"sekarang"** atau **"di tahun ini"**
- Gratis → **"termasuk"** atau **"dari kami"**
- Cashback → **"subsidi cicilan"** atau **"bonus langsung"**
- Buru-buru → **"sebelum"** atau **"slot terbatas"**
- Special → **"eksklusif"** atau **"pembelian minggu ini"**
- Limited → **"kuota 10"** atau **"16 unit tersisa"**

---

### 3.1 Section 1 — Sticky Nav

**Style:** Minimal, transparan di atas hero, jadi solid cream setelah scroll > 100px.

**Elemen:**
- Logo gold (kiri)
- Anchor links: `#promo | #unit | #villa | #konsultasi` (tengah)
- CTA: "Konsultasi WhatsApp" (kanan, gold outline)
- **TANPA** link ke Beranda/Villa/Artikel (fokus 1 goal)

> Karena ini campaign page, nav standard site akan **mengganggu conversion**. Pakai nav sederhana khusus.

### 3.2 Section 2 — Hero (First 5 Seconds + Storytelling)

**Layout:** Asymmetric 60/40 — kiri copy + countdown + mini form, kanan hero image dengan badge promo.

**Story role:** Hook + Promise. Berhentikan scroll dalam 3 detik. Satu kalimat = satu emosi.

#### 3.2.1 Eyebrow (mono gold uppercase)
```
— DIKELOLA SAHID · BERSERTIFIKAT SHM · 16 DARI 74 UNIT
```

#### 3.2.2 Headline (Fraunces 2.5-5rem, italic gold accent)

**Variant A — Investment angle (default):**
```html
<h1>
  Villa Bukit Bandung<br/>
  dengan <em>Cicilan Rp 9 Juta</em><br/>
  yang Bekerja Untuk Anda.
</h1>
```

**Variant B — Aspirational angle (A/B test):**
```html
<h1>
  Saatnya Uang Anda<br/>
  Bekerja, Bukan Tidur<br/>
  di <em>Deposito.</em>
</h1>
```

**Variant C — Loss-aversion angle:**
```html
<h1>
  Tahun Depan, Harga Naik<br/>
  Rp 200 Juta. Hari Ini,<br/>
  <em>Anda Masih Bisa Lock.</em>
</h1>
```

**Variant D — Story angle (paling emosional):**
```html
<h1>
  "Kalau 5 Tahun Lalu<br/>
  Saya Tahu Ini, Saya<br/>
  <em>Sudah Punya 3 Unit."
</h1>
```
*(Sub: Testimoni Budi Hartono, 42, Jakarta — sudah 2 unit Mapan)*

#### 3.2.3 Sub-headline (3 kalimat, 1 emosi setiap kalimat)

> "Bayangkan punya villa di puncak Bandung yang bekerja untuk Anda — disewakan, dikelola Sahid Hotel & Resort, menghasilkan passive income Rp 9-15 juta per bulan. Mulai dari Rp 1,2 M, dengan booking fee Rp 5 juta yang 100% refundable. Untuk minggu ini, Anda mendapat bonus Mobil Listrik Baru. Untuk 10 pendaftar pertama."

- Font: Inter, 18-20px, `text-ink-soft` (dark mode) / `text-ink-700` (light mode)
- Max-width 2xl, line-height 1.6
- 3 kalimat → emosional → rasional → urgency

#### 3.2.4 Trust micro-row (4 badges)
```
[SHM]  [Sahid 50+ tahun]  [Booking Rp 5jt refund]  [16 dari 74 unit]
```

#### 3.2.5 Countdown Timer
- Pakai `CountdownTimer.svelte` size="lg"
- Forest-700 bg + gold-500 value

#### 3.2.6 Mini Form (inline, 2 fields + CTA)
- 2 fields: Nama + WhatsApp
- Tombol: gold-500, "KLAIM PROMO VIA WHATSAPP"
- Di bawah: "Respon 5 menit · Data aman · Tanpa spam"

#### 3.2.7 Hero Image (kanan)
- Source: `hero-aerial-1920.webp` (1920w, 144 KB) dengan `loading="eager"`
- Aspect ratio 4/5
- Overlay badge kanan-atas: "SISA 16 UNIT" (forest-700 bg, gold-500 text, pulse)
- Overlay badge kiri-bawah: "Rp 9 jt/bln — Cicilan mulai" (cream bg, forest text)

#### 3.2.8 Social proof footer (subtle, di bawah form)
> "Bergabung dengan 58 investor yang sudah memiliki unit · 12 closing bulan ini"

---

### 3.3 Section 3 — Proof Bar (Marquee)

**Komponen:** `Marquee.svelte` (re-use existing) dengan item FOMO + trust:

```
★ Sisa 16 dari 74 unit          ★ SHM bukan Hak Pakai
★ Booking Rp 5 juta refundable  ★ Diskon Rp 200 juta
★ Bonus Mobil Listrik Baru      ★ Sahid 50+ tahun
★ Cicilan mulai Rp 9 jt/bln     ★ 12 investor closing bulan ini
★ Passive income 9-15% p.a.     ★ Bandung Timur naik 28% YoY
★ Diskon berakhir 30 Juli 2026  ★ Kuota 10 pendaftar pertama
```

- Background: forest-700
- Text: gold-500, mono uppercase tracking-widest
- Animate marquee, infinite loop, 35s duration

### 3.4 Section 4 — 3 Promo Pillar (Apa yang Anda Dapatkan Minggu Ini)

**Layout:** 3 kolom desktop, 1 kolom stacked di mobile.

**Story role:** Promise (jabarkan). Setelah hero pancing atensi, section ini jawab: "Secara konkret, apa untungnya untuk Anda?"

**Section intro (kiri, 5 col):**
> "Bukan sekadar promo. Ini adalah tiga hal konkret yang membuat minggu ini menjadi titik paling masuk akal untuk mengambil keputusan."

#### Pillar 1 — Potongan Langsung Rp 200 Juta

**Eyebrow:** "POTONGAN LANGSUNG"
**Value:** "Rp 200 Juta"
**Sub (3 kalimat storytelling):**
> "Harga Q2 2026 berlaku untuk minggu ini. Untuk Q3 2026, harga Master Suite naik Rp 150-200 juta dan Deluxe naik Rp 100-150 juta. Potongan ini tidak di-markup dulu, tidak di-cashback kemudian — langsung dari harga villa. Sisa unit yang mendapatkan harga ini hanya 16 dari 74 total unit. Setelah 30 Juli 2026, harga naik."
**Icon:** TrendingDown (lucide)

#### Pillar 2 — Mobil Listrik Baru

**Eyebrow:** "BONUS LANGSUNG"
**Value:** "Mobil Listrik Baru"
**Sub:**
> "Wuling Air ev atau setara, di-hand-over setelah akad dengan STNK atas nama Anda. Bukan voucher, bukan undian, bukan cashback. Aset nyata yang bisa Anda pakai sendiri atau sewakan terpisah untuk passive income tambahan Rp 3-4 juta per bulan. Kuota 10 unit pertama. Setelah itu, bonus hangus."
**Icon:** Car (lucide)

#### Pillar 3 — Lock Harga 90 Hari

**Eyebrow:** "KEAMANAN TRANSAKSI"
**Value:** "Harga Terkunci 90 Hari"
**Sub:**
> "Booking Rp 5 juta mengunci harga hari ini selama 90 hari. Artinya meskipun promo berakhir 30 Juli, meskipun kenaikan harga Q3 terjadi, meskipun unit yang Anda incar terjual orang lain — Anda tetap dapat harga dan unit ini. Booking fee 100% refundable dalam 30 hari jika Anda berubah pikiran. Tidak ada risiko untuk mulai. Hanya 10 slot lock-harga untuk minggu ini."
**Icon:** ShieldCheck (lucide)

**Card style:**
- Background: cream-50
- Border: gold-500 2px
- Hover: lift -4px, gold top-line animate
- Sharp corners (radius 0)
- 1 gold icon circle 64x64

---

### 3.5 Section 5 — Live Scarcity (Real-Time, Bukti)

**Komponen:** Custom block + `UrgencyBanner.svelte` (existing) + `LiveActivityTicker.svelte` (existing)

#### 5.1 Stok Progress Bar
```html
<div>
  <div class="flex justify-between text-xs mb-2">
    <span>58 unit terjual</span>
    <span class="text-gold-700">16 unit tersisa</span>
  </div>
  <div class="w-full h-2 bg-cream-100">
    <div class="h-full bg-gradient-to-r from-forest-500 to-gold-500" style="width:78.4%"></div>
  </div>
  <div class="text-[10px] text-ink-mute mt-1">*Diperbarui real-time</div>
</div>
```

#### 5.2 Live Activity Ticker
Pakai `LiveActivityTicker.svelte` (sudah ada di `app/src/components/svelte/LiveActivityTicker.svelte`):
- Cycle 6 events dari `siteData.liveEvents`
- Animated gold dot, fade in/out 6 detik

#### 5.3 UrgencyBanner
- `urgencyLevel="high"` (16 unit = high, di ≤15 critical)
- Countdown to deadline
- CTA "Klaim Sekarang" gold

### 3.6 Section 6 — Why Now (Tiga Alasan Tidak Boleh Menunda)

**Layout:** 3 stacked rows, alternating image/copy (zigzag).

**Story role:** Problem + Insight. Sentuh keraguan, lalu berikan cara pandang baru.

**Section intro (center, max-w-2xl):**
> "Kalau Anda sudah membaca sampai sini, Anda sudah melewati 80% pengunjung yang langsung menutup halaman. Ada tiga alasan kenapa momen ini — bukan besok, bukan bulan depan, bukan setelah 'nanti mikir dulu' — adalah momen yang tepat."

---

#### Block 1 — "Harga Properti Tidak Pernah Turun. Hanya Naik, dan Naik Lagi."

**Headline:** "Harga Properti Tidak Pernah Turun. Hanya Naik, dan Naik Lagi."

**Body (3 paragraf storytelling):**
> "Sejak 2024, harga properti Bandung Timur sudah naik 28% year-on-year. Cicalengka — yang dulu dianggap 'pinggiran' — kini menjadi incaran karena tol Cisumdawu, bandara Kertajati, dan kehadiran brand-brand besar.
>
> Untuk Q3 2026, harga Master Suite di Menantu Resort diproyeksikan naik Rp 150-300 juta. Ini bukan tebakan. Ini adalah schedule harga yang sudah diumumkan developer di prospectus resmi, sama seperti kenaikan tiket pesawat setiap musim liburan.
>
> Booking hari ini mengunci harga Q2 2026. Bukan janji, tapi kontrak: jika dalam 90 hari harga naik, Anda tetap dapat harga hari ini. Jika dalam 90 hari Anda berubah pikiran, booking fee 100% kembali. Ini satu-satunya cara untuk 'memiliki' harga masa lalu."

**Image:** `villa/mapan/hero-detail.jpeg` (368 KB)

---

#### Block 2 — "Sahid Baru Saja Membuka Pool Booking High-Season."

**Headline:** "Sahid Baru Saja Membuka Pool Booking High-Season."

**Body:**
> "Sahid Hotel & Resort, brand yang sudah mengelola 20+ hotel dan 50+ tahun reputasi, baru saja membuka pool booking khusus untuk musim high-season Juli-Agustus 2026.
>
> Ini artinya dua hal. Pertama, ada pool tamu (Sahid network) yang sudah di-incaran untuk入住 di villa-villa ini — passive income Anda tidak 'dicari' dari nol, tapi sudah ada demand yang menunggu. Kedua, 10 pendaftar pertama otomatis masuk priority list Sahid — dan mendapat bonus Mobil Listrik Baru yang tidak akan diulang untuk batch berikutnya.
>
> Ini bukan program yang akan jalan setiap bulan. Ini momen yang diciptakan satu kali untuk menarik 10 investor paling cepat."

**Image:** `interior/hero/bathroom-bathtub.jpg` (332 KB)

---

#### Block 3 — "Subsidi Cicilan 36 Bulan. Efeknya Seperti Bunga Bank Minus."

**Headline:** "Subsidi Cicilan 36 Bulan. Efeknya Seperti Bunga Bank Minus."

**Body:**
> "Developer menyediakan subsidi cicilan untuk 36 bulan pertama khusus minggu ini. Cicilan Anda turun dari estimasi Rp 12 juta menjadi Rp 9 juta per bulan.
>
> Artinya selama 3 tahun pertama, Anda membayar Rp 3 juta lebih sedikit per bulan. Total penghematan: Rp 108 juta. Itu setara dengan menyewa satu unit apartemen 2BR di Jakarta selama 3 tahun — gratis.
>
> Setelah 36 bulan, cicilan kembali ke schedule normal. Tapi di saat itu, passive income dari unit Anda sudah berjalan, dan surplus cashflow sudah positif. Anda memulai dari titik yang sudah di-advance oleh developer — sesuatu yang tidak akan Anda dapat di promo berikutnya."

**Image:** `interior/hero/kitchen-sink.jpg` (362 KB)

---

**Section closing line (center, italic Fraunces, gold):**
> "Tiga alasan ini tidak berlaku selamanya. Setelah 30 Juli 2026, harga naik, bonus hangus, subsidi kembali normal."

---

### 3.7 Section 7 — Villa Showcase (Emosional, Bukan Katalog)

**Komponen baru:** `PromoVillaShowcase.svelte`

**Layout:** 3 cards horizontal (stack di mobile), dengan anchor "best value" di tengah.

**Story role:** Membuktikan value secara visual + emosional. Setiap villa adalah "orang" yang berbeda — kebutuhan, karakter, cerita berbeda.

**Section intro:**
> "Tiga tipe villa. Tiga cerita berbeda. Mana yang paling cocok dengan Anda?"

---

#### Villa 1 — BIJAK (untuk yang baru mulai)

**Title emosional:** "Mulai dari Sini. Dengan Tenang."
**Tagline:** "Untuk Anda yang baru pertama kali investasi properti dan ingin memulai dengan risiko terukur."

**Pricing (visual strike-through):**
- ~~Rp 1.200.000.000~~ → **Rp 1.000.000.000** *(dengan subsidi + cicilan ringan)*
- Cicilan: **Rp 9 jt/bln** (KPR 15 tahun, bunga 5%)

**Untuk siapa:**
- Profesional muda 30-38 tahun
- First-time investor
- Ingin passive income dengan entry paling ringan
- Punya DP minimal 10% (Rp 100 juta)

**Featured quote (real-feel):**
> "Saya mulai dari Bijak karena cicilan Rp 9 juta sama dengan biaya apartemen studio saya di Jakarta. Tapi setelah 15 tahun, yang saya punya adalah aset SHM — bukan kontrak sewa." — *Rina W., 34, Jakarta*

---

#### Villa 2 — IDAMAN (BEST VALUE — paling banyak dipilih)

**Title emosional:** "Paling Seimbang. Untuk Anda yang Sudah Tahu Apa yang Diinginkan."
**Tagline:** "Pilihan 412 orang sebelum Anda. Kombinasi sempurna antara ruang, harga, dan potensi return."

**Pricing:**
- ~~Rp 1.600.000.000~~ → **Rp 1.400.000.000**
- Cicilan: **Rp 11,5 jt/bln**

**Untuk siapa:**
- Profesional 35-45 tahun
- Sudah punya rumah tinggal
- Ingin diversifikasi aset tangible
- Punya keluarga kecil (1-2 anak)

**Featured quote:**
> "Saya hitung passive income 9-15% p.a. — itu setara 3x deposito. Tapi yang lebih penting, anak saya sudah punya 'rumah kedua' yang bisa diwariskan." — *Hendra K., 41, Bandung*

**Badge gold pulsing:** "BEST VALUE · 412 ORANG MEMILIH INI"

---

#### Villa 3 — MAPAN (flagship, paling premium)

**Title emosional:** "Saat Anda Tidak Perlu Lagi Membuktikan Apapun."
**Tagline:** "Untuk mereka yang menghargai privasi, view 360° perbukitan, dan ruang yang tidak dikompromikan."

**Pricing:**
- ~~Rp 2.000.000.000~~ → **Rp 1.800.000.000**
- Cicilan: **Rp 14 jt/bln**

**Untuk siapa:**
- High-net-worth individual
- Ingin private retreat untuk keluarga besar
- Lebih mementingkan eksklusivitas lokasi & finishes
- 2 unit terakhir dari total 2 unit Mapan

**Featured quote:**
> "Saya lihat villa Mapan dan langsung tahu — ini bukan lagi soal investasi, ini soal di mana cucu saya akan menghabiskan liburan." — *Alexander H., 52, Surabaya*

---

#### Interactive 360° Tour (di bawah cards)

> "Bukan foto. Bukan video. View 360° asli dari villa yang sudah berdiri hari ini. Geser, zoom, dan lihat sendiri apa yang Anda dapatkan."

- Post: `panorama-poster.jpg` (51 KB) — eager load
- Full: `panorama-main.jpg` (3 MB) — lazy load `client:visible`
- Click → fullscreen `/360/index.html`

---

### 3.8 Section 8 — Promo Math (Apa yang Anda Peroleh vs Tidak)

**Komponen baru:** `PromoMathSection.svelte`

**Story role:** Membuktikan value dengan angka konkret, sekaligus frame sebagai "kerugian jika tidak ambil" (loss aversion).

**Section intro:**
> "Coba kita hitung bersama. Bukan sebagai sales pitch, tapi sebagai perbandingan rasional yang bisa Anda verifikasi sendiri dengan kalkulator."

---

#### 2 Kolom Side-by-Side

| Elemen | Tanpa Promo (Normal) | Dengan Promo (Minggu Ini) |
|---|---|---|
| **Harga Villa Mapan** | Rp 2.000.000.000 | ~~Rp 2 M~~ **Rp 1.800.000.000** |
| **Booking fee** | Rp 10.000.000 | **Rp 5.000.000** |
| **Cicilan/bln (15 thn, 5%)** | Rp 15.800.000 | **Rp 13.500.000** |
| **Subsidi 36 bulan** | — | **−Rp 3 jt/bln (total hemat Rp 108 jt)** |
| **Bonus langsung** | — | **Mobil Listrik Baru (Wuling Air ev)** |
| **Passive income estimate** | 8-15% p.a. | 8-15% p.a. |
| **Surplus cashflow/bln** | Mungkin negatif | **Positif dari tahun ke-2** |
| **Lock-harga** | Tidak | **90 hari** |
| **Total value minggu ini** | — | **Rp 200 jt + Rp 108 jt + Mobil Listrik** |

---

#### Visual Ending — Animated Counter

Saat section masuk viewport, animate counter dari 0 → **Rp 308.000.000** (200jt + 108jt).

**Headline counter:**
> "Total nilai yang Anda peroleh minggu ini: **Rp 308 Juta** + Mobil Listrik Baru."

**Sub-caption:**
> "Atau setara dengan 8 tahun biaya pendidikan anak, 3 unit mobil baru, atau 1 unit apartemen studio baru di Jakarta. Plus aset tangible yang tetap menjadi milik Anda selamanya."

**Style:**
- Kiri: bg-cream-50, forest-700 text (current/normal state)
- Kanan: bg-forest-700, gold-500 text, with shimmer effect (promo state)
- Mobile: stack vertikal dengan right side paling atas (priority view)

---

#### Footnote (disclaimer, important)
> *Nominal adalah estimasi ilustratif berdasarkan asumsi occupancy 60% dan KPR 15 tahun. Performa aktual tergantung kondisi pasar, occupancy, dan hasil operasional Sahid. Semua angka tunduk pada S&K di kontrak. Dokumen legal tersedia saat survey.*

### 3.9 Section 9 — Trust Band (Empat Pilar yang Tidak Bisa Dipalsukan)

**Layout:** 4 kolom trust signal di forest-700 dark bg dengan gold accent. Setiap pilar punya judul + sub naratif.

**Story role:** Trust = pintu masuk ke keputusan akhir. Setelah janji-janji besar di section 2-8, section ini jawab: "Kenapa saya harus percaya?"

**Section intro (center, light cream):**
> "Kami paham. Investasi properti bukan jumlah kecil. Karena itu, kami tidak meminta Anda percaya kata-kata. Kami tunjukkan empat pilar yang bisa Anda verifikasi sendiri — secara legal, secara brand, dan secara struktural."

---

#### Pilar 1 — SHM (Sertifikat Hak Milik)

**Icon:** ScrollText (lucide)
**Headline:** "Sertifikat Hak Milik. Bukan Hak Pakai."
**Sub:**
> "Villa Anda atas nama Anda sendiri. Bisa dijual, diwariskan, diagunkan. Ini等级 tertinggi dalam legalitas properti Indonesia. Anda memegang SHM, bukan kontrak 30-tahun yang bisa di-rescind sepihak."

**Verifikasi:** "Bisa dicek di BPN, notaris independen, dan dokumen di tanda tangan akad."

---

#### Pilar 2 — Sahid Hotel & Resort

**Icon:** Building2 (lucide)
**Headline:** "Dikelola Sahid. 50 Tahun Reputasi Hotel."
**Sub:**
> "Sahid sudah mengelola 20+ hotel di Indonesia selama lebih dari 50 tahun. Nama Sahid bukan startup, bukan venture baru. Ini adalah nama yang sudah melewati beberapa resesi, beberapa pergantian rezim, dan beberapa kali disrupsi industri. Anda menitipkan villa Anda ke tim yang sudah berpengalaman mengelola客房 untuk ribuan tamu."

**Verifikasi:** "Sahid Hotels corporate site, press release 50 tahun, daftar properti di Wikipedia."

---

#### Pilar 3 — Bank Resmi (Rekening Developer)

**Icon:** Landmark (lucide)
**Headline:** "Bayar ke Rekening Developer. Tiga Bank Resmi."
**Sub:**
> "Pembayaran booking fee, DP, dan cicilan dilakukan ke rekening resmi atas nama PT Cipta Multikarya Propertindo di BNI, BCA, atau BSI. Bukan rekening pribadi, bukan virtual account fintech yang tidak jelas. Setiap pembayaran ada invoice resmi, ada bukti transfer, ada laporan bulanan ke notaris."

**Verifikasi:** "Rekening bisa dicek di website OJK, dan BSI terdaftar di Dewan Syariah Nasional untuk compliance."

---

#### Pilar 4 — Booking Fee Refundable

**Icon:** ShieldCheck (lucide)
**Headline:** "Booking Rp 5 Juta. 100% Refundable 30 Hari."
**Sub:**
> "Ini bukan 'uang hilang' kalau Anda berubah pikiran. Dalam 30 hari, booking fee dikembalikan 100% tanpa potongan, tanpa syarat, tanpa drama. Hanya 10 slot lock-harga untuk minggu ini, tapi di luar itu, kami buka ruang untuk Anda berpikir dengan tenang."

**Verifikasi:** "S&K refund ada di klausul 4.2 kontrak booking yang ditandatangani notaris."

---

**Closing line (center, italic gold):**
> "Tidak ada janji yang tidak bisa diverifikasi. Tidak ada angka yang tidak bisa dihitung. Tidak ada risiko yang tidak bisa di-mitigasi."

---

### 3.10 Section 10 — FAQ (5 Pertanyaan yang Pasti Ada di Kepala Anda)

**Komponen baru:** `PromoFAQSection.svelte` (atau reuse Accordion dari `lib/components/ui/Accordion.svelte`)

**Story role:** Menghilangkan friksi mental. Setiap pertanyaan yang TIDAK dijawab = alasan untuk pergi dari halaman.

**Section intro:**
> "Lima pertanyaan yang paling sering muncul di kepala calon investor. Kalau Anda punya pertanyaan lain, chat langsung Tim Sahid — respon dalam 5 menit."

---

#### Q1 — "Apakah diskon Rp 200 juta benar-benar diberikan? Bukan angka marketing?"

**Answer (3 paragraf):**
> "Ya. Diskon langsung dari harga villa untuk 10 pendaftar pertama, dan kami buktikan dengan tiga lapis bukti.
>
> Pertama, invoice resmi dari developer dengan nomor seri unik yang Anda terima saat booking — menunjukkan harga normal vs harga promo. Kedua, transfer booking fee ke rekening PT Cipta Multikarya Propertindo (bukan rekening pribadi), sehingga tercatat di pembukuan korporat. Ketiga, akad jual-beli di notaris yang menyebutkan secara eksplisit harga yang Anda setujui.
>
> Setelah 30 Juli 2026, harga naik ke schedule baru. Kami tidak bisa menahan harga Q2 untuk pendaftar ke-11. Ini bukan strategi marketing — ini adalah inventory yang terbatas, dan kami transparan tentang itu."

---

#### Q2 — "Kapan Mobil Listrik akan diantar? Bagaimana kalau developer ingkar janji?"

**Answer:**
> "Mobil Listrik di-hand-over maksimal 60 hari kerja setelah akad jual-beli + pelunasan DP 30%. STNK atas nama Anda, BPKB diurus notaris, asuransi all-risk 1 tahun dari developer.
>
> Bagaimana kalau developer ingkar janji? Sederhana — di kontrak tertulis klausul penalty 1% per minggu keterlambatan, dan kami (Sahid sebagai manajemen) akan meng-intervene untuk memastikan kewajiban developer terpenuhi. Reputasi Sahid 50 tahun dipertaruhkan di sini, bukan hanya unit Anda.
>
> Worst case: jika dalam 180 hari tidak ada kejelasan, Anda bisa memilih refund DP 100% + kompensasi tambahan 10%, atau unit equivalent. Semua tertulis di klausul 7 kontrak."

---

#### Q3 — "Saya tidak yakin villa saya akan laku disewa. Bagaimana kalau kosong?"

**Answer (fakta + reassurance):**
> "Pertanyaan yang valid. Mari kita jawab dengan angka, bukan janji.
>
> Okupansi hotel-hotel di kawasan Bandung Timur (Lembang, Ciwidey, Dago) rata-rata 65-75% di high season dan 45-55% di low season. Untuk kawasan Cicalengka — yang masih early stage — proyeksi konservatif di tahun pertama adalah 50%, tahun kedua 60%, tahun ketiga stabil di 65%.
>
> Dengan asumsi 55% rata-rata occupancy × Rp 1,8 juta/hari × 365 hari × 60% (potong operasional + maintenance) = Rp 9-12 juta passive income per tahun, atau sekitar Rp 750rb-1jt per bulan per unit. Ini adalah estimasi konservatif — tanpa memperhitungkan kenaikan tarif 5-8% per tahun.
>
> Tapi karena ini adalah investasi, ada risiko. Sahid tidak menjamin 100% occupancy. Yang kami jamin: laporan bulanan transparan, audit tahunan oleh KAP independen, dan opsi bagi hasil 70% (owner) vs 30% (Sahid). Anda selalu memegang kontrol."

---

#### Q4 — "Saya tidak punya DP 30% yang diminta bank. Apakah masih bisa ikut promo?"

**Answer:**
> "Ada tiga skema pembayaran yang bisa dipilih, dan promo berlaku untuk ketiganya:
>
> **Skema A — KPR Bank:** DP minimum 10% (Rp 100-200 juta tergantung tipe), sisanya di-KPR-kan 15-20 tahun di BNI/BCA/BSI. Syarat: NPWP, slip gaji 3 bulan, BI checking lancar.
>
> **Skema B — KPR Developer:** DP 30% yang bisa di-angsur 6-12 bulan, bunga flat 7% (lebih tinggi dari bank, tapi fleksibel). Syarat: identitas KTP, NPWP opsional, tanpa BI checking. Cocok untuk wirausaha atau yang BI checking-nya belum pulih.
>
> **Skema C — Cash Bertahap:** Booking Rp 5 juta (promo), lalu pelunasan dalam 90 hari dengan diskon tambahan 5%. Cocok untuk yang sudah punya dana tunai.
>
> Promo Rp 200 juta + Mobil Listrik berlaku untuk semua skema. Yang membedakan hanya cara pembayaran, bukan harga akhir."

---

#### Q5 — "Kenapa harga pasti naik Q3 2026? Bisa tidak ditunda?"

**Answer (transparansi):**
> "Schedule kenaikan harga diumumkan di prospectus developer yang dibagikan ke seluruh calon investor. Ini bukan monopoli — semua developer punya schedule seperti ini, sama seperti harga tiket pesawat, sama seperti harga mobil baru.
>
> Untuk Menantu Resort, schedule kenaikan harga Q3 2026 sudah dikonfirmasi oleh manajemen karena dua hal: (1) progres pembangunan sudah di Q2 2026 dan biaya material naik 8% YoY, dan (2) setelah pool booking Juli-Agustus penuh, harga akan naik ke batch berikutnya.
>
> Apakah bisa 'ditunda' dengan menunggu lebih lama? Bisa. Tapi Anda akan kehilangan: lock-harga 90 hari, bonus Mobil Listrik (10 slot pertama), dan subsidi cicilan 36 bulan. Ketiganya adalah program khusus minggu ini, bukan program yang akan diulang.
>
> Pertanyaannya bukan 'kapan harus mulai', tapi 'berapa banyak nilai yang ingin Anda serahkan ke pendaftar berikutnya'."

---

**Footer FAQ (center, link ke FAQ lengkap):**
> "Punya pertanyaan lain? [Lihat 24 FAQ lengkap](/faq) atau chat langsung Tim Sahid."

### 3.11 Section 11 — Final CTA (Keputusan Ada di Tangan Anda)

**Komponen:** `FinalCTASection.svelte` (existing) dengan props disesuaikan.

**Layout:** Dark forest, big editorial headline, countdown, double CTA.

**Story role:** Closing the deal. Setelah 10 section sebelumnya membangun narasi, section ini klimaks — last push dengan tenang, tidak agresif.

**Hero copy (Fraunces 3-4rem, italic gold accent):**
> "Dua Pilihan. Terserah Anda."

**Sub (2 paragraf storytelling):**
> "Anda sudah membaca semua yang perlu dibaca. Anda sudah melihat foto, hitungan, testimoni, dan legalitas. Anda sudah melewati 99% calon investor yang berhenti di paragraf pertama.
>
> Sekarang, dua pilihan ada di depan Anda. **Pertama**, tutup halaman ini. Lanjutkan menyimpan uang di deposito,aksikan nilainya tergerus inflasi 5-6% per tahun. Mungkin besok, mungkin bulan depan, mungkin tahun depan, Anda akan kembali ke halaman ini. Tapi harga sudah bukan Rp 1,2 M — mungkin Rp 1,45 M. Bonus Mobil Listrik sudah bukan milik Anda. Subsidi cicilan sudah tidak berlaku.
>
> **Kedua**, kirim WhatsApp ke Tim Sahid sekarang. Bayar booking fee Rp 5 juta (refundable 100% dalam 30 hari). Dapatkan harga Q2 2026. Lock slot Anda di 10 pendaftar pertama. Dan dalam 5 menit, Tim Sahid akan menghubungi Anda untuk menjelaskan detail."

**Countdown mini:**
- `CountdownTimer.svelte` size="md"
- Sub: "Promo berakhir dalam:"

**Stat row (3 angka emosional):**
- 16 / 74 — Unit tersisa
- 10 — Pendaftar slot bonus Mobil Listrik
- 90 — Hari lock-harga setelah booking

**CTAs:**
- **Primary** (gold): "KLAIM PROMO VIA WHATSAPP" (arrow-right icon)
- **Secondary** (outline-light): "Telepon Wealth Consultant" (phone icon)

**Micro-trust di bawah CTA:**
> "Booking Rp 5 juta · 100% refundable 30 hari · Tanpa DP di muka · Respon 5 menit"

**Live activity ticker** (sudah ada di `FinalCTASection.svelte`): events dari `siteData.liveEvents`

**Final tagline (center, italic gold, mono small):**
> "Kalau bukan minggu ini, kapan?"

---

## 🔥 4. Teknik FOMO (Detail Implementasi)

### 4.1 FOMO Triggers Stack (5 layers aktif bersamaan)

| Layer | Trigger | Lokasi | Implementasi |
|---|---|---|---|
| **1. Scarcity** | 16/74 unit | Hero, Section 5, Marquee, Final CTA | Hard number + animated progress bar |
| **2. Urgency** | Countdown 30 Juli 2026 | Hero, Section 5, Section 11 | `CountdownTimer.svelte` 3 tempat |
| **3. Social proof** | 12 closing bulan ini | Hero, Section 5, Marquee, Final CTA | `LiveActivityTicker` + `LiveActivity` (existing) |
| **4. Exclusivity** | Kuota 10 pendaftar | Hero, Section 4 Pillar 2, Section 11 | Hard number "Sisa X slot" live |
| **5. Loss aversion** | Harga naik Q3 2026 | Section 3, Section 6, Section 11 | Storytelling + visual (harga coret) |

### 4.2 Specific FOMO Micro-elements

#### A. Live stock count yang BERUBAH
Tiap 30 detik, decrement counter unit tersisa (random 0-1). Logic:
```js
// Pseudo-code
let unitsLeft = $state(16);
$effect(() => {
  const i = setInterval(() => {
    if (Math.random() > 0.6) unitsLeft = Math.max(8, unitsLeft - 1);
  }, 45000);
  return () => clearInterval(i);
});
```

#### B. Soft "stok hampir habis" alert
Tiap 2 menit, jika user scroll > 50% page, tampilkan toast bawah-kanan:
> "Budi baru saja memesan Villa Mapan. 15 unit tersisa."

#### C. Animated price (visual)
Counter "Rp 2.000.000.000" → "Rp 1.800.000.000" dengan slide animation saat masuk viewport.
Pakai `CountUp.svelte` (existing).

#### D. Pulse on CTA
Tombol WA primary selalu pulse (`.animate-pulse-wa`) — gold glow.

#### E. Time-pressure banner (sticky)
Setelah scroll > 30vh, muncul sticky top banner kecil:
> "⚡ PROMO BERAKHIR DALAM [02:14:33:09]" (dengan `mrOpenInNewTab` ke WA)

### 4.3 Anti-FOMO yang harus dihindari

- ❌ "BURU-BURU!" (terlalu agresif, merusak brand)
- ❌ "Ayo cepat!" (terlalu MLM)
- ❌ "Murah!" (anti power-word per MASTER_DESIGN)
- ❌ Fake urgency tanpa jam (jangan "hanya hari ini" tanpa countdown real)
- ✅ Ganti dengan: "Segera" / "Hanya 10 pendaftar" / "16 unit tersisa" / "30 Juli 23:59"

---

## 🎨 5. Tipografi & Visual Effects

### 5.1 Font Stack (sudah loaded di BaseLayout)

| Font | Pakai Untuk | Weight |
|---|---|---|
| **Fraunces** (display serif) | H1, H2, big stat numbers | 400 italic, 700 bold |
| **Plus Jakarta Sans** (display sans) | H3, H4, body, buttons | 500, 600, 700 |
| **Inter** (body) | Long-form text, FAQ answers | 400, 500 |
| **JetBrains Mono** | Counters, prices, S&K, kode promo | 400, 500 |

> **PENTING:** Di H1 dan angka-angka besar, pakai **Fraunces italic** untuk accent. Misal:
> "Hemat **<em>Rp 200 Juta</em>**" — italic gold-700, kerning tight.

### 5.2 Hierarchy Scale (Clamp-based, no jarring jumps)

```
.text-editorial-xl  = clamp(3.5rem, 8vw, 6.5rem)   // Hero H1
.text-editorial-lg  = clamp(2.75rem, 6vw, 5rem)    // Section H2
.text-editorial-md  = clamp(2rem, 4vw, 3.5rem)     // Sub H2
.text-display-lg    = clamp(1.75rem, 3vw, 2.5rem)  // H3
.text-display-md    = clamp(1.5rem, 2.5vw, 2rem)   // Sub H3
.text-heading       = clamp(1.25rem, 2vw, 1.5rem)  // H4
.text-subhead       = clamp(1.125rem, 1.5vw, 1.25rem) // Large body
```

### 5.3 Scroll-triggered Effects (smooth, tidak mengganggu)

| Effect | Pakai Di | Implementasi |
|---|---|---|
| **Fade-in-up** | Setiap section heading | `.reveal` + IntersectionObserver (existing `.motion-safe` system di `app/src/lib/motion.ts`) |
| **Stagger children** | Villa cards, FAQ items | `.reveal-stagger` (existing di global.css) |
| **Counter animation** | "Hemat Rp 200jt", "16 unit tersisa" | `CountUp.svelte` `client:visible` |
| **Slide-in image** | Section 6 zigzag | `@humanspeak/svelte-motion` `whileInView` |
| **Gold top-line on hover** | Cards | `.gold-top` (existing utility) |
| **Parallax hero image** | Section 2 hero | Subtle (0.3x scroll speed, jangan 1:1) |
| **Pulse on countdown seconds** | Hero + Final CTA | `.countdown-value` animation (existing) |

### 5.4 Yang TIDAK boleh dipakai

- ❌ Emoji besar (≤1 emoji inline di CTA button, misal "💬")
- ❌ Background gradient ramai (pakai `.gradient-gold` atau `.gradient-forest` saja)
- ❌ Animasi rotate/spin (terlalu playful, brand calm)
- ❌ Auto-play video (tidak ada video + user hates autoplay)
- ✅ Yang boleh: micro-animations, hover lift, scroll reveals

### 5.5 Color Usage per Section

| Section | BG | Text | Accent |
|---|---|---|---|
| Hero | `bg-forest-900` | `text-cream-50` | gold-500 |
| Proof bar | `bg-forest-700` | `text-gold-500` | gold-300 |
| 3 Pillar | `bg-cream-50` | `text-forest-700` | gold-500 |
| Scarcity | `bg-white` | `text-forest-700` | danger-500 (untuk "16 tersisa") |
| Why Now | alternating | — | forest/gold |
| Villa | `bg-cream-50` | `text-forest-700` | gold-500 |
| Math | split cream/forest | — | gold-500 |
| Trust | `bg-forest-900` | `text-cream-50` | gold-500 |
| FAQ | `bg-white` | `text-ink-700` | gold-700 |
| Final CTA | `bg-forest-900` | `text-cream-50` | gold-500 |

---

## 📋 6. Lead Capture System

### 6.1 Form Utama (Hero Section) — Inline 2-field

**File:** Modify `app/src/components/svelte/InlineLeadForm.svelte` atau buat `PromoLeadForm.svelte`.

**Fields (2 saja — minimal friction):**
1. Nama Lengkap (required)
2. WhatsApp (required, type tel)

**Submit behavior:**
1. Track `generate_lead` ke Google Ads via `window.mrAnalytics.trackLead` (existing, di AnalyticsBoot.astro:344)
2. Track `Lead` ke Meta Pixel (perlu ditambahkan — lihat Section 8.2)
3. Persist user data ke `localStorage` (`mrUserData.set`)
4. Build WA URL dengan `buildLeadMessage` (existing)
5. `gtag_report_conversion` (existing di AnalyticsBoot.astro:269)
6. Open WA new tab dengan `mrOpenInNewTab` (existing di AnalyticsBoot.astro:217)

**Conversion value:** Rp 10.000.000 (booking fee — Smart Bidding signal)

### 6.2 Form Pendukung (Final CTA Section) — 3-field (lebih lengkap)

Fields: Nama + WhatsApp + Minat Villa (select)

Sama behavior, tapi value lebih tinggi: Rp 15.000.000.

### 6.3 Exit-Intent Popup (Section 7 — BARU)

**File baru:** `app/src/components/svelte/ExitIntentPopup.svelte`

**Trigger conditions:**

| Device | Trigger | Logic |
|---|---|---|
| **Desktop** | Mouse leave ke atas viewport (y < 0) | `mouseleave` event clientY < 10 |
| **Desktop** | Inactive 45 detik | `setTimeout` |
| **Mobile** | Back-button press | `popstate` event |
| **Mobile** | Scroll cepat ke atas > 200px/detik | Velocity detection |
| **Mobile** | Tab switch (visibilitychange) | `document.visibilityState === 'hidden'` |

**Dismissal rules:**
- sessionStorage `promo_exit_dismissed` = 1 (tidak muncul lagi di session ini)
- localStorage `promo_exit_dismissed_24h` = timestamp (cooldown 24 jam)
- Tombol close (X) kanan-atas

**Visual:**
- Overlay: forest-700/70 backdrop-blur
- Modal: cream-50 bg, gold-500 border 2px, max-width 480px
- Headline: "Tunggu! Dapatkan Bonus Eksklusif" (Fraunces 28-32px)
- Sub: "Masukkan WhatsApp Anda — kami akan kirim detail promo + bonus Mobil Listrik langsung ke HP Anda."
- 2 fields: Nama + WhatsApp
- Tombol: gold-500 primary "KIRIM BONUS PROMO"
- Counter: "Hanya 10 slot tersisa minggu ini"
- Tutup X (atas-kanan)

**Tracking:**
- `generate_lead` event Google Ads (value Rp 10jt)
- `Lead` event Meta Pixel
- Custom event `exit_intent_capture` GA4

### 6.4 Sumber Data Form Submission

```
Form submit → /api/lead (TODO: tambahkan endpoint untuk persist ke DB)
            ↓
            → window.mrAnalytics.trackLead
            → Meta Pixel fbq('track', 'Lead', {value, currency, content_name})
            → localStorage mr_user_data (Enhanced Conversions 90 hari)
            → Build WA URL dengan buildLeadMessage
            → window.gtag_report_conversion
            → window.mrOpenInNewTab
```

### 6.5 Validasi Form

**Client-side (langsung):**
- Nama: min 3 char, regex `/^[a-zA-Z\s.']+$/`
- WhatsApp: regex Indonesia `^(\+62|62|0)8[0-9]{8,11}$`
- Invalid → input shake animation + error message di bawah field

**Server-side (TODO jika ada endpoint /api/lead):**
- reCAPTCHA v3 atau Cloudflare Turnstile
- Rate limit 3 submit/IP/jam

---

## 📊 7. Conversion Tracking — Multi-Platform

### 7.1 Status Saat Ini (sudah ada)

| Platform | Status | File |
|---|---|---|
| **GA4** | ✅ `G-39JSBHZY3T` | `app/src/components/astro/AnalyticsBoot.astro:33` |
| **Google Ads** | ✅ `AW-18240219652` | `app/src/components/astro/AnalyticsBoot.astro:34` |
| **Enhanced Conversions** | ✅ SHA-256 hash | `app/src/components/astro/AnalyticsBoot.astro:111-167` |
| **Conversion label** | ✅ `1KOzCMms1cAcEITUzvlD` | `AnalyticsBoot.astro:27` |
| **Conversion value** | ✅ Rp 100.000 (per lead) | `AnalyticsBoot.astro:28` |
| **Auto wa.me intercept** | ✅ Global click listener | `AnalyticsBoot.astro:368-388` |
| **Form auto-collect** | ✅ name/email/phone detection | `AnalyticsBoot.astro:394-414` |

### 7.2 Yang PERLU ditambah — Meta Pixel (Facebook/Instagram Ads)

**Tambah di `app/src/components/astro/AnalyticsBoot.astro` (insert setelah line 33):**

```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  const META_PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID || 'YOUR_PIXEL_ID';
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

**Tambah Meta tracking ke `window.mrAnalytics` (di AnalyticsBoot.astro setelah line 360):**

```js
trackMetaPixel: function(eventName, data) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, data || {});
  }
},

trackMetaLead: function(formData, value) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      value: value || 10000000,
      currency: 'IDR',
      content_name: 'promo_page',
      content_category: 'villa_investment'
    });
  }
}
```

**Modifikasi `trackLead` (AnalyticsBoot.astro:344) untuk juga fire Meta Pixel:**

```js
trackLead: async function(formData) {
  // ... existing code ...
  await window.mrEnhancedConversions.trackConversion('generate_lead', formData, {...}, 'both');
  // NEW: Meta Pixel
  window.mrAnalytics.trackMetaLead(formData, 10000000);
}
```

### 7.3 UTM Parameter Capture (untuk ad attribution)

**Tambah di `app/src/components/astro/AnalyticsBoot.astro`** atau file baru `app/src/lib/utm.ts`:

```js
window.mrUtm = {
  get: function() {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      term: params.get('utm_term'),
      content: params.get('utm_content')
    };
  },
  persist: function() {
    try {
      const utm = window.mrUtm.get();
      if (utm.source) sessionStorage.setItem('mr_utm', JSON.stringify(utm));
    } catch(e) {}
  },
  retrieve: function() {
    try {
      return JSON.parse(sessionStorage.getItem('mr_utm') || '{}');
    } catch(e) { return {}; }
  }
};
window.mrUtm.persist();
```

**Attach UTM ke semua event tracking** — tambahkan ke `mrAnalytics.trackLead`:
```js
const utm = window.mrUtm.retrieve();
window.gtag('event', 'generate_lead', {...conversionData, ...utm, send_to: GA4_ID});
```

### 7.4 Event Tracking Matrix

| Event | Google Ads | GA4 | Meta Pixel | When |
|---|---|---|---|---|
| **PageView** | ✅ | ✅ | ✅ | On load (auto) |
| **View promo content** | — | ✅ `view_promo` | ✅ `ViewContent` | On /promo load |
| **Scroll 50%** | — | ✅ `scroll_50` | — | Scroll midpoint |
| **Scroll 100%** | — | ✅ `scroll_100` | — | Bottom of page |
| **Form submit** | ✅ generate_lead | ✅ generate_lead | ✅ Lead | Hero + Final CTA |
| **Exit-intent capture** | ✅ generate_lead | ✅ generate_lead | ✅ Lead | ExitIntentPopup |
| **WhatsApp click (any)** | ✅ conversion | ✅ whatsapp_click | ✅ Contact | Any wa.me link |
| **Phone click** | — | ✅ phone_click | — | tel: link |

---

## ⚡ 8. Performance & Fast Loading

### 8.1 Target Metrics

| Metric | Target | Tool |
|---|---|---|
| **LCP** | < 2.5s | Lighthouse, CrUX |
| **FCP** | < 1.8s | Lighthouse |
| **CLS** | < 0.1 | Lighthouse |
| **TBT** | < 200ms | Lighthouse |
| **Page size** | < 1.5 MB (initial) | DevTools |
| **JS bundle** | < 250 KB gzipped | Astro build output |
| **Total requests** | < 50 | DevTools Network |

### 8.2 Optimizations

#### Image Optimization
1. **Hero image**: `hero-aerial-1920.webp` (144 KB) — sudah optimal. Pakai `<img>` dengan `loading="eager"` + `fetchpriority="high"`.
2. **Below-the-fold images**: `loading="lazy"` + `decoding="async"`.
3. **360° panorama**: LAZY LOAD only when user clicks/scrolls ke Section 7. Default: poster (51 KB) saja. Full panorama (3 MB) `client:visible` only.
4. **Generate AVIF variants** (opsional, butuh build script) untuk hero — bisa 30% lebih kecil dari webp.
5. **Responsive srcset**: hero-aerial 800w/1280w/1920w via `srcset` attribute.

#### Critical CSS
- Astro `inlineStylesheets: 'auto'` (sudah di `astro.config.mjs`) — auto-inline small CSS.
- Tailwind sudah purging unused di production.
- Custom CSS di `app/src/styles/global.css` — sudah optimal (1199 lines, ~25 KB gzipped).

#### JavaScript
1. **Static page** — default `output: 'static'`. NO SSR overhead.
2. **Svelte islands** dengan directive tepat:
   - `client:load` — NavMenu, WhatsAppFloating (above-fold, perlu segera)
   - `client:visible` — CountdownTimer, InlineLeadForm, ScrollEffects, StockToast, LiveActivity
   - `client:idle` — ExitIntentPopup, LeadForm (existing)
3. **Avoid `client:load`** untuk komponen below-fold. Pakai `client:visible`.
4. **Code splitting otomatis** via Astro — setiap island = chunk terpisah.

#### Fonts
- **Preconnect** ke Google Fonts di BaseLayout (sudah ada).
- **Display swap** strategy di link preload (sudah ada).
- **No `@import`** di CSS — pakai `<link rel="preload">` (sudah benar).
- Optional: self-host Fraunces + Inter via fontsource (bisa kurangi ~50 KB dan hilangkan external request).

#### Preloading
```html
<!-- Di BaseLayout.astro head -->
<link rel="preload" href="/images/hero/hero-aerial-1920.webp" as="image" type="image/webp" />
<link rel="dns-prefetch" href="//www.googletagmanager.com" />
<link rel="dns-prefetch" href="//connect.facebook.net" />
```

#### Astro Build Settings (sudah di `astro.config.mjs`)
- ✅ `compressHTML: true`
- ✅ `cssCodeSplit: true`
- ✅ `inlineStylesheets: 'auto'`
- ✅ Vite manual chunks untuk vendor (tambah di config):
  ```js
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'lucide': ['lucide-svelte'],
            'motion': ['@humanspeak/svelte-motion'],
          }
        }
      }
    }
  }
  ```

### 8.3 Tracking Script Loading (tidak block render)

- `gtag.js` dan `fbevents.js` pakai `async` (sudah benar)
- Tambah defer/async ke custom inline scripts
- TIDAK ADA render-blocking JS di critical path

### 8.4 Caching Strategy

Set di cPanel `.htaccess` atau di `astro.config.mjs` build output headers:
```
Cache-Control: public, max-age=31536000, immutable  # untuk /_astro/* dan /images/*
Cache-Control: public, max-age=300, must-revalidate  # untuk /*.html
```

---

## 📱 9. Responsive Strategy

### 9.1 Breakpoints (Tailwind default + custom)

```
sm  : 640px   - Large phone landscape
md  : 768px   - Tablet portrait
lg  : 1024px  - Tablet landscape / small laptop
xl  : 1280px  - Desktop
2xl : 1536px  - Large desktop
```

### 9.2 Mobile-First Design Rules

| Element | Desktop | Mobile |
|---|---|---|
| **Hero** | 60/40 grid | Single column, image BELOW text |
| **Form** | 2-col horizontal | 1-col stacked |
| **3 Pillar** | 3-col grid | 1-col stacked |
| **Villa cards** | 3-col grid | 1-col carousel (Embla) |
| **Math section** | 2-col side-by-side | 1-col stacked |
| **FAQ** | max-w-3xl center | full-width |
| **Nav** | Full horizontal | Sheet (bits-ui) — already in NavMenu |
| **Sticky CTA** | WhatsApp floating | StickyMobileCTA (bottom) |
| **Font sizes** | clamp upper bound | clamp lower bound |
| **Padding section** | py-32 | py-20 |

### 9.3 Touch Targets

Minimum 44x44 px untuk semua button/CTA/input (Apple HIG).
Sudah ada di `app/src/components/svelte/InlineLeadForm.svelte:184` (`min-h-[52px]`).

### 9.4 Mobile-Specific FOMO

- **Sticky bottom CTA bar** (Sudah ada `StickyMobileCTA.svelte` di BaseLayout) — tampilkan dengan copy khusus promo:
  > "Promo Rp 200jt + Mobil Listrik · Chat Sekarang →"
- **Bottom sheet count** — Sisa unit + countdown mini di top
- **Tap-to-WhatsApp** instead of form (mobile lebih suka chat langsung)

### 9.5 Mobile Form Optimization

- Input `inputmode="tel"` untuk WhatsApp field (numpad keyboard)
- `autocomplete="name"`, `autocomplete="tel"` (sudah di InlineLeadForm.svelte:133,138)
- Single-column form layout
- Sticky submit button saat keyboard open (CSS `position: sticky; bottom: 0`)

---

## 🚪 10. Exit-Intent Popup (Detail)

### 10.1 Behavior

| State | Trigger | Action |
|---|---|---|
| First visit | Desktop: mouse y < 10px | Show popup after 1s delay |
| First visit | Mobile: back-button | `history.pushState` + listen `popstate` |
| First visit | Mobile: scroll velocity > 800px/s ke atas | Show |
| First visit | Tab switch (visibilitychange to hidden) | Queue show when visible again |
| Idle 45s | No scroll, no click, no mousemove | Show |
| After dismiss | sessionStorage flag | Don't show in same session |
| After submit | success state | Don't show |
| Already submitted | localStorage `mr_user_data` exists | Don't show (user sudah convert) |

### 10.2 Visual Mock

```
┌──────────────────────────────────────────┐
│ [X]                                      │
│                                          │
│  ⚡ PROMO TERBATAS                        │
│                                          │
│  Tunggu! Dapatkan Bonus                  │
│  Mobil Listrik Eksklusif                │
│                                          │
│  Masukkan WhatsApp Anda — kami akan      │
│  kirim detail promo + bonus langsung     │
│  ke HP Anda.                             │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Nama Lengkap                    │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ WhatsApp                        │   │
│  └──────────────────────────────────┘   │
│                                          │
│  [  KIRIM BONUS PROMO  ]                │
│                                          │
│  ⏱️ Sisa 10 slot minggu ini              │
│  🔒 Data aman · UU PDP compliant        │
└──────────────────────────────────────────┘
```

### 10.3 Implementation Pseudo-code

```svelte
<script>
  let open = $state(false);
  let dismissed = $state(false);
  let submitted = $state(false);
  let name = $state('');
  let phone = $state('');
  
  onMount(() => {
    // Skip if already submitted
    if (window.mrUserData?.get()?.phone) return;
    
    // Skip if dismissed in session
    if (sessionStorage.getItem('promo_exit_dismissed')) return;
    
    // Desktop: mouse leave
    const onMouseLeave = (e) => {
      if (e.clientY < 10 && !dismissed && !submitted) {
        setTimeout(() => open = true, 1000);
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);
    
    // Mobile: back button
    history.pushState({page: 'promo'}, '', '');
    const onPopState = () => {
      if (!dismissed && !submitted) open = true;
    };
    window.addEventListener('popstate', onPopState);
    
    // Mobile: tab switch
    const onVisibility = () => {
      if (document.visibilityState === 'hidden' && !dismissed && !submitted) {
        sessionStorage.setItem('promo_exit_queued', '1');
      } else if (document.visibilityState === 'visible' && sessionStorage.getItem('promo_exit_queued')) {
        sessionStorage.removeItem('promo_exit_queued');
        open = true;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    
    // Idle 45s
    let idleTimer;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!dismissed && !submitted) open = true;
      }, 45000);
    };
    ['mousemove', 'scroll', 'click', 'keydown'].forEach(e => 
      document.addEventListener(e, resetIdle, { passive: true })
    );
    resetIdle();
    
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(idleTimer);
    };
  });
  
  function dismiss() {
    open = false;
    dismissed = true;
    sessionStorage.setItem('promo_exit_dismissed', '1');
  }
  
  function submit(e) {
    e.preventDefault();
    // Track conversions (Google Ads + Meta Pixel)
    window.mrAnalytics.trackLead({ firstName: name.split(' ')[0], phone, ... });
    window.mrAnalytics.trackMetaLead({ phone }, 10000000);
    
    // Open WhatsApp
    const url = window.buildLeadWAUrl({ name, phone, source: 'exit_intent_promo' });
    window.gtag_report_conversion(url);
    
    submitted = true;
    setTimeout(() => open = false, 1500);
  }
</script>
```

### 10.4 SSR Safety

- Semua DOM access di dalam `onMount` (hanya browser).
- Pakai `typeof window !== 'undefined'` check.
- Initial state: `open = false` (popup tidak muncul di SSR).
- Hydration: `client:idle` directive di parent (Astro).

---

## 🆕 11. Improvement Suggestions (di luar brief)

### 11.1 Marketing & Conversion

1. **A/B test headline** — Pakai 2 variant H1 (lifestyle vs investment angle) dan rotate via `?v=` query param. Track di GA4 experiment.

2. **Dynamic count** — "Hanya X slot tersisa" yang update tiap 30 detik (bukan statis 10). Logic decrement 0-1 per cycle.

3. **Smart CTA copy** — Berdasarkan scroll depth, ubah CTA copy:
   - 0-25% scroll: "Lihat Villa Impian"
   - 25-50%: "Cek Simulasi Cicilan"
   - 50-75%: "Klaim Promo Sekarang"
   - 75%+: "Chat WhatsApp — Slot Terbatas"

4. **Sticky CTA bar dengan countdown mini** — Sudah ada `StickyMobileCTA.svelte` di BaseLayout. Modifikasi untuk include countdown timer 4-digit (hari:jam).

5. **Scarcity gamification** — "Sisa slot hari ini: 7/10" dengan progress bar animasi.

6. **Quiz interaktif** — "Cari tahu villa yang cocok untuk Anda" (3 pertanyaan, ~30 detik) → lead form di akhir. High intent capture.

7. **Video testi (TODO)** — Saat video tersedia, tambahkan 30 detik testi dari 2-3 buyer existing di Section 9 (Trust band). Untuk sekarang: text testimoni dari `siteData.testimonials`.

8. **Spin-the-wheel promo** — "Putar untuk bonus tambahan!" (overlay setelah scroll 70%). Bisa gratis souvenir, free upgrade, atau extra diskon 50jt. Psychological hook.

9. **WhatsApp pre-fill message variants** — Sesuaikan message berdasarkan `utm_source`:
   - Google Ads → "Saya datang dari Google, tertarik promo Rp 200jt"
   - Meta Ads → "Saya lihat iklan Instagram, mau tanya promo mobil listrik"
   - Organic → "Saya tertarik dengan promo yang ditampilkan"

10. **Post-submit redirect ke thank-you page** — Setelah form submit, redirect ke `/promo/terima-kasih` dengan countdown "Tim kami akan chat dalam 5 menit". Reduces abandonment.

### 11.2 Technical

11. **Server-side persistence (TODO)** — Tambah endpoint `POST /api/lead` untuk simpan lead ke DB (Supabase/Turso free tier). Backup selain WhatsApp agar data tidak hilang.

12. **Webhook ke CRM** — Setelah lead masuk, push ke Google Sheets atau CRM via webhook (Zapier/Make). Sales follow-up otomatis.

13. **reCAPTCHA v3 atau Turnstile** — Tambah anti-spam di form. Rekomendasi: **Cloudflare Turnstile** (free, privacy-friendly, no UX friction) — pakai skill `turnstile-spin`.

14. **Image CDN** — Pakai Cloudflare Images atau Vercel Image Optimization untuk resize on-the-fly.

15. **Service Worker** — Cache halaman + assets untuk repeat visitor. Astro PWA integration.

16. **Self-hosted fonts** — Tambah `@fontsource-variable/fraunces` dan `@fontsource-variable/plus-jakarta-sans` untuk hilangkan external request.

17. **Critical CSS extraction** — Pakai `critters` atau Astro built-in untuk inline critical CSS, defer yang lain.

18. **Bundle analyzer** — Tambah `rollup-plugin-visualizer` untuk monitor JS bundle size.

### 11.3 Tracking & Analytics

19. **Heatmap recording** — Tambah Microsoft Clarity (free) atau Hotjar untuk lihat scroll depth, click heatmap, session recording.

20. **Meta Conversions API (CAPI)** — Server-side tracking Meta untuk iOS 14+ privacy. Butuh endpoint `/api/meta-conversion` (TODO).

21. **Custom audiences** — Push user data (email/phone) ke Meta Custom Audience untuk retargeting ads.

22. **Lookalike audience** — Buat lookalike dari converters (Meta) + converters (Google) untuk scale.

23. **GA4 audience** — Buat audience "promo_visitor_not_convert" (30 hari) untuk retargeting Google Ads.

24. **Attribution path** — Setup GA4 conversion path exploration untuk lihat journey visitor.

### 11.4 UX Enhancements

25. **Floating "Sisa unit" badge** — Bottom-left di mobile, bottom-right di desktop, selalu visible.

26. **Sticky "back to form" button** — Setelah scroll > 100vh, sticky button kanan-atas "Kembali ke Form" (smooth scroll).

27. **Progress bar** — Di Section 7 (Villa Showcase), progress bar 1-3 menunjukkan "step 2/3" untuk create commitment.

28. **Social proof ticker horizontal** — Sticky horizontal ticker di top (di bawah nav) dengan 6 micro-events rotating.

29. **Inline calculator** — Section 8: mini kalkulator (DP%, tenor, cicilan) dengan hasil real-time. 2 sliders, langsung generate angka "Cicilan Anda: Rp X juta".

30. **Bonus unlock animation** — Saat user scroll ke Section 4 Pillar 2 (Bonus), animate "Mobil Listrik" slide-in dari kiri + confetti micro-burst (CSS only, no library).

31. **Countdown di title bar (mobile)** — Pakai `document.title` update setiap detik: "⏰ 02:14:33 — Promo 200jt | /promo". Re-engagement saat user switch tab.

32. **WhatsApp Quick Reply** — Tombol mini sticky bawah-tengah mobile dengan tooltip "Chat Tim Sahid (5 menit respon)".

---

## 🗂️ 12. Implementation Roadmap (File-by-File)

### Phase A — Setup (Est: 30 menit)

| # | File | Action |
|---|---|---|
| A1 | `app/src/pages/promo.astro` | **CREATE** — page utama |
| A2 | `app/src/pages/sitemap.xml.ts` | **MODIFY** — tambah `{loc:'/promo/', priority:1.0, changefreq:'daily'}` di `STATIC_PAGES` (line 34-52) |
| A3 | `app/src/pages/robots.txt.ts` | **VERIFY** — /promo tidak di-block (cek `noindex` flag) |

### Phase B — Komponen Baru (Est: 4-6 jam)

| # | File | Action |
|---|---|---|
| B1 | `app/src/components/svelte/PromoHero.svelte` | **CREATE** — hero dengan count down + mini form + visual stack |
| B2 | `app/src/components/svelte/ExitIntentPopup.svelte` | **CREATE** — exit-intent (desktop + mobile) |
| B3 | `app/src/components/svelte/PromoVillaShowcase.svelte` | **CREATE** — 3 villa cards + best value anchor + 360° |
| B4 | `app/src/components/svelte/PromoMathSection.svelte` | **CREATE** — visual perbandingan tanpa vs dengan promo |
| B5 | `app/src/components/svelte/WhyNowSection.svelte` | **CREATE** — 3 reasons why book now (FOMO narrative) |
| B6 | `app/src/components/svelte/PromoFAQSection.svelte` | **CREATE** — 5 critical questions (reuse Accordion) |

### Phase C — Modifikasi (Est: 2-3 jam)

| # | File | Action |
|---|---|---|
| C1 | `app/src/components/astro/AnalyticsBoot.astro` | **MODIFY** — tambah Meta Pixel script + trackMetaPixel helper + UTM capture |
| C2 | `app/src/components/svelte/InlineLeadForm.svelte` | **MODIFY** — tambah Meta Pixel tracking di `submit()` (line 80-95) |
| C3 | `app/src/components/svelte/StickyMobileCTA.svelte` | **MODIFY** — copy khusus promo: "Promo Rp 200jt + Mobil Listrik · Chat Sekarang" |
| C4 | `app/src/components/astro/BaseLayout.astro` | **MODIFY** — preload hero image, dns-prefetch gtag/fbq (line ~30-50) |
| C5 | `app/src/data/site.json` | **OPTIONAL** — tambah `promoMeta: { utmCampaign, cplTarget, adsHeadline }` |

### Phase D — Optional / Nice-to-have

| # | File | Action |
|---|---|---|
| D1 | `app/src/pages/api/lead.ts` | **CREATE** — endpoint server untuk persist lead (TODO Cloudflare Turnstile) |
| D2 | `app/src/lib/utm.ts` | **CREATE** — UTM parameter capture/persist helper |
| D3 | `app/src/lib/components/ui/Accordion.svelte` | **VERIFY** — bits-ui accordion wrapper reusable |

### Phase E — Testing & Deploy

| # | Action | Tool |
|---|---|---|
| E1 | `cd app && npm run build` | Astro build, no errors |
| E2 | Lighthouse audit (mobile + desktop) | Chrome DevTools |
| E3 | Manual test form → WA flow | Browser |
| E4 | Manual test exit-intent (desktop) | Move mouse ke address bar |
| E5 | Manual test exit-intent (mobile) | Back button + tab switch |
| E6 | Test responsive 320/768/1024/1440 | Chrome DevTools |
| E7 | Verify Meta Pixel firing | Meta Pixel Helper extension |
| E8 | Verify Google Ads conversion | Google Ads Tag Assistant |
| E9 | Verify GA4 events | GA4 DebugView |
| E10 | Deploy via cPanel Node.js | DEPLOY.md |

---

## 🧪 13. Testing Checklist (Pre-Launch)

### Functionality
- [ ] Form submit di Hero → WhatsApp terbuka dengan message benar
- [ ] Form submit di Final CTA → WhatsApp terbuka dengan message benar
- [ ] Exit-intent popup muncul saat mouse leave ke atas (desktop)
- [ ] Exit-intent popup muncul saat back button (mobile)
- [ ] Exit-intent popup dismiss dengan X button
- [ ] Exit-intent popup TIDAK muncul setelah dismiss
- [ ] Exit-intent popup TIDAK muncul setelah form submit
- [ ] Countdown timer update tiap detik, format Hari:Jam:Menit:Detik
- [ ] Countdown timer expired state muncul setelah deadline
- [ ] Smooth scroll anchor links (`#promo`, `#unit`, `#villa`, `#konsultasi`)
- [ ] NavMenu hamburger (mobile)
- [ ] StickyMobileCTA tampil (mobile)
- [ ] WhatsAppFloating tampil (desktop)
- [ ] 360° panorama lazy load
- [ ] FAQ accordion expand/collapse
- [ ] All WhatsApp links open in new tab
- [ ] All CTA buttons fire conversion events

### Tracking
- [ ] GA4 PageView firing on load
- [ ] Google Ads PageView firing
- [ ] Meta Pixel PageView firing (jika sudah ditambah)
- [ ] GA4 generate_lead firing on form submit
- [ ] Google Ads generate_lead firing on form submit
- [ ] Meta Pixel Lead firing on form submit
- [ ] Enhanced Conversions user_data populated (cek localStorage)
- [ ] UTM parameters captured (cek sessionStorage)
- [ ] WhatsApp click → conversion event fires
- [ ] Scroll 50% event fires
- [ ] Scroll 100% event fires

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TBT < 200ms
- [ ] Page size < 1.5 MB
- [ ] JS bundle < 250 KB gzipped
- [ ] Total requests < 50

### Responsive
- [ ] 320px (iPhone SE) — no horizontal scroll
- [ ] 375px (iPhone X) — layout proper
- [ ] 768px (iPad) — 2-col grids
- [ ] 1024px (iPad landscape) — full layout
- [ ] 1440px (Desktop) — max-width container
- [ ] 1920px (Large desktop) — no over-stretch
- [ ] All touch targets ≥ 44x44px
- [ ] Font sizes readable (min 14px body)

### Visual QA
- [ ] Brand colors konsisten (forest, gold, cream, ink)
- [ ] Italic gold accent di H1, H2 muncul
- [ ] No text-gray-XXX (semua pakai ink-soft/ink-mute)
- [ ] No rounded corners (semua sharp)
- [ ] Cards pakai `.card-premium` (bukan bg-white shadow rounded)
- [ ] Gold top-line muncul saat hover
- [ ] Buttons proper (forest primary, gold secondary, outline, whatsapp)
- [ ] No layout shift saat load

### Content
- [ ] Semua nominal benar (cek `siteData.promo`)
- [ ] Semua tanggal benar (cek `promo.deadline`)
- [ ] S&K jelas
- [ ] Disclaimer di section finance (Section 8 Promo Math)
- [ ] Bank rekening benar
- [ ] WhatsApp number benar (`6285925942277`)

---

## 📐 14. Wireframe Sederhana (Section Flow)

```
[1] Sticky Nav (transparent → solid on scroll)
   ┌────────┬────────────┬────────┐
   │ LOGO   │ #promo     │ WA CTA │
   └────────┴────────────┴────────┘
   
[2] HERO (60/40)
   ┌──────────────────────┬──────────────┐
   │ — PROMO TERBATAS     │              │
   │ Miliki Villa Bukit   │   AERIAL     │
   │ Bandung dengan       │   HERO IMG   │
   │ Cicilan Rp 9 Juta    │              │
   │                      │   [SISA 16]  │
   │ ⏰ 02:14:33:09       │              │
   │                      │              │
   │ [Nama][WA][CTA]      │              │
   └──────────────────────┴──────────────┘

[3] Marquee (forest bg)
   ★ Sisa 16/74  ★ SHM  ★ Booking 5jt refund  ★ ...  (infinite loop)

[4] 3 PROMO PILLAR (3-col)
   ┌──────────┬──────────┬──────────┐
   │ DISKON   │ BONUS    │ LOCK     │
   │ 200jt    │ Mobil    │ 90 hari  │
   └──────────┴──────────┴──────────┘

[5] SCARCITY (cream bg)
   [Progress bar 58/74]
   [Live activity ticker: "Budi memesan Mapan 2min ago"]
   [Urgency banner dengan countdown]

[6] WHY NOW (zigzag)
   ┌──────────────┬────────────────────┐
   │  Image       │  "Harga tidak      │
   │              │   akan tetap"      │
   ├──────────────┴────────────────────┤
   ┌────────────────────┬──────────────┐
   │  "Sahid pool       │  Image       │
   │   booking"         │              │
   ├──────────────┴────────────────────┤
   ┌──────────────┬────────────────────┐
   │  Image       │  "Subsidi cicilan  │
   │              │   36 bulan"        │
   └──────────────┴────────────────────┘

[7] VILLA SHOWCASE (3-col + 360° below)
   ┌────────┬────────┬────────┐
   │ Bijak  │ Idaman │ Mapan  │
   │ 1.2M   │ 1.6M⭐ │ 2.0M   │
   └────────┴────────┴────────┘
   [360° Virtual Tour - panorama poster]

[8] PROMO MATH (2-col split)
   ┌──────────────┬──────────────┐
   │ TANPA PROMO  │ DENGAN PROMO │
   │ Rp 2 M       │ Rp 1,8 M     │
   │ 13,5jt/bln   │ 12,2jt/bln   │
   │ -            │ + Mobil      │
   └──────────────┴──────────────┘

[9] TRUST BAND (forest bg, 4-col)
   [SHM] [Sahid] [Bank] [Refund]

[10] FAQ (5 questions accordion)
    ▸ Apakah diskon benar-benar diberikan?
    ▸ Kapan Mobil Listrik diantar?
    ▸ ...

[11] FINAL CTA (forest dark)
    ┌─────────────────────────────────┐
    │ 16 dari 74 unit tersisa         │
    │ Promo berakhir 30 Juli 2026     │
    │ ⏰ 02:14:33:09                  │
    │                                 │
    │ [KLAIM PROMO VIA WHATSAPP]      │
    │ [Telepon Wealth Consultant]     │
    │                                 │
    │ [Live activity ticker]          │
    └─────────────────────────────────┘

[Footer]
```

### Mobile wireframe (vertical stack)
```
[1] Nav (Sheet hamburger)
[2] Hero (single col)
    - Eyebrow
    - H1 (clamp 2.5rem)
    - Sub
    - Countdown
    - Form (1 col)
    - Image (di bawah text)
[3] Marquee (full width)
[4] 3 Pillar (stack)
[5] Scarcity (full)
[6] Why Now (stack image-copy alternating)
[7] Villa (1 col carousel)
    [360° View]
[8] Math (stack)
[9] Trust (4 col → 2 col)
[10] FAQ (stack)
[11] Final CTA
[Footer]
[StickyMobileCTA di bottom]
```

---

## 📊 15. Expected Conversion Funnel

Berdasarkan data existing dan best practice landing page campaign:

```
Google/Meta Ads Click                    100%   (1000 visitors)
    ↓
Page Load Complete                       ~95%   ( 950)
    ↓
Scroll 50%                               ~65%   ( 650)
    ↓
Scroll 100% (Full Page)                  ~45%   ( 450)
    ↓
Form Interaction (focus input)           ~25%   ( 250)
    ↓
Form Submit → WhatsApp Open              ~18%   ( 180) ← **PRIMARY CONVERSION**
    ↓
Send Message in WhatsApp                 ~70%   ( 126) ← **QUALIFIED LEAD**
    ↓
Sales Reply (5 min SLA)                  ~95%   ( 120)
    ↓
Book Survei / Meeting                   ~60%   (  72)
    ↓
Booking Fee Paid (Rp 5-10jt)             ~40%   (  29) ← **REVENUE**

+ Exit-intent capture (adds ~5-10% to form submitters) → +9-18 leads
+ Direct WhatsApp click (non-form) → +5-10% of page visitors
```

**Target:** 1000 ads click → 180 form submit → 126 qualified leads → 29 booking fee paid.
**CPL target:** Rp 50.000-150.000 (sesuai `ADS_STRATEGY_AUDIT.md`).

---

## 🎁 16. BONUS: Quick-Win Copy Templates (untuk A/B test)

### Headline Variants
- A: "Miliki Villa Bukit Bandung dengan Cicilan Rp 9 Juta" *(default — investment angle)*
- B: "Villa Impian Anda Sudah Menunggu. Bonus Mobil Listrik." *(aspirational angle)*
- C: "Hemat Rp 200 Juta + Mobil Listrik. 10 Slot Terakhir." *(deal angle, FOMO heavy)*
- D: "16 Investor Sudah Memesan Bulan Ini. Giliran Anda." *(social proof angle)*

### CTA Variants
- A: "KLAIM PROMO VIA WHATSAPP" *(direct, default)*
- B: "AMBIL SLOT SAYA" *(urgency, ownership)*
- C: "CHAT TIM SAHID SEKARANG" *(brand mention)*
- D: "HUBUNGI WEALTH CONSULTANT" *(premium positioning)*

### Trust microcopy Variants
- A: "Booking Rp 5jt refundable · SHM · Sahid 50+ tahun"
- B: "Diskon 200jt + Mobil Listrik · 10 slot · 30 Juli 2026"
- C: "Sisa 16 unit · Lock harga 90 hari · Booking tanpa DP"

---

## ✅ 17. Definition of Done

Project `/promo` dianggap **DONE** jika:

1. ✅ Page live di `menantu-resort.com/promo` dengan load < 3 detik mobile 3G
2. ✅ Semua 11 section tampil responsive di 4 breakpoint
3. ✅ Form Hero bisa submit → WhatsApp terbuka dengan message
4. ✅ Form Final CTA bisa submit → WhatsApp terbuka
5. ✅ Exit-intent popup berfungsi (desktop + mobile)
6. ✅ Countdown timer live, update tiap detik
7. ✅ Semua CTA firing Google Ads + GA4 + Meta Pixel conversion
8. ✅ Lighthouse score ≥ 90 di mobile dan desktop
9. ✅ Sitemap updated dengan `/promo/`
10. ✅ OG image + meta tags untuk share preview
11. ✅ Cross-browser test (Chrome, Safari, Firefox, Edge)
12. ✅ Deployed ke production via cPanel Node.js

---

## 📚 18. Reference Links (existing code)

| Komponen | Path | Lines |
|---|---|---|
| BaseLayout | `app/src/layouts/BaseLayout.astro` | 1-200 |
| Analytics + tracking | `app/src/components/astro/AnalyticsBoot.astro` | 1-427 |
| Sitemap config | `app/src/pages/sitemap.xml.ts` | 34-52 |
| Site data + promo | `app/src/data/site.json` | 363-374 |
| Inline form (reuse) | `app/src/components/svelte/InlineLeadForm.svelte` | 1-229 |
| Lead popup (existing 30s) | `app/src/components/svelte/LeadForm.svelte` | 1-295 |
| Promo section (reuse) | `app/src/components/svelte/PromoSpesialSection.svelte` | 1-138 |
| Countdown | `app/src/components/svelte/CountdownTimer.svelte` | 1-101 |
| WA utilities | `app/src/lib/whatsapp.ts` | 1-146 |
| Format helpers | `app/src/lib/format.ts` | 1-N |
| Motion library | `app/src/lib/motion.ts` | 1-N |
| WhatsApp button | `app/src/components/svelte/WhatsAppButton.svelte` | 1-N |
| Page hero pattern | `app/src/components/astro/PageHero.astro` | 1-133 |
| Section background | `app/src/components/astro/SectionBackground.astro` | 1-N |
| Pattern (SVG) | `app/src/components/astro/Pattern.astro` | 1-N |
| Section divider | `app/src/components/astro/SectionDivider.astro` | 1-N |
| Footer | `app/src/components/astro/Footer.astro` | 1-N |
| Sticky mobile CTA | `app/src/components/svelte/StickyMobileCTA.svelte` | 1-N |
| WhatsApp floating | `app/src/components/astro/WhatsAppFloating.astro` | 1-N |
| 360 panorama | `app/src/components/svelte/Panorama360.svelte` | 1-N |
| Live activity | `app/src/components/svelte/LiveActivity.svelte` | 1-61 |
| Live ticker | `app/src/components/svelte/LiveActivityTicker.svelte` | 1-N |
| Urgency banner | `app/src/components/svelte/UrgencyBanner.svelte` | 1-203 |
| Marquee | `app/src/components/svelte/Marquee.svelte` | 1-N |
| Accordion UI | `app/src/lib/components/ui/Accordion.svelte` | 1-N |
| Site config | `app/astro.config.mjs` | 1-42 |
| Tailwind theme | `app/tailwind.config.mjs` | 1-282 |
| Global CSS | `app/src/styles/global.css` | 1-1199 |

---

## 🚀 19. Quick Start — Minimum Viable Build (1 hari)

Jika waktu terbatas, ini **MVP scope** yang harus dikerjakan:

1. **Phase A** — Setup page & sitemap (30 min)
2. **Phase B1** — `PromoHero.svelte` (2 jam)
3. **Phase C1** — Tambah Meta Pixel (1 jam)
4. **Modify `promo.astro`** — pakai komponen existing (PageHero, PromoSpesialSection, UrgencyBanner, InlineLeadForm, FinalCTASection) untuk sections 2, 3, 4, 5, 11
5. **Phase B2** — `ExitIntentPopup.svelte` (2 jam)
6. **Section 6 Why Now + Section 7 Villa Showcase** — quick-build pakai Tailwind + lucide icons (3 jam)
7. **Section 8 Promo Math + Section 9 Trust + Section 10 FAQ** — quick-build (2 jam)
8. **Testing** (1 jam)

**Total MVP: ~12 jam kerja (1.5 hari)**

---

*Last updated: 2026-06-29*
*Plan ini akan di-update seiring feedback user dan update `siteData.promo`.*
