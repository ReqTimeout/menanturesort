<script>
  import { motion } from '@humanspeak/svelte-motion';
  import villaData from '@data/villa.json';
  import { Check, X, Maximize, Bed, Layers, Wallet, TrendingUp, Calendar, Home } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  const rows = [
    { icon: Home, label: 'Nama Vila', key: 'name' },
    { icon: Maximize, label: 'Luas Bangunan', key: 'lb', unit: 'm²' },
    { icon: Maximize, label: 'Luas Tanah', key: 'lt', unit: 'm²' },
    { icon: Bed, label: 'Kamar Tidur', key: 'bedrooms' },
    { icon: Bed, label: 'Kamar Mandi', key: 'bathrooms' },
    { icon: Layers, label: 'Lantai', key: 'floors' },
    { icon: Wallet, label: 'Harga Mulai', key: 'priceDisplay', isCurrency: true },
    { icon: Wallet, label: 'Booking Fee', key: 'bookingFee', isRupiah: true },
    { icon: TrendingUp, label: 'Cicilan KPR / bln', key: 'cicilanBank', isRupiah: true },
    { icon: TrendingUp, label: 'Passive Income / bln', key: 'passiveIncome', isRupiah: true },
    { icon: Calendar, label: 'Posisi', key: 'position' },
    { icon: Home, label: 'Arsitektur', key: 'architecture' },
  ];

  const featuresRows = [
    { label: 'Cocok untuk', bijak: 'Pasangan muda, first-time investor', idaman: 'Keluarga, sweet spot value', mapan: 'Mereka yang tidak puas dengan cukup' },
    { label: 'Best For', bijak: 'Entry-level, cashflow ringan', idaman: 'Best value, ROI optimal', mapan: 'Flagship, sky deck, prestige' },
    { label: 'Capital Gain (15 tahun)', bijak: '+Rp 700jt - 1,5M', idaman: '+Rp 1,1M - 1,7M', mapan: '+Rp 1,5M - 2,2M' },
    { label: 'SHM Bersih', bijak: true, idaman: true, mapan: true },
    { label: 'Dikelola Sahid', bijak: true, idaman: true, mapan: true },
    { label: 'ROI Guarantee 10% (2 tahun)', bijak: true, idaman: true, mapan: true },
    { label: 'Fully Furnished', bijak: true, idaman: true, mapan: true },
    { label: 'Smart Home', bijak: true, idaman: true, mapan: true },
    { label: 'Private Sky Deck', bijak: false, idaman: false, mapan: true },
  ];

  const formatRp = (n) => {
    if (typeof n !== 'number') return n;
    if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)} M`;
    if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} jt`;
    return `Rp ${n.toLocaleString('id-ID')}`;
  };
</script>

<section class="bg-white py-20 md:py-32 relative overflow-hidden" data-section="comparison">
  <div class="container-wide">
    <!-- Heading -->
    <div class="grid grid-cols-12 gap-8 mb-12">
      <div class="col-span-12 md:col-span-2">
        <motion.div
                    viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          class="font-mono text-xs uppercase tracking-widest text-gold-700"
        >
          — Perbandingan
        </motion.div>
      </div>
      <div class="col-span-12 md:col-span-10">
        <motion.h2
                    viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          class="font-display text-forest-700 leading-[0.95] tracking-tight text-editorial-md font-bold"
        >
          Tiga vila, tiga karakter.<br/>
          <em class="text-gold-700">Mana yang Anda?</em>
        </motion.h2>
        <motion.p
                    viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          class="font-body text-ink-500 leading-relaxed mt-6 max-w-2xl"
        >
          Tabel di bawah adalah jujur — tidak ada villa yang lebih unggul di semua aspek. Bijak paling ringan cashflow, Mapan paling premium, Idaman sweet spot di tengah. Pilih yang paling cocok dengan profil Anda.
        </motion.p>
      </div>
    </div>

    <!-- Comparison table -->
    <motion.div
            viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      class="overflow-x-auto"
    >
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-ink-500 w-1/4 bg-cream-50 border-b border-cream-100">Aspek</th>
            {#each villaData.types as v}
              <th class="p-4 text-center border-b border-cream-100 align-bottom {v.bestValue ? 'bg-gold-500' : ''}">
                <div class="space-y-1">
                  <div class="font-mono text-[10px] uppercase tracking-widest text-ink-500">{v.taglineShort}</div>
                  <div class="font-display text-xl text-forest-700 font-bold leading-tight">{v.name}</div>
                  <div class="font-mono text-sm text-gold-700 font-bold">{v.priceDisplay}</div>
                  {#if v.bestValue}
                    <div class="font-mono text-[10px] uppercase tracking-widest text-forest-700 bg-forest-700 text-gold-500 inline-block px-2 py-0.5 mt-1">★ Best Value</div>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each rows as r, i}
            <motion.tr
                            viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              class="border-b border-cream-100 hover:bg-cream-50/30 transition-colors"
            >
              <td class="p-4 font-body text-sm text-forest-700 font-semibold">
                <div class="flex items-center gap-2">
                  <r.icon size={14} class="text-gold-700" />
                  {r.label}
                </div>
              </td>
              {#each villaData.types as v}
                <td class="p-4 text-center font-body text-sm text-forest-700 {v.bestValue ? 'bg-gold-500/10' : ''}">
                  {#if r.isCurrency || r.isRupiah}
                    <span class="font-mono font-semibold">{formatRp(v[r.key])}</span>
                  {:else}
                    {v[r.key]} {r.unit || ''}
                  {/if}
                </td>
              {/each}
            </motion.tr>
          {/each}

          <!-- Spacer -->
          <tr><td colspan="4" class="p-0"><div class="h-2 bg-cream-50 border-y border-cream-100"></div></td></tr>

          <!-- Features -->
          {#each featuresRows as r, i}
            <motion.tr
                            viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
              class="border-b border-cream-100 hover:bg-cream-50/30 transition-colors"
            >
              <td class="p-4 font-body text-sm text-forest-700 font-semibold">{r.label}</td>
              {#each ['bijak', 'idaman', 'mapan'] as id}
                <td class="p-4 text-center {id === 'idaman' ? 'bg-gold-500/10' : ''}">
                  {#if typeof r[id] === 'boolean'}
                    {#if r[id]}
                      <Check size={20} class="text-whatsapp mx-auto" strokeWidth={2.5} />
                    {:else}
                      <X size={20} class="text-ink-500/30 mx-auto" />
                    {/if}
                  {:else}
                    <span class="font-body text-sm text-ink-500 italic">{r[id]}</span>
                  {/if}
                </td>
              {/each}
            </motion.tr>
          {/each}

          <!-- CTAs -->
          <tr>
            <td class="p-4"></td>
            {#each villaData.types as v}
              <td class="p-4 text-center {v.bestValue ? 'bg-gold-500/10' : ''}">
                <motion.a
                  href={`/villa/${v.id}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  class="inline-flex items-center gap-2 px-4 py-2 font-body font-semibold text-xs tracking-wide transition-all border {v.bestValue ? 'bg-forest-700 text-cream-50 border-forest-700' : 'bg-white text-forest-700 border-forest-700 hover:bg-forest-700 hover:text-cream-50'}"
                >
                  Lihat Detail
                </motion.a>
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </motion.div>

    <motion.p
            viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      class="font-body text-sm text-ink-500 italic mt-8 max-w-3xl"
    >
      ⚠ Tabel ini jujur. Tidak ada villa yang sempurna. Bijak paling ringan tapi paling kecil passive income. Mapan paling premium tapi cicilan lebih tinggi. Idaman sweet spot. Atau… <a href="/kontak" class="text-forest-700 font-semibold not-italic">bicara dengan konsultan untuk rekomendasi personal →</a>
    </motion.p>
  </div>
</section>
