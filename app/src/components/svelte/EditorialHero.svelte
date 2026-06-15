<script>
  /**
   * EditorialHero.svelte — V6 hero (text-clip safe, dual-viewport)
   *
   * Layout strategy:
   * - Desktop (≥ sm): h-screen single-screen with content overlay
   * - Mobile (< sm): auto-height, no clipping, clean type scale
   *
   * Text clipping fixes (V6):
   * - font-size: clamp() with safe min 2rem (32px) on mobile
   * - max-w-[18ch] on h1 prevents extreme line widths
   * - content z-20 + trust bar z-[5] ensures no overlap
   * - eyebrow positioned above h1 with proper spacing
   *
   * Animations:
   * - GSAP-style staggered entrance via @humanspeak/svelte-motion
   * - Parallax background (transform-only, GPU)
   * - Counter animation ease-out cubic
   * - Lenis-driven (component is observer on smooth scroll)
   */
  import { onMount } from 'svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import { waUrl } from '@lib/utils';
  import { ArrowRight, Eye } from 'lucide-svelte';
  import siteData from '@data/site.json';

  let {
    title,
    accent,
    body,
    cta = 'Lihat Skema Investasi',
    eyebrow = 'Investasi Villa Bandung · SHM · Dikelola Sahid',
    badge,
  } = $props();

  // Parallax state
  let scrollY = $state(0);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let viewers = $state(siteData.stats.activeViewers || 8);

  // Counter animation state
  let statCicilan = $state(0);
  let statRoi = $state(0);
  let statSold = $state(0);

  onMount(() => {
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 24;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 16;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

    // Live viewers fluctuation
    const id = setInterval(() => {
      viewers = Math.max(3, (siteData.stats.activeViewers || 8) + Math.floor(Math.random() * 9) - 4);
    }, 4500);

    // Counter ease-out cubic
    const start = performance.now();
    const dur = 1400;
    const targets = { cicilan: 9, roi: 10, sold: 58 };
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      statCicilan = Math.round(targets.cicilan * e);
      statRoi = Math.round(targets.roi * e);
      statSold = Math.round(targets.sold * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      clearInterval(id);
    };
  });

  const waLink = waUrl(
    siteData.contact.whatsapp,
    'Halo, saya tertarik dengan Menantu Resort.',
    'editorial_hero'
  );

  let bgY = $derived(scrollY * 0.45);
  let textOp = $derived(Math.max(0, 1 - scrollY / 600));
</script>

<!-- HERO SECTION
  - Mobile (< sm): auto-height, pt-24 (clears nav), pb-32 (clears form/stats)
  - Desktop (≥ sm): h-screen, items-end, content pinned bottom
  - z-20 content > z-[5] trust bar > z-0 image -->
<section
  class="hero-editorial relative flex items-end overflow-hidden bg-forest-700
         min-h-[680px] sm:min-h-[640px] sm:h-screen
         pt-28 pb-36 sm:pt-0 sm:pb-0"
>
  <!-- Parallax BG (GPU only, transform) -->
  <div
    class="absolute inset-0 z-0 will-change-transform"
    style="transform: translate3d({mouseX}px, {mouseY + bgY}px, 0) scale(1.06);"
  >
    <img
      src="/images/ref/villa-mapan-detail.jpg"
      alt="Menantu Resort — Villa Resort Premium Bandung Timur dengan arsitektur Limasan modern"
      class="w-full h-full object-cover"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
  </div>

  <!-- Animated premium gradient (subtle, GPU only) -->
  <div
    class="absolute inset-0 z-[1] animate-hero-gradient pointer-events-none"
    style="background: linear-gradient(135deg,
      rgba(27, 67, 50, 0.20) 0%,
      rgba(212, 165, 116, 0.12) 35%,
      rgba(13, 27, 20, 0.30) 70%,
      rgba(27, 67, 50, 0.18) 100%);"
  ></div>

  <!-- Layered overlays (gradient + grain) -->
  <div
    class="absolute inset-0 z-[1]"
    style="background: linear-gradient(180deg,
      rgba(13, 27, 20, 0.45) 0%,
      rgba(13, 27, 20, 0.15) 30%,
      rgba(13, 27, 20, 0.55) 70%,
      rgba(13, 27, 20, 0.95) 100%);"
  ></div>
  <div
    class="absolute inset-0 z-[1] opacity-[0.07] mix-blend-overlay"
    style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;);"
  ></div>

  <!-- Top eyebrow bar (above content) -->
  <div
    class="absolute top-24 sm:top-28 left-0 right-0 z-10 container-wide flex items-center justify-between
           text-cream-50/70 text-[10px] sm:text-xs font-mono uppercase tracking-widest pointer-events-none"
    style="opacity: {textOp};"
  >
    <motion.span
      class="flex items-center gap-3"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <span class="h-px w-12 bg-gold-500"></span>
      {eyebrow}
    </motion.span>
    {#if badge}
      <motion.span
        class="hidden md:inline-flex items-center gap-2 text-gold-500"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
        </span>
        {badge}
      </motion.span>
    {/if}
  </div>

  <!-- Main content (z-20, above trust bar) -->
  <div class="relative z-20 w-full pb-28 sm:pb-20 lg:pb-24" style="opacity: {textOp};">
    <div class="container-wide">
      <!-- H1: text-clip safe with clamp + max-w-[18ch] -->
      <h1
        class="font-display text-cream-50 font-bold mb-6 sm:mb-7 lg:mb-8
               leading-[1.08] sm:leading-[1.0] lg:leading-[0.95]
               tracking-[-0.02em] sm:tracking-[-0.025em] lg:tracking-[-0.03em]
               max-w-[20ch] sm:max-w-[18ch]
               text-[2.125rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]"
        style="font-weight: 700;"
      >
        <span class="block overflow-hidden">
          <motion.span
            class="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >{title}</motion.span>
        </span>
        <span class="block overflow-hidden">
          <motion.span
            class="inline-block italic text-gold-500 font-medium"
            style="font-size: 0.62em;"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >{accent}</motion.span>
        </span>
      </h1>

      <!-- 12-col grid: copy + stats (left) | form + CTAs (right) -->
      <div class="grid grid-cols-12 gap-6 sm:gap-8 items-end">
        <div class="col-span-12 md:col-span-6 lg:col-span-5">
          <motion.p
            class="font-body text-cream-50/85 leading-relaxed text-[15px] sm:text-base md:text-lg mb-5 sm:mb-6 max-w-[34ch] sm:max-w-[42ch] md:max-w-[48ch]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >{body}</motion.p>

          <!-- 3 hard-fact stat cards -->
          <motion.div
            class="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <div class="text-center p-2.5 sm:p-3 bg-cream-50/5 border border-cream-50/10 backdrop-blur-sm">
              <span class="font-display text-lg sm:text-xl md:text-2xl text-gold-500 font-bold leading-none block">{statCicilan} jt</span>
              <p class="text-[9px] sm:text-[10px] uppercase tracking-widest text-cream-50/60 mt-1">Cicilan/bln</p>
            </div>
            <div class="text-center p-2.5 sm:p-3 bg-cream-50/5 border border-cream-50/10 backdrop-blur-sm">
              <span class="font-display text-lg sm:text-xl md:text-2xl text-gold-500 font-bold leading-none block">{statRoi}%</span>
              <p class="text-[9px] sm:text-[10px] uppercase tracking-widest text-cream-50/60 mt-1">ROI 2 thn</p>
            </div>
            <div class="text-center p-2.5 sm:p-3 bg-cream-50/5 border border-cream-50/10 backdrop-blur-sm">
              <span class="font-display text-lg sm:text-xl md:text-2xl text-gold-500 font-bold leading-none block">{statSold}/74</span>
              <p class="text-[9px] sm:text-[10px] uppercase tracking-widest text-cream-50/60 mt-1">Terjual</p>
            </div>
          </motion.div>
        </div>

        <div class="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col md:items-end gap-5 sm:gap-6">
          <!-- Live indicator + micro-form (stacked on mobile, inline on desktop) -->
          <motion.div
            class="flex items-center gap-3 text-cream-50/70 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Eye size={14} class="text-gold-500" />
            <span><span class="text-gold-500 font-bold">{viewers}</span> sedang melihat</span>
          </motion.div>

          <!-- Micro-commitment form (full width on mobile) -->
          <motion.form
            class="flex flex-col sm:flex-row gap-2 w-full sm:max-w-md md:ml-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            onsubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const phone = (fd.get('phone')?.toString() || '').replace(/\D/g, '');
              if (phone.length >= 8) {
                const text = encodeURIComponent(
                  'Halo, saya ingin konsultasi Villa Menantu Resort. WhatsApp saya: ' + phone
                );
                window.open(`https://wa.me/${siteData.contact.whatsapp}?text=${text}`, '_blank');
              }
            }}
          >
            <input
              type="tel"
              name="phone"
              required
              placeholder="No. WhatsApp Anda"
              class="flex-1 px-4 py-3 bg-cream-50/10 border border-cream-50/20
                     text-cream-50 placeholder:text-cream-50/50 font-mono text-sm
                     focus:outline-none focus:border-gold-500 backdrop-blur-sm"
            />
            <button
              type="submit"
              class="px-5 py-3 bg-gold-500 text-forest-700 font-body font-bold text-sm
                     whitespace-nowrap hover:bg-gold-300 transition-colors"
            >
              Konsultasi WhatsApp
            </button>
          </motion.form>

          <!-- Dual CTA -->
          <motion.div
            class="flex flex-col sm:flex-row gap-3 w-full sm:max-w-md md:ml-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#villa-types"
              data-cursor="Scroll"
              class="group flex-1 inline-flex items-center justify-center gap-3 px-6 py-3.5
                     bg-gold-500 text-forest-700 font-body font-semibold text-sm tracking-wide
                     transition-all hover:bg-gold-300 hover:gap-4"
            >
              {cta}
              <ArrowRight size={16} strokeWidth="2.5" class="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              data-cursor="Konsultasi"
              class="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3.5
                     border border-cream-50/30 text-cream-50 font-body font-semibold text-sm tracking-wide
                     transition-all hover:border-cream-50 hover:bg-cream-50/5"
            >
              Konsultasi WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  </div>

  <!-- Trust bar — absolute inside hero, hidden on mobile (info carried by marquee) -->
  <motion.div
    class="hidden sm:block absolute bottom-0 left-0 right-0 z-[5] border-t border-cream-50/10 backdrop-blur-sm bg-forest-900/40"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 1.0 }}
    style="opacity: {textOp};"
  >
    <div class="container-wide py-2.5 sm:py-3 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-1.5
                text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-cream-50/50">
      <span class="flex items-center gap-2">
        <span class="h-1 w-1 rounded-full bg-gold-500"></span>
        Dikelola Sahid Hotels & Resorts
      </span>
      <span class="hidden sm:inline text-cream-50/20">|</span>
      <span class="flex items-center gap-2">
        <span class="h-1 w-1 rounded-full bg-gold-500"></span>
        SHM Bersih · 50+ Tahun Pengalaman
      </span>
      <span class="hidden sm:inline text-cream-50/20">|</span>
      <span class="flex items-center gap-2">
        <span class="h-1 w-1 rounded-full bg-gold-500"></span>
        Rekening Resmi: BNI · BCA · BSI
      </span>
    </div>
  </motion.div>
</section>
