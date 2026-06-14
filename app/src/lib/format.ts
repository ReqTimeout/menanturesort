/**
 * Format number ke Rupiah string.
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

/**
 * Format angka ke singkat (1.2M, 15K).
 */
export function formatShort(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} M`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)} jt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} rb`;
  return n.toString();
}

/**
 * Generate WhatsApp URL dengan pre-filled message.
 */
export function waUrl(number: string, message: string, source = 'website'): string {
  const text = encodeURIComponent(`${message}\n\n— via ${source}`);
  return `https://wa.me/${number}?text=${text}`;
}
