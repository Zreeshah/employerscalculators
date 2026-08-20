import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "annual-leave-calculator",
  kind: "annual-leave",
  title: "Annual Leave Calculator UK 2026/27",
  metaDescription:
    "Statutory annual leave in days: 5.6 weeks × days worked per week. Full-time, part-time and pro-rata holiday entitlement for UK workers",
  h1: "Annual Leave Calculator",
  intro:
    "Almost all UK workers are legally entitled to 5.6 weeks of paid annual leave — 28 days for someone working five days a week, which can include bank holidays. This calculator works out the statutory entitlement in days for any working pattern, including part-time staff, by multiplying days worked per week by 5.6. Employers can offer more than the statutory minimum, but never less.",
  formulaExplainer: `:::callout info
**Statutory annual leave (days) = days worked per week × 5.6.** A five-day week gives 5 × 5.6 = 28 days; a part-time three-day week gives 3 × 5.6 = 16.8 days. The entitlement is capped at 28 days, so working six or seven days a week still gives 28.
:::

The rule comes from the Working Time Regulations 1998. The 5.6 weeks includes any bank holidays the employer counts towards the statutory minimum, unless the contract says bank holidays are paid on top.`,
  sections: [
    {
      heading: "What is statutory annual leave?",
      body: `Statutory annual leave is the **paid holiday** that almost every UK worker is entitled to by law, set out in the Working Time Regulations 1998. The minimum is 5.6 weeks per year, which works out as 28 days for a five-day week. It applies to employees, including part-time and zero-hours staff, and the only common exclusion is the genuinely self-employed.

The 5.6 weeks is a **floor, not a ceiling**. Many employers — particularly in finance, law and the public sector — give 25, 30 or even 33 days of contractual holiday on top of (or instead of) the statutory minimum. Anything above 5.6 weeks is governed by the employment contract, not the regulations.`,
    },
    {
      heading: "How the 5.6 weeks entitlement works",
      body: `The 5.6 weeks is converted to days by multiplying by the number of days worked per week, capped at 28 days. So a five-day week gives 28 days, a four-day week gives 22.4 days, a three-day week gives 16.8 days, and a one-day week gives 5.6 days. The cap at 28 days — which the Working Time Regulations confirm — means that working six or seven days a week does not produce more leave.

For irregular-hours workers and part-year staff, this days-based entitlement does not apply. Instead, holiday accrues at **12.07% of hours worked** in each pay period, with rolled-up holiday pay allowed for those workers. Use the holiday entitlement calculator for an hours-based figure.`,
    },
    {
      heading: "Annual leave for different working patterns",
      body: `Below is the statutory entitlement at common working patterns in 2026/27. The figures are days, capped at 28 where the formula would otherwise exceed it.

:::table
| Working pattern | Days worked per week | Statutory annual leave (days) |
|---|---|---|
| Full-time | 5 | 28.0 |
| Four-day week | 4 | 22.4 |
| Part-time | 3 | 16.8 |
| Part-time | 2 | 11.2 |
| Part-time | 1 | 5.6 |
:::

A worker who moves from full-time to part-time, or who changes days per week, is entitled to leave pro-rata for the part of the leave year they have worked at each pattern. Treating part-timers less favourably than full-timers would breach the Part-time Workers Regulations 2000.`,
    },
    {
      heading: "Bank holidays and extra leave",
      body: `The eight UK bank holidays can either sit **inside** the 28-day statutory minimum or be paid **on top** of it — the contract decides. For example, an employer who gives 28 days inclusive of bank holidays provides 20 days of discretionary leave plus the 8 bank holidays. An employer who gives 28 days plus bank holidays provides 36 days total.

Either approach is lawful, but the contract or written statement of employment particulars must say which one applies. If the contract is silent, ACAS recommends treating bank holidays as part of the 5.6 weeks, not on top of it.

:::callout tip
If your contract gives bank holidays on top of the 5.6 weeks, it is worth checking the wording carefully — some employers reserve the right to require you to work bank holidays where the business needs it, and to give a day in lieu instead.
:::`,
    },
    {
      heading: "Summary: how to use this calculator",
      body: `Enter the days you work per week to see your statutory annual leave in days, then multiply up by your daily rate if you want to value it in cash. For irregular-hours workers, switch to the holiday entitlement calculator for an hours-based accrual.

The statutory 5.6 weeks is the legal minimum — anything your employer offers above that is contractual, and the Working Time Regulations set the floor rather than the ceiling.`,
    },
  ],
  faq: [
    {
      question: "How many days of annual leave are UK workers entitled to?",
      answer:
        "5.6 weeks of paid leave per year. For a five-day week that is 28 days; part-time workers get 5.6 times their days worked per week. The statutory cap is 28 days, however many days a week are worked.",
    },
    {
      question: "Do bank holidays count towards the 5.6 weeks?",
      answer:
        "They can. Employers may include the usual UK bank holidays within the 28-day statutory minimum, or give them on top — the employment contract should state which. Either approach is lawful.",
    },
    {
      question: "How does annual leave work for part-time workers?",
      answer:
        "Part-time workers get a pro-rata entitlement: days worked per week × 5.6. For example, three days a week gives 16.8 days. Treating part-timers less favourably than full-timers would breach the Part-time Workers Regulations.",
    },
    {
      question: "What about casual or irregular-hours workers?",
      answer:
        "For irregular-hours and part-year workers, holiday accrues at 12.07% of hours worked in each pay period (based on the 52-week reference), and rolled-up holiday pay is permitted for these workers. Use the holiday entitlement calculator for an hours-based figure.",
    },
    {
      question: "Can an employer give more than 5.6 weeks?",
      answer:
        "Yes. Many employers offer contractual holiday above the statutory 5.6 weeks. The statutory minimum is a floor, not a ceiling — but anything above it is governed by the contract, not the Working Time Regulations.",
    },
  ],
  relatedSlugs: [],
});
