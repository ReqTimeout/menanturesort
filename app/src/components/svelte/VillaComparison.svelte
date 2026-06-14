<script>
  import { Tabs } from '@lib/components/ui';
  import { Check, X as XIcon, Home, Bed, Maximize, Layers, Banknote } from 'lucide-svelte';
  import villaData from '@data/villa.json';

  const items = villaData.types.map((v) => ({
    value: v.id,
    label: v.name,
    content: () => renderContent(v),
  }));

  function renderContent(v) {
    return v;
  }
</script>

<section class="bg-cream-50 py-20 md:py-32">
  <div class="container-wide">
    <div class="text-center mb-12 max-w-2xl mx-auto">
      <div class="inline-flex items-center gap-3 mb-4">
        <span class="h-px w-12 bg-gold-500"></span>
        <span class="eyebrow">Bandingkan Villa</span>
        <span class="h-px w-12 bg-gold-500"></span>
      </div>
      <h2 class="font-display text-4xl md:text-5xl text-forest-700 leading-[1.05] mb-4">
        Pilih <em>Villa Impian</em> Anda.
      </h2>
      <p class="font-body text-ink-500">
        Tiga tipe dengan karakter berbeda, satu standar kemapanan yang sama. Klik untuk membandingkan detail spesifikasi.
      </p>
    </div>

    <Tabs {items} class="max-w-5xl mx-auto" />

    <div class="max-w-5xl mx-auto mt-8">
      {#each villaData.types as v, i}
        <div hidden={i > 0} class:!block={i === 0}>
          <!-- Spec table -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-100 border border-cream-100">
            <div class="bg-white p-6">
              <Maximize size={18} class="text-gold-500 mb-2" />
              <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider mb-1">Luas Lahan</div>
              <div class="font-display text-xl text-forest-700 font-bold">{v.lt} m&sup2;</div>
            </div>
            <div class="bg-white p-6">
              <Layers size={18} class="text-gold-500 mb-2" />
              <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider mb-1">Luas Bangunan</div>
              <div class="font-display text-xl text-forest-700 font-bold">{v.lb} m&sup2;</div>
            </div>
            <div class="bg-white p-6">
              <Bed size={18} class="text-gold-500 mb-2" />
              <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider mb-1">Kamar Tidur</div>
              <div class="font-display text-xl text-forest-700 font-bold">{v.bedrooms}</div>
            </div>
            <div class="bg-white p-6">
              <Banknote size={18} class="text-gold-500 mb-2" />
              <div class="font-body text-[10px] text-ink-500 uppercase tracking-wider mb-1">Harga Mulai</div>
              <div class="font-display text-xl text-forest-700 font-bold">{v.priceDisplay}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-6 p-8 bg-white border border-cream-100">
            <p class="font-quote italic text-xl text-forest-700 leading-relaxed mb-6">
              "{v.tagline}"
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {#each v.features as f}
                <div class="flex items-start gap-2 font-body text-sm text-forest-700 py-1">
                  <Check size={14} class="text-gold-500 mt-1 flex-shrink-0" strokeWidth={2.5} />
                  <span>{f}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
