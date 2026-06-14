# Image Assets — Menantu Resort

Folder ini berisi semua aset visual untuk website. Baca `IMAGE_GENERATION_PROMPTS.md` untuk detail prompt.

## Struktur

```
images/
├── raw/                  # Original full-size dari image generator
├── hero/                 # Hero images (3 variasi)
│   ├── webp/             # WebP untuk modern browser
│   └── jpg/              # JPEG fallback
├── villa/                # 3 villa exteriors
├── interior/             # 5 interior shots
├── facilities/           # 5 facilities
├── location/             # 2 location shots
├── lifestyle/            # 3 lifestyle shots
├── og/                   # Open Graph image (1200x630)
├── testimonial/          # Avatar testimoni (placeholder monogram)
├── icons/                # Custom icon SVG
├── logo/                 # Logo Menantu, Sahid, Developer
├── patterns/             # Background pattern (subtle texture)
└── placeholders/         # SVG placeholder saat image belum ready
    └── svg/
```

## Workflow Generate → Web

1. **Generate** image via Codex App desktop (atau eksternal)
2. **Simpan** raw ke `images/raw/[category]/[name].png`
3. **Jalankan** `python3 scripts/process-images.py` dari root project
4. **Hasil** muncul di `images/[category]/webp/` dan `images/[category]/jpg/`
5. **Pakai** di Astro dengan `<Image>` dari `astro:assets` atau `<picture>` manual

## Naming Convention

- Raw: `[CATEGORY]-[NAME].png` (contoh: `V-BIJAK-exterior.png`)
- Processed: `[name]-[width].webp` (contoh: `bijak-exterior-1024.webp`)

## Status Image

| Kategori | Required | Ready | Notes |
|---|---|---|---|
| Hero | 3 | 0 | Tunggu generate |
| Villa exterior | 3 | 0 | |
| Interior | 5 | 0 | |
| Facilities | 5 | 0 | |
| Location | 2 | 0 | |
| Lifestyle | 3 | 0 | |
| OG image | 1 | 0 | |
| 360° aerial | 1 | ✅ | Sudah ada di `/360/web/menantu-aerial-2048.webp` |
| 360° resort | 1 | ✅ | Sudah ada di `/360/web/menantu-resort-2048.webp` |

## Placeholder Sementara

Saat image asli belum ready, Astro components akan otomatis pakai placeholder SVG dari `placeholders/svg/`. Style konsisten dengan brand.

## Image 360° Existing

Foto drone 360° asli sudah tersedia di `360/web/` (format WebP, multi-size):
- `menantu-aerial-{1024,2048,4096}.webp` — Aerial panorama 9669x3565
- `menantu-resort-{1024,2048,4096}.webp` — Equirectangular 4096x2048

Total compressed: ~4.6MB (dari 20MB original).
