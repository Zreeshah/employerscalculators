import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "employee-cost-calculator",
  kind: "employee-cost",
  title: "True Cost of Employee Calculator UK 2026/27",
  metaDescription:
    "How much does it cost to employ someone? Calculate the true UK employee cost: salary, employer NI, pension and optional on-costs for 2026/27.",
  h1: "Cost of Employing Someone Calculator",
  intro:
    "See the real annual cost of employing someone in the UK, not just their salary. Designed for small-business owners budgeting a new hire and accountants advising on headcount. For 2026/27 the calculator combines **gross salary, employer National Insurance at 15% on earnings above £5,000, workplace pension contributions, Employment Allowance where selected, and any extra annual employer costs**.",
  formulaExplainer:
    ":::callout info\nFor a gross salary **S**:\n\n- **Gross salary: S**\n- **Employer NI: (S − £5,000) × 15%** for a standard employee before Employment Allowance\n- **Employer pension: qualifying earnings × selected employer rate** by default, or total earnings if selected\n- **Total employment cost: salary + payable employer NI + pension + additional annual costs**\n\nThe default pension basis is **qualifying earnings**, matching common auto-enrolment setups. You can switch to total earnings, change the employer pension rate, include or exclude workplace pension, add extra annual costs, and apply Employment Allowance where the employer is eligible.\n:::",
  howToSteps: [
    {
      name: "Enter the annual gross salary",
      text: "Use the agreed cash pay for the year, before any salary sacrifice. The calculator applies the selected NI category and pension basis to this figure.",
    },
    {
      name: "Read the cost components and the total",
      text: "The result panel shows the gross salary, employer NI, pension contribution, additional annual costs and the total employment cost. Use the total for budgeting and the components for a clean P&L split between payroll, NI, benefits and overheads.",
    },
    {
      name: "Adjust for the Employment Allowance if eligible",
      text: "If the business is eligible for the £10,500 Employment Allowance, turn on the allowance to offset the employer NI line. It offsets NI, not salary, pension or extra overheads.",
    },
    {
      name: "Compare with the on-cost percentage for budgeting",
      text: "For a quick check, compare the percentage above salary shown in the result panel. It changes with age category, Employment Allowance, pension basis, pension rate and any additional costs you enter.",
    },
  ],
  sections: [
    {
      heading: "What is the total cost of employing someone?",
      body: "The **total employment cost** is the gross salary plus the employer's statutory on-costs: Class 1 employer National Insurance and the minimum auto-enrolment pension contribution. For 2026/27 these are the two main fixed additions that HMRC and The Pensions Regulator require on top of cash pay, and they are the figures most small businesses miss when budgeting a new hire. The total does not include discretionary benefits, training, equipment or office space — it is the legal minimum on-cost.",
    },
    {
      heading: "How the three components add up",
      body: "Gross salary is the contractual cash pay. **Employer NI** is 15% on the salary above the £5,000 secondary threshold for a standard employee, so a £30,000 salary generates £3,750 of NI ((£30,000 − £5,000) × 15%). **Employer pension** defaults to 3% of qualifying earnings, which is £712.80 on a £30,000 salary using the qualifying earnings band. Add the default pension to salary and NI and a £30,000 employee costs around £34,462.80 before additional annual costs or Employment Allowance. The figures below compare default total cost at common salary points in 2026/27.\n\n:::table\n| Gross salary | Employer NI (15% above £5k) | Employer pension (3% qualifying earnings) | Default employment cost | On-cost % |\n|---|---|---|---|---|\n| £20,000 | £2,250 | £412.80 | £22,662.80 | 13.3% |\n| £30,000 | £3,750 | £712.80 | £34,462.80 | 14.9% |\n| £40,000 | £5,250 | £1,012.80 | £46,262.80 | 15.7% |\n| £60,000 | £8,250 | £1,320.90 | £69,570.90 | 15.9% |\n| £80,000 | £11,250 | £1,320.90 | £92,570.90 | 15.7% |\n:::",
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
    {
      "heading": "Headcount planning: one employee versus a team",
      "body": "The cost of one employee is useful, but hiring decisions often involve headcount. Multiply salary, employer NI, pension and additional annual costs by the number of roles, then adjust for any shared costs. Payroll software, HR admin and insurance may not rise linearly for every hire, while equipment and recruitment usually do. For a team budget, separate per-person costs from shared overheads so the final number is not overstated or understated."
    },
    {
      "heading": "Role and location overhead templates",
      "body": "A remote admin role may need laptop, software, payroll and light training. A field engineer may need van, fuel card, tools, insurance, PPE and certification. An office role may carry desk cost, occupancy cost and local travel. Use the additional annual costs input to model the role-specific layer. The calculator starts with statutory on-costs, then lets you add realistic overheads rather than relying on a single rule of thumb."
    },
    {
      "heading": "Hire versus contractor comparison",
      "body": "When comparing employee cost with a contractor day rate, include more than salary. Employees bring employer NI, pension, holiday, management and equipment costs, but contractors may carry a higher day rate and IR35 risk. A simple comparison is annual contractor cost versus total employment cost plus recruitment and ramp-up. The IR35 calculator is the next step where the contractor works through a company."
    },
  ],
  faq: [
    {
      question: "How much does a £30,000 employee really cost an employer in 2026/27?",
      answer:
        "Using the default qualifying-earnings pension basis: **£30,000 salary + £3,750 employer NI** (15% of £25,000 above the £5,000 secondary threshold) **+ £712.80 employer pension** (3% of qualifying earnings) **= £34,462.80 a year**, before additional annual costs or Employment Allowance."
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
    {
      "question": "What percentage should I add to salary for total employment cost?",
      "answer": "For statutory on-costs only, many salaries add roughly 15% to 20% once employer NI and pension are included. Real all-in cost can be higher after equipment, recruitment, training, software and workspace."
    },
    {
      "question": "Should recruitment cost be included in annual employee cost?",
      "answer": "For first-year budgets, yes. You can amortise recruitment over the expected tenure or include it as a year-one additional cost."
    },
    {
      "question": "Does Employment Allowance apply per employee?",
      "answer": "No. It applies to the employer’s total annual Class 1 secondary NI bill, so a small payroll may use it up slowly while a larger payroll may use it quickly."
    },
  ],
  relatedSlugs: [],
  defaults: {
    annualSalary: 30000,
  },
});
