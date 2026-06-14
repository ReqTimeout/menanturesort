<script>
  import { onMount } from 'svelte';
  import { Eye, TrendingUp, Check } from 'lucide-svelte';
  import siteData from '../../data/site.json';

  let visible = $state(true);
  let viewers = $state(siteData.stats.activeViewers);
  let recent = $state([]);

  const events = [
    { name: 'Budi S.', city: 'Jakarta', action: 'sedang membaca halaman Villa Mapan', time: 2 },
    { name: 'Linda W.', city: 'Surabaya', action: 'baru saja request survey', time: 5 },
    { name: 'Andi P.', city: 'Bandung', action: 'menghitung simulasi KPR', time: 7 },
    { name: 'Sari D.', city: 'Semarang', action: 'sedang melihat promo diskon', time: 9 },
    { name: 'Hendra K.', city: 'Bekasi', action: 'baru saja download brosur PDF', time: 12 },
    { name: 'Maya R.', city: 'Yogyakarta', action: 'membandingkan 3 tipe villa', time: 14 },
  ];

  onMount(() => {
    // Start with first event
    let i = 0;
    recent = [events[0]];

    const rotate = setInterval(() => {
      i = (i + 1) % events.length;
      recent = [events[i]];
    }, 4500);

    const fluctuate = setInterval(() => {
      viewers = Math.max(4, siteData.stats.activeViewers + Math.floor(Math.random() * 9) - 4);
    }, 3500);

    return () => { clearInterval(rotate); clearInterval(fluctuate); };
  });
</script>

{#if visible && recent.length}
  <div class="fixed bottom-24 left-6 z-30 max-w-xs hidden lg:block animate-fade-in">
    {#each recent as event}
      <div class="flex items-start gap-3 bg-white border border-cream-100 shadow-lg p-4 pr-12 relative">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-forest-700 text-gold-500 flex items-center justify-center font-display font-bold">
          {event.name.charAt(0)}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 font-body text-sm font-semibold text-forest-700">
            {event.name}
            <span class="text-ink-500 text-xs font-normal">· {event.city}</span>
          </div>
          <div class="font-body text-xs text-ink-500 mt-0.5">
            {event.action}
          </div>
          <div class="font-body text-[10px] text-gold-700 mt-1 uppercase tracking-wider font-semibold flex items-center gap-1">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse"></span>
            {event.time} menit lalu
          </div>
        </div>
        <button onclick={() => visible = false} class="absolute top-2 right-2 text-ink-500 hover:text-forest-700 text-xs" aria-label="Close">×</button>
      </div>
    {/each}
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeIn 0.4s ease-out; }
</style>
