<script>
  import { onMount } from 'svelte';
  import { ArrowRight, Eye } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let { title, accent, body, cta = 'Lihat Skema Investasi', eyebrow = 'Investasi Villa Bandung · SHM · Dikelola Sahid', badge } = $props();

  let mounted = $state(false);
  let scrollY = $state(0);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let viewers = $state(siteData.stats.activeViewers);

  onMount(() => {
    mounted = true;
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);

    const id = setInterval(() => {
      viewers = Math.max(3, siteData.stats.activeViewers + Math.floor(Math.random() * 9) - 4);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      clearInterval(id);
    };
  });

  const waLink = waUrl(siteData.contact.whatsapp, 'Halo, saya tertarik dengan Menantu Resort.', 'editorial_hero');

  let bgY = $derived(scrollY * 0.5);
  let textOp = $derived(Math.max(0, 1 - scrollY / 500));
</script>

<section class="hero-editorial relative h-screen min-h-[700px] flex items-end overflow-hidden bg-forest-700">
  <!-- Parallax BG with grain -->
  <div class="absolute inset-0 z-0" style="transform: translate3d({mouseX}px, {mouseY + bgY}px, 0) scale(1.05); will-change: transform;">
    <img src="/images/ref/villa-mapan-detail.jpg" alt="" class="w-full h-full object-cover" />
  </div>

  <!-- Layered gradients -->
  <div class="absolute inset-0 z-[1]" style="background: linear-gradient(180deg, rgba(13, 27, 20, 0.4) 0%, rgba(13, 27, 20, 0.2) 30%, rgba(13, 27, 20, 0.6) 70%, rgba(13, 27, 20, 0.95) 100%);"></div>
  <div class="absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay" style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;);"></div>

  <!-- Top eyebrow bar (asymmetric) -->
  <div class="absolute top-32 left-0 right-0 z-10 container-wide flex items-center justify-between text-cream-50/70 text-xs font-mono uppercase tracking-widest" style="opacity: {textOp};">
    <span class="flex items-center gap-3">
      <span class="h-px w-12 bg-gold-500"></span>
      {eyebrow}
    </span>
    {#if badge}
      <span class="hidden md:inline-flex items-center gap-2 text-gold-500">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
        </span>
        {badge}
      </span>
    {/if}
  </div>

  <!-- Main content (bottom-aligned, editorial) -->
  <div class="relative z-10 w-full pb-16 md:pb-24" style="opacity: {textOp};">
    <div class="container-wide">
      <h1 class="font-display text-cream-50 leading-[0.92] tracking-[-0.03em] mb-8 max-w-[14ch]" style="font-size: clamp(3rem, 9vw, 9rem); font-weight: 700;">
        <span class="block overflow-hidden">
          <span class="inline-block transition-transform duration-1000 ease-out" class:translate-y-0={mounted} class:translate-y-full={!mounted} style="transition-delay: 0.1s">{title}</span>
        </span>
        <span class="block overflow-hidden">
          <span class="inline-block italic text-gold-500 font-medium transition-transform duration-1000 ease-out" style="font-size: 0.6em; font-style: italic; transition-delay: 0.25s" class:translate-y-0={mounted} class:translate-y-full={!mounted}>{accent}</span>
        </span>
      </h1>

      <div class="grid grid-cols-12 gap-8 items-end">
        <div class="col-span-12 md:col-span-6 lg:col-span-5">
          <p class="font-body text-cream-50/80 leading-relaxed text-base md:text-lg" ></p>
        </div>

        <div class="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col md:items-end gap-6">
          <!-- Live indicator -->
          <div class="flex items-center gap-3 text-cream-50/70 text-xs font-mono">
            <Eye size={14} class="text-gold-500" />
            <span><span class="text-gold-500 font-bold">{viewers}</span> sedang melihat</span>
          </div>

          <div class="flex flex-wrap gap-3">
            <a href="#villa-types" data-cursor="Scroll" class="group inline-flex items-center gap-3 px-7 py-4 bg-gold-500 text-forest-700 font-body font-semibold text-sm tracking-wide transition-all hover:bg-gold-300 hover:gap-5">
              {cta}
              <ArrowRight size={16} strokeWidth="2.5" class="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={waLink} target="_blank" rel="noopener" data-cursor="Konsultasi" class="inline-flex items-center gap-3 px-7 py-4 border border-cream-50/30 text-cream-50 font-body font-semibold text-sm tracking-wide transition-all hover:border-cream-50 hover:bg-cream-50/5">
              Konsultasi WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator at bottom center -->
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream-50/50 text-[10px] font-mono uppercase tracking-[0.2em] pointer-events-none" style="opacity: {textOp};">
    <span>Scroll</span>
    <div class="relative h-10 w-px overflow-hidden bg-cream-50/20">
      <div class="absolute inset-x-0 top-0 h-3 bg-gold-500 animate-scroll-bounce"></div>
    </div>
  </div>

  <!-- Side index numbers (editorial detail) -->
  <div class="absolute top-1/2 right-6 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3 text-cream-50/30 text-[10px] font-mono tracking-widest" style="writing-mode: vertical-rl; transform: translateY(-50%) rotate(180deg);">
    <span>N° 01</span>
    <span class="h-12 w-px bg-cream-50/20"></span>
    <span>MENANTU RESORT</span>
  </div>
</section>

<style>
  @keyframes scrollBounce {
    0% { transform: translateY(-100%); }
    50% { transform: translateY(100%); }
    100% { transform: translateY(300%); }
  }
  .animate-scroll-bounce { animation: scrollBounce 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
</style>
