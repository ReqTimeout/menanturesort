<script lang="ts">
  /**
   * VirtualTourSection — section wrapper untuk Panorama360 (V5.2)
   *
   * Layout:
   * - Dark bg (forest-700) untuk cinematic feel
   * - Eyebrow + heading + body di atas
   * - Panorama360 di tengah
   * - CTA di bawah
   *
   * Usage:
   *   <VirtualTourSection />
   *   <VirtualTourSection
   *     eyebrow="08 / Eksplorasi"
   *     heading="Lihat dari Atas"
   *     subheading="..."
   *   />
   */
  import Panorama360 from './Panorama360.svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import WhatsAppButton from './WhatsAppButton.svelte';
  import { Map, ChevronRight } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let {
    eyebrow = '08 / Eksplorasi',
    heading = 'Lihat dari Atas',
    subheading = 'Panorama 360° kawasan 3,5 hektar. Drag untuk melihat sekeliling, atau klik fullscreen untuk eksplorasi penuh.',
    src = '/360/panorama-main.jpg',
    poster = '/360/panorama-poster.jpg',
    height = '70vh',
    ctaHref = '/villa',
    ctaLabel = 'Lihat Peta Masterplan',
    class: className = '',
  } = $props();
</script>

<section class={cn("relative bg-forest-700 text-cream-50 py-14 md:py-24 overflow-hidden reveal", className)}>
  <!-- Pattern bg -->
  <div class="absolute inset-0 pattern-dots opacity-30 pointer-events-none"></div>

  <div class="container-wide relative z-10">
    <!-- Header -->
    <motion.div
      class="max-w-3xl mx-auto text-center mb-10 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span class="font-mono text-xs uppercase tracking-widest text-gold-500 block mb-4">
        {eyebrow}
      </span>
      <h2 class="font-display text-cream-50 leading-[0.95] tracking-tight font-bold text-editorial-md mb-6">
        {heading}<br/>
        <em class="text-gold-500">dengan mata Anda sendiri.</em>
      </h2>
      <p class="font-body text-base md:text-lg text-cream-50/70 max-w-2xl mx-auto leading-relaxed">
        {subheading}
      </p>
    </motion.div>

    <!-- Panorama 360° -->
    <motion.div
      class="max-w-6xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Panorama360
        {src}
        {poster}
        {height}
        caption="Kawasan 3,5 Ha — Udara Sejuk Pegunungan Bandung Timur"
      />
    </motion.div>

    <!-- CTA -->
    <motion.div
      class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <a
        href={ctaHref}
        class="btn btn-outline-light group"
      >
        <Map class="w-4 h-4" />
        {ctaLabel}
        <ChevronRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>
      <WhatsAppButton
        ctaId="survei"
        variant="whatsapp"
      />
    </motion.div>
  </div>
</section>
