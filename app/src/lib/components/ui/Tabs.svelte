<script>
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '../../utils';

  let { value = $bindable(''), items = [], class: className = '', ...rest } = $props();
</script>

<TabsPrimitive.Root bind:value class={cn('w-full', className)} {...rest}>
  <TabsPrimitive.List class="inline-flex h-12 items-center justify-start gap-2 border-b border-cream-100 w-full overflow-x-auto">
    {#each items as item}
      <TabsPrimitive.Trigger
        value={item.value}
        class="relative inline-flex items-center justify-center whitespace-nowrap px-5 py-3 font-body text-sm font-semibold text-ink-500 transition-colors hover:text-forest-700 data-[state=active]:text-forest-700 data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-gold-500"
      >
        {item.label}
      </TabsPrimitive.Trigger>
    {/each}
  </TabsPrimitive.List>
  {#each items as item}
    <TabsPrimitive.Content value={item.value} class="mt-8 focus-visible:outline-none">
      {@render item.content?.()}
    </TabsPrimitive.Content>
  {/each}
</TabsPrimitive.Root>
