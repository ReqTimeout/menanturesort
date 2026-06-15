<script>
  import { onMount } from 'svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import { Search, Home, FileCheck, Banknote, PartyPopper } from 'lucide-svelte';

  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Survei Gratis',
      desc: 'Kami jemput dari Bandung. Anda keliling kawasan, lihat langsung unit yang tersedia, rasakan atmosfer resort.',
      detail: 'Include transport dari Bandung, makan siang, dan konsultasi personal dengan tim Sahid.',
    },
    {
      num: '02',
      icon: Home,
      title: 'Pilih Unit',
      desc: 'Bijak (1,2M), Idaman (1,6M), atau Mapan (2M). Setiap unit punya karakter dan cashflow berbeda.',
      detail: 'Tim kami bantu analisis profil finansial Anda untuk rekomendasi unit terbaik.',
    },
    {
      num: '03',
      icon: FileCheck,
      title: 'Booking & KPR',
      desc: 'Booking fee Rp 10 juta (refundable). Proses KPR dibantu dari A sampai Z.',
      detail: 'Kerja sama dengan BNI, BCA, BSI. approval cepat, DP fleksibel.',
    },
    {
      num: '04',
      icon: Banknote,
      title: 'Cicilan Dimulai',
      desc: 'KPR aktif, cicilan mulai Rp 9 juta/bulan. Sementara villa sudah mulai disiapkan.',
      detail: 'Proses bangun 12-18 bulan. Cicilan ringan karena dibagi panjang.',
    },
    {
      num: '05',
      icon: PartyPopper,
      title: 'Terima Income',
      desc: 'Villa selesai, langsung operasional. Passive income Rp 9-15 juta/bulan masuk rekening.',
      detail: 'Sahid mengelola semuanya. Anda tinggal terima laporan bulanan.',
    },
  ];

  let sectionEl;
  let activeStep = $state(0);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.step);
            if (!isNaN(idx)) activeStep = idx;
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    );

    const stepEls = sectionEl?.querySelectorAll('[data-step]');
    stepEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionEl} class="reveal bg-forest-700 text-cream-50 relative overflow-hidden">
  <!-- Grid pattern bg -->
  <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: linear-gradient(rgba(245, 240, 232, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 240, 232, 0.5) 1px, transparent 1px); background-size: 80px 80px;"></div>

  <div class="container-wide py-20 md:py-32 relative z-10">
    <!-- Header -->
    <div class="grid grid-cols-12 gap-8 mb-16">
      <div class="col-span-12 md:col-span-4">
        <motion.div
          class="sticky top-32"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-4">— Cara Kerja</div>
          <h2 class="font-display text-5xl md:text-6xl text-cream-50 leading-[0.95] mb-6">
            Dari survei<br/>sampai income,<br/><em class="text-gold-500">5 langkah.</em>
          </h2>
          <p class="font-body text-cream-50/70 leading-relaxed">
            Proses yang dirancang untuk memudahkan Anda. Tidak ada biaya tersembunyi, tidak ada kejutan.
          </p>
        </motion.div>
      </div>

      <!-- Steps -->
      <div class="col-span-12 md:col-span-8">
        <div class="space-y-0">
          {#each steps as step, i}
            <div
              data-step={i}
              class="relative border-l-2 {activeStep >= i ? 'border-gold-500' : 'border-cream-50/20'} transition-colors duration-500 pl-8 py-8"
            >
              <!-- Dot indicator -->
              <div class="absolute left-[-9px] top-8 w-4 h-4 rounded-full border-2 {activeStep >= i ? 'bg-gold-500 border-gold-500' : 'bg-forest-700 border-cream-50/30'} transition-all duration-500"></div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                class="{activeStep === i ? 'opacity-100' : 'opacity-60'} transition-opacity duration-500"
              >
                <div class="flex items-center gap-4 mb-3">
                  <span class="font-mono text-xs text-gold-500 uppercase tracking-widest">{step.num}</span>
                  <svelte:component this={step.icon} size={20} class="text-gold-500" />
                </div>
                <h3 class="font-display text-2xl md:text-3xl text-cream-50 font-bold mb-2">{step.title}</h3>
                <p class="font-body text-cream-50/70 leading-relaxed mb-2">{step.desc}</p>
                {#if activeStep === i}
                  <motion.p
                    class="font-body text-sm text-gold-500/80 italic"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >{step.detail}</motion.p>
                {/if}
              </motion.div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
