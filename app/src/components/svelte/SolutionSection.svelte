<script lang="ts">
  /**
   * SolutionSection — 3 benefit counter dari ConcernsSection (V5.2)
   *
   * Layout: 3 cards dalam grid — bagi hasil, lokasi, warisan
   * Color: dark (forest-700) untuk kontras dengan ConcernsSection cream
   * Narrative: "Kami mengubur semua kecemasan Anda"
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { Wallet, MapPin, Scroll, Check } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  // Icon map by string id (avoids SSR component-passing issue)
  const iconMap: Record<string, any> = {
    wallet: Wallet,
    'map-pin': MapPin,
    scroll: Scroll,
  };

  let { solutions = [
    { id: 'bagi-hasil', title: 'Bagi Hasil 70-30 Tercatat', desc: 'Pendapatan bersih villa (setelah operasional 20%) dibagi 70% untuk pemilik. Tercatat teratur, dikirim bulanan ke rekening investor.', icon: 'wallet' },
    { id: 'lokasi', title: 'Cicalengka, Sejuk, Bebas Banjir', desc: 'Lokasi strategis Bandung Timur, kawasan hijau asri, udara sejuk pegunungan. Hidden gem, bukan overtourism Puncak/Lembang.', icon: 'map-pin' },
    { id: 'warisan', title: 'Aset Nyata, Diwariskan', desc: 'Sertifikat Hak Milik atas nama pribadi, bukan Hak Pakai. Aset tangible yang otomatis terus diwariskan ke anak cucu.', icon: 'scroll' },
  ], class: className = '' } = $props();
</script>

<section class={cn('gsap-fade section bg-forest-700 text-cream-50 relative overflow-hidden reveal', className)}>
  <!-- Pattern bg -->
  <div class="absolute inset-0 pattern-dots opacity-30 pointer-events-none"></div>

  <div class="container-wide relative z-10">
    <!-- Header -->
    <motion.div
      class="max-w-3xl mx-auto text-center mb-12 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span class="eyebrow eyebrow-light block mb-4">— Solusi</span>
      <h2 class="font-display text-cream-50 leading-[0.95] tracking-tight font-bold text-editorial-md mb-4">
        Kami <em class="text-gold-500 font-medium">mengubur</em> semua kecemasan Anda.
      </h2>
      <p class="font-body text-cream-50/70 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
        Kawasan resort terpadu berlegalitas resmi lengkap, dengan pengelolaan penuh
        di tangan operator legendaris tanah air.
      </p>
    </motion.div>

    <!-- 3 benefit cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each solutions as sol, i}
        {@const Icon = iconMap[sol.icon] || Wallet}
        <motion.article
          class="relative bg-forest-900/40 border border-forest-800 p-8 hover:border-gold-500/40 transition-colors group/sol"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <!-- Gold top accent -->
          <span class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover/sol:opacity-100 transition-opacity"></span>

          <!-- Icon -->
          <div class="w-12 h-12 flex items-center justify-center bg-forest-900/60 border border-gold-500/20 mb-5">
            <Icon class="w-5 h-5 text-gold-500" />
          </div>

          <!-- Title -->
          <h3 class="font-display text-xl text-cream-50 leading-tight mb-3">
            {sol.title}
          </h3>

          <!-- Desc -->
          <p class="text-sm text-cream-50/70 leading-relaxed mb-4">
            {sol.desc}
          </p>

          <!-- Verified badge -->
          <div class="flex items-center gap-1.5 text-xs text-success-400 font-medium">
            <Check class="w-3 h-3" />
            <span>Terverifikasi</span>
          </div>
        </motion.article>
      {/each}
    </div>
  </div>
</section>
