import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "net-to-gross-calculator",
  kind: "net-to-gross",
  title: "Net to Gross Salary Calculator UK 2026/27",
  metaDescription:
    "Gross salary from a target take-home pay, using 2026/27 UK income tax and employee National Insurance. Free net-to-gross calculator",
  h1: "Net to Gross Salary Calculator",
  intro:
    "Enter the net (take-home) pay you want and this calculator finds the gross salary that produces it after 2026/27 income tax and employee National Insurance. It is useful for employees negotiating a salary, for contractors quoting a day rate, and for employers or accountants quoting a guaranteed net figure. Figures assume the standard £12,570 Personal Allowance and no pension, student loan or other deductions.",
  formulaExplainer: `:::callout info
**Net to gross formula: find the gross where gross − income tax − employee NI equals the target net.** Income tax uses the £12,570 Personal Allowance (tapered above £100,000), 20% to £37,700 of taxable income, 40% to £125,140 and 45% above. Employee NI is 8% between £12,570 and £50,270, then 2% above.
:::

Rather than solve this with algebra, the calculator uses **binary search** — it tests a gross figure, checks the resulting take-home, and halves the gap until it converges on the gross that matches your target to within a few pence. The forward tax and NI rules are fixed by HMRC; the reverse is what the calculator is solving.`,
  howToSteps: [
    {
      name: "Enter your target take-home pay",
      text: "Type the net (take-home) amount you want — usually the annual figure, but a monthly or weekly target works too once you multiply or divide by 12 or 52.",
    },
    {
      name: "Run the calculation",
      text: "The calculator works backwards from your target, applying 2026/27 income tax and employee National Insurance to find the gross salary that produces it.",
    },
    {
      name: "Read the gross salary and the tax breakdown",
      text: "The result shows the gross salary required, alongside the income tax and employee NI that would be deducted from it at that gross.",
    },
    {
      name: "Adjust for other deductions",
      text: "If pension contributions, student loan repayments or salary sacrifice apply, the gross needed will be higher. Use the take-home pay calculator separately to model those deductions.",
    },
  ],
  sections: [
    {
      heading: "What is a net to gross calculation?",
      body: `A net to gross calculation reverses the normal payroll order: instead of deducting tax and NI from a known gross salary, you start with the net amount you want in your pocket and back-solve the gross. It is a common question for employees negotiating a salary, for contractors quoting a day rate, and for HR or payroll teams needing to guarantee a take-home figure in an offer letter.

The mathematics is harder than the forward take-home calculation because UK tax is **progressive** — the rate changes as income rises — so a simple division does not work. The calculator handles that by searching for the gross that fits, rather than trying to invert the bands by hand.`,
    },
    {
      heading: "How the net to gross calculator works",
      body: `Under the bonnet, the calculator uses a binary search. It tests a guess at the gross salary, runs the standard take-home-pay formula (gross − income tax − employee NI) on that guess, and checks whether the result is above or below your target. It then halves the search range and tests again — repeating until the gross converges on the answer.

This is fast, deterministic, and gives the same result regardless of how large the target. The forward formula is fixed by HMRC's 2026/27 rates: £12,570 Personal Allowance, 20% basic rate, 40% higher rate and 45% additional rate on income tax, plus 8% employee NI between £12,570 and £50,270 and 2% above £50,270. The reverse of that formula is what the calculator is solving.`,
    },
    {
      heading: "What gross salary gives a common take-home pay?",
      body: `The figures below are illustrative for 2026/27 under the standard Personal Allowance with no other deductions. For an exact answer at your own target, use the calculator above.

:::table
| Target net (annual) | Approx. gross salary | Income tax | Employee NI |
|---|---|---|---|
| £20,000 | £22,890 | £2,064 | £826 |
| £30,000 | £36,780 | £4,842 | £1,937 |
| £40,000 | £50,760 | £7,736 | £3,026 |
| £60,000 | £85,250 | £21,532 | £3,716 |
| £100,000 | £146,360 | £51,852 | £4,508 |
:::

Above £50,270 gross, the calculation shifts: only the first £37,700 of taxable income is taxed at 20%, the rest is taxed at 40%, and the marginal NI rate drops from 8% to 2%. That is why the tax column jumps sharply between £40,000 and £60,000 net. Above £100,000 the Personal Allowance also starts tapering, which is why the £100,000 net target needs a gross of around £146,000 rather than a continuation of the previous trend.`,
    },
    {
      heading: "Income tax and NI in 2026/27",
      body: `Two HMRC rules drive the gross figure for any net target. The **Personal Allowance** of £12,570 is the amount you can earn before income tax starts; it is reduced by £1 for every £2 earned above £100,000, and disappears entirely at £125,140. That taper creates an effective 60% marginal tax rate in the band, which the calculator accounts for.

**Employee National Insurance** uses different thresholds: 8% on earnings between £12,570 and £50,270 (the main rate) and 2% above £50,270 (the upper rate). NI thresholds are set independently of income tax, so the two deductions do not line up at the same boundary. Other deductions — pension contributions, student loan repayments, salary sacrifice — are not in this calculator and would each push the gross needed higher.`,
    },
    {
      heading: "Summary: how to use this calculator",
      body: `Enter the net pay you want, read the gross salary the calculator returns, and treat that as the headline figure you need to negotiate, quote or budget for. Use the take-home pay calculator in the other direction to check that gross figure end-to-end, and add any pension, student loan or salary sacrifice effects on top.

The result is an estimate based on HMRC's 2026/27 rates — for the actual figure on a payslip, the employer's payroll software is the source of truth.

:::callout tip
If you need a guaranteed net figure in an offer or contract, build in a small buffer (around 5%) for rounding and any year-end tax code adjustments. The calculator gives an exact figure for the rates above, but real payslips vary slightly from period to period.
:::`,
    },
  ],
  faq: [
    {
      question: "How do I convert net pay to gross salary in the UK?",
      answer:
        "Find the gross figure that, after the £12,570 Personal Allowance, the 20%/40%/45% income tax bands, and 8%/2% employee NI, leaves the net amount you want. This calculator does that automatically for 2026/27 rates.",
    },
    {
      question: "What gross salary gives £2,000 net per month in 2026/27?",
      answer:
        "£2,000 a month is £24,000 a year. Under 2026/27 rates (standard Personal Allowance, no other deductions) that takes a gross salary of roughly £28,450. Use the calculator above for your exact target.",
    },
    {
      question: "Does this include pension contributions or student loans?",
      answer:
        "No. The calculation covers only income tax and employee National Insurance. Pension contributions, student loan repayments and salary sacrifice will all change the gross needed for a given net figure.",
    },
    {
      question: "What are the 2026/27 tax rates used here?",
      answer:
        "Personal Allowance £12,570 (reduced by £1 for every £2 earned above £100,000). Taxable income is taxed at 20% up to £37,700, 40% up to £125,140, then 45%. Employee NI is 8% between £12,570 and £50,270, and 2% above.",
    },
    {
      question: "Why is the Personal Allowance tapered above £100,000?",
      answer:
        "HMRC reduces the £12,570 Personal Allowance by £1 for every £2 of income above £100,000, so it reaches zero at £125,140. That creates an effective 60% marginal rate in the taper band, which the calculator accounts for.",
    },
    {
      question: "Why does the calculator use a search instead of a formula?",
      answer:
        "Income tax and NI are banded, so the reverse calculation is not a simple division. Binary search converges on the right gross figure in well under a second, without the algebra.",
    },
  ],
  relatedSlugs: [],
});
