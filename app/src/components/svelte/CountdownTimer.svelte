<script lang="ts">
  /**
   * CountdownTimer — countdown to promo deadline (V5.2)
   *
   * Usage:
   *   <CountdownTimer target="2026-06-30T23:59:59+07:00" />
   *   <CountdownTimer target={promo.deadline} size="lg" expiredText="Promo berakhir" />
   */
  import { onMount } from 'svelte';
  import { getCountdown, pad2, formatDateID } from '@lib/utils';
  import { motion } from '@humanspeak/svelte-motion';
  import { Clock } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let {
    target = '',
    size = 'md' as 'sm' | 'md' | 'lg',
    showLabel = true,
    showIcon = true,
    expiredText = 'Promo berakhir',
    class: className = '',
  } = $props();

  let cd = $state(getCountdown(target));
  let now = $state(new Date());
  let interval: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    interval = setInterval(() => {
      cd = getCountdown(target);
      now = new Date();
      if (cd.expired && interval) {
        clearInterval(interval);
        interval = null;
      }
    }, 1000);
    return () => { if (interval) clearInterval(interval); };
  });

  const sizeClass = {
    sm: { segment: 'min-w-[48px] px-2 py-1', value: 'text-base', label: 'text-[9px]' },
    md: { segment: 'min-w-[64px] px-3 py-2', value: 'text-2xl', label: 'text-[10px]' },
    lg: { segment: 'min-w-[80px] px-4 py-3', value: 'text-4xl', label: 'text-xs' },
  };

  const sizes = sizeClass[size];
</script>

<div class={cn('inline-flex flex-col gap-2', className)}>
  {#if showLabel}
    <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-700 font-bold">
      {#if showIcon}<Clock class="w-3 h-3" />{/if}
      <span>Promo Berakhir Dalam</span>
    </div>
  {/if}

  {#if cd.expired}
    <div class="inline-flex items-center gap-2 px-4 py-2 bg-danger-100 text-danger-800 border border-danger-300 text-sm font-bold">
      <Clock class="w-4 h-4" />
      {expiredText}
    </div>
  {:else}
    <motion.div
      class="inline-flex items-stretch gap-2"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <!-- Days -->
      <div class={cn('countdown-segment flex flex-col items-center', sizes.segment)}>
        <span class={cn('countdown-value font-mono font-bold text-cream-50', sizes.value)}>{pad2(cd.days)}</span>
        <span class={cn('countdown-label text-cream-50/60 uppercase tracking-widest', sizes.label)}>Hari</span>
      </div>
      <span class="text-gold-500 font-mono font-bold self-center text-2xl">:</span>
      <!-- Hours -->
      <div class={cn('countdown-segment flex flex-col items-center', sizes.segment)}>
        <span class={cn('countdown-value font-mono font-bold text-cream-50', sizes.value)}>{pad2(cd.hours)}</span>
        <span class={cn('countdown-label text-cream-50/60 uppercase tracking-widest', sizes.label)}>Jam</span>
      </div>
      <span class="text-gold-500 font-mono font-bold self-center text-2xl">:</span>
      <!-- Minutes -->
      <div class={cn('countdown-segment flex flex-col items-center', sizes.segment)}>
        <span class={cn('countdown-value font-mono font-bold text-cream-50', sizes.value)}>{pad2(cd.minutes)}</span>
        <span class={cn('countdown-label text-cream-50/60 uppercase tracking-widest', sizes.label)}>Menit</span>
      </div>
      <span class="text-gold-500 font-mono font-bold self-center text-2xl">:</span>
      <!-- Seconds -->
      <div class={cn('countdown-segment flex flex-col items-center', sizes.segment)}>
        <motion.span
          class={cn('countdown-value font-mono font-bold text-gold-500', sizes.value)}
          key={cd.seconds}
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >{pad2(cd.seconds)}</motion.span>
        <span class={cn('countdown-label text-cream-50/60 uppercase tracking-widest', sizes.label)}>Detik</span>
      </div>
    </motion.div>
  {/if}
</div>
