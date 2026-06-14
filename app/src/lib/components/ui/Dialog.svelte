<script>
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import { X } from 'lucide-svelte';
  import { cn } from '../../utils';

  let { open = $bindable(false), title = '', description = '', class: className = '', children, ...rest } = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay class="fixed inset-0 z-50 bg-forest-900/60 backdrop-blur-sm" />
    <DialogPrimitive.Content class={cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-cream-100 bg-white p-6 shadow-2xl sm:rounded-none', className)}>
      <div class="flex flex-col space-y-1.5 text-center sm:text-left">
        {#if title}
          <DialogPrimitive.Title class="font-display text-2xl text-forest-700">{title}</DialogPrimitive.Title>
        {/if}
        {#if description}
          <DialogPrimitive.Description class="text-sm text-ink-500">{description}</DialogPrimitive.Description>
        {/if}
      </div>
      {@render children?.()}
      <DialogPrimitive.Close class="absolute right-4 top-4 opacity-70 hover:opacity-100">
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
</DialogPrimitive.Root>
