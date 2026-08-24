import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "workplace-pension-calculator",
  kind: "workplace-pension",
  title: "Workplace Pension Calculator UK 2026/27: Auto-Enrolment",
  metaDescription:
    "Workplace pension calculator for 2026/27. Calculate employer, employee and total auto-enrolment pension contributions on qualifying or total earnings.",
  h1: "Workplace Pension & Auto-Enrolment Calculator",
  intro:
    "Calculate annual workplace pension contributions from gross salary and any employee and employer percentages. Built for UK employers running payroll, HR teams checking auto-enrolment compliance, and employees checking their own deductions. For 2026/27 the **auto-enrolment minimums are 3% from the employer and 5% from the employee — 8% in total** — for eligible workers earning over £10,000 a year (GOV.UK).",
  formulaExplainer:
    ":::callout info\nFor a gross salary **S**, employee percentage **e** and employer percentage **p**:\n\n- **Employee contribution: S × e** (with tax relief added on top for relief-at-source schemes)\n- **Employer contribution: S × p**\n- **Total pension contribution: S × (e + p)**\n\nBy default, the calculator applies the percentages to the **qualifying earnings band** (earnings between £6,240 and £50,270 a year for 2026/27). You can switch it to total earnings if that matches your scheme rules. The contribution basis is why payroll can differ from a simple salary-times-percentage calculation.\n:::",
  howToSteps: [
    {
      name: "Enter the gross annual salary",
      text: "Use the employee's annual pensionable pay. The calculator defaults to qualifying earnings for an auto-enrolment minimums check; switch to total earnings only if that is the basis set in your pension scheme.",
    },
    {
      name: "Set the employee and employer percentages",
      text: "Default to 5% employee and 3% employer for the auto-enrolment minimum, or enter your scheme's actual rates if they are higher. Many employers match or exceed the minimum to compete on benefits.",
    },
    {
      name: "Read the annual employee, employer and total contributions",
      text: "The result panel shows each side in pounds per year, plus the total. Multiply the monthly figures by 12 if you need them for a payroll reconciliation, and remember that the employer contribution is not subject to employer National Insurance.",
    },
    {
      name: "Compare against the auto-enrolment minimums",
      text: "For an eligible worker earning over £10,000 a year, the 3%/5% split is the legal floor. If your scheme is below 8% in total, or the employer side is below 3%, the scheme is non-compliant and the employer can face a fine from The Pensions Regulator.",
    },
  ],
  sections: [
    {
      heading: "What is auto-enrolment?",
      body: "**Auto-enrolment** is the legal requirement for UK employers to automatically enrol eligible workers into a qualifying workplace pension scheme and to make a minimum contribution on their behalf. It started in 2012 and applies to every employer with at least one eligible worker. The Pensions Regulator enforces the rules and can issue compliance notices and fines where employers fail to enrol staff or underpay the minimum contribution.",
    },
    {
      heading: "How workplace pension contributions are calculated",
      body: "The minimum contribution for 2026/27 is **8% of qualifying earnings in total**, made up of at least **3% from the employer** and at least **5% from the employee** (including any tax relief). The figures in the table below show the minimums on a £35,000 salary for context, both on qualifying earnings and on full salary.\n\n:::table\n| Basis | Employer (3%) | Employee (5%) | Total (8%) |\n|---|---|---|---|\n| On £35,000 full salary | £1,050.00 | £1,750.00 | £2,800.00 |\n| On £28,760 qualifying earnings | £862.80 | £1,438.00 | £2,300.80 |\n| On £35,000 total earnings at 10% (5% + 5%) | £1,750.00 | £1,750.00 | £3,500.00 |\n:::\n\nMany employers voluntarily pay more than 3% to attract staff — enhanced schemes of 6% or 8% employer contributions are common in professional and finance roles.",
    },
    {
      heading: "Who has to be automatically enrolled?",
      body: "An employer must enrol a worker who is **aged 22 up to State Pension age**, earns more than **£10,000 a year** in a single employment, and normally works in the UK. Workers outside these criteria can usually opt in and may still receive employer contributions. Agency workers, directors and some offshore employees are treated under specific rules — GOV.UK's workplace pensions guidance sets out the edge cases.",
    },
    {
      heading: "Qualifying earnings vs total salary",
      body: "Some schemes calculate contributions on **qualifying earnings** — a band of pay that excludes the first £6,240 a year and any earnings above £50,270 a year for 2026/27 — while others apply the percentages to the full salary. The minimum total of 8% is the same, but the pound figure differs: a worker on £35,000 contributes about the same under either basis, while a worker on £80,000 will pay less on the qualifying-earnings basis because the band is capped.\n\n:::callout tip\nCheck your scheme's basis before reconciling the calculator's output against your payroll run. If your scheme is on qualifying earnings, multiply the percentages by the qualifying band, not the full salary, for an apples-to-apples minimums check.\n:::",
    },
    {
      heading: "Tax relief on pension contributions",
      body: "Employee contributions normally attract tax relief. Under **relief at source** the employee pays net and the scheme reclaims the 20% basic-rate relief from HMRC (higher-rate relief must be claimed via Self Assessment). Under **net pay arrangements** the employer deducts the gross contribution before tax, so the employee gets full relief in-year. Employer contributions are an allowable business expense for corporation tax and are not subject to employer National Insurance, which is one reason enhanced schemes are tax-efficient.",
    },
    {
      heading: "Summary: how to use this workplace pension calculator",
      body: "Enter the gross salary and the employee and employer percentages to read off each side's annual contribution and the total. Compare with the 2026/27 **auto-enrolment minimums of 3% and 5%** to check you are meeting the legal floor, and check your scheme's basis if the figures look off. The employer National Insurance calculator can also help you see how the on-cost of an employee is split between NI and pension.",
    },
    {
      "heading": "Qualifying earnings versus total earnings",
      "body": "Workplace pension contributions may be calculated on qualifying earnings or on total pensionable pay. Qualifying earnings use only pay within the statutory band, while total earnings apply the selected percentage to the whole salary. This distinction is why two employers can both say they pay 3% but produce different annual pension amounts. When comparing providers or payroll output, check the contribution basis before comparing the percentage."
    },
    {
      "heading": "Net pay, relief at source and salary sacrifice",
      "body": "Tax relief can be delivered through net pay, relief at source or salary sacrifice. Net pay reduces taxable pay before tax is calculated. Relief at source deducts contribution after tax and the provider claims basic-rate relief. Salary sacrifice reduces contractual salary in exchange for employer pension contribution, which can save employee and employer NI. The calculator gives contribution amounts; the salary sacrifice pension calculator shows the NI-saving effect."
    },
    {
      "heading": "Auto-enrolment eligibility checks",
      "body": "Before treating a pension contribution as compulsory, check age, earnings, worker status and postponement. Eligible jobholders must be automatically enrolled. Non-eligible jobholders and entitled workers have different rights to opt in or join. Employers should keep records of assessment, postponement notices, opt-outs and re-enrolment dates because pension duties are enforced separately from payroll tax."
    },
  ],
  faq: [
    {
      question: "What are the minimum workplace pension contributions for 2026/27?",
      answer:
        "The employer must contribute at least **3%** and the total minimum is **8%**, with the employee paying the remaining 5% (including tax relief). These auto-enrolment minimums apply to eligible workers — see GOV.UK's workplace pensions guidance for the full rules.",
    },
    {
      question: "Who has to be automatically enrolled into a workplace pension?",
      answer:
        "Employers must enrol workers who are **aged 22 to State Pension age, earn more than £10,000 a year, and normally work in the UK**. Workers outside these criteria can usually opt in and may still qualify for employer contributions.",
    },
    {
      question: "Does this calculator use qualifying earnings?",
      answer:
        "By default it applies your percentages to **qualifying earnings**. You can switch to total earnings if that matches the scheme rules. Check your pension documents before reconciling the result with payroll.",
    },
    {
      question: "Can an employee contribute more than the 5% minimum?",
      answer:
        "Yes. Employees can pay in above the minimum at any time, and some employers offer contribution matching. Pension contributions normally attract tax relief, either through **relief at source** or a **net pay arrangement**, depending on the scheme.",
    },
    {
      question: "Do employer pension contributions cost anything beyond the 3% minimum?",
      answer:
        "The 3% minimum is a legal floor, not a cap — employers can contribute more, and employer contributions are generally an **allowable business expense for corporation tax**. Employer pension contributions are not subject to employer National Insurance.",
    },
    {
      question: "What is the auto-enrolment earnings trigger?",
      answer:
        "The auto-enrolment trigger is **£10,000 a year** in 2026/27. Workers earning above this in a single employment, aged 22 to State Pension age and working in the UK must be auto-enrolled. The trigger is reviewed periodically by the government.",
    },
    {
      "question": "Why is my payroll pension lower than salary times 3%?",
      "answer": "Your scheme may use qualifying earnings rather than total earnings. Contributions are then calculated only on pay inside the qualifying earnings band."
    },
    {
      "question": "Can employer pension contributions be more than 3%?",
      "answer": "Yes. 3% is the minimum employer contribution for qualifying auto-enrolment schemes. Many employers pay 4%, 5% or more for recruitment and retention."
    },
    {
      "question": "Does salary sacrifice change workplace pension contributions?",
      "answer": "It can. The employee gives up salary and the employer pays an increased employer pension contribution. This can reduce NI but must be documented and cannot reduce pay below minimum wage."
    },
  ],
  relatedSlugs: [],
  defaults: {
    annualSalary: 30000,
    employeePercent: 5,
    employerPercent: 3,
  },
});
