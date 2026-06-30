<script>
  /**
   * LeadForm.svelte — Reusable lead capture component
   *
   * Default: auto-triggered modal (time + scroll + exit intent, whichever first).
   * Reusable anywhere via props.
   *
   * Copy strategy (per project brief):
   *   - NO FOMO ("5 menit respon" — removed)
   *   - NO "belum yakin" option in villa select
   *   - Persuasive via: reciprocity (gratis), authority (Sahid 50+ tahun),
   *     specificity (yield 9-15%, 3 villa types), risk reversal (tanpa komitmen)
   *   - Submit CTA: "Kirim Simulasi Personal"
   *
   * Design (v2 — vibrant, "meriah", 30 Jun 2026):
   *   - Animated gold gradient border (shimmer)
   *   - Live activity indicator (pulse dot + count)
   *   - Gold → warning gradient CTA
   *   - Decorative sparkle + confetti accents
   *   - Warmer cream background
   *
   * Triggers (v2):
   *   - 'auto' (default modal): time + scroll + exit intent
   *   - 'time' / 'scroll' / 'exit' / 'manual': single trigger
   *
   * Integrations: Meta Pixel (fbq) + GA4 + Google Ads + CAPI Gateway + WhatsApp
   *
   * @example Default usage (auto modal, BaseLayout)
   *   <LeadForm client:only="svelte" />
   *
   * @example Manual trigger from a button
   *   <LeadForm bind:this={formRef} trigger="manual" source="hero_cta" client:only="svelte" />
   *   <button onclick={() => formRef?.show()}>Konsultasi</button>
   *
   * @example Inline form (single trigger)
   *   <LeadForm
   *     trigger="manual"
   *     source="kpr_landing"
   *     submitLabel="Hitung Cicilan Saya"
   *     client:only="svelte"
   *   />
   */

  import { onMount, onDestroy } from 'svelte';
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { X, User, Phone, Mail, Home, ArrowRight, CheckCircle2, Sparkles, Send, Eye, Zap, Gift } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  // ========== Reusable props ==========
  let {
    // --- Trigger behavior ---
    trigger = 'auto',                  // 'auto' | 'manual' | 'time' | 'scroll' | 'exit'
    triggerDelay = 30000,              // ms for 'time' or 'auto' timeout (desktop)
    triggerDelayMobile = 60000,        // ms for 'time' or 'auto' timeout (mobile — slower)
    triggerScrollPx = 1500,            // px for 'scroll' or 'auto' (desktop)
    triggerScrollPxMobile = 2800,      // px for 'scroll' or 'auto' (mobile — require deeper read)
    triggerExitIntent = true,          // detect mouse-leave-top / tab-switch (desktop only)
    dismissible = true,                // user can close
    delayBeforeShow = 600,             // ms after trigger fires before modal opens (desktop)
    delayBeforeShowMobile = 900,       // ms after trigger fires before modal opens (mobile)

    // --- Display ---
    showVilla = true,
    showEmail = true,
    showLiveBadge = true,              // "8 orang sedang melihat"

    // --- Copy ---
    badge = 'Simulasi Personal',
    headlinePart1 = 'Rencanakan',
    headlinePart2 = 'Investasi Villa Anda',
    subhead = 'Tim konsultan Sahid akan menghubungi Anda via WhatsApp untuk menyusun rekomendasi villa, simulasi yield, dan proyeksi cicilan sesuai profil investasi Anda.',
    valueProps = [
      'Simulasi yield 9–15% p.a. sesuai profil Anda',
      'Proyeksi cicilan KPR Bank & Developer',
      'Rekomendasi villa dari 3 tipe (Bijak, Idaman, Mapan)'
    ],
    submitLabel = 'Kirim Simulasi Personal',
    submittingLabel = 'Mengirim...',
    submitHint = 'Via WhatsApp',
    successTitle = 'Simulasi Anda Terkirim',
    successBody = 'Tim konsultan Sahid akan menghubungi Anda via WhatsApp untuk mendiskusikan rekomendasi personal. Mohon ditunggu.',
    disclaimer = 'Gratis · Tanpa komitmen · Data aman sesuai UU PDP',

    // --- Villa options ---
    villaOptions = [
      { value: 'bijak', label: 'Bijak — Rp 1,2 M' },
      { value: 'idaman', label: 'Idaman — Rp 1,6 M' },
      { value: 'mapan', label: 'Mapan — Rp 2 M' }
    ],
    defaultVilla = 'idaman',

    // --- Tracking ---
    source = 'lead_form',
    capiEndpoint = '/capi/track',
    enableCAPI = false,                // SET TRUE setelah CAPI Gateway deployed (lihat ARCHITECTURE_CAPI.md)
    leadValue = 10000000
  } = $props();

  // ========== State ==========
  let open = $state(false);
  let dismissed = $state(false);
  let submitting = $state(false);
  let step = $state(1);
  let triggered = $state(false);
  let triggerReason = $state(null);  // 'time' | 'scroll' | 'exit' | 'manual'
  let isMobile = $state(false);       // set in onMount via UA / viewport

  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let villa = $state(defaultVilla);

  // Live activity counter (from site data)
  const liveViewers = siteData?.stats?.activeViewers ?? 8;

  // ========== Public API ==========
  export function show(reason = 'manual') {
    triggerReason = reason;
    triggered = true;
    setTimeout(() => { open = true; }, isMobile ? delayBeforeShowMobile : delayBeforeShow);
  }

  export function hide() {
    dismiss();
  }

  export function reset() {
    name = '';
    phone = '';
    email = '';
    villa = defaultVilla;
    step = 1;
    submitting = false;
    dismissed = false;
    triggered = false;
    triggerReason = null;
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('lead_dismissed');
    if (typeof localStorage !== 'undefined') localStorage.removeItem('mr_lead_dismissed_24h');
  }

  // ========== Lifecycle: setup triggers ==========
  let timerId = null;
  let scrollHandler = null;
  let mouseLeaveHandler = null;
  let visibilityHandler = null;
  let beforeUnloadHandler = null;

  onMount(() => {
    if (typeof window === 'undefined') return;

    // Mobile detection (UA + viewport). Re-check on resize for desktop-tablet hybrids.
    const checkMobile = () => {
      const ua = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const narrow = window.matchMedia('(max-width: 767px)').matches;
      isMobile = ua || narrow;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Skip if dismissed in this session (legacy key)
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lead_dismissed')) {
      dismissed = true;
      if (trigger === 'manual') return;
    }

    // Skip if dismissed in last 24h (localStorage) — better UX than session-only
    try {
      const lastDismiss = parseInt(localStorage.getItem('mr_lead_dismissed_24h') || '0', 10);
      if (lastDismiss && Date.now() - lastDismiss < 24 * 3600 * 1000) {
        dismissed = true;
        if (trigger === 'manual') return;
      }
    } catch {}

    const shouldFire = (reason) => {
      if (triggered) return false;
      if (dismissed) return false;
      triggered = true;
      triggerReason = reason;
      clearAllTimers();
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => { open = true; }, isMobile ? delayBeforeShowMobile : delayBeforeShow);
      return true;
    };

    // Time trigger (slower on mobile — users need more time to read)
    if (trigger === 'auto' || trigger === 'time') {
      const t = isMobile ? triggerDelayMobile : triggerDelay;
      timerId = setTimeout(() => shouldFire('time'), t);
    }

    // Scroll trigger (deeper scroll on mobile — one swipe is not enough intent)
    if (trigger === 'auto' || trigger === 'scroll') {
      const limit = isMobile ? triggerScrollPxMobile : triggerScrollPx;
      scrollHandler = () => {
        if (!triggered && !dismissed && window.scrollY > limit) {
          shouldFire('scroll');
        }
      };
      window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    // Exit intent (mouse leave top of viewport, desktop only)
    if ((trigger === 'auto' || trigger === 'exit') && triggerExitIntent && !isMobile) {
      mouseLeaveHandler = (e) => {
        if (e.clientY <= 10 && e.relatedTarget == null) {
          shouldFire('exit_intent');
        }
      };
      document.documentElement.addEventListener('mouseleave', mouseLeaveHandler);
    }

    // Exit intent (tab switch return) — DESKTOP ONLY on mobile it's too aggressive
    // (notification swipe, app switch, control center all fire visibilitychange → annoying popup)
    if ((trigger === 'auto' || trigger === 'exit') && triggerExitIntent && !isMobile) {
      visibilityHandler = () => {
        if (document.visibilityState === 'hidden') {
          try { sessionStorage.setItem('mr_exit_queued', '1'); } catch {}
        } else if (document.visibilityState === 'visible' &&
                   sessionStorage.getItem('mr_exit_queued') === '1') {
          try { sessionStorage.removeItem('mr_exit_queued'); } catch {}
          shouldFire('exit_intent_return');
        }
      };
      document.addEventListener('visibilitychange', visibilityHandler);
    }

    // Exit intent (before unload — last chance) — desktop only
    if ((trigger === 'auto' || trigger === 'exit') && triggerExitIntent && enableCAPI && !isMobile) {
      beforeUnloadHandler = (e) => {
        if (!triggered && !dismissed && name) {
          // User has started filling but might leave — fire CAPI beacon via sendBeacon
          try {
            const payload = JSON.stringify({
              event_name: 'Lead',
              event_id: crypto?.randomUUID?.() || String(Date.now()),
              event_time: Math.floor(Date.now() / 1000),
              action_source: 'website',
              user_data: { firstName: name, email, phone: phone.replace(/[^0-9+]/g, '') },
              custom_data: { value: leadValue, currency: 'IDR', source, abandoned: true }
            });
            navigator.sendBeacon(capiEndpoint, new Blob([payload], { type: 'application/json' }));
          } catch {}
        }
      };
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }
  });

  onDestroy(() => {
    clearAllTimers();
  });

  function clearAllTimers() {
    if (timerId) { clearTimeout(timerId); timerId = null; }
    if (scrollHandler) { window.removeEventListener('scroll', scrollHandler); }
    if (mouseLeaveHandler) { document.documentElement.removeEventListener('mouseleave', mouseLeaveHandler); }
    if (visibilityHandler) { document.removeEventListener('visibilitychange', visibilityHandler); }
    if (beforeUnloadHandler) { window.removeEventListener('beforeunload', beforeUnloadHandler); }
  }

  // ========== Helpers ==========
  function dismiss() {
    open = false;
    dismissed = true;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('lead_dismissed', '1');
    }
    // 24h cooldown in localStorage — user won't see popup again for 24h after dismiss
    try {
      localStorage.setItem('mr_lead_dismissed_24h', String(Date.now()));
    } catch {}
  }

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

  function getFormattedWAUrl() {
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
      `*Trigger*`,
      `• Source: ${source}`,
      triggerReason ? `• Muncul via: ${triggerReason}` : null,
      ``,
      `Mohon disusun simulasinya. Terima kasih.`
    ].filter(Boolean);

    return waUrl(siteData.contact.whatsapp, lines.join('\n'), source);
  }

  // ========== Submit ==========
  function submit(e) {
    e.preventDefault();
    if (!name || !phone) return;
    submitting = true;

    // Persist
    try {
      sessionStorage.setItem('mr_user', JSON.stringify({ name, phone, email, villa }));
      localStorage.setItem('mr_user', JSON.stringify({ name, phone, email, villa }));
    } catch {}

    const [firstName, ...lastParts] = name.trim().split(/\s+/);
    const userData = {
      firstName,
      lastName: lastParts.join(' '),
      phone: phone.replace(/[^0-9+]/g, ''),
      email: email || undefined
    };

    const eventId = generateEventId();
    const eventTime = Math.floor(Date.now() / 1000);

    // === 1. CAPI Gateway beacon (only if enabled — false until CAPI Gateway deployed) ===
    if (enableCAPI && capiEndpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        const payload = JSON.stringify({
          event_name: 'Lead',
          event_id: eventId,
          event_time: eventTime,
          event_source_url: window.location.href,
          action_source: 'website',
          user_data: userData,
          custom_data: {
            value: leadValue, currency: 'IDR',
            lead_type: 'simulation_request',
            villa_pref: villa,
            source, trigger_reason: triggerReason || 'manual',
            content_name: 'simulation_request',
            content_category: 'villa_investment'
          }
        });
        navigator.sendBeacon(capiEndpoint, new Blob([payload], { type: 'application/json' }));
      } catch (err) { console.warn('[LeadForm] CAPI beacon failed:', err); }
    }

    // === 2. Meta Pixel (dedup via event_id) ===
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        event_id: eventId,
        value: leadValue, currency: 'IDR',
        content_name: 'simulation_request',
        content_category: 'villa_investment'
      });
    }

    // === 3. GA4 + Google Ads ===
    (async () => {
      try {
        if (typeof window.mrAnalytics !== 'undefined') {
          await window.mrAnalytics.trackLead({
            ...userData,
            leadType: 'simulation_request',
            estimatedValue: leadValue
          });
        }
      } catch (err) { console.warn('[LeadForm] Enhanced conversion failed:', err); }

      const url = getFormattedWAUrl();
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion(url);
      } else {
        window.open(url, '_blank', 'noopener');
      }

      setTimeout(() => {
        step = 2;
        submitting = false;
        setTimeout(() => dismiss(), 7000);
      }, 800);
    })();
  }
</script>

<AnimatePresence>
  {#if open && !dismissed}
    <motion.div
      key="leadform-overlay"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-forest-900/80 backdrop-blur-md"
      style="padding-top: max(0px, env(safe-area-inset-top)); padding-bottom: max(0px, env(safe-area-inset-bottom)); padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right);"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onclick={(e) => { if (e.target === e.currentTarget && dismissible) dismiss(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leadform-headline"
    >
      <motion.div
        key="leadform-content"
        class="relative w-full sm:max-w-lg bg-gradient-to-br from-cream-50 via-cream-50 to-gold-50 shadow-2xl shadow-forest-900/50 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        <!-- ANIMATED GOLD GRADIENT BORDER (shimmer) -->
        <div
          class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-400 via-warning-500 to-gold-400 bg-[length:200%_100%] animate-shimmer"
        ></div>

        <!-- Decorative sparkle corners (subtle, kept AWAY from close button) -->
        <Sparkles class="absolute top-7 left-4 w-4 h-4 text-gold-500/30 animate-pulse-wa" />
        <Sparkles class="absolute bottom-20 left-8 w-4 h-4 text-warning-500/20 animate-pulse-wa" style="animation-delay: 0.7s" />

        {#if dismissible}
          <!-- Close button: 44x44 (Apple HIG minimum), dark solid bg, visible on cream/gold gradient, safe-area aware -->
          <button
            type="button"
            onclick={dismiss}
            class="absolute top-3 right-3 z-20 w-11 h-11 flex items-center justify-center bg-forest-900 hover:bg-forest-700 active:bg-forest-700 text-cream-50 shadow-lg shadow-forest-900/30 hover:shadow-xl transition-all rounded-full"
            style="top: max(12px, env(safe-area-inset-top, 12px)); right: max(12px, env(safe-area-inset-right, 12px));"
            aria-label="Tutup formulir"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        {/if}

        <AnimatePresence mode="wait">
          {#if step === 1}
            <motion.div
              key="leadform-step-form"
              class="p-6 sm:p-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <!-- Badge row: SIMULASI + LIVE indicator -->
              <div class="flex items-center gap-2 mb-5 flex-wrap">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gold-500/20 to-warning-500/20 text-warning-700 text-[10px] font-bold tracking-[0.2em] uppercase border border-gold-500/30">
                  <Sparkles class="w-3 h-3" />
                  {badge}
                </div>
                {#if showLiveBadge && liveViewers}
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-success-100 border border-success-300 text-success-800 text-[10px] font-bold tracking-wider uppercase">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                    </span>
                    <Eye class="w-3 h-3" />
                    {liveViewers} melihat
                  </div>
                {/if}
              </div>

              <!-- Headline -->
              <h2
                id="leadform-headline"
                class="font-display text-3xl sm:text-[2.6rem] text-forest-900 leading-[1.05] font-bold mb-4 tracking-tight"
              >
                {headlinePart1}{' '}
                <em class="text-gold-700 italic font-display bg-gradient-to-r from-gold-600 to-warning-600 bg-clip-text text-transparent">
                  {headlinePart2}
                </em>
              </h2>

              <!-- Subhead -->
              <p class="text-[15px] text-ink-soft leading-relaxed mb-6">
                {subhead}
              </p>

              <!-- Value props -->
              {#if valueProps && valueProps.length > 0}
                <div class="bg-white/60 backdrop-blur-sm border-l-4 border-gradient-to-b from-gold-500 to-warning-500 pl-4 py-3 space-y-2 mb-7 rounded-r">
                  {#each valueProps as prop}
                    <div class="flex items-start gap-2.5 text-[14px] text-ink-soft leading-snug">
                      <span class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-gold-500 to-warning-500 flex items-center justify-center mt-0.5">
                        <CheckCircle2 class="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                      <span>{prop}</span>
                    </div>
                  {/each}
                </div>
              {/if}

              <!-- Form -->
              <form onsubmit={submit} class="space-y-4">
                <div>
                  <label for="leadform-name" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
                    <User class="w-3 h-3" /> Nama Lengkap <span class="text-warning-700">*</span>
                  </label>
                  <input
                    id="leadform-name"
                    type="text"
                    bind:value={name}
                    required
                    autocomplete="name"
                    placeholder="Budi Santoso"
                    class="w-full px-4 py-3 bg-white border-2 border-cream-100 text-forest-900 text-[15px] focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition rounded-none"
                  />
                </div>

                <div>
                  <label for="leadform-phone" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
                    <Phone class="w-3 h-3" /> WhatsApp <span class="text-warning-700">*</span>
                  </label>
                  <input
                    id="leadform-phone"
                    type="tel"
                    bind:value={phone}
                    required
                    autocomplete="tel"
                    placeholder="+62 812 3456 7890"
                    class="w-full px-4 py-3 bg-white border-2 border-cream-100 text-forest-900 font-mono text-[15px] focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition rounded-none"
                  />
                </div>

                {#if showEmail}
                  <div>
                    <label for="leadform-email" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
                      <Mail class="w-3 h-3" /> Email <span class="text-ink-mute font-normal normal-case tracking-normal text-[10px]">(opsional)</span>
                    </label>
                    <input
                      id="leadform-email"
                      type="email"
                      bind:value={email}
                      autocomplete="email"
                      placeholder="budi@email.com"
                      class="w-full px-4 py-3 bg-white border-2 border-cream-100 text-forest-900 text-[15px] focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition rounded-none"
                    />
                  </div>
                {/if}

                {#if showVilla && villaOptions.length > 0}
                  <div>
                    <label for="leadform-villa" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-forest-900 mb-2 font-semibold">
                      <Home class="w-3 h-3" /> Preferensi Villa
                    </label>
                    <select
                      id="leadform-villa"
                      bind:value={villa}
                      class="w-full px-4 py-3 bg-white border-2 border-cream-100 text-forest-900 text-[15px] focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition rounded-none appearance-none cursor-pointer font-medium"
                      style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23D97706%22><path d=%22M7 10l5 5 5-5z%22/></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 18px; padding-right: 40px;"
                    >
                      {#each villaOptions as opt}
                        <option value={opt.value}>{opt.label}</option>
                      {/each}
                    </select>
                  </div>
                {/if}

                <div class="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    class="relative w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-gold-500 via-gold-600 to-warning-500 hover:from-gold-600 hover:via-warning-500 hover:to-warning-600 disabled:opacity-50 text-forest-900 font-bold text-[13px] tracking-[0.2em] uppercase transition min-h-[58px] shadow-lg shadow-gold-500/40 hover:shadow-xl hover:shadow-warning-500/40 hover:-translate-y-0.5 overflow-hidden group"
                  >
                    <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    {#if submitting}
                      <span class="inline-flex items-center gap-2 relative z-10">
                        <span class="w-3 h-3 border-2 border-forest-900/30 border-t-forest-900 rounded-full animate-spin"></span>
                        {submittingLabel}
                      </span>
                    {:else}
                      <span class="inline-flex items-center gap-2.5 relative z-10">
                        <Zap class="w-4 h-4 fill-forest-900" />
                        <span>{submitLabel}</span>
                        <ArrowRight class="w-4 h-4" />
                      </span>
                    {/if}
                  </button>
                  <p class="text-[11px] text-ink-mute text-center mt-2.5 font-mono uppercase tracking-[0.15em]">
                    ⚡ {submitHint}
                  </p>
                </div>
              </form>

              <p class="text-[10px] text-ink-mute text-center mt-5 leading-relaxed">
                {disclaimer}
              </p>
            </motion.div>
          {:else}
            <motion.div
              key="leadform-step-success"
              class="p-10 sm:p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                class="w-20 h-20 mx-auto bg-gradient-to-br from-success-400 to-success-600 text-white rounded-full flex items-center justify-center mb-5 shadow-lg shadow-success-500/40"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 class="w-11 h-11" strokeWidth={2.5} />
              </motion.div>
              <h2 class="font-display text-2xl sm:text-3xl text-forest-900 font-bold mb-3">
                {successTitle}
              </h2>
              <p class="text-[14px] text-ink-soft leading-relaxed mb-7 max-w-sm mx-auto">
                {successBody}
              </p>
              <button
                type="button"
                onclick={dismiss}
                class="text-[11px] text-ink-mute hover:text-forest-900 uppercase tracking-[0.2em] font-mono underline-offset-4 hover:underline transition"
              >
                Tutup
              </button>
            </motion.div>
          {/if}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  {/if}
</AnimatePresence>
