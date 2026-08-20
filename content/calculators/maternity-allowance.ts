import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "maternity-allowance-calculator",
  kind: "maternity-allowance",
  title: "Maternity Allowance Calculator UK 2026/27",
  metaDescription:
    "Maternity Allowance calculator for 2026/27 — £194.32 a week or 90% of average weekly earnings if lower, paid for up to 39 weeks",
  h1: "Maternity Allowance Calculator",
  intro:
    "Estimate Maternity Allowance (MA) for people who do not qualify for Statutory Maternity Pay in 2026/27. This UK maternity allowance calculator is built for self-employed claimants, recently employed workers, and employers checking what an ineligible employee should claim instead. For 2026/27 Maternity Allowance is £194.32 a week, or 90% of average weekly earnings if lower, paid for up to 39 weeks.",
  formulaExplainer:
    ":::callout info\n**Maternity Allowance formula (2026/27):** weekly MA = lower of **£194.32** or **90% of average weekly earnings**. Total MA = weekly MA × weeks claimed, capped at **39 weeks**.\n\nThe average weekly earnings should be calculated over the relevant test period: the 66 weeks ending with the week before the baby is due, ignoring the earliest 6 weeks. The calculator applies the cap of 39 weeks to any figure entered.\n:::",
  sections: [
    {
      heading: "What is Maternity Allowance?",
      body:
        "**Maternity Allowance (MA)** is the statutory maternity payment for people who cannot get Statutory Maternity Pay from an employer. It is administered by the Department for Work and Pensions (DWP) and paid through the claimant's bank account, not through the employer's payroll.\n\nFor 2026/27 the standard rate is £194.32 a week, or 90% of average weekly earnings if that is lower, paid for up to 39 weeks. MA is not taxable and does not count as earnings for income tax or for the claimant's own National Insurance record.",
    },
    {
      heading: "Who can claim Maternity Allowance",
      body:
        "Eligibility for MA is set out on GOV.UK. The two main routes are:\n\n- **The self-employed.** A self-employed person who has paid Class 2 National Insurance for at least 13 of the 66 weeks before the week the baby is due, and whose earnings in any 13 of those weeks are at least £30 a week.\n- **Employees who do not qualify for SMP.** For example, someone who changed jobs, fell below the SMP earnings threshold, or had a break in employment. The qualifying test is 26 weeks of employment with the same employer ending in the 66th week before the due date, and average weekly earnings of at least £30 in any 13 of those 66 weeks.\n\nThe form MA1 is used to claim, supported by form MAT B1 (proof of pregnancy) and form SMP1 if an employer confirmed SMP cannot be paid. The 14-week 'special' MA period applies to a narrow group — the GOV.UK page spells out when.",
    },
    {
      heading: "Maternity Allowance vs Statutory Maternity Pay",
      body:
        "Both last up to 39 weeks and the headline rate is the same, but the way they are delivered, taxed and reclaimed is different. The table below sets out the practical differences for 2026/27.\n\n:::table\n| Feature | Maternity Allowance | Statutory Maternity Pay |\n|---|---|---|\n| Who pays | DWP, direct to the claimant | Employer, through payroll |\n| Who qualifies | Self-employed, some employees | Employees meeting the continuous employment and earnings tests |\n| Weekly rate (2026/27) | £194.32 or 90% AWE if lower | 90% AWE for first 6 weeks, then £194.32 or 90% AWE if lower |\n| Duration | Up to 39 weeks | Up to 39 weeks |\n| Taxable? | No | Yes, but usually below the personal allowance |\n| Reclaimable by employer | N/A | 92% (103% for small employers) via HMRC |\n| Claim form | MA1 | Notify the employer |\n| When to start | 11 weeks before due date | 11 weeks before due date |\n:::\n\nThe biggest practical difference is who administers the claim: an employee who meets the SMP tests gets the money via payroll, and the employer reclaims most of it from HMRC. Someone who does not meet the SMP tests needs to apply to DWP directly.",
    },
    {
      heading: "How to claim Maternity Allowance",
      body:
        "The claim process is set by DWP and runs entirely outside the employer's payroll.\n\n- **Start the claim at 26 weeks of pregnancy.** Use form MA1 from GOV.UK. Do not start earlier — DWP will reject the application.\n- **Send proof of pregnancy.** Form MAT B1 is signed by a midwife or GP, usually from around 20 weeks.\n- **Send earnings evidence.** For the self-employed, this is Class 2 NI contributions for at least 13 of the qualifying 66 weeks. For employees, payslips or form SMP1 from the previous employer.\n- **Wait for the decision letter.** DWP confirms the start date, weekly rate and total amount. Payments are made directly into the bank account every week or fortnight.\n- **Tell your employer.** Even if MA is paid by DWP, the employee is still entitled to ordinary maternity leave from the employer. The Statutory Maternity Pay calculator can model what the SMP figure would have been, for comparison.\n\n:::callout tip\n**Claim from 26 weeks, not earlier.** DWP will reject MA1 forms submitted before 26 weeks of pregnancy. Use form MAT B1 from the midwife as proof of pregnancy and submit the MA1 claim as soon as the 26-week point is reached.\n:::",
    },
    {
      heading: "Summary: how to use this calculator",
      body:
        "Two numbers in, two numbers out. Enter the average weekly earnings over the qualifying 66-week period and the number of weeks being claimed (up to 39). The maternity allowance calculator returns the weekly MA rate — the lower of £194.32 or 90% of average weekly earnings — and the total amount payable. Use the SMP calculator to compare the figure the employee would have received if they had qualified for SMP.",
    },
  ],
  faq: [
    {
      question: "How much is Maternity Allowance in 2026/27?",
      answer:
        "The standard rate is £194.32 a week, or 90% of average weekly earnings if that is lower. It is paid for up to 39 weeks and is not taxable. The rate is set by DWP and listed on GOV.UK's Maternity Allowance pages.",
    },
    {
      question: "Who can claim Maternity Allowance?",
      answer:
        "Mainly people who cannot get Statutory Maternity Pay: the self-employed who have paid Class 2 National Insurance, and those employed for at least 26 of the 66 weeks before the baby's due date with average earnings of at least £30 a week in any 13 of those weeks. Full eligibility rules are on GOV.UK.",
    },
    {
      question: "What is the difference between Maternity Allowance and Statutory Maternity Pay?",
      answer:
        "SMP is paid by an employer to employees who meet the continuous employment and earnings tests, and includes six weeks at 90% of earnings. Maternity Allowance is paid directly by the DWP to those who do not qualify for SMP, at a flat £194.32 (or 90% of earnings if lower) for the whole claim.",
    },
    {
      question: "How long does Maternity Allowance last?",
      answer:
        "Up to 39 weeks. It can start from 11 weeks before the week the baby is due. Eligible claimants working for an employer may qualify for a shorter 14-week period in specific circumstances — GOV.UK explains when this applies.",
    },
    {
      question: "How do you claim Maternity Allowance?",
      answer:
        "Claim using form MA1, available on GOV.UK, from 26 weeks of pregnancy onwards. You will need proof of pregnancy (such as form MAT B1), evidence of earnings or Class 2 National Insurance payments, and — if you were employed — form SMP1 from the employer confirming why SMP cannot be paid.",
    },
  ],
  relatedSlugs: [],
});
