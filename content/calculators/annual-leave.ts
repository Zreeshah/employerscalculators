import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "annual-leave-calculator",
  kind: "annual-leave",
  title: "Annual Leave Calculator UK 2026/27: Pro Rata Accrual & Leave Balance",
  metaDescription:
    "Annual leave calculator UK for pro rata entitlement, leave accrual, taken and booked days. Track a leave-year balance and understand 5.6-week statutory rules.",
  h1: "Annual Leave Calculator: Pro Rata Accrual & Balance",
  intro:
    "Use this **annual leave calculator UK** to track a worker's entitlement from the actual leave-year start date, including full-year entitlement, leave already taken and future leave booked. If you are asking how to calculate pro rata holidays, the tool shows both the accrued position as of today and the projected balance for the complete leave year, so a future booking is not mistaken for leave already earned. It works with statutory or contractual entitlement entered in days.",
  formulaExplainer: `:::callout info
**Full-year remaining leave = max(0, annual entitlement − leave taken − leave booked).** **Accrued entitlement to date = annual entitlement × elapsed proportion of the leave year.** The calculator shows accrued balances after taken leave and after both taken and booked leave, with negative results displayed as zero.

The leave-year start sets the 12-month period. The calculator measures calendar days from the first day of the selected start month, converts them to elapsed months and estimates the accrued fraction. Results remain subject to the employer's contractual rounding, bank-holiday and carry-over rules.
:::`,
  howToSteps: [
    {
      name: "Enter the annual entitlement",
      text: "Use the worker's full entitlement for the leave year, including contractual extra days and bank holidays if the contract includes them in the stated total.",
    },
    {
      name: "Set the leave-year start",
      text: "Choose the first day of the employer's holiday year, such as 1 January or 1 April. This determines the exact accrual window.",
    },
    {
      name: "Record leave already taken",
      text: "Enter leave used on or before the calculation date. Keep sickness, family leave and other absence categories out of this figure unless they were booked as annual leave.",
    },
    {
      name: "Add future leave booked",
      text: "Enter approved leave after the calculation date separately. It reduces the projected full-year balance but should not be confused with leave taken to date.",
    },
    {
      name: "Compare accrued and projected balances",
      text: "Use the accrued figure for the position today and the projected figure for planning the rest of the leave year, subject to employer policy.",
    },
  ],
  sections: [
    {
      heading: "What does the annual leave calculator track?",
      body: `This calculator is a **leave-year balance tracker**. It starts with the annual entitlement, anchors it to the employer's leave-year start, and separates leave already taken from leave booked for later. That distinction answers two different questions: how much leave has been earned by today, and how much remains for the whole year after approved bookings.

It can track a statutory 28-day allowance or a larger contractual allowance. It does not decide whether a request should be approved, calculate holiday pay, or replace the employer's HR record. Check that all inputs use the same unit, normally days.`,
    },
    {
      heading: "How date-sensitive accrual is calculated",
      body: `The calculator measures calendar days from the first day of the selected **leave-year start month**, converts that span to elapsed months, and applies the proportion to the annual entitlement. A 28-day entitlement halfway through the leave year is about 14 days accrued, subject to rounding.

This makes the result responsive to today's date rather than assuming a fixed manual month count, but it remains an estimate. Employer systems may use exact days, completed months or payroll periods under the contract. Accrual cannot exceed the entered annual entitlement. If the result looks wrong, check the selected start month and calculation date.`,
    },
    {
      heading: "Taken leave, booked leave and the available balance",
      body: `**Taken leave** is time used on or before the calculation date. **Booked leave** is approved time later in the leave year. The full-year projected balance is entitlement minus both amounts. The accrued-to-date balance compares leave earned so far with leave taken so far; future bookings are shown separately so they do not make today's accrual look lower than it is.

If more leave has been taken than accrued, the displayed accrued balance stops at zero; the employer may still permit leave in advance. If taken and booked leave exceed the annual entitlement, the projected balance also stops at zero. Compare the input totals as well as the balance so an overbooking is not hidden by that floor.`,
    },
    {
      heading: "Holiday accrual during sickness, maternity and other leave",
      body: `Statutory annual leave continues to accrue during sickness absence and statutory family leave, including maternity leave. A worker who is off sick may therefore have more leave available when they return, even though no holiday was taken during the absence. Keep sickness absence separate from the **days already taken** input unless the worker actually used annual leave.

If sickness prevented statutory leave being taken, carry-over may be required. The employer should record the carried days separately, check the applicable policy and avoid silently folding them into a new annual entitlement. Use the [SSP calculator](/ssp-calculator/) for statutory sick pay and this page for the leave balance.`,
    },
    {
      heading: "UK statutory annual leave and contractual entitlement",
      body: `Almost all UK workers are entitled to **5.6 weeks of paid annual leave** under the Working Time Regulations 1998. For someone working five days a week, that is 28 days. The statutory day-based entitlement is normally days worked each week × 5.6, capped at 28 days.

Employers can provide more than the statutory minimum. Enter the full contractual amount if you want the tracker to include those extra days. Contractual rules can differ for carrying over or selling the extra portion, but they cannot reduce statutory rights. Irregular-hours and part-year workers use the separate 12.07% accrual rules for qualifying leave years.`,
    },
    {
      heading: "Bank holidays and the entitlement figure",
      body: `There is no automatic right to paid time off on a bank holiday. An employer can include bank holidays within the statutory 5.6 weeks or provide them on top, and the employment contract should say which. Before entering 28 days, confirm whether that number already includes the relevant bank holidays.

Regional calendars differ across England and Wales, Scotland, and Northern Ireland, and a business can require work on a bank holiday with leave at another time. The tracker does not add regional bank holidays silently. Enter the contractual annual total so the balance does not double-count days that are already included.`,
    },
    {
      heading: "New starters, leavers and working-pattern changes",
      body: `A worker employed for only part of a leave year receives a **pro-rata entitlement**. For a new starter, use the employment start date and the employer's agreed part-year entitlement rather than assuming the full annual amount is immediately available. At termination, accrued statutory leave not taken is normally paid, while overtaken leave can be deducted only where the contract permits it.

If working days or hours change during the year, split the calculation into periods at each pattern. Converting the balance to hours is often fairer when daily lengths vary. Do not overwrite earlier accrual with the new schedule for the whole year.`,
    },
    {
      heading: "Carry-over, sickness and statutory leave edge cases",
      body: `Annual leave continues to accrue during sickness absence and statutory family leave, including maternity leave. GOV.UK rules allow statutory leave to be carried over in specified circumstances, such as when sickness or family leave prevented it being taken, or when the employer did not give a reasonable opportunity to take it. Contractual extra leave can have different carry-over terms.

Do not add carried leave to the annual entitlement unless the organisation records it that way. Keep it as a separate adjustment where possible, with an expiry date. Holiday taken during sickness, cancelled bookings and leave restored after illness should also be reconciled before trusting the balance.`,
    },
    {
      heading: "Rounding and record-checking mistakes to avoid",
      body: `GOV.UK and Acas guidance says employers must not round statutory entitlement down in a way that removes leave. During the first year, statutory monthly accrual rules can require a fraction to be rounded up to the nearest half day, while many systems retain hours or decimals to avoid repeated rounding errors.

Common mistakes include using the calendar year instead of the contractual leave year, counting bank holidays twice, mixing hours and days, treating a pending request as booked, and subtracting the same cancelled leave twice. Reconcile the calculator with approved requests and payroll records before confirming a balance or termination payment.`,
    },
    {
      heading: "Summary: track today and the full leave year",
      body: `Start with the full annual entitlement, set the correct leave-year start, and enter 5 days taken and 3 days booked or replace those defaults with the worker's record. The calculator uses dates to estimate accrual as of today and separately shows the projected full-year balance.

Check bank-holiday treatment, part-year service, changed working patterns, carry-over and contractual rounding before acting on the result. For irregular-hours or part-year workers covered by the post-April 2024 rules, use a 12.07% hours-based holiday entitlement calculation rather than treating this day tracker as the accrual method.`,
    },
  ],
  faq: [
    {
      question: "How much annual leave has accrued by today?",
      answer:
        "Multiply the annual entitlement by the proportion of the leave year elapsed, then compare it with leave already taken. Exact dates and the employer's rounding policy affect the result.",
    },
    {
      question: "What is the difference between taken and booked leave?",
      answer:
        "Taken leave has happened on or before the calculation date; booked leave is approved for later. Both reduce the projected full-year balance, but only taken leave is compared with accrual to date.",
    },
    {
      question: "Do bank holidays come out of 28 days?",
      answer:
        "They can. Employers may include bank holidays within the 5.6-week statutory entitlement or offer them on top, so check the contract before entering the annual total.",
    },
    {
      question: "Does annual leave accrue during sickness or maternity leave?",
      answer:
        "Yes. Statutory annual leave continues to accrue during sickness absence and statutory family leave, including maternity leave.",
    },
    {
      question: "Can an employee take more leave than they have accrued?",
      answer:
        "An employer can allow leave in advance, so a negative accrued balance is not automatically an error. The full-year entitlement and approved bookings still limit the projected position.",
    },
    {
      question: "How is leave calculated for a new starter?",
      answer:
        "A new starter receives the proportion of the leave year for which they are employed. Use the employment start date and the employer's pro-rata entitlement and rounding rules.",
    },
    {
      question: "Can an employer round annual leave down?",
      answer:
        "An employer must not round down in a way that removes statutory entitlement. Keeping the balance in hours or decimals often avoids unfair loss from repeated rounding.",
    },
    {
      question: "How do I calculate pro rata holidays for a part-time worker?",
      answer:
        "For a fixed pattern, multiply working days per week by 5.6 and then apply any part-year service or contractual rules. For genuinely irregular-hours or part-year workers, use the statutory hours-based method and the separate part-time holiday guide.",
    },
  ],
  relatedSlugs: ["holiday-entitlement-calculator", "holiday-entitlement-part-time-workers", "pro-rata-calculator", "statutory-holiday-entitlement-uk", "ssp-calculator"],
});
