<script>
  /**
   * InlineLeadForm.svelte — Inline form (non-modal) untuk landing page
   *
   * Used in: index.astro, promo.astro, investasi/index.astro, PromoHero.svelte
   * Companion to LeadForm.svelte (which is the modal version).
   *
   * Copy strategy: SAME as LeadForm.svelte — no FOMO, no "belum yakin", persuasive.
   * See ARCHITECTURE_CAPI.md §19 for full design rationale.
   *
   * Reusable via props: heading/subheading/source/ctaText/value all overrideable.
   * CAPI-ready: sendBeacon ke /capi/track fires BEFORE WhatsApp opens.
   */

  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { User, Phone, Mail, Home, ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  // ========== Reusable props (mirror LeadForm.svelte) ==========
  let {
    badge = 'Simulasi Personal',
    heading = 'Rencanakan',
    headingItalic = 'Investasi Villa Anda',
    subheading = 'Tim konsultan Sahid akan menghubungi Anda via WhatsApp untuk menyusun rekomendasi villa, simulasi yield, dan proyeksi cicilan sesuai profil investasi Anda.',
    source = 'inline_form',
    ctaText = 'Kirim Simulasi Personal',
    ctaHint = 'Via WhatsApp',
    successTitle = 'Simulasi Anda Terkirim',
    successBody = 'Tim konsultan Sahid akan menghubungi Anda via WhatsApp untuk mendiskusikan rekomendasi personal. Mohon ditunggu.',
    valueProps = [
      'Simulasi yield 9–15% p.a. sesuai profil Anda',
      'Proyeksi cicilan KPR Bank & Developer',
      'Rekomendasi villa dari 3 tipe (Bijak, Idaman, Mapan)'
    ],
    villaOptions = [
      { value: 'bijak', label: 'Bijak — Rp 1,2 M' },
      { value: 'idaman', label: 'Idaman — Rp 1,6 M' },
      { value: 'mapan', label: 'Mapan — Rp 2 M' }
    ],
    defaultVilla = 'idaman',
    showVilla = true,
    showEmail = true,
    disclaimer = 'Gratis · Tanpa komitmen · Data aman sesuai UU PDP',
    value = 10000000,                 // IDR, for Smart Bidding
    capiEndpoint = '/capi/track',
    enableCAPI = false                 // SET TRUE setelah CAPI Gateway deployed (lihat ARCHITECTURE_CAPI.md)
  } = $props();

  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let villa = $state(defaultVilla);
  let submitting = $state(false);
  let success = $state(false);

  function villaLabel(id) {
    return villaOptions.find(o => o.value === id)?.label || id;
  }

  function generateEventId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function buildWAUrl() {
    const lines = [
      `Halo Tim Sahid, saya ingin simulasi personal villa Menantu Resort.`,
      ``,
      `*Data Diri*`,
      `• Nama: ${name || '-'}`,
      `• WhatsApp: ${phone || '-'}`,
      email ? `• Email: ${email}` : null,
      ``,
      `*Preferensi*`,
      `• Villa: ${villaLabel(villa)}`,
      ``,
      `Mohon disusun simulasinya. Terima kasih.`
    ].filter(Boolean);
    return waUrl(siteData.contact.whatsapp, lines.join('\n'), source);
  }

  function submit(e) {
    e.preventDefault();
    if (!name || !phone) return;
    submitting = true;

    // Persist for cross-page attribution
    try {
      localStorage.setItem('mr_user', JSON.stringify({ name, phone, email, villa }));
      sessionStorage.setItem('mr_user', JSON.stringify({ name, phone, email, villa }));
    } catch {}

    // Build user data
    const [firstName, ...lastParts] = (name || '').trim().split(/\s+/);
    const userData = {
      firstName,
      lastName: lastParts.join(' '),
      phone: phone || undefined,
      email: email || undefined
    };

    const eventId = generateEventId();
    const eventTime = Math.floor(Date.now() / 1000);

    // === 1. CAPI Gateway beacon (only if enabled — false until CAPI Gateway deployed) ===
    if (enableCAPI && capiEndpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        const beaconPayload = JSON.stringify({
          event_name: 'Lead',
          event_id: eventId,
          event_time: eventTime,
          event_source_url: window.location.href,
          action_source: 'website',
          user_data: userData,
          custom_data: {
            value,
            currency: 'IDR',
            lead_type: 'simulation_request',
            villa_pref: villa,
            source,
            content_name: 'simulation_request_inline',
            content_category: 'villa_investment'
          }
        });
        navigator.sendBeacon(
          capiEndpoint,
          new Blob([beaconPayload], { type: 'application/json' })
        );
      } catch (err) {
        console.warn('[InlineLeadForm] CAPI beacon failed:', err);
      }
    }

    // === 2. Browser fbq (Meta Pixel — dedup via event_id) ===
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        event_id: eventId,
        value,
        currency: 'IDR',
        content_name: 'simulation_request_inline',
        content_category: 'villa_investment'
      });
    }

    // === 3. GA4 + Google Ads Enhanced Conversions ===
    (async () => {
      try {
        if (typeof window.mrAnalytics !== 'undefined' && window.mrAnalytics.trackLead) {
          await window.mrAnalytics.trackLead({
            ...userData,
            leadType: 'simulation_request',
            estimatedValue: value
          });
        }
      } catch (err) {
        console.warn('[InlineLeadForm] Enhanced conversion failed:', err);
      }

      // === 4. Open WhatsApp (final user action) ===
      const url = buildWAUrl();
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion(url);
      } else {
        setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
      }

      setTimeout(() => {
        success = true;
        submitting = false;
      }, 800);
    })();
  }
</script>

<div class="relative bg-cream-50 border-t-4 border-gold-500 shadow-2xl shadow-forest-900/10 overflow-hidden">
  <AnimatePresence mode="wait">
    {#if !success}
      <motion.div
        key="form"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        class="p-6 sm:p-8 md:p-10"
      >
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/15 text-gold-700 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
          <Sparkles class="w-3 h-3" />
          {badge}
        </div>

        <!-- Headline -->
        <h3 class="font-display text-2xl sm:text-3xl text-forest-900 leading-[1.1] font-bold tracking-tight mb-3">
          {heading}{' '}
          <em class="text-gold-700 italic font-display">{headingItalic}</em>
        </h3>

        <!-- Subhead -->
        <p class="text-[15px] text-ink-700 leading-relaxed mb-6">
          {subheading}
        </p>

        <!-- Value props -->
        {#if valueProps && valueProps.length > 0}
          <div class="border-l-2 border-gold-500 pl-4 space-y-2 mb-6">
            {#each valueProps as prop}
              <div class="flex items-start gap-2.5 text-[14px] text-ink-700 leading-snug">
                <CheckCircle2 class="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>{prop}</span>
              </div>
            {/each}
          </div>
        {/if}

        <!-- Form -->
        <form onsubmit={submit} class="space-y-4">
          <div>
            <label for="inline-leadform-name" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
              <User class="w-3 h-3" /> Nama Lengkap <span class="text-gold-700">*</span>
            </label>
            <input
              id="inline-leadform-name"
              type="text"
              bind:value={name}
              required
              autocomplete="name"
              placeholder="Budi Santoso"
              class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-900 text-[15px] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition"
            />
          </div>

          <div>
            <label for="inline-leadform-phone" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
              <Phone class="w-3 h-3" /> WhatsApp <span class="text-gold-700">*</span>
            </label>
            <input
              id="inline-leadform-phone"
              type="tel"
              bind:value={phone}
              required
              autocomplete="tel"
              placeholder="+62 812 3456 7890"
              class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-900 font-mono text-[15px] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition"
            />
          </div>

          {#if showEmail}
            <div>
              <label for="inline-leadform-email" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
                <Mail class="w-3 h-3" /> Email <span class="text-ink-mute font-normal normal-case tracking-normal text-[10px]">(opsional, untuk simulasi PDF)</span>
              </label>
              <input
                id="inline-leadform-email"
                type="email"
                bind:value={email}
                autocomplete="email"
                placeholder="budi@email.com"
                class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-900 text-[15px] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition"
              />
            </div>
          {/if}

          {#if showVilla && villaOptions.length > 0}
            <div>
              <label for="inline-leadform-villa" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
                <Home class="w-3 h-3" /> Preferensi Villa
              </label>
              <select
                id="inline-leadform-villa"
                bind:value={villa}
                class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-900 text-[15px] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition appearance-none cursor-pointer"
                style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%231B4332%22><path d=%22M7 10l5 5 5-5z%22/></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 18px; padding-right: 40px;"
              >
                {#each villaOptions as opt}
                  <option value={opt.value}>{opt.label}</option>
                {/each}
              </select>
            </div>
          {/if}

          <!-- Submit -->
          <div class="pt-2">
            <button
              type="submit"
              disabled={submitting}
              class="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-cream-50 font-bold text-[13px] tracking-[0.2em] uppercase transition min-h-[54px] shadow-lg shadow-forest-900/20 hover:shadow-xl hover:shadow-forest-900/30 hover:-translate-y-0.5"
            >
              {#if submitting}
                <span class="inline-flex items-center gap-2">
                  <span class="w-3 h-3 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></span>
                  Mengirim...
                </span>
              {:else}
                <Send class="w-4 h-4" />
                <span>{ctaText}</span>
                <ArrowRight class="w-4 h-4" />
              {/if}
            </button>
            <p class="text-[11px] text-ink-mute text-center mt-2.5 font-mono uppercase tracking-[0.15em]">
              → {ctaHint}
            </p>
          </div>
        </form>

        <p class="text-[10px] text-ink-mute text-center mt-5 leading-relaxed">
          {disclaimer}
        </p>
      </motion.div>
    {:else}
      <motion.div
        key="success"
        class="p-10 sm:p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        <div class="w-16 h-16 mx-auto bg-success/15 text-success rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 class="w-9 h-9" />
        </div>
        <h3 class="font-display text-2xl sm:text-3xl text-forest-900 font-bold mb-3">
          {successTitle}
        </h3>
        <p class="text-[14px] text-ink-700 leading-relaxed max-w-sm mx-auto">
          {successBody}
        </p>
      </motion.div>
    {/if}
  </AnimatePresence>
</div>
