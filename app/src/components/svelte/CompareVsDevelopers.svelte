<script>
  /**
   * CompareVsDevelopers.svelte — AG6 Competitor Conquesting section
   * "Menantu Resort > Podomoro/Summarecon/Setraduta"
   * Bandingkan value utama yang tidak dimiliki developer lain
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { Check, X, Building2, TrendingUp, MapPin, ShieldCheck, Sparkles } from 'lucide-svelte';

  const comparisons = [
    {
      feature: 'Passive income 9% p.a. (guarantee 2 tahun)',
      menantu: true,
      others: false,
      detail: 'Bagi hasil 70/30, dikirim bulanan langsung ke rekening Anda',
    },
    {
      feature: 'Lokasi Bandung Timur — eco-resort 3,5 Ha',
      menantu: true,
      others: 'partial',
      detail: '5 menit exit Tol Cileunyi, kawasan hijau view 360°',
    },
    {
      feature: 'Dikelola operator hotel 50+ tahun (Sahid)',
      menantu: true,
      others: false,
      detail: 'Standar hospitality bintang 5, okupansi terjaga harian',
    },
    {
      feature: 'Booking fee ringan 10 jt (refundable 30 hari)',
      menantu: true,
      others: 'partial',
      detail: 'Lock harga 90 hari, tanpa commitment keras',
    },
    {
      feature: 'Subsidi cicilan 36 bulan pertama',
      menantu: true,
      others: false,
      detail: 'Cashflow ringan di awal kepemilikan',
    },
    {
      feature: 'SHM Bersih + izin komersial resort',
      menantu: true,
      others: 'partial',
      detail: 'Bisa dijual, diwariskan, dijadikan agunan bank',
    },
  ];
</script>

<section class="relative py-14 md:py-20 bg-cream-50" data-section="compare-vs-developers">
  <!-- Pattern background -->
  <div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="background-image: radial-gradient(circle, #1B4332 1px, transparent 1px); background-size: 32px 32px;"></div>
  <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20" style="background: radial-gradient(circle, rgba(212,165,116,0.5) 0%, transparent 70%);"></div>
  <div class="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-15" style="background: radial-gradient(circle, rgba(27,67,50,0.5) 0%, transparent 70%);"></div>

  <div class="container-wide relative">
    <!-- Header -->
    <div class="grid grid-cols-12 gap-8 mb-10">
      <div class="col-span-12 md:col-span-3">
        <div class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-3">— Bedah Kompetitor</div>
      </div>
      <div class="col-span-12 md:col-span-9">
        <h2 class="font-display text-display-md text-forest-700 leading-[1.0] tracking-tight mb-4">
          Kenapa <em class="text-gold-700">Menantu Resort</em>, bukan Podomoro atau Summarecon?
        </h2>
        <p class="font-body text-lg text-ink-soft max-w-3xl">
          Developer besar bangun apartemen. Kami bangun villa produktif yang langsung menghasilkan income dari hari pertama. Ini bedanya:
        </p>
      </div>
    </div>

    <!-- Comparison Table -->
    <motion.div
      class="card-premium overflow-hidden bg-white border-2 border-gold-500/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <!-- Table header -->
      <div class="grid grid-cols-12 gap-0 border-b-2 border-gold-500/40 bg-gradient-to-r from-forest-900 to-forest-800 text-cream-50">
        <div class="col-span-6 md:col-span-6 p-4 md:p-5">
          <div class="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-1">— Fitur</div>
        </div>
        <div class="col-span-3 md:col-span-3 p-4 md:p-5 text-center border-l border-gold-500/20">
          <div class="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-1">— Menantu Resort</div>
          <div class="font-display text-lg md:text-xl font-bold">Menantu</div>
        </div>
        <div class="col-span-3 md:col-span-3 p-4 md:p-5 text-center border-l border-gold-500/20">
          <div class="font-mono text-[10px] uppercase tracking-widest text-cream-50/40 mb-1">— Lainnya</div>
          <div class="font-display text-lg md:text-xl font-bold text-cream-50/60">Podomoro / Summarecon / Setraduta</div>
        </div>
      </div>

      <!-- Rows -->
      {#each comparisons as row, i}
        <motion.div
          class="grid grid-cols-12 gap-0 border-b border-cream-100 last:border-b-0 hover:bg-gold-500/5 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <div class="col-span-6 md:col-span-6 p-4 md:p-5 flex flex-col">
            <span class="font-body text-sm md:text-[15px] text-forest-700 font-semibold leading-snug">{row.feature}</span>
            <span class="font-body text-[11px] md:text-xs text-ink-mute mt-1 leading-snug">{row.detail}</span>
          </div>
          <div class="col-span-3 md:col-span-3 p-4 md:p-5 flex items-center justify-center border-l border-cream-100 bg-gold-500/5">
            {#if row.menantu === true}
              <div class="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gold-500 text-forest-900 rounded-full">
                <Check class="w-4 h-4 md:w-5 md:h-5" strokeWidth="3" />
              </div>
            {/if}
          </div>
          <div class="col-span-3 md:col-span-3 p-4 md:p-5 flex items-center justify-center border-l border-cream-100">
            {#if row.others === false}
              <div class="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-cream-100 text-ink-mute rounded-full">
                <X class="w-4 h-4 md:w-5 md:h-5" strokeWidth="3" />
              </div>
            {:else if row.others === 'partial'}
              <div class="inline-flex items-center gap-1 text-[10px] md:text-xs font-mono uppercase tracking-widest text-ink-mute">
                <span class="w-2 h-2 bg-ink-mute rounded-full"></span>
                Sebagian
              </div>
            {/if}
          </div>
        </motion.div>
      {/each}

      <!-- Bottom CTA row -->
      <div class="grid grid-cols-12 gap-0 bg-gradient-to-r from-forest-900 to-forest-800 text-cream-50 p-5 md:p-6">
        <div class="col-span-12 md:col-span-7 flex flex-col justify-center mb-4 md:mb-0">
          <h3 class="font-display text-lg md:text-xl font-bold leading-snug">
            Villa produktif, bukan sekadar apartemen untuk disewakan sendiri.
          </h3>
          <p class="text-xs md:text-sm text-cream-50/70 mt-1">
            Perbandingan jujur — nilai di atas adalah standar yang Anda dapatkan.
          </p>
        </div>
        <div class="col-span-12 md:col-span-5 flex items-center justify-start md:justify-end">
          <a
            href="https://wa.me/6285925942277?text=Halo%2C%20saya%20mau%20tanya%20detail%20perbandingan%20Menantu%20Resort%20vs%20developer%20lain.&source=compare_vs_developers"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-300 text-forest-900 font-bold text-xs uppercase tracking-widest px-5 py-3 transition-colors"
          >
            Tanya Detail via WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</section>
