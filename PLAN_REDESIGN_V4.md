# PLAN REDESIGN V4 — Menantu Resort

> **Premium Interactive Resort Website — Bukan Template. Experience.**
> Updated: 14 Juni 2026

---

## 1. PHILOSOPHY: KENAPA INI BUKAN TEMPLATE

**Awwwards 2026 SOTD patterns yang wajib diadopsi:**
1. **Restraint** — 1 konsep kuat per section, bukan campur aduk effect
2. **Scroll-driven narrative** — Setiap section punya cerita yang terus terbaca saat scroll
3. **Lighthouse 90+** — Performance bukan alasan
4. **prefers-reduced-motion** — Respect accessibility
5. **Technical craft** — Animasi ada alasan, bukan decorative

**Yang MEMBEDAKAN dari template:**
- Setiap section punya **narrative arc** (hook → story → proof → CTA)
- Animasi **bermakna** — membantu user memahami konten, bukan sekadar "wow"
- Copywriting **persuasif** — bukan deskripsi fitur, tapi emosi dan aspirasi
- Design **editorial** — seperti majalah arsitektur premium, bukan brosur properti
- **Scroll sebagai journey** — user merasa berjalan melewati resort, bukan scrolling page

---

## 2. TECH STACK (LOCKED — Tidak Diubah)

| Layer | Tech | Alasan |
|-------|------|--------|
| Framework | **Astro 5** (SSG + Node adapter) | Static-first, Islands architecture, SEO perfect |
| UI Interaktif | **Svelte 5** (runes) | Hanya untuk komponen yang butuh state |
| Animasi | **svelte-motion** + GSAP ScrollTrigger | Svelte-native (bukan GSAP-heavy) |
| UI Primitives | **shadcn-svelte** (bits-ui) | Accessible, customizable, bukan black-box |
| Styling | **Tailwind CSS 3** | Design tokens via config |
| Icons | **Lucide Svelte** | Konsisten, lightweight |
| Carousel | **embla-carousel-svelte** | Sudah ada, works |
| Smooth Scroll | **Lenis** (optional, progressive enhancement) | Scroll feel premium |

### Mengapa svelte-motion, bukan GSAP semua?

**GSAP bagus untuk:** ScrollTrigger pin/scrub, complex timeline sequences
**svelte-motion bagus untuk:** Hover, tap, drag, layout animation, AnimatePresence

**Strategi:**
- GSAP → hanya untuk **scroll-pinned sections** (VillaShowcase, sticky scrollspy)
- svelte-motion → untuk **everything else** (hover effects, reveals, page transitions)
- CSS → untuk **simple transitions** (color, opacity, transform)

---

## 3. DESIGN SYSTEM (FINAL)

### 3.1 Color Palette (Tidak Diubah — Sudah Premium)

```
PRIMARY:    Forest Green  #1B4332  (brand, trust, nature)
DARK:       Deep Green    #0D1B14  (hero bg, dark sections)
DEEPER:     Almost Black  #061009  (accent depth)
ACCENT:     Gold/Sand     #D4A574  (luxury, CTA, divider)
ACCENT-DK:  Darker Gold   #A8845C  (hover states)
CREAM:      Warm Cream    #F5F0E8  (light bg sections)
INK-900:    #0D1B14       (headings)
INK-700:    #3D4A40       (body text)
INK-500:    #7A8479       (secondary text)
INK-300:    #B8BDB5       (muted, borders)
```

### 3.2 Typography (Diperjelas)

| Role | Font | Weight | Size | Line-height | Usage |
|------|------|--------|------|-------------|-------|
| **Display Hero** | Playfair Display | 700 | clamp(3.5rem, 8vw, 8rem) | 0.90 | Hero title — DRAMATIS |
| **Display Section** | Playfair Display | 700 | clamp(2.5rem, 5vw, 4.5rem) | 0.95 | Section headings |
| **Accent** | Playfair Display | 400i | inherit | — | `<em>` gold italic — selalu gold |
| **Body Large** | Inter | 400 | clamp(1.125rem, 1.5vw, 1.25rem) | 1.7 | Lead paragraphs |
| **Body** | Inter | 400 | 1rem | 1.65 | Body text |
| **Body Small** | Inter | 500 | 0.875rem | 1.5 | Descriptions, lists |
| **Caption** | Inter | 500 | 0.75rem | 1.4 | Labels, metadata |
| **Eyebrow** | JetBrains Mono | 400 | 0.6875rem | 1.2 | Uppercase tracking-widest — section labels |
| **Quote** | Cormorant Garamond | 400i | clamp(1.25rem, 2vw, 1.75rem) | 1.5 | Testimonial, tagline |
| **Numeral** | JetBrains Mono | 700 | 3rem | 1 | Big numbers, stats |

### 3.3 Font Readability Rules (PENTING)

1. **Minimum body text: 16px** — tidak ada yang lebih kecil untuk paragraph
2. **Line-height 1.65 untuk body** — longgar, mudah dibaca
3. **Max-width 65ch untuk body text** — tidak terlalu lebar
4. **Contrast ratio 4.5:1 minimum** — ink-700 (#3D4A40) di cream (#F5F0E8) = 5.2:1 ✓
5. **Font size hierarchy minimal 1.5x** antar level — heading harus JAUH lebih besar dari body
6. **Letter-spacing negatif untuk display** — Playfair headings pakai -0.02em
7. **Letter-spacing positif untuk eyebrow** — JetBrains Mono pakai 0.15em

### 3.4 Spacing System

```
Section padding:    py-20 md:py-32 lg:py-40 (80px → 128px → 160px)
Container max:      1440px (wide) / 1200px (tight) / 800px (prose)
Gap:                24px (sm) / 32px (md) / 48px (lg) / 64px (xl)
Component gap:      16px-32px
```

### 3.5 Design Elements

| Element | Implementation | Usage |
|---------|---------------|-------|
| **Gold accent line** | `1px solid #D4A574` top card | Setiap card, divider section |
| **Grain texture** | SVG feTurbulence overlay | Hero, dark sections — subtle 5-8% opacity |
| **Dot pattern** | CSS radial-gradient | Light section backgrounds |
| **Grid pattern** | CSS linear-gradient | Dark section backgrounds |
| **Vignette** | radial-gradient overlay | Hero, full-bleed images |
| **Glassmorphism** | backdrop-blur + bg-white/5 | Navbar scrolled, floating elements |
| **Sharp corners** | border-radius: 0 default | Premium feel — NO rounded-lg |
| **Gold selection** | `::selection` bg-gold-500 | Text selection di seluruh site |

---

## 4. PER-PAGE SECTION BREAKDOWN

### 4.1 HOMEPAGE (`/`)

**Narrative Arc:** "Ketika properti biasa tidak cukup... ada yang lebih."

| # | Section | Type | Svelte? | GSAP? | Narrative | CTA |
|---|---------|------|---------|-------|-----------|-----|
| 0 | **NavMenu** | Svelte | ✓ client:load | — | — | — |
| 1 | **Editorial Hero** | Svelte | ✓ client:load | — | **HOOK:** "Masa Depan Lebih Mapan" — Parallax cinematic, mouse follow, live viewers counter. Text reveal per-line. | "Lihat Skema Investasi" + "Konsultasi WhatsApp" |
| 2 | **Marquee** | Svelte | ✓ client:visible | — | **BRAND PILLARS:** Infinite scroll tagline — SHM Bersih, Dikelola Sahid, ROI 10%, Passive Income | — |
| 3 | **Manifesto** | Svelte | ✓ client:visible | — | **STORY:** Word-by-word reveal. "Warisan bukan sekadar properti..." — oversized italic Playfair, 3 stats (1974, 50+ th, 20+ properti) | — |
| 4 | **The Promise** | Astro | — | — | **PROOF:** 4 stat counters animated on viewport — 74 Unit, 3 Tipe, 3.5 Ha, 50+ Th Sahid. Plus 3 benefit cards dengan gold accent line. | — |
| 5 | **Villa Showcase** | Svelte | ✓ client:visible | ✓ ScrollTrigger pin | **SHOWCASE:** Sticky full-bleed, 3 villa backgrounds ganti saat scroll. 3D tilt cards dengan spotlight glow. | "Detail Villa [Name]" per card |
| 6 | **How It Works** | Svelte | ✓ client:visible | ✓ ScrollSpy | **JOURNEY:** 5-step — Survei → Pilih Unit → Booking → KPR → Terima Income. Sticky left text, scrollspy right visual. | — |
| 7 | **Sahid Partnership** | Astro | — | — | **AUTHORITY:** Interior image real + 4 trust signals — 50+ tahun, 20+ properti, 4.5★ rating, standar bintang 5 | "Lihat Track Record" |
| 8 | **Passive Income** | Svelte | ✓ client:visible | — | **MATH:** Cicilan vs Income vs Surplus — animated counter. "Dari Rp 9 juta/bulan, Anda bisa dapat Rp 15 juta/bulan." | "Hitung Sendiri" → KPR Calculator |
| 9 | **Masterplan** | Svelte | ✓ client:visible | — | **VISION:** Interactive SVG map 3.5 Ha dengan hotspots. Klik untuk detail cluster. | — |
| 10 | **Testimoni** | Svelte | ✓ client:visible | — | **SOCIAL PROOF:** embla carousel — 6 testimoni real dengan nama, foto, profit aktual. Autoplay 6s. | — |
| 11 | **Final CTA** | Astro | — | — | **CLOSE:** Dark overlay + real villa bg. "58 dari 74 unit sudah terjual. Sisa 16 unit." Urgency + scarcity. | "Booking Survei" + "Lihat 3 Villa" |
| 12 | **Footer** | Astro | — | — | Links, bank accounts, legal | — |
| 13 | **FAB** | Svelte | ✓ client:load | — | Floating — Booking, WA, Phone | — |
| 14 | **LiveActivity** | Svelte | ✓ client:load | — | Social proof pulse — "Budi dari Bandung baru saja booking" | — |

### 4.2 VILLA LISTING (`/villa`)

**Narrative Arc:** "Anda tidak sedang membeli villa. Anda sedang memilih gaya hidup."

| # | Section | Type | Svelte? | Narrative | CTA |
|---|---------|------|---------|-----------|-----|
| 0 | **NavMenu** | Svelte | ✓ | — | — |
| 1 | **Urgency Banner** | Svelte | ✓ | **SCARCITY:** "16 dari 74 unit tersisa" — countdown timer + progress bar | — |
| 2 | **Intro** | Astro | — | **HOOK:** Editorial headline — "Anda tidak sedang membeli villa. Anda sedang memilih gaya hidup 30 tahun ke depan." + 3 villa cards | "Bandingkan 3 Villa" + "Virtual Tour 360°" |
| 3 | **Virtual Tour** | Svelte | ✓ | **EXPLORE:** 360° viewer dengan hotspots — explore cluster, interior, view | — |
| 4 | **Comparison Table** | Svelte | ✓ | **COMPARE:** Full spec table — LB, LT, KT, KM, Harga, Cicilan, Income, Surplus | — |
| 5 | **Tiga Karakter** | Astro | — | **STORY:** 3 villa narratives — alternating layout. Setiap villa: photo besar + copy "Untuk Anda yang..." + features + CTA | "Detail Villa [Name]" |
| 6 | **Sahid Pedigree** | Svelte | ✓ | **AUTHORITY:** Timeline Sahid 50+ tahun. Partner logos. Management team. | — |
| 7 | **ROI Simulator** | Svelte | ✓ | **MATH:** Interactive — pilih villa, ubah tenor, lihat cashflow real-time | "Tanya via WhatsApp" |
| 8 | **Testimoni Stories** | Svelte | ✓ | **PROOF:** Video-style testimonials — photo + quote + actual profit numbers | — |
| 9 | **Lead Form + CTA** | Svelte | ✓ | **CONVERT:** Multi-step form → WhatsApp. Step 1: Pilih villa. Step 2: Data diri. Step 3: Preferensi survei. | "Kirim via WhatsApp" |

### 4.3 VILLA DETAIL (`/villa/{bijak,idaman,mapan}`)

**Narrative Arc (per villa):** "Villa [Name] — untuk Anda yang [aspirasi]."

| # | Section | Type | Svelte? | Narrative | CTA |
|---|---------|------|---------|-----------|-----|
| 0 | **NavMenu** | Svelte | ✓ | — | — |
| 1 | **Villa Hero** | Svelte | ✓ | **IMMERSE:** Full-bleed gallery — thumbnails, prev/next, badges (2 lantai, LB, LT) | — |
| 2 | **Specs Bar** | Astro | — | **DATA:** 6 spec items dengan icon — KT, KM, LB, LT, Lantai, SHM | — |
| 3 | **Filosofi Vila** | Astro | — | **STORY:** Narrative copy per villa — "Arsitektur Limasan Tradisional, Sentuhan Modern." + features grid | — |
| 4 | **Simulasi Cashflow** | Astro | — | **MATH:** Cicilan vs Income vs Surplus — visual breakdown. "Cashflow positif dari hari 1." | "Tanya Detail via WA" |
| 5 | **Galeri** | Svelte | ✓ | **VISUAL:** Image gallery — interior, eksterior, detail arsitektur | — |
| 6 | **Other Villas** | Astro | — | **CROSS-SELL:** 2 cards villa lain dengan CTA | "Detail Villa [Name]" |

### 4.4 INVESTASI HUB (`/investasi`)

**Narrative Arc:** "Hitung sendiri — jangan percaya kata-kata."

| # | Section | Type | Svelte? | Narrative | CTA |
|---|---------|------|---------|-----------|-----|
| 0 | **NavMenu** | Svelte | ✓ | — | — |
| 1 | **Hero** | Astro | — | **HOOK:** "Simulasi Investasi Anda" | — |
| 2 | **KPR Calculator** | Svelte | ✓ | **TOOL:** Interactive — pilih villa, tenor, bunga → hitung cicilan vs income | "Diskusikan via WA" |
| 3 | **Skema Bank** | Astro | — | **DATA:** Tabel detail KPR — bunga, tenor, DP, simulasi | — |
| 4 | **Skema Developer** | Astro | — | **DATA:** Tabel detail cash bertahap | — |
| 5 | **Passive Income** | Svelte | ✓ | **MATH:** Visual cicilan vs income — animated chart | — |

### 4.5 LOKASI (`/lokasi`)

| # | Section | Type | Narrative | CTA |
|---|---------|------|-----------|-----|
| 0 | **NavMenu** | Svelte | — | — |
| 1 | **Hero** | Astro | **HOOK:** "45 menit dari Tol Cileunyi" | — |
| 2 | **Map** | Astro | Google Maps embed + nearby locations | — |
| 3 | **Nearby** | Astro | Wisata, kuliner, industri terdekat | — |

### 4.6 RESORT (`/resort`)

| # | Section | Type | Narrative | CTA |
|---|---------|------|-----------|-----|
| 0 | **NavMenu** | Svelte | — | — |
| 1 | **Hero** | Astro | **HOOK:** "12 Fasilitas Resort Premium" | — |
| 2 | **Facilities Grid** | Astro | 12 facilities dengan Lucide icons + deskripsi | — |
| 3 | **CTA** | Astro | "Rasakan langsung — survei gratis" | "Booking Survei" |

### 4.7 KONTAK (`/kontak`)

| # | Section | Type | Narrative | CTA |
|---|---------|------|-----------|-----|
| 0 | **NavMenu** | Svelte | — | — |
| 1 | **Hero** | Astro | **HOOK:** "Hubungi Kami" | — |
| 2 | **Bank Accounts** | Astro | Rekening BNI, BCA, BSI + cara pembayaran | — |
| 3 | **4-Step Process** | Astro | Survei → Pilih → Booking → KPR | "Mulai Sekarang" |
| 4 | **WhatsApp CTA** | Astro | Direct link ke WA | "Chat WhatsApp" |

### 4.8 FAQ (`/faq`)

| # | Section | Type | Narrative | CTA |
|---|---------|------|-----------|-----|
| 0 | **NavMenu** | Svelte | — | — |
| 1 | **Hero** | Astro | **HOOK:** "Pertanyaan yang Sering Ditanyakan" | — |
| 2 | **Accordion** | Svelte (bits-ui) | 7 categories, 22 Q&A — smooth rotate animation | — |
| 3 | **CTA** | Astro | "Masih ada pertanyaan?" | "Chat WhatsApp" |

### 4.9 ARTIKEL (`/artikel`)

| # | Section | Type | Narrative | CTA |
|---|---------|------|-----------|-----|
| 0 | **NavMenu** | Svelte | — | — |
| 1 | **Hero** | Astro | **HOOK:** "Artikel & Insight" | — |
| 2 | **Article Cards** | Astro | 6 cards dengan placeholder images | — |

### 4.10 LEGAL PAGES

- `/kebijakan-privasi` — Static content
- `/syarat-dan-ketentuan` — Static content

---

## 5. COMPONENT INVENTORY

### 5.1 Komponen Yang AKAN DIPAKAI (Revive Dead Code)

| Komponen | Status | Action | Digunakan Di |
|----------|--------|--------|-------------|
| `VillaCard.svelte` | Unused | **REVIVE** — 3D tilt + spotlight | Homepage Villa Showcase, Villa Listing |
| `StatsCounter.svelte` | Unused | **REVIVE** — animated counters | Homepage The Promise |
| `SplitReveal.svelte` | Unused | **REWRITE** — pakai svelte-motion bukan GSAP | Homepage Manifesto |
| `HeroParallax.svelte` | Unused | **MERGE** ke EditorialHero | — |

### 5.2 Komponen Yang BARU DIBUAT

| Komponen | Type | Fitur | Digunakan Di |
|----------|------|-------|-------------|
| `ThePromise.svelte` | Svelte | 4 stat counters + 3 benefit cards | Homepage |
| `HowItWorks.svelte` | Svelte | 5-step sticky scrollspy | Homepage |
| `PassiveIncome.svelte` | Svelte | Cicilan vs Income animated chart | Homepage, Investasi |
| `GaleriVilla.svelte` | Svelte | Image gallery thumbnails | Villa Detail |
| `RevealOnScroll.svelte` | Svelte | Reusable scroll-triggered reveal | Everywhere |
| `MagneticButton.svelte` | Svelte | Magnetic hover effect | CTA buttons |
| `CountUp.svelte` | Svelte | Animated number counter | Stats sections |
| `SectionDivider.svelte` | Astro | Gold line + pattern bg | Between sections |
| `SchemaJSONLD.svelte` | Astro | Schema.org per page type | SEO |

### 5.3 Komponen Yang DIHAPUS (Dead Code Cleanup)

| Komponen | Alasan |
|----------|--------|
| `Hero.svelte` | Digantikan EditorialHero — duplicate |
| `InvestmentCalculator.svelte` | Digantikan KprCalculator |
| `ReadingProgress.svelte` | Unused, tidak value |
| `VillaArt.svelte` | Unused, tidak value |
| `Cursor.svelte` | Optional — bisa diaktifkan later |

### 5.4 shadcn-svelte UI Primitives (Sudah Ada, Tidak Diubah)

- `Button.svelte` — 7 variants
- `Card.svelte` — hover lift + accent line
- `Badge.svelte` — 5 variants
- `Accordion.svelte` — bits-ui, smooth rotate
- `Dialog.svelte` — bits-ui, modal
- `Sheet.svelte` — bits-ui, mobile menu
- `Tabs.svelte` — bits-ui, gold underline

---

## 6. COPYWRITING FRAMEWORK

### 6.1 Formula Per Section

```
EYEBROW:    — Label section (JetBrains Mono, uppercase, gold)
HEADING:    Playfair Display, 2 line max, em gold accent
SUBHEADING: Inter body-large, 1-2 kalimat, aspirasional
BODY:       Inter body, 3-4 kalimat, story + proof
CTA:        1-2 buttons — primary (gold) + secondary (outline)
```

### 6.2 Contoh Copywriting (Homepage)

**Hero:**
- Eyebrow: "01 / Edition · 2026"
- Heading: "Masa Depan" / "Lebih Mapan." (italic gold)
- Body: "Aset warisan produktif berlegalitas SHM Bersih di Cicalengka. Dikelola harian oleh Sahid Hotels & Resorts (50+ tahun). Cicilan mulai Rp 9 juta/bulan."
- Badge: "Limited Release · 16 dari 74 unit tersisa"
- CTA: "Lihat Skema Investasi" + "Konsultasi WhatsApp"

**Manifesto:**
- "Warisan bukan sekadar properti. Ia adalah pernyataan: bahwa Anda berpikir lintas generasi. Bahwa Anda menolak hidup dalam siklus kerja-pakai-buang. Menantu Resort adalah jawaban untuk mereka yang memilih berbeda."

**Villa Showcase:**
- "Tiga villa, satu standar."
- Setiap villa: nama + tagline + harga + "Explore" CTA

**Final CTA:**
- "Masa depan Anda dimulai dari keputusan hari ini."
- "58 dari 74 unit sudah terjual. Sisa 16 unit."
- Urgency: "Promo khusus minggu ini: diskon Rp 200 juta + bonus mobil listrik"

### 6.3 Copywriting Rules

1. **Tidak ada jargon kosong** — "Premium location" → "45 menit dari Tol Cileunyi"
2. **Quantify semua** — "Passive income besar" → "Rp 15 juta/bulan"
3. **Social proof di setiap section** — jumlah unit terjual, nama investor, profit aktual
4. **FOMO subtle** — "16 unit tersisa", "Harga naik Q3", "58 sudah terjual"
5. **CTA spesifik** — "Lihat Skema Investasi" bukan "Klik Disini"
6. **Emotional + Rational balance** — aspirasi ("warisan lintas generasi") + math ("ROI 10%")

---

## 7. ANIMATION STRATEGY

### 7.1 Animasi Per Komponen

| Komponen | Animasi | Library | Trigger |
|----------|---------|---------|---------|
| EditorialHero | Text reveal per-line, parallax bg, mouse follow | svelte-motion | mount + mouse |
| Marquee | Infinite horizontal scroll | CSS | always |
| Manifesto | Word-by-word reveal | svelte-motion | scroll progress |
| StatsCounter | Count-up number | svelte-motion | IntersectionObserver |
| VillaCard | 3D tilt, spotlight glow, hover scale | svelte-motion | mouse move |
| VillaShowcase | Sticky scroll, bg crossfade | GSAP ScrollTrigger | scroll |
| HowItWorks | Sticky left, scrollspy right | GSAP ScrollTrigger | scroll |
| MagneticButton | Magnetic translate on hover | svelte-motion | mouse |
| RevealOnScroll | Fade-up + slide | svelte-motion | IntersectionObserver |
| TestimoniCarousel | Drag, autoplay, infinite | embla-carousel | user + timer |
| LiveActivity | Rotating events, pulse | CSS + JS interval | interval |
| BookingDialog | Modal open/close | bits-ui Dialog | click |
| UrgencyBanner | Countdown timer, progress bar | JS interval | interval |

### 7.2 GSAP Usage (Minimal & Targeted)

GSAP **HANYA** digunakan untuk:
1. **VillaShowcase** — ScrollTrigger pin + scrub untuk sticky full-bleed
2. **HowItWorks** — ScrollTrigger scrollspy untuk sticky left panel

**Mekanisme:**
```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl;
  let ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      gsap.to(sectionEl, {
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
        // animation props
      });
    }, sectionEl);
  });

  onDestroy(() => ctx && ctx.revert());
</script>
```

### 7.3 svelte-motion Usage

```svelte
<script>
  import { motion } from 'svelte-motion';
</script>

<!-- Hover magnetic effect -->
<motion.button
  whileHover={{ scale: 1.05, x: 10 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>

<!-- Scroll-triggered reveal -->
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  Content here
</motion.div>

<!-- AnimatePresence for mount/unmount -->
{#if visible}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    Modal content
  </motion.div>
{/if}
```

### 7.4 CSS-Only Animations (Simple)

- Hover transitions: `transition-all duration-300`
- Fade-in: `@keyframes fadeIn` + `.reveal` class
- Pulse: `animate-pulse` Tailwind
- Scroll bounce: `@keyframes scrollBounce`

---

## 8. LEAD FORM → WHATSAPP STRATEGY

### 8.1 Form Flow (LeadForm.svelte)

```
STEP 1: Pilih Villa
  ├── Radio: Bijak (Rp 1.2 M) / Idaman (Rp 1.6 M) / Mapan (Rp 2 M) / Belum Tahu
  └── Visual: 3 villa cards dengan foto + harga

STEP 2: Data Diri
  ├── Nama Lengkap (text)
  ├── Nomor WhatsApp (tel, required)
  ├── Email (email, optional)
  └── Kota Asal (text, optional)

STEP 3: Preferensi
  ├── Tujuan: Investasi / Tempat Tinggal / Keduanya
  ├── Budget: < 1.5 M / 1.5-2 M / > 2 M / Belum Tahu
  ├── Timeline: Bulan Ini / 1-3 Bulan / 3-6 Bulan / Lihat Dulu
  ├── Preferensi Survei: Weekday / Weekend / Flexible
  └── Pertanyaan Tambahan (textarea, optional)

SUBMIT → Generate WhatsApp URL dengan semua detail:
```
wa.me/6281234567890?text=
  Halo, saya [nama] dari [kota].
  Tertarik dengan Villa [pilihan].
  Budget: [budget].
  Timeline: [timeline].
  Mau survei: [preferensi].
  [pertanyaan]
```

### 8.2 WhatsApp Message Format

```
🏠 MENANTU RESORT — Inquiry Baru

📋 Villa: [Nama Villa] ([Harga])
👤 Nama: [Nama Lengkap]
📱 WA: [Nomor WhatsApp]
📧 Email: [Email]
🏙️ Kota: [Kota Asal]

💰 Budget: [Budget Range]
📅 Timeline: [Timeline]
🔍 Tujuan: [Tujuan]
🚗 Survei: [Preferensi Survei]

💬 Pertanyaan:
[Pertanyaan Tambahan]

---
Dikirim dari menantu-resort.com
```

### 8.3 BookingDialog.svelte (Alternative)

Dialog modal yang bisa diakses dari:
- FAB → "Booking Survei"
- Hero CTA → "Konsultasi WhatsApp"
- Setiap section CTA

Form lebih sederhana: Nama + WA + Villa → langsung kirim.

---

## 9. INFRASTRUCTURE

### 9.1 File Structure (Final)

```
app/src/
├── components/
│   ├── astro/           # Server-rendered
│   │   ├── Footer.astro
│   │   ├── Logo.astro
│   │   ├── SectionDivider.astro
│   │   └── SchemaJSONLD.astro
│   ├── svelte/          # Interactive islands
│   │   ├── NavMenu.svelte
│   │   ├── EditorialHero.svelte
│   │   ├── Marquee.svelte
│   │   ├── Manifesto.svelte
│   │   ├── ThePromise.svelte          (NEW)
│   │   ├── VillaCard.svelte           (REVIVED)
│   │   ├── VillaShowcase.svelte
│   │   ├── HowItWorks.svelte          (NEW)
│   │   ├── PassiveIncome.svelte       (NEW)
│   │   ├── StatsCounter.svelte        (REVIVED)
│   │   ├── Masterplan.svelte
│   │   ├── TestimoniCarousel.svelte
│   │   ├── FloatingActionButton.svelte
│   │   ├── LiveActivity.svelte
│   │   ├── UrgencyBanner.svelte
│   │   ├── VirtualTour.svelte
│   │   ├── VillaComparisonTable.svelte
│   │   ├── SahidPedigree.svelte
│   │   ├── ROISimulator.svelte
│   │   ├── TestimoniStories.svelte
│   │   ├── LeadForm.svelte
│   │   ├── BookingDialog.svelte
│   │   ├── VillaHero.svelte
│   │   ├── GaleriVilla.svelte         (NEW)
│   │   ├── RevealOnScroll.svelte      (NEW)
│   │   ├── MagneticButton.svelte      (NEW)
│   │   └── CountUp.svelte             (NEW)
│   └── seo/
│       ├── SchemaOrg.astro
│       └── MetaTags.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/               # 18 pages
├── data/
│   ├── site.json
│   ├── villa.json
│   └── faq.json
├── lib/
│   ├── components/ui/   # shadcn-svelte primitives
│   └── utils.ts
└── styles/
    └── global.css
```

### 9.2 Package.json (Final Dependencies)

```json
{
  "dependencies": {
    "@astrojs/node": "^9.5.5",
    "@astrojs/sitemap": "^3.6.1",
    "@astrojs/svelte": "^7.2.4",
    "@astrojs/tailwind": "^5.1.5",
    "bits-ui": "^2.18.1",
    "clsx": "^2.1.1",
    "embla-carousel-svelte": "^8.6.0",
    "gsap": "^3.15.0",
    "lenis": "^1.1.18",
    "lucide-svelte": "^0.456.0",
    "svelte-motion": "^0.6.5",
    "tailwind-merge": "^3.6.0"
  }
}
```

**Dihapus:** `tailwind-variants` (unused)

### 9.3 Performance Budget

- Total JS bundle: < 150KB gzipped
- Lighthouse Mobile: 90+
- First Contentful Paint: < 1.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 2MB (termasuk images)

---

## 10. PHASE PLAN (Kerja 1-1)

### PHASE 1: Foundation & Cleanup
**Goal:** Bersihkan dead code, install dependencies baru, setup GSAP + svelte-motion

**Tasks:**
1. Install `svelte-motion` dan `lenis`
2. Hapus komponen dead code: `Hero.svelte`, `InvestmentCalculator.svelte`, `ReadingProgress.svelte`, `VillaArt.svelte`
3. Setup GSAP ScrollTrigger wrapper (Svelte action)
4. Setup svelte-motion utility wrapper
5. Update `global.css` — tambah animation classes baru
6. Update `tailwind.config.mjs` — tambah svelte-motion compatible animations

**Deliverable:** Clean codebase, dependencies siap

---

### PHASE 2: Reusable Components
**Goal:** Buat semua komponen reusable baru

**Tasks:**
1. Buat `RevealOnScroll.svelte` — reusable scroll-triggered reveal (svelte-motion)
2. Buat `CountUp.svelte` — animated number counter (svelte-motion)
3. Buat `MagneticButton.svelte` — magnetic hover effect (svelte-motion)
4. Buat `SectionDivider.astro` — gold line + pattern bg
5. Revive `VillaCard.svelte` — 3D tilt + spotlight (svelte-motion)
6. Revive `StatsCounter.svelte` — animated counters (CountUp)
7. Buat `GaleriVilla.svelte` — image gallery thumbnails

**Deliverable:** 7 komponen reusable siap pakai

---

### PHASE 3: Homepage Sections (Top-Down)
**Goal:** Bangun homepage dari atas ke bawah

**Tasks:**
1. **EditorialHero** — upgrade parallax + text reveal (svelte-motion)
2. **Marquee** — polish, tambah speed variants
3. **Manifesto** — upgrade word reveal (svelte-motion bukan CSS)
4. **ThePromise** (NEW) — stat counters + benefit cards
5. **VillaCard** — integrate 3D tilt + spotlight ke homepage
6. **VillaShowcase** — integrate GSAP ScrollTrigger pin
7. **HowItWorks** (NEW) — 5-step sticky scrollspy
8. **Sahid Partnership** — polish section
9. **PassiveIncome** (NEW) — animated chart cicilan vs income
10. **Masterplan** — polish interactive SVG
11. **TestimoniCarousel** — polish embla
12. **Final CTA** — polish urgency + scarcity
13. **FloatingActionButton** — polish
14. **LiveActivity** — polish

**Deliverable:** Homepage 100% premium, semua section animatif

---

### PHASE 4: Villa Pages
**Goal:** Upgrade villa listing + detail pages

**Tasks:**
1. **UrgencyBanner** — countdown timer + progress bar
2. **VirtualTour** — polish 360° viewer
3. **VillaComparisonTable** — polish spec table
4. **Tiga Karakter** — narrative section upgrade
5. **SahidPedigree** — polish authority section
6. **ROISimulator** — polish calculator
7. **TestimoniStories** — polish testimonials
8. **LeadForm** — upgrade 3-step → WhatsApp flow
9. **VillaHero** — polish gallery
10. **GaleriVilla** — integrate new gallery
11. **Villa Detail Pages** — polish bijak, idaman, mapan

**Deliverable:** Villa pages 100% premium

---

### PHASE 5: Other Pages
**Goal:** Upgrade semua halaman lainnya

**Tasks:**
1. **Investasi** — polish KPR calculator, schemas
2. **Lokasi** — polish maps, nearby
3. **Resort** — polish facilities
4. **Kontak** — polish bank accounts, process
5. **FAQ** — polish accordion
6. **Artikel** — polish cards
7. **Legal pages** — polish content

**Deliverable:** Semua halaman premium

---

### PHASE 6: Polish & Performance
**Goal:** Final polish, performance optimization, accessibility

**Tasks:**
1. **Lenis smooth scroll** — integrate (progressive enhancement)
2. **prefers-reduced-motion** — disable animations untuk accessibility
3. **Image optimization** — WebP conversion, lazy loading
4. **Font loading** — `font-display: swap`, preload critical
5. **Lighthouse audit** — target 90+ mobile
6. **Cross-browser testing** — Chrome, Safari, Firefox, Edge
7. **Mobile responsive** — final QA semua breakpoints
8. **Schema.org** — final review JSON-LD
9. **SEO** — meta tags, sitemap, robots.txt

**Deliverable:** Production-ready, 90+ Lighthouse

---

### PHASE 7: Content & Copywriting
**Goal:** Finalisasi semua copywriting

**Tasks:**
1. **Homepage copy** — final review semua section copy
2. **Villa copy** — final review per villa
3. **Investasi copy** — final review
4. **Other pages copy** — final review
5. **WhatsApp messages** — finalisasi format
6. **CTA copy** — A/B test variants

**Deliverable:** Copywriting persuasif, storytelling konsisten

---

### PHASE 8: Deploy & Launch
**Goal:** Deploy ke production

**Tasks:**
1. **Build test** — `npm run build` success
2. **Node server test** — `npm run serve` port 3000
3. **cPanel deployment** — ikuti DEPLOY.md
4. **DNS setup** — pointing domain
5. **SSL certificate** — HTTPS active
6. **Analytics** — Google Analytics / Plausible
7. **Monitoring** — uptime check

**Deliverable:** Website live di menantu-resort.com

---

## 11. SUCCESS CRITERIA

### Design
- [ ] Setiap section punya narrative arc (hook → story → proof → CTA)
- [ ] Font hierarchy dramatis (heading 3-5x body size)
- [ ] Gold accent konsisten di semua section
- [ ] Tidak ada komponen "template" — semua terasa editorial
- [ ] Smooth scroll feel premium
- [ ] Responsive di semua breakpoints (mobile, tablet, desktop)

### Animation
- [ ] GSAP ScrollTrigger untuk VillaShowcase dan HowItWorks
- [ ] svelte-motion untuk hover, reveal, layout animations
- [ ] Semua animasi berfungsi tanpa jank (60fps)
- [ ] prefers-reduced-motion dihormati
- [ ] No animation yang menghalangi konten

### Performance
- [ ] Lighthouse Mobile 90+
- [ ] Total JS < 150KB gzipped
- [ ] FCP < 1.5s
- [ ] CLS < 0.1

### Conversion
- [ ] Lead form → WhatsApp flow berfungsi
- [ ] WhatsApp message format lengkap (villa, nama, budget, timeline)
- [ ] CTA visible di setiap section
- [ ] Urgency/scarcity elements aktif (countdown, units left)

### Code
- [ ] 0 dead components
- [ ] Semua komponen Svelte pakai runes ($state, $derived, $props)
- [ ] TypeScript strict mode
- [ ] No `export let` (deprecated)
- [ ] Konsisten naming conventions

---

*Plan ini locked. Execution dimulai dari Phase 1.*
*Last updated: 14 Juni 2026*
