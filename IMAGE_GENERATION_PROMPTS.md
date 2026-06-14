# Image Generation Prompts — Menantu Resort (Detailed Edition)

> **Cara pakai:** Buka Codex App desktop (tool `image_gen` built-in) atau gunakan DALL-E 3 / Midjourney / Ideogram / Flux / Gemini. Copy-paste prompt satu per satu, simpan ke path yang ditentukan.

---

## 0. FOLDER STRUCTURE

Semua aset harus disimpan mengikuti struktur ini:

```
images/
├── raw/                              # Full-size original dari generator
│   ├── hero/H1-villa-golden-hour.png
│   ├── villa/V-BIJAK-exterior.png
│   └── ...
│
├── hero/                             # FINAL assets untuk web
│   ├── webp/
│   │   ├── hero-home-1920.webp
│   │   ├── hero-home-1024.webp
│   │   └── hero-home-640.webp
│   └── jpg/                          # Fallback untuk browser lama
│       ├── hero-home-1920.jpg
│       ├── hero-home-1024.jpg
│       └── hero-home-640.jpg
│
├── villa/                            # Sama: webp/ + jpg/
│   ├── webp/bijak-exterior-1024.webp
│   └── ...
│
├── interior/, facilities/, location/, lifestyle/, og/
│   └── (sama: webp/ + jpg/)
│
├── testimonial/                      # Avatar testimoni (initials)
│
├── icons/                            # Custom icon SVG (bukan emoji)
│
├── logo/                             # Logo Menantu, Sahid, Developer
│
├── patterns/                         # Background pattern
│
└── placeholders/                     # SVG placeholder saat aset belum ready
    └── svg/
        ├── villa-card-placeholder.svg
        ├── hero-placeholder.svg
        └── avatar-monogram.svg
```

**Naming convention:** `[name]-[width].webp` (contoh: `bijak-exterior-1024.webp`)

**Workflow setelah generate:**
1. Save raw PNG ke `images/raw/[category]/[name].png`
2. Resize ke 3 ukuran (1920/1024/640 untuk hero, 1024/640/400 untuk card)
3. Convert ke WebP quality 82 + JPEG fallback quality 85
4. Taruh di `images/[category]/webp/` dan `images/[category]/jpg/`

**Script helper (jalankan dari root project):**
```bash
python3 scripts/process-images.py
# Auto-resize + WebP + JPEG untuk semua file di images/raw/
```

---

## 1. STYLE GUIDE (WAJIB DIGUNAKAN DI SEMUA PROMPT)

### 1.1 Color Palette
Brand harus konsisten di semua aset:

| Name | Hex | Usage |
|---|---|---|
| Forest Green | `#1B4332` | Primary, dominant di lanskap |
| Deep Green | `#0D1B14` | Shadow, dark areas |
| Gold/Sand | `#D4A574` | Accent cahaya matahari, kayu, furniture |
| Warm Cream | `#F5F0E8` | Bangunan, kain, langit cerah |
| Charcoal | `#2D3436` | Teks (tidak muncul di foto) |
| Sky Blue | `#87CEEB` ke `#FFB87C` | Gradient langit golden hour |

### 1.2 Mood & Atmosphere
- **Waktu:** Golden hour (jam 5-6 sore) atau sunrise (jam 6-7 pagi)
- **Cuaca:** Cerah berawan tipis, sesekali misty untuk efek dramatis
- **Suasana:** Hangat, mengundang, premium, tenang — bukan ramai/party
- **Hindari:** Orang banyak, mobil modern, gedung tinggi, urban

### 1.3 Photography Style
- **Genre:** Real estate architecture photography, hospitality marketing
- **Style ref:** Architectural Digest, Condé Nast Traveler, Luxury Hotel magazines
- **Camera:** Sony A7R IV / Canon EOS R5, prime 35mm-85mm
- **Aperture:** f/5.6-f/11 (sharp throughout)
- **Post-processing:** Warm color grading, soft contrast, no heavy filter

### 1.4 Vegetation Guidelines (Indonesia tropical)
- **Boleh:** Palem (palms), pakis (ferns), plumeria, frangipani, bougenville, heliconia, pisang-pisangan, bamboo, rumput gajah
- **Hindari:** Pohon besar tropis yang lebat (terlalu遮蔽 villa), rumput kering

### 1.5 Architecture Guidelines
- **Style:** Modern tropical minimalis dengan sentuhan Indonesia
- **Material:** Kayu jati/ulin, batu alam, kaca, genting tanah liat
- **Skala:** 1-3 lantai, proporsi manusiawi
- **Hindari:** Gaya Mediterania, Eropa klasik, Jepang kaku, industrial

### 1.6 Negative Prompts (untuk Midjourney/Flux)
```
modern skyscrapers, urban city, busy crowds, cars in foreground,
neon lights, plastic furniture, gaudy colors, low quality, blurry,
watermark, text, logo, signature, oversaturated, filter-heavy
```

---

## 2. HERO IMAGES (3 variations)

### H1 — Villa Resort Golden Hour
**Path:** `images/raw/hero/H1-villa-golden-hour.png`
**Usage:** Hero homepage utama
**Size:** 1920x1080 (16:9)

```
Photorealistic wide hero shot of a luxury eco-resort in tropical 
Bandung Indonesia at golden hour. Composition: 3 modern minimalist 
2-3 story villas with warm teak wood and natural stone facades, 
nestled in lush tropical greenery (palms, ferns, ornamental 
grasses). Misty mountains in far background. Curved infinity pool 
in foreground catching golden light reflections. Soft warm sunlight 
streaming from upper-left, long shadows, warm color grading. 
8K sharpness, professional architectural photography. 
Aspect ratio 16:9. NO people. NO cars. Magazine cover quality.
```

### H2 — Pool & Garden Lifestyle
**Path:** `images/raw/hero/H2-pool-garden.png`
**Usage:** Hero alternatif, slider, atau section CTA
**Size:** 1920x1080

```
Photorealistic shot of a luxury resort curved infinity pool 
surrounded by tropical plants in Bandung Indonesia. Warm wooden 
deck with 4 modern rattan lounge chairs and cream cushions. Crystal 
clear water reflecting golden sunset colors. Mountain silhouette 
in distance. Soft bokeh on foreground palm fronds. Cinematic warm 
color grading: deep forest green, gold, cream. Aspect 16:9, 
eye-level perspective, slight low angle. Magazine quality, 
architectural digest style. NO people.
```

### H3 — Resort Main Building
**Path:** `images/raw/hero/H3-main-building.png`
**Usage:** Hero "About Resort" / fallback
**Size:** 1920x1080

```
Photorealistic front view of a premium eco-resort main building 
in Bandung Indonesia. Modern tropical architecture with traditional 
Indonesian pitched roof elements (joglo-inspired). Material: teak 
wood, natural stone, floor-to-ceiling glass. Welcoming covered 
entrance with ornamental plants. Golden hour lighting from camera 
left, soft long shadows. Clear blue sky with 2-3 subtle white 
clouds. Aspect 16:9, symmetrical framing, eye-level. Premium real 
estate marketing photography, magazine cover quality. NO people.
```

---

## 3. VILLA EXTERIORS (3 images)

### V-BIJAK — Compact Starter Villa
**Path:** `images/raw/villa/V-BIJAK-exterior.png`
**Usage:** Card Bijak di homepage + detail page
**Size:** 1200x900 (4:3)

```
Photorealistic 3-quarter front view of a compact modern tropical 
villa (55 sqm, 1-2 stories) in Bandung Indonesia. Clean white 
walls, natural teak wood accents, large windows with sheer 
curtains. Small private garden with plumeria tree and ornamental 
grasses. Compact infinity pool (2x4m) on side. Tropical plants 
surround it: palms, ferns. Golden hour lighting, warm tones, 
long shadows. Aspect 4:3. Looks inviting for first-time 
investors. Architectural Digest style, professional real estate 
photography. NO people.
```

### V-IDAMAN — Family Standard Villa
**Path:** `images/raw/villa/V-IDAMAN-exterior.png`
**Usage:** Card Idaman (best value) + detail page
**Size:** 1200x900

```
Photorealistic 3-quarter front view of a 2-3 story family villa 
(65 sqm) in Bandung Indonesia. Modern tropical design with 
covered balcony on 2nd floor, wood + cream walls, large sliding 
glass doors opening to terrace. Landscaped garden with tropical 
plants, ornamental grasses, and 2 palm trees. 3x5m private pool. 
Golden hour lighting, long warm shadows. Aspect 4:3. Warm, 
premium, family-friendly vibe. Real estate marketing photography. 
NO people.
```

### V-MAPAN — Premium Flagship Villa
**Path:** `images/raw/villa/V-MAPAN-exterior.png`
**Usage:** Card Mapan + detail page
**Size:** 1200x900

```
Photorealistic front view of a luxurious 3-story flagship villa 
(90 sqm) in Bandung Indonesia. Premium materials: teak wood 
cladding, natural stone base, floor-to-ceiling glass. Master 
suite balcony on top floor with mountain view. 4x8m private pool 
in front. Tropical garden with 3-4 mature palms. Golden hour, 
dramatic shadows, warm color grading. Aspect 4:3. Architectural 
Digest cover quality, ultra-premium feel. NO people.
```

---

## 4. VILLA INTERIORS (5 images)

### I-LIVING — Modern Tropical Living Room
**Path:** `images/raw/interior/I-LIVING-modern-tropical.png`
**Usage:** Villa detail page tab "Deskripsi"
**Size:** 1200x800 (3:2)

```
Photorealistic interior of a luxury tropical villa living room 
in Bandung. High ceiling (4m) with exposed dark teak wood beams. 
Large floor-to-ceiling windows showing tropical garden. Modern 
rattan sofa with cream linen cushions, natural wood coffee table, 
2 rattan armchairs. Indoor potted palms in corners. Warm afternoon 
light streaming in from left, soft shadows. Natural textures: 
linen, wood, rattan, stone. Aspect 3:2, eye-level perspective. 
Professional interior photography, Architectural Digest style. 
NO people.
```

### I-BEDROOM — Cozy Tropical Bedroom
**Path:** `images/raw/interior/I-BEDROOM-master.png`
**Size:** 1200x800

```
Photorealistic master bedroom of a luxury tropical villa in 
Bandung. King-size bed with white linen bedding and teak wood 
frame. Subtle mosquito net canopy. Large window with sheer white 
curtains showing tropical garden view. Warm wood floor, 2 rattan 
bedside tables with brass lamps. Soft morning light from window, 
golden warm tones. Cozy and inviting. Aspect 3:2, eye-level. 
Interior photography, premium real estate marketing. NO people.
```

### I-BATHROOM — Spa-like Bathroom
**Path:** `images/raw/interior/I-BATHROOM-spa.png`
**Size:** 1200x800

```
Photorealistic luxury tropical villa bathroom. Freestanding stone 
bathtub as centerpiece, rain shower with brass fixtures in 
background, double vanity with teak wood cabinet and stone counter. 
2 tropical plants in corners (monstera, palm). Large window with 
frosted glass for privacy. Warm natural stone tiles on floor and 
walls. Soft warm pendant lighting. Aspect 3:2, eye-level. 
Spa-resort quality, premium interior photography. NO people.
```

### I-KITCHEN — Modern Tropical Kitchen
**Path:** `images/raw/interior/I-KITCHEN-modern.png`
**Size:** 1200x800

```
Photorealistic modern tropical kitchen in a luxury Bandung villa. 
White cabinets with teak wood accents, marble-look countertop, 
brass hardware. Open layout with breakfast bar and 3 rattan stools. 
Tropical view through window above sink. 3 pendant lights with 
brass finish. Warm morning light from window. Aspect 3:2, slight 
wide angle, interior photography, magazine quality. NO people.
```

### I-DINING — Elegant Dining
**Path:** `images/raw/interior/I-DINING-elegant.png`
**Size:** 1200x800

```
Photorealistic dining area of a luxury tropical villa. Solid teak 
wood dining table seating 6, 6 rattan chairs with cream cushions, 
ceramic pendant lights above. Large sliding doors opening to 
tropical garden. Tropical floral centerpiece on table. Warm 
evening light, candles lit (subtle), string lights in background. 
Aspect 3:2, eye-level, lifestyle interior photography. NO people.
```

---

## 5. FACILITIES (5 images)

### F-POOL — Main Resort Pool
**Path:** `images/raw/facilities/F-POOL-main.png`
**Usage:** Section facilities, About Resort
**Size:** 1200x900

```
Photorealistic shot of a luxury resort main pool area. Large 
curved infinity pool (15x6m) with crystal clear turquoise water. 
Wooden deck surrounding with 6 sun loungers and white umbrellas. 
Tropical garden backdrop with palms and ferns. Mountains in 
distance. Golden hour, warm reflections on water, long shadows. 
Aspect 4:3, slightly elevated angle. Resort marketing photography. 
NO people.
```

### F-RESTAURANT — Resort Restaurant
**Path:** `images/raw/facilities/F-RESTAURANT-open-air.png`
**Size:** 1200x900

```
Photorealistic shot of an elegant open-air resort restaurant. 
Wooden structure with traditional Indonesian joglo-inspired roof, 
modern minimalist interior. 8 tables set for dinner with white 
linen. Warm pendant lighting, candles on tables. Tropical plants 
around perimeter. Evening ambiance, soft bokeh. Aspect 4:3, 
hospitality photography. NO people, no food.
```

### F-LOUNGE — Sunset Lounge
**Path:** `images/raw/facilities/F-LOUNGE-sunset.png`
**Size:** 1200x900

```
Photorealistic shot of a luxury resort sunset lounge. 4 comfortable 
rattan sofas with cream cushions and low teak tables on wooden 
deck. Modern fire pit (stone bowl) in center. Mountain sunset in 
background (orange-pink sky). Warm string lights overhead. Tropical 
garden surrounding. Golden hour, romantic ambiance. Aspect 4:3, 
eye-level. NO people.
```

### F-GARDEN — Resort Garden Walk
**Path:** `images/raw/facilities/F-GARDEN-path.png`
**Size:** 1200x800

```
Photorealistic shot of a beautiful landscaped resort garden path. 
Natural stone walkway lined with tropical plants: palms, ferns, 
heliconia, ornamental flowers (red, yellow). Wooden bench in 
mid-distance. Dappled golden sunlight filtering through tree 
canopy. Peaceful, meditative, lush. Aspect 3:2, eye-level, 
landscape photography. NO people.
```

### F-SPA — Wellness Spa
**Path:** `images/raw/facilities/F-SPA-bale.png`
**Size:** 1200x900

```
Photorealistic shot of a luxury tropical spa. Outdoor massage 
bale (wooden gazebo) with white sheer curtains flowing. Wooden 
deck, hot stone massage setup, essential oil diffusers. Tropical 
plants surround (bamboo, palms). Warm morning light, slight mist. 
Tranquil, premium wellness atmosphere. Aspect 4:3, eye-level. 
NO people.
```

---

## 6. LOCATION (2 images)

### L-AERIAL — Bandung Timur Aerial
**Path:** `images/raw/location/L-AERIAL-bandung-timur.png`
**Usage:** Hero "Lokasi" page, section "Lokasi"
**Size:** 1920x1080

```
Photorealistic aerial drone shot of Bandung Timur Indonesia 
landscape at sunrise. Green rolling hills, tropical forest 
patches, small villages with red-tile rooftops scattered. Misty 
valleys in mid-ground, mountains in distance. Dramatic clouds 
with golden light. Cikalong-Cicalengka area style landscape 
(hilly, tropical, not flat). Aspect 16:9, DJI drone photography 
style, 4K sharpness, high altitude (~500m). NO text overlay.
```

### L-CURUG — Curug Cinulang Waterfall
**Path:** `images/raw/location/L-CURUG-waterfall.png`
**Size:** 1200x800

```
Photorealistic shot of a tropical waterfall in Bandung Indonesia 
(Curug Cinulang style). Cascading water over mossy volcanic 
rocks, lush green vegetation, morning mist. Sun rays filtering 
through tree canopy creating god rays. Natural turquoise pool 
at base. Aspect 3:2, landscape photography, National Geographic 
style, sharp detail. NO people.
```

---

## 7. LIFESTYLE (3 images)

### LF-FAMILY — Family in Villa
**Path:** `images/raw/lifestyle/LF-FAMILY-villa.png`
**Usage:** Section trust, gallery
**Size:** 1200x900

```
Photorealistic candid shot of an Indonesian family of 4 enjoying 
their luxury tropical villa. Father 40s and mother 30s sitting on 
rattan sofa, 2 children (8 and 5) playing on wooden deck. Tropical 
garden in background. Warm golden hour. Happy, relaxed, candid 
mood. Asian Indonesian family, modern casual clothing. Aspect 4:3, 
lifestyle photography, editorial quality. Natural, not posed.
```

### LF-COUPLE — Couple Sunset
**Path:** `images/raw/lifestyle/LF-COUPLE-balcony.png`
**Size:** 1200x800

```
Photorealistic shot of a young Indonesian couple (late 20s) 
enjoying sunset on their villa balcony. Standing close, looking 
at view, holding hands. Tropical landscape and sunset in distance. 
Golden hour backlight, lens flare subtle. Romantic, premium, 
aspirational. Aspect 3:2, lifestyle photography, modern 
relationship. Casual elegant clothing.
```

### LF-WFC — Work From Café
**Path:** `images/raw/lifestyle/LF-WFC-cafe.png`
**Size:** 1200x900

```
Photorealistic shot of a young Indonesian professional (late 20s) 
working on laptop in resort café. Rattan chair, wooden table, 
laptop + coffee cup. Tropical plants in background (slight bokeh). 
Morning light, bright and productive. Aspect 4:3, modern lifestyle 
photography. Co-working vibes, casual but professional. ONE person.
```

---

## 8. OG IMAGE (1 image)

### OG-HERO
**Path:** `images/raw/og/OG-HERO-banner.png`
**Size:** 1200x630 (penting!)

```
Wide banner 1200x630 for Open Graph social sharing. Tropical 
resort hero shot at golden hour, composition shifted so sky takes 
upper 30% (clean, untuk text overlay). Villa silhouette with 
infinity pool reflection in lower 70%. Vibrant colors: deep green, 
gold, cream, orange sky. NO text, NO logo (ditambahkan terpisah 
via HTML). Magazine cover quality, suitable for Facebook, 
LinkedIn, Twitter share preview.
```

---

## 9. PLACEHOLDER SVGs (saya akan generate inline)

Saat image asli belum ready, saya akan buat placeholder SVG di:
- `images/placeholders/svg/hero-placeholder.svg`
- `images/placeholders/svg/villa-card-placeholder.svg`
- `images/placeholders/svg/avatar-monogram.svg` (template, generate per inisial)

---

## 10. PRIORITY ORDER (generate bertahap)

**Batch 1 (critical, ~6 images):**
1. H1 — Hero utama
2. V-BIJAK + V-IDAMAN + V-MAPAN — 3 villa exteriors
3. OG-HERO — Social sharing

**Batch 2 (high, ~5 images):**
4. H2, H3 — Hero alternatif
5. L-AERIAL — Bandung Timur landscape
6. F-POOL — Main pool

**Batch 3 (medium, ~7 images):**
7. I-LIVING, I-BEDROOM, I-KITCHEN — 3 interiors
8. F-RESTAURANT, F-LOUNGE, F-GARDEN — 3 facilities
9. L-CURUG — Waterfall

**Batch 4 (nice-to-have, ~5 images):**
10. I-BATHROOM, I-DINING — 2 more interiors
11. F-SPA — Spa
12. LF-FAMILY, LF-COUPLE, LF-WFC — 3 lifestyle

**Total: ~20 images** untuk full website coverage.

---

## 11. TECHNICAL NOTES PER PLATFORM

### Codex App Desktop (built-in image_gen)
- Default save ke `$CODEX_HOME/generated_images/`
- Setelah dapat file, pindahkan manual ke `images/raw/[category]/[name].png`
- Lalu jalankan `python3 scripts/process-images.py` untuk resize + WebP

### DALL-E 3 (ChatGPT Plus)
- Pilih "Wide" 1792x1024 untuk landscape
- Prompt harus dalam 1 paragraf
- Tidak support negative prompt langsung (tambahkan "Avoid...")

### Midjourney
- Tambah `--ar 16:9` (atau 4:3 / 3:2 sesuai)
- Tambah `--style raw` untuk natural look
- Tambah `--v 6` atau lebih baru
- Negative prompt: `--no modern skyscrapers, urban, people, cars, text`

### Ideogram
- Aspect ratio: pilih di UI
- Bagus untuk gaya illustration, kurang untuk foto realistis
- Tambah "Photorealistic" di awal prompt

### Flux (via Replicate/comfyUI)
- Support negative prompt eksplisit
- Bisa lebih artistic
- Perlu setup sendiri

### Google Gemini (Imagen 3)
- Tambah aspect ratio di prompt: "16:9 aspect ratio"
- Bagus untuk natural look
- API key perlu di-set

### Banana Pro 2
- Mention "Banana API" if available, atau use via replicate

---

## 12. POST-PROCESSING SCRIPT

File `scripts/process-images.py` (akan saya generate di Phase 1):

```python
#!/usr/bin/env python3
"""Process raw images: resize to 3 sizes, convert to WebP + JPEG."""
from PIL import Image
from pathlib import Path
import sys

RAW_DIR = Path("images/raw")
SIZES = {
    "hero": [1920, 1024, 640],
    "villa": [1200, 800, 400],
    "interior": [1200, 800, 400],
    "facilities": [1200, 800, 400],
    "location": [1920, 1200, 640],
    "lifestyle": [1200, 800, 400],
    "og": [1200],  # OG fixed size
}

def process(category, src_path):
    sizes = SIZES.get(category, [1200, 800, 400])
    name = src_path.stem
    for w in sizes:
        img = Image.open(src_path)
        if img.width > w:
            ratio = w / img.width
            h = int(img.height * ratio)
            img = img.resize((w, h), Image.LANCZOS)
        # WebP
        webp_path = RAW_DIR.parent / category / "webp" / f"{name}-{w}.webp"
        webp_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(webp_path, "WEBP", quality=82, method=6)
        # JPEG fallback
        jpg_path = RAW_DIR.parent / category / "jpg" / f"{name}-{w}.jpg"
        jpg_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(jpg_path, "JPEG", quality=85, optimize=True)
        print(f"  → {w}w: WebP {webp_path.stat().st_size//1024}KB, JPEG {jpg_path.stat().st_size//1024}KB")

def main():
    for category in SIZES:
        cat_dir = RAW_DIR / category
        if not cat_dir.exists():
            continue
        for src in cat_dir.glob("*.png"):
            print(f"Processing {src.name}...")
            process(category, src)
        for src in cat_dir.glob("*.jpg"):
            print(f"Processing {src.name}...")
            process(category, src)
    print("\nDone!")

if __name__ == "__main__":
    main()
```

---

*Dokumen v2 — detailing penuh. 25 prompt siap pakai, style guide konsisten, folder structure jelas, post-processing script included.*
