import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "two-jobs-tax-calculator",
  kind: "two-jobs-tax",
  title: "Two Jobs Tax Calculator UK 2026/27",
  metaDescription:
    "Two jobs tax calculator for 2026/27: combine take-home pay, tax codes, NI, pensions, loans, overtime and employer costs for two UK jobs",
  h1: "Two Jobs Tax Calculator",
  intro:
    "Use this **two jobs tax calculator** to estimate your combined 2026/27 take-home pay while keeping each employment's PAYE deductions separate. Enter two salaries and tax codes, then add pension contributions, bonuses, overtime, student loan details and Scottish residency where relevant. The results compare tax taken under your codes with the estimated tax on your combined income, so you can spot a possible underpayment or refund before relying on a payslip or HMRC calculation.",
  formulaExplainer: `For each job, the calculator starts with **gross pay = salary + bonus + overtime**. Overtime is hours × hourly rate × multiplier. It then applies the selected pension method, tax code and National Insurance thresholds to that employment before combining both net figures.

:::callout info
**Combined take-home = both jobs' gross pay − PAYE income tax − employee NI − employee pension contributions − student loan − postgraduate loan.** Employer cost is shown separately as gross pay + employer NI + employer pension.
:::

Tax codes control the estimated PAYE taken from each job: 1257L gives the standard £12,570 allowance, BR taxes all pay at 20%, D0 at 40%, D1 at 45%, 0T gives no allowance but retains the tax bands, and a K code adds HMRC's coded amount to taxable pay. The reconciliation then compares code-based PAYE with the annual liability on combined income. Employee and employer NI remain separate for each employment, as do payroll student-loan thresholds. Pension treatment follows the method selected for each job, so salary sacrifice can change taxable and NI-able pay while a post-tax contribution does not.

With the defaults of **£30,000 on 1257L and £12,000 on BR**, and no pension, loans, bonus or overtime, the estimate is £34,719.60 combined take-home: £5,886 income tax and £1,394.40 employee NI. Employer NI is £4,800 across the two jobs, giving a combined employer cost of £46,800 before employer pension contributions.`,
  howToSteps: [
    {
      name: "Enter both annual salaries",
      text: "Use gross contractual pay before tax and deductions for job 1 and job 2. Add any expected bonus or overtime separately so it is not counted twice.",
    },
    {
      name: "Select each PAYE tax code",
      text: "Choose the code shown on each payslip, such as 1257L for the job using your allowance and BR, D0, D1, 0T or K for the other employment. Turn on Scotland if Scottish Income Tax applies.",
    },
    {
      name: "Add pension and extra pay details",
      text: "For each job, select the pension method and enter the contribution. Add bonus and overtime hours, rate and multiplier only where those amounts sit outside the salary already entered.",
    },
    {
      name: "Choose your loan deductions",
      text: "Select the student loan plan that applies to you and add a postgraduate loan if relevant. The same borrower setting is used for both jobs, but payroll thresholds are tested against each employment separately.",
    },
    {
      name: "Review take-home and reconciliation",
      text: "Compare the combined take-home with each job's tax, NI and net pay. Check the tax-code reconciliation, NI comparison and employer-cost lines for differences that may need a tax-code update or payroll review.",
    },
  ],
  sections: [
    {
      heading: "What is a two jobs tax calculator?",
      body: `A **two jobs tax calculator** estimates what reaches your bank account when you have two PAYE employments at the same time. Unlike adding two single-salary results, it lets each job keep its own tax code, National Insurance calculation, pension method and extra pay. It then combines both results and checks the overall income-tax position.

That distinction matters because Income Tax ultimately depends on income across the tax year, while payroll operates separately for each employer. The tool is useful when taking a second job, changing which role is your main employment, checking a new tax code or comparing the extra net pay from overtime and bonuses. It remains an estimate rather than a replacement for HMRC or payroll software.`,
    },
    {
      heading: "How tax codes work across two jobs",
      body: `HMRC says each employment will usually have a different tax code. **1257L** normally allocates the £12,570 Personal Allowance to one job. BR taxes every pound from a source at 20%, D0 at 40% and D1 at 45%. A 0T code gives no allowance but still applies the tax bands, while a K code adds a coded amount to taxable pay because untaxed income or deductions exceed the allowance.

The calculator shows PAYE under each selected code, then reconciles that total against the estimated annual tax on combined income. A non-zero difference is a warning, not an HMRC bill or refund decision. If the codes look wrong, check both payslips and your HMRC Personal Tax Account rather than simply swapping them in payroll.`,
    },
    {
      heading: "Worked example: £30,000 plus £12,000",
      body: `The default benchmark uses job 1 at **£30,000 with code 1257L** and job 2 at **£12,000 with code BR**. Job 1 has £17,430 of taxable pay, producing £3,486 of Income Tax. BR applies 20% to all £12,000 from job 2, producing £2,400. Total tax is therefore £5,886.

Only job 1 exceeds the £12,570 employee NI threshold, so its annual NI estimate is £1,394.40 and job 2's is £0. With no pension, student loan, bonus or overtime, £42,000 gross minus £5,886 tax and £1,394.40 NI gives **£34,719.60 combined take-home**. The tax-code reconciliation is £0 because the selected codes collect the same tax as the combined annual calculation.`,
    },
    {
      heading: "Why National Insurance is separate for each job",
      body: `Class 1 employee National Insurance is normally calculated for each unconnected employment, not on the two salaries added together. For 2026/27, a standard category A employee pays **8% between £12,570 and £50,270 in each job, then 2% above £50,270**. This can make total NI lower than it would be on one salary of the same combined value because each job has its own primary threshold.

The NI comparison makes that effect visible by showing actual estimated NI across the two jobs beside a single-employment comparison on the combined gross. Connected employers and employments that must be aggregated are an exception. Directors, irregular pay periods and deferred NI arrangements can also produce a different result, so payroll is the final record.`,
    },
    {
      heading: "Pension contributions, bonuses and overtime",
      body: `Set pension details separately because the method changes the deduction. Auto-enrolment may use qualifying earnings, another workplace scheme may use total pensionable pay, salary sacrifice reduces contractual cash pay, and a personal or relief-at-source contribution is taken after PAYE treatment. The output separates employee pension from **employer pension** so take-home and employment cost are not mixed together.

Add a bonus to the job that pays it. For overtime, enter hours, the normal hourly rate and the multiplier, such as 1.5 for time-and-a-half. Both are added to that job's gross pay before deductions. Do not enter them again if they are already included in the annual salary. A one-off payment can create different deductions in its actual pay period from this annualised estimate.`,
    },
    {
      heading: "Student and postgraduate loans with two jobs",
      body: `The loan selection is shared because the borrower has one applicable undergraduate plan, with a postgraduate loan able to run alongside it. HMRC's 2026/27 annual thresholds are **£26,900 for Plan 1, £29,385 for Plan 2, £33,795 for Plan 4 and £25,000 for Plan 5**, with repayments at 9% above the relevant threshold. The postgraduate threshold is £21,000 and its rate is 6%.

For two unconnected employers, HMRC tells each employer to ignore earnings from the other job. The calculator therefore tests the threshold separately for each employment, even though the same plan setting applies to both. If you complete Self Assessment, HMRC may recalculate loans using combined annual income, so the payroll estimate may not be your final liability.`,
    },
    {
      heading: "Scottish Income Tax and high-income edge cases",
      body: `Turn on Scotland if you are a Scottish taxpayer; workplace location alone does not decide this. The calculator uses the 2026/27 Scottish bands: 19% starter, 20% basic, 21% intermediate, 42% higher, 45% advanced and 48% top rate, with the standard £12,570 Personal Allowance where available. Scottish codes normally carry an S prefix, such as S1257L.

Across the UK, the allowance falls by £1 for every £2 of adjusted net income above £100,000 and is normally gone at £125,140. Other edge cases include both jobs sitting below the allowance, a BR code under-collecting when combined income crosses a higher band, and K-code deductions. GOV.UK says tax taken with a K code cannot exceed half of pre-tax pay in a pay period.`,
    },
    {
      heading: "Employer NI, pension and total employment cost",
      body: `The employer view treats the jobs as costs to their respective employers. For a standard employee in 2026/27, each employer pays **15% Class 1 secondary NI above its own £5,000 annual threshold**. Employer pension is then added according to the pension method and contribution entered for that job. Total employment cost is gross pay plus employer NI plus employer pension; it does not reduce employee take-home.

In the default example, employer NI is £3,750 on the £30,000 job and £1,050 on the £12,000 job. With employer pension set to zero, the two employers' combined cost is **£46,800**. Employment Allowance is excluded because it offsets an eligible business's overall employer NI bill, not a particular employee's standalone calculation.`,
    },
    {
      heading: "Summary: check pay from two jobs",
      body: `Enter each salary and its actual tax code first, then add pension, bonus, overtime and loan details only where they apply. Use the combined take-home for budgeting, the per-job tax and net figures for payslip checks, and the **tax-code reconciliation** to identify a possible overpayment or shortfall. The NI comparison explains why two employments can differ from one combined salary.

Treat the result as an annual planning estimate. PAYE is operated by pay period, tax codes can be cumulative or week 1/month 1, and HMRC can change a code during the year. If the reconciliation is material, update your employment details in your HMRC Personal Tax Account or contact HMRC. Employers should use payroll software for the actual deductions and reports.`,
    },
  ],
  faq: [
    {
      question: "How much tax do I pay on a second job in the UK?",
      answer:
        "There is no separate second-job tax rate. HMRC normally allocates your Personal Allowance to one job and taxes the other under a code such as BR, D0 or D1, then your overall liability depends on combined annual income.",
    },
    {
      question: "Should my second job always use a BR tax code?",
      answer:
        "No. BR is common when all second-job pay should be taxed at 20%, but D0, D1, 0T, K or a split allowance may be more appropriate depending on your total income and HMRC adjustments. Use the code HMRC issues and query it if the reconciliation suggests a material difference.",
    },
    {
      question: "Which job should have the 1257L tax code?",
      answer:
        "1257L is usually placed on the main or higher-paying job so the £12,570 Personal Allowance is used efficiently. HMRC can split the allowance between jobs when appropriate, especially if the job carrying 1257L does not use it all.",
    },
    {
      question: "Why is National Insurance not based on my combined salary?",
      answer:
        "Employee NI is normally calculated separately by each unconnected employer, so each job has its own £12,570 primary threshold and £50,270 upper earnings limit for 2026/27. Connected employments that must be aggregated are an exception.",
    },
    {
      question: "Do student loan repayments combine income from two jobs?",
      answer:
        "Not through ordinary PAYE with two unconnected employers: each employer ignores the other job and applies the plan threshold separately. If you complete Self Assessment, HMRC may recalculate repayments on combined annual income.",
    },
    {
      question: "What is the difference between BR, 0T and a K tax code?",
      answer:
        "BR taxes all pay from that job at 20%. 0T gives no Personal Allowance but applies the normal tax bands, while a K code adds a coded amount to taxable pay to collect tax on untaxed income, benefits or earlier underpayments.",
    },
    {
      question: "Does the Scotland toggle change National Insurance?",
      answer:
        "No. It changes Income Tax to the Scottish rates and bands for non-savings, non-dividend income. National Insurance, student-loan rules and standard employer NI remain UK-wide calculations.",
    },
    {
      question: "Can both employers see my other salary?",
      answer:
        "Employers usually receive only the tax code and notices needed to run their own payroll, not a full breakdown of your other salary. HMRC uses information from all employments to set codes and reconcile your tax position.",
    },
  ],
  relatedSlugs: [
    "take-home-pay-calculator",
    "employer-ni-calculator",
    "workplace-pension-calculator",
    "salary-sacrifice-pension-calculator",
  ],
  defaults: {
    job1Salary: 30000,
    job2Salary: 12000,
  },
});
