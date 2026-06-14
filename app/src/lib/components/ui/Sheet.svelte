<script>
  import { Dialog as SheetPrimitive } from 'bits-ui';
  import { X } from 'lucide-svelte';
  import { cn } from '../../utils';

  let { open = $bindable(false), side = 'right', class: className = '', children, ...rest } = $props();
  const sideClasses = {
    top: 'inset-x-0 top-0 border-b',
    bottom: 'inset-x-0 bottom-0 border-t',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
    right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  };
</script>

<SheetPrimitive.Root bind:open {...rest}>
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay class="fixed inset-0 z-50 bg-forest-900/60 backdrop-blur-sm" />
    <SheetPrimitive.Content class={cn('fixed z-50 gap-4 bg-white p-6 shadow-2xl', sideClasses[side], className)}>
      {@render children?.()}
      <SheetPrimitive.Close class="absolute right-4 top-4 opacity-70 hover:opacity-100">
        <X class="h-5 w-5" />
        <span class="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
</SheetPrimitive.Root>
