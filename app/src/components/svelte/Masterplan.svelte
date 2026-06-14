<script>
  import { onMount } from 'svelte';
  import { MapPin } from 'lucide-svelte';

  let { hotspots = [] } = $props();
  let activeHotspot = $state(null);
</script>

<section class="bg-forest-700 text-cream-50 py-20 md:py-32 relative overflow-hidden">
  <!-- Decorative grid -->
  <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: linear-gradient(rgba(245, 240, 232, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 240, 232, 0.5) 1px, transparent 1px); background-size: 80px 80px;"></div>

  <div class="container-wide relative">
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 md:col-span-4">
        <div class="sticky top-32">
          <div class="font-mono text-xs uppercase tracking-widest text-gold-500 mb-4">— Masterplan</div>
          <h2 class="font-display text-5xl md:text-6xl text-cream-50 leading-[1.0] mb-6">
            Kawasan 3.5 hektar<br/><em class="text-gold-500">dirancang</em><br/>untuk gaya hidup baru.
          </h2>
          <p class="font-body text-cream-50/70 leading-relaxed">
            Bukan sekadar deretan vila. Ini adalah ekosistem terpadu: residensi pribadi, fasilitas resort, ruang komersial, dan ruang terbuka hijau. Klik hotspot untuk eksplorasi.
          </p>
        </div>
      </div>

      <div class="col-span-12 md:col-span-8">
        <!-- SVG masterplan map -->
        <div class="relative aspect-[4/3] bg-forest-900/40 border border-cream-50/10 backdrop-blur-sm">
          <svg viewBox="0 0 800 600" class="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
            <!-- Subtle topographic lines -->
            <defs>
              <pattern id="topo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(212, 165, 116, 0.08)" stroke-width="0.5"/>
                <circle cx="20" cy="20" r="12" fill="none" stroke="rgba(212, 165, 116, 0.08)" stroke-width="0.5"/>
                <circle cx="20" cy="20" r="6" fill="none" stroke="rgba(212, 165, 116, 0.08)" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topo)"/>

            <!-- Roads -->
            <path d="M 50 300 Q 400 280 750 320" fill="none" stroke="rgba(212, 165, 116, 0.4)" stroke-width="2" stroke-dasharray="4 4"/>
            <path d="M 400 50 L 400 550" fill="none" stroke="rgba(212, 165, 116, 0.3)" stroke-width="1.5" stroke-dasharray="2 4"/>

            <!-- Villa clusters -->
            <g fill="rgba(245, 240, 232, 0.04)" stroke="rgba(212, 165, 116, 0.2)" stroke-width="1">
              <rect x="100" y="120" width="80" height="60" rx="2"/>
              <rect x="200" y="120" width="80" height="60" rx="2"/>
              <rect x="300" y="120" width="80" height="60" rx="2"/>
              <rect x="500" y="120" width="80" height="60" rx="2"/>
              <rect x="600" y="120" width="80" height="60" rx="2"/>

              <rect x="100" y="380" width="80" height="60" rx="2"/>
              <rect x="200" y="380" width="80" height="60" rx="2"/>
              <rect x="500" y="380" width="80" height="60" rx="2"/>
              <rect x="600" y="380" width="80" height="60" rx="2"/>
            </g>

            <!-- Central plaza -->
            <circle cx="400" cy="300" r="60" fill="rgba(212, 165, 116, 0.08)" stroke="rgba(212, 165, 116, 0.4)" stroke-width="1.5"/>
            <text x="400" y="295" text-anchor="middle" fill="rgba(212, 165, 116, 0.8)" font-family="JetBrains Mono" font-size="9" letter-spacing="2">CENTRAL</text>
            <text x="400" y="310" text-anchor="middle" fill="rgba(212, 165, 116, 0.8)" font-family="JetBrains Mono" font-size="9" letter-spacing="2">PLAZA</text>

            <!-- Compass -->
            <g transform="translate(720, 50)">
              <circle r="20" fill="none" stroke="rgba(212, 165, 116, 0.3)" stroke-width="1"/>
              <text y="-8" text-anchor="middle" fill="#D4A574" font-family="JetBrains Mono" font-size="9">N</text>
              <line x1="0" y1="-15" x2="0" y2="-5" stroke="#D4A574" stroke-width="1.5"/>
            </g>

            <!-- North entrance -->
            <text x="400" y="25" text-anchor="middle" fill="rgba(245, 240, 232, 0.4)" font-family="Inter" font-size="9" letter-spacing="3">— NORTH ENTRANCE —</text>
          </svg>

          <!-- Hotspots overlay -->
          {#each hotspots as h, i}
            <button
              onclick={() => (activeHotspot = activeHotspot === i ? null : i)}
              class="hotspot absolute"
              style="left: {h.x}%; top: {h.y}%;"
              data-cursor="Lihat"
            >
              <span class="hotspot-ping"></span>
              <span class="hotspot-dot"></span>
              <span class="hotspot-label">{h.label}</span>
            </button>
          {/each}

          <!-- Active popup -->
          {#if activeHotspot !== null}
            {@const h = hotspots[activeHotspot]}
            <div class="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md p-6 bg-cream-50 text-forest-700 border border-gold-500 shadow-2xl z-20">
              <div class="font-mono text-xs text-gold-700 uppercase tracking-widest mb-2">{h.tag}</div>
              <h3 class="font-display text-2xl text-forest-700 font-bold mb-2">{h.label}</h3>
              <p class="font-body text-sm text-ink-500 leading-relaxed mb-4">{h.desc}</p>
              <button onclick={() => (activeHotspot = null)} class="font-body text-xs font-semibold text-forest-700 hover:text-gold-700 uppercase tracking-wider">Tutup ×</button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hotspot {
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .hotspot-dot {
    display: block;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #D4A574;
    box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.3);
  }
  .hotspot-ping {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: #D4A574;
    opacity: 0.4;
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .hotspot-label {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 8px);
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #D4A574;
    white-space: nowrap;
    padding-top: 4px;
  }
  @keyframes ping {
    75%, 100% { transform: scale(2.5); opacity: 0; }
  }
</style>
