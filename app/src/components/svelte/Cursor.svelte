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

<style>
  .cursor-dot, .cursor-ring {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    mix-blend-mode: difference;
  }
  .cursor-dot {
    width: 8px; height: 8px;
    background: #D4A574;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s, width 0.3s, height 0.3s;
  }
  .cursor-ring {
    width: 44px; height: 44px;
    border: 1px solid rgba(212, 165, 116, 0.5);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s, width 0.3s, height 0.3s, border-color 0.3s;
  }
  .visible { opacity: 1; }
  .hovering.cursor-dot { width: 12px; height: 12px; }
  .hovering.cursor-ring {
    width: 80px; height: 80px;
    border-color: #D4A574;
  }
  .cursor-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #D4A574;
  }

  @media (pointer: coarse) {
    .cursor-dot, .cursor-ring { display: none; }
  }
</style>
