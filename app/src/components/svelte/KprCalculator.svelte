<script>
  let { defaultPrice = 1200000000 } = $props();

  let price = $state(defaultPrice);
  let dpPercent = $state(30);
  let tenorYears = $state(15);
  let interestRate = $state(5);
  let occupancy = $state(50);

  let kpr = $derived(calcKPR(price, dpPercent, tenorYears, interestRate));
  let passive = $derived(calcPassive(price, occupancy));
  let surplus = $derived(passive.ownerShare - kpr.cicilan);

  function calcKPR(p, dpPct, years, rate) {
    const dp = p * (dpPct / 100);
    const loan = p - dp;
    const mr = rate / 100 / 12;
    const m = years * 12;
    const cicilan = mr === 0 ? loan / m : Math.round((loan * (mr * Math.pow(1 + mr, m))) / (Math.pow(1 + mr, m) - 1));
    return {
      dp: Math.round(dp),
      loan: Math.round(loan),
      cicilan: Math.round(cicilan),
      totalPayment: Math.round(cicilan * m),
      totalInterest: Math.round(cicilan * m - loan),
    };
  }

  function calcPassive(p, occ) {
    const nightly = 2200000;
    const monthlyRev = nightly * 30 * (occ / 100);
    const ops = monthlyRev * 0.2;
    const net = monthlyRev - ops;
    const owner = net * 0.7;
    return { monthlyRev, ops, net, ownerShare: Math.round(owner) };
  }

  function fmtRp(n) {
    return 'Rp ' + Math.round(n).toLocaleString('id-ID');
  }
  function fmtShort(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + ' M';
    if (n >= 1e6) return (n / 1e6).toFixed(0) + ' jt';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + ' rb';
    return n.toString();
  }

  const VILLAS = [
    { id: 'bijak', name: 'Menantu Bijak', price: 1200000000 },
    { id: 'idaman', name: 'Menantu Idaman', price: 1600000000 },
    { id: 'mapan', name: 'Menantu Mapan', price: 2000000000 },
  ];
</script>

<div class="kpr-calc card p-2xl">
  <div class="flex items-center justify-between mb-lg flex-wrap gap-md">
    <div>
      <h3 class="heading-2 mb-xs">Simulasi KPR Interaktif</h3>
      <p class="text-sm text-ink-soft">Atur parameter di bawah — lihat hasilnya secara real-time.</p>
    </div>
    <div class="flex gap-xs flex-wrap">
      {#each VILLAS as v}
        <button
          type="button"
          class="villa-chip"
          class:active={price === v.price}
          onclick={() => (price = v.price)}
        >{v.name.split(' ')[1]}</button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
    <!-- INPUTS -->
    <div class="space-y-lg">
      <div>
        <label class="block text-sm font-semibold mb-xs">Harga Villa</label>
        <div class="flex items-center gap-md">
          <input
            type="range"
            min="1000000000" max="2500000000" step="100000000"
            bind:value={price}
            class="flex-1"
          />
          <div class="font-mono text-sm text-primary font-semibold w-24 text-right">{fmtShort(price)}</div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-xs">Down Payment ({dpPercent}%)</label>
        <div class="flex items-center gap-md">
          <input
            type="range" min="20" max="60" step="5"
            bind:value={dpPercent}
            class="flex-1"
          />
          <div class="font-mono text-sm text-primary font-semibold w-32 text-right">{fmtShort(kpr.dp)}</div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-xs">Tenor ({tenorYears} tahun)</label>
        <div class="flex items-center gap-md">
          <input
            type="range" min="5" max="20" step="5"
            bind:value={tenorYears}
            class="flex-1"
          />
          <div class="font-mono text-sm text-primary font-semibold w-24 text-right">{tenorYears} thn</div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-xs">Bunga ({interestRate}% flat)</label>
        <div class="flex items-center gap-md">
          <input
            type="range" min="3" max="10" step="0.5"
            bind:value={interestRate}
            class="flex-1"
          />
          <div class="font-mono text-sm text-primary font-semibold w-24 text-right">{interestRate}%</div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-xs">Estimasi Okupansi ({occupancy}%)</label>
        <div class="flex items-center gap-md">
          <input
            type="range" min="30" max="80" step="5"
            bind:value={occupancy}
            class="flex-1"
          />
          <div class="font-mono text-sm text-primary font-semibold w-24 text-right">{occupancy}%</div>
        </div>
      </div>
    </div>

    <!-- OUTPUTS -->
    <div class="bg-primary-dark text-white p-xl rounded-none">
      <div class="text-xs uppercase tracking-wider text-secondary mb-xs">Cicilan / Bulan</div>
      <div class="text-4xl font-display font-bold text-secondary mb-md">{fmtRp(kpr.cicilan)}</div>

      <div class="text-xs uppercase tracking-wider text-secondary mb-xs">Passive Income / Bulan</div>
      <div class="text-4xl font-display font-bold text-white mb-md">{fmtRp(passive.ownerShare)}</div>

      <div class="border-t border-white/20 pt-md mt-md">
        <div class="flex items-center justify-between text-sm">
          <span class="text-white/70">Surplus Bulanan</span>
          <span class="font-semibold text-lg" class:text-secondary={surplus > 0} class:text-red-400={surplus < 0}>
            {surplus >= 0 ? '+' : ''}{fmtRp(surplus)}
          </span>
        </div>
      </div>

      <div class="mt-md text-xs text-white/60 space-y-xs">
        <div class="flex justify-between"><span>Pokok Pinjaman</span><span class="font-mono">{fmtShort(kpr.loan)}</span></div>
        <div class="flex justify-between"><span>Total Bayar ({tenorYears} thn)</span><span class="font-mono">{fmtShort(kpr.totalPayment)}</span></div>
        <div class="flex justify-between"><span>Total Bunga</span><span class="font-mono">{fmtShort(kpr.totalInterest)}</span></div>
      </div>
    </div>
  </div>

  <p class="text-xs text-ink-mute mt-lg">
    ⚠️ Simulasi edukatif. Cicilan aktual tergantung suku bunga bank & profil kredit.
    Passive income tergantung okupansi nyata dan season.
  </p>
</div>

<style>
  .villa-chip {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    background: white;
    border: 1px solid #B8BDB5;
    color: #3D4A40;
    cursor: pointer;
    transition: all 0.2s;
  }
  .villa-chip:hover { border-color: #1B4332; }
  .villa-chip.active {
    background: #1B4332;
    color: white;
    border-color: #1B4332;
  }
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    background: #B8BDB5;
    outline: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: #D4A574;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #D4A574;
    cursor: pointer;
    border: 2px solid white;
  }
</style>
