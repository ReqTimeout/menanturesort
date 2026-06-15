<script lang="ts">
  /**
   * Panorama360 — 360° equirectangular panorama viewer (V5.2)
   *
   * Strategy: CDN-based (sesuai V5.1 final decision) — hemat bundle
   * Library: @photo-sphere-viewer/core v5.x + autorotate-plugin via jsdelivr
   *
   * Features:
   * - Dynamic import (CDN via importmap, lazy)
   * - Loading state dengan gold spinner
   * - prefers-reduced-motion: tampil poster statis (no autorotate)
   * - Caption glassmorphism overlay
   * - Hint "Drag untuk melihat" (auto-hide 4 detik)
   * - "Lihat Fullscreen" → buka /360/index.html di new tab
   * - A11y: alt text, keyboard arrow support (built-in PSV)
   * - Aspect ratio configurable
   *
   * Usage:
   *   <Panorama360 />
   *   <Panorama360 src="/360/custom-pano.jpg" caption="..." height="60vh" />
   */
  import { onMount, onDestroy } from 'svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import { Maximize, Loader2, Move3D } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let {
    src = '/360/panorama-main.jpg',
    poster = '/360/panorama-poster.jpg',
    caption = 'Eksplor 360° kawasan Menantu Resort',
    height = '60vh',
    autostart = true,
    autostartDelay = 8000,
    showCaption = true,
    showFullscreenButton = true,
    showHint = true,
    class: className = '',
  } = $props();

  let containerEl = $state<HTMLDivElement | null>(null);
  let viewer = $state<any>(null);
  let loaded = $state(false);
  let error = $state<string | null>(null);
  let hintVisible = $state(true);
  let reducedMotion = $state(false);
  let hintTimer: ReturnType<typeof setTimeout> | null = null;

  // Fullscreen URL — gunakan standalone page yang ada
  const fullscreenUrl = '/360/index.html';

  onMount(() => {
    if (typeof window === 'undefined') return;

    // Detect reduced motion
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hide hint after 4s
    if (showHint) {
      hintTimer = setTimeout(() => { hintVisible = false; }, 4000);
    }

    // Load PSV dynamically
    loadViewer();
  });

  onDestroy(() => {
    if (hintTimer) clearTimeout(hintTimer);
    if (viewer?.destroy) {
      try { viewer.destroy(); } catch (e) { /* noop */ }
    }
  });

  async function loadViewer() {
    try {
      // Inject CSS first
      if (!document.querySelector('link[data-psv-css]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5.8.3/index.min.css';
        link.setAttribute('data-psv-css', 'true');
        document.head.appendChild(link);
      }

      // Inject importmap
      if (!document.querySelector('script[data-psv-importmap]')) {
        const importMap = document.createElement('script');
        importMap.type = 'importmap';
        importMap.setAttribute('data-psv-importmap', 'true');
        importMap.textContent = JSON.stringify({
          imports: {
            three: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
            '@photo-sphere-viewer/core': 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5.8.3/index.module.js',
          },
        });
        document.head.appendChild(importMap);
      }

      // Wait a tick for importmap to register
      await new Promise((r) => setTimeout(r, 50));

      // Dynamic import
      const { Viewer } = await import(
        /* @vite-ignore */
        'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5.8.3/index.module.js'
      );
      const { AutorotatePlugin } = await import(
        /* @vite-ignore */
        'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/autorotate-plugin@5.8.3/index.module.min.js'
      );

      if (!containerEl) return;

      const config: any = {
        container: containerEl,
        panorama: src,
        caption: showCaption ? caption : undefined,
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
        loadingTxt: 'Memuat panorama...',
        defaultZoomLvl: 30,
        navbar: ['zoom', 'move', 'fullscreen'],
      };

      if (autostart && !reducedMotion) {
        config.plugins = [
          [AutorotatePlugin, {
            autostartDelay,
            autorotatePitch: '-5deg',
          }],
        ];
      }

      viewer = new Viewer(config);
      loaded = true;
    } catch (err) {
      console.error('[Panorama360] Failed to load:', err);
      error = 'Gagal memuat panorama. Silakan refresh halaman.';
    }
  }

  function openFullscreen() {
    window.open(fullscreenUrl, '_blank', 'noopener,noreferrer');
  }
</script>

<div
  class={cn('relative w-full bg-forest-900 overflow-hidden group/panorama', className)}
  style={`height: ${height};`}
  role="region"
  aria-label={caption}
>
  <!-- Container PSV -->
  <div
    bind:this={containerEl}
    class="absolute inset-0"
  ></div>

  <!-- Poster fallback (selalu dirender, jadi langsung kelihatan) -->
  {#if !loaded && !error}
    <img
      src={poster}
      alt={caption}
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      class:opacity-0={loaded}
      loading="eager"
      decoding="async"
    />
  {/if}

  <!-- Loading state -->
  {#if !loaded && !error}
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forest-900/50 pointer-events-none">
      <Loader2 class="w-8 h-8 text-gold-500 animate-spin" />
      <span class="text-xs uppercase tracking-widest text-cream-50/70 font-mono">Memuat panorama 360°</span>
    </div>
  {/if}

  <!-- Error state -->
  {#if error}
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forest-900/80 p-4 text-center">
      <span class="text-danger-300 text-sm font-semibold">{error}</span>
      <button
        type="button"
        onclick={openFullscreen}
        class="btn btn-secondary btn-sm"
      >
        Buka di tab baru
      </button>
    </div>
  {/if}

  <!-- Hint overlay (auto-hide) -->
  {#if loaded && showHint && hintVisible}
    <motion.div
      class="absolute top-4 left-1/2 -translate-x-1/2 glass-dark px-4 py-2 flex items-center gap-2 text-xs text-cream-50 pointer-events-none z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Move3D class="w-3.5 h-3.5 text-gold-500" />
      <span>Drag untuk melihat sekeliling</span>
    </motion.div>
  {/if}

  <!-- Caption overlay (bottom-left, glass) -->
  {#if showCaption && loaded}
    <div class="absolute bottom-4 left-4 glass-dark px-3 py-2 text-xs text-cream-50/90 max-w-[260px] z-10 pointer-events-none">
      <span class="font-mono uppercase tracking-widest text-[10px] text-gold-500 block mb-0.5">360° View</span>
      <span class="block leading-tight">{caption}</span>
    </div>
  {/if}

  <!-- Fullscreen button (bottom-right) -->
  {#if showFullscreenButton && loaded}
    <button
      type="button"
      onclick={openFullscreen}
      class="absolute bottom-4 right-4 z-10 w-10 h-10 glass-dark hover:bg-forest-700/80 text-cream-50 flex items-center justify-center transition-colors"
      aria-label="Buka panorama fullscreen di tab baru"
      title="Fullscreen"
    >
      <Maximize class="w-4 h-4" />
    </button>
  {/if}

  <!-- Reduced motion badge (jika applicable) -->
  {#if loaded && reducedMotion}
    <div class="absolute top-4 right-4 z-10 px-2 py-1 bg-forest-900/70 text-cream-50/70 text-[10px] font-mono uppercase tracking-widest">
      Auto-rotate off
    </div>
  {/if}
</div>
