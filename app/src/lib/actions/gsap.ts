import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
}

export function gsapScrollReveal(
  node: HTMLElement,
  options: ScrollRevealOptions = {}
): { destroy: () => void } {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    stagger = 0,
    start = 'top 85%',
    toggleActions = 'play none none none',
  } = options;

  const targets = stagger ? node.children : node;

  const tween = gsap.from(targets, {
    y,
    x,
    opacity,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: {
      trigger: node,
      start,
      toggleActions,
    },
  });

  return {
    destroy() {
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    },
  };
}

export function gsapPin(
  node: HTMLElement,
  options: ScrollRevealOptions = {}
): { destroy: () => void } {
  const {
    start = 'top top',
    end = '+=100%',
    scrub = 1,
  } = options;

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: node,
      start,
      end,
      pin: true,
      scrub,
    });
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function gsapTextReveal(
  node: HTMLElement,
  options: ScrollRevealOptions = {}
): { destroy: () => void } {
  const {
    duration = 1.2,
    delay = 0,
    ease = 'power4.out',
    start = 'top 80%',
  } = options;

  const chars = node.textContent?.split('') || [];
  node.innerHTML = chars
    .map((char) => `<span class="gsap-char" style="display:inline-block; opacity:0; transform:translateY(20px)">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  const charElements = node.querySelectorAll('.gsap-char');

  const tween = gsap.to(charElements, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
    stagger: 0.02,
    scrollTrigger: {
      trigger: node,
      start,
      toggleActions: 'play none none none',
    },
  });

  return {
    destroy() {
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    },
  };
}
