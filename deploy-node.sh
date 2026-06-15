#!/bin/bash
# ============================================
# DEPLOY NODE MODE — Upload dist/ + setup cPanel Node.js App
# ============================================
# Usage: ./deploy-node.sh
# Will prompt for cPanel password

set -e

# Configuration
CPANEL_HOST="103.63.24.139"
CPANEL_USER="egokkcmq"
DOMAIN="menantu-resort.com"
LOCAL_BUILD="app"
APP_DIR="menantu-app"
NODE_PORT="3000"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Deploy Menantu Resort → cPanel (Node.js Mode)   ${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}→ Step 1: Building deploy package...${NC}"
cd app
rm -f ../menantu-deploy-node.zip
zip -r ../menantu-deploy-node.zip dist/ package.json package-lock.json -x "*.DS_Store" > /dev/null
cd ..
echo -e "${GREEN}✓ Package built ($(du -h menantu-deploy-node.zip | cut -f1))${NC}"
echo ""

echo -e "${YELLOW}→ Step 2: Manual steps required in cPanel UI${NC}"
echo ""
echo "1. Login to: https://$CPANEL_HOST:2083/"
echo "2. File Manager → Create folder: $APP_DIR in /home/$CPANEL_USER/"
echo "3. Upload menantu-deploy-node.zip to /home/$CPANEL_USER/$APP_DIR/"
echo "4. Right-click zip → Extract"
echo "5. Setup Node.js App → Create Application:"
echo "   - Node version: 20.x or 18.20.4"
echo "   - Mode: Production"
echo "   - Root: $APP_DIR"
echo "   - URL: $DOMAIN"
echo "   - Startup: dist/server/entry.mjs"
echo "   - Env: HOST=0.0.0.0, PORT=$NODE_PORT, NODE_ENV=production"
echo "6. Run 'npm install --omit=dev' in app folder"
echo "7. Restart app"
echo ""
echo -e "${GREEN}✓ Package ready: menantu-deploy-node.zip ($(du -h menantu-deploy-node.zip | cut -f1))${NC}"
