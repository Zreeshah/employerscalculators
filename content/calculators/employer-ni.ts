import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "employer-ni-calculator",
  kind: "employer-ni",
  title: "Employers NI Calculator UK 2026/27: Employer NIC Cost",
  metaDescription:
    "Employers NI calculator for 2026/27. Calculate employer National Insurance, monthly NIC and salary-plus-NI cost at 15% above the £5,000 threshold.",
  h1: "Employers NI Calculator",
  intro:
    "Use this **Employer NI calculator** to estimate the Class 1 secondary National Insurance a UK employer pays on top of an employee's salary in 2026/27. Enter the annual gross salary and the tool shows the annual employer NIC, the monthly equivalent and the total salary plus employer NI cost. The estimate uses the GOV.UK 2026/27 employer NI rate of **15% above the £5,000 secondary threshold** for a standard employee, before any Employment Allowance is applied.",
  formulaExplainer:
    "This calculator uses the standard annual employer National Insurance formula for a category A employee in the 2026/27 tax year. It is designed for budgeting, comparing salaries and checking the broad payroll cost before you run the exact pay-period calculation in payroll software.\n\n:::callout info\nEmployer NI = **max(annual gross salary − £5,000, 0) × 15%**. The £5,000 figure is the annual secondary threshold and the 15% rate applies to earnings above it for standard employees in 2026/27.\n:::\n\nThe result is shown before Employment Allowance because that allowance belongs to the employer's whole annual NI bill, not to one employee. If the employee is under 21, an apprentice under 25, a qualifying veteran, or a Freeport or Investment Zone employee, different upper secondary thresholds can reduce the employer NI due.",
  howToSteps: [
    {
      name: "Enter the gross salary",
      text: "Use the employee's annual gross salary before tax, employee NI, pension contributions or student loan deductions.",
    },
    {
      name: "Apply the secondary threshold",
      text: "The calculator ignores the first £5,000 of annual earnings because no standard employer NI is due below that threshold.",
    },
    {
      name: "Calculate the 15% employer NIC",
      text: "It multiplies the remaining salary by 15% to estimate the employer's Class 1 secondary contribution for the year.",
    },
    {
      name: "Check the monthly cost",
      text: "Use the monthly figure to budget cash flow, but remember payroll software applies thresholds by pay period for most employees.",
    },
    {
      name: "Add salary and NI together",
      text: "The total salary plus NI figure shows the minimum employment cost before pension, benefits, levy costs or overheads.",
    },
  ],
  sections: [
    {
      heading: "What is employer NI?",
      body:
        "**Employer NI** is the employer's Class 1 secondary National Insurance contribution. It is paid by the business to HMRC on top of the employee's gross pay, so it does not reduce the employee's take-home pay. Employees also pay their own Class 1 National Insurance through PAYE, but that is a separate deduction from wages. For hiring budgets, employer NI is one of the first costs to add to salary because a £30,000 salary is not a £30,000 payroll cost once secondary NIC is included.",
    },
    {
      heading: "Employer NI rates and thresholds for 2026/27",
      body:
        "For 2026/27, the standard employer NI rate is **15%** on earnings above the **£5,000 annual secondary threshold**. GOV.UK also lists the threshold as £96 per week or £417 per month, which is how payroll software normally applies it during weekly or monthly payroll runs. There is no upper earnings limit for standard employer NI, so the 15% rate continues above £50,270 and on higher salaries. This calculator annualises the same rule so you can estimate the cost quickly before payroll is processed.",
    },
    {
      heading: "Employer NI examples on common salaries",
      body:
        "The examples below use the standard 2026/27 formula before Employment Allowance. They show why employer NIC matters most once pay moves beyond the £5,000 threshold. On a £20,000 salary, the employer pays NI on £15,000 of earnings. On a £50,000 salary, the liable earnings rise to £45,000. The total cost column includes salary plus employer NI only, so add workplace pension contributions separately when you need a fully loaded employment cost.\n\n:::table\n| Annual salary | Employer NI at 15% above £5,000 | Monthly employer NI | Salary plus employer NI |\n|---|---|---|---|\n| £20,000 | £2,250 | £187.50 | £22,250 |\n| £30,000 | £3,750 | £312.50 | £33,750 |\n| £40,000 | £5,250 | £437.50 | £45,250 |\n| £50,000 | £6,750 | £562.50 | £56,750 |\n| £75,000 | £10,500 | £875.00 | £85,500 |\n| £100,000 | £14,250 | £1,187.50 | £114,250 |\n:::",
    },
    {
      heading: "Employment Allowance and why this result is before allowance",
      body:
        "The **Employment Allowance** can reduce an eligible employer's annual National Insurance bill by up to **£10,500** in 2026/27. It is claimed against the employer's total Class 1 secondary NI liability, not attached to a single salary. That is why this calculator shows the before-allowance cost for one employee. A small employer may have the actual cash payment to HMRC reduced to zero until the allowance is used up, while a larger payroll may use the allowance quickly and then pay employer NI in full for the rest of the tax year.",
    },
    {
      heading: "Under-21 employees, apprentices and special NI categories",
      body:
        "Not every employee uses the standard employer NI rule. GOV.UK gives higher upper secondary thresholds for employees under 21, apprentices under 25 and qualifying veterans, usually **£50,270 per year** for 2026/27. Freeport and Investment Zone employees can also have a £25,000 upper secondary threshold. These categories can make employer NI zero up to the relevant threshold, then 15% above it. Use the correct NI category letter in payroll because this calculator assumes the standard category A treatment unless you adjust the salary comparison manually.",
    },
    {
      heading: "Directors, bonuses, overtime and irregular pay",
      body:
        "For ordinary employees, payroll software calculates employer NI by pay period. Directors are different because National Insurance is normally assessed on an annual earnings period, so the annual threshold is applied cumulatively across the tax year. Bonuses, overtime and commission are normally earnings for Class 1 NI, so they can increase the employer's secondary contribution in the period they are paid. If you are modelling a bonus, add it to annual salary to see the approximate extra employer NI before payroll applies the exact period rules.",
    },
    {
      heading: "Employer NI vs employee NI",
      body:
        "Employer NI and employee NI are easy to confuse because both appear inside payroll, but they answer different questions. **Employee NI** is deducted from gross pay and affects take-home pay. **Employer NI** is paid by the employer in addition to gross pay and affects hiring cost. In 2026/27, employee NI uses the primary threshold and upper earnings limit, while standard employer NI uses the lower £5,000 secondary threshold and has no upper cap. Use the take-home pay calculator for employee-side deductions and this calculator for employer-side cost.",
    },
    {
      heading: "How to reduce employer NI without hiding payroll cost",
      body:
        "The cleanest ways to reduce employer NI are structural and must still follow payroll rules. Claim Employment Allowance if eligible, consider salary sacrifice pension where the employee genuinely exchanges salary for employer pension contributions, and check whether young worker, apprentice, veteran, Freeport or Investment Zone categories apply. Salary sacrifice can reduce NI-able pay for both employer and employee, but it must be documented properly and cannot take pay below the National Minimum Wage. Do not deduct employer NI from wages or disguise normal salary as something else.",
    },
    {
      heading: "Summary: use the Employer NI calculator",
      body:
        "Enter the annual gross salary to estimate the employer's National Insurance for a standard UK employee in 2026/27. The calculator applies **15% above the £5,000 secondary threshold**, then shows the annual amount, monthly equivalent and total salary plus NI cost. Use the result as a quick hiring or budgeting estimate, then check Employment Allowance, pension contributions and any special NI category before treating the figure as the final payroll liability.",
    },
  ],
  inlineWidgets: [
    {
      type: "barChart",
      afterSectionHeading: "Employer NI examples on common salaries",
      title: "Employer NI at common salary levels",
      unit: "2026/27 standard category A employee, before Employment Allowance",
      data: [
        { label: "£20k", value: 2250, caption: "£187.50/month" },
        { label: "£30k", value: 3750, caption: "£312.50/month" },
        { label: "£40k", value: 5250, caption: "£437.50/month" },
        { label: "£50k", value: 6750, caption: "£562.50/month" },
        { label: "£75k", value: 10500, caption: "£875/month" },
        { label: "£100k", value: 14250, caption: "£1,187.50/month" },
      ],
    },
  ],
  faq: [
    {
      question: "What is employers NI?",
      answer:
        "Employers NI, or employer National Insurance, is the Class 1 secondary contribution a business pays to HMRC on top of an employee's gross pay. It is separate from employee NI and does not come out of the employee's wages.",
    },
    {
      question: "How do I calculate employers NI?",
      answer:
        "For a standard employee in 2026/27, subtract the £5,000 annual secondary threshold from gross annual salary, then multiply the remaining amount by 15%. If salary is £5,000 or less, standard employer NI is £0.",
    },
    {
      question: "What is the employer NI rate for 2026/27?",
      answer:
        "The standard employer Class 1 secondary NI rate for 2026/27 is 15% on earnings above the £5,000 annual secondary threshold. Special category letters can change when the 15% rate starts for under-21s, apprentices, veterans, Freeport and Investment Zone employees.",
    },
    {
      question: "How much employer NI is due on a £30,000 salary?",
      answer:
        "On a £30,000 salary, standard employer NI is £3,750 per year: £30,000 minus the £5,000 threshold leaves £25,000, then £25,000 multiplied by 15% equals £3,750. The monthly equivalent is £312.50.",
    },
    {
      question: "Does employer NI apply to bonuses and overtime?",
      answer:
        "Yes. Bonuses, overtime and commission are normally earnings for Class 1 NI, so employer NI can apply when they are paid. For a simple annual estimate, add the expected bonus or overtime to salary and run the total through the calculator.",
    },
    {
      question: "Does Employment Allowance reduce this calculator result?",
      answer:
        "Not directly. The calculator shows employer NI before Employment Allowance because the allowance is claimed against the employer's total annual NI bill. Eligible employers can reduce that total bill by up to £10,500 in 2026/27.",
    },
    {
      question: "Do employers pay NI for under-21s and apprentices?",
      answer:
        "Employers often pay 0% employer NI up to a higher upper secondary threshold for employees under 21 and apprentices under 25, provided the correct NI category letter is used. In 2026/27 that upper secondary threshold is £50,270 per year, with 15% due above it.",
    },
    {
      question: "Can employer NI be deducted from the employee's pay?",
      answer:
        "No. Employer NI is the employer's own liability and is paid on top of gross salary. The employee's own National Insurance is deducted separately through PAYE.",
    },
  ],
  relatedSlugs: [
    "employment-allowance-guide",
    "employer-ni-rates-2026-27",
    "employee-cost-calculator",
    "salary-sacrifice-pension-calculator",
  ],
  defaults: {
    annualSalary: 30000,
  },
});
