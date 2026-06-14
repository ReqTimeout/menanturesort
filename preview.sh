#!/bin/bash
# ============================================
# Menantu Resort — Local Preview Script
# ============================================
# Cara pakai: bash preview.sh
# Lalu buka browser ke URL yang ditampilkan
# ============================================

set -e
cd "$(dirname "$0")/app"

echo "🚀 Menantu Resort — Local Preview"
echo "======================================"
echo ""

# Cek apakah dist/ ada
if [ ! -d "dist" ]; then
  echo "📦 Building production version dulu..."
  npm run build
  echo ""
fi

# Pilih mode preview
if [ "$1" == "--dev" ]; then
  echo "🔧 Mode: Development (hot reload)"
  echo "   URL: http://localhost:4321/"
  echo "   Tekan Ctrl+C untuk stop"
  echo ""
  npm run dev
else
  echo "🌐 Mode: Static preview (production build)"
  echo "   Pilih port: 3000 (default) atau custom"
  echo ""

  PORT=${2:-3000}
  echo "   URL: http://localhost:${PORT}/"
  echo "   Tekan Ctrl+C untuk stop"
  echo ""

  # Pakai npx serve (built-in di npm) atau python http.server
  if command -v npx &> /dev/null; then
    npx serve dist -p "$PORT"
  elif command -v python3 &> /dev/null; then
    echo "   (Menggunakan python3 http.server)"
    cd dist && python3 -m http.server "$PORT"
  else
    echo "❌ Tidak ada npx atau python3. Install salah satu."
    exit 1
  fi
fi
