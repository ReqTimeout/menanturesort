# 📐 PLAN REDESIGN v3 — Menantu Resort (FINAL)

> **Updated 14 Juni 2026** — Complete redesign dengan Svelte 5 islands, real images, shadcn-svelte UI components, dan out-of-the-box interactive elements.

---

## 🎯 Brand & Tech Stack (LOCKED)

- **Framework:** Astro 5 (SSG) + Svelte 5 (runes) + Tailwind 3 + bits-ui + Lucide icons
- **Light mode only** — cream-50 / white / cream-100 (tidak ada section gelap)
- **shadcn-svelte style UI primitives** di `src/lib/components/ui/`
- **Per-section Svelte islands** untuk interaktifitas
- **Real images** dari ref site (logo, villa rows, interior)

## 📦 Design System (FINAL — tidak diubah)

Color HSL tokens: forest (brand) · gold (accent) · cream (bg) · ink (text)
Typography: Playfair Display (display) · Inter (body) · Cormorant Garamond (quote) · JetBrains Mono (numeric)
Spacing: container 1600px / 1200px content · section py 20-32

## 🖼️ Real Images (dari ref site)

`app/public/images/ref/`:
- `logo-gold.png` (154KB) — Logo Menantu Resort gold on transparent
- `villa-bijak-row.jpg` (2.5MB) — Villa Bijak deretan lengkap (atap gazebo)
- `villa-idaman-row.jpg` (2.4MB) — Villa Idaman deretan lengkap (atap limasan)
- `villa-mapan-street.jpg` (1.6MB) — Villa Mapan street view (atap Gothic Arch)
- `villa-mapan-detail.jpg` (1.6MB) — Villa Mapan close-up (atap Gothic Arch)
- `interior-living.jpg` (763KB) — Interior ruang tamu villa

## 🧩 UI Primitives (shadcn-svelte style)

`app/src/lib/components/ui/`:
- `Button.svelte` — variants: primary/secondary/outline/outline-light/whatsapp/ghost/link
- `Card.svelte` — dengan hover lift + accent line
- `Badge.svelte` — variants: default/gold/dark/light/outline
- `Accordion.svelte` — bits-ui single type dengan smooth rotate
- `Dialog.svelte` — bits-ui modal centered
- `Sheet.svelte` — bits-ui side modal (mobile menu)
- `Tabs.svelte` — bits-ui dengan gold underline indicator

## 🏝️ Svelte Islands (interactive sections)

`app/src/components/svelte/`:

| Island | Tipe | Interactive Features |
|---|---|---|
| `NavMenu.svelte` | client:load | Sticky scroll detection, Sheet mobile menu, color invert on scroll |
| `Hero.svelte` | client:load | Parallax bg (mouse + scroll), animated text reveal, live "8 org melihat" counter, magnetic CTA |
| `StatsCounter.svelte` | client:visible | Animated number counter (IntersectionObserver), 4 stats |
| `VillaCard.svelte` | client:visible | 3D tilt on mouse move, spotlight glow, hover scale image |
| `VillaComparison.svelte` | client:visible | Tabs bits-ui dengan 3 villa, spec grid + features list |
| `TestimoniCarousel.svelte` | client:visible | embla carousel, autoplay 6s, drag, dots, arrows |
| `StickyScrollSection.svelte` | client:visible | 5-step how-it-works dengan sticky left + scrollspy right |
| `BookingDialog.svelte` | client:load (via FAB) | bits-ui Dialog dengan form → generate WhatsApp URL |
| `FloatingActionButton.svelte` | client:load | Expandable FAB dengan 3 actions (Booking/WA/Phone), scroll-show |
| `LiveActivity.svelte` | client:load | Social proof widget, rotating events, fluctuate viewers |
| `VillaHero.svelte` | client:load | Image gallery dengan thumbnails, prev/next, dots |
| `KprCalculator.svelte` | client:visible | Existing Svelte 5 KPR simulator (interaktif) |
| `Counter.svelte` | client:visible | Reusable animated number (ease cubic) |
| `HeroParallax.svelte` | client:load | Reusable parallax dengan vignette + grain |

## 📄 Pages — Per-Section Breakdown

### 🏠 Homepage (`/`)
| # | Section | Type | Component | Key Features |
|---|---|---|---|---|
| 1 | Nav | Svelte | `NavMenu.svelte` | Sticky, color invert, mobile Sheet |
| 2 | Hero | Svelte | `Hero.svelte` | Parallax + text reveal + live counter + magnetic CTA |
| 3 | Stats | Svelte | `StatsCounter.svelte` | 4 angka animated on viewport |
| 4 | Pillars (6) | Astro | section | Grid 3-col dengan gold accent line + inline SVG icons |
| 5 | Villa Types | Svelte | `VillaCard.svelte` (×3) | 3D tilt + spotlight + real images |
| 6 | Comparison | Svelte | `VillaComparison.svelte` | Tabs bits-ui, spec grid |
| 7 | How It Works | Svelte | `StickyScrollSection.svelte` | 5-step sticky scrollspy |
| 8 | Sahid Partnership | Astro | section | Real interior image + 4 stats |
| 9 | Passive Income | Astro | section | 3 cards cicilan vs income |
| 10 | Testimoni | Svelte | `TestimoniCarousel.svelte` | embla carousel autoplay |
| 11 | Final CTA | Astro | section | Dark overlay + real villa image bg |
| 12 | Footer | Astro | section | Links + bank + WA |
| 13 | FAB | Svelte | `FloatingActionButton.svelte` | 3 actions expandable |
| 14 | LiveActivity | Svelte | `LiveActivity.svelte` | Social proof pulse |

### 🏡 Villa Detail (`/villa/{bijak,idaman,mapan}`)
| # | Section | Type | Component | Key Features |
|---|---|---|---|---|
| 1 | Nav | Svelte | `NavMenu.svelte` | |
| 2 | Hero Gallery | Svelte | `VillaHero.svelte` | Image gallery + thumbs + badges |
| 3 | Specs Bar | Astro | section | 6 spec items dengan icon |
| 4 | Filosofi Vila | Astro | section | Narrative copy + 4 features list |
| 5 | Simulasi Cashflow | Astro | section | Cicilan vs Income vs Surplus |
| 6 | Other Villas | Astro | section | 2 cards CTA ke villa lain |
| 7 | Footer + FAB | mixed | | |

### 💰 Investasi Hub (`/investasi`)
- KPR Calculator interaktif (existing Svelte)
- Schema Bank + Developer detail

### 📍 Other Pages
- `/lokasi` — Google Maps embed
- `/resort` — 12 facilities Lucide icons
- `/kontak` — Bank accounts + 4-step process
- `/faq` — 22 Q&A Accordion bits-ui
- `/artikel` — 6 article cards
- `/kebijakan-privasi` & `/syarat-dan-ketentuan`

## 🎯 Out-of-the-Box Features Delivered

✅ **Mouse-follow parallax** di Hero (translate 3D, opacity fade on scroll)
✅ **3D tilt cards** di VillaCard (rotateX/Y on mouse, perspective 1200px)
✅ **Spotlight glow** di VillaCard (radial-gradient follow mouse)
✅ **Animated text reveal** di Hero (translateY per line, stagger 0.15s)
✅ **Sticky scrollspy** di StickyScrollSection (IntersectionObserver)
✅ **bits-ui Dialog** untuk booking modal
✅ **bits-ui Sheet** untuk mobile menu
✅ **embla-carousel** untuk testimoni (drag, autoplay, infinite loop)
✅ **Live counter** "X org melihat" dengan pulse animation
✅ **Live activity widget** rotating social proof
✅ **Magnetic CTA** dengan translate-on-hover
✅ **Expandable FAB** dengan 3 actions
✅ **Image gallery** dengan thumbnails + dots indicator
✅ **Vignette + film grain** SVG noise di Hero

## 🏗️ Build & Deploy

- **Build:** `cd app && npm run build` → 17 HTML files, dist/client/ + dist/server/entry.mjs
- **Static preview:** `cd app/dist/client && python3 -m http.server 8765`
- **Node serve:** `cd app && node ./dist/server/entry.mjs` (port 3000)
- **Deploy target:** IDCloudHost cPanel via Node.js selector (port 43210 etc)
- **Caveat:** astro.config.mjs has vite.resolve.alias for `@`, `@lib`, `@components`, `@data`

## 📊 Tracking & SEO

- `public/robots.txt` + `sitemap-index.xml` auto-generated
- Per-page `<title>` + `<meta description>` via BaseLayout props
- WhatsApp link tracking: `?text=...` + UTM source
- Hreflang: `id-ID` default
- Structured data: Schema.org JSON-LD per page type

## ✅ What's Working

- Build: `npm run build` ✅ 17 HTML files
- All Svelte islands: interactive (counter, tilt, parallax, carousel, dialog, sheet)
- 6 real images from ref site copied to `app/public/images/ref/`
- 14 pages rendered with light-mode design
- Mobile responsive (lg/md/sm breakpoints)
- Real-time data binding Svelte 5 runes ($state, $derived, $props)

