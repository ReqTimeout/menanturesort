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