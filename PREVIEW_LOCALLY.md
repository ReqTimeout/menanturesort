# Preview Website Menantu Resort — Panduan Lokal

> Codex sandbox memblokir network listen, jadi dev server tidak bisa jalan dari dalam Codex.
> Anda perlu **menjalankan preview di Terminal Mac Anda** (bukan di Codex).

## Cara 1: Quick Preview (paling cepat)

Buka **Terminal** di Mac (buka Spotlight → ketik "Terminal"), lalu:

```bash
cd /Users/maabook/Desktop/menantu-resort.com
bash preview.sh
```

URL akan muncul: `http://localhost:3000/`

Buka URL itu di browser (Chrome/Safari/Firefox).

## Cara 2: Manual

```bash
cd /Users/maabook/Desktop/menantu-resort.com/app

# Cara A: pakai npx serve
npx serve dist -p 3000

# Cara B: pakai python (built-in Mac)
cd dist && python3 -m http.server 3000
```

URL: `http://localhost:3000/`

## Cara 3: Dev Mode (hot reload)

```bash
cd /Users/maabook/Desktop/menantu-resort.com/app
npm run dev
```

URL: `http://localhost:4321/`

Edit file `.astro` di `src/pages/` atau `src/components/`, browser auto-reload.

## Troubleshooting

**"This site can't be reached" / ERR_CONNECTION_REFUSED**
- Pastikan Anda jalankan di Terminal **Mac Anda**, bukan di Codex
- Cek apakah port 3000 dipakai app lain: `lsof -i :3000`
- Coba port lain: `npx serve dist -p 8080`

**"Address already in use"**
- Ada service lain di port itu. Stop atau pakai port lain:
  ```bash
  npx serve dist -p 8080
  ```

**"Cannot find module"**
- Install dependencies dulu:
  ```bash
  cd app
  npm install
  npm run build
  ```

## Yang Bisa Di-test di Preview

✅ Homepage 10 sections (hero, stats, problem-promise, villa, chart, dll)
✅ Villa detail (Bijak, Idaman, Mapan)
✅ FAQ accordion
✅ Mobile responsive (resize browser)
✅ Schema.org JSON-LD (view source)
✅ Smooth scroll anchor links
✅ WhatsApp button (klik untuk test — bakal buka wa.me dengan nomor dummy)

## Yang Belum (perlu image asli)

❌ Foto villa (sekarang pakai SVG placeholder geometric)
❌ Foto 360° viewer (terpisah di `/360/index.html`)
❌ Foto testimoni asli (sekarang monogram inisial)
❌ Logo proper (sekarang icon "M")

Generate image dulu via `IMAGE_GENERATION_PROMPTS.md`, simpan ke `app/public/images/`, replace path di components.

## Production Preview (real-world)

Setelah siap deploy, generate static dan upload ke server:

```bash
cd app
npm run build
# Upload isi dist/ ke public_html/ via cPanel File Manager
```

Lihat detail di `DEPLOY.md` (coming soon — Phase 5).
