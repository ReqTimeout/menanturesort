<script>
  /**
   * ExitIntentPopup.svelte — Exit-intent lead capture popup
   * Khusus untuk /promo page.
   *
   * Trigger (multi-device):
   * - Desktop: mouse leave ke atas viewport (y < 10)
   * - Desktop: idle 45 detik (no scroll, no click, no mousemove)
   * - Mobile: back-button press (history.back simulation)
   * - Mobile: tab switch (visibilitychange → hidden)
   * - Mobile: scroll velocity tinggi ke atas (>800px/s)
   *
   * Skip conditions:
   * - User sudah pernah submit form (mr_user_data ada)
   * - User sudah dismiss di session ini (sessionStorage)
   * - Sudah submit 24 jam terakhir (localStorage)
   *
   * Tracking:
   * - Google Ads: generate_lead via window.mrAnalytics.trackLead
   * - Meta Pixel: Lead event (handled inside trackLead)
   * - GA4: generate_lead + custom exit_intent_capture
   * - Enhanced Conversions: SHA-256 user_data
   */
  import { onMount } from 'svelte';
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { X, MessageCircle, User, Phone, ArrowRight, CheckCircle2, Gift, Clock, Shield } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let open = $state(false);
  let dismissed = $state(false);
  let submitting = $state(false);
  let success = $state(false);
  let step = $state(1);
  let source = 'exit_intent_promo';

  // Form fields
  let name = $state('');
  let phone = $state('');

  // Config
  const IDLE_MS = 45000;
  const DESKTOP_MOUSE_THRESHOLD = 10;
  const MOBILE_VELOCITY_THRESHOLD = 800; // px/s
  const DELAY_BEFORE_SHOW = 1200; // 1.2s after trigger
  const SESSION_KEY = 'promo_exit_dismissed';
  const COOLDOWN_KEY = 'promo_exit_dismissed_24h';
  const COOLDOWN_HOURS = 24;

  onMount(() => {
    // SSR / no window guard
    if (typeof window === 'undefined') return;

    // Skip if user already converted
    try {
      const userData = window.mrUserData?.get?.();
      if (userData && (userData.email || userData.phone)) return;
    } catch (e) {}

    // Skip if dismissed in this session
    if (sessionStorage.getItem(SESSION_KEY)) {
      dismissed = true;
      return;
    }

    // Skip if dismissed in last 24h
    try {
      const lastDismiss = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
      if (lastDismiss && Date.now() - lastDismiss < COOLDOWN_HOURS * 3600 * 1000) {
        dismissed = true;
        return;
      }
    } catch (e) {}

    let triggered = false;
    let idleTimer;

    const showNow = (reason) => {
      if (triggered || dismissed) return;
      triggered = true;
      // Fire GA4 custom event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'exit_intent_trigger', {
          event_category: 'engagement',
          event_label: reason,
          send_to: 'G-39JSBHZY3T'
        });
      }
      setTimeout(() => { open = true; }, DELAY_BEFORE_SHOW);
    };

    // ─── DESKTOP: mouse leave to top ───
    const onMouseLeave = (e) => {
      // Only when mouse exits via top of viewport
      if (e.clientY <= DESKTOP_MOUSE_THRESHOLD && e.relatedTarget == null) {
        showNow('mouse_leave_top');
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);

    // ─── DESKTOP: idle 45s ───
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => showNow('idle_45s'), IDLE_MS);
    };
    ['mousemove', 'scroll', 'click', 'keydown', 'touchstart'].forEach((ev) =>
      document.addEventListener(ev, resetIdle, { passive: true })
    );
    resetIdle();

    // ─── MOBILE: back button ───
    // Push a placeholder state so back button can be intercepted
    history.pushState({ page: 'promo' }, '', '');
    const onPopState = () => {
      showNow('back_button');
      // Re-push so user can still navigate
      history.pushState({ page: 'promo' }, '', '');
    };
    window.addEventListener('popstate', onPopState);

    // ─── MOBILE: tab switch ───
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        sessionStorage.setItem('promo_exit_queued', '1');
      } else if (document.visibilityState === 'visible' && sessionStorage.getItem('promo_exit_queued')) {
        sessionStorage.removeItem('promo_exit_queued');
        showNow('tab_switch_return');
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ─── MOBILE: fast upward scroll ───
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    const onScroll = () => {
      const now = Date.now();
      const dy = lastScrollY - window.scrollY; // positive = scrolling up
      const dt = now - lastScrollTime;
      if (dt > 0) {
        const velocity = (dy / dt) * 1000; // px/s
        if (velocity > MOBILE_VELOCITY_THRESHOLD) {
          showNow('fast_upward_scroll');
        }
      }
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
      ['mousemove', 'click', 'keydown', 'touchstart'].forEach((ev) =>
        document.removeEventListener(ev, resetIdle)
      );
      clearTimeout(idleTimer);
    };
  });

  function dismiss() {
    open = false;
    dismissed = true;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch (e) {}
  }

  function buildWAUrl() {
    const lines = [
      `Halo Tim Sahid, saya ingin klaim PROMO Q2 2026.`,
      ``,
      `*Data Diri*`,
      `• Nama: ${name || '-'}`,
      `• WhatsApp: ${phone || '-'}`,
      ``,
      `Mohon info lebih lanjut. Terima kasih.`,
    ].filter(Boolean);
    return waUrl(siteData.contact.whatsapp, lines.join('\n'), source);
  }

  async function submit(e) {
    e.preventDefault();
    if (!name || !phone) return;
    submitting = true;

    const [firstName, ...lastParts] = (name || '').trim().split(' ');
    const userData = {
      firstName: firstName || undefined,
      lastName: lastParts.join(' ') || undefined,
      phone: phone || undefined,
      email: undefined
    };

    // Track conversion (Google Ads + GA4 + Meta Pixel via mrAnalytics.trackLead)
    try {
      if (typeof window.mrAnalytics !== 'undefined' && window.mrAnalytics.trackLead) {
        await window.mrAnalytics.trackLead({
          ...userData,
          leadType: 'promo_exit_intent',
          estimatedValue: 10000000 // Booking fee signal
        });
      }
    } catch (err) {
      console.warn('[ExitIntentPopup] tracking failed:', err);
    }

    // Open WhatsApp
    const url = buildWAUrl();
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion(url);
    } else {
      setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
    }
    // Explicit Meta Pixel Contact event (in addition to Lead)
    if (typeof window.fbq === 'function') {
      window.mrUserData.getHashed().then(function(hashed) {
        window.fbq('track', 'Contact', {
          value: 10000000,
          currency: 'IDR',
          content_name: 'promo_exit_intent',
          content_category: 'whatsapp_form_submit',
          ...(hashed && hashed.email ? { em: hashed.email } : {}),
          ...(hashed && hashed.phone_number ? { ph: hashed.phone_number } : {}),
          ...(hashed && hashed.first_name ? { fn: hashed.first_name } : {}),
          ...(hashed && hashed.last_name ? { ln: hashed.last_name } : {})
        });
      });
    }

    setTimeout(() => {
      success = true;
      submitting = false;
      setTimeout(() => dismiss(), 5000);
    }, 600);
  }
</script>

<AnimatePresence>
  {#if open && !dismissed}
    <motion.div
      class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-forest-900/75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onclick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <motion.div
        class="relative w-full sm:max-w-md bg-cream-50 border-2 border-gold-500 shadow-2xl max-h-[92vh] overflow-y-auto"
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          onclick={dismiss}
          class="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-forest-700/10 hover:bg-forest-700/20 text-forest-700 transition"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        {#if !success}
          <div class="p-6 sm:p-8">
            <!-- Header -->
            <div class="mb-5">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-danger-100 border border-danger-300 text-danger-800 text-xs font-bold tracking-widest uppercase mb-3">
                <Gift class="w-3 h-3" />
                <span>Tunggu — Bonus Eksklusif</span>
              </div>
              <h2 class="font-display text-2xl sm:text-3xl text-forest-700 leading-[1.05] font-bold mb-2">
                Dapatkan Detail <em class="text-gold-700">Promo + Bonus</em> Mobil Listrik di WhatsApp
              </h2>
              <p class="text-sm text-ink-700 leading-relaxed">
                Masukkan WhatsApp Anda — kami kirim detail promo Q2 2026 + bonus Mobil Listrik Baru langsung ke HP. Plus konsultasi gratis dengan tim Sahid.
              </p>
            </div>

            <form onsubmit={submit} class="space-y-3">
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
                  class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
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
                  inputmode="tel"
                  autocomplete="tel"
                  placeholder="+62 812 3456 7890"
                  class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-700 font-mono text-base focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold-500 hover:bg-gold-300 text-forest-900 font-bold text-sm tracking-wider uppercase transition min-h-[52px] disabled:opacity-50 shadow-lg shadow-gold-500/30"
              >
                {#if submitting}
                  <span>Menghubungkan ke WhatsApp...</span>
                {:else}
                  <MessageCircle class="w-4 h-4" />
                  <span>KIRIM BONUS PROMO</span>
                  <ArrowRight class="w-4 h-4" />
                {/if}
              </button>

              <div class="flex flex-wrap items-center justify-center gap-3 pt-1 text-[10px] text-ink-mute">
                <span class="inline-flex items-center gap-1">
                  <Clock class="w-3 h-3 text-gold-700" /> Sisa 10 slot minggu ini
                </span>
                <span class="inline-flex items-center gap-1">
                  <Shield class="w-3 h-3 text-gold-700" /> Data aman UU PDP
                </span>
              </div>
            </form>
          </div>
        {:else}
          <div class="p-8 sm:p-10 text-center">
            <motion.div
              class="w-16 h-16 mx-auto bg-success/20 text-success rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 class="w-8 h-8" />
            </motion.div>
            <h2 class="font-display text-2xl text-forest-700 font-bold mb-2">
              WhatsApp Terbuka!
            </h2>
            <p class="text-sm text-ink-700 leading-relaxed mb-6">
              Silakan kirim pesan untuk terhubung dengan Tim Sahid. Mereka akan merespon dalam 5 menit.
            </p>
            <button
              onclick={dismiss}
              class="text-xs text-ink-mute hover:text-forest-700 underline"
            >
              Tutup
            </button>
          </div>
        {/if}
      </motion.div>
    </motion.div>
  {/if}
</AnimatePresence>
