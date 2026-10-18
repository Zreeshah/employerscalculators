import { policePensionRate } from "../data/police-pay-scales.ts";
import { employeeNi } from "./calculators.ts";
import { studentLoanForIncome, taxForCode, type StudentLoanPlan, type TaxCode } from "./advancedCalculators.ts";

export interface PolicePayInput {
  annualSalary: number;
  annualPensionableAllowance?: number;
  taxCode?: TaxCode;
  kCodeNumber?: number;
  studentLoanPlan?: StudentLoanPlan;
  postgraduateLoan?: boolean;
}

export interface PolicePayResult {
  pensionablePay: number;
  pensionRate: number;
  pensionContribution: number;
  incomeTax: number;
  employeeNi: number;
  studentLoan: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
}

/** Annualised England and Wales PPS 2015 estimate; it does not model payroll-period rounding or force deductions. */
export function calculatePolicePay(input: PolicePayInput): PolicePayResult {
  const pensionablePay = Math.max(0, input.annualSalary || 0) + Math.max(0, input.annualPensionableAllowance || 0);
  const pensionRate = policePensionRate(pensionablePay);
  const pensionContribution = pensionablePay * pensionRate;
  const incomeTax = taxForCode(pensionablePay - pensionContribution, input.taxCode ?? "1257L", false, input.kCodeNumber);
  const nationalInsurance = employeeNi(pensionablePay);
  const studentLoan = studentLoanForIncome(pensionablePay, input.studentLoanPlan ?? "none", input.postgraduateLoan ?? false);
  const annualTakeHome = pensionablePay - pensionContribution - incomeTax - nationalInsurance - studentLoan;
  return { pensionablePay, pensionRate, pensionContribution, incomeTax, employeeNi: nationalInsurance, studentLoan, annualTakeHome, monthlyTakeHome: annualTakeHome / 12 };
}
