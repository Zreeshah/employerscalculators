import { guide } from "../types";

export default guide({
  type: "guide",
  slug: "holiday-entitlement-part-time-workers",
  title: "How to Calculate Pro Rata Holidays for Part-Time Workers UK",
  metaDescription:
    "How to calculate pro rata holidays for part-time workers: fixed days, fixed hours and irregular hours, with 5.6-week, 12.07% and bank-holiday examples.",
  h1: "How to Calculate Pro Rata Holidays for Part-Time Workers",
  intro:
    "If you need to calculate pro rata holidays, start with the worker's real pattern rather than the label 'part-time'. Part-time workers usually receive the same **5.6 weeks of statutory paid holiday** as full-time workers, expressed in the days or hours of their own working pattern. The right calculation depends on fixed days, fixed hours, or genuinely irregular-hours or part-year work. The 12.07% accrual method is not a shortcut for every part-time employee. This guide helps you choose the method before doing the maths.",
  sections: [
    {
      heading: "Classify the working pattern before calculating leave",
      body: "Start with the contract and actual pattern. A worker on the same two or three days each week has a **fixed-days pattern**. Someone with regular weekly hours but unequal shift lengths is usually clearer to manage in **fixed hours**. The statutory 12.07% accrual method is for workers who meet the legal definition of an **irregular-hours worker** or **part-year worker**, not simply anyone labelled casual or part-time.\n\nGOV.UK's holiday entitlement guidance explains these categories and ACAS provides practical advice on calculating and recording leave. If the label and reality conflict, base the calculation on the real arrangement and seek advice before changing method.",
    },
    {
      heading: "Fixed days each week: multiply by 5.6",
      body: "For a worker who does the same number of days every week, multiply weekly working days by 5.6. The result is annual entitlement in that worker's days.\n\n:::table\n| Fixed pattern | Statutory annual entitlement |\n|---|---|\n| 2 days a week | 11.2 days |\n| 3 days a week | 16.8 days |\n| 4 days a week | 22.4 days |\n:::\n\nA three-day worker therefore receives 16.8 of their own working days, not three-fifths of a separate 28-day pot after bank holidays have been deducted. Do not round 16.8 down to 16. Record the fraction or round up under a consistently applied policy.",
    },
    {
      heading: "Fixed weekly hours: calculate and book leave in hours",
      body: "Use hours where shift lengths differ or a 'day' has no consistent value. Multiply normal weekly hours by 5.6. An employee contracted for 18 hours a week receives **100.8 hours** of statutory leave a year.\n\nSuppose the 18 hours are worked as eight hours on Monday, six on Wednesday and four on Friday. Taking Monday off uses eight holiday hours; taking Friday uses four. Deducting one day for each would distort entitlement. A worker whose hours are fixed but spread differently each week may also be easier to manage in hours, provided the conversion preserves a full 5.6 weeks of leave.",
    },
    {
      heading: "Irregular-hours and part-year workers: use 12.07%",
      body: "For leave years beginning on or after 1 April 2024, statutory leave for qualifying irregular-hours and part-year workers accrues each pay period at **12.07% of hours worked**, subject to the statutory cap and rounding rules. GOV.UK explains the definitions and calculation.\n\nIf an irregular-hours worker completes 50 hours in a monthly pay period, the unrounded accrual is 50 × 12.07% = **6.035 hours**. Apply the rounding required by the official method and keep the payroll working. Do not apply 12.07% to a regular three-day-a-week employee merely because they are part-time; that worker normally uses the 5.6-week fixed-pattern calculation.",
    },
    {
      heading: "Changes of hours, starters and leavers",
      body: "A mid-year change should not erase leave already earned. Split the leave year into periods, calculate each fixed pattern for the relevant portion, then combine the results and subtract leave taken. For example, if someone moves from 18 to 24 fixed hours a week halfway through the leave year, calculate half a year at 100.8 annualised hours and half at 134.4 annualised hours.\n\nFor starters and leavers, pro-rate for the part of the leave year employed and check pay in lieu rules on termination. If a worker genuinely moves into or out of irregular-hours status, document the classification date rather than mixing 5.6-week and 12.07% methods across the same period without an audit trail.",
    },
    {
      heading: "Bank holidays and uneven part-time patterns",
      body: "There is no separate statutory right to paid bank holidays. An employer can include them within the 5.6-week minimum or offer them on top. The policy must not leave part-time workers worse off because of which weekdays they work.\n\nFor a three-day worker entitled to 16.8 days, a bank holiday closure on one of their normal working days can use part of that total if the contract says so. A worker who never works Mondays should not have Monday closures deducted. ACAS recommends a clear, proportionate approach; using one annual pot in days or hours often avoids giving a Monday worker materially different usable leave from a comparable Tuesday-to-Thursday worker.",
    },
    {
      heading: "Rolled-up holiday pay is limited to specific workers",
      body: "Rolled-up holiday pay means adding holiday pay to each payslip while the worker takes the corresponding leave without a separate payment at that time. For leave years beginning on or after 1 April 2024, it is permitted only for qualifying irregular-hours and part-year workers. The holiday-pay amount must be calculated under the statutory method and shown separately on the payslip.\n\nIt is not permitted merely because a regular employee works part-time. A fixed-days or fixed-hours worker should normally receive holiday pay when leave is taken. Also distinguish entitlement from pay: paying a 12.07% uplift does not remove the worker's right and practical opportunity to take leave.",
    },
    {
      heading: "Summary: match the unit to the pattern",
      body: "Use days for equal fixed working days, hours for fixed hours or unequal shifts, and 12.07% pay-period accrual only for workers who meet the irregular-hours or part-year definitions. Then pro-rate for any partial leave year, handle bank holidays consistently and preserve fractions rather than rounding down.\n\nThe holiday entitlement calculator can check days or hours, while the annual leave calculator helps track a broader leave balance. Keep the contract, rota and payroll record aligned, and compare unusual cases with current GOV.UK and ACAS guidance before finalising entitlement.",
    },
  ],
  faq: [
    {
      question: "How much holiday does a part-time worker get?",
      answer:
        "Most receive 5.6 weeks of paid holiday in their own working pattern. A worker on three fixed days a week gets 16.8 days, while someone on 18 fixed hours gets 100.8 hours.",
    },
    {
      question: "How much holiday does a three-day-a-week worker get?",
      answer:
        "Multiply three days by 5.6, giving 16.8 days for a full leave year. The employer must not round that statutory entitlement down.",
    },
    {
      question: "Should part-time holiday be calculated in days or hours?",
      answer:
        "Days work well when every working day is the same length. Hours are fairer where shift lengths differ, because each absence then uses the number of hours the employee would have worked.",
    },
    {
      question: "Does every part-time worker use the 12.07% method?",
      answer:
        "No. The statutory 12.07% accrual method is for qualifying irregular-hours and part-year workers. Regular part-time workers normally receive 5.6 weeks based on their fixed days or hours.",
    },
    {
      question: "How is 12.07% holiday accrual calculated?",
      answer:
        "Multiply hours worked in the pay period by 12.07%, then apply the official rounding rules. Fifty hours produces 6.035 hours before rounding.",
    },
    {
      question: "Do part-time workers get bank holidays?",
      answer:
        "Bank holidays can be included within the 5.6-week minimum or offered in addition. The employer should apply the policy proportionately so part-time staff are not disadvantaged by their working days.",
    },
    {
      question: "Is rolled-up holiday pay legal for part-time workers?",
      answer:
        "Only where the person qualifies as an irregular-hours or part-year worker under the current rules. Regular fixed-hours part-time staff should be paid when they take holiday, not through a rolled-up uplift.",
    },
    {
      question: "How do I calculate pro rata holidays for a three-day week?",
      answer:
        "Multiply three working days by 5.6 to get 16.8 statutory days for a full leave year, then apply any part-year service, bank-holiday and rounding rules. Use hours instead when daily shift lengths differ.",
    },
  ],
  relatedSlugs: [
    "holiday-entitlement-calculator",
    "annual-leave-calculator",
    "pro-rata-calculator",
    "statutory-holiday-entitlement-uk",
  ],
});
