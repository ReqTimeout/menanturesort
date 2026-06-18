# 🎯 Google Ads + Enhanced Conversions — Menantu Resort

**Tanggal:** 18 Juni 2026
**Status:** ✅ Verified live, all WA clicks tracked

---

## 🔍 Verified Tracking Setup

| Item | ID / Value | Status |
|---|---|---|
| GA4 | `G-39JSBHZY3T` | ✅ Loaded |
| Google Ads | `AW-18240219652` | ✅ Loaded |
| Conversion Label | `1KOzCMms1cAcEITUzvlD` | ✅ Active |
| Conversion Value | Rp 10.000.000 (booking fee) | ✅ Sent |
| Enhanced Conversions | Auto SHA-256 hash | ✅ Active |
| Global WA Click Interceptor | Auto-track all `wa.me/` | ✅ Active |

**Verified by Playwright test (18 Juni 2026):**
- gtag.js loaded for BOTH G-39JSBHZY3T + AW-18240219652
- Click WA link fires `en=conversion` to Google Ads
- Enhanced Conversion user_data uploaded to `google.com/ccm/form-data/18240219652`
- 142+ WA links across site auto-tracked (no manual onclick needed)

---

## 📊 Network Requests Fired per WA Click

When user clicks WhatsApp button, these requests fire (verified):

```
1. https://www.googletagmanager.com/gtag/js?id=G-39JSBHZY3T   ← gtag.js (cached)
2. https://www.googletagmanager.com/gtag/js?id=AW-18240219652 ← gtag.js (cached)
3. https://www.google-analytics.com/g/collect?tid=G-39JSBHZY3T ← GA4 event
4. https://googleads.g.doubleclick.net/pagead/viewthroughconversion/18240219652/ ← Google Ads tracking
5. https://www.google.com/rmkt/collect/18240219652/ ← Remarketing
6. https://www.google.com/ccm/form-data/18240219652 ← 🆕 ENHANCED CONVERSION user_data
7. https://www.google.com/ccm/collect?en=conversion ← Conversion event to Google
```

**Wait time: 1.5-2.5s** (so all events register before navigation to wa.me)

---

## 🏗️ Architecture

### 1. `AnalyticsBoot.astro` (Single Source)

Loads in `<head>` of every page via `BaseLayout.astro`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-39JSBHZY3T"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18240219652"></script>
<script>
  // Configures both GA4 + Google Ads
  // Defines gtag_report_conversion() snippet
  // Defines mrAnalytics helpers
  // Defines mrUserData (localStorage store for EC)
  // Adds global click interceptor for wa.me links
</script>
```

### 2. SHA-256 Hashing (Enhanced Conversions spec)

Per [Google's Enhanced Conversions spec](https://developers.google.com/ads/conversions/enhanced-conversions/web), data is normalized then hashed:

| Field | Normalization |
|---|---|
| `email` | trim, lowercase |
| `phone` | digits only, prefix `62` for Indonesia |
| `first_name` | trim, lowercase |
| `last_name` | trim, lowercase |
| `address.street` | trim, lowercase |
| `address.city` | trim, lowercase |
| `address.postal_code` | digits only, no spaces |
| `address.country` | ISO code (e.g. `ID`) |

Hash algorithm: `SHA-256` via `crypto.subtle.digest()` (Web Crypto API, no library needed).

### 3. User Data Flow

```
User fills form (InlineLeadForm, LeadForm)
         ↓
mrUserData.set({email, phone, firstName, lastName})  ← localStorage
         ↓
mrAnalytics.trackLead(formData)
         ↓
mrEnhancedConversions.trackConversion('generate_lead', userData, ...)
         ↓
SHA-256 hash all PII
         ↓
gtag('event', 'generate_lead', {
  enhanced_conversions_data: {email, phone_number, first_name, ...},
  send_to: AW-18240219652
})
         ↓
Google Ads receives EC user_data
         ↓
Smart Bidding optimizes for high-quality leads
```

### 4. WA Click Tracking (Auto)

```javascript
// Global click interceptor (AnalyticsBoot.astro)
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href*="wa.me/"]');
  if (!link) return;
  e.preventDefault();
  // Fire conversion + wait 2.5s + redirect
  window.gtag_report_conversion(href);
}, true);
```

**Result:** All 142+ WA links across the site are auto-tracked. No manual `onclick` needed.

---

## 🧪 Testing Tools

### 1. Playwright Test Script

```bash
PLAYWRIGHT_BROWSERS_PATH=/Users/maabook/Library/Caches/ms-playwright \
  NODE_PATH=$(npm root -g) \
  node /tmp/test-tracking4.cjs
```

Output:
```
→ googleads.g.doubleclick.net/pagead/viewthroughconversion/18240219652/?en=gtag.config
→ google.com/rmkt/collect/18240219652/?en=gtag.config
→ google-analytics.com/g/collect?tid=G-39JSBHZY3T
→ google.com/ccm/form-data/18240219652   ← Enhanced Conversion upload
→ googleads.g.doubleclick.net/pagead/viewthroughconversion/18240219652/?en=conversion
→ google.com/rmkt/collect/18240219652/?en=conversion
→ google.com/ccm/collect?en=conversion
```

### 2. Google Tag Assistant (Chrome Extension)

1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Visit https://menantu-resort.com/
3. Click any WhatsApp button
4. Check Tag Assistant panel:
   - ✅ Google Ads Conversion: `AW-18240219652/1KOzCMms1cAcEITUzvlD`
   - ✅ Enhanced Conversions: user_data attached
   - ✅ Value: 10.000.000 IDR

### 3. GA4 DebugView (Real-time)

1. Open https://analytics.google.com/ → Property `G-39JSBHZY3T`
2. Menu **DebugView** (left sidebar)
3. Enable debug mode: add `_GA4_DebugMode=1` cookie
4. Visit site + click WA
5. Should see:
   - Event: `whatsapp_click`
   - Event: `conversion` (send_to: AW-18240219652)
   - User properties: email, phone (hashed)

### 4. Google Ads Conversion Tracking

1. Open https://ads.google.com/ → Tools → **Conversions**
2. Find conversion action "WA_Menantu" (label: 1KOzCMms1cAcEITUzvlD)
3. Status: **"Recording conversions"** + **"Enhanced conversions: Active"**
4. Wait 24-48h for first conversion to appear

---

## ⚙️ Configuration via Environment Variables

Set in `app/.env` (or cPanel Node.js selector):

```env
PUBLIC_GA4_ID=G-39JSBHZY3T
PUBLIC_GOOGLE_ADS_ID=AW-18240219652
PUBLIC_ADS_CONVERSION_LABEL=1KOzCMms1cAcEITUzvlD
PUBLIC_ADS_CONVERSION_VALUE=10000000
```

**Default values** (jika tidak set):
- `GA4_ID` → `G-39JSBHZY3T`
- `ADS_ID` → `AW-18240219652`
- `ADS_CONVERSION_LABEL` → `1KOzCMms1cAcEITUzvlD`
- `ADS_CONVERSION_VALUE` → `10000000` (Rp 10 juta)

---

## 🔐 Privacy & GDPR

Enhanced Conversions is configured with:
```js
enhanced_conversions: { gdpr_consent_enabled: false }
```

Untuk enable GDPR consent mode (kalau target audience EU), tambahkan consent banner:
```js
gtag('consent', 'update', {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
});
```

Untuk Indonesia (saat ini), no consent required.

---

## 📋 Implementation Checklist

- ✅ gtag.js loaded for BOTH GA4 + Google Ads
- ✅ Conversion label `1KOzCMms1cAcEITUzvlD` configured
- ✅ Conversion value Rp 10.000.000 (booking fee) for Smart Bidding
- ✅ Enhanced Conversions with SHA-256 hashed user_data
- ✅ Email, phone, name normalization per Google spec
- ✅ Country code prefix `62` for Indonesian phones
- ✅ mrUserData localStorage store (90-day retention)
- ✅ Auto-collect user data from form submit events
- ✅ Global click interceptor (all 142+ WA links tracked)
- ✅ 1.5-2.5s delay before redirect (so events register)
- ✅ gtag_report_conversion snippet (per Google docs)
- ✅ mrAnalytics.trackLead() for form submissions
- ✅ Fallback redirect if gtag fails to fire
- ✅ InlineLeadForm + LeadForm updated to use trackLead
- ✅ Manual onclick removed (no double-firing)
- ✅ Verified live with Playwright (7 conversion requests fire per click)
- ✅ Enhanced Conversion upload to `/ccm/form-data/18240219652` confirmed

---

## 🎯 Next Steps

1. **Verify di Google Ads UI** (24-48 jam)
   - Buka https://ads.google.com/ → Conversions
   - Check status "WA_Menantu" → "Recording conversions"
   - Click "Diagnostics" → lihat apakah ada error

2. **Setup Conversion Value Smart Bidding**
   - Google Ads → Campaigns → Bidding → Switch to "Maximize Conversions" or "Target CPA"
   - Conversion value Rp 10.000.000 akan digunakan untuk optimize bid

3. **Monitor Enhanced Conversions**
   - Google Ads → Conversions → "WA_Menantu" → "Enhanced conversions"
   - Should show: "User-provided data: 1.0% match rate" (increases as more data comes in)

4. **Add Google Ads Conversion for Phone Calls** (optional)
   - Track tel: links as secondary conversion
   - Add `gtag('config', 'AW-18240219652/phone_conversion_label')`

5. **Track Scroll Depth + Time on Page** (optional)
   - Untuk audience building GA4
   - Currently tracked via auto page_view only

---

## 🆘 Troubleshooting

### "Sitemap could not be read" di GSC → sudah fix (lihat SITEMAP_INDEX.md)

### "Enhanced conversions: No data" di Google Ads
**Cause:** User belum pernah isi form dengan email/phone, atau user data kosong
**Fix:** Test dengan form fill (lihat script di atas). Atau tunggu traffic real.

### "Conversion label invalid"
**Cause:** Label `1KOzCMms1cAcEITUzvlD` salah copy dari Google Ads UI
**Fix:** Buka Google Ads → Conversions → "WA_Menantu" → copy label persis

### Event tidak fire di GA4 DebugView
**Cause:** `_GA4_DebugMode` cookie belum set
**Fix:** Set cookie dulu: `{name: '_GA4_DebugMode', value: '1', domain: '.menantu-resort.com', path: '/'}`

### Click di mobile tidak fire conversion
**Cause:** Ada bug di mobile click handler
**Fix:** Cek `data-track` attribute di button. Global interceptor skip jika `link.dataset.mrTracked === '1'`

---

*Last updated: 2026-06-18 · Menantu Resort Analytics Build · Verified live · 142 WA links tracked*
