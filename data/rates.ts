// Single source of truth for the current tax year's figures.
// Every calculator and the RatesTable read from here — a tax-year update
// touches this file only.
//
// Source: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
// (HMRC, published 30 Jan 2026, applies 6 Apr 2026 – 5 Apr 2027)

export const taxYearLabel = "2026/27";
export const lastUpdated = "August 2026";
/** Machine-readable form of `lastUpdated` for schema.org dateModified. */
export const lastUpdatedIso = "2026-08-01";

export const currentRates = {
  employerNi: {
    rate: 0.15, // Class 1 employer main rate
    secondaryThreshold: 5000, // annual
    employmentAllowance: 10500, // annual allowance
  },
  employeeNi: {
    mainRate: 0.08, // Class 1 employee main rate
    additionalRate: 0.02, // above the UEL
    primaryThreshold: 12570, // annual
    upperEarningsLimit: 50270, // annual
  },
  incomeTax: {
    // England, Wales & Northern Ireland (rUK)
    personalAllowance: 12570,
    basicRate: 0.2,
    basicRateLimit: 37700, // taxable band above PA
    higherRate: 0.4,
    additionalRate: 0.45,
    additionalThreshold: 125140, // adjusted net income
  },
  dividendTax: {
    allowance: 500,
    basicRate: 0.0875,
    higherRate: 0.3375,
    additionalRate: 0.3935,
  },
  corporationTax: {
    smallProfitsRate: 0.19,
  },
  ssp: {
    weeklyRate: 123.25, // or 80% of AWE if lower
    maxWeeks: 28,
  },
  smp: {
    weeklyRate: 194.32, // flat-rate weeks (or 90% AWE if lower)
    firstSixWeeksPct: 0.9, // 90% of AWE for first 6 weeks
    totalWeeks: 39,
    lowerEarningsLimit: 123, // weekly eligibility threshold used by the competitor calculator
  },
  maternityAllowance: {
    weeklyRate: 194.32, // or 90% AWE if lower, up to 39 weeks
    lowerWeeklyRate: 27, // self-employed fallback/low Class 2 NI rate
    minimumWeeklyEarnings: 30,
    totalWeeks: 39,
    qualifyingPeriodWeeks: 66,
    requiredClass2NiWeeks: 13,
  },
  pension: {
    employerMinPercent: 3, // auto-enrolment minimum employer contribution
    employeeMinPercent: 5, // auto-enrolment minimum employee contribution (incl. tax relief)
    autoEnrolmentTrigger: 10000, // annual earnings trigger
    qualifyingLowerLimit: 6240, // annual lower qualifying earnings band
    qualifyingUpperLimit: 50270, // annual upper qualifying earnings band
  },
  nationalMinimumWage: {
    // From 1 April 2026
    over21: 12.71,
    aged18to20: 10.85,
    under18: 8.0,
    apprentice: 8.0,
  },
  apprenticeshipLevy: {
    rate: 0.005,
    allowance: 15000,
    payBillThreshold: 3000000,
  },
};

export interface RateRow {
  label: string;
  value: string;
}

// Display rows for the shared RatesTable component.
export const rateRows: RateRow[] = [
  { label: "Employer NI main rate", value: fmtPct(currentRates.employerNi.rate) },
  { label: "Secondary threshold (annual)", value: fmtGbp(currentRates.employerNi.secondaryThreshold) },
  { label: "Employment Allowance", value: fmtGbp(currentRates.employerNi.employmentAllowance) },
  { label: "Employee NI main rate", value: fmtPct(currentRates.employeeNi.mainRate) },
  { label: "Primary threshold (annual)", value: fmtGbp(currentRates.employeeNi.primaryThreshold) },
  { label: "Personal Allowance", value: fmtGbp(currentRates.incomeTax.personalAllowance) },
  { label: "Basic income tax rate", value: fmtPct(currentRates.incomeTax.basicRate) },
  { label: "SSP weekly rate", value: fmtGbp(currentRates.ssp.weeklyRate) },
  { label: "SMP weekly rate (flat weeks)", value: fmtGbp(currentRates.smp.weeklyRate) },
  { label: "Auto-enrolment employer minimum", value: fmtPercentPoints(currentRates.pension.employerMinPercent) },
  { label: "Auto-enrolment employee minimum", value: fmtPercentPoints(currentRates.pension.employeeMinPercent) },
  { label: "National Living Wage (21+, per hour)", value: fmtGbp(currentRates.nationalMinimumWage.over21) },
];

function fmtGbp(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(n);
}

function fmtPct(n: number) {
  return `${(n * 100).toFixed(2).replace(/\.00$/, "")}%`;
}

function fmtPercentPoints(n: number) {
  return `${n.toFixed(2).replace(/\.00$/, "")}%`;
}
