import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "how-to-calculate-statutory-sick-pay",
  title: "How to Calculate Statutory Sick Pay (SSP) UK 2026/27",
  metaDescription:
    "Step-by-step guide to calculating Statutory Sick Pay in 2026/27: £123.25 weekly rate, 80% of earnings cap, qualifying days, worked examples, and common mistakes to avoid.",
  h1: "How to Calculate Statutory Sick Pay",
  intro:
    "Statutory Sick Pay (SSP) is the legal minimum you must pay eligible employees when they are off work sick. For 2026/27 the weekly rate is **£123.25**, or **80% of average weekly earnings** if that is lower, and it is payable **from the first day of sickness** — the old three waiting days no longer apply. This guide walks through the full calculation for the 2026/27 tax year with worked examples you can copy.\n\n:::callout info\n**Quick answers — how much is SSP and how do you calculate it?**\n\n- **SSP rate 2026/27:** £123.25/week (or 80% of average weekly earnings if lower)\n- **Payable from:** first qualifying day of sickness (no waiting days from 6 April 2026)\n- **Maximum duration:** 28 weeks per period of incapacity for work\n- **Daily rate:** weekly rate ÷ qualifying days per week (e.g. £123.25 ÷ 5 = £24.65/day)\n- **Cap:** 80% of average weekly earnings if lower than £123.25/week\n- **Maximum duration:** 28 weeks per period of incapacity for work\n- **Not recoverable from HMRC** — unlike SMP, employers cannot reclaim SSP\n- **Taxable:** subject to income tax, employee NI, and employer NI\n:::\n\nThis guide walks you through the **full SSP calculation for 2026/27** with the official HMRC rates, worked examples, a daily-rate table, and common mistakes to avoid. All figures are from HMRC's \"Rates and thresholds for employers 2026 to 2027\" on GOV.UK.",
  sections: [
    {
      heading: "Check the employee qualifies for SSP",
      body:
        "Before any maths, confirm the employee is entitled. Under the rules on GOV.UK, an employee generally qualifies if they:\n\n- are classed as an **employee** and have done some work under their contract\n- have been sick for **at least 4 days in a row**, including non-working days\n- follow your sickness reporting rules, as long as they are told to you within any deadline you set (or within 7 days if you have none)\n- have **not already used their full 28 weeks** of SSP entitlement\n\nAgency workers, part-timers and workers on zero-hours contracts can all qualify. If you are unsure, the eligibility checker on GOV.UK is the authoritative reference.",
    },
    {
      heading: "Confirm the period of incapacity for work",
      body:
        "SSP is calculated around a **period of incapacity for work (PIW)**: a run of **4 or more consecutive days of sickness**, counting weekends, bank holidays and other non-working days. A 3-day absence does not create a PIW and no SSP is due.\n\nPeriods of sickness separated by **8 weeks or less link together** and count as one PIW, which matters for the 28-week maximum. From 2026/27 there are **no waiting days**: once a PIW exists, SSP is payable from the **first qualifying day** of sickness rather than the fourth. If your payroll software still shows waiting days, check it is updated for the 2026/27 rules.\n\n:::callout info\n**PIW at a glance:** 4+ consecutive sick days = 1 PIW. Linked if ≤ 8 weeks apart. SSP from day 1 of PIW. Max 28 weeks per PIW.\n:::",
    },
    {
      heading: "Work out average weekly earnings (AWE)",
      body:
        "Average weekly earnings (AWE) are based on the employee's gross pay in a set look-back window — the **relevant period**. This is normally at least **8 weeks of earnings** ending on the last normal payday before the first day of sickness.\n\nTo calculate AWE:\n\n1. **Add up all gross earnings** in the relevant period — including overtime, commission and bonuses that attract Class 1 National Insurance.\n2. **Count the number of weeks** (or part-weeks) the period covers.\n3. **Divide the total by that number of weeks**.\n\nFor monthly-paid staff, GOV.UK guidance lets you convert by treating the relevant period in weeks — typically two months of pay divided by the matching number of weeks. AWE drives the 80% test in the next step, so keep the working on file.",
    },
    {
      heading: "Apply the weekly rate: £123.25 or 80% of AWE",
      body:
        "For 2026/27 the SSP weekly rate is **£123.25**. However, if **80% of the employee's average weekly earnings is lower** than £123.25, you pay that lower figure instead. This protects lower-paid and part-time staff from receiving more in sick pay than they would normally earn.\n\n:::callout info\n**SSP weekly rate formula:**\n\n**SSP weekly = min(£123.25, 80% × average weekly earnings)**\n\nIf 80% of AWE ≥ £123.25 → use £123.25/week\nIf 80% of AWE < £123.25 → use 80% of AWE\n:::\n\nExample: an employee with AWE of £140 has 80% of £140 = £112, so their weekly SSP is **£112**, not £123.25.",
    },
    {
      heading: "Set the qualifying days and daily rate",
      body:
        "SSP is only paid for **qualifying days** — the days of the week the employee normally works. For a standard Monday-to-Friday employee there are **5 qualifying days**; a part-timer working Tuesday–Thursday has **3**.\n\nThe **daily SSP rate** is the weekly rate divided by the number of qualifying days:\n\n:::table\n| Qualifying days per week | Daily SSP rate (full £123.25 rate) |\n|---|---|\n| 7 | £17.61 |\n| 6 | £20.55 |\n| 5 | £24.65 |\n| 4 | £30.81 |\n| 3 | £41.08 |\n| 2 | £61.63 |\n| 1 | £123.25 |\n:::\n\nYou then pay the daily rate for each qualifying day that falls within the sickness period. Days the employee would not have worked anyway are excluded from payment but still count towards the 4-day PIW test.",
    },
    {
      heading: "Worked example: a five-day week",
      body:
        "An employee earning **average weekly pay of £350** works Monday to Friday and is off sick from **Monday 8 June to Saturday 13 June 2026**. Step by step:\n\n1. **PIW check:** 6 consecutive days of sickness → 4-day test met.\n2. **Waiting days:** none apply from 2026/27 → SSP runs from day one.\n3. **80% of £350 = £280** → above £123.25 → weekly rate = **£123.25**.\n4. **Daily rate:** £123.25 ÷ 5 qualifying days = **£24.65**.\n5. **Sick qualifying days:** Monday–Friday = **5 days** (Saturday not a qualifying day).\n6. **Total SSP due:** 5 × £24.65 = **£123.25**.\n\nIf the same employee had AWE of £140, the weekly rate would be **80% of £140 = £112**, the daily rate **£22.40**, and the payment 5 × £22.40 = **£112**.\n\n:::callout tip\n**Use our SSP calculator** to enter AWE, qualifying days and sick days — it does all the maths in one click and shows both the weekly and daily rates.\n:::",
    },
    {
      heading: "Worked example: lower earner with 80% AWE cap",
      body:
        "An employee earning **AWE of £140** works **3 qualifying days** (Tue–Thu) and is off sick for **4 qualifying days**.\n\n1. 80% of AWE = 80% × £140 = **£112/week** (below £123.25).\n2. Daily rate = £112 ÷ 3 = **£37.33**.\n3. SSP due = 4 days × £37.33 = **£149.32**.\n\nThis shows why the 80% AWE cap matters: a lower earner on fewer qualifying days gets a higher daily rate but a lower weekly total.",
    },
    {
      heading: "Pay, record and report SSP correctly",
      body:
        "SSP is paid through payroll on the employee's normal payday and is treated as earnings: deduct income tax and employee National Insurance, and add employer NI at **15% above the £5,000 secondary threshold** in the usual way. Employees can self-certify for the first 7 calendar days; after that you can ask for a fit note.\n\nHMRC expects you to keep records of each sickness absence, the PIW dates, qualifying days and every SSP payment, and to include SSP in your Full Payment Submission. Unlike Statutory Maternity Pay — where employers recover **92%**, or **109%** if total Class 1 NI is £45,000 or less — **SSP cannot be recovered from HMRC**. It is a straight employer cost, which is why accurate calculation matters.",
    },
    {
      heading: "Common SSP mistakes to avoid",
      body:
        "The errors that most often trigger disputes or HMRC queries:\n\n- **Still deducting 3 waiting days** — these were removed from the 2026/27 tax year.\n- **Paying the flat £123.25 to low earners** without applying the 80% of AWE cap.\n- **Paying SSP for non-qualifying days**, or ignoring linked sickness periods within 8 weeks.\n- **Paying beyond the 28-week maximum** instead of issuing form SSP1 so the employee can claim other support (Universal Credit or ESA).\n- **Trying to reclaim SSP from HMRC** — the recovery scheme that exists for maternity and other statutory payments does not cover SSP.\n\n:::callout warn\n**SSP is NOT recoverable from HMRC.** The recovery scheme that applies to SMP/SPP/ShPP/SAP (92% normally, 109% if total Class 1 NI ≤ £45,000) does NOT cover SSP. It is a straight employer cost.\n:::\n\nYou can sanity-check any calculation against the **SSP calculator** on this site before running payroll.",
    },
    {
      heading: "SSP daily rate at common qualifying-day patterns",
      body:
        "The weekly SSP rate is the same for everyone, but the daily rate depends on how many days a week the employee is contracted to work. A part-time worker on three days a week receives more per day than a full-time worker on five days, because the same weekly SSP total is spread over fewer qualifying days.\n\n:::table\n| Qualifying days per week | Daily SSP rate | Weekly SSP (full £123.25 rate) |\n|---|---|---|\n| 7 | £17.61 | £123.25 |\n| 6 | £20.55 | £123.25 |\n| 5 | £24.65 | £123.25 |\n| 4 | £30.81 | £123.25 |\n| 3 | £41.08 | £123.25 |\n| 2 | £61.63 | £123.25 |\n| 1 | £123.25 | £123.25 |\n:::\n\nWhere 80% of average weekly earnings is lower than £123.25, the lower figure is used across the week. A low earner on £120 a week AWE, for example, would receive £96 a week in SSP — or £19.20 per day on a five-day pattern.",
    },
  ],
  faq: [
    {
      question: "How much is SSP per day in 2026/27?",
      answer:
        "There is no single daily rate — it is the weekly rate divided by the employee's qualifying days. For a full-time employee on a 5-day week, £123.25 ÷ 5 = **£24.65 per day**. A part-timer with 3 qualifying days gets **£41.08 per day** at the full statutory rate.",
    },
    {
      question: "Do waiting days still apply to SSP?",
      answer:
        "No. From 6 April 2026, SSP is payable from the first qualifying day of sickness. The previous rule requiring three unpaid waiting days before SSP started no longer applies.",
    },
    {
      question: "Can employers reclaim SSP from HMRC?",
      answer:
        "No. SSP is entirely an employer cost. The recovery scheme that lets employers reclaim 92% (or 109% for small employers with total Class 1 NI ≤ £45,000) applies to Statutory Maternity Pay and similar payments, but not to SSP.",
    },
    {
      question: "How long can an employee receive SSP?",
      answer:
        "A maximum of **28 weeks** in any one period of incapacity for work. Linked periods (spells of 4+ days separated by 8 weeks or less) count as one. After SSP ends, employees may be able to claim Universal Credit or new-style Employment and Support Allowance (ESA) from DWP.",
    },
    {
      question: "Is Statutory Sick Pay taxable?",
      answer:
        "Yes. SSP is treated as earnings, so you deduct income tax and employee National Insurance through PAYE, and pay employer National Insurance on it in the normal way.",
    },
    {
      question: "How much is SSP per day in 2026/27?",
      answer:
        "The daily SSP rate is the weekly rate (£123.25, or 80% of AWE if lower) divided by the employee's qualifying days per week. At the full rate: 5 days = **£24.65/day**, 4 days = **£30.81**, 3 days = **£41.08**, 2 days = **£61.63**, 1 day = **£123.25**. Where 80% of AWE is lower, use that figure instead.",
    },
    {
      question: "How much is SSP per week in 2026/27?",
      answer:
        "The SSP weekly rate for 2026/27 is **£123.25**, or 80% of the employee's average weekly earnings if that is lower. The rate is set out on GOV.UK in HMRC's \"Rates and thresholds for employers 2026 to 2027\" guidance.",
    },
    {
      question: "How much is statutory sick pay per day?",
      answer:
        "Statutory Sick Pay per day is the weekly rate (£123.25, or 80% of AWE if lower) divided by the employee's qualifying days per week. At the full rate: 5 days = £24.65, 4 days = £30.81, 3 days = £41.08, 2 days = £61.63, 1 day = £123.25.",
    },
    {
      question: "How do you work out statutory sick pay step by step?",
      answer:
        "1. Check the employee qualifies (employee, 4+ consecutive sick days, earns ≥ £129/week AWE). 2. Confirm the period of incapacity for work (4+ consecutive days). 3. Calculate average weekly earnings (AWE) over the relevant period. 4. SSP weekly = min(£123.25, 80% of AWE). 5. Divide by qualifying days per week for the daily rate. 6. Multiply daily rate by sick qualifying days. Use the SSP calculator above for instant results.",
    },
    {
      question: "How much is SSP pay per day for a part-time employee?",
      answer:
        "For a part-time employee with 3 qualifying days per week, the daily SSP rate at the full £123.25 weekly rate is **£41.08 per day**. With 4 qualifying days it is **£30.81/day**, with 2 days it is **£61.63/day**. Where 80% of AWE is lower, the daily rate is lower proportionally.",
    },
    {
      question: "What is the SSP rate for 2026/27?",
      answer:
        "The SSP weekly rate for 2026/27 is **£123.25**, or 80% of average weekly earnings if lower. The rate took effect from 6 April 2026 and applies to any spell of sickness starting on or after that date.",
    },
    {
      question: "How does SSP work with company sick pay?",
      answer:
        "If your company sick pay scheme is more generous than SSP, you receive the company amount and SSP is effectively absorbed. If it is less generous, your employer must top you up to SSP — that is the legal floor. Where the company scheme has waiting days, SSP (with no waiting days from 6 April 2026) is paid from day 1.",
    },
    {
      question: "Can employers reclaim SSP from HMRC?",
      answer:
        "No. Employers bear the full cost of SSP — there is no statutory recovery scheme, unlike Statutory Maternity Pay, where 92% (or 109% for small employers with total Class 1 NI ≤ £45,000) can be reclaimed through PAYE.",
    },
  ],
  relatedSlugs: [
    "ssp-calculator",
    "sick-pay-calculator",
    "ssp-vs-company-sick-pay",
    "bradford-factor-calculator",
    "how-much-does-it-cost-to-employ-someone",
  ],
});