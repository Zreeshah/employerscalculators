import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "national-insurance-calculator",
  kind: "national-insurance",
  title: "National Insurance Calculator UK 2026/27",
  metaDescription:
    "National insurance calculation for 2026/27: how much NI per month as an employee, employer or self-employed worker, with band breakdowns and effective rates.",
  h1: "National Insurance Calculator",
  intro:
    "Use this **National Insurance calculator** to work out how much NI is due for 2026/27 as an employee, employer or self-employed worker. Enter an annual salary or profit figure to see the exact NI liability split across each threshold band, plus the effective rate and monthly amount. The calculator uses the official 2026/27 rates confirmed by HMRC, including the employee Primary Threshold at £12,570, the employer Secondary Threshold at £5,000 and the self-employed Class 4 thresholds.",
  formulaExplainer: `:::callout info
**Employee NI** = 8% on earnings between £12,570 and £50,270, plus 2% on earnings above £50,270. **Employer NI** = 15% on earnings above £5,000. **Self-employed Class 4 NI** = 6% on profits between £12,570 and £50,270, plus 2% on profits above £50,270.
:::

Each type of NI uses its own thresholds and rates. Employee and employer NI are separate charges on the same salary: the employee deduction appears on the payslip, while employer NI is an additional cost that does not reduce take-home pay. Self-employed NI is collected through Self Assessment. Use the [employer NI calculator](/employer-ni-calculator/) if you only need the employer-side figure, or the [take-home pay calculator](/take-home-pay-calculator/) to see employee NI alongside income tax and pension.`,
  howToSteps: [
    {
      name: "Choose the NI type",
      text: "Select Employee (Class 1 primary), Employer (Class 1 secondary) or Self-employed (Class 4) depending on which NI charge you need to calculate.",
    },
    {
      name: "Enter the annual salary or profit",
      text: "Type the gross annual figure. For employees, use the annual salary before tax and pension deductions. For the self-employed, use taxable profits after allowable expenses.",
    },
    {
      name: "Read the NI breakdown",
      text: "The calculator splits NI across each band so you can see exactly how much falls in the main rate and the additional rate. It also shows the effective NI rate as a percentage of total earnings.",
    },
    {
      name: "Check the monthly and weekly amounts",
      text: "Divide annual NI by 12 for a monthly payslip estimate, or by 52 for a weekly figure. The employer figure is a cost on top of salary, not a deduction from it.",
    },
  ],
  sections: [
    {
      heading: "National Insurance rates and thresholds for 2026/27",
      body: `HMRC confirmed the following NI rates for the tax year running 6 April 2026 to 5 April 2027. Employee and self-employed rates were reduced in earlier years and remain at their current levels. Employer NI rose to 15% from April 2025 and the Secondary Threshold dropped to £5,000. For the full rate tables, see the [National Insurance rates 2026/27 guide](/guides/national-insurance-rates-2026-27/).

:::table
| NI type | Threshold | Main rate | Additional rate |
|---|---|---|---|
| Employee (Class 1 primary) | £12,570 (Primary Threshold) | 8% up to £50,270 | 2% above £50,270 |
| Employer (Class 1 secondary) | £5,000 (Secondary Threshold) | 15% above £5,000 | 15% (no upper limit) |
| Self-employed (Class 4) | £12,570 (Lower Profits Limit) | 6% up to £50,270 | 2% above £50,270 |
:::

The employee Upper Earnings Limit and Class 4 Upper Profits Limit are both aligned at £50,270. The employer Secondary Threshold has no upper limit, so every pound of salary above £5,000 attracts 15% employer NI unless a reduced-rate category applies.`,
    },
    {
      heading: "Employee vs employer NI: who pays what?",
      body: `Employee NI is deducted from gross pay before it reaches the employee's bank account. It appears on the payslip alongside income tax and pension. Employer NI is a separate cost paid by the business on top of gross salary and is **not deducted from take-home pay**.

For a £35,000 salary, employee NI is £1,794.40 while employer NI is £4,500. The employee's deduction uses the 8% main rate on earnings between £12,570 and £35,000. The employer's charge uses the 15% flat rate on earnings above £5,000. Together, total NI on that salary is £6,294.40. Use the [employee cost calculator](/employee-cost-calculator/) to see the combined cost of salary, employer NI, pension and other employment costs.

:::callout info
Employer NI is invisible on an employee's payslip but represents a significant cost. On a £35,000 salary, employer NI adds £4,500, making the total cost to employ £39,500 before pension contributions.
:::`,
    },
    {
      heading: "Self-employed NI: Class 4 from April 2024",
      body: `Since April 2024, the self-employed pay only **Class 4 NI** on profits. Class 2 NI was abolished as a mandatory charge, although voluntary Class 2 contributions remain available for those wanting to protect their State Pension record at a lower cost.

Class 4 NI works similarly to employee NI but at lower rates: 6% on profits between £12,570 and £50,270, and 2% above £50,270. On £50,000 of taxable profits, Class 4 NI is £2,241.80 for the year. Unlike an employee, a self-employed person pays no NI on the first £12,570 of profits.

Self-employed NI is calculated and collected through the annual Self Assessment tax return, not through monthly payroll. Payments on account may apply if the total tax and NI bill exceeds £1,000.`,
    },
    {
      heading: "NI at common salary levels in 2026/27",
      body: `The table below shows employee and employer NI at several salary benchmarks. Employee NI is the payslip deduction; employer NI is the additional employment cost.

:::table
| Annual salary | Employee NI | Employer NI | Total NI | Employee effective rate |
|---|---|---|---|---|
| £25,000 | £994.40 | £3,000.00 | £3,994.40 | 3.98% |
| £30,000 | £1,394.40 | £3,750.00 | £5,144.40 | 4.65% |
| £35,000 | £1,794.40 | £4,500.00 | £6,294.40 | 5.13% |
| £50,000 | £2,994.40 | £6,750.00 | £9,744.40 | 5.99% |
| £60,000 | £3,194.40 | £8,250.00 | £11,444.40 | 5.32% |
| £100,000 | £3,994.40 | £14,250.00 | £18,244.40 | 3.99% |
:::

Employee NI rises at 8% until the Upper Earnings Limit, then only 2% applies to additional earnings. This is why the effective employee rate peaks near the UEL and falls at higher salaries. Employer NI has no such ceiling and stays at a flat 15%, making it the dominant NI charge on higher salaries. See the [take-home pay calculator](/take-home-pay-calculator/) for income tax and pension alongside these NI figures.`,
    },
    {
      heading: "NI categories: under-21, apprentices, veterans and freeport workers",
      body: `Not every employee pays NI at the standard rate. HMRC's lettered NI categories can reduce or eliminate the employer charge for qualifying workers, while the employee rate remains unchanged.

:::table
| NI category | Who qualifies | Employer NI |
|---|---|---|
| A (standard) | Most employees aged 21+ | 15% above £5,000 |
| H (apprentice under 25) | Apprentice aged under 25 | 15% above £50,270 |
| M (under 21) | Employee aged under 21 | 15% above £50,270 |
| V (veteran) | Armed forces veteran in first 12 months of civilian employment | 15% above £50,270 |
| F/I/S/L (freeport) | Freeport or Investment Zone worker | 15% above £25,000 |
:::

Categories H, M and V effectively give the employer zero NI on earnings up to £50,270. The [employer NI calculator](/employer-ni-calculator/) can model these categories so you can see the saving compared to a standard employee. Using the wrong category letter on payroll is an employer compliance risk, so always check the qualifying conditions with HMRC.`,
    },
    {
      heading: "NI and your State Pension record",
      body: `You typically need **35 qualifying years** of National Insurance contributions or credits to receive the full new State Pension. A qualifying year is one in which you paid or were credited with enough NI contributions.

For employees, a qualifying year normally requires earnings above the Lower Earnings Limit of £6,500 in 2026/27. Self-employed workers build qualifying years through Class 4 NI if profits exceed the Small Profits Threshold, or through voluntary Class 2 contributions. Receiving certain benefits such as Universal Credit, Carer's Allowance or Jobseeker's Allowance can also create NI credits.

After reaching State Pension age, employees no longer pay employee NI but employer NI continues at the normal rate. Self-employed workers over State Pension age stop paying Class 4 NI from the start of the tax year in which they reach pension age.`,
    },
    {
      heading: "NI on multiple jobs and how it differs from income tax",
      body: `Each employment has its own NI calculation. Unlike income tax, NI thresholds are **not shared** across jobs. An employee earning £20,000 in two jobs will pay NI separately on each: the Primary Threshold of £12,570 applies to each employment independently, not once across both.

This means the total NI paid across two jobs can differ from the NI on the same combined salary in one job. HMRC may issue a refund at year-end if the total employee NI across multiple jobs exceeds the annual maximum. Use the [two jobs tax calculator](/two-jobs-tax-calculator/) to model combined take-home pay and spot any NI over-deduction.

Income tax works differently because the Personal Allowance is allocated by HMRC through tax codes. Your main job typically receives the full £12,570 allowance via a 1257L code, while the second job gets a BR code taxing all pay at 20%. NI has no equivalent code system: both jobs simply apply the same threshold independently.`,
    },
    {
      heading: "Directors and other NI edge cases",
      body: `Company directors follow a different NI calculation. Instead of the monthly or weekly earnings-period method used for most employees, directors can use the **annual cumulative method**. This calculates NI on total earnings for the year so far, avoiding the month-by-month Primary Threshold that can produce different results.

Other situations that affect NI include:

- **Over State Pension age**: employees stop paying employee NI but employer NI continues at the standard rate on the same thresholds
- **Salary sacrifice**: exchanging salary for a pension contribution or other benefit reduces the NI-able earnings, saving both employee and employer NI on the sacrificed amount — see the [workplace pension calculator](/workplace-pension-calculator/)
- **Benefits in kind**: most benefits in kind attract Class 1A NI from the employer at 15% but no employee NI deduction, unless payrolled under specific rules
- **Employment Allowance**: eligible employers can offset up to £10,500 against their total employer NI bill each year, which reduces the actual amount paid to HMRC without changing the per-employee calculation`,
    },
    {
      heading: "Summary: calculate your 2026/27 National Insurance",
      body: `Enter your salary or profits, choose the NI type (employee, employer or self-employed), and the calculator applies the official 2026/27 thresholds and rates. The result shows NI for each band, the annual total, monthly amount and effective rate.

For employer NI on its own, the dedicated [employer NI calculator](/employer-ni-calculator/) offers additional features including age categories, Employment Allowance and the total cost to employ. To see employee NI alongside income tax, pension and student loan deductions, use the [take-home pay calculator](/take-home-pay-calculator/). The [National Insurance rates 2026/27 guide](/guides/national-insurance-rates-2026-27/) covers the legislative background, rate history and upcoming changes.`,
    },
  ],
  faq: [
    {
      question: "How much is National Insurance on a £35,000 salary?",
      answer:
        "On a £35,000 salary in 2026/27, employee NI is £1,794.40 per year (£149.53 per month). Employer NI is £4,500 per year. Employee NI uses the 8% main rate on earnings between £12,570 and £35,000.",
    },
    {
      question: "What is the employer NI rate for 2026/27?",
      answer:
        "Employer NI is 15% on all earnings above the £5,000 Secondary Threshold. There is no upper limit, so it applies to every pound of salary above that threshold.",
    },
    {
      question: "Do I pay National Insurance if I am self-employed?",
      answer:
        "Self-employed workers pay Class 4 NI at 6% on profits between £12,570 and £50,270, and 2% above £50,270. Class 2 NI was abolished as a mandatory charge from April 2024 but can still be paid voluntarily.",
    },
    {
      question: "Do I pay NI on two jobs separately?",
      answer:
        "Yes. NI is calculated independently for each employment. The £12,570 Primary Threshold applies separately to each job, which means total NI across two jobs can differ from NI on the same salary in one job. HMRC may refund any overpayment at year-end.",
    },
    {
      question: "Does National Insurance stop at State Pension age?",
      answer:
        "Employee NI stops when you reach State Pension age, but employer NI continues at the normal 15% rate. Self-employed Class 4 NI stops from the start of the tax year in which you reach State Pension age.",
    },
    {
      question: "What is the difference between NI and income tax?",
      answer:
        "NI is calculated per employment with separate thresholds for each job, while income tax uses a single Personal Allowance split across jobs via tax codes. NI has no higher-rate equivalent beyond the 2% additional rate, while income tax has 40% and 45% bands. Employer NI is a business cost, not deducted from pay.",
    },
    {
      question: "How many years of NI do I need for a full State Pension?",
      answer:
        "You normally need 35 qualifying years of NI contributions or credits for the full new State Pension. You can check your NI record and qualifying years through your Personal Tax Account on GOV.UK.",
    },
  ],
  relatedSlugs: [
    "employer-ni-calculator",
    "take-home-pay-calculator",
    "employee-cost-calculator",
    "two-jobs-tax-calculator",
    "workplace-pension-calculator",
  ],
  defaults: { annualSalary: 35000 },
});
