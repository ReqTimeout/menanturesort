<script>
  import { onMount } from 'svelte';
  import { ArrowRight, MessageCircle, Shield, Award, Sparkles, Eye } from 'lucide-svelte';
  import { waUrl } from '../../lib/utils';
  import siteData from '../../data/site.json';

  let scrollY = $state(0);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let mounted = $state(false);
  let liveViewers = $state(siteData.stats.activeViewers);
  let heroEl;

  const waLink = waUrl(siteData.contact.whatsapp, 'Halo, saya tertarik dengan Menantu Resort.', 'hero_cta');

  onMount(() => {
    mounted = true;
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e) => {
      const rect = heroEl?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);

    // Live viewers fluctuation
    const id = setInterval(() => {
      liveViewers = Math.max(3, siteData.stats.activeViewers + Math.floor(Math.random() * 9) - 4);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      clearInterval(id);
    };
  });

  let bgY = $derived(scrollY * 0.5);
  let bgScale = $derived(1 + scrollY * 0.0003);
  let textY = $derived(scrollY * -0.15);
  let textOpacity = $derived(Math.max(0, 1 - scrollY / 600));
  let parallaxX = $derived(mouseX);
  let parallaxY = $derived(mouseY);
</script>

<section bind:this={heroEl} class="relative min-h-screen flex items-center overflow-hidden bg-forest-700">
  <!-- Parallax background image -->
  <div class="absolute inset-0 z-0 will-change-transform" style="transform: translate3d({parallaxX}px, {parallaxY + bgY}px, 0) scale({bgScale});">
    <img
      src="/images/ref/villa-bijak-row.jpg"
      alt="Menantu Resort — kawasan villa premium Bandung Timur"
      class="w-full h-full object-cover"
      loading="eager"
      fetchpriority="high"
    />
  </div>

  <!-- Layered gradients -->
  <div class="absolute inset-0 z-[1]" style="background: linear-gradient(105deg, rgba(13,27,20,0.92) 0%, rgba(13,27,20,0.78) 35%, rgba(13,27,20,0.45) 65%, rgba(13,27,20,0.25) 100%);"></div>
  <div class="absolute inset-0 z-[1]" style="background: linear-gradient(180deg, transparent 0%, transparent 50%, rgba(13,27,20,0.65) 100%);"></div>
  <div class="absolute inset-0 z-[1] mix-blend-overlay opacity-[0.07]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;);"></div>

  <!-- Content -->
  <div class="relative z-10 container-wide w-full pt-32 pb-20 md:pt-40 md:pb-32" style="transform: translateY({textY}px); opacity: {textOpacity};">
    <div class="max-w-4xl">
      <!-- Live viewers pill -->
      <div class="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-cream-50 text-xs font-mono transition-all duration-700" class:opacity-0={!mounted} class:translate-y-2={!mounted} class:opacity-100={mounted} class:translate-y-0={mounted} style="transition-delay: 0.1s">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
        </span>
        <Eye size={12} class="text-gold-500" />
        <span><span class="font-semibold text-gold-500">{liveViewers}</span> orang sedang melihat villa ini</span>
      </div>

      <h1 class="font-display text-cream-50 mb-8 text-balance leading-[0.95] tracking-tight" style="font-size: clamp(2.75rem, 6.5vw, 5.5rem); font-weight: 700;">
        <span class="block overflow-hidden">
          <span class="inline-block transition-transform duration-1000 ease-out" class:translate-y-0={mounted} class:translate-y-full={!mounted} style="transition-delay: 0.2s">Masa Depan</span>
        </span>
        <span class="block overflow-hidden">
          <span class="inline-block transition-transform duration-1000 ease-out" class:translate-y-0={mounted} class:translate-y-full={!mounted} style="transition-delay: 0.35s">Lebih <em class="text-gold-500 font-medium" style="font-style: italic;">Mapan.</em></span>
        </span>
        <span class="block overflow-hidden mt-3">
          <span class="inline-block text-gold-500 font-display italic font-medium transition-transform duration-1000 ease-out text-[0.55em]" class:translate-y-0={mounted} class:translate-y-full={!mounted} style="transition-delay: 0.5s">Setiap Bulan dari Villa Resort Mewah.</span>
        </span>
      </h1>

      <p class="font-body text-lg md:text-xl text-cream-50/85 leading-relaxed max-w-2xl mb-10 transition-all duration-1000" class:opacity-0={!mounted} class:translate-y-4={!mounted} class:opacity-100={mounted} class:translate-y-0={mounted} style="transition-delay: 0.6s">
        Aset warisan produktif berlegalitas sertifikat <span class="text-gold-500 font-semibold">SHM Bersih</span> di Cicalengka, Bandung Timur.
        Dikelola harian oleh manajemen <span class="text-gold-500 font-semibold">Sahid Hotels & Resorts</span> (50+ tahun).
        Cicilan mulai <span class="text-gold-500 font-semibold">Rp 9 juta/bulan</span>, passive income <span class="text-gold-500 font-semibold">Rp 9-15 juta/bulan</span>.
      </p>

      <div class="flex flex-wrap gap-4 mb-14 transition-all duration-1000" class:opacity-0={!mounted} class:translate-y-4={!mounted} class:opacity-100={mounted} class:translate-y-0={mounted} style="transition-delay: 0.75s">
        <a href="#villa-types" class="group relative inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-forest-700 font-body font-semibold text-base tracking-wide overflow-hidden transition-all duration-300 hover:bg-gold-300">
          <span class="absolute inset-0 bg-gradient-to-r from-gold-300 to-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          <span class="relative">Lihat Skema Investasi</span>
          <ArrowRight size={18} strokeWidth="2.5" class="relative transition-transform group-hover:translate-x-1" />
        </a>
        <a href={waLink} target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-8 py-4 border-2 border-cream-50/40 text-cream-50 font-body font-semibold text-base tracking-wide backdrop-blur-sm transition-all duration-300 hover:border-cream-50 hover:bg-cream-50/10">
          <MessageCircle size={18} />
          Chat WhatsApp
        </a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000" class:opacity-0={!mounted} class:translate-y-4={!mounted} class:opacity-100={mounted} class:translate-y-0={mounted} style="transition-delay: 0.9s">
        {#each [
          { icon: Shield, label: 'SHM Bersih' },
          { icon: Award, label: 'Sahid 50+ Th' },
          { icon: Sparkles, label: 'ROI 10% Guarantee' },
          { icon: Eye, label: '74 Unit, Sisa 16' },
        ] as item}
          <div class="flex items-center gap-3 px-4 py-3 bg-white/[0.06] backdrop-blur-sm border border-white/10">
            <item.icon size={18} class="text-gold-500 flex-shrink-0" />
            <span class="font-body text-sm text-cream-50/90 font-medium">{item.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream-50/60 text-xs uppercase tracking-widest font-body pointer-events-none">
    <span>Scroll untuk jelajahi</span>
    <div class="relative h-12 w-px overflow-hidden bg-cream-50/20">
      <div class="absolute inset-0 bg-gold-500 animate-scroll-down"></div>
    </div>
  </div>
</section>

<style>
  @keyframes scrollDown {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .animate-scroll-down { animation: scrollDown 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
</style>
