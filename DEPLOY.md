# 🚀 DEPLOY GUIDE — Menantu Resort → GitHub + cPanel IDCloudHost

> **Last updated:** 15 Juni 2026
> **Mode:** Hybrid (Static + Node.js SSR)
> **Repo:** [github.com/ReqTimeout/menanturesort](https://github.com/ReqTimeout/menanturesort)
> **Live:** https://menantu-resort.com/

---

## 🔐 KREDENSIAL & AKSES

### GitHub
| Item | Value |
|---|---|
| **Repository** | `git@github.com:ReqTimeout/menanturesort.git` |
| **Branch** | `main` |
| **SSH key** | `~/.ssh/id_rsa` (default Mac SSH) |
| **Verified** | ✅ `Hi ReqTimeout! You've successfully authenticated` |

### cPanel IDCloudHost
| Item | Value |
|---|---|
| **cPanel URL** | `https://103.63.24.139:2083/` |
| **Username** | `egokkcmq` |
| **Server IP** | `103.63.24.139` |
| **Domain** | `menantu-resort.com` |
| **Document Root** | `/home/egokkcmq/public_html/` |
| **App folder (Node)** | `/home/egokkcmq/menantu-app/` |

### Port
| Service | Port | Status |
|---|---|---|
| cPanel Web UI | 2083 (HTTPS) | ✅ Open |
| FTP | 21 (TLS) | ✅ Open |
| SSH | 22 | ❌ Closed (pakai cPanel/FTP only) |
| Node.js App | custom | via cPanel selector |

### FTP Login
| Item | Value |
|---|---|
| **Host** | `103.63.24.139` |
| **Username** | `egokkcmq` (atau `egokkcmq@menantu-resort.com`) |
| **Password** | *(cPanel password — lihat IDCloudHost client area)* |
| **Encryption** | TLS (wajib) |

---

## 🏗️ ARSITEKTUR DEPLOY

Project ini pakai **Astro hybrid** (`output: 'static'` + Node adapter). 2 mode:

### Mode A: Pure Static (RECOMMENDED)
- Upload `dist/client/*` ke `/home/egokkcmq/public_html/`
- 16/16 halaman di-prerender jadi HTML statis
- LiteSpeed serve langsung, no Node process
- **Paling simpel, paling reliable, paling murah**

### Mode B: Node SSR (untuk dynamic features)
- Upload `dist/server/entry.mjs` + `package.json` ke `/home/egokkcmq/menantu-app/`
- Register Node.js App di cPanel "Setup Node.js App"
- Bisa serve API routes (e.g., `/api/health`)
- Tetap static-render semua pages (output: 'static') — Node hanya untuk future SSR

**Untuk saat ini:** Gunakan **Mode A** (Static). Sudah cukup untuk semua fitur (form, simulasi, gallery).

---

## 📋 WORKFLOW LENGKAP: GIT → CPANEL

### STEP 1: Setup SSH key untuk GitHub (ONE-TIME)

```bash
# Cek apakah SSH key sudah ada
ls -la ~/.ssh/id_rsa*

# Test koneksi ke GitHub
ssh -T git@github.com
# Expected: "Hi ReqTimeout! You've successfully authenticated"
```

**Kalau belum ada key** (kalau `~/.ssh/id_rsa` tidak ada):

```bash
# Generate SSH key baru
ssh-keygen -t ed25519 -C "your_email@example.com"
# Tekan Enter 3x (no passphrase untuk simplicity)

# Tambahkan ke ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Paste ke: https://github.com/settings/keys → New SSH key
```

### STEP 2: Setup Git Remote (ONE-TIME per project)

```bash
cd /Users/maabook/Desktop/menantu-resort.com

# Add remote (kalau belum)
git remote add origin git@github.com:ReqTimeout/menanturesort.git
git remote -v  # verify

# Verify push access
ssh -T git@github.com
```

### STEP 3: Commit & Push ke GitHub

```bash
cd /Users/maabook/Desktop/menantu-resort.com

# Check status
git status

# Stage semua perubahan (kecuali yang di-ignore)
git add -A

# Verify yang akan di-commit (pastikan tidak ada SSH keys/env files)
git diff --cached --name-only | grep -iE "id_rsa|\.env|secret|key"
# Expected: empty (no sensitive files)

# Commit
git commit -m "feat: deskripsi perubahan"

# Push
git push -u origin main
```

**Auto-push script** (optional, di `~/.zshrc`):

```bash
alias deploy-menantu="cd /Users/maabook/Desktop/menantu-resort.com && git add -A && git commit -m 'deploy: \$(date +%Y-%m-%d)' && git push origin main"
```

### STEP 4: Build di Local

```bash
cd /Users/maabook/Desktop/menantu-resort.com/app

# Install dependencies (kalau fresh clone)
npm install

# Build production
npm run build

# Verify output
ls -la dist/server/entry.mjs
ls -la dist/client/index.html
ls -la dist/client/.htaccess
```

Expected: `dist/client/` ~75MB (mostly images), `dist/server/entry.mjs` ~3KB.

### STEP 5: Upload ke cPanel

#### Opsi A: Pure Static (RECOMMENDED)

**Cara 1: lftp (terminal/SSH-friendly)**

```bash
cd /Users/maabook/Desktop/menantu-resort.com
./deploy-static.sh
# Script akan prompt password cPanel
```

**Cara 2: Manual via cPanel File Manager**

1. Login ke `https://103.63.24.139:2083/`
2. Buka **File Manager** → navigasi ke `public_html/`
3. **BACKUP existing** (kalau ada):
   - Select all → Compress → `public_html_backup_$(date).zip`
4. Hapus isi `public_html/` (atau replace)
5. Upload `menantu-deploy-static.zip` (file yang sudah di-generate):
   - **Upload** → pilih file → tunggu selesai
   - Klik kanan zip → **Extract** → extract ke `public_html/`
6. **Verify** `.htaccess` ter-upload (cek di File Manager)
7. Set permissions: files `644`, folders `755`

**Cara 3: FileZilla (GUI)**

1. Download [FileZilla](https://filezilla-project.org)
2. **File → Site Manager → New Site:**
   - **Protocol:** FTP over TLS (explicit)
   - **Host:** `103.63.24.139`
   - **Port:** 21
   - **User:** `egokkcmq`
   - **Password:** *(cPanel password)*
3. **Connect** (accept cert)
4. Navigate ke `/public_html/` di remote
5. Drag-and-drop dari local `app/dist/client/` ke remote

#### Opsi B: Node SSR Mode (advanced)

**Cara 1: ZIP upload + cPanel Node Setup**

1. File Manager → buat folder `/menantu-app/`
2. Upload `menantu-deploy-node.zip` ke folder itu
3. Extract zip
4. **Setup Node.js App** (cPanel → Software section):
   - Klik **CREATE APPLICATION**
   - **Node.js version:** `20.x` (atau `18.20.4`)
   - **Application mode:** Production
   - **Application root:** `menantu-app`
   - **Application URL:** `menantu-resort.com`
   - **Application startup file:** `dist/server/entry.mjs`
   - **Env vars:** `HOST=0.0.0.0`, `PORT=3000`, `NODE_ENV=production`
5. Klik **CREATE**
6. Klik app yang baru dibuat → **Run NPM Install** (atau buka Terminal)
7. **Restart** app
8. **Setup reverse proxy** di `public_html/.htaccess` (lihat DEPLOY_IDCLOUDHOST.md)

### STEP 6: Verify Live Site

```bash
# Test homepage
curl -I https://menantu-resort.com/

# Test static assets
curl -I https://menantu-resort.com/_astro/[some-file].css

# Test specific page
curl -I https://menantu-resort.com/villa/
```

**Manual checks di browser:**
- [ ] Homepage load dengan hero parallax
- [ ] Navbar sticky + menu lengkap
- [ ] Villa pages accessible: `/villa/bijak/`, `/villa/idaman/`, `/villa/mapan/`
- [ ] WhatsApp floating button (desktop only)
- [ ] Sticky mobile CTA (3 buttons)
- [ ] Form WhatsApp submit buka wa.me link
- [ ] SSL valid (https, no warning)
- [ ] Mobile responsive (test 390px width)

---

## 🔧 DEPLOY SCRIPT (TERMINAL ONLY)

File `deploy-static.sh` (sudah ada di root project) mengotomasi upload via lftp:

```bash
#!/bin/bash
# Usage: ./deploy-static.sh
# Akan prompt password cPanel

CPANEL_HOST="103.63.24.139"
CPANEL_USER="egokkcmq"
LOCAL_DIST="app/dist/client"

# Backup + mirror upload via lftp
lftp -c "
  set ssl:verify-certificate no
  open -u $CPANEL_USER,PASSWORD ftp://$CPANEL_HOST
  cd public_html
  mirror --reverse --delete --only-newer --verbose $LOCAL_DIST/ ./
  bye
"
```

**Run:**
```bash
cd /Users/maabook/Desktop/menantu-resort.com
./deploy-static.sh
```

File `deploy-node.sh` (Node SSR mode) — manual cPanel steps.

---

## 🔄 UPDATE ROUTINE (setelah initial deploy)

Setiap kali ada perubahan di local:

```bash
cd /Users/maabook/Desktop/menantu-resort.com

# 1. Commit & push ke GitHub
git add -A
git commit -m "feat: update deskripsi"
git push origin main

# 2. Build
cd app && npm run build && cd ..

# 3. Deploy (pilih salah satu)
./deploy-static.sh   # atau manual via FileZilla
```

---

## 📊 FILE SIZES & OPTIMIZATION

| File | Size | Notes |
|---|---|---|
| `dist/client/` total | ~75MB | Mostly images (68MB) |
| `dist/client/_astro/*.js` | ~1MB | All JS bundles (minified) |
| `dist/client/_astro/*.css` | ~80KB | Minified CSS |
| `dist/server/entry.mjs` | ~3KB | Node entry (untuk SSR) |
| `menantu-deploy-static.zip` | 59MB | Compressed for upload |
| `menantu-deploy-node.zip` | 59MB | + package files |

**Optimization tips:**
- Images already compressed (JPEG/PNG, max 3MB each)
- `menantu.jpg` di `public/360/` 17MB — consider CDN for production
- CSS minified by Tailwind
- JS minified by Astro/Vite

---

## 🚨 TROUBLESHOOTING

### "Connection refused" ke cPanel
- cPanel UI: cek `https://103.63.24.139:2083/` di browser
- Mungkin firewall/network block dari lokasi Anda

### FTP "530 Login incorrect"
- Password salah — reset via IDCloudHost client area
- Atau coba `egokkcmq@menantu-resort.com` sebagai username

### ".htaccess not found" setelah deploy
- File hidden, enable "Show hidden files" di File Manager
- Atau `.htaccess` ter-ignore karena nama dia hidden

### 404 di semua page
- Cek `.htaccess` rewrite rules aktif
- Cek document root di cPanel "Domains" section
- Cek DNS A record menantu-resort.com → 103.63.24.139

### Build error "Cannot find module"
```bash
cd app
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Node app "Cannot find module" di server
- Pastikan `package.json` & `package-lock.json` ter-upload ke `menantu-app/`
- Run `npm install --omit=dev` di server

---

## 📞 SUPPORT

- **IDCloudHost 24/7 chat:** [idcloudhost.com](https://idcloudhost.com)
- **GitHub repo:** [github.com/ReqTimeout/menanturesort](https://github.com/ReqTimeout/menanturesort)
- **Local project lead:** lihat `app/src/data/site.json` contact section

---

*Last updated: 15 Juni 2026 by Codex (V10 audit + deploy prep)*
