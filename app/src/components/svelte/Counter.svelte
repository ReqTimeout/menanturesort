<script>
  import { onMount } from 'svelte';

  let { target = 0, suffix = '', prefix = '', duration = 2000, decimals = 0 } = $props();

  let current = $state(0);
  let element;
  let hasAnimated = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animate();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (element) observer.observe(element);
    return () => observer.disconnect();
  });

  function animate() {
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = target * eased;
      if (progress < 1) requestAnimationFrame(tick);
      else current = target;
    };
    requestAnimationFrame(tick);
  }

  let display = $derived(
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString('id-ID')
  );
</script>

<span bind:this={element} class="counter">
  {prefix}{display}{suffix}
</span>

<style>
  .counter {
    display: inline-block;
    font-variant-numeric: tabular-nums;
  }
</style>
