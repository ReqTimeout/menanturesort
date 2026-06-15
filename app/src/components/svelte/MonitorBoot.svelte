<script>
  import { onMount } from 'svelte';
  import { initWebVitals } from '@lib/webVitals';
  import { initErrorReporting } from '@lib/errorReporter';

  let ready = $state(false);

  onMount(async () => {
    if (ready) return;
    try {
      initWebVitals();
      initErrorReporting();
      ready = true;
      // Expose global init hooks for AnalyticsBoot
      if (typeof window !== 'undefined') {
        window.mrInitVitals = initWebVitals;
        window.mrInitErrors = initErrorReporting;
      }
    } catch (e) {
      console.error('[MonitorBoot] Failed to init:', e);
    }
  });
</script>

<!-- Silent component: no UI, just init side effects -->
