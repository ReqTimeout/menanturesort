#!/bin/bash
# ============================================
# DEPLOY STATIC MODE — Upload dist/client/ ke cPanel public_html
# ============================================
# Usage: ./deploy-static.sh
# Will prompt for cPanel password

set -e

# Configuration
CPANEL_HOST="103.63.24.139"
CPANEL_USER="egokkcmq"
DOMAIN="menantu-resort.com"
LOCAL_DIST="app/dist/client"
REMOTE_DIR="public_html"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   Deploy Menantu Resort → cPanel (Static Mode)   ${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""

# Step 1: Verify build
echo -e "${YELLOW}→ Step 1: Verifying build...${NC}"
if [ ! -f "$LOCAL_DIST/index.html" ]; then
  echo -e "${RED}✗ Build not found! Run 'cd app && npm run build' first.${NC}"
  exit 1
fi
if [ ! -f "$LOCAL_DIST/.htaccess" ]; then
  echo -e "${RED}✗ .htaccess missing!${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Build verified${NC}"
echo ""

# Step 2: Get password securely
echo -e "${YELLOW}→ Step 2: cPanel credentials${NC}"
read -s -p "Enter cPanel password for $CPANEL_USER@$CPANEL_HOST: " CPANEL_PASS
echo ""
echo ""

# Step 3: Choose tool
FTP_TOOL=""
if command -v lftp &> /dev/null; then
  FTP_TOOL="lftp"
elif command -v ncftp &> /dev/null; then
  FTP_TOOL="ncftp"
elif command -v curl &> /dev/null; then
  FTP_TOOL="curl"
else
  echo -e "${RED}✗ No FTP client found. Install lftp: brew install lftp${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Using FTP client: $FTP_TOOL${NC}"
echo ""

# Step 4: Backup current public_html
echo -e "${YELLOW}→ Step 3: Backing up current public_html...${NC}"
BACKUP_FILE="public_html_backup_$(date +%Y%m%d_%H%M%S).zip"
echo "Backup will be saved as: $BACKUP_FILE"

if [ "$FTP_TOOL" = "lftp" ]; then
  lftp -c "
    set ssl:verify-certificate no
    open -u $CPANEL_USER,$CPANEL_PASS ftp://$CPANEL_HOST
    cd $REMOTE_DIR
    glob -a rm -f *.zip
    mirror --reverse --delete --only-newer --verbose $LOCAL_DIST/ ./
    bye
  " 2>&1 | tail -20
elif [ "$FTP_TOOL" = "curl" ]; then
  echo -e "${YELLOW}Using curl — manual upload required.${NC}"
  echo "Open File Manager in cPanel and upload $LOCAL_DIST/* to $REMOTE_DIR/"
fi

echo ""
echo -e "${GREEN}✓ Deploy complete!${NC}"
echo ""
echo "Verify at: https://$DOMAIN/"
