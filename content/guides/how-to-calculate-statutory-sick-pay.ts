import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "how-to-calculate-statutory-sick-pay",
  title: "How to Calculate Statutory Sick Pay (SSP) UK",
  metaDescription:
    "Step-by-step guide to calculating Statutory Sick Pay in 2026/27: the £123.25 weekly rate, the 80% of earnings rule, qualifying days and worked examples.",
  h1: "How to Calculate Statutory Sick Pay",
  intro:
    "Statutory Sick Pay (SSP) is the legal minimum you must pay eligible employees when they are off work sick. From 6 April 2026 the weekly rate is £123.25, or 80% of the employee's average weekly earnings if that is lower, and it is payable from the first day of sickness — the old three waiting days no longer apply. This guide walks through the full calculation for the 2026/27 tax year with worked examples you can copy.",
  sections: [
    {
      heading: "Check the employee qualifies for SSP",
      body: "Before any maths, confirm the employee is entitled. Under the rules on GOV.UK, an employee generally qualifies if they:\n\n- are classed as an employee and have done some work under their contract\n- have been sick for at least 4 days in a row, including non-working days\n- follow your sickness reporting rules, as long as they are told to you within any deadline you set (or within 7 days if you have none)\n- have not already used their full 28 weeks of SSP entitlement\n\nAgency workers, part-timers and workers on zero-hours contracts can all qualify. If you are unsure, the eligibility checker on GOV.UK is the authoritative reference.",
    },
    {
      heading: "Confirm the period of incapacity for work",
      body: "SSP is calculated around a period of incapacity for work (PIW): a run of 4 or more consecutive days of sickness, counting weekends, bank holidays and other non-working days. A 3-day absence does not create a PIW and no SSP is due.\n\nPeriods of sickness separated by 8 weeks or less link together and count as one PIW, which matters for the 28-week maximum. From 2026/27 there are no waiting days: once a PIW exists, SSP is payable from the first qualifying day of sickness rather than the fourth. If your payroll software still shows waiting days, check it is updated for the 2026/27 rules.",
    },
    {
      heading: "Work out average weekly earnings",
      body: "Average weekly earnings (AWE) are based on the employee's gross pay in a set look-back window — the relevant period. This is normally at least 8 weeks of earnings ending on the last normal payday before the first day of sickness.\n\nTo calculate AWE:\n\n- add up all gross earnings in the relevant period, including overtime, commission and bonuses that attract Class 1 National Insurance\n- count the number of weeks (or part-weeks) the period covers\n- divide the total by that number of weeks\n\nFor monthly-paid staff, GOV.UK guidance lets you convert by treating the relevant period in weeks — typically two months of pay divided by the matching number of weeks. AWE drives the 80% test in the next step, so keep the working on file.",
    },
    {
      heading: "Apply the weekly rate: £123.25 or 80% of AWE",
      body: "For 2026/27 the SSP weekly rate is £123.25. However, if 80% of the employee's average weekly earnings is lower than £123.25, you pay that lower figure instead. This protects lower-paid and part-time staff from receiving more in sick pay than they would normally earn.\n\nThe comparison is simple:\n\n- calculate 80% of AWE\n- if it is £123.25 or more, the weekly SSP rate is £123.25\n- if it is below £123.25, the weekly SSP rate is that 80% figure\n\nExample: an employee with AWE of £140 has 80% of £112, so their weekly SSP is £112, not £123.25.",
    },
    {
      heading: "Set the qualifying days and daily rate",
      body: "SSP is only paid for qualifying days — the days of the week the employee normally works. For a standard Monday-to-Friday employee there are 5 qualifying days; a part-timer working Tuesday to Thursday has 3.\n\nThe daily SSP rate is the weekly rate divided by the number of qualifying days:\n\n- weekly rate £123.25 over 5 qualifying days = £24.65 per day\n- weekly rate £112 over 3 qualifying days = £37.33 per day (rounded to the nearest penny)\n\nYou then pay the daily rate for each qualifying day that falls within the sickness period. Days the employee would not have worked anyway are excluded from payment but still count towards the 4-day PIW test.",
    },
    {
      heading: "Worked example: a five-day week",
      body: "An employee earning average weekly pay of £350 works Monday to Friday and is off sick from Monday 8 June to Saturday 13 June 2026. Step by step:\n\n- PIW check: 6 consecutive days of sickness, so the 4-day test is met\n- Waiting days: none apply from 2026/27, so SSP runs from day one\n- 80% of £350 is £280, which is above £123.25, so the weekly rate is £123.25\n- Daily rate: £123.25 ÷ 5 qualifying days = £24.65\n- Sick qualifying days: Monday to Friday = 5 days (Saturday is not a qualifying day)\n- Total SSP due: 5 × £24.65 = £123.25\n\nIf the same employee had AWE of £140, the weekly rate would be 80% of £140 = £112, the daily rate £22.40, and the payment 5 × £22.40 = £112.",
    },
    {
      heading: "Pay, record and report SSP correctly",
      body: "SSP is paid through payroll on the employee's normal payday and is treated as earnings: deduct income tax and employee National Insurance, and add employer NI at 15% above the £5,000 secondary threshold in the usual way. Employees can self-certify for the first 7 calendar days; after that you can ask for a fit note.\n\nHMRC expects you to keep records of each sickness absence, the PIW dates, qualifying days and every SSP payment, and to include SSP in your Full Payment Submission. Unlike Statutory Maternity Pay — where employers recover 92%, or 109% if total Class 1 NI is £45,000 or less — SSP cannot be recovered from HMRC. It is a straight employer cost, which is why accurate calculation matters.",
    },
    {
      heading: "Common SSP mistakes to avoid",
      body: "The errors that most often trigger disputes or HMRC queries:\n\n- still deducting 3 waiting days — these were removed from the 2026/27 tax year\n- paying the flat £123.25 to low earners without applying the 80% of AWE cap\n- paying SSP for non-qualifying days, or ignoring linked sickness periods within 8 weeks\n- paying beyond the 28-week maximum instead of issuing form SSP1 so the employee can claim other support\n- trying to reclaim SSP from HMRC — the recovery scheme that exists for maternity and other statutory payments does not cover SSP\n\nYou can sanity-check any calculation against the SSP calculator on this site before running payroll.",
    },
  ],
  faq: [
    {
      question: "How much is SSP per day in 2026/27?",
      answer:
        "There is no single daily rate — it is the weekly rate divided by the employee's qualifying days. For a full-time employee on a 5-day week, £123.25 ÷ 5 = £24.65 per day. A part-timer with 3 qualifying days gets £41.08 per day at the full weekly rate.",
    },
    {
      question: "Do waiting days still apply to SSP?",
      answer:
        "No. From the 2026/27 tax year, SSP is payable from the first qualifying day of sickness. The previous rule requiring three unpaid waiting days before SSP started no longer applies.",
    },
    {
      question: "Can employers reclaim SSP from HMRC?",
      answer:
        "No. SSP is entirely an employer cost. The recovery scheme that lets employers reclaim 92% (or 109% for small employers with total Class 1 NI of £45,000 or less) applies to Statutory Maternity Pay and similar payments, but not to SSP.",
    },
    {
      question: "How long can an employee receive SSP?",
      answer:
        "A maximum of 28 weeks for any one period of sickness, including linked periods within 8 weeks of each other. Once entitlement is exhausted you should issue form SSP1 so the employee can apply for other support such as Universal Credit or ESA.",
    },
    {
      question: "Is Statutory Sick Pay taxable?",
      answer:
        "Yes. SSP is treated as earnings, so you deduct income tax and employee National Insurance through PAYE, and pay employer NI on it in the normal way.",
    },
  ],
  relatedSlugs: [
    "ssp-calculator",
    "sick-pay-calculator",
    "ssp-vs-company-sick-pay",
    "bradford-factor-calculator",
  ],
});
