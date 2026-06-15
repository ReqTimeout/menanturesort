<script>
  import villaData from '@data/villa.json';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';
  import { Calculator, MessageCircle, TrendingUp, Wallet, Home } from 'lucide-svelte';

  const VILLAS = villaData.types;

  let selectedId = $state('idaman');
  let dpPercent = $state(30);
  let tenorYears = $state(20);
  let interestRate = $state(5);
  let occupancy = $state(55);
  let nightlyRate = $state(2200000);

  const villa = $derived(VILLAS.find((v) => v.id === selectedId));

  // KPR math
  const kpr = $derived(() => {
    const dp = villa.price * (dpPercent / 100);
    const loan = villa.price - dp;
    const mr = interestRate / 100 / 12;
    const m = tenorYears * 12;
    const cicilan = mr === 0 ? loan / m : Math.round((loan * (mr * Math.pow(1 + mr, m))) / (Math.pow(1 + mr, m) - 1));
    return {
      dp: Math.round(dp),
      loan: Math.round(loan),
      cicilan: Math.round(cicilan),
      totalPayment: Math.round(cicilan * m),
      totalInterest: Math.round(cicilan * m - loan),
    };
  });

  // Passive income math
  const passive = $derived(() => {
    const monthlyRev = nightlyRate * 30 * (occupancy / 100);
    const ops = monthlyRev * 0.2;
    const net = monthlyRev - ops;
    const owner = net * 0.7;
    return {
      monthlyRev: Math.round(monthlyRev),
      ops: Math.round(ops),
      net: Math.round(net),
      ownerShare: Math.round(owner),
    };
  });

  // Surplus / deficit per bulan
  const surplus = $derived(passive().ownerShare - kpr().cicilan);
  const surplusPct = $derived((surplus / kpr().cicilan) * 100);
  const breakEven = $derived(() => {
    const annualOwner = passive().ownerShare * 12;
    if (annualOwner <= 0) return null;
    return Math.ceil(kpr().dp / annualOwner);
  });

  function fmtRp(n) {
    return 'Rp ' + Math.round(n).toLocaleString('id-ID');
  }
  function fmtShort(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + ' M';
    if (n >= 1e6) return (n / 1e6).toFixed(0) + ' jt';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + ' rb';
    return n.toString();
  }

  const waConsult = waUrl(
    siteData.contact.whatsapp,
    `Halo, saya mau simulasi KPR ${villa.name} DP ${dpPercent}% tenor ${tenorYears} tahun`,
    'kpr_calc'
  );
</script>

<div class="kpr-calc-card">
  <!-- Header -->
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <Calculator size={18} class="text-gold-700" />
        <span class="font-mono text-xs uppercase tracking-widest text-gold-700">Simulasi Interaktif</span>
      </div>
      <h3 class="font-display text-2xl md:text-3xl text-forest-700 font-bold">KPR & Passive Income</h3>
    </div>
    <div class="flex gap-2 flex-wrap">
      {#each VILLAS as v}
        <button
          type="button"
          class="px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all"
          class:chip-active={selectedId === v.id}
          class:chip-inactive={selectedId !== v.id}
          onclick={() => (selectedId = v.id)}
        >{v.name.split(' ')[1]}</button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <!-- INPUTS (col-2) -->
    <div class="lg:col-span-2 space-y-6">
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-semibold text-ink-700 flex items-center gap-1.5">
            <Home size={14} class="text-gold-700" /> Harga Villa
          </label>
          <div class="font-mono text-sm text-forest-700 font-bold">{villa.priceDisplay}</div>
        </div>
        <div class="h-1 bg-cream-100 relative">
          <div class="absolute inset-y-0 left-0 bg-gold-700" style="width: {((villa.price - 1e9) / (2.5e9 - 1e9)) * 100}%"></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-semibold text-ink-700">Down Payment</label>
          <div class="font-mono text-sm text-forest-700 font-bold">{dpPercent}% · {fmtShort(kpr().dp)}</div>
        </div>
        <input type="range" min="20" max="60" step="5" bind:value={dpPercent} class="w-full kpr-slider" />
        <div class="flex justify-between text-[10px] text-ink-mute font-mono mt-1">
          <span>20%</span><span>40%</span><span>60%</span>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-semibold text-ink-700">Tenor</label>
          <div class="font-mono text-sm text-forest-700 font-bold">{tenorYears} tahun</div>
        </div>
        <input type="range" min="5" max="20" step="5" bind:value={tenorYears} class="w-full kpr-slider" />
        <div class="flex justify-between text-[10px] text-ink-mute font-mono mt-1">
          <span>5</span><span>10</span><span>15</span><span>20</span>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-semibold text-ink-700">Bunga Flat</label>
          <div class="font-mono text-sm text-forest-700 font-bold">{interestRate.toFixed(1)}% p.a.</div>
        </div>
        <input type="range" min="3" max="10" step="0.5" bind:value={interestRate} class="w-full kpr-slider" />
        <div class="flex justify-between text-[10px] text-ink-mute font-mono mt-1">
          <span>3%</span><span>5%</span><span>7%</span><span>10%</span>
        </div>
      </div>

      <div class="pt-4 border-t border-cream-100">
        <div class="text-xs font-mono uppercase tracking-widest text-gold-700 mb-3">Asumsi Passive Income</div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-semibold text-ink-700">Okupansi</label>
            <div class="font-mono text-sm text-forest-700 font-bold">{occupancy}%</div>
          </div>
          <input type="range" min="30" max="80" step="5" bind:value={occupancy} class="w-full kpr-slider" />
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-semibold text-ink-700">Tarif / Malam</label>
            <div class="font-mono text-sm text-forest-700 font-bold">{fmtRp(nightlyRate)}</div>
          </div>
          <input type="range" min="1000000" max="4000000" step="100000" bind:value={nightlyRate} class="w-full kpr-slider" />
        </div>
      </div>
    </div>

    <!-- RESULTS (col-3) -->
    <div class="lg:col-span-3 space-y-4">
      <!-- Hero: Cicilan per Bulan -->
      <div class="bg-forest-700 text-cream-50 p-6 md:p-8 relative overflow-hidden">
        <div class="absolute inset-0 bg-dots opacity-5"></div>
        <div class="relative">
          <div class="flex items-center gap-2 text-gold-500 mb-2">
            <Wallet size={16} />
            <span class="font-mono text-xs uppercase tracking-widest">Cicilan per Bulan</span>
          </div>
          <div class="font-display text-4xl md:text-5xl font-bold text-cream-50 leading-none">
            {fmtRp(kpr().cicilan)}
          </div>
          <div class="text-xs text-cream-50/60 font-mono mt-1">/ bulan · fixed flat</div>
        </div>
      </div>

      <!-- Surplus Indicator -->
      <div class="p-5 border-2 relative overflow-hidden" class:border-success={surplus >= 0} class:border-warning={surplus < 0} class:bg-success-50={surplus >= 0} class:bg-warning-50={surplus < 0}>
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div class="font-mono text-xs uppercase tracking-widest mb-1" class:text-success-700={surplus >= 0} class:text-warning-700={surplus < 0}>
              {surplus >= 0 ? 'Surplus Bulanan' : 'Defisit Bulanan'}
            </div>
            <div class="font-display text-2xl md:text-3xl font-bold" class:text-success-700={surplus >= 0} class:text-warning-700={surplus < 0}>
              {surplus >= 0 ? '+' : ''}{fmtRp(surplus)}
            </div>
          </div>
          <div class="text-right">
            <div class="font-mono text-xs text-ink-mute">Cashflow Coverage</div>
            <div class="font-display text-xl font-bold" class:text-success-700={surplus >= 0} class:text-warning-700={surplus < 0}>
              {surplusPct.toFixed(0)}%
            </div>
          </div>
        </div>
        <p class="text-xs mt-3 leading-relaxed" class:text-success-700={surplus >= 0} class:text-warning-700={surplus < 0}>
          {#if surplus >= 0}
            ✓ Income menutup cicilan + surplus {fmtShort(surplus)} per bulan. Cashflow positif dari bulan pertama.
          {:else}
            ✗ Income belum menutup cicilan. Naikkan okupansi atau pilih tenor lebih panjang.
          {/if}
        </p>
      </div>

      <!-- Detail Rows -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-4 bg-cream-50 border border-cream-100">
          <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">DP Awal</div>
          <div class="font-mono text-base text-forest-700 font-bold">{fmtShort(kpr().dp)}</div>
        </div>
        <div class="p-4 bg-cream-50 border border-cream-100">
          <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Pokok KPR</div>
          <div class="font-mono text-base text-forest-700 font-bold">{fmtShort(kpr().loan)}</div>
        </div>
        <div class="p-4 bg-cream-50 border border-cream-100">
          <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Total Bayar</div>
          <div class="font-mono text-base text-forest-700 font-bold">{fmtShort(kpr().totalPayment)}</div>
        </div>
        <div class="p-4 bg-cream-50 border border-cream-100">
          <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Total Bunga</div>
          <div class="font-mono text-base text-warning-700 font-bold">{fmtShort(kpr().totalInterest)}</div>
        </div>
      </div>

      <!-- Income Breakdown -->
      <div class="p-5 bg-forest-50 border-l-4 border-gold-700">
        <div class="flex items-center gap-2 mb-3">
          <TrendingUp size={14} class="text-gold-700" />
          <span class="font-mono text-xs uppercase tracking-widest text-forest-700">Passive Income / Bulan</span>
        </div>
        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between">
            <span class="text-ink-soft">Gross revenue ({occupancy}% okupansi)</span>
            <span class="font-mono font-semibold text-ink-700">{fmtShort(passive().monthlyRev)}</span>
          </div>
          <div class="flex justify-between text-ink-mute">
            <span>− Operasional Sahid (20%)</span>
            <span class="font-mono">−{fmtShort(passive().ops)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ink-soft">Net revenue</span>
            <span class="font-mono font-semibold text-ink-700">{fmtShort(passive().net)}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-forest-700/10">
            <span class="font-display text-forest-700 font-bold">Owner share (70%)</span>
            <span class="font-mono font-bold text-gold-700 text-base">{fmtShort(passive().ownerShare)}</span>
          </div>
        </div>
      </div>

      <!-- Break-even -->
      {#if breakEven() !== null}
        <div class="p-4 bg-gold-50 border-l-4 border-gold-700 flex items-center justify-between gap-4">
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Break-even DP</div>
            <div class="text-sm text-forest-700">DP lunas dalam <strong class="font-display text-lg">{breakEven()} tahun</strong></div>
          </div>
          <div class="font-mono text-xs text-gold-700">*asumsi {occupancy}% okupansi</div>
        </div>
      {/if}

      <!-- CTA -->
      <a
        href={waConsult}
        target="_blank"
        rel="noopener"
        class="btn btn-whatsapp w-full justify-center"
      >
        <MessageCircle size={16} /> Konsultasi Simulasi Ini via WhatsApp
      </a>
      <p class="text-[10px] text-ink-mute text-center font-mono">
        * Simulasi edukatif. Suku bunga final ditentukan bank/developer setelah appraisal.
      </p>
    </div>
  </div>
</div>