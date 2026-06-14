# DESIGN PLAN — Menantu Resort (Astro SSG + Svelte)

**Domain:** menantu-resort.com
**Stack:** Astro 4 SSG + Svelte islands + Tailwind CSS + LiteSpeed shared hosting
**Tujuan:** Lead generation (WhatsApp + Form) & SEO dominance
**Target:** Investor properti villa premium Bandung Timur
**Versi:** 2.0 (Premium rebuild — copywriting storytelling FOMO + detail per section)

---

## 1. RINGKASAN EKSEKUTIF

### 1.1 Produk & Positioning

**Menantu Resort managed by Sahid** — villa produktif eco-resort 3,5 hektar di Cicalengka, Bandung Timur. Bukan sekadar villa liburan, tapi **aset produktif** yang:
- Memberikan **passive income** (simulasi 9% p.a.)
- Naik nilai **capital gain** (simulasi 15-30% dalam 15 tahun)
- Dikelola **Sahid Hotel & Resort** (50+ tahun track record)
- Status **SHM** (aset milik penuh, bukan sewa)
- Mulai **Rp1,2 Miliar** (terjangkau untuk first investor)

### 1.2 Unique Selling Points (urutan kekuatan persuasi)

1. **Cicilan tertutup passive income** — bukti di homepage, surplus Rp194rb-417rb/bulan
2. **SHM + Developer bereputasi** — bukan investasi abal-abal
3. **Dikelola Sahid 50+ tahun** — bukan developer kemarin sore
4. **Subsidi 36 bulan** — cashflow ringan di awal kepemilikan
5. **Capital gain 15 tahun** — 1,5x-2x lipat dari harga beli
6. **Lokasi Cicalengka, Bandung Timur** — masih emerging, bukan yang sudah成熟

### 1.3 Stack & Arsitektur

- **Astro 4** SSG → HTML statis, Lighthouse 95+
- **Svelte islands** → interaktif (KPR calc, slider, form) hanya di komponen yang butuh
- **Tailwind CSS** → utility-first, file kecil
- **LiteSpeed shared hosting** (IDCloudHost) → cukup untuk static
- **Deploy:** `npm run build` → zip `dist/` → upload ke cPanel File Manager

---

## 2. ASET VISUAL — STRATEGI GENERATE & PLACEHOLDER

### 2.1 Klasifikasi Aset

| Kategori | Aset | Status | Sumber |
|---|---|---|---|
| **Generate (imagegen)** | Hero villa eksterior 3 view | Wajib | imagegen |
| | Villa Bijak exterior + interior | Wajib | imagegen |
| | Villa Idaman exterior + interior | Wajib | imagegen |
| | Villa Mapan exterior + interior | Wajib | imagegen |
| | Pool area, garden, lounge | Wajib | imagegen |
| | Restaurant/cafe ambience | Wajib | imagegen |
| | Sunrise/sunset aerial Bandung Timur | Wajib | imagegen |
| | Lifestyle: keluarga, couple, WFC | Wajib | imagegen |
| | Curug Cinulang (wisata sekitar) | Wajib | imagegen |
| | OG image (1200x630) | Wajib | imagegen |
| **Placeholder (teks/numerik)** | 360° equirectangular | Coming soon | Client拍摄 |
| | Drone footage video | Coming soon | Client拍摄 |
| | Foto pembangunan real | Coming soon | Client拍摄 |
| | Foto tim sales | Placeholder | Silhouette + initial |
| | Foto investor testimoni | Placeholder | Initials + kutipan |
| **Real/Existing** | Logo Sahid (jika diizinkan) | Real | Dari client |
| | Logo Menantu Resort | Real/Generate | Generate + refine |
| | Logo developer (PT Cipta) | Real/Placeholder | Dari client |
| **External** | Peta lokasi | Leaflet+OSM | Free tile |
| | Map embed fallback | Google Maps iframe | Free (no API) |

### 2.2 Image Generation Specs

**Style guide konsisten untuk semua foto generate:**
- **Mood:** warm, golden hour (jam 6 pagi atau 5 sore), suasana tropis premium
- **Color grading:** deep green + warm gold + cream — match brand palette
- **Composition:** rule of thirds, leading lines, dramatic perspective
- **People:** opsional, candid lifestyle, diverse
- **Aspect ratios:**
  - Hero: 1920x1080 (16:9)
  - Villa card: 800x600 (4:3)
  - Interior: 1200x800 (3:2)
  - OG image: 1200x630 (1.91:1)
  - Testimonial avatar: 400x400 (1:1)
  - Gallery: 1200x800

**Naming convention:**
```
/images/
├── hero/
│   ├── hero-home-1.webp
│   ├── hero-home-2.webp
│   └── hero-home-3.webp
├── villa/
│   ├── bijak-exterior.webp
│   ├── bijak-interior-living.webp
│   ├── bijak-interior-bedroom.webp
│   ├── idaman-exterior.webp
│   ├── idaman-interior-living.webp
│   ├── idaman-interior-bedroom.webp
│   ├── mapan-exterior.webp
│   ├── mapan-interior-living.webp
│   └── mapan-interior-master.webp
├── facilities/
│   ├── pool.webp
│   ├── restaurant.webp
│   ├── garden.webp
│   ├── lounge.webp
│   └── spa.webp
├── location/
│   ├── curug-cinulang.webp
│   ├── bandung-timur-aerial.webp
│   └── map-illustration.webp
└── og-image.webp
```

### 2.3 Placeholder Strategy (untuk 360° & aset yang belum ada)

**360° Virtual Tour:**
- Tombol "Virtual Tour 360°" dengan badge "Coming Soon"
- Fallback: photo grid 12 foto villa + lightbox
- Tanda: ikon kamera 360 + teks "Segera hadir"

**Foto Investor Tim:**
- Silhouette SVG + inisial nama di lingkaran warna brand
- Style: monogram avatar (AB, CD, dst), bg gradient green-to-gold

**Foto Testimoni Asli:**
- Pakai inisial + kutipan
- Style: avatar monogram + bintang rating
- Real foto nanti replace saat dapat izin

---

## 3. COPYWRITING FRAMEWORK — STORYTELLING FOMO

### 3.1 Prinsip Storytelling

Setiap section mengikuti pola:
1. **Hook** — provokasi/picture situation
2. **Problem** — apa yang investor khawatirkan
3. **Promise** — apa yang Menantu selesaikan
4. **Proof** — data/bukti/testimoni
5. **CTA** — apa下一步 yang harus diambil

### 3.2 Prinsip FOMO (Fear of Missing Out)

Pakai 5 pemicu FOMO secara bergantian:

1. **Scarcity** — "Tersisa 18 dari 74 unit"
2. **Urgency** — "Harga naik Q3 2026. Booking fee lock harga hari ini"
3. **Social proof** — "12 investor sudah closing bulan ini"
4. **Exclusivity** — "Lokasi private, akses terbatas"
5. **Loss aversion** — "Bandung Timur naik 28% YoY. Yang masuk duluan, yang dapat"

### 3.3 Tone of Voice

- **Elegan tapi aksesibel** — pakai bahasa sehari-hari, bukan korporat
- **Konsultan, bukan salesman** — "Saya bantu hitung", bukan "ayo beli"
- **Data-driven** — angka, bukan janji
- **Empati** — akui kekhawatiran investor (DP besar, takut stuck, dll)
- **Bahasa:** Bahasa Indonesia conversational, hindari jargon property

### 3.4 Power Words (gunakan berulang)

- **Aman, pasti, terbukti** (bangun trust)
- **Hemat, ringan, cukup** (soal cashflow)
- **Naik, berkembang, bertumbuh** (soal capital gain)
- **Bebas, otomatis, pasif** (soal passive income)
- **Eksklusif, terbatas, privat** (scarcity)
- **Sekarang, hari ini, jangan tunda** (urgency)

---

## 4. DETAIL SECTION HOMEPAGE (10 SECTION)

### 4.1 SECTION 1: HERO — "3 Detik Pertama Menentukan"

**Visual:**
- Full-screen image/video villa di golden hour, 1920x1080
- Overlay gradient bottom-to-top: transparent → rgba(13,27,20,0.7)
- Logo Menantu Resort di top-left (sticky)
- WhatsApp icon di top-right (sticky)

**Copy (Indonesian):**

```
[Eyebrow - kecil, gold color]
INVESTASI VILLA BANDUNG · SHM · DIKELOLA SAHID

[Headline - 56-72px Playfair Display Bold]
Miliki Villa Impian di Bandung.
Bayar Rp 9 Juta/Bulan.
Dikelola Profesional. Income Masuk Otomatis.

[Subhead - 18-20px Inter Regular, max 600px]
Tidak perlu repot cari tamu. Tidak perlu pusing maintenance.
Sahid Hotel & Resort (50+ tahun) yang urus semuanya.
Anda terima passive income setiap bulan.

[Dual CTA]
[ Lihat Skema Investasi ]   [ 💬 Chat WhatsApp ]

[Trust bar di bawah, scroll horizontal]
✅ 74 Unit, 58 Terjual   ✅ SHM, Bukan Sewa   ✅ Sahid 50+ Tahun
✅ Cicilan 9-15 Juta   ✅ Passive Income 9% p.a.   ✅ Lokasi Bandung Timur
```

**CTA Hierarchy:**
- Primary: "Lihat Skema Investasi" → scroll ke section 4 (Tipe Villa)
- Secondary: "Chat WhatsApp" → trigger WA dengan pre-filled message
- Tertiary: di trust bar tidak ada CTA, hanya social proof

**Animation:**
- Headline fade-in + slide-up (0.6s ease-out)
- CTA buttons stagger 0.1s
- Background: subtle ken-burns effect (scale 1.0 → 1.05 dalam 20s loop)
- Trust bar: marquee scroll dari kanan ke kiri (30s)

---

### 4.2 SECTION 2: STATS BAR — "Angka Tidak Pernah Berbohong"

**Visual:**
- Background: deep green (#0D1B14) full-width
- 4 counter box dalam satu baris
- Counter animasi saat di-scroll
- Icon gold untuk setiap stat

**Copy:**

```
[Section title - 32px]
Mengapa 58 Investor Sudah Memilih Menantu Resort

[Stats - 4 kolom, 2 baris di mobile]
📦 74 Unit
   Total Villa, Terbatas

💰 9-15 Juta
   Passive Income / Bulan

📈 15-30%
   Capital Gain / 15 Tahun

🏆 50+ Tahun
   Track Record Sahid
```

**Animasi:**
- Counter naik dari 0 ke target (2s ease-out, trigger saat 50% visible)
- Icon scale 0.8 → 1.0 (bounce)
- Background: subtle gradient animation

**Mobile:**
- 2x2 grid
- Font lebih kecil (40px counter)

---

### 4.3 SECTION 3: PROBLEM → PROMISE — "Kami Tahu Apa yang Anda Khawatirkan"

**Visual:**
- Background: warm cream (#F5F0E8)
- 2 kolom: kiri "Khawatiran", kanan "Menantu"
- Icon X merah untuk khawatiran, icon ✓ hijau untuk solusi

**Copy:**

```
[Headline - 40px]
Punya Vila Impian Tanpa Pusing Kelola.

[Subhead]
Kebanyakan investor villa gagal bukan karena salah beli,
tapi karena salah kelola. Kami selesaikan itu.

[Kolom kiri - "Yang Biasa Terjadi"]
✗ Cari tamu sendiri, ribet
✗ Maintenance bocor, AC rusak, taman rapi — semua tanggung jawab Anda
✗ Okupansi rendah, income tidak konsisten
✗ Aset tidak jelas statusnya (Hak Pakai, bukan SHM)
✗ Developer kabur, garansi tidak jelas

[Kolom kanan - "Yang Anda Dapat di Menantu"]
✓ Tamu diurus profesional oleh tim Sahid
✓ Semua maintenance, housekeeping, dan operasional di-handle tim resort
✓ Okupansi ditarget 60-70% dengan strategi marketing terintegrasi
✓ SHM atas nama pribadi, aset seumur hidup
✓ Developer PT Cipta Multikarya (15+ tahun track record)
```

**CTA:**
- Button: "Penasaran? Lihat Skema Lengkap →" (scroll ke section investasi)

**Animasi:**
- Fade-in dari kiri (khawatiran) dan kanan (solusi) saat di-scroll
- Stagger 0.1s per item

---

### 4.4 SECTION 4: TIPE VILLA — "Pilih Villa yang Sesuai Budget Anda"

**Visual:**
- Background: white
- 3 kartu side-by-side (stack di mobile)
- Hover: lift + shadow
- Best-value badge di tengah (Idaman)

**Copy per tipe:**

```
[Kartu 1 - BIJAK]
[Image: Villa kecil modern, compact tapi elegan]

Menantu Bijak
"Mulai dari First Investor"

📐 55 m² LB · 60 m² LT · 1 Kamar Tidur · 1-2 Lantai

💰 Rp 1,2 Miliar
   Booking fee Rp 10 juta (lock harga)

📊 Simulasi:
   Cicilan: Rp 9,7 juta/bulan
   Passive Income: Rp 9,75 juta/bulan
   Surplus: +Rp 28 ribu/bulan
   → Cicilan tertutup! 🎉

   Capital Gain 15 th: Rp 1,7-2,7 M

Cocok untuk: First-time investor, pasangan muda

[ Lihat Detail ]  [ Chat WA ]

---

[Kartu 2 - IDAMAN - Best Value badge]
[Image: Villa 2 lantai, balcony dengan view]

Menantu Idaman
"Standar Keluarga Indonesia"

⭐ BEST VALUE

📐 65 m² LB · 77 m² LT · 2 Kamar Tidur · 2-3 Lantai

💰 Rp 1,6 Miliar

📊 Simulasi:
   Cicilan: Rp 11,67 juta/bulan
   Passive Income: Rp 12 juta/bulan
   Surplus: +Rp 333 ribu/bulan

   Capital Gain 15 th: Rp 2,2-3,3 M

Cocok untuk: Keluarga, investasi jangka menengah

[ Lihat Detail ]  [ Chat WA ]

---

[Kartu 3 - MAPAN]
[Image: Villa 3 lantai mewah, premium finish]

Menantu Mapan
"Premium Living, Income Tertinggi"

📐 90 m² LB · 88 m² LT · 3 Kamar Tidur · 3 Lantai

💰 Rp 2 Miliar

📊 Simulasi:
   Cicilan: Rp 14,58 juta/bulan
   Passive Income: Rp 15 juta/bulan
   Surplus: +Rp 417 ribu/bulan

   Capital Gain 15 th: Rp 2,7-4,2 M

Cocok untuk: Premium investor, multiple properties

[ Lihat Detail ]  [ Chat WA ]
```

**CTA:**
- "Lihat Detail" → buka halaman detail villa
- "Chat WA" → pre-filled dengan nama tipe

**Animasi:**
- Cards fade-in-up stagger 0.15s
- Hover: scale 1.02, shadow increase

---

### 4.5 SECTION 5: PASSIVE INCOME CHART — "Cicilan Anda, Ditutup Income Anda"

**Visual:**
- Background: gradient green tua → cream
- Bar chart animated (Chart.js) — Cicilan vs Income
- 3 toggle: Bijak / Idaman / Mapan
- Real-time recalculate

**Copy:**

```
[Headline - 40px]
Bayangkan: Villa Anda Membayar Cicilannya Sendiri.

[Subhead]
Okupansi 50%, tarif Rp 2,2 juta/malam.
Cicilan 15 tahun ke bank/developer.
Income yang masuk dari villa:
Cukup. Untuk. Menutup. Cicilan.

[Interactive chart]
Bijak:    ████████ Cicilan 9,72jt   ████████ Income 9,75jt   +28rb
Idaman:   ████████████ Cicilan 11,67jt  ████████████ Income 12jt   +333rb
Mapan:    ██████████████ Cicilan 14,58jt  ████████████████ Income 15jt   +417rb

[Tab interaktif: klik untuk lihat simulasi per tipe]
[ Bijak ]  [ Idaman ]  [ Mapan ]

[Highlight box]
"Artinya, dari hari pertama villa selesai dibangun,
cicilan KPR Anda sudah ada yang bayar. Anda tidak keluar uang lagi."

[Disclaimer kecil]
*Simulasi berdasarkan okupansi 50% & tarif Rp 2,2jt/malam.
Performa aktual dapat bervariasi.

[CTA]
[ Hitung Sendiri di Simulator → ]
```

**Animasi:**
- Bar chart draw animation 1.2s ease-in-out
- Tab switch: crossfade content
- Surplus number: count-up animation

---

### 4.6 SECTION 6: SIMULATOR CTA — "Coba Hitung Potensi Returns Anda"

**Visual:**
- Background: white dengan ilustrasi abstract gold geometric
- Mini calculator preview (non-functional, decorative)
- Big bold CTA button

**Copy:**

```
[Headline - 48px]
Berapa Passive Income Anda?
Hitung dalam 60 detik.

[Subhead - 18px]
Masukkan budget, DP, dan tipe villa.
Lihat simulasi cicilan, income, dan surplus.
Gratis, tanpa registrasi.

[Calculator preview - decorative, interactive di /investasi/simulasi-kpr]
[Big button]
[ 🚀 Buka Simulator Lengkap ]
```

---

### 4.7 SECTION 7: SAHID PARTNERSHIP — "Di Balik Nama Besar, Ada Standar Tinggi"

**Visual:**
- 2 kolom: kiri foto/logo Sahid + deskripsi, kanan foto resort
- Quote dari CEO Sahid atau sertifikat partnership
- Background: cream dengan subtle pattern

**Copy:**

```
[Headline]
Dikelola oleh Sahid.
Standar yang Tidak Bisa Ditiru Developer Lain.

[Kolom kiri - teks]
PT Sahid International Hotels Group mengelola puluhan hotel
bintang 4-5 di Indonesia selama lebih dari 50 tahun.
Standar layanan, jaringan distribusi, dan operational excellence
mereka yang akan mengelola villa Anda.

→ Tim housekeeping terlatih
→ Marketing terintegrasi (OTA + direct)
→ Maintenance berkala terjadwal
→ Laporan income bulanan transparan
→ Target okupansi 60-70% (rata-rata resort bintang 4)

[Kolom kanan - foto resort + quote]
"Sahid berkomitmen mengembangkan destinasi wisata premium
yang sustainable di Indonesia. Menantu Resort adalah
bukti nyata dari visi tersebut."

— SDM Sahid Hotel & Resort
```

---

### 4.8 SECTION 8: LOKASI — "Lokasi yang Akan Naik 3x Lipat"

**Visual:**
- Background: peta ilustrasi (custom generated) area Bandung Timur
- Marker: resort, curug, gunung, universitas, tol
- Click marker untuk popup info

**Copy:**

```
[Headline]
Cicalengka, Bandung Timur.
The Next Investment Hotspot.

[Subhead - data driven]
Bandung Timur naik 28% YoY (data Q1 2026).
Tol Cisumdawu sudah operasional — akses dari Jakarta 2 jam.
Kawasan ini belum saturated seperti Lembang/Setiabudi.

[Dekat dengan:]
📍 10 menit ke Curug Cinulang
📍 25 menit ke Universitas Pendidikan Indonesia (UNIPI)
📍 35 menit ke Gerbang Tol Cileunyi
📍 45 menit ke Pusat Kota Bandung

[Map interaktif - Leaflet + OpenStreetMap]
[Tombol: Lihat Peta Lengkap →]
```

---

### 4.9 SECTION 9: TESTIMONIAL — "Apa Kata Mereka yang Sudah Memesan"

**Visual:**
- 3 kartu testimoni dalam slider (Swiper)
- Avatar monogram (placeholder, nanti ganti foto asli)
- Rating bintang gold
- Background: cream

**Copy:**

```
[Headline]
"Bagi Saya, Menantu Resort adalah Passive Income
Paling Realistis yang Pernah Saya Lihat."

[Testimoni 1 - inisial AB]
⭐⭐⭐⭐⭐
"Saya hitung manual, dan benar — cicilan KPR bisa tertutup
oleh income villa. Belum lagi capital gain 15 tahun.
Saya ambil 2 unit: satu untuk income, satu untuk tabungan
anak."
— AB, 42 tahun, Investor Properti Jakarta

[Testimoni 2 - inisial CD]
⭐⭐⭐⭐⭐
"Saya pernah punya villa di Puncak, tapi repotnya minta ampun.
Cari tamu, maintenance, semuanya sendiri. Di Menantu, semua
diurus Sahid. Saya terima laporan bulanan, transfer income.
Simpel."
— CD, 38 tahun, Dokter

[Testimoni 3 - inisial EF]
⭐⭐⭐⭐⭐
"Lokasinya yang bikin saya jatuh cinta. Bandung Timur masih
segar, belum dibangun mall atau hotel besar. Potensi kenaikan
harga masih panjang. Saya locking 2 unit Idaman."
— EF, 45 tahun, Pengusaha
```

**Catatan:** Ini testimoni placeholder. Sebelum launch, ganti dengan testimoni asli dari client (dengan izin).

---

### 4.10 SECTION 10: FINAL CTA + URGENCY — "Jangan Tunda. Unit Tidak Tunggu."

**Visual:**
- Background: deep green dengan gold accent
- Countdown timer ke "kenaikan harga Q3 2026"
- Big bold headline
- Dual CTA: WhatsApp + Form

**Copy:**

```
[Eyebrow - merah/urgency]
⚠️ PERHATIAN: HARGA NAIK Q3 2026

[Headline - 56px]
58 dari 74 unit sudah terjual.
Sisa 16 unit.
Booking fee Rp 10 juta lock harga hari ini.

[Countdown timer]
Harga naik dalam: 47 hari : 12 jam : 33 menit

[Dual CTA]
[ 💬 Chat WhatsApp Sekarang ]
   "Halo, saya tertarik booking unit Menantu Resort"

[ 📅 Jadwalkan Kunjungan ke Lokasi ]
   "Saya ingin lihat lokasi & show unit"

[Final trust]
✅ Konsultasi gratis, tidak ada kewajiban
✅ Booking fee 100% refundable jika batal
✅ Pembayaran hanya ke rekening PT Cipta Multikarya Propertindo
```

**Disclaimer wajib di section ini:**
"Simulasi investasi bukan jaminan. Performa aktual dapat bervariasi sesuai kondisi pasar, okupansi, dan suku bunga. Semua angka di website ini adalah ilustrasi edukatif."

---

## 5. HALAMAN VILLA DETAIL (Template per Tipe)

### 5.1 Struktur Halaman

```
1. HERO (60vh)
   - Image eksterior tipe
   - Headline: "Menantu [Tipe] — [Tagline]"
   - Price badge: "Mulai Rp X Miliar"
   - Quick specs bar

2. SPECS BAR
   🏠 Lantai | 🛏️ KT | 🚿 KM | 📐 LB | 📏 LT | 📄 SHM

3. TABS (Svelte island)
   - Deskripsi
   - Spesifikasi Detail
   - Simulasi Cicilan & Income
   - Galeri Foto
   - Virtual Tour 360° (coming soon)

4. DESKRIPSI TAB
   - Storytelling tipe (siapa cocok, lifestyle, kenapa pilih tipe ini)
   - Material & finishing
   - Layout floor plan (gambar ilustrasi)

5. SPESIFIKASI TAB
   - Table detail: pondasi, struktur, dinding, lantai, plafond, dll

6. SIMULASI TAB
   - Embedded KPR calculator (Svelte)
   - Output: cicilan, income, surplus, capital gain

7. GALERI TAB
   - Grid foto 8-12 gambar
   - Lightbox on click
   - "Virtual Tour 360°" badge (coming soon)

8. CTA SECTION
   - "Tertarik dengan [Tipe]?"
   - WhatsApp pre-filled: "Saya tertarik dengan Menantu [Tipe]"
   - Form jadwalkan kunjungan

9. RELATED
   - Card 2 tipe lainnya

10. FAQ SPESIFIK TIPE
    - Accordion: 4-6 Q&A
```

### 5.2 Copy Per Tipe (Storytelling)

**BIJAK (1 Kamar, 1-2 Lantai):**
```
Headline: "Menantu Bijak — Pintu Masuk Anda ke Dunia Properti Premium."

Subhead: "Compact. Strategis. Cashflow positif dari bulan pertama.
Villa 55m² ini dirancang untuk first-time investor yang ingin
memulai portofolio properti dengan risiko terukur."

Cocok untuk: Pasangan muda, profesional 25-35 tahun,
yang baru pertama kali investasi properti.

Kenapa Bijak:
✓ Entry ticket paling terjangkau (mulai Rp 1,2 M)
✓ Cicilan ringan, 9,7 juta/bulan
✓ Passive income surplus positif (meski tipis)
✓ Cocok disewakan sebagai honeymoon villa / WFC retreat
```

**IDAMAN (2 Kamar, 2-3 Lantai):**
```
Headline: "Menantu Idaman — Standar Keluarga, Income Mengalir."

Subhead: "Sweet spot antara harga, luas, dan income.
2 kamar tidur, 65m² living space — dirancang untuk memenuhi
standar kenyamanan keluarga Indonesia modern dan menghasilkan
passive income yang menutup cicilan dengan surplus signifikan."

Cocok untuk: Keluarga muda, investor menengah,
yang mencari keseimbangan lifestyle & return.

Kenapa Idaman:
✓ Best value (rekomendasi kami untuk first-time buyer)
✓ 2 KT cukup untuk family stay atau double occupancy
✓ Surplus +Rp 333rb/bulan — cashflow positif
✓ Capital gain tertinggi per-Rupiah diinvestasi
```

**MAPAN (3 Kamar, 3 Lantai):**
```
Headline: "Menantu Mapan — Untuk Mereka yang Tidak Puas dengan 'Cukup'."

Subhead: "Villa flagship kami. 90m², 3 lantai, 3 kamar tidur,
2 bathroom. Untuk investor premium yang memahami bahwa
properti adalah wealth preservation, bukan sekadar tempat
tinggal."

Cocok untuk: Investor premium, multi-property owner,
high net worth individual.

Kenapa Mapan:
✓ Income tertinggi (Rp 15 juta/bulan)
✓ Master suite di lantai 3 dengan view 360°
✓ Cocok untuk keluarga besar atau corporate rental
✓ Capital gain tertinggi (Rp 2,7-4,2 M dalam 15 tahun)
```

---

## 6. HALAMAN SIMULASI KPR

### 6.1 Struktur

```
1. HEADLINE
   "Hitung Potensi Passive Income Anda"

2. TAB PILIH SKEMA
   [ KPR Bank ]  [ KPR Developer ]  [ Perbandingan ]

3. INPUT SECTION
   - Dropdown: Tipe Villa (Bijak/Idaman/Mapan)
   - Slider: DP% (30-50%)
   - Slider: Tenor (10-20 tahun)
   - Input: Bunga % (default 5%)

4. OUTPUT REAL-TIME
   - Cicilan/bulan (besar, gold)
   - Total DP
   - Total subsidi 36 bulan
   - Passive income estimasi
   - Surplus/deficit (hijau/merah)
   - Break-even point (tahun ke-)

5. CHART
   - Bar chart: Cicilan vs Income
   - Line chart: Proyeksi 15 tahun (cicilan kumulatif vs income kumulatif)

6. CTA
   - "Hasil Anda menarik? Diskusi dengan tim kami."
   - WhatsApp + Form

7. DISCLAIMER
   "Simulasi edukatif. Angka aktual dapat berbeda."
```

---

## 7. HALAMAN LAIN (Ringkas)

### 7.1 /resort
- Konsep Green Ethnic Eco Resort
- Foto resort facilities (pool, garden, restaurant, lounge)
- Differentiation vs villa biasa

### 7.2 /resort/managed-by-sahid
- Profil Sahid Group
- Track record 50+ tahun
- List hotel/properti Sahid
- Partnership commitment

### 7.3 /lokasi
- Peta interaktif (Leaflet)
- Akses dari Jakarta/Bandung
- Wisata sekitar (Curug Cinulang, dll)
- Properti tetangga yang sudah ada

### 7.4 /kontak
- Form konsultasi
- Alamat lengkap
- WhatsApp button
- Jam operasional sales

### 7.5 /faq
- 15-20 Q&A (SHM, KPR, passive income, legal, dsb)
- Accordion (Svelte)
- Schema.org FAQPage otomatis

### 7.6 /artikel (Blog)
- 15+ artikel SEO (sesuai content calendar)
- Schema.org Article
- Internal linking ke halaman villa/investasi

---

## 8. COPYWRITING ASSETS — BANK KALIMAT

### 8.1 Headline Variants (untuk A/B test)

**H1 (Conversion-focused):**
- "Miliki Villa Impian di Bandung. Bayar Rp 9 Juta/Bulan."
- "Passive Income Rp 15 Juta/Bulan. Tanpa Kelola. Tanpa Pusing."
- "Cicilan Tertutup Income. Villa SHM Mulai Rp 1,2 Miliar."

**H2 (Trust-focused):**
- "58 Investor Sudah Memesan. Sisa 16 Unit Lagi."
- "Dikelola Sahid 50+ Tahun. Standar yang Tidak Bisa Ditiru."
- "SHM, Bukan Sewa. Aset Anda Seumur Hidup."

**H3 (FOMO-focused):**
- "Harga Naik Q3 2026. Booking Fee Rp 10 Juta Lock Harga."
- "Bandung Timur Naik 28% YoY. Masuk Duluan, Untung Duluan."
- "Tersisa 16 dari 74 Unit. Jangan Sampai Ketinggalan."

### 8.2 CTA Variants

**Primary (langsung):**
- "Lihat Skema Investasi"
- "Chat WhatsApp"
- "Hitung Passive Income Anda"
- "Booking Unit Sekarang"

**Secondary (halus):**
- "Pelajari Lebih Lanjut"
- "Lihat Detail Villa"
- "Download Brosur PDF"
- "Jadwalkan Kunjungan"

**Tertiary (low-pressure):**
- "Lihat Galeri"
- "Baca Testimoni"
- "Pelajari FAQ"

### 8.3 Objection Handlers (FAQ Copy)

```
Q: "Apa bedanya KPR Bank vs KPR Developer?"
A: "KPR Bank: bunga flat 5%, tenor sampai 20 tahun, Anda terikat bank.
   KPR Developer: bunga flat 7%, tenor 15 tahun, cicilan langsung ke
   developer, lebih fleksibel dan tidak butuh BI Checking.
   Keduanya punya kelebihan — coba hitung di simulator kami."

Q: "Kalau okupansi turun, gimana?"
A: "Risiko okupansi ada di semua bisnis sewa. Mitigasi kami:
   1) Marketing terintegrasi (OTA + direct + corporate),
   2) Target 60-70% (rata-rata resort bintang 4),
   3) Tim profesional yang sudah 50+ tahun di industri ini.
   Plus, cicilan Anda tetap harus dibayar — jadi ini bukan passive
   100%. Tapi secara historis, resort yang dikelola profesional
   punya track record okupansi yang lebih baik."

Q: "Apa jaminan Sahid tidak bubar?"
A: "Sahid International Hotels Group berdiri sejak 1973, 50+ tahun.
   Saat ini mengelola puluhan hotel bintang 4-5 di Indonesia.
   Mereka bukan startup — mereka legacy. Itu salah satu alasan
   kami bermitra dengan mereka."

Q: "Bisa lihat unitnya dulu?"
A: "Tentu. Kami jadwalkan kunjungan ke lokasi dan show unit.
   Chat WhatsApp kami untuk atur jadwal."
```

---

## 9. ANIMATION & INTERACTION SPEC

### 9.1 Page Load (Homepage)
- Hero image: fade-in 0.4s, subtle ken-burns loop
- Headline: fade-in + slide-up (0.6s, 0.2s delay)
- Subhead: fade-in (0.4s, 0.4s delay)
- CTAs: stagger 0.1s
- Trust bar: marquee scroll (30s loop, dari kanan)

### 9.2 Scroll Triggers (Intersection Observer, threshold 0.2)
- Stats counter: count-up 2s ease-out
- Section headlines: fade-in + slide-up 0.6s
- Cards: stagger 0.1s, fade-in + slide-up
- Charts: draw animation 1.2s
- Images: blur-up placeholder → actual image

### 9.3 Hover States
- Cards: scale 1.02, shadow increase, transition 0.3s
- Buttons: scale 1.05, color shift, transition 0.2s
- Nav links: underline slide-in dari kiri
- Image gallery: zoom overlay dengan caption

### 9.4 Floating Elements
- WhatsApp button: pulse animation 3s loop
- Tooltip: "Chat Sales Expert" auto-hide 5s
- Scroll-to-top button: appears after 300px scroll

### 9.5 Form Interactions
- Input focus: border gold, label float-up
- Submit: button "Mengirim..." dengan spinner
- Success: redirect ke WhatsApp pre-filled dengan data form
- Error: inline message merah, no alert

---

## 10. BACKGROUND VISUAL PER SECTION

| Section | Background | Treatment |
|---|---|---|
| Hero | Image villa golden hour | Gradient overlay dark bottom |
| Stats | Deep green #0D1B14 | Solid, text putih |
| Problem/Promise | Cream #F5F0E8 | Solid, 2-column |
| Tipe Villa | White | Subtle pattern geometric gold samar |
| Passive Income Chart | Gradient green → cream | Soft transition |
| Simulator CTA | White + gold geometric | Decorative SVG di sudut |
| Sahid Partnership | Cream + pattern | 2-column image + text |
| Lokasi | Map illustration full | Marker pin style |
| Testimoni | Cream dengan quote marks besar | Subtle texture |
| Final CTA | Deep green | Gold accent, countdown prominent |
| Footer | Dark #0D1B14 | Solid |

---

## 11. HIRARKI CTA (PRIORITAS)

### Homepage CTA Flow:
1. **Hero Primary:** "Lihat Skema Investasi" → scroll ke Tipe Villa
2. **Hero Secondary:** "Chat WhatsApp" → langsung ke WA
3. **Tipe Villa Card:** "Lihat Detail" per villa
4. **Simulator CTA:** "Buka Simulator Lengkap" → /investasi/simulasi-kpr
5. **Final CTA:** "Chat WhatsApp" + "Jadwalkan Kunjungan"

### Conversion Funnel:
```
Awareness: Hero, Stats, Problem→Promise
Interest: Tipe Villa, Passive Income Chart
Consideration: Simulator, Sahid, Lokasi
Decision: Testimoni, Final CTA
Action: WhatsApp, Form, Booking
```

---

## 12. TRUST SIGNALS (Taruh di Seluruh Halaman)

- ✅ "Pembayaran hanya ke rekening resmi PT Cipta Multikarya Propertindo"
- ✅ "SHM atas nama pribadi, bukan developer"
- ✅ "Bekerja sama dengan bank BCA, BNI, BSI, Mandiri"
- ✅ "Sahid Group: 50+ tahun track record"
- ✅ "Booking fee 100% refundable"
- ✅ "Konsultasi gratis, tidak ada pressure"
- ✅ "Tim sales berpengalaman, bukan MLM"

---

## 13. LEGAL & COMPLIANCE COPY

### 13.1 Disclaimer Wajib (Footer + section tertentu)
```
DISCLAIMER:
Seluruh angka passive income, capital gain, dan simulasi cicilan
yang ditampilkan di website ini adalah ILUSTRASI EDUKATIF,
bukan jaminan. Performa aktual tergantung pada kondisi pasar,
tingkat okupansi, suku bunga, biaya operasional, dan faktor lain
di luar kendali developer atau pengelola.

Persetujuan KPR dan skema pembayaran tunduk pada kebijakan
bank atau lembaga pembiayaan masing-masing. Harga dapat
berubah sewaktu-waktu sesuai kebijakan perusahaan.
```

### 13.2 Anti-Fraud Warning (Footer)
```
⚠️ PERINGATAN PENIPUAN:
Hati-hati penipuan mengatasnamakan Menantu Resort atau
PT Cipta Multikarya Propertindo. Pembayaran SAH hanya melalui
rekening resmi:
- BNI: 511 202 178 9
- BCA: 139 651 666 8
- BSI: 725 363 305 5
a.n. PT Cipta Multikarya Propertindo.
```

---

## 14. PERFORMANCE & SEO

### 14.1 Core Web Vitals Target
| Metric | Target |
|---|---|
| LCP | < 2.0s |
| FID | < 50ms |
| CLS | < 0.05 |
| Lighthouse Mobile | 95+ |
| Page Size (HTML+CSS+JS) | < 500KB |
| Total JS per page | < 100KB |

### 14.2 SEO
- Auto-generate sitemap.xml
- Auto-generate robots.txt
- JSON-LD: Organization, Product+Offer, FAQPage, BreadcrumbList, Article
- Meta tags per halaman (title, desc, OG, Twitter Card)
- Internal linking antar halaman villa, investasi, blog
- Schema validator test sebelum launch

---

## 15. DEPLOYMENT KE IDCloudHost

(Lihat section 10 dari dokumen v1 — workflow sama)

**Ringkas:**
1. `npm run build` → `dist/`
2. Zip `dist/` → upload ke cPanel File Manager → extract di `public_html/`
3. Setup `.htaccess` (HTTPS, cache, gzip)
4. Aktifkan SSL Let's Encrypt
5. Optional: Cloudflare CDN

---

## 16. LANGKAH SELANJUTNYA (REVISI v2)

1. **Generate aset foto** via imagegen — batch 20-30 foto (villa, interior, lifestyle, location)
2. **Setup Astro project** dengan Tailwind + Svelte
3. **Buat BaseLayout** dengan SEO helper + tracking
4. **Migrasi style.css → tailwind.config.mjs** (warna, font, spacing)
5. **Pecah main.js → Svelte components** (Calculator, Slider, dll)
6. **Bangun halaman** sesuai Section 4-7 (copywriting sudah ada)
7. **Generate OG image** + favicon
8. **Setup form backend** (Formspree/Web3Forms)
9. **Test lokal** — Lighthouse, mobile, accessibility
10. **Build & deploy** ke IDCloudHost

---

*Dokumen v2: detailing per section + copywriting FOMO storytelling + strategi aset. Siap untuk eksekusi.*
