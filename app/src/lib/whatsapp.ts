/**
 * WhatsApp Deep-Link Generator (V5.2)
 *
 * Standard 5 macro-CTA + format pesan sesuai brand.
 * Lihat PLAN_REDESIGN_V5.md §4.2.
 */

import { formatRupiah } from './format';

export type CTAMacroId = 'survei' | 'konsultasi' | 'simulasi' | 'brosur' | 'telepon';

export interface LeadFormData {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  villaId?: 'bijak' | 'idaman' | 'mapan' | null;
  budget?: string;
  timeline?: string;
  purpose?: string;
  surveyPref?: string;
  message?: string;
}

const PHONE_DEFAULT = '6285925942277';

/**
 * Build WhatsApp wa.me URL dengan pesan terformat.
 */
export function buildWaUrl(
  phone: string = PHONE_DEFAULT,
  message: string,
  source: string = 'menantu-resort.com'
): string {
  const text = encodeURIComponent(`${message}\n\n\u2014 via ${source}`);
  return `https://wa.me/${phone}?text=${text}`;
}

/**
 * @deprecated Alias untuk `buildWaUrl` — backward compat dengan code lama.
 */
export const waUrl = buildWaUrl;

/**
 * 5 Macro-CTA Standard Messages
 */
export const MACRO_CTA_MESSAGES: Record<CTAMacroId, string> = {
  survei: `Halo, saya tertarik untuk *Survei Gratis & Lihat Villa* di Menantu Resort.
Bisa dijadwalkan untuk weekend ini?`,

  konsultasi: `Halo, saya ingin *Konsultasi WhatsApp* tentang investasi villa di Menantu Resort.
Bisa jelaskan lebih lanjut tentang:

• Cicilan per bulan
• Skema pembayaran (Bank vs Developer)
• Estimasi passive income
• Jadwal survei lokasi`,

  simulasi: `Halo, saya ingin *Hitung Simulasi KPR* untuk villa di Menantu Resort.
Bisa dihitung untuk:`,

  brosur: `Halo, saya ingin *Download Brosur PDF* lengkap tentang Menantu Resort.
Mohon dikirimkan ke WhatsApp saya, termasuk:

• Siteplan kawasan
• Tabel harga 3 tipe villa
• Skema KPR Bank & Developer
• Proyeksi ROI`,

  telepon: `Halo, saya ingin *Jadwalkan Telepon* dengan tim sales Menantu Resort.
Bisa di jadwal:`,
};

/**
 * Build CTA URL by macro ID.
 */
export function ctaUrl(
  macroId: CTAMacroId,
  phone: string = PHONE_DEFAULT,
  extra: string = ''
): string {
  const base = MACRO_CTA_MESSAGES[macroId];
  const fullMessage = extra ? `${base}\n\n${extra}` : base;
  return buildWaUrl(phone, fullMessage);
}

/**
 * Format pesan dari form data (untuk LeadForm/BookingDialog).
 */
export function buildLeadMessage(data: LeadFormData, villaName?: string): string {
  const lines: string[] = ['Halo, saya tertarik dengan *Menantu Resort*.', ''];

  if (data.name) lines.push(`👤 Nama: ${data.name}`);
  if (data.phone) lines.push(`📱 WhatsApp: ${data.phone}`);
  if (data.email) lines.push(`📧 Email: ${data.email}`);
  if (data.city) lines.push(`🏙️ Kota: ${data.city}`);

  if (villaName) {
    lines.push('');
    lines.push(`🏠 Villa: *${villaName}*`);
  }

  if (data.purpose) lines.push(`🎯 Tujuan: ${data.purpose}`);
  if (data.budget) lines.push(`💰 Budget: ${data.budget}`);
  if (data.timeline) lines.push(`📅 Timeline: ${data.timeline}`);
  if (data.surveyPref) lines.push(`🚗 Preferensi Survei: ${data.surveyPref}`);

  if (data.message) {
    lines.push('');
    lines.push('💬 Pesan:');
    lines.push(data.message);
  }

  lines.push('');
  lines.push('Ditunggu balasannya, terima kasih! 🙏');

  return lines.join('\n');
}

/**
 * Build lead URL dengan form data.
 */
export function leadWaUrl(
  data: LeadFormData,
  villaName?: string,
  phone: string = PHONE_DEFAULT
): string {
  return buildWaUrl(phone, buildLeadMessage(data, villaName));
}

/**
 * Build micro-commitment hero form (1 field only).
 */
export function heroMicroUrl(phone: string = PHONE_DEFAULT): string {
  return buildWaUrl(
    phone,
    `Halo, saya tertarik survei Villa Menantu Resort.`
  );
}

/**
 * Format harga untuk WhatsApp (lebih ringkas).
 */
export function priceShort(n: number): string {
  return formatRupiah(n, false);
}
