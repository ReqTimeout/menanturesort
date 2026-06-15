<script lang="ts">
  /**
   * RevealOnScroll — fade-up reveal saat element masuk viewport (V5.2)
   *
   * Features:
   * - 5 direction presets (up/down/left/right/none)
   * - 4 variants (fade, slide, scale, reveal)
   * - Polymorphic via @html
   * - Stagger-ready (delay prop)
   *
   * Usage:
   *   <RevealOnScroll direction="up" delay={100}>
   *     <h2>Section title</h2>
   *   </RevealOnScroll>
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { cn } from '@lib/utils';

  type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
  type Variant = 'fade' | 'slide' | 'scale' | 'reveal';

  let {
    children,
    direction = 'up' as Direction,
    variant = 'reveal' as Variant,
    delay = 0,
    duration = 0.8,
    y = 50,
    x = 0,
    scale = 0.95,
    once = true,
    margin = '-80px',
    class: className = '',
  } = $props();

  const dirMap: Record<Direction, { y: number; x: number }> = {
    up: { y: y ?? 50, x: 0 },
    down: { y: -(y ?? 50), x: 0 },
    left: { y: 0, x: -(x ?? 60) },
    right: { y: 0, x: x ?? 60 },
    none: { y: 0, x: 0 },
  };

  const dirs = dirMap[direction] ?? dirMap.up;

  const variantMap = {
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
    },
    slide: {
      initial: { opacity: 0, x: dirs.x, y: dirs.y },
      whileInView: { opacity: 1, x: 0, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: scale ?? 0.95 },
      whileInView: { opacity: 1, scale: 1 },
    },
    reveal: {
      initial: { opacity: 0, y: dirs.y, x: dirs.x, scale: scale !== 1 ? 0.95 : 1 },
      whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
    },
  };

  const anim = variantMap[variant] ?? variantMap.reveal;
</script>

<motion.div
  class={cn(className)}
  initial={anim.initial}
  whileInView={anim.whileInView}
  viewport={{ once, margin }}
  transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
>
  {@render children?.()}
</motion.div>
