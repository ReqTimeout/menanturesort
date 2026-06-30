#!/bin/bash
# ============================================================================
# deploy-lftp.sh — Push-only deploy via lftp ke IDCloudHost
# ============================================================================
# Usage:   ./deploy-lftp.sh                 (uses default LOCAL)
#          ./deploy-lftp.sh /path/to/dist   (custom LOCAL)
# Env:     FTP_USER, FTP_PASS, HOST (defaults shown below)
# Verify:  curl -sI https://menantu-resort.com/ | grep -i last-modified
# Rollback: lihat DEPLOY_LFTP.md
# ============================================================================
set -e
set +H
unset HISTFILE

# === Config ===
HOST="${HOST:-103.63.24.139}"
FTP_USER="${FTP_USER:-egokkcmq}"
FTP_PASS="${FTP_PASS:-}"
REMOTE_DIR="${REMOTE_DIR:-menantu-resort.com}"
LOCAL="${1:-/Users/maabook/Desktop/menantu-resort.com/app/dist/client}"
LOG_DIR="${LOG_DIR:-/tmp}"
LOG="$LOG_DIR/menantu-deploy-$(date +%Y%m%d-%H%M%S).log"

# === Sanity checks ===
if [[ -z "$FTP_PASS" ]]; then
  echo "❌ FTP_PASS kosong. Set dulu: export FTP_PASS='<cPanel password>'"
  echo "   (lihat DEPLOY_IDCLOUDHOST.md untuk kredensial)"
  exit 1
fi
if [[ ! -d "$LOCAL" ]]; then
  echo "❌ Local dist tidak ada: $LOCAL"
  echo "   Build dulu: cd app && npm run build"
  exit 1
fi
if ! command -v lftp >/dev/null 2>&1; then
  echo "❌ lftp tidak terinstall. Install: brew install lftp"
  exit 1
fi

# === Pre-flight info ===
LOCAL_SIZE=$(du -sh "$LOCAL" | awk '{print $1}')
LOCAL_FILES=$(find "$LOCAL" -type f | wc -l | tr -d ' ')

echo "================================================================"
echo "  DEPLOY MENANTU RESORT"
echo "  $(date)"
echo "================================================================"
echo "  Local:    $LOCAL  ($LOCAL_SIZE, $LOCAL_FILES files)"
echo "  Remote:   $HOST:~/$REMOTE_DIR"
echo "  Method:   push-only (mirror --reverse, no --delete)"
echo "  Log:      $LOG"
echo "================================================================"

# === Quick connectivity test ===
echo "→ Testing connectivity..."
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e \
  "set ssl:verify-certificate no; set ftp:ssl-allow no; pwd; bye" \
  >/dev/null 2>&1 || { echo "❌ Login gagal. Cek kredensial / network."; exit 2; }

# === Pre-upload state ===
echo "→ Pre-upload state di remote:"
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" -e \
  "set ssl:verify-certificate no; set ftp:ssl-allow no; cd $REMOTE_DIR; ls -la index.html; bye" 2>&1 | tail -3

# === Mirror (push-only) ===
echo "→ Pushing $LOCAL → $REMOTE_DIR/  (4 parallel, no delete)..."
lftp -u "${FTP_USER},${FTP_PASS}" "$HOST" <<LFTPEOF 2>&1 | tee "$LOG"
set ssl:verify-certificate no
set ftp:ssl-allow no
set net:timeout 120
set net:max-retries 5
set ftp:passive-mode yes
set mirror:parallel-transfer-count 4
set cmd:fail-exit yes

cd $REMOTE_DIR

mirror --reverse --parallel=4 \
  --exclude ".DS_Store" \
  --exclude-glob "**/.DS_Store" \
  --exclude-glob "._*" \
  --continue \
  --verbose \
  "$LOCAL/" "./"

echo "=== POST-UPLOAD ==="
ls -la index.html
bye
LFTPEOF

# === Post-upload summary ===
TRANSFERS=$(grep -c "^Transferring file" "$LOG" 2>/dev/null || echo 0)
echo
echo "================================================================"
echo "  ✅ DEPLOY SELESAI — $(date)"
echo "  Files transferred: $TRANSFERS"
echo "  Log:               $LOG"
echo "================================================================"
echo
echo "→ Verify live site:"
echo "  curl -sI https://menantu-resort.com/ | grep -iE 'HTTP/|last-modified|content-length'"
echo
