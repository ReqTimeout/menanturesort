# 🚀 DEPLOY LENGKAP — Menantu Resort ke IDCloudHost cPanel (Node.js Selector)

> **Target:** menantu-resort.com production
> **Last updated:** 15 Juni 2026
> **Mode:** Node.js SSR via cPanel "Setup Node.js App" (Mode B)
> **Build output:** `app/dist/client/` (static) + `app/dist/server/entry.mjs` (Node entry)

---

## 🔐 KREDENSIAL & AKSES

### cPanel Login
| Item | Value |
|---|---|
| **cPanel URL** | `https://103.63.24.139:2083/` 'https://iix1280.idcloudhost.com:2083/'|
| **Username** | `egokkcmq` |
| **Password** | 565xcbc6VG#@!* |
| **Server IP** | `103.63.24.139` |
| **Domain** | `menantu-resort.com` |
| **Document Root** | `/home/egokkcmq/menantu-resort.com/` |

### Port
| Service | Port | Status |
|---|---|---|
| cPanel Web UI | 2083 (HTTPS) | ✅ Open |
| FTP | 21 | ✅ Open |
| SSH | 22 | ❌ **Closed (confirmed)** — pakai cPanel/FTP only |
| Node.js App | custom (akan di-assign) | via cPanel selector |

### FTP Login (alternative ke File Manager)
| Item | Value |
|---|---|
| **Host** | `103.63.24.139` atau `ftp.menantu-resort.com` |
| **Username** | `egokkcmq@menantu-resort.com` (atau `egokkcmq`) |
| **Password** | *(sama dengan cPanel)* |
| **Port** | 21 (plain) atau 22 (SFTP — **tidak tersedia karena SSH closed**) |

### Kontak Darurat
- **IDCloudHost Support:** 24/7 chat di [idcloudhost.com](https://idcloudhost.com) atau tiket via client area
- **Dev project lead:** lihat `siteData.contact` di `app/src/data/site.json`

---

## 📋 PRASYARAT SEBELUM DEPLOY

Checklist ini WAJIB complete sebelum lanjut:

- [ ] Build sukses: `cd app && npm run build` → exit 0, output di `app/dist/`
- [ ] File `app/dist/server/entry.mjs` exists
- [ ] File `app/dist/client/index.html` exists
- [ ] File `app/dist/client/.htaccess` exists
- [ ] File `app/dist/client/sitemap-index.xml` exists
- [ ] File `app/dist/client/og/og-image.png` exists
- [ ] `package.json` punya dependency `@astrojs/node` (✓ sudah)
- [ ] Tidak ada `node_modules/` di `dist/` (Astro exclude otomatis)
- [ ] Domain `menantu-resort.com` sudah pointing ke IP `103.63.24.139` (cek DNS A record)
- [ ] SSL certificate sudah ter-install (AutoSSL Let's Encrypt di cPanel)

---

## 🏗️ ARSITEKTUR DEPLOY (2 MODE)

### Mode A: Pure Static
- Upload `dist/client/*` ke `/home/egokkcmq/public_html/`
- LiteSpeed serve langsung, no Node process
- 16/16 halaman pre-rendered
- **Paling simpel & reliable** tapi tidak bisa pakai Node features (kalau ada)

### Mode B: Node SSR (RECOMMENDED untuk project ini) ⭐
- Upload **SEMUA** (`dist/client/` + `dist/server/`) ke `/home/egokkcmq/menantu-app/`
- Register Node.js App di cPanel "Setup Node.js App"
- App listen di port internal (mis. 3000) → cPanel reverse-proxy ke domain
- Bisa serve API routes (`/api/health`)
- Tetap static-render 16/16 pages (output: 'static') — Node hanya handle dynamic API

**Pilihan:** Gunakan **Mode B** untuk fleksibilitas (health endpoint, future SSR), tapi semua page tetap static-rendered sehingga performance sama dengan Mode A.

---

## 📦 STEP-BY-STEP DEPLOY — MODE B (NODE.JS SELECTOR)

### STEP 1: Build di local (Mac)

```bash
# Navigate ke project
cd /Users/maabook/Desktop/menantu-resort.com/app

# Install dependencies (kalau belum)
npm install

# Build untuk production
npm run build

# Verify output
ls -la dist/server/entry.mjs
ls -la dist/client/index.html
ls -la dist/client/.htaccess
```

Expected output: `entry.mjs` ~ 470KB, `dist/client/` ~ 74MB total.

### STEP 2: Login ke cPanel

1. Buka browser ke **`https://103.63.24.139:2083/`**
2. SSL warning mungkin muncul (self-signed). Klik **Advanced** → **Proceed to 103.63.24.139 (unsafe)**.
3. Masukkan:
   - **Username:** `egokkcmq`
   - **Password:** *(dari IDCloudHost client area)*
4. Klik **Log in**

### STEP 3: Buka Setup Node.js App

1. Setelah login, di dashboard cPanel cari section **"Software"** atau **"Advanced"**
2. Klik icon **"Setup Node.js App"** (atau "Application Manager" di beberapa versi cPanel)
3. Anda akan melihat list existing apps (kalau ada) + tombol **"CREATE APPLICATION"**

### STEP 4: Create Application

Isi form **CREATE APPLICATION** dengan:

| Field | Value | Catatan |
|---|---|---|
| **Node.js version** | `18.20.4` atau `20.x` (pilih LTS terbaru) | Cek IDCloudHost available versions |
| **Application mode** | `Production` | **PENTING** — bukan Development |
| **Application root** | `menantu-app` | Folder baru di `/home/egokkcmq/menantu-app` |
| **Application URL** | `menantu-resort.com` | Pilih domain utama |
| **Application startup file** | `dist/server/entry.mjs` | Path dari Application root |

**Environment variables** (tambah via "Add variable"):

| Variable | Value |
|---|---|
| `HOST` | `0.0.0.0` |
| `PORT` | `3000` (atau port kosong lain — lihat "Catatan PORT" di bawah) |
| `NODE_ENV` | `production` |
| `PUBLIC_GA4_ID` | `G-XXXXXXXXXX` (opsional, jika sudah setup GA4) |

**Catatan PORT:**
- cPanel IDCloudHost biasanya reserve port tertentu. Kalau `3000` conflict, coba `3001`, `4000`, `8080`.
- Setelah app dibuat, cPanel akan assign port internal + setup reverse proxy otomatis.

Klik **CREATE** / **CREATE APPLICATION**.

### STEP 5: Upload Files via File Manager

1. Kembali ke dashboard cPanel, buka **"File Manager"**
2. Navigasi ke `/home/egokkcmq/`
3. **Buat folder baru:** klik **+ Folder** → nama `menantu-app` → Create
4. **Masuk ke folder `menantu-app/`**
5. Upload file build. Ada 2 cara:

#### Cara 1: Upload ZIP (Recommended)

**Di local, compress:**
```bash
cd /Users/maabook/Desktop/menantu-resort.com/app
zip -r menantu-deploy.zip dist/ package.json package-lock.json
ls -lh menantu-deploy.zip
```

**Di cPanel File Manager:**
1. Klik **Upload** → pilih `menantu-deploy.zip`
2. Tunggu upload selesai (progress bar)
3. Klik kanan `menantu-deploy.zip` → **Extract**
4. Pilih extract ke `/home/egokkcmq/menantu-app/`
5. Setelah extract, akan ada folder `dist/` di dalam `menantu-app/`
6. **Penting:** `package.json` & `package-lock.json` harus di root `menantu-app/` (sejajar dengan `dist/`)

#### Cara 2: Upload via FTP (FileZilla)

1. Download & buka **FileZilla** ([filezilla-project.org](https://filezilla-project.org))
2. **File → Site Manager → New Site:**
   - **Protocol:** FTP - File Transfer Protocol
   - **Host:** `103.63.24.139`
   - **Port:** 21
   - **User:** `egokkcmq@menantu-resort.com` (atau `egokkcmq`)
   - **Password:** *(cPanel password)*
3. Klik **Connect**
4. Navigate ke `/menantu-app/` di remote side
5. Drag-and-drop dari local `app/dist/`, `app/package.json`, `app/package-lock.json` ke remote

### STEP 6: Install Production Dependencies

Kembali ke **Setup Node.js App** → klik app yang baru dibuat → klik **"Run NPM Install"** atau buka **Terminal** di cPanel.

#### Via Terminal (cPanel → Advanced → Terminal)

```bash
cd /home/egokkcmq/menantu-app
npm install --omit=dev
```

Proses ini install dependencies (Astro, Svelte, Tailwind, dll) tanpa devDependencies. Tunggu 1-3 menit.

#### Atau via Setup Node.js App UI

Di halaman detail app, biasanya ada tombol **"Run NPM Install"** yang otomatis `cd` ke Application root.

### STEP 7: Configure Reverse Proxy (PENTING!)

Agar domain `menantu-resort.com` mengarah ke Node app (bukan static files), perlu setup reverse proxy via `.htaccess` di `public_html/`.

1. **File Manager** → navigasi ke `/home/egokkcmq/public_html/`
2. **Backup `.htaccess` lama** (jika ada) → rename jadi `.htaccess.backup`
3. **Edit/Buat `.htaccess`** dengan isi berikut:

```apache
# ============================================
# Menantu Resort — Node.js Reverse Proxy
# ============================================

# Enable RewriteEngine
RewriteEngine On

# Skip proxy untuk file/folder yang harus served static
RewriteCond %{REQUEST_URI} ^/_astro/ [OR]
RewriteCond %{REQUEST_URI} ^/images/ [OR]
RewriteCond %{REQUEST_URI} ^/360/ [OR]
RewriteCond %{REQUEST_URI} ^/favicon\.svg$ [OR]
RewriteCond %{REQUEST_URI} ^/og/ [OR]
RewriteCond %{REQUEST_URI} ^/sitemap [OR]
RewriteCond %{REQUEST_URI} ^/robots\.txt$ [OR]
RewriteCond %{REQUEST_URI} ^/404\.html$
RewriteRule ^ - [L]

# Sisanya proxy ke Node.js app
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

# Default landing
DirectoryIndex index.html

# Pretty URLs (jika Node tidak handle)
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
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Block access to sensitive files
<FilesMatch "^\.env|\.git|id_rsa|package-lock\.json$">
  Order allow,deny
  Deny from all
</FilesMatch>
```

4. **Save** `.htaccess`

**Catatan:** Port `3000` di atas harus match dengan PORT env var di Step 4. Kalau Anda pakai port lain, sesuaikan.

**Alternatif tanpa reverse proxy** (kalau Node app sudah di-setup oleh cPanel selector dengan virtual host):
- cPanel IDCloudHost biasanya auto-create virtual host entry. Cek di **Setup Node.js App** → detail app → lihat **"Application URL"** atau **"Configured virtual host"**.
- Kalau ada, `.htaccess` di `public_html/` TIDAK perlu redirect — Node serve langsung di domain.

### STEP 8: Start / Restart Node.js App

Kembali ke **Setup Node.js App**:

1. Klik nama app yang baru dibuat
2. Klik tombol **"Restart"** atau **"Start"**
3. Tunggu status berubah jadi **"Running"** ✅
4. Lihat log output di **"Status"** atau klik **"Open Log"** untuk verify tidak ada error

Expected log:
```
[@astrojs/node] Server listening on http://0.0.0.0:3000
```

### STEP 9: Test di Browser

1. Buka **`https://menantu-resort.com/`** di browser
2. Verify:
   - Homepage load dengan hero parallax + drone image
   - Navbar sticky dengan menu lengkap
   - WhatsApp floating button (bottom-right)
   - Scroll → cookie consent muncul (1.5s delay)
   - Scroll progress gold line (top)
   - Villa detail pages accessible
3. Test beberapa page:
   - `https://menantu-resort.com/villa/`
   - `https://menantu-resort.com/villa/bijak/`
   - `https://menantu-resort.com/investasi/`
   - `https://menantu-resort.com/kontak/`
4. Test health endpoint:
   ```bash
   curl https://menantu-resort.com/api/health
   ```
   Expected: JSON `{"status":"ok",...}`

---

## 🛠️ TROUBLESHOOTING

### Problem 1: "ERR_CONNECTION_REFUSED" atau "Site can't be reached"

**Cause:** Node app tidak jalan atau port salah.

**Fix:**
1. cPanel → **Setup Node.js App** → klik app → cek status
2. Jika "Stopped", klik **Start**
3. Cek **"Open Log"** untuk error message
4. Verify PORT env var match dengan `.htaccess` proxy
5. Cek File Manager → `/home/egokkcmq/menantu-app/dist/server/entry.mjs` ada

### Problem 2: 500 Internal Server Error

**Cause:** Missing dependency atau build error.

**Fix:**
1. Terminal cPanel:
   ```bash
   cd /home/egokkcmq/menantu-app
   ls -la
   ls -la node_modules/ | head -10  # verify deps installed
   node -e "import('./dist/server/entry.mjs')"  # test import
   ```
2. Jika error, re-run `npm install --omit=dev`
3. Cek `package.json` dependencies lengkap

### Problem 3: 404 untuk semua page

**Cause:** `.htaccess` reverse proxy tidak aktif, atau Node app serve di port berbeda.

**Fix:**
1. Verify `.htaccess` ada di `public_html/`
2. Cek Apache `mod_rewrite` + `mod_proxy` enabled (cPanel default sudah enabled)
3. Cek port Node app di cPanel → Setup Node.js App → detail
4. Hard refresh browser: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Problem 4: Images not loading

**Cause:** Path atau permissions salah.

**Fix:**
1. File Manager → `/home/egokkcmq/menantu-app/dist/client/images/`
2. Verify folder + files exist
3. Cek permissions: folders `755`, files `644`
4. **PENTING:** Karena pakai reverse proxy, static files harus di-serve oleh Node (lihat konfigurasi `vite.assets` di `astro.config.mjs`)

**Solusi lebih clean:** Copy `dist/client/images/` ke `public_html/images/` via File Manager. Update Astro config agar tidak proxy image requests.

### Problem 5: Sitemap 404

**Cause:** `@astrojs/sitemap` plugin tidak generate di production mode, atau path conflict.

**Fix:**
1. Verify `astro.config.mjs` punya:
   ```js
   integrations: [sitemap({ changefreq: 'weekly', priority: 0.7 })]
   ```
2. Cek `dist/client/sitemap-index.xml` exists
3. Force regenerate: rebuild + redeploy

### Problem 6: WhatsApp button tidak connect

**Cause:** Nomor WhatsApp di `siteData.contact.whatsapp` salah.

**Fix:**
1. Edit `app/src/data/site.json`:
   ```json
   "contact": {
     "whatsapp": "6285925942277",
     "whatsappDisplay": "+62 859-2594-2277"
   }
   ```
2. Format: `62` + nomor, tanpa `+` atau `0` di depan
3. Rebuild: `npm run build` → redeploy

### Problem 7: GA4 tidak tracking

**Cause:** Env var tidak ter-load atau consent belum granted.

**Fix:**
1. cPanel → Setup Node.js App → Environment variables → add `PUBLIC_GA4_ID=G-XXXXXXXXXX`
2. Restart app
3. User harus klik **"Terima Semua"** di cookie consent (tidak auto-track)
4. Test di GA4 **Realtime** report (muncul dalam 30 detik)

### Problem 8: Out of memory / Node crash

**Cause:** Memory limit shared hosting terlalu kecil untuk KPR calculator + ROI simulator + BookingFlow sekaligus.

**Fix:**
1. Setup Node.js App → Application memory limit (jika configurable)
2. **Atau:** Pisahkan static pages (Mode A) dari dynamic (Mode B):
   - Upload `dist/client/` ke `public_html/`
   - Hanya jalankan `dist/server/entry.mjs` untuk `/api/*` saja
3. **Atau:** Optimasi bundle — hapus unused Svelte components

---

## 🔄 UPDATE / REDEPLOY

Setiap kali push perubahan baru ke production:

```bash
# 1. Di local — rebuild
cd /Users/maabook/Desktop/menantu-resort.com/app
npm run build

# 2. Compress
zip -r menantu-deploy-v1.0.1.zip dist/ package.json package-lock.json

# 3. Upload via cPanel File Manager (replace old files)
#    - Backup old: rename menantu-app → menantu-app.backup
#    - Extract new zip to menantu-app
#    - Verify package.json + dist/server/entry.mjs updated

# 4. Re-install deps (jika ada dependency baru)
cd /home/egokkcmq/menantu-app
npm install --omit=dev

# 5. Restart Node app
# cPanel → Setup Node.js App → klik app → Restart

# 6. Clear CDN cache (jika pakai Cloudflare, dll)

# 7. Test
curl https://menantu-resort.com/api/health
```

---

## 📊 MONITORING POST-DEPLOY

### 1. Health Check (recommended: setup UptimeRobot)

```bash
# Test manual
curl https://menantu-resort.com/api/health
```

**Setup UptimeRobot (free):**
1. Daftar di [uptimerobot.com](https://uptimerobot.com)
2. **Add New Monitor:**
   - **Type:** HTTP(s)
   - **URL:** `https://menantu-resort.com/api/health`
   - **Monitoring Interval:** 5 minutes
   - **Alert Contacts:** email + WhatsApp (jika ada)
3. **Save** → akan ping setiap 5 menit, alert jika down

### 2. Google Analytics 4

1. Setup property di [analytics.google.com](https://analytics.google.com)
2. Dapatkan Measurement ID (format: `G-XXXXXXXXXX`)
3. Tambahkan ke cPanel env var: `PUBLIC_GA4_ID=G-XXXXXXXXXX`
4. **Restart Node app**
5. Verify di **Realtime** report — pageview muncul dalam 30 detik
6. Lihat **Events → web_vital** untuk Core Web Vitals

### 3. cPanel Error Logs

Cek log error berkala:
- cPanel → **Metrics → Error Log** (Apache errors)
- cPanel → **Setup Node.js App** → detail app → **Open Log** (Node stderr)
- cPanel → **File Manager** → `/home/egokkcmq/menantu-app/` (kalau ada `.log` files)

### 4. Disk Usage

Monitor ukuran folder:
- cPanel → **Files → Disk Space Usage**
- Folder `menantu-app/` harus < 500MB
- Folder `public_html/` harus < 200MB (kalau pakai Mode A)

---

## 🆘 EMERGENCY ROLLBACK

Kalau deploy baru bermasalah:

```bash
# Via cPanel File Manager:
# 1. Rename current menantu-app → menantu-app.broken
# 2. Rename menantu-app.backup → menantu-app
# 3. Restart Node app
# 4. Test

# Atau via Terminal:
cd /home/egokkcmq
mv menantu-app menantu-app.broken-$(date +%Y%m%d-%H%M%S)
mv menantu-app.backup menantu-app
# cPanel → Setup Node.js App → Restart
```

---

## 📋 QUICK REFERENCE

| Action | Path / Command |
|---|---|
| cPanel login | `https://103.63.24.139:2083/` user `egokkcmq` |
| File Manager | cPanel → Files → File Manager |
| Terminal | cPanel → Advanced → Terminal |
| Node App Manager | cPanel → Software → Setup Node.js App |
| Restart Node | cPanel → Setup Node.js App → app → Restart |
| View Logs | cPanel → Setup Node.js App → app → Open Log |
| Edit Env | cPanel → Setup Node.js App → app → Env Variables |
| Run npm install | Terminal → `cd menantu-app && npm install --omit=dev` |
| Check health | `curl https://menantu-resort.com/api/health` |
| Test connectivity | `curl -I https://menantu-resort.com/` |

---

## 🔒 SECURITY CHECKLIST

- [ ] SSL aktif (HTTPS only, no HTTP)
- [ ] `.env` file TIDAK di-upload ke `menantu-app/` atau `public_html/`
- [ ] `id_rsa*` SSH keys TIDAK ter-commit
- [ ] `node_modules/` tidak di-upload (install via `npm install` di server)
- [ ] `.htaccess` blocking access ke `.env`, `.git`, `id_rsa*`
- [ ] File permissions: folders `755`, files `644`
- [ ] Database (jika ada) di-password yang kuat
- [ ] cPanel password di-2FA jika IDCloudHost support

---

## 📞 SUPPORT ESCALATION

| Issue | Contact |
|---|---|
| cPanel login error | IDCloudHost 24/7 chat |
| Node app error | Cek log dulu, lalu escalate ke dev |
| Domain DNS issue | IDCloudHost DNS manager |
| SSL cert issue | AutoSSL di cPanel → "Run AutoSSL" |
| Email not working | cPanel → Email Accounts |
| Database issue | cPanel → phpMyAdmin |

---

*Generated by Codex — 15 Juni 2026*
*Project: menantu-resort.com v5.2*
