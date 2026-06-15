<script>
  import { motion } from '@humanspeak/svelte-motion';
  import CountUp from './CountUp.svelte';
  import { ArrowRight, TrendingUp, Wallet, PiggyBank } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  const items = [
    { icon: Wallet, label: 'Cicilan KPR / bulan', value: 9, unit: 'jt', color: 'text-forest-700', bg: 'bg-forest-500/10' },
    { icon: TrendingUp, label: 'Passive Income / bulan', value: 15, unit: 'jt', color: 'text-gold-700', bg: 'bg-gold-500/10' },
    { icon: PiggyBank, label: 'Surplus / bulan', value: 6, unit: 'jt', color: 'text-whatsapp', bg: 'bg-whatsapp/10' },
  ];

  const waLink = waUrl(siteData.contact.whatsapp, 'Halo, saya ingin hitung simulasi passive income Menantu Resort.', 'passive_income');
</script>

<section class="bg-white border-y border-cream-100">
  <div class="container-wide py-20 md:py-32">
    <!-- Header -->
    <div class="text-center mb-16">
      <motion.div
        class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >— Passive Income</motion.div>
      <motion.h2
        class="font-display text-forest-700 leading-[0.95] tracking-tight text-editorial-md font-bold mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Dari Rp 9 juta/bulan,<br/>
        <em class="text-gold-700">Anda bisa dapat Rp 15 juta/bulan.</em>
      </motion.h2>
      <motion.p
        class="font-body text-ink-500 leading-relaxed text-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Simulasi konservatif dengan okupansi 50%. Kenyataannya, Sahid rata-rata mencapai 65-75%.
      </motion.p>
    </div>

    <!-- Visual comparison -->
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {#each items as item, i}
          <motion.div
            class="relative p-8 border border-cream-100 text-center group hover:border-gold-300 hover:shadow-lg transition-all duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <!-- Gold accent top -->
            <span class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

            <div class="w-12 h-12 {item.bg} flex items-center justify-center mx-auto mb-4">
              <svelte:component this={item.icon} size={24} class={item.color} />
            </div>
            <div class="font-body text-xs text-ink-500 uppercase tracking-wider mb-3">{item.label}</div>
            <div class="font-display text-5xl md:text-6xl {item.color} font-bold leading-none mb-1">
              <CountUp end={item.value} duration={2}  />
            </div>
            <div class="font-body text-sm text-ink-500">juta / bulan</div>
          </motion.div>
        {/each}
      </div>

      <!-- Bar visual -->
      <motion.div
        class="bg-cream-50 border border-cream-100 p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div class="space-y-4">
          <!-- Cicilan bar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="font-body text-sm text-ink-500">Cicilan KPR</span>
              <span class="font-mono text-sm text-forest-700 font-bold">Rp 9 jt</span>
            </div>
            <div class="h-3 bg-cream-100 overflow-hidden">
              <motion.div
                class="h-full bg-forest-500"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              ></motion.div>
            </div>
          </div>

          <!-- Income bar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="font-body text-sm text-ink-500">Passive Income</span>
              <span class="font-mono text-sm text-gold-700 font-bold">Rp 15 jt</span>
            </div>
            <div class="h-3 bg-cream-100 overflow-hidden">
              <motion.div
                class="h-full bg-gold-500"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              ></motion.div>
            </div>
          </div>

          <!-- Surplus -->
          <div class="pt-4 border-t border-cream-100 flex items-center justify-between">
            <span class="font-body text-sm font-semibold text-forest-700">Surplus bersih</span>
            <span class="font-display text-2xl text-whatsapp font-bold">+Rp 6 jt/bulan</span>
          </div>
        </div>
      </motion.div>

      <!-- CTA -->
      <motion.div
        class="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <a href="/investasi" class="group inline-flex items-center gap-3 px-8 py-4 bg-forest-700 text-cream-50 font-body font-semibold text-sm tracking-wide transition-all hover:bg-forest-500 mr-4">
          Hitung Sendiri
          <ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
        </a>
        <a href={waLink} target="_blank" rel="noopener" class="inline-flex items-center gap-3 px-8 py-4 border border-forest-700 text-forest-700 font-body font-semibold text-sm tracking-wide transition-all hover:bg-forest-700 hover:text-cream-50">
          Konsultasi via WA
        </a>
      </motion.div>
    </div>
  </div>
</section>
