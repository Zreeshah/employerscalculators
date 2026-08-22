import type { CalculatorContent } from "../types";
import AnnualLeave from "./annual-leave";
import BradfordFactor from "./bradford-factor";
import CompanyCarTax from "./company-car-tax";
import EmployeeCost from "./employee-cost";
import EmployerNi from "./employer-ni";
import HolidayEntitlement from "./holiday-entitlement";
import Ir35 from "./ir35";
import MaternityAllowance from "./maternity-allowance";
import NetToGross from "./net-to-gross";
import NhsPayComparison from "./nhs-pay-comparison";
import NhsTakeHomePay from "./nhs-take-home-pay";
import { nhsCalculators } from "./nhs";
import P11d from "./p11d";
import ProRata from "./pro-rata";
import SalarySacrifice from "./salary-sacrifice";
import SalarySacrificePension from "./salary-sacrifice-pension";
import SickPay from "./sick-pay";
import Smp from "./smp";
import Ssp from "./ssp";
import TakeHomePay from "./take-home-pay";
import TwoJobsTax from "./two-jobs-tax";
import NhsMidwifeSalary from "./nhs-midwife-salary";
import WorkplacePension from "./workplace-pension";

const core: CalculatorContent[] = [
  ProRata,
  Ssp,
  EmployerNi,
  Ir35,
  Smp,
  P11d,
  WorkplacePension,
  SalarySacrificePension,
  SickPay,
  EmployeeCost,
  SalarySacrifice,
  MaternityAllowance,
  BradfordFactor,
  CompanyCarTax,
  NetToGross,
  TwoJobsTax,
  TakeHomePay,
  NhsMidwifeSalary,
  NhsTakeHomePay,
  NhsPayComparison,
  AnnualLeave,
  HolidayEntitlement,
];

export const allCalculators: CalculatorContent[] = [...core, ...nhsCalculators];

export const coreCalculators = core;

export const calculatorBySlug = new Map(allCalculators.map((c) => [c.slug, c]));

// Homepage directory grouping
export const calculatorGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Salary & payroll",
    slugs: [
      "pro-rata-calculator",
      "take-home-pay-calculator",
      "nhs-take-home-pay",
      "nhs-pay-comparison",
      "net-to-gross-calculator",
      "two-jobs-tax-calculator",
      "employee-cost-calculator",
      "salary-sacrifice-calculator",
    ],
  },
  {
    title: "Statutory pay",
    slugs: [
      "ssp-calculator",
      "sick-pay-calculator",
      "smp-calculator",
      "maternity-allowance-calculator",
    ],
  },
  {
    title: "Tax, NI & IR35",
    slugs: ["employer-ni-calculator", "ir35-calculator", "p11d-calculator", "company-car-tax-calculator"],
  },
  {
    title: "Pensions & benefits",
    slugs: ["workplace-pension-calculator", "salary-sacrifice-pension-calculator"],
  },
  {
    title: "Leave & absence",
    slugs: ["annual-leave-calculator", "holiday-entitlement-calculator", "bradford-factor-calculator"],
  },
  {
    title: "NHS pay bands",
    slugs: nhsCalculators.filter((c) => !c.slug.endsWith("-scotland") && !c.slug.endsWith("-wales") && !c.slug.endsWith("-northern-ireland")).map((c) => c.slug),
  },
];
