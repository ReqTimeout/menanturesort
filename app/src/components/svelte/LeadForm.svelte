<script>
  /**
   * LeadForm.svelte — Global lead capture form
   * Floating modal that appears after 30s idle (configurable)
   * Submits by opening WhatsApp with neatly formatted message
   * Tracks conversion via gtag + Meta Pixel
   */
  import { onMount } from 'svelte';
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { X, MessageCircle, User, Phone, Mail, Home, ArrowRight, CheckCircle2, Gift, Sparkles, Clock } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let open = $state(false);
  let dismissed = $state(false);
  let submitting = $state(false);
  let step = $state(1); // 1: form, 2: success

  // Form fields
  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let villa = $state('belum-tahu');
  let source = $state('lead_form_modal');

  // Sticky / popup settings
  const SHOW_AFTER_MS = 30000; // 30s
  const SHOW_SCROLL_PX = 1500; // 1.5x viewport scroll
  let triggered = $state(false);

  onMount(() => {
    // Check if already dismissed in this session
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lead_dismissed')) {
      dismissed = true;
      return;
    }

    // Show after timer
    const timer = setTimeout(() => {
      if (!triggered && !dismissed) {
        triggerPopup();
      }
    }, SHOW_AFTER_MS);

    // Show after scroll
    const onScroll = () => {
      if (!triggered && !dismissed && window.scrollY > SHOW_SCROLL_PX) {
        triggerPopup();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  });

  function triggerPopup() {
    triggered = true;
    setTimeout(() => { open = true; }, 500);
  }

  function dismiss() {
    open = false;
    dismissed = true;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('lead_dismissed', '1');
    }
  }

  function getFormattedWAUrl() {
    // Build a professional, neatly formatted WhatsApp message
    const lines = [
      `Halo Tim Sahid, saya ingin konsultasi villa Menantu Resort.`,
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

  function villaLabel(id) {
    return {
      'bijak': 'Bijak (Rp 1,2 M)',
      'idaman': 'Idaman (Rp 1,6 M)',
      'mapan': 'Mapan (Rp 2 M)',
      'belum-tahu': 'Belum yakin, butuh konsultasi',
    }[id] || id;
  }

  function submit(e) {
    e.preventDefault();
    if (!name || !phone) return;
    submitting = true;

    // Track conversion
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: source,
        value: 1,
      });
      window.gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: source,
      });
    }
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: source });
      window.fbq('track', 'Contact', { content_name: source });
    }

    // Open WhatsApp
    const url = getFormattedWAUrl();
    window.open(url, '_blank', 'noopener');

    // Show success state
    setTimeout(() => {
      step = 2;
      submitting = false;
      // Auto-close after 5s
      setTimeout(() => dismiss(), 5000);
    }, 800);
  }
</script>

<AnimatePresence>
  {#if open && !dismissed}
    <motion.div
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-forest-700/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onclick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <motion.div
        class="relative w-full sm:max-w-md bg-cream-50 border-2 border-gold-500 shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          onclick={dismiss}
          class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-forest-700/10 hover:bg-forest-700/20 text-forest-700 transition"
          aria-label="Tutup"
        >
          <X size={16} />
        </button>

        {#if step === 1}
          <div class="p-6 sm:p-8">
            <!-- Header -->
            <div class="mb-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 text-gold-700 text-xs font-bold tracking-widest uppercase mb-3">
                <Sparkles class="w-3 h-3" />
                Konsultasi Gratis
              </div>
              <h2 class="font-display text-2xl sm:text-3xl text-forest-700 leading-tight font-bold">
                Dapatkan <em class="text-gold-700">Simulasi Personal</em>
              </h2>
              <p class="text-sm text-ink-700 mt-2 leading-relaxed">
                Tim Sahid akan menghubungi Anda dalam <strong>5 menit</strong> via WhatsApp dengan rekomendasi villa yang sesuai budget & timeline.
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
                  placeholder="Budi Santoso"
                  class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500"
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
                  placeholder="+62 812 3456 7890"
                  class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-700 font-mono text-base focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-widest text-forest-700 mb-1.5">
                  <Mail class="w-3 h-3 inline mr-1" /> Email (opsional)
                </label>
                <input
                  type="email"
                  bind:value={email}
                  placeholder="budi@email.com"
                  class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-widest text-forest-700 mb-1.5">
                  <Home class="w-3 h-3 inline mr-1" /> Minat Villa
                </label>
                <select
                  bind:value={villa}
                  class="w-full px-4 py-3 bg-white border border-cream-100 text-forest-700 text-base focus:outline-none focus:border-gold-500"
                >
                  <option value="belum-tahu">Belum yakin, butuh konsultasi</option>
                  <option value="bijak">Bijak (Rp 1,2 M)</option>
                  <option value="idaman">Idaman (Rp 1,6 M)</option>
                  <option value="mapan">Mapan (Rp 2 M)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-sm tracking-wider uppercase transition min-h-[48px] disabled:opacity-50"
              >
                {#if submitting}
                  <span>Menghubungkan...</span>
                {:else}
                  <MessageCircle class="w-4 h-4" />
                  <span>Chat WhatsApp Sekarang</span>
                  <ArrowRight class="w-4 h-4" />
                {/if}
              </button>

              <p class="text-[10px] text-ink-mute text-center leading-relaxed">
                <Clock class="w-3 h-3 inline" /> Respon dalam 5 menit · Tanpa spam · Data aman sesuai UU PDP
              </p>
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
              Silakan kirim pesan untuk terhubung dengan tim Sahid. Mereka akan merespon dalam 5 menit.
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
