<script>
  import { Accordion } from 'bits-ui';
  let { items = [], class: className = '' } = $props();
</script>

<Accordion.Root type="single" class={className}>
  {#each items as item, i}
    <Accordion.Item value={`item-${i}`} class="border-b border-cream-100 last:border-0">
      <Accordion.Header>
        <Accordion.Trigger class="w-full py-5 flex items-center justify-between text-left font-display text-lg text-forest-700 hover:text-gold-700 transition-colors group">
          <span class="pr-4">{item.q}</span>
          <span class="text-gold-500 text-2xl font-light transition-transform group-data-[state=open]:rotate-45 flex-shrink-0">+</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content class="overflow-hidden text-sm">
        <div class="pb-5 text-ink-500 leading-relaxed">
          {item.a}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
