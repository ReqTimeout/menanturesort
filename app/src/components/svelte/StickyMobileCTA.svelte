<script>
  /**
   * StickyMobileCTA.svelte — Floating pill nav (mobile only)
   * No top border. Glassmorphism + shadow for depth.
   * 3 destinations: WhatsApp (primary gold) | Villa | Simulasi
   * Shows after user scrolls past 50vh
   */
  import { onMount } from 'svelte';
  import { MessageCircle, Home, Calculator } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let visible = $state(false);
  let waHover = $state(false);

  const waMessage = waUrl(
    siteData.contact.whatsapp,
    'Halo, saya tertarik dengan villa Menantu Resort. Mohon info lebih lanjut.',
    'sticky_mobile_cta'
  );

  onMount(() => {
    const onScroll = () => {
      visible = window.scrollY > window.innerHeight * 0.5;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<!-- Floating pill nav, anchored bottom-center, with breathing room -->
<div
  class="fixed bottom-5 left-3 right-3 z-[60] md:hidden transition-all duration-500 ease-out"
  class:opacity-0={!visible}
  class:translate-y-32={!visible}
  class:pointer-events-none={!visible}
  class:opacity-100={visible}
  class:translate-y-0={visible}
  class:pointer-events-auto={visible}
  aria-hidden={!visible}
>
  <div class="bg-forest-900/95 backdrop-blur-xl shadow-2xl shadow-forest-900/30 rounded-2xl p-1.5 ring-1 ring-gold-500/20">
    <div class="flex gap-1.5 items-stretch">
      <!-- WhatsApp primary -->
      <a
        href={waMessage}
        target="_blank"
        rel="noopener"
        class="group flex-1 min-w-0 flex items-center justify-center gap-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-forest-900 rounded-full px-3 py-3 font-bold text-[13px] tracking-wide shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 transition-all active:scale-95"
        aria-label="Chat WhatsApp Menantu Resort"
      >
        <span class="w-7 h-7 rounded-full bg-whatsapp flex items-center justify-center flex-shrink-0">
          <MessageCircle class="w-4 h-4 text-white" />
        </span>
        <span>Chat WhatsApp</span>
      </a>

      <!-- Villa -->
      <a
        href="/villa"
        class="group flex flex-col items-center justify-center gap-0.5 text-cream-50 rounded-full py-2 hover:bg-cream-50/10 transition-colors active:scale-95"
        aria-label="Lihat 3 Tipe Villa"
      >
        <Home class="w-4 h-4 text-gold-500 group-hover:text-gold-400" />
        <span class="text-[10px] font-semibold uppercase tracking-wider">Villa</span>
      </a>

      <!-- Simulasi -->
      <a
        href="/investasi"
        class="group flex flex-col items-center justify-center gap-0.5 text-cream-50 rounded-full py-2 hover:bg-cream-50/10 transition-colors active:scale-95"
        aria-label="Simulasi KPR"
      >
        <Calculator class="w-4 h-4 text-gold-500 group-hover:text-gold-400" />
        <span class="text-[10px] font-semibold uppercase tracking-wider">Simulasi</span>
      </a>
    </div>
  </div>
</div>
