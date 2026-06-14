<script>
  import { cn } from '../../utils';
  let { variant = 'primary', size = 'md', class: className = '', children, ...rest } = $props();
  const variants = {
    primary: 'bg-forest-500 text-cream-50 border-forest-500 hover:bg-forest-700 hover:border-forest-700',
    secondary: 'bg-gold-500 text-forest-700 border-gold-500 hover:bg-gold-300 hover:border-gold-300',
    outline: 'bg-transparent text-forest-700 border-forest-700 hover:bg-forest-700 hover:text-cream-50',
    'outline-light': 'bg-transparent text-cream-50 border-cream-50/40 hover:bg-cream-50/10 hover:border-cream-50',
    whatsapp: 'bg-whatsapp text-white border-whatsapp hover:bg-whatsapp/90',
    ghost: 'bg-transparent text-forest-700 border-transparent hover:bg-cream-50',
    link: 'bg-transparent text-forest-700 border-transparent hover:text-gold-700 px-0 py-0',
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    icon: 'p-2',
  };
</script>
<button class={cn('btn-base', variants[variant], sizes[size], className)} {...rest}>
  {@render children?.()}
</button>
