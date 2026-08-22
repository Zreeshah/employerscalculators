import { currentRates } from "../data/rates.ts";

export type CalculatorKind =
  | "pro-rata"
  | "ssp"
  | "employer-ni"
  | "ir35"
  | "smp"
  | "p11d"
  | "workplace-pension"
  | "salary-sacrifice-pension"
  | "sick-pay"
  | "employee-cost"
  | "salary-sacrifice"
  | "maternity-allowance"
  | "bradford-factor"
  | "company-car-tax"
  | "net-to-gross"
  | "two-jobs-tax"
  | "take-home-pay"
  | "nhs-take-home-pay"
  | "nhs-pay-comparison"
  | "annual-leave"
  | "holiday-entitlement"
  | "nhs-band"
  | "national-insurance"
  | "teachers-pay"
  | "police-pay";

export interface InputSpec {
  name: string;
  label: string;
  unit?: "currency" | "percent" | "hours" | "days" | "weeks";
  step?: number;
}

export interface ResultLine {
  label: string;
  value: number;
  format: "currency" | "percent" | "number";
}

export type EmployerNiCategory = "standard" | "under21" | "apprentice" | "veteran" | "freeport";
export type PensionSchemeType = "qualifying" | "total";
export type MaternityAllowanceSituation = "self-employed" | "employed-no-smp" | "recently-stopped";

export interface SmpResult {
  eligible: boolean;
  averageWeeklyEarnings: number;
  firstSixWeeklyRate: number;
  firstSixTotal: number;
  remainingWeeklyRate: number;
  remainingTotal: number;
  totalPayable: number;
  monthlyEquivalent: number;
}

export interface MaternityAllowanceResult {
  situation: MaternityAllowanceSituation;
  eligible: boolean;
  status: "standard" | "lower-rate" | "may-not-qualify";
  title: string;
  message: string;
  action: string;
  weeklyRate: number;
  monthlyEquivalent: number;
  totalPayable: number;
  weeks: number;
}

export type SalarySacrificeScheme = "pension" | "cycle-to-work" | "electric-vehicle" | "other";
export type EmployeeTaxBand = "basic" | "higher" | "additional";

export interface P11dResult {
  p11dValue: number;
  employeeContribution: number;
  taxableValue: number;
  taxRate: number;
  employeeTaxAnnual: number;
  employeeTaxMonthly: number;
  class1aAnnual: number;
  class1aMonthly: number;
  totalAnnualTaxCost: number;
  taxCostPerPoundPence: number;
}

export type SickPayStatus = "employed" | "worker" | "self-employed";
export type EnhancedSickPayMode = "none" | "full" | "half" | "custom";

export interface SickPayResult {
  eligible: boolean;
  absenceWeeks: number;
  sspWeeklyRate: number;
  sspDailyRate: number;
  sspDays: number;
  sspPay: number;
  enhancedDays: number;
  enhancedPay: number;
  totalSickPay: number;
  remainingSspWeeks: number;
}

export interface WorkplacePensionResult {
  annualSalary: number;
  schemeType: PensionSchemeType;
  pensionablePay: number;
  employerContribution: number;
  employeeContribution: number;
  totalContribution: number;
  salaryExchange: boolean;
  employerNiSaving: number;
  employeeNiSaving: number;
  totalNiSaving: number;
}

export interface SalarySacrificeImpact {
  annualSalary: number;
  annualSacrificeAmount: number;
  effectiveSacrifice: number;
  reducedSalary: number;
  schemeType: SalarySacrificeScheme;
  employeeTaxBand: EmployeeTaxBand;
  taxRate: number;
  employeeNiRate: number;
  incomeTaxSaving: number;
  employeeNiSaving: number;
  employerNiSaving: number;
  employeeTotalSaving: number;
  netEmployeeCost: number;
  monthlyEmployeeSaving: number;
  combinedSaving: number;
  employerPassesNiSaving: boolean;
  totalPensionContribution: number;
  pensionContributionPercent: number;
  netCostPercent: number;
  pensionBoostPerPound: number;
}

export const employerNiCategoryThresholds: Record<EmployerNiCategory, number> = {
  standard: currentRates.employerNi.secondaryThreshold,
  under21: currentRates.employeeNi.upperEarningsLimit,
  apprentice: currentRates.employeeNi.upperEarningsLimit,
  veteran: currentRates.employeeNi.upperEarningsLimit,
  freeport: 25000,
};

export function employerNiForCategory(
  gross: number,
  category: EmployerNiCategory = "standard",
): number {
  const threshold = employerNiCategoryThresholds[category] ?? currentRates.employerNi.secondaryThreshold;
  return Math.max(0, gross - threshold) * currentRates.employerNi.rate;
}

export function employerNiWithAllowance(
  gross: number,
  category: EmployerNiCategory = "standard",
  applyEmploymentAllowance = false,
): { rawNi: number; allowanceSaving: number; payableNi: number } {
  const rawNi = employerNiForCategory(gross, category);
  const allowanceSaving = applyEmploymentAllowance
    ? Math.min(rawNi, currentRates.employerNi.employmentAllowance)
    : 0;
  return { rawNi, allowanceSaving, payableNi: rawNi - allowanceSaving };
}

export function employerPensionContribution(
  gross: number,
  ratePercent = currentRates.pension.employerMinPercent,
  scheme: PensionSchemeType = "qualifying",
): number {
  const safeGross = Math.max(0, gross);
  const rate = Math.max(0, ratePercent) / 100;
  if (scheme === "total") return safeGross * rate;
  const qualifyingPay = Math.max(
    0,
    Math.min(safeGross, currentRates.pension.qualifyingUpperLimit) - currentRates.pension.qualifyingLowerLimit,
  );
  return qualifyingPay * rate;
}

export function calculateP11d({
  p11dValue,
  employeeContribution,
  taxRatePercent,
}: {
  p11dValue: number;
  employeeContribution: number;
  taxRatePercent: number;
}): P11dResult {
  const value = Number.isFinite(p11dValue) ? Math.max(0, p11dValue) : 0;
  const contribution = Number.isFinite(employeeContribution) ? Math.max(0, employeeContribution) : 0;
  const taxRate = Math.max(0, taxRatePercent) / 100;
  const taxableValue = Math.max(0, value - contribution);
  const toPence = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;
  const employeeTaxAnnual = toPence(taxableValue * taxRate);
  const class1aAnnual = toPence(taxableValue * currentRates.employerNi.rate);
  const totalAnnualTaxCost = toPence(employeeTaxAnnual + class1aAnnual);
  return {
    p11dValue: value,
    employeeContribution: contribution,
    taxableValue: toPence(taxableValue),
    taxRate,
    employeeTaxAnnual,
    employeeTaxMonthly: toPence(employeeTaxAnnual / 12),
    class1aAnnual,
    class1aMonthly: toPence(class1aAnnual / 12),
    totalAnnualTaxCost,
    taxCostPerPoundPence: value > 0 ? Math.round((totalAnnualTaxCost / value) * 1000) / 10 : 0,
  };
}

export function calculateSickPay({
  status,
  weeklyEarnings,
  sickDays,
  qualifyingDays,
  enhancedMode,
  enhancedWeeks,
  customWeeklyRate = 0,
  sspWeeksUsed = 0,
}: {
  status: SickPayStatus;
  weeklyEarnings: number;
  sickDays: number;
  qualifyingDays: number;
  enhancedMode: EnhancedSickPayMode;
  enhancedWeeks: number;
  customWeeklyRate?: number;
  sspWeeksUsed?: number;
}): SickPayResult {
  const toPence = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;
  const earnings = Number.isFinite(weeklyEarnings) ? Math.max(0, weeklyEarnings) : 0;
  const days = Number.isFinite(sickDays) ? Math.max(0, Math.min(140, sickDays)) : 0;
  const qd = Math.max(1, Math.min(5, qualifyingDays));
  const absenceWeeks = days / qd;
  const eligible = status !== "self-employed";
  const sspWeeklyRate = eligible ? Math.min(currentRates.ssp.weeklyRate, earnings * 0.8) : 0;
  const sspDailyRate = sspWeeklyRate / qd;
  const enhancedDays = eligible && enhancedMode !== "none"
    ? Math.min(days, Math.max(0, enhancedWeeks) * qd)
    : 0;
  const remainingAvailableDays = Math.max(0, (currentRates.ssp.maxWeeks - Math.max(0, sspWeeksUsed)) * qd);
  const sspDays = eligible ? Math.min(Math.max(0, days - enhancedDays), remainingAvailableDays) : 0;
  const enhancedWeeklyRate = enhancedMode === "full"
    ? earnings
    : enhancedMode === "half"
      ? earnings * 0.5
      : enhancedMode === "custom"
        ? Math.max(0, customWeeklyRate)
        : 0;
  const enhancedPay = toPence((enhancedWeeklyRate / qd) * enhancedDays);
  const sspPay = toPence(sspDailyRate * sspDays);
  return {
    eligible,
    absenceWeeks,
    sspWeeklyRate: toPence(sspWeeklyRate),
    sspDailyRate: toPence(sspDailyRate),
    sspDays,
    sspPay,
    enhancedDays,
    enhancedPay,
    totalSickPay: toPence(enhancedPay + sspPay),
    remainingSspWeeks: Math.max(0, Math.floor(currentRates.ssp.maxWeeks - Math.max(0, sspWeeksUsed) - absenceWeeks)),
  };
}

export function calculateWorkplacePension({
  annualSalary,
  schemeType = "qualifying",
  employerPercent = currentRates.pension.employerMinPercent,
  employeePercent = currentRates.pension.employeeMinPercent,
  salaryExchange = false,
}: {
  annualSalary: number;
  schemeType?: PensionSchemeType;
  employerPercent?: number;
  employeePercent?: number;
  salaryExchange?: boolean;
}): WorkplacePensionResult {
  const salary = Number.isFinite(annualSalary) ? Math.max(0, annualSalary) : 0;
  const pensionablePay = schemeType === "total"
    ? salary
    : Math.max(0, Math.min(salary, currentRates.pension.qualifyingUpperLimit) - currentRates.pension.qualifyingLowerLimit);
  const toPence = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
  const employerContribution = toPence(pensionablePay * (Math.max(0, employerPercent) / 100));
  const employeeContribution = toPence(pensionablePay * (Math.max(0, employeePercent) / 100));
  const employerNiSaving = salaryExchange
    ? toPence(employeeContribution * currentRates.employerNi.rate)
    : 0;
  // Deliberate competitor-parity contract: its Salary Exchange panel applies 12% to the employee contribution.
  const employeeNiSaving = salaryExchange ? toPence(employeeContribution * 0.12) : 0;

  return {
    annualSalary: salary,
    schemeType,
    pensionablePay,
    employerContribution,
    employeeContribution,
    totalContribution: toPence(employerContribution + employeeContribution),
    salaryExchange,
    employerNiSaving,
    employeeNiSaving,
    totalNiSaving: toPence(employerNiSaving + employeeNiSaving),
  };
}

export function calculateSalarySacrificeImpact({
  annualSalary,
  annualSacrificeAmount,
  schemeType = "pension",
  employeeTaxBand = "basic",
  employerPassesNiSaving = false,
}: {
  annualSalary: number;
  annualSacrificeAmount: number;
  schemeType?: SalarySacrificeScheme;
  employeeTaxBand?: EmployeeTaxBand;
  employerPassesNiSaving?: boolean;
}): SalarySacrificeImpact {
  const salary = Number.isFinite(annualSalary) ? Math.max(0, annualSalary) : 0;
  const enteredSacrifice = Number.isFinite(annualSacrificeAmount) ? Math.max(0, annualSacrificeAmount) : 0;
  const effectiveSacrifice = Math.min(enteredSacrifice, Math.max(0, salary - 1));
  const reducedSalary = Math.max(0, salary - effectiveSacrifice);
  // Deliberate competitor-parity contract: the selected band applies to the whole sacrifice.
  const taxRate = employeeTaxBand === "additional" ? 0.45 : employeeTaxBand === "higher" ? 0.4 : 0.2;
  const employeeNiRate = employeeTaxBand === "basic" ? 0.08 : 0.02;
  const toPence = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
  const incomeTaxSaving = toPence(schemeType === "pension" ? effectiveSacrifice * taxRate : 0);
  const employeeNiSaving = toPence(effectiveSacrifice * employeeNiRate);
  const employerNiSaving = toPence(effectiveSacrifice * currentRates.employerNi.rate);
  const employeeTotalSaving = toPence(incomeTaxSaving + employeeNiSaving);
  const netEmployeeCost = toPence(Math.max(0, effectiveSacrifice - employeeTotalSaving));
  const combinedSaving = toPence(employeeTotalSaving + employerNiSaving);
  // The competitor keeps the entered pension amount in its capped £1 residual-salary edge case.
  const totalPensionContribution = toPence(enteredSacrifice + (employerPassesNiSaving ? employerNiSaving : 0));

  return {
    annualSalary: salary,
    annualSacrificeAmount: enteredSacrifice,
    effectiveSacrifice,
    reducedSalary,
    schemeType,
    employeeTaxBand,
    taxRate,
    employeeNiRate,
    incomeTaxSaving,
    employeeNiSaving,
    employerNiSaving,
    employeeTotalSaving,
    netEmployeeCost,
    monthlyEmployeeSaving: toPence(employeeTotalSaving / 12),
    combinedSaving,
    employerPassesNiSaving,
    totalPensionContribution,
    pensionContributionPercent: salary > 0 ? (totalPensionContribution / salary) * 100 : 0,
    netCostPercent: salary > 0 ? (netEmployeeCost / salary) * 100 : 0,
    pensionBoostPerPound: enteredSacrifice > 0 ? totalPensionContribution / enteredSacrifice : 0,
  };
}

export function calculateSmp(averageWeeklyEarnings: number): SmpResult {
  const awe = Number.isFinite(averageWeeklyEarnings) ? Math.max(0, averageWeeklyEarnings) : 0;
  const toPence = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
  const eligible = awe >= currentRates.smp.lowerEarningsLimit;
  if (!eligible) {
    return {
      eligible: false,
      averageWeeklyEarnings: awe,
      firstSixWeeklyRate: 0,
      firstSixTotal: 0,
      remainingWeeklyRate: 0,
      remainingTotal: 0,
      totalPayable: 0,
      monthlyEquivalent: 0,
    };
  }
  const firstSixWeeklyRate = awe * currentRates.smp.firstSixWeeksPct;
  const remainingWeeklyRate = Math.min(currentRates.smp.weeklyRate, firstSixWeeklyRate);
  const firstSixTotal = firstSixWeeklyRate * 6;
  const remainingTotal = remainingWeeklyRate * 33;
  const totalPayable = firstSixTotal + remainingTotal;
  return {
    eligible: true,
    averageWeeklyEarnings: awe,
    firstSixWeeklyRate: toPence(firstSixWeeklyRate),
    firstSixTotal: toPence(firstSixTotal),
    remainingWeeklyRate: toPence(remainingWeeklyRate),
    remainingTotal: toPence(remainingTotal),
    totalPayable: toPence(totalPayable),
    monthlyEquivalent: toPence(totalPayable / 9),
  };
}

export function calculateMaternityAllowance({
  situation,
  averageWeeklyEarnings,
  paidClass2Ni,
}: {
  situation: MaternityAllowanceSituation;
  averageWeeklyEarnings: number;
  paidClass2Ni: boolean;
}): MaternityAllowanceResult {
  const rates = currentRates.maternityAllowance;
  const awe = Number.isFinite(averageWeeklyEarnings) ? Math.max(0, averageWeeklyEarnings) : 0;
  const weeks = rates.totalWeeks;
  if (situation === "self-employed" && !paidClass2Ni) {
    return {
      situation,
      eligible: false,
      status: "may-not-qualify",
      title: "May Not Qualify",
      message: `To qualify for Maternity Allowance as self-employed, you must have paid Class 2 NI for at least ${rates.requiredClass2NiWeeks} of the ${rates.qualifyingPeriodWeeks} weeks before the expected week of birth.`,
      action: "You may be able to pay voluntary Class 2 NI before you claim. Contact HMRC to check your NI record.",
      weeklyRate: 0,
      monthlyEquivalent: 0,
      totalPayable: 0,
      weeks,
    };
  }

  if (situation !== "self-employed" && awe < rates.minimumWeeklyEarnings) {
    return {
      situation,
      eligible: false,
      status: "may-not-qualify",
      title: "May Not Qualify",
      message: "Average earnings in the best 13 of the 66 weeks before the expected week of birth are below the minimum threshold.",
      action: "Check the best 13 weeks of earnings in the 66-week test period before you claim.",
      weeklyRate: 0,
      monthlyEquivalent: 0,
      totalPayable: 0,
      weeks,
    };
  }

  const weeklyRate = situation === "self-employed"
    ? awe >= rates.minimumWeeklyEarnings ? rates.weeklyRate : rates.lowerWeeklyRate
    : Math.min(rates.weeklyRate, awe * 0.9);
  const selfEmployedLowerRate = situation === "self-employed" && awe < rates.minimumWeeklyEarnings;
  const selfEmployedMessage = selfEmployedLowerRate
    ? "Self-employed with Class 2 NI paid. Earnings below threshold — eligible for the lower rate of £27/week."
    : "Self-employed with Class 2 NI paid and earnings above the minimum threshold.";
  const employedMessage = "Employed but does not qualify for SMP. Eligible for MA based on average weekly earnings.";
  const stoppedMessage = "Recently stopped working. Eligible for MA at standard rate based on previous earnings.";

  return {
    situation,
    eligible: true,
    status: selfEmployedLowerRate ? "lower-rate" : "standard",
    title: selfEmployedLowerRate ? "Eligible — Lower Rate" : "Eligible — Standard Rate",
    message: situation === "self-employed"
      ? selfEmployedMessage
      : situation === "employed-no-smp"
        ? employedMessage
        : stoppedMessage,
    action: "Claim directly from DWP — your employer is not involved.",
    weeklyRate,
    monthlyEquivalent: (weeklyRate * weeks) / 9,
    totalPayable: weeklyRate * weeks,
    weeks,
  };
}

export const calculatorInputs: Record<CalculatorKind, InputSpec[]> = {
  "pro-rata": [
    { name: "fullTimeSalary", label: "Full-time annual salary", unit: "currency" },
    { name: "fullTimeHours", label: "Full-time weekly hours", unit: "hours" },
    { name: "actualHours", label: "Actual weekly hours", unit: "hours" },
  ],
  ssp: [
    { name: "daysOfSickness", label: "Days of sickness", unit: "days" },
    { name: "qualifyingDaysPerWeek", label: "Qualifying days per week", unit: "days" },
    { name: "averageWeeklyEarnings", label: "Average weekly earnings", unit: "currency" },
  ],
  "employer-ni": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
  ],
  ir35: [
    { name: "contractRevenue", label: "Annual contract revenue", unit: "currency" },
  ],
  smp: [
    { name: "weeksOfLeave", label: "Weeks of maternity leave", unit: "weeks" },
    { name: "averageWeeklyEarnings", label: "Average weekly earnings", unit: "currency" },
  ],
  p11d: [
    { name: "benefitValue", label: "Value of benefit", unit: "currency" },
    { name: "taxRate", label: "Employee marginal tax rate", unit: "percent" },
  ],
  "workplace-pension": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
    { name: "employeePercent", label: "Employee contribution", unit: "percent", step: 0.5 },
    { name: "employerPercent", label: "Employer contribution", unit: "percent", step: 0.5 },
  ],
  "salary-sacrifice-pension": [
    { name: "annualSalary", label: "Annual salary", unit: "currency" },
    { name: "annualSacrificeAmount", label: "Annual pension contribution", unit: "currency" },
  ],
  "sick-pay": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
    { name: "sickDays", label: "Days of sickness", unit: "days" },
  ],
  "employee-cost": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
  ],
  "salary-sacrifice": [
    { name: "annualSalary", label: "Annual salary", unit: "currency" },
    { name: "annualSacrificeAmount", label: "Annual sacrifice amount", unit: "currency" },
  ],
  "maternity-allowance": [
    { name: "weeksClaimed", label: "Weeks claimed (max 39)", unit: "weeks" },
    { name: "averageWeeklyEarnings", label: "Average weekly earnings", unit: "currency" },
  ],
  "bradford-factor": [
    { name: "spellsOfAbsence", label: "Number of absence spells (S)" },
    { name: "daysOfAbsence", label: "Total days absent (D)" },
  ],
  "company-car-tax": [
    { name: "listPrice", label: "Car list price (P11D value)", unit: "currency" },
    { name: "bikPercent", label: "Benefit-in-kind percentage", unit: "percent", step: 0.5 },
    { name: "taxRate", label: "Income tax rate", unit: "percent" },
  ],
  "net-to-gross": [
    { name: "targetNet", label: "Target net (take-home) pay", unit: "currency" },
  ],
  "two-jobs-tax": [
    { name: "job1Salary", label: "Job 1 annual salary", unit: "currency" },
    { name: "job2Salary", label: "Job 2 annual salary", unit: "currency" },
  ],
  "take-home-pay": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
  ],
  "nhs-take-home-pay": [
    { name: "annualSalary", label: "NHS annual salary", unit: "currency" },
    { name: "pensionPercent", label: "NHS pension contribution", unit: "percent", step: 0.1 },
    { name: "studentLoanMonthly", label: "Student loan deduction per month", unit: "currency" },
  ],
  "nhs-pay-comparison": [
    { name: "salaryA", label: "Scenario A full-time salary", unit: "currency" },
    { name: "fteA", label: "Scenario A FTE", step: 0.1 },
    { name: "salaryB", label: "Scenario B full-time salary", unit: "currency" },
    { name: "fteB", label: "Scenario B FTE", step: 0.1 },
  ],
  "annual-leave": [
    { name: "daysWorkedPerWeek", label: "Days worked per week", unit: "days" },
  ],
  "holiday-entitlement": [
    { name: "hoursWorkedPerWeek", label: "Hours worked per week", unit: "hours" },
  ],
  "nhs-band": [
    { name: "fullTimeSalary", label: "Full-time salary at band top point", unit: "currency" },
    { name: "fte", label: "FTE fraction (1 = full-time)", step: 0.1 },
  ],
  "national-insurance": [
    { name: "annualSalary", label: "Annual salary or profits", unit: "currency" },
  ],
  "teachers-pay": [
    { name: "annualSalary", label: "Annual salary (pay point)", unit: "currency" },
    { name: "fte", label: "FTE fraction (1 = full-time)", step: 0.1 },
  ],
  "police-pay": [
    { name: "annualSalary", label: "Annual salary (pay point)", unit: "currency" },
  ],
};

// ---- Shared payroll helpers (2026/27 rates, HMRC) ----

export function incomeTaxRuk(gross: number): number {
  const t = currentRates.incomeTax;
  // Personal Allowance tapers by £1 per £2 of income above £100,000
  const pa = gross <= 100000 ? t.personalAllowance : Math.max(0, t.personalAllowance - (gross - 100000) / 2);
  const taxable = Math.max(0, gross - pa);
  const basic = Math.min(taxable, t.basicRateLimit) * t.basicRate;
  const higher = Math.min(Math.max(0, taxable - t.basicRateLimit), t.additionalThreshold - t.basicRateLimit) * t.higherRate;
  const additional = Math.max(0, taxable - t.additionalThreshold) * t.additionalRate;
  return basic + higher + additional;
}

export function employeeNi(gross: number): number {
  const ni = currentRates.employeeNi;
  const main = Math.min(Math.max(0, gross - ni.primaryThreshold), ni.upperEarningsLimit - ni.primaryThreshold) * ni.mainRate;
  const additional = Math.max(0, gross - ni.upperEarningsLimit) * ni.additionalRate;
  return main + additional;
}

export function employerNi(gross: number): number {
  return employerNiForCategory(gross, "standard");
}

export function takeHome(gross: number): number {
  return gross - incomeTaxRuk(gross) - employeeNi(gross);
}

export function calculate(
  kind: CalculatorKind,
  v: Record<string, number>,
): ResultLine[] {
  const n = (key: string) => (Number.isFinite(v[key]) ? v[key] : 0);
  const r = currentRates;

  switch (kind) {
    case "pro-rata": {
      const ratio = n("fullTimeHours") > 0 ? n("actualHours") / n("fullTimeHours") : 0;
      return [{ label: "Pro rata annual salary", value: n("fullTimeSalary") * ratio, format: "currency" }];
    }
    case "ssp": {
      // 2026/27: £123.25/week or 80% of AWE if lower; payable from day 1; max 28 weeks
      const weeklyPayable = Math.min(r.ssp.weeklyRate, 0.8 * n("averageWeeklyEarnings"));
      const qd = Math.min(Math.max(n("qualifyingDaysPerWeek"), 1), 7);
      const cappedDays = Math.min(n("daysOfSickness"), r.ssp.maxWeeks * qd);
      const total = (weeklyPayable / qd) * cappedDays;
      return [
        { label: "SSP weekly rate payable", value: weeklyPayable, format: "currency" },
        { label: "Total SSP payable", value: total, format: "currency" },
      ];
    }
    case "employer-ni": {
      const ni = employerNi(n("annualSalary"));
      return [
        { label: "Employer NI (annual)", value: ni, format: "currency" },
        { label: "Employer NI (monthly)", value: ni / 12, format: "currency" },
        { label: "Total salary + NI cost", value: n("annualSalary") + ni, format: "currency" },
      ];
    }
    case "ir35": {
      // Inside-IR35 deemed employment estimate: fee minus employer NI is taxed as employment income
      const deemed = n("contractRevenue");
      const erNi = employerNi(deemed);
      const gross = deemed - erNi;
      const net = takeHome(gross);
      return [
        { label: "Employer NI on deemed pay", value: erNi, format: "currency" },
        { label: "Income tax + employee NI", value: gross - net, format: "currency" },
        { label: "Inside-IR35 take-home (est.)", value: net, format: "currency" },
      ];
    }
    case "smp": {
      // 90% AWE first 6 weeks; then £194.32 or 90% AWE if lower; max 39 weeks
      const awe = n("averageWeeklyEarnings");
      const weeks = Math.min(Math.max(n("weeksOfLeave"), 0), r.smp.totalWeeks);
      const first6 = Math.min(weeks, 6) * (r.smp.firstSixWeeksPct * awe);
      const rest = Math.max(0, weeks - 6) * Math.min(r.smp.weeklyRate, r.smp.firstSixWeeksPct * awe);
      return [
        { label: "Weekly rate — first 6 weeks", value: r.smp.firstSixWeeksPct * awe, format: "currency" },
        { label: "Weekly rate — remaining weeks", value: Math.min(r.smp.weeklyRate, r.smp.firstSixWeeksPct * awe), format: "currency" },
        { label: "Total SMP payable", value: first6 + rest, format: "currency" },
      ];
    }
    case "p11d": {
      const benefit = n("benefitValue");
      return [
        { label: "Taxable benefit value", value: benefit, format: "currency" },
        { label: "Extra tax due (employee)", value: benefit * (n("taxRate") / 100), format: "currency" },
        { label: "Employer Class 1A NI (15%)", value: benefit * 0.15, format: "currency" },
      ];
    }
    case "workplace-pension":
      return [
        { label: "Employee contribution (annual)", value: n("annualSalary") * (n("employeePercent") / 100), format: "currency" },
        { label: "Employer contribution (annual)", value: n("annualSalary") * (n("employerPercent") / 100), format: "currency" },
        { label: "Total pension contribution", value: n("annualSalary") * ((n("employeePercent") + n("employerPercent")) / 100), format: "currency" },
      ];
    case "salary-sacrifice-pension":
    case "salary-sacrifice": {
      const impact = calculateSalarySacrificeImpact({
        annualSalary: n("annualSalary"),
        annualSacrificeAmount: n("annualSacrificeAmount"),
      });
      return [
        { label: "Salary sacrificed (annual)", value: impact.annualSacrificeAmount, format: "currency" },
        { label: "Reduced gross salary", value: impact.reducedSalary, format: "currency" },
        { label: "Employee NI saving", value: impact.employeeNiSaving, format: "currency" },
        { label: "Employer NI saving", value: impact.employerNiSaving, format: "currency" },
      ];
    }
    case "sick-pay":
      // TODO: occupational schemes vary (waiting days, % of salary) — SSP shown as floor
      return [
        { label: "SSP floor for comparison", value: r.ssp.weeklyRate, format: "currency" },
      ];
    case "employee-cost": {
      const gross = n("annualSalary");
      const ni = employerNi(gross);
      const pension = employerPensionContribution(gross, r.pension.employerMinPercent, "qualifying");
      return [
        { label: "Gross salary", value: gross, format: "currency" },
        { label: "Employer NI (15% above £5,000)", value: ni, format: "currency" },
        { label: "Employer pension (3% qualifying earnings)", value: pension, format: "currency" },
        { label: "Total employment cost", value: gross + ni + pension, format: "currency" },
      ];
    }
    case "maternity-allowance": {
      const weekly = Math.min(r.maternityAllowance.weeklyRate, 0.9 * n("averageWeeklyEarnings"));
      const weeks = Math.min(Math.max(n("weeksClaimed"), 0), r.maternityAllowance.totalWeeks);
      return [
        { label: "Weekly Maternity Allowance", value: weekly, format: "currency" },
        { label: "Total Maternity Allowance", value: weekly * weeks, format: "currency" },
      ];
    }
    case "bradford-factor": {
      const score = n("spellsOfAbsence") ** 2 * n("daysOfAbsence");
      return [{ label: "Bradford Factor score", value: score, format: "number" }];
    }
    case "company-car-tax": {
      const benefit = n("listPrice") * (n("bikPercent") / 100);
      return [
        { label: "Taxable car benefit (annual)", value: benefit, format: "currency" },
        { label: "Tax payable by employee", value: benefit * (n("taxRate") / 100), format: "currency" },
        { label: "Employer Class 1A NI (15%)", value: benefit * 0.15, format: "currency" },
      ];
    }
    case "net-to-gross": {
      // Bisection on take-home — simple and exact enough for display
      const target = n("targetNet");
      let lo = 0;
      let hi = target * 3 + 20000;
      for (let i = 0; i < 48; i++) {
        const mid = (lo + hi) / 2;
        if (takeHome(mid) < target) lo = mid;
        else hi = mid;
      }
      const gross = (lo + hi) / 2;
      return [
        { label: "Gross salary required", value: gross, format: "currency" },
        { label: "Income tax at that gross", value: incomeTaxRuk(gross), format: "currency" },
        { label: "Employee NI at that gross", value: employeeNi(gross), format: "currency" },
      ];
    }
    case "two-jobs-tax": {
      const job1 = n("job1Salary");
      const job2 = n("job2Salary");
      const gross = job1 + job2;
      const tax = incomeTaxRuk(gross);
      const ni = employeeNi(job1) + employeeNi(job2);
      return [
        { label: "Combined gross pay", value: gross, format: "currency" },
        { label: "Income tax", value: tax, format: "currency" },
        { label: "National Insurance across both jobs", value: ni, format: "currency" },
        { label: "Combined take-home pay", value: gross - tax - ni, format: "currency" },
      ];
    }
    case "take-home-pay": {
      const gross = n("annualSalary");
      const tax = incomeTaxRuk(gross);
      const ni = employeeNi(gross);
      const net = gross - tax - ni;
      return [
        { label: "Income tax", value: tax, format: "currency" },
        { label: "Employee NI", value: ni, format: "currency" },
        { label: "Take-home pay (annual)", value: net, format: "currency" },
        { label: "Take-home pay (monthly)", value: net / 12, format: "currency" },
      ];
    }
    case "nhs-take-home-pay": {
      const gross = n("annualSalary");
      const pension = gross * (Math.max(0, n("pensionPercent")) / 100);
      const taxablePay = Math.max(0, gross - pension);
      const tax = incomeTaxRuk(taxablePay);
      const ni = employeeNi(gross);
      const studentLoan = Math.max(0, n("studentLoanMonthly")) * 12;
      const net = gross - pension - tax - ni - studentLoan;
      return [
        { label: "NHS pension deduction", value: pension, format: "currency" },
        { label: "Income tax", value: tax, format: "currency" },
        { label: "Employee NI", value: ni, format: "currency" },
        { label: "Estimated take-home pay (monthly)", value: net / 12, format: "currency" },
      ];
    }
    case "nhs-pay-comparison": {
      const annualA = n("salaryA") * n("fteA");
      const annualB = n("salaryB") * n("fteB");
      return [
        { label: "Scenario A annual pay", value: annualA, format: "currency" },
        { label: "Scenario B annual pay", value: annualB, format: "currency" },
        { label: "Annual difference", value: annualB - annualA, format: "currency" },
        { label: "Monthly difference", value: (annualB - annualA) / 12, format: "currency" },
      ];
    }
    case "annual-leave":
      return [
        { label: "Statutory annual leave (days)", value: n("daysWorkedPerWeek") * 5.6, format: "number" },
      ];
    case "holiday-entitlement":
      return [
        { label: "Statutory holiday entitlement (hours)", value: n("hoursWorkedPerWeek") * 0.1207, format: "number" },
      ];
    case "nhs-band":
      return [
        { label: "Salary at this FTE", value: n("fullTimeSalary") * n("fte"), format: "currency" },
        { label: "Monthly equivalent", value: (n("fullTimeSalary") * n("fte")) / 12, format: "currency" },
      ];
    case "national-insurance": {
      const salary = n("annualSalary");
      const pt = 12570;
      const uel = 50270;
      const ni = salary <= pt ? 0 : salary <= uel ? (salary - pt) * 0.08 : (uel - pt) * 0.08 + (salary - uel) * 0.02;
      return [
        { label: "Employee NI per year", value: ni, format: "currency" },
        { label: "Employee NI per month", value: ni / 12, format: "currency" },
      ];
    }
    case "teachers-pay": {
      const tSalary = n("annualSalary");
      const tFte = n("fte") || 1;
      const proRata = tSalary * tFte;
      return [
        { label: "Annual salary (pro rata)", value: proRata, format: "currency" },
        { label: "Monthly gross", value: proRata / 12, format: "currency" },
      ];
    }
    case "police-pay": {
      const pSalary = n("annualSalary");
      const hourly = pSalary / 2085.6;
      return [
        { label: "Annual salary", value: pSalary, format: "currency" },
        { label: "Hourly rate", value: hourly, format: "currency" },
        { label: "Time and a third", value: hourly * (4 / 3), format: "currency" },
      ];
    }
  }
}
