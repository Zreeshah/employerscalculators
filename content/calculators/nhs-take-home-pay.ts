import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "nhs-take-home-pay",
  kind: "nhs-take-home-pay",
  title: "NHS Take Home Pay Calculator UK 2026/27",
  metaDescription:
    "Estimate NHS take-home pay after income tax, employee NI, NHS pension contributions and student loan deductions. Built for Agenda for Change staff.",
  h1: "NHS Take Home Pay Calculator",
  intro:
    "Use this NHS take-home pay calculator to estimate monthly net pay from an Agenda for Change salary. Enter the annual NHS salary, your pension contribution percentage and any monthly student loan deduction to see the main payroll deductions in one place. It is designed for NHS staff comparing bands, hours, promotions and pension impact before relying on a payslip.",
  formulaExplainer:
    "The calculator estimates annual gross NHS salary, deducts the selected NHS pension contribution, applies rUK income tax to pay after pension, applies employee National Insurance to gross pay, then subtracts any monthly student loan deduction you enter. It is a planning estimate only: tax code, nation-specific income tax, arrears, overtime, unsocial hours, salary sacrifice and payroll corrections can change the actual payslip.",
  howToSteps: [
    {
      name: "Enter your NHS annual salary",
      text: "Use the full annual salary for your band, point and contracted hours. If you are part-time, enter the pro-rated annual salary rather than the full-time figure.",
    },
    {
      name: "Add your NHS pension percentage",
      text: "Use the pension tier shown by your payroll or payslip. NHS pension contributions are normally taken before income tax, so the calculator deducts pension before estimating tax.",
    },
    {
      name: "Add student loan deductions if needed",
      text: "If your payslip shows a regular student loan deduction, enter the monthly amount so the net pay estimate is closer to the money actually received.",
    },
  ],
  sections: [
    {
      heading: "What this NHS take-home pay calculator includes",
      body:
        "The calculator focuses on the deductions most NHS employees see every month: NHS pension contributions, income tax, employee National Insurance and student loan deductions. It is useful when comparing a new Agenda for Change band, a change in contracted hours, a promotion, or the difference between staying in the NHS Pension Scheme and opting out. It deliberately separates pension from tax and NI so you can see why NHS net pay is often lower than a simple salary calculator suggests.",
    },
    {
      heading: "NHS pension and why it changes tax",
      body:
        "NHS pension contributions are usually deducted from pensionable pay before income tax. That means the contribution reduces taxable pay and gives tax relief automatically through payroll. National Insurance is normally calculated before pension relief, so NI does not fall in the same way. If your payroll uses a different treatment, salary sacrifice, or an adjustment for arrears, use the output as a guide rather than an exact payslip replica.",
    },
    {
      heading: "Band, hours and location checks before using the result",
      body:
        "Agenda for Change pay depends on band, spine point, nation and contracted hours. London High Cost Area Supplements, unsocial-hours enhancements, overtime, on-call payments and recruitment premia can all increase gross pay. If you are comparing two jobs, first use the NHS pay comparison calculator for the gross annual difference, then enter each pro-rated salary here to estimate the monthly take-home effect.",
    },
    {
      heading: "Common reasons your payslip may differ",
      body:
        "A real NHS payslip may differ because of emergency tax codes, cumulative tax corrections, back pay, unpaid leave, salary sacrifice schemes, car parking deductions, trade-union subscriptions, childcare vouchers, student loan plan changes or pension arrears. The calculator gives a clean baseline, which is exactly what you need for comparing roles, but payroll should always be treated as the final record.",
    },
    {
      heading: "Example: Band 6 salary and pension deduction",
      body:
        "If an NHS Band 6 employee enters a salary of £38,682 and a pension rate of 9.8%, the calculator first shows the annual pension deduction, then estimates tax and NI, then converts the net figure into a monthly amount. This makes the pension trade-off visible: the take-home pay is lower, but the contribution builds NHS pension entitlement and reduces taxable pay.",
    },
  ],
  faq: [
    {
      question: "Is this NHS take-home pay calculator exact?",
      answer: "No. It is a planning estimate. Actual NHS payslips depend on tax code, nation-specific tax, pension tier, enhancements, arrears, deductions and payroll adjustments.",
    },
    {
      question: "Does the NHS pension reduce taxable pay?",
      answer: "Usually yes. NHS pension contributions are generally taken before income tax, so the calculator deducts pension before estimating tax. Employee NI is estimated on gross pay.",
    },
    {
      question: "Can I use it for part-time NHS work?",
      answer: "Yes. Enter the pro-rated annual salary for your contracted hours. If you only know the full-time salary, multiply it by your FTE first.",
    },
    {
      question: "Does this include London weighting or unsocial hours?",
      answer: "Only if you include those amounts in the annual salary you enter. The calculator does not separately model HCAS, overtime or Section 2 enhancements.",
    },
    {
      question: "What should I compare next?",
      answer: "Use the NHS pay comparison calculator to compare two band or FTE scenarios, then use this page to estimate take-home pay for each scenario.",
    },
  ],
  relatedSlugs: ["nhs-pay-comparison", "take-home-pay-calculator", "pro-rata-calculator"],
  defaults: {
    annualSalary: 38682,
    pensionPercent: 9.8,
    studentLoanMonthly: 0,
  },
});
