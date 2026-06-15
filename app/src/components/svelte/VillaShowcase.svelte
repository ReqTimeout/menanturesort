<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { motion } from '@humanspeak/svelte-motion';
  import { ArrowUpRight } from 'lucide-svelte';

  gsap.registerPlugin(ScrollTrigger);

  let { villas = [] } = $props();

  let sectionEl;
  let stickyEl;
  let activeIdx = $state(0);
  let ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          activeIdx = Math.min(villas.length - 1, Math.floor(progress * villas.length));
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  });

  onDestroy(() => {
    if (ctx) ctx.revert();
  });
</script>

<section bind:this={sectionEl} class="showcase">
  <div bind:this={stickyEl} class="showcase-sticky">
    <!-- Background images with crossfade -->
    {#each villas as v, i}
      <div
        class="showcase-bg"
        class:active={i === activeIdx}
        style="background-image: url({v.image});"
      ></div>
    {/each}
    <div class="showcase-overlay"></div>

    <!-- Content -->
    <div class="container-wide relative z-10 h-full flex flex-col justify-between py-20">
      <div class="flex items-start justify-between">
        <div>
          <motion.div
            class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >The Residences</motion.div>
          <motion.h2
            class="font-display text-cream-50 text-6xl md:text-8xl leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Tiga villa,<br/><em class="text-gold-500">satu standar.</em>
          </motion.h2>
        </div>
        <div class="text-right hidden md:block">
          <div class="font-mono text-xs uppercase tracking-widest text-cream-50/60 mb-3">Index</div>
          <div class="font-display text-2xl text-gold-500 font-bold">0{activeIdx + 1} / 0{villas.length}</div>
        </div>
      </div>

      <!-- Bottom: villa selector strip -->
      <div class="showcase-list">
        {#each villas as v, i}
          <a
            href={`/villa/${v.id}`}
            data-cursor="Explore"
            class="showcase-item"
            class:active={i === activeIdx}
          >
            <div class="flex items-baseline gap-6">
              <span class="font-mono text-sm text-cream-50/50">0{i + 1}</span>
              <div class="flex-1">
                <div class="font-display text-3xl md:text-5xl text-cream-50 font-bold leading-none transition-all duration-500 {i === activeIdx ? 'text-gold-500' : ''}">{v.name}</div>
                <div class="font-body text-sm text-cream-50/60 mt-2 italic">{v.tagline}</div>
              </div>
              <div class="text-right hidden md:block">
                <div class="font-mono text-xl text-gold-500 font-bold">{v.priceLabel}</div>
                <div class="font-body text-xs text-cream-50/50 mt-1 uppercase tracking-wider">Mulai dari</div>
              </div>
              <ArrowUpRight size={32} class="text-gold-500 transition-transform group-hover:rotate-45 flex-shrink-0" strokeWidth={1} />
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .showcase {
    position: relative;
    height: 300vh;
    background: #0D1B14;
  }
  .showcase-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
  .showcase-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s;
    transform: scale(1.08);
  }
  .showcase-bg.active {
    opacity: 1;
    transform: scale(1);
  }
  .showcase-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(13, 27, 20, 0.7) 0%, rgba(13, 27, 20, 0.4) 50%, rgba(13, 27, 20, 0.9) 100%),
      linear-gradient(90deg, rgba(13, 27, 20, 0.6) 0%, transparent 50%);
  }
  .showcase-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .showcase-item {
    display: block;
    padding: 1.5rem 0;
    border-top: 1px solid rgba(245, 240, 232, 0.1);
    transition: padding 0.4s;
    cursor: pointer;
  }
  .showcase-item:last-child {
    border-bottom: 1px solid rgba(245, 240, 232, 0.1);
  }
  .showcase-item.active {
    padding-left: 1.5rem;
  }
  .showcase-item:hover {
    background: linear-gradient(90deg, rgba(212, 165, 116, 0.08) 0%, transparent 100%);
  }
</style>
