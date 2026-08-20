import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "holiday-entitlement-calculator",
  kind: "holiday-entitlement",
  title: "Holiday Entitlement Calculator UK 2026/27",
  metaDescription:
    "Holiday entitlement for irregular-hours and casual workers: accrual at 12.07% of hours worked, with rolled-up holiday pay rules explained",
  h1: "Holiday Entitlement Calculator",
  intro:
    "Workers with irregular hours or casual contracts accrue statutory holiday based on the hours they actually work. This calculator estimates that accrual at 12.07% of hours worked per week, the method GOV.UK sets out for irregular-hours and part-year workers. For leave years starting on or after 1 April 2024, employers may also use rolled-up holiday pay for these workers — paying holiday as an uplift on each payslip instead of when leave is taken.",
  formulaExplainer: `:::callout info
**Holiday accrued (hours) = hours worked × 12.07%.** The 12.07% comes from the statutory 5.6 weeks of leave divided by the 46.4 working weeks in a 52-week year (5.6 ÷ 46.4 ≈ 12.07%), so holiday builds up in proportion to hours worked over a 52-week reference period.
:::

This accrual method applies to irregular-hours and part-year workers. Staff with fixed hours and fixed days get **5.6 weeks** in the usual way instead — the days-based formula on the annual leave calculator.`,
  sections: [
    {
      heading: "What is the holiday entitlement for irregular-hours workers?",
      body: `An irregular-hours worker is anyone whose contracted hours are not fixed — zero-hours contract workers, casual staff, and some agency workers. For these workers, the days-based formula (days per week × 5.6) does not work because there is no consistent working pattern to multiply. Instead, the entitlement is calculated in hours as a percentage of the hours actually worked in each pay period.

The rate is **12.07% of hours worked**, which is the statutory 5.6 weeks expressed as a proportion of the working weeks in a year. GOV.UK publishes this as the recommended method for irregular-hours and part-year workers under the Working Time Regulations 1998 (as amended by the 2023 reforms).`,
    },
    {
      heading: "How the 12.07% accrual method works",
      body: `The 12.07% figure comes from the statutory entitlement of 5.6 weeks. A 52-week year contains 52 weeks, but 5.6 of those are holiday — leaving 46.4 working weeks. Divide the 5.6 weeks of leave by the 46.4 working weeks and you get 0.1207, or 12.07%. So roughly **one hour of holiday accrues for every eight hours worked**.

In practice, the calculation runs each pay period: the worker submits their hours, the employer multiplies those hours by 12.07%, and that is the holiday accrued for the period. The accrual is cumulative, so any leave taken during the year is deducted from the running balance. Use the calculator above to estimate the annual entitlement for a typical weekly hours figure.`,
    },
    {
      heading: "Rolled-up holiday pay rules",
      body: `Rolled-up holiday pay means paying holiday as an itemised uplift on each payslip — at least 12.07% on top of normal pay — rather than when leave is taken. This is the standard method for irregular-hours workers under leave years starting on or after 1 April 2024, when the Working Time Regulations were reformed to make it explicitly lawful for this group.

For staff with **fixed regular hours**, rolled-up holiday pay remains unlawful — only workers with genuinely irregular or part-year patterns can be paid this way. The uplift must be clearly itemised on the payslip, and it does not change the worker's underlying entitlement to take leave.

:::callout tip
If rolled-up holiday pay is used, it must be shown as a separate line on the payslip — not folded into the hourly rate. The worker should be able to see the holiday amount and the worked amount split out, so the 12.07% uplift is auditable.
:::`,
    },
    {
      heading: "The 52-week reference period",
      body: `Holiday pay for irregular-hours workers is usually averaged over the **52 weeks** before the holiday is taken. Where the worker has been employed for less than 52 weeks, the reference period is the number of weeks they have worked. Weeks with no pay are ignored, and the average can be taken over up to 104 weeks where a 52-week reference does not give a fair figure.

The 52-week reference applies to both the **rate** of holiday pay (averaging out variations like overtime and commission) and the **accrual** of holiday itself. New starters and workers returning from long absence typically have a shorter reference period, and the employer should document how the average is calculated.`,
    },
    {
      heading: "Holiday entitlement at common worker types",
      body: `Here is how the UK statutory entitlement works for the four common worker types in 2026/27. The calculator above uses the 12.07% method for irregular-hours and part-year workers.

:::table
| Worker type | Accrual method | Worked example | Holiday entitlement (year) |
|---|---|---|---|
| Fixed hours, full year | 5.6 weeks per year | 37.5 hrs/week | 28 days = 210 hours |
| Fixed hours, part-time | 5.6 weeks per year | 20 hrs/week | 119.5 hours |
| Irregular-hours | 12.07% of hours worked | 25 hrs × 52 wks | 156.9 hours |
| Part-year (term-time) | 12.07% of hours worked | 1,000 hrs worked | 120.7 hours |
:::

Fixed-hours workers use the days-based formula on the annual leave calculator; irregular-hours and part-year workers use the 12.07% method here. The entitlement is the same in total — 5.6 weeks — but the calculation path differs because the working pattern does.`,
    },
    {
      heading: "Summary: how to use this calculator",
      body: `Enter the typical weekly hours, and the calculator returns the holiday entitlement in hours based on the 12.07% accrual method. Multiply by the hourly rate to value it in cash, or divide by the working day length to convert it to days.

For fixed-hours staff, use the annual leave calculator instead. The 12.07% method applies only to irregular-hours and part-year workers, where the days-based formula does not produce a meaningful answer.`,
    },
  ],
  faq: [
    {
      question: "Where does the 12.07% figure come from?",
      answer:
        "Statutory leave is 5.6 weeks out of a 52-week year, leaving 46.4 working weeks. 5.6 ÷ 46.4 ≈ 12.07%, so each hour worked accrues roughly 12.07% of an hour of paid holiday for irregular-hours workers.",
    },
    {
      question: "Who does the 12.07% accrual method apply to?",
      answer:
        "Irregular-hours workers and part-year workers (for example, term-time or zero-hours staff). Workers with regular fixed hours receive the standard 5.6 weeks' entitlement instead, calculated in days.",
    },
    {
      question: "What is rolled-up holiday pay and is it allowed?",
      answer:
        "Rolled-up holiday pay means paying holiday as an itemised uplift (at least 12.07%) on top of normal pay each pay period, rather than when leave is taken. Since 1 April 2024 it is lawful for irregular-hours and part-year workers only — not for regular-hours staff.",
    },
    {
      question: "How much holiday does a full-time worker get?",
      answer:
        "5.6 weeks per year — 28 days for someone working five days a week, which can include bank holidays. Part-time workers on fixed days get a pro-rata share: days worked per week × 5.6. Use the annual leave calculator for a days-based figure.",
    },
    {
      question: "What is the 52-week reference period?",
      answer:
        "It is the look-back period used for holiday pay and accrual for workers without normal working hours: pay is averaged over the last 52 weeks in which the worker actually worked, ignoring weeks with no pay.",
    },
  ],
  relatedSlugs: [],
});
