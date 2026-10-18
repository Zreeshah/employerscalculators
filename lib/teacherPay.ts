import {
  scottishTeacherPensionRate,
  teacherPensionRate,
  type TeacherRegion,
} from "../data/teachers-pay-scales.ts";
import {
  employeeNi,
} from "./calculators.ts";
import {
  studentLoanForIncome,
  taxForCode,
  type StudentLoanPlan,
  type TaxCode,
} from "./advancedCalculators.ts";

export interface TeacherPayInput {
  region: TeacherRegion;
  fullTimeSalary: number;
  fte: number;
  annualPensionableAllowance?: number;
  taxCode?: TaxCode;
  kCodeNumber?: number;
  studentLoanPlan?: StudentLoanPlan;
  postgraduateLoan?: boolean;
}

export interface TeacherPayResult {
  basicSalary: number;
  pensionableAllowance: number;
  pensionablePay: number;
  pensionRate: number;
  pensionContribution: number;
  incomeTax: number;
  employeeNi: number;
  studentLoan: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  employerPensionRate: number;
  employerPensionContribution: number;
}

/**
 * Annualised teacher-pay estimate. Pension contributions reduce taxable pay but
 * do not reduce employee NI or student-loan assessment in this model.
 */
export function calculateTeacherPay(input: TeacherPayInput): TeacherPayResult {
  const fte = Math.max(0, Math.min(1, input.fte || 0));
  const basicSalary = Math.max(0, input.fullTimeSalary || 0) * fte;
  const pensionableAllowance = Math.max(0, input.annualPensionableAllowance || 0);
  const pensionablePay = basicSalary + pensionableAllowance;
  const scotland = input.region === "scotland";
  const pensionRate = scotland ? scottishTeacherPensionRate(pensionablePay) : teacherPensionRate(pensionablePay);
  const pensionContribution = pensionablePay * pensionRate;
  const taxablePay = Math.max(0, pensionablePay - pensionContribution);
  const incomeTax = taxForCode(taxablePay, input.taxCode ?? "1257L", scotland, input.kCodeNumber);
  const nationalInsurance = employeeNi(pensionablePay);
  const studentLoan = studentLoanForIncome(pensionablePay, input.studentLoanPlan ?? "none", input.postgraduateLoan ?? false);
  const annualTakeHome = pensionablePay - pensionContribution - incomeTax - nationalInsurance - studentLoan;
  const employerPensionRate = scotland ? 0.26 : 0.2868;
  return {
    basicSalary,
    pensionableAllowance,
    pensionablePay,
    pensionRate,
    pensionContribution,
    incomeTax,
    employeeNi: nationalInsurance,
    studentLoan,
    annualTakeHome,
    monthlyTakeHome: annualTakeHome / 12,
    employerPensionRate,
    employerPensionContribution: pensionablePay * employerPensionRate,
  };
}
