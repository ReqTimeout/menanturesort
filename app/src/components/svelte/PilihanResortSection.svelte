<script lang="ts">
  /**
   * PilihanResortSection — 3 VillaCard pilihan (V5.2, port dari existing)
   *
   * Layout: header + 3-column grid villa cards
   * Color: white bg
   * Narrative: "Pilih villa, satu standar."
   */
  import { motion } from '@humanspeak/svelte-motion';
  import VillaCard from './VillaCard.svelte';
  import WhatsAppButton from './WhatsAppButton.svelte';
  import { ArrowRight, Sparkles } from 'lucide-svelte';
  import { cn } from '@lib/utils';
  
  let { villas = [], class: className = '' } = $props();
</script>

<section id="villa-types" class={cn('gsap-fade section-tight section-white relative overflow-hidden reveal', className)}>
  <!-- Animated background: SVG dots pattern + 2 soft orbs -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute inset-0 opacity-[0.06]" style="background-image: radial-gradient(circle, #1B4332 1px, transparent 1px); background-size: 24px 24px;"></div>
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-float-soft" style="background: radial-gradient(circle, rgba(212,165,116,0.20) 0%, transparent 70%); animation-delay: -1s;"></div>
    <div class="absolute bottom-0 left-0 w-[28rem] h-[28rem] rounded-full blur-3xl animate-float-soft" style="background: radial-gradient(circle, rgba(27,67,50,0.15) 0%, transparent 70%); animation-delay: -3s;"></div>
  </div>
  <div class="relative">
  <div class="container-wide">
    <!-- Header -->
    <motion.div
      class="max-w-4xl mb-12 md:mb-16 mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <span class="eyebrow block mb-4">— Pilihan Resort Terbaik</span>
      <h2 class="font-display text-forest-700 leading-[0.95] tracking-tight font-bold text-editorial-md mb-4">
        Tiga villa, <em class="text-gold-700 font-medium">satu standar.</em>
      </h2>
      <p class="font-body text-ink-700 leading-[1.7] text-base md:text-[17px] max-w-[640px] mx-auto">
        Setiap villa dirancang dengan presisi dan dedikasi yang sama — beda kapasitas, satu kualitas.
        Pilih yang sesuai dengan tahap hidup dan target investasi Anda.
      </p>
    </motion.div>

    <!-- 3 villa cards -->
    {#if villas.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {#each villas as villa, i (villa.id || i)}
          <VillaCard {villa} index={i} />
        {/each}
      </div>
    {/if}

    <!-- Bottom CTA -->
    <motion.div
      class="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 md:p-8 bg-cream-50 border-l-2 border-gold-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Sparkles class="w-5 h-5 text-gold-700 flex-shrink-0" />
      <p class="text-sm md:text-base text-ink-700 text-center sm:text-left">
        <strong class="text-forest-700">Bingung pilih?</strong> Tim konsultan kami bantu rekomendasikan villa sesuai budget & timeline Anda.
      </p>
      <WhatsAppButton ctaId="konsultasi" variant="primary" size="sm" />
    </motion.div>
  </div>
  </div>
</section>
