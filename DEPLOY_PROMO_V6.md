# 🚀 DEPLOY GUIDE — menantu-deploy-promo-v6.zip

> **Tanggal:** 30 Juni 2026
> **Versi:** v6 — Added `/promo` page + Meta Pixel + Enhanced Conversions
> **Zip:** `menantu-deploy-promo-v6.zip` (18 MB)
> **Target:** menantu-resort.com production (IDCloudHost cPanel)

---

## ⚠️ PENTING — Jangan Lewatkan Backup

**Sebelum mulai deploy, BACKUP versi live saat ini:**

1. Login cPanel: https://103.63.24.139:2083/
2. File Manager → navigasi `/home/egokkcmq/`
3. **Rename** folder `menantu-app` → `menantu-app.backup-2026-06-30`
4. **Rename** folder `menantu-app` di backup lokasi lain via Terminal cPanel (jika ada)

Kalau ada apa-apa, restore dengan rename balik.

---

## 📋 STEP 1: Persiapan cPanel

### 1.1 Login cPanel
- URL: **https://103.63.24.139:2083/**
- SSL warning → klik **Advanced** → **Proceed**
- Username: `egokkcmq`
- Password: *(dari IDCloudHost client area / email welcome)*

### 1.2 Buka File Manager
- Dashboard → cari **File Manager** di section **Files**
- Klik icon **File Manager**
- Navigasi ke `/home/egokkcmq/` (klik **Home** di sidebar kiri, atau ketik path di address bar)

---

## 📋 STEP 2: Hapus Versi Lama (WAJIB)

> **Kenapa hapus dulu?** Supaya tidak ada konflik file yang di-overwrite vs yang baru.

1. File Manager → `/home/egokkcmq/`
2. Cari folder `menantu-app/` (atau nama lain yang dipakai, cek di Setup Node.js App dulu)
3. **Klik kanan** folder tersebut → **Delete**
4. Konfirmasi: **"Permanently delete"** (centang jika ada)
5. Tunggu sampai hilang dari list

**Alternatif** (lebih aman, untuk rollback cepat):
- Rename `menantu-app` → `menantu-app.old-2026-06-30` (jangan delete)
- Bikin folder `menantu-app` baru di Step 3

---

## 📋 STEP 3: Buat Folder Baru + Upload Zip

1. File Manager → `/home/egokkcmq/`
2. Klik **+ Folder** (icon folder dengan +) di toolbar atas
3. Ketik: `menantu-app`
4. Klik **Create New Folder**
5. **Masuk** ke folder `menantu-app/` (double-click)
6. Klik tombol **Upload** (icon arrow up) di toolbar
7. **Drag-and-drop** file `menantu-deploy-promo-v6.zip` dari desktop ke area upload
   - Atau klik **Select File** → browse ke `/Users/maabook/Desktop/menantu-resort.com/menantu-deploy-promo-v6.zip`
8. Tunggu progress 100% (18 MB, biasanya 1-3 menit tergantung koneksi)
9. Setelah selesai, **tutup** tab upload, **kembali** ke File Manager (refresh jika perlu)
10. Cari `menantu-deploy-promo-v6.zip` di dalam `/home/egokkcmq/menantu-app/`
11. **Klik kanan** → **Extract**
12. Pilih extract to: `/home/egokkcmq/menantu-app/`
13. Klik **Extract File(s)**
14. Tunggu sampai selesai
15. **Verify** — harus ada folder `dist/`, file `package.json`, `package-lock.json` di dalam `menantu-app/`

### Struktur yang harus ada:
```
/home/egokkcmq/menantu-app/
├── dist/
│   ├── client/        # Static HTML + images + _astro/ JS chunks
│   └── server/        # Node.js SSR files (entry.mjs)
├── package.json
├── package-lock.json
└── menantu-deploy-promo-v6.zip  ← boleh dihapus setelah extract
```

---

## 📋 STEP 4: Install Dependencies (Production)

> **PENTING:** Jangan pakai `npm install` biasa! Pakai `--omit=dev` supaya tidak install devDependencies (Astro, TypeScript, dll) yang tidak dibutuhkan di production.

### 4.1 Buka Terminal cPanel
- Dashboard → **Advanced** → **Terminal**
- (Atau cari icon terminal di cPanel)

### 4.2 Jalankan install
```bash
cd /home/egokkcmq/menantu-app
npm install --omit=dev
```

**Tunggu 2-5 menit.** Akan install:
- astro
- @astrojs/svelte, @astrojs/node, @astrojs/tailwind
- svelte
- svelte-motion, bits-ui
- tailwindcss, lucide-svelte, embla-carousel-svelte
- gsap, lenis
- Semua dependencies runtime

### 4.3 Verify install sukses
```bash
ls -la node_modules/ | head -5
```
Harus muncul folder `node_modules/` dengan banyak subfolder.

**Common errors & fix:**
- `EACCES permission denied` → tambahkan `sudo` di depan (biasanya tidak perlu)
- `ENOSPC no space left` → hubungi IDCloudHost untuk upgrade storage
- `ERESOLVE peer dependency conflict` → `npm install --omit=dev --legacy-peer-deps`

---

## 📋 STEP 5: Setup Node.js App di cPanel

### 5.1 Buka Setup Node.js App
- Dashboard → **Software** (atau **Advanced**) → **Setup Node.js App**
- (Di beberapa versi cPanel namanya **Application Manager**)

### 5.2 Cek apakah ada app existing
- Lihat list. Jika ada app untuk `menantu-resort.com`:
  - **STOP** app tersebut dulu
  - Catat semua setting (Application root, URL, port, env vars)
  - **DELETE** app tersebut
  - Kita buat ulang dengan entry point baru

### 5.3 Create Application Baru
Klik tombol **"+ CREATE APPLICATION"** atau **"Create Application"**

| Field | Value | Catatan |
|---|---|---|
| **Node.js version** | `18.x` atau `20.x` (pilih LTS terbaru yang available) | IDCloudHost biasanya list 14, 16, 18, 20 |
| **Application mode** | `Production` | **WAJIB** Production, bukan Development |
| **Application root** | `menantu-app` | Path: `/home/egokkcmq/menantu-app` |
| **Application URL** | `menantu-resort.com` | Pilih dari dropdown |
| **Application startup file** | `dist/server/entry.mjs` | **Path dari application root** |

### 5.4 Environment Variables
Tambah via **"Add variable"** atau section **"Environment variables"**:

| Variable | Value |
|---|---|
| `HOST` | `0.0.0.0` |
| `PORT` | `3000` (default; atau port lain jika 3000 conflict) |
| `NODE_ENV` | `production` |
| `PUBLIC_GA4_ID` | `G-39JSBHZY3T` (opsional, sudah hardcoded di AnalyticsBoot) |
| `PUBLIC_GOOGLE_ADS_ID` | `AW-18240219652` (opsional, sudah hardcoded) |
| `PUBLIC_ADS_CONVERSION_LABEL` | `1KOzCMms1cAcEITUzvlD` (opsional, sudah hardcoded) |
| `PUBLIC_ADS_CONVERSION_VALUE` | `100000` (opsional, sudah hardcoded) |

> **Note:** Semua value di atas sudah **hardcoded** sebagai fallback di `AnalyticsBoot.astro`. Env vars hanya untuk override. **Meta Pixel ID `866468102744117` sudah hardcoded**, tidak perlu env var.

### 5.5 Klik CREATE
Tunggu beberapa detik sampai app status menjadi **"Stopped"** (belum running).

### 5.6 Catat PORT
Setelah app dibuat, cPanel akan assign port internal. **CATAT** port ini (mis. `3000`, `3500`, dll). Akan dipakai di Step 6.

---

## 📋 STEP 6: Konfigurasi Reverse Proxy (.htaccess)

> **Skip langkah ini** jika Setup Node.js App sudah auto-create virtual host (cek di detail app → lihat "Configured virtual host" atau "Application URL"). Jika app sudah di-attach ke domain, tidak perlu .htaccess.

### 6.1 Backup .htaccess lama
1. File Manager → `/home/egokkcmq/public_html/`
2. Cari file `.htaccess`
3. Klik kanan → **Rename** → `.htaccess.backup-2026-06-30`

### 6.2 Edit .htaccess
1. Klik kanan `.htaccess` → **Edit** (atau **Code Edit**)
2. **GANTI SELURUH ISI** dengan konfigurasi berikut (sesuaikan PORT di baris 28):

```apache
# ============================================
# Menantu Resort — Node.js Reverse Proxy
# Last updated: 30 Juni 2026 (v6 + Meta Pixel)
# ============================================

# Enable RewriteEngine
RewriteEngine On

# Skip proxy untuk static files (serve langsung dari LiteSpeed)
RewriteCond %{REQUEST_URI} ^/_astro/ [OR]
RewriteCond %{REQUEST_URI} ^/images/ [OR]
RewriteCond %{REQUEST_URI} ^/360/ [OR]
RewriteCond %{REQUEST_URI} ^/favicon\.svg$ [OR]
RewriteCond %{REQUEST_URI} ^/og/ [OR]
RewriteCond %{REQUEST_URI} ^/sitemap [OR]
RewriteCond %{REQUEST_URI} ^/robots\.txt$ [OR]
RewriteCond %{REQUEST_URI} ^/404\.html$
RewriteRule ^ - [L]

# Proxy sisanya ke Node.js app
# GANTI "3000" dengan PORT yang dicatat di Step 5.6
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

# Pretty URLs (fallback)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !\. [NC]
RewriteRule ^(.*)$ /$1.html [L]

# 404 fallback
ErrorDocument 404 /404.html

# Cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresDefault "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Block sensitive files
<FilesMatch "^(\.env|\.git|id_rsa|package\.json|package-lock\.json)$">
  Order allow,deny
  Deny from all
</FilesMatch>
```

3. Klik **Save Changes**
4. Tutup editor

---

## 📋 STEP 7: Start Node.js App

### 7.1 Kembali ke Setup Node.js App
- Dashboard → **Software** → **Setup Node.js App**
- Klik app yang baru dibuat (di Step 5)

### 7.2 Start
- Klik tombol **"Start"** atau **"Run"**
- Tunggu 10-30 detik
- Status harus berubah jadi **"Running"** ✅
- Akan muncul log: `Server listening on http://0.0.0.0:XXXX`

### 7.3 Cek Log
- Klik **"Open Log"** atau **"Show log"** di detail app
- Expected output:
```
[@astrojs/node] Server listening on http://0.0.0.0:3000
```

**Kalau ada error, catat error message-nya dan cek Troubleshooting di bawah.**

---

## 📋 STEP 8: Verifikasi (TESTING)

### 8.1 Test Halaman
Buka di browser (WAJIB hard refresh `Ctrl+Shift+R` / `Cmd+Shift+R`):

1. **https://menantu-resort.com/** — homepage harus load dengan hero parallax
2. **https://menantu-resort.com/promo/** — halaman baru harus load (HARI INI ditambahkan)
3. **https://menantu-resort.com/villa/bijak/** — villa detail
4. **https://menantu-resort.com/investasi/** — investasi page
5. **https://menantu-resort.com/kontak/** — kontak

### 8.2 Test Meta Pixel (WAJIB)
1. Buka **https://menantu-resort.com/promo/**
2. Install extension **Meta Pixel Helper** (Chrome): https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc
3. Klik icon extension → harus muncul:
   - **Pixel Found: 866468102744117** ✅
   - **PageView event** fired ✅
4. Klik tombol WhatsApp di hero (jangan submit form dulu) → **Contact event** fired ✅
5. Isi form Hero (nama + WhatsApp) → submit
   - **Lead event** fired ✅
   - **Contact event** fired ✅
6. Buka tab baru ke **https://business.facebook.com/events_manager** → pilih Pixel `866468102744117` → **Test Events** → harus muncul events dalam 30 detik

### 8.3 Test Google Ads (WAJIB)
1. Buka **https://menantu-resort.com/promo/**
2. Install extension **Google Tag Assistant** (Chrome)
3. Klik icon → record → reload page
4. Harus muncul:
   - **Google Ads Conversion** (AW-18240219652/1KOzCMms1cAcEITUzvlD) ✅
5. Klik WhatsApp button → **conversion** event fired ✅
6. Cek di **Google Ads → Tools → Conversions** (setelah 24-48 jam)

### 8.4 Test Enhanced Conversions
1. Submit form di /promo/ dengan **nama asli** dan **nomor HP valid** (format +62)
2. Buka DevTools → Application → Local Storage → `menantu-resort.com`
3. Cari key `mr_user_data` → harus berisi:
```json
{
  "email": "...",
  "phone": "62...",
  "firstName": "...",
  "lastName": "...",
  "capturedAt": 1234567890
}
```
4. Cek di Google Ads Tag Assistant → "Enhanced Conversions" harus terdeteksi ✅

### 8.5 Test API Health
```bash
curl https://menantu-resort.com/api/health
```
Expected response:
```json
{"status":"ok","uptime":123,"timestamp":"..."}
```

---

## 🆘 TROUBLESHOOTING

### Problem 1: "ERR_CONNECTION_REFUSED" atau "Site can't be reached"
**Cause:** Node app tidak jalan atau port salah.
**Fix:**
1. cPanel → **Setup Node.js App** → klik app → cek status **Running**
2. Jika **Stopped** → klik **Start**
3. Cek **"Open Log"** untuk error message
4. Verify PORT di `.htaccess` (Step 6) match dengan port Node app (lihat di detail app cPanel)

### Problem 2: 500 Internal Server Error
**Cause:** Missing dependency atau build error.
**Fix:**
1. Terminal cPanel:
```bash
cd /home/egokkcmq/menantu-app
ls -la
ls -la node_modules/ | head -5  # verify deps installed
node -e "import('./dist/server/entry.mjs')"  # test import
```
2. Jika error `Cannot find module`, re-run `npm install --omit=dev`
3. Cek `package.json` dependencies lengkap
4. Cek log: **Setup Node.js App** → detail → **Open Log**

### Problem 3: 404 untuk semua page (termasuk /)
**Cause:** `.htaccess` reverse proxy tidak aktif, atau Node app serve di port berbeda.
**Fix:**
1. Verify `.htaccess` ada di `/home/egokkcmq/public_html/`
2. Cek Apache `mod_rewrite` + `mod_proxy` enabled (cPanel default enabled)
3. Cek port Node app di cPanel → **Setup Node.js App** → detail
4. **Hard refresh** browser: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)

### Problem 4: /promo/ return 404
**Cause:** Build tidak include halaman baru.
**Fix:**
1. Verify file ada di server: File Manager → `/home/egokkcmq/menantu-app/dist/client/promo/index.html`
2. Jika tidak ada, **re-upload** zip
3. Restart Node app

### Problem 5: Images 404
**Cause:** Path conflict atau permissions salah.
**Fix:**
1. File Manager → `/home/egokkcmq/menantu-app/dist/client/images/`
2. Verify folder ada + files exist
3. Set permissions: folders `755`, files `644`
4. Klik kanan folder → **Permissions** → `755`
5. Klik kanan file → **Permissions** → `644`

### Problem 6: Meta Pixel tidak firing
**Cause:** Browser cache atau extension conflict.
**Fix:**
1. **Hard refresh** browser (`Cmd+Shift+R`)
2. Buka **Incognito** mode
3. Cek di View Source: harus ada `fbevents.js` script
4. Cek console untuk error
5. Verify di **Meta Pixel Helper** extension

### Problem 7: Google Ads conversion tidak detect
**Cause:** Enhanced Conversions butuh user data untuk match.
**Fix:**
1. Test dengan submit form (bukan direct WA click)
2. Cek Local Storage `mr_user_data` ada
3. Cek di **Google Ads → Tools → Tag Diagnostics** (24-48 jam untuk muncul)
4. Lihat `GOOGLE_ADS_TROUBLESHOOTING.md` untuk debug detail

### Problem 8: "Out of memory" / Node crash
**Cause:** Memory limit shared hosting terlalu kecil.
**Fix:**
1. cPanel → **Setup Node.js App** → cek Application memory limit
2. Jika limit rendah, optimize:
   - Disable beberapa Svelte islands yang tidak essential
   - Atau **switch ke static mode** (upload `dist/client/*` ke `public_html/`)

---

## 🔄 ROLLBACK (kalau ada masalah)

### Option A: Quick Rollback
1. File Manager → `/home/egokkcmq/`
2. **Rename** `menantu-app` → `menantu-app.broken-2026-06-30`
3. **Rename** `menantu-app.backup-2026-06-30` (yang dibuat di awal) → `menantu-app`
4. **Setup Node.js App** → Restart
5. Tunggu 30 detik
6. Test

### Option B: From ZIP
1. Setup Node.js App → STOP app
2. File Manager → hapus folder `menantu-app/`
3. Upload zip `menantu-deploy-promo-v6.zip` ke folder baru `menantu-app/`
4. Extract
5. `cd /home/egokkcmq/menantu-app && npm install --omit=dev`
6. Setup Node.js App → Start

---

## ✅ CHECKLIST POST-DEPLOY

Tandai setiap item setelah verified:

- [ ] `https://menantu-resort.com/` load 200
- [ ] `https://menantu-resort.com/promo/` load 200
- [ ] Hero image tampil (drone aerial)
- [ ] Form Hero bisa di-submit → WhatsApp terbuka
- [ ] Countdown timer berjalan (30 Juli 2026)
- [ ] Exit-intent popup muncul saat coba close tab (mobile)
- [ ] Floating WA button muncul (bottom-right desktop)
- [ ] Sticky CTA muncul (bottom mobile)
- [ ] **Meta Pixel Helper** detect Pixel ID `866468102744117` di setiap page
- [ ] **Meta Pixel** PageView event firing di setiap page
- [ ] **Meta Pixel** Contact event firing saat klik WhatsApp
- [ ] **Meta Pixel** Lead event firing saat submit form
- [ ] **Google Tag Assistant** detect GA4 `G-39JSBHZY3T`
- [ ] **Google Tag Assistant** detect Google Ads `AW-18240219652`
- [ ] **Google Ads** conversion firing dengan Enhanced Conversions
- [ ] `https://menantu-resort.com/api/health` return JSON
- [ ] Sitemap include `/promo/`: `https://menantu-resort.com/sitemap.xml`
- [ ] Tidak ada error di Console browser
- [ ] Tidak ada error di Node log

---

## 📞 KONTAK DARURAT

| Issue | Kontak |
|---|---|
| cPanel login error | IDCloudHost 24/7 chat di idcloudhost.com |
| Node app crash | Cek log dulu, lalu tanyakan |
| Domain tidak resolve | IDCloudHost DNS manager |
| SSL issue | cPanel → SSL/TLS Status → Run AutoSSL |

---

## 📊 EXPECTED RESULTS (POST-DEPLOY)

### Traffic
- Halaman `/promo/` akan muncul di Google Search Console setelah submit sitemap
- Iklan Google Ads + Meta Ads yang landing ke `/promo/` akan convert

### Tracking
- **Meta Pixel:** PageView + Contact + Lead events ke Ads Manager
- **Google Ads:** Conversion ke AW-18240219652/1KOzCMms1cAcEITUzvlD
- **GA4:** Page view + WhatsApp click + Form submit events

### Conversion Path
```
User klik Ads
  → Landing di /promo/
  → PageView event (GA4 + Meta)
  → User scroll 50% (GA4)
  → User klik WhatsApp button
    → Contact event (Meta Pixel)
    → Conversion event (Google Ads) — value Rp 100.000
    → Enhanced Conversions (SHA-256 user_data)
  → Atau user submit form
    → Lead event (Meta Pixel) — value Rp 10.000.000
    → generate_lead event (Google Ads + GA4)
    → WhatsApp terbuka dengan message
```

---

*Generated 30 Juni 2026 — v6 release*
*menantu-resort.com — managed by Sahid*
