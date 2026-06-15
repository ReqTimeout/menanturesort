<script>
  /**
   * CountUp — animated number counter (Svelte 5 native)
   * No external motion library — uses requestAnimationFrame directly.
   * Triggers on viewport intersection (once).
   */
  import { onMount } from 'svelte';

  let {
    end = 0,
    start = 0,
    duration = 2,
    decimals = 0,
    prefix = '',
    suffix = '',
    separator = '',
    class: className = '',
    triggerOnce = true,
  } = $props();

  let containerRef = $state(null);
  let value = $state(start);
  let started = $state(false);

  function format(n) {
    const fixed = Number(n).toFixed(decimals);
    if (separator) {
      const [int, dec] = fixed.split('.');
      const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return dec ? `${withSep}.${dec}` : withSep;
    }
    return fixed;
  }

  let display = $derived(prefix + format(value) + suffix);

  onMount(() => {
    if (!containerRef) return;
    if (typeof IntersectionObserver === 'undefined') {
      // No IO support — start immediately
      animateTo(end);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            animateTo(end);
            if (triggerOnce) io.disconnect();
          }
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(containerRef);
    return () => io.disconnect();
  });

  function animateTo(target) {
    const t0 = performance.now();
    const dur = Math.max(0.2, duration * 1000);
    function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      // ease-out cubic
      const e = 1 - Math.pow(1 - p, 3);
      value = start + (target - start) * e;
      if (p < 1) requestAnimationFrame(step);
      else value = target;
    }
    requestAnimationFrame(step);
  }
</script>

<span bind:this={containerRef} class="inline-block tabular-nums {className}">
  {display}
</span>
