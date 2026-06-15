/**
 * Web Vitals monitoring — tracks Core Web Vitals to GA4
 *
 * Metrics:
 *   - LCP (Largest Contentful Paint) — target < 2.5s
 *   - FID (First Input Delay) / INP (Interaction to Next Paint) — target < 100ms
 *   - CLS (Cumulative Layout Shift) — target < 0.1
 *   - FCP (First Contentful Paint) — target < 1.8s
 *   - TTFB (Time to First Byte) — target < 800ms
 *
 * All metrics sent to GA4 as `web_vital` event with metric name + value.
 * Only fires after user grants analytics consent.
 */

type MetricName = 'LCP' | 'FID' | 'INP' | 'CLS' | 'FCP' | 'TTFB';

interface VitalMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

// Thresholds (from web.dev)
const THRESHOLDS: Record<MetricName, [number, number]> = {
  LCP: [2500, 4000],
  FID: [100, 300],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const [good, poor] = THRESHOLDS[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function sendToGA(metric: VitalMetric) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  // Check consent
  try {
    const c = localStorage.getItem('mr_cookie_consent');
    if (!c || !JSON.parse(c).accepted) return;
  } catch {
    return;
  }
  window.gtag('event', 'web_vital', {
    metric_name: metric.name,
    metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    metric_id: metric.id,
    page_path: window.location.pathname,
  });
  // Also log to console in dev
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
  }
}

/**
 * Initialize web vitals tracking. Should be called once on page load.
 * Uses native PerformanceObserver APIs (no external dep).
 */
export function initWebVitals(): void {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

  // LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      if (!lastEntry) return;
      const value = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
      sendToGA({
        name: 'LCP',
        value,
        rating: getRating('LCP', value),
        delta: 0,
        id: `lcp-${Date.now()}`,
        navigationType: 'navigate',
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // LCP not supported
  }

  // FID (legacy) + INP (newer)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const value = (entry as PerformanceEntry & { processingStart?: number; duration?: number }).processingStart
          ? (entry as PerformanceEntry & { processingStart: number; startTime: number }).processingStart - entry.startTime
          : entry.duration;
        sendToGA({
          name: 'FID',
          value,
          rating: getRating('FID', value),
          delta: 0,
          id: `fid-${Date.now()}`,
          navigationType: 'navigate',
        });
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // FID not supported
  }

  // CLS
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<PerformanceEntry & { hadRecentInput?: boolean; value?: number }>) {
        if (!entry.hadRecentInput && entry.value) {
          clsValue += entry.value;
        }
      }
      sendToGA({
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
        delta: 0,
        id: `cls-${Date.now()}`,
        navigationType: 'navigate',
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // CLS not supported
  }

  // FCP
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntriesByName('first-contentful-paint');
      if (entries.length > 0) {
        const value = entries[0].startTime;
        sendToGA({
          name: 'FCP',
          value,
          rating: getRating('FCP', value),
          delta: 0,
          id: `fcp-${Date.now()}`,
          navigationType: 'navigate',
        });
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // FCP not supported
  }

  // TTFB
  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav) {
      const ttfb = nav.responseStart - nav.requestStart;
      sendToGA({
        name: 'TTFB',
        value: ttfb,
        rating: getRating('TTFB', ttfb),
        delta: 0,
        id: `ttfb-${Date.now()}`,
        navigationType: nav.type,
      });
    }
  } catch (e) {
    // TTFB not available
  }
}

/**
 * Manual performance summary for debug
 */
export function getPerformanceSummary() {
  if (typeof window === 'undefined' || !performance) return null;
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (!nav) return null;
  return {
    ttfb: nav.responseStart - nav.requestStart,
    domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
    loadComplete: nav.loadEventEnd - nav.startTime,
    transferSize: nav.transferSize,
  };
}
