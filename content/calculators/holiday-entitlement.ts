import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "holiday-entitlement-calculator",
  kind: "holiday-entitlement",
  title: "Holiday Entitlement Calculator UK 2026/27",
  metaDescription:
    "Calculate UK holiday entitlement in days and hours for fixed or part-year service, check regional bank holidays and apply 12.07% correctly",
  h1: "Holiday Entitlement Calculator",
  intro:
    "Calculate statutory holiday entitlement in both days and hours from a normal 37.5-hour, five-day week or another regular pattern. The planned calculator can identify bank holidays for England and Wales, Scotland or Northern Ireland and apply a part-year month factor for a regular worker who starts or leaves during the holiday year. It keeps that pro-rata calculation separate from the 12.07% pay-period method required for qualifying irregular-hours and part-year workers.",
  formulaExplainer: `:::callout info
For a regular full-year worker, **holiday in days = days worked each week × 5.6**, capped at 28 statutory days. **Holiday in hours = capped holiday days × average hours per working day**; for a five-day pattern this is normal weekly hours × 5.6. A regular worker employed for part of the leave year can be estimated as full-year entitlement × months employed ÷ 12.

For an irregular-hours or statutory part-year worker in a leave year beginning on or after 1 April 2024, the separate rule is **holiday accrued in each pay period = actual hours worked × 12.07%**, subject to the statutory cap and special sickness or family-leave calculations.
:::`,
  howToSteps: [
    {
      name: "Choose the worker type",
      text: "Select a regular fixed pattern or the 12.07% method for a qualifying irregular-hours or part-year worker. The legal calculation differs.",
    },
    {
      name: "Enter weekly days and hours",
      text: "For a regular worker, enter normal days and hours per week. The calculator returns the same 5.6-week entitlement in both units.",
    },
    {
      name: "Select the bank-holiday region",
      text: "Choose England and Wales, Scotland or Northern Ireland, then confirm whether the contract includes those bank holidays within the annual allowance or gives them on top.",
    },
    {
      name: "Apply a part-year factor if needed",
      text: "For a regular worker starting or leaving within the holiday year, enter months employed to pro-rate the full-year amount. Use exact dates for final payroll where partial months matter.",
    },
    {
      name: "Check days, hours and policy rules",
      text: "Review the calculated entitlement, regional bank-holiday treatment and rounding. Use hours where workdays have different lengths.",
    },
  ],
  sections: [
    {
      heading: "What is statutory holiday entitlement?",
      body: `Most UK workers are entitled to **5.6 weeks of paid annual leave** under the Working Time Regulations 1998. For a regular five-day worker, that is 28 days. A regular three-day worker receives 16.8 days. The 28-day statutory cap means working six days each week does not create 33.6 statutory days.

The right applies to full-time, part-time and zero-hours workers, but the calculation method depends on the working pattern and leave-year dates. Employers can offer more than 5.6 weeks; extra contractual leave should be added only when the contract provides it. Holiday pay is a separate calculation from holiday time.`,
    },
    {
      heading: "Calculating fixed-pattern leave in days and hours",
      body: `For a regular schedule, multiply weekly days by 5.6 for a day entitlement and weekly hours by 5.6 for an hour entitlement. The default **37.5 hours over 5 days** gives 28 days or 210 hours. Both results describe the same 5.6 weeks.

Hours are safer when daily shifts differ. Someone working 30 hours across four days has 168 statutory hours, even if one day is longer than another. Deduct the hours that would normally have been worked on each holiday date. Do not calculate 22.4 days and then assume every day is the same length if the schedule varies.`,
    },
    {
      heading: "Bank holidays by UK region",
      body: `Bank-holiday provision differs across **England, Wales, Scotland and Northern Ireland**. The calculator displays the standard regional count used by its 2026 reference: 8 for England, 8 for Wales, 9 for Scotland and 10 for Northern Ireland. That count does not automatically increase the 5.6-week minimum. The contract decides whether the days are included, added on top or worked with time off later.

Scottish local holidays can differ from the national list. One-off bank holidays and substitute days can also change a particular year's calendar. Check the GOV.UK bank-holiday dates and workplace policy before treating the displayed count as a contractual entitlement.`,
    },
    {
      heading: "Part-year service using a month factor",
      body: `A regular-hours worker who **starts or leaves part-way through the employer's leave year** receives a proportion of the full-year entitlement. A simple month estimate is full-year leave × months employed ÷ 12. For example, 28 days × 9 ÷ 12 = 21 days.

This is not the same as the statutory definition of a “part-year worker” whose contract requires periods of at least a week with no work and no pay. For payroll, exact start and leaving dates can be more accurate than whole months. On termination, unused accrued statutory leave is normally paid; deductions for excess leave taken require contractual authority.`,
    },
    {
      heading: "When the 12.07% irregular-hours rule applies",
      body: `For leave years beginning on or after **1 April 2024**, GOV.UK says irregular-hours and statutory part-year workers accrue leave at 12.07% of actual hours worked in each pay period. The entitlement is calculated at the end of each pay period and is capped at 28 days in a leave year. Special average-hours rules cover sickness and statutory leave.

Do not apply 12.07% to a regular full-year worker merely because they are part-time. Their right remains 5.6 weeks of their regular pattern. Rolled-up holiday pay is permitted only for qualifying irregular-hours and part-year workers and must be shown separately from normal pay.`,
    },
    {
      heading: "Holiday entitlement examples",
      body: `These examples show why days and hours should be read together. They assume regular full-year patterns except for the final row.

:::table
| Working pattern | Calculation | Statutory entitlement |
|---|---|---|
| 37.5 hours over 5 days | 5 × 5.6; 37.5 × 5.6 | 28 days; 210 hours |
| 30 hours over 4 days | 4 × 5.6; 30 × 5.6 | 22.4 days; 168 hours |
| 22.5 hours over 3 days | 3 × 5.6; 22.5 × 5.6 | 16.8 days; 126 hours |
| Regular 5-day worker for 9 months | 28 × 9 ÷ 12 | 21 days |
:::

A bank holiday reduces these balances only if the contract includes it and the worker would otherwise have worked.`,
    },
    {
      heading: "Rounding, changed patterns and other edge cases",
      body: `Employers must not round statutory entitlement down in a way that removes leave. Keeping decimals or hours is usually more accurate than repeatedly rounding part-days. For 12.07% pay-period accrual, GOV.UK guidance rounds to the nearest hour, with less than 30 minutes down and 30 minutes or more up.

If hours or days change during the year, calculate each period under its actual pattern and add the results. Include accrual during sickness and statutory family leave under the applicable rules. Check term-time contracts carefully: paid non-working weeks, annualised hours and the statutory part-year definition can change which calculation applies.`,
    },
    {
      heading: "Summary: choose the calculation that fits the worker",
      body: `For a regular full-year worker, enter weekly days and hours; **37.5 hours over five days gives 210 hours or 28 days**. Select the UK region to review the correct bank-holiday calendar and specify whether the contract includes those days. Use the month factor only as a part-year estimate for a regular starter or leaver.

Use 12.07% of actual hours in each pay period for a qualifying irregular-hours or statutory part-year worker with a leave year beginning on or after 1 April 2024. Check exact dates, working-pattern changes and contractual extra leave before confirming the result.`,
    },
  ],
  faq: [
    {
      question: "How much holiday does a 37.5-hour, five-day worker get?",
      answer:
        "The statutory minimum is 5.6 weeks: 28 days or 210 hours for a regular 37.5-hour, five-day week. Bank holidays may be included within that total.",
    },
    {
      question: "How do I calculate part-time holiday in hours?",
      answer:
        "Multiply normal weekly hours by 5.6. A regular 22.5-hour week gives 126 statutory hours for a full leave year.",
    },
    {
      question: "Are bank holidays added on top of 28 days?",
      answer:
        "Not automatically. The contract can include bank holidays within the 5.6-week minimum or provide them on top, and the dates differ by UK region.",
    },
    {
      question: "How is holiday pro-rated for nine months?",
      answer:
        "A simple regular-worker estimate is full-year entitlement × 9 ÷ 12. For 28 days, that gives 21 days; exact start and leaving dates may produce a more precise payroll result.",
    },
    {
      question: "Who should use the 12.07% holiday method?",
      answer:
        "For leave years starting on or after 1 April 2024, it applies to workers meeting the statutory irregular-hours or part-year definitions. It is not the standard method for every part-time worker.",
    },
    {
      question: "Can rolled-up holiday pay be used for regular workers?",
      answer:
        "No. The post-April 2024 rolled-up holiday pay option is for qualifying irregular-hours and part-year workers, and the holiday element must be itemised separately.",
    },
    {
      question: "What happens when weekly hours change during the year?",
      answer:
        "Calculate entitlement for each period using the pattern that applied then and combine the results. Using only the latest weekly hours for the whole year can understate or overstate leave.",
    },
  ],
  relatedSlugs: [],
  defaults: { hoursWorkedPerWeek: 37.5, daysWorkedPerWeek: 5 },
});
