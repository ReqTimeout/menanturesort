/**
 * Format utilities (V5.2) — numbers, currency, dates, percentages
 */

export function formatRupiah(n: number, withSymbol = true): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
  return withSymbol ? formatted : formatted.replace('Rp\u00a0', 'Rp ');
}

export function formatShort(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} M`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)} jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} rb`;
  return n.toString();
}

export function formatPercent(n: number, decimals = 0): string {
  return `${n.toFixed(decimals)}%`;
}

/**
 * Format tanggal Indonesia: "30 Juni 2026"
 */
export function formatDateID(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Countdown ke tanggal ISO string.
 * Returns: { days, hours, minutes, seconds, expired }
 */
export function getCountdown(target: string | Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  const targetDate = typeof target === 'string' ? new Date(target) : target;
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, expired: false };
}

/**
 * Pad number ke 2 digit dengan leading zero.
 */
export function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}
