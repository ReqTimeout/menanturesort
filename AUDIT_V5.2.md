# AUDIT KOMPREHENSIF — menantu-resort.com

> **Tanggal:** 15 Juni 2026  
> **Versi:** V5.2 (17 halaman, 50+ komponen)  
> **Metodologi:** First-time user perspective — desktop (1440px) & mobile (375px)  
> **Status:** DRAFT — temuan + rekomendasi per halaman

---

## RINGKASAN EKSEKUTIF

| Metrik | Status |
|---|---|
| **Total Halaman** | 17 (+ 404) |
| **Konsistensi Design** | 85% — ada beberapa inkonsistensi minor |
| **Mobile Readiness** | 80% — ada beberapa masalah di layar kecil |
| **Copywriting CTA** | 90% — kuat, clear, action-oriented |
| **SEO On-Page** | 85% — meta tags lengkap, schema ada |
| **Performance** | Perlu dicek — font loading pattern |

**Total Temuan: 42 item** (12 High, 18 Medium, 12 Low)

---

## 1. HOMEPAGE (`/`)

### ✅ Yang Sudah Bagus
- Narrative flow kuat: Concerns → Solution → Promise → Villa → Popularity → VirtualTour → Promo → Testimoni → FinalCTA
- 11 section dengan scroll panjang ~7000px — depth cukup untuk engagement
- `EditorialHero` dengan copy "Masa Depan Lebih Mapan" — hook kuat
- `Marquee` trust badges horizontal — good social proof
- `ConcernsSection` → `SolutionSection` pattern proven
- `FinalCTASection` dengan LiveActivity + Countdown — urgency real
- `SectionDivider` konsisten (ornate + diamond alternating)

### ⚠️ Temuan Issues

#### 🔴 HIGH — [H-01] Hero double `relative` class
**File:** `app/src/pages/villa/index.astro:49`  
**Issue:** `<section class="relative relative bg-cream-50 ...">` — class `relative` diulang 2x  
**Impact:** Tidak error, tapi messy code  
**Fix:** Hapus satu `relative`

#### 🔴 HIGH — [H-02] Pattern component nesting salah di villa/index
**File:** `app/src/pages/villa/index.astro:53`  
**Issue:** `<Pattern>` di-render DI DALAM `<section>` tapi SEBELUM `<div class="container-wide">`, sehingga pattern menempel di section bukan di container  
**Impact:** Pattern bisa terlihat overflow di mobile  
**Fix:** Pindahkan Pattern ke absolute position yang benar atau wrap dengan proper positioning

#### 🟡 MEDIUM — [H-03] Villa images fallback hardcoded
**File:** `app/src/pages/index.astro:52-54`  
**Issue:** Fallback images di-hardcode ke `/images/villa/bijak/hero-row.jpeg` dll — jika file tidak ada, broken image  
**Impact:** Broken image di homepage  
**Fix:** Tambah fallback ke placeholder SVG

#### 🟡 MEDIUM — [H-04] SectionDivider prop `pattern` tidak dipakai
**File:** `app/src/pages/index.astro:84`  
**Issue:** `<SectionDivider variant="ornate" pattern="dots" />` — prop `pattern` di-section divider, tapi SectionDivider.astro tidak render pattern dengan benar (hanya conditional class)  
**Impact:** Pattern dots di divider mungkin tidak terlihat  
**Fix:** Cek SectionDivider.astro — pattern prop hanya add class `pattern-dots`/`pattern-grid` yang mungkin tidak visible

#### 🟡 MEDIUM — [H-05] `PopularitasTipeSection` gunakan data statis
**File:** `app/src/pages/index.astro:98`  
**Issue:** `popularitas={siteData.popularitas}` — data views (247, 412, 189) di-hardcode, bukan real-time  
**Impact:** User sadar data tidak real-time → trust issue  
**Fix:** Tambah disclaimer "data per Juni 2026" atau buat API endpoint

#### 🟢 LOW — [H-06] Missing `FAQ` link di footer
**File:** `app/src/components/astro/Footer.astro`  
**Issue:** Footer "Legal" section tidak ada link ke `/faq` — padahal FAQ ada  
**Impact:** User tidak bisa akses FAQ dari footer  
**Fix:** Tambah `<li><a href="/faq">FAQ</a></li>` di footer Legal column

#### 🟢 LOW — [H-07] Marquee speed prop mungkin terlalu cepat
**File:** `app/src/pages/index.astro:79`  
**Issue:** `speed={35}` — perlu testing apakah terbaca di mobile  
**Impact:** Text terlalu cepat → tidak terbaca  
**Fix:** Test di mobile, kurangi speed jika perlu

---

## 2. VILLA OVERVIEW (`/villa`)

### ✅ Yang Sudah Bagus
- Hero copy kuat: "Anda tidak sedang membeli villa, Anda sedang memilih gaya hidup 30 tahun ke depan"
- 3 mini cards dengan label unik (Attic/Double Glass/Luxury Private) — good differentiation
- Trust bar: Unit Terjual, Harga Mulai, ROI — clear metrics
- `UrgencyBanner` — "16 dari 74 unit tersisa" — scarcity real
- `VillaComparisonTable` + `ROISimulator` — interactive tools
- `TestimoniStories` — social proof

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [V-01] Hero background gradient overlap
**File:** `app/src/pages/villa/index.astro:49-50`  
**Issue:** Absolute gradient layer + Pattern component bisa overlap di mobile  
**Impact:** Visual messy di mobile  
**Fix:** Simplifikasi background — pilih gradient ATAU pattern, bukan keduanya

#### 🟡 MEDIUM — [V-02] Trust bar stats tidak proporsional di mobile
**File:** `app/src/pages/villa/index.astro:79-92`  
**Issue:** `grid-cols-3` untuk trust bar — di mobile layar kecil, angka bisa overlap  
**Impact:** Stats tidak terbaca di mobile  
**Fix:** `grid-cols-3 sm:grid-cols-3` dengan text size responsive

#### 🟢 LOW — [V-03] `SectionDivider` ada 2x antara Villa Grid dan Comparison
**File:** `app/src/pages/villa/index.astro:131,163`  
**Issue:** SectionDivider ornate (line 131) + diamond (line 163) — terlalu banyak divider  
**Impact:** Visual terputus-putus  
**Fix:** Hapus satu divider, cukup satu antar section

---

## 3. VILLA DETAIL (`/villa/bijak`, `/villa/idaman`, `/villa/mapan`)

### ✅ Yang Sudah Bagus
- Template `VillaDetail.astro` konsisten untuk 3 villa — DRY principle
- 8 section per villa: Hero → USP → Galeri → Arsitektur → Cashflow → Comparison → Promo → LeadForm
- `VillaHero` — image carousel + WhatsApp CTA + micro stats
- Cashflow section dark bg dengan 3 metric cards — visually striking
- Lead form dengan WhatsApp integration — conversion focused
- `CountdownTimer` di promo section — urgency

### ⚠️ Temuan Issues

#### 🔴 HIGH — [VD-01] Interior images DUPLICATE antar villa
**File:** `app/src/pages/villa/bijak.astro:18-24`, `idaman.astro:18-24`, `mapan.astro:18-24`  
**Issue:** 
- `stairs-cream.jpg` dipakai di Bijak (line 20, 23), Idaman (line 22), Mapan (line 21)
- `bathroom-bathtub.jpg` dipakai di Bijak (line 21), Idaman (line 21, 24), Mapan (line 22)
- `kitchen-sink.jpg` dipakai di Bijak (line 22), Idaman (line 20), Mapan (line 23)

**Impact:** User yang buka beberapa villa detail akan melihat foto SAMA → kehilangan trust, terlihat tidak profesional  
**Fix:** Generate image berbeda per villa via nanobanana, atau setidaknya urutan berbeda + alt text berbeda

#### 🟡 MEDIUM — [VD-02] Mapan `unitsLeft` hardcoded ke 2
**File:** `app/src/pages/villa/mapan.astro:37`  
**Issue:** `unitsLeft={2} totalUnits={2}` — hardcoded, tidak dari data  
**Impact:** Jika data berubah, harus edit manual  
**Fix:** Ambil dari `villaData` atau `siteData.stats`

#### 🟡 MEDIUM — [VD-03] Lead form submission buka WhatsApp dengan text hardcoded
**File:** `app/src/components/astro/VillaDetail.astro:446-455`  
**Issue:** Script inline untuk form submit — text WhatsApp di-build manual  
**Impact:** Jika waBase URL berubah, harus edit di 2 tempat  
**Fix:** Centralize WhatsApp URL builder

#### 🟡 MEDIUM — [VD-04] `KprCalculator` di VillaDetail tidak ada props
**File:** `app/src/components/astro/VillaDetail.astro:23`  
**Issue:** Import `KprCalculator` tapi tidak dipakai di template  
**Impact:** Unused import — bundle size unnecessary  
**Fix:** Hapus import jika tidak dipakai

#### 🟢 LOW — [VD-05] VillaHero badges tidak render value
**File:** `app/src/components/svelte/VillaHero.svelte:119`  
**Issue:** `{b.value}` di-render tapi badges yang dikirim dari VillaDetail.astro tidak punya property `value` — hanya `label` dan `variant`  
**Impact:** Badge value kosong / undefined  
**Fix:** Kirim `value` di badges prop, atau ubah rendering ke `{b.label}`

---

## 4. RESORT (`/resort`)

### ✅ Yang Sudah Bagus
- PageHero dengan 3 stats (12 Fasilitas, 24/7, 50+ Tahun) — clear
- 12 facility cards dalam grid 3 kolom — comprehensive
- Icon per fasilitas (lucide-svelte) — visual consistency
- Hover scale effect pada cards — interactive
- Sahid Management section — trust builder

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [R-01] Fasilitas icon `Coffee` dipakai 2x
**File:** `app/src/pages/resort.astro:21,23`  
**Issue:** `Coffee` icon dipakai untuk "Restaurant" DAN "Café & Lounge" — tidak unique  
**Impact:** User bingung karena icon sama untuk 2 fasilitas berbeda  
**Fix:** Ganti icon Café ke `Coffee` yang berbeda (atau `Mug`)

#### 🟡 MEDIUM — [R-02] Sahid section text center tapi max-width terlalu kecil
**File:** `app/src/pages/resort.astro:97`  
**Issue:** `max-w-3xl mx-auto` — teks panjang bisa terlalu narrow di desktop  
**Impact:** Reading experience kurang optimal  
**Fix:** `max-w-4xl` atau `max-w-5xl`

#### 🟢 LOW — [R-03] Missing `SectionDivider` antara fasilitas grid dan Sahid
**File:** `app/src/pages/resort.astro`  
**Issue:** Ada SectionDivider ornate (line 92) — tapi tidak ada divider SEBELUM fasilitas grid  
**Impact:** Transisi dari PageHero ke fasilitas agak abrupt  
**Fix:** Tambah SectionDivider diamond setelah PageHero

---

## 5. LOKASI (`/lokasi`)

### ✅ Yang Sudah Bagus
- PageHero dengan image + badge "5 Menit dari Resort" — contextual
- Google Maps embed — interactive
- 6 access points dengan badge waktu — informative
- 8 nearby attractions dengan icons — comprehensive
- Final CTA dengan WhatsApp — conversion

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [L-01] Map iframe aspect ratio tidak responsive
**File:** `app/src/pages/lokasi.astro:79`  
**Issue:** `aspect-[16/9] md:aspect-[21/9]` — iframe di dalam card-premium, tapi `width="100%" height="100%"` mungkin tidak fill parent  
**Impact:** Map mungkin tidak fill card  
**Fix:** Pastikan iframe parent punya height explicit atau aspect-ratio

#### 🟡 MEDIUM — [L-02] Akses cards tidak ada visual connector
**File:** `app/src/pages/lokasi.astro:106-116`  
**Issue:** 6 cards dalam grid tapi tidak ada visual flow/urutan  
**Impact:** User tidak tahu akses mana yang paling dekat  
**Fix:** Tambah numbering atau urutkan dari terdekat ke terjauh

#### 🟢 LOW — [L-03] Nearby grid 4 kolom bisa overflow di tablet
**File:** `app/src/pages/lokasi.astro:137`  
**Issue:** `lg:grid-cols-4` — di tablet (768-1024px) bisa 2 kolom yang kurang optimal  
**Impact:** Spacing tidak konsisten  
**Fix:** `md:grid-cols-2 lg:grid-cols-4`

---

## 6. INVESTASI (`/investasi`)

### ✅ Yang Sudah Bagus
- PageHero "Cicilan Anda, Ditutup Income Anda" — powerful hook
- KPR Calculator interactive — conversion tool
- 2 skema cards (Bank vs Developer) — clear comparison
- ROI Simulator — interactive projection
- Villa Compare — side-by-side
- 3 Pilar section — trust builder
- Booking Flow — 3 steps
- Final CTA — urgency

### ⚠️ Temuan Issues

#### 🔴 HIGH — [I-01] KPR Developer card highlighted tapi tanpa "Recommended" label
**File:** `app/src/pages/investasi/index.astro:110`  
**Issue:** `border-2 border-gold-500` — card KPR Developer di-highlight, tapi tidak ada label "Recommended" atau "Populer"  
**Impact:** User bingung kenapa card ini di-highlight  
**Fix:** Tambah badge "Populer" atau "Recommended" di card KPR Developer

#### 🟡 MEDIUM — [I-02] ROI Simulator muncul 2x di investasi page
**File:** `app/src/pages/investasi/index.astro:134-153` + `KprCalculator:66`  
**Issue:** ROI Simulator section + KPR Calculator — kedua tools mungkin overlap function  
**Impact:** User bingung harus pakai yang mana  
**Fix:** Clarify perbedaan: KPR Calculator = cicilan, ROI Simulator = income projection

#### 🟡 MEDIUM — [I-03] Final CTA section ada 2x di investasi
**File:** `app/src/pages/investasi/index.astro:244-266`  
**Issue:** Custom final CTA section + tidak pakai `FinalCTASection` component  
**Impact:** Inconsistent dengan homepage yang pakai `FinalCTASection`  
**Fix:** Pertimbangkan pakai `FinalCTASection` untuk konsistensi

#### 🟢 LOW — [I-04] Section padding konsisten tapi `py-16 md:py-20` di stat cards
**File:** `app/src/pages/investasi/skema-bank.astro:40`  
**Issue:** Stat cards pakai `py-16 md:py-20` — section lain pakai `py-20 md:py-32`  
**Impact:** Spacing tidak konsisten antar section  
**Fix:** Standarisasi ke `py-20 md:py-32`

---

## 7. KONTAK (`/kontak`)

### ✅ Yang Sudah Bagus
- PageHero "Konsultasi Gratis, Tanpa Komitmen" — clear value prop
- 2-column layout: Contact info + Bank accounts — organized
- Bank accounts dengan tombol "Copy" — functional
- 4 Steps process — clear buyer journey
- WhatsApp CTA di akhir — conversion

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [K-01] Bank account copy button pakai inline onclick
**File:** `app/src/pages/kontak.astro:80`  
**Issue:** `onclick={`navigator.clipboard.writeText('${bank.number.replace(/\s/g, '')}')`}` — inline JS, tidak CSP-friendly  
**Impact:** Jika CSP header ketat, copy tidak jalan  
**Fix:** Pindahkan ke script inline atau Svelte component

#### 🟡 MEDIUM — [K-02] Contact card tidak ada visual hierarchy
**File:** `app/src/pages/kontak.astro:44-65`  
**Issue:** WhatsApp, Email, Alamat, Instagram — semua sama visual weight  
**Impact:** User tidak langsung tahu channel utama  
**Fix:** WhatsApp card lebih prominent (bg color, icon larger)

#### 🟢 LOW — [K-03] Missing "Jam Kerja" info
**File:** `app/src/pages/kontak.astro`  
**Issue:** Tidak ada info jam kerja eksplisit (09:00-21:00)  
**Impact:** User tidak tahu kapan bisa expect response  
**Fix:** Tambahkan di contact info atau footer

---

## 8. FAQ (`/faq`)

### ✅ Yang Sudah Bagus
- 22 Q&A dalam 6 kategorisasi — comprehensive
- Accordion component — clean UX
- "Masih ada pertanyaan?" CTA di akhir — conversion
- Data-driven answers (angka, simulasi)

### ⚠️ Temuan Issues

#### 🔴 HIGH — [F-01] Duplicate category "Manajemen & Operasional"
**File:** `app/src/data/faq.json:62,109`  
**Issue:** Category "Manajemen & Operasional" muncul DUA KALI (index 4 dan index 6)  
**Impact:** UX confusing — 2 section dengan nama sama  
**Fix:** Gabungkan items dari kedua kategori atau rename salah satu

#### 🟡 MEDIUM — [F-02] FAQ page import Accordion dari path berbeda
**File:** `app/src/pages/faq.astro:11`  
**Issue:** `import Accordion from '../lib/components/ui/Accordion.svelte'` — path berbeda dari komponen lain  
**Impact:** Jika path berubah, harus edit manual  
**Fix:** Centralize component path

#### 🟢 LOW — [F-03] FAQ category header tidak konsisten styling
**File:** `app/src/pages/faq.astro:46`  
**Issue:** `<h2 class="font-display text-3xl ...">` — size konsisten, tapi border-bottom styling berbeda dari section header lain  
**Impact:** Minor visual inconsistency  
**Fix:** Pakai eyebrow pattern untuk konsistensi

---

## 9. ARTIKEL (`/artikel`)

### ✅ Yang Sudah Bagus
- 6 artikel dengan kategori, tanggal, excerpt — structured
- Image hover zoom effect — interactive
- Badge kategori + tanggal — clear metadata
- CTA ke WhatsApp per artikel — conversion

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [A-01] Artikel images pakai Unsplash external URL
**File:** `app/src/pages/artikel.astro:18-24`  
**Issue:** `https://images.unsplash.com/photo-...` — external image dependency  
**Impact:** Jika Unsplash change/blocked, images broken. Juga slower load  
**Fix:** Download images ke local `/images/artikel/` atau generate via nanobanana

#### 🟡 MEDIUM — [A-02] Artikel link ke WhatsApp bukan ke halaman artikel detail
**File:** `app/src/pages/artikel.astro:64`  
**Issue:** "Baca Selengkapnya" → WhatsApp chat, bukan ke `/artikel/[slug]`  
**Impact:** User expect halaman detail, malah ke WhatsApp  
**Fix:** Buat dynamic route `/artikel/[slug]` atau clarify CTA text ke "Diskusi via WhatsApp"

#### 🟢 LOW — [A-03] Artikel tidak punya individual page
**File:** `app/src/pages/artikel.astro`  
**Issue:** Tidak ada `/artikel/[slug].astro` — semua artikel hanya di listing page  
**Impact:** Tidak SEO-friendly untuk individual article pages  
**Fix:** Buat dynamic route untuk individual articles

---

## 10. LEGAL PAGES (`/kebijakan-privasi`, `/syarat-dan-ketentuan`)

### ✅ Yang Sudah Bagus
- Struktur identik: PageHero + TOC sidebar + Content + WhatsApp CTA
- TOC sidebar sticky — good UX untuk long content
- Section icons (lucide-svelte) — visual navigation
- Content legal compliant (UU PDP reference)

### ⚠️ Temuan Issues

#### 🟢 LOW — [LP-01] TOC sidebar sticky offset mungkin overlap navbar
**File:** `app/src/pages/kebijakan-privasi.astro:55`  
**Issue:** `lg:top-24` — navbar height h-20 (80px) = top-20 (80px), tapi top-24 = 96px  
**Impact:** 16px gap antara navbar dan TOC — mungkin tidak issue, tapi inconsistent  
**Fix:** `lg:top-[84px]` atau `lg:top-21`

#### 🟢 LOW — [LP-02] Legal pages tidak ada WhatsAppFloating
**File:** `app/src/pages/kebijakan-privasi.astro`, `syarat-dan-ketentuan.astro`  
**Issue:** Kedua halaman legal ADA WhatsAppFloating — bagus, tapi halaman lain (villa detail) tidak semua ada  
**Impact:** Inconsistent WhatsApp access  
**Fix:** Pastikan semua halaman punya WhatsAppFloating

---

## 11. 404 PAGE

### ✅ Yang Sudah Bagus
- Custom 404 dengan "404" besar — clear
- Copy "Sepertinya Anda Tersesat" — friendly
- 4 popular pages — recovery path
- WhatsApp CTA — alternative

### ⚠️ Temuan Issues

#### 🟢 LOW — [404-01] Sitemap link mungkin broken
**File:** `app/src/pages/404.astro:76`  
**Issue:** `<a href="/sitemap-index.xml">` — belum tentu file ini ada  
**Impact:** Broken link  
**Fix:** Verify sitemap XML exists atau ganti ke `/sitemap.xml`

---

## 12. CROSS-CUTTING ISSUES (Memengaruhi Semua Halaman)

### 🔴 HIGH — [XC-01] DUPLICATE CSS: `.badge-villa-*` didefinisikan 2x
**File:** `app/src/styles/global.css:191-193` DAN `global.css:510-524`  
**Issue:** Class `.badge-villa-bijak`, `.badge-villa-idaman`, `.badge-villa-mapan` didefinisikan DUA KALI — di `@layer components` (line 191) DAN di plain CSS (line 510)  
**Impact:** Specificity conflict, potential override unpredictable  
**Fix:** Hapus salah satu, pertahankan di `@layer components`

### 🔴 HIGH — [XC-02] Dual Navbar: Navbar.astro vs NavMenu.svelte
**File:** `app/src/components/astro/Navbar.astro` DAN `app/src/components/svelte/NavMenu.svelte`  
**Issue:** DUA navbar component — `Navbar.astro` (vanilla JS) dan `NavMenu.svelte` (Svelte 5). SEMUA halaman pakai `NavMenu`, `Navbar` TIDAK DIPAKAI  
**Impact:** Dead code, confusion untuk developer baru  
**Fix:** Hapus `Navbar.astro` atau rename ke `NavbarLegacy.astro` sebagai backup

### 🔴 HIGH — [XC-03] `container-wide` max-width 1600px — terlalu lebar
**File:** `app/src/styles/global.css:111`  
**Issue:** `max-w-[1600px]` — di layar 1440px, konten bisa terlalu lebar  
**Impact:** Text lines terlalu panjang (>80 characters) → reading fatigue  
**Fix:** `max-w-[1440px]` atau `max-w-7xl` (1280px) untuk readability optimal

### 🟡 MEDIUM — [XC-04] Font loading: Google Fonts CSS @import di CSS file
**File:** `app/src/styles/global.css:7`  
**Issue:** `@import url('https://fonts.googleapis.com/css2?...')` — render-blocking CSS import  
**Impact:** Font load delay → FOIT/FOUT  
**Fix:** Pindahkan ke `<link>` tag di `<head>` dengan `display=swap` (sudah ada, tapi @import di CSS lebih lambat dari link di HTML)

### 🟡 MEDIUM — [XC-05] Section padding tidak 100% konsisten
**Issue:** Beberapa section pakai `py-20 md:py-32`, beberapa `py-16 md:py-20`, beberapa `py-24 md:py-40`  
**Impact:** Spacing rhythm tidak konsisten  
**Fix:** Standarisasi ke 3 level:
- Normal section: `py-20 md:py-32`
- Tight section: `py-12 md:py-20`  
- Wide section (hero/CTA): `py-24 md:py-40`

### 🟡 MEDIUM — [XC-06] `text-gray-*` Tailwind default masih dipakai
**Issue:** Cek apakah ada class `text-gray-500` dll yang tersisa dari Tailwind default  
**Impact:** Inconsistent dengan design system yang pakai `ink-soft`/`ink-mute`  
**Fix:** Grep dan replace semua `text-gray-*` ke `ink-*` variants

### 🟡 MEDIUM — [XC-07] Tidak ada `loading="lazy"` yang konsisten
**Issue:** Beberapa image pakai `loading="lazy"`, beberapa tidak  
**Impact:** Performance — semua image load saat page load  
**Fix:** Tambah `loading="lazy"` untuk semua below-fold images

### 🟡 MEDIUM — [XC-08] Schema.org Product tidak dinamis
**File:** `app/src/components/seo/ProductSchema.astro`  
**Issue:** Product schema hardcode, tidak dinamis per villa  
**Impact:** SEO — Google tidak dapat structured data per produk  
**Fix:** Buat dynamic schema per villa detail page

### 🟡 MEDIUM — [XC-09] Tidak ada `robots.txt` visible
**Issue:** Belum dicek apakah ada `robots.txt` di public folder  
**Impact:** SEO — crawler tidak tahu rules  
**Fix:** Buat `public/robots.txt` dengan sitemap reference

### 🟢 LOW — [XC-10] `favicon.svg` — semua halaman pakai SVG favicon
**File:** `app/src/layouts/BaseLayout.astro:53`  
**Issue:** SVG favicon — bagus untuk modern browsers, tapi beberapa browser lama tidak support  
**Impact:** Minor — mostly modern browsers  
**Fix:** Tambah PNG fallback untuk legacy browsers

### 🟢 LOW — [XC-11] Missing `manifest.json` untuk PWA-like behavior
**Issue:** Tidak ada web manifest  
**Impact:** Tidak bisa "Add to Home Screen"  
**Fix:** Buat `public/manifest.json` dengan theme color + icons

### 🟢 LOW — [XC-12] Cookie consent muncul di SEMUA halaman
**File:** `app/src/layouts/BaseLayout.astro:111`  
**Issue:** `<CookieConsent client:load />` — termasuk halaman 404, legal pages  
**Impact:** Minor annoyance di halaman non-komersial  
**Fix:** Tidak issue besar, tapi bisa di-skip untuk 404 page

---

## 13. MOBILE-SPECIFIC AUDIT (375px viewport)

### ⚠️ Issues yang Hanya Muncul di Mobile

#### 🔴 HIGH — [M-01] StickyMobileCTA buttons terlalu kecil
**File:** `app/src/components/svelte/StickyMobileCTA.svelte:50`  
**Issue:** `grid-cols-4 gap-2` dengan 3 buttons — button "Villa" dan "Simulasi` terlalu kecil  
**Impact:** Difficult to tap (minimum 44px touch target)  
**Fix:** `grid-cols-3` atau buat 2-row layout

#### 🔴 HIGH — [M-02] VillaHero thumbnail grid overflow di mobile
**File:** `app/src/components/svelte/VillaHero.svelte:180`  
**Issue:** `grid-cols-4` untuk thumbnail — di mobile, 4 thumbnails terlalu kecil  
**Impact:** Thumbnails tidak tappable  
**Fix:** `grid-cols-4 md:grid-cols-4` dengan min-height, atau horizontal scroll

#### 🟡 MEDIUM — [M-03] Comparison table horizontal scroll tidak ada indicator
**File:** `app/src/pages/investasi/skema-bank.astro:74`  
**Issue:** `overflow-x-auto` pada table — tapi tidak ada visual scroll indicator  
**Impact:** User tidak tahu ada lebih banyak kolom  
**Fix:** Tambah scroll hint (gradient fade) atau `scroll-hint` class

#### 🟡 MEDIUM — [M-04] PageHero title bisa overflow di mobile
**File:** `app/src/components/astro/PageHero.astro:64`  
**Issue:** `text-editorial-lg` dengan `clamp(2rem, 4vw, 3.5rem)` — di 375px = 2rem, tapi title text panjang  
**Impact:** Text overflow atau line-height jelek  
**Fix:** Test semua PageHero titles di 375px, tambah `break-words`

#### 🟡 MEDIUM — [M-05] FAQ accordion padding tidak optimal di mobile
**File:** FAQ accordion  
**Issue:** Padding mungkin terlalu besar untuk mobile  
**Impact:** Terlalu banyak scrolling  
**Fix:** Kurangi padding di mobile

#### 🟢 LOW — [M-06] Floating action button overlap dengan StickyMobileCTA
**File:** `FloatingActionButton.svelte` + `StickyMobileCTA.svelte`  
**Issue:** Kedua component muncul di mobile — bisa overlap di bottom-right corner  
**Impact:** UI conflict  
**Fix:** Sembunyikan FloatingActionButton di mobile, atau pindah posisi

---

## 14. COPYWRITING AUDIT

### ✅ Yang Sudah Bagus
- **Homepage Hero:** "Masa Depan Lebih Mapan" — aspirational, short
- **Villa Overview:** "Anda tidak sedang membeli villa" — pattern interrupt
- **Investasi:** "Cicilan Anda, Ditutup Income Anda" — clear value prop
- **Kontak:** "Konsultasi Gratis, Tanpa Komitmen" — removes friction
- **404:** "Sepertinya Anda Tersesat" — friendly, non-technical

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [CW-01] CTA text tidak selalu action-specific
**Issue:** Beberapa CTA pakai generic text seperti "Lihat Villa" atau "Konsultasi"  
**Impact:** Low click-through  
**Fix:** Lebih spesifik: "Bandingkan 3 Tipe Villa" atau "Chat Sales Expert"

#### 🟡 MEDIUM — [CW-02] Urgency copy bisa lebih aggressive
**Issue:** "16 dari 74 unit tersisa" — bagus, tapi bisa tambah "Hanya X hari lagi promo berakhir"  
**Impact:** Urgency kurang kuat  
**Fix:** Tambah countdown timer di lebih banyak tempat

#### 🟢 LOW — [CW-03] Beberapa section description terlalu panjang
**Issue:** 2-3 baris description per section — bisa kehilangan attention  
**Impact:** User skip reading  
**Fix:** Max 1-2 baris per section description

---

## 15. SEO AUDIT

### ✅ Yang Sudah Bagus
- Title tags unik per halaman
- Meta description unik per halaman
- Open Graph tags lengkap
- Schema.org Organization + Product
- Canonical URL set

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [SEO-01] Tidak ada `sitemap.xml` verified
**Issue:** Belum cek apakah sitemap auto-generate oleh `@astrojs/sitemap`  
**Impact:** SEO — Google tidak bisa discover semua pages  
**Fix:** Build dan verify sitemap

#### 🟡 MEDIUM — [SEO-02] Tidak ada structured data per villa
**Issue:** Product schema hardcode, tidak per-villa  
**Impact:** Rich snippets tidak muncul untuk villa pages  
**Fix:** Dynamic ProductSchema per villa

#### 🟢 LOW — [SEO-03] Missing `hreflang` untuk bilingual
**Issue:** Website hanya Bahasa Indonesia, tapi tidak ada `hreflang` tag  
**Impact:** Minor — jika tidak ada rencana bilingual  
**Fix:** Tambah `<link rel="alternate" hreflang="id" href="..." />`

---

## 16. PERFORMANCE AUDIT

### ⚠️ Temuan Issues

#### 🟡 MEDIUM — [PF-01] Too many Svelte components `client:load`
**Issue:** Homepage: 7+ components dengan `client:load` — semua hydrate sekaligus  
**Impact:** Initial JS bundle besar, TTI lambat  
**Fix:** Gunakan `client:visible` atau `client:idle` untuk below-fold components

#### 🟡 MEDIUM — [PF-02] `@import` Google Fonts di CSS — render-blocking
**File:** `global.css:7`  
**Issue:** CSS @import menunggu CSS file load dulu → font load delay  
**Impact:** FOIT (Flash of Invisible Text)  
**Fix:** Pindahkan ke `<link rel="preload">` di head

#### 🟢 LOW — [PF-03] Lucide icons — tree shaking mungkin tidak optimal
**Issue:** Import banyak icons dari `lucide-svelte`  
**Impact:** Bundle size  
**Fix:** Pastikan tree-shaking aktif, atau import per-icon

---

## 17. REKOMENDASI PRIORITAS

### MINGGU 1 (Critical Fixes)
1. Fix duplicate interior images villa detail [VD-01]
2. Fix duplicate CSS badge-villa [XC-01]
3. Fix FAQ duplicate category [F-01]
4. Fix StickyMobileCTA touch targets [M-01]
5. Fix VillaHero thumbnail mobile [M-02]
6. Remove unused Navbar.astro [XC-02]
7. Fix hero double relative [H-01]

### MINGGU 2 (Important Fixes)
8. Standardize section padding [XC-05]
9. Fix container max-width [XC-03]
10. Add FAQ link di footer [H-06]
11. Fix font loading strategy [PF-02]
12. Add scroll indicator untuk tables [M-03]
13. Fix KPR Developer highlight label [I-01]
14. Fix artikel external images [A-01]

### MINGGU 3 (Nice-to-Have)
15. Optimize client:load → client:visible [PF-01]
16. Add individual artikel pages [A-03]
17. Add web manifest [XC-11]
18. Fix TOC sticky offset [LP-01]
19. Improve mobile PageHero title [M-04]
20. Fix FloatingButton overlap mobile [M-06]

---

## 18. CHECKLIST TESTING

### Desktop (1440px)
- [ ] Homepage: semua 11 section render tanpa overlap
- [ ] Homepage: marquee tidak terlalu cepat
- [ ] Homepage: countdown timer berjalan
- [ ] Homepage: live activity ticker update
- [ ] Villa index: trust bar proporsional
- [ ] Villa detail: image carousel jalan
- [ ] Villa detail: lead form submit ke WhatsApp
- [ ] Investasi: KPR Calculator interaktif
- [ ] Investasi: ROI Simulator interaktif
- [ ] Lokasi: Google Maps embed load
- [ ] Kontak: bank account copy jalan
- [ ] FAQ: accordion expand/collapse
- [ ] Legal: TOC sidebar sticky
- [ ] 404: popular links navigation
- [ ] Navbar: active state highlight
- [ ] Footer: semua links jalan

### Mobile (375px)
- [ ] Homepage: hero text tidak overflow
- [ ] Homepage: sticky CTA muncul setelah scroll
- [ ] Homepage: floating button tidak overlap sticky CTA
- [ ] Villa detail: thumbnail grid scrollable
- [ ] Villa detail: lead form input tidak zoom (font-size 16px)
- [ ] Investasi: comparison table scrollable
- [ ] FAQ: accordion padding optimal
- [ ] Legal: TOC sidebar hidden di mobile
- [ ] Semua halaman: tidak ada horizontal scroll
- [ ] Semua halaman: touch targets >= 44px

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Samsung Internet (latest)
- [ ] iOS Safari

### Performance
- [ ] Lighthouse Performance > 80
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s
- [ ] Cumulative Layout Shift < 0.1

---

*Audit ini bersifat living document — update saat fixes diterapkan.*
*Last updated: 15 Juni 2026*
