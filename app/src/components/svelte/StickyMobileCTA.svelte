<script>
  /**
   * StickyMobileCTA.svelte — Bottom sticky CTA bar (mobile only)
   * 3 buttons: WhatsApp (primary) | Lihat Villa | Simulasi
   * Hidden di desktop, visible di mobile (< md breakpoint)
   * Hidden when user scroll ke atas (showing hero) — show when scrolled past 50vh
   */
  import { onMount } from 'svelte';
  import { MessageCircle, Home, Calculator, ChevronUp } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let visible = $state(false);
  let lastScrollY = $state(0);

  const waMessage = waUrl(
    siteData.contact.whatsapp,
    'Halo, saya tertarik dengan villa Menantu Resort. Mohon info lebih lanjut.',
    'sticky_mobile_cta'
  );

  onMount(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      // Show when scrolled past 50vh
      if (currentY > window.innerHeight * 0.5) {
        visible = true;
      } else {
        visible = false;
      }
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div
  class="fixed bottom-0 left-0 right-0 z-[60] md:hidden transition-transform duration-300 {visible ? 'translate-y-0' : 'translate-y-full'}"
  aria-hidden={!visible}
>
  <div class="bg-gradient-to-t from-cream-50 via-cream-50 to-transparent pt-4 pb-3 px-3 border-t-2 border-gold-500/30 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
    <div class="grid grid-cols-5 gap-2">
      <a
        href={waMessage}
        target="_blank"
        rel="noopener"
        class="col-span-3 btn btn-primary justify-center text-sm min-h-[48px]"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle class="w-5 h-5" />
        <span class="font-semibold">Chat WhatsApp</span>
      </a>
      <a
        href="/villa"
        class="col-span-1 btn btn-outline justify-center text-[11px] min-h-[48px] flex-col gap-0.5"
        aria-label="Lihat Villa"
      >
        <Home class="w-4 h-4" />
        <span>Villa</span>
      </a>
      <a
        href="/investasi"
        class="col-span-1 btn btn-outline justify-center text-[11px] min-h-[48px] flex-col gap-0.5"
        aria-label="Simulasi KPR"
      >
        <Calculator class="w-4 h-4" />
        <span>Simulasi</span>
      </a>
    </div>
  </div>
</div>
