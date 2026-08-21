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
  | "take-home-pay"
  | "nhs-take-home-pay"
  | "nhs-pay-comparison"
  | "annual-leave"
  | "holiday-entitlement"
  | "nhs-band";

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
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
    { name: "sacrificePercent", label: "Salary sacrificed into pension", unit: "percent", step: 0.5 },
  ],
  "sick-pay": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
    { name: "sickDays", label: "Days of sickness", unit: "days" },
  ],
  "employee-cost": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
  ],
  "salary-sacrifice": [
    { name: "annualSalary", label: "Annual gross salary", unit: "currency" },
    { name: "sacrificePercent", label: "Salary sacrificed", unit: "percent", step: 0.5 },
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
      const gross = n("annualSalary");
      const sacrificed = gross * (n("sacrificePercent") / 100);
      return [
        { label: "Salary sacrificed (annual)", value: sacrificed, format: "currency" },
        { label: "Reduced gross salary", value: gross - sacrificed, format: "currency" },
        { label: "Employee NI saving", value: employeeNi(gross) - employeeNi(gross - sacrificed), format: "currency" },
        { label: "Employer NI saving", value: employerNi(gross) - employerNi(gross - sacrificed), format: "currency" },
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
      const weeks = Math.min(Math.max(n("weeksClaimed"), 0), 39);
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
  }
}
