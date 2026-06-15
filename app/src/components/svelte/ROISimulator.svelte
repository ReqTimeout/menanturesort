<script>
  import { onMount } from 'svelte';
  import villaData from '@data/villa.json';
  import { TrendingUp, ArrowUp, ArrowDown, MessageCircle, Sparkles, BarChart3, Calendar } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  const VILLAS = villaData.types;

  let selectedId = $state('idaman');
  let occupancy = $state(55);
  let roomRate = $state(2200000);
  let yearlyGrowth = $state(8);
  let capitalGrowth = $state(10); // 5y compounding
  let years = $state(15);

  const villa = $derived(VILLAS.find((v) => v.id === selectedId));

  // Annual passive income with growth compounding
  const annualIncome = $derived(() => {
    const base = roomRate * 365 * (occupancy / 100) * 0.7; // 70% owner share after 20% ops
    const arr = [];
    for (let y = 1; y <= years; y++) {
      arr.push(base * Math.pow(1 + yearlyGrowth / 100, y - 1));
    }
    return arr;
  });

  // Cumulative
  const cumulative = $derived(() => {
    const incomes = annualIncome();
    let sum = 0;
    return incomes.map((v) => (sum += v));
  });

  // Property value with capital appreciation (compounding)
  const propertyValue = $derived(() => {
    const factor = Math.pow(1 + capitalGrowth / 100, 1 / 5); // per-year
    const arr = [];
    for (let y = 0; y <= years; y++) {
      arr.push(villa.price * Math.pow(factor, y));
    }
    return arr;
  });

  // Total return per year (cumulative income + capital gain at that point)
  const totalReturn = $derived(() => {
    const cum = cumulative();
    const val = propertyValue();
    return val.map((v, i) => ({
      year: i,
      income: i === 0 ? 0 : annualIncome()[i - 1],
      cumulative: i === 0 ? 0 : cum[i - 1],
      propertyValue: v,
      capitalGain: v - villa.price,
      total: (i === 0 ? 0 : cum[i - 1]) + (v - villa.price),
    }));
  });

  // Cap rate
  const capRate = $derived((annualIncome()[0] / villa.price) * 100);

  // IRR approximation (cumulative income + capital gain over years, vs initial price)
  const totalReturnFinal = $derived(totalReturn()[years]);
  const totalReturnPct = $derived((totalReturnFinal.total / villa.price) * 100);
  const cagr = $derived((Math.pow(totalReturnFinal.total / villa.price + 1, 1 / years) - 1) * 100);

  // Break-even year (cumulative income >= DP 30%)
  const dpAmount = $derived(villa.price * 0.3);
  const breakEvenYear = $derived(() => {
    const cum = cumulative();
    for (let i = 0; i < cum.length; i++) {
      if (cum[i] >= dpAmount) return i + 1;
    }
    return null;
  });

  // Chart path
  const chartPath = $derived(() => {
    const data = totalReturn();
    if (data.length < 2) return { line: '', area: '', dots: [] };
    const maxY = Math.max(...data.map((d) => d.total));
    const w = 600, h = 220;
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * w,
      y: h - (d.total / maxY) * h,
      raw: d,
    }));
    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const area = `${line} L ${w} ${h} L 0 ${h} Z`;
    return { line, area, points, maxY };
  });

  // Sensitivity table — what if occupancy / rate change
  const sensitivity = $derived(() => {
    const scenarios = [
      { label: 'Pesimis', occ: occupancy - 15, color: 'warning' },
      { label: 'Konservatif', occ: occupancy - 5, color: 'warning' },
      { label: 'Aktual', occ: occupancy, color: 'success' },
      { label: 'Optimis', occ: Math.min(occupancy + 10, 90), color: 'success' },
    ];
    return scenarios.map((s) => {
      const annual = roomRate * 365 * (s.occ / 100) * 0.7;
      const monthly = annual / 12;
      const yr15 = annual * 15 * (1 + yearlyGrowth / 100 * 7.5); // rough avg growth
      return { ...s, annual: Math.round(annual), monthly: Math.round(monthly), yr15: Math.round(yr15) };
    });
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
    `Halo, saya mau tanya detail simulasi ROI ${villa.name} okupansi ${occupancy}% tarif ${fmtShort(roomRate)}`,
    'roi_calc'
  );
</script>

<div class="roi-card">
  <!-- Header -->
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <TrendingUp size={18} class="text-gold-700" />
        <span class="font-mono text-xs uppercase tracking-widest text-gold-700">ROI Simulator</span>
      </div>
      <h3 class="font-display text-2xl md:text-3xl text-forest-700 font-bold">Proyeksi 15 Tahun</h3>
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

  <!-- Top Stats Row -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
    <div class="p-4 bg-cream-50 border-l-4 border-gold-700">
      <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Cap Rate</div>
      <div class="font-display text-2xl text-forest-700 font-bold">{capRate.toFixed(1)}%</div>
      <div class="text-[10px] text-ink-mute font-mono mt-0.5">p.a. · year 1</div>
    </div>
    <div class="p-4 bg-cream-50 border-l-4 border-gold-700">
      <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Total Return</div>
      <div class="font-display text-2xl text-forest-700 font-bold">{totalReturnPct.toFixed(0)}%</div>
      <div class="text-[10px] text-ink-mute font-mono mt-0.5">over {years}y</div>
    </div>
    <div class="p-4 bg-cream-50 border-l-4 border-gold-700">
      <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">CAGR</div>
      <div class="font-display text-2xl text-forest-700 font-bold">{cagr.toFixed(1)}%</div>
      <div class="text-[10px] text-ink-mute font-mono mt-0.5">compound annual</div>
    </div>
    <div class="p-4 bg-cream-50 border-l-4 border-gold-700">
      <div class="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-1">Break-even DP</div>
      <div class="font-display text-2xl text-forest-700 font-bold">
        {breakEvenYear() ? breakEvenYear() + ' thn' : '—'}
      </div>
      <div class="text-[10px] text-ink-mute font-mono mt-0.5">cumulative income</div>
    </div>
  </div>

  <!-- Sliders -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-cream-100">
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Okupansi</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{occupancy}%</div>
      </div>
      <input type="range" min="30" max="85" step="5" bind:value={occupancy} class="w-full roi-slider" />
    </div>
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Tarif / Malam</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{fmtShort(roomRate)}</div>
      </div>
      <input type="range" min="1000000" max="4000000" step="100000" bind:value={roomRate} class="w-full roi-slider" />
    </div>
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Income Growth</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{yearlyGrowth}%</div>
      </div>
      <input type="range" min="0" max="20" step="1" bind:value={yearlyGrowth} class="w-full roi-slider" />
    </div>
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-mono uppercase tracking-widest text-ink-mute">Capital Growth</label>
        <div class="font-mono text-sm text-forest-700 font-bold">{capitalGrowth}%</div>
      </div>
      <input type="range" min="0" max="20" step="1" bind:value={capitalGrowth} class="w-full roi-slider" />
    </div>
  </div>

  <!-- Chart -->
  <div class="mb-6">
    <div class="flex items-center justify-between mb-3">
      <div class="font-mono text-xs uppercase tracking-widest text-ink-mute flex items-center gap-1.5">
        <BarChart3 size={14} class="text-gold-700" /> Total Return Over Time
      </div>
      <div class="text-xs text-ink-mute font-mono">Final: <strong class="text-forest-700">{fmtShort(totalReturnFinal.total)}</strong></div>
    </div>
    <div class="w-full bg-cream-50 border border-cream-100 p-4">
      <svg viewBox="0 0 600 220" class="w-full h-auto" preserveAspectRatio="none">
        <defs>
          <linearGradient id="roi-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#D4A574" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#D4A574" stop-opacity="0" />
          </linearGradient>
        </defs>
        <!-- gridlines -->
        <line x1="0" y1="55" x2="600" y2="55" stroke="#E5DFD5" stroke-dasharray="2 4" />
        <line x1="0" y1="110" x2="600" y2="110" stroke="#E5DFD5" stroke-dasharray="2 4" />
        <line x1="0" y1="165" x2="600" y2="165" stroke="#E5DFD5" stroke-dasharray="2 4" />
        <!-- area + line -->
        <path d={chartPath().area} fill="url(#roi-area)" />
        <path d={chartPath().line} fill="none" stroke="#1B4332" stroke-width="2" />
        <!-- dots -->
        {#each chartPath().points as p, i}
          <circle cx={p.x} cy={p.y} r="3" fill="#D4A574" stroke="#1B4332" stroke-width="1.5" />
        {/each}
        <!-- axis labels -->
        <text x="0" y="218" font-family="monospace" font-size="9" fill="#7A8479">Y0</text>
        <text x="290" y="218" font-family="monospace" font-size="9" fill="#7A8479" text-anchor="middle">Y{years / 2}</text>
        <text x="600" y="218" font-family="monospace" font-size="9" fill="#7A8479" text-anchor="end">Y{years}</text>
      </svg>
    </div>
  </div>

  <!-- Sensitivity Table -->
  <div class="mb-6">
    <div class="font-mono text-xs uppercase tracking-widest text-ink-mute mb-3 flex items-center gap-1.5">
      <Calendar size={14} class="text-gold-700" /> Sensitivity Analysis (15 tahun)
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      {#each sensitivity() as s}
        <div class="p-3 border" class:border-success={s.color === 'success'} class:bg-success-50={s.color === 'success'} class:border-warning={s.color === 'warning'} class:bg-warning-50={s.color === 'warning'}>
          <div class="font-mono text-[10px] uppercase tracking-widest mb-1" class:text-success-700={s.color === 'success'} class:text-warning-700={s.color === 'warning'}>{s.label}</div>
          <div class="text-xs text-ink-mute mb-1.5">{s.occ}% okupansi</div>
          <div class="font-mono text-sm text-forest-700 font-bold">{fmtShort(s.monthly)}<span class="text-xs font-normal text-ink-mute">/bln</span></div>
          <div class="font-mono text-xs text-ink-soft">15y: {fmtShort(s.yr15)}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Final CTA -->
  <a
    href={waConsult}
    target="_blank"
    rel="noopener"
    class="btn btn-whatsapp w-full justify-center"
  >
    <MessageCircle size={16} /> Diskusi Proyeksi Ini via WhatsApp
  </a>
  <p class="text-[10px] text-ink-mute text-center font-mono mt-2">
    * Proyeksi edukatif berdasarkan asumsi konserfatif. Performa aktual dapat bervariasi.
  </p>
</div>