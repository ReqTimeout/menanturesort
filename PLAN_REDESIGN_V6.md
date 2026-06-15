# MENANTU RESORT — PLAN REDESIGN V6 (Audit-Driven Revisions)
**Tanggal:** 2026-06-14  
**Status:** DRAFT untuk review user  
**Supersedes:** V5.2 (homepage + villa pages jadi baseline)

---

## 📋 TL;DR

V5.2 deliver 11 homepage sections + 4 villa pages dengan build sukses, 200KB gzipped JS, dan 6 hydrated islands per page. **Tapi audit visual (5 screenshot playwright @ 1440×900)** menemukan 5 issue fundamental yang harus di-fix sebelum PHASE 5:

1. **Hero H1 clamp 5rem** → word-wrap kacau, "membeli" + "villa." kepisah ke baris sendiri
2. **Section flat** → banyak whitespace besar tanpa SVG pattern / gradient / texture
3. **Motion `initial={{ opacity: 0 }}` + `whileInView`** → stuck di opacity 0 saat user scroll cepat / koneksi lambat / full-page screenshot
4. **Mini-card villa di /villa/ kanan** → label "Attic" / "Double Glass" / "Luxury Private" tidak muncul
5. **LeadForm SPA** → tidak ter-render di section terakhir detail page (same root cause #3)

**Plus user requests:**
- ❌ Hapus **anti-fraud bar kuning** di footer ("Pembayaran SAH hanya melalui rekening resmi...")
- ❌ Hapus **"beriklan.co.id"** di footer (Catatan: V5.2 sudah tidak ada, user mungkin melihat dari web lama. Verify & confirm.)

---

## 🔍 VISUAL AUDIT — Screenshots captured 2026-06-14 22:11

### `/` (homepage)
| Aspek | Status | Catatan |
|---|---|---|
| Hero fold | ✅ EXCELLENT | "Masa Depan Lebih Mapan." + drone shot + 3 stats + 1-field WA form + ticker "8 sedang melihat" |
| Sections setelah fold | 🚨 **CRITICAL** | 4-5 section berikutnya KOSONG (hitam/cream besar tanpa konten visible). Root cause: motion `whileInView` opacity stuck |
| Testimoni carousel | ✅ OK | 3 cards visible |
| Footer | 🚨 | Anti-fraud bar kuning masih ada |

### `/villa/` (landing)
| Aspek | Status | Catatan |
|---|---|---|
| Hero H1 | 🚨 **CRITICAL** | "Anda tidak sedang membeli villa" → kata "membeli" & "villa." drop ke baris sendiri. Font terlalu besar. |
| 3 mini-card stack kanan | 🚨 | "Attic" / "Double Glass" / "Luxury Private" labels TIDAK MUNCUL. Badge villa-{id} tidak visible. |
| Trust bar "58/74 / Rp 1,2M / 10%" | ⚠️ | Datar tanpa visual emphasis |
| VillaCard grid (section 3) | 🚨 | KOSONG / tidak ter-render (motion issue) |
| ROI Simulator, Testimoni, Final CTA | 🚨 | KOSONG (motion issue) |

### `/villa/bijak/` `/villa/idaman/` `/villa/mapan/` (detail)
| Aspek | Status | Catatan |
|---|---|---|
| Hero (VillaHero) | ✅ EXCELLENT | Eyebrow + H1 + tagline + harga + booking + 2 CTA + carousel 4 thumbnail + ATTIC/DOUBLE GLASS/LUXURY PRIVATE badge |
| USP 4 kolom | ✅ OK | Icon + judul + deskripsi, gold line atas card |
| Galeri Interior | ✅ EXCELLENT | 5 foto carousel + thumbnail + nav arrow |
| Arsitektur & Cerita | ✅ OK | Blockquote besar + 7-item feature list + 3 stats (LB/LT/Posisi) |
| Cashflow | ✅ EXCELLENT | Dark forest bg + 3 cards (Cicilan/Passive/Surplus) + capital gain callout |
| Comparison mini | ✅ EXCELLENT | 3 villa dengan ring gold di villa aktif + "Villa ini →" link |
| Promo + countdown | ✅ OK | "Booking {villa} hari ini dapat bonus Rp 200 Juta" + 2 CTA |
| Lead Form | 🚨 | KOSONG (motion issue) |
| Footer | 🚨 | Anti-fraud bar kuning masih ada |

---

## 🎯 ROOT CAUSE ANALYSIS

### Issue 1: Hero H1 typography
**File:** `app/src/styles/global.css` (text-editorial-xl class) + `app/src/components/svelte/EditorialHero.svelte`

Class `text-editorial-xl` set `font-size: clamp(2.5rem, 5vw, 5rem)` → 5rem = 80px di viewport 1440. Playfair Display 700 dengan leading 0.92 + 1 kata per baris (forced break `<br/>`) = kata panjang "membeli" & "villa." overflow.

**Fix:**
- Turunkan max dari 5rem ke 3.5rem
- Tighten leading ke 0.95
- Hapus `<br/>` paksa, pakai `<br/>` hanya di transisi em / gold

### Issue 2: Section flat
**File:** semua section PHASE 3 + VillaDetail.astro

Background flat `bg-white` / `bg-cream-50` / `bg-forest-900` tanpa visual texture. Section 100vh+ tanpa elemen visual di tengah = kelihatan broken.

**Fix:**
- Tambah SVG pattern global (dots/grid/diagonal) sebagai utility class
- Pattern subtle (opacity 0.05-0.1) di section cream/putih
- Dark section dapat gold sparkle/noise pattern
- Hero dapat radial gradient backdrop

### Issue 3: Motion visibility
**File:** SEMUA komponen Svelte 5 PHASE 2 + PHASE 3 + VillaHero

Pattern: `initial={{ opacity: 0, y: 30 }}` + `whileInView={{ opacity: 1, y: 0 }}` → IntersectionObserver. Masalah:
- Saat user scroll cepat → animasi skip
- Saat koneksi lambat → JS belum hydrate saat section visible
- Saat full-page screenshot (Playwright/Puppeteer) → semua motion stuck di opacity 0
- **Terutama fatal untuk SEO crawler** yang tidak execute JS

**Fix:**
- Ganti pattern: pakai `initial={false}` (render langsung di final state) + `whileInView` opsional untuk animasi masuk minor
- Atau: tetap pakai motion tapi tambahkan `animate={isInView ? visible : hidden}` dengan fallback CSS
- **Best practice:** CSS-only animation dengan `prefers-reduced-motion: reduce` respect, JS motion hanya untuk hero/CTA di atas-fold

### Issue 4: Mini-card label tidak muncul
**File:** `app/src/pages/villa/index.astro` (lines 75-110 — mini-card stack)

`<span class="badge badge-villa-{v.id}">{v.label}</span>` — mungkin class `badge-villa-{id}` tidak terdefinisi di Tailwind (hanya muncul di CSS setelah dipakai komponen). Atau `<span>` terlalu kecil dan tertutup icon.

**Fix:**
- Inline badge style: background color per villa (bijak=cream, idaman=gold, mapan=forest) + text inverse
- Perbesar mini-card padding, naikkan z-index badge

### Issue 5: LeadForm tidak ter-render
**File:** `app/src/components/svelte/LeadForm.svelte` (motion pattern) + `app/src/components/astro/VillaDetail.astro` line 400

`client:visible` di section bawah + motion opacity 0 = form invisible. 

**Fix:** sama dengan Issue 3 — fix motion pattern globally.

---

## 🆕 ADDITIONAL: WOW Factor & Conversion Audit

Setelah fix 5 issue di atas, gw mau push wow factor. Section "WOW factor" yang bisa ditambah:

1. **Sticky bottom CTA bar** (mobile) — "Chat WhatsApp" + "Lihat Villa" + "Simulasi KPR" selalu visible
2. **Floating "stok berkurang" notification** di pojok — slide-in toast setiap 30s "Baru saja: Unit Mapan #2 di-booking"
3. **Villa quick-view modal** dari listing — tanpa pindah halaman, klik card → modal interaktif dengan full detail
4. **Sticky comparison drawer** — klik 2-3 villa card → muncul bottom drawer dengan side-by-side
5. **Live chat bubble alternatif** — selain WhatsApp, optional widget intercom-like
6. **Personalized recommendation quiz** — 30 detik "Villa mana yang cocok untuk Anda?" (5 pertanyaan)
7. **Hero video background** — bukan foto drone statis, tapi looping 5-detik aerial
8. **Animated stats counter** — "9jt", "10%", "58/74" dengan count-up animation (sudah ada CountUp.svelte!)
9. **Scroll progress indicator** — gold line di top halaman yang nge-track scroll position
10. **Micro-interaction: villa card hover** — foto berubah ke foto interior (sudah ada 3D tilt di nonaktif, bisa diganti simple crossfade)

Conversion path audit:
- /villa/ → belum ada CTA "Bandingkan 3 Villa" sticky
- /villa/bijak/ → 5 WhatsApp CTA + 1 form, **bagus tapi form invisible**
- Homepage → 1-field form hero (good) tapi setelah fold CTA kurang
- Floating WhatsApp button → **sudah ada** (WhatsAppFloating.astro)
- Trust signal di fold pertama → lemah (cuma 3 stats, no logo Sahid, no testimoni micro)

---

## 📅 PHASE 5 PLAN — V5.3 Revisions + Other Pages

### PHASE 5A: Quick Wins (1-2 jam)
- ❌ Hapus anti-fraud bar kuning dari Footer.astro
- ✅ Verify tidak ada "beriklan.co.id" (sudah tidak ada)
- Fix `text-editorial-xl` clamp 5rem → 3.5rem
- Tighten leading hero dari 0.92 → 0.95
- Tambah fallback CSS: section dengan `.motion-fallback` render visible by default

### PHASE 5B: Motion Visibility Fix (2-3 jam)
- Audit SEMUA komponen Svelte yang pakai `motion` + `whileInView`
- Refactor pattern global:
  - `<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>` 
  - → CSS-based: `opacity-0 translate-y-4` lalu IntersectionObserver toggle class
  - → Atau `client:load` untuk above-fold (render langsung visible)
  - → Atau `inView` flag di Svelte 5 dengan `onMount` IntersectionObserver
- Test: Playwright screenshot full-page harus show semua section

### PHASE 5C: SVG Pattern + Visual Texture (2 jam)
- Bikin `app/src/components/astro/Pattern.astro` (5 variants):
  - Dots: 1px circle, spacing 24px
  - Grid: 1px line, 32px cell
  - Diagonal lines: 45deg, spacing 16px
  - Noise: SVG turbulence (subtle grain)
  - Gold sparkle: 4-point star pattern
- Apply ke section PHASE 3 + detail page (subtle, opacity 0.05-0.1)
- Tambah radial gradient backdrop untuk hero

### PHASE 5D: WOW Factor (2-3 jam)
- Animated stats counter di hero (9jt / 10% / 58/74 → count-up)
- Sticky bottom CTA mobile (3 buttons: WA / Villa / Simulasi)
- Scroll progress bar (gold line top)
- Toast "stok berkurang" notification (auto-slide setiap 45s)
- Villa quick-view modal dari listing (click card → modal)

### PHASE 5E: Conversion Micro-Optimizations (1-2 jam)
- Trust signal di fold pertama homepage: logo Sahid + 5 logo bank partner
- Tambah "Sahid Hotels: 20+ properti" mini-logo grid
- Hero sub-copy: dari "Aset warisan produktif..." → "Cicilan Rp 9,7 jt/bln. Passive income Rp 9-15 jt/bln. Cashflow positif dari bulan pertama."
- Sticky "Bandingkan 3 Villa" CTA di /villa/

### PHASE 5F: Other Pages Polish (3-4 jam) — INI PHASE 5 ASLI
- /investasi/index, /skema-bank, /skema-developer, /passive-income
- /lokasi, /resort, /kontak, /faq
- /artikel, /legal
- Apply design system V5.2 (semantic color, motion fix, pattern)

### PHASE 5G: Build & Visual QA (1 jam)
- Full clean rebuild
- Playwright screenshot 19 routes
- Verify HTTP 200, motion visible, no anti-fraud

---

## 🎨 FINAL SPEC: V6 Design System Updates

### Hero Typography
```css
/* BEFORE */
.text-editorial-xl { font-size: clamp(2.5rem, 5vw, 5rem); }

/* AFTER */
.text-editorial-xl { font-size: clamp(2rem, 3.5vw, 3.5rem); line-height: 0.95; letter-spacing: -0.02em; }
```

### Motion Pattern (NEW standard)
```svelte
<!-- BEFORE -->
<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>

<!-- AFTER (option A: CSS-only) -->
<div class="motion-fade-in">

<!-- AFTER (option B: Svelte 5 inView) -->
<div use:inView class:in-view={isInView} class="opacity-0 translate-y-4 transition-all duration-700">
```

### Pattern Utility
```css
/* New: .bg-pattern-dots, .bg-pattern-grid, .bg-pattern-diagonal, .bg-pattern-noise */
.bg-pattern-dots { background-image: radial-gradient(circle, rgba(27,67,50,0.08) 1px, transparent 1px); background-size: 24px 24px; }
.bg-pattern-grid { background-image: linear-gradient(rgba(27,67,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,0.05) 1px, transparent 1px); background-size: 32px 32px; }
```

### Footer
- ❌ Hapus anti-fraud bar
- ✅ Keep: Developed by PT Cipta Multikarya (MK LAND) — user concern "beriklan.co.id" tidak ada di V5.2
- ✅ Tambah: 3 logo bank (BNI/BCA/BSI) untuk trust signal

---

## ❓ DECISIONS NEEDED dari User

1. **Konfirmasi "beriklan.co.id" issue** — V5.2 footer sudah tidak ada. User lihat di mana? Web existing (run.app)? Cache browser?
2. **PHASE 5A dulu** (quick wins: hapus anti-fraud + fix hero font + fix motion fallback) sebelum lanjut 5B-5F?
3. **WOW factor** — semua 10 item atau pilih 4-5 yang paling impactful?
4. **Sticky bottom CTA mobile** — mau? (umumnya menambah conversion 15-25% di mobile)
5. **Trust signal priority** — Sahid logo + bank logo grid di fold pertama?

---

## 📊 ESTIMATED EFFORT

| Sub-phase | Estimasi | Risk |
|---|---|---|
| 5A Quick wins | 1-2 jam | Low |
| 5B Motion fix | 2-3 jam | Medium (touch banyak komponen) |
| 5C SVG pattern | 2 jam | Low |
| 5D WOW factor | 2-3 jam | Medium |
| 5E Conversion | 1-2 jam | Low |
| 5F Other pages | 3-4 jam | Medium |
| 5G QA | 1 jam | Low |
| **Total** | **12-17 jam** | ~2-3 hari kerja |

---

## 📦 FILES TOUCHED (estimated)

### New
- `app/src/components/astro/Pattern.astro` (40 LOC)
- `app/src/components/svelte/ScrollProgress.svelte` (50 LOC)
- `app/src/components/svelte/StickyMobileCTA.svelte` (80 LOC)
- `app/src/components/svelte/StockToast.svelte` (70 LOC)
- `app/src/components/svelte/VillaQuickView.svelte` (150 LOC)
- `app/src/lib/motion.ts` (refactored — helpers inView + variants)

### Modified
- `app/src/styles/global.css` (+8 pattern utility, -2 anti-fraud ref)
- `app/src/components/astro/Footer.astro` (hapus anti-fraud)
- `app/tailwind.config.mjs` (+5 pattern animation)
- `app/src/components/svelte/EditorialHero.svelte` (font size + fallback)
- `app/src/pages/villa/index.astro` (mini-card badge fix)
- `app/src/components/astro/VillaDetail.astro` (motion fix)
- 8+ Svelte components motion refactor
- 10+ other pages polish

### Verified (no change needed)
- Footer "beriklan.co.id" — **TIDAK ADA** di V5.2
- Build system, data structure, WhatsApp CTA macro

---

**Next:** Konfirmasi decisions di atas, lalu mulai eksekusi per sub-phase. Lapor progress dengan metrics setiap sub-phase selesai.
