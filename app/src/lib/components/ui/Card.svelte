<script>
  import { cn } from '../../utils';
  let { class: className = '', accent = false, hover = true, children, ...rest } = $props();
</script>
<div class={cn('bg-card border border-cream-100 transition-all duration-300 ease-premium', hover && 'hover:shadow-md hover:-translate-y-1 hover:border-gold-300', accent && 'accent-line', className)} {...rest}>
  {@render children?.()}
</div>
