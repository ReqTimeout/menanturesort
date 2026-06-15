<script>
  let { items = [], speed = 30, separator = '✦' } = $props();

  // Duplicate items 2x so the -50% scroll creates seamless infinite loop
  const looped = $derived([...items, ...items]);
</script>

<div class="marquee">
  <div class="marquee-track" style="animation-duration: {speed}s;">
    {#each looped as item, i}
      <span class="marquee-item">
        {@html item}
        <span class="marquee-sep">{separator}</span>
      </span>
    {/each}
  </div>
</div>
