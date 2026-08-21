import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "p11d-calculator",
  kind: "p11d",
  title: "P11D Benefit in Kind Calculator UK 2026/27",
  metaDescription:
    "Work out the cost of a benefit in kind for 2026/27: extra income tax for the employee at their marginal rate plus 15% Class 1A NI for the employer.",
  h1: "P11D Benefit in Kind Calculator",
  intro:
    "This P11D calculator shows the tax cost of a benefit in kind — such as private medical insurance, a company car or a gym membership — for both the employee and the employer in 2026/27. It is built for UK employers completing P11D returns, payroll teams checking liabilities, and employees working out what a perk really costs them. Employers pay **Class 1A National Insurance at 15%** on the taxable value of most benefits in kind (HMRC).",
  formulaExplainer:
    ":::callout info\nFor a benefit with cash equivalent **B** and an employee marginal rate **r**, the figures are:\n\n- **Taxable benefit value: B** — the figure you would enter on form P11D\n- **Extra tax for the employee: B × r** — collected through the PAYE tax code, or monthly if the employer payrolling benefits\n- **Employer Class 1A NI: B × 15%** — paid annually on form P11D(b) after the tax year ends\n\nThe calculator applies HMRC's flat 15% Class 1A rate to the employer charge, and the chosen marginal rate (20%, 40% or 45%) to the employee charge. The 15% is a fixed statutory rate for 2026/27 and does not vary with the secondary threshold, so the calculation is the same for every benefit value above zero.\n:::",
  howToSteps: [
    {
      name: "Enter the cash equivalent value of the benefit",
      text: "Use the figure that would go on the P11D: the cash equivalent for a company car, the premium paid for private medical insurance, the interest foregone on a beneficial loan above £10,000, or the annual cost of the perk. If you are payrolling the benefit, the same cash equivalent flows through PAYE instead.",
    },
    {
      name: "Select the employee's marginal income tax rate",
      text: "Pick 20% for basic rate, 40% for higher rate or 45% for additional rate. The marginal rate is the rate that would apply to the benefit if added to the employee's taxable income, not their highest rate on any earnings.",
    },
    {
      name: "Read the employee tax and employer Class 1A NI",
      text: "The result panel shows the taxable value, the extra income tax due from the employee at the chosen rate, and the employer's Class 1A NI at 15%. Add these to your payroll planning and P11D(b) reconciliation.",
    },
    {
      name: "Report through P11D or payrolling",
      text: "If you are not payrolling benefits, record the value on form P11D for the employee and the Class 1A on form P11D(b). If you have registered with HMRC to payroll benefits, the employee charge flows through PAYE monthly and only the Class 1A still needs a P11D(b) at year end.",
    },
  ],
  sections: [
    {
      heading: "What is a P11D and what does it report?",
      body: "A **P11D** is the form a UK employer files with HMRC to report the **cash equivalent value** of benefits in kind and expenses provided to each director or employee above the £2,000 expenses exemption. It covers the tax year just ended, runs from 6 April to 5 April, and must be submitted by 6 July after the tax year ends. Benefits that go on a P11D are taxed on the employee at their marginal rate and trigger a separate Class 1A National Insurance charge for the employer.",
    },
    {
      heading: "How is a benefit in kind taxed on the employee?",
      body: "The employee pays income tax on the cash equivalent at their **marginal rate**. A £1,000 benefit costs a basic-rate taxpayer £200, a higher-rate taxpayer £400 and an additional-rate taxpayer £450. For most benefits the tax is collected by reducing the employee's tax code for the following year, so the cash does not leave the employee's pocket until the code change takes effect. Where the employer has registered to **payroll benefits**, the charge flows through PAYE in real time and no P11D is needed for those items.\n\nThe table below shows the employee tax and employer Class 1A NI for a £1,000 cash equivalent at each rate in 2026/27.\n\n:::table\n| Marginal rate | Employee income tax | Employer Class 1A NI (15%) | Total employer cost |\n|---|---|---|---|\n| Basic rate (20%) | £200 | £150 | £350 |\n| Higher rate (40%) | £400 | £150 | £550 |\n| Additional rate (45%) | £450 | £150 | £600 |\n:::",
    },
    {
      heading: "What is Class 1A National Insurance?",
      body: "**Class 1A NI** is an employer-only charge of **15%** on the taxable value of most benefits in kind in 2026/27. It is reported on form P11D(b) and paid to HMRC by 22 July (or 19 July for non-electronic payments) after the end of the tax year. Unlike Class 1 employer NI, it is not deducted from the employee's pay, has no lower threshold and is not collected through the regular payroll run — it is a one-off annual charge based on the P11D values.",
    },
    {
      heading: "Common benefits that go on a P11D",
      body: "The most common reportable perks in 2026/27 are company cars and fuel, **private medical and dental insurance**, beneficial loans over £10,000, gym memberships, living accommodation and assets given to an employee. Trivial benefits costing £50 or less that are not cash or a reward for work are exempt under the trivial benefits rules. Vouchers and credit tokens that do not qualify as trivial are also reportable, and the rules around them are stricter.\n\n:::callout tip\nIf a benefit is used for business as well as personally, the **cash equivalent is usually apportioned** to the private use only. A company car that is also a pool car for genuine business use is treated differently from one that is privately available 24/7 — keep a clear log of private mileage and personal use days to defend the figure on the P11D.\n:::",
    },
    {
      heading: "P11D vs payrolling benefits",
      body: "Employers can choose to **payroll benefits** instead of filing a P11D for them. HMRC registration is required first, and once registered the employee charge is run through PAYE each pay period, which removes the end-of-year P11D for those items but still leaves a **P11D(b)** for the Class 1A NI. Payrolling is usually cleaner for payroll teams and gives employees an accurate in-year view of what their perks cost. The election to payroll must be made before the start of the tax year for most benefits, so plan ahead for April.",
    },
    {
      heading: "Summary: how to use this P11D calculator",
      body: "Enter the cash equivalent value, pick the employee's marginal rate, and read off the employee tax and employer Class 1A NI. Use the figures to plan payroll, register for payrolling if appropriate, and complete the P11D and P11D(b) at year end. For a quick comparison of the same perk under different rates, adjust the rate selector — the **Class 1A NI** figure stays at 15% of the cash equivalent regardless of the employee.",
    },
    {
      "heading": "P11D benefit basket: why one benefit is not enough",
      "body": "A real P11D often contains more than one benefit. Private medical insurance, beneficial loans, gym memberships, living accommodation, vans, fuel and other taxable benefits can all sit on the same employee record. Use the calculator for one benefit at a time, then add the taxable values together to estimate the employee tax and employer Class 1A NI. A multi-benefit checklist is safer than treating the largest benefit as the whole P11D exposure."
    },
    {
      "heading": "P11D filing calendar and employer actions",
      "body": "The employer should identify taxable benefits during the tax year, confirm whether benefits are payrolled or reported on P11D, reconcile employee contributions, prepare P11D forms after year end, submit the P11D(b), pay Class 1A National Insurance by the deadline, and give employees their benefit details. The most common failure is leaving the P11D review until after payroll year end, when employee contributions and private-use records are harder to verify."
    },
    {
      "heading": "Payrolling benefits versus filing P11D",
      "body": "Payrolling benefits taxes the employee through PAYE during the year instead of reporting most benefits on a P11D after year end. It can reduce surprise tax-code changes, but the employer still needs accurate benefit values and still files P11D(b) for Class 1A NI. Company cars, medical insurance and recurring benefits are good candidates for payrolling; one-off or uncertain benefits often need extra review."
    },
  ],
  faq: [
    {
      question: "What is a P11D form?",
      answer:
        "Form P11D is the return an employer files with HMRC to report the **cash equivalent** of benefits in kind and expenses provided to each employee or director. It covers the tax year just ended and must be submitted by 6 July after that year. A separate form P11D(b) reports the Class 1A NI due on those benefits.",
    },
    {
      question: "How is tax on a benefit in kind worked out?",
      answer:
        "The employee pays income tax on the taxable value at their **marginal rate** — a £1,000 benefit costs a basic-rate taxpayer £200 and a higher-rate taxpayer £400. The employer separately pays **Class 1A NI at 15%** of the same value, which is reported on form P11D(b) and paid annually.",
    },
    {
      question: "What is Class 1A National Insurance?",
      answer:
        "Class 1A NI is an employer-only charge of **15%** on the taxable value of most benefits in kind in 2026/27. It is reported on form P11D(b) and paid by 22 July after the tax year end when paying electronically. It is not deducted from the employee's pay and has no lower threshold.",
    },
    {
      question: "Which benefits have to go on a P11D?",
      answer:
        "Common examples include company cars and fuel, **private medical and dental insurance**, beneficial loans over £10,000, gym memberships, and accommodation. Trivial benefits costing £50 or less that are not cash or a reward for work are exempt under the trivial benefits rules.",
    },
    {
      question: "Can benefits be taxed through payroll instead of a P11D?",
      answer:
        "Yes. Employers registered with HMRC to **payroll benefits** tax most perks monthly through PAYE, which removes the need for a P11D for those items. A P11D(b) is still required to report and pay the Class 1A NI due, even when the employee charge is payrolled.",
    },
    {
      question: "When is the P11D filing deadline?",
      answer:
        "Forms P11D and P11D(b) for a tax year ending on 5 April must reach HMRC by **6 July** of the same year. Class 1A NI payment is due by 22 July (or 19 July for non-electronic payments). Late filing or payment triggers automatic penalties and interest under HMRC rules.",
    },
    {
      "question": "Can I calculate several P11D benefits together?",
      "answer": "Calculate each taxable benefit value separately, subtract any employee contribution where allowed, then add the taxable values together before applying the employee tax rate and employer Class 1A NI."
    },
    {
      "question": "Who pays the Class 1A NI on P11D benefits?",
      "answer": "The employer pays Class 1A National Insurance on taxable benefits. The employee pays income tax on the benefit value, usually through a tax-code adjustment or payrolling."
    },
    {
      "question": "Does an employee contribution reduce the P11D value?",
      "answer": "Often yes, but only where the contribution is made for the private use of that benefit and the specific benefit rules allow it. Keep evidence of the contribution."
    },
  ],
  relatedSlugs: [],
  defaults: {
    benefitValue: 2000,
    taxRate: 20,
  },
});
