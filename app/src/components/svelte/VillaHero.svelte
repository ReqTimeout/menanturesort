<script>
  import { onMount } from 'svelte';
  import { motion } from '@humanspeak/svelte-motion';
  import { MessageCircle, Calendar, Phone, ChevronLeft, ChevronRight, Expand } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let { villa, images = [], badges = [] } = $props();

  let activeImage = $state(0);
  let isLoaded = $state(false);

  function next() { activeImage = (activeImage + 1) % images.length; }
  function prev() { activeImage = (activeImage - 1 + images.length) % images.length; }

  const waLink = waUrl(siteData.contact.whatsapp, `Halo, saya tertarik dengan ${villa.name}.`, `villa_hero_${villa.id}`);

  onMount(() => {
    isLoaded = true;
  });
</script>

<section class="relative section-cream pt-8 md:pt-12 pb-12 md:pb-20 overflow-hidden">
  <!-- Background gradient + SVG pattern -->
  <div class="absolute inset-0 bg-gradient-to-b from-cream-50 to-cream-100/50"></div>
  <div class="absolute inset-0 opacity-[0.08]" style="background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%231B4332'/%3E%3C/svg%3E&quot;);background-size:24px 24px"></div>

  <div class="container-wide relative">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- LEFT: Copy -->
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {#if villa.taglineShort}
            <span class="eyebrow text-forest-500 mb-3 block">{villa.taglineShort}</span>
          {/if}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          class="font-display text-display text-forest-700 leading-[1.0] mb-4 tracking-tight"
        >
          {villa.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          class="font-quote italic text-2xl text-ink-500 mb-6"
        >
          "{villa.tagline}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          class="font-mono text-4xl md:text-5xl text-forest-500 mb-2 font-bold"
        >
          {villa.priceDisplay}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          class="text-sm text-ink-500 mb-8 flex items-center gap-2"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-whatsapp"></span>
          Booking fee Rp 10 juta (lock harga, refundable 30 hari)
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          class="flex flex-wrap gap-3"
        >
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            class="btn btn-whatsapp btn-lg"
          >
            <MessageCircle size="18" />
            Tanya Tipe Ini
          </motion.a>
          <motion.a
            href="/kontak"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            class="btn btn-outline btn-lg"
          >
            <Calendar size="18" />
            Jadwalkan Kunjungan
          </motion.a>
        </motion.div>

        {#if badges.length}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            class="mt-10 pt-8 border-t border-cream-100 grid grid-cols-3 gap-6"
          >
            {#each badges as b, i}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <div class="font-display text-2xl text-forest-700 font-bold leading-none">{b.value}</div>
                <div class="font-body text-xs text-ink-500 uppercase tracking-wider mt-1">{b.label}</div>
              </motion.div>
            {/each}
          </motion.div>
        {/if}
      </div>

      <!-- RIGHT: Image gallery -->
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        class="relative"
      >
        <div class="relative aspect-[4/3] overflow-hidden border border-cream-100 bg-cream-100">
          {#each images as img, i}
            <motion.img
              src={img}
              alt={`${villa.name} — view ${i + 1}`}
              class="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeImage === i ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          {/each}
          <span class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></span>

          {#if images.length > 1}
            <motion.button
              onclick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-forest-700 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onclick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-forest-700 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </motion.button>
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {#each images as _, i}
                <button
                  onclick={() => (activeImage = i)}
                  class="h-1 transition-all duration-500 {activeImage === i ? 'w-8 bg-gold-500' : 'w-4 bg-white'}"
                  aria-label={`Image ${i + 1}`}
                ></button>
              {/each}
            </div>
          {/if}
        </div>

        {#if images.length > 1}
          <div class="grid grid-cols-4 sm:grid-cols-4 gap-2 mt-2 overflow-x-auto">
            {#each images as img, i}
              <motion.button
                onclick={() => (activeImage = i)}
                whileHover={{ scale: 1.05 }}
                class="aspect-[4/3] overflow-hidden border-2 transition-all {activeImage === i ? 'border-gold-500' : 'border-cream-100'}"
              >
                <img src={img} alt="" class="w-full h-full object-cover" loading="lazy" />
              </motion.button>
            {/each}
          </div>
        {/if}
      </motion.div>
    </div>
  </div>
</section>
