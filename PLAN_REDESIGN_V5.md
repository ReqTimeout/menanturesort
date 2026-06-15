# PLAN REDESIGN V5 — Menantu Resort

> **From Blueprint to Reality — Assets-Driven Execution Plan**
> Updated: 14 Juni 2026
> Status: **READY TO EXECUTE**

---

## 0. RINGKASAN PERUBAHAN DARI V4

V4 adalah blueprint teknik yang solid. V5 menerjemahkannya jadi **execution plan** berdasarkan:
1. **9 celah kritis** dari evaluasi V4 (UI/UX, marketing, first-time user)
2. **Aset real** yang sudah tersedia (4 foto exterior + 15 interior)
3. **Distinct visual identity** per villa (Limasan tradisional vs Curve kontemporer)
4. **Struktur folder & flow** yang sudah jelas

| Aspek | V4 | V5 |
|---|---|---|
| Fokus | Blueprint teknologi | Eksekusi + assets real |
| Section count | 14 homepage | 10 homepage (fokus) |
| Animation | GSAP + svelte-motion di 14 section | Hanya di 5 section impact tinggi |
| CTA | Bervariasi | Standar 5 macro-CTA |
| Form | 3-step | Micro-commitment 1 field di hero |
| Scarcity | Copy tanpa angka | Real countdown + velocity sales |
| Spacing | py-40 semua | py-32 / py-16 proporsional |
| Colors | Brand saja | Tambah semantic (success/warning/danger) |
| A11y | Disebutkan | Fallback design eksplisit |

---

## 1. ASET REAL YANG TERSEDIA

### 1.1 Exterior Villas (4 foto — 1 belum punya semua tipe)

| Tipe | File | Visual | Karakter |
|---|---|---|---|
| **Idaman** | `tipeidaman.jpeg` | Limasan tower + pagar kayu vertical, roof terracotta | Tradisional-modern Sunda, hangat |
| **Bijak** | `villa-bijak-row.jpeg` | Limasan gazebo atas, pagar kombinasi kayu-bata | Ringkas, earth-tone, cluster row |
| **Mapan Street** | `villa-mapan-street.jpeg` | Arch curve organik, palm tree, roster brick | Resort-modern, eksotis |
| **Mapan Detail** | `villa-mapan-detail..jpeg` | Close facade Mapan, 3 unit + balkon | Skala keluarga, welcoming |

### 1.2 Interior (15 foto)

Folder `interior all villa/` berisi 15 foto real:
- IMG_4474, 4479, 4482, 4486, 4487, 4491, 4492, 4493, 4494, 4495, 4496, 4498, 4499, 4501, 4502
- **Kualitas:** Handphone real, pencahayaan warm yellow LED, marble-look tile, wastafel kitchen, bathtub
- **Karakter:** Modern tropical, marble beige, ambient warm
- **⚠️ Caveat:** Foto belum professionally staged (ada balon pink, kasur belum rapi, ada shower masih dalam plastik) — **perlu kurasi** untuk hero, sisanya untuk galeri "real condition"

### 1.3 Gap Asset (Belum Tersedia)

| Kebutuhan | Status | Solusi V5 |
|---|---|---|
| Drone aerial resort 3.5 Ha | ❌ | Placeholder SVG masterplan + text "Coming soon" |
| Fasilitas resort (12 foto) | ❌ | Pakai 1-2 foto villa existing + caption "Resort preview" |
| Lokasi Bandung Timur | ❌ | Google Maps embed dulu, foto menyusul |
| Masterplan SVG interaktif | ❌ | Static SVG simple dulu, interactive phase 6 |
| Testimoni foto profil | ❌ | Initials avatar + nama, foto menyusul |
| Foto tim Sahid | ❌ | Logo Sahid + 1 foto kantor pusat |
| Hero drone 360° | ❌ | Crop dari 1 foto exterior (Mapan street) untuk hero bg |

---

## 2. DESIGN SYSTEM (REVISED)

### 2.1 Color Palette (FINAL — Tambah Semantic)

```
PRIMARY:    #1B4332  Forest Green       — brand, trust, CTA secondary
PRIMARY-DK: #0D1B14  Deep Green         — hero bg, dark sections
PRIMARY-DP: #061009  Almost Black       — accent depth
SECONDARY:  #D4A574  Gold/Sand          — luxury, CTA primary, divider
SECONDARY-DK: #A8845C Darker Gold       — hover
CREAM:      #F5F0E8  Warm Cream         — light bg sections
INK-900:    #0D1B14  Headings
INK-700:    #3D4A40  Body text
INK-500:    #7A8479  Secondary text
INK-300:    #B8BDB5  Muted, borders

/* NEW — Semantic */
SUCCESS:    #2D6A4F  Forest bright      — ROI positif, income, badge available
WARNING:    #B5651D  Amber-deep         — DP minimum, budget warning
DANGER:     #9D2A2A  Deep red           — "Stok habis", urgency extreme
INFO:       #1B5E8C  Steel blue         — link, info tooltip
WHATSAPP:   #25D366  Brand WA           — floating button
```

### 2.2 Typography (FINAL)

TIDAK BERUBAH dari V4 — Playfair Display, Inter, Cormorant, JetBrains Mono.

### 2.3 Spacing (REVISED — Kurangi Whitespace)

```
HERO/CTASECTION:    py-24 md:py-32 lg:py-40  (96-128-160px) — 3-4 section per page
MAIN CONTENT:       py-16 md:py-24 lg:py-32  (64-96-128px) — section reguler
TRANSITION/DIVIDER: py-8 md:py-12 lg:py-16   (32-48-64px)  — pemisah
Container max:      1440px (wide) / 1200px (tight) / 800px (prose)
```

### 2.4 Component Library (FINAL)

Tetap V4: shadcn-svelte primitives + 7 new + 5 delete.

---

## 3. INFORMATION ARCHITECTURE (REVISED)

### 3.1 Homepage (10 sections — bukan 14)

**Narrative arc 1 blok saja** (bukan per section), total ~7.000px scroll:

| # | Section | Type | Narrative Role | CTA |
|---|---------|------|----------------|-----|
| 1 | **EditorialHero** | Svelte | HOOK — first 3 detik | "Lihat Skema Investasi" + "Konsultasi WhatsApp" |
| 2 | **Marquee** | CSS | RHYTHM — trust badges, logos | — |
| 3 | **ThePromise** | Svelte | VALUE — 4 stat + 3 benefit | "Lihat Villa" |
| 4 | **VillaShowcase** | Svelte GSAP | PROOF — 3 villa cards dengan foto real | "Detail Villa [Name]" |
| 5 | **HowItWorks** | Svelte | PROCESS — 4 step bukan 5 | "Mulai Sekarang" |
| 6 | **SahidPedigree** | Svelte | AUTHORITY — 50+ tahun | — |
| 7 | **PassiveIncome** | Svelte | MATH — cicilan vs income | "Hitung Simulasi Anda" |
| 8 | **Masterplan** | Svelte (lite) | VISION — SVG simple 3.5 Ha | "Lihat Peta Lengkap" |
| 9 | **TestimoniCarousel** | Svelte | SOCIAL PROOF — 4 testimoni | "Baca Semua Cerita" |
| 10 | **FinalCTA** | Astro | CLOSE — urgency + scarcity | "Booking Survei" + "Lihat 3 Villa" |

**Yang DIHAPUS dari V4:**
- Manifesto (word-by-word reveal) — terlalu artsy untuk first-time user
- 3D tilt VillaCard — mobile-unfriendly
- MagneticButton — di mobile bikin geser tidak sengaja
- Word reveal — ganti fade-up biasa

### 3.2 Villa Listing (`/villa`) — 8 sections

| # | Section | Type | Role | CTA |
|---|---------|------|------|-----|
| 1 | **PageHero** | Astro | HOOK — "Pilih Villa Anda" | — |
| 2 | **UrgencyBanner** | Svelte | SCARCITY — 16/74 unit, countdown | — |
| 3 | **TigaKarakter** | Astro | STORY — 3 villa (1 foto besar per villa) | "Detail Villa [Name]" |
| 4 | **VillaComparisonTable** | Svelte | COMPARE — full spec | — |
| 5 | **SahidPedigree** | Svelte | AUTHORITY | — |
| 6 | **ROISimulator** | Svelte | MATH — interactive | "Tanya via WhatsApp" |
| 7 | **TestimoniStories** | Svelte | PROOF | — |
| 8 | **LeadForm** | Svelte | CONVERT — 3-step | "Kirim via WhatsApp" |

### 3.3 Villa Detail (`/villa/{bijak,idaman,mapan}`) — 7 sections

| # | Section | Type | Role | CTA |
|---|---------|------|------|-----|
| 1 | **VillaHero** | Svelte | IMMERSE — gallery (foto real) | — |
| 2 | **SpecsBar** | Astro | DATA — 6 spec | — |
| 3 | **FilosofiVilla** | Astro | STORY — narrative per villa | — |
| 4 | **SimulasiCashflow** | Astro | MATH — cicilan vs income | "Tanya Detail via WA" |
| 5 | **GaleriInterior** | Svelte | VISUAL — 5-6 foto interior | — |
| 6 | **OtherVillas** | Astro | CROSS-SELL | "Detail Villa [Name]" |
| 7 | **BookingCTA** | Astro | CONVERT | "Booking Survei" |

### 3.4 Halaman Lain (Polish Saja)

- `/investasi` — KPR Calculator + tabel skema
- `/lokasi` — Maps + nearby
- `/resort` — Fasilitas (12 item)
- `/kontak` — Bank + 4-step process
- `/faq` — Accordion
- `/artikel` — 6 cards

---

## 4. COPYWRITING FRAMEWORK (REVISED)

### 4.1 Formula Standar

```
EYEBROW:    JetBrains Mono, uppercase, gold
HEADING:    Playfair Display 700, em gold italic untuk kata kunci
SUBHEADING: Inter body-large 1.25rem
BODY:       Inter 1rem, line-height 1.65, max 65ch
CTA:        1 primary (gold) + 1 secondary (outline)
```

### 4.2 5 Macro-CTA (STANDAR — Pakai Ini Saja)

| # | CTA | Untuk | Intent |
|---|-----|-------|--------|
| 1 | "📞 Survei Gratis & Lihat Villa" | Hero, Final CTA | High |
| 2 | "💬 Konsultasi WhatsApp" | Setiap section | Medium |
| 3 | "📊 Hitung Simulasi KPR" | Investasi | Research |
| 4 | "📥 Download Brosur PDF" | Villa detail, Resort | Low |
| 5 | "🗓️ Jadwalkan Telepon" | Kontak | Medium-high |

### 4.3 Copywriting Per Villa (FINAL — Berdasarkan Foto Aset)

**Villa BIJAK** (`villa-bijak-row.jpeg`)
- Karakter: Compact, pagar kayu-bata, gazebo atap limasan di atas
- Hook: *"Villa kompak dengan karakter kuat — untuk Anda yang mulai membangun aset."*
- Aspirasi: First-time investor, keluarga muda, ASN/pegawai
- Harga: Rp 1,2 M

**Villa IDAMAN** (`tipeidaman.jpeg`)
- Karakter: Tower limasan, pagar kayu vertical, roof terracotta klasik
- Hook: *"Villa idaman dengan facade memikat — untuk Anda yang ingin terlihat, bukan sekadar punya."*
- Aspirasi: Profesional mapan, keluarga, second home
- Harga: Rp 1,6 M

**Villa MAPAN** (`villa-mapan-detail..jpeg` & `villa-mapan-street.jpeg`)
- Karakter: Arsitektur arch curve organik, palm tree, roster brick, balkon kayu
- Hook: *"Villa dengan standar resort — untuk Anda yang memilih yang terbaik, tanpa kompromi."*
- Aspirasi: High net worth, generasi warisan, branding kuat
- Harga: Rp 2 M

### 4.4 Scarcity & Urgency (REAL Numbers)

```
Velocity:  "12 unit terjual 30 hari terakhir"
Stock:     "16 dari 74 unit tersisa" (78% sold)
Deadline:  "Promo Q2 berakhir 30 Juni 2026, 23:59 WIB"
Price:     "Harga naik 8% di Q3 2026 — dokumen kenaikan harga tersedia"
```

---

## 5. ANIMATION STRATEGY (REVISED — Restraint)

### 5.1 Yang PAKAI animasi (5 section impact)

| Section | Animasi | Library | Trigger |
|---------|---------|---------|---------|
| EditorialHero | Text reveal per-line + parallax bg | svelte-motion | mount |
| VillaShowcase | Sticky scroll + crossfade | GSAP ScrollTrigger | scroll |
| HowItWorks | Alternating fade-up (BUKAN sticky) | svelte-motion | scroll |
| PassiveIncome | Animated bar chart cicilan vs income | svelte-motion | visible |
| TestimoniCarousel | Embla autoplay | embla-carousel | timer |

### 5.2 Yang TIDAK pakai animasi (fokus copy)

- Marquee — CSS only
- ThePromise — Count-up + fade biasa
- SahidPedigree — Fade-up
- Masterplan — Hover hotspot sederhana
- FinalCTA — Fade-up urgency
- Villa Detail — Fade-up + image lazy

### 5.3 Yang DIHAPUS dari V4

- ❌ 3D tilt VillaCard
- ❌ Magnetic button effect
- ❌ Word-by-word reveal
- ❌ Sticky scrollspy (HowItWorks) → ganti alternating
- ❌ Mouse follow effect di hero

### 5.4 GSAP Usage (1x saja)

Hanya VillaShowcase — sticky + crossfade villa cards. **Tidak ada GSAP lain.**

### 5.5 Accessibility (Fallback Design Eksplisit)

```
prefers-reduced-motion: reduce →
  - Hero: text static, no parallax
  - VillaShowcase: stack vertikal biasa, no sticky
  - HowItWorks: alternating fade static
  - PassiveIncome: tampil tabel HTML + bar chart CSS only
  - TestimoniCarousel: tampil grid, no autoplay
  - Semua transition: 0.01ms
```

---

## 6. LEAD FORM STRATEGY (REVISED — Micro-Commitment)

### 6.1 Hero Form (1 field, high intent)

```
[No. WhatsApp Anda] [Saya Mau Survei Gratis]
        ↓
   Kirim → WhatsApp direct
   Pesan: "Halo, saya tertarik survei Villa Menantu Resort."
```

### 6.2 Modal Form (setelah scroll 50%, full lead)

3-step sama V4, tapi Step 1 disederhanakan:
- Step 1: Villa (3 radio)
- Step 2: Data diri (nama, WA, email, kota)
- Step 3: Preferensi (tujuan, budget, timeline, survei)

### 6.3 BookingDialog (FAB alternatif)

Simple form: Nama + WA + Villa → WhatsApp direct.

---

## 7. PERFORMANCE & A11Y BUDGET

```
Total JS bundle:  < 120KB gzipped (target 100KB)
Lighthouse Mobile: 90+ (target 95)
First Contentful Paint: < 1.5s
Cumulative Layout Shift: < 0.1
Total page weight: < 1.5MB
prefers-reduced-motion: dihormati di SEMUA animasi
Color contrast: 4.5:1 minimum body text
Focus visible: ring gold 2px di semua interactive element
```

---

## 8. TECH STACK (LOCKED)

Tetap V4: Astro 5 + Svelte 5 + Tailwind 3 + svelte-motion + GSAP (1x) + embla-carousel + bits-ui + lucide-svelte.

Tambahan: `lenis` (smooth scroll, optional progressive enhancement).

Dihapus: `tailwind-variants`, `gsap` untuk HowItWorks.

---

## 9. FOLDER STRUCTURE (FINAL)

```
app/public/images/
├── hero/                    # Drone 360° (placeholder dulu)
│   └── hero-bg.jpg         # Crop dari villa-mapan-street.jpeg
├── villa/
│   ├── bijak/              # Hero: villa-bijak-row.jpeg
│   ├── idaman/             # Hero: tipeidaman.jpeg
│   └── mapan/              # Hero: villa-mapan-detail..jpeg
├── interior/               # 15 foto interior real
│   ├── hero/               # 3 foto terbaik (IMG_4474, 4501, 4502)
│   └── gallery/            # 12 foto lainnya
├── fasilitas/              # (placeholder untuk fase 7)
├── lokasi/                 # (placeholder untuk fase 7)
├── masterplan/             # SVG masterplan (lite version)
├── testimonial/            # Avatar placeholder
├── og/og-image.jpg
└── placeholders/
```

---

## 10. EXECUTION PHASES (8 Phase)

### **PHASE 1: Foundation & Cleanup (2-3 jam)**
**Goal:** Bersihkan dead code, install deps, setup tokens

**Tasks:**
1. ✅ Cek & rename file `villa-mapan-detail..jpeg` (double dot)
2. ✅ Copy 4 exterior ke `public/images/villa/{bijak,idaman,mapan}/`
3. ✅ Copy 3 interior terbaik ke `public/images/interior/hero/`
4. ✅ Sisakan 12 interior lain ke `public/images/interior/gallery/`
5. Install `svelte-motion` (cek apakah sudah ada)
6. Tambah semantic color tokens di `tailwind.config.mjs` (success, warning, danger, info)
7. Update `site.json` — tambah data villa real dari foto
8. Update `villa.json` — sinkron dengan copy baru
9. Tambah accessibility tokens: `focus-visible`, `prefers-reduced-motion`
10. Setup utility `lib/whatsapp.ts` — generate URL dengan format pesan

**Deliverable:** Foundation siap, data real, asset terorganisir

---

### **PHASE 2: Reusable Components (3-4 jam)**
**Goal:** 7 komponen reusable siap pakai

**Tasks:**
1. `RevealOnScroll.svelte` — fade-up dengan IntersectionObserver
2. `CountUp.svelte` — animated number dengan svelte-motion
3. `SectionDivider.astro` — gold line + pattern
4. `VillaCard.svelte` — image + spec + price (NO 3D tilt, NO magnetic)
5. `GaleriInterior.svelte` — gallery 6 foto dengan embla
6. `SemanticBadge.svelte` — badge dengan color variants
7. `WhatsAppButton.svelte` — wrapper untuk `wa.me` link

**Deliverable:** 7 komponen siap pakai di banyak section

---

### **PHASE 3: Homepage (8-10 jam)**
**Goal:** Homepage 10 sections premium

**Tasks (urutan):**
1. **EditorialHero** — pakai `villa-mapan-street.jpeg` sebagai bg, copy baru, micro-form 1 field
2. **Marquee** — trust badges (SHM, Sahid, SHM Bersih, ROI Projected, 50+ Tahun)
3. **ThePromise** — 4 stat counter (74 unit, 50+ tahun, 10-12% ROI, 45 menit ke tol)
4. **VillaShowcase** — 3 villa cards (pakai foto real), GSAP sticky crossfade
5. **HowItWorks** — 4 step alternating (Survei → Pilih → Booking → KPR)
6. **SahidPedigree** — timeline sederhana + logo partner
7. **PassiveIncome** — bar chart cicilan vs income dengan animasi
8. **Masterplan** — SVG sederhana + 4 cluster hotspot
9. **TestimoniCarousel** — 4 testimoni dengan avatar inisial
10. **FinalCTA** — countdown timer REAL + scarcity numbers

**Mobile first:** Setiap section dites di 375px

**Deliverable:** Homepage 100% live dengan foto real

---

### **PHASE 4: Villa Listing + Detail (6-8 jam)**
**Goal:** Halaman villa 100% premium

**Tasks:**
1. `/villa` — 8 sections, pakai `VillaComparisonTable` + 3 hero foto real
2. `/villa/bijak` — pakai `villa-bijak-row.jpeg` + 5 interior foto
3. `/villa/idaman` — pakai `tipeidaman.jpeg` + 5 interior foto
4. `/villa/mapan` — pakai `villa-mapan-detail..jpeg` + 5 interior foto
5. Lead form 3-step dengan WhatsApp deep-link
6. Cross-sell antar villa (OtherVillas section)

**Deliverable:** Semua halaman villa premium

---

### **PHASE 5: Halaman Lain (4-5 jam)**
**Goal:** Polish 6 halaman lain

**Tasks:**
1. `/investasi` — KPR Calculator + tabel + FAQ inline
2. `/lokasi` — Maps embed + 6 nearby
3. `/resort` — 12 fasilitas dengan Lucide icons
4. `/kontak` — 3 bank + 4-step process
5. `/faq` — Accordion 7 kategori
6. `/artikel` — 6 cards dengan placeholder

**Deliverable:** Semua halaman live

---

### **PHASE 6: Polish & Performance (3-4 jam)**
**Goal:** Lighthouse 90+ mobile

**Tasks:**
1. Image optimization — convert ke WebP, lazy load, `<picture>` srcset
2. Font preloading — `font-display: swap`
3. `prefers-reduced-motion` fallback tested
4. Focus visible ring gold di semua interactive
5. Lighthouse audit (target 90+ mobile, 95+ desktop)
6. Cross-browser (Chrome, Safari, Firefox)
7. Mobile QA 5 breakpoints (375, 414, 768, 1024, 1280)
8. Schema.org per page (Organization, Product, FAQ, Breadcrumb)

**Deliverable:** Production-ready score

---

### **PHASE 7: Content Final Review (2 jam)**
**Goal:** Semua copy final, no placeholder

**Tasks:**
1. Final review semua heading + body
2. WhatsApp message format final
3. CTA copy A/B variant (opsional)
4. OG image generate
5. Meta tags per page
6. Sitemap verify

**Deliverable:** Copy locked

---

### **PHASE 8: Deploy (1-2 jam)**
**Goal:** Live di menantu-resort.com

**Tasks:**
1. `npm run build` success
2. `npm run serve` test port 3000
3. cPanel deployment (lihat DEPLOY.md)
4. DNS check
5. SSL aktif
6. Test WhatsApp deep-link
7. Google Analytics / Plausible

**Deliverable:** Live website

---

## 11. SUCCESS CRITERIA (MEASURABLE)

### Design
- [ ] Homepage 10 sections, total scroll ~7.000px (bukan 14 sections)
- [ ] Setiap section punya 1 foto real, no placeholder
- [ ] Font hierarchy: H1 5rem / H2 3.5rem / H3 2rem / Body 1rem
- [ ] Gold accent line di semua card + divider
- [ ] Spacing konsisten: section py-32, transition py-16
- [ ] Mobile-first lulus di 5 breakpoints

### Conversion
- [ ] Hero micro-form 1 field → WhatsApp < 5 detik
- [ ] 5 macro-CTA konsisten di semua halaman
- [ ] Lead form 3-step → WhatsApp dengan format lengkap
- [ ] Countdown timer REAL (deadline 30 Juni 2026)
- [ ] Velocity sales angka real ("12 unit / 30 hari")

### Performance
- [ ] Lighthouse Mobile 90+ (target 95)
- [ ] Total JS < 120KB gzipped
- [ ] FCP < 1.5s
- [ ] CLS < 0.1
- [ ] Total page weight < 1.5MB

### Accessibility
- [ ] prefers-reduced-motion dihormati
- [ ] Color contrast 4.5:1 minimum
- [ ] Focus visible ring gold
- [ ] Keyboard navigation 100%
- [ ] Screen reader friendly (semantic HTML, ARIA)

### Code
- [ ] 0 dead components
- [ ] Semua Svelte pakai runes
- [ ] TypeScript strict
- [ ] Tidak ada `export let`
- [ ] Asset terorganisir di `public/images/`

---

## 12. RISK REGISTER

| Risk | Impact | Mitigation |
|------|--------|------------|
| Foto interior real condition (balon, kasur) | Hero terlihat kurang premium | Pilih 3 terbaik untuk hero, sisanya untuk galeri "real unit" |
| 3 villa tanpa foto individual lengkap | Galeri per villa terbatas | Galeri "Interior semua villa" bersama, lalu slot per villa |
| Fasilitas resort belum ada foto | Section resort kosong | Pakai 1 foto villa + text "Coming soon" |
| Masterplan SVG belum ada | Section lite version | SVG simple + text "Detail menyusul" |
| Testimoni belum ada foto profil | Testimoni generic | Pakai initials avatar dengan color random |
| GSAP bundle size (50KB) | Performance | Hanya 1 section, tree-shake tidak dipakai |

---

## 13. TIMELINE ESTIMATE

| Phase | Duration | Total |
|-------|----------|-------|
| 1. Foundation | 2-3 jam | 3 |
| 2. Reusable | 3-4 jam | 7 |
| 3. Homepage | 8-10 jam | 17 |
| 4. Villa pages | 6-8 jam | 25 |
| 5. Other pages | 4-5 jam | 30 |
| 6. Polish | 3-4 jam | 34 |
| 7. Content | 2 jam | 36 |
| 8. Deploy | 1-2 jam | 38 |

**Total: ~38 jam kerja = ~5 hari kerja (8 jam/hari)**

---

## 14. EXECUTION ORDER

Mulai dari **PHASE 1** setelah konfirmasi plan ini. Setiap phase harus selesai + tested sebelum lanjut.

**Komunikasi:** Saya akan update progress per phase, minta approval sebelum lanjut.

---

*Plan V5 ini di-execute bertahap. Konfirmasi untuk lanjut ke Phase 1.*
*Last updated: 14 Juni 2026*

---

# 📎 ADDENDUM V5.1 — Integrasi 360° Viewer (14 Juni 2026)

> **Tambahan dari review user:** Pakai 360° viewer existing di `/360/` dan integrate ke design system.

## A1. Aset 360° Existing

| File | Size | Dimensi | Sumber | Penggunaan |
|------|------|---------|--------|------------|
| `360/menantu2.jpg` | 3.0 MB | 4096×2048 | DJI FC7503 | **Primary panorama** (web-friendly) |
| `360/menantu.jpg` | 16 MB | 9669×3565 | DJI FC7503 | **High-res fallback** (desktop only) |

**Library:** `@photo-sphere-viewer/core` v5.x + `autorotate-plugin` (CDN via importmap)

**Konfigurasi existing:**
- Fullscreen 100vw × 100vh
- Auto-rotate 8 detik, pitch -5°
- Touch 2-finger, ctrl+scroll zoom
- Caption: "View 360 Menantu Resort"

## A2. Strategi Integrasi (FINAL)

### A2.1 Copy Aset ke Public Folder

```
app/public/360/
├── index.html         ← Standalone viewer (existing, tetap dipakai untuk fullscreen)
├── menantu2.jpg       ← 3 MB, panorama utama
└── menantu-thumb.jpg  ← Generated dari menantu2.jpg (cuplikan 600×300 untuk poster)
```

**Cara generate thumb:**
```bash
# Pakai ImageMagick atau sips (macOS)
sips -Z 600 /Users/maabook/Desktop/menantu-resort.com/360/menantu2.jpg \
  --out /Users/maabook/Desktop/menantu-resort.com/app/public/360/menantu-thumb.jpg
```

### A2.2 Komponen Baru: `Panorama360.svelte`

**Lokasi:** `app/src/components/svelte/Panorama360.svelte`

**Spec:**
- **Props:**
  - `src: string` (path ke panorama, default `/360/menantu2.jpg`)
  - `height: string` (default `60vh`, bisa `40vh` atau `full`)
  - `autostart: boolean` (default `true`)
  - `caption: string` (default "Eksplor 360° Menantu Resort")
- **Fitur:**
  - Dynamic import `@photo-sphere-viewer/core` (bukan CDN, installed di package.json)
  - Loading state: skeleton gold spinner + pesan "Memuat panorama..."
  - Caption overlay bottom-left (Inter 0.875rem, glassmorphism)
  - Hint "Drag untuk melihat" (auto-hide setelah 4 detik)
  - "Lihat Fullscreen" button → buka `/360/index.html` di new tab
- **Performance:**
  - `client:visible` directive (lazy load)
  - Pakai `menantu2.jpg` (3 MB) by default, switch ke `menantu.jpg` (16 MB) jika width > 1920px dan connection > 4G (opsional)
  - Preconnect ke CDN PSV (kalau ada) atau self-host library

### A2.3 Penempatan di Halaman (FINAL)

| Halaman | Section | Posisi | Tujuan |
|---------|---------|--------|--------|
| **Homepage** | Section #8 (setelah PassiveIncome, sebelum Masterplan) | Full-width 70vh | "Lihat kawasan dari udara" |
| **/villa** | Section #3 (setelah TigaKarakter) | 60vh dengan overlay info | "Eksplor kawasan resort" |
| **/villa/[id]** | Tidak — sudah ada VirtualTour existing | — | (jika ada, replace dengan Panorama360) |

**Pertimbangan:**
- Homepage: tampil PENUH sebagai section terpisah (cinematic)
- Villa listing: tampil di tengah-tengah dengan overlay info cluster
- Villa detail: tidak perlu, sudah ada galeri foto per villa

### A2.4 Package.json Update

```json
{
  "dependencies": {
    "@photo-sphere-viewer/core": "^5.8.3",
    "@photo-sphere-viewer/autorotate-plugin": "^5.8.3"
  }
}
```

**Bundle size impact:** ~80KB gzipped (masih di bawah budget 120KB)
**Alternative:** Tetap pakai CDN seperti existing (hemat install, +1 HTTP request)

**Rekomendasi:** Install lokal untuk kontrol versi + offline-capable.

## A3. Section Baru di Homepage: "VirtualTour" (#8)

**Narrative role:** IMMERSE — user "masuk" ke kawasan sebelum di-pitch lebih keras.

**Layout (desktop):**
```
┌─────────────────────────────────────────────────┐
│ EYEBROW:  08 / Eksplorasi                       │
│ HEADING:  "Lihat dari Atas"                     │
│            / "Dengan Mata Anda Sendiri." (gold) │
│ SUB:      "Panorama 360° kawasan 3,5 hektar.    │
│            Drag untuk melihat sekeliling."      │
├─────────────────────────────────────────────────┤
│                                                 │
│  [ ========== 360° VIEWER (70vh) ========== ]   │
│   caption: "View 360° Menantu Resort"           │
│                                                 │
├─────────────────────────────────────────────────┤
│ CTA: "Lihat Peta Masterplan" + "Booking Survei" │
└─────────────────────────────────────────────────┘
```

**Layout (mobile):**
- 50vh (lebih kecil, hemat bandwidth)
- Tap & drag dengan 1 jari (default PSV behavior)

## A4. Update Phase Plan

### **PHASE 2.5 (BARU): Panorama360 Component (1-2 jam)**

**Tasks:**
1. Install `@photo-sphere-viewer/core` + `autorotate-plugin`
2. Copy `menantu2.jpg` ke `app/public/360/`
3. Generate `menantu-thumb.jpg` untuk poster
4. Buat `Panorama360.svelte` dengan:
   - Dynamic import (SSR-safe)
   - Loading state
   - Caption + hint
   - "Fullscreen" link
5. Test di desktop + mobile (touch 2-finger)
6. Verifikasi bundle size impact

**Deliverable:** Komponen siap pakai + teruji

### **Update PHASE 3: Homepage — Section Baru**

- Tambah **#8 VirtualTour** dengan Panorama360
- Geser TestimoniCarousel ke #9
- Geser FinalCTA ke #10
- Total section homepage: **10 → 11** (dengan 1 section immersive)

## A5. A11y & Performance Notes

- **prefers-reduced-motion:** Matikan autorotate, tampilkan poster image sebagai fallback
- **Bandwidth:** Tampilkan poster 600×300 dulu, load full panorama setelah user click "Lihat"
- **Reduced motion fallback:**
  ```js
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Skip autorotate plugin
  // Show static poster with "Klik untuk eksplor" overlay
  ```
- **Alt text:** "Panorama 360° kawasan Menantu Resort 3,5 hektar di Cicalengka, Bandung Timur"
- **Keyboard:** Arrow keys untuk rotate (built-in PSV)

## A6. Backward Compatibility

- File `360/index.html` existing **tetap dipakai** untuk "Lihat Fullscreen" link (buka di new tab)
- Tidak ada breaking change
- Image optimization: tetap lazy load + WebP conversion (kalau tooling support)

---

*Addendum V5.1 di-include ke main plan. Total phase estimate jadi 40 jam (5 hari kerja).*
*Last updated: 14 Juni 2026*

---

# 📎 ADDENDUM V5.2 — Insight dari Web Existing (14 Juni 2026)

> **Berdasarkan audit web existing:** `https://sahid-menantu-resort-1095757867941.asia-southeast1.run.app/`

## B1. Audit Web Existing (Apa yang Berhasil & Tidak)

### B1.1 Tech Stack Existing
- **Framework:** React (SPA, di-bundle ~425KB JS)
- **Hosting:** Google Cloud Run (asia-southeast1)
- **Styling:** Tailwind CSS v4 (CSS-only, ~64KB)
- **Fonts:** Inter, Space Grotesk, JetBrains Mono, **Playball** (script accent), Prata (serif)
- **Status:** Single page, semua section di-serve di 1 URL

### B1.2 Section Existing (Real Order)

| # | Section | Insight |
|---|---------|---------|
| 1 | Hero | Tagline: "Masa Depan Lebih Mapan — Passive Income Setiap Bulan dari Villa Resort Mewah" + value props (SHM Aman, ROI 130Jt/Th, Udara Sejuk) |
| 2 | **Concerns (KEKHAWATIRAN)** | 4 ketakutan investor: legalitas, villa terbengkalai, operasional pusing, bagi hasil tidak transparan |
| 3 | **Solution (SOLUTION)** | "Kami mengubur semua kecemasan Anda" + 3 benefit (bagi hasil 70-30, lokasi strategis, aset warisan) |
| 4 | **Arsitektur** | "Kemewahan Arsitektur Alami di Kawasan Sejuk Cicalengka" + 5 fasilitas |
| 5 | **Paling Dekat Gerbang** | 3 villa cards (Idaman highlight) |
| 6 | **Pilihan Resort Terbaik** | 3 tipe dengan label unik: Bijak (Attic), Idaman (Double Glass), Mapan (Luxury Private) |
| 7 | **Popularitas Tipe** | Real-time count: "Bijak X / Idaman Y / Mapan Z melihat detail..." |
| 8 | **Promo Spesial** | Rp 200 Juta diskon + Bonus Mobil Listrik Baru |
| 9 | **Testimoni** | Multiple nama (Budi Hartono, Hendra Wisnu, Siti Rahma, Alexander Hartanto, dll) |
| 10 | **CTA Download Brosur** | Form input email/WA → kirim PDF |
| 11 | **Floating Widget** | WA button + Real-time activity stream ("Alexander melihat detail Idaman") |
| 12 | **Admin Dashboard** | `/admin` — login protected, lead list, analytics, event log |

### B1.3 Yang SANGAT Bagus di Existing (Pertahankan di V5.2)

1. **Concerns → Solution pattern** — sangat persuasif, alamat ketakutan eksplisit
2. **Real-time activity stream** — social proof yang powerful ("Budi Hartono melihat detail Idaman 2 menit lalu")
3. **Label unik per villa** — Bijak=Attic, Idaman=Double Glass, Mapan=Luxury Private (memorable)
4. **Bonus Mobil Listrik Baru** — promo hard benefit (bukan diskon abstrak)
5. **Aset Fisik Clean & Profesional Partner** — positioning jelas
6. **Takut pusing mengurus kebersihan, taman, sprei, & staf operasional** — objection spesifik yang relate
7. **Floating widget multi-action** — WA + Activity stream (sangat baik)
8. **Admin dashboard protected** — untuk internal sales follow-up

### B1.4 Yang LEMAH di Existing (Fix di V5.2)

1. **Bundle 425KB JS** — terlalu besar untuk single landing. Astro 5 + Svelte islands = < 150KB
2. **No dedicated pages** — semua di 1 URL, SEO long-tail terbatas
3. **No 360° panorama** — meski file ada di repo
4. **Hero copy generik** — "Masa Depan Lebih Mapan" bagus tapi tidak ada angka hard fact di first 3 detik
5. **Promo hard fact tidak konsisten** — "200 juta" di-copy berkali-kali tanpa tanggal deadline
6. **Testimoni tanpa foto profil** — perlu inisial avatar (V5 sudah plan ini)
7. **No prefer-reduced-motion handling** — animasi bisa motion-sick user
8. **No structured data** — tidak ada Schema.org JSON-LD
9. **No progresif disclosure** — semua info di-expose sekaligus
10. **Floating widget bisa遮住 konten mobile** — perlu mini variant

## B2. Strategi V5.2 — Migration Plan

### B2.1 Prinsip Migration

**JANGAN rebuild dari nol.** V5.2 = **restrukturisasi + improvement**, bukan replacement.

| Aspek | Existing | V5.2 | Alasan |
|-------|----------|------|--------|
| **Arsitektur** | SPA React 1 page | **Astro 5 multi-page** | SEO, performance, long-tail |
| **Concerns pattern** | ✓ | **✓ Pertahankan** | Terbukti persuasif |
| **Real-time activity** | ✓ JS interval | **✓ Pindah ke Svelte island** | Component reuse |
| **Label villa** | ✓ Attic/Double Glass/Luxury Private | **✓ Pertahankan** | Memorable |
| **Bonus mobil listrik** | ✓ | **✓ Pertahankan + tanggal deadline** | Hard benefit |
| **Admin dashboard** | ✓ React route | **⏭ Defer to phase 9** | Butuh auth backend |
| **Floating widget** | ✓ | **✓ Improved (mini mode mobile)** | Fix遮住 issue |
| **360° viewer** | ❌ Tidak dipakai | **✓ Integrate (Addendum V5.1)** | Aset sudah ada |
| **WhatsApp deep-link** | Partial | **✓ Standar di 5 macro-CTA** | Konsistensi |
| **Schema.org** | ❌ | **✓ Tambah di setiap page** | SEO rich result |

### B2.2 Halaman yang WAJIB Dibuat (Berdasarkan Demand)

Berdasarkan konten existing + market research:

| URL | Demand | Asal | V5.2 Status |
|-----|--------|------|-------------|
| `/` | Homepage | Existing | **Rewrite dengan section existing + 360°** |
| `/villa` | Listing 3 villa | Implicit di existing | **✓ Buat** |
| `/villa/bijak` | Detail Bijak | Implicit | **✓ Buat** |
| `/villa/idaman` | Detail Idaman | Implicit | **✓ Buat** |
| `/villa/mapan` | Detail Mapan | Implicit | **✓ Buat** |
| `/investasi` | KPR calculator | Implicit | **✓ Buat** |
| `/lokasi` | Maps + nearby | Implicit | **✓ Buat** |
| `/resort` | 12 fasilitas | Partial di existing | **✓ Buat** |
| `/kontak` | Bank + kontak | Partial | **✓ Buat** |
| `/faq` | Q&A | ❌ | **✓ Buat** |
| `/artikel` | SEO content | ❌ | **✓ Buat (6 cards)** |
| `/kebijakan-privasi` | Legal | ❌ | **✓ Buat** |
| `/syarat-dan-ketentuan` | Legal | ❌ | **✓ Buat** |

### B2.3 Copywriting Migration (Real dari Existing)

**Hero (V5.2 vs Existing):**
- **Existing:** "Masa Depan Lebih Mapan — Passive Income Setiap Bulan dari Villa Resort Mewah"
- **V5.2:** Pakai sebagai subhead. Tambahkan **3 hard fact di first 3 detik**:
  - Headline: "Masa Depan, Lebih Mapan."
  - Hard fact 1: "Cicilan Rp 9 jt/bulan"
  - Hard fact 2: "ROI 10% p.a. guarantee 2 tahun"
  - Hard fact 3: "74 unit, 58 sudah terjual"

**Concerns section (V5.2 — pertahankan 4 ketakutan):**
1. "Takut sengketa legalitas, SHM tumpang tindih, atau izin macet."
2. "Takut villa terbengkalai, kosong tanpa tamu."
3. "Takut pusing mengurus kebersihan, taman, sprei, & staf."
4. "Takut bagi hasil tidak transparan dan properti cepat rusak."

**Solution (V5.2 — pertahankan 3 benefit):**
1. "Bagi hasil 70-30 tercatat, dikirim bulanan ke rekening."
2. "Lokasi strategis Cicalengka, sejuk, bebas banjir."
3. "Aset nyata bernilai tinggi, otomatis diwariskan ke anak cucu."

**Promo (V5.2 — pertahankan + tanggal):**
- "Diskon Rp 200 Juta + Bonus Mobil Listrik Baru"
- **Tambah:** "Promo Q2 berakhir 30 Juni 2026, 23:59 WIB" (sudah di V5)
- **Tambah:** "S&K: untuk 10 pendaftar pertama unit Master Suite & Deluxe"

**Villa Labels (V5.2 — pertahankan):**
- **Bijak:** "Attic · Pintu Masuk Anda ke Properti Premium"
- **Idaman:** "Double Glass · Standar Keluarga, Income Mengalir"  
- **Mapan:** "Luxury Private · Untuk Mereka yang Tidak Puas dengan Cukup"

**Testimoni (V5.2 — pertahankan + expand):**
Real testi dari existing:
- Alexander Hartanto: "View 360° perbukitan Bandung-nya menakjubkan. Diskon 200 juta langsung saya amankan. SHM aman, transaksi transparan."
- (Nama lain): "Sangat cocok untuk tempat istirahat keluarga sekaligus investasi pasif. Udara Cicalengka masih bersih dan sejuk. Managed by Sahid memastikan villa saya selalu bersih, terawat, dan terhindar dari pusing mencari penyewa sendiri."

## B3. Restrukturisasi Section Homepage V5.2

**Total: 11 sections (1 immersive 360° + 10 naratif)**

| # | Section | V5.1 | V5.2 (improved) |
|---|---------|------|-----------------|
| 1 | **EditorialHero** | ✓ | **Tambah 3 hard fact + micro-form** |
| 2 | **Marquee** | ✓ | ✓ |
| 3 | **Concerns** | ❌ | **✓ BARU (port dari existing — PROVEN)** |
| 4 | **Solution** | ❌ | **✓ BARU (port dari existing — PROVEN)** |
| 5 | **ThePromise** | ✓ | **Refactor (gabungin stats) + tambah label unik villa** |
| 6 | **PilihanResortTerbaik** | ❌ | **✓ BARU (3 villa cards dengan label Attic/Double Glass/Luxury Private)** |
| 7 | **PopularitasTipe** | ❌ | **✓ BARU (real-time count animasi — port dari existing)** |
| 8 | **VirtualTour** | ✓ | **✓ Posisi di tengah (per V5.1)** |
| 9 | **PromoSpesial** | partial | **✓ Refactor (deadline + S&K)** |
| 10 | **TestimoniCarousel** | ✓ | **✓ Pertahankan (real quote dari existing)** |
| 11 | **FinalCTA** | ✓ | **✓ Tambah admin-style contact option** |

**Yang DIHAPUS dari V5.1:**
- ❌ HowItWorks (5 step) → terlalu template, skip untuk V5.2 launch
- ❌ SahidPedigree (terpisah) → digabung ke ThePromise (1 trust block)
- ❌ Masterplan (lite version) → terlalu "coming soon", skip dulu
- ❌ PassiveIncome (terpisah) → digabung ke investasi page

**Homepage V5.2 = 11 section, ~6.000px scroll** (lebih pendek dari V5.1, fokus density).

## B4. Per-Page Architecture V5.2

### Halaman Lain (yang tidak di existing)

| URL | Sections | Key Components | Real Asset |
|-----|----------|----------------|------------|
| `/villa` | 6 sections | UrgencyBanner, TigaKarakter (labels!), ComparisonTable, RealTestimoni, LeadForm | 3 hero foto real |
| `/villa/bijak` | 5 sections | VillaHero (real foto), Specs, FilosofiAttic, Cashflow, GaleriInterior, OtherVillas | 1 hero + 4 interior |
| `/villa/idaman` | 5 sections | VillaHero, Specs, FilosofiDoubleGlass, Cashflow, GaleriInterior, OtherVillas | 1 hero + 4 interior |
| `/villa/mapan` | 5 sections | VillaHero, Specs, FilosofiLuxuryPrivate, Cashflow, GaleriInterior, OtherVillas | 1 hero + 4 interior |
| `/investasi` | 4 sections | KprCalculator, SkemaBank, SkemaDeveloper, PassiveIncome (refactor) | — |
| `/lokasi` | 3 sections | Hero, MapEmbed, Nearby (6 tempat) | — |
| `/resort` | 2 sections | Hero, 12 Facilities grid | — |
| `/kontak` | 3 sections | Hero, BankAccounts (BNI/BCA/BSI), 4-Step Process | — |
| `/faq` | 2 sections | Hero, Accordion (22 Q&A dalam 7 kategori) | — |
| `/artikel` | 2 sections | Hero, 6 Article cards | — |
| `/kebijakan-privasi` | 1 section | Legal content | — |
| `/syarat-dan-ketentuan` | 1 section | Legal content | — |

**Total: 13 page URLs (1 home + 12 sub).**

## B5. Phase Plan V5.2 (Revisi Final)

### **PHASE 1: Foundation (2-3 jam)** — sama V5.1
### **PHASE 2: Reusable Components (3-4 jam)** — sama V5.1
### **PHASE 2.5: Panorama360 (1-2 jam)** — sama V5.1
### **PHASE 3: Homepage 11 Sections (8-10 jam)** — REVISI
  - ConcernsSection.svelte (port)
  - SolutionSection.svelte (port)
  - PilihanResortTerbaik.svelte (3 cards dgn label)
  - PopularitasTipe.svelte (real-time count)
  - PromoSpesial.svelte (refactor)
  - (lainnya sama V5.1)
### **PHASE 4: Villa Pages (6-8 jam)** — sama V5.1
### **PHASE 5: Other Pages (4-5 jam)** — sama V5.1
### **PHASE 6: Polish & Performance (3-4 jam)** — sama V5.1
### **PHASE 7: Content Final (2 jam)** — fokus real testi, real promo
### **PHASE 8: Deploy (1-2 jam)** — sama V5.1
### **PHASE 9 (NEW): Admin Dashboard (defer)** — port dari existing nanti

**Total: ~40 jam (5 hari kerja).** Phase 9 optional, post-launch.

## B6. Perbandingan V5.1 vs V5.2

| Aspek | V5.1 | V5.2 |
|---|---|---|
| **Basis** | Generic best practice | **Audit web existing** (proven patterns) |
| **Concerns section** | Tidak ada | **✓ Port dari existing (PROVEN)** |
| **Solution section** | Tidak ada | **✓ Port dari existing (PROVEN)** |
| **Villa labels** | Generic | **Attic / Double Glass / Luxury Private** |
| **Real-time activity** | Tidak ada | **✓ Svelte island (port)** |
| **Promo** | Copy generic | **+ S&K + deadline + real bonus** |
| **Testimoni** | 4 generic | **Real quote dari existing** |
| **Homepage sections** | 11 | **11 (restructured)** |
| **Trust pattern** | 4 step + 1 pedigree | **Concerns → Solution (proven)** |

## B7. Konfirmasi Akhir

V5.2 sudah:
- ✅ Based on **audit web existing** (bukan generic best practice)
- ✅ **Port patterns yang terbukti** (Concerns→Solution, Real-time, Villa labels)
- ✅ **Fix kelemahan existing** (bundle size, SEO, 360°, mobile遮住)
- ✅ **Pertahankan kekuatan existing** (concerns copy, real testi, hard benefit)
- ✅ **Total 40 jam eksekusi**

---

*V5.2 adalah versi FINAL. Addendum ini menjadi bagian integral dari PLAN_REDESIGN_V5.md.*
*Last updated: 14 Juni 2026*
