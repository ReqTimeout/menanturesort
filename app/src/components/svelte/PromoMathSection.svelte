<script>
  /**
   * PromoMathSection.svelte — visual perbandingan "Tanpa Promo" vs "Dengan Promo"
   * + animated counter total value Rp 308 juta
   */
  import { motion } from '@humanspeak/svelte-motion';
  import CountUp from './CountUp.svelte';
  import { Check, X, Sparkles } from 'lucide-svelte';

  const rows = [
    { label: 'Harga Villa Mapan', normal: 'Rp 2.000.000.000', promo: 'Rp 1.800.000.000', highlight: true },
    { label: 'Booking fee', normal: 'Rp 10.000.000', promo: 'Rp 5.000.000', highlight: true },
    { label: 'Cicilan/bln (15 thn, 5%)', normal: 'Rp 15.800.000', promo: 'Rp 13.500.000' },
    { label: 'Subsidi 36 bulan', normal: '—', promo: '−Rp 3 jt/bln (hemat Rp 108 jt)', highlight: true },
    { label: 'Bonus langsung', normal: '—', promo: 'Mobil Listrik Baru (Wuling Air ev)', highlight: true },
    { label: 'Passive income estimate', normal: '8-15% p.a.', promo: '8-15% p.a.' },
    { label: 'Surplus cashflow/bln', normal: 'Mungkin negatif', promo: 'Positif dari tahun ke-2' },
    { label: 'Lock-harga', normal: 'Tidak', promo: '90 hari', highlight: true }
  ];
</script>

<section class="relative bg-forest-900 text-cream-50 overflow-hidden">
  <!-- Decorative pattern -->
  <div class="absolute inset-0 opacity-[0.04] pointer-events-none">
    <div class="absolute inset-0 bg-pattern-gold-sparkle"></div>
  </div>

  <div class="container-wide py-20 md:py-32 relative">
    <!-- Section header -->
    <div class="max-w-3xl mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-3">
          — Hitungan Rasional
        </div>
        <h2 class="font-display text-editorial-lg text-cream-50 leading-[0.95] tracking-tight font-bold mb-5">
          Coba Kita Hitung<br/>
          <em class="text-gold-500">Bersama.</em>
        </h2>
        <p class="font-body text-lg text-cream-50/80 leading-relaxed">
          Bukan sebagai sales pitch, tapi sebagai perbandingan rasional yang bisa Anda verifikasi sendiri dengan kalkulator.
        </p>
      </motion.div>
    </div>

    <!-- Comparison Table -->
    <motion.div
      class="grid grid-cols-1 md:grid-cols-2 gap-0 border border-cream-50/10 mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <!-- Header row -->
      <div class="hidden md:grid grid-cols-2 bg-cream-50/5 border-b border-cream-50/10">
        <div class="p-5 font-mono text-xs uppercase tracking-widest text-cream-50/60">Elemen</div>
        <div class="p-5 grid grid-cols-2">
          <div class="font-mono text-xs uppercase tracking-widest text-cream-50/60 text-center">Tanpa Promo</div>
          <div class="font-mono text-xs uppercase tracking-widest text-gold-500 text-center font-bold">Dengan Promo</div>
        </div>
      </div>

      <!-- Rows -->
      {#each rows as row, i}
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 border-b border-cream-50/10 last:border-b-0 {row.highlight ? 'bg-gold-500/[0.04]' : ''}">
          <!-- Label -->
          <div class="p-5 border-b md:border-b-0 md:border-r border-cream-50/10 flex items-center">
            <span class="font-body text-sm text-cream-50/90">{row.label}</span>
          </div>
          <!-- Values -->
          <div class="p-5 grid grid-cols-2 gap-4">
            <div class="text-center flex flex-col items-center justify-center">
              <span class="md:hidden font-mono text-[10px] uppercase tracking-widest text-cream-50/50 mb-1">Normal</span>
              <span class="font-mono text-sm text-cream-50/70">{row.normal}</span>
            </div>
            <div class="text-center flex flex-col items-center justify-center">
              <span class="md:hidden font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-1">Promo</span>
              <span class="font-mono text-sm {row.highlight ? 'text-gold-500 font-bold' : 'text-cream-50/90'} flex items-center gap-1.5">
                {#if row.highlight}
                  <Sparkles class="w-3 h-3 text-gold-500" />
                {/if}
                {row.promo}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </motion.div>

    <!-- Animated Total -->
    <motion.div
      class="text-center max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-4">
        Total nilai yang Anda peroleh minggu ini
      </div>
      <div class="font-display text-5xl md:text-7xl text-gold-500 font-bold leading-none mb-6 tabular-nums">
        Rp&nbsp;<CountUp end={308} duration={2.4} /> Juta
      </div>
      <p class="text-base md:text-lg text-cream-50/80 leading-relaxed">
        + <strong class="text-gold-500">Mobil Listrik Baru</strong> (Wuling Air ev atau setara).<br/>
        Setara dengan 8 tahun biaya pendidikan anak, 3 unit mobil baru, atau 1 unit apartemen studio baru di Jakarta.
      </p>
    </motion.div>

    <!-- Disclaimer -->
    <motion.div
      class="max-w-3xl mx-auto border-t border-cream-50/10 pt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p class="text-[11px] text-cream-50/50 leading-relaxed text-center">
        <em>*Nominal adalah estimasi ilustratif berdasarkan asumsi occupancy 60% dan KPR 15 tahun. Performa aktual tergantung kondisi pasar, occupancy, dan hasil operasional Sahid. Semua angka tunduk pada S&K di kontrak. Dokumen legal tersedia saat survey.</em>
      </p>
    </motion.div>
  </div>
</section>
