import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "employer-ni-calculator",
  kind: "employer-ni",
  title: "Employer National Insurance Calculator UK 2026/27",
  metaDescription:
    "Employer National Insurance calculator for 2026/27: 15% on earnings above £5,000 a year, with annual, monthly and total employment cost",
  h1: "Employer National Insurance Calculator",
  intro:
    "This employer National Insurance calculator shows the Class 1 secondary contributions a UK employer pays on top of an employee's gross salary in 2026/27. It is built for small-business owners budgeting for a new hire, payroll staff checking monthly liabilities, and accountants confirming RTI submissions. For 2026/27, employer NI is charged at **15% on all earnings above the £5,000-a-year secondary threshold**, with no upper cap, in line with the GOV.UK rates and thresholds for employers.",
  formulaExplainer:
    "Employer NI runs on the gross pay that already feeds the rest of the payroll: income tax, employee NI, pension contributions and student loans all use the same figure. The calculation is straightforward because there is no upper limit and no tapering once the threshold is crossed.\n\n:::callout info\nEmployer NI = **(annual gross salary − £5,000) × 15%**, with nothing due at or below the £5,000 secondary threshold and no upper cap\n:::\n\nThe £5,000 secondary threshold is an annual figure applied to each employee individually. Once an employee's pay reaches £5,000 in the tax year, every pound above that line attracts NI. The **£10,500 Employment Allowance** is not modelled here because it is claimed against the business's total annual NI bill, not per employee; for a like-for-like per-head figure, ignore it.",
  howToSteps: [
    {
      name: "Enter the annual gross salary",
      text: "Type the employee's gross pay before tax for the full tax year, including any regular bonuses, commission or allowances that count as earnings for Class 1 NI purposes.",
    },
    {
      name: "Read the annual employer NI",
      text: "The calculator shows the employer's NI for the year, applying 15% to the portion of salary above £5,000. Anything at or below £5,000 is exempt from employer NI.",
    },
    {
      name: "Read the monthly equivalent",
      text: "Use the monthly figure when you are budgeting for a payroll run or modelling cash flow. The figure is the annual NI divided by 12 and does not vary by pay frequency.",
    },
    {
      name: "Read the total employment cost",
      text: "The total combines gross salary with employer NI to give the full cost of employing the person for the year. Add pension contributions separately if you want a fully loaded figure.",
    },
  ],
  sections: [
    {
      heading: "What is employer National Insurance?",
      body: "**Employer National Insurance** is the Class 1 secondary contribution an employer pays on top of an employee's earnings, in addition to the employee's own Class 1 NI. It is paid to HMRC through PAYE and reported in real time on the Full Payment Submission (FPS).\n\nUnlike employee NI, employer NI has no upper earnings limit, no taper and no higher rate for very high earners. The rate is a flat 15% on earnings above the secondary threshold, which has been frozen at £5,000 a year since 2020. Employer NI is a real cost of employment — it does not reduce the employee's take-home pay — and it is one of the reasons a £40,000 salary costs the business more than £40,000 a year.",
    },
    {
      heading: "How employer NI is calculated",
      body: "Employer NI uses the **annual gross salary** as its starting point, not the per-pay-period figure. This makes it easy to budget for a new hire, because the annual cost is the same whether the employee is paid weekly, monthly or on an irregular pattern.\n\nThe £5,000 secondary threshold is applied per employee, not per business. A company with two employees on £30,000 each pays NI on £25,000 of each salary, not on the combined £60,000 minus one threshold. Once an employee's pay crosses £5,000 in the tax year, the whole pound above the line attracts NI — there is no tiered rate.",
    },
    {
      heading: "Employer NI on common salaries",
      body: "The table below shows the employer NI bill on five representative salaries for 2026/27, alongside the total cost to the business. Pension contributions are excluded.\n\n:::table\n| Annual salary | Earnings above £5,000 | Employer NI (15%) | Total cost to employer |\n|---|---|---|---|\n| £15,000 | £10,000 | £1,500 | £16,500 |\n| £30,000 | £25,000 | £3,750 | £33,750 |\n| £50,000 | £45,000 | £6,750 | £56,750 |\n| £75,000 | £70,000 | £10,500 | £85,500 |\n| £100,000 | £95,000 | £14,250 | £114,250 |\n:::\n\nUse the **employee cost calculator** to layer pension contributions on top and see the fully loaded employment cost.",
    },
    {
      heading: "The Employment Allowance",
      body: "The **Employment Allowance** lets eligible employers knock up to £10,500 a year off their total employer NI bill through payroll. It is claimed on the EPS (Employer Payment Summary) by reducing the NI payment due to HMRC, rather than deducted from any single employee's NI.\n\nFor 2026/27, eligibility is restricted to employers whose only Class 1 NI liability is on the wages of employees (excluding directors) and whose total Class 1 NI for the previous tax year was below £100,000. Most small businesses and charities qualify, but larger employers and public bodies do not. The calculator above does not model the Employment Allowance, because the saving depends on the whole payroll — see the Employment Allowance guide for a worked example.",
    },
    {
      heading: "Directors and the annual earnings period",
      body: "Directors' NI is worked out slightly differently from regular employees. Rather than running the calculation on each pay period, director NI is calculated cumulatively against the annual earnings period, applying the secondary threshold once across the whole year.\n\nThe calculator above uses the annual basis, so its figures match the **director method**. The same applies to a director who is paid weekly or monthly: you still apply 15% above £5,000 against the year-to-date pay. The result is that a director paid in uneven lump sums does not pay NI twice on the same income, as can happen with the per-period calculation.",
    },
    {
      heading: "Employer NI on benefits in kind",
      body: "Benefits in kind (such as a company car, private medical insurance or gym membership) are not run through the regular payroll. Instead, they attract **Class 1A NI** at 15% on the taxable value of the benefit, reported on form P11D after the end of the tax year.\n\nThe Class 1A rate matches the Class 1 employer rate (both 15% in 2026/27), so the cost is the same in percentage terms. The difference is procedural: Class 1A is paid once a year, calculated on the P11D value rather than on cash earnings. Salary sacrificed into an approved pension scheme avoids both employee and employer NI on the sacrificed amount.",
    },
    {
      heading: "Common employer NI mistakes to avoid",
      body: "Three errors show up most often in payroll submissions:\n\n- Forgetting that employer NI is a real cost, not a payroll pass-through. Budget for it as part of the total employment cost.\n- Claiming the Employment Allowance when the business is not eligible (most public bodies and any employer whose Class 1 NI exceeded £100,000 the previous year are out).\n- Treating benefits in kind as Class 1 NI rather than Class 1A. Class 1 runs through payroll; Class 1A is reported annually on the P11D.",
    },
    {
      heading: "Summary: how to use this employer NI calculator",
      body: "Enter the **annual gross salary** and the calculator shows the employer's NI for the year, the monthly equivalent and the total cost of employing that person.\n\nThe figures use the 2026/27 HMRC rate (15% above £5,000) and ignore the £10,500 Employment Allowance, which is claimed against the business's total NI bill. For a complete picture of employment cost, combine the result with pension contributions via the employee cost calculator.",
    },
  ],
  faq: [
    {
      question: "How much is employer National Insurance in 2026/27?",
      answer:
        "15% of each employee's earnings above £5,000 a year, with no upper limit (HMRC). On a £30,000 salary the employer pays £3,750 a year on top of the gross pay.",
    },
    {
      question: "What is the Employment Allowance and how does it reduce this cost?",
      answer:
        "The Employment Allowance lets eligible employers knock up to £10,500 a year off their total employer NI bill. It applies to the business rather than per employee, and is claimed through payroll on the EPS.",
    },
    {
      question: "Does employer NI stop above the Upper Earnings Limit?",
      answer:
        "No. Unlike employee NI, which drops to 2% above £50,270, employer NI stays at 15% on all earnings above £5,000 however high the salary goes.",
    },
    {
      question: "Is employer NI due on benefits in kind?",
      answer:
        "Benefits in kind attract Class 1A NI at 15% instead of Class 1 NI, reported on form P11D after the tax year. Salary sacrificed into an approved pension scheme avoids both.",
    },
    {
      question: "Do directors pay employer NI differently?",
      answer:
        "Directors use an annual earnings period rather than a per-pay-period basis, so NI is worked out cumulatively across the year. This calculator uses the annual method, so the figures align with director calculations.",
    },
    {
      question: "Can I deduct employer NI from the employee's pay?",
      answer:
        "No. Employer NI is an employer's own tax liability, paid on top of gross salary. Employees pay their own Class 1 NI separately through PAYE; the two are calculated and reported independently.",
    },
  ],
  relatedSlugs: [
    "employment-allowance-guide",
    "employer-ni-rates-2026-27",
    "employee-cost-calculator",
  ],
});
