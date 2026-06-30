<script>
  /**
   * PromoTrustBand.svelte — 4 pilar trust signal (SHM, Sahid, Bank, Refund)
   * Style: forest-900 bg + gold accent
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { ScrollText, Building2, Landmark, ShieldCheck } from 'lucide-svelte';

  const pillars = [
    {
      icon: ScrollText,
      title: 'Sertifikat Hak Milik. Bukan Hak Pakai.',
      sub: 'Villa Anda atas nama Anda sendiri. Bisa dijual, diwariskan, diagunkan.',
      verify: 'Bisa dicek di BPN, notaris independen, dan dokumen di tanda tangan akad.'
    },
    {
      icon: Building2,
      title: 'Dikelola Sahid. 50 Tahun Reputasi Hotel.',
      sub: 'Sahid sudah mengelola 20+ hotel di Indonesia selama lebih dari 50 tahun.',
      verify: 'Sahid Hotels corporate site, press release 50 tahun, daftar properti di Wikipedia.'
    },
    {
      icon: Landmark,
      title: 'Bayar ke Rekening Developer. Tiga Bank Resmi.',
      sub: 'BNI · BCA · BSI. a.n. PT Cipta Multikarya Propertindo.',
      verify: 'Rekening bisa dicek di website OJK, BSI terdaftar di Dewan Syariah Nasional.'
    },
    {
      icon: ShieldCheck,
      title: 'Booking Rp 5 Juta. 100% Refundable 30 Hari.',
      sub: 'Bukan "uang hilang" kalau Anda berubah pikiran. Tanpa potongan, tanpa syarat.',
      verify: 'S&K refund ada di klausul 4.2 kontrak booking yang ditandatangani notaris.'
    }
  ];
</script>

<section class="relative bg-forest-900 text-cream-50 overflow-hidden">
  <div class="absolute inset-0 opacity-[0.04] pointer-events-none">
    <div class="absolute inset-0 bg-pattern-gold-sparkle"></div>
  </div>

  <div class="container-wide py-20 md:py-28 relative">
    <!-- Section header -->
    <div class="max-w-3xl mx-auto text-center mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-3">
          — Empat Pilar yang Tidak Bisa Dipalsukan
        </div>
        <h2 class="font-display text-editorial-md text-cream-50 leading-[0.95] tracking-tight font-bold mb-5">
          Kami Tidak Minta Anda Percaya<br/>
          <em class="text-gold-500">Kata-Kata.</em>
        </h2>
        <p class="font-body text-base md:text-lg text-cream-50/70 leading-relaxed">
          Kami tunjukkan empat pilar yang bisa Anda verifikasi sendiri — secara legal, secara brand, dan secara struktural.
        </p>
      </motion.div>
    </div>

    <!-- 4 pillars grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each pillars as pillar, i}
        <motion.div
          class="relative bg-forest-800/50 border border-gold-500/20 p-6 hover-lift"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div class="w-12 h-12 flex items-center justify-center bg-gold-500/10 border border-gold-500/30 mb-4">
            <svelte:component this={pillar.icon} class="w-5 h-5 text-gold-500" />
          </div>
          <h3 class="font-display text-lg text-cream-50 font-bold leading-tight mb-3">
            {pillar.title}
          </h3>
          <p class="text-sm text-cream-50/70 leading-relaxed mb-4">
            {pillar.sub}
          </p>
          <p class="text-[10px] font-mono uppercase tracking-widest text-gold-500/70 leading-relaxed pt-3 border-t border-gold-500/10">
            <strong class="text-gold-500">Verifikasi:</strong> {pillar.verify}
          </p>
        </motion.div>
      {/each}
    </div>

    <!-- Closing line -->
    <motion.div
      class="text-center max-w-2xl mx-auto mt-14 pt-10 border-t border-cream-50/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p class="font-display italic text-lg md:text-xl text-gold-500 leading-relaxed">
        "Tidak ada janji yang tidak bisa diverifikasi.<br/>
        Tidak ada angka yang tidak bisa dihitung.<br/>
        Tidak ada risiko yang tidak bisa di-mitigasi."
      </p>
    </motion.div>
  </div>
</section>
