import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "smp-calculator",
  kind: "smp",
  title: "SMP Calculator UK 2026/27: Statutory Maternity Pay",
  metaDescription:
    "SMP calculator for 2026/27. Estimate statutory maternity pay: 90% of average weekly earnings for 6 weeks, then the statutory weekly rate or 90% if lower for 33 weeks.",
  h1: "SMP Calculator: Statutory Maternity Pay",
  intro:
    "This Statutory Maternity Pay (SMP) calculator works out how much an employee receives over her maternity leave in 2026/27. It is built for UK employers budgeting for cover, HR and payroll teams processing the entitlement, and expectant employees checking what they will receive. SMP is paid at **90% of average weekly earnings for the first 6 weeks**, then £194.32 a week — or 90% of earnings if that is lower — for up to 33 further weeks (GOV.UK).",
  formulaExplainer:
    "SMP is split into two tiers: the first six weeks of paid leave always use 90% of the employee's average weekly earnings, with no upper cap. The remaining 33 weeks use the lower of the statutory weekly rate and 90% of earnings, so high earners receive the flat rate and lower earners stay on 90%.\n\n:::callout info\nSMP = **(first 6 weeks × 90% of AWE) + (remaining weeks × lower of £194.32 or 90% of AWE)**, capped at 39 weeks\n:::\n\nThe **average weekly earnings** figure is the gross pay the employee earned over the eight-week (or two monthly pay period) reference window ending with the last payday before the end of the 15th week before the baby is due. Bonuses, overtime and commission paid in that window all count towards AWE.",
  howToSteps: [
    {
      name: "Enter the annual salary",
      text: "Use annual salary for an estimate. The calculator divides it by 52 to estimate Average Weekly Earnings and applies the fixed 39-week SMP schedule.",
    },
    {
      name: "Use actual Average Weekly Earnings if needed",
      text: "Turn on the actual-AWE option when payroll earnings in the statutory reference period differ from annual salary divided by 52, for example because of bonuses, overtime or variable pay.",
    },
    {
      name: "Read the weekly rates",
      text: "The calculator shows the weekly rate for the first 6 weeks (90% of AWE) and the weekly rate for the remaining weeks (the lower of £194.32 and 90% of AWE).",
    },
    {
      name: "Read the total SMP payable",
      text: "The total combines the fixed 6-week and 33-week tiers across 39 weeks. The figure is gross before income tax and employee NI are deducted through PAYE.",
    },
  ],
  sections: [
    {
      heading: "What is Statutory Maternity Pay?",
      body: "**Statutory Maternity Pay (SMP)** is the statutory minimum UK employers must pay employees on maternity leave. It is paid through the normal payroll, with income tax and employee National Insurance deducted in the usual way, and it is recoverable in part from HMRC.\n\nSMP is paid for up to **39 weeks** of the 52-week statutory maternity leave period. The remaining 13 weeks are unpaid, although many employers top up SMP with occupational maternity pay for at least part of the leave. SMP cannot be waived in the employment contract and applies to employees regardless of the employer's size or the employee's length of service, provided the qualifying conditions are met.",
    },
    {
      heading: "Who qualifies for SMP",
      body: "An employee qualifies for SMP if all of the following apply, as set out on GOV.UK:\n\n- She has at least **26 weeks' continuous service** by the end of the 15th week before the expected week of childbirth (the qualifying week).\n- She is still employed by you in that qualifying week.\n- Her Average Weekly Earnings meet the calculator's £123 weekly eligibility threshold.\n- She gives the employer correct notice (at least 28 days before she stops work, where reasonably practicable) and proof of pregnancy.\n\nIf the employee does not meet these criteria — usually because she has not yet built up 26 weeks of service — the employer must issue form **SMP1** within seven days of the decision. The employee can then claim Maternity Allowance from Jobcentre Plus instead.",
    },
    {
      heading: "How SMP is calculated",
      body: "SMP is set on a weekly basis, but most employees are paid monthly. The calculation runs on **average weekly earnings (AWE)**, which HMRC defines as gross earnings over the eight-week period (or two monthly paydays) ending with the last payday on or before the end of the 15th week before the baby is due.\n\nThe first six weeks of paid leave always pay 90% of AWE, with no upper cap. The remaining 33 weeks pay the lower of **£194.32** (the 2026/27 statutory weekly rate) and 90% of AWE. This means:\n\n- Where 90% of AWE is below £194.32, SMP stays at 90% of AWE across all 39 weeks.\n- Where 90% of AWE is above £194.32, SMP is 90% of AWE for the first 6 weeks and £194.32 a week for the remaining 33 weeks.\n\nThe maximum paid period is 39 weeks; the remaining 13 weeks of statutory maternity leave are unpaid.",
    },
    {
      heading: "SMP across different earnings levels",
      body: "The table below shows how SMP changes with average weekly earnings, using the 2026/27 flat rate of £194.32. Where 90% of AWE is below the flat rate, the employee stays on 90% for the whole 39 weeks.\n\n:::table\n| AWE | 90% AWE | First 6 weeks | Remaining 33 weeks | 39-week total |\n|---|---|---|---|---|\n| £200 | £180 | £1,080 | £5,940 | £7,020 |\n| £300 | £270 | £1,620 | £6,413 | £8,033 |\n| £400 | £360 | £2,160 | £6,413 | £8,573 |\n| £500 | £450 | £2,700 | £6,413 | £9,113 |\n| £700 | £630 | £3,780 | £6,413 | £10,193 |\n:::\n\nUse the maternity allowance calculator to compare SMP with Maternity Allowance for an employee who does not qualify for SMP.",
    },
    {
      heading: "SMP, tax and the payroll",
      body: "SMP is paid through the normal payroll and counts as earnings for the period it covers. **Income tax and employee NI are deducted in the usual way**, so the net amount on the payslip will be lower than the gross SMP figure shown in the calculator.\n\nSMP also counts towards pensionable pay where the scheme defines it that way. Most defined-contribution schemes include SMP in pensionable earnings; defined-benefit schemes vary, so check the scheme rules before relying on a full pension contribution during maternity leave. Salary sacrificed into an approved pension scheme reduces the qualifying pay for SMP, because AWE is based on actual gross earnings received.",
    },
    {
      heading: "Reclaiming SMP from HMRC",
      body: "Unlike SSP, employers can recover a large portion of SMP from HMRC. There are two recovery rates for 2026/27 (GOV.UK):\n\n- **92%** of SMP paid is recoverable by all employers, deducted from the PAYE payments due to HMRC.\n- **109%** of SMP is recoverable by small employers under Small Employers' Relief, where the employer's total Class 1 NI for the previous tax year was £45,000 or less. The extra 17% compensates for the employer's own NI on the SMP payment.\n\nRecovery is made on the EPS (Employer Payment Summary), not on the FPS. Keep the SMP records and the SMP1 letter (where issued) in case HMRC queries the recovery.",
    },
    {
      heading: "If the employee does not qualify for SMP",
      body: "An employee who does not meet the SMP qualifying conditions — typically because she has not yet built up 26 weeks of continuous service by the qualifying week — should be issued with form **SMP1** within seven days of the decision being made. She can then claim **Maternity Allowance** from Jobcentre Plus for up to 39 weeks, paid at £194.32 a week or 90% of AWE if lower.\n\nA small employer that pays Maternity Allowance to a former employee can recover some of the cost, but only where the employee was employed right up to the date of confinement. For everyone else, Maternity Allowance is paid by DWP, not the employer.",
    },
    {
      heading: "Common SMP mistakes to avoid",
      body: "Three errors crop up regularly in payroll and HR:\n\n- Using the wrong AWE reference period. HMRC uses the eight weeks (or two monthly paydays) ending before the qualifying week, not the most recent eight weeks of pay.\n- Forgetting to issue SMP1 when the employee does not qualify. The deadline is seven days from the decision, and missing it can put the employer in breach of statutory timescales.\n- Treating all employers as eligible for Small Employers' Relief. Only employers whose previous-year Class 1 NI was £45,000 or less can recover 109% rather than 92% of SMP.",
    },
    {
      heading: "Summary: how to use this SMP calculator",
      body: "Enter annual salary or turn on actual Average Weekly Earnings. The calculator checks the weekly earnings threshold, then shows the first-six-week rate and total, the remaining-33-week rate and total, the full 39-week payment and an approximate monthly equivalent.\n\nThe figures use the 2026/27 statutory weekly rate of £194.32 and the 90% AWE rules. The total is gross before PAYE deductions.",
    },
    {
      "heading": "SMP eligibility decision tree for payroll",
      "body": "Use the calculator after you have checked eligibility. The practical decision tree is: first confirm the employee is employed in the qualifying week, then confirm 26 weeks of continuous service by the end of the 15th week before the expected week of childbirth, then check average weekly earnings against the Lower Earnings Limit, then check notice and MATB1 evidence. If any step fails, issue SMP1 promptly and point the employee towards Maternity Allowance. This decision-tree approach prevents the common error of calculating a payment before confirming the legal right to SMP."
    },
    {
      "heading": "Week-by-week SMP payment schedule",
      "body": "For a 39-week claim, the schedule has three clear phases. Weeks 1 to 6 pay 90% of average weekly earnings. Weeks 7 to 39 pay the lower of the statutory weekly rate and 90% of average weekly earnings. Weeks 40 to 52 of statutory maternity leave are unpaid unless the employer offers enhanced maternity pay. Payroll teams should keep a schedule showing the start date, paid weeks used, rate per week, gross amount, tax and NI deductions, and any employer top-up."
    },
    {
      "heading": "Reclaiming SMP and small employer relief",
      "body": "Most employers can reclaim 92% of SMP through HMRC. Small employers may recover the enhanced small-employer relief rate where their prior-year Class 1 NI liability is within the relief threshold. Treat the reclaim as a payroll funding calculation, not as a reduction in the employee payment. The employee still receives gross SMP through payroll, while the employer adjusts PAYE payments using the Employer Payment Summary."
    },
    {
      "heading": "Operational checklist before the first SMP payment",
      "body": "Before paying SMP, keep the MATB1 or equivalent evidence, record the qualifying week, calculate average weekly earnings, confirm the maternity leave start date, document any enhanced maternity-pay policy, create the payment schedule, and diary the final paid SMP week. If the employee resigns, is made redundant, receives a bonus, or changes salary around the reference period, check HMRC guidance carefully because those events can change the calculation or the payroll treatment."
    },
  ],
  faq: [
    {
      question: "How much is Statutory Maternity Pay in 2026/27?",
      answer:
        "90% of average weekly earnings for the first 6 weeks, then £194.32 a week (or 90% of earnings if lower) for up to 33 more weeks — 39 weeks of paid leave in total. The remaining 13 weeks of the 52-week statutory maternity leave are unpaid.",
    },
    {
      question: "Who qualifies for SMP?",
      answer:
        "An employee must have at least 26 weeks' continuous service by the end of the 15th week before the expected week of childbirth, still be employed in that qualifying week, and earn at least £129 a week on average (the Lower Earnings Limit). She must give correct notice and proof of pregnancy (GOV.UK).",
    },
    {
      question: "How are average weekly earnings worked out for SMP?",
      answer:
        "HMRC uses gross earnings over the eight-week period (or two monthly paydays) ending with the last payday on or before the end of the 15th week before the baby is due. Bonuses, overtime and commission paid in that window all count towards AWE.",
    },
    {
      question: "Can employers reclaim SMP from HMRC?",
      answer:
        "Yes. All employers can recover 92% of SMP payments; small employers recover 109% under Small Employers' Relief. Recovery is made by deducting the amount from the PAYE payments due to HMRC on the EPS.",
    },
    {
      question: "What happens if the employee does not qualify for SMP?",
      answer:
        "The employer must issue form SMP1 within seven days of the decision. The employee can then claim Maternity Allowance from Jobcentre Plus instead — up to 39 weeks at £194.32 a week or 90% of average weekly earnings if lower.",
    },
    {
      question: "Is SMP taxable?",
      answer:
        "Yes. SMP is paid through payroll and counts as earnings, so income tax and employee National Insurance are deducted in the normal way. It also counts towards pensionable pay where the scheme includes it.",
    },
    {
      question: "Does SMP affect other benefits like holiday accrual?",
      answer:
        "Statutory maternity leave is treated as continuous employment for accrual purposes. Employees continue to build up their statutory 5.6-week holiday entitlement during paid and unpaid maternity leave, and may carry it over to the next leave year.",
    },
    {
      "question": "Can an employee choose actual AWE instead of annual salary for SMP?",
      "answer": "SMP is based on actual average weekly earnings in the statutory reference period, not annual salary. Annual salary is useful for estimating, but payroll should use the real gross pay in the eight-week or two-payday reference window."
    },
    {
      "question": "Does a bonus count in SMP average weekly earnings?",
      "answer": "Yes, if the bonus is paid in the statutory earnings reference period. Overtime, commission and other taxable earnings paid in that window can also increase AWE."
    },
    {
      "question": "What should an employer do if SMP is not payable?",
      "answer": "Issue form SMP1 within the required timescale and explain the reason. The employee may be able to claim Maternity Allowance instead."
    },
  ],
  relatedSlugs: [
    "maternity-allowance-calculator",
    "ssp-calculator",
  ],
  defaults: {
    annualSalary: 30000,
  },
});
