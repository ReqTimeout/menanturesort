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
    class="hidden md:block fixed bottom-6 left-6 z-40 max-w-sm transition-all duration-500"
    class:translate-y-0={visible}
    class:opacity-100={visible}
    class:translate-y-4={!visible}
    class:opacity-0={!visible}
    role="status"
    aria-live="polite"
  >
    <a
      href={waLink}
      target="_blank"
      rel="noopener"
      class="block bg-white border-2 border-gold-500/40 shadow-xl p-4 hover:border-gold-500 transition-colors"
    >
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 bg-success-100 text-success-700 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 class="w-5 h-5" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-mono text-[10px] uppercase tracking-widest text-gold-700 mb-1">— Aktivitas Terkini</div>
          <p class="text-sm text-ink-700 leading-snug">
            <strong class="text-forest-700">{currentToast.customer}</strong> baru saja memesan villa <strong class="text-forest-700">{currentToast.villa}</strong>
          </p>
          <p class="text-xs text-ink-mute mt-1">{currentToast.time} · Hubungi kami untuk info ketersediaan →</p>
        </div>
        <button
          type="button"
          onclick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss(); }}
          class="text-ink-mute hover:text-ink-700 flex-shrink-0"
          aria-label="Tutup notifikasi"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </a>
  </div>
{/if}
