import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "ssp-vs-company-sick-pay",
  title: "SSP vs Company Sick Pay: UK Employer Guide",
  metaDescription:
    "Compare SSP vs company sick pay, including statutory and contractual rights, inclusive and additive policies, payroll treatment and worked examples",
  h1: "SSP vs Company Sick Pay",
  intro:
    "Statutory Sick Pay (SSP) is a legal minimum for eligible employees. Company sick pay, also called contractual or occupational sick pay, is an enhanced benefit set by the employment contract or policy. The critical policy choice is whether company sick pay includes SSP or is paid in addition to it. This guide owns that comparison and shows how each wording changes the payment.",
  sections: [
    {
      heading: "What is the difference between SSP and company sick pay?",
      body: "**SSP is statutory:** Parliament sets the eligibility rules, rate and maximum payment period, and an employer cannot contract out of an eligible employee's entitlement. **Company sick pay is contractual:** the employer chooses the rate, duration and qualifying conditions, provided the arrangement never delivers less than the statutory minimum when SSP is due.\n\nGOV.UK publishes the current SSP rules and rates. ACAS explains how statutory and contractual sick pay should appear in employment terms and absence policies. Company sick pay may be more generous, but calling it discretionary does not automatically remove contractual obligations created by clear wording or consistent practice.",
    },
    {
      heading: "Statutory and contractual sick pay compared",
      body: ":::table\n| Question | Statutory Sick Pay | Company sick pay |\n|---|---|---|\n| Who sets the rules? | Legislation and GOV.UK guidance | Employment contract or policy |\n| Is it compulsory? | Yes, for eligible employees | Only if the employer has promised it |\n| How much is paid? | Statutory rate or applicable earnings-based limit | Normal pay, half pay or another stated amount |\n| How long can it run? | Up to the statutory maximum | The period stated by the scheme |\n| Can it have service rules? | Statutory eligibility applies | Yes, subject to law and clear wording |\n| Is it taxed? | Yes, through PAYE | Yes, through PAYE |\n:::\n\nThe rights can run at the same time. A company scheme does not switch SSP off; it must explain how the SSP element is treated within the promised payment.",
    },
    {
      heading: "Inclusive versus additive company sick pay",
      body: "An **inclusive policy** says the company sick pay amount includes any SSP due. If normal weekly pay is £600 and the policy promises full pay, payroll pays £600 in total and records the SSP element within it. This is the usual way to prevent double payment.\n\nAn **additive policy** says company sick pay is paid on top of SSP. If it promises £600 plus SSP, the total exceeds normal pay unless the wording adds a cap. Do not assume the scheme is inclusive because that is commercially convenient. State it expressly, for example: 'Company sick pay is inclusive of any SSP payable for the same absence.'",
    },
    {
      heading: "Worked examples for the same two-week absence",
      body: "Assume an eligible employee normally earns £600 a week and receives £246.50 SSP for two complete weeks under the 2026/27 rate used on this site.\n\n- **SSP only:** total gross sick pay is £246.50.\n- **Full pay, inclusive of SSP:** total gross pay is £1,200; £246.50 is the SSP element and £953.50 is the company top-up.\n- **Half pay, inclusive of SSP:** total gross pay is £600; £246.50 is SSP and £353.50 is the top-up.\n- **£600 company pay, additive:** total gross pay is £846.50 if the policy truly promises £600 plus SSP.\n\nThe numbers show why one word in the policy can materially change cost.",
    },
    {
      heading: "Edge cases when the two entitlements do not align",
      body: "A company scheme can have different limits from SSP, so payroll needs two running balances. Company full pay might end after four weeks while SSP continues, or company pay might continue after the statutory entitlement has ended. A service requirement for enhanced pay does not remove SSP rights.\n\nAnother edge case is a company scheme with unpaid waiting days. If SSP is legally due for those qualifying days, the employer still pays SSP even though the contractual enhancement has not started. Where normal earnings are below a promised percentage or an absence links to an earlier spell, calculate the statutory position separately before applying the contractual top-up.",
    },
    {
      heading: "Payroll, tax and sickness records",
      body: "Both SSP and company sick pay are earnings processed through payroll, with PAYE income tax and National Insurance applied as appropriate. Keep the SSP calculation visible in payroll records even where the employee receives full contractual pay, because the statutory maximum and linked-absence rules continue in the background.\n\nGOV.UK sets out SSP record and notice requirements, including when form SSP1 is needed. ACAS recommends clear reporting procedures and consistent handling of fit notes and return-to-work arrangements. Reconcile the absence dates, qualifying days, statutory amount, contractual top-up and remaining entitlement rather than posting one unexplained sick-pay figure.",
    },
    {
      heading: "What a company sick pay policy should say",
      body: "A workable policy states who qualifies, when entitlement starts, the rate and duration, and whether service affects the benefit. It should also cover: \n\n- whether company sick pay is **inclusive of SSP or additive**\n- notification, self-certification and fit-note requirements\n- treatment of recurring or linked absences\n- what happens when company pay or SSP runs out\n- interaction with phased returns, holidays and other leave\n- when the employer may withhold only the contractual enhancement\n\nMatch the contract, handbook and payroll configuration. If discretion is retained, describe its scope and apply it consistently to reduce breach-of-contract and discrimination risk.",
    },
    {
      heading: "Summary: choose and document the interaction",
      body: "Start by calculating SSP under the current GOV.UK rules, then apply the contractual scheme. Use inclusive wording if the promised total already contains SSP; use additive wording only if the extra payment is genuinely intended on top. Test the policy against a new starter, a long absence, a linked absence and the point at which enhanced pay ends.\n\nThe SSP calculator can check the statutory element, while the sick pay calculator can model a broader employer payment. The comparison is complete only when the payslip total, SSP record and policy wording all tell the same story.",
    },
  ],
  faq: [
    {
      question: "Can an employee receive SSP and company sick pay together?",
      answer:
        "Yes. They usually run together, with SSP included within the total company sick pay. If the contract says company sick pay is additional to SSP, both amounts must be paid on top of each other.",
    },
    {
      question: "Is company sick pay a legal requirement?",
      answer:
        "There is no general requirement to offer more than SSP. However, enhanced sick pay becomes enforceable when it is a contractual term, and an employer must follow any scheme it has promised.",
    },
    {
      question: "What does inclusive of SSP mean?",
      answer:
        "It means the stated company sick pay total already contains any SSP due. If full pay is £600 and SSP is £123.25, payroll pays £600 in total rather than £723.25.",
    },
    {
      question: "Can company sick pay be paid on top of SSP?",
      answer:
        "Yes, if the contract or policy uses additive wording. Because this can take total sick pay above normal wages, the policy should state the intended amount and any overall cap clearly.",
    },
    {
      question: "What happens when company sick pay ends before SSP?",
      answer:
        "The employee moves to SSP only for as long as they remain eligible and have statutory entitlement left. Payroll should track the contractual and statutory limits separately.",
    },
    {
      question: "Can a company scheme have waiting days when SSP does not?",
      answer:
        "A company can delay its contractual enhancement if the policy says so, but it cannot withhold SSP on a day for which SSP is legally payable. The statutory payment must be handled separately.",
    },
    {
      question: "Are SSP and company sick pay taxable?",
      answer:
        "Yes. Both are treated as earnings and processed through PAYE, with income tax and National Insurance applied where due.",
    },
  ],
  relatedSlugs: [
    "ssp-calculator",
    "sick-pay-calculator",
    "how-to-calculate-statutory-sick-pay",
    "bradford-factor-calculator",
  ],
});
