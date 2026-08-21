// Cluster taxonomy: slug -> related calculator/guide slugs.
// Single source for the RelatedContent component, so internal linking is
// systematic rather than hand-built per page.
export const relatedMap: Record<string, string[]> = {
  "pro-rata-calculator": [
    "holiday-entitlement-calculator",
    "annual-leave-calculator",
    "holiday-entitlement-part-time-workers",
  ],
  "ssp-calculator": [
    "sick-pay-calculator",
    "how-to-calculate-statutory-sick-pay",
    "ssp-vs-company-sick-pay",
  ],
  "sick-pay-calculator": ["ssp-calculator", "ssp-vs-company-sick-pay", "bradford-factor-calculator"],
  "employer-ni-calculator": [
    "employment-allowance-guide",
    "employer-ni-rates-2026-27",
    "employee-cost-calculator",
    "salary-sacrifice-pension-calculator",
  ],
  "ir35-calculator": ["take-home-pay-calculator", "net-to-gross-calculator"],
  "smp-calculator": ["maternity-allowance-calculator", "ssp-calculator"],
  "maternity-allowance-calculator": ["smp-calculator"],
  "p11d-calculator": ["company-car-tax-calculator", "employer-ni-calculator"],
  "company-car-tax-calculator": ["p11d-calculator", "take-home-pay-calculator"],
  "workplace-pension-calculator": [
    "salary-sacrifice-pension-calculator",
    "salary-sacrifice-pension-guide",
    "employee-cost-calculator",
  ],
  "salary-sacrifice-pension-calculator": [
    "workplace-pension-calculator",
    "salary-sacrifice-calculator",
    "salary-sacrifice-pension-guide",
    "employer-ni-calculator",
  ],
  "salary-sacrifice-calculator": ["salary-sacrifice-pension-calculator", "salary-sacrifice-pension-guide"],
  "employee-cost-calculator": [
    "employer-ni-calculator",
    "workplace-pension-calculator",
    "how-much-does-it-cost-to-employ-someone",
  ],
  "bradford-factor-calculator": ["ssp-calculator", "ssp-vs-company-sick-pay", "annual-leave-calculator"],
  "net-to-gross-calculator": ["take-home-pay-calculator", "employer-ni-calculator", "ir35-calculator"],
  "take-home-pay-calculator": ["net-to-gross-calculator", "national-insurance-rates-2026-27", "ir35-calculator"],
  "annual-leave-calculator": [
    "holiday-entitlement-calculator",
    "statutory-holiday-entitlement-uk",
    "holiday-entitlement-part-time-workers",
  ],
  "holiday-entitlement-calculator": [
    "annual-leave-calculator",
    "statutory-holiday-entitlement-uk",
    "pro-rata-calculator",
  ],
  // Guides point back at their tools
  "employer-ni-rates-2026-27": [
    "employer-ni-calculator",
    "employment-allowance-guide",
    "national-insurance-rates-2026-27",
    "employee-cost-calculator",
    "how-much-does-it-cost-to-employ-someone",
  ],
  "national-insurance-rates-2026-27": ["take-home-pay-calculator", "employer-ni-calculator"],
  "statutory-holiday-entitlement-uk": ["holiday-entitlement-calculator", "annual-leave-calculator"],
  "how-to-calculate-statutory-sick-pay": ["ssp-calculator", "sick-pay-calculator"],
  "ssp-vs-company-sick-pay": ["sick-pay-calculator", "ssp-calculator"],
  "employment-allowance-guide": ["employer-ni-calculator", "employer-ni-rates-2026-27"],
  "how-much-does-it-cost-to-employ-someone": ["employee-cost-calculator", "employer-ni-calculator"],
  "salary-sacrifice-pension-guide": ["salary-sacrifice-pension-calculator", "workplace-pension-calculator"],
  "holiday-entitlement-part-time-workers": ["annual-leave-calculator", "holiday-entitlement-calculator", "pro-rata-calculator"],
};

// NHS matrix pages share one default set
const nhsRelated = ["employee-cost-calculator", "take-home-pay-calculator"];

export function relatedFor(slug: string): string[] {
  if (slug.startsWith("nhs-band-")) return nhsRelated;
  return relatedMap[slug] ?? [];
}
