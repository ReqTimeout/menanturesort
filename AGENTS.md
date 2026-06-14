# Menantu Resort — Project Memory & Guidelines

> **WAJIB DIBACA setiap awal sesi baru.** Memory utama project untuk konsistensi.

## 🎯 Project Identity

- **Nama:** Menantu Resort managed by Sahid
- **Domain:** menantu-resort.com
- **Hosting:** IDCloudHost shared (LiteSpeed + cPanel) — IP 103.63.24.139
- **Akses:** cPanel (port 2083) + FTP (port 21). **Tidak ada SSH** (port 22 refused — confirmed)
- **Tipe:** Villa produktif eco-resort 3,5 Ha di Cicalengka, Bandung Timur
- **Developer:** PT Cipta Multikarya Propertindo (brand: MK LAND)
- **Manager:** Sahid Hotel & Resort (50+ tahun)
- **Harga:** Rp 1,2 M (Bijak) / 1,6 M (Idaman) / 2 M (Mapan)
- **Status:** SHM, bukan Hak Pakai
- **Rekening resmi:** BNI 511 202 178 9, BCA 139 651 666 8, BSI 725 363 305 5

## 🛠️ Stack (WAJIB konsisten)

| Layer | Tech | Catatan |
|---|---|---|
| Framework | **Astro 5** (static + Node adapter hybrid) | `output: 'static'`, `adapter: node({ mode: 'standalone' })` |
| UI Interaktif | **Svelte 5** (runes) | Hanya untuk komponen yang perlu state/animation |
| Styling | **Tailwind CSS 3** | Custom theme di `tailwind.config.mjs` |
| Adapter | **@astrojs/node** (standalone) | Output: `dist/client/` (static) + `dist/server/entry.mjs` (Node) |
| TypeScript | Strict mode | Path aliases `@/`, `@components/`, `@lib/`, `@data/` |
| Plugin | `@astrojs/sitemap` | Auto-generate sitemap |
| Image Gen | **nanobanana-skill** (Gemini 3.1 Flash) | Butuh `GEMINI_API_KEY` di `~/.nanobanana.env` |

## 📁 Folder Structure

```
menantu-resort.com/
├── app/                         # Astro project
│   ├── src/
│   │   ├── components/
│   │   │   ├── astro/           # Server-rendered (.astro)
│   │   │   ├── svelte/          # Interactive islands (.svelte)
│   │   │   └── seo/             # Schema.org JSON-LD
│   │   ├── layouts/BaseLayout.astro
│   │   ├── pages/               # File-based routing
│   │   ├── data/                # Static JSON (site, villa, faq)
│   │   ├── lib/                 # Helper (format, kpr, seo)
│   │   └── styles/global.css    # Premium design system + legacy aliases
│   ├── public/                  # Static assets served as-is
│   │   ├── favicon.svg
│   │   └── images/
│   │       ├── hero/            # Drone 360° (4 sizes: 800/1280/1920, webp+jpg)
│   │       ├── villa/           # TBD — generate via nanobanana
│   │       ├── interior/        # TBD
│   │       ├── facilities/      # TBD
│   │       ├── location/        # TBD
│   │       ├── lifestyle/       # TBD
│   │       ├── og/              # OG image
│   │       └── placeholders/    # SVG fallback
│   ├── dist/                    # Build output
│   ├── astro.config.mjs         # Node adapter config
│   ├── tailwind.config.mjs      # Design tokens
│   └── package.json
├── 360/                         # 360° viewer existing (compressed)
├── DEPLOY.md                    # Step-by-step cPanel Node.js selector
├── IMAGE_GENERATION_PROMPTS.md  # 25 prompt siap pakai
├── MASTER_PLAN.md               # Site structure, copy guidelines, data real
├── MASTER_DESIGN.md             # Per-section breakdown, FOMO, storytelling
├── PREVIEW_LOCALLY.md           # Panduan preview
├── preview.sh                   # Local preview script
└── AGENTS.md                    # File ini
```

## 🎨 Brand & Design System (FINAL)

### Color Palette
- `primary` `#1B4332` (Forest Green) — dominan, branding
- `primary-dark` `#0D1B14` (Deep Green) — bg dark, hero
- `primary-deeper` `#061009` (Almost Black) — accent dark
- `secondary` `#D4A574` (Gold/Sand) — CTA, accent, divider
- `secondary-dark` `#A8845C` (Darker gold) — hover
- `accent` `#F5F0E8` (Warm Cream) — bg terang, section
- `ink` `#0D1B14` `#3D4A40` `#7A8479` `#B8BDB5` — text scale
- `whatsapp` `#25D366` — WA button

### Typography
- **Display (H1-H2):** Playfair Display 700, italic 400 untuk accent
- **Body:** Inter 400/500/600
- **Quote:** Cormorant Garamond italic
- **Mono:** JetBrains Mono (untuk nomor rekening, kode)

### Spacing
- Container max 1440px (extended 1200px content)
- Section padding 7-9rem desktop, 5rem mobile
- Component gap 24-32px

### Design Rules (PENTING — user complain "standart")

1. **Dramatic typography** — font size kontras 4-5x antar section (clamp 2.5-5rem)
2. **Cinematic feel** — parallax hero, vignette, film grain (Svelte HeroParallax)
3. **Gold accent line** — 1-3px gold border top card (auto via `.card::before`)
4. **Sharp corners** (radius 0 default) — premium feel
5. **Backdrop blur** — glassmorphism (`.btn-outline-light`, navbar scrolled)
6. **Scroll-triggered** — Intersection Observer (Svelte Counter `client:visible`)
7. **Hover lift dramatic** — translateY(-4 to -8px) + shadow
8. **No gray** — semua text pakai `ink-soft` / `ink-mute`, BUKAN `text-gray-500`
9. **No card utility default** — always `.card` premium (sharp corner + gold line)
10. **No emoji as primary icon** di section premium (boleh di CTA inline)

## ⚙️ Svelte 5 Convention (WAJIB)

```svelte
<script>
  let { propName = default } = $props();
  let state = $state(initial);
  let derived = $derived(computed);
</script>
```

- **Gunakan runes** (`$state`, `$derived`, `$props`, `$effect`) — Svelte 5
- **JANGAN TypeScript `:` annotation di `.svelte`** — runtime error
- **JANGAN `export let`** (deprecated, pakai `$props()`)
- `client:visible` untuk animasi scroll, `client:load` untuk above-fold

## 🚀 Development Workflow

1. Edit komponen di `app/src/components/`
2. Edit data di `app/src/data/*.json`
3. Test build: `cd app && npm run build`
4. Test Node server: `npm run serve` (port 3000)
5. Verify output: `app/dist/client/` (HTML) + `app/dist/server/entry.mjs`

## 🚀 Deployment Workflow (IDCloudHost cPanel)

- **Tidak ada SSH** — pakai cPanel File Manager / FTP / Git version control
- **Runtime:** Node.js via cPanel "Setup Node.js App" → entry point `dist/server/entry.mjs`
- **Static fallback:** `dist/client/*` bisa di-host langsung di `public_html/` (untuk `output: 'static'` page)
- **Lihat `DEPLOY.md`** untuk step-by-step

## ⚠️ Yang TIDAK Boleh Dilakukan

- ❌ JANGAN pakai `export let` di Svelte
- ❌ JANGAN pakai TypeScript `:` annotation di `.svelte` runtime
- ❌ JANGAN hardcode nomor WhatsApp (pakai `siteData.contact.whatsapp`)
- ❌ JANGAN pakai `text-gray-XXX` Tailwind default — pakai `ink-soft` / `ink-mute`
- ❌ JANGAN pakai `bg-white shadow rounded` — pakai `.card` premium
- ❌ JANGAN coba SSH ke server (port 22 closed) — pakai cPanel
- ❌ JANGAN push file `id_rsa*` ke Git — sudah di-ignore di `.gitignore`

## 📋 Current Phase (per 2026-06-14)

- ✅ **Phase 1-3:** Project setup + design system + static pages
- ✅ **Phase 4 partial:** Homepage premium + villa detail (legacy alias fixed)
- 🔄 **Phase 5 CURRENT:** Asset generation + Node deployment prep
- ⏳ **Phase 6:** Investasi pages (simulasi-kpr interactive)
- ⏳ **Phase 7:** Image generation via nanobanana (perlu API key)
- ⏳ **Phase 8:** Deploy to IDCloudHost via cPanel Node.js selector

## 🔗 Key Files Reference

- `MASTER_PLAN.md` — 9-phase plan, site structure
- `MASTER_DESIGN.md` — per-section breakdown, FOMO triggers, storytelling
- `IMAGE_GENERATION_PROMPTS.md` — 25 prompt siap pakai
- `app/tailwind.config.mjs` — design tokens
- `app/src/styles/global.css` — design system + legacy aliases
- `app/src/data/site.json` — kontak, bank, stats
- `app/src/data/villa.json` — tipe villa + simulasi
- `app/astro.config.mjs` — Node adapter config
- `DEPLOY.md` — cPanel deployment guide (coming soon)

## 💡 Saat User Kembali di Sesi Baru

1. **Baca `AGENTS.md` dulu** untuk recap stack & guideline
2. **Cek `dist/`** untuk status build terakhir
3. **Cek `app/src/styles/global.css`** untuk design system terbaru
4. **Lihat `MASTER_PLAN.md` + `MASTER_DESIGN.md`** untuk fase
5. **Tanya user** apa yang mau lanjut (tapi dengan konteks)
6. **Jangan rebuild dari nol** — selalu extend existing

---

*Memory ini di-update setiap ada perubahan besar. Last updated: 2026-06-14*
