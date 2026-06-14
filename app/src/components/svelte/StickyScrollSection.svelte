<script>
  import { onMount } from 'svelte';
  import { Check } from 'lucide-svelte';

  let { steps = [] } = $props();

  let sectionEl;
  let activeIndex = $state(0);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step'));
            if (!Number.isNaN(idx)) activeIndex = idx;
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    const stepEls = sectionEl?.querySelectorAll('[data-step]');
    stepEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionEl} class="bg-white">
  <div class="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-20 md:py-32">
    <!-- Sticky left -->
    <div class="lg:col-span-5">
      <div class="lg:sticky lg:top-32">
        <div class="inline-flex items-center gap-3 mb-6">
          <span class="h-px w-12 bg-gold-500"></span>
          <span class="eyebrow">Cara Kerja</span>
        </div>
        <h2 class="font-display text-4xl md:text-5xl text-forest-700 leading-[1.05] mb-6">
          5 Langkah Menjadi <em>Mapan.</em>
        </h2>
        <p class="font-body text-ink-500 leading-relaxed max-w-md mb-8">
          Dari konsultasi pertama hingga Anda menerima passive income bulanan, setiap tahap kami rancang transparan dan terukur.
        </p>

        <!-- Progress -->
        <div class="space-y-3">
          {#each steps as step, i}
            <button
              type="button"
              class="w-full flex items-center gap-4 p-3 transition-all text-left"
              class:bg-cream-50={activeIndex === i}
              class:border-l-2={activeIndex === i}
              class:border-gold-500={activeIndex === i}
              class:opacity-50={activeIndex !== i}
            >
              <span class="font-mono text-xs text-gold-500 font-semibold w-8">{String(i + 1).padStart(2, '0')}</span>
              <span class="font-display text-forest-700 font-semibold">{step.title}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Right: scrollable content -->
    <div class="lg:col-span-7 space-y-32">
      {#each steps as step, i}
        <div data-step={i} class="scroll-mt-32">
          <div class="flex items-baseline gap-4 mb-4">
            <span class="font-display text-7xl md:text-8xl text-cream-100 font-bold leading-none">{String(i + 1).padStart(2, '0')}</span>
            <span class="eyebrow">{step.eyebrow}</span>
          </div>
          <h3 class="font-display text-3xl md:text-4xl text-forest-700 leading-tight mb-4">
            {step.title}
          </h3>
          <p class="font-body text-ink-500 leading-relaxed text-lg mb-6 max-w-2xl">
            {step.desc}
          </p>
          <ul class="space-y-2">
            {#each step.bullets || [] as b}
              <li class="flex items-start gap-3 font-body text-forest-700">
                <Check size={16} class="text-gold-500 mt-1 flex-shrink-0" strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>
