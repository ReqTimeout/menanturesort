<script>
  /**
   * PromoHero.svelte — hero khusus /promo
   * Layout: 60/40 — kiri: eyebrow + H1 + sub + countdown + mini form
   * Kanan: hero image dengan badge overlay
   *
   * Story role: Hook + Promise — tangkap atensi dalam 3 detik.
   */
  import { motion } from '@humanspeak/svelte-motion';
  import CountdownTimer from './CountdownTimer.svelte';
  import InlineLeadForm from './InlineLeadForm.svelte';
  import { ArrowRight, ShieldCheck } from 'lucide-svelte';
  import siteData from '@data/site.json';

  let { promo = siteData.promo } = $props();
</script>

<section class="relative bg-forest-900 text-cream-50 overflow-hidden">
  <!-- Decorative orbs -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gold-500/8 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-forest-500/20 rounded-full blur-3xl"></div>
  </div>

  <div class="container-wide py-16 md:py-24 lg:py-28 relative">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      <!-- LEFT: Copy + Countdown + Form -->
      <div class="lg:col-span-7 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <!-- Eyebrow -->
          <div class="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold-500 mb-5 flex flex-wrap items-center gap-2">
            <span>— DIKELOLA SAHID</span>
            <span class="text-gold-500/40">·</span>
            <span>BERSERTIFIKAT SHM</span>
            <span class="text-gold-500/40">·</span>
            <span>16 DARI 74 UNIT</span>
          </div>

          <!-- Headline -->
          <h1 class="font-display leading-[0.95] tracking-[-0.02em] text-editorial-lg font-bold text-cream-50 mb-6">
            Villa Bukit Bandung<br/>
            dengan <em class="text-gold-500">Cicilan Rp 9 Juta</em><br/>
            yang Bekerja Untuk Anda.
          </h1>

          <!-- Sub-headline (3 kalimat) -->
          <p class="font-body text-lg md:text-xl text-cream-50/80 leading-relaxed max-w-2xl mb-7">
            Bayangkan punya villa di puncak Bandung yang bekerja untuk Anda — disewakan, dikelola Sahid Hotel & Resort, menghasilkan passive income Rp 9-15 juta per bulan. Mulai dari Rp 1,2 M, dengan booking fee Rp 5 juta yang 100% refundable. Untuk minggu ini, Anda mendapat bonus Mobil Listrik Baru. Untuk 10 pendaftar pertama.
          </p>

          <!-- Trust micro-row -->
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cream-50/70">
            <span class="inline-flex items-center gap-1.5">
              <ShieldCheck class="w-3 h-3 text-gold-500" />
              SHM
            </span>
            <span class="text-gold-500/40">·</span>
            <span>Sahid 50+ Tahun</span>
            <span class="text-gold-500/40">·</span>
            <span>Booking Rp 5jt Refundable</span>
            <span class="text-gold-500/40">·</span>
            <span>16/74 Unit</span>
          </div>

          <!-- Countdown -->
          <div class="mb-8 max-w-xl">
            <div class="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-2">
              ⏰ Promo berakhir dalam
            </div>
            <CountdownTimer target={promo.deadline} size="lg" />
            <p class="text-xs text-cream-50/60 mt-3">
              Berlaku hingga {promo.deadlineLabel}
            </p>
          </div>
        </motion.div>
      </div>

      <!-- RIGHT: Image + Form (form di bawah image di mobile, di atas image di desktop) -->
      <div class="lg:col-span-5 order-1 lg:order-2">
        <motion.div
          class="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <!-- Hero image -->
          <div class="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-forest-700 mb-6 lg:mb-0">
            <img
              src="/images/hero/hero-aerial-1920.webp"
              srcset="/images/hero/hero-aerial-800.webp 800w, /images/hero/hero-aerial-1280.webp 1280w, /images/hero/hero-aerial-1920.webp 1920w"
              sizes="(max-width: 1024px) 100vw, 40vw"
              alt="Aerial view Menantu Resort — villa produktif di Cicalengka, Bandung Timur"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="w-full h-full object-cover"
            />
            <!-- Overlay badge top-right -->
            <div class="absolute top-4 right-4 bg-danger-500/95 backdrop-blur-sm text-white px-3 py-2 animate-pulse-wa">
              <span class="font-mono text-[10px] uppercase tracking-widest font-bold">⚡ Sisa 16 Unit</span>
            </div>
            <!-- Overlay badge bottom-left -->
            <div class="absolute bottom-4 left-4 bg-cream-50/95 backdrop-blur-sm text-forest-700 px-3 py-2">
              <span class="font-mono text-[10px] uppercase tracking-widest text-gold-700">Cicilan mulai</span>
              <div class="font-display text-lg font-bold leading-none">Rp 9 jt/bln</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <!-- Full-width form below hero (mobile-first: prominent) -->
    <motion.div
      class="mt-12 lg:mt-16 max-w-3xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div class="md:col-span-5">
          <h3 class="font-display text-2xl md:text-3xl text-cream-50 leading-tight font-bold mb-3">
            Klaim <em class="text-gold-500">Promo + Bonus</em><br/>
            Mobil Listrik Sekarang.
          </h3>
          <p class="text-sm text-cream-50/70 leading-relaxed">
            Isi 2 data di bawah. Tim Sahid akan menghubungi Anda via WhatsApp dengan detail lengkap + jadwal survey. Gratis, tanpa komitmen.
          </p>
        </div>
        <div class="md:col-span-7">
          <InlineLeadForm
            heading="Klaim"
            headingItalic="Promo Anda"
            subheading=""
            ctaText="Klaim Promo Anda"
            source="promo_hero"
            value={10000000}
          />
        </div>
      </div>

      <!-- Social proof footer -->
      <p class="text-xs text-cream-50/50 mt-4 text-center md:text-left">
        ⭐ Bergabung dengan 58 investor yang sudah memiliki unit · 12 closing bulan ini
      </p>
    </motion.div>
  </div>
</section>
