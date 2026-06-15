/**
 * Analytics wrapper — consent-aware Google Analytics 4 + custom event tracking
 *
 * Usage:
 *   - `import { trackEvent, trackPageview, initAnalytics } from '@lib/analytics'`
 *   - `trackEvent('whatsapp_click', { location: 'header' })`
 *   - `trackPageview('/villa/bijak')`
 *
 * GA4 only fires events after user consent via CookieConsent.
 * On consent decline, all calls become no-ops (with localStorage for internal tracking).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    mrAnalytics?: {
      trackEvent: (name: string, params?: Record<string, unknown>) => void;
      trackPageview: (path: string) => void;
      consent: 'granted' | 'denied' | 'pending';
    };
  }
}

const CONSENT_KEY = 'mr_cookie_consent';

export type ConsentStatus = 'granted' | 'denied' | 'pending';

export function getConsent(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return 'pending';
    const parsed = JSON.parse(stored);
    return parsed.accepted ? 'granted' : 'denied';
  } catch {
    return 'pending';
  }
}

export function setConsent(accepted: boolean): void {
  if (typeof window === 'undefined') return;
  const status: ConsentStatus = accepted ? 'granted' : 'denied';
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ accepted, ts: Date.now(), status })
  );

  // Update GA consent mode
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied',
    });
  }

  // Dispatch event for in-page components to react
  window.dispatchEvent(
    new CustomEvent('mr:consent-change', { detail: { accepted, status } })
  );
}

let initialized = false;

/**
 * Initialize GA4. Reads PUBLIC_GA4_ID from env (Vite import.meta.env).
 * Must be called client-side (after consent given or on every page if no consent banner).
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  const GA4_ID = import.meta.env.PUBLIC_GA4_ID;
  if (!GA4_ID) {
    // No GA4 ID configured — silent mode
    if (!window.mrAnalytics) {
      window.mrAnalytics = {
        trackEvent: () => {},
        trackPageview: () => {},
        consent: getConsent(),
      };
    }
    return;
  }

  // Inject gtag.js
  const consent = getConsent();
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    (window.dataLayer as unknown[]).push(args);
  });
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, {
    anonymize_ip: true,
    send_page_view: false, // we'll trigger manually for SPA-like nav
    consent_mode: {
      analytics_storage: consent === 'granted' ? 'granted' : 'denied',
    },
  });

  // Inject script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GA4_ID}`;
  document.head.appendChild(script);

  // Public API
  window.mrAnalytics = {
    trackEvent: (name, params) => trackEvent(name, params),
    trackPageview: (path) => trackPageview(path),
    consent,
  };
}

/**
 * Track custom event. No-op if consent not granted (or no GA4).
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  if (getConsent() !== 'granted') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/**
 * Track SPA-style pageview. For static site, this is called on initial load.
 */
export function trackPageview(path: string, title?: string): void {
  if (typeof window === 'undefined') return;
  if (getConsent() !== 'granted') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
}

/**
 * Common business events for Menantu Resort
 */
export const EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  BOOKING_SUBMIT: 'booking_submit',
  KPR_CALCULATE: 'kpr_calculate',
  VILLA_COMPARE: 'villa_compare',
  PANORAMA_VIEW: 'panorama_view',
  FAQ_OPEN: 'faq_open',
  TESTIMONI_VIEW: 'testimoni_view',
  CTA_VIEW: 'cta_view',
  FORM_LEAD: 'generate_lead',
  PHONE_CLICK: 'phone_click',
};
