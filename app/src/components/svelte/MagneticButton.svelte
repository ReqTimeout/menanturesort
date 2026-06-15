<script>
  import { motion } from '@humanspeak/svelte-motion';

  let {
    children,
    href = '',
    target = '',
    rel = '',
    disabled = false,
    class: className = '',
    whileHover = { scale: 1.04, y: -3 },
    whileTap = { scale: 0.97 },
  } = $props();

  let el;
  let mouseX = $state(0);
  let mouseY = $state(0);

  function onMove(e) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
  }

  function onLeave() {
    mouseX = 0;
    mouseY = 0;
  }

  const tag = href ? 'a' : 'button';
</script>

<svelte:element
  this={tag}
  {href}
  {target}
  {rel}
  {disabled}
  bind:this={el}
  onmousemove={onMove}
  onmouseleave={onLeave}
  class="magnetic-btn {className}"
  style="transform: translate3d({mouseX}px, {mouseY}px, 0);"
>
  <motion.span
    class="magnetic-btn-inner"
    {whileHover}
    {whileTap}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  >
    {@render children()}
  </motion.span>
</svelte:element>

<style>
  .magnetic-btn {
    display: inline-flex;
    position: relative;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .magnetic-btn-inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
</style>
