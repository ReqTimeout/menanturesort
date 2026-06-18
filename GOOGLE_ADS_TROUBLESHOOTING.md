# 🔧 Google Ads Conversion Troubleshooting — Menantu Resort

**Status:** 18 Juni 2026
**Masalah:** "This conversion action wasn't detected" di Google Ads UI

---

## ✅ Yang Sudah Diverifikasi (Live)

**Test via Playwright (18 Juni 2026) — 5/5 halaman PASS:**

Saat click WhatsApp button, Google Ads menerima request:
```
URL: https://googleads.g.doubleclick.net/pagead/viewthroughconversion/18240219652/
     ?label=1KOzCMms1cAcEITUzvlD
     &value=100000
     &currency_code=IDR
     &en=conversion
     &data=event=conversion
```

✅ **Label terkirim**: `1KOzCMms1cAcEITUzvlD`
✅ **Value terkirim**: 100000 (Rp 100.000)
✅ **Currency terkirim**: IDR
✅ **Event**: `en=conversion`

**Timing (very important!):**
- Click ke event fire: **+115ms** (cukup cepat)
- Click ke new tab open: **+1.3 detik** (cukup lama untuk Google Ads receive event)

---

## 🔍 Mengapa Google Ads Bilang "Not Detected"?

Conversion request **sudah sampai ke Google dengan parameter benar**, tapi UI bilang tidak detected. **5 penyebab paling umum:**

### 1. Conversion Action Status
Buka Google Ads → **Tools (🔧)** → **Conversions** → cari "WA_Menantu"

Pastikan:
- ✅ **Status: "Recording conversions"** (hijau)
- ❌ Jika "Removed" / "Paused" → klik "Enable" atau recreate
- ❌ Jika "No recent conversions" → cek Conversions Summary

### 2. Conversion Counting Setting
- **Buka conversion action "WA_Menantu"** → **Edit** → **Settings**
- Pilih **"Every"** (bukan "One")
  - "Every" = count setiap conversion (recommended untuk lead generation)
  - "One" = count 1 per click (untuk e-commerce purchase)
- **Category**: "Outbound click" (sudah benar)

### 3. Click Tag Validation
- Buka: https://www.google.com/tagmanager/answer/7545739
- Atau pakai **Google Tag Assistant** Chrome extension
- Visit website + click WA → check apakah tag firing dengan benar

### 4. Delay 24-48 Jam
- Google Ads UI butuh **24-48 jam** untuk reflect conversion baru
- Kalau test baru dilakukan, tunggu dulu

### 5. Conversion Attribution Window
- Settings → Attribution model
- Default: "Data-driven attribution" (recommended)
- Conversion window: 30 days click + 1 day view (default)

---

## 🛠️ Step-by-Step Fix

### Step 1: Verify Conversion Action
1. Login ke https://ads.google.com/
2. Klik **Tools** (🔧 icon) → **Conversions**
3. Cari conversion dengan label `1KOzCMms1cAcEITUzvlD` (atau nama "WA_Menantu")
4. Klik untuk lihat detail

**Expected:**
- Status: **"Recording conversions"** (hijau badge)
- Type: **Website**
- Category: **Outbound click** (sesuai yang Anda lihat di UI)
- Count: Every

**If status is NOT "Recording":**
- Klik "Edit" → ubah status ke "Enabled" → Save
- Atau recreate conversion dengan snippet yang sama

### Step 2: Test dengan Google Tag Assistant
1. Install [Google Tag Assistant Chrome Extension](https://tagassistant.google.com/)
2. Enable Tag Assistant → "Add domain" → `menantu-resort.com`
3. Visit `https://menantu-resort.com/`
4. Click tombol WhatsApp
5. Tag Assistant panel akan muncul:
   - ✅ **Google Ads Conversion: AW-18240219652/1KOzCMms1cAcEITUzvlD**
   - ✅ Status: **"Fired"** atau **"Succeeded"**
   - ✅ Enhanced Conversions: hashed user_data

**If conversion shows "Failed":**
- Klik "Failed" untuk lihat error message
- Biasanya: "Invalid conversion label" atau "Tag not configured"

### Step 3: Test dengan GA4 DebugView (Alternative)
1. Buka https://analytics.google.com/
2. Pilih property **G-39JSBHZY3T** (Menantu Resort)
3. Menu **DebugView** (sidebar)
4. Set cookie `_GA4_DebugMode=1` di browser
5. Visit `https://menantu-resort.com/`
6. Click WA button
7. DebugView akan show:
   - Event: `whatsapp_click`
   - Event: `conversion` (send_to: AW-18240219652)

### Step 4: Cek Conversions Summary (1-24 jam kemudian)
1. Google Ads → Tools → Conversions
2. Klik "WA_Menantu"
3. Tab "Summary" → lihat:
   - **Conversions**: angka (semoga > 0)
   - **Conversion value**: Rp 100.000 × N
   - **Status**: "Recording conversions" (hijau)

**If masih "No conversions" setelah 24 jam:**
- Cek Tag Assistant (Step 2) — kalau "Fired" → tunggu 24 jam lagi (Google processing)
- Kalau "Failed" → label salah / perlu recreate

---

## 🆘 Still "Not Detected"?

Kemungkinan masalah spesifik:

### A. Label Conversion Berbeda di Google Ads UI

Snippet Google Ads Anda menyebutkan: `1KOzCMms1cAcEITUzvlD`

Cek di Google Ads UI:
- Tools → Conversions → klik nama conversion
- Lihat "Tag details" → "Conversion label"
- **Pastikan PERSIS SAMA** dengan `1KOzCMms1cAcEITUzvlD`

**If label berbeda:**
- Update `app/src/components/astro/AnalyticsBoot.astro` line 28:
  ```js
  const ADS_CONVERSION_LABEL = import.meta.env.PUBLIC_ADS_CONVERSION_LABEL || 'LABEL_BARU_DISINI';
  ```
- Rebuild & redeploy

### B. Conversion Sudah Di-archive

Kalau conversion action di Google Ads sudah di-archive:
- Buat conversion BARU
- Dapatkan label baru dari snippet
- Update kode seperti di (A)

### C. Tag Tidak Load

Cek apakah `gtag.js?id=AW-18240219652` loaded:
- Buka site
- View Page Source → cari `AW-18240219652`
- Atau DevTools → Network tab → filter "gtag"

**If AW-18240219652 tidak ada di source:**
- Tunggu 5-10 menit (LiteSpeed cache)
- Hard refresh: Ctrl+Shift+R

---

## 📊 Test Plan (Real Browser, Non-Headless)

1. Buka Chrome/Firefox biasa (non-headless)
2. Buka DevTools → Console
3. Paste: `window.mrAnalyticsDebug()`
4. Expected output:
   ```js
   {
     ga4: "G-39JSBHZY3T",
     ads: "AW-18240219652",
     conversionLabel: "1KOzCMms1cAcEITUzvlD",
     conversionValue: 100000,
     userData: {},
     hashedUserData: null
   }
   ```
5. Click tombol WhatsApp
6. DevTools → Network tab → filter "googleads" atau "viewthroughconversion"
7. Expected: Request `en=conversion` muncul dengan `label=1KOzCMms1cAcEITUzvlD`
8. New tab terbuka dengan `https://api.whatsapp.com/send/...`

---

## ⏱️ Expected Timeline

| Action | Expected Time |
|---|---|
| Click WA button | 0s |
| Google Ads receive event | +100-500ms |
| New tab opens | +1-2s |
| Google Ads UI reflect conversion | +24-48 jam |

**PENTING:** Kalau baru test 1-2 kali, conversion baru muncul di UI setelah 24-48 jam (Google processing delay).

---

## 🔄 Rekomendasi Tambahan

1. **Tambah multiple conversion actions** untuk tracking yang lebih detail:
   - "WA_Click_Hero" (priority 1.0)
   - "WA_Click_CTA_Mid" (priority 0.9)
   - "WA_Click_Footer" (priority 0.7)
   - "WA_Form_Submit" (priority 1.0)

2. **Setup Enhanced Conversions di Google Ads UI**:
   - Tools → Conversions → "WA_Menantu" → Enhanced conversions → "Turn on"
   - Pilih "Hashed data" (bukan "Unhashed")
   - Save

3. **Monitor Conversions API (server-side)** untuk backup:
   - Pakai Google Ads API untuk server-side tracking
   - Lebih reliable dari browser-based (no ad blocker issues)

---

*Last updated: 2026-06-18 · Konversi sudah benar terkirim ke Google · Tunggu 24-48 jam untuk muncul di UI*
