import type { IconKey } from "@/components/icons";

// Maps each calculator slug to its UI icon + featured-card stat overlay.
// Featured slugs surface on the homepage "Most Used Calculators" section
// with the ghost-style stat shown in the top-right of the card.

export interface CalculatorIconMap {
  icon: IconKey;
  featured?: boolean;
  stat?: string;
  statCaption?: string;
}

export const calculatorIconMap: Record<string, CalculatorIconMap> = {
  "pro-rata-calculator": { icon: "clock", featured: true, stat: "50%", statCaption: "part-time" },
  "ssp-calculator": { icon: "heart", featured: true, stat: "£123", statCaption: "per week" },
  "employer-ni-calculator": { icon: "banknote", featured: true, stat: "15%", statCaption: "above £5,000" },
  "ir35-calculator": { icon: "scale" },
  "smp-calculator": { icon: "heart" },
  "p11d-calculator": { icon: "briefcase" },
  "workplace-pension-calculator": { icon: "trending", featured: true, stat: "growing", statCaption: "auto-enrol" },
  "salary-sacrifice-pension-calculator": { icon: "pound" },
  "sick-pay-calculator": { icon: "briefcase" },
  "employee-cost-calculator": { icon: "users", featured: true, stat: "£34K", statCaption: "per employee" },
  "salary-sacrifice-calculator": { icon: "pound" },
  "maternity-allowance-calculator": { icon: "heart" },
  "bradford-factor-calculator": { icon: "alert" },
  "company-car-tax-calculator": { icon: "car" },
  "net-to-gross-calculator": { icon: "calculator" },
  "two-jobs-tax-calculator": { icon: "users" },
  "nhs-midwife-salary": { icon: "heart" },
  "national-insurance-calculator": { icon: "banknote" },
  "teachers-pay-scale-calculator": { icon: "users", featured: true, stat: "M1-UPS3", statCaption: "pay range" },
  "police-pay-scale-calculator": { icon: "scale", featured: true, stat: "PP1-PP7", statCaption: "pay points" },
  "take-home-pay-calculator": { icon: "pound" },
  "annual-leave-calculator": { icon: "calendar" },
  "holiday-entitlement-calculator": { icon: "calendar", featured: true, stat: "5.6", statCaption: "weeks" },
};