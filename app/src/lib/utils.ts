/**
 * Utility umum (V5.2)
 * - cn() untuk class composition
 * - Re-exports dari format.ts & whatsapp.ts (backward compat untuk existing imports)
 *
 * @deprecated Import langsung dari './format' atau './whatsapp' untuk code baru.
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-exports untuk backward compatibility
export { formatRupiah, formatShort, formatPercent, formatDateID, getCountdown, pad2 } from './format';
export { waUrl, buildWaUrl, ctaUrl, leadWaUrl, heroMicroUrl, buildLeadMessage, priceShort } from './whatsapp';
