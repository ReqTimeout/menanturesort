# DESIGN BRIEF — Menantu Resort (Per-Halaman)

> **Stack locked:** Astro 5 SSG + Svelte 5 runes (runes) + Tailwind 3 + bits-ui (shadcn-style) + Lucide icons
> **Deploy:** cPanel IDCloudHost Node.js selector → `node dist/server/entry.mjs`
> **No vanilla** (sudah dihapus), **no 360/** (deprecated), **no emoji as primary icon** (semua Lucide)

---

## 🎨 GLOBAL DESIGN SYSTEM

### Colors (HSL-based untuk theming)
| Token | Hex | Usage |
|---|---|---|
| `forest-50` | `#F0F5F1` | bg light, hover state |
| `forest-100` | `#D4E1D6` | subtle bg, card border |
| `forest-500` | `#1B4332` | PRIMARY — brand |
| `forest-700` | `#0D1B14` | text primary, dark bg |
| `forest-900` | `#061009` | deepest dark |
| `gold-300` | `#E8C896` | hover gold |
| `gold-500` | `#D4A574` | SECONDARY — CTA, accent |
| `gold-700` | `#A8845C` | pressed gold |
| `cream-50` | `#F5F0E8` | warm bg |
| `cream-100` | `#E8DCC8` | section divider |
| `ink-500` | `#3D4A40` | body text |
| `ink-700` | `#7A8479` | mute text |
| `whatsapp` | `#25D366` | WA only |

### Typography
- **Display (H1-H2):** Playfair Display 700, italic 400 untuk accent
  - Hero: `clamp(3rem, 7vw, 6rem)` line-height 0.95
  - Display: `clamp(2.25rem, 5vw, 4rem)` line-height 1.0
- **Body:** Inter 400/500/600, base 16px, line-height 1.6
- **Quote/Italic:** Cormorant Garamond 400 italic
- **Mono:** JetBrains Mono untuk nomor rekening, kode booking
- **Letter-spacing:** Display `-0.02em`, Body `0`, Caption `0.05em`

### Spacing Scale (Tailwind default 4px)
- Section: `py-20 md:py-32 lg:py-40` (80-160px)
- Container: `max-w-7xl mx-auto px-6 md:px-8`
- Card: `p-8 md:p-10` (32-40px)
- Gap grid: `gap-6 md:gap-8`

### Border & Radius
- `rounded-none` DEFAULT — premium sharp corners
- `rounded-sm` (2px) untuk badge & small UI
- Gold accent line: `border-t-2 border-gold-500` atau `before:` pseudo

### Shadow
- `shadow-sm` (subtle card lift)
- `shadow-lg` (hover state)
- `shadow-2xl` (modal, dropdown)
- `shadow-gold` custom: `0 8px 32px -8px rgba(212,165,116,0.4)`

### Animation
- `transition-all duration-300` default
- `cubic-bezier(0.4, 0, 0.2, 1)` — premium easing
- Hover lift: `hover:-translate-y-1 hover:shadow-lg`
- Scroll reveal: `IntersectionObserver` (Svelte action)

---

## 📐 PER-PAGE LAYOUT

### HOMEPAGE `/` (10 sections)

| # | Section | Layout | Komponen |
|---|---|---|---|
| 1 | **HERO** | Full-height (100vh), 2-col text+image | `<HeroParallax />` Svelte island |
| 2 | **STATS** | 4-col counter dark bg | `<Counter />` Svelte |
| 3 | **PROBLEM → PROMISE** | 2-col sticky | `<ProblemGrid />` Astro |
| 4 | **TIPE VILLA** | 3-col card grid | `<VillaCard />` Astro + Lucide icons |
| 5 | **PASSIVE INCOME CHART** | Single column dramatic | CSS bar chart |
| 6 | **SIMULASI CTA** | Big bold CTA strip | Astro |
| 7 | **SAHID PARTNERSHIP** | 2-col with quote | Astro |
| 8 | **LOKASI** | 2-col attractions + map | Astro |
| 9 | **TESTIMONI** | 3-col testimonial | Astro |
| 10 | **FINAL CTA** | Urgency + dual CTA | Astro |

### VILLA LISTING `/villa` 
- 1 col each villa (3 section), alternating image-text (left/right)
- Comparison table at bottom
- CTA per villa

### VILLA DETAIL `/villa/[id]` (×3)
- Hero with badge + price
- Specs bar (icon + value, NO emoji)
- Description (2-col layout)
- Gallery (CSS art placeholder)
- Simulation table
- Floor plan section
- CTA strip
- Related villa

### INVESTASI HUB `/investasi`
- Hero with KPR Calculator embedded (Svelte island)
- 2-col comparison KPR Bank vs Developer
- Comparison table all villas
- 3 pillar cards
- Final CTA

### KPR DETAIL `/investasi/skema-{bank,developer}`
- Hero with key stats (3-col)
- Simulation table
- Syarat pengajuan (2-col)
- CTA

### PASSIVE INCOME `/investasi/passive-income`
- Hero
- 3 villa projections (3-col)
- Asumsi perhitungan (2-col)
- ROI guarantee banner

### LOKASI `/lokasi`
- Hero
- Google Maps embed (fixed URL)
- 6 akses routes (3-col card)
- 8 nearby attractions (4-col grid)
- 3 reasons section (3-col)
- CTA

### RESORT `/resort`
- Hero
- 12 facilities (3-col card grid with Lucide icons)
- Sahid management section

### KONTAK `/kontak`
- Hero
- Info kontak (2-col with copy-to-clipboard bank accounts)
- 4-step process timeline

### ARTIKEL `/artikel`
- Hero
- 6 article cards placeholder (3-col)

### FAQ `/faq`
- Hero
- Accordion (bits-ui Accordion) grouped by 7 categories
- 22 Q&A

### 404 `/404`
- Full-screen error with CTA back to home

### STATIC: `/syarat-dan-ketentuan`, `/kebijakan-privasi`
- Simple content layout

---

## 🧩 COMPONENT LIBRARY (shadcn-style)

### `src/lib/components/ui/`
- **Button** — variants: primary, secondary, outline, ghost, whatsapp, link; sizes: sm, md, lg, icon
- **Card** — dengan gold accent line `before:`
- **Badge** — variants: gold, default, dark, success
- **Accordion** — bits-ui based, smooth expand
- **Input** — form input dengan label
- **Sheet** — mobile menu (bits-ui Dialog)
- **Container** — max-w wrapper
- **Section** — py wrapper
- **Heading** — H1-H4 dengan eyebrow + accent italic
- **Eyebrow** — gold uppercase tracking-wide
- **Icon** — Lucide wrapper dengan size token

### `src/components/svelte/`
- **HeroParallax** — Svelte 5, scroll-driven parallax
- **Counter** — IntersectionObserver, animated number
- **KprCalculator** — interactive Svelte 5 island
- **VillaGallery** — image slider/grid
- **MobileMenu** — bits-ui Sheet

---

## 🎯 TYPOGRAPHY RULES (FIXED)

1. **NEVER** `text-xl` for hero — must be `clamp(2.5rem, 5vw, 4rem)` atau lebih besar
2. **ALWAYS** `font-display` (Playfair) untuk h1-h3, `font-body` (Inter) untuk body
3. **Eyebrow** di atas setiap section title, gold color, uppercase tracking
4. **Italic accent** untuk phrase pendek (1-3 kata) di dalam heading — `<em>`
5. **Balance text** untuk heading (CSS `text-wrap: balance`)
6. **Max-width** heading `max-w-4xl` (800px) untuk readability

## 🎯 COLOR RULES (FIXED)

1. **NO** `text-gray-*` — pakai `text-forest-700`, `text-ink-500`, `text-ink-700`
2. **NO** `bg-white` polos untuk section — pakai `bg-cream-50` atau `bg-forest-700` (dark)
3. **Dark section** alternation: light → dark → light → dark (visual rhythm)
4. **Gold** hanya untuk accent & CTA — JANGAN untuk body text
5. **Forest green** untuk primary CTAs, headings on light bg

## 🖼️ IMAGE STRATEGY

Karena API key tidak bisa generate image:
- **CSS art placeholder** untuk villa cards — gradient + SVG architecture outline
- **Lucide icons** untuk semua icon (no emoji)
- **Pattern bg** subtle (forest pattern SVG inline)
- Nanti: replace dengan real image dari nanobanana saat API key aktif

---

## ✅ IMPLEMENTATION ORDER

1. **Foundation** (hari 1)
   - Update `global.css` dengan HSL tokens
   - Buat `lib/utils.ts` (cn helper)
   - Buat `lib/components/ui/*` (Button, Card, Badge, etc)
   - Update `tailwind.config.mjs` dengan color tokens
   
2. **Homepage** (hari 1-2)
   - Redesign 10 sections dengan design system baru
   - Hero, Stats, Villa Cards, CTA — full premium
   
3. **Villa pages** (hari 2)
   - Listing + 3 detail dengan CSS art villa card
   
4. **Investasi** (hari 3)
   - Hub + 3 sub-pages + KPR Calculator polish
   
5. **Lokasi, Resort, Kontak, FAQ, Artikel** (hari 3-4)
   - Layout consistent
   
6. **Build + screenshot audit** (hari 4)
   - Verify semua 16 page via headless Chrome
   
7. **Deploy prep** (hari 4)
   - `.htaccess` final, `DEPLOY.md` final

---

*Dokumen ini source of truth untuk design. Update jika ada perubahan besar.*
