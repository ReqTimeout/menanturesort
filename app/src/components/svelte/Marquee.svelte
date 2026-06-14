<script>
  let { items = [], speed = 30, separator = '✦' } = $props();

  // Duplicate items for seamless loop
  const looped = $derived([...items, ...items, ...items, ...items]);
</script>

<div class="marquee">
  <div class="marquee-track" style="animation-duration: {speed}s;">
    {#each looped as item, i}
      <span class="marquee-item">
        {item}
        <span class="marquee-sep">{separator}</span>
      </span>
    {/each}
  </div>
</div>

<style>
  .marquee {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }
  .marquee-track {
    display: inline-flex;
    align-items: center;
    animation: scroll linear infinite;
    will-change: transform;
  }
  .marquee-item {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(2rem, 5vw, 4.5rem);
    font-weight: 400;
    color: #1B4332;
    padding-right: 3rem;
    line-height: 1;
  }
  .marquee-sep {
    color: #D4A574;
    margin: 0 3rem;
    font-size: 0.6em;
    vertical-align: middle;
  }
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-25%); }
  }
</style>
