import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "salary-sacrifice-pension-calculator",
  kind: "salary-sacrifice-pension",
  title: "Salary Sacrifice Pension Calculator UK 2026/27: NI Savings",
  metaDescription:
    "See the employee and employer National Insurance savings when pension contributions are made by salary sacrifice in 2026/27, plus the reduced gross salary.",
  h1: "Salary Sacrifice Pension Calculator",
  intro:
    "Estimate the National Insurance savings when pension contributions are paid through a **salary sacrifice** arrangement instead of as a normal deduction. Useful for employers designing a scheme and employees weighing one up. In 2026/27 the employee saves NI at 8% on the sacrificed amount in the main band (2% above £50,270) and the employer saves 15% — savings many employers add to the employee's pension pot (HMRC).",
  formulaExplainer:
    ":::callout info\nFor annual salary **S**, annual pension contribution **C**, and selected tax band **t**:\n\n- **Reduced gross salary: S − C**\n- **Income-tax saving: C × t** at 20%, 40% or 45%\n- **Employee NI saving:** C × 8% for basic rate, or C × 2% for higher/additional rate\n- **Employer NI saving:** C × 15%\n- **Net employee cost:** C − income-tax saving − employee NI saving\n- **Total pension contribution:** C plus employer NI saving when the employer top-up is selected\n\nThe calculator caps the effective sacrifice so at least £1 of gross salary remains. Statutory pay bases and the National Living Wage use the reduced cash pay, so check the impact before agreeing a large sacrifice.\n:::",
  howToSteps: [
    {
      name: "Enter the gross annual salary",
      text: "Use the contractual gross before any sacrifice. This is the figure on the employment contract that the sacrifice arrangement will amend, so the calculator can apply the same percentage to a known starting point.",
    },
    {
      name: "Enter the annual pension contribution",
      text: "Enter the amount in pounds that will go into the pension via salary sacrifice instead of as cash pay. Stay below the point where post-sacrifice cash pay would breach the National Living Wage (£12.71 an hour for workers aged 21+ from April 2026) and inside the pension annual allowance.",
    },
    {
      name: "Read the reduced gross and the NI savings",
      text: "The result panel shows the amount sacrificed, the new lower gross, and the employee and employer NI savings for 2026/27. Use these to decide whether to pass the employer saving into the pension as an enhanced employer contribution.",
    },
    {
      name: "Confirm the arrangement in writing and update payroll",
      text: "A salary sacrifice must be a real contractual change — an effective variation of pay documented before the start of the period it applies to. Update the employment contract, set the new cash pay in the payroll system, and confirm with the pension provider that the sacrificed amount is being paid in.",
    },
  ],
  sections: [
    {
      heading: "What is salary sacrifice for pensions?",
      body: "**Salary sacrifice** is a contractual arrangement where an employee gives up part of their cash pay in exchange for a non-cash benefit, in this case an employer pension contribution. Because the **cash pay is reduced**, both employee and employer National Insurance are worked out on the lower figure, generating savings for both sides. HMRC recognises salary sacrifice where the arrangement is documented in the employment contract and the post-sacrifice cash pay does not breach the National Living Wage.",
    },
    {
      heading: "How the National Insurance saving is calculated",
      body: "The savings are the difference between the NI on the original salary and the NI on the reduced salary. **Employee NI** is 8% between £12,570 and £50,270 and 2% above £50,270 in 2026/27, so the saving depends on which band the sacrificed amount falls into. **Employer NI** is 15% on every pound above £5,000 with no upper cap, so the saving scales with the sacrifice. The table below shows typical figures on a £40,000 salary.\n\n:::table\n| Sacrifice | Sacrificed | Reduced gross | Employee NI saving | Employer NI saving |\n|---|---|---|---|---|\n| 3% | £1,200 | £38,800 | £96 | £180 |\n| 5% | £2,000 | £38,000 | £160 | £300 |\n| 8% | £3,200 | £36,800 | £256 | £480 |\n| 10% | £4,000 | £36,000 | £320 | £600 |\n:::\n\nThe employer saving is usually the larger of the two, because the 15% rate applies to every pound of the sacrifice above the £5,000 secondary threshold.",
    },
    {
      heading: "National Living Wage and other limits",
      body: "The post-sacrifice cash pay must stay above the **National Living Wage** (£12.71 an hour for workers aged 21+ from April 2026) for every hour worked. A sacrifice that pushes an hourly-paid worker below NLW is not legally valid and HMRC can treat the arrangement as ineffective. The pension **annual allowance** of £60,000 in 2026/27 also caps the total contributions (employee, employer and tax relief) for most people, with a tapered annual allowance for higher earners.",
    },
    {
      heading: "Effect on statutory pay and mortgage checks",
      body: "**Statutory pay is calculated on the reduced salary**. Statutory Maternity Pay, Statutory Sick Pay, statutory redundancy pay and the State Pension are all based on the post-sacrifice cash earnings, so a large sacrifice can reduce them materially. Mortgage and rental affordability checks also use the reduced salary, which can affect how much an employee can borrow. Weigh these against the NI saving before agreeing a high percentage.",
    },
    {
      heading: "Passing the employer NI saving into the pension",
      body: "The employer saves **15% NI on the sacrificed amount** and can choose to pass some or all of it into the employee's pension as an extra employer contribution. This is the basis of the common \"pension sacrifice\" employer offer: the employee sacrifices a slice of pay, the employer pays that slice plus its NI saving into the pension, and the employee ends up with a larger pension pot for the same cash cost. The extra employer contribution is itself exempt from employer NI.",
    },
    {
      heading: "Summary: how to use this salary sacrifice pension calculator",
      body: "Enter the gross salary and annual pension contribution in pounds, select the employee tax band, and choose whether the employer adds its NI saving to the pension. The calculator shows reduced gross, income-tax and NI savings, net employee cost, total pension contribution and monthly saving. Check that post-sacrifice cash pay does not breach the National Living Wage.",
    },
    {
      "heading": "Salary sacrifice pension versus relief at source",
      "body": "Relief at source gives basic-rate tax relief through the pension provider and higher-rate taxpayers may claim extra relief. Salary sacrifice works differently: the employee gives up salary and the employer pays pension instead. That can reduce employee NI and employer NI as well as income tax. The best option depends on pension scheme type, tax band, employer policy and whether the employer shares its NI saving."
    },
    {
      "heading": "The £1 sacrificed test",
      "body": "A useful way to explain salary sacrifice pension is to ask what happens to each £1 of salary. Without sacrifice, some of that £1 may be lost to tax and employee NI before a personal contribution is made. With sacrifice, the £1 can go straight into pension as employer contribution, and the employer may add some or all of its NI saving. That is why pension sacrifice can feel more powerful than an ordinary net pay contribution."
    },
    {
      "heading": "Minimum-wage and statutory-payment safeguards",
      "body": "Do not sacrifice salary below minimum wage, and be careful before sacrificing during periods used to calculate SMP, SSP, redundancy pay, mortgage affordability or benefit entitlement. Employers should provide illustrations, obtain written consent and give employees a route to vary or stop sacrifice after lifestyle events."
    },
  ],
  faq: [
    {
      question: "How much National Insurance does salary sacrifice save?",
      answer:
        "In 2026/27 the **employee saves 8% NI** on the sacrificed amount, or 2% on any part of it that falls above the £50,270 upper earnings limit. The **employer saves 15%** NI on the full sacrificed amount, because employer NI runs at 15% on earnings above £5,000 with no upper cap.",
    },
    {
      question: "Is salary sacrifice for pensions legal and HMRC-approved?",
      answer:
        "Yes. Salary sacrifice is a contractual variation of pay recognised by HMRC, provided the employee's post-sacrifice cash pay does not fall below the National Living Wage (£12.71 an hour for 21+ from April 2026) and the arrangement is documented in the employment contract. See GOV.UK's salary sacrifice guidance for the full rules.",
    },
    {
      question: "Does salary sacrifice affect statutory pay like SMP or SSP?",
      answer:
        "Yes. **Statutory payments such as Statutory Maternity Pay, Statutory Sick Pay and redundancy pay** are calculated on post-sacrifice earnings, so a large sacrifice can reduce them. Mortgage affordability checks may also use the reduced salary. Employees should weigh this up before agreeing a sacrifice.",
    },
    {
      question: "Can the employer's NI saving be paid into the pension too?",
      answer:
        "Yes, and many schemes do exactly that. The employer saves 15% NI on the sacrificed amount and can pass some or all of it into the employee's pension as an extra employer contribution, at no additional cost to the business. The extra contribution is itself exempt from employer NI.",
    },
    {
      question: "Is there a limit on how much can be sacrificed into a pension?",
      answer:
        "The main ceiling is the pension **annual allowance of £60,000** in 2026/27 across all contributions (employee, employer and tax relief). The National Living Wage floor also caps the practical sacrifice for lower-paid staff. Check GOV.UK for tapered rules affecting high earners.",
    },
    {
      "question": "Is salary sacrifice pension always better?",
      "answer": "Not always. It often saves NI, but it can affect statutory pay, borrowing, salary-linked benefits and minimum-wage compliance."
    },
    {
      "question": "Can the employer add its NI saving to my pension?",
      "answer": "Yes, if the employer policy allows it. Some employers add all or part of the employer NI saving as an extra pension contribution."
    },
    {
      "question": "Does salary sacrifice reduce taxable income?",
      "answer": "Yes, the sacrificed salary is removed from taxable pay and replaced with employer pension contribution, subject to a valid arrangement."
    },
  ],
  relatedSlugs: [],
  defaults: {
    annualSalary: 45000,
    annualSacrificeAmount: 5000,
  },
});
