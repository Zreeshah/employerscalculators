import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "salary-sacrifice-calculator",
  kind: "salary-sacrifice",
  title: "Salary Sacrifice Calculator UK 2026/27: NI Savings",
  metaDescription:
    "Salary sacrifice calculator for 2026/27. Work out the reduced gross and the employee and employer National Insurance savings from any sacrifice",
  h1: "Salary Sacrifice Calculator",
  intro:
    "Work out how a salary sacrifice arrangement changes gross pay and National Insurance for both employee and employer in 2026/27. This UK salary sacrifice calculator is built for employers modelling the NI saving on a new scheme, employees checking the impact on their take-home, and payroll teams confirming the figures. In 2026/27 the employee saves NI at 8% on the sacrificed amount in the main band (2% above £50,270) and the employer saves 15%, because the sacrificed pay is no longer subject to NI.",
  formulaExplainer:
    ":::callout info\n**Salary sacrifice formula (2026/27):** reduced gross = annual salary − annual sacrifice amount. The selected tax band sets employee NI at **8%** for basic rate or **2%** for higher/additional rate, and employer NI saving is **15%** of the sacrifice. Pension schemes also include income-tax saving at the selected **20%, 40% or 45%** rate; Cycle to Work, electric vehicle and other-benefit schemes show NI saving only.\n\nEmployee saving = employee NI saving + any pension income-tax saving. Net employee cost = effective sacrifice − employee saving. Total both save = employee saving + employer NI saving.\n:::",
  sections: [
    {
      heading: "What is a salary sacrifice arrangement?",
      body:
        "**Salary sacrifice** is a contractual variation of the employment terms: the employee gives up part of their gross salary and the employer provides a non-cash benefit of equivalent value. Because the contractual gross is lower, both sides pay less **National Insurance** on the rest of the package.\n\nThe most common arrangements are:\n\n- **Pension contributions.** The sacrificed amount is paid into the workplace pension by the employer. This is the highest-value use of sacrifice for most employees, because the sacrifice also escapes income tax.\n- **Cycle-to-work.** The employer buys the bike and accessories and the employee sacrifices an equal amount from gross over a hire period, typically 12 or 18 months.\n- **Electric car schemes.** The employer leases an electric vehicle and the employee sacrifices an amount that covers the lease, fuel and maintenance. Electric cars sit in the lowest BIK bands, which makes the combined NI saving substantial.",
    },
    {
      heading: "How salary sacrifice affects National Insurance",
      body:
        "National Insurance applies to gross pay, not take-home. When the contractual gross falls, NI on both sides falls by the same proportion. For 2026/27 the rates are:\n\n- **Employee NI:** 8% on earnings between £12,570 and £50,270 a year, 2% above.\n- **Employer NI:** 15% on earnings above £5,000 a year, with no upper cap.\n\nSo a £3,000 sacrifice from a £40,000 salary saves the employee 8% × £3,000 = £240 in NI, and saves the employer 15% × £3,000 = £450. Above the £50,270 threshold the employee saving falls to 2% × £3,000 = £60, while the employer saving stays at £450 — which is why sacrifice is most valuable for higher earners via the pension route, where income tax relief also applies.\n\n:::callout tip\n**Employer NI saving is the bigger number.** At 15% on every pound above £5,000, the employer saving on a typical sacrifice is nearly twice the employee saving in the main NI band. Many employers reinvest some of this into the employee's pension pot.\n:::",
    },
    {
      heading: "Common salary sacrifice arrangements",
      body:
        "The same NI saving applies to every approved arrangement, but the income tax treatment differs. The table below compares the four most common UK schemes.\n\n:::table\n| Benefit | Income tax saving | Employee NI saving | Employer NI saving |\n|---|---|---|---|\n| Pension sacrifice | Yes (full relief on sacrificed amount) | Yes (8% / 2%) | Yes (15% above £5,000) |\n| Cycle-to-work | Yes (no income tax on the benefit) | Yes (8% / 2%) | Yes (15% above £5,000) |\n| Electric car scheme | Usually modest (low BIK on EVs) | Yes (8% / 2%) | Yes (15% above £5,000) |\n| Childcare vouchers (legacy) | Yes on the voucher amount | Yes (8% / 2%) | Yes (15% above £5,000) |\n:::\n\nThe pension route is the only one where income tax relief is delivered by the sacrifice itself. For cycle-to-work and EVs, the tax advantage comes from the benefit being non-cash, not from the salary reduction. The take-home pay calculator shows the income tax and employee NI on the reduced gross for any sacrifice.",
    },
    {
      heading: "Rules and risks to check",
      body:
        "Salary sacrifice is tightly drawn by HMRC and ACAS. The five most common things to get wrong:\n\n- **National Living Wage.** Post-sacrifice cash pay must stay at or above **£12.71 per hour** for workers aged 21 and over from April 2026. The employer must check this for every employee in the scheme, every pay period.\n- **Statutory payments.** Statutory Maternity Pay, Statutory Sick Pay, paternity pay and redundancy pay are calculated on post-sacrifice earnings, so a sacrifice can lower them. Some employers make up the difference in policy.\n- **Pension tax relief.** Salary sacrifice for pension works because the employer pension contribution is not taxable. If the pension scheme is salary sacrifice plus a separate employer contribution, both are tax-efficient.\n- **Opt-out rules.** Employees can opt out of salary sacrifice at any time, but the new arrangement is a fresh contractual change, not a refund.\n- **Documentation.** The change must be in writing before it takes effect — usually a salary sacrifice agreement or an amendment to the employment contract. HMRC can disallow the NI saving if there is no paper trail.",
    },
    {
      heading: "Summary: how to use this calculator",
      body:
        "Enter the annual salary and annual sacrifice amount in pounds, then choose the scheme type and employee tax band. The calculator returns the reduced gross salary, employee NI saving, employer NI saving, pension income-tax saving where applicable, employee total saving, net employee cost and combined saving. Use the reduced gross as the new baseline for pension contributions, statutory pay and benefits in kind.\n\nFor pension-specific modelling with an employer NI top-up, use the salary sacrifice pension calculator.",
    },
    {
      "heading": "Salary sacrifice schemes this calculator can support",
      "body": "Salary sacrifice is most often used for pension contributions, cycle-to-work, electric vehicles and some benefit schemes. The tax result depends on the scheme. Pension sacrifice normally reduces taxable pay and NI-able pay. Electric vehicle schemes can create a benefit-in-kind charge. Cycle-to-work has its own conditions. Always identify the scheme type before assuming the full sacrifice becomes a saving."
    },
    {
      "heading": "Threshold crossings and statutory-pay warnings",
      "body": "A sacrifice that looks attractive can cause problems if it takes pay below National Minimum Wage, affects maternity pay average weekly earnings, reduces mortgage affordability, changes life-cover multiples or pushes taxable pay around a student-loan or pension threshold. Employers should model the before-and-after payslip and keep written employee consent before changing contractual salary."
    },
    {
      "heading": "Passing employer NI saving into pension",
      "body": "Some employers keep their employer NI saving; others pass all or part of it into the employee pension. Passing the saving into pension can turn every £1 sacrificed into more than £1 of pension contribution, because the employer adds the NI saving on top. This is one of the strongest reasons to compare pension salary sacrifice with ordinary personal pension contributions."
    },
  ],
  faq: [
    {
      question: "What is a salary sacrifice arrangement?",
      answer:
        "An employee contractually gives up part of their cash salary in exchange for a non-cash benefit — usually pension contributions, a cycle-to-work bike or an electric car. Because the contractual gross pay is lower, both sides pay less National Insurance. GOV.UK sets out the rules for valid arrangements.",
    },
    {
      question: "Can salary sacrifice take pay below minimum wage?",
      answer:
        "No. Post-sacrifice cash pay must stay at or above the National Living Wage — £12.71 per hour for workers aged 21 and over from April 2026. Employers must check this for every employee in the scheme, and HMRC treats breaches as minimum wage underpayment.",
    },
    {
      question: "Does salary sacrifice reduce statutory payments?",
      answer:
        "Yes. Statutory Maternity Pay, Statutory Sick Pay, paternity pay and redundancy pay are calculated on post-sacrifice average earnings, so a sacrifice can lower them. Some employers make up the difference in policy; employees should check before joining a scheme.",
    },
    {
      question: "How much does the employer save with salary sacrifice?",
      answer:
        "In 2026/27 the employer saves 15% employer National Insurance on the amount sacrificed, because employer NI applies at 15% to earnings above £5,000. Many employers reinvest part of this saving into the employee's pension or use it to fund the scheme's administration.",
    },
    {
      question: "Does salary sacrifice affect income tax?",
      answer:
        "For pension salary sacrifice, the sacrificed amount is also free of income tax, which is where most of the employee saving comes from. For cycle-to-work and electric car schemes, the income tax treatment depends on the benefit. This calculator shows the NI savings specifically, because income tax relief depends on the individual's tax band and the type of benefit.",
    },
    {
      "question": "Can salary sacrifice reduce pay below minimum wage?",
      "answer": "No. A salary sacrifice arrangement must not reduce cash pay below the National Minimum Wage or National Living Wage for the pay period."
    },
    {
      "question": "Does salary sacrifice affect SMP or SSP?",
      "answer": "It can. Statutory payments often use actual pay in a reference period, so a reduced contractual salary may reduce average weekly earnings."
    },
    {
      "question": "Who gets the employer NI saving?",
      "answer": "The employer decides the policy. Some keep the saving, some share it, and some add all of it to the pension contribution."
    },
  ],
  relatedSlugs: [],
  defaults: {
    annualSalary: 40000,
    annualSacrificeAmount: 5000,
  },
});
