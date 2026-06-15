<script lang="ts">
  /**
   * FinalCTASection — final closing CTA (V5.2)
   *
   * Layout: dark bg dengan pattern, 2-column dengan copy besar + live activity
   * Color: forest-700 bg
   * Narrative: "Masa depan Anda dimulai dari keputusan hari ini"
   */
  import { motion } from '@humanspeak/svelte-motion';
  import LiveActivityTicker from './LiveActivityTicker.svelte';
  import WhatsAppButton from './WhatsAppButton.svelte';
  
  import { Calendar, Wallet, LineChart, Shield, ArrowUpRight } from 'lucide-svelte';
  import { cn } from '@lib/utils';

  let {
    liveEvents = [],
    promoDeadline = '2026-06-30T23:59:59+07:00',
    class: className = '',
  } = $props();
</script>

<section class={cn('relative bg-forest-700 text-cream-50 grain overflow-hidden reveal', className)}>
  <div class="container-wide py-24 md:py-40 relative z-10">
    <div class="grid grid-cols-12 gap-8">
      <!-- Kiri: section number -->
      <div class="col-span-12 md:col-span-2">
        <motion.div
                    transition={{ duration: 0.6 }}
        >
          <div class="font-mono text-xs uppercase tracking-widest text-gold-500">— Closing</div>
          <div class="font-display text-7xl text-gold-500/20 numeral leading-none mt-2">11</div>
        </motion.div>
      </div>

      <!-- Kanan: main content -->
      <div class="col-span-12 md:col-span-10">
        <motion.h2
          class="font-display text-cream-50 leading-[0.92] tracking-tight mb-10 text-editorial-lg font-bold"
                    transition={{ duration: 0.8 }}
        >
          Masa depan Anda<br/>
          <em class="text-gold-500 font-medium">dimulai dari keputusan</em><br/>
          hari ini.
        </motion.h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <!-- Copy -->
          <motion.p
            class="font-body text-cream-50/80 leading-relaxed text-lg"
                        transition={{ duration: 0.6, delay: 0.2 }}
          >
            74 unit, <strong class="text-gold-500">58 sudah terjual</strong>. Sisa 16 unit untuk Anda yang berpikir jangka panjang.
            Survei gratis, termasuk transport dari Bandung.
            <span class="block mt-3 text-gold-500 font-semibold">
              Promo khusus minggu ini: diskon Rp 200 juta + bonus mobil listrik untuk unit terpilih.
            </span>
          </motion.p>

          <!-- Benefits list -->
          <motion.ul
            class="space-y-3"
                        transition={{ duration: 0.6, delay: 0.3 }}
          >
            <li class="flex items-center gap-3 text-sm text-cream-50/80">
              <Calendar size={16} class="text-gold-500 flex-shrink-0" />
              <span>Survei include transport dari Bandung</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-cream-50/80">
              <Wallet size={16} class="text-gold-500 flex-shrink-0" />
              <span>Booking fee Rp 10 juta (refundable 100%)</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-cream-50/80">
              <LineChart size={16} class="text-gold-500 flex-shrink-0" />
              <span>Konsultan wealth management available</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-cream-50/80">
              <Shield size={16} class="text-gold-500 flex-shrink-0" />
              <span>SHM clean & clear, atas nama pribadi</span>
            </li>
          </motion.ul>
        </div>



        <!-- CTAs -->
        <motion.div
          class="flex flex-wrap gap-4 mb-10"
                    transition={{ duration: 0.6, delay: 0.5 }}
        >
          <WhatsAppButton
            ctaId="survei"
            variant="secondary"
            size="lg"
            showIcon={true}
            showArrow={true}
          />
          <a
            href="/villa"
            class="btn btn-outline-light btn-lg group"
          >
            Lihat 3 Villa
            <ArrowUpRight class="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        <!-- Live activity ticker -->
        {#if liveEvents.length > 0}
          <motion.div
            class="max-w-2xl"
                        transition={{ duration: 0.6, delay: 0.6 }}
          >
            <LiveActivityTicker events={liveEvents} interval={6000} />
          </motion.div>
        {/if}
      </div>
    </div>
  </div>
</section>
