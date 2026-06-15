<script lang="ts">
  /**
   * WhatsAppButton — universal WA deep-link button (V5.2)
   *
   * 5 macro-CTA standar (sesuai PLAN_REDESIGN_V5.md §4.2):
   * 1. survei     — high intent
   * 2. konsultasi — medium intent
   * 3. simulasi   — research
   * 4. brosur     — low intent
   * 5. telepon    — medium-high intent
   *
   * Usage:
   *   <WhatsAppButton ctaId="survei" variant="primary" />
   *   <WhatsAppButton ctaId="konsultasi" variant="outline" size="sm" />
   *   <WhatsAppButton ctaId="custom" customMessage="..." />
   */
  import { ctaUrl, buildWaUrl } from '@lib/utils';
  import { motion } from '@humanspeak/svelte-motion';
  import { MessageCircle, ArrowRight } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  type CTAId = 'survei' | 'konsultasi' | 'simulasi' | 'brosur' | 'telepon' | 'custom';
  type Variant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  let {
    ctaId = 'konsultasi' as CTAId,
    customMessage = '',
    phone = '',
    variant = 'primary' as Variant,
    size = 'md' as Size,
    fullWidth = false,
    showIcon = true,
    showArrow = false,
    extra = '',
    class: className = '',
    onClick = null as ((e: MouseEvent) => void) | null,
  } = $props();

  let href = $derived(() => {
    if (ctaId === 'custom') {
      return buildWaUrl(phone || undefined, customMessage);
    }
    return ctaUrl(ctaId, phone || undefined, extra);
  });

  const variantClass: Record<Variant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    whatsapp: 'btn-whatsapp',
    ghost: 'btn-ghost',
  };

  const sizeClass: Record<Size, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const ctaLabel: Record<Exclude<CTAId, 'custom'>, string> = {
    survei: 'Konsultasi WhatsApp',
    konsultasi: 'Konsultasi WhatsApp',
    simulasi: 'Hitung Simulasi KPR',
    brosur: 'Minta Brosur',
    telepon: 'Jadwalkan Telepon',
  };

  let label = $derived(ctaId === 'custom' ? 'Hubungi Kami' : ctaLabel[ctaId as Exclude<CTAId, 'custom'>]);
</script>

<motion.a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class={cn('btn no-underline', variantClass[variant], sizeClass[size], fullWidth && 'w-full', className)}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  onclick={onClick}
>
  {#if showIcon}
    <MessageCircle class="w-4 h-4" />
  {/if}
  {label}
  {#if showArrow}
    <ArrowRight class="w-4 h-4" />
  {/if}
</motion.a>
