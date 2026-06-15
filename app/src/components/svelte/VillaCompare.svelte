<script>
  import villaData from '@data/villa.json';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';
  import { Check, X, MessageCircle, ChevronDown, Home, Wallet, TrendingUp, Bed, Bath, Maximize, Building2 } from 'lucide-svelte';

  const VILLAS = villaData.types;

  let dpPercent = $state(30);
  let tenor = $state(20);
  let interest = $state(5);
  let occupancy = $state(55);

  // Pre-compute each villa's metrics
  const data = $derived(VILLAS.map((v) => {
    const dp = v.price * (dpPercent / 100);
    const loan = v.price - dp;
    const mr = interest / 100 / 12;
    const m = tenor * 12;
    const cicilan = mr === 0 ? loan / m : Math.round((loan * (mr * Math.pow(1 + mr, m))) / (Math.pow(1 + mr, m) - 1));
    const monthlyRev = 2200000 * 30 * (occupancy / 100) * 0.8 * 0.7; // gross * 80% net * 70% owner
    const surplus = monthlyRev - cicilan;
    const yieldPct = (monthlyRev * 12 / v.price) * 100;
    return {
      ...v,
      dp: Math.round(dp),
      cicilan: Math.round(cicilan),
      passiveIncome: Math.round(monthlyRev),
      surplus: Math.round(surplus),
      yieldPct: yieldPct.toFixed(1),
      isHighlighted: v.id === 'idaman',
    };
  }));

  const bestSurplus = $derived(Math.max(...data.map((d) => d.surplus)));
  const bestYield = $derived(Math.max(...data.map((d) => parseFloat(d.yieldPct))));

  function fmtShort(n) {
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + ' M';
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(0) + ' jt';
    return n.toString();
  }
  function fmtRp(n) {
    return 'Rp ' + Math.round(n).toLocaleString('id-ID');
  }

  const waBooking = (villaId) => waUrl(
    siteData.contact.whatsapp,
    `Halo, saya tertarik ${VILLAS.find((v) => v.id === villaId).name}. Mohon info lebih lanjut dan jadwal survey.`,
    `compare_${villaId}`
  );
</script>

<div class="compare-card">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-2 mb-1">
      <Building2 size={18} class="text-gold-700" />
      <span class="font-mono text-xs uppercase tracking-widest text-gold-700">Bandingkan 3 Villa</span>
    </div>
    <h3 class="font-display text-2xl md:text-3xl text-forest-700 font-bold">Mana yang Cocok untuk Anda?</h3>
  </div>

  <!-- Filter Sliders -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-6 border-b border-cream-100">
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">DP</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{dpPercent}%</div>
      </div>
      <input type="range" min="20" max="60" step="5" bind:value={dpPercent} class="w-full compare-slider" />
    </div>
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Tenor</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{tenor} thn</div>
      </div>
      <input type="range" min="5" max="20" step="5" bind:value={tenor} class="w-full compare-slider" />
    </div>
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Bunga</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{interest}%</div>
      </div>
      <input type="range" min="3" max="10" step="0.5" bind:value={interest} class="w-full compare-slider" />
    </div>
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Okupansi</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{occupancy}%</div>
      </div>
      <input type="range" min="30" max="80" step="5" bind:value={occupancy} class="w-full compare-slider" />
    </div>
  </div>

  <!-- Comparison Table (Desktop) -->
  <div class="hidden md:block">
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left text-xs font-mono uppercase tracking-widest text-ink-mute py-3 pr-4 w-1/4">Aspek</th>
          {#each data as v}
            <th class="text-center py-3 px-2" class:highlight-col={v.isHighlighted}>
              <div class="font-mono text-[10px] uppercase tracking-widest text-gold-700">{v.label}</div>
              <div class="font-display text-lg text-forest-700 font-bold">{v.name.split(' ')[1]}</div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4 text-sm text-ink-mute">Harga</td>
          {#each data as v}
            <td class="py-3 px-2 text-center" class:highlight-col={v.isHighlighted}>
              <div class="font-mono font-bold text-forest-700">{v.priceDisplay}</div>
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4 text-sm text-ink-mute">Luas Bangunan</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono text-sm" class:highlight-col={v.isHighlighted}>
              {v.lb} m²
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4 text-sm text-ink-mute">Kamar Tidur</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono text-sm" class:highlight-col={v.isHighlighted}>
              {v.bedrooms} BR
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4 text-sm text-ink-mute">Kamar Mandi</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono text-sm" class:highlight-col={v.isHighlighted}>
              {v.bathrooms} BA
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100 bg-cream-50">
          <td class="py-3 pr-4 text-sm font-semibold text-forest-700">DP ({dpPercent}%)</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono font-bold" class:highlight-col={v.isHighlighted}>
              {fmtShort(v.dp)}
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100 bg-cream-50">
          <td class="py-3 pr-4 text-sm font-semibold text-forest-700">Cicilan / Bulan</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono font-bold" class:highlight-col={v.isHighlighted}>
              {fmtShort(v.cicilan)}
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100 bg-cream-50">
          <td class="py-3 pr-4 text-sm font-semibold text-forest-700">Passive Income</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono font-bold text-gold-700" class:highlight-col={v.isHighlighted}>
              {fmtShort(v.passiveIncome)}
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100 bg-cream-50">
          <td class="py-3 pr-4 text-sm font-semibold text-forest-700">Surplus / Bulan</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono font-bold" class:highlight-col={v.isHighlighted}
                class:text-success-700={v.surplus > 0} class:text-warning-700={v.surplus <= 0}>
              {v.surplus > 0 ? '+' : ''}{fmtShort(v.surplus)}
              {#if v.surplus === bestSurplus && v.surplus > 0}
                <span class="ml-1 text-[10px] text-gold-700">★</span>
              {/if}
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4 text-sm text-ink-mute">Yield p.a.</td>
          {#each data as v}
            <td class="py-3 px-2 text-center font-mono" class:highlight-col={v.isHighlighted}
                class:text-success-700={parseFloat(v.yieldPct) === bestYield}>
              {v.yieldPct}%
              {#if parseFloat(v.yieldPct) === bestYield}
                <span class="ml-1 text-[10px] text-gold-700">★</span>
              {/if}
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4 text-sm text-ink-mute">Target</td>
          {#each data as v}
            <td class="py-3 px-2 text-center text-xs text-ink-soft" class:highlight-col={v.isHighlighted}>
              {v.target}
            </td>
          {/each}
        </tr>
        <tr class="border-t border-cream-100">
          <td class="py-3 pr-4"></td>
          {#each data as v}
            <td class="py-3 px-2 text-center" class:highlight-col={v.isHighlighted}>
              <a href={waBooking(v.id)} target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
                <MessageCircle size={14} /> Tanya
              </a>
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Comparison Cards (Mobile) -->
  <div class="md:hidden space-y-4">
    {#each data as v}
      <div class="compare-mobile-card" class:highlight-card={v.isHighlighted}>
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-gold-700">{v.label}</div>
            <div class="font-display text-lg text-forest-700 font-bold">{v.name}</div>
          </div>
          <div class="font-mono text-sm font-bold text-forest-700">{v.priceDisplay}</div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div><span class="text-ink-mute">Luas:</span> <strong>{v.lb}m²</strong></div>
          <div><span class="text-ink-mute">Kamar:</span> <strong>{v.bedrooms}BR / {v.bathrooms}BA</strong></div>
          <div><span class="text-ink-mute">DP:</span> <strong class="font-mono">{fmtShort(v.dp)}</strong></div>
          <div><span class="text-ink-mute">Cicilan:</span> <strong class="font-mono">{fmtShort(v.cicilan)}</strong></div>
          <div><span class="text-ink-mute">Income:</span> <strong class="font-mono text-gold-700">{fmtShort(v.passiveIncome)}</strong></div>
          <div><span class="text-ink-mute">Surplus:</span> <strong class="font-mono" class:text-success-700={v.surplus > 0} class:text-warning-700={v.surplus <= 0}>{v.surplus > 0 ? '+' : ''}{fmtShort(v.surplus)}</strong></div>
        </div>
        <a href={waBooking(v.id)} target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm w-full justify-center mt-3">
          <MessageCircle size={14} /> Tanya Tipe Ini
        </a>
      </div>
    {/each}
  </div>

  <p class="text-[10px] text-ink-mute text-center font-mono mt-4">
    * Simulasi dengan asumsi okupansi {occupancy}%, tarif Rp 2.2jt/malam. Suku bunga {interest}% flat.
  </p>
</div>