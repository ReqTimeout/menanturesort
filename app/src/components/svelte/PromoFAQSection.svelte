<script>
  /**
   * PromoFAQSection.svelte — 5 critical FAQ dengan storytelling answers
   * Reuse Accordion UI dari lib/components/ui/Accordion.svelte
   */
  import Accordion from '@lib/components/ui/Accordion.svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import { MessageCircle } from 'lucide-svelte';

  const faqs = [
    {
      q: 'Apakah diskon Rp 200 juta benar-benar diberikan? Bukan angka marketing?',
      a: `Ya. Diskon langsung dari harga villa untuk 10 pendaftar pertama, dan kami buktikan dengan tiga lapis bukti.

Pertama, invoice resmi dari developer dengan nomor seri unik yang Anda terima saat booking — menunjukkan harga normal vs harga promo. Kedua, transfer booking fee ke rekening PT Cipta Multikarya Propertindo (bukan rekening pribadi), sehingga tercatat di pembukuan korporat. Ketiga, akad jual-beli di notaris yang menyebutkan secara eksplisit harga yang Anda setujui.

Setelah 30 Juli 2026, harga naik ke schedule baru. Kami tidak bisa menahan harga Q2 untuk pendaftar ke-11. Ini bukan strategi marketing — ini adalah inventory yang terbatas, dan kami transparan tentang itu.`
    },
    {
      q: 'Kapan Mobil Listrik akan diantar? Bagaimana kalau developer ingkar janji?',
      a: `Mobil Listrik di-hand-over maksimal 60 hari kerja setelah akad jual-beli + pelunasan DP 30%. STNK atas nama Anda, BPKB diurus notaris, asuransi all-risk 1 tahun dari developer.

Bagaimana kalau developer ingkar janji? Sederhana — di kontrak tertulis klausul penalty 1% per minggu keterlambatan, dan kami (Sahid sebagai manajemen) akan meng-intervene untuk memastikan kewajiban developer terpenuhi. Reputasi Sahid 50 tahun dipertaruhkan di sini, bukan hanya unit Anda.

Worst case: jika dalam 180 hari tidak ada kejelasan, Anda bisa memilih refund DP 100% + kompensasi tambahan 10%, atau unit equivalent. Semua tertulis di klausul 7 kontrak.`
    },
    {
      q: 'Saya tidak yakin villa saya akan laku disewa. Bagaimana kalau kosong?',
      a: `Pertanyaan yang valid. Mari kita jawab dengan angka, bukan janji.

Okupansi hotel-hotel di kawasan Bandung Timur (Lembang, Ciwidey, Dago) rata-rata 65-75% di high season dan 45-55% di low season. Untuk kawasan Cicalengka — yang masih early stage — proyeksi konservatif di tahun pertama adalah 50%, tahun kedua 60%, tahun ketiga stabil di 65%.

Dengan asumsi 55% rata-rata occupancy × Rp 1,8 juta/hari × 365 hari × 60% (potong operasional + maintenance) = Rp 9-12 juta passive income per tahun, atau sekitar Rp 750rb-1jt per bulan per unit. Ini adalah estimasi konservatif — tanpa memperhitungkan kenaikan tarif 5-8% per tahun.

Tapi karena ini adalah investasi, ada risiko. Sahid tidak menjamin 100% occupancy. Yang kami jamin: laporan bulanan transparan, audit tahunan oleh KAP independen, dan opsi bagi hasil 70% (owner) vs 30% (Sahid). Anda selalu memegang kontrol.`
    },
    {
      q: 'Saya tidak punya DP 30% yang diminta bank. Apakah masih bisa ikut promo?',
      a: `Ada tiga skema pembayaran yang bisa dipilih, dan promo berlaku untuk ketiganya:

**Skema A — KPR Bank:** DP minimum 10% (Rp 100-200 juta tergantung tipe), sisanya di-KPR-kan 15-20 tahun di BNI/BCA/BSI. Syarat: NPWP, slip gaji 3 bulan, BI checking lancar.

**Skema B — KPR Developer:** DP 30% yang bisa di-angsur 6-12 bulan, bunga flat 7% (lebih tinggi dari bank, tapi fleksibel). Syarat: identitas KTP, NPWP opsional, tanpa BI checking. Cocok untuk wirausaha atau yang BI checking-nya belum pulih.

**Skema C — Cash Bertahap:** Booking Rp 5 juta (promo), lalu pelunasan dalam 90 hari dengan diskon tambahan 5%. Cocok untuk yang sudah punya dana tunai.

Promo Rp 200 juta + Mobil Listrik berlaku untuk semua skema. Yang membedakan hanya cara pembayaran, bukan harga akhir.`
    },
    {
      q: 'Kenapa harga pasti naik Q3 2026? Bisa tidak ditunda?',
      a: `Schedule kenaikan harga diumumkan di prospectus developer yang dibagikan ke seluruh calon investor. Ini bukan monopoli — semua developer punya schedule seperti ini, sama seperti harga tiket pesawat, sama seperti harga mobil baru.

Untuk Menantu Resort, schedule kenaikan harga Q3 2026 sudah dikonfirmasi oleh manajemen karena dua hal: (1) progres pembangunan sudah di Q2 2026 dan biaya material naik 8% YoY, dan (2) setelah pool booking Juli-Agustus penuh, harga akan naik ke batch berikutnya.

Apakah bisa "ditunda" dengan menunggu lebih lama? Bisa. Tapi Anda akan kehilangan: lock-harga 90 hari, bonus Mobil Listrik (10 slot pertama), dan subsidi cicilan 36 bulan. Ketiganya adalah program khusus minggu ini, bukan program yang akan diulang.

Pertanyaannya bukan "kapan harus mulai", tapi "berapa banyak nilai yang ingin Anda serahkan ke pendaftar berikutnya".`
    }
  ];
</script>

<section class="relative bg-white overflow-hidden">
  <div class="container-wide py-20 md:py-32">
    <!-- Section header -->
    <div class="max-w-3xl mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-3">
          — Pertanyaan yang Pasti Ada di Kepala Anda
        </div>
        <h2 class="font-display text-editorial-lg text-forest-700 leading-[0.95] tracking-tight font-bold mb-5">
          Lima Pertanyaan<br/>
          yang <em class="text-gold-700">Sering Ditanyakan.</em>
        </h2>
        <p class="font-body text-lg text-ink-700 leading-relaxed">
          Kalau Anda punya pertanyaan lain, chat langsung Tim Sahid — respon dalam 5 menit.
        </p>
      </motion.div>
    </div>

    <!-- FAQ list -->
    <motion.div
      class="max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <Accordion items={faqs} />
    </motion.div>

    <!-- Footer link -->
    <div class="max-w-3xl mt-12 pt-8 border-t border-cream-100 text-center">
      <p class="text-sm text-ink-700">
        Punya pertanyaan lain?
        <a href="/faq" class="text-gold-700 hover:text-forest-700 font-semibold ml-1 underline">
          Lihat 24 FAQ lengkap →
        </a>
      </p>
    </div>
  </div>
</section>
