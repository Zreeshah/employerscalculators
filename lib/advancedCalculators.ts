import { currentRates } from "../data/rates.ts";
import { employeeNi, employerNi } from "./calculators.ts";

export type CompanyCarFuel = "petrol" | "diesel" | "electric" | "phev";
export type PhevRange = "130-plus" | "70-129" | "40-69" | "30-39" | "under-30";

export interface CompanyCarTaxInput {
  listPrice: number;
  fuel: CompanyCarFuel;
  co2: number;
  phevRange?: PhevRange;
  taxRate: number;
  annualEmployeeContribution?: number;
}

export interface CompanyCarTaxResult {
  bikPercent: number;
  bikValue: number;
  employeeContribution: number;
  taxableValue: number;
  employeeTaxAnnual: number;
  employeeTaxMonthly: number;
  class1aAnnual: number;
  class1aMonthly: number;
  combinedAnnualCost: number;
}

const phevRates2026: Record<PhevRange, number> = {
  "130-plus": 4,
  "70-129": 7,
  "40-69": 10,
  "30-39": 14,
  "under-30": 16,
};

/** HMRC Appendix 2 appropriate percentages for 2026/27. */
export function companyCarBikPercent2026(
  fuel: CompanyCarFuel,
  co2Input: number,
  phevRange: PhevRange = "under-30",
): number {
  if (fuel === "electric") return 4;

  const co2 = Math.max(0, Math.min(500, Math.floor(co2Input)));
  let rate: number;
  if (co2 === 0) rate = 4;
  else if (co2 <= 50) rate = fuel === "phev" ? phevRates2026[phevRange] : 16;
  else if (co2 <= 54) rate = 17;
  else if (co2 <= 74) rate = 18 + Math.floor((co2 - 55) / 5);
  else if (co2 <= 79) rate = 21;
  else rate = Math.min(37, 22 + Math.floor((co2 - 80) / 5));

  // The live competitor has one diesel option rather than a separate RDE2 flag.
  // Treating that option as surcharge-liable preserves its contract; the 37% cap is statutory.
  return fuel === "diesel" ? Math.min(37, rate + 4) : rate;
}

export function calculateCompanyCarTax(input: CompanyCarTaxInput): CompanyCarTaxResult {
  const listPrice = Math.max(0, input.listPrice || 0);
  const bikPercent = companyCarBikPercent2026(input.fuel, input.co2, input.phevRange);
  const bikValue = listPrice * (bikPercent / 100);
  const employeeContribution = Math.max(0, input.annualEmployeeContribution ?? 0);
  const taxableValue = Math.max(0, bikValue - employeeContribution);
  const employeeTaxAnnual = taxableValue * (Math.max(0, input.taxRate || 0) / 100);
  const class1aAnnual = taxableValue * currentRates.employerNi.rate;
  return {
    bikPercent,
    bikValue,
    employeeContribution,
    taxableValue,
    employeeTaxAnnual,
    employeeTaxMonthly: employeeTaxAnnual / 12,
    class1aAnnual,
    class1aMonthly: class1aAnnual / 12,
    combinedAnnualCost: employeeTaxAnnual + class1aAnnual,
  };
}

export type TaxCode = "1257L" | "BR" | "D0" | "D1" | "0T" | "K";
export type PensionMode = "none" | "salary-sacrifice" | "net-pay" | "relief-at-source";
export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5";

const studentLoanThresholds: Record<Exclude<StudentLoanPlan, "none">, number> = {
  plan1: 26900,
  plan2: 29385,
  plan4: 33795,
  plan5: 25000,
};

function progressiveTax(taxable: number, bands: Array<{ width: number | null; rate: number }>): number {
  let remaining = Math.max(0, taxable);
  let tax = 0;
  for (const band of bands) {
    const amount = band.width === null ? remaining : Math.min(remaining, band.width);
    tax += amount * band.rate;
    remaining -= amount;
    if (remaining <= 0) break;
  }
  return tax;
}

function personalAllowanceForIncome(income: number): number {
  return income <= 100000
    ? currentRates.incomeTax.personalAllowance
    : Math.max(0, currentRates.incomeTax.personalAllowance - (income - 100000) / 2);
}

export function incomeTaxForRegion(income: number, scotland = false): number {
  const taxable = Math.max(0, income - personalAllowanceForIncome(income));
  return scotland
    ? progressiveTax(taxable, [
        { width: 3967, rate: 0.19 },
        { width: 12989, rate: 0.2 },
        { width: 14136, rate: 0.21 },
        { width: 31338, rate: 0.42 },
        { width: 62710, rate: 0.45 },
        { width: null, rate: 0.48 },
      ])
    : progressiveTax(taxable, [
        { width: currentRates.incomeTax.basicRateLimit, rate: currentRates.incomeTax.basicRate },
        {
          width: currentRates.incomeTax.additionalThreshold - currentRates.incomeTax.basicRateLimit,
          rate: currentRates.incomeTax.higherRate,
        },
        { width: null, rate: currentRates.incomeTax.additionalRate },
      ]);
}

export function taxForCode(
  incomeInput: number,
  code: TaxCode,
  scotland = false,
  kCodeNumber = 0,
): number {
  const income = Math.max(0, incomeInput || 0);
  if (code === "BR") return income * 0.2;
  if (code === "D0") return income * (scotland ? 0.42 : 0.4);
  if (code === "D1") return income * (scotland ? 0.45 : 0.45);

  const allowance = code === "1257L" ? personalAllowanceForIncome(income) : 0;
  const kAdjustment = code === "K" ? Math.max(0, kCodeNumber || 0) * 10 : 0;
  const taxable = Math.max(0, income + kAdjustment - allowance);
  return scotland
    ? progressiveTax(taxable, [
        { width: 3967, rate: 0.19 },
        { width: 12989, rate: 0.2 },
        { width: 14136, rate: 0.21 },
        { width: 31338, rate: 0.42 },
        { width: 62710, rate: 0.45 },
        { width: null, rate: 0.48 },
      ])
    : progressiveTax(taxable, [
        { width: currentRates.incomeTax.basicRateLimit, rate: currentRates.incomeTax.basicRate },
        {
          width: currentRates.incomeTax.additionalThreshold - currentRates.incomeTax.basicRateLimit,
          rate: currentRates.incomeTax.higherRate,
        },
        { width: null, rate: currentRates.incomeTax.additionalRate },
      ]);
}

export function qualifyingEarnings(incomeInput: number): number {
  const income = Math.max(0, incomeInput || 0);
  return Math.max(
    0,
    Math.min(income, currentRates.pension.qualifyingUpperLimit) - currentRates.pension.qualifyingLowerLimit,
  );
}

export function studentLoanForIncome(
  incomeInput: number,
  plan: StudentLoanPlan,
  postgraduateLoan = false,
): number {
  const income = Math.max(0, incomeInput || 0);
  const planAmount = plan === "none" ? 0 : Math.max(0, income - studentLoanThresholds[plan]) * 0.09;
  const postgraduateAmount = postgraduateLoan ? Math.max(0, income - 21000) * 0.06 : 0;
  return planAmount + postgraduateAmount;
}

export interface EmploymentCalculationInput {
  gross: number;
  taxCode: TaxCode;
  kCodeNumber?: number;
  scotland?: boolean;
  pensionMode?: PensionMode;
  pensionPercent?: number;
  studentLoanPlan?: StudentLoanPlan;
  postgraduateLoan?: boolean;
}

export interface EmploymentCalculationResult {
  gross: number;
  cashGross: number;
  taxablePay: number;
  niPay: number;
  pensionContribution: number;
  employeePensionDeduction: number;
  employerPension: number;
  incomeTax: number;
  employeeNi: number;
  studentLoan: number;
  net: number;
  employerNi: number;
  employerCost: number;
}

export function calculateEmployment(input: EmploymentCalculationInput): EmploymentCalculationResult {
  const gross = Math.max(0, input.gross || 0);
  const pensionMode = input.pensionMode ?? "none";
  const pensionPercent = Math.max(0, input.pensionPercent ?? 5) / 100;
  const pensionContribution = pensionMode === "none" ? 0 : qualifyingEarnings(gross) * pensionPercent;
  const cashGross = pensionMode === "salary-sacrifice" ? Math.max(0, gross - pensionContribution) : gross;
  const taxablePay = pensionMode === "salary-sacrifice" || pensionMode === "net-pay"
    ? Math.max(0, gross - pensionContribution)
    : gross;
  const niPay = cashGross;
  const employeePensionDeduction = pensionMode === "net-pay"
    ? pensionContribution
    : pensionMode === "relief-at-source"
      ? pensionContribution * 0.8
      : 0;
  const incomeTax = taxForCode(taxablePay, input.taxCode, input.scotland, input.kCodeNumber);
  const employeeNationalInsurance = employeeNi(niPay);
  const studentLoan = studentLoanForIncome(
    niPay,
    input.studentLoanPlan ?? "none",
    input.postgraduateLoan ?? false,
  );
  const net = cashGross - incomeTax - employeeNationalInsurance - studentLoan - employeePensionDeduction;
  const employerNationalInsurance = employerNi(cashGross);
  const employerPension = pensionMode === "none" ? 0 : qualifyingEarnings(gross) * 0.03;
  return {
    gross,
    cashGross,
    taxablePay,
    niPay,
    pensionContribution,
    employeePensionDeduction,
    employerPension,
    incomeTax,
    employeeNi: employeeNationalInsurance,
    studentLoan,
    net,
    employerNi: employerNationalInsurance,
    employerCost: cashGross + employerNationalInsurance + employerPension,
  };
}

export interface NetToGrossAdvancedInput {
  targetNetAnnual: number;
  scotland?: boolean;
  taxCode?: TaxCode;
  kCodeNumber?: number;
  pensionMode?: PensionMode;
  pensionPercent?: number;
  studentLoanPlan?: StudentLoanPlan;
  postgraduateLoan?: boolean;
}

export interface NetToGrossAdvancedResult extends EmploymentCalculationResult {
  targetNetAnnual: number;
}

export function calculateNetToGrossAdvanced(input: NetToGrossAdvancedInput): NetToGrossAdvancedResult {
  const targetNetAnnual = Math.max(0, input.targetNetAnnual || 0);
  const employmentInput = (gross: number): EmploymentCalculationInput => ({
    gross,
    taxCode: input.taxCode ?? "1257L",
    kCodeNumber: input.kCodeNumber,
    scotland: input.scotland,
    pensionMode: input.pensionMode,
    pensionPercent: input.pensionPercent,
    studentLoanPlan: input.studentLoanPlan,
    postgraduateLoan: input.postgraduateLoan,
  });

  let low = 0;
  let high = targetNetAnnual * 4 + 50000;
  for (let iteration = 0; iteration < 64; iteration += 1) {
    const midpoint = (low + high) / 2;
    if (calculateEmployment(employmentInput(midpoint)).net < targetNetAnnual) low = midpoint;
    else high = midpoint;
  }
  return { ...calculateEmployment(employmentInput((low + high) / 2)), targetNetAnnual };
}

export interface JobCalculationInput {
  salary: number;
  taxCode: TaxCode;
  kCodeNumber?: number;
  pensionMode?: PensionMode;
  pensionPercent?: number;
  annualBonus?: number;
  overtimeHours?: number;
  overtimeHourlyRate?: number;
  overtimeMultiplier?: number;
}

export interface TwoJobsTaxInput {
  job1: JobCalculationInput;
  job2: JobCalculationInput;
  scotland?: boolean;
  studentLoanPlan?: StudentLoanPlan;
  postgraduateLoan?: boolean;
}

export interface TwoJobsTaxResult {
  job1: EmploymentCalculationResult;
  job2: EmploymentCalculationResult;
  combinedGross: number;
  combinedCashGross: number;
  combinedTakeHome: number;
  combinedMonthlyTakeHome: number;
  combinedWeeklyTakeHome: number;
  taxDeducted: number;
  correctTaxLiability: number;
  taxReconciliation: number;
  employeeNi: number;
  combinedJobNi: number;
  separateEmploymentNiSaving: number;
  studentLoanDeducted: number;
  combinedStudentLoanLiability: number;
  studentLoanReconciliation: number;
  employerCost: number;
}

function totalJobGross(job: JobCalculationInput): number {
  const overtime = Math.max(0, job.overtimeHours ?? 0)
    * Math.max(0, job.overtimeHourlyRate ?? 0)
    * Math.max(1, job.overtimeMultiplier ?? 1.5);
  return Math.max(0, job.salary || 0) + Math.max(0, job.annualBonus ?? 0) + overtime;
}

export function calculateTwoJobsTax(input: TwoJobsTaxInput): TwoJobsTaxResult {
  const calculateJob = (job: JobCalculationInput) => calculateEmployment({
    gross: totalJobGross(job),
    taxCode: job.taxCode,
    kCodeNumber: job.kCodeNumber,
    scotland: input.scotland,
    pensionMode: job.pensionMode,
    pensionPercent: job.pensionPercent,
    studentLoanPlan: input.studentLoanPlan,
    postgraduateLoan: input.postgraduateLoan,
  });
  const job1 = calculateJob(input.job1);
  const job2 = calculateJob(input.job2);
  const combinedGross = job1.gross + job2.gross;
  const combinedCashGross = job1.cashGross + job2.cashGross;
  const combinedTakeHome = job1.net + job2.net;
  const taxDeducted = job1.incomeTax + job2.incomeTax;
  const correctTaxLiability = incomeTaxForRegion(job1.taxablePay + job2.taxablePay, input.scotland);
  const employeeNationalInsurance = job1.employeeNi + job2.employeeNi;
  const combinedJobNi = employeeNi(job1.niPay + job2.niPay);
  const studentLoanDeducted = job1.studentLoan + job2.studentLoan;
  const combinedStudentLoanLiability = studentLoanForIncome(
    job1.niPay + job2.niPay,
    input.studentLoanPlan ?? "none",
    input.postgraduateLoan ?? false,
  );
  return {
    job1,
    job2,
    combinedGross,
    combinedCashGross,
    combinedTakeHome,
    combinedMonthlyTakeHome: combinedTakeHome / 12,
    combinedWeeklyTakeHome: combinedTakeHome / 52,
    taxDeducted,
    correctTaxLiability,
    taxReconciliation: correctTaxLiability - taxDeducted,
    employeeNi: employeeNationalInsurance,
    combinedJobNi,
    separateEmploymentNiSaving: combinedJobNi - employeeNationalInsurance,
    studentLoanDeducted,
    combinedStudentLoanLiability,
    studentLoanReconciliation: combinedStudentLoanLiability - studentLoanDeducted,
    employerCost: job1.employerCost + job2.employerCost,
  };
}

export interface BradfordFactorResult {
  episodes: number;
  totalDays: number;
  score: number;
  band: "No formal action" | "Verbal warning" | "Written warning" | "Final written warning" | "Dismissal consideration";
  nextThreshold: number | null;
  additionalDaysToNextThreshold: number | null;
}

export function calculateBradfordEpisodes(days: number[]): BradfordFactorResult {
  const cleaned = days.map((day) => Math.max(1, Math.min(365, Math.round(day || 1))));
  const episodes = Math.max(1, cleaned.length);
  const totalDays = cleaned.reduce((sum, day) => sum + day, 0);
  const score = episodes ** 2 * totalDays;
  const bands = [
    { from: 400, label: "Dismissal consideration" as const, next: null },
    { from: 300, label: "Final written warning" as const, next: 400 },
    { from: 200, label: "Written warning" as const, next: 300 },
    { from: 100, label: "Verbal warning" as const, next: 200 },
    { from: 0, label: "No formal action" as const, next: 100 },
  ];
  const selected = bands.find((band) => score >= band.from) ?? bands[bands.length - 1];
  const additionalDaysToNextThreshold = selected.next === null
    ? null
    : Math.max(0, Math.ceil(selected.next / (episodes ** 2) - totalDays));
  return {
    episodes,
    totalDays,
    score,
    band: selected.label,
    nextThreshold: selected.next,
    additionalDaysToNextThreshold,
  };
}

export type BankHolidayRegion = "england" | "wales" | "scotland" | "northern-ireland";

export interface HolidayEntitlementInput {
  hoursPerWeek: number;
  daysPerWeek: number;
  includeBankHolidays?: boolean;
  region?: BankHolidayRegion;
  partYear?: boolean;
  monthsWorked?: number;
}

export interface HolidayEntitlementResult {
  baseDays: number;
  baseHours: number;
  factor: number;
  entitlementDays: number;
  entitlementHours: number;
  bankHolidayCount: number;
}

const bankHolidayCounts: Record<BankHolidayRegion, number> = {
  england: 8,
  wales: 8,
  scotland: 9,
  "northern-ireland": 10,
};

export function calculateHolidayEntitlement(input: HolidayEntitlementInput): HolidayEntitlementResult {
  const daysPerWeek = Math.max(1, Math.min(7, input.daysPerWeek || 1));
  const hoursPerWeek = Math.max(0, input.hoursPerWeek || 0);
  const baseDays = Math.min(28, daysPerWeek * 5.6);
  const baseHours = baseDays * (hoursPerWeek / daysPerWeek);
  const factor = input.partYear ? Math.max(1, Math.min(12, input.monthsWorked ?? 12)) / 12 : 1;
  return {
    baseDays,
    baseHours,
    factor,
    entitlementDays: baseDays * factor,
    entitlementHours: baseHours * factor,
    bankHolidayCount: input.includeBankHolidays === false ? 0 : bankHolidayCounts[input.region ?? "england"],
  };
}

export interface AnnualLeaveInput {
  annualEntitlement: number;
  leaveYearStartMonth: number;
  daysTaken: number;
  daysBooked: number;
}

export interface AnnualLeaveResult {
  monthsElapsed: number;
  monthsRemaining: number;
  accruedToDate: number;
  taken: number;
  booked: number;
  used: number;
  remainingAfterTaken: number;
  stillToAccrue: number;
  remainingAfterBooked: number;
  availableByYearEnd: number;
  monthlyAccrualRate: number;
}

export function calculateAnnualLeave(
  input: AnnualLeaveInput,
  asOf = new Date(),
): AnnualLeaveResult {
  const annualEntitlement = Math.max(0, input.annualEntitlement || 0);
  const startMonth = Math.max(0, Math.min(11, Math.round(input.leaveYearStartMonth || 0)));
  let start = new Date(asOf.getFullYear(), startMonth, 1);
  if (start.getTime() > asOf.getTime()) start = new Date(asOf.getFullYear() - 1, startMonth, 1);
  const wholeMonths = (asOf.getFullYear() - start.getFullYear()) * 12 + (asOf.getMonth() - start.getMonth());
  const calendarMonths = Math.max(0, wholeMonths + (asOf.getDate() - 1) / 30);
  const monthsElapsed = Math.min(12, Math.round(calendarMonths * 10) / 10);
  const monthsRemaining = Math.max(0, Math.round((12 - monthsElapsed) * 10) / 10);
  const accruedToDate = annualEntitlement * (monthsElapsed / 12);
  const taken = Math.max(0, Math.min(annualEntitlement, input.daysTaken || 0));
  // This mirrors the live contract, which displays and deducts booked half-days as whole days.
  const booked = Math.max(0, Math.round(input.daysBooked || 0));
  const used = taken + booked;
  const remainingAfterTaken = Math.max(0, accruedToDate - taken);
  const stillToAccrue = Math.max(0, annualEntitlement - accruedToDate);
  return {
    monthsElapsed,
    monthsRemaining,
    accruedToDate,
    taken,
    booked,
    used,
    remainingAfterTaken,
    stillToAccrue,
    remainingAfterBooked: Math.max(0, accruedToDate - used),
    availableByYearEnd: Math.max(0, annualEntitlement - used),
    monthlyAccrualRate: annualEntitlement / 12,
  };
}


// --- National Insurance Calculator ---
export type NiMode = "employee" | "employer" | "self-employed";

export interface NiResult {
  mode: NiMode;
  annualSalary: number;
  annualNi: number;
  monthlyNi: number;
  effectiveRate: number;
  bands: Array<{ label: string; from: number; to: number | null; rate: number; ni: number }>;
}

export function calculateNationalInsurance(annualSalary: number, mode: NiMode): NiResult {
  const bands: NiResult["bands"] = [];
  let totalNi = 0;

  if (mode === "employee") {
    // Employee Class 1: 8% on £12,570-£50,270, 2% above
    const pt = 12570;
    const uel = 50270;
    if (annualSalary <= pt) {
      bands.push({ label: "Below Primary Threshold", from: 0, to: pt, rate: 0, ni: 0 });
    } else if (annualSalary <= uel) {
      bands.push({ label: "Below Primary Threshold", from: 0, to: pt, rate: 0, ni: 0 });
      const niable = annualSalary - pt;
      const ni = niable * 0.08;
      totalNi += ni;
      bands.push({ label: "Main rate", from: pt, to: annualSalary, rate: 8, ni });
    } else {
      bands.push({ label: "Below Primary Threshold", from: 0, to: pt, rate: 0, ni: 0 });
      const mainNi = (uel - pt) * 0.08;
      totalNi += mainNi;
      bands.push({ label: "Main rate", from: pt, to: uel, rate: 8, ni: mainNi });
      const additionalNi = (annualSalary - uel) * 0.02;
      totalNi += additionalNi;
      bands.push({ label: "Additional rate", from: uel, to: annualSalary, rate: 2, ni: additionalNi });
    }
  } else if (mode === "employer") {
    // Employer Class 1: 15% above £5,000
    const st = 5000;
    if (annualSalary <= st) {
      bands.push({ label: "Below Secondary Threshold", from: 0, to: st, rate: 0, ni: 0 });
    } else {
      bands.push({ label: "Below Secondary Threshold", from: 0, to: st, rate: 0, ni: 0 });
      const ni = (annualSalary - st) * 0.15;
      totalNi += ni;
      bands.push({ label: "Employer rate", from: st, to: annualSalary, rate: 15, ni });
    }
  } else {
    // Self-employed Class 4: 6% on £12,570-£50,270, 2% above
    const lpl = 12570;
    const upl = 50270;
    if (annualSalary <= lpl) {
      bands.push({ label: "Below Lower Profits Limit", from: 0, to: lpl, rate: 0, ni: 0 });
    } else if (annualSalary <= upl) {
      bands.push({ label: "Below Lower Profits Limit", from: 0, to: lpl, rate: 0, ni: 0 });
      const niable = annualSalary - lpl;
      const ni = niable * 0.06;
      totalNi += ni;
      bands.push({ label: "Main rate", from: lpl, to: annualSalary, rate: 6, ni });
    } else {
      bands.push({ label: "Below Lower Profits Limit", from: 0, to: lpl, rate: 0, ni: 0 });
      const mainNi = (upl - lpl) * 0.06;
      totalNi += mainNi;
      bands.push({ label: "Main rate", from: lpl, to: upl, rate: 6, ni: mainNi });
      const additionalNi = (annualSalary - upl) * 0.02;
      totalNi += additionalNi;
      bands.push({ label: "Additional rate", from: upl, to: annualSalary, rate: 2, ni: additionalNi });
    }
  }

  return {
    mode,
    annualSalary,
    annualNi: Math.round(totalNi * 100) / 100,
    monthlyNi: Math.round((totalNi / 12) * 100) / 100,
    effectiveRate: annualSalary > 0 ? Math.round((totalNi / annualSalary) * 10000) / 100 : 0,
    bands,
  };
}
