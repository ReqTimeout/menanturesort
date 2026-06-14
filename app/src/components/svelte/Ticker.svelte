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

<style>
  .ticker {
    overflow: hidden;
    background: #fff;
    border-top: 1px solid #E8DCC8;
    border-bottom: 1px solid #E8DCC8;
  }
  .ticker-track {
    display: inline-flex;
    gap: 0;
    animation: tickerScroll linear infinite;
    will-change: transform;
  }
  .ticker-card {
    flex: 0 0 360px;
    padding: 2.5rem 2rem;
    border-right: 1px solid #E8DCC8;
  }
  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-33.33%); }
  }
</style>
