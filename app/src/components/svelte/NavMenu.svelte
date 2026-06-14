<script>
  import { onMount } from 'svelte';
  import { Sheet } from '@lib/components/ui';
  import { Menu, X, Phone, MessageCircle } from 'lucide-svelte';
  import { waUrl } from '@lib/utils';
  import siteData from '@data/site.json';

  let scrolled = $state(false);
  let open = $state(false);

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/villa', label: 'Villa' },
    { href: '/investasi', label: 'Investasi' },
    { href: '/resort', label: 'Resort' },
    { href: '/lokasi', label: 'Lokasi' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/kontak', label: 'Kontak' },
  ];

  const waLink = waUrl(siteData.contact.whatsapp, 'Halo, saya ingin info Menantu Resort.', 'nav_menu');

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 24; };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<header class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"   >
  <nav class="container-wide flex items-center justify-between h-20 transition-colors"  >
    <a href="/" class="flex items-center gap-3 group">
      <img src="/images/ref/logo-gold.png" alt="Menantu Resort" class="h-10 w-auto transition-all"    />
    </a>

    <ul class="hidden lg:flex items-center gap-1">
      {#each links as link}
        <li>
          <a href={link.href} class="px-4 py-2 font-body text-sm font-semibold tracking-wide transition-colors hover:text-gold-500">
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="hidden lg:flex items-center gap-3">
      <a href={`tel:${siteData.contact.whatsapp}`} class="p-2 hover:text-gold-500 transition-colors" aria-label="Telepon">
        <Phone size={18} />
      </a>
      <a href={waLink} target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-forest-700 font-body font-semibold text-sm tracking-wide hover:bg-gold-300 transition-colors">
        <MessageCircle size={16} />
        WhatsApp
      </a>
    </div>

    <button onclick={() => (open = true)} class="lg:hidden p-2" aria-label="Buka menu">
      <Menu size={28} />
    </button>
  </nav>
</header>

<Sheet bind:open side="right" class="w-full sm:max-w-md bg-cream-50">
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between pb-6 border-b border-cream-100">
      <img src="/images/ref/logo-gold.png" alt="Menantu Resort" class="h-9 w-auto" />
      <button onclick={() => (open = false)} class="p-2 text-forest-700"><X size={24} /></button>
    </div>
    <ul class="flex-1 py-6 space-y-1">
      {#each links as link}
        <li>
          <a href={link.href} onclick={() => (open = false)} class="block py-3 font-display text-2xl text-forest-700 hover:text-gold-700 transition-colors">
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
    <div class="pt-6 border-t border-cream-100 space-y-3">
      <a href={waLink} target="_blank" rel="noopener" class="btn btn-secondary w-full">
        <MessageCircle size={18} />
        WhatsApp Kami
      </a>
      <a href={`tel:${siteData.contact.whatsapp}`} class="btn btn-outline w-full">
        <Phone size={18} />
        {siteData.contact.whatsappDisplay}
      </a>
    </div>
  </div>
</Sheet>
