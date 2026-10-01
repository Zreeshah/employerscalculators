import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "employer-ni-category-letters-2026-27",
  title: "Employer NI Category Letters 2026/27: Cost Guide",
  metaDescription:
    "Employer NI category letters 2026/27: when the 0% employer rate can apply for under-21s, apprentices, veterans, Freeport and Investment Zone employees",
  h1: "Employer NI Category Letters 2026/27",
  intro:
    "A category letter can materially change an employer National Insurance estimate. The normal category A calculation is 15% above the secondary threshold, but qualifying younger workers, apprentices, veterans, Freeport employees and Investment Zone employees may have a 0% employer rate up to a higher limit. This guide is a planning aid, not a substitute for setting an HMRC category letter in payroll software.\n\nThe current [HMRC category-letter rate table](https://www.gov.uk/national-insurance-rates-letters) is the authoritative source and should be checked before payroll is finalised.",
  sections: [
    {
      heading: "Start with the standard category A position",
      body:
        "For a normal category A employee, employer NI is 15% above the £5,000 annual secondary threshold. There is no upper earnings limit. This is the right starting point only if the employee does not qualify for a special employer category.\n\nBefore changing a budget, confirm the employee's circumstances, the category letter that payroll will use and the relevant eligibility evidence. It is not enough for a worker to be young or in training in everyday language: the HMRC conditions must be met. The [employer NI calculator](/employer-ni-calculator/) is useful for the standard annual comparison.",
    },
    {
      heading: "Under-21s, apprentices and veterans",
      body:
        "For eligible categories M (under 21), H (apprentice under 25) and V (qualifying veteran), employer NI is 0% up to the upper secondary threshold. In 2026/27, that threshold is £50,270 a year, £4,189 a month or £967 a week. The normal 15% rate applies above it.\n\nFor example, a qualifying apprentice under 25 paid £30,000 is within that higher threshold, so the employer NI planning estimate is £0 rather than the standard-category £3,750. At £60,000, the planning amount above £50,270 is £9,730, giving £1,459.50 at 15%. Confirm the category and status before relying on either figure.",
    },
    {
      heading: "Freeport and Investment Zone categories",
      body:
        "Qualifying Freeport and Investment Zone categories use a different upper secondary threshold. For 2026/27 it is £25,000 a year, £2,083 a month or £481 a week. The employer rate can be 0% up to that limit and 15% above it. The location, job and other scheme conditions matter; the same employee cannot be treated as qualifying merely because the employer has a connection to an area.\n\nA £30,000 qualifying Freeport or Investment Zone employee therefore has a broad planning amount of (£30,000 − £25,000) × 15% = £750. Use HMRC's current scheme guidance and payroll software for the final result.",
    },
    {
      heading: "Reduced employee rates are a separate question",
      body:
        "Employer and employee category effects are not identical. Some letters alter an employee's own main NI rate, while other letters chiefly affect the employer secondary contribution. This is why a single generic statement such as 'all category letters work the same' is unsafe.\n\nWhen checking a payslip, assess the employee deduction and employer cost separately. The [employee NI rates guide](/guides/national-insurance-rates-2026-27/) covers the standard employee bands; the HMRC table is the source for specific reduced, deferred and pension-age categories.",
    },
    {
      heading: "Onboarding checks that prevent an NI error",
      body:
        "Build the category check into onboarding. Record date of birth where relevant, verify apprenticeship or veteran evidence where required, check Freeport or Investment Zone eligibility, and enter the category through recognised payroll software. Review the status if the worker reaches a relevant age or a scheme condition changes.\n\nKeep the evidence and decision record. A reduced employer NI estimate is only useful if it reflects an eligible category; the cost of correcting an incorrect letter later is higher than confirming it at the start.",
    },
    {
      heading: "Key takeaways",
      body:
        "The standard 15% employer NI rule is not universal. Qualifying under-21, apprentice and veteran categories can receive 0% employer NI up to £50,270; qualifying Freeport and Investment Zone categories can receive 0% up to £25,000. Use the official table and payroll evidence, then model the broader hire cost with the [employee cost calculator](/employee-cost-calculator/).",
    },
  ],
  faq: [
    { question: "Do employers pay NI for employees under 21?", answer: "A qualifying under-21 category can have a 0% employer rate up to the upper secondary threshold, then 15% above it." },
    { question: "Do apprentices under 25 have employer NI?", answer: "A qualifying apprentice under 25 can have a 0% employer rate up to the upper secondary threshold. The correct category letter and conditions are required." },
    { question: "What is the Freeport employer NI threshold?", answer: "For qualifying 2026/27 categories, the Freeport upper secondary threshold is £25,000 a year, £2,083 a month or £481 a week." },
    { question: "Does the category letter change employee and employer NI in the same way?", answer: "No. Employer and employee effects can differ. Check both sides against HMRC's specific category table." },
    { question: "Can I choose a lower NI category to reduce costs?", answer: "No. The category letter must reflect the employee's actual eligibility and be supported by the relevant evidence." },
  ],
  relatedSlugs: [],
});
