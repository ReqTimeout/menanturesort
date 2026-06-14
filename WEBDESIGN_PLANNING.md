# WEB DESIGN PLANNING — Menantu Resort

## A. DESIGN SYSTEM

### A.1 Color Palette

```
Primary:   #1B4332  ████████  (Forest Green)
Secondary: #D4A574  ████████  (Gold/Sand)
Accent:    #F5F0E8  ████████  (Warm Cream)
Dark:      #0D1B14  ████████  (Deep Green)
White:     #FFFFFF  ████████
Text:      #2D3436  ████████  (Charcoal)
Gray-100:  #F8F9FA  ████████
Gray-200:  #E9ECEF  ████████
Gray-300:  #DEE2E6  ████████
Gray-500:  #ADB5BD  ████████
Gray-700:  #495057  ████████
Success:   #27AE60  ████████  (Income positive)
Danger:    #E74C3C  ████████  (Warning/urgency)
```

### A.2 Typography Scale

```
Display (Hero):  Playfair Display 700, 56px/64px
H1:              Playfair Display 700, 40px/48px
H2:              Playfair Display 700, 32px/40px
H3:              Playfair Display 600, 28px/36px
H4:              Playfair Display 600, 24px/32px
Body Large:      Inter 400, 18px/28px
Body:            Inter 400, 16px/26px
Body Small:      Inter 400, 14px/22px
Caption:         Inter 400, 12px/18px
Quote:           Cormorant Garamond 400i, 24px/36px
Button/CTA:      Inter 600, 16px/24px
Nav:             Inter 500, 15px/24px
```

### A.3 Spacing System

```
Base unit: 4px
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
4xl: 80px
5xl: 96px
```

### A.4 Component Library

#### Button Styles

```
[Primary CTA]     — bg #D4A574, text #0D1B14, hover: darken 10%
[Secondary CTA]   — bg transparent, border #D4A574, text #D4A574
[WhatsApp CTA]    — bg #25D366, text white, icon WA
[Ghost CTA]       — bg transparent, text #D4A574, underline on hover
[Dark CTA]        — bg #1B4332, text white
```

#### Card Styles

```
Type A (Product):  bg white, rounded-lg, shadow-md, image top, content below
Type B (Feature):  bg #F5F0E8, rounded, icon top, title, description
Type C (Testimonial): bg white, border-left: 4px solid #D4A574, quote, author
Type D (Stat):     bg #1B4332, text white, large number, label
```

#### Form Elements

```
Input:            border 1px #DEE2E6, rounded, focus: border #D4A574
Select:           same as input, custom arrow
Textarea:         same as input, min-height 120px
Checkbox:         custom styled, green check on #1B4332 bg
Radio:            custom styled, gold dot on white
Slider:           custom range, track #DEE2E6, fill #D4A574, thumb #1B4332
```

#### Navigation

```
Desktop:          Fixed top, transparent → solid on scroll, logo left, links right, CTA rightmost
Mobile:           Hamburger left, logo center, WhatsApp icon right
Mobile Menu:      Full-screen overlay, slide from right, links stacked
```

---

## B. WIREFRAMES — HALAMAN UTAMA

### B.1 HOMEPAGE — Mobile Layout (375px)

```
┌─────────────────────────────────────┐
│ [☰]  MENANTU RESORT      [WA icon]  │  ← Sticky Nav (transparent → solid)
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │         HERO SECTION            │ │
│ │  (Full-screen video/image)      │ │
│ │                                 │ │
│ │  Investasi Villa di Bandung     │ │
│ │  Dikelola Sahid. Passive        │ │
│ │  Income Rp15 Juta/Bulan         │ │
│ │                                 │ │
│ │  [ Lihat Skema Investasi → ]    │ │
│ │  [ 💬 Chat WhatsApp ]           │ │
│ │                                 │ │
│ │  ┌───────────────────────────┐  │ │
│ │  │ ✅ 74 Unit ✅ SHM ✅ Sahid│  │ │  ← Social Proof Bar (scrolling)
│ │  └───────────────────────────┘  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │    STATS BAR (animated)         │ │
│ │  ┌────┐ ┌────┐ ┌────┐          │ │
│ │  │ 74 │ │ 9% │ │+15%│          │ │  ← Counter animation on scroll
│ │  │Unit│ │ p.a.│ │Cap │          │ │
│ │  │Terj│ │Inc  │ │Gain│          │ │
│ │  └────┘ └────┘ └────┘          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   WHY MENANTU RESORT            │ │
│ │   (4 feature cards, 2×2 grid)   │ │
│ │                                 │ │
│ │ ┌──────┐ ┌──────┐              │ │
│ │ │ SHM  │ │Sahid │              │ │
│ │ │Legal │ │50+thn│              │ │
│ │ └──────┘ └──────┘              │ │
│ │ ┌──────┐ ┌──────┐              │ │
│ │ │Pass. │ │Cap.  │              │ │
│ │ │Income│ │Gain  │              │ │
│ │ └──────┘ └──────┘              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   TIPE VILLA                    │ │
│ │   (horizontal scroll cards)     │ │
│ │                                 │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐     │ │
│ │ │BIJAK │ │IDAMAN│ │MAPAN │     │ │
│ │ │1,2 M │ │1,6 M │ │2 M   │     │ │
│ │ │1 KT  │ │2 KT  │ │3 KT  │     │ │
│ │ │[Lht] │ │[Lht] │ │[Lht] │     │ │
│ │ └──────┘ └──────┘ └──────┘     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   PASSIVE INCOME VISUALIZATION  │ │
│ │                                 │ │
│ │  "Villa Anda Bekerja untuk Anda"│ │
│ │                                 │ │
│ │  ┌─────────────────────────┐    │ │
│ │  │ Bar Chart: Cicilan vs   │    │ │  ← Animated chart
│ │  │ Passive Income          │    │ │
│ │  │ ████████ Cicilan 14.5jt │    │ │
│ │  │ ██████████████ Inc 15jt │    │ │
│ │  │ Surplus: +Rp417rb/bln   │    │ │
│ │  └─────────────────────────┘    │ │
│ │                                 │ │
│ │  [ Hitung Sendiri → ]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   MANAGED BY SAHID              │ │
│ │   (Logo + description)          │ │
│ │   [ Tentang Sahid → ]           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   LOKASI & WISATA               │ │
│ │                                 │ │
│ │  ┌─────────────────────────┐    │ │
│ │  │  Interactive Map        │    │ │  ← Leaflet.js
│ │  │  (simplified)           │    │ │
│ │  └─────────────────────────┘    │ │
│ │  6 Destinasi Wisata sekitar     │ │
│ │  [ Lihat Peta Lengkap → ]      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   FASILITAS                     │ │
│ │   (Icon grid 3×2)               │ │
│ │  🏊 🕌 🏃 💪 🍽️ 🎯          │ │
│ │   Pool Msk Jog Fit Food Charger │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   TESTIMONIALS                  │ │
│ │  ┌───────────────────────────┐  │ │
│ │  │ ⭐⭐⭐⭐⭐                  │  │ │
│ │  │ "Investasi terbaik..."    │  │ │
│ │  │ — Bapak Andi, Investor    │  │ │
│ │  └───────────────────────────┘  │ │
│ │  [ ○ ○ ● ○ ○ ] (dots)          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   FINAL CTA SECTION             │ │
│ │                                 │ │
│ │  "Jangan Tunda Investasi Anda"  │ │
│ │  Unit terbatas. Booking fee     │ │
│ │  hanya Rp10 juta.               │ │
│ │                                 │ │
│ │  [ 💬 Chat WhatsApp Sekarang ]  │ │
│ │  [ 📅 Jadwalkan Kunjungan ]     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   FOOTER                        │ │
│ │  Logo + Nav Links               │ │
│ │  Sosmed: IG | YT | WA          │ │
│ │  Copyright © 2026               │ │
│ │  PT Cipta Multikarya Propertindo│ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  [💬]  Floating WhatsApp Button │ │  ← Fixed, bottom-right
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### B.2 HOMEPAGE — Desktop Layout (1440px)

```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] MENANTU RESORT  │ Beranda │ Tipe │ Investasi │ ... │ [💬]│  ← Fixed Nav
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                   HERO (Full-screen)                    │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │  Video/Image Background                          │   │ │
│ │  │                                                  │   │ │
│ │  │      Investasi Villa di Bandung                  │   │ │
│ │      Dikelola Sahid. Passive Income                  │   │ │
│ │      Rp15 Juta/Bulan                                 │   │ │
│ │  │                                                  │   │ │
│ │  │  [ Lihat Skema Investasi ]  [ 💬 Chat WA ]       │   │ │
│ │  │  ────────────────────────────────────────        │   │ │
│ │  │  ✅ 74 Unit ✅ SHM ✅ Managed by Sahid ✅ 9% p.a.│   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  STATS BAR (3 columns)                                  │ │
│ │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │ │
│ │  │   74 Unit   │  │  Passive   │  │ Capital    │        │ │
│ │  │ Terjual     │  │ Income 9%  │  │ Gain 15%+  │        │ │
│ │  └────────────┘  └────────────┘  └────────────┘        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  WHY MENANTU RESORT  (4 cards in a row)                 │ │
│ │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                │ │
│ │  │ SHM  │  │Sahid │  │Pass. │  │Cap.  │                │ │
│ │  │Legal │  │50+thn│  │Income│  │Gain  │                │ │
│ │  └──────┘  └──────┘  └──────┘  └──────┘                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  TIPE VILLA  (3 cards side by side)                     │ │
│ │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │ │
│ │  │  BIJAK     │  │  IDAMAN    │  │  MAPAN     │        │ │
│ │  │  [img]     │  │  [img]     │  │  [img]     │        │ │
│ │  │  Rp1,2 M   │  │  Rp1,6 M   │  │  Rp2 M     │        │ │
│ │  │  [Lihat →] │  │  [Lihat →] │  │  [Lihat →] │        │ │
│ │  └────────────┘  └────────────┘  └────────────┘        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  CHART: Cicilan vs Passive Income (full-width)           │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │  ████████████████████████████  Cicilan 14.5jt   │   │ │
│ │  │  ████████████████████████████████████  Income 15│   │ │
│ │  │  Surplus: +Rp417.000/bulan                       │   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  2-column: Managed by Sahid (left) | Location (right)   │ │
│ │  ┌──────────────────┐  ┌──────────────────┐             │ │
│ │  │ SAHID PARTNERSHIP│  │ LOKASI & WISATA  │             │ │
│ │  │ Logo + desc      │  │ Map mini + list  │             │ │
│ │  └──────────────────┘  └──────────────────┘             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  TESTIMONIALS (3 cards carousel)                         │ │
│ │  ┌──────────┐ ┌──────────┐ ┌──────────┐                 │ │
│ │  │ Testi 1  │ │ Testi 2  │ │ Testi 3  │                 │ │
│ │  └──────────┘ └──────────┘ └──────────┘                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  FINAL CTA SECTION                                      │ │
│ │  "Jangan Tunda Investasi Anda"                          │ │
│ │  [ 💬 Chat WhatsApp ]  [ 📅 Jadwal Kunjungan ]          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  FOOTER (4 columns)                                     │ │
│ │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │ │
│ │  │Tent. │ │Tipe  │ │Inves.│ │Kontak│                    │ │
│ │  └──────┘ └──────┘ └──────┘ └──────┘                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌──────────┐                                                 │
│ │  [💬]   │  Floating WhatsApp button                      │
│ └──────────┘                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## C. WIREFRAMES — HALAMAN DETAIL VILLA

### C.1 Villa Detail Page (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  Nav Bar (same as homepage)                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  HERO IMAGE/VIDEO (full-width, 60vh)                   │ │
│ │  Overlay: "Menantu Bijak — Investasi Cerdas"           │ │
│ │  Price badge: "Mulai Rp1,2 Miliar"                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── SPECS BAR ──────────────────────────────────────────┐ │
│ │  🏠 2 Lantai  │  🛏️ 1 KT  │  🚿 1 KM  │  55 m² LB   │ │
│ │  60 m² LT     │  SHM       │  Fully Furnished         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── TAB NAV ────────────────────────────────────────────┐ │
│ │  [Deskripsi]  [Spesifikasi]  [Simulasi]  [Galeri]      │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │  TAB CONTENT (dynamic based on selection)              │ │
│ │                                                         │ │
│ │  DESKRIPSI TAB:                                         │ │
│ │  2-column: Text (left) | Image (right)                 │ │
│ │  ┌──────────────────┐ ┌──────────────────┐             │ │
│ │  │ "Investasi cerdas│ │  [Foto interior] │             │ │
│ │  │  mulai 1,2 M..." │ │                  │             │ │
│ │  │                  │ │                  │             │ │
│ │  │ Cocok untuk:     │ │                  │             │ │
│ │  │ ✓ First investor │ │                  │             │ │
│ │  │ ✓ Single/muda   │ │                  │             │ │
│ │  │ ✓ Passive income │ │                  │             │ │
│ │  └──────────────────┘ └──────────────────┘             │ │
│ │                                                         │ │
│ │  SPESIFIKASI TAB: Table layout                         │ │
│ │  ┌──────────────┬──────────────────┐                   │ │
│ │  │ Luas Bangunan│ 55 m²            │                   │ │
│ │  │ Luas Tanah   │ 60 m²            │                   │ │
│ │  │ Kamar Tidur  │ 1 (Ground floor) │                   │ │
│ │  │ Kamar Mandi  │ 1                │                   │ │
│ │  │ Lantai       │ 2                │                   │ │
│ │  │ Status       │ SHM              │                   │ │
│ │  │ Furnish      │ Fully furnished  │                   │ │
│ │  └──────────────┴──────────────────┘                   │ │
│ │                                                         │ │
│ │  SIMULASI TAB: Calculator embedded                     │ │
│ │  ┌──────────────────┐ ┌──────────────────┐             │ │
│ │  │ INPUT:           │ │ OUTPUT:          │             │ │
│ │  │ Tipe: [Bijak ▼]  │ │ Cicilan: 9,72jt  │             │ │
│ │  │ DP: [═══●═══]30% │ │ Subsidi: 350jt   │             │ │
│ │  │ Tenor: [══●══]15 │ │ Income: 9,75jt   │             │ │
│ │  │                  │ │ Surplus: +28rb   │             │ │
│ │  │                  │ │ Chart: █ vs ██   │             │ │
│ │  └──────────────────┘ └──────────────────┘             │ │
│ │                                                         │ │
│ │  GALERI TAB: Photo grid (3 cols desktop, 2 mobile)     │ │
│ │  ┌────┐ ┌────┐ ┌────┐                                 │ │
│ │  │ img │ │ img │ │ img │                                │ │
│ │  └────┘ └────┘ └────┘                                 │ │
│ │  [ 🏔️ Lihat Virtual Tour 360° ]                        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── CTA SECTION ────────────────────────────────────────┐ │
│ │  "Tertarik dengan Tipe Bijak?"                          │ │
│ │  [ 💬 Tanya Tipe Ini — WhatsApp ]                       │ │
│ │  [ 📅 Jadwalkan Kunjungan ]                             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── RELATED TYPES ──────────────────────────────────────┐ │
│ │  Tipe Lainnya:  [Idaman →]  [Mapan →]                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── FAQ ACCORDION ──────────────────────────────────────┐ │
│ │  ❓ Apakah bisa KPR?                    [＋]            │ │
│ │  ❓ Berapa DP minimum?                  [＋]            │ │
│ │  ❓ Kapan unit selesai dibangun?        [＋]            │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Footer                                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## D. WIREFRAMES — INVESTMENT SIMULATOR PAGE

### D.1 Simulator Page (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  Nav Bar                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─── HEADER ──────────────────────────────────────────────┐ │
│ │  "Simulator Investasi — Hitung Potensi Returns Anda"     │ │
│ │  "Masukkan angka Anda, lihat sendiri potensi keuntungan" │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── TABS ────────────────────────────────────────────────┐ │
│ │  [KPR Bank]  [KPR Developer]  [Perbandingan]            │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │  KPR BANK TAB CONTENT                                   │ │
│ │                                                         │ │
│ │  ┌─────── INPUT SECTION ───────┐ ┌─── OUTPUT ────────┐ │ │
│ │  │ Tipe Villa                  │ │                    │ │ │
│ │  │ ○ Bijak (Rp1,2 M)           │ │ Cicilan/bln:      │ │ │
│ │  │ ● Idaman (Rp1,6 M)          │ │ Rp11.670.000      │ │ │
│ │  │ ○ Mapan (Rp2 M)             │ │                    │ │ │
│ │  │                             │ │ Subsidi 36 bln:   │ │ │
│ │  │ DP: 30%                     │ │ Rp420.000.000     │ │ │
│ │  │ [══════════════●══════════] │ │                    │ │ │
│ │  │       30%   40%   50%       │ │ Passive Income:   │ │ │
│ │  │                             │ │ Rp12.000.000/bln  │ │ │
│ │  │ Tenor: 15 tahun             │ │                    │ │ │
│ │  │ [══════●══════════════════] │ │ Surplus:          │ │ │
│ │  │  10   15   20               │ │ +Rp333.000/bln    │ │ │
│ │  │                             │ │ ─────────────     │ │ │
│ │  │ Bunga: 5%                   │ │ Capital Gain      │ │ │
│ │  │ [══════●══════════════════] │ │ 15 thn: Rp2.2-3.3M│ │ │
│ │  │  3%  5%  7%                 │ └────────────────────┘ │ │
│ │  └─────────────────────────────┘                         │ │
│ │                                                         │ │
│ │  ┌─── CHART ──────────────────────────────────────────┐ │ │
│ │  │  Cicilan vs Passive Income (12 months view)         │ │ │
│ │  │                                                     │ │ │
│ │  │  Rp15jt ┤        ████████████████                   │ │ │
│ │  │  Rp12jt ┤  ██████████████████████ Income            │ │ │
│ │  │  Rp10jt ┤  ██████████████         Cicilan           │ │ │
│ │  │  Rp5jt  ┤ ██████                                   │ │ │
│ │  │         └───┬───┬───┬───┬───┬───┬───┬───┬───        │ │ │
│ │  │             J   F   M   A   M   J   J   A           │ │ │
│ │  └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │  [ 💬 Diskusi Hasil Simulasi — WhatsApp ]               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── PERBANDINGAN CEPAT ──────────────────────────────────┐ │
│ │  ┌────────────────┐  ┌────────────────┐                  │ │
│ │  │ KPR Bank       │  │ KPR Developer  │                  │ │
│ │  │ ✅ Bunga 5%    │  │ ✅ Tanpa Bank  │                  │ │
│ │  │ ✅ Tenor 15thn │  │ ✅ Bunga 7%    │                  │ │
│ │  │ ⚠️ Proses bank │  │ ✅ Proses cepat│                  │ │
│ │  └────────────────┘  └────────────────┘                  │ │
│ │  "Kami sarankan [X] karena [alasan]"                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

### D.2 Simulator Page — Mobile

```
┌─────────────────────────────────────┐
│ Nav                                │
├─────────────────────────────────────┤
│ "Simulator Investasi"              │
│                                     │
│ [KPR Bank] [Developer] [Banding]   │ ← Horizontal scroll tabs
├─────────────────────────────────────┤
│                                     │
│ Tipe Villa                         │
│ [▼ Pilih Tipe...          ]        │ ← Dropdown
│                                     │
│ DP: 30%                            │
│ [══════●══════════════════]        │ ← Slider
│                                     │
│ Tenor: 15 tahun                    │
│ [══════●══════════════════]        │ ← Slider
│                                     │
│ ┌─────────────────────────────────┐│
│ │ Hasil:                          ││
│ │ Cicilan: Rp11.670.000/bln      ││
│ │ Income:  Rp12.000.000/bln      ││
│ │ Surplus: +Rp333.000/bln        ││
│ └─────────────────────────────────┘│
│                                     │
│ [ 💬 Diskusi — WhatsApp ]          │
│                                     │
│ ┌─ Chart ────────────────────────┐ │
│ │ ██████ Cicilan                  │ │
│ │ ██████████████ Income          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Footer                             │
└─────────────────────────────────────┘
```

---

## E. WIREFRAMES — CONTACT & BLOG PAGES

### E.1 Contact Page

```
┌─────────────────────────────────────────────────────────────┐
│  Nav Bar                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─── HEADER ──────────────────────────────────────────────┐ │
│ │  "Hubungi Kami — Konsultasi Gratis"                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── 2-COLUMN LAYOUT ────────────────────────────────────┐ │
│ │  ┌──────────────────┐  ┌──────────────────┐             │ │
│ │  │ FORM             │  │ INFO KONTAK      │             │ │
│ │  │                  │  │                   │             │ │
│ │  │ Nama Lengkap     │  │ 💬 WhatsApp      │             │ │
│ │  │ [______________] │  │ +62 XXX XXXX     │             │ │
│ │  │                  │  │                   │             │ │
│ │  │ No. WhatsApp     │  │ 📧 Email         │             │ │
│ │  │ [______________] │  │ info@menantu...  │             │ │
│ │  │                  │  │                   │             │ │
│ │  │ Email            │  │ 📍 Alamat        │             │ │
│ │  │ [______________] │  │ Jl. Curug        │             │ │
│ │  │                  │  │ Cinulang...      │             │ │
│ │  │ Tipe Diminati    │  │                   │             │ │
│ │  │ [▼ Pilih Tipe]   │  │ 🕐 Jam Operasional│             │ │
│ │  │                  │  │ Sen-Sab 08:00-17:00│             │ │
│ │  │ Budget Range     │  │                   │             │ │
│ │  │ [▼ Pilih Range]  │  │ Sosial Media:     │             │ │
│ │  │                  │  │ [IG] [YT] [TikTok]│             │ │
│ │  │ Saya ingin:      │  │                   │             │ │
│ │  │ ☐ Investasi      │  │                   │             │ │
│ │  │ ☐ Hunian         │  │                   │             │ │
│ │  │ ☐ Keduanya       │  │                   │             │ │
│ │  │                  │  │                   │             │ │
│ │  │ Pesan (opsional) │  │                   │             │ │
│ │  │ [______________] │  │                   │             │ │
│ │  │ [______________] │  │                   │             │ │
│ │  │                  │  │                   │             │ │
│ │  │ [ 💬 Kirim ke WA ] │ │                   │             │ │
│ │  └──────────────────┘  └──────────────────┘             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─── MAP ────────────────────────────────────────────────┐ │
│ │  [Full-width Google Maps / Leaflet Map]                 │ │
│ │  Marker: Menantu Resort + surrounding POIs             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

### E.2 Blog Article Page

```
┌─────────────────────────────────────────────────────────────┐
│  Nav Bar                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─── ARTICLE ────────────────────────────────────────────┐ │
│ │  [Category Badge: Investasi]                            │ │
│ │                                                         │ │
│ │  "7 Alasan Investasi Villa di Bandung Timur 2026"       │ │
│ │                                                         │ │
│ │  By Menantu Resort Team  |  14 Jun 2026  |  5 min read │ │
│ │                                                         │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │  Featured Image (16:9)                          │   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ │                                                         │ │
│ │  [Table of Contents]                                    │ │
│ │  ─────────────────────                                  │ │
│ │  • Alasan 1: Capital Gain Properti Bandung              │ │
│ │  • Alasan 2: Dikelola Sahid Hotel                      │ │
│ │  • Alasan 3: SHM Legalitas Tertinggi                   │ │
│ │  ...                                                   │ │
│ │                                                         │ │
│ │  ─── CONTENT ───                                        │ │
│ │  Paragraf demi paragraf...                              │ │
│ │  [Image inline]                                         │ │
│ │  Quote: "..."                                           │ │
│ │  List: ...                                              │ │
│ │                                                         │ │
│ │  ┌─── INLINE CTA ─────────────────────────────────┐    │ │
│ │  │  "Tertarik investasi? Konsultasi gratis."       │    │ │
│ │  │  [ 💬 Hubungi Kami — WhatsApp ]                │    │ │
│ │  └────────────────────────────────────────────────┘    │ │
│ │                                                         │ │
│ │  ─── RELATED ARTICLES ───                               │ │
│ │  ┌────────────┐ ┌────────────┐ ┌────────────┐          │ │
│ │  │ Artikel 1  │ │ Artikel 2  │ │ Artikel 3  │          │ │
│ │  └────────────┘ └────────────┘ └────────────┘          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## F. USER FLOW DIAGRAM

```
                    ┌──────────────┐
                    │  LANDING     │  (Google Ads / Organic / Social)
                    │  (Homepage)  │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┬──────────────┐
              ▼            ▼            ▼              ▼
        ┌──────────┐ ┌──────────┐ ┌────────┐ ┌──────────────┐
        │ WhatsApp │ │  Lihat  │ │Simulasi│ │  Artikel     │
        │ Langsung │ │  Tipe   │ │KPR/ROI │ │  SEO Blog    │
        └────┬─────┘ └────┬─────┘ └────┬───┘ └──────┬───────┘
             │            │            │             │
             ▼            ▼            │             │
        ┌──────────┐ ┌──────────┐      │             │
        │ Input    │ │Detail    │      │             │
        │ WA/Form  │ │Villa     │      │             │
        └────┬─────┘ └────┬─────┘      │             │
             │            │            │             │
             ▼            ▼            ▼             ▼
        ┌──────────────────────────────────────────────┐
        │           LEAD FORM / WHATSAPP               │
        │  (Download Brosur / Jadwal Kunjungan /       │
        │   Konsultasi Gratis)                         │
        └────────────────────┬─────────────────────────┘
                             │
                             ▼
        ┌──────────────────────────────────────────────┐
        │           FOLLOW UP SALES TEAM               │
        │  (WhatsApp Business → CRM → Closing)         │
        └──────────────────────────────────────────────┘

        KEY METRICS PER PAGE:
        Homepage    → Clicks: WA | CTA | Tipe | Simulator
        Villa Page  → Clicks: WA (Tanya Tipe) | Simulasi | Galeri
        Simulator   → Clicks: Hitung | WA (Diskusi)
        Blog        → Clicks: Read more | WA (Konsultasi)
        Contact     → Submit: Form → WA auto-follow-up
```

---

## G. RESPONSIVE BREAKPOINTS

```
Mobile:   320px — 767px   (1 column, stacked)
Tablet:   768px — 1023px  (2 columns, hybrid)
Desktop:  1024px — 1439px (3 columns, standard)
Wide:     1440px+         (max-width container, 4 columns)

Breakpoint behavior per component:

Nav:
  Mobile: hamburger + slide-out menu
  Desktop: horizontal links

Cards:
  Mobile: single column or horizontal scroll (snap)
  Tablet: 2 columns
  Desktop: 3-4 columns

Hero:
  Mobile: 100vh, smaller text (28px H1)
  Desktop: 100vh, large text (56px H1)

Charts:
  Mobile: simplified, stacked
  Desktop: full bar/line charts side by side

Tables:
  Mobile: card-style (label: value rows)
  Desktop: traditional table layout

Forms:
  Mobile: full-width inputs
  Desktop: 2-column layout for form fields

Footer:
  Mobile: stacked accordion
  Desktop: 4-column grid
```

---

## H. ANIMATION & INTERACTION SPEC

```
┌────────────────────────────────────────────────────────────┐
│  ANIMATION SCHEDULE                                        │
├────────────────────────────────────────────────────────────┤
│                                                             │
│ Page Load:                                                  │
│   Hero content: fade-in + slide-up (0.6s)                  │
│   Background: subtle zoom/parallax                         │
│                                                             │
│ Scroll Trigger (Intersection Observer):                     │
│   Counters: animate from 0 to target (1.5s, ease-out)      │
│   Cards: stagger fade-in-up (0.4s each, 0.1s delay)        │
│   Charts: draw animation (1.2s, ease-in-out)               │
│   Stats bar: slide-in from bottom                          │
│                                                             │
│ Hover:                                                      │
│   Cards: scale(1.02) + shadow increase (0.3s ease)         │
│   Buttons: subtle scale(1.05) + color transition           │
│   Nav links: underline slide-in                            │
│   Gallery images: zoom overlay with caption                │
│                                                             │
│ WhatsApp Button (fixed):                                    │
│   Pulse animation on load (3s cycle)                       │
│   Tooltip: "Chat Sales Expert" auto-hide after 5s          │
│                                                             │
│ Simulator:                                                  │
│   Slider: real-time number update                          │
│   Chart: live-update on input change                       │
│   Result cards: highlight animation on change              │
│                                                             │
│ Testimonial Carousel:                                       │
│   Auto-slide every 5s                                      │
│   Swipe support on mobile                                  │
│   Fade transition (0.5s)                                   │
│                                                             │
│ Scroll-to-top button:                                       │
│   Appears after 300px scroll                               │
│   Smooth scroll to top                                     │
│                                                             │
│ Page Transitions (SPA mode):                                │
│   Content fade transition (0.3s)                           │
│   No flash/white page                                      │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## I. DESIGN PRIORITY MATRIX

```
Priority  | Component          | Reason
──────────┼────────────────────┼──────────────────────────────
P0 (CRIT) │ Hero Section       | First impression, convesion
P0 (CRIT) │ WhatsApp CTA       | Main lead gen channel
P0 (CRIT) │ Investment Sim     | Key engagement tool
P0 (CRIT) │ Product Cards      | Core offering display
──────────┼────────────────────┼──────────────────────────────
P1 (HIGH) │ Stats/Counters     | Social proof
P1 (HIGH) │ Chart Animations   | Data visualization
P1 (HIGH) │ Mobile Nav         | 60% traffic is mobile
P1 (HIGH) │ Form Design        | Lead capture
P1 (HIGH) │ Testimonials       | Trust building
──────────┼────────────────────┼──────────────────────────────
P2 (MED)  │ Blog Layout        | SEO support
P2 (MED)  │ Gallery            | Visual trust
P2 (MED)  │ Interactive Map    | Location context
P2 (MED)  │ FAQ Accordion      | Objection handling
──────────┼────────────────────┼──────────────────────────────
P3 (LOW)  │ Virtual Tour 360°  | Nice-to-have
P3 (LOW)  │ Unit Tracker       | Scarcity trigger
P3 (LOW)  │ Before/After       | Future enhancement
```

---

*Document ini adalah panduan desain visual & wireframe untuk development website menantu-resort.com.*
*Setelah disetujui, lanjut ke Step 2: Build dengan SvelteKit + Tailwind.*
