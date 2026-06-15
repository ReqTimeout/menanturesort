<script lang="ts">
  /**
   * PopularitasTipeSection — real-time count social proof (V5.2, port dari existing)
   *
   * Layout: 3 baris dengan progress bar animasi
   * Color: forest bg untuk kontras
   * Narrative: "Tipe apa yang paling laris?"
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { Eye, TrendingUp } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let { popularitas = {
    bijak: { views: 247, label: 'Menantu Bijak (Attic)' },
    idaman: { views: 412, label: 'Menantu Idaman (Double Glass)' },
    mapan: { views: 189, label: 'Menantu Mapan (Luxury Private)' },
    liveViewers: 8,
    updatedAt: 'Real-time',
  }, class: className = '' } = $props();

  // Compute total + max for percentage
  let total = $derived(
    (popularitas?.bijak?.views || 0) +
    (popularitas?.idaman?.views || 0) +
    (popularitas?.mapan?.views || 0)
  );

  let entries = $derived([
    { id: 'idaman', label: popularitas?.idaman?.label || 'Menantu Idaman', views: popularitas?.idaman?.views || 0, color: 'bg-villa-idaman' },
    { id: 'bijak', label: popularitas?.bijak?.label || 'Menantu Bijak', views: popularitas?.bijak?.views || 0, color: 'bg-villa-bijak' },
    { id: 'mapan', label: popularitas?.mapan?.label || 'Menantu Mapan', views: popularitas?.mapan?.views || 0, color: 'bg-villa-mapan' },
  ]);
</script>

<section class={cn('gsap-fade section bg-forest-900 text-cream-50 relative overflow-hidden reveal', className)}>
  <div class="container-wide relative z-10">
    <!-- Header -->
    <motion.div
      class="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <span class="eyebrow eyebrow-light block mb-4">— Popularitas Tipe Unit Villa Resort</span>
      <h2 class="font-display text-cream-50 leading-[0.95] tracking-tight font-bold text-editorial-md">
        <Eye class="w-8 h-8 md:w-10 md:h-10 text-gold-500 inline-block mb-2" />
        <br/>
        Tipe apa yang paling <em class="text-gold-500 font-medium">diminati?</em>
      </h2>
      <p class="font-mono text-xs uppercase tracking-widest text-cream-50/50 mt-4">
        Data real-time · {total} views minggu ini
      </p>
    </motion.div>

    <!-- Progress bars -->
    <div class="max-w-3xl mx-auto space-y-6">
      {#each entries as entry, i}
        {@const pct = total > 0 ? Math.round((entry.views / total) * 100) : 0}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="font-semibold text-cream-50">{entry.label}</span>
            <span class="font-mono text-cream-50/70">{entry.views} views · {pct}%</span>
          </div>
          <div class="h-2 bg-forest-700/50 overflow-hidden">
            <motion.div
              class={`h-full ${entry.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            ></motion.div>
          </div>
        </motion.div>
      {/each}
    </div>

    <!-- Live indicator -->
    <motion.div
      class="mt-10 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-forest-700/60 border border-forest-600">
        <span class="live-dot"></span>
        <span class="text-sm text-cream-50/90 font-mono">
          <strong class="text-gold-500 font-bold">{popularitas?.liveViewers || 8}</strong> sedang melihat detail villa
        </span>
      </div>
    </motion.div>
  </div>
</section>
