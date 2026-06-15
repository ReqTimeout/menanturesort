/**
 * motion.ts — V5.3 Svelte 5 helpers untuk animasi yang tidak gagal
 *
 * Masalah V5.2: pattern `motion + whileInView` dari @humanspeak/svelte-motion
 * bikin section stuck di opacity 0 saat:
 * - User scroll cepat
 * - Koneksi lambat (JS belum hydrate)
 * - Screenshot tool (Playwright fullPage, dll)
 * - SEO crawler
 *
 * Solusi V5.3: pakai Svelte 5 action `use:inView` yang menambahkan class
 * 'in-view' saat element pertama kali terlihat. CSS yang handle transition.
 * Default state: element visible (opacity 1) — animasi masuk opsional.
 *
 * Usage:
 *   <div use:inView={{ from: 'bottom' }} class="motion-fade-up">
 *     Content here
 *   </div>
 */

import type { Action } from 'svelte/action';

export type InViewOptions = {
  /** Direction animasi masuk (default: 'bottom') */
  from?: 'bottom' | 'top' | 'left' | 'right' | 'none';
  /** Threshold IntersectionObserver (default: 0.1) */
  threshold?: number;
  /** Once only (default: true) */
  once?: boolean;
  /** Delay ms sebelum trigger (default: 0) */
  delay?: number;
  /** Root margin untuk trigger awal (default: '-10% 0px') */
  rootMargin?: string;
};

/**
 * inView — Svelte 5 action. Adds 'in-view' class to element when visible.
 * Element default visible (CSS), class adds transition enhancement.
 */
export const inView: Action<HTMLElement, InViewOptions | undefined> = (node, options = {}) => {
  const {
    threshold = 0.1,
    once = true,
    delay = 0,
    rootMargin = '-10% 0px',
  } = options;

  // SSR-safe: no-op if IntersectionObserver unavailable
  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('in-view');
    return { destroy() {} };
  }

  // Set data attribute for direction (CSS uses this)
  if (options.from) {
    node.setAttribute('data-motion-from', options.from);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            node.classList.add('in-view');
          }, delay);
          if (once) observer.unobserve(node);
        } else if (!once) {
          node.classList.remove('in-view');
        }
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};

/**
 * Presets untuk common use cases
 */
export const inViewFade = { threshold: 0.1, from: 'bottom' as const };
export const inViewSlide = { threshold: 0.15, from: 'left' as const };
export const inViewScale = { threshold: 0.2, from: 'none' as const };
export const inViewNoAnim = { threshold: 0, from: 'none' as const };
