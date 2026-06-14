<script>
  import { onMount } from 'svelte';
  import { ArrowRight, Bed, Maximize, Layers, Banknote, Check } from 'lucide-svelte';
  import { waUrl } from '../../lib/utils';
  import siteData from '../../data/site.json';

  let { villa, image, index = 0, featured = false } = $props();

  let cardEl;
  let tiltX = $state(0);
  let tiltY = $state(0);
  let glowX = $state(50);
  let glowY = $state(50);

  function onMove(e) {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    tiltY = (x - 0.5) * -8;
    tiltX = (y - 0.5) * 8;
    glowX = x * 100;
    glowY = y * 100;
  }
  function onLeave() {
    tiltX = 0; tiltY = 0;
  }

  const waLink = waUrl(siteData.contact.whatsapp, `Halo, saya tertarik dengan villa ${villa.name}.`, `villa_card_${villa.id}`);
</script>

<article
  bind:this={cardEl}
  onmousemove={onMove}
  onmouseleave={onLeave}
  class="group relative bg-white border border-cream-100 overflow-hidden transition-all duration-500 ease-out hover:border-gold-300 hover:shadow-2xl"
  class:md:col-span-2={featured}
  style="transform: perspective(1200px) rotateX({tiltX}deg) rotateY({tiltY}deg); transform-style: preserve-3d; transition-property: transform, box-shadow, border-color;"
>
  <!-- Spotlight -->
  <div
    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
    style="background: radial-gradient(circle 320px at {glowX}% {glowY}%, rgba(212, 165, 116, 0.12) 0%, transparent 60%);"
  ></div>

  <!-- Image -->
  <div class="relative aspect-[4/3] overflow-hidden" >
    <img
      src={image}
      alt={`Villa ${villa.name} — ${villa.tagline}`}
      class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-forest-700/60 via-transparent to-transparent"></div>
    <!-- Top tags -->
    <div class="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest-700/85 text-cream-50 text-xs font-body font-semibold tracking-wide backdrop-blur-sm">
        <span class="h-1.5 w-1.5 rounded-full bg-gold-500"></span>
        {villa.tag}
      </span>
      <span class="px-3 py-1.5 bg-gold-500 text-forest-700 text-xs font-body font-bold tracking-wide">
        {villa.priceLabel}
      </span>
    </div>
    <!-- Bottom: name -->
    <div class="absolute bottom-0 left-0 right-0 p-6">
      <div class="text-gold-500 text-xs uppercase tracking-widest font-body font-semibold mb-1">{villa.architecture}</div>
      <h3 class="font-display text-cream-50 text-3xl md:text-4xl font-bold leading-none" style="transform: translateZ(40px);">
        {villa.name}
      </h3>
    </div>
  </div>

  <!-- Body -->
  <div class="p-6 md:p-8" style="transform: translateZ(20px);">
    <p class="font-body text-ink-500 leading-relaxed mb-6 italic font-quote text-lg">
      "{villa.tagline}"
    </p>

    <!-- Specs grid -->
    <div class="grid grid-cols-3 gap-4 pb-6 mb-6 border-b border-cream-100">
      <div class="flex flex-col items-start">
        <Maximize size={16} class="text-gold-500 mb-1" />
        <div class="font-display text-lg text-forest-700 font-bold leading-tight">{villa?.specs?.land ?? ""}</div>
        <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider">Lahan</div>
      </div>
      <div class="flex flex-col items-start">
        <Layers size={16} class="text-gold-500 mb-1" />
        <div class="font-display text-lg text-forest-700 font-bold leading-tight">{villa?.specs?.building ?? ""}</div>
        <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider">Bangunan</div>
      </div>
      <div class="flex flex-col items-start">
        <Bed size={16} class="text-gold-500 mb-1" />
        <div class="font-display text-lg text-forest-700 font-bold leading-tight">{villa?.specs?.bedrooms ?? ""}</div>
        <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider">Kamar</div>
      </div>
    </div>

    <!-- Features -->
    <ul class="space-y-2 mb-6">
      {#each villa.features.slice(0, 3) as f}
        <li class="flex items-start gap-2 font-body text-sm text-forest-700">
          <Check size={14} class="text-gold-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <span>{f}</span>
        </li>
      {/each}
    </ul>

    <!-- Footer CTAs -->
    <div class="flex items-center justify-between pt-2">
      <a href={`/villa/${villa.id}`} class="group/link inline-flex items-center gap-2 font-body font-semibold text-forest-700 text-sm tracking-wide hover:text-gold-700 transition-colors">
        Detail Villa
        <ArrowRight size={16} class="transition-transform group-hover/link:translate-x-1" />
      </a>
      <a href={waLink} target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-whatsapp text-sm font-body font-semibold hover:underline">
        Tanya via WA
      </a>
    </div>
  </div>

  <!-- Gold accent line top -->
  <span class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
</article>
