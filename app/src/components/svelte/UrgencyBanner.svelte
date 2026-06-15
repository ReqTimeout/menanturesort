<script>
  import { onMount } from 'svelte';
  import { motion, AnimatePresence } from '@humanspeak/svelte-motion';
  import { Clock, TrendingDown, Flame, Users, AlertTriangle } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let { unitsLeft = 16, totalUnits = 74, deadline = null } = $props();

  let timeLeft = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  let isVisible = $state(false);

  const targetDate = $derived(() => {
    if (deadline) return new Date(deadline);
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    d.setHours(23, 59, 59);
    return d;
  });

  const soldPct = $derived(((totalUnits - unitsLeft) / totalUnits) * 100);
  const urgencyLevel = $derived(
    unitsLeft <= 5 ? 'critical' : unitsLeft <= 15 ? 'high' : 'normal'
  );

  const waLink = waUrl(
    siteData.contact.whatsapp,
    `Halo, saya ingin klaim promo spesial Menantu Resort. Mohon info unit tersisa dan jadwal survey.`,
    'urgency_banner'
  );

  onMount(() => {
    const timer = setTimeout(() => { isVisible = true; }, 100);

    const update = () => {
      const now = new Date();
      const diff = targetDate().getTime() - now.getTime();
      if (diff <= 0) {
        timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    update();
    const id = setInterval(update, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(id);
    };
  });

  const pad = (n) => String(n).padStart(2, '0');

  const urgencyStyles = {
    critical: 'from-red-800 via-red-700 to-red-800',
    high: 'from-red-700 via-red-600 to-red-700',
    normal: 'from-forest-700 via-forest-600 to-forest-700',
  };
</script>

<motion.section
  initial={{ opacity: 0, y: -20 }}
  animate={isVisible ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  class="bg-gradient-to-r {urgencyStyles[urgencyLevel]} text-white py-5 relative overflow-hidden"
>
  <!-- Animated background pulse -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style="background-size: 200% 100%;"></div>
  </div>

  <!-- Spotlight glow effect -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/5 blur-3xl rounded-full"></div>

  <div class="container-wide relative">
    <div class="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
      <!-- Left: live indicator + urgency label -->
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        class="flex items-center gap-3 flex-shrink-0"
      >
        <div class="relative">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          {#if urgencyLevel === 'critical'}
            <span class="absolute -top-1 -right-1 flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
            </span>
          {/if}
        </div>
        <div>
          <div class="font-mono text-[10px] uppercase tracking-widest opacity-80 flex items-center gap-1.5">
            {#if urgencyLevel === 'critical'}
              <AlertTriangle size={10} class="text-yellow-300" />
              Hampir Habis!
            {:else}
              Promo Berakhir Dalam
            {/if}
          </div>
          <div class="font-display text-lg font-bold leading-none">
            {urgencyLevel === 'critical' ? 'Sisa Beberapa Unit!' : 'Berakhir Segera'}
          </div>
        </div>
      </motion.div>

      <!-- Center: countdown -->
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        class="flex items-center gap-2 lg:gap-3 font-mono"
      >
        {#each [
          { value: timeLeft.days, label: 'hari' },
          { value: timeLeft.hours, label: 'jam' },
          { value: timeLeft.minutes, label: 'mnt' },
          { value: timeLeft.seconds, label: 'dtk' },
        ] as item, i}
          <div class="text-center">
            <motion.div
              key={item.value}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              class="text-2xl lg:text-3xl font-bold tabular-nums bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/20 min-w-[3rem]"
            >
              {pad(item.value)}
            </motion.div>
            <div class="text-[9px] uppercase tracking-widest mt-1 opacity-80">{item.label}</div>
          </div>
          {#if i < 3}
            <span class="text-xl opacity-50">:</span>
          {/if}
        {/each}
      </motion.div>

      <!-- Right: stock indicator -->
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        class="flex-1 hidden md:block"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        class="flex items-center gap-4"
      >
        <div class="text-right">
          <div class="font-mono text-[10px] uppercase tracking-widest opacity-80 flex items-center gap-1.5 justify-end">
            <Users size={10} />
            Sisa Unit
          </div>
          <div class="font-display text-2xl font-bold leading-none">
            <span class="text-yellow-300">{unitsLeft}</span>
            <span class="opacity-50 text-sm">/{totalUnits}</span>
          </div>
        </div>
        <div class="w-28">
          <div class="w-full h-2 bg-white/20 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${soldPct}%` } : {}}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              class="h-full {urgencyLevel === 'critical' ? 'bg-yellow-300' : 'bg-gold-500'}"
            ></motion.div>
          </div>
          <div class="font-mono text-[9px] text-right mt-1 opacity-70">{Math.round(soldPct)}% sold</div>
        </div>
      </motion.div>

      <!-- CTA -->
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        class="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-forest-700 font-body font-bold text-sm tracking-wide hover:bg-gold-300 transition-colors flex-shrink-0 shadow-lg"
      >
        <Flame size={14} />
        Klaim Sekarang
      </motion.a>
    </div>
  </div>
</motion.section>