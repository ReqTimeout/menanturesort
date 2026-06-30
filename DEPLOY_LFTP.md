# 🚀 DEPLOY via lftp — Menantu Resort ke IDCloudHost

> **Last verified:** 30 Juni 2026 (lftp 4.9.3, macOS zsh)
> **Method:** `lftp` push-only (additive, no-delete, safe for live site)
> **Live build:** https://menantu-resort.com/

Dokumen ini **supersedes** bagian `Mode A` di `DEPLOY_IDCLOUDHOST.md`. Folder layout yang ditulis di sana **OUTDATED** (lihat warning di bawah).

---

## ⚠️ CRITICAL: Folder Layout Trap

Saat pertama kali deploy, diasumsikan `menantu-resort.com` adalah main domain dengan doc root `public_html/`. **Itu salah untuk setup cPanel saat ini:**

| Path | Isi | Catatan |
|---|---|---|
| `/home/egokkcmq/public_html/` | **WordPress** (main cPanel account, BUKAN menantu-resort.com) | ⚠️ JANGAN deploy ke sini — akan hapus WordPress site |
| `/home/egokkcmq/menantu-resort.com/` | **Astro static build** (addon domain) | ✅ **INI target deploy yang benar** |
| `/home/egokkcmq/menantu-resort.com.backup-YYYY-MM-DD/` | Backup otomatis sebelum deploy | ✅ Rollback safety net |

**Cara verify domain serve dari folder mana:**
```bash
curl -sI https://menantu-resort.com/ | grep -i "last-modified"
# Cocokkan dengan timestamp file di remote:
lftp ... -e "ls -la menantu-resort.com/index.html; bye"
```

**Cara verify folder = addon vs main domain:**
- Main domain cPanel account → serve dari `public_html/`
- Addon domain → serve dari folder同名 di `/home/egokkcmq/<domain>/` (di luar public_html)

---

## 🔐 Kredensial & Pre-requisites

Lokasi: `DEPLOY_IDCLOUDHOST.md` (baris 10-40). Highlights:

```bash
HOST=103.63.24.139
USER=egokkcmq             # TANPA @menantu-resort.com (login 530 kalau pakai email penuh)
PASS=<cPanel password>    # dari DEPLOY_IDCLOUDHOST.md
REMOTE_DIR=menantu-resort.com
LOCAL_DIST=/Users/maabook/Desktop/menantu-resort.com/app/dist/client
```

**Tools:** `lftp` 4.9.3+ (`brew install lftp`), `curl` untuk verify.

---

## 🛠️ Mode Deploy (pilih salah satu)

| Mode | Method | Risiko | Rollback | Cocok untuk |
|---|---|---|---|---|
| **A. Push-only** | `mirror --reverse` (no `--delete`) | ✅ Terendah — additive only | Instant | Update rutin, content tidak ada yang dihapus |
| **B. Push + cleanup legacy** | A + `rm -r` folder junk (`api/`, `404/`, `.DS_Store`) | ✅ Rendah — tertarget | Instant | Cleanup folder-folder sisa build lama |
| **C. Atomic swap** | Push ke `menantu-resort.com.new/`, lalu `mv` 2 folder | ⚡ Zero-downtime, zero-risk | Instant (rename balik) | Production-grade, butuh 2× disk |
| **D. Full mirror with `--delete`** | `mirror --reverse --delete` | ❌ Tinggi untuk live site | Restore dari backup | **TIDAK DIREKOMENDASIKAN** untuk live |

**Rekomendasi:** Mode A untuk harian, Mode C untuk release besar.

---

## 📋 Pre-flight Checklist

- [ ] Build fresh: `cd app && npm run build` (cek `dist/server/entry.mjs` & `dist/client/index.html` updated)
- [ ] `dist/client/` size ~30-35MB, 300-400 files
- [ ] `.htaccess` di `dist/client/` 1888 bytes (static cache rules)
- [ ] `fbq('init', '866468102744117')` ada di `dist/client/index.html` (`grep -c fbq dist/client/index.html` → ~18)
- [ ] lftp installed: `which lftp` → `/usr/local/bin/lftp`
- [ ] Backup exists: cek `menantu-resort.com.backup-*.zip` atau folder di `/home/egokkcmq/`

---

## 🚀 DEPLOY: Mode A (Push-only) — Default

### Step 1: Set env vars (password jangan ditulis di history)

```bash
set +H                              # disable zsh history expansion (! di password safe)
unset HISTFILE
export FTP_USER='egokkcmq'
export FTP_PASS='<cPanel password>'
export HOST='103.63.24.139'
export LOCAL_DIST='/Users/maabook/Desktop/menantu-resort.com/app/dist/client'
export REMOTE_DIR='menantu-resort.com'
```

### Step 2: Quick connectivity test

```bash
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e \
  "set ssl:verify-certificate no; set ftp:ssl-allow no; pwd; ls | head -5; bye"
```

Expected: `ftp://egokkcmq:...@103.63.24.139` lalu listing folder home (bashrc, cpanel, public_html, **menantu-resort.com**, dll).

### Step 3: Pre-upload state check

```bash
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e \
  "set ssl:verify-certificate no; set ftp:ssl-allow no;
   cd $REMOTE_DIR;
   echo '--- index.html before ---'; ls -la index.html;
   echo '--- file count ---'; find . -type f | wc -l;
   bye"
```

### Step 4: Push deploy

Buat file `/tmp/menantu-deploy.sh` (atau pakai yang di repo: `app/scripts/deploy-lftp.sh`):

```bash
#!/bin/bash
# Push-only deploy via lftp — additive, safe for live site
set -e
set +H
unset HISTFILE

export FTP_USER='egokkcmq'
export FTP_PASS='<cPanel password>'
export HOST='103.63.24.139'
export LOCAL='/Users/maabook/Desktop/menantu-resort.com/app/dist/client'
export REMOTE_DIR='menantu-resort.com'
LOG="/tmp/menantu-deploy-$(date +%Y%m%d-%H%M%S).log"

lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" <<LFTPEOF 2>&1 | tee "$LOG"
set ssl:verify-certificate no
set ftp:ssl-allow no
set net:timeout 120
set net:max-retries 5
set ftp:passive-mode yes
set mirror:parallel-transfer-count 4
set cmd:fail-exit yes

cd $REMOTE_DIR
echo "=== BEGIN MIRROR (push-only, 4 parallel) ==="
mirror --reverse --parallel=4 \
  --exclude ".DS_Store" \
  --exclude-glob "**/.DS_Store" \
  --exclude-glob "._*" \
  --continue \
  --verbose \
  "$LOCAL/" "./"
echo "=== END MIRROR ==="
ls -la index.html
bye
LFTPEOF

echo "Log: $LOG"
```

Jalankan:
```bash
chmod +x /tmp/menantu-deploy.sh
/tmp/menantu-deploy.sh
```

**Waktu:** ~5-10 menit untuk 343 files @ 4 parallel.

### Step 5: Verify live site

```bash
# HTTP HEAD
curl -sI -L https://menantu-resort.com/ | grep -iE "HTTP/|last-modified|content-length"

# Meta Pixel check
curl -sL https://menantu-resort.com/ | grep -oE "866468102744117|fbq.{0,60}" | head -5

# Route smoke test
for r in "" "villa/bijak/" "villa/idaman/" "villa/mapan/" "investasi/" "kontak/" "promo/" "artikel/" "sitemap.xml"; do
  code=$(curl -sLo /dev/null -w "%{http_code}" --max-time 12 "https://menantu-resort.com/$r")
  printf "  %-30s %s\n" "$r" "$code"
done
```

Expected:
- `HTTP/2 200`, `last-modified` updated ke hari deploy, `content-length` match `dist/client/index.html`
- Meta Pixel ID muncul di served HTML
- Semua route `200`

### Step 6 (optional): Cleanup legacy folder

Kalau pakai Mode B (push + cleanup), setelah Step 5 sukses:

```bash
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e \
  "set ssl:verify-certificate no; set ftp:ssl-allow no;
   cd $REMOTE_DIR;
   rm -rf api 404 .DS_Store;
   echo '--- after cleanup ---';
   ls;
   bye"
```

Folder yang aman dihapus (legacy dari build lama):
- `api/` — leftover dari Node SSR Mode B build sebelumnya
- `404/` — folder redundant (yang dipakai `404.html`, bukan folder)
- `.DS_Store` — macOS Finder metadata

**JANGAN hapus:**
- `360/`, `_astro/`, `images/`, `og/`, `artikel/`, `villa/`, `sitemap.xml`, `.htaccess`, `index.html`, `favicon.svg`, `robots.txt`

---

## 🔄 DEPLOY: Mode C (Atomic swap) — Untuk release besar

```bash
# 1. Upload ke folder baru
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e "
  set ssl:verify-certificate no; set ftp:ssl-allow no;
  mkdir -p menantu-resort.com.new;
  cd menantu-resort.com.new;
  mirror --reverse --parallel=4 --delete \
    --exclude '.DS_Store' --exclude-glob '**/.DS_Store' \
    '$LOCAL/' './';
  bye"

# 2. Atomic swap (jeda 0 detik, zero downtime)
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e "
  set ssl:verify-certificate no; set ftp:ssl-allow no;
  mv menantu-resort.com menantu-resort.com.bak-\$(date +%Y%m%d-%H%M%S);
  mv menantu-resort.com.new menantu-resort.com;
  bye"
```

**Rollback instant:**
```bash
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e "
  set ssl:verify-certificate no; set ftp:ssl-allow no;
  rm -rf menantu-resort.com;
  mv menantu-resort.com.bak-20260630-121740 menantu-resort.com;
  bye"
```

---

## 🛠️ Troubleshooting

### 530 Login authentication failed
- **Cause:** Pakai `egokkcmq@menantu-resort.com` (email form) instead of `egokkcmq` (username only)
- **Fix:** `FTP_USER=egokkcmq`

### Certificate verification failed / "subject name does not match target host"
- **Cause:** Server SSL cert untuk `iix1280.idcloudhost.com`, kita connect ke `103.63.24.139`
- **Fix:** `set ssl:verify-certificate no; set ftp:ssl-allow no;` (disable SSL entirely — port 21 plain FTP OK)

### `parse: missing redirection filename` / `Unknown command '1'`
- **Cause:** lftp salah parse `2>&1` atau `>file` di dalam `-e` string
- **Fix:** Jangan pakai shell redirect di dalam lftp commands. Pipa diluar string.

### zsh history expansion kills `!` di password
- **Cause:** `!` di password di-expand jadi command
- **Fix:** `set +H` di awal script + `unset HISTFILE`

### Mirror "Removing old file" padahal tidak ada `--delete`
- **Cause:** lftp 4.9.3 replace pattern: `rm old; upload new`. Bukan delete-only.
- **Verify safe:** Check bahwa setiap `Removing old file` di log diikuti `Transferring file` dengan nama yang sama (replace, bukan orphan delete).

### curl shows old content setelah deploy
- **Cause:** LiteSpeed cache 30 hari (`cache-control: public, max-age=2592000`)
- **Fix:** cPanel → **LiteSpeed Cache → Purge All**, atau tunggu user browser refresh

### Disk space warning
- Quota limit shared hosting. Cek `du -sh menantu-resort.com` di remote vs local `du -sh app/dist/client/`
- Kalau > 80% quota, bersihkan `menantu-resort.com.backup-*` lama

---

## 🔄 ROLLBACK PROCEDURES

### Quick rollback (instant, no rebuild)
```bash
# Lihat backup tersedia
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e "
  set ssl:verify-certificate no; set ftp:ssl-allow no;
  ls | grep -i backup;
  bye"

# Restore backup sebagai current
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e "
  set ssl:verify-certificate no; set ftp:ssl-allow no;
  mv menantu-resort.com menantu-resort.com.broken-\$(date +%Y%m%d);
  mv menantu-resort.com.backup-20260630 menantu-resort.com;
  bye"
```

### Full rebuild + redeploy
```bash
cd /Users/maabook/Desktop/menantu-resort.com/app
git log --oneline -10            # cari commit yang ingin di-restore
git checkout <commit-hash>
npm install
npm run build
# run deploy script
```

---

## 📊 POST-DEPLOY VERIFICATION

```bash
# 1. Health
curl -sI https://menantu-resort.com/ | head -3

# 2. Meta Pixel
curl -sL https://menantu-resort.com/ | grep -c "866468102744117"
# Expected: 4+ (init script + noscript + Lead/Contact helpers)

# 3. Sitemap
curl -sI https://menantu-resort.com/sitemap.xml | head -3

# 4. Images
curl -sI https://menantu-resort.com/og/og-image.png | grep -i content-length

# 5. Meta Events Manager (manual)
# → https://business.facebook.com/events_manager → Test Events
# → Buka menantu-resort.com di tab lain
# → Event "PageView" muncul dalam 1-2 menit
```

---

## 📚 Referensi

- `DEPLOY_IDCLOUDHOST.md` — cPanel UI walkthrough (Mode B Node SSR, sebagian outdated soal folder layout)
- `AGENTS.md` — Project memory, stack, design system
- `app/dist/client/.htaccess` — Static cache + security headers
- `app/src/components/astro/AnalyticsBoot.astro` — GA4 + Google Ads + Meta Pixel + Enhanced Conversions source

---

*Verified by deploy 30 Juni 2026, 343 files transferred, 246 replaced, 97 new, 0 orphan deletes. Meta Pixel ID 866468102744117 served live.*
