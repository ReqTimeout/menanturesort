<script>
  import { motion } from '@humanspeak/svelte-motion';
  import CountUp from './CountUp.svelte';
  import { Shield, TrendingUp, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-svelte';

  const stats = [
    { icon: Building2, value: 74, suffix: '', label: 'Unit Villa SHM', sub: '3 tipe premium' },
    { icon: Users, value: 58, suffix: '', label: 'Sudah Terjual', sub: '78% sold out' },
    { icon: TrendingUp, value: 10, suffix: '%', label: 'ROI Guarantee', sub: '2 tahun pertama' },
    { icon: Shield, value: 50, suffix: '+', label: 'Tahun Sahid', sub: 'Hospitality terpercaya' },
  ];

  const benefits = [
    { icon: CheckCircle2, title: 'SHM Bersih', desc: 'Sertifikat Hak Milik atas nama pribadi, bukan hak pakai. Aset sejuta umat yang nilainya terus naik.' },
    { icon: CheckCircle2, title: 'Dikelola Sahid', desc: 'Tim profesional 50+ tahun mengelola harian. Anda tinggal terima passive income.' },
    { icon: CheckCircle2, title: 'Cashflow Positif', desc: 'Cicilan KPR lebih kecil dari passive income. Dari hari 1 sudah surplus.' },
  ];
</script>

<section class="reveal bg-cream-50 grain-light relative overflow-hidden">
  <!-- Pattern + animated gradient -->
  <div class="absolute inset-0 pattern-dots opacity-30 pointer-events-none"></div>
  <div
    class="absolute inset-0 animate-hero-gradient pointer-events-none"
    style="background: linear-gradient(135deg, rgba(212, 165, 116, 0.05) 0%, transparent 50%, rgba(27, 67, 50, 0.04) 100%);"
  ></div>

  <div class="container-wide py-14 md:py-24 relative z-10">
    <!-- Eyebrow -->
    <div class="text-center mb-16">
      <motion.div
        class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >— Janji Kami</motion.div>
      <motion.h2
        class="font-display text-forest-700 leading-[0.95] tracking-tight text-editorial-md font-bold"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Bukan janji kosong.<br/>
        <em class="text-gold-700">Buktinya di angka.</em>
      </motion.h2>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
      {#each stats as s, i}
        <motion.div
          class="bg-white border border-cream-100 p-6 md:p-8 text-center group hover:border-gold-300 hover:shadow-lg transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <svelte:component this={s.icon} size={28} class="text-gold-500 mb-4 mx-auto group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
          <div class="font-display text-4xl md:text-5xl text-forest-700 font-bold leading-none mb-2">
            <CountUp end={s.value} suffix={s.suffix} duration={2}  />
          </div>
          <div class="font-body text-sm font-semibold text-forest-700 uppercase tracking-wider mb-1">{s.label}</div>
          <div class="font-body text-xs text-ink-500">{s.sub}</div>
        </motion.div>
      {/each}
    </div>

    <!-- Benefit cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each benefits as b, i}
        <motion.div
          class="bg-white border border-cream-100 p-8 relative group hover:border-gold-300 hover:shadow-lg transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <!-- Gold accent top -->
          <span class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

          <svelte:component this={b.icon} size={24} class="text-gold-500 mb-4" strokeWidth={2} />
          <h3 class="font-display text-xl text-forest-700 font-bold mb-3">{b.title}</h3>
          <p class="font-body text-sm text-ink-500 leading-relaxed">{b.desc}</p>
        </motion.div>
      {/each}
    </div>

    <!-- CTA -->
    <motion.div
      class="text-center mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <a href="#villa-types" class="group inline-flex items-center gap-3 px-8 py-4 bg-forest-700 text-cream-50 font-body font-semibold text-sm tracking-wide transition-all hover:bg-forest-500">
        Lihat 3 Tipe Villa
        <ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  </div>
</section>
