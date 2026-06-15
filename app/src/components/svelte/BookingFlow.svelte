<script>
  import villaData from '@data/villa.json';
  import siteData from '@data/site.json';
  import { waUrl } from '@lib/utils';
  import { Check, ChevronRight, ChevronLeft, MessageCircle, Sparkles, Home, Wallet, Calendar, User, Phone, Mail, Loader2 } from 'lucide-svelte';

  const VILLAS = villaData.types;
  const STEPS = ['villa', 'profile', 'review'];

  let step = $state(0);
  let submitting = $state(false);
  let done = $state(false);

  // Step 1: Villa
  let selectedVillaId = $state('idaman');
  let kprType = $state('bank'); // bank | developer | cash
  let purpose = $state('investment'); // investment | own-stay | both

  // Step 2: Profile
  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let city = $state('');
  let timeline = $state('1-3-bulan'); // now | 1-3-bulan | 3-6-bulan | 6-12-bulan | research
  let budget = $state(''); // 1.2-1.6 | 1.6-2 | 2-plus

  const villa = $derived(VILLAS.find((v) => v.id === selectedVillaId));
  const purposeLabel = { investment: 'Investasi', 'own-stay': 'Huni Sendiri', both: 'Investasi + Huni' };
  const kprLabel = { bank: 'KPR Bank (5%)', developer: 'KPR Developer (7%)', cash: 'Cash / Tidak KPR' };
  const timelineLabel = {
    now: 'Siap booking minggu ini',
    '1-3-bulan': '1-3 bulan ke depan',
    '3-6-bulan': '3-6 bulan ke depan',
    '6-12-bulan': '6-12 bulan ke depan',
    research: 'Masih riset, belum ada target',
  };
  const budgetLabel = {
    '1-1.5': 'Rp 1 - 1.5 M (Bijak)',
    '1.5-2': 'Rp 1.5 - 2 M (Idaman)',
    '2-plus': 'Rp 2 M+ (Mapan)',
    flexible: 'Fleksibel, lihat semua opsi',
  };

  const canNext = $derived(() => {
    if (step === 0) return true; // villa always has default
    if (step === 1) return name.trim().length > 1 && phone.trim().length >= 8;
    return true;
  });

  function next() {
    if (canNext()) {
      if (step < STEPS.length - 1) step++;
      else submit();
    }
  }
  function back() {
    if (step > 0) step--;
  }

  async function submit() {
    submitting = true;
    // Build WhatsApp deep link with all form data
    const msg = `Halo, saya ingin booking ${villa.name}!

📋 Tipe: ${villa.name} (${villa.priceDisplay})
💰 Pembayaran: ${kprLabel[kprType]}
🎯 Tujuan: ${purposeLabel[purpose]}
⏰ Timeline: ${timelineLabel[timeline]}
💵 Budget: ${budgetLabel[budget] || 'Belum ditentukan'}

👤 Nama: ${name}
📱 WhatsApp: ${phone}
📧 Email: ${email || '-'}
📍 Domisili: ${city || '-'}

Mohon info prosedur booking fee dan langkah selanjutnya. Terima kasih!`;

    // Simulate "submit" delay
    await new Promise((r) => setTimeout(r, 800));
    submitting = false;
    done = true;

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl(siteData.contact.whatsapp, msg, 'booking_flow'), '_blank');
    }, 500);
  }

  function reset() {
    step = 0;
    done = false;
    selectedVillaId = 'idaman';
    name = '';
    phone = '';
    email = '';
    city = '';
  }
</script>

<div class="booking-card">
  {#if !done}
    <!-- Stepper -->
    <div class="flex items-center justify-between mb-8">
      {#each STEPS as s, i}
        {@const Icon = s === 'villa' ? Home : s === 'profile' ? User : Check}
        <div class="flex items-center flex-1" class:last={i === STEPS.length - 1}>
          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="step-circle" class:step-active={step === i} class:step-done={step > i}>
              {#if step > i}
                <Check size={14} />
              {:else}
                <Icon size={14} />
              {/if}
            </div>
            <div class="font-mono text-[10px] uppercase tracking-widest" class:text-gold-700={step >= i} class:text-ink-mute={step < i}>
              {i === 0 ? 'Villa' : i === 1 ? 'Data Diri' : 'Konfirmasi'}
            </div>
          </div>
          {#if i < STEPS.length - 1}
            <div class="flex-1 h-px mx-3 -mt-5" class:bg-gold-700={step > i} class:bg-cream-100={step <= i}></div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Step 1: Villa Selection -->
    {#if step === 0}
      <div class="step-content">
        <h3 class="font-display text-2xl text-forest-700 font-bold mb-2">Pilih Villa & Pembiayaan</h3>
        <p class="text-sm text-ink-soft mb-6">Tentukan tipe villa yang Anda minati.</p>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-ink-700 mb-3">Tipe Villa</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              {#each VILLAS as v}
                <button
                  type="button"
                  onclick={() => (selectedVillaId = v.id)}
                  class="villa-option"
                  class:villa-selected={selectedVillaId === v.id}
                >
                  <div class="font-mono text-[10px] uppercase tracking-widest text-gold-700 mb-1">{v.label}</div>
                  <div class="font-display text-lg text-forest-700 font-bold mb-1">{v.name.split(' ')[1]}</div>
                  <div class="font-mono text-base text-forest-700 font-bold">{v.priceDisplay}</div>
                  <div class="text-xs text-ink-mute mt-1">{v.lb}m² · {v.bedrooms}BR · {v.bathrooms}BA</div>
                  {#if selectedVillaId === v.id}
                    <div class="absolute top-2 right-2 w-5 h-5 bg-gold-700 text-forest-700 flex items-center justify-center">
                      <Check size={12} />
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-ink-700 mb-3">Skema Pembayaran</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              {#each [{ id: 'bank', label: 'KPR Bank', desc: '5% flat · 20 thn' }, { id: 'developer', label: 'KPR Developer', desc: '7% flat · 15 thn' }, { id: 'cash', label: 'Cash Keras', desc: 'Tanpa KPR' }] as opt}
                <button
                  type="button"
                  onclick={() => (kprType = opt.id)}
                  class="kpr-option"
                  class:kpr-selected={kprType === opt.id}
                >
                  <div class="font-display text-base text-forest-700 font-bold">{opt.label}</div>
                  <div class="text-xs text-ink-mute mt-0.5">{opt.desc}</div>
                  {#if kprType === opt.id}
                    <div class="absolute top-2 right-2 w-5 h-5 bg-gold-700 text-forest-700 flex items-center justify-center">
                      <Check size={12} />
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-ink-700 mb-3">Tujuan Pembelian</label>
            <div class="grid grid-cols-3 gap-2">
              {#each [{ id: 'investment', label: 'Investasi' }, { id: 'own-stay', label: 'Huni Sendiri' }, { id: 'both', label: 'Dua-duanya' }] as opt}
                <button
                  type="button"
                  onclick={() => (purpose = opt.id)}
                  class="px-4 py-3 text-sm font-semibold transition-all"
                  class:purpose-active={purpose === opt.id}
                  class:purpose-inactive={purpose !== opt.id}
                >{opt.label}</button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Step 2: Profile -->
    {#if step === 1}
      <div class="step-content">
        <h3 class="font-display text-2xl text-forest-700 font-bold mb-2">Data Diri Anda</h3>
        <p class="text-sm text-ink-soft mb-6">Agar tim kami bisa menghubungi Anda dengan informasi yang relevan.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-1.5">Nama Lengkap *</label>
            <input type="text" bind:value={name} placeholder="Budi Santoso" class="form-input" />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-1.5">No. WhatsApp *</label>
            <input type="tel" bind:value={phone} placeholder="0812-3456-7890" class="form-input" />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-1.5">Email (opsional)</label>
            <input type="email" bind:value={email} placeholder="budi@email.com" class="form-input" />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-1.5">Domisili</label>
            <input type="text" bind:value={city} placeholder="Jakarta" class="form-input" />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-1.5">Timeline</label>
            <select bind:value={timeline} class="form-input">
              <option value="now">Siap minggu ini</option>
              <option value="1-3-bulan">1-3 bulan</option>
              <option value="3-6-bulan">3-6 bulan</option>
              <option value="6-12-bulan">6-12 bulan</option>
              <option value="research">Masih riset</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-1.5">Budget</label>
            <select bind:value={budget} class="form-input">
              <option value="">— Pilih budget —</option>
              <option value="1-1.5">Rp 1-1.5 M (Bijak)</option>
              <option value="1.5-2">Rp 1.5-2 M (Idaman)</option>
              <option value="2-plus">Rp 2 M+ (Mapan)</option>
              <option value="flexible">Fleksibel</option>
            </select>
          </div>
        </div>
      </div>
    {/if}

    <!-- Step 3: Review -->
    {#if step === 2}
      <div class="step-content">
        <h3 class="font-display text-2xl text-forest-700 font-bold mb-2">Konfirmasi Booking</h3>
        <p class="text-sm text-ink-soft mb-6">Periksa data Anda. Setelah submit, tim kami akan menghubungi via WhatsApp dalam 1 jam.</p>

        <div class="bg-forest-50 border-l-4 border-gold-700 p-6 space-y-3">
          <div class="flex justify-between border-b border-forest-700/10 pb-2">
            <span class="text-sm text-ink-mute">Villa</span>
            <span class="font-display text-forest-700 font-bold">{villa.name}</span>
          </div>
          <div class="flex justify-between border-b border-forest-700/10 pb-2">
            <span class="text-sm text-ink-mute">Harga</span>
            <span class="font-mono font-bold text-forest-700">{villa.priceDisplay}</span>
          </div>
          <div class="flex justify-between border-b border-forest-700/10 pb-2">
            <span class="text-sm text-ink-mute">Pembayaran</span>
            <span class="font-semibold text-forest-700">{kprLabel[kprType]}</span>
          </div>
          <div class="flex justify-between border-b border-forest-700/10 pb-2">
            <span class="text-sm text-ink-mute">Tujuan</span>
            <span class="font-semibold text-forest-700">{purposeLabel[purpose]}</span>
          </div>
          <div class="flex justify-between border-b border-forest-700/10 pb-2">
            <span class="text-sm text-ink-mute">Timeline</span>
            <span class="font-semibold text-forest-700">{timelineLabel[timeline]}</span>
          </div>
          <div class="flex justify-between border-b border-forest-700/10 pb-2">
            <span class="text-sm text-ink-mute">Nama</span>
            <span class="font-semibold text-forest-700">{name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-ink-mute">WhatsApp</span>
            <span class="font-mono font-semibold text-forest-700">{phone}</span>
          </div>
        </div>

        <div class="mt-4 p-3 bg-gold-50 border-l-4 border-gold-700 text-xs text-ink-700">
          <strong class="text-gold-700">Catatan:</strong> Setelah submit, WhatsApp akan terbuka dengan pesan yang sudah terformat. Tim sales akan membalas dalam 1 jam (jam kerja).
        </div>
      </div>
    {/if}

    <!-- Footer Actions -->
    <div class="flex justify-between gap-3 mt-8 pt-6 border-t border-cream-100">
      {#if step > 0}
        <button type="button" onclick={back} class="btn btn-outline" disabled={submitting}>
          <ChevronLeft size={16} /> Kembali
        </button>
      {:else}
        <div></div>
      {/if}
      <button
        type="button"
        onclick={next}
        class="btn btn-primary"
        disabled={!canNext() || submitting}
      >
        {#if submitting}
          <Loader2 size={16} class="animate-spin" /> Memproses...
        {:else if step === STEPS.length - 1}
          <MessageCircle size={16} /> Submit & Buka WhatsApp
        {:else}
          Lanjut <ChevronRight size={16} />
        {/if}
      </button>
    </div>
  {:else}
    <!-- Success State -->
    <div class="text-center py-8">
      <div class="w-16 h-16 bg-success-100 border-2 border-success-700 flex items-center justify-center mx-auto mb-4">
        <Check size={28} class="text-success-700" />
      </div>
      <h3 class="font-display text-2xl text-forest-700 font-bold mb-2">Booking Terkirim!</h3>
      <p class="text-sm text-ink-soft mb-6 max-w-md mx-auto">
        WhatsApp akan terbuka dengan pesan terformat. Tim sales akan menghubungi Anda dalam 1 jam.
      </p>
      <button type="button" onclick={reset} class="btn btn-outline">
        Booking Villa Lain
      </button>
    </div>
  {/if}
</div>