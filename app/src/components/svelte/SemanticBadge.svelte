<script lang="ts">
  /**
   * SemanticBadge — versatile badge dengan semantic & villa variants (V5.2)
   *
   * Usage:
   *   <SemanticBadge variant="success">Tersedia</SemanticBadge>
   *   <SemanticBadge variant="danger" pulse>Sisa 5</SemanticBadge>
   *   <SemanticBadge variant="villa-mapan">Luxury Private</SemanticBadge>
   */
  import { cn } from '@lib/utils';

  type Variant = 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'forest' | 'dark' | 'light' | 'villa-bijak' | 'villa-idaman' | 'villa-mapan' | 'live';

  let {
    children,
    variant = 'gold' as Variant,
    size = 'md' as 'sm' | 'md' | 'lg',
    pulse = false,
    icon = null as any,
    class: className = '',
  } = $props();

  const variantClass: Record<Variant, string> = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    gold: 'badge-gold',
    forest: 'badge-forest',
    dark: 'badge-dark',
    light: 'badge-light',
    'villa-bijak': 'badge-villa-bijak',
    'villa-idaman': 'badge-villa-idaman',
    'villa-mapan': 'badge-villa-mapan',
    live: 'badge-live',
  };

  const sizeClass: Record<string, string> = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };
</script>

<span class={cn('badge inline-flex items-center gap-1.5', variantClass[variant], sizeClass[size], pulse && 'animate-pulse', className)}>
  {#if icon}
    <svelte:component this={icon} class="w-3 h-3" />
  {/if}
  {@render children?.()}
</span>
