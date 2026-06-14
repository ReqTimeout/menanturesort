<script>
  import { Dialog } from '@lib/components/ui';
  import { MessageCircle, Check, Sparkles, Phone, User, Home, Wallet } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let { open = $bindable(false), source = 'booking_dialog' } = $props();

  let name = $state('');
  let phone = $state('');
  let interest = $state('Bijak (Attic Limasan)');
  let budget = $state('1-1.5 M');

  function submit() {
    const msg = `Halo, saya ${name || 'calon investor'} ingin booking survey Menantu Resort.\n\n• Nama: ${name || '-'}\n• No HP: ${phone || '-'}\n• Minat: ${interest}\n• Budget: ${budget}\n\nMohon info jadwal survey dan promo terbaru. Terima kasih!`;
    window.open(waUrl(siteData.contact.whatsapp, msg, source), '_blank');
    open = false;
  }
</script>

<Dialog bind:open title="Booking Survei Gratis" description="Cek unit langsung di lokasi, termasuk transport dari Bandung. Tim kami akan menghubungi Anda dalam 1x24 jam.">
  <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="space-y-4 mt-2">
    <div>
      <label for="bd-name" class="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
      <div class="relative">
        <User size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
        <input id="bd-name" type="text" bind:value={name} placeholder="Nama Anda" class="w-full pl-10 pr-4 py-3 border border-cream-100 bg-cream-50/50 font-body text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-colors" />
      </div>
    </div>

    <div>
      <label for="bd-phone" class="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">No WhatsApp</label>
      <div class="relative">
        <Phone size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
        <input id="bd-phone" type="tel" bind:value={phone} placeholder="08xxx" class="w-full pl-10 pr-4 py-3 border border-cream-100 bg-cream-50/50 font-body text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-colors" />
      </div>
    </div>

    <div>
      <label for="bd-interest" class="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">Tipe Villa</label>
      <div class="relative">
        <Home size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
        <select id="bd-interest" bind:value={interest} class="w-full pl-10 pr-4 py-3 border border-cream-100 bg-cream-50/50 font-body text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-colors appearance-none">
          <option>Bijak (Attic Limasan) — 1,2 M</option>
          <option>Idaman (Double Glass) — 1,6 M</option>
          <option>Mapan (Gothic Arch) — 2 M</option>
        </select>
      </div>
    </div>

    <div>
      <label for="bd-budget" class="block font-body text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">Budget Range</label>
      <div class="relative">
        <Wallet size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
        <select id="bd-budget" bind:value={budget} class="w-full pl-10 pr-4 py-3 border border-cream-100 bg-cream-50/50 font-body text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-colors appearance-none">
          <option>1-1.5 M</option>
          <option>1.5-2 M</option>
          <option>2 M +</option>
        </select>
      </div>
    </div>

    <button type="submit" class="btn btn-whatsapp w-full mt-6 group">
      <MessageCircle size={18} />
      <span>Lanjut ke WhatsApp</span>
      <Sparkles size={14} class="text-white/70 group-hover:text-white" />
    </button>

    <div class="flex items-start gap-2 text-xs text-ink-500 pt-2">
      <Check size={14} class="text-gold-500 mt-0.5 flex-shrink-0" />
      <span>Data Anda aman dan tidak akan dibagikan ke pihak ketiga.</span>
    </div>
  </form>
</Dialog>
