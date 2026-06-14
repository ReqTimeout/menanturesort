# 🎯 MASTER PLAN — Menantu Resort Website

> **Dokumen utama project.** Di-update berdasarkan:
> - 5 PDF materi (pricelist, KPR bank, KPR developer, B2B presentation 81 pages, brochure)
> - Research notes di `RESEARCH_NOTES.md`
> - Realita server IDCloudHost (no SSH, LiteSpeed, static only)
> - Stack: **Astro 5 SSG + Svelte 5 + Tailwind 3**
> - Memory guideline: `CLAUDE.md`

---

## 📋 QUICK FACTS (dari PDF)

| Item | Data |
|---|---|
| **Brand** | Menantu Resort managed by Sahid Hotel & Resort |
| **Concept** | Green Ethnic Eco Resort — Invest Resort, Nature, Retire, Freedom |
| **Lokasi** | Jl. Curug Cinulang, Tenjolaya, Kec. Cicalengka, Kab. Bandung, Jawa Barat |
| **Luas Kawasan** | 3,5 hektar |
| **Developer** | PT Cipta Multikarya Propertindo (brand: MK LAND) |
| **Founder** | Taufik Yudha Perdana S.TP M.Si (15+ tahun pengalaman) |
| **Manager** | Sahid Hotel & Resort (50+ tahun, 20+ properti aktif) |
| **Visi Developer** | Top 10 property developer nasional 2034 |
| **Harga** | Bijak Rp 1,2 M · Idaman Rp 1,6 M · Mapan Rp 2 M |
| **Unit** | Bijak 36 unit (downslope) · Idaman 36 unit (upslope) · Mapan 2 unit (premium) = 74 total |
| **Booking Fee** | Rp 10 juta (refundable 30 hari, sudah termasuk harga) |
| **Reservasi** | Rp 5 juta (refundable) |
| **DP Min** | 30% (Rp 360jt / 480jt / 600jt) |
| **Cicilan 5 thn (DP 30%)** | Rp 21jt / 28jt / 35jt per bulan (flat) |
| **KPR Bank** | Bunga flat 5%, tenor 15-20 thn |
| **KPR Developer** | Bunga flat 7%, tenor 15 thn, tanpa BI Checking |
| **Passive Income** | 8% p.a. (2 tahun pertama), max 9% p.a. (contoh Mapan: Rp 224jt/tahun = Rp 18jt/bulan) |
| **Profit Share Owner** | 70% (dari net revenue, setelah operasional 20%) |
| **Capital Gain** | 15-30% dalam 15 tahun |
| **Status** | SHM (Sertifikat Hak Milik) atas nama investor |
| **Biaya Tambahan** | Notaris + PPN 12% + BPHTB + PPH + AJB + BN SHM + Asuransi = Rp 30-50 juta |
| **Kelebihan Tanah** | Rp 3,5jt/meter |
| **Rekening Resmi** | BNI 511 202 178 9 · BCA 139 651 666 8 · BSI 725 363 305 5 (a.n. PT Cipta Multikarya Propertindo) |
| **Social** | Instagram @menanturesort · Web www.menanturesort.id |
| **Kontak WA** | 6281234567890 (dummy, ganti dengan nomor asli nanti) |

## 🏖️ FASILITAS (dari PDF)

**Public Area:** Eco Resort · Mosque · Playground · Jogging Track · Fitness Center · Food Court · Golf · Tennis

**Public Services:** Infinity Pool · Ballroom · Meeting Room · Restaurant · Charging Station · Cafe & Lounge · 360° Views

**Smart Home + 24/7 Security + Private Access + Fully Furnished**

## 🌳 WISATA & FASILITAS SEKITAR

- **Curug Cinulang** (air terjun, signature location)
- **Gunung Masigit Kareumbi** (gunung)
- **Wisata Air Karinding**
- **Bukit Teletubbies Cicalengka**
- **Cicalengka Dreamland**
- **Taman Renang Alam Nagreg**
- **Stasiun Cicalengka** (KAI)
- **RSUD Cicalengka**
- **Gerbang Tol Cileunyi**
- **PT KAHATEX, PT Tirta Fresindo Jaya Mayora** (industri sekitar = target corporate tenant)

## 🏢 PORTOFOLIO MK LAND (track record)

- Pakuhaji Highland Eco-Resort (Ngamprah, Bandung Barat) — Founder project
- Townhouse Firdaus Garden
- Kinyono Regency
- Grand Cimahi City
- Cilame Living Garden
- **Menantu Resort managed by Sahid** (flagship investment)

## 🏨 PORTOFOLIO SAHID (manager, 50+ tahun)

- Grand Sahid Jaya Jakarta (5-star icon)
- Sahid Resort & Convention Yogyakarta
- Sahid Serpong (BSD)
- Sahid Hotel Skyland City Jatinangor
- Grand Sahid Jaya Solo
- Sahid Prince Solo
- Sahid Batam Hotel & Convention
- Sahid Raya Hotel & Convention Yogyakarta
- + 12 lainnya (total 20+ aktif)

## 🎯 4 KEY USP (dari PDF "WHY MENANTU RESORT")

1. **SHM** — Status legal tertinggi (bukan Hak Pakai)
2. **Dikelola SAHID** — Branding & operational hotel profesional
3. **Tangible Asset** — Aset nyata, bukan janji spekulatif
4. **Brand Ownership** — Villa atas nama investor

## 🎯 TARGET MARKET (dari PDF)

- Wisatawan Domestik
- Wisatawan Mancanegara
- Korporasi & komunitas (PT KAHATEX, Mayora, dll)
- Perpindahan dari hotel ke villa (work from anywhere, family stay)

---

## 🚀 PHASE PLAN (Comprehensive)

### ✅ PHASE 1: Foundation & Setup [DONE]
- [x] Astro 5 + Svelte 5 + Tailwind 3 init
- [x] Design tokens (colors, fonts, spacing, animations)
- [x] TypeScript strict + path aliases
- [x] Sitemap plugin
- [x] Folder structure (astro/svelte components, data, lib)
- [x] nanobanana-skill installed (image gen via Gemini)
- [x] pypdf installed (PDF research)
- [x] Memory file `CLAUDE.md`
- [x] Research notes `RESEARCH_NOTES.md`

### ✅ PHASE 2: Design System [DONE]
- [x] BaseLayout dengan SEO, schema.org, GA injection
- [x] Navbar (responsive + scroll)
- [x] Footer (disclaimer + anti-fraud + bank accounts)
- [x] WhatsAppFloating (pulse animation)
- [x] OrganizationSchema + ProductSchema + FAQPage schema
- [x] global.css (component layer Tailwind)

### ✅ PHASE 3: Static Pages [DONE]
- [x] Homepage (premium rebuild dengan hero parallax, stats counter, villa cards premium, chart, final CTA)
- [x] Villa listing + 3 detail pages (Bijak, Idaman, Mapan)
- [x] FAQ (19 Q&A, accordion, schema)
- [x] 404 page
- [x] Syarat & Ketentuan
- [x] Kebijakan Privasi
- [x] robots.txt
- [x] 360° viewer (improved dengan tab switcher)

### 🔄 PHASE 4: Premium Polish (CURRENT — IN PROGRESS)
**Status: Started, perlu improve lebih lanjut**
- [x] Hero dengan foto drone asli + parallax Svelte
- [x] Stats counter animated Svelte
- [x] Villa card premium dengan gold accent line
- [x] Chart section dengan animated bars
- [x] Final CTA dengan urgency badge
- [ ] **Villa detail pages** — redesign dengan floor plan, gallery, virtual tour
- [ ] **Lokasi page** — Leaflet map, nearby places
- [ ] **Sahid partnership page** — 20+ hotel portfolio, timeline
- [ ] **Tentang** — developer (MK LAND) + manager (Sahid) + visi-misi
- [ ] **Galeri** — photo grid + lightbox
- [ ] **Kontak** — form + map + WhatsApp
- [ ] **Testimoni section improvement**

### 📊 PHASE 5: Investasi Pages (Interactive)
- [ ] `/investasi` — overview KPR Bank vs Developer comparison
- [ ] `/investasi/simulasi-kpr` — **INTERACTIVE KPR Calculator Svelte island**
  - Real-time calculation: price, DP, tenor, bunga
  - Output: cicilan, passive income, surplus, break-even
  - Chart per tipe villa (Bijak/Idaman/Mapan)
- [ ] `/investasi/skema-bank` — detail KPR Bank
- [ ] `/investasi/skema-developer` — detail KPR Developer
- [ ] `/investasi/passive-income` — ROI calculator + breakdown 70/30 profit share

### 📝 PHASE 6: Content (SEO Articles)
- [ ] Setup Content Collection di Astro (`src/content/artikel/`)
- [ ] 5+ artikel SEO (sesuai content calendar):
  - "7 Alasan Investasi Villa di Bandung Timur 2026"
  - "Simulasi KPR Villa: Cicilan vs Passive Income"
  - "Villa SHM vs Hak Pakai: Mana yang Lebih Aman?"
  - "Dikelola Sahid: Strategi Passive Income Villa"
  - "Capital Gain Properti Bandung 2026-2040"
- [ ] Article layout dengan table of contents
- [ ] Schema Article
- [ ] Internal linking ke villa/investasi

### 🖼️ PHASE 7: Image Generation (via nanobanana)
- [ ] User set `GEMINI_API_KEY` di `~/.nanobanana.env`
- [ ] Generate 25 image sesuai `IMAGE_GENERATION_PROMPTS.md`:
  - 3 hero variations
  - 3 villa exteriors (Bijak, Idaman, Mapan)
  - 5 interior shots
  - 5 facilities
  - 2 location (Bandung Timur aerial, Curug Cinulang)
  - 3 lifestyle
  - 1 OG image
  - 3 testimonial avatars (kalau ada foto asli)
- [ ] Post-process: convert ke WebP (multi-size 1920/1024/640)
- [ ] Replace placeholder SVG dengan image asli
- [ ] Logo proper (Menantu, Sahid, MK LAND) — generate atau dapat dari client

### 🚀 PHASE 8: Deploy & Optimization
- [ ] Generate static (`npm run build`) → `dist/`
- [ ] Buat `.htaccess` untuk LiteSpeed:
  - HTTPS redirect
  - Cache static assets (1 year)
  - Gzip compression
  - 404 fallback ke `/404.html`
- [ ] Performance audit:
  - Lighthouse score target 95+ mobile
  - Core Web Vitals (LCP < 2s, CLS < 0.1, FID < 50ms)
  - Image optimization check
- [ ] SEO final check:
  - Sitemap submitted ke Google Search Console
  - robots.txt verified
  - Schema.org validated di Google Rich Results
  - Meta tags per page
- [ ] Tracking setup:
  - GA4 Property ID
  - GTM Container ID
  - Facebook Pixel (opsional)
  - Custom events: whatsapp_click, form_submit, simulator_use
- [ ] **DEPLOY ke IDCloudHost:**
  - Login cPanel (port 2083)
  - Upload `dist/` ke `public_html/` via File Manager
  - Setup SSL Let's Encrypt
  - Konfigurasi Cloudflare (opsional)

### 📈 PHASE 9: Post-Launch
- [ ] Monitor GA4 real-time
- [ ] Submit sitemap ke Google Search Console
- [ ] Setup UptimeRobot (free)
- [ ] Create Google Business Profile
- [ ] Content calendar jalan (2 artikel baru per bulan)
- [ ] Backlink building (portal properti)
- [ ] A/B testing hero headline

---

## 🏗️ SITE STRUCTURE (Final)

```
menantu-resort.com/
├── /                              Homepage (premium)
├── /villa                         Listing 3 tipe
│   ├── /villa/bijak               Detail
│   ├── /villa/idaman              Detail (Best Value)
│   └── /villa/mapan               Detail (Flagship)
├── /investasi                     Overview KPR
│   ├── /investasi/simulasi-kpr    Interactive calculator
│   ├── /investasi/skema-bank      KPR Bank detail
│   ├── /investasi/skema-developer KPR Developer detail
│   └── /investasi/passive-income  ROI calculator
├── /resort                        Konsep resort
│   ├── /resort/fasilitas          8 public + 7 services
│   ├── /resort/managed-by-sahid   20+ Sahid portfolio
│   └── /resort/green-eco-concept  Green Ethnic concept
├── /lokasi                        Maps + nearby
│   ├── /lokasi/peta               Leaflet interactive
│   └── /lokasi/wisata-sekitar     6 wisata
├── /tentang
│   ├── /tentang/developer         MK LAND portfolio + founder
│   └── /tentang/sahid-group       Sahid history + hotels
├── /artikel                       Blog SEO (15+)
│   ├── /artikel/[slug]
│   └── /artikel/kategori/[kategori]
├── /galeri                        Photo + 360° tour
├── /kontak                        Form + map + WhatsApp
├── /faq                           19 Q&A
├── /404
├── /sitemap.xml
└── /robots.txt
```

**Total: ~25+ halaman** (termasuk 15+ artikel)

---

## 📁 FILE STRUCTURE PROJECT

```
menantu-resort.com/
├── CLAUDE.md                     # Memory & guidelines (WAJIB baca)
├── MASTER_PLAN.md                # Dokumen ini
├── RESEARCH_NOTES.md             # Extract dari 5 PDF
├── DESIGN_PLAN_ASTRO_SSG.md      # Design plan v1
├── IMAGE_GENERATION_PROMPTS.md   # 25 prompt siap
├── PREVIEW_LOCALLY.md            # Panduan preview
├── preview.sh                    # Script preview
├── .env.nanobanana.example       # Template API key
│
├── 360/                          # 360° viewer (existing, improved)
│   ├── index.html
│   ├── menantu.jpg (raw)
│   ├── menantu2.jpg (raw)
│   └── web/ (WebP compressed, multi-size)
│
├── images/                       # Aset (raw + processed + placeholders)
│   ├── raw/
│   ├── hero/webp/ + jpg/
│   ├── villa/webp/ + jpg/
│   ├── interior/, facilities/, location/, lifestyle/, og/
│   ├── testimonial/, icons/, logo/, patterns/
│   └── placeholders/svg/
│
└── app/                          # Astro project
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── tsconfig.json
    ├── package.json
    ├── public/                    # Static served
    │   ├── favicon.svg
    │   ├── images/
    │   │   ├── hero/ (3 sizes WebP + JPG dari drone)
    │   │   ├── placeholders/ (5 SVG)
    │   │   └── ...
    │   └── ...
    ├── src/
    │   ├── components/
    │   │   ├── astro/  (Logo, Navbar, Footer, WhatsAppFloating, Hero, StatsBar, VillaCard)
    │   │   ├── svelte/ (Counter, HeroParallax)
    │   │   └── seo/    (OrganizationSchema, ProductSchema)
    │   ├── layouts/BaseLayout.astro
    │   ├── pages/      (index, faq, 404, syarat, kebijakan, robots, villa/*)
    │   ├── data/       (site.json, villa.json, faq.json)
    │   ├── lib/        (format, kpr, seo)
    │   ├── styles/global.css
    │   └── env.d.ts
    └── dist/                     # Build output
```

---

## 🎯 TONE OF VOICE & COPY GUIDELINES

### Bahasa
- **Indonesia conversational**, bukan korporat
- Pakai "Anda" (bukan "kamu")
- Hindari jargon property yang membingungkan
- Hindari emoji berlebihan (max 1-2 per section)

### Power Words
- Aman, pasti, terbukti (trust)
- Hemat, ringan, cukup (cashflow)
- Naik, berkembang, bertumbuh (capital gain)
- Bebas, otomatis, pasif (passive income)
- Eksklusif, terbatas, privat (scarcity)
- Sekarang, hari ini, jangan tunda (urgency)

### Story Arc Setiap Section
1. **Hook** — provokasi/picture situation
2. **Problem** — apa yang investor khawatirkan
3. **Promise** — apa yang Menantu selesaikan
4. **Proof** — data/bukti/testimoni
5. **CTA** — apa下一步 yang harus diambil

### FOMO Triggers (rotate 5)
1. **Scarcity** — "Tersisa 16 dari 74 unit"
2. **Urgency** — "Harga naik Q3 2026. Booking fee lock harga hari ini"
3. **Social proof** — "12 investor sudah closing bulan ini"
4. **Exclusivity** — "Lokasi private, akses terbatas"
5. **Loss aversion** — "Bandung Timur naik 28% YoY. Yang masuk duluan, yang dapat"

### Disclaimer Wajib (setiap angka)
> "Seluruh angka passive income, capital gain, dan simulasi cicilan yang ditampilkan di website ini adalah ILUSTRASI EDUKATIF, bukan jaminan. Performa aktual tergantung pada kondisi pasar, tingkat okupansi, suku bunga, biaya operasional, dan faktor lain di luar kendali developer atau pengelola."

### Anti-Fraud Warning
> "Hati-hati penipuan mengatasnamakan Menantu Resort atau PT Cipta Multikarya Propertindo. Pembayaran SAH hanya melalui rekening resmi: BNI 511 202 178 9, BCA 139 651 666 8, BSI 725 363 305 5."

---

## 🎨 DESIGN SYSTEM RECAP

### Color Palette
- `primary` `#1B4332` Forest Green
- `primary-dark` `#0D1B14` Deep Green
- `secondary` `#D4A574` Gold/Sand
- `accent` `#F5F0E8` Warm Cream
- `whatsapp` `#25D366`
- `text` `#2D3436`

### Typography
- **Display:** Playfair Display 700, italic 400 (clamp 2.5-5rem)
- **Body:** Inter 400/500/600 (16-18px)
- **Quote:** Cormorant Garamond italic

### Spacing
- Container max 1200px
- Section padding 120-140px desktop, 80px mobile
- Component gap 24-32px

### Premium Design Rules
1. **Dramatic typography** — font size 4-5x kontras
2. **Cinematic feel** — parallax hero, vignette, film grain
3. **Gold accent line** — 1-3px gold border top
4. **Sharp corners** untuk button premium
5. **Backdrop blur** untuk glassmorphism
6. **Scroll-triggered animation**
7. **Hover lift dramatic** (-8px + shadow)
8. **No card utility Tailwind default** — selalu custom

---

## 🔑 KEY DECISIONS & NOTES

### Kenapa Astro SSG, bukan SvelteKit?
- Server IDCloudHost shared, no SSH, no Node runtime
- Astro SSG menghasilkan HTML statis yang tinggal di-upload
- Svelte islands untuk komponen interaktif (hanya di-hydrate saat perlu)

### Kenapa Svelte 5, bukan 4?
- Svelte 5 sudah stabil dengan runes (`$state`, `$derived`, `$props`)
- Lebih clean untuk komponen reaktif
- Bundle lebih kecil

### Image Strategy
- Foto drone 360° existing dipakai untuk hero (sudah di-compress)
- Sisanya placeholder SVG + planned generate via nanobanana
- WebP dengan JPEG fallback untuk browser lama
- Multi-size untuk responsive (srcset)

### WhatsApp Integration
- Nomor dummy dulu, ganti dengan nomor asli nanti
- Tracking via `data-source` attribute
- Auto pre-filled message

---

## ✅ NEXT IMMEDIATE STEPS

1. **Setup GEMINI_API_KEY** untuk nanobanana
2. **Generate image batch 1** (hero + 3 villa exteriors)
3. **Build villa detail premium** dengan gallery + floor plan
4. **Lokasi page** dengan Leaflet
5. **KPR Calculator** (Svelte island, interaktif)
6. **Generate batch 2** (interior + facilities)
7. **Setup form backend** (Formspree/Web3Forms)
8. **Deploy ke IDCloudHost**
9. **Post-launch monitoring**

---

*Last updated: 2026-06-14 · Phase 4 in progress*
