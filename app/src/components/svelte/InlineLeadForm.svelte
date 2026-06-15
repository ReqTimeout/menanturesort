<script>
  /**
   * InlineLeadForm.svelte — Inline form untuk landing page Google Ads
   * - Inline (bukan popup) — lebih tinggi conversion untuk cold traffic
   * - Enhanced Conversion: email, phone, name di-hash SHA-256 dan dikirim ke Google Ads
   * - Conversion value: Rp 10.000.000 (booking fee) untuk Smart Bidding
   * - 1.5s delay sebelum redirect ke WhatsApp (conversion fires dulu)
   */
  import { onMount } from 'svelte';
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { User, Phone, Mail, Home, MessageCircle, ArrowRight, CheckCircle2, Sparkles, Shield, Clock } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let { heading = 'Dapatkan Simulasi Personal', subheading = 'Tim Sahid akan menghubungi Anda dalam 5 menit via WhatsApp.', source = 'inline_form', ctaText = 'Kirim Simulasi via WhatsApp', value = 10000000 } = $props();

  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let villa = $state('belum-tahu');
  let submitting = $state(false);
  let success = $state(false);

  function villaLabel(id) {
    return {
      'bijak': 'Bijak (Rp 1,2 M)',
      'idaman': 'Idaman (Rp 1,6 M)',
      'mapan': 'Mapan (Rp 2 M)',
      'belum-tahu': 'Konsultasi dulu',
    }[id] || id;
  }

  function buildWAUrl() {
    const lines = [
      `Halo Tim Sahid, saya tertarik dengan villa Menantu Resort.`,
      ``,
      `*Data Diri*`,
      `• Nama: ${name || '-'}`,
      `• WhatsApp: ${phone || '-'}`,
      email ? `• Email: ${email}` : null,
      ``,
      `*Preferensi*`,
      `• Villa: ${villaLabel(villa)}`,
      ``,
      `Mohon info lebih lanjut. Terima kasih.`,
    ].filter(Boolean);
    return waUrl(siteData.contact.whatsapp, lines.join('\n'), source);
  }

  function trackEnhancedConversion() {
    if (typeof window === 'undefined') return;
    const [firstName, ...lastParts] = (name || '').trim().split(' ');
    const userData = {
      email: email || undefined,
      phone: phone || undefined,
      firstName: firstName || undefined,
      lastName: lastParts.join(' ') || undefined,
    };
    if (typeof window.mrEnhancedConversions !== 'undefined') {
      window.mrEnhancedConversions.trackConversion('generate_lead', userData, {
        event_category: 'lead',
        event_label: source,
        value: value,
        currency: 'IDR',
      }).catch((e) => console.warn('[InlineLeadForm] enhanced conv failed:', e));
    }
    if (typeof window.mrAnalytics !== 'undefined') {
      window.mrAnalytics.trackEvent('inline_lead_submit', {
        event_category: 'lead',
        event_label: source,
        value: value,
        currency: 'IDR',
        villa_type: villa,
      });
    }
    // Persist for cross-page attribution
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('mr_user', JSON.stringify({ name, phone, email, villa }));
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('mr_user', JSON.stringify({ name, phone, email, villa }));
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!name || !phone) return;
    submitting = true;
    trackEnhancedConversion();
    const url = buildWAUrl();
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion(url);
    } else {
      setTimeout(() => window.open(url, '_blank', 'noopener'), 1500);
    }
    setTimeout(() => {
      success = true;
      submitting = false;
    }, 600);
  }
</script>

<div class="card-premium p-6 sm:p-8 md:p-10 bg-white border-2 border-gold-500/40 shadow-xl shadow-forest-900/5 relative overflow-hidden">
  <!-- Decorative top accent -->
  <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"></div>

  <AnimatePresence mode="wait">
    {#if !success}
      <motion.div
        key="form"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
      >
        <div class="mb-6">
          <div class="inline-flex items-center gap-2 bg-gold-500/10 text-gold-700 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase mb-3">
            <Sparkles class="w-3 h-3" />
            Konsultasi Gratis
          </div>
          <h3 class="font-display text-2xl sm:text-3xl text-forest-700 leading-tight font-bold">
            {heading}
          </h3>
          <p class="text-sm text-ink-700 mt-2 leading-relaxed">
            {subheading}
          </p>
        </div>

        <form onsubmit={submit} class="space-y-4">
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-forest-700 mb-1.5">
              <User class="w-3 h-3 inline mr-1" /> Nama Lengkap *
            </label>
            <input
              type="text"
              bind:value={name}
              required
              autocomplete="name"
              placeholder="Budi Santoso"
              class="w-full px-4 py-3 bg-cream-50 border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
            />
          </div>

          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-forest-700 mb-1.5">
              <Phone class="w-3 h-3 inline mr-1" /> WhatsApp *
            </label>
            <input
              type="tel"
              bind:value={phone}
              required
              autocomplete="tel"
              placeholder="+62 812 3456 7890"
              class="w-full px-4 py-3 bg-cream-50 border border-cream-100 text-forest-700 font-mono text-base focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
            />
          </div>

          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-forest-700 mb-1.5">
              <Mail class="w-3 h-3 inline mr-1" /> Email (untuk simulasi PDF)
            </label>
            <input
              type="email"
              bind:value={email}
              autocomplete="email"
              placeholder="budi@email.com"
              class="w-full px-4 py-3 bg-cream-50 border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
            />
          </div>

          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-forest-700 mb-1.5">
              <Home class="w-3 h-3 inline mr-1" /> Minat Villa
            </label>
            <select
              bind:value={villa}
              class="w-full px-4 py-3 bg-cream-50 border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
            >
              <option value="belum-tahu">Konsultasi dulu (belum yakin)</option>
              <option value="bijak">Bijak — Rp 1,2 M</option>
              <option value="idaman">Idaman — Rp 1,6 M</option>
              <option value="mapan">Mapan — Rp 2 M</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold-500 hover:bg-gold-300 text-forest-900 font-bold text-sm tracking-wider uppercase transition min-h-[52px] disabled:opacity-50 shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50"
          >
            {#if submitting}
              <span>Menghubungkan ke WhatsApp...</span>
            {:else}
              <MessageCircle class="w-4 h-4" />
              <span>{ctaText}</span>
              <ArrowRight class="w-4 h-4" />
            {/if}
          </button>

          <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 text-[10px] text-ink-mute leading-tight">
            <span class="inline-flex items-center gap-1">
              <Shield class="w-3 h-3 text-gold-700" /> Data aman
            </span>
            <span class="inline-flex items-center gap-1">
              <Clock class="w-3 h-3 text-gold-700" /> Respon 5 menit
            </span>
            <span>UU PDP compliant</span>
          </div>
        </form>
      </motion.div>
    {:else}
      <motion.div
        key="success"
        class="p-2 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        <div class="w-16 h-16 mx-auto bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 class="w-8 h-8" />
        </div>
        <h3 class="font-display text-2xl text-forest-700 font-bold mb-2">
          WhatsApp Terbuka!
        </h3>
        <p class="text-sm text-ink-700 leading-relaxed mb-2">
          Silakan kirim pesan di WhatsApp untuk terhubung dengan tim Sahid.
        </p>
        <p class="text-xs text-ink-mute">
          Mereka akan merespon dalam <strong>5 menit</strong>.
        </p>
      </motion.div>
    {/if}
  </AnimatePresence>
</div>
