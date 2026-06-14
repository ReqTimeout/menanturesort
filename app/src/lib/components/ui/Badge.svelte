<script>
  import { cn } from '../../utils';
  let { variant = 'default', class: className = '', children, ...rest } = $props();
  const variants = {
    default: 'bg-forest-500/15 text-forest-500',
    gold: 'bg-gold-500/15 text-gold-700',
    dark: 'bg-forest-700 text-gold-500',
    light: 'bg-cream-50 text-forest-700',
    outline: 'bg-transparent border border-gold-500 text-gold-700',
  };
</script>
<span class={cn('inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide', variants[variant], className)} {...rest}>
  {@render children?.()}
</span>
