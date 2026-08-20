import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "ssp-calculator",
  kind: "ssp",
  title: "SSP Calculator UK 2026/27 — SSP Rate, Weekly & Daily Amount",
  metaDescription:
    "How much is SSP in 2026/27? SSP rate £123.25/week (or 80% of AWE), from day 1 for up to 28 weeks. Work out the weekly statutory sick pay, the daily rate for SSP, and the total SSP amount. Free UK calculator.",
  h1: "SSP Calculator",
  intro:
    "How much is Statutory Sick Pay? For 2026/27 the **SSP rate is £123.25 a week** — or 80% of your average weekly earnings if that is lower — paid from the first qualifying day of sickness for up to 28 weeks. This SSP calculator works out the **weekly rate of SSP**, the **daily rate for SSP**, and the **SSP amount** owed to an employee over a spell of sickness, using the official HMRC rules in force from 6 April 2026.\n\n:::callout info\n**The new SSP rates for 2026/27:** £123.25 a week (the **SSP weekly rate** for 2026/27), or 80% of average weekly earnings if lower. The **statutory sick pay daily rate** depends on how many qualifying days the employee works per week. The **SSP amount** for a spell is the daily rate multiplied by the qualifying days of sickness, up to 28 weeks.\n:::",
  formulaExplainer:
    ":::callout info\n**SSP amount = lower of £123.25 or 80% of average weekly earnings, divided by the qualifying days per week, multiplied by the sick days in the spell.**\n\nThe days are capped at 28 weeks' worth of qualifying days, so a five-day worker cannot receive more than 140 SSP days in a single period of incapacity for work.\n:::\n\nQualifying days are the contracted working days in the employee's week. A five-day worker has a daily SSP rate of **£24.65** at the full statutory amount; a three-day worker has a daily rate of **£41.08**; a six-day worker has a daily rate of **£20.55**. Where 80% of average weekly earnings is lower than £123.25, that lower figure is used across the week.\n\n:::callout tip\n**Quick answers — how much is SSP?**\n\n- **New SSP rates 2026/27:** £123.25 a week from 6 April 2026.\n- **SSP weekly rate:** £123.25 (or 80% of AWE if lower).\n- **Statutory sick pay daily rate:** weekly rate ÷ qualifying days per week.\n- **How much is SSP per day:** £24.65 (5 days), £41.08 (3 days), £123.25 (1 day) at the full rate.\n- **How much is SSP per week:** £123.25 at the full rate.\n- **How much is SSP a week:** same as the weekly rate — £123.25, or 80% of AWE if lower.\n- **How much is SSP pay per day for a 5-day employee:** £24.65 at the full rate.\n- **How much is SSP UK:** £123.25 a week, set by HMRC, applies across the UK.\n- **Statutory sick pay how much per week:** £123.25 (or 80% of AWE if lower).\n- **How much is statutory sick pay per day:** the daily rate above, depending on qualifying days.\n- **What is S.S.P:** Statutory Sick Pay — the minimum amount UK employers must pay employees off work because of illness or injury.\n- **Rate for SSP:** see GOV.UK \"Rates and thresholds for employers\" for the current weekly rate.\n:::",
  howToSteps: [
    {
      name: "Enter the number of days of sickness",
      text: "Type the number of qualifying days the employee has been off sick in this spell of incapacity for work. The calculator caps the total at 28 weeks' worth of qualifying days, so a five-day worker cannot be paid for more than 140 days in a single spell.",
    },
    {
      name: "Enter the qualifying days per week",
      text: "Set the number of days the employee is contracted to work each week. Most full-time employees have five; part-time workers may have two, three or four. The calculator uses this to work out the daily SSP rate from the weekly figure.",
    },
    {
      name: "Enter the average weekly earnings",
      text: "Add the employee's gross average weekly earnings, before tax and National Insurance. SSP is paid at the lower of £123.25 and 80% of this figure, so a higher earner is not always entitled to more statutory sick pay.",
    },
    {
      name: "Read the SSP rate and the total amount",
      text: "The calculator shows two figures: the **SSP weekly rate** and the **total SSP amount** for the spell. Days beyond 28 weeks' worth of qualifying days are not paid, even if the employee is still off sick.",
    },
  ],
  inlineWidgets: [
    {
      type: "barChart",
      afterSectionHeading: "SSP rate and daily rate at common working patterns",
      title: "SSP daily rate by qualifying days per week",
      unit: "SSP weekly rate: £123.25 for 2026/27 (or 80% of AWE if lower)",
      data: [
        { label: "7 days", value: 17.61, caption: "7-day week" },
        { label: "6 days", value: 20.55, caption: "6-day week" },
        { label: "5 days", value: 24.65, caption: "Full-time" },
        { label: "4 days", value: 30.81, caption: "Part-time" },
        { label: "3 days", value: 41.08, caption: "Part-time" },
        { label: "2 days", value: 61.63, caption: "Part-time" },
      ],
    },
  ],
  sections: [
    {
      heading: "What is Statutory Sick Pay?",
      body:
        "**Statutory Sick Pay (SSP)** is the minimum amount UK employers must pay employees who are off work because of illness or injury. It is a statutory right set by HMRC and paid through the normal payroll, with income tax and employee National Insurance deducted in the usual way.\n\nSSP is sometimes confused with company or occupational sick pay, with Statutory Maternity Pay, and with sick pay from DWP benefits such as new-style Employment and Support Allowance (ESA). The three are separate: SSP is paid by the employer, SMP is paid by the employer but partly recoverable from HMRC, and ESA is a state benefit paid by DWP. The calculator on this page is for SSP only.",
    },
    {
      heading: "What is the SSP rate in 2026/27?",
      body:
        "**What is the SSP rate in 2026/27?** The SSP rate for 2026/27 is **£123.25 a week**. The rate is reviewed each tax year and is set out on GOV.UK in HMRC's \"Rates and thresholds for employers\" guidance. SSP is paid at the lower of £123.25 and 80% of the employee's average weekly earnings, so a low earner may receive less than the headline weekly rate.\n\nThe 2026/27 rate took effect from 6 April 2026. There are no transitional arrangements — the new weekly rate applies to any spell of sickness that starts on or after 6 April 2026, and the 2025/26 rate of £118.75 a week continues to apply only to spells that started before 6 April 2026. The page below shows the **SSP rate** at each common qualifying-day pattern, so you can see the **SSP weekly rate**, the **SSP daily rate**, and the resulting **SSP amount** in one place.",
    },
    {
      heading: "How does SSP work?",
      body:
        "**How does SSP work?** SSP is paid through the normal payroll as earnings. The employer works out the **daily rate for SSP** by dividing the **SSP weekly rate** by the number of qualifying days in the employee's normal working week, multiplies that by the number of qualifying days the employee is off sick in the spell, and pays the result. Income tax, employee National Insurance and employer National Insurance all apply to SSP in the usual way.\n\nThe process is the same whether the employee is full-time, part-time, on a zero-hours contract, or an agency worker — the only things that change are the **SSP daily rate** (more days worked = lower daily rate) and the cap on the total number of SSP days (28 weeks' worth of qualifying days, so more days worked = more SSP days in cash terms).",
    },
    {
      heading: "SSP rate and daily rate at common working patterns",
      body:
        "The **SSP weekly rate** is the same for everyone, but the **SSP daily rate** depends on how many days a week the employee is contracted to work. A part-time worker on three days a week receives more per day than a full-time worker on five days, because the same total SSP amount is spread over fewer qualifying days. The chart below shows the **statutory sick pay daily rate** at each common qualifying-day pattern.\n\n:::table\n| Qualifying days per week | Daily SSP rate (statutory sick pay daily rate) | Weekly SSP rate (weekly statutory sick pay) |\n|---|---|---|\n| 7 | £17.61 | £123.25 |\n| 6 | £20.55 | £123.25 |\n| 5 | £24.65 | £123.25 |\n| 4 | £30.81 | £123.25 |\n| 3 | £41.08 | £123.25 |\n| 2 | £61.63 | £123.25 |\n| 1 | £123.25 | £123.25 |\n:::\n\nWhere 80% of average weekly earnings is lower than £123.25, the lower figure is used across the week. A low earner on £120 a week AWE, for example, would receive £96 a week in SSP — or £19.20 per day on a five-day pattern.",
    },
    {
      heading: "How much SSP per day, per week, and over 28 weeks?",
      body:
        "The three figures most people want to know — the **SSP weekly rate**, the **daily rate for SSP**, and the **SSP amount** for a 28-week period.\n\n- **How much is SSP per week** (the **SSP weekly rate**): £123.25 (or 80% of average weekly earnings if lower).\n- **How much is SSP per day** (the **SSP daily rate**): weekly rate ÷ qualifying days per week. The full daily rate is £24.65 for a five-day employee, £41.08 for three days, £30.81 for four days, £61.63 for two days and £123.25 for a one-day worker.\n- **SSP amount over 28 weeks (full statutory period):** £123.25 × 28 = **£3,451.00**, before any 80% AWE cap or qualifying-day adjustment.\n\nThese are the maximum statutory figures. A lower earner receiving 80% of AWE, or a part-time employee on fewer qualifying days, will receive less overall because the daily rate is lower — but they will also be paid for up to 28 weeks' worth of qualifying days, which can mean fewer days in cash terms for the same 28-week period.",
    },
    {
      heading: "SSP daily rate worked example",
      body:
        "A five-day employee earns £600 a week on average and is off sick for seven qualifying days in a row.\n\n- Weekly SSP payable: lower of £123.25 or 80% of £600 = lower of £123.25 and £480 = **£123.25**.\n- Daily SSP rate: £123.25 ÷ 5 = **£24.65**.\n- Total SSP for 7 days: £24.65 × 7 = **£172.55**.\n\nNow change the AWE to £100 a week. The 80% AWE figure is £80, which is lower than £123.25, so the weekly SSP becomes £80 and the daily rate becomes £80 ÷ 5 = £16.00. Total SSP for the same 7 days: £16.00 × 7 = **£112.00**.\n\nThe calculator does this arithmetic in one step: enter the days, the qualifying days per week, and the AWE, and it returns both the weekly rate and the total amount.",
    },
    {
      heading: "When SSP starts and how long it lasts",
      body:
        "From 6 April 2026, **SSP is payable from the first qualifying day of sickness**. The previous three unpaid waiting days were removed by HMRC, so there is no longer a qualifying-period delay for new spells.\n\nSSP can be paid for up to **28 weeks** in any one period of incapacity for work. Linked spells — periods of sickness separated by eight weeks or less — are treated as a single period for SSP purposes, so a short return to work does not reset the 28-week clock. After SSP ends, employees who are still unfit may be able to claim Universal Credit or new-style Employment and Support Allowance (ESA) from DWP.\n\n:::callout tip\nA **period of incapacity for work (PIW)** is a stretch of four or more consecutive sick days, including non-working days. SSP only starts to accrue once a PIW of four or more days has built up, even though the first day of payment is the first qualifying day of that PIW.\n:::",
    },
    {
      heading: "Who is eligible for SSP",
      body:
        "An employee qualifies for SSP if all of the following apply, as set out on GOV.UK.\n\n- They are classed as an employee (not self-employed or a worker on a contract for services).\n- They have been off sick for **at least four consecutive days** in a row, including non-working days. This is the period of incapacity for work, or PIW.\n- They earn on average at least **£129 a week** — the Lower Earnings Limit used for Class 1 National Insurance in 2026/27.\n- They tell their employer they are sick, in line with the employer's own absence-reporting rules.\n\nAgency workers, casual staff and those on zero-hours contracts can all qualify, provided the eligibility rules above are met. Self-employed people cannot claim SSP, but may be able to claim new-style ESA.",
    },
    {
      heading: "SSP and company sick pay",
      body:
        "Many employers pay **occupational (company) sick pay** on top of or instead of SSP. Occupational schemes almost always pay at least as much as SSP, and frequently more, but the rules vary widely — some have waiting days, some pay a percentage of salary, and some only kick in after a length-of-service threshold.\n\nSSP is the legal floor: if an employee is eligible for SSP, the employer must pay at least that amount. Where company sick pay is more generous, the employer pays the higher amount and can use the SSP figure to recover part of the cost through a contractual sick pay scheme, where one exists. Where company sick pay is less generous — vanishingly rare — the employer must still top up to SSP.\n\n:::table\n| Scheme type | How it interacts with SSP |\n|---|---|\n| Company sick pay ≥ SSP | Employer pays the company amount; SSP is absorbed but the legal floor is met. |\n| Company sick pay < SSP | Employer must top up to SSP — the legal floor is statutory. |\n| No company scheme | Employee receives SSP only. |\n| Company scheme with waiting days | SSP (no waiting days from 6 April 2026) is paid from day 1; company scheme may start later. |\n| Company scheme capped at a number of weeks | SSP continues up to 28 weeks when the company scheme ends. |\n:::",
    },
    {
      heading: "Tax, National Insurance and pension on SSP",
      body:
        "SSP is paid through the normal payroll, so it is treated as earnings for the period it covers. Income tax and employee National Insurance are deducted in the usual way; employer National Insurance is also due on the SSP amount. SSP counts as pensionable pay for any scheme that uses qualifying earnings, and as earnings for the auto-enrolment trigger.\n\nThis is one of the reasons SSP is more expensive for the employer than it first appears: at 15% employer NI above the £5,000 secondary threshold, a £123.25 weekly SSP payment for 28 weeks (max £3,451) carries about £500 of employer NI on top.",
    },
    {
      heading: "Can an employer reclaim SSP from HMRC?",
      body:
        "**No.** Employers bear the full cost of SSP. There is no statutory recovery scheme, unlike Statutory Maternity Pay, where 92% (or 109% for small employers) can be reclaimed through PAYE.\n\nThis is one reason SSP is treated as a payroll cost rather than a recoverable statutory payment in management accounts. The small-employer Employment Allowance of £10,500 a year off the employer NI bill is the only regular offset, and it goes against the NI element rather than the SSP itself.",
    },
    {
      heading: "Common SSP mistakes to avoid",
      body:
        "Five errors crop up repeatedly in payroll and HR.\n\n- **Treating SSP as a contractual benefit that can be withheld.** It cannot — it is a statutory right for any qualifying employee.\n- **Applying a waiting day when none is due.** From 6 April 2026 there are no unpaid waiting days for new spells.\n- **Splitting linked spells to extend the 28-week window.** Spells separated by eight weeks or less are one PIW.\n- **Forgetting to count the four-day qualifying period.** SSP only becomes payable once a PIW of four or more days has built up.\n- **Using the wrong figure for qualifying days.** Use the contracted pattern, not the days the employee actually worked in the period.\n\n:::callout warn\n**SSP cannot be offset against other benefits the employee is receiving.** An employee who is also receiving statutory maternity pay, paternity pay, or shared parental pay for the same period is not entitled to SSP for those days. Don't double-pay.\n:::",
    },
    {
      heading: "Summary: how to use this SSP calculator",
      body:
        "Enter the **days of sickness**, the employee's **qualifying days per week** and their **average weekly earnings**, and the calculator does the rest. The result shows the **SSP weekly rate** and the **total SSP amount** for the spell.\n\nFor the 2026/27 tax year the headline SSP rate is **£123.25 a week** (or 80% of AWE if lower), payable from the first qualifying day of sickness for up to 28 weeks in any one period of incapacity for work. The result is an estimate based on HMRC's 2026/27 SSP rules, not a payroll guarantee. For day-to-day decisions about absence and pay the figures are reliable; for final payroll, always reconcile against the actual pay run and keep a record of the four-day PIW check.",
    },
  ],
  faq: [
    {
      question: "How much is Statutory Sick Pay in 2026/27?",
      answer:
        "£123.25 a week, or 80% of the employee's average weekly earnings if that is lower. SSP is paid from the first qualifying day of sickness and can continue for up to 28 weeks in any one period of incapacity for work. The rate is set out on GOV.UK in HMRC's \"Rates and thresholds for employers 2026 to 2027\" guidance.",
    },
    {
      question: "What is the SSP weekly rate?",
      answer:
        "£123.25 a week for 2026/27 (from 6 April 2026). For 2025/26 it was £118.75 a week. The rate is reviewed each tax year and applies to any spell of sickness that starts on or after the rate-change date.",
    },
    {
      question: "What is the SSP daily rate?",
      answer:
        "The daily SSP rate is the weekly rate (£123.25, or 80% of AWE if lower) divided by the employee's qualifying days per week. A five-day worker has a daily rate of £24.65; a three-day worker £41.08; a six-day worker £20.55; a four-day worker £30.81; a two-day worker £61.63; a one-day worker £123.25.",
    },
    {
      question: "How much is SSP per day?",
      answer:
        "SSP per day is the weekly SSP amount divided by the number of qualifying days in the employee's normal working week. At the 2026/27 full rate of £123.25 a week, the daily rate is £24.65 for a five-day worker, £41.08 for a three-day worker, and so on. Where 80% of average weekly earnings is lower, the daily rate is calculated on the lower figure.",
    },
    {
      question: "How much is SSP per week?",
      answer:
        "£123.25 a week for 2026/27, or 80% of the employee's average weekly earnings if that is lower. The same weekly rate applies whether the employee is full-time, part-time, or on a zero-hours contract — what changes is the daily rate, which is the weekly rate divided by their qualifying days per week.",
    },
    {
      question: "How much is Statutory Sick Pay per day?",
      answer:
        "Statutory Sick Pay per day is the weekly rate of £123.25 (2026/27), or 80% of average weekly earnings if lower, divided by the employee's contracted qualifying days per week. A five-day employee receives £24.65 per qualifying day of sickness; a three-day employee receives £41.08 per day.",
    },
    {
      question: "How much SSP will I get for 4 weeks off?",
      answer:
        "Four working weeks (20 qualifying days for a five-day employee) at the full SSP rate of £123.25 a week comes to **£493.00**. The exact figure depends on your qualifying days and your average weekly earnings — the calculator above works it out for your pattern.",
    },
    {
      question: "Is there a waiting period before SSP starts?",
      answer:
        "No. From 6 April 2026 SSP is payable from day 1 of sickness; the previous three unpaid waiting days were removed. SSP still requires a period of incapacity for work of four or more consecutive days before it can start, but the first payment is the first qualifying day of that period.",
    },
    {
      question: "How long can SSP be paid for?",
      answer:
        "A maximum of 28 weeks in a single period of incapacity for work. Linked periods (spells of 4+ days separated by 8 weeks or less) count as one. After SSP ends, employees may be able to claim Universal Credit or new-style Employment and Support Allowance (ESA) from DWP.",
    },
    {
      question: "What counts as a qualifying day for SSP?",
      answer:
        "A qualifying day is any day of the week on which the employee is contracted to work. Most full-time employees have five. Non-working days are not qualifying days, so SSP is not paid for them — a five-day employee off for a calendar week is paid for five SSP days, not seven.",
    },
    {
      question: "Can employers reclaim SSP from HMRC?",
      answer:
        "No. Employers bear the full cost of SSP — there is no statutory recovery scheme, unlike Statutory Maternity Pay, where 92% (or 109% for small employers) can be reclaimed through PAYE.",
    },
    {
      question: "Does SSP count as earnings for tax and pension?",
      answer:
        "Yes. SSP is paid through the normal payroll, so it is subject to income tax and employee National Insurance in the usual way, and counts towards pensionable pay where the scheme includes it. Employer National Insurance is also due on the SSP amount.",
    },
    {
      question: "How is SSP calculated for part-time employees?",
      answer:
        "The same way as for full-time employees — by the lower of £123.25 a week or 80% of average weekly earnings, divided by the employee's qualifying days per week. The daily rate is higher for part-time workers (because the same weekly figure is divided by fewer days), but the maximum total is still 28 weeks' worth of qualifying days.",
    },
    {
      question: "How does SSP work with company sick pay?",
      answer:
        "If your company sick pay scheme is more generous than SSP, you receive the company amount and SSP is effectively absorbed. If it is less generous, your employer must top you up to SSP — that is the legal floor. Where the company scheme has waiting days, SSP (with no waiting days from 6 April 2026) is paid from day 1.",
    },
    {
      question: "What are the new SSP rates for 2026/27?",
      answer:
        "The SSP rate from 6 April 2026 is **£123.25 a week**, up from £118.75 in 2025/26. The rate applies to any spell of sickness that starts on or after 6 April 2026. There are no other SSP rate changes — the 80% of average weekly earnings cap and the 28-week maximum remain unchanged.",
    },
  ],
  relatedSlugs: [],
});
