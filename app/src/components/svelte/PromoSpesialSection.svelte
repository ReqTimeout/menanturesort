<script lang="ts">
  /**
   * PromoSpesialSection — promo spesial dengan CountdownTimer (V5.2)
   *
   * Layout: 2-column — kiri: copy + countdown, kanan: 2 benefit cards (diskon + bonus)
   * Color: cream + gold accent
   * Narrative: "Promo spesial pembelian bulan ini"
   */
  import { motion } from '@humanspeak/svelte-motion';
  import CountdownTimer from './CountdownTimer.svelte';
  import WhatsAppButton from './WhatsAppButton.svelte';
  import { Gift, Car, Sparkles, Clock } from 'lucide-svelte';
  import { formatDateID } from '@lib/utils';
  import { cn } from '@lib/utils';

  let { promo = {
    title: 'Promo Spesial Pembelian Bulan Ini',
    subtitle: 'Amankan unit terbaik + bonus eksklusif minggu ini',
    discount: 'Rp 200 Juta',
    discountDesc: 'Potongan harga langsung untuk Master Suite & Deluxe',
    bonus: 'Mobil Listrik Baru',
    bonusDesc: 'Bonus langsung untuk 10 pendaftar pertama',
    deadline: '2026-06-30T23:59:59+07:00',
    deadlineLabel: '30 Juni 2026, 23:59 WIB',
    quota: '10 pendaftar pertama',
    sk: 'Berlaku untuk unit Master Suite & Deluxe. Tidak dapat digabung dengan promo lain. S&K berlaku.',
  }, class: className = '' } = $props();
</script>

<section class={cn('gsap-fade section section-cream relative overflow-hidden reveal', className)}>
  <div class="container-wide grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
    <!-- Kiri: copy + countdown -->
    <div class="col-span-1 md:col-span-7">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-danger-100 border border-danger-300 text-danger-800 text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles class="w-3 h-3" />
          <span>Promo Terbatas</span>
        </div>

        <h2 class="font-display text-forest-700 leading-[0.95] tracking-tight font-bold text-editorial-md mb-4">
          {promo?.title || 'Promo Spesial Pembelian Bulan Ini'}
        </h2>

        <p class="font-body text-ink-700 leading-relaxed text-base md:text-lg max-w-2xl mb-8">
          {promo?.subtitle || 'Amankan unit terbaik + bonus eksklusif minggu ini. Pastikan Anda mendapatkan keuntungan besar program promo spesial khusus transaksi di minggu ini.'}
        </p>

        <!-- Countdown -->
        {#if promo?.deadline}
          <div class="mb-8">
            <CountdownTimer
              target={promo.deadline}
              size="lg"
            />
            <p class="text-xs text-ink-700 mt-3 flex items-center gap-1.5">
              <Clock class="w-3 h-3" />
              <span>Berlaku hingga {promo?.deadlineLabel || formatDateID(promo.deadline)}</span>
            </p>
          </div>
        {/if}

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row gap-3">
          <WhatsAppButton ctaId="telepon" variant="secondary" size="lg" extra={`Saya ingin klaim promo ${promo?.discount || 'Rp 200 Juta'} + ${promo?.bonus || 'Mobil Listrik'}.`} />
          <WhatsAppButton ctaId="brosur" variant="outline" size="lg" />
        </div>

        <!-- S&K -->
        <p class="text-xs text-ink-700/70 mt-6 leading-relaxed">
          <strong class="text-forest-700">S&K:</strong> {promo?.sk || 'Berlaku S&K. Kuota: ' + (promo?.quota || '10 pendaftar pertama') + '.'}
        </p>
      </motion.div>
    </div>

    <!-- Kanan: 2 benefit cards -->
    <div class="col-span-1 md:col-span-5 space-y-4">
      <!-- Diskon -->
      <motion.div
        class="relative bg-white border-2 border-gold-500 p-6 hover-lift"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <span class="absolute -top-3 left-6 px-3 py-1 bg-gold-500 text-forest-700 text-xs font-bold uppercase tracking-widest">
          Diskon
        </span>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 flex items-center justify-center bg-gold-50 border border-gold-200 flex-shrink-0">
            <Gift class="w-5 h-5 text-gold-700" />
          </div>
          <div>
            <p class="font-display text-3xl text-forest-700 font-bold leading-none mb-1">
              {promo?.discount || 'Rp 200 Juta'}
            </p>
            <p class="text-sm text-ink-700">
              {promo?.discountDesc || 'Potongan harga langsung untuk unit Master Suite & Deluxe'}
            </p>
          </div>
        </div>
      </motion.div>

      <!-- Bonus -->
      <motion.div
        class="relative bg-white border-2 border-forest-700 p-6 hover-lift"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <span class="absolute -top-3 left-6 px-3 py-1 bg-forest-700 text-gold-500 text-xs font-bold uppercase tracking-widest">
          Bonus
        </span>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 flex items-center justify-center bg-forest-50 border border-forest-200 flex-shrink-0">
            <Car class="w-5 h-5 text-forest-700" />
          </div>
          <div>
            <p class="font-display text-2xl text-forest-700 font-bold leading-tight mb-1">
              {promo?.bonus || 'Mobil Listrik Baru'}
            </p>
            <p class="text-sm text-ink-700">
              {promo?.bonusDesc || 'Bonus langsung untuk 10 pendaftar pertama'}
            </p>
            <p class="text-xs text-gold-700 font-bold mt-2 uppercase tracking-widest">
              Kuota: {promo?.quota || '10 pendaftar pertama'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
