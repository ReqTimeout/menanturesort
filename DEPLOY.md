# 🚀 DEPLOY GUIDE — Menantu Resort ke IDCloudHost cPanel

> **Hosting:** IDCloudHost shared (LiteSpeed + cPanel) — IP 103.63.24.139
> **Runtime:** Node.js 18+ via cPanel "Setup Node.js App"  
> **Domain:** menantu-resort.com  
> **Tidak ada SSH** (port 22 closed confirmed) — pakai cPanel/FTP

---

## 📋 PRASYARAT

- Akses cPanel: `https://103.63.24.139:2083/` (user: `egokkcmq`)
- Node.js 18+ sudah tersedia di server (port 3000 Node app running confirmed)
- Domain `menantu-resort.com` sudah pointing ke server via DNS
- SSL Let's Encrypt sudah di-install di cPanel (atau pakai AutoSSL)
- Repo Git di GitHub / GitLab (private recommended)

---

## 🏗️ ARSITEKTUR DEPLOY

Project ini punya **2 mode deployment** karena pakai Astro hybrid (`output: 'static'` + Node adapter):

### Mode A: Pure Static (RECOMMENDED untuk shared hosting)
- `dist/client/*` di-upload ke `public_html/`
- 9 halaman di-prerender jadi HTML statis
- LiteSpeed serve langsung, no Node process
- **Paling cepat, paling murah, paling reliable**

### Mode B: Node SSR (untuk halaman dinamis future)
- `dist/server/entry.mjs` dijalankan via cPanel Node.js selector
- Default listen port di-override cPanel (lihat PORT env)
- Bisa serve SSR halaman tapi menambah overhead
- **Pakai ini kalau Phase 5/6 butuh halaman dinamis (simulasi KPR interaktif)**

**Untuk Phase 1-4 (sekarang):** Gunakan **Mode A** (static). Simulasi KPR Svelte bisa di-hydrate di static HTML tanpa Node.

---

## 📦 STEP-BY-STEP: MODE A (STATIC)

### 1. Build di local

```bash
cd /Users/maabook/Desktop/menantu-resort.com/app
npm run build
# Output: dist/client/ (HTML statis + asset)
```

### 2. Verify local (opsional)

```bash
# Pakai Node server (Astro Node adapter)
PORT=3001 node ./dist/server/entry.mjs
# Buka http://localhost:3001/

# Atau pakai static server simple
npx serve dist/client -p 3002
```

### 3. Upload ke cPanel

**Cara A: File Manager (paling mudah)**
1. Login ke `https://103.63.24.139:2083/`
2. Buka **File Manager** → navigasi ke `public_html/`
3. **BACKUP** existing: select all → compress → `public_html_backup_$(date).zip`
4. Hapus isi `public_html/` (atau replace)
5. Upload `dist/client/` content:
   - Cara 1: Compress `dist/client/` ke zip → upload zip → extract di server
   - Cara 2: Upload per-file (lambat)
6. Pastikan `.htaccess` ter-upload (lihat step 4)
7. Set permission: files `644`, folders `755`

**Cara B: FTP (untuk update rutin)**
```bash
# Install lftp atau pakai FileZilla GUI
lftp -c "open -u egokkcmq,PASSWORD ftp://103.63.24.139; \
  mirror -R --delete --verbose app/dist/client/ /public_html/"
```

**Cara C: Git version control di cPanel** (RECOMMENDED)
1. Login cPanel → **Git Version Control** (kalau ada)
2. Create repository:
   - URL: `https://github.com/USERNAME/menantu-resort.com.git`
   - Path: `/home/egokkcmq/menantu-resort-build/`
3. Pull latest
4. Setup deploy hook (lihat di bawah)

### 4. `.htaccess` untuk LiteSpeed

Buat `public_html/.htaccess`:

```apache
# ============================================
# Menantu Resort — LiteSpeed Configuration
# ============================================

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Pretty URLs (hapus .html)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !\. [NC]
RewriteRule ^(.*)$ /$1.html [L]

# 404 fallback ke /404.html (untuk Astro trailing slash)
ErrorDocument 404 /404.html

# Cache static assets (1 year)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresDefault "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml application/xml text/xml
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Disable directory listing
Options -Indexes
```

### 5. SSL/HTTPS

- cPanel → **SSL/TLS Status** → run **AutoSSL** untuk `menantu-resort.com`
- Atau pakai **Let's Encrypt** (free) di cPanel → **SSL/TLS** → **Manage SSL Sites**

### 6. Verify deployment

- Buka `https://menantu-resort.com/` → homepage load
- Buka `https://menantu-resort.com/villa/` → listing villa
- Buka `https://menantu-resort.com/villa/bijak/` → detail
- Buka `https://menantu-resort.com/faq/` → FAQ accordion
- Test 404: `https://menantu-resort.com/nonexistent/` → 404 page custom
- Test mobile responsive: Chrome DevTools mobile mode
- Lighthouse: target Performance 95+, Accessibility 90+, Best Practices 95+, SEO 100

---

## 📦 STEP-BY-STEP: MODE B (NODE SSR)

> **Gunakan kalau** Phase 5/6 butuh halaman SSR (misal `/simulasi-kpr` dengan database).

### 1. Build dengan output server

`astro.config.mjs` sudah di-config dengan `output: 'static'` + Node adapter.
Untuk switch ke SSR mode, edit per-halaman: `export const prerender = false;`

Atau ganti global ke:
```js
output: 'server'
```

### 2. Upload `dist/` (bukan `dist/client/`)

Upload SELURUH `dist/` folder ke `/home/egokkcmq/menantu-resort-app/`

### 3. Setup Node.js App di cPanel

1. cPanel → **Setup Node.js App** (di section "Software")
2. Klik **Create Application**
3. Isi:
   - **Node.js version:** 18.x atau 20.x (pilih yang tersedia)
   - **Application mode:** Production
   - **Application root:** `menantu-resort-app` (path ke folder `dist/`)
   - **Application URL:** `menantu-resort.com` (atau `node.menantu-resort.com` kalau static di subdomain lain)
   - **Application startup file:** `server/entry.mjs`
   - **Passenger log file:** (auto)
4. Klik **Create**
5. Catat **virtual environment** yang di-generate (mis. `/home/egokkcmq/nodevenv/menantu-resort-app/18/`)

### 4. Install dependencies di server

cPanel akan jalankan `npm install` otomatis (kalau ada `package.json` di root).
TAPI kalau pakai `dist/` only (no node_modules), pakai cara ini:

```bash
# Di local, build dengan --external atau copy node_modules
# Lalu zip dist + package.json + package-lock.json
# Upload ke server
# Di cPanel Terminal (kalau ada) atau SSH:
cd ~/menantu-resort-app
npm install --production
```

### 5. Restart Node app

cPanel → Setup Node.js App → klik **Restart** untuk aplikasi `menantu-resort-app`.

### 6. Setup reverse proxy (kalau Node listen di port lain)

cPanel → **Domains** → `menantu-resort.com` → **Document Root** tetap `public_html/`
Untuk route traffic Node, pakai `.htaccess` di public_html:

```apache
# Proxy ke Node server (kalau listen di port 3000)
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

Atau lebih clean: pisahkan static di `static.menantu-resort.com` + Node di `app.menantu-resort.com`.

---

## 🔄 WORKFLOW PUSH-TO-DEPLOY (Recommended)

### Setup GitHub Actions (CI/CD)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to IDCloudHost

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: app/package-lock.json

      - name: Install
        working-directory: app
        run: npm ci

      - name: Build
        working-directory: app
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4
        with:
          server: 103.63.24.139
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: app/dist/client/
          server-dir: /public_html/
          # Optional: delete remote files not in local
          dangerous-clean-slate: false
```

Setup secrets di GitHub repo:
- `FTP_USER`: `egokkcmq`
- `FTP_PASSWORD`: (password FTP dari cPanel)

Setiap push ke `main` → build → upload ke server.

---

## 🔐 SECURITY CHECKLIST

- [ ] Ganti SSH password (yang lama ke-expose di chat)
- [ ] Generate FTP password khusus (jangan pakai cPanel password)
- [ ] Enable 2FA di cPanel kalau tersedia
- [ ] Set proper file permissions: 644 files, 755 dirs, 600 .env
- [ ] Backup `public_html/` mingguan ke local (atau pakai cPanel backup)
- [ ] Monitor uptime dengan UptimeRobot (free) → email/SMS alert
- [ ] Setup Cloudflare (free tier) untuk DDoS protection + CDN cache
- [ ] Ganti `siteData.contact.whatsapp` dari dummy `6281234567890` ke nomor asli
- [ ] Set `PUBLIC_GA4_ID` di cPanel Environment Variables untuk tracking

---

## 📊 POST-DEPLOY CHECKLIST

- [ ] Submit sitemap ke Google Search Console: `https://menantu-resort.com/sitemap-index.xml`
- [ ] Test rich results: `https://search.google.com/test/rich-results`
- [ ] Test PageSpeed: `https://pagespeed.web.dev/`
- [ ] Verify Schema.org di `https://validator.schema.org/`
- [ ] Set custom domain email (opsional): `sales@menantu-resort.com` via cPanel Email
- [ ] Setup Google Business Profile untuk `Menantu Resort` location
- [ ] Daftar di Google Analytics 4 + Search Console
- [ ] Monitor 404 errors di cPanel → Apache Error Log
- [ ] Test mobile page speed dari device asli (3G/4G)
- [ ] Share link ke WhatsApp Business → preview harus muncul dengan OG image

---

## 🆘 TROUBLESHOOTING

### "ERR_TOO_MANY_REDIRECTS" setelah deploy
→ Cek `.htaccess` HTTPS redirect loop. Pastikan `RewriteCond %{HTTPS} off` di atas rule.

### Halaman 404 di route yang ada
→ Astro generate URL dengan trailing slash (`/villa/bijak/`). LiteSpeed default support.
→ Cek `pretty URLs` rule di `.htaccess`.

### Asset (CSS/JS) tidak load
→ Cek permission file `_astro/` folder (harus 755, file 644).
→ Cek `.htaccess` `mod_expires` tidak block.

### Font Google tidak load
→ Pastikan tidak di-block firewall. Preconnect sudah ditambah di `<head>`.

### Build sukses tapi ada error di console browser
→ Buka DevTools → Console, screenshot errornya. Biasanya error dari Svelte hydration — cek console untuk stack trace.

### Node SSR app tidak start
→ Cek Node version compatibility. cPanel mungkin punya versi lama.
→ Cek `package.json` engines field: `"node": ">=18.17.0"`.

---

*Last updated: 2026-06-14*
