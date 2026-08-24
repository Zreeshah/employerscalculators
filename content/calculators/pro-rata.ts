import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "pro-rata-calculator",
  kind: "pro-rata",
  title: "Pro Rata Calculator UK 2026/27: Part-Time Salary & FTE",
  metaDescription:
    "Pro rata calculator for UK part-time pay. Work out a pro rata salary, FTE and monthly pay from a full-time salary and contracted hours for 2026/27.",
  h1: "Pro Rata Calculator: Part-Time Salary & FTE",
  intro:
    "This pro rata salary calculator works out what a part-time or reduced-hours employee should earn compared with the full-time equivalent salary, using the standard hours-ratio formula used across UK payroll. It is built for employers setting part-time pay, HR teams drafting contracts, and employees checking whether an offer is fair. Enter the full-time annual salary and the two sets of weekly hours and the calculator returns the pro rata annual figure in seconds — with no sign-up and no data leaving your browser.",
  formulaExplainer:
    ":::callout info\n**The pro rata formula:** pro rata salary = full-time annual salary × (actual weekly hours ÷ full-time weekly hours).\n\nThis is the same formula the calculator above uses. It gives you the **full-time equivalent (FTE)** fraction, which is the number you also use for pension contributions, employer National Insurance, holiday entitlement and statutory pay.\n:::\n\nFor a quick sanity check, the pro rata fraction is just the full-time equivalent (FTE): 22.5 ÷ 37.5 = 0.6, so 0.6 of the full-time salary. This works whether the part-time pattern is three days a week, term-time only, or job-share.",
  howToSteps: [
    {
      name: "Find the full-time equivalent salary",
      text: "Start with the annual salary for the full-time role — the same job worked over the standard full-time hours. For UK office roles this is typically £30,000–£45,000; for clinical and skilled roles it will be higher. The full-time figure is your baseline.",
    },
    {
      name: "Note the full-time weekly hours",
      text: "The standard UK full-time week is 37.5 hours (9am–5:30pm, Mon–Fri with an hour for lunch). Some employers use 35 or 40. Use the contracted hours in the full-time contract — exclude unpaid breaks — as the denominator.",
    },
    {
      name: "Note the actual weekly hours",
      text: "Take the contracted weekly hours for the part-time or reduced-hours role. Use contracted hours, not the average of hours actually worked: occasional overtime is not part of the pro rata calculation.",
    },
    {
      name: "Divide actual hours by full-time hours",
      text: "Divide the part-time hours by the full-time hours to get the full-time equivalent (FTE). For example, 22.5 ÷ 37.5 = 0.6, so the role is 0.6 FTE. Job-share roles often work out at 0.5 FTE; term-time only contracts are usually lower.",
    },
    {
      name: "Multiply the FTE by the full-time salary",
      text: "Multiply the full-time annual salary by the FTE. In the example, £30,000 × 0.6 = £18,000. That is the pro rata annual salary — the figure that should appear in the part-time contract and on the payslip before tax.",
    },
  ],
  inlineWidgets: [
    {
      type: "barChart",
      afterSectionHeading: "Pro rata salary examples",
      title: "Pro rata salary at common FTE fractions",
      unit: "Full-time equivalent salary: £40,000 over 37.5 hours a week",
      data: [
        { label: "0.25 FTE", value: 10000, caption: "1 day a week" },
        { label: "0.5 FTE", value: 20000, caption: "Half time" },
        { label: "0.6 FTE", value: 24000, caption: "3 days / 5" },
        { label: "0.75 FTE", value: 30000, caption: "Term-time" },
        { label: "1.0 FTE", value: 40000, caption: "Full-time" },
      ],
    },
  ],
  sections: [
    {
      heading: "What is a pro rata salary?",
      body:
        "A **pro rata salary** is the proportion of a full-time salary that someone earns when they work fewer hours or fewer weeks than the full-time equivalent. The phrase comes from the Latin \"pro rata\" — *in proportion*. A part-time employee working half the standard hours is paid half the full-time salary; a term-time worker paid over 12 months gets 39/52 of the full-time figure.\n\nPro rata is the default in UK employment law for any contractual entitlement that scales with hours or weeks: salary, holiday, maternity pay, redundancy, and notice periods all follow the same proportion. If the full-time role is £40,000 over 37.5 hours, the pro rata salary for 25 hours a week is £26,667 — and the same proportion applies to everything else attached to the job.",
    },
    {
      heading: "The pro rata salary formula",
      body:
        "There are two equivalent ways to write the formula.\n\n- **Hours ratio:** pro rata salary = full-time salary × (part-time hours ÷ full-time hours)\n- **FTE fraction:** pro rata salary = full-time salary × FTE, where FTE = part-time hours ÷ full-time hours\n\nThe FTE fraction is the same fraction you use for pension contributions, employer National Insurance, and holiday entitlement. It is also the figure to use for an annualised-hours contract: spread the FTE salary evenly across 12 monthly payslips.\n\nWhen the part-time pattern is irregular (for example, school hours only, or seasonal work), use the contracted weekly hours averaged over a full year. A term-time-only worker paid over 12 months is typically **39/52 = 0.75 FTE**, not the simple term-time / full-time-week ratio.",
    },
    {
      heading: "Pro rata salary examples",
      body:
        "Three worked examples using the formula in this pro rata calculator. The chart below visualises how the pro rata figure changes at common FTE fractions.\n\n- **£30,000 full-time at 0.5 FTE:** a £30,000 role based on 37.5 hours a week, working half the hours. Pro rata salary = £30,000 × (18.75 ÷ 37.5) = **£15,000 a year**.\n- **£40,000 full-time, 25 hours instead of 37.5:** Pro rata salary = £40,000 × (25 ÷ 37.5) = **£26,667 a year**.\n- **£45,000 full-time, term-time only paid over 12 months:** FTE = 39 ÷ 52 = 0.75. Pro rata salary = £45,000 × 0.75 = **£33,750 a year**.\n\nIn every case the result is gross annual pay. Use the take-home pay calculator to see the income tax and employee National Insurance that would be deducted through PAYE on that figure.",
    },
    {
      heading: "Pro rata for part-time, job-share and term-time workers",
      body:
        "The pro rata formula covers the most common UK working patterns, but each has a small wrinkle worth knowing. The table below sets them out side by side.\n\n:::table\n| Pattern | How to calculate FTE | Typical FTE | Example (full-time £40,000) |\n|---|---|---|---|\n| Part-time (regular hours) | Part-time hours ÷ full-time hours | 0.4 – 0.8 | 25 of 37.5 hrs = 0.67 FTE → £26,667 |\n| Job-share | Sum of all partners' hours ÷ full-time hours | 0.5 each | Two people splitting 37.5 hrs 50/50 |\n| Term-time only | Weeks worked per year ÷ 52 | 0.7 – 0.8 | 39/52 = 0.75 FTE → £30,000 |\n| Annualised hours | Annual contracted hours ÷ full-time annual hours | Varies | 1,500 of 1,950 = 0.77 FTE |\n| Zero-hours / casual | No FTE — paid by the hour | N/A | Hourly rate × hours actually worked |\n:::\n\nA part-time worker on a regular hours pattern is the most straightforward case — this is what the pro rata salary calculator does. A job-share is two people each taking part of the full-time hours, usually splitting the role 50/50, with each paid the FTE fraction that matches their share. A term-time-only worker is paid over 12 months for a role that only runs for the school year, so FTE = 39/52. An annualised-hours contract is paid the same amount each month regardless of how the hours fall, smoothing irregular patterns. Zero-hours workers do not have a pro rata annual salary until a regular pattern emerges.",
    },
    {
      heading: "Pro rata holiday, pension and statutory pay",
      body:
        "Salary is only part of the picture. Holiday entitlement, pension contributions and statutory pay are also pro rated.\n\n- **Holiday entitlement.** The statutory 5.6 weeks of paid leave scales with the working pattern. A 5-day-a-week full-timer gets 28 days; a 3-day-a-week part-timer gets 16.8 days (3 × 5.6). Bank holidays can be included in that allowance or paid on top — the contract decides. From April 2024, irregular-hours workers accrue 12.07% of hours worked as holiday.\n- **Pension contributions.** Auto-enrolment contributions are based on qualifying earnings, so they fall automatically as pay falls. A 0.5 FTE employee earning £15,000 pays 5% (£750) and the employer adds 3% (£450) on the same basis. Use the workplace pension calculator to model the figures.\n- **Statutory pay (SSP, SMP, etc.).** The entitlement still applies to part-timers, but the average weekly earnings used to calculate the amount are based on actual earnings, which are already pro rated. A 0.5 FTE employee earning £15,000 will usually receive less SSP or SMP than a full-timer on £30,000 because the cap is 80% of their own average weekly earnings.\n- **Notice and redundancy.** Statutory notice and redundancy payments are pro rated by the same FTE fraction. A 0.5 FTE employee with four years' service is entitled to five weeks' notice at half the full-time weekly pay.\n\n:::callout tip\n**One FTE fraction drives everything.** Once you have the FTE for a part-time role, apply it to the full-time salary, the full-time holiday allowance, and the full-time employer pension contribution. If the figures in the contract do not all use the same fraction, the part-time worker's package is wrong somewhere — usually the pension.\n:::",
    },
    {
      heading: "Common pro rata mistakes to avoid",
      body:
        "Most pro rata errors are arithmetic rather than legal, but they create real pay disputes. Watch out for these.\n\n- **Using days instead of hours.** A 3-day week is not necessarily 0.6 FTE. Always convert to contracted hours and divide by the full-time hours.\n- **Forgetting to subtract unpaid breaks.** A 9-to-5 role with an hour's unpaid lunch is 35 hours, not 40. The full-time comparator must use the same convention.\n- **Counting overtime.** Occasional extra hours should not appear in the pro rata calculation; the FTE is fixed at the contracted hours.\n- **Mixing monthly and annual figures.** Annualise the full-time salary first, then apply the FTE. A monthly figure ÷ 12 × 12 is the same number, but mixing £2,500/month and £35,000/year will silently produce the wrong answer.\n- **Paying term-time only as a fraction of the school year, not the calendar year.** A 39-week worker paid over 12 months is 39/52 FTE = 0.75, not 0.75 of 52 weeks of pay.\n- **Ignoring pension thresholds.** A 0.4 FTE employee earning £8,000 falls below the £10,000 auto-enrolment trigger and is not entitled to be enrolled — the pro rata salary drives this, not the FTE fraction.\n\n:::callout warn\n**Equal treatment under the Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000.** A part-timer must not be treated less favourably than a comparable full-timer in their pay, pension, holiday, or any other contractual benefit, unless the treatment is objectively justified. Get the pro rata fraction right in every line of the contract, not just salary.\n:::",
    },
    {
      heading: "Pro rata pay for employers: what to get right",
      body:
        "If you set pro rata salaries, the legal risks sit around transparency and consistency, not the maths.\n\n- **Put the FTE in the contract or written statement.** From day one, the part-time contract should state the full-time equivalent salary, the actual hours, and the FTE fraction. The payslip should show the pro rata figure clearly.\n- **Use the same hours convention for everyone.** If full-time is 37.5 hours, every part-time figure should be derived from 37.5. Mixing 35 and 37.5 in the same organisation invites equal-pay claims.\n- **Review when roles change.** If the full-time hours, full-time salary, or part-time hours change, the pro rata figure should be re-calculated. A new contract or variation letter should record the change.\n- **Don't forget pension and statutory pay.** Re-calculating the salary but leaving the pension contribution on the old figure is a common payroll mistake — and one HMRC will pick up on an audit.\n- **Equal treatment.** Under the Part-Time Workers Regulations 2000, less favourable treatment of a part-timer compared to a comparable full-timer must be objectively justified, otherwise it is automatically unlawful.\n\nThe free pro rata pay calculator above handles the arithmetic; the discipline is making sure the figures feeding into it are current and the contract reflects the result.",
    },
    {
      heading: "Summary: how to use the pro rata calculator",
      body:
        "Three numbers in, one number out. Enter the full-time annual salary, the full-time weekly hours (typically 37.5), and the actual weekly hours. The pro rata calculator returns the gross annual salary for the part-time role using the hours-ratio formula. Divide actual by full-time to get the FTE; multiply the FTE by the full-time salary to get the pro rata figure. The same fraction then drives holiday entitlement, pension contributions, and statutory pay — so recalculate everything together when hours change.\n\n:::callout tip\n**Bookmarks:** the GOV.UK [holiday entitlement calculator](https://www.gov.uk/calculate-your-holiday-entitlement) is the quickest way to confirm the leave side; the [HMRC employment status manual](https://www.gov.uk/hmrc-internal-manuals/employment-status-manual) is the source for tricky part-time vs self-employed cases.\n:::",
    },
  ],
  faq: [
    {
      question: "How do you work out a pro rata salary?",
      answer:
        "Multiply the full-time salary by the fraction of full-time hours worked: pro rata salary = full-time salary × (actual hours ÷ full-time hours). For a £30,000 role based on 37.5 hours, an employee working 20 hours a week earns £30,000 × (20 ÷ 37.5) = £16,000 a year.",
    },
    {
      question: "Is pro rata pay before or after tax?",
      answer:
        "Before tax. The pro rata figure is gross annual pay; income tax and employee National Insurance are then deducted through PAYE in the normal way, based on that lower amount. Use the take-home pay calculator to see the net figure.",
    },
    {
      question: "What is a pro rata calculator used for?",
      answer:
        "A pro rata calculator converts a full-time salary into the equivalent part-time or reduced-hours salary using the hours ratio. It is used by employers setting part-time pay, HR drafting contracts, and employees checking whether an offer matches the full-time equivalent.",
    },
    {
      question: "Does holiday entitlement get pro rated too?",
      answer:
        "Yes. Part-time workers get the statutory 5.6 weeks of leave scaled to their working pattern — someone working 3 days a week gets 16.8 days (3 × 5.6). Bank holidays can be included in that allowance. From April 2024, irregular-hours workers accrue 12.07% of hours worked as holiday.",
    },
    {
      question: "Which hours should I use — contracted or actual?",
      answer:
        "Use contracted, paid working hours for both the full-time and the part-time figure, excluding unpaid breaks. Overtime and occasional extra hours are not part of the pro rata calculation; the FTE is fixed at the contracted pattern.",
    },
    {
      question: "What is the difference between pro rata and annualised hours?",
      answer:
        "Pro rata scales a salary to a fixed weekly hours pattern. Annualised hours spreads pay for irregular patterns (such as term-time-only work) evenly across 12 months, so the employee receives a stable monthly amount. Both use the same FTE fraction.",
    },
    {
      question: "How do I work out a pro rata salary for a part-time job?",
      answer:
        "Take the full-time salary for the same role, divide the part-time hours by the full-time hours to get the FTE, and multiply. For example, £40,000 full-time at 25 hours out of 37.5 = £40,000 × (25 ÷ 37.5) = £26,667 a year.",
    },
    {
      question: "How do you work out pro rata payments for an employee joining mid-year?",
      answer:
        "Calculate the pro rata annual salary first (FTE × full-time salary), then multiply by the fraction of the year the employee will work. Someone joining on 1 October and staying to 31 March has worked 6 of 12 months, so they receive half of the pro rata annual figure — the part-time salary calculator above handles the hours side; the joining date determines the period.",
    },
    {
      question: "What is FTE and how does it relate to pro rata?",
      answer:
        "FTE stands for full-time equivalent. A 0.5 FTE employee works half the standard full-time hours and is paid half the full-time salary. The pro rata figure is always the FTE fraction multiplied by the full-time equivalent salary — and the same FTE is used for pension contributions, statutory pay and holiday entitlement.",
    },
    {
      question: "Is pro rata the same as full-time equivalent (FTE)?",
      answer:
        "Almost. The pro rata salary is the full-time salary × FTE. \"FTE\" usually describes the hours fraction (e.g. 0.6 FTE), while \"pro rata\" usually describes the resulting pay or entitlement. The two terms are used interchangeably in HR and payroll.",
    },
  ],
  relatedSlugs: [],
});
