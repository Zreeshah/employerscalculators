import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "take-home-pay-calculator",
  kind: "take-home-pay",
  title: "Take Home Pay Calculator UK 2026/27",
  metaDescription:
    "UK take-home pay for 2026/27: income tax, employee National Insurance and net pay per year and per month from any gross salary",
  h1: "Take Home Pay Calculator",
  intro:
    "Enter your gross annual salary to see your 2026/27 take-home pay after income tax and employee National Insurance, broken down per year and per month. The tool is designed for employees checking a payslip or a job offer, and for employers or payroll staff who need a quick net-pay estimate. Figures assume the standard £12,570 Personal Allowance and exclude pension, student loan and other deductions.",
  formulaExplainer: `:::callout info
**Take-home pay = gross salary − income tax − employee NI.** Income tax uses the £12,570 Personal Allowance (tapered above £100,000), 20% to £37,700 of taxable income, 40% to £125,140 and 45% above. Employee NI is 8% between £12,570 and £50,270, then 2% above.
:::

The tax is calculated against the **whole-year gross**, then split into 12 equal monthly figures for display. Real PAYE payslips will differ slightly from month to month because HMRC recalculates tax and NI against cumulative thresholds each pay period.`,
  howToSteps: [
    {
      name: "Enter your gross annual salary",
      text: "Type the full-time equivalent annual salary before tax — the figure on the contract, not the take-home. The calculator accepts any value from small to high.",
    },
    {
      name: "Apply the 2026/27 tax rates",
      text: "The calculator subtracts the £12,570 Personal Allowance, then applies 20%, 40% and 45% income tax to the remaining taxable income, and 8% or 2% employee NI on the right bands.",
    },
    {
      name: "Read the annual take-home and the monthly figure",
      text: "Use the annual figure for offer-letter checks and the monthly figure for budgeting. The monthly figure is the annual net divided by 12, which is a clean average rather than a real-period payslip.",
    },
    {
      name: "Adjust for your own situation",
      text: "If you have a workplace pension, salary sacrifice, or a student loan, deduct those yourself — they apply outside this calculator. Pension contributions are paid before tax, so the gross-pay scope itself changes.",
    },
  ],
  sections: [
    {
      heading: "What is take-home pay?",
      body: `Take-home pay is the amount that lands in your bank account after the employer has deducted income tax and employee National Insurance. It is the number most people actually budget against, even though the headline figure on a job advert is always the gross salary.

Two deductions make up take-home pay for most employees: **income tax** (paid to HMRC) and **employee National Insurance** (also paid to HMRC, but ring-fenced for state benefits and the NHS). The take-home pay calculator works out both, so you can see exactly what your salary becomes in cash.`,
    },
    {
      heading: "How UK income tax and National Insurance are calculated in 2026/27",
      body: `For England, Wales and Northern Ireland, the calculation follows HMRC's 2026/27 rates. The first £12,570 of gross pay is the **Personal Allowance** — it is tax-free. The next £37,700 of taxable income is taxed at 20% (the basic rate), then income from £50,270 to £125,140 is taxed at 40% (the higher rate), and anything above £125,140 at 45% (the additional rate).

The £12,570 Personal Allowance is reduced by £1 for every £2 earned above £100,000, so it disappears entirely at £125,140. That creates an effective 60% marginal rate in the taper band, which GOV.UK explains in its income tax rates guidance.

**Employee National Insurance** uses different thresholds. The main rate is 8% on earnings between £12,570 and £50,270, dropping to 2% above £50,270. NI is calculated on the same gross pay but with its own band structure, so the two deductions do not align at the same boundary.`,
    },
    {
      heading: "Take-home pay at common UK salaries",
      body: `Below is what take-home pay looks like at common salaries in 2026/27, with the standard Personal Allowance and no other deductions. For your exact figure, use the calculator above.

:::table
| Gross salary | Income tax | Employee NI | Take-home (year) | Take-home (month) |
|---|---|---|---|---|
| £20,000 | £1,486 | £594 | £17,920 | £1,493 |
| £30,000 | £3,486 | £1,394 | £25,120 | £2,093 |
| £50,000 | £7,486 | £2,994 | £39,520 | £3,293 |
| £75,000 | £17,432 | £3,511 | £54,058 | £4,505 |
| £100,000 | £27,432 | £4,011 | £68,557 | £5,713 |
:::

The transition from £50,000 to £75,000 is where the higher-rate tax band starts biting: above £50,270 gross, every additional pound is taxed at 40% rather than 20%. The £100,000 row sits at the edge of the **Personal Allowance taper** — above this level, the £12,570 allowance starts shrinking by £1 for every £2 of income, which is what makes the next £25,000 of gross salary carry a particularly heavy tax burden.`,
    },
    {
      heading: "Income tax bands in Scotland (for reference)",
      body: `The take-home pay calculator above uses the rates for England, Wales and Northern Ireland (rUK). Scotland has a different income tax structure with six bands and a higher top rate, set by the Scottish Government each year.

:::table
| Band | Scottish rate | On taxable income from | Up to |
|---|---|---|---|
| Starter | 19% | £0 | £3,967 |
| Basic | 20% | £3,967 | £16,956 |
| Intermediate | 21% | £16,956 | £31,092 |
| Higher | 42% | £31,092 | £62,430 |
| Advanced | 45% | £62,430 | £125,140 |
| Top | 48% | £125,140 | — |
:::

The differences are concentrated in the middle and top of the range: Scottish higher-rate taxpayers pay 42% instead of 40%, and the top rate is 48% rather than 45%. Employee NI, the £12,570 Personal Allowance and the £100,000 taper are the same across the UK.`,
    },
    {
      heading: "Summary: how to use this calculator",
      body: `Enter the gross salary, read the take-home annual and monthly figures, and check the income tax and NI breakdown alongside. If you need to back-solve — for example, to find the gross salary that delivers a specific take-home — use the net to gross calculator.

The result is an estimate for the rates above: a real payslip will flex slightly because PAYE recalculates tax and NI against cumulative thresholds each period, so year-end totals match but the monthly line moves.

:::callout tip
The monthly figure here is the annual net divided by 12. A real payslip will flex month to month — for example, higher-rate tax kicks in part-way through the year rather than from January, so the first few payslips look slightly better than the last few.
:::`,
    },
  ],
  faq: [
    {
      question: "How is take-home pay calculated in the UK?",
      answer:
        "Take-home pay is gross salary minus income tax and employee National Insurance. For 2026/27: the first £12,570 is usually tax-free, taxable income is charged at 20%, 40% then 45% across the bands, and NI is 8% up to £50,270 then 2%.",
    },
    {
      question: "What is the take-home pay on a £30,000 salary in 2026/27?",
      answer:
        "On £30,000 with the standard Personal Allowance, income tax is 20% of £17,430 (£3,486) and employee NI is 8% of £17,430 (£1,394), leaving roughly £25,120 a year — about £2,093 a month. Use the calculator above for your exact figure.",
    },
    {
      question: "Does this calculator include pension or student loan deductions?",
      answer:
        "No. It deducts only income tax and employee National Insurance. Workplace pension contributions, student loan repayments and salary sacrifice arrangements would each reduce take-home pay further.",
    },
    {
      question: "Why does earning over £100,000 reduce my Personal Allowance?",
      answer:
        "HMRC tapers the £12,570 Personal Allowance by £1 for every £2 of income above £100,000, so it disappears entirely at £125,140. This creates an effective 60% marginal tax rate within the taper band, which the calculator includes.",
    },
    {
      question: "Is the monthly figure exactly one-twelfth of the annual figure?",
      answer:
        "In this calculator, yes — it shows the annual net divided by 12. Real PAYE payslips differ slightly month to month because tax and NI are calculated per pay period against cumulative thresholds.",
    },
    {
      question: "Do the rates differ in Scotland?",
      answer:
        "Income tax bands and rates differ in Scotland — six bands from 19% starter to 48% top rate. Employee NI and the Personal Allowance taper are the same across the UK. This calculator uses rUK rates; the Scottish structure is in the table above for reference.",
    },
  ],
  relatedSlugs: [],
});
