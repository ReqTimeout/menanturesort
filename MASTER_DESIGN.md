# 🎨 MASTER DESIGN — Menantu Resort

> **Dokumentasi design per-section** — panduan copywriting, FOMO triggers, asset requirements, dan flow storytelling.
> 
> Reference: Aman Resorts, Soho House, Six Senses, Auberge Resorts, Capella.
> Target: **premium hospitality** yang tidak pasaran, hyper-lokal Indonesia, hyper-target investor properti.

---

## 🎯 DESIGN PHILOSOPHY (Paling Penting)

**"Sebuah villa yang tidak Anda huni setiap hari, tapi terasa seperti pulang ke rumah."**

Brand personality: **Tenang, otoritatif, hangat, eksklusif.**

BUKAN: ceria, muriah, diskon-meriah, MLM, "ayo-yuk-gabung", jargon properti.

### 3 Prinsip Utama

1. **Restraint over abundance** — whitespace, gold accent 1-2px, satu typeface serif.
2. **Storytelling over selling** — setiap section adalah bab cerita, bukan daftar harga.
3. **Heritage over hype** — angka yang berbicara, bukan emoji meriah.

---

## 🎨 VISUAL LANGUAGE

### Color Usage Matrix

| Context | Color | Hex | Contoh |
|---|---|---|---|
| **Brand presence** | Forest Green | `#1B4332` | Navbar, footer, button primary, divider |
| **Depth / luxury** | Deep Green | `#0D1B14` | Hero bg, dark section, headline on light |
| **Mystery** | Almost Black | `#061009` | Border tipis, divider di dark section |
| **Glamour** | Gold | `#D4A574` | Headline italic, line accent, button secondary |
| **Lighter gold** | Sand | `#E8C896` | Background pattern, gradient highlight |
| **Calm** | Cream | `#F5F0E8` | Section bg terang, card body, form input |
| **Authority** | Ink | `#0D1B14` → `#7A8479` | Text hierarchy 4 level |
| **Action** | WhatsApp | `#25D366` | Floating button, WA link |

### Typography Hierarchy

| Level | Font | Size | Weight | Usage |
|---|---|---|---|---|
| **Hero** | Playfair Display | clamp(3.5rem, 9vw, 8rem) | 700 | Homepage hero H1 |
| **Display** | Playfair Display | clamp(2.5rem, 6vw, 5rem) | 700 | Section H2 |
| **Title** | Playfair Display | clamp(2rem, 4vw, 3.5rem) | 700 | Subsection H3 |
| **Heading** | Playfair Display | clamp(1.5rem, 3vw, 2.25rem) | 600 | Card title |
| **Quote** | Cormorant Garamond italic | 1.5rem | 400 | Tagline, testimonial |
| **Body lg** | Inter | 1.125rem | 400 | Paragraph penting |
| **Body** | Inter | 1rem | 400 | Default |
| **Eyebrow** | Inter | 0.6875rem (11px) | 600 | Section label, letter-spacing 0.3em uppercase |
| **Caption** | Inter | 0.75rem | 500 | Meta, tanggal, label kecil |

### Pairing yang WAJIB

- **Hero italic** + **body normal** → "Miliki Villa Impian" (italic) "di Bandung" (normal)
- **Number gold serif** + **caption uppercase** → "9-15 jt" (gold serif) "PASSIVE INCOME / BULAN" (caption)
- **Quote italic** + **attribution small** → Villa tagline pakai ini

---

## 📐 SECTION BREAKDOWN (HOMEPAGE FLOW)

### **SECTION 1: HERO — "Promise in 5 detik"**

**Background:** Foto drone aerial 360° (existing) dengan gradient dark-to-transparent overlay + vignette.
**Mood:** Golden hour Bandung, kabut tipis, 3 villa modern tropis, infinity pool.

**Copy hierarchy:**
```
EYEBROW: "INVESTASI VILLA BANDUNG · SHM · DIKELOLA SAHID"
H1: Miliki Villa Impian (italic) di Bandung.
    Bayar Rp 9 Juta/Bulan. (gold, italic)
SUB: Tidak perlu repot cari tamu. Tidak perlu pusing maintenance.
     Sahid Hotel & Resort (gold) yang urus semuanya.
     Anda terima passive income setiap bulan.
CTA1: Lihat Skema Investasi →
CTA2: 💬 Chat WhatsApp
TRUST BAR: 74 Unit, 58 Terjual  |  SHM, Bukan Sewa  |  Sahid 50+ Tahun  |  Cicilan 9-15 Juta
```

**Asset needed:** hero-aerial-1920.webp (existing) + WebP 1280/800, JPG fallback. Mobile version berbeda crop.

**Animation:** Svelte `HeroParallax.svelte` — translateY(0.4x scroll), opacity fade-out 0.3 minimum, scale 1.0002x. Subtle film grain 6% opacity. Vignette 60% center.

---

### **SECTION 2: STATS BAR — "Angka yang Tidak Bohong"**

**Background:** `#0D1B14` deep green, dengan gold accent line horizontal 1px top + bottom.
**Mood:** Confident, data-driven, premium like Bloomberg terminal.

**Copy:**
```
EYEBROW: ANGKA YANG TIDAK BOHONG
H2: Mengapa 58 Investor Sudah Memilih (italic) Menantu Resort
GRID 4:
  - 74     UNIT VILLA       (Counter animate 0→74)
  - 9-15jt PASSIVE INCOME   /BULAN
  - 15-30% CAPITAL GAIN     PROYEKSI 15 TAHUN
  - 50+    TAHUN            TRACK RECORD SAHID
```

**Asset needed:** none (typographic).
**Animation:** Svelte `Counter.svelte` Intersection Observer, ease-out-cubic 2000ms, tabular-nums.

---

### **SECTION 3: PROBLEM → PROMISE (Split Layout)**

**Background:** Left = dark green, right = cream. Sticky left, scrollable right.
**Mood:** Two-column newspaper — "before vs after", "fear vs relief".

**Copy LEFT (dark, sticky):**
```
EYEBROW: PUNYA VILLA IMPIAN TANPA PUSING KELOLA
H2: Kami Tahu
    Apa yang Anda Khawatirkan (italic)
SUB: Kebanyakan investor villa gagal bukan karena salah beli,
     tapi karena salah kelola. Kami selesaikan itu.
```

**Copy RIGHT (cream, scrollable cards):**
```
CARD 1 (PROBLEM, red border-left, white bg):
  ✗ Yang Biasa Terjadi
  ✗ Cari tamu sendiri, ribet
  ✗ Maintenance bocor, AC rusak — semua tanggung jawab Anda
  ✗ Okupansi rendah, income tidak konsisten
  ✗ Aset tidak jelas (Hak Pakai, bukan SHM)
  ✗ Developer kabur, garansi tidak jelas

CARD 2 (SOLUTION, gold border-left, dark green bg):
  ✓ Yang Anda Dapat di Menantu
  ✓ Tamu diurus profesional oleh tim Sahid
  ✓ Maintenance, housekeeping, operasional di-handle tim resort
  ✓ Okupansi ditarget 60-70% dengan marketing terintegrasi
  ✓ SHM atas nama pribadi, aset seumur hidup
  ✓ Developer PT Cipta Multikarya (15+ tahun track record)
```

**Asset needed:** none (typographic + icon ✗ ✓ minimal).
**Animation:** On-scroll fade-up with stagger 0.1s per list item.

---

### **SECTION 4: VILLA TYPES — "3 Pintu Masuk"**

**Background:** Cream `#F5F0E8` dengan subtle dot pattern.
**Mood:** Editorial magazine spread, 3 cards as besar feature, gold accent line top.

**Copy:**
```
EYEBROW: 3 TIPE VILLA · SHM · DIKELOLA SAHID
H2: Pilih Villa yang Sesuai (italic) Tujuan & Budget Anda
SUB: Semua villa berstatus SHM atas nama pribadi, fully furnished,
     dan dikelola profesional oleh Sahid Hotel & Resort.
```

**Per-card structure (8 elemen, top to bottom):**
1. Image 4:3 (villa-card-placeholder, real nanti)
2. Specs pill (top-right): 55 m² · 1 KT · 2 Lantai
3. "Best Value" gold badge (jika applicable)
4. Name (Playfair 1.75rem)
5. Tagline italic
6. Price (Playfair 2rem, primary color)
7. Income breakdown: Cicilan | Passive Income | Surplus (with checkmark)
8. "Cocok untuk: First-time investor, pasangan muda"
9. CTA: Lihat Detail | Chat WA

**Asset needed:** villa-card-placeholder.svg (existing) → replaced with real nanti.

**FOMO trigger:** "Tersisa X unit" badge jika applicable.

---

### **SECTION 5: ROI CHART — "Matematika yang Jujur"**

**Background:** `#0D1B14` deep green, dengan gold accent line.
**Mood:** Bloomberg-style data visualization, transparent & honest.

**Copy:**
```
EYEBROW: SIMULASI PASSIVE INCOME 15 TAHUN
H2: Income Menutup Cicilan.
    Capital Gain Menggandakan Aset. (italic)
SUB: Proyeksi dengan okupansi 50%, tarif Rp 2,2jt/malam.
     Asumsi edukatif, bukan jaminan.
```

**Chart elements:**
- 3 bar groups (Bijak, Idaman, Mapan)
- Per group: bar "Cicilan" (gold) vs bar "Income" (green-to-gold gradient)
- Footer per group: Surplus (+green) atau Defisit (-red)
- Total portfolio value at year 15 (bottom callout)

**Asset needed:** none (CSS bars).
**Animation:** Svelte `client:visible` width 0→full 1500ms ease-out-cubic stagger 200ms.

---

### **SECTION 6: TRUST / SAHID PARTNERSHIP — "Heritage Matters"**

**Background:** Cream dengan subtle pattern.
**Mood:** Library, established, decades of trust.

**Copy:**
```
EYEBROW: DIKELOLA OLEH SAHID HOTEL & RESORT
H2: 50+ Tahun Track Record.
    20+ Properti Aktif. (italic)
SUB: Dari Grand Sahid Jaya Jakarta hingga Sahid Resort Yogyakarta.
     Anda tidak investasi ke startup — Anda investasi ke operator
     yang sudah terbukti di industri hospitality Indonesia.
```

**Layout:** Logo grid 8 hotel Sahid (3 cols), timeline 50+ tahun (5 milestones), quote dari CEO/press release.

**Asset needed:** Sahid logo (placeholder, nanti), foto hotel-hotel Sahid (6 foto, nanti).

**FOMO trigger:** "Dipercaya oleh 20+ hotel bintang 4-5 di Indonesia".

---

### **SECTION 7: LOCATION — "Lokasi yang Bicara"**

**Background:** Dark green dengan maps overlay.
**Mood:** Treasure map, "exclusive but accessible".

**Copy:**
```
EYEBROW: CICALENGKA, BANDUNG TIMUR
H2: 3,5 Hektar Privat.
    45 Menit dari Gerbang Tol Cileunyi. (italic)
SUB: Udara sejuk pegunungan, view 360°, dikelilingi Curug Cinulang
     dan Gunung Masigit Kareumbi. Hidden gem, bukan overtourism.
```

**Layout:** Custom map illustration (atau Leaflet embed), 6 nearby destinations (Curug Cinulang, Gunung Masigit, dll), accessibility stats (jarak ke tol, stasiun, rumah sakit).

**Asset needed:** location-placeholder.svg (existing) → real aerial nanti.

**FOMO trigger:** "Bandung Timur naik 28% YoY. Yang masuk duluan, yang dapat."

---

### **SECTION 8: TESTIMONI — "Suara Sesama Investor"**

**Background:** Cream dengan gold accent.
**Mood:** Living room conversation, intimate, real.

**Copy:**
```
EYEBROW: DARI 58 INVESTOR KAMI
H2: Mereka Sudah Memutuskan. (italic)
     Anda?
```

**Layout:** 3 testimoni cards, monogram avatar (placeholder), quote italic, attribution (nama + pekerjaan + kota).

**Asset needed:** avatar-placeholder.svg (existing) → real nanti.

**Note:** testimoni real belum ada — gunakan quote FAKED yang kontekstual & disclaimer "testimoni representatif" atau ganti dengan logo 58 investor (jika ada list).

---

### **SECTION 9: FAQ TEASER — "Pertanyaan yang Biasa Ditanya"**

**Background:** Deep green.
**Mood:** Consultation table, advisor speaking.

**Copy:**
```
EYEBROW: SEBELUM ANDA MEMUTUSKAN
H2: 7 Pertanyaan Kritis (italic)
     yang Wajib Anda Tahu
```

**Layout:** 7 question cards dengan 1-line answer, link ke `/faq` untuk full page.

---

### **SECTION 10: FINAL CTA — "Last Push"**

**Background:** `#0D1B14` deep green dengan radial gold glow 60% center.
**Mood:** Urgent, exclusive, last call.

**Copy:**
```
URGENCY BADGE: ● PERHATIAN: HARGA NAIK Q3 2026
H2: 58 dari 74 unit sudah terjual.
    Sisa 16 unit. (gold, italic)
    Booking fee Rp 10 juta
    lock harga hari ini. (small)
CTA1: 💬 Chat WhatsApp Sekarang
CTA2: 📅 Jadwalkan Kunjungan
TRUST: ✅ Pembayaran ke rekening PT Cipta Multikarya Propertindo
       · Booking fee 100% refundable
```

**FOMO triggers stacked:**
- Scarcity: "Tersisa 16 dari 74 unit"
- Urgency: "Harga naik Q3 2026"
- Trust: "Booking fee 100% refundable"
- Risk reversal: "Lock harga hari ini"

---

## 🏠 VILLA DETAIL PAGE FLOW

Setiap villa detail (Bijak, Idaman, Mapan) mengikuti struktur identik:

1. **HERO** — Villa name + tagline italic + harga besar (gold) + CTA WA/Kunjungan
2. **SPECS BAR** — 6 specs (Lantai, KT, KM, LB, LT, SHM) dalam grid icon + number
3. **STORY** — "Kenapa Memilih Menantu X?" + keunggulan list (5 poin) + simulasi box
4. **GALLERY** — 6 foto placeholder, "Lihat Galeri Lengkap →"
5. **CTA** — Dark section dengan WA + Jadwalkan
6. **RELATED** — 2 villa lainnya

**FOMO micro-elements:**
- "Tersisa X unit dari 36" (real-time dari data)
- "Closing bulan ini" (kalau applicable)
- "Best Value" badge untuk Idaman

---

## 📊 INVESTASI PAGE FLOW (Phase 6)

### `/investasi` (Overview)
- Hero: "Pilih Skema Pembiayaan"
- 2 cards: KPR Bank (5%, 20thn) vs KPR Developer (7%, 15thn)
- Comparison table side-by-side
- FAQ inline

### `/investasi/simulasi-kpr` (Interactive Svelte)
- **Svelte 5 island** dengan 4 input sliders:
  - Tipe Villa (radio: Bijak/Idaman/Mapan)
  - DP % (slider 20-50%)
  - Tenor (slider 10-20 tahun)
  - Bunga % (slider 3-9%)
- Real-time output:
  - Cicilan / bulan
  - Total bayar
  - Total bunga
  - Passive income (50% okupansi)
  - Surplus / bulan (hijau/merah)
  - Break-even tahun
- Chart bar: Cicilan vs Income (animated)
- CTA: "Lihat Skema Ini di WhatsApp"

---

## 🗺️ LOKASI PAGE FLOW (Phase 4-5)

### `/lokasi`
- Hero: "Cicalengka, Bandung Timur"
- Interactive map (Leaflet + OpenStreetMap, GRATIS)
- Nearby destinations (6 cards dengan icon + jarak)
- Accessibility section (3 stats: Tol/Stasiun/RSUD)
- "Mengapa Bandung Timur" editorial

---

## 🏢 TENTANG PAGE FLOW (Phase 4-5)

### `/tentang/developer` (MK LAND)
- Hero: founder portrait
- Timeline 15 tahun
- Portfolio 6 proyek
- Visi 2034

### `/tentang/sahid-group`
- Heritage 50+ tahun
- 8 hotel portfolio (logo grid)
- Why Sahid matters (editorial)

---

## 🖼️ IMAGE GENERATION PRIORITY (Fase 7)

Sesuai `IMAGE_GENERATION_PROMPTS.md`, urutan generate:

**P0 (WAJIB, tanpa ini web tidak premium):**
1. Hero aerial variation 2 (golden hour) — 1 image
2. Villa exterior (3: Bijak, Idaman, Mapan) — 3 images
3. Interior (5: living, bedroom, bathroom, kitchen, dining) — 5 images
4. Facilities (3: pool, lounge, mosque) — 3 images
5. Location (2: Curug Cinulang, view Bandung Timur) — 2 images
6. OG image — 1 image

**P1 (Nice to have):**
7. Lifestyle (3: family, couple, work-from-villa) — 3 images
8. Testimonial avatars (3) — placeholder monogram dulu OK
9. Logo proper (3: Menantu, Sahid, MK LAND) — vector ideally
10. Pattern textures (1: subtle batik ethnic) — untuk background section

**Total: 25 images, ~$5-15 cost di Gemini Pro Image, atau GRATIS kalau pakai `gemini-2.5-flash-image`.**

---

## 🎯 COPY GUIDELINES RINGKAS

### Tone
- **Indonesia conversational**, bukan korporat
- Pakai "Anda" (bukan "kamu" / "aku")
- Hindari jargon property (DP, KPR, SHM → boleh tapi disertai penjelasan ringkas)
- Hindari emoji berlebihan (max 1-2 per section, BUKAN sebagai icon utama)
- Pakai kalimat pendek, impact-oriented

### Power Words (5 kategori)
- **Trust:** aman, pasti, terbukti, terjamin, tersertifikasi
- **Cashflow:** hemat, ringan, cukup, pas, masuk akal
- **Growth:** naik, berkembang, bertumbuh, apresiasi, kenaikan
- **Freedom:** bebas, otomatis, pasif, tidur nyenyak, jalan-jalan
- **Scarcity:** eksklusif, terbatas, privat, hanya untuk

### Anti-Power Words (HINDARI)
- "Murah", "Diskon", "Promo", "Spesial", "Limited time"
- "Ayo", "Yuk", "Gabung", "Daftar sekarang"
- "Cicilan 0%", "Gratis", "Cashback"

### Disclaimer Wajib
Setiap halaman yang menampilkan angka:
> "Seluruh angka passive income, capital gain, dan simulasi cicilan yang ditampilkan di website ini adalah ILUSTRASI EDUKATIF, bukan jaminan. Performa aktual tergantung pada kondisi pasar, tingkat okupansi, suku bunga, biaya operasional, dan faktor lain di luar kendali developer atau pengelola."

Footer:
> "Hati-hati penipuan mengatasnamakan Menantu Resort atau PT Cipta Multikarya Propertindo. Pembayaran SAH hanya melalui rekening resmi: BNI 511 202 178 9, BCA 139 651 666 8, BSI 725 363 305 5."

---

## 🏁 CHECKLIST PER PAGE

Setiap halaman baru WAJIB mengikuti checklist:
- [ ] Hero / Page header dengan eyebrow + H1 + sub
- [ ] Color palette: primary/secondary/accent dominan
- [ ] Typography: Playfair untuk H, Inter untuk body
- [ ] Setidaknya 1 section dengan dark bg (`section-dark` / `bg-primary-dark`)
- [ ] Setidaknya 1 section dengan cream bg (`section-cream`)
- [ ] Gold accent line / divider di section transition
- [ ] CTA primary + secondary di setip halaman
- [ ] Disclaimer angka (jika ada simulasi)
- [ ] Anti-fraud footer (kalau halaman keuangan)
- [ ] Mobile responsive (cek 320px, 768px, 1024px, 1440px)
- [ ] SEO: title, description, OG, schema.org
- [ ] Svelte island HANYA kalau perlu state/animation

---

*Last updated: 2026-06-14*
