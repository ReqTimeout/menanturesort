<script lang="ts">
  /**
   * VillaCard — premium card untuk 3 tipe villa (V5.2)
   *
   * Features:
   * - Hover-lift + spotlight glow (NO 3D tilt — mobile-unfriendly)
   * - Badge label unik per villa (Attic / Double Glass / Luxury Private)
   * - Format harga dari price (1.2M)
   * - WhatsApp deep-link otomatis per villa
   * - Responsive image dengan aspect ratio
   *
   * Usage:
   *   <VillaCard villa={villaObj} index={0} />
   */
  import { Bed, Maximize, Layers, ArrowRight, Check } from 'lucide-svelte';
  import { formatShort, ctaUrl } from '@lib/utils';
  import { motion } from '@humanspeak/svelte-motion';

  let { villa, index = 0, featured = false } = $props();

  // Villa label mapping (V5.2)
  const labelMap: Record<string, { label: string; badgeClass: string }> = {
    bijak: { label: 'Attic', badgeClass: 'badge-villa-bijak' },
    idaman: { label: 'Double Glass', badgeClass: 'badge-villa-idaman' },
    mapan: { label: 'Luxury Private', badgeClass: 'badge-villa-mapan' },
  };

  let labelInfo = $derived(labelMap[villa?.id] ?? { label: 'Premium', badgeClass: 'badge-gold' });
  let imageSrc = $derived(villa?.image ?? '/images/villa/idaman/hero-row.jpeg');
  let imageAlt = $derived(villa?.imageAlt ?? `Villa ${villa?.name ?? 'Menantu Resort'}`);
  let priceShort = $derived(villa?.price ? formatShort(villa.price) : '—');
  let waLink = $derived(
    ctaUrl('konsultasi', undefined, `Saya tertarik dengan ${villa?.name ?? 'Villa Menantu Resort'}.`)
  );

  let glowX = $state(50);
  let glowY = $state(50);

  function onMove(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    glowX = ((e.clientX - rect.left) / rect.width) * 100;
    glowY = ((e.clientY - rect.top) / rect.height) * 100;
  }
</script>

<motion.article
  class={`card-premium overflow-hidden group relative ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
  onmousemove={onMove}
  style={`--mouse-x: ${glowX}%; --mouse-y: ${glowY}%;`}
>
  <!-- Image -->
  <div class="relative aspect-[4/3] overflow-hidden bg-forest-50">
    <img
      src={imageSrc}
      alt={imageAlt}
      loading="lazy"
      class="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
    />
    <!-- Label badge -->
    <div class="absolute top-3 left-3 z-10">
      <span class={`badge ${labelInfo.badgeClass} backdrop-blur-md`}>
        {labelInfo.label}
      </span>
    </div>
    <!-- Stock badge (only if available) -->
    {#if villa?.totalUnits && villa.totalUnits <= 5}
      <div class="absolute top-3 right-3 z-10">
        <span class="badge badge-live text-white">Sisa {villa.totalUnits}</span>
      </div>
    {/if}
    <!-- Gold top accent -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>

  <!-- Content -->
  <div class="p-6 flex flex-col gap-4">
    <header>
      <h3 class="font-display text-2xl text-forest-700 leading-tight">
        {villa?.name ?? 'Villa'}
      </h3>
      <p class="text-sm text-ink-700 mt-1 italic">
        {villa?.labelDesc ?? villa?.tagline ?? ''}
      </p>
    </header>

    <!-- Price highlight -->
    <div class="flex items-baseline gap-1">
      <span class="font-display text-3xl text-gold-700 font-bold">Rp {priceShort}</span>
      <span class="text-xs text-ink-700">/unit</span>
    </div>

    <!-- Specs -->
    <div class="grid grid-cols-3 gap-3 text-xs">
      <div class="flex flex-col items-center gap-1 py-2 bg-cream-50 rounded-none">
        <Bed class="w-4 h-4 text-forest-700" />
        <span class="font-bold text-forest-700">{villa?.bedrooms ?? 0} KT</span>
      </div>
      <div class="flex flex-col items-center gap-1 py-2 bg-cream-50 rounded-none">
        <Maximize class="w-4 h-4 text-forest-700" />
        <span class="font-bold text-forest-700">{villa?.lb ?? 0} m²</span>
      </div>
      <div class="flex flex-col items-center gap-1 py-2 bg-cream-50 rounded-none">
        <Layers class="w-4 h-4 text-forest-700" />
        <span class="font-bold text-forest-700">{villa?.floors ?? 0} Lantai</span>
      </div>
    </div>

    <!-- USP (max 3) -->
    {#if villa?.usp?.length}
      <ul class="space-y-1.5 text-sm text-ink-700">
        {#each villa.usp.slice(0, 3) as feature}
          <li class="flex items-start gap-2">
            <Check class="w-4 h-4 text-success-600 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        {/each}
      </ul>
    {/if}

    <!-- CTA: Dual button (Detail page + WA chat) -->
    <div class="flex gap-2 mt-auto">
      <a
        href={`/villa/${villa?.id ?? 'idaman'}`}
        class="btn btn-outline flex-1 group/cta text-[13px] font-bold uppercase tracking-wider py-3"
      >
        Lihat Detail
        <ArrowRight class="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-secondary flex-1 text-[13px] font-bold uppercase tracking-wider py-3"
        aria-label={`Chat WhatsApp tentang ${villa?.name ?? 'Villa'}`}
      >
        Chat WA
      </a>
    </div>
  </div>
</motion.article>
