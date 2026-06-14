<script>
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { onMount } from 'svelte';
  import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import siteData from '../../data/site.json';

  let emblaApi;
  let selectedIndex = $state(0);
  let scrollSnaps = $state([]);
  let canScrollPrev = $state(false);
  let canScrollNext = $state(true);

  function onInit(event) {
    emblaApi = event.detail;
    scrollSnaps = emblaApi.scrollSnapList();
    emblaApi.on('select', () => {
      selectedIndex = emblaApi.selectedScrollSnap();
      canScrollPrev = emblaApi.canScrollPrev();
      canScrollNext = emblaApi.canScrollNext();
    });
  }

  function scrollPrev() { emblaApi?.scrollPrev(); }
  function scrollNext() { emblaApi?.scrollNext(); }
  function scrollTo(i) { emblaApi?.scrollTo(i); }

  // Auto-advance
  onMount(() => {
    const id = setInterval(() => {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 6000);
    return () => clearInterval(id);
  });
</script>

<section class="bg-cream-50 py-20 md:py-32">
  <div class="container-tight">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-3 mb-4">
        <span class="h-px w-12 bg-gold-500"></span>
        <span class="eyebrow">Suara Investor</span>
        <span class="h-px w-12 bg-gold-500"></span>
      </div>
      <h2 class="font-display text-4xl md:text-5xl text-forest-700 leading-[1.05] mb-4">
        Mereka Sudah <em>Mapan.</em>
      </h2>
      <p class="font-body text-ink-500 max-w-xl mx-auto">
        Testimoni nyata dari investor yang telah mempercayakan passive income-nya kepada kami.
      </p>
    </div>

    <div class="relative">
      <div class="overflow-hidden" use:emblaCarouselSvelte={{ options: { loop: true, align: 'start' }, onInit }}>
        <div class="flex">
          {#each siteData.testimonials as t, i}
            <div class="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
              <article class="relative h-full bg-white p-8 border border-cream-100 hover:border-gold-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <Quote class="absolute top-6 right-6 text-gold-500/15" size={56} strokeWidth={1} />
                <div class="flex gap-1 mb-4">
                  {#each Array(5) as _, si}
                    <Star size={14} class="text-gold-500" fill="currentColor" />
                  {/each}
                </div>
                <p class="font-body text-ink-500 leading-relaxed mb-6 relative z-[1]">
                  "{t.text}"
                </p>
                <div class="pt-6 border-t border-cream-100">
                  <div class="font-display text-forest-700 text-lg font-bold leading-tight">{t.name}</div>
                  <div class="font-body text-xs text-ink-500 mt-1">{t.role} · {t.location}</div>
                </div>
                <span class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></span>
              </article>
            </div>
          {/each}
        </div>
      </div>

      <!-- Arrows -->
      <button onclick={scrollPrev} disabled={!canScrollPrev} class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 items-center justify-center w-12 h-12 bg-white border border-cream-100 text-forest-700 hover:bg-forest-700 hover:text-cream-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button onclick={scrollNext} disabled={!canScrollNext} class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 items-center justify-center w-12 h-12 bg-white border border-cream-100 text-forest-700 hover:bg-forest-700 hover:text-cream-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Next">
        <ChevronRight size={20} />
      </button>
    </div>

    <!-- Dots -->
    <div class="flex items-center justify-center gap-2 mt-10">
      {#each scrollSnaps as _, i}
        <button
          onclick={() => scrollTo(i)}
          class="h-1 transition-all duration-500"
          class:w-12={selectedIndex === i}
          class:w-6={selectedIndex !== i}
          class:bg-gold-500={selectedIndex === i}
          class:bg-cream-100={selectedIndex !== i}
          aria-label="Go to slide {i + 1}"
        ></button>
      {/each}
    </div>
  </div>
</section>
