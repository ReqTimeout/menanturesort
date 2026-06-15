<script lang="ts">
  /**
   * LiveActivityTicker — real-time activity feed (V5.2)
   * Port dari web existing (PROVEN).
   *
   * Usage:
   *   <LiveActivityTicker events={data.liveEvents} />
   */
  import { onMount, onDestroy } from 'svelte';
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { Eye, FileText, Calculator, Lock, MapPin, Bell } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let {
    events = [],
    interval = 5000,
    class: className = '',
  } = $props();

  let currentIdx = $state(0);
  let timer: ReturnType<typeof setInterval> | null = null;
  let visible = $state(false);

  // Map action ke icon
  const actionIcon: Record<string, any> = {
    'melihat detail': Eye,
    'mengunduh brosur': FileText,
    'menghitung KPR': Calculator,
    'mengamankan unit': Lock,
    'membaca FAQ': Bell,
    'booking survei': MapPin,
  };

  // Map villa ID ke label
  const villaLabel: Record<string, string> = {
    bijak: 'Menantu Bijak',
    idaman: 'Menantu Idaman',
    mapan: 'Menantu Mapan',
  };

  function getRandomEvent() {
    if (!events.length) return null;
    return events[Math.floor(Math.random() * events.length)];
  }

  let current = $derived(events[currentIdx] || null);
  let Icon = $derived(current?.action ? actionIcon[current.action] : Eye);
  let villaText = $derived(current?.villa ? villaLabel[current.villa] || '' : '');

  onMount(() => {
    visible = true;
    timer = setInterval(() => {
      currentIdx = (currentIdx + 1) % events.length;
    }, interval);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

{#if visible && current}
  <div class={cn('flex items-center gap-3 px-4 py-2.5 bg-forest-900/80 backdrop-blur-md border-l-2 border-success-500', className)}>
    <span class="live-dot flex-shrink-0"></span>
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIdx}
        class="flex items-center gap-2 text-xs text-cream-50/90 flex-1 min-w-0"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        <Icon class="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
        <span class="truncate">
          <strong class="font-semibold text-gold-500">{current.name}</strong>
          <span class="text-cream-50/70"> dari {current.city}</span>
          <span> {current.action} </span>
          {#if villaText}
            <span class="text-gold-500 font-semibold">{villaText}</span>
          {/if}
          <span class="text-cream-50/50 ml-1">{current.minutesAgo}m lalu</span>
        </span>
      </motion.div>
    </AnimatePresence>
  </div>
{/if}
