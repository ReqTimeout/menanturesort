<script lang="ts">
  /**
   * GaleriInterior — embla-based image gallery (V5.2)
   *
   * Features:
   * - Embla carousel dengan drag, autoplay (optional), infinite
   * - Lightbox on click
   * - Thumbnail strip
   * - Image lazy loading
   *
   * Usage:
   *   <GaleriInterior images={[...]} villaName="Menantu Bijak" />
   */
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { onMount } from 'svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let {
    images = [],
    villaName = 'Villa',
    autoplay = false,
    autoplayDelay = 5000,
    class: className = '',
  } = $props();

  let emblaApi = $state<any>(null);
  let selectedIndex = $state(0);
  let scrollSnaps = $state<number[]>([]);
  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);

  function onInit(event: CustomEvent<any>) {
    emblaApi = event.detail;
    scrollSnaps = emblaApi.scrollSnapList();
    emblaApi.on('select', () => {
      selectedIndex = emblaApi.selectedScrollSnap();
    });
    if (autoplay) {
      const interval = setInterval(() => {
        if (emblaApi && !lightboxOpen) {
          emblaApi.scrollNext();
          if (emblaApi.selectedScrollSnap() === scrollSnaps.length - 1) {
            emblaApi.scrollTo(0);
          }
        }
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }

  function scrollPrev() { emblaApi?.scrollPrev(); }
  function scrollNext() { emblaApi?.scrollNext(); }
  function scrollTo(i: number) { emblaApi?.scrollTo(i); }

  function openLightbox(i: number) {
    lightboxIndex = i;
    lightboxOpen = true;
  }
  function closeLightbox() { lightboxOpen = false; }
  function lightboxPrev() { lightboxIndex = (lightboxIndex - 1 + images.length) % images.length; }
  function lightboxNext() { lightboxIndex = (lightboxIndex + 1) % images.length; }

  function onKeydown(e: KeyboardEvent) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div class={cn('relative', className)}>
  <!-- Main carousel -->
  <div
    class="overflow-hidden"
    use:emblaCarouselSvelte={{ options: { loop: true, align: 'start' }, onInit }}
  >
    <div class="flex gap-3">
      {#each images as img, i}
        <div class="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-0.375rem)] lg:flex-[0_0_calc(33.333%-0.5rem)]">
          <button
            type="button"
            onclick={() => openLightbox(i)}
            class="relative w-full aspect-[4/3] overflow-hidden bg-forest-50 group/img cursor-zoom-in"
            aria-label={`Lihat foto ${i + 1} dari ${villaName}`}
          >
            <img
              src={img}
              alt={`Interior ${villaName} ${i + 1}`}
              loading={i < 3 ? 'eager' : 'lazy'}
              class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
            <div class="absolute inset-0 bg-forest-900/0 group-hover/img:bg-forest-900/20 transition-colors flex items-center justify-center">
              <Expand class="w-6 h-6 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
            </div>
            <span class="absolute bottom-2 right-2 px-2 py-1 bg-forest-900/70 text-cream-50 text-xs font-mono">
              {i + 1}/{images.length}
            </span>
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Nav arrows -->
  {#if images.length > 1}
    <button
      type="button"
      onclick={scrollPrev}
      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-forest-900/70 hover:bg-forest-900 text-cream-50 flex items-center justify-center transition-colors"
      aria-label="Foto sebelumnya"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button
      type="button"
      onclick={scrollNext}
      class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-forest-900/70 hover:bg-forest-900 text-cream-50 flex items-center justify-center transition-colors"
      aria-label="Foto berikutnya"
    >
      <ChevronRight class="w-5 h-5" />
    </button>
  {/if}

  <!-- Dots -->
  {#if scrollSnaps.length > 1}
    <div class="flex justify-center gap-2 mt-4">
      {#each scrollSnaps as _, i}
        <button
          type="button"
          onclick={() => scrollTo(i)}
          class={`h-1.5 transition-all ${i === selectedIndex ? 'w-8 bg-gold-500' : 'w-1.5 bg-forest-700/30'}`}
          aria-label={`Slide ${i + 1}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<!-- Lightbox -->
{#if lightboxOpen}
  <div
    class="fixed inset-0 z-[100] bg-forest-900/95 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label={`Galeri foto ${villaName}`}
  >
    <button
      type="button"
      onclick={closeLightbox}
      class="absolute top-4 right-4 w-10 h-10 bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 flex items-center justify-center transition-colors"
      aria-label="Tutup galeri"
    >
      <X class="w-5 h-5" />
    </button>
    <button
      type="button"
      onclick={lightboxPrev}
      class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 flex items-center justify-center transition-colors"
      aria-label="Foto sebelumnya"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <button
      type="button"
      onclick={lightboxNext}
      class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 flex items-center justify-center transition-colors"
      aria-label="Foto berikutnya"
    >
      <ChevronRight class="w-6 h-6" />
    </button>
    <img
      src={images[lightboxIndex]}
      alt={`Interior ${villaName} ${lightboxIndex + 1}`}
      class="max-w-full max-h-[85vh] object-contain"
    />
    <span class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-cream-50/10 text-cream-50 text-sm font-mono">
      {lightboxIndex + 1} / {images.length}
    </span>
  </div>
{/if}
