<script>
  import { onMount } from 'svelte';

  let scrollY = $state(0);
  let windowH = $state(800); // default fallback
  let imageEl;

  onMount(() => {
    windowH = window.innerHeight;
    const handleScroll = () => { scrollY = window.scrollY; };
    const handleResize = () => { windowH = window.innerHeight; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  let parallaxY = $derived(scrollY * 0.4);
  let opacity = $derived(Math.max(0.3, 1 - scrollY / (windowH * 0.8)));
  let scale = $derived(1 + scrollY * 0.0002);
</script>

<div class="hero-parallax">
  <div
    class="hero-bg"
    style="transform: translate3d(0, {parallaxY}px, 0) scale({scale}); opacity: {opacity};"
  >
    <picture>
      <source
        type="image/webp"
        srcset="/images/hero/hero-aerial-800.webp 800w,
                /images/hero/hero-aerial-1280.webp 1280w,
                /images/hero/hero-aerial-1920.webp 1920w"
        sizes="100vw"
      />
      <img
        bind:this={imageEl}
        src="/images/hero/hero-aerial-1920.jpg"
        alt="Menantu Resort aerial view - kawasan resort di Bandung Timur"
        loading="eager"
        fetchpriority="high"
      />
    </picture>
  </div>

  <div class="hero-vignette"></div>
  <div class="hero-grain"></div>
</div>

<style>
  .hero-parallax {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .hero-bg {
    position: absolute;
    inset: -10% 0;
    will-change: transform, opacity;
    transition: transform 0.05s linear;
  }
  .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
  }
  .hero-vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(13, 27, 20, 0.4) 100%),
      linear-gradient(180deg, rgba(13, 27, 20, 0.6) 0%, rgba(13, 27, 20, 0.3) 40%, rgba(13, 27, 20, 0.85) 100%);
  }
  .hero-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
    opacity: 0.06;
    mix-blend-mode: overlay;
  }
</style>
