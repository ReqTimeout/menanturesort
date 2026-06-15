<script>
  import { onMount } from 'svelte';
  import { MessageCircle, X, Phone, Calendar } from 'lucide-svelte';
  import { waUrl } from '../../lib/utils';
  import siteData from '../../data/site.json';
  import BookingDialog from './BookingDialog.svelte';

  let open = $state(false);
  let dialogOpen = $state(false);
  let visible = $state(false);

  onMount(() => {
    const onScroll = () => { visible = window.scrollY > 400; };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  const waLink = waUrl(siteData.contact.whatsapp, 'Halo, saya ingin tanya tentang Menantu Resort.', 'floating_fab');
</script>

{#if visible}
  <div class="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
    {#if open}
      <div class="flex flex-col gap-2 animate-fade-up">
        <button onclick={() => dialogOpen = true} class="group flex items-center gap-3 bg-white border border-cream-100 shadow-lg pl-4 pr-5 py-3 hover:border-gold-300 transition-all">
          <span class="w-10 h-10 bg-gold-500 text-forest-700 flex items-center justify-center group-hover:bg-gold-300 transition-colors">
            <Calendar size={18} />
          </span>
          <span class="font-body text-sm font-semibold text-forest-700">Booking Survei</span>
        </button>
        <a href={waLink} target="_blank" rel="noopener" class="group flex items-center gap-3 bg-white border border-cream-100 shadow-lg pl-4 pr-5 py-3 hover:border-whatsapp transition-all">
          <span class="w-10 h-10 bg-whatsapp text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageCircle size={18} />
          </span>
          <span class="font-body text-sm font-semibold text-forest-700">Chat WhatsApp</span>
        </a>
        <a href={`tel:${siteData.contact.whatsapp}`} class="group flex items-center gap-3 bg-white border border-cream-100 shadow-lg pl-4 pr-5 py-3 hover:border-forest-300 transition-all">
          <span class="w-10 h-10 bg-forest-700 text-gold-500 flex items-center justify-center group-hover:bg-forest-500 transition-colors">
            <Phone size={18} />
          </span>
          <span class="font-body text-sm font-semibold text-forest-700">{siteData.contact.whatsappDisplay}</span>
        </a>
      </div>
    {/if}
    <button
      onclick={() => (open = !open)}
      class="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      class:bg-whatsapp={!open}
      class:bg-forest-700={open}
      aria-label="Open contact menu"
    >
      {#if open}
        <X size={26} class="text-cream-50" />
      {:else}
        <MessageCircle size={28} class="text-white" />
        <span class="absolute -top-1 -right-1 flex h-5 w-5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-5 w-5 bg-gold-500 text-forest-700 text-[10px] font-bold items-center justify-center">1</span>
        </span>
      {/if}
    </button>
  </div>
{/if}

<BookingDialog bind:open={dialogOpen} source="floating_fab" />