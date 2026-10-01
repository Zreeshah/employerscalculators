import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "employer-ni-on-salary-2026-27",
  title: "Employer NI on a Salary 2026/27: Cost Examples UK",
  metaDescription:
    "Calculate employer NI on a salary in 2026/27 with £20k, £30k, £40k, £50k and £60k examples, threshold rules and Employment Allowance context",
  h1: "Employer NI on a Salary: 2026/27 Examples",
  intro:
    "Use this guide when you know the offered salary and need a quick employer National Insurance budget. For a standard category A employee, the annual planning estimate is **15% of pay above £5,000**. The examples below show the NI cost separately from salary so a hiring budget does not mistake gross pay for the full payroll cost. For a live estimate, use the [employer NI calculator](/employer-ni-calculator/).",
  sections: [
    {
      heading: "The salary-to-employer-NI formula",
      body:
        "For a standard category A employee, subtract the £5,000 annual secondary threshold from gross annual salary. If the answer is positive, multiply it by 15%. This produces a planning estimate for employer Class 1 secondary NI. The formula is zero at £5,000 or below.\n\n:::callout info\n**Annual planning formula:** employer NI = max(salary − £5,000, 0) × 15%.\n:::\n\nIt is not the employee's NI deduction and it does not include pension contributions, benefits, levy costs or overheads. Payroll normally works NI by pay period, so use the result for budgeting rather than replacing an actual payroll calculation.",
    },
    {
      heading: "Employer NI examples by salary",
      body:
        ":::table\n| Annual salary | Amount above £5,000 | Employer NI at 15% | Salary plus employer NI |\n|---:|---:|---:|---:|\n| £20,000 | £15,000 | £2,250 | £22,250 |\n| £25,000 | £20,000 | £3,000 | £28,000 |\n| £30,000 | £25,000 | £3,750 | £33,750 |\n| £40,000 | £35,000 | £5,250 | £45,250 |\n| £50,000 | £45,000 | £6,750 | £56,750 |\n| £60,000 | £55,000 | £8,250 | £68,250 |\n:::\n\nFor example, a £40,000 offer creates an employer NI planning cost of £5,250, before employer pension. The cost is not capped when salary goes above £50,270: that limit relates to the standard employee rate, not the main employer rate.",
    },
    {
      heading: "How to use the figures in a hiring budget",
      body:
        "Start with salary plus employer NI, then add the employer pension contribution, expected benefit cost and any role-specific overheads. If the role is eligible for auto-enrolment, the statutory minimum employer contribution is usually 3% of qualifying earnings, not necessarily 3% of full salary. The [employee cost calculator](/employee-cost-calculator/) combines the main salary, NI and pension inputs.\n\nUse a scenario rather than a single number when pay may include a regular bonus or commission. Those amounts are generally NI-able, so the employer NI cost rises as they are earned. The underlying HMRC rates are in the [employer NI guide](/guides/employer-ni-rates-2026-27/).",
    },
    {
      heading: "When the normal salary example is wrong",
      body:
        "Do not use the standard table without checking the employee's category. A qualifying under-21 employee, apprentice under 25 or veteran can have a 0% employer rate up to a higher threshold. Qualifying Freeport and Investment Zone categories have their own £25,000 annual upper secondary threshold. Employment Allowance can also reduce the employer's total bill, but it is not an employee-level rate.\n\nThe [category-letter guide](/guides/employer-ni-category-letters-2026-27/) explains the special cases, and the [Employment Allowance guide](/guides/employment-allowance-guide/) explains whether the business may offset the liability.",
    },
    {
      heading: "Annual estimate versus a monthly payroll result",
      body:
        "The examples use the annual £5,000 threshold. Payroll software generally uses £417 per month for a regular monthly employee or £96 per week for weekly payroll, then applies its HMRC calculation and rounding. Therefore, do not expect an annual result divided by 12 to match every payslip to the penny.\n\nThe [monthly employer NI guide](/guides/monthly-employer-ni-2026-27/) shows how to sanity-check a regular monthly amount and why a final payroll result can differ slightly. Use recognised payroll software and current HMRC guidance for RTI reporting.",
    },
    {
      heading: "Key takeaways",
      body:
        "A standard £30,000 salary has a £3,750 annual employer NI planning cost, making salary plus employer NI £33,750 before pension and other costs. Check category letters and Employment Allowance before treating the figure as final. Use the [employer NI calculator](/employer-ni-calculator/) for a salary you choose, then use the full employee-cost calculation before making an offer.",
    },
  ],
  faq: [
    { question: "How much employer NI is due on a £30,000 salary?", answer: "For a standard category A employee, the annual planning estimate is £3,750: (£30,000 − £5,000) × 15%." },
    { question: "How much employer NI is due on a £40,000 salary?", answer: "For a standard category A employee, the annual planning estimate is £5,250: (£40,000 − £5,000) × 15%." },
    { question: "Does employer NI have an upper limit?", answer: "No. The standard 15% employer rate continues above the employee Upper Earnings Limit." },
    { question: "Does Employment Allowance change the salary formula?", answer: "The salary formula gives the liability before allowance. Employment Allowance is a whole-employer offset, subject to eligibility." },
    { question: "Are apprentices charged standard employer NI?", answer: "A qualifying apprentice under 25 can have a 0% employer rate up to the upper secondary threshold. Check the category letter and HMRC conditions." },
  ],
  relatedSlugs: [],
});
