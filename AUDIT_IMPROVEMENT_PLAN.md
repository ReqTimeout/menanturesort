# MENANTU RESORT — Audit & Improvement Plan V7
**Tanggal:** 2026-06-15  
**Status:** DRAFT — Menunggu approval user sebelum eksekusi  
**Scope:** Full audit 16 halaman + design system + konsistensi + UI/UX

---

## 📋 EXECUTIVE SUMMARY

Audit menyeluruh terhadap seluruh halaman dan komponen. Ditemukan **5 bug kritis**, **8 konsistensi issue**, dan **12 improvement opportunities**. Tidak ada perubahan fundamental — semua fix bersifat polish dan konsistensi.

---

## 🚨 BUG KRITIS (Harus Fix Sekarang)

### BUG-1: `text-ink-soft` & `text-ink-mute` Class Tidak Terdefinisi
**Severity:** 🔴 CRITICAL  
**File:** 10+ halaman (resort, kontak, investasi, faq, artikel, legal, passive-income)  
**Masalah:** Class `text-ink-soft` dan `text-ink-mute` digunakan di banyak halaman, tapi **tidak ada di `tailwind.config.mjs`** (ink hanya punya 500/700/900). Class ini di-ignore silently oleh Tailwind → text pakai default color (hitam).  
**Impact:** Label "Rekening Resmi", "WhatsApp", "Email" di footer dan halaman kontak tidak punya warna yang benar.  
**Fix:**
```js
// tailwind.config.mjs → colors.ink
ink: {
  500: '#3D4A40',
  700: '#7A8479',
  900: '#0D1B14',
  soft: '#3D4A40',   // NEW — alias untuk 500
  mute: '#7A8479',   // NEW — alias untuk 700
}
```

### BUG-2: Passive Income Page Legacy Classes
**Severity:** 🔴 CRITICAL  
**File:** `app/src/pages/investasi/passive-income.astro`  
**Masalah:** Halaman ini masih pakai legacy classes yang sudah tidak konsisten:
- `heading-title` (legacy) → harusnya `text-editorial-md` atau `font-display text-2xl`
- `heading` (legacy) → harusnya `font-display text-xl`
- `text-body-lg` → ada di `tailwind.config.mjs` fontSize, tapi kurang umum
- `text-success` → pakai `success.DEFAULT` (#2D6A4F), seharusnya `text-success-600`
- `card` (legacy) → harusnya `card-premium`
- `accent-line` → masih valid tapi kurang digunakan di halaman lain
- Zero patterns, zero dividers, zero motion
**Fix:** Rewrite entire page to V5.2 design system (see Phase plan below)

### BUG-3: Navbar vs NavMenu Split
**Severity:** 🟡 HIGH  
**File:** SEMUA halaman sekunder  
**Masalah:**
- Homepage + Villa pages → `NavMenu.svelte` (Svelte, mobile Sheet menu, scroll-aware)
- Semua halaman lain → `Navbar.astro` (Astro, basic mobile toggle)
- **User experience berbeda**: NavMenu punya slide-out Sheet, Navbar punya toggle sederhana
- Terlihat inkonsisten saat user navigasi antar halaman
**Fix:** Ganti semua halaman ke `NavMenu.svelte` (sudah ada, tinggal ganti import)

### BUG-4: Orphan Components Tidak Terpakai
**Severity:** 🟢 LOW  
**File:** 7 Astro components  
**Masalah:** Component ini ada tapi TIDAK diimport oleh halaman manapun:
- `StatsBar.astro`
- `Testimoni.astro`
- `SahidPartnership.astro`
- `PassiveIncome.astro` (Astro version)
- `PillarValue.astro`
- `FinalCTA.astro`
- `Hero.astro`
**Fix:** Hapus atauarsipkan untuk kurangi confusion

### BUG-5: `text-success` Class di Passive Income
**Severity:** 🟡 MEDIUM  
**File:** `app/src/pages/investasi/passive-income.astro` line 56  
**Masalah:** `text-success` pakai `success.DEFAULT` (#2D6A4F) — bukan green yang diharapkan. Seharusnya `text-success-600` untuk hijau yang lebih jelas.  
**Fix:** `text-success` → `text-success-600`

---

## ⚠️ KONSISTENSI ISSUES

### K-1: SectionDivider Usage Tidak Konsisten
| Halaman | Ada Divider? | Keterangan |
|---------|-------------|------------|
| `/` (homepage) | ✅ Ya | Antara section utama |
| `/villa` | ✅ Ya | `diamond` variant |
| `/villa/bijak` | ✅ Ya | 6 dividers (via VillaDetail.astro) |
| `/resort` | ⚠️ Partial | Hanya 2 dari 3 section |
| `/lokasi` | ❌ Tidak ada | Zero dividers |
| `/kontak` | ✅ Ya | `diamond` + `ornate` |
| `/faq` | ❌ Tidak ada | Zero dividers |
| `/artikel` | ❌ Tidak ada | Zero dividers |
| `/investasi` | ✅ Ya | 4 dividers |
| `/investasi/passive-income` | ⚠️ Partial | Hanya 1 divider |
| `/investasi/skema-bank` | ⚠️ Partial | Tidak konsisten |
| `/investasi/skema-developer` | ⚠️ Partial | Tidak konsisten |

**Fix:** Tambah `<SectionDivider>` antara semua major sections

### K-2: Pattern Usage Tidak Konsisten
| Halaman | Pattern Component? | Inline CSS Pattern? |
|---------|-------------------|---------------------|
| `/villa` | ✅ `<Pattern>` | ❌ |
| `/villa/*` | ✅ `<Pattern>` | ❌ |
| `/resort` | ✅ `<Pattern>` | ❌ |
| `/lokasi` | ✅ `<Pattern>` | ❌ |
| `/kontak` | ✅ `<Pattern>` | ❌ |
| `/investasi` | ✅ `<Pattern>` | ❌ |
| `/investasi/passive-income` | ❌ | ❌ Zero patterns |
| Homepage sections | ❌ | ✅ `pattern-dots` CSS |

**Observasi:** Homepage sections pakai inline CSS `pattern-dots` daripada `<Pattern>` component. Ini duplicate effort.  
**Fix:** Konsisten pakai `<Pattern>` component di semua halaman

### K-3: Section Background Inconsistency
Sections pakai berbagai cara untuk set background:
- `bg-white` / `bg-cream-50` (inline Tailwind)
- `section-cream` / `section-white` (CSS component class)
- `relative bg-forest-700` (inline)

**Fix:** Standarisasi pakai `section-cream`, `section-white` untuk sections, atau inline `bg-*` — pilih satu approach

### K-4: Container Width Inconsistency
- Homepage + Villa pages → `container-wide` (max-w-1600px)
- Investasi sub-pages → `container-tight` (max-w-5xl) — **lebih sempit**
- Resort/Kontak → `container-wide`

**Observasi:** `container-tight` di investasi pages membuat konten terasa lebih sempit dari halaman lain  
**Fix:** Evaluasi apakah semua halaman harus pakai `container-wide`, atau investasi pages memang butuh `container-tight`

### K-5: Hero Typography Masih Terlalu Besar
**File:** `tailwind.config.mjs` line 161  
**Masalah:** `text-hero` = `clamp(2.75rem, 7vw, 6rem)` → 6rem di 1440px viewport = 96px. Playfair Display 700 dengan leading 0.95 bisa menyebabkan word-wrap masalah (seperti yang dilaporkan di PLAN_REDESIGN_V6).  
**Status:** `text-editorial-xl` di `global.css` sudah di-fix ke `clamp(2.25rem, 4.5vw, 4rem)`, tapi `text-hero` di Tailwind config masih 6rem.  
**Fix:** Sync `text-hero` dengan `text-editorial-xl`: `clamp(2.5rem, 5vw, 4.5rem)`

### K-6: Missing `ink-soft` & `ink-mute` di Footer
**File:** `Footer.astro` line 73  
**Masalah:** `text-ink-mute` digunakan untuk "Rekening Resmi" label — class ini tidak ada (see BUG-1)  
**Impact:** Label berwarna hitam default bukan abu-abu yang diharapkan

### K-7: Villa Detail Interior Images Identik
**File:** `bijak.astro`, `idaman.astro`, `mapan.astro`  
**Masalah:** Ketiga halaman share gambar interior yang sama (`/images/interior/hero/*`). Tidak ada villa-specific interior.  
**Fix:** Generate villa-specific images via nanobanana (Phase 8) atau gunakan placeholder yang berbeda

### K-8: UrgencyBanner unitsLeft Hardcoded
**File:** Villa detail pages  
**Masalah:** `unitsLeft={16}` hardcoded untuk semua villa. Mapan seharusnya `2` (hanya 2 unit flagship).  
**Fix:** Setiap halaman detail harus punya `unitsLeft` yang berbeda:
- Bijak: 16 (dari 36 unit)
- Idaman: 12 (dari 36 unit)  
- Mapan: 2 (dari 2 unit)

---

## 🎨 DESIGN IMPROVEMENTS (Bukan Perubahan — Polish)

### D-1: Tambah Pattern ke Flat Sections
Banyak section yang background-nya flat tanpa texture. Ini membuat halaman terasa "kosong" di scroll.

**Section yang perlu Pattern ditambahkan:**
| Section | Halaman | Pattern yang Cocok |
|---------|---------|-------------------|
| Map section | `/lokasi` | `grid` pattern |
| Article cards | `/artikel` | `dots` pattern |
| FAQ accordion | `/faq` | `dots-dense` pattern |
| Fasilitas grid | `/resort` | Sudah ada ✅ |
| Sahid management | `/resort` | Sudah ada ✅ |
| Contact info | `/kontak` | Sudah ada ✅ |
| 4 Steps process | `/kontak` | Sudah ada ✅ |
| Passive Income cards | `/investasi/passive-income` | `gold-sparkle` pattern |
| ROI Guarantee | `/investasi/passive-income` | `diagonal` pattern |

### D-2: Tambah Motion ke Halaman Sekunder
Saat ini hanya Homepage + Villa detail pages yang punya svelte-motion animations. Halaman sekunder (resort, lokasi, kontak, faq, artikel) **zero motion**.

**Minimal yang perlu ditambah:**
- `PageHero` entrance animation (fade-up)
- Card hover effects (sudah ada di beberapa halaman via `card-premium`)
- Section entrance animations untuk sections panjang

**Approach:**
- Tambah `client:visible` pada Svelte wrapper component
- atau pakai CSS `@keyframes` + `animation-delay` untuk Astro-only pages (lebih ringan)

### D-3: Gold Radial Gradient di Hero
Beberapa hero section masih flat background. Tambah `bg-radial-gold` atau `bg-radial-forest` untuk depth.

**Section yang perlu:**
- `/lokasi` hero (add radial forest)
- `/kontak` hero (add radial gold)
- `/faq` hero (add radial forest)

### D-4: Card Premium Standardization
Beberapa halaman masih pakai `.card` (legacy) bukan `.card-premium`. 

**Fix:** Ganti semua `class="card ..."` dengan `class="card-premium ..."` atau minimal tambah gold accent line

### D-5: WhatsApp CTA Consistency
| Halaman | WhatsAppFloating? | Inline CTA? | Both? |
|---------|------------------|-------------|-------|
| `/` | ❌ (pakai FAB) | ✅ | ❌ |
| `/villa` | ❌ | ✅ | ❌ |
| `/villa/*` | ❌ | ✅ | ❌ |
| `/resort` | ❌ | ✅ | ❌ |
| `/lokasi` | ❌ | ✅ | ❌ |
| `/kontak` | ❌ | ✅ | ❌ |
| `/faq` | ❌ | ✅ | ❌ |
| `/artikel` | ❌ | ✅ | ❌ |
| `/investasi` | ❌ | ✅ | ❌ |
| `/investasi/*` | ✅ | ✅ | ✅ |

**Observasi:** Hanya investasi sub-pages yang pakai `WhatsAppFloating`. Homepage pakai `FloatingActionButton` (berbeda).  
**Fix:** Evaluasi apakah semua halaman perlu `WhatsAppFloating`, atau cukup inline CTA saja

### D-6: Trust Signal Enhancement
**Current state:** Trust signal hanya berupa 3 stats di homepage hero (9jt, 10%, 58/74).  
**Improvement:**
- Tambah mini-logo Sahid Hotels di homepage (fold pertama)
- Tambah bank partner logos (sudah ada di footer, tapi belum di hero)
- Tambah "428+ investor" social proof micro-card

### D-7: Scroll Progress Indicator
Sudah ada `ScrollProgress.svelte` tapi belum diintegrasikan ke halaman manapun.  
**Fix:** Tambahkan ke `BaseLayout.astro` atau individual pages

### D-8: StickyMobileCTA Not Used
`StickyMobileCTA.svelte` sudah ada tapi belum diimport halaman manapun.  
**Fix:** Tambahkan ke long pages: `/villa`, `/investasi`, `/villa/bijak` etc.

### D-9: Counter Animation di Hero
Homepage hero sudah ada animated counters (9jt, 10%, 58/74) via `StatsCounter.svelte`. Tapi halaman lain belum pakai.  
**Fix:** Tambahkan counter animation ke PageHero stats di halaman sekunder

### D-10: Section Numbering (Editorial Feel)
Beberapa section sudah ada nomor (01, 02, 03) di pojok kanan atas. Tapi tidak konsisten.  
**Fix:** Tambahkan section numbering ke semua major sections untuk editorial consistency

### D-11: Empty State untuk Artikel
Halaman artikel menampilkan 6 cards dengan gambar Unsplash external. Jika gambar gagal load, tidak ada fallback.  
**Fix:** Tambah `onerror` handler atau gunakan local placeholder images

### D-12: Mobile Spacing Cleanup
Beberapa halaman punya padding yang kurang konsisten di mobile:
- `py-20 md:py-32` vs `py-12 md:py-20` vs `py-8 md:py-16`
- Gap antara sections bervariasi

**Fix:** Standarisasi section padding:
- Regular section: `py-16 md:py-24`
- Compact section: `py-12 md:py-20`
- Hero section: `pt-28 pb-16 md:pt-36 md:pb-24`

---

## 📅 PHASE PLAN

### Phase 7A: Critical Bug Fixes (1-2 jam)
1. ✅ Fix `ink-soft` & `ink-mute` di `tailwind.config.mjs`
2. ✅ Fix `text-success` → `text-success-600` di passive-income
3. ✅ Fix `text-hero` clamp di `tailwind.config.mjs` (6rem → 4.5rem)
4. ✅ Ganti semua halaman ke `NavMenu.svelte` (hapus `Navbar.astro` import)
5. ✅ Hapus orphan components (7 files)

### Phase 7B: Passive Income Page Rewrite (1-2 jam)
1. ✅ Rewrite ke V5.2 design system
2. ✅ Ganti legacy classes (`heading-title` → `text-editorial-md`, `card` → `card-premium`)
3. ✅ Tambah Pattern component (minimal 2 patterns)
4. ✅ Tambah SectionDivider antara sections
5. ✅ Tambah svelte-motion animation (minimal section entrance)
6. ✅ Fix `text-success` → `text-success-600`

### Phase 7C: Consistency Pass (2-3 jam)
1. ✅ Tambah SectionDivider ke semua halaman yang belum punya (lokasi, faq, artikel)
2. ✅ Standarisasi pattern usage (ganti inline CSS pattern → Pattern component)
3. ✅ Fix UrgencyBanner unitsLeft per villa type
4. ✅ Fix container width consistency
5. ✅ Fix section background class consistency

### Phase 7D: Design Polish (2-3 jam)
1. ✅ Tambah Pattern ke flat sections (map, article, FAQ, passive income)
2. ✅ Tambah motion entrance ke halaman sekunder (minimal PageHero)
3. ✅ Tambah radial gradient backdrop ke hero sections
4. ✅ Standardize card-premium usage
5. ✅ Tambah section numbering ke major sections

### 

### Phase 7F: Build & QA (1 jam)
1. ✅ Full clean rebuild
2. ✅ Verify semua halaman render tanpa error
3. ✅ Verify `text-ink-soft` dan `text-ink-mute` visible
4. ✅ Verify semua halaman pakai NavMenu
5. ✅ Verify SectionDivider ada di semua major sections

---

## 📊 ESTIMATED EFFORT

| Phase | Estimasi | Risk | Files |
|-------|----------|------|-------|
| 7A Critical Fixes | 1-2 jam | Low | 3-5 files |
| 7B Passive Income | 1-2 jam | Low | 1 file |
| 7C Consistency | 2-3 jam | Medium | 8-10 files |
| 7D Design Polish | 2-3 jam | Medium | 6-8 files |
| 7E Conversion | 1-2 jam | Low | 2-3 files |
| 7F QA | 1 jam | Low | 0 (testing) |
| **Total** | **8-13 jam** | ~1.5-2 hari | |

---

## 📦 FILES AFFECTED

### Modified (existing)
- `app/tailwind.config.mjs` — fix ink-soft/ink-mute, fix text-hero
- `app/src/styles/global.css` — minor cleanup
- `app/src/pages/investasi/passive-income.astro` — full rewrite
- `app/src/pages/resort.astro` — NavMenu + divider
- `app/src/pages/lokasi.astro` — NavMenu + divider + pattern
- `app/src/pages/kontak.astro` — NavMenu
- `app/src/pages/faq.astro` — NavMenu + divider
- `app/src/pages/artikel.astro` — NavMenu + divider
- `app/src/pages/investasi/index.astro` — NavMenu
- `app/src/pages/investasi/skema-bank.astro` — NavMenu + divider
- `app/src/pages/investasi/skema-developer.astro` — NavMenu + divider
- `app/src/pages/syarat-dan-ketentuan.astro` — NavMenu
- `app/src/pages/kebijakan-privasi.astro` — NavMenu
- `app/src/pages/404.astro` — NavMenu
- `app/src/pages/villa/bijak.astro` — fix unitsLeft
- `app/src/pages/villa/idaman.astro` — fix unitsLeft
- `app/src/pages/villa/mapan.astro` — fix unitsLeft
- `app/src/components/astro/Footer.astro` — minor fix

### Deleted (orphan components)
- `app/src/components/astro/StatsBar.astro`
- `app/src/components/astro/Testimoni.astro`
- `app/src/components/astro/SahidPartnership.astro`
- `app/src/components/astro/PassiveIncome.astro`
- `app/src/components/astro/PillarValue.astro`
- `app/src/components/astro/FinalCTA.astro`
- `app/src/components/astro/Hero.astro`

### Verified (no change needed)
- `app/src/components/astro/Pattern.astro` — works correctly
- `app/src/components/astro/SectionDivider.astro` — works correctly
- `app/src/components/astro/PageHero.astro` — works correctly
- `app/src/components/astro/Footer.astro` — no anti-fraud bar ✅
- `app/src/components/svelte/NavMenu.svelte` — ready to use

---

## ❓ DECISIONS NEEDED

1. **NavMenu vs Navbar** — Ganti semua ke NavMenu (recommended) atau pertahankan split?
2. **Orphan components** — Hapus atau archive?
3. **WhatsAppFloating** — Tambahkan ke semua halaman atau cukup investasi pages?
4. **ScrollProgress** — Tambahkan ke semua halaman atau homepage only?
5. **StickyMobileCTA** — Tambahkan ke semua long pages atau pilih beberapa?
6. **Trust signal** — Sahid logos + bank logos di hero homepage?

---

*Plan ini menunggu approval sebelum eksekusi. Semua perubahan bersifat polish — tidak mengubah fundamental design.*
