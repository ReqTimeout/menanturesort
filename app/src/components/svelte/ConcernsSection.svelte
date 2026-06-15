<script lang="ts">
  /**
   * ConcernsSection — 4 ketakutan investor (V5.2, port dari existing PROVEN)
   *
   * Layout: 2 kolom — kiri: 4 concern cards (icon + text), kanan: besar italic display
   * Color: cream bg (section-cream)
   * Narrative: surface pain point, biar SolutionSection berikutnya jadi "penyelamat"
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { Scale, Home, Brush, EyeOff } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let { concerns = [
    { id: 'legalitas', icon: Scale, text: 'Takut sengketa legalitas, SHM tumpang tindih, atau izin macet.' },
    { id: 'terbengkalai', icon: Home, text: 'Takut villa terbengkalai, kosong tanpa tamu dan penyewa tetap.' },
    { id: 'operasional', icon: Brush, text: 'Takut pusing mengurus kebersihan, taman, sprei, & staf operasional.' },
    { id: 'transparansi', icon: EyeOff, text: 'Takut bagi hasil tidak transparan dan properti cepat rusak.' },
  ], class: className = '' } = $props();

  // Map icon string to component
  const iconMap: Record<string, any> = {
    scale: Scale,
    home: Home,
    brush: Brush,
    'eye-off': EyeOff,
  };
</script>

<section class={cn('gsap-fade section section-cream relative overflow-hidden reveal', className)}>
  <!-- SVG pattern bg (anti-flat) -->
  <div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L30 55M5 30L55 30' stroke='%231B4332' stroke-width='1'/%3E%3C/svg%3E&quot;);"></div>
  <div class="container-wide relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
    <!-- Kiri: 4 concerns -->
    <div class="col-span-1 md:col-span-7">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span class="eyebrow block mb-4">— Kekhawatiran Umum Investor</span>
        <h2 class="font-display text-forest-700 leading-[0.95] tracking-tight font-bold text-editorial-md mb-3">
          Menyimpan dana di tabungan
          <em class="text-gold-700 font-medium">terus kehilangan</em>
          daya beli.
        </h2>
        <p class="font-body text-ink-700 leading-relaxed mb-8 max-w-xl">
          Namun investor sering kali dibayangi rasa takut saat memilih properti.
          Empat kekhawatiran ini yang paling sering kami dengar:
        </p>
      </motion.div>

      <ul class="space-y-3">
        {#each concerns as concern, i}
          {@const Icon = iconMap[concern.icon] || Scale}
          <motion.li
            class="flex items-start gap-3 p-4 bg-white border border-cream-100 hover:border-gold-300 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-danger-50 text-danger-700">
              <Icon class="w-4 h-4" />
            </span>
            <span class="text-sm md:text-base text-ink-700 leading-relaxed pt-1">{concern.text}</span>
          </motion.li>
        {/each}
      </ul>

      <!-- Inflasi reminder -->
      <motion.div
        class="mt-6 p-4 bg-danger-50 border-l-2 border-danger-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p class="text-sm text-danger-800 font-medium">
          <strong>Rugi Inflasi:</strong> Kas non-produktif terpangkas nilainya tanpa perlindungan fisik.
        </p>
      </motion.div>
    </div>

    <!-- Kanan: editorial italic display -->
    <div class="col-span-1 md:col-span-5 flex items-center">
      <motion.div
        class="text-quote text-forest-700 leading-snug"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        "Apa gunanya punya tabungan banyak
        <em class="text-gold-700"> kalau tiap tahun nilainya tergerus inflasi?</em>
        Properti produktif adalah jawaban untuk mereka yang berpikir jangka panjang."
        <span class="block mt-6 text-sm font-body text-ink-700 not-italic">
          — Tim MK LAND
        </span>
      </motion.div>
    </div>
  </div>
</section>
