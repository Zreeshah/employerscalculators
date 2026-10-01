import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "monthly-employer-ni-2026-27",
  title: "Monthly Employer NI 2026/27: £417 Threshold Guide",
  metaDescription:
    "Monthly employer NI in 2026/27: the £417 secondary threshold, 15% standard rate, regular-pay examples and why annual figures do not always divide by 12",
  h1: "Monthly Employer NI 2026/27",
  intro:
    "For a regular monthly-paid standard category A employee, employer National Insurance begins above the **£417 monthly secondary threshold** in 2026/27. The main rate is 15%. This guide gives a clear regular-pay check, but payroll software must calculate the statutory figure because it uses HMRC rules, pay-period treatment and rounding. For annual offer planning, use the [employer NI calculator](/employer-ni-calculator/).",
  sections: [
    {
      heading: "The regular monthly employer NI check",
      body:
        "For a standard category A employee paid the same gross amount every month, a simple monthly sense-check is max(monthly gross pay − £417, 0) × 15%. The £417 figure is the published monthly secondary threshold for 2026/27. It is not the exact mathematical twelfth of the £5,000 annual threshold, so small differences from an annual estimate can occur.\n\n:::callout warn\nUse this as a budgeting check, not a payroll engine. Starters, leavers, irregular pay, directors, special categories and payroll rounding need the current HMRC calculation in payroll software.\n:::\n\nThe [official HMRC thresholds](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027) list the monthly, weekly and annual figures.",
    },
    {
      heading: "Monthly examples for standard category A",
      body:
        ":::table\n| Monthly gross pay | Amount above £417 | 15% regular-pay check |\n|---:|---:|---:|\n| £400 | £0 | £0 |\n| £1,500 | £1,083 | £162.45 |\n| £2,500 | £2,083 | £312.45 |\n| £3,333.33 | £2,916.33 | £437.45 |\n| £5,000 | £4,583 | £687.45 |\n:::\n\nThe calculation is an illustration of the stated monthly threshold. It should not be multiplied blindly to create a final annual liability: exact pay-period calculations, annual directors' methods and rounding can produce a different total. For a salary offer, see the [employer NI on a salary guide](/guides/employer-ni-on-salary-2026-27/).",
    },
    {
      heading: "Why a bonus can change the monthly result",
      body:
        "Employer NI is normally due on NI-able salary, overtime, commission and bonuses in the period they are paid. If a £2,500 monthly salary is accompanied by a £1,000 bonus, the relevant monthly gross pay is £3,500 for that calculation, not £2,500. The threshold is used once for the pay period.\n\nThat is why an annual salary divided by 12 is not enough when pay changes. Keep the pay-period gross amount separate from costs that are not Class 1 earnings, and have payroll confirm any unusual payment before reporting it to HMRC.",
    },
    {
      heading: "Special categories and monthly thresholds",
      body:
        "The £417/15% check is for the normal category A case. A qualifying employee under 21, apprentice under 25 or veteran can have a 0% employer rate up to the upper secondary threshold. A qualifying Freeport or Investment Zone category can have a 0% rate up to its own upper secondary threshold.\n\nA special category is not a discretionary discount. It depends on the correct HMRC letter, eligibility and evidence. See the [employer NI category-letter guide](/guides/employer-ni-category-letters-2026-27/) before using a reduced estimate.",
    },
    {
      heading: "Employment Allowance is not a lower monthly rate",
      body:
        "Employment Allowance does not change the £417 threshold or 15% rate. Instead, an eligible employer uses it to offset the running total of its Class 1 secondary liability, up to £10,500 in the tax year. One worker's monthly NI may be covered early in the year while the employer still has allowance remaining, but the underlying liability still exists.\n\nFor a payroll-wide view, calculate the NI first and then check eligibility and remaining allowance. Our [Employment Allowance guide](/guides/employment-allowance-guide/) explains the main eligibility checks.",
    },
    {
      heading: "Key takeaways",
      body:
        "For a regular monthly category A employee, £417 is the 2026/27 secondary threshold and 15% applies above it. Use the calculation as a transparent sense-check, but do not use it as an alternative to payroll software. Check special categories, variable pay and Employment Allowance separately.",
    },
  ],
  faq: [
    { question: "What is the monthly employer NI threshold for 2026/27?", answer: "The standard monthly secondary threshold is £417." },
    { question: "What is the standard monthly employer NI rate?", answer: "For a standard category A employee, the main employer rate is 15% on earnings above the monthly secondary threshold." },
    { question: "Why does annual employer NI divided by 12 differ from payroll?", answer: "HMRC publishes separate period thresholds and payroll applies pay-period rules and rounding. Variable pay can also change the result." },
    { question: "Does a bonus attract employer NI?", answer: "Normally yes. Bonuses, overtime and commission are generally NI-able earnings in the pay period in which they are paid." },
    { question: "Does Employment Allowance change the £417 threshold?", answer: "No. It offsets an eligible employer's running Class 1 secondary liability; it does not alter the threshold or rate." },
  ],
  relatedSlugs: [],
});
