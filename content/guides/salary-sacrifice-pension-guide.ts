import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "salary-sacrifice-pension-guide",
  title: "Salary Sacrifice Pension: UK Guide for Employers & Employees",
  metaDescription:
    "How salary sacrifice pensions work in the UK for 2026/27: NI savings for employers and employees, the £12.71 minimum wage floor, and worked examples.",
  h1: "Salary Sacrifice Pension Guide",
  intro:
    "A salary sacrifice pension lets an employee give up part of their contractual gross salary in exchange for an employer pension contribution of the same amount. Because the sacrificed sum never counts as pay, both sides save National Insurance and the employee saves income tax. This guide explains how the arrangement works in 2026/27, the rules HMRC expects you to follow, and the pitfalls around minimum wage and statutory pay.",
  sections: [
    {
      heading: "What salary sacrifice is and how it works",
      body: "Salary sacrifice is a formal variation of the employment contract. The employee agrees to a lower gross salary, and the employer pays the sacrificed amount into the employee's pension instead. The contribution is treated as an employer contribution, so no income tax or National Insurance is due on it at all.\n\nThe arrangement must be genuine: the contract is amended in writing, the reduced salary becomes the employee's real pay, and they cannot simply swap back at will. HMRC accepts salary sacrifice for pensions as long as these conditions are met, and its guidance on GOV.UK sets out the detail.",
    },
    {
      heading: "Why both sides save National Insurance",
      body: "Employees pay NI at 8% on earnings between £12,570 and £50,270, then 2% above that. Employers pay 15% on earnings above £5,000. Because a sacrificed amount is removed from salary before these calculations, every pound sacrificed saves the employee 8% in the main band and saves you 15% in employer NI.\n\nMany employers pass some or all of their 15% saving into the employee's pension as an added benefit, though this is optional. Our salary sacrifice pension calculator shows the employee saving, the employer saving and the new take-home pay for any salary and sacrifice level.",
    },
    {
      heading: "Worked example: sacrificing 5% of a £30,000 salary",
      body: "An employee on £30,000 sacrifices 5% — £1,500 a year — into their pension:\n\n- New contractual salary: £28,500\n- Pension receives: £1,500 as an employer contribution\n- Employee NI saving: 8% of £1,500 = £120 a year\n- Income tax saving at the basic rate: 20% of £1,500 = £300 a year\n- Employer NI saving: 15% of £1,500 = £225 a year\n\nThe employee's take-home pay falls by about £1,080, but £1,500 lands in their pension — an extra £420 of value each year. If the employer adds its £225 NI saving to the pension too, the benefit grows further. Model your own figures with the salary sacrifice calculator.",
    },
    {
      heading: "The National Living Wage floor",
      body: "A sacrifice must not take an employee's pay below the National Living Wage — £12.71 an hour in 2026/27. HMRC checks the post-sacrifice salary against actual hours worked, so lower-paid staff have limited headroom.\n\nFor example, an employee on £28,000 working 37.5 hours a week earns about £14.36 an hour. A 10% sacrifice of £2,800 leaves £25,200, or roughly £12.92 an hour — legal, but close to the floor, and any larger sacrifice would breach the rules. Build an automatic NLW check into payroll and cap or pause sacrifices for anyone near the threshold. The salary sacrifice calculator flags when a proposed sacrifice drops pay too low.",
    },
    {
      heading: "How sacrifice affects statutory pay and benefits",
      body: "Statutory payments — including statutory maternity, paternity, adoption and sick pay — are calculated on average earnings after the sacrifice. A lower post-sacrifice salary can therefore reduce an employee's statutory entitlement, and in some cases drop them below the earnings threshold for qualifying at all.\n\nLife cover, mortgage references and redundancy pay can also be affected, because they often reference contractual salary. Good practice is to explain these knock-on effects in writing before an employee joins, and many employers use a notional pre-sacrifice salary for life cover and lending references. GOV.UK guidance on salary sacrifice lists the statutory schemes affected.",
    },
    {
      heading: "Salary sacrifice and auto-enrolment",
      body: "Salary sacrifice can sit on top of your auto-enrolment duties, but it does not remove them. Staff aged 22 to state pension age earning at least £10,000 a year must still be enrolled, with total minimum contributions of 8% of qualifying earnings including at least 3% from the employer.\n\nTwo practical points follow. First, assess auto-enrolment eligibility on post-sacrifice earnings, because a sacrifice could take someone below the £10,000 trigger. Second, contributions under a sacrifice arrangement count as employer contributions, which easily satisfy the 3% employer minimum. Our workplace pension calculator shows the baseline auto-enrolment cost before any sacrifice is applied.",
    },
    {
      heading: "Setting up a scheme step-by-step",
      body: "To put a pension salary sacrifice arrangement in place:\n\n1. Confirm each employee's post-sacrifice salary stays above £12.71 an hour.\n2. Issue a written contract variation signed by the employee, stating the new salary and the pension contribution.\n3. Update payroll so tax and NI are calculated on the reduced salary from the effective date.\n4. Tell your pension provider the contributions are employer contributions.\n5. Keep records of the agreement; HMRC can ask to see that the sacrifice is genuine.\n\nEmployees should be able to opt out, for example on life events, and the contract should say how. Many employers take payroll or HR advice before launch.",
    },
    {
      heading: "Common pitfalls to avoid",
      body: "The mistakes that most often cause problems:\n\n- Sacrificing below the National Living Wage, which breaches HMRC rules and can trigger arrears\n- Forgetting that statutory maternity and sick pay are based on post-sacrifice earnings\n- Treating the sacrifice as reversible on demand — frequent changes can make it look like normal pay to HMRC\n- Ignoring auto-enrolment reassessment when reduced pay crosses the £10,000 trigger\n- Failing to document the arrangement, leaving you exposed in an HMRC review\n\nA clear policy, signed contract variations and a payroll NLW check prevent almost all of these.",
    },
  ],
  faq: [
    {
      question: "Does salary sacrifice reduce take-home pay?",
      answer:
        "Yes, but by less than the amount sacrificed. A basic-rate employee sacrificing £1,500 sees take-home pay fall by roughly £1,080, because they no longer pay 20% income tax or 8% National Insurance on that £1,500. The full £1,500 goes into their pension instead.",
    },
    {
      question: "Can salary sacrifice take pay below the minimum wage?",
      answer:
        "No. HMRC rules require post-sacrifice pay to stay at or above the National Living Wage of £12.71 an hour in 2026/27. Payroll should cap or pause sacrifices for employees close to the floor.",
    },
    {
      question: "Does salary sacrifice affect statutory maternity pay?",
      answer:
        "Yes. Statutory maternity pay and other statutory payments are calculated on post-sacrifice earnings, so a lower salary can reduce entitlement. Employers should explain this before an employee joins the scheme, particularly anyone planning parental leave.",
    },
    {
      question: "Is a salary sacrifice pension the same as auto-enrolment?",
      answer:
        "No. Auto-enrolment is a legal duty to enrol eligible staff and pay minimum contributions — at least 3% from the employer within an 8% total. Salary sacrifice is an optional contract change that delivers contributions more tax-efficiently. The two can run together, and sacrifice contributions count towards the employer minimum.",
    },
    {
      question: "Can an employee leave a salary sacrifice scheme?",
      answer:
        "Yes, but not casually. The contract should set out when changes are allowed — typically on joining, at an annual review, or after a life event such as marriage or a new child. Frequent switching risks HMRC treating the sacrificed pay as ordinary earnings.",
    },
  ],
  relatedSlugs: [
    "salary-sacrifice-pension-calculator",
    "salary-sacrifice-calculator",
    "workplace-pension-calculator",
    "employer-ni-calculator",
  ],
});
