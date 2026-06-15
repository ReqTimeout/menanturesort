<script>
  /**
   * MidCTA — Inline conversion CTA, full-width forest band
   * Drives visitor to WhatsApp consultation (the primary conversion goal)
   * Place in the middle of long pages to re-engage scroll-fatigued users.
   */
  import { motion } from '@humanspeak/svelte-motion';
  import { MessageCircle, ArrowRight, PhoneCall, Calendar, Sparkles } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let {
    eyebrow = 'Diskusi Personal',
    heading = 'Bingung pilih tipe villa?',
    subheading = 'Tim konsultan kami bantu rekomendasikan villa yang paling pas untuk budget & timeline Anda — gratis, tanpa komitmen.',
    ctaLabel = 'Chat WhatsApp Sekarang',
    secondaryCtaLabel = 'Lihat 3 Tipe Villa',
    secondaryCtaHref = '/villa',
    source = 'mid_cta',
  } = $props();

  const waLink = waUrl(
    siteData.contact.whatsapp,
    'Halo, saya ingin konsultasi memilih villa Menantu Resort yang sesuai budget saya.',
    source
  );
</script>

<section class="relative bg-forest-700 text-cream-50 py-12 md:py-20 overflow-hidden reveal">
  <!-- Pattern overlay -->
  <div class="absolute inset-0 pattern-grid opacity-30 pointer-events-none"></div>

  <!-- Animated subtle gradient -->
  <div
    class="absolute inset-0 animate-hero-gradient pointer-events-none opacity-60"
    style="background: radial-gradient(ellipse at 30% 50%, rgba(212, 165, 116, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(27, 67, 50, 0.25) 0%, transparent 60%);"
  ></div>

  <div class="container-wide relative">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <!-- Left: copy -->
      <motion.div
        class="md:col-span-7"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span class="font-mono text-xs uppercase tracking-widest text-gold-500 block mb-3">
          — {eyebrow}
        </span>
        <h2 class="font-display text-3xl md:text-5xl text-cream-50 leading-[1.05] tracking-tight font-bold mb-4">
          {heading}
        </h2>
        <p class="font-body text-base md:text-lg text-cream-50/80 max-w-xl leading-relaxed">
          {subheading}
        </p>
      </motion.div>

      <!-- Right: CTA stack -->
      <motion.div
        class="md:col-span-5 flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          class="btn btn-secondary btn-lg group/cta shadow-2xl animate-gold-glow"
        >
          <MessageCircle class="w-5 h-5" />
          <span>{ctaLabel}</span>
          <ArrowRight class="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
        </a>

        <a
          href={secondaryCtaHref}
          class="btn btn-outline-light btn-lg"
        >
          <Sparkles class="w-4 h-4" />
          <span>{secondaryCtaLabel}</span>
        </a>

        <div class="flex items-center gap-2 mt-2 text-xs text-cream-50/60">
          <Calendar class="w-3.5 h-3.5 text-gold-500" />
          <span>Respon dalam 1 jam kerja · 09:00–21:00 WIB</span>
        </div>
      </motion.div>
    </div>
  </div>
</section>
