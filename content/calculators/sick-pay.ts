import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "sick-pay-calculator",
  kind: "sick-pay",
  title: "Company Sick Pay Calculator UK 2026/27",
  metaDescription:
    "Compare occupational sick pay against the Statutory Sick Pay floor for 2026/27 — £123.25 a week, payable from day 1 for up to 28 weeks",
  h1: "Company Sick Pay Calculator",
  intro:
    "Benchmark an employee's contractual sick pay against the SSP floor for 2026/27. This company sick pay calculator is built for UK employers comparing their occupational scheme, HR teams drafting policies, and employees checking entitlement. For 2026/27 SSP is £123.25 a week, or 80% of average weekly earnings if lower, paid from day one of sickness for up to 28 weeks.",
  formulaExplainer:
    ":::callout info\n**SSP formula (2026/27):** weekly payable = lower of **£123.25** or **80% of average weekly earnings**, then divided by the employee's qualifying days per week to give a daily rate. SSP is paid from day 1 for up to 28 weeks.\n\nThe calculator returns the £123.25 weekly SSP rate as the statutory floor. Occupational sick pay is contractual and sits on top of — or inclusive of — that floor. Check the employment contract or sickness policy for the actual entitlement.\n:::",
  sections: [
    {
      heading: "What is company (occupational) sick pay?",
      body:
        "**Occupational sick pay** is the contractual sick pay an employer chooses to pay on top of the statutory minimum. It is set out in the employment contract, the staff handbook, or a written sickness policy. By law it can never be less than **Statutory Sick Pay (SSP)**, but most employers pay more — full pay for a short period, then half pay, then SSP, then nothing.\n\nThe contractual scheme is the headline figure on the payslip; SSP is the legal floor that the scheme must meet or exceed. If the contractual scheme is silent, the employee is entitled to SSP only — the calculator above shows what that floor is.",
    },
    {
      heading: "SSP and company sick pay: how they interact",
      body:
        "Most UK schemes are described as **inclusive of SSP**: the employer pays the contractual amount and SSP counts towards it. A few schemes pay the contractual amount **plus** SSP on top. Read the policy wording — 'inclusive' is the more common arrangement.\n\nThe table below sets out where the two differ.\n\n:::table\n| Feature | Statutory Sick Pay (SSP) | Occupational scheme |\n|---|---|---|\n| Weekly rate (2026/27) | £123.25, or 80% AWE if lower | Set by contract (often full pay) |\n| Day 1 of sickness | Yes (from 6 April 2026) | Often after waiting days |\n| Maximum duration | 28 weeks | Set by contract (often 4–26 weeks) |\n| Who pays | Employer | Employer |\n| Reclaimable from HMRC | No | No |\n| Legal source | HMRC / GOV.UK | Employment contract |\n:::\n\nWhere the contractual scheme pays less than SSP in any week — for example during a waiting period or after the scheme runs out — the employer must top up to SSP.",
    },
    {
      heading: "How this calculator works",
      body:
        "Enter the employee's annual gross salary and the number of sick days. The calculator returns the 2026/27 SSP weekly rate of **£123.25** as the comparison floor. Because every contractual scheme is different (waiting days, percentage of salary, length), it cannot model the contractual amount itself — the contract does that.\n\nTo use the figure in practice:\n\n- If the contractual scheme is **full pay for N weeks, then SSP**, the employer pays full pay first and falls back to £123.25 a week after N weeks.\n- If the scheme is **half pay after a waiting period**, the employer pays the contractual amount, which must never fall below £123.25.\n- If there is no contractual scheme, the employee gets £123.25 a week (or 80% of average weekly earnings if that is lower) for up to 28 weeks.\n\nFor a full SSP calculation — including the daily rate, qualifying days, and a 28-week cap — use the dedicated Statutory Sick Pay calculator.",
    },
    {
      heading: "What to put in a company sick pay policy",
      body:
        "A clear sickness policy prevents disputes at exactly the moment the employee is least able to chase paperwork. Five points cover the legal baseline:\n\n- **State the SSP rate and the link.** Reference the current SSP rate as the floor and confirm the scheme never pays less.\n- **Set waiting days explicitly.** SSP no longer has waiting days; many occupational schemes still do. Write 'SSP is payable from day 1' if you want to mirror the statutory position.\n- **Define the contractual rate and length.** Common patterns are 'full pay for 4 weeks, half pay for 4 weeks, then SSP' or a fixed weeks-at-full-pay allowance rolling over the year.\n- **Say whether SSP is inclusive or top-up.** Most schemes are inclusive — the contractual figure absorbs SSP. Spelling this out avoids double-counting.\n- **Reference absence management.** If you use the Bradford Factor for absence triggers, link to the policy here and make clear that disability-related or pregnancy-related absence is disregarded.",
    },
    {
      heading: "Summary: how to use this calculator",
      body:
        "Two numbers in, one number out. Enter the annual gross salary and the days of sickness. The company sick pay calculator returns the **2026/27 SSP floor of £123.25 a week**, which is the minimum every contractual scheme must match in any week of paid sickness. Use that figure as the benchmark when setting, reviewing, or challenging a contractual scheme — for the full SSP calculation with daily rates and the 28-week cap, use the Statutory Sick Pay calculator.\n\n:::callout tip\n**Source the figures from HMRC.** The SSP rate and the removal of waiting days are confirmed in the [HMRC rates and thresholds for employers 2026 to 2027](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027) on GOV.UK.\n:::",
    },
  ],
  faq: [
    {
      question: "How much is Statutory Sick Pay in 2026/27?",
      answer:
        "£123.25 a week, or 80% of average weekly earnings if that is lower. It is paid from the first qualifying day of sickness — there are no longer any waiting days — for up to 28 weeks. The rate is set by HMRC and listed in the rates and thresholds for employers 2026 to 2027 on GOV.UK.",
    },
    {
      question: "Is company sick pay paid on top of SSP?",
      answer:
        "It depends on the contract. Most occupational schemes are inclusive of SSP — the employer pays the contractual amount and SSP counts towards it — rather than adding SSP on top. A scheme can never pay less than SSP. Check the sickness policy or employment contract for the wording.",
    },
    {
      question: "Who qualifies for Statutory Sick Pay?",
      answer:
        "Employees who are too ill to work for at least four consecutive days (including non-working days) qualify, regardless of earnings for 2026/27 following the removal of the lower earnings limit. Agency workers and part-time staff qualify on the same basis. See GOV.UK's SSP eligibility page for edge cases.",
    },
    {
      question: "How long can an employee receive SSP?",
      answer:
        "A maximum of 28 weeks in any single period of sickness, or across linked periods (spells separated by eight weeks or less count as linked). Once the 28 weeks are used up, or employment ends, the employee may be able to claim other support such as Universal Credit or new-style ESA instead.",
    },
    {
      question: "Can employers reclaim SSP from HMRC?",
      answer:
        "No. There is no general rebate scheme — employers bear the cost of SSP themselves. The old Percentage Threshold Scheme was abolished in 2014, and the temporary COVID-19 rebate scheme has also closed.",
    },
  ],
  relatedSlugs: [],
});
