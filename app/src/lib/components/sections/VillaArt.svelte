<script>
  import { cn } from '../../utils';
  let { type = 'bijak', class: className = '' } = $props();

  // type: 'bijak' | 'idaman' | 'mapan'
  // Each villa is a detailed SVG architecture
</script>

{#if type === 'bijak'}
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" class={cn('w-full h-full', className)} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0D1B14"/>
        <stop offset="60%" stop-color="#1B4332"/>
        <stop offset="100%" stop-color="#3D4A40"/>
      </linearGradient>
      <linearGradient id="ground-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#061009"/>
        <stop offset="100%" stop-color="#0D1B14"/>
      </linearGradient>
      <linearGradient id="building-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F5F0E8"/>
        <stop offset="100%" stop-color="#E8DCC8"/>
      </linearGradient>
      <linearGradient id="wood-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#A8845C"/>
        <stop offset="100%" stop-color="#856240"/>
      </linearGradient>
      <linearGradient id="pool-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#508759" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#1B4332" stop-opacity="0.9"/>
      </linearGradient>
      <radialGradient id="warm-b" cx="80%" cy="20%" r="60%">
        <stop offset="0%" stop-color="#D4A574" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#D4A574" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky-b)"/>
    <rect width="800" height="600" fill="url(#warm-b)"/>
    <!-- Mountains -->
    <polygon points="0,420 100,360 220,400 350,340 480,380 600,330 720,360 800,340 800,500 0,500" fill="#0D1B14" opacity="0.6"/>
    <!-- Ground -->
    <rect y="500" width="800" height="100" fill="url(#ground-b)"/>
    <!-- Tree silhouettes -->
    <ellipse cx="100" cy="490" rx="35" ry="50" fill="#061009"/>
    <ellipse cx="700" cy="495" rx="40" ry="55" fill="#061009"/>
    <!-- Building 1 (main) -->
    <g transform="translate(250, 220)">
      <!-- Limasan roof (Javanese) -->
      <polygon points="0,80 150,0 300,80" fill="url(#wood-b)"/>
      <polygon points="20,80 150,15 280,80" fill="#856240" opacity="0.6"/>
      <!-- Body -->
      <rect x="10" y="80" width="280" height="200" fill="url(#building-b)"/>
      <!-- Wood accent -->
      <rect x="10" y="80" width="280" height="12" fill="url(#wood-b)"/>
      <!-- Windows -->
      <rect x="40" y="120" width="60" height="80" fill="#1B4332"/>
      <rect x="40" y="120" width="60" height="80" fill="#D4A574" opacity="0.3"/>
      <line x1="70" y1="120" x2="70" y2="200" stroke="#A8845C" stroke-width="2"/>
      <line x1="40" y1="160" x2="100" y2="160" stroke="#A8845C" stroke-width="2"/>
      <rect x="200" y="120" width="60" height="80" fill="#1B4332"/>
      <rect x="200" y="120" width="60" height="80" fill="#D4A574" opacity="0.3"/>
      <line x1="230" y1="120" x2="230" y2="200" stroke="#A8845C" stroke-width="2"/>
      <line x1="200" y1="160" x2="260" y2="160" stroke="#A8845C" stroke-width="2"/>
      <!-- Door -->
      <rect x="130" y="200" width="50" height="80" fill="#1B4332"/>
      <rect x="130" y="200" width="50" height="80" fill="#D4A574" opacity="0.2"/>
      <line x1="155" y1="200" x2="155" y2="280" stroke="#A8845C" stroke-width="1"/>
    </g>
    <!-- Pool -->
    <ellipse cx="650" cy="450" rx="60" ry="20" fill="url(#pool-b)"/>
    <!-- Light glow from windows -->
    <circle cx="305" cy="350" r="3" fill="#D4A574" opacity="0.7"/>
    <circle cx="465" cy="350" r="3" fill="#D4A574" opacity="0.7"/>
  </svg>
{:else if type === 'idaman'}
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" class={cn('w-full h-full', className)} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky-i" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#061009"/>
        <stop offset="50%" stop-color="#1B4332"/>
        <stop offset="100%" stop-color="#3D4A40"/>
      </linearGradient>
      <linearGradient id="building-i" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F5F0E8"/>
        <stop offset="100%" stop-color="#D4A574" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="wood-i" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#A8845C"/>
        <stop offset="100%" stop-color="#5C4329"/>
      </linearGradient>
      <linearGradient id="glass-i" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#508759" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#1B4332" stop-opacity="0.8"/>
      </linearGradient>
      <radialGradient id="warm-i" cx="20%" cy="20%" r="50%">
        <stop offset="0%" stop-color="#D4A574" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#D4A574" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky-i)"/>
    <rect width="800" height="600" fill="url(#warm-i)"/>
    <!-- Mountains -->
    <polygon points="0,400 120,330 260,380 400,310 540,360 680,300 800,340 800,480 0,480" fill="#061009" opacity="0.7"/>
    <!-- Ground -->
    <rect y="480" width="800" height="120" fill="#0D1B14"/>
    <!-- Building 2 (modern with double glass facade) -->
    <g transform="translate(180, 180)">
      <!-- Flat roof with overhang -->
      <rect x="0" y="0" width="440" height="20" fill="url(#wood-i)"/>
      <rect x="-20" y="20" width="480" height="8" fill="#856240"/>
      <!-- Body -->
      <rect x="0" y="28" width="440" height="290" fill="url(#building-i)"/>
      <!-- Wood accent strips (vertical) -->
      <rect x="20" y="50" width="6" height="240" fill="url(#wood-i)"/>
      <rect x="414" y="50" width="6" height="240" fill="url(#wood-i)"/>
      <!-- Double glass facade (large windows) -->
      <rect x="50" y="60" width="340" height="180" fill="url(#glass-i)"/>
      <!-- Glass frame -->
      <line x1="220" y1="60" x2="220" y2="240" stroke="#F5F0E8" stroke-width="3"/>
      <line x1="50" y1="150" x2="390" y2="150" stroke="#F5F0E8" stroke-width="2" opacity="0.5"/>
      <!-- Balcony on 2nd floor -->
      <rect x="50" y="240" width="340" height="6" fill="url(#wood-i)"/>
      <rect x="50" y="246" width="340" height="3" fill="#A8845C"/>
      <!-- Lower floor door -->
      <rect x="180" y="260" width="80" height="60" fill="#1B4332"/>
      <rect x="180" y="260" width="80" height="60" fill="#D4A574" opacity="0.2"/>
      <line x1="220" y1="260" x2="220" y2="320" stroke="#A8845C" stroke-width="1"/>
    </g>
    <!-- Pool -->
    <rect x="120" y="470" width="180" height="40" fill="#1B4332" opacity="0.7"/>
    <line x1="120" y1="470" x2="300" y2="470" stroke="#508759" stroke-width="2"/>
    <!-- Trees -->
    <ellipse cx="50" cy="490" rx="30" ry="45" fill="#061009"/>
    <ellipse cx="750" cy="490" rx="35" ry="50" fill="#061009"/>
    <!-- Soft glow -->
    <circle cx="290" cy="220" r="4" fill="#D4A574" opacity="0.8"/>
  </svg>
{:else}
  <!-- MAPAN: 3-story flagship with curved roof -->
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" class={cn('w-full h-full', className)} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky-m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#061009"/>
        <stop offset="40%" stop-color="#1B4332"/>
        <stop offset="100%" stop-color="#D4A574" stop-opacity="0.6"/>
      </linearGradient>
      <linearGradient id="building-m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F5F0E8"/>
        <stop offset="100%" stop-color="#A8845C" stop-opacity="0.6"/>
      </linearGradient>
      <linearGradient id="wood-m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#A8845C"/>
        <stop offset="100%" stop-color="#5C4329"/>
      </linearGradient>
      <linearGradient id="glass-m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#508759" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#1B4332" stop-opacity="0.8"/>
      </linearGradient>
      <radialGradient id="warm-m" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#D4A574" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#D4A574" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky-m)"/>
    <rect width="800" height="600" fill="url(#warm-m)"/>
    <!-- Mountains -->
    <polygon points="0,380 100,310 240,360 380,290 520,330 660,280 800,320 800,450 0,450" fill="#061009" opacity="0.6"/>
    <rect y="450" width="800" height="150" fill="#0D1B14"/>
    <!-- Building 3 (3-story with curved roof) -->
    <g transform="translate(150, 150)">
      <!-- Curved roof (Sasak / Gothic arch) -->
      <path d="M 0 80 Q 250 -10 500 80 L 500 100 L 0 100 Z" fill="url(#wood-m)"/>
      <path d="M 30 80 Q 250 5 470 80" fill="none" stroke="#5C4329" stroke-width="2"/>
      <!-- 3rd floor (master suite) -->
      <rect x="100" y="100" width="300" height="60" fill="url(#building-m)"/>
      <rect x="100" y="100" width="300" height="60" fill="url(#glass-m)" opacity="0.4"/>
      <line x1="200" y1="100" x2="200" y2="160" stroke="#F5F0E8" stroke-width="2"/>
      <line x1="300" y1="100" x2="300" y2="160" stroke="#F5F0E8" stroke-width="2"/>
      <!-- 2nd floor -->
      <rect x="50" y="160" width="400" height="100" fill="url(#building-m)"/>
      <rect x="70" y="175" width="360" height="70" fill="url(#glass-m)"/>
      <line x1="180" y1="175" x2="180" y2="245" stroke="#F5F0E8" stroke-width="2"/>
      <line x1="320" y1="175" x2="320" y2="245" stroke="#F5F0E8" stroke-width="2"/>
      <!-- Wood accent -->
      <rect x="50" y="160" width="6" height="100" fill="url(#wood-m)"/>
      <rect x="444" y="160" width="6" height="100" fill="url(#wood-m)"/>
      <!-- 1st floor -->
      <rect x="0" y="260" width="500" height="100" fill="url(#building-m)"/>
      <rect x="20" y="275" width="200" height="70" fill="url(#glass-m)" opacity="0.6"/>
      <rect x="280" y="275" width="200" height="70" fill="url(#glass-m)" opacity="0.6"/>
      <line x1="120" y1="275" x2="120" y2="345" stroke="#F5F0E8" stroke-width="2"/>
      <line x1="380" y1="275" x2="380" y2="345" stroke="#F5F0E8" stroke-width="2"/>
      <!-- Entrance -->
      <rect x="220" y="290" width="60" height="70" fill="#1B4332"/>
      <rect x="220" y="290" width="60" height="70" fill="#D4A574" opacity="0.2"/>
    </g>
    <!-- Pool -->
    <ellipse cx="400" cy="510" rx="100" ry="18" fill="#1B4332" opacity="0.7"/>
    <ellipse cx="400" cy="505" rx="100" ry="15" fill="#508759" opacity="0.4"/>
    <!-- Trees -->
    <ellipse cx="60" cy="500" rx="40" ry="55" fill="#061009"/>
    <ellipse cx="740" cy="500" rx="40" ry="55" fill="#061009"/>
    <!-- Glow -->
    <circle cx="270" cy="220" r="4" fill="#D4A574" opacity="0.7"/>
    <circle cx="380" cy="320" r="4" fill="#D4A574" opacity="0.7"/>
    <circle cx="490" cy="320" r="4" fill="#D4A574" opacity="0.7"/>
  </svg>
{/if}
