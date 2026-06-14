/**
 * KPR Calculator — porting dari js/main.js
 */

export interface KPRInput {
  price: number;
  dpPercent: number;
  tenorYears: number;
  interestRate: number; // annual %, flat
}

export interface KPRResult {
  dp: number;
  loan: number;
  cicilan: number;
  totalPayment: number;
  totalInterest: number;
}

export function calculateKPR({ price, dpPercent, tenorYears, interestRate }: KPRInput): KPRResult {
  const dp = price * (dpPercent / 100);
  const loan = price - dp;
  const monthlyRate = interestRate / 100 / 12;
  const months = tenorYears * 12;

  let cicilan: number;
  if (monthlyRate === 0) {
    cicilan = loan / months;
  } else {
    cicilan = (loan * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
              (Math.pow(1 + monthlyRate, months) - 1);
  }

  return {
    dp: Math.round(dp),
    loan: Math.round(loan),
    cicilan: Math.round(cicilan),
    totalPayment: Math.round(cicilan * months),
    totalInterest: Math.round(cicilan * months - loan),
  };
}

export interface PassiveInput {
  price: number;
  occupancyRate?: number; // 0-100
}

export interface PassiveResult {
  monthlyRevenue: number;
  operasionalCost: number;
  netRevenue: number;
  ownerShare: number;
}

export function calculatePassiveIncome({ price, occupancyRate = 50 }: PassiveInput): PassiveResult {
  // Asumsi: tarif Rp 2.2jt/malam
  const nightlyRate = 2200000;
  const monthlyRevenue = nightlyRate * 30 * (occupancyRate / 100);
  const operasionalCost = monthlyRevenue * 0.2;
  const netRevenue = monthlyRevenue - operasionalCost;
  const ownerShare = netRevenue * 0.7;

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    operasionalCost: Math.round(operasionalCost),
    netRevenue: Math.round(netRevenue),
    ownerShare: Math.round(ownerShare),
  };
}
