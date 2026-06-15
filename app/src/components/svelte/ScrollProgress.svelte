<script>
  /**
   * ScrollProgress.svelte — Gold progress bar fixed top
   * Memberi feedback visual ke user tentang posisi scroll mereka.
   * WOW factor: terlihat classy, meningkatkan perceived quality.
   */
  import { onMount } from 'svelte';

  let scrollPct = $state(0);

  onMount(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const pct = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
      scrollPct = Math.min(100, Math.max(0, pct));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<div
  class="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
  aria-hidden="true"
>
  <div
    class="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 transition-[width] duration-100 ease-out shadow-[0_0_8px_rgba(212,165,116,0.4)]"
    style={`width: ${scrollPct}%;`}
  ></div>
</div>
