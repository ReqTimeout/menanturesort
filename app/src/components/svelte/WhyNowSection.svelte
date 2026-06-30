<script>
  /**
   * WhyNowSection.svelte — 3 alasan kenapa booking sekarang (storytelling)
   * Layout: 3 stacked rows, alternating image/copy (zigzag)
   * Style: cream/white alternating sections
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { TrendingUp, Users, Wallet } from 'lucide-svelte';

  const blocks = [
    {
      icon: TrendingUp,
      eyebrow: '01 — DATA PASAR',
      title: 'Harga Properti Tidak Pernah Turun. Hanya Naik, dan Naik Lagi.',
      body: [
        'Sejak 2024, harga properti Bandung Timur sudah naik 28% year-on-year. Cicalengka — yang dulu dianggap "pinggiran" — kini menjadi incaran berkat tol Cisumdawu, bandara Kertajati, dan hadirnya brand-brand besar.',
        'Untuk Q3 2026, harga Master Suite di Menantu Resort diproyeksikan naik Rp 150-300 juta. Ini bukan tebakan. Ini adalah schedule harga yang sudah diumumkan developer di prospectus resmi, sama seperti kenaikan tiket pesawat setiap musim liburan.',
        'Booking hari ini mengunci harga Q2 2026. Bukan janji, tapi kontrak: jika dalam 90 hari harga naik, Anda tetap dapat harga hari ini. Jika dalam 90 hari Anda berubah pikiran, booking fee 100% kembali. Ini satu-satunya cara untuk "memiliki" harga masa lalu.'
      ],
      image: '/images/villa/mapan/hero-detail.jpeg',
      imageAlt: 'Villa Mapan — flagship di Menantu Resort',
      bg: 'bg-white'
    },
    {
      icon: Users,
      eyebrow: '02 — POOL DEMAND',
      title: 'Sahid Baru Saja Membuka Pool Booking High-Season.',
      body: [
        'Sahid Hotel & Resort, brand yang sudah mengelola 20+ hotel dan 50+ tahun reputasi, baru saja membuka pool booking khusus untuk musim high-season Juli-Agustus 2026.',
        'Ini artinya dua hal. Pertama, ada pool tamu (Sahid network) yang sudah di-incaran untuk入住 di villa-villa ini — passive income Anda tidak "dicari" dari nol, tapi sudah ada demand yang menunggu. Kedua, 10 pendaftar pertama otomatis masuk priority list Sahid — dan mendapat bonus Mobil Listrik Baru yang tidak akan diulang untuk batch berikutnya.',
        'Ini bukan program yang akan jalan setiap bulan. Ini momen yang diciptakan satu kali untuk menarik 10 investor paling cepat.'
      ],
      image: '/images/interior/hero/bathroom-bathtub.jpg',
      imageAlt: 'Interior villa Menantu Resort',
      bg: 'bg-cream-50'
    },
    {
      icon: Wallet,
      eyebrow: '03 — SUBSIDI DEV',
      title: 'Subsidi Cicilan 36 Bulan. Efeknya Seperti Bunga Bank Minus.',
      body: [
        'Developer menyediakan subsidi cicilan untuk 36 bulan pertama khusus minggu ini. Cicilan Anda turun dari estimasi Rp 12 juta menjadi Rp 9 juta per bulan.',
        'Artinya selama 3 tahun pertama, Anda membayar Rp 3 juta lebih sedikit per bulan. Total penghematan: Rp 108 juta. Itu setara dengan menyewa satu unit apartemen 2BR di Jakarta selama 3 tahun — gratis.',
        'Setelah 36 bulan, cicilan kembali ke schedule normal. Tapi di saat itu, passive income dari unit Anda sudah berjalan, dan surplus cashflow sudah positif. Anda memulai dari titik yang sudah di-advance oleh developer — sesuatu yang tidak akan Anda dapat di promo berikutnya.'
      ],
      image: '/images/interior/hero/kitchen-sink.jpg',
      imageAlt: 'Kitchen interior villa',
      bg: 'bg-white'
    }
  ];
</script>

<section class="relative bg-cream-50 overflow-hidden">
  <div class="container-wide py-20 md:py-32 relative">
    <!-- Section header -->
    <div class="max-w-3xl mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-3">
          — Kenapa Sekarang, Bukan Nanti
        </div>
        <h2 class="font-display text-editorial-lg text-forest-700 leading-[0.95] tracking-tight font-bold mb-5">
          Tiga Alasan Anda Tidak Boleh<br/>
          Menunda Sampai <em class="text-gold-700">"Besok."</em>
        </h2>
        <p class="font-body text-lg text-ink-700 leading-relaxed">
          Kalau Anda sudah membaca sampai sini, Anda sudah melewati 80% pengunjung yang langsung menutup halaman. Ada tiga alasan kenapa momen ini — bukan besok, bukan bulan depan, bukan setelah "nanti mikir dulu" — adalah momen yang tepat.
        </p>
      </motion.div>
    </div>

    <!-- 3 Zigzag Blocks -->
    <div class="space-y-20 md:space-y-32">
      {#each blocks as block, i}
        <motion.div
          class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center {block.bg} -mx-6 px-6 md:mx-0 md:px-0 py-12 md:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <!-- Image (alternating sides) -->
          <div class="col-span-1 md:col-span-6 {i % 2 === 0 ? 'md:order-1' : 'md:order-2'}">
            <div class="relative aspect-[4/3] overflow-hidden bg-forest-50 group">
              <img
                src={block.image}
                alt={block.imageAlt}
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4 bg-forest-900/90 backdrop-blur-sm text-cream-50 px-3 py-2">
                <span class="font-mono text-xs uppercase tracking-widest">{block.eyebrow}</span>
              </div>
            </div>
          </div>

          <!-- Copy (alternating sides) -->
          <div class="col-span-1 md:col-span-6 {i % 2 === 0 ? 'md:order-2' : 'md:order-1'}">
            <div class="inline-flex items-center gap-2 mb-4">
              <div class="w-10 h-10 flex items-center justify-center bg-gold-500/10 border border-gold-500/30">
                <svelte:component this={block.icon} class="w-5 h-5 text-gold-700" />
              </div>
              <span class="font-mono text-[10px] uppercase tracking-widest text-gold-700">
                Alasan #{i + 1}
              </span>
            </div>

            <h3 class="font-display text-3xl md:text-4xl text-forest-700 leading-[1.05] tracking-tight font-bold mb-5">
              {block.title}
            </h3>

            <div class="space-y-4 text-base text-ink-700 leading-relaxed">
              {#each block.body as paragraph}
                <p>{paragraph}</p>
              {/each}
            </div>
          </div>
        </motion.div>
      {/each}
    </div>

    <!-- Closing line -->
    <motion.div
      class="text-center max-w-2xl mx-auto mt-20 md:mt-32"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p class="font-display italic text-xl md:text-2xl text-gold-700 leading-relaxed">
        "Tiga alasan ini tidak berlaku selamanya.<br/>
        Setelah 30 Juli 2026, harga naik, bonus hangus, subsidi kembali normal."
      </p>
    </motion.div>
  </div>
</section>
