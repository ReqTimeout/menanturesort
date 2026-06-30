<script>
  /**
   * SmoothScroll.svelte — Lenis-powered buttery smooth scroll + GSAP sync
   *
   * Changelog 30 Jun 2026:
   * - FIX: Removed separate RAF loop for Lenis (was causing jitter / choppy scroll
   *   because Lenis and GSAP's ticker were running on independent RAFs and
   *   both reading/writing scroll position).
   * - Lenis now runs INSIDE gsap.ticker (synchronized with ScrollTrigger).
   * - This is the Lenis-recommended pattern:
   *   https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
   */
  import { onMount } from 'svelte';
  import { browser } from '../../lib/browser';

  onMount(async () => {
    if (!browser) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      // 1. Initialize Lenis
      const LenisMod = await import('lenis');
      const Lenis = LenisMod.default;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      // 2. Load GSAP + ScrollTrigger (shared singleton with ScrollEffects.svelte)
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // 3. CRITICAL FIX: Sync Lenis to GSAP ticker
      //    - gsap.ticker is GSAP's RAF loop
      //    - Lenis.raf(time) interpolates scroll position
      //    - lenis.on('scroll', ScrollTrigger.update) makes ScrollTrigger reactive
      //    - lagSmoothing(0) prevents GSAP from auto-pausing when frame drops
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);

      // 4. Anchor link smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (!href || href === '#' || href.length < 2) return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80, duration: 1.4 });
          }
        });
      });

      // 5. Fallback: IntersectionObserver for .reveal CSS class
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseFloat(el.dataset.revealDelay || '0') * 1000;
                setTimeout(() => {
                  el.classList.add('is-revealed');
                }, delay);
                io.unobserve(el);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        const observe = () => {
          document.querySelectorAll('.reveal:not(.is-revealed)').forEach((el) => io.observe(el));
        };
        observe();
        const mo = new MutationObserver(observe);
        mo.observe(document.body, { childList: true, subtree: true });
      }

      return () => {
        if (lenis) lenis.destroy();
      };
    } catch (err) {
      console.warn('[SmoothScroll] init failed, using native scroll:', err);
    }
  });
</script>
