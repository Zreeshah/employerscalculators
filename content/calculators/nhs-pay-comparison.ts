import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "nhs-pay-comparison",
  kind: "nhs-pay-comparison",
  title: "NHS Pay Comparison Calculator UK 2026/27",
  metaDescription:
    "Compare two NHS pay scenarios by band salary and FTE. Estimate annual and monthly gross pay differences before checking take-home pay.",
  h1: "NHS Pay Comparison Calculator",
  intro:
    "Compare two NHS pay scenarios side by side. Enter the full-time salary and FTE for each option to estimate the annual and monthly gross pay difference before pension, tax and National Insurance. It is built for Agenda for Change staff comparing promotion, part-time hours, return-to-work patterns, secondments and role changes.",
  formulaExplainer:
    "Each scenario is calculated as full-time annual salary multiplied by FTE. The difference is Scenario B minus Scenario A, shown annually and monthly. This is a gross-pay comparison, so use the NHS take-home pay calculator afterwards to include pension, tax, employee NI, student loans and payslip deductions.",
  howToSteps: [
    {
      name: "Enter Scenario A",
      text: "Use your current or baseline full-time salary and FTE. Full-time is usually 1.0; three days a week is often 0.6 FTE if full-time is five days.",
    },
    {
      name: "Enter Scenario B",
      text: "Use the salary and FTE for the promotion, alternative job, changed hours or secondment you want to compare.",
    },
    {
      name: "Read the annual and monthly difference",
      text: "A positive difference means Scenario B pays more gross salary. A negative difference means it pays less before pension, tax and NI.",
    },
  ],
  sections: [
    {
      heading: "What NHS pay comparison means",
      body:
        "NHS pay comparison is not just band against band. The real gross difference depends on salary point, contracted hours, FTE, nation, London weighting, unsocial-hours enhancements and whether the change affects pension tier. This calculator gives the clean first step: the annual salary difference created by the band and hours. Once that is clear, you can model take-home pay separately.",
    },
    {
      heading: "Common comparison scenarios",
      body:
        "The calculator is useful for comparing a Band 5 to Band 6 promotion, moving from full-time to 0.8 FTE, returning from maternity leave part-time, choosing between a higher band with shorter hours, or checking whether a secondment is worth the change in hours. It is also useful for managers explaining what a changed-hours offer means in annual salary terms before payroll produces the first payslip.",
    },
    {
      heading: "Gross pay is only the first answer",
      body:
        "A higher gross salary can move an employee into a higher pension contribution tier, increase income tax and change student loan deductions. Unsocial-hours payments and High Cost Area Supplements can also make two jobs with the same basic salary produce different monthly pay. Use this comparison to identify the gross difference, then run each scenario through the NHS take-home pay calculator.",
    },
    {
      heading: "Part-time and FTE examples",
      body:
        "A full-time salary of £38,682 at 0.8 FTE gives £30,945.60 a year. A full-time salary of £31,049 at 1.0 FTE gives £31,049 a year. In that example the lower full-time band can still pay slightly more if the employee works full-time while the higher-band role is part-time. That is why FTE belongs in every NHS pay comparison.",
    },
    {
      heading: "Nation, band and pay-point limitations",
      body:
        "Agenda for Change pay scales can differ by nation and update at different times. This page uses salaries entered by the user rather than assuming a complete live pay table. Check the current NHS Employers, Scottish Government, Welsh Government or Northern Ireland pay circular before relying on a band salary for a formal decision.",
    },
  ],
  faq: [
    {
      question: "How do I compare two NHS salaries?",
      answer: "Enter the full-time salary and FTE for both roles. The calculator multiplies each salary by FTE and shows the annual and monthly gross difference.",
    },
    {
      question: "Does a higher NHS band always mean higher take-home pay?",
      answer: "Not always. Hours, pension tier, tax, student loans and enhancements can change the net result. Compare gross pay first, then calculate take-home pay for each scenario.",
    },
    {
      question: "What FTE should I use for part-time NHS work?",
      answer: "Use contracted weekly hours divided by the full-time hours for the role. If full-time is 37.5 hours and you work 30 hours, FTE is 0.8.",
    },
    {
      question: "Does this include unsocial-hours enhancements?",
      answer: "Only if you add those expected earnings into the salary you enter. The calculator compares basic gross salary scenarios.",
    },
    {
      question: "What should I do after comparing gross pay?",
      answer: "Run both scenarios through the NHS take-home pay calculator to estimate pension, tax, NI and monthly net pay.",
    },
  ],
  relatedSlugs: ["nhs-take-home-pay", "take-home-pay-calculator", "pro-rata-calculator"],
  defaults: {
    salaryA: 31049,
    fteA: 1,
    salaryB: 38682,
    fteB: 0.8,
  },
});
