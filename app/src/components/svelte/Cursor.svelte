<script>
  import { onMount } from 'svelte';

  let cx = $state(-100);
  let cy = $state(-100);
  let rx = $state(-100);
  let ry = $state(-100);
  let visible = $state(false);
  let hovering = $state(false);
  let label = $state('');

  onMount(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMove = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      visible = true;

      const t = e.target.closest('[data-cursor]');
      if (t) {
        hovering = true;
        label = t.dataset.cursor;
      } else {
        hovering = false;
        label = '';
      }
    };
    const onLeave = () => { visible = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    let raf;
    const tick = () => {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  });
</script>

<div class="cursor-dot" class:visible class:hovering style="transform: translate3d({cx}px, {cy}px, 0) translate(-50%, -50%);"></div>
<div class="cursor-ring" class:visible class:hovering style="transform: translate3d({rx}px, {ry}px, 0) translate(-50%, -50%);">
  {#if label}<span class="cursor-label">{label}</span>{/if}
</div>