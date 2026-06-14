<script>
  import { MessageCircle, Calendar, Phone, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let { villa, images = [], badges = [] } = $props();

  let activeImage = $state(0);

  function next() { activeImage = (activeImage + 1) % images.length; }
  function prev() { activeImage = (activeImage - 1 + images.length) % images.length; }

  const waLink = waUrl(siteData.contact.whatsapp, `Halo, saya tertarik dengan ${villa.name}.`, `villa_hero_${villa.id}`);
</script>

<section class="relative section-cream pt-32 pb-20 overflow-hidden">
  <div class="container-wide">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- LEFT: Copy -->
      <div>
        {#if villa.taglineShort}
          <span class="eyebrow text-forest-500 mb-3 block">{villa.taglineShort}</span>
        {/if}
        <h1 class="font-display text-display text-forest-700 leading-[1.0] mb-4 tracking-tight">
          {villa.name}
        </h1>
        <p class="font-quote italic text-2xl text-ink-500 mb-6">"{villa.tagline}"</p>

        <div class="font-mono text-4xl md:text-5xl text-forest-500 mb-2 font-bold">{villa.priceDisplay}</div>
        <div class="text-sm text-ink-500 mb-8 flex items-center gap-2">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-whatsapp"></span>
          Booking fee Rp 10 juta (lock harga, refundable 30 hari)
        </div>

        <div class="flex flex-wrap gap-3">
          <a href={waLink} target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
            <MessageCircle size="18" />
            Tanya Tipe Ini
          </a>
          <a href="/kontak" class="btn btn-outline btn-lg">
            <Calendar size="18" />
            Jadwalkan Kunjungan
          </a>
        </div>

        {#if badges.length}
          <div class="mt-10 pt-8 border-t border-cream-100 grid grid-cols-3 gap-6">
            {#each badges as b}
              <div>
                <div class="font-display text-2xl text-forest-700 font-bold leading-none">{b.value}</div>
                <div class="font-body text-xs text-ink-500 uppercase tracking-wider mt-1">{b.label}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- RIGHT: Image gallery -->
      <div class="relative">
        <div class="relative aspect-[4/3] overflow-hidden border border-cream-100 bg-cream-100">
          {#each images as img, i}
            <img
              src={img}
              alt={`${villa.name} — view ${i + 1}`}
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              class:opacity-100={activeImage === i}
              class:opacity-0={activeImage !== i}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          {/each}
          <span class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></span>

          {#if images.length > 1}
            <button onclick={prev} class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-forest-700 flex items-center justify-center transition-colors backdrop-blur-sm" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button onclick={next} class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-forest-700 flex items-center justify-center transition-colors backdrop-blur-sm" aria-label="Next">
              <ChevronRight size={20} />
            </button>
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {#each images as _, i}
                <button onclick={() => (activeImage = i)} class="h-1 transition-all duration-500" class:w-8={activeImage === i} class:w-4={activeImage !== i} class:bg-gold-500={activeImage === i} class:bg-white={activeImage !== i} aria-label={`Image ${i + 1}`}></button>
              {/each}
            </div>
          {/if}
        </div>
        {#if images.length > 1}
          <div class="grid grid-cols-4 gap-2 mt-2">
            {#each images as img, i}
              <button onclick={() => (activeImage = i)} class="aspect-[4/3] overflow-hidden border-2 transition-all" class:border-gold-500={activeImage === i} class:border-cream-100={activeImage !== i}>
                <img src={img} alt="" class="w-full h-full object-cover" loading="lazy" />
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
