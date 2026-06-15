<script>
  import { motion } from '@humanspeak/svelte-motion';
  import { Award, Hotel, Calendar, Users, TrendingUp } from 'lucide-svelte';

  const hotels = [
    { name: 'Grand Sahid Jaya', city: 'Jakarta', tag: 'Flagship' },
    { name: 'Sahid Resort & Convention', city: 'Yogyakarta', tag: 'Resort' },
    { name: 'Sahid Serpong', city: 'BSD', tag: 'Integrated' },
    { name: 'Sahid Hotel Skyland City', city: 'Jatinangor', tag: 'Student Hub' },
    { name: 'Sahid Prince Solo', city: 'Solo', tag: 'Heritage' },
    { name: 'Grand Sahid Jaya Solo', city: 'Solo', tag: 'Premium' },
    { name: 'Sahid Batam Hotel & Convention', city: 'Batam', tag: 'MICE' },
    { name: 'Sahid Raya Hotel & Convention', city: 'Yogyakarta', tag: 'MICE' },
  ];

  const stats = [
    { k: '50+', l: 'Tahun Beroperasi', sub: 'Sejak 1974' },
    { k: '20+', l: 'Properti Aktif', sub: 'Hotel, resort, MICE' },
    { k: '4,500+', l: 'Kamar Dikelola', sub: 'Standar bintang 5' },
    { k: '4.5/5', l: 'Guest Rating', sub: 'Rata-rata platform' },
  ];
</script>

<section class="bg-cream-50 py-20 md:py-32 relative overflow-hidden" data-section="pedigree">
  <!-- Topographic bg pattern -->
  <div class="absolute inset-0 opacity-[0.4] pointer-events-none" style="background-image: radial-gradient(ellipse 80% 50% at 50% 50%, transparent 50%, rgba(27, 67, 50, 0.04) 100%);"></div>

  <div class="container-wide relative">
    <div class="grid grid-cols-12 gap-8 mb-16">
      <div class="col-span-12 md:col-span-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          class="font-mono text-xs uppercase tracking-widest text-gold-700"
        >
          — Why Sahid
        </motion.div>
      </div>
      <div class="col-span-12 md:col-span-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          class="font-display text-forest-700 leading-[0.95] tracking-tight text-editorial-md font-bold"
        >
          Villa Anda akan diurus oleh tim yang sudah
          <em class="text-gold-700">mengelola 20+ hotel</em>
          di Indonesia.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          class="font-body text-ink-500 leading-relaxed mt-6 max-w-2xl text-lg"
        >
          Ini bukan wangsit. Ini <strong class="text-forest-700">track record 50 tahun</strong> dari grup hospitality yang sama dengan jaringan Sahid Hotels & Resorts — group yang sudah Anda kenal, mungkin sudah Anda pernah menginap di salah satu propertinya.
        </motion.p>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-100 border border-cream-100 mb-16">
      {#each stats as s, i}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          class="bg-white p-8 relative group hover:bg-cream-50 transition-colors"
        >
          <div class="absolute top-4 right-4 font-mono text-[10px] text-cream-100 group-hover:text-gold-500/50 transition-colors">0{i + 1}</div>
          <div class="font-display text-6xl text-forest-700 font-bold leading-none mb-3">{s.k}</div>
          <div class="font-body text-sm font-semibold text-forest-700 mb-1">{s.l}</div>
          <div class="font-body text-xs text-ink-500">{s.sub}</div>
        </motion.div>
      {/each}
    </div>

    <!-- Hotel list -->
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-6"
      >
        — Jaringan Sahid yang Mengelola Vila Anda
      </motion.div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream-100 border border-cream-100">
        {#each hotels as h, i}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            class="group bg-white p-5 transition-all hover:bg-cream-50 cursor-default"
          >
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="font-mono text-[10px] text-ink-500">0{i + 1}</div>
              <span class="px-2 py-0.5 bg-forest-500/10 text-forest-500 text-[9px] font-mono uppercase tracking-widest">{h.tag}</span>
            </div>
            <div class="font-display text-base text-forest-700 font-bold leading-tight mb-1">{h.name}</div>
            <div class="font-body text-xs text-ink-500">{h.city}</div>
          </motion.div>
        {/each}
      </div>
    </div>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
      class="font-body text-sm text-ink-500 mt-12 max-w-3xl italic"
    >
      Yang mengelola vila Anda setiap hari adalah tim operasional <strong class="text-forest-700">berpengalaman 50+ tahun</strong> dengan track record bintang 5. Bukan abal-abal. Bukan outsourced.
    </motion.p>
  </div>
</section>
