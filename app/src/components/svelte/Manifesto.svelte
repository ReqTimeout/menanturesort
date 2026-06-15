<script>
  import { onMount } from 'svelte';
  import { motion } from '@humanspeak/svelte-motion';

  let sectionEl;
  let scrollProgress = $state(0);

  onMount(() => {
    const onScroll = () => {
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      scrollProgress = Math.max(0, Math.min(1, passed / total));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  const text = "Warisan bukan sekadar properti. Ia adalah pernyataan: bahwa Anda berpikir lintas generasi. Bahwa Anda menolak hidup dalam siklus kerja-pakai-buang. Menantu Resort adalah jawaban untuk mereka yang memilih berbeda.";
  const words = text.split(' ');

  const stats = [
    { k: '1974', v: 'Sahid berdiri' },
    { k: '50+', v: 'Tahun track record' },
    { k: '20+', v: 'Properti aktif' },
  ];
</script>

<section bind:this={sectionEl} class="reveal manifesto relative overflow-hidden">
  <!-- Massive oversized letter bg -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
    <span class="manifesto-bg-text" style="opacity: {0.04 + scrollProgress * 0.04};">M</span>
  </div>

  <div class="container-wide relative">
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 md:col-span-3">
        <div class="sticky top-32">
          <div class="font-mono text-xs uppercase tracking-widest text-gold-700 mb-4">— Manifesto</div>
          <div class="font-display text-sm text-forest-700">{Math.floor(scrollProgress * 100)}%</div>
          <div class="w-12 h-px bg-gold-500 mt-2 origin-left" style="transform: scaleX({scrollProgress});"></div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-9">
        <p class="manifesto-text font-display">
          {#each words as word, i}
            {@const revealPoint = i / words.length}
            <span class="word" class:revealed={scrollProgress > revealPoint + 0.1}>
              {word}
            </span>
            {' '}
          {/each}
        </p>

        <div class="mt-20 grid grid-cols-3 gap-12 border-t border-forest-700/20 pt-12">
          {#each stats as s, i}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div class="font-display text-6xl md:text-7xl text-forest-700 font-bold leading-none">{s.k}</div>
              <div class="font-body text-xs text-ink-500 uppercase tracking-wider mt-3">{s.v}</div>
            </motion.div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>