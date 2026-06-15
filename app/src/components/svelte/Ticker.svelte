<script>
  let { items = [], speed = 25 } = $props();
  const looped = $derived([...items, ...items, ...items]);
</script>

<div class="ticker">
  <div class="ticker-track" style="animation-duration: {speed}s;">
    {#each looped as item, i}
      <div class="ticker-card">
        <div class="font-mono text-xs text-gold-500 mb-2">0{i + 1}</div>
        <div class="font-display text-2xl md:text-3xl text-forest-700 font-bold leading-tight">{item.title}</div>
        {#if item.subtitle}
          <div class="font-body text-sm text-ink-500 mt-2">{item.subtitle}</div>
        {/if}
      </div>
    {/each}
  </div>
</div>