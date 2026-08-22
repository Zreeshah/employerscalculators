import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "nhs-midwife-salary",
  kind: "nhs-band",
  nhsPreset: { nation: "england", band: "5", stepIndex: 0, hoursPerWeek: 37.5 },
  title: "NHS Midwife Salary Calculator 2026/27 England",
  metaDescription:
    "Calculate NHS midwife salary in England for 2026/27. Check Band 5 pay points, part-time FTE, pension tiers, shift enhancements and career progression",
  h1: "NHS Midwife Salary Calculator",
  intro:
    "A newly qualified NHS midwife in England normally starts on Agenda for Change Band 5, which pays £32,073, £34,592 or £39,043 in 2026/27. Use this NHS midwife salary calculator to estimate Band 5 take-home pay after NHS pension, tax and National Insurance. The guidance below also explains the Band 5 to Band 6 and Band 7 career ladder, pension tiers and the difference between shift enhancements and overtime.",
  formulaExplainer:
    "The calculator starts from the official Band 5 pay point and contracted hours, then estimates **gross pay, NHS pension, income tax, employee NI and take-home**. For an English Agenda for Change contract, FTE is contracted weekly hours divided by 37.5. A top-point Band 5 salary of £39,043 at 0.8 FTE is £31,234 of basic pay before pension and tax. Add unsocial-hours, HCAS or student loan only where they apply.",
  howToSteps: [
    {
      name: "Choose the Band 5 pay point",
      text: "Enter £32,073 at entry, £34,592 at the intermediate point or £39,043 at the top point for 2026/27 England.",
    },
    {
      name: "Convert contracted hours to FTE",
      text: "Divide weekly contracted hours by 37.5. Use the contractual hours excluding unpaid breaks.",
    },
    {
      name: "Calculate annual basic pay",
      text: "Multiply the full-time Band 5 salary by FTE. The calculator also shows the monthly gross equivalent.",
    },
    {
      name: "Add roster pay and deductions",
      text: "Check eligible shift enhancements, HCAS and overtime separately, then apply the pension tier and payroll deductions.",
    },
  ],
  sections: [
    {
      heading: "What is an NHS midwife salary in 2026/27?",
      body:
        "**NHS Band 5 midwife basic pay in England is £32,073 to £39,043 from 1 April 2026.** NHS Employers publishes three pay points for Band 5, shown below. These are full-time gross salaries before pension, PAYE, National Insurance or additions for shifts and location.\n\n:::table\n| Band 5 experience point | Annual basic pay | Monthly gross basic |\n|---|---|---|\n| Entry: under 2 years | £32,073 | £2,673 |\n| Intermediate: 2–4 years | £34,592 | £2,883 |\n| Top: 4+ years | £39,043 | £3,254 |\n:::\n\nThe experience labels describe eligibility timing, not a guarantee that every pay step happens without the required review.",
    },
    {
      heading: "How Band 5 midwife pay progression works",
      body:
        "A newly qualified midwife normally enters Band 5 at £32,073. The NHS Employers scale shows eligibility for the intermediate point after two years and the top point after a further two years. Under the England pay progression rules, the pay-step review checks standards such as appraisal completion and required statutory or mandatory training. A period of maternity leave, sickness absence or another break can require payroll and HR to apply specific rules, so use the pay-step date in ESR and your contract. A national cost-of-living award is separate from progression and normally changes every point on the scale.",
    },
    {
      heading: "The NHS midwife career ladder from Band 5",
      body:
        "Band 5 is the usual starting band for a registered midwife, but career development can lead to differently evaluated posts. A Band 6 role may involve greater autonomy, specialist practice, shift coordination or additional responsibility. Band 7 posts can include senior midwife, team leadership, advanced practice or service-management duties. Promotion is not automatic when you reach the top of Band 5: you must secure or be appointed to a role evaluated at the higher band.\n\n:::table\n| Career stage | Typical 2026/27 England band | Basic salary range |\n|---|---|---|\n| Newly qualified or developing midwife | Band 5 | £32,073–£39,043 |\n| Specialist or coordinating midwife | Band 6 | £39,959–£48,117 |\n| Senior or team-leading midwife | Band 7 | £49,387–£56,515 |\n:::",
    },
    {
      heading: "Part-time midwife salary examples",
      body:
        "Part-time midwife pay is pro rata, so the same Band 5 pay point produces a different annual salary as contracted hours change. Use hours divided by 37.5 rather than days worked, because long shifts and unpaid breaks can make a three-day rota different from 0.6 FTE.\n\n:::table\n| Contract | FTE | Entry-point pay | Top-point pay |\n|---|---|---|---|\n| 18.75 hours | 0.5 | £16,037 | £19,522 |\n| 22.5 hours | 0.6 | £19,244 | £23,426 |\n| 30 hours | 0.8 | £25,658 | £31,234 |\n| 37.5 hours | 1.0 | £32,073 | £39,043 |\n:::\n\nKeep the exact hours ratio for payroll comparisons and round only the final result.",
    },
    {
      heading: "Midwife night, weekend and bank-holiday pay",
      body:
        "A Band 5 midwife in England falls within the Bands 4 to 9 row of Section 2 of the NHS Terms and Conditions of Service Handbook. Eligible standard hours on Saturdays and on weekdays after 8pm and before 6am attract **time plus 30%**. Sundays and public holidays attract **time plus 60%**. Only one unsocial-hours rate applies to an hour, and the enhancement is based on eligible basic pay rather than HCAS. If more than half of a continuous weekday evening or night shift falls between 8pm and 6am, the night enhancement can apply to the whole shift under the handbook rule.",
    },
    {
      heading: "Unsocial hours are different from overtime",
      body:
        "Unsocial-hours pay rewards when contracted standard hours are worked; overtime rewards authorised hours above the full-time weekly threshold. Bands 1 to 7 are eligible for Section 3 overtime, normally time-and-a-half above 37.5 hours in a week and double time on general public holidays. A part-time midwife receives plain-time additional hours until total hours exceed 37.5, although eligible unsocial-hours rules may still apply to the timing of those standard or additional hours. Unsocial-hours payments are not included when calculating the overtime rate, and on-call arrangements have separate rules. Check the roster coding before assuming two enhancements can be stacked.",
    },
    {
      heading: "NHS pension tiers for a Band 5 midwife",
      body:
        "NHS pension contributions are based on **actual annual pensionable pay**, so part-time work can put a midwife in a lower tier than the full-time salary suggests. NHS Employers' 2026/27 table sets 8.3% for £28,855 to £35,155 and 9.8% for £35,156 to £52,778. That makes the full-time entry and intermediate Band 5 points likely to use 8.3%, while the £39,043 top point uses 9.8%, before other pensionable earnings.\n\n:::table\n| Band 5 point | Basic pay | Likely member rate | Basic-pay contribution |\n|---|---|---|---|\n| Entry | £32,073 | 8.3% | about £2,662 |\n| Intermediate | £34,592 | 8.3% | about £2,871 |\n| Top | £39,043 | 9.8% | about £3,826 |\n:::",
    },
    {
      heading: "Summary and midwife pay edge cases",
      body:
        "Enter the correct Band 5 point, calculate FTE from 37.5 hours and use the result as annual gross basic pay. Then account for roster enhancements, pension and payroll deductions separately. Common edge cases include London HCAS, acting-up as shift coordinator, bank shifts on a separate contract, back pay, on-call payments and a second pensionable NHS role. Occupational maternity pay can also reflect average earnings in the relevant reference period rather than basic salary alone. Job titles do not decide the band, so a specialist-sounding vacancy may remain Band 5 if its evaluated duties do not meet Band 6 requirements. Use the contract, job description, ESR record and local payroll team for a final check.",
    },
  ],
  faq: [
    {
      question: "What is the starting salary for an NHS midwife in England in 2026/27?",
      answer: "A newly qualified NHS midwife normally starts at Band 5 on £32,073 a year in England from 1 April 2026.",
    },
    {
      question: "How much does a Band 5 midwife earn after four years?",
      answer: "The 2026/27 top Band 5 point is £39,043. Reaching it depends on the pay-step timetable and required progression standards, not elapsed time alone.",
    },
    {
      question: "What is the next band after Band 5 for a midwife?",
      answer: "Band 6 is a common next step for specialist, coordinating or more autonomous midwife roles. Promotion requires appointment to a post evaluated at Band 6.",
    },
    {
      question: "How much extra do NHS midwives get for night shifts?",
      answer: "For a Band 5 midwife in England, eligible weekday night hours attract time plus 30%. Sundays and public holidays attract time plus 60% under Section 2 rules.",
    },
    {
      question: "What NHS pension rate does a Band 5 midwife pay?",
      answer: "Full-time entry and intermediate Band 5 basic pay fall in the 8.3% tier, while the £39,043 top point falls in the 9.8% tier for 2026/27. Actual pensionable pay, including regular pensionable additions, determines the rate.",
    },
    {
      question: "What is a Band 5 midwife salary at 0.8 FTE?",
      answer: "At 0.8 FTE, 2026/27 Band 5 basic pay is approximately £25,658 at entry, £27,674 at the intermediate point or £31,234 at the top point.",
    },
  ],
  relatedSlugs: [
    "nhs-band-5-pay-calculator",
    "nhs-band-6-pay-calculator",
    "nhs-band-7-pay-calculator",
    "nhs-take-home-pay",
  ],
  defaults: {
    fullTimeSalary: 32073,
    fte: 1,
  },
});
