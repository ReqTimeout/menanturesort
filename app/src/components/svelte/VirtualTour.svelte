<script>
  import { onMount } from 'svelte';
  import { Maximize, ChevronLeft, ChevronRight, MapPin, Info } from 'lucide-svelte';

  let { hotspots = [], images = [] } = $props();

  let activeImage = $state(0);
  let activeHotspot = $state(null);
  let isFullscreen = $state(false);
  let hasGyro = $state(false);
  let gyroX = $state(0);

  // Default fallback images
  const fallbackImages = [
    '/images/ref/villa-bijak-row.jpg',
    '/images/ref/villa-idaman-row.jpg',
    '/images/ref/villa-mapan-street.jpg',
    '/images/ref/villa-mapan-detail.jpg',
    '/images/ref/interior-living.jpg',
  ];
  const finalImages = $derived(images.length ? images : fallbackImages);

  onMount(() => {
    // Detect device orientation for parallax effect
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null) {
          hasGyro = true;
          gyroX = e.gamma / 5;
        }
      });
    }
  });

  function next() { activeImage = (activeImage + 1) % finalImages.length; activeHotspot = null; }
  function prev() { activeImage = (activeImage - 1 + finalImages.length) % finalImages.length; activeHotspot = null; }

  function toggleFullscreen() {
    const el = document.getElementById('vt-container');
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
      isFullscreen = true;
    } else {
      document.exitFullscreen();
      isFullscreen = false;
    }
  }
</script>

<section class="bg-forest-700 text-cream-50 relative overflow-hidden" data-section="virtual-tour">
  <div class="container-wide py-20 md:py-32">
    <div class="grid grid-cols-12 gap-8 mb-12">
      <div class="col-span-12 md:col-span-7">
        <div class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-4">— Virtual Tour · 360°</div>
        <h2 class="font-display text-cream-50 leading-[0.95] tracking-tight text-editorial-lg font-bold">
          Jelajahi kawasan<br/><em class="text-gold-500">sebelum Anda datang.</em>
        </h2>
      </div>
      <div class="col-span-12 md:col-span-5 flex items-end">
        <p class="font-body text-cream-50/70 leading-relaxed">
          Klik hotspot untuk info spesifik. Geser untuk pindah angle. Pengalaman mobile akan terasa lebih hidup dengan gyro parallax.
        </p>
      </div>
    </div>

    <div id="vt-container" class="relative aspect-[16/9] bg-forest-900 overflow-hidden border border-cream-50/10 group">
      {#each finalImages as img, i}
        <img
          src={img}
          alt="Virtual tour view {i + 1}"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
          class:opacity-100={activeImage === i}
          class:opacity-0={activeImage !== i}
          class:scale-110={hasGyro && activeImage === i}
          style={activeImage === i && hasGyro ? `transform: translate3d(${-gyroX * 8}px, 0, 0) scale(1.08);` : ''}
        />
      {/each}

      <!-- Hotspots -->
      {#each hotspots as h, i}
        {#if h.imageIndex === activeImage || h.imageIndex === undefined}
          <button
            onclick={() => (activeHotspot = activeHotspot === i ? null : i)}
            class="absolute group/hotspot z-10"
            style="left: {h.x}%; top: {h.y}%;"
            aria-label={h.label}
          >
            <span class="absolute inset-0 -m-2 rounded-full bg-gold-500/20 animate-ping"></span>
            <span class="relative block w-5 h-5 rounded-full bg-gold-500 border-2 border-cream-50 shadow-lg group-hover/hotspot:scale-125 transition-transform"></span>
            <span class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-cream-50 text-forest-700 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity">{h.label}</span>
          </button>
        {/if}
      {/each}

      <!-- Active hotspot popup -->
      {#if activeHotspot !== null}
        {@const h = hotspots[activeHotspot]}
        <div class="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md p-6 bg-cream-50 text-forest-700 z-20 shadow-2xl">
          <div class="flex items-start gap-3 mb-3">
            <Info size={18} class="text-gold-700 flex-shrink-0 mt-0.5" />
            <div>
              <div class="font-mono text-[10px] uppercase tracking-widest text-gold-700 mb-1">{h.tag}</div>
              <h3 class="font-display text-xl font-bold leading-tight">{h.label}</h3>
            </div>
          </div>
          <p class="font-body text-sm text-ink-500 leading-relaxed mb-4">{h.desc}</p>
          <button onclick={() => (activeHotspot = null)} class="font-mono text-[10px] uppercase tracking-widest text-forest-700 hover:text-gold-700 font-bold">Tutup ×</button>
        </div>
      {/if}

      <!-- Controls -->
      <div class="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span class="font-mono text-[10px] uppercase tracking-widest text-cream-50/60 bg-forest-900/60 backdrop-blur-sm px-3 py-1.5 border border-cream-50/10">
          {String(activeImage + 1).padStart(2, '0')} / {String(finalImages.length).padStart(2, '0')}
        </span>
        <button onclick={toggleFullscreen} class="w-9 h-9 bg-forest-900/60 backdrop-blur-sm border border-cream-50/10 text-cream-50 flex items-center justify-center hover:bg-forest-900/80 transition-colors" aria-label="Fullscreen">
          <Maximize size={14} />
        </button>
      </div>

      <button onclick={prev} class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-forest-900/60 backdrop-blur-sm border border-cream-50/10 text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-forest-900/80" aria-label="Previous">
        <ChevronLeft size={18} />
      </button>
      <button onclick={next} class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-forest-900/60 backdrop-blur-sm border border-cream-50/10 text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-forest-900/80" aria-label="Next">
        <ChevronRight size={18} />
      </button>

      <!-- Bottom thumbnail strip -->
      <div class="absolute bottom-4 left-4 z-10 flex gap-2 max-w-[60%] overflow-x-auto pb-1">
        {#each finalImages as img, i}
          <button
            onclick={() => { activeImage = i; activeHotspot = null; }}
            class="flex-shrink-0 w-16 h-10 overflow-hidden border-2 transition-all"
            class:border-gold-500={activeImage === i}
            class:border-cream-100={activeImage !== i}
            
            
          >
            <img src={img} alt="" class="w-full h-full object-cover" />
          </button>
        {/each}
      </div>

      <!-- Gyro hint -->
      {#if !hasGyro}
        <div class="absolute top-4 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-cream-50/60 bg-forest-900/60 backdrop-blur-sm px-3 py-1.5 border border-cream-50/10 flex items-center gap-2">
          <MapPin size={10} />
          Klik hotspot
        </div>
      {/if}
    </div>

    <p class="font-body text-sm text-cream-50/50 mt-6 italic text-center">
      Atau lebih baik lagi — lihat langsung di lokasi. <a href="/kontak" class="text-gold-500 hover:text-gold-300 font-semibold not-italic">Booking survei gratis →</a>
    </p>
  </div>
</section>
