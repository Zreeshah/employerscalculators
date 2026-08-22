import type { GuideContent } from "../types";
import EmployerNiRates from "./employer-ni-rates-2026-27";
import EmploymentAllowance from "./employment-allowance-guide";
import HolidayEntitlementPartTime from "./holiday-entitlement-part-time-workers";
import HolidayEntitlementUk from "./statutory-holiday-entitlement-uk";
import HowMuchCost from "./how-much-does-it-cost-to-employ-someone";
import HowToSsp from "./how-to-calculate-statutory-sick-pay";
import TrueCostHiring from "./true-cost-of-hiring-employee-uk";
import NiRates from "./national-insurance-rates-2026-27";
import SalarySacrificePension from "./salary-sacrifice-pension-guide";
import SspVsCompany from "./ssp-vs-company-sick-pay";

export const allGuides: GuideContent[] = [
  EmployerNiRates,
  NiRates,
  HolidayEntitlementUk,
  HowToSsp,
  SspVsCompany,
  EmploymentAllowance,
  HowMuchCost,
  TrueCostHiring,
  SalarySacrificePension,
  HolidayEntitlementPartTime,
];

export const guideBySlug = new Map(allGuides.map((g) => [g.slug, g]));
