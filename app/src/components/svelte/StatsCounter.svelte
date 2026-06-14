<script>
  import { onMount } from 'svelte';
  import Counter from './Counter.svelte';
  import { Building2, Users, TrendingUp, Award } from 'lucide-svelte';

  const stats = [
    { icon: Building2, value: 74, suffix: '', label: 'Unit Premium', sub: '3 tipe vila' },
    { icon: Users, value: 428, suffix: '+', label: 'Investor Bergabung', sub: 'Tercatat resmi' },
    { icon: TrendingUp, value: 50, suffix: '+ Th', label: 'Track Record Sahid', sub: 'Hospitality' },
    { icon: Award, value: 10, suffix: '% p.a', label: 'ROI Guarantee', sub: '2 tahun pertama' },
  ];
</script>

<section class="bg-white border-y border-cream-100">
  <div class="container-wide py-12 md:py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {#each stats as s, i}
        <div class="group relative flex flex-col items-center text-center px-4 md:border-r md:border-cream-100 md:last:border-0" style="animation-delay: {i * 0.1}s">
          <svelte:component this={s.icon} size={28} class="text-gold-500 mb-3 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
          <div class="font-display text-4xl md:text-5xl text-forest-700 font-bold leading-none mb-2">
            <Counter target={s.value} suffix={s.suffix} duration={2000} />
          </div>
          <div class="font-body text-sm font-semibold text-forest-700 uppercase tracking-wider mb-1">{s.label}</div>
          <div class="font-body text-xs text-ink-500">{s.sub}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
