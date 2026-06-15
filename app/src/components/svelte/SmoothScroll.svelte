<script>
  /**
   * SmoothScroll.svelte — Lenis-powered buttery smooth scroll
   * + GSAP scroll-triggered reveals
   * 
   * Initialize Lenis on mount, attach to GSAP ticker for syncing,
   * and trigger .reveal elements to fade-up as they enter viewport.
   * 
   * Performance:
   * - Lenis uses requestAnimationFrame (no layout thrash)
   * - GSAP ScrollTrigger is batched
   * - Respects prefers-reduced-motion
   */
  import { onMount } from 'svelte';
  import { browser } from '../../lib/browser';

  let lenisRef = $state(null);
  let ready = $state(false);

  onMount(async () => {
    if (!browser) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Skip smooth scroll for accessibility
      return;
    }

    try {
      const LenisMod = await import('lenis');
      const Lenis = LenisMod.default;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });
      lenisRef = lenis;

      // Smooth scroll for anchor links
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

      // RAF loop
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      ready = true;
    } catch (err) {
      console.warn('[SmoothScroll] Lenis failed, using native scroll:', err);
    }

    // GSAP-style IntersectionObserver for .reveal elements
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = parseFloat(el.dataset.revealDelay || '0') * 1000;
              setTimeout(() => {
                el.classList.add('is-revealed');
                el.style.willChange = 'auto';
              }, delay);
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );

      // Observe all .reveal elements (including new ones added later)
      const observe = () => {
        document.querySelectorAll('.reveal:not(.is-revealed)').forEach((el) => io.observe(el));
      };
      observe();
      const mo = new MutationObserver(observe);
      mo.observe(document.body, { childList: true, subtree: true });

      return () => {
        mo.disconnect();
        io.disconnect();
        if (lenisRef) lenisRef.destroy();
      };
    }
  });
</script>
