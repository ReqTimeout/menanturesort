<script>
  /**
   * ScrollEffects.svelte — GSAP-powered scroll effects
   *
   * Pin/parallax/scroll-triggered animations for premium wow factor.
   * Lazy-loads GSAP + ScrollTrigger on mount, animates .gsap-fade,
   * .gsap-pin, .gsap-parallax, .gsap-stagger elements.
   *
   * Respects prefers-reduced-motion.
   */
  import { onMount } from 'svelte';
  import { browser } from '../../lib/browser';

  let { enabled = true } = $props();

  onMount(async () => {
    if (!browser || !enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // 1. Fade-up elements
      gsap.utils.toArray('.gsap-fade').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      // 2. Stagger groups
      gsap.utils.toArray('.gsap-stagger').forEach((group) => {
        const children = group.children;
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          }
        );
      });

      // 3. Parallax (transform-only)
      gsap.utils.toArray('.gsap-parallax').forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || '0.3');
        gsap.to(el, {
          yPercent: -50 * speed,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // 4. Reveal from left/right
      gsap.utils.toArray('.gsap-reveal-left').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });
      gsap.utils.toArray('.gsap-reveal-right').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });

      // 5. Scale-up
      gsap.utils.toArray('.gsap-scale').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });

      // 6. Counter animation
      gsap.utils.toArray('.gsap-counter').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate() {
            el.textContent = obj.v.toFixed(decimals);
          },
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });
    } catch (err) {
      console.warn('[ScrollEffects] GSAP load failed, falling back to .reveal:', err);
    }
  });
</script>
