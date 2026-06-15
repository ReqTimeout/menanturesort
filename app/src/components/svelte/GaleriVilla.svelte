<script>
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-svelte';

  let { images = [], alt = 'Gallery' } = $props();

  let activeIndex = $state(0);
  let lightboxOpen = $state(false);

  function prev() {
    activeIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
  }
  function next() {
    activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
  }
  function openLightbox() {
    lightboxOpen = true;
  }
  function closeLightbox() {
    lightboxOpen = false;
  }

  function handleKeydown(e) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Gallery -->
<div class="space-y-3">
  <!-- Main image -->
  <div class="relative aspect-[16/10] overflow-hidden bg-cream-100 group">
    {#each images as img, i}
      {#if i === activeIndex}
        <motion.img
          key={img}
          src={img}
          alt="{alt} — {i + 1}"
          class="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      {/if}
    {/each}

    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-forest-700/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <!-- Nav arrows -->
    {#if images.length > 1}
      <button
        onclick={prev}
        class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-forest-700/60 backdrop-blur-sm text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-forest-700/80"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onclick={next}
        class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-forest-700/60 backdrop-blur-sm text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-forest-700/80"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    {/if}

    <!-- Expand button -->
    <button
      onclick={openLightbox}
      class="absolute top-3 right-3 w-9 h-9 bg-forest-700/60 backdrop-blur-sm text-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-forest-700/80"
      aria-label="Expand image"
    >
      <Expand size={16} />
    </button>

    <!-- Counter -->
    <div class="absolute bottom-3 right-3 px-3 py-1 bg-forest-700/60 backdrop-blur-sm text-cream-50 text-xs font-mono">
      {activeIndex + 1} / {images.length}
    </div>
  </div>

  <!-- Thumbnails -->
  {#if images.length > 1}
    <div class="flex gap-2">
      {#each images as img, i}
        <button
          onclick={() => (activeIndex = i)}
          class="relative flex-1 aspect-[16/10] overflow-hidden transition-all {activeIndex === i ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-white' : 'opacity-60 hover:opacity-100'}"
          aria-label={`Image ${i + 1}`}
        >
          <img src={img} alt="" class="w-full h-full object-cover" loading="lazy" />
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Lightbox -->
<AnimatePresence>
  {#if lightboxOpen}
    <motion.div
      class="fixed inset-0 z-[100] bg-forest-900/95 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <!-- Close -->
      <button
        onclick={closeLightbox}
        class="absolute top-4 right-4 w-10 h-10 text-cream-50/70 hover:text-cream-50 flex items-center justify-center transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <!-- Image -->
      {#each images as img, i}
        {#if i === activeIndex}
          <motion.img
            key={img}
            src={img}
            alt="{alt} — {i + 1}"
            class="max-w-[90vw] max-h-[85vh] object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        {/if}
      {/each}

      <!-- Nav -->
      {#if images.length > 1}
        <button
          onclick={prev}
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 text-cream-50/70 hover:text-cream-50 flex items-center justify-center transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onclick={next}
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-cream-50/70 hover:text-cream-50 flex items-center justify-center transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      {/if}

      <!-- Counter -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-forest-700/60 backdrop-blur-sm text-cream-50 text-sm font-mono">
        {activeIndex + 1} / {images.length}
      </div>
    </motion.div>
  {/if}
</AnimatePresence>
