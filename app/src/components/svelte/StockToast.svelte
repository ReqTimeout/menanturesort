<script>
  /**
   * StockToast.svelte — Slide-in toast notification
   * Menampilkan "Baru saja: Unit Mapan #2 di-booking" setiap 45 detik.
   * WOW factor: social proof real-time, FOMO trigger.
   *
   * Random villa, random customer name, random time ago (2-15 menit).
   */
  import { onMount } from 'svelte';
  import { CheckCircle2, X } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let visible = $state(false);
  let dismissed = $state(false);
  let currentToast = $state({ villa: '', time: '', customer: '' });

  const villas = ['Bijak', 'Idaman', 'Mapan'];
  const customers = [
    'Budi', 'Andi', 'Siti', 'Dewi', 'Rian', 'Maya', 'Eko', 'Putri', 'Hadi', 'Lia',
    'Yusuf', 'Ratna', 'Fajar', 'Indah', 'Reza', 'Mila'
  ];
  const actions = ['melakukan survey', 'mengisi form konsultasi', 'membayar booking fee', 'mendownload brosur'];

  function generateToast() {
    const villa = villas[Math.floor(Math.random() * villas.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const minutes = Math.floor(Math.random() * 13) + 2; // 2-15 menit
    return { villa, customer, time: `${minutes} menit lalu` };
  }

  function showToast() {
    if (dismissed) return;
    currentToast = generateToast();
    visible = true;
    setTimeout(() => { visible = false; }, 6000);
  }

  function dismiss() {
    visible = false;
    dismissed = true;
  }

  onMount(() => {
    // First toast: after 8 detik
    const first = setTimeout(showToast, 8000);
    // Repeat: every 45 detik
    const interval = setInterval(showToast, 45000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  });

  const waLink = waUrl(
    siteData.contact.whatsapp,
    'Halo, saya tertarik dengan unit yang tersedia. Mohon info detail & jadwal survey.',
    'live_activity'
  );
</script>

{#if visible}
  <div
    class="fixed bottom-[6.5rem] left-3 right-3 md:left-6 md:right-auto md:bottom-6 md:max-w-sm z-40 transition-all duration-500"
    class:translate-y-0={visible}
    class:opacity-100={visible}
    class:translate-y-3={!visible}
    class:opacity-0={!visible}
    role="status"
    aria-live="polite"
  >
    <a
      href={waLink}
      target="_blank"
      rel="noopener"
      class="group flex items-center gap-3 bg-forest-900/95 backdrop-blur-md border border-gold-500/30 shadow-2xl shadow-forest-900/40 px-3.5 py-3 hover:border-gold-500/60 transition-colors rounded-xl"
    >
      <div class="relative w-9 h-9 bg-whatsapp flex items-center justify-center flex-shrink-0 rounded-lg">
        <CheckCircle2 class="w-4.5 h-4.5 text-white" strokeWidth="2.5" />
        <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gold-500 rounded-full ring-2 ring-forest-900 animate-pulse"></span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5 mb-0.5">
          <span class="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-bold">Aktivitas Terkini</span>
          <span class="text-cream-50/30 text-[9px]">·</span>
          <span class="font-mono text-[9px] text-cream-50/50">{currentToast.time}</span>
        </div>
        <p class="text-[13px] text-cream-50 leading-snug truncate">
          <strong class="text-gold-500 font-semibold">{currentToast.customer}</strong> memesan villa <strong class="text-gold-500 font-semibold">{currentToast.villa}</strong>
        </p>
      </div>
      <button
        type="button"
        onclick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss(); }}
        class="text-cream-50/40 hover:text-cream-50 flex-shrink-0 p-1"
        aria-label="Tutup notifikasi"
      >
        <X class="w-3.5 h-3.5" />
      </button>
    </a>
  </div>
{/if}
