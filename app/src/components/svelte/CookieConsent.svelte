<script>
  /**
   * CookieConsent.svelte — V6 (slim bar, never blocks content)
   *
   * Layout:
   * - Bottom bar, full-width, single row (compact)
   * - Mobile: stacked (text + buttons below)
   * - Desktop: horizontal (text left, buttons right)
   * - Push content up with `body.has-cookie-banner` class
   */
  import { onMount } from 'svelte';
  import { Cookie, Shield, X } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import { setConsent } from '@lib/analytics';

  let { policyHref = '/kebijakan-privasi' } = $props();

  let visible = $state(false);
  let dismissed = $state(false);

  onMount(() => {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem('mr_cookie_consent');
    if (consent) return;

    setTimeout(() => {
      visible = true;
      document.body.classList.add('has-cookie-banner');
      if (window.innerWidth >= 768) {
        document.body.classList.add('has-cookie-banner-desktop');
      }
    }, 1500);
  });

  function accept() {
    setConsent(true);
    close();
  }
  function decline() {
    setConsent(false);
    close();
  }
  function close() {
    visible = false;
    dismissed = true;
    document.body.classList.remove('has-cookie-banner');
    document.body.classList.remove('has-cookie-banner-desktop');
  }
</script>

{#if visible && !dismissed}
  <div
    class="fixed bottom-0 left-0 right-0 z-[55] md:bottom-4 md:left-4 md:right-4"
    transition:fly={{ y: 50, duration: 380, opacity: 0 }}
  >
    <div
      class="bg-forest-700/95 text-cream-50 shadow-2xl border-t-2 md:border-2 border-gold-500
             backdrop-blur-md mx-auto max-w-5xl"
    >
      <!-- Desktop horizontal layout -->
      <div class="hidden md:flex items-center gap-4 px-5 py-3">
        <Cookie size={20} class="text-gold-500 flex-shrink-0" />
        <p class="text-xs text-cream-50/85 leading-snug flex-1">
          Kami menggunakan cookies untuk analitik & meningkatkan pengalaman Anda. Data diolah sesuai
          <a href={policyHref} class="text-gold-500 hover:text-gold-300 underline">Kebijakan Privasi</a>.
        </p>
        <button
          type="button"
          onclick={decline}
          class="text-xs font-semibold text-cream-50/80 hover:text-cream-50 border border-cream-50/20 px-3 py-1.5 transition"
        >
          Esensial
        </button>
        <button
          type="button"
          onclick={accept}
          class="text-xs font-semibold bg-gold-500 hover:bg-gold-300 text-forest-700 px-4 py-1.5 transition"
        >
          Terima Semua
        </button>
        <button
          type="button"
          onclick={close}
          class="text-cream-50/60 hover:text-cream-50 p-1"
          aria-label="Tutup"
        >
          <X size={14} />
        </button>
      </div>

      <!-- Mobile stacked layout -->
      <div class="md:hidden p-4 pb-5">
        <div class="flex items-start gap-3 mb-3">
          <Cookie size={18} class="text-gold-500 flex-shrink-0 mt-0.5" />
          <p class="text-xs text-cream-50/85 leading-relaxed flex-1">
            Cookies untuk analitik & UX. Sesuai
            <a href={policyHref} class="text-gold-500 hover:text-gold-300 underline">Kebijakan Privasi</a>.
          </p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            onclick={decline}
            class="flex-1 text-xs font-semibold text-cream-50 border border-cream-50/20 py-2.5 transition"
          >
            Esensial
          </button>
          <button
            type="button"
            onclick={accept}
            class="flex-1 text-xs font-semibold bg-gold-500 hover:bg-gold-300 text-forest-700 py-2.5 transition"
          >
            Terima Semua
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
