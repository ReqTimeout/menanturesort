<script>
  import { motion } from '@humanspeak/svelte-motion';
  import { Star, Quote, MapPin, Briefcase, Calendar, Award, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-svelte';
  import siteData from '@data/site.json';
  import { waUrl } from '@lib/utils';

  let active = $state(0);
  const stories = siteData.testimonials.map((t, i) => ({
    ...t,
    avatar: t.name.split(' ').map((n) => n[0]).join('').slice(0, 2),
    villa: ['Bijak', 'Idaman', 'Mapan'][i] || 'Bijak',
    date: ['Maret 2026', 'Februari 2026', 'Januari 2026'][i] || '2026',
  }));

  function next() { active = (active + 1) % stories.length; }
  function prev() { active = (active - 1 + stories.length) % stories.length; }

  const currentStory = $derived(stories[active]);
  const waLink = waUrl(siteData.contact.whatsapp, 'Halo, saya terinspirasi testimoni investor. Mau diskusi lebih lanjut.', 'testimoni_story');
</script>

<section class="bg-cream-50 py-20 md:py-32 relative overflow-hidden" data-section="stories">
  <!-- Dot pattern bg -->
  <div class="absolute inset-0 opacity-[0.4] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, rgba(27, 67, 50, 0.12) 1px, transparent 0); background-size: 32px 32px;"></div>

  <div class="container-wide relative">
    <div class="grid grid-cols-12 gap-8 mb-12">
      <div class="col-span-12 md:col-span-2">
        <motion.div
                    transition={{ duration: 0.6 }}
          class="font-mono text-xs uppercase tracking-widest text-gold-700"
        >
          — Suara Nyata
        </motion.div>
      </div>
      <div class="col-span-12 md:col-span-10">
        <motion.h2
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          class="font-display text-forest-700 leading-[0.95] tracking-tight text-editorial-md font-bold"
        >
          Mereka yang sudah<br/>
          <em class="text-gold-700">memutuskan duluan.</em>
        </motion.h2>
        <motion.p
                    transition={{ duration: 0.6, delay: 0.2 }}
          class="font-body text-ink-500 leading-relaxed mt-6 max-w-2xl"
        >
          428 investor sudah bergabung. Beberapa dari mereka bersedia cerita — apa yang awalnya bikin ragu, apa yang akhirnya bikin yakin, dan seperti apa rasanya memiliki vila di Menantu Resort hari ini.
        </motion.p>
      </div>
    </div>

    <!-- Story card -->
    <motion.div
            transition={{ duration: 0.8, delay: 0.3 }}
      class="bg-white border border-cream-100 shadow-sm"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12">
        <!-- Left: profile -->
        <div class="lg:col-span-4 bg-forest-700 text-cream-50 p-8 md:p-12 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, rgba(245, 240, 232, 0.5) 1px, transparent 0); background-size: 24px 24px;"></div>

          <div class="relative">
            <motion.div
                            transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Quote class="text-gold-500 mb-6" size={48} strokeWidth={1} />
            </motion.div>

            <motion.div
                            transition={{ duration: 0.5, delay: 0.5 }}
              class="flex items-center gap-4 mb-6"
            >
              <div class="w-16 h-16 rounded-full bg-gold-500 text-forest-700 flex items-center justify-center font-display text-2xl font-bold">
                {currentStory.avatar}
              </div>
              <div>
                <div class="font-display text-2xl font-bold leading-tight">{currentStory.name}</div>
                <div class="font-mono text-[10px] uppercase tracking-widest text-gold-500 mt-1">{currentStory.role}</div>
              </div>
            </motion.div>

            <motion.div
                            transition={{ duration: 0.5, delay: 0.6 }}
              class="space-y-2 font-mono text-[10px] uppercase tracking-widest"
            >
              <div class="flex items-center gap-2 text-cream-50/70">
                <MapPin size={12} class="text-gold-500" />
                {currentStory.location}
              </div>
              <div class="flex items-center gap-2 text-cream-50/70">
                <Briefcase size={12} class="text-gold-500" />
                Villa: {currentStory.villa}
              </div>
              <div class="flex items-center gap-2 text-cream-50/70">
                <Calendar size={12} class="text-gold-500" />
                Closing: {currentStory.date}
              </div>
            </motion.div>

            <motion.div
                            transition={{ duration: 0.5, delay: 0.7 }}
              class="mt-8 pt-6 border-t border-cream-50/10"
            >
              <div class="font-mono text-[10px] uppercase tracking-widest text-gold-500 mb-2">Verified Investor</div>
              <div class="flex items-center gap-2 text-cream-50/80 font-body text-xs">
                <CheckCircle2 size={14} class="text-gold-500" />
                <span>SHM & dokumen lengkap</span>
              </div>
              <div class="flex items-center gap-2 text-cream-50/80 font-body text-xs mt-1">
                <CheckCircle2 size={14} class="text-gold-500" />
                <span>Sudah terima income 6+ bulan</span>
              </div>
            </motion.div>
          </div>
        </div>

        <!-- Right: story -->
        <div class="lg:col-span-8 p-8 md:p-12 relative">
          <motion.div
                        transition={{ duration: 0.5, delay: 0.5 }}
            class="flex gap-1 mb-6"
          >
            {#each Array(5) as _, si}
              <Star size={18} class="text-gold-500" fill="currentColor" />
            {/each}
          </motion.div>

          <motion.p
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            class="font-display text-2xl md:text-3xl text-forest-700 leading-[1.3] italic font-medium mb-8"
          >
            "{currentStory.text}"
          </motion.p>

          <div class="flex items-center gap-3 pt-6 border-t border-cream-100">
            <motion.button
              onclick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              class="w-10 h-10 border border-cream-100 flex items-center justify-center hover:border-gold-500 hover:text-gold-700 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <div class="flex-1 flex items-center gap-2">
              {#each stories as _, i}
                <button
                  onclick={() => (active = i)}
                  class="flex-1 h-1 transition-all duration-500 {active === i ? 'bg-gold-500' : 'bg-cream-100'}"
                ></button>
              {/each}
            </div>
            <span class="font-mono text-xs text-ink-500">{String(active + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}</span>
            <motion.button
              onclick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              class="w-10 h-10 border border-cream-100 flex items-center justify-center hover:border-gold-500 hover:text-gold-700 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>

    <!-- Bottom CTA -->
    <motion.div
            transition={{ duration: 0.6, delay: 0.8 }}
      class="mt-12 text-center"
    >
      <a href={waLink} target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wide text-forest-700 hover:text-gold-700 transition-colors">
        Mau cerita seperti mereka?
        <span class="font-display italic text-gold-700">→ Hubungi konsultan</span>
      </a>
    </motion.div>
  </div>
</section>
