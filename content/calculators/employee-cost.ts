import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "employee-cost-calculator",
  kind: "employee-cost",
  title: "Cost of Employing Someone Calculator UK 2026/27",
  metaDescription:
    "Work out the true annual cost of an employee in 2026/27: gross salary plus 15% employer NI above £5,000 plus the 3% minimum auto-enrolment pension.",
  h1: "Employee Cost Calculator",
  intro:
    "See the real annual cost of employing someone in the UK, not just their salary. Designed for small-business owners budgeting a new hire and accountants advising on headcount. For 2026/27 the total is **gross salary plus employer National Insurance at 15% on earnings above £5,000, plus the 3% minimum auto-enrolment pension** (HMRC).",
  formulaExplainer:
    ":::callout info\nFor a gross salary **S**:\n\n- **Gross salary: S**\n- **Employer NI: (S − £5,000) × 15%** — nothing due at or below the £5,000 secondary threshold, and no upper cap\n- **Employer pension: S × 3%** — the auto-enrolment minimum on a full-salary basis\n- **Total employment cost: S + (S − £5,000) × 0.15 + S × 0.03**\n\nThe calculator applies the 3% employer pension to the full gross salary; schemes using the **qualifying earnings band** will produce a slightly lower pension figure, and the workplace pension calculator handles those percentages directly. The £10,500 Employment Allowance is not deducted here because it is claimed per eligible business against its total annual NI bill, not per employee.\n:::",
  howToSteps: [
    {
      name: "Enter the annual gross salary",
      text: "Use the agreed cash pay for the year, before any salary sacrifice. The calculator applies the £5,000 secondary threshold and 15% employer NI to this figure, then adds the 3% auto-enrolment minimum on top.",
    },
    {
      name: "Read the three components and the total",
      text: "The result panel shows the gross salary, the employer NI, the 3% minimum pension contribution and the total employment cost. Use the total for budgeting and the components for a clean P&L split between payroll, NI and benefits.",
    },
    {
      name: "Adjust for the Employment Allowance if eligible",
      text: "If the business is eligible for the £10,500 Employment Allowance, subtract the annual employer NI from the total — not the whole cost, because the allowance only offsets the NI line. For a payroll that produces less than £10,500 of NI a year, the allowance can wipe out the NI line entirely.",
    },
    {
      name: "Compare with the on-cost percentage for budgeting",
      text: "For a quick check, the total cost is roughly **18% to 19% above gross salary** for most salaries in 2026/27 (about 15% NI above the £5,000 threshold plus 3% pension). Higher salaries narrow the gap because the £5,000 threshold matters less, and lower salaries widen it.",
    },
  ],
  sections: [
    {
      heading: "What is the total cost of employing someone?",
      body: "The **total employment cost** is the gross salary plus the employer's statutory on-costs: Class 1 employer National Insurance and the minimum auto-enrolment pension contribution. For 2026/27 these are the two main fixed additions that HMRC and The Pensions Regulator require on top of cash pay, and they are the figures most small businesses miss when budgeting a new hire. The total does not include discretionary benefits, training, equipment or office space — it is the legal minimum on-cost.",
    },
    {
      heading: "How the three components add up",
      body: "Gross salary is the contractual cash pay. **Employer NI** is 15% on the salary above the £5,000 secondary threshold, so a £30,000 salary generates £3,750 of NI ((£30,000 − £5,000) × 15%). **Employer pension** is the 3% auto-enrolment minimum, which is £900 on a £30,000 salary. Add the three together and a £30,000 employee costs around £34,650 before any Employment Allowance offset. The figures below compare total cost at common salary points in 2026/27.\n\n:::table\n| Gross salary | Employer NI (15% above £5k) | Employer pension (3%) | Total employment cost | On-cost % |\n|---|---|---|---|---|\n| £20,000 | £2,250 | £600 | £22,850 | 14.3% |\n| £30,000 | £3,750 | £900 | £34,650 | 15.5% |\n| £40,000 | £5,250 | £1,200 | £46,450 | 16.1% |\n| £60,000 | £8,250 | £1,800 | £70,050 | 16.8% |\n| £80,000 | £11,250 | £2,400 | £93,650 | 17.1% |\n:::",
    },
    {
      heading: "The Employment Allowance offset",
      body: "The **Employment Allowance** lets eligible employers knock up to **£10,500 a year** off their total employer NI bill. It applies to the business as a whole, not per employee, so it is claimed through payroll rather than calculated per salary. For a single £20,000 employee the £2,250 of NI is more than offset by the allowance, and the net NI cost is zero. For a payroll of multiple higher salaries the allowance can still be worth a chunk against the bill.",
    },
    {
      heading: "Pension and NI thresholds in 2026/27",
      body: "Three thresholds matter for the total cost in 2026/27. The **£5,000 secondary threshold** is the floor under which no employer NI is due. The **£10,000 auto-enrolment trigger** is the salary at which an eligible worker must be enrolled into a workplace pension. The **£10,500 Employment Allowance** is the maximum offset against the annual employer NI bill. None of these apply automatically in the calculator output — they are decisions and checks the employer makes on top.",
    },
    {
      heading: "Budgeting beyond the statutory minimums",
      body: "This figure covers salary, employer NI and the minimum pension. It excludes holiday pay (already inside salary), recruitment, equipment, training, payroll software, workplace insurance and any enhanced pension or benefits above the statutory minimums. As a rule of thumb, **all-in cost is roughly 1.3 to 1.4 times the gross salary** for most UK employees, once you add overheads, benefits and the cost of any office space. Plan for the legal minimum first, then add the discretionary layer.",
    },
    {
      heading: "Summary: how to use this employee cost calculator",
      body: "Enter the gross salary to read off the three components and the total employment cost. Adjust for the Employment Allowance if the business is eligible, then add the discretionary on-costs for a full all-in figure. The employer NI calculator and the workplace pension calculator are useful companions for a deeper look at each line.",
    },
  ],
  faq: [
    {
      question: "How much does a £30,000 employee really cost an employer in 2026/27?",
      answer:
        "Using this calculator's formula: **£30,000 salary + £3,750 employer NI** (15% of £25,000 above the £5,000 secondary threshold) **+ £900 minimum pension** (3%) **= £34,650 a year**, before the Employment Allowance or any other costs of employment.",
    },
    {
      question: "What is the employer National Insurance rate for 2026/27?",
      answer:
        "Employers pay **Class 1 National Insurance at 15%** on each employee's earnings above the £5,000 a year secondary threshold. Rates are published in HMRC's rates and thresholds for employers 2026 to 2027 on GOV.UK.",
    },
    {
      question: "Does the Employment Allowance reduce this cost?",
      answer:
        "Yes, for eligible employers. The Employment Allowance lets qualifying businesses reduce their annual employer NI bill by up to **£10,500**, which can wipe out employer NI entirely for very small payrolls. This calculator shows the gross cost before the allowance.",
    },
    {
      question: "Is the 3% pension contribution compulsory for every employee?",
      answer:
        "The 3% employer minimum applies to workers who are **eligible for auto-enrolment** — broadly those aged 22 to State Pension age earning over £10,000 a year. Employees can opt out, in which case employer contributions stop, but eligible staff must be enrolled first.",
    },
    {
      question: "What other costs should I budget for beyond this total?",
      answer:
        "This figure covers salary, employer NI and the minimum pension. It excludes holiday pay (already within salary), recruitment, equipment, training, payroll software, workplace insurance and any enhanced pension or benefits above the statutory minimums. All-in cost is typically 1.3 to 1.4 times gross salary for a UK employee.",
    },
  ],
  relatedSlugs: [],
  defaults: {
    annualSalary: 30000,
  },
});
