import {
  rankLabel,
  policeAnnualHours,
  policeHourlyRate,
  policePensionRate,
  londonWeighting,
  type PoliceRank,
} from "@/data/police-pay-scales";
import { calculator, type CalculatorContent } from "../types";

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

const gbp2 = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

// 2026/27 pay data (England & Wales, post-2013 appointees, 3.5% uplift)
const constablePP = [32255, 33609, 34972, 36335, 39068, 44544, 52014];
const sergeantPP = [55443, 56784, 58175];
const inspectorPP = [65999, 68124, 70237, 71386];
const chiefInspectorPP = [74393, 76102, 77474];
const superintendentPP = [97014, 100149, 103284, 106419];
const chiefSuperintendentPP = [109806, 112599, 115383];

// Legacy constable (pre-April 2013)
const constableLegacy = [33969, 35252, 34972, 36335, 39068, 44544, 52014];

const pensionPct = Math.round(policePensionRate * 10000) / 100; // 12.44

// ──────────────────────────────────────────
// 1. PILLAR PAGE — Police Pay Scale Calculator
// ──────────────────────────────────────────

function allRanksTable(): string {
  const ranks: Array<{ label: string; entry: number; top: number }> = [
    { label: "Constable (PP1–PP7)", entry: constablePP[0], top: constablePP[6] },
    { label: "Sergeant", entry: sergeantPP[0], top: sergeantPP[2] },
    { label: "Inspector", entry: inspectorPP[0], top: inspectorPP[3] },
    { label: "Chief Inspector", entry: chiefInspectorPP[0], top: chiefInspectorPP[2] },
    { label: "Superintendent", entry: superintendentPP[0], top: superintendentPP[3] },
    { label: "Chief Superintendent", entry: chiefSuperintendentPP[0], top: chiefSuperintendentPP[2] },
  ];
  return ranks
    .map((r) => `| ${r.label} | ${gbp(r.entry)} | ${gbp(r.top)} | ${gbp2(policeHourlyRate(r.top))} |`)
    .join("\n");
}

function constableTable(): string {
  return constablePP
    .map((s, i) => `| PP${i + 1} | ${gbp(s)} | ${gbp(Math.round(s / 12))} | ${gbp2(policeHourlyRate(s))} |`)
    .join("\n");
}

function constableLegacyTable(): string {
  return constableLegacy
    .map((s, i) => `| PP${i} | ${gbp(s)} | ${gbp(Math.round(s / 12))} | ${gbp2(policeHourlyRate(s))} |`)
    .join("\n");
}

function sergeantTable(): string {
  return sergeantPP
    .map((s, i) => `| PP${i + 1} | ${gbp(s)} | ${gbp(Math.round(s / 12))} | ${gbp2(policeHourlyRate(s))} |`)
    .join("\n");
}

function inspectorTable(): string {
  return inspectorPP
    .map((s, i) => `| PP${i + 1} | ${gbp(s)} | ${gbp(Math.round(s / 12))} | ${gbp2(policeHourlyRate(s))} |`)
    .join("\n");
}

function chiefInspectorTable(): string {
  return chiefInspectorPP
    .map((s, i) => `| PP${i + 1} | ${gbp(s)} | ${gbp(Math.round(s / 12))} | ${gbp2(policeHourlyRate(s))} |`)
    .join("\n");
}

function overtimeExample(salary: number, label: string): string {
  const hourly = policeHourlyRate(salary);
  const tnt = hourly * (4 / 3);
  const dbl = hourly * 2;
  return `A ${label} earning ${gbp(salary)} has an hourly rate of ${gbp2(hourly)}. A rest-day shift at time and a third pays ${gbp2(tnt)} per hour, while a bank-holiday shift at double time pays ${gbp2(dbl)} per hour.`;
}

const pillarPage: CalculatorContent = calculator({
  type: "calculator",
  slug: "police-pay-scale-calculator",
  kind: "police-pay",
  title: "Police Pay Scale Calculator UK 2026/27 | Salary by Rank",
  metaDescription:
    "UK police officer salary calculator for 2026/27. See pay scales for every rank from Constable to Chief Superintendent, including hourly rates, overtime and take-home pay.",
  h1: "Police Pay Scale Calculator UK 2026/27",
  intro:
    "Police officer pay in England and Wales ranges from **" + gbp(constablePP[0]) + "** for a starting constable to **" + gbp(chiefSuperintendentPP[2]) + "** for a top-of-scale Chief Superintendent in 2026/27, following the confirmed 3.5% pay award from 1 September 2026. Use this calculator to estimate your take-home pay after pension, income tax and National Insurance. The pay scales below cover every rank from Constable through Chief Superintendent, with hourly rates, overtime calculations and [London Weighting](#london-weighting-and-allowances). For NHS staff, see the [NHS take-home pay calculator](/nhs-take-home-pay/).",
  formulaExplainer:
    `Police hourly rate is **annual salary \u00f7 ${policeAnnualHours.toLocaleString("en-GB")}** (40 hours \u00d7 52.14 weeks). Rest-day overtime is **time and a third** (\u00d71.33); bank-holiday overtime is **double time** (\u00d72). Inspector and above are salaried ranks and do not normally receive paid overtime.\n\n:::callout info\n**Take-home pay = gross salary \u2212 police pension (${pensionPct}%) \u2212 income tax \u2212 employee NI.** Use the [take-home pay calculator](/take-home-pay-calculator/) or the [national insurance calculator](/national-insurance-calculator/) for a full gross-to-net breakdown.\n:::`,
  howToSteps: [
    { name: "Find your rank and pay point", text: "Police pay is determined by rank and years of service. A constable starts at PP1 and progresses annually to PP7." },
    { name: "Check the 2026/27 salary", text: "The tables below show the confirmed 3.5% uplift effective 1 September 2026 for England and Wales." },
    { name: "Calculate your hourly rate", text: `Divide the annual salary by ${policeAnnualHours.toLocaleString("en-GB")} to get the hourly rate. Multiply by 1.33 for rest-day overtime or by 2 for bank-holiday overtime.` },
    { name: "Estimate take-home pay", text: `Deduct ${pensionPct}% police pension, income tax and employee National Insurance from the gross salary. London officers add \u00a3${londonWeighting.toLocaleString("en-GB")} weighting before deductions.` },
  ],
  sections: [
    {
      heading: "Police pay scales 2026/27: all ranks",
      body:
        `The 2026/27 police pay award applies a **3.5% increase** to all ranks from 1 September 2026. The table below shows the entry and top-of-scale salaries for each rank in England and Wales.\n\n:::table\n| Rank | Entry salary | Top of scale | Hourly rate (top) |\n|---|---|---|---|\n${allRanksTable()}\n:::\n\nPay points advance annually on the anniversary of joining, subject to satisfactory performance. The hourly rate is calculated on a 40-hour standard week (${policeAnnualHours.toLocaleString("en-GB")} annual hours). For detailed breakdowns by rank, see the [constable](/police-constable-pay-calculator/), [sergeant](/police-sergeant-pay-calculator/) and [inspector](/police-inspector-pay-calculator/) pages.`,
    },
    {
      heading: "Police constable pay (PP1\u2013PP7)",
      body:
        `A police constable in England and Wales starts at **${gbp(constablePP[0])}** (PP1) and reaches **${gbp(constablePP[6])}** (PP7) after seven years of service. Progression is annual and incremental.\n\n:::table\n| Pay point | Annual salary | Monthly gross | Hourly rate |\n|---|---|---|---|\n${constableTable()}\n:::\n\nOfficers appointed before 1 April 2013 may remain on the legacy pay structure, which starts at PP0 (${gbp(constableLegacy[0])}). Both scales converge at the top (PP7). See the full [constable pay breakdown](/police-constable-pay-calculator/) for legacy rates and progression details.`,
    },
    {
      heading: "Sergeant, Inspector and senior ranks",
      body:
        `Promotion to sergeant requires passing the National Police Promotion Framework (NPPF) assessment. Sergeant pay starts at **${gbp(sergeantPP[0])}** and tops out at **${gbp(sergeantPP[2])}** across three pay points.\n\nInspector pay ranges from **${gbp(inspectorPP[0])}** to **${gbp(inspectorPP[3])}**. Inspectors and above are **salaried ranks**: they do not receive paid overtime. Chief Inspectors earn **${gbp(chiefInspectorPP[0])}** to **${gbp(chiefInspectorPP[2])}**.\n\nSuperintendents earn **${gbp(superintendentPP[0])}** to **${gbp(superintendentPP[3])}** and Chief Superintendents **${gbp(chiefSuperintendentPP[0])}** to **${gbp(chiefSuperintendentPP[2])}**. For detailed pay tables, see the [sergeant pay calculator](/police-sergeant-pay-calculator/) and [inspector pay calculator](/police-inspector-pay-calculator/).`,
    },
    {
      heading: "Police overtime: time and a third, double time",
      body:
        `Police officers at constable and sergeant rank are entitled to paid overtime under Police Regulations. The standard rates are:\n\n- **Rest-day working:** time and a third (\u00d71.33)\n- **Public holiday working:** double time (\u00d72)\n- **Casual overtime (less than a full shift):** time and a third\n\n${overtimeExample(constablePP[6], "top-of-scale constable")}\n\n${overtimeExample(sergeantPP[2], "top-of-scale sergeant")}\n\n:::callout warn\nInspector and above are **salaried ranks** and do not receive paid overtime. Some forces offer rest-day compensation or time off in lieu, but this is not guaranteed nationally.\n:::`,
    },
    {
      heading: "London Weighting and allowances",
      body:
        `Metropolitan Police and City of London officers receive **London Weighting of \u00a3${londonWeighting.toLocaleString("en-GB")} per year** on top of the national pay scale. This is added to gross pay before deductions.\n\nFor example, a London constable at PP7 earns ${gbp(constablePP[6])} + ${gbp(londonWeighting)} = **${gbp(constablePP[6] + londonWeighting)}** gross, raising monthly pay by about ${gbp(Math.round(londonWeighting / 12))}.\n\nOther common allowances include:\n- **South East allowance** (\u00a32,000\u2013\u00a33,000 in some Home Counties forces)\n- **Dog handler\u2019s allowance** (\u00a32,946 per year for the first dog)\n- **On-call allowance** (varies by force)\n- **Competence-related threshold payment** (CRTP, where still in use)\n\nAllowances vary by force and are not part of the national pay scale.`,
    },
    {
      heading: "Police pension (CARE 2015 scheme)",
      body:
        `All police officers contribute **${pensionPct}%** of pensionable pay to the 2015 CARE (Career Average Revalued Earnings) pension scheme. The employer contributes 31%. Pensionable pay includes basic salary and London Weighting but normally excludes overtime.\n\n:::table\n| Rank (top point) | Gross salary | Annual pension (${pensionPct}%) | Monthly pension |\n|---|---|---|---|\n| Constable PP7 | ${gbp(constablePP[6])} | ${gbp(Math.round(constablePP[6] * policePensionRate))} | ${gbp(Math.round(constablePP[6] * policePensionRate / 12))} |\n| Sergeant PP3 | ${gbp(sergeantPP[2])} | ${gbp(Math.round(sergeantPP[2] * policePensionRate))} | ${gbp(Math.round(sergeantPP[2] * policePensionRate / 12))} |\n| Inspector PP4 | ${gbp(inspectorPP[3])} | ${gbp(Math.round(inspectorPP[3] * policePensionRate))} | ${gbp(Math.round(inspectorPP[3] * policePensionRate / 12))} |\n:::\n\nPension contributions are deducted before income tax (net pay arrangement), so they reduce taxable pay. The scheme provides a pension based on 1/55.3 of each year\u2019s pensionable earnings, revalued annually by CPI + 1.25%. Normal pension age is 60 for the 2015 scheme. Officers on the legacy 1987 or 2006 schemes have different contribution rates and accrual.`,
    },
    {
      heading: "Take-home pay examples",
      body:
        `These estimates use 2026/27 income tax, National Insurance and the ${pensionPct}% police pension. They assume the standard 1257L tax code and no student loan.\n\n:::table\n| Scenario | Gross salary | Pension | Income tax | Employee NI | Take-home (year) | Take-home (month) |\n|---|---|---|---|---|---|---|\n| Constable PP1 | ${gbp(constablePP[0])} | ${gbp(Math.round(constablePP[0] * policePensionRate))} | ${gbp(Math.round((constablePP[0] * (1 - policePensionRate) - 12570) * 0.2))} | ${gbp(Math.round((constablePP[0] - 12570) * 0.08))} | ${gbp(Math.round(constablePP[0] - constablePP[0] * policePensionRate - (constablePP[0] * (1 - policePensionRate) - 12570) * 0.2 - (constablePP[0] - 12570) * 0.08))} | ${gbp(Math.round((constablePP[0] - constablePP[0] * policePensionRate - (constablePP[0] * (1 - policePensionRate) - 12570) * 0.2 - (constablePP[0] - 12570) * 0.08) / 12))} |\n| Constable PP7 | ${gbp(constablePP[6])} | ${gbp(Math.round(constablePP[6] * policePensionRate))} | ${gbp(Math.round(((constablePP[6] * (1 - policePensionRate) - 12570) * 0.2) + Math.max(0, constablePP[6] * (1 - policePensionRate) - 50270) * 0.2))} | ${gbp(Math.round((50270 - 12570) * 0.08 + Math.max(0, constablePP[6] - 50270) * 0.02))} | \u2014 | \u2014 |\n| Sergeant PP3 | ${gbp(sergeantPP[2])} | ${gbp(Math.round(sergeantPP[2] * policePensionRate))} | \u2014 | \u2014 | \u2014 | \u2014 |\n:::\n\n:::callout info\nThese are simplified estimates. Use the [take-home pay calculator](/take-home-pay-calculator/) for an accurate breakdown including student loan, Scottish tax or salary sacrifice.\n:::`,
    },
    {
      heading: "Summary: use the police pay calculator",
      body:
        `Find your rank and pay point in the tables above, then use the calculator to estimate pension, tax and take-home pay. Key points to remember:\n\n- The 2026/27 pay award is **3.5%** from 1 September 2026\n- Hourly rate = annual salary \u00f7 ${policeAnnualHours.toLocaleString("en-GB")}\n- Rest-day overtime is **time and a third**; bank holidays are **double time**\n- Inspector and above are salaried \u2014 no paid overtime\n- London Weighting adds **\u00a3${londonWeighting.toLocaleString("en-GB")}** for Met and City of London officers\n- Pension is **${pensionPct}%** of pensionable pay (CARE 2015 scheme)\n\nFor employer costs and NI, see the [employer NI calculator](/employer-ni-calculator/) and the [employee cost calculator](/employee-cost-calculator/).`,
    },
  ],
  faq: [
    {
      question: "How much does a police officer earn in the UK in 2026?",
      answer: `A starting police constable in England and Wales earns ${gbp(constablePP[0])} a year (PP1). After seven years, pay rises to ${gbp(constablePP[6])} (PP7). Senior ranks earn more: a sergeant gets ${gbp(sergeantPP[0])}\u2013${gbp(sergeantPP[2])}, an inspector ${gbp(inspectorPP[0])}\u2013${gbp(inspectorPP[3])}, and a Chief Superintendent ${gbp(chiefSuperintendentPP[0])}\u2013${gbp(chiefSuperintendentPP[2])}.`,
    },
    {
      question: "What is the police pay rise for 2026/27?",
      answer: "The Home Office confirmed a 3.5% pay rise for all police ranks in England and Wales, effective 1 September 2026. Officers below the top of their scale may also receive a separate annual increment.",
    },
    {
      question: "What is police time and a third overtime?",
      answer: `Time and a third (\u00d71.33) is the standard overtime rate for rest-day working. A constable at PP7 earning ${gbp2(policeHourlyRate(constablePP[6]))} per hour receives ${gbp2(policeHourlyRate(constablePP[6]) * 4 / 3)} per hour at time and a third. Bank-holiday working is double time (\u00d72).`,
    },
    {
      question: "Do inspectors get paid overtime?",
      answer: "No. Inspector and above are salaried ranks under Police Regulations and do not receive paid overtime. Some forces offer rest-day compensation or time off in lieu as a matter of local policy.",
    },
    {
      question: "What is the police pension contribution rate?",
      answer: `Police officers contribute ${pensionPct}% of pensionable pay under the CARE 2015 pension scheme. The employer contributes 31%. Pension contributions are deducted before income tax, reducing your taxable pay.`,
    },
    {
      question: "How much is London Weighting for police?",
      answer: `Metropolitan Police and City of London officers receive \u00a3${londonWeighting.toLocaleString("en-GB")} per year on top of the national pay scale. This is added to gross pay before tax and pension deductions.`,
    },
    {
      question: "What is the hourly rate for a police constable?",
      answer: `Based on a 40-hour week (${policeAnnualHours.toLocaleString("en-GB")} annual hours), a constable at PP1 earns ${gbp2(policeHourlyRate(constablePP[0]))} per hour and at PP7 earns ${gbp2(policeHourlyRate(constablePP[6]))} per hour in 2026/27.`,
    },
  ],
  relatedSlugs: [
    "police-constable-pay-calculator",
    "police-sergeant-pay-calculator",
    "police-inspector-pay-calculator",
    "take-home-pay-calculator",
    "national-insurance-calculator",
    "employer-ni-calculator",
  ],
  defaults: { annualSalary: constablePP[6] },
});

// ──────────────────────────────────────────
// 2. CONSTABLE PAY CALCULATOR
// ──────────────────────────────────────────

const constablePage: CalculatorContent = calculator({
  type: "calculator",
  slug: "police-constable-pay-calculator",
  kind: "police-pay",
  title: "Police Constable Pay Scale 2026/27 | PP1\u2013PP7 Salary UK",
  metaDescription:
    "Police constable salary for 2026/27: PP1 starts at " + gbp(constablePP[0]) + ", rising to " + gbp(constablePP[6]) + " at PP7. See the full pay scale, hourly rates, overtime and take-home estimates.",
  h1: "Police Constable Pay Scale 2026/27",
  intro:
    "A police constable in England and Wales earns **" + gbp(constablePP[0]) + "** at PP1 rising to **" + gbp(constablePP[6]) + "** at PP7 in 2026/27, following the confirmed 3.5% pay award. Pay increases annually through seven pay points. This page covers the full constable pay scale, the legacy (pre-2013) scale, hourly rates, overtime calculations and estimated take-home pay. For all ranks, see the [police pay scale calculator](/police-pay-scale-calculator/).",
  formulaExplainer:
    `Constable hourly rate = **annual salary \u00f7 ${policeAnnualHours.toLocaleString("en-GB")}** (40 hours \u00d7 52.14 weeks). Rest-day overtime is time and a third (\u00d71.33); bank-holiday working is double time (\u00d72). Pension is ${pensionPct}% of pensionable pay, deducted before income tax.`,
  howToSteps: [
    { name: "Identify your pay point", text: "PP1 is your starting point. You advance one pay point each year on the anniversary of joining, subject to satisfactory performance." },
    { name: "Check post-2013 or legacy", text: "Officers appointed before 1 April 2013 may be on the legacy scale, which starts at PP0. Both scales converge at the top." },
    { name: "Calculate overtime", text: "Divide your annual salary by 2,085.6 to get the hourly rate. Multiply by 1.33 for rest-day work or by 2 for bank holidays." },
    { name: "Estimate take-home", text: "Deduct 12.44% pension, income tax and National Insurance. London officers add \u00a33,150 weighting first." },
  ],
  sections: [
    {
      heading: "Constable pay scale 2026/27 (post-2013)",
      body:
        `Officers appointed on or after 1 April 2013 follow the seven-point constable scale below. Progression is annual, one pay point per year of satisfactory service.\n\n:::table\n| Pay point | Annual salary | Monthly gross | Hourly rate |\n|---|---|---|---|\n${constableTable()}\n:::\n\nPay Point 1 applies during the two-year probationary period. Most constables reach PP7 after seven years of service.`,
    },
    {
      heading: "Legacy constable pay scale (pre-2013)",
      body:
        `Officers who joined before 1 April 2013 may remain on the legacy pay structure, which includes PP0. The legacy scale is being phased out as officers progress or retire.\n\n:::table\n| Pay point | Annual salary | Monthly gross | Hourly rate |\n|---|---|---|---|\n${constableLegacyTable()}\n:::\n\nBoth scales converge at the top (PP7 = ${gbp(constablePP[6])}). If you joined before 2013 and have not yet reached PP7, check your payslip for the legacy or post-2013 designation.`,
    },
    {
      heading: "Starting salary and probationer pay",
      body:
        `A new police constable starts at **${gbp(constablePP[0])} (PP1)**. During the two-year probationary period (known as the Initial Police Learning and Development Programme, or IPLDP), officers remain on PP1 and PP2. On successful completion of probation, officers continue to progress through the scale annually.\n\nThe starting salary means a monthly gross of approximately **${gbp(Math.round(constablePP[0] / 12))}** before pension and tax. After ${pensionPct}% pension deduction and basic-rate income tax, a starting constable\u2019s estimated monthly take-home is roughly **${gbp(Math.round((constablePP[0] - constablePP[0] * policePensionRate - (constablePP[0] * (1 - policePensionRate) - 12570) * 0.2 - (constablePP[0] - 12570) * 0.08) / 12))}**. Use the [take-home pay calculator](/take-home-pay-calculator/) for an exact figure.`,
    },
    {
      heading: "Constable overtime and hourly rates",
      body:
        `Constables are entitled to paid overtime under Police Regulations 2003. The rates are:\n\n- **Rest-day working:** time and a third (\u00d71.33 of hourly rate)\n- **Bank holiday:** double time (\u00d72)\n- **Casual overtime:** time and a third (minimum 4 hours\u2019 pay)\n\n${overtimeExample(constablePP[0], "PP1 constable")} ${overtimeExample(constablePP[6], "PP7 constable")}\n\nOvertime is calculated on the basic hourly rate only. London Weighting is not included in the overtime calculation.`,
    },
    {
      heading: "London and regional allowances",
      body:
        `Metropolitan Police and City of London officers receive **London Weighting of \u00a3${londonWeighting.toLocaleString("en-GB")}** per year. A PP1 constable in London therefore earns ${gbp(constablePP[0] + londonWeighting)} gross, and a PP7 constable earns ${gbp(constablePP[6] + londonWeighting)} gross.\n\nSome Home Counties forces offer a South East allowance of \u00a32,000\u2013\u00a33,000. Allowances vary by force and are set locally. They are added to gross pay before tax and pension.`,
    },
    {
      heading: "Pension and take-home at each pay point",
      body:
        `All constables contribute **${pensionPct}%** of pensionable pay to the CARE 2015 scheme. Because pension is deducted before tax, it reduces the amount of income tax you pay. National Insurance is calculated on gross pay.\n\n:::table\n| Pay point | Gross salary | Annual pension | After pension |\n|---|---|---|---|\n${constablePP.map((s, i) => `| PP${i + 1} | ${gbp(s)} | ${gbp(Math.round(s * policePensionRate))} | ${gbp(Math.round(s * (1 - policePensionRate)))} |`).join("\n")}\n:::`,
    },
    {
      heading: "Progression and promotion to sergeant",
      body:
        `A constable who reaches PP7 stays at the top of the constable scale until they are promoted. There is no further pay increase within the constable rank beyond PP7.\n\nPromotion to sergeant requires passing the National Police Promotion Framework (NPPF) assessment, which includes an online exam and a work-based assessment. On promotion, a constable moves to the [sergeant pay scale](/police-sergeant-pay-calculator/) at **${gbp(sergeantPP[0])}** (PP1), an immediate increase of ${gbp(sergeantPP[0] - constablePP[6])} over constable PP7.\n\nDetective constables follow the same pay scale as uniformed constables. The DC designation does not carry a pay premium under current regulations.`,
    },
  ],
  faq: [
    {
      question: "What is the starting salary for a police constable in 2026?",
      answer: `A starting police constable in England and Wales earns ${gbp(constablePP[0])} per year (PP1) from 1 September 2026. Monthly gross is approximately ${gbp(Math.round(constablePP[0] / 12))}.`,
    },
    {
      question: "How long does it take to reach the top of the constable pay scale?",
      answer: "A constable progresses through seven pay points (PP1\u2013PP7) over approximately seven years, advancing one point per year of satisfactory performance.",
    },
    {
      question: "What is the difference between legacy and post-2013 constable pay?",
      answer: `Officers who joined before 1 April 2013 may be on the legacy scale starting at PP0 (${gbp(constableLegacy[0])}). The post-2013 scale starts at PP1 (${gbp(constablePP[0])}). Both converge at PP7 (${gbp(constablePP[6])}).`,
    },
    {
      question: "How much overtime does a constable earn?",
      answer: `Rest-day overtime is time and a third (\u00d71.33). A PP7 constable earning ${gbp2(policeHourlyRate(constablePP[6]))} per hour gets ${gbp2(policeHourlyRate(constablePP[6]) * 4 / 3)} per hour for rest-day work and ${gbp2(policeHourlyRate(constablePP[6]) * 2)} for bank holidays.`,
    },
    {
      question: "Do detective constables earn more than uniformed constables?",
      answer: "No. Detective constables follow the same national pay scale as uniformed constables. The detective designation does not carry an automatic pay premium.",
    },
    {
      question: "How much is a constable\u2019s pension contribution?",
      answer: `Constables contribute ${pensionPct}% of pensionable pay under the CARE 2015 scheme. At PP7 (${gbp(constablePP[6])}), this is approximately ${gbp(Math.round(constablePP[6] * policePensionRate))} per year or ${gbp(Math.round(constablePP[6] * policePensionRate / 12))} per month.`,
    },
  ],
  relatedSlugs: [
    "police-pay-scale-calculator",
    "police-sergeant-pay-calculator",
    "take-home-pay-calculator",
    "national-insurance-calculator",
  ],
  defaults: { annualSalary: constablePP[6] },
});

// ──────────────────────────────────────────
// 3. SERGEANT PAY CALCULATOR
// ──────────────────────────────────────────

const sergeantPage: CalculatorContent = calculator({
  type: "calculator",
  slug: "police-sergeant-pay-calculator",
  kind: "police-pay",
  title: "Police Sergeant Pay Scale 2026/27 | UK Salary & Overtime",
  metaDescription:
    "Police sergeant salary 2026/27: " + gbp(sergeantPP[0]) + " to " + gbp(sergeantPP[2]) + " across three pay points. See hourly rates, overtime, pension and take-home estimates.",
  h1: "Police Sergeant Pay Scale 2026/27",
  intro:
    "A police sergeant in England and Wales earns **" + gbp(sergeantPP[0]) + "** to **" + gbp(sergeantPP[2]) + "** in 2026/27, across three pay points. Sergeants receive the confirmed 3.5% pay rise from 1 September 2026 and remain eligible for paid overtime at time and a third. This page covers the full sergeant pay scale, promotion from constable, overtime calculations and pension. For all ranks, see the [police pay scale calculator](/police-pay-scale-calculator/).",
  formulaExplainer:
    `Sergeant hourly rate = annual salary \u00f7 ${policeAnnualHours.toLocaleString("en-GB")}. Overtime applies at time and a third (\u00d71.33) for rest-day working and double time (\u00d72) for bank holidays. Pension is ${pensionPct}% of pensionable pay.`,
  howToSteps: [
    { name: "Identify your pay point", text: "Sergeant PP1 is the entry point on promotion. You progress to PP2 and PP3 in subsequent years." },
    { name: "Check the 2026/27 salary", text: "The confirmed 3.5% uplift applies from 1 September 2026." },
    { name: "Calculate overtime", text: "Divide annual salary by 2,085.6 for the hourly rate. Multiply by 1.33 for rest-day overtime." },
    { name: "Estimate take-home", text: "Deduct 12.44% pension, income tax and National Insurance." },
  ],
  sections: [
    {
      heading: "Sergeant pay scale 2026/27",
      body:
        `A police sergeant progresses through three pay points, typically advancing one point per year of satisfactory service.\n\n:::table\n| Pay point | Annual salary | Monthly gross | Hourly rate |\n|---|---|---|---|\n${sergeantTable()}\n:::\n\nOn promotion from constable PP7 (${gbp(constablePP[6])}), a new sergeant moves to PP1 (${gbp(sergeantPP[0])}), an immediate increase of **${gbp(sergeantPP[0] - constablePP[6])}** per year.`,
    },
    {
      heading: "Promotion to sergeant",
      body:
        `Promotion to sergeant requires passing the **National Police Promotion Framework (NPPF)** assessment. The process typically involves:\n\n1. **Eligibility check** \u2014 minimum two years\u2019 service as a constable (varies by force)\n2. **Online exam** \u2014 testing knowledge of law, procedure and leadership\n3. **Work-based assessment** \u2014 demonstrating supervisory competence on the job\n4. **Force selection** \u2014 some forces run interviews or assessment centres\n\nThe old OSPRE Part I and Part II exams have been replaced by the NPPF in most forces. Check your force\u2019s promotion policy for the current process. Detective sergeants follow the same pay scale as uniformed sergeants.`,
    },
    {
      heading: "Sergeant overtime and hourly rates",
      body:
        `Sergeants are eligible for paid overtime on the same basis as constables. Rest-day working attracts **time and a third** (\u00d71.33) and bank holidays are **double time** (\u00d72).\n\n${overtimeExample(sergeantPP[0], "PP1 sergeant")} ${overtimeExample(sergeantPP[2], "PP3 sergeant")}\n\nA sergeant who regularly works rest days can earn significantly more than the basic salary. However, overtime is at the discretion of the force and may be subject to local caps or duty-management policies.`,
    },
    {
      heading: "London Weighting and allowances",
      body:
        `London-based sergeants receive **\u00a3${londonWeighting.toLocaleString("en-GB")}** per year. A PP3 sergeant in London earns ${gbp(sergeantPP[2] + londonWeighting)} gross before deductions.\n\nAdditional allowances may apply for specialist roles (dog handler, firearms, on-call). These vary by force and are set locally. Check your force\u2019s terms and conditions for applicable supplements.`,
    },
    {
      heading: "Pension contributions at sergeant level",
      body:
        `Sergeants contribute **${pensionPct}%** of pensionable pay to the CARE 2015 pension scheme.\n\n:::table\n| Pay point | Gross salary | Annual pension | Monthly pension |\n|---|---|---|---|\n${sergeantPP.map((s, i) => `| PP${i + 1} | ${gbp(s)} | ${gbp(Math.round(s * policePensionRate))} | ${gbp(Math.round(s * policePensionRate / 12))} |`).join("\n")}\n:::\n\nPension is deducted before income tax but after National Insurance. The employer contributes 31% on top.`,
    },
    {
      heading: "Progression to inspector",
      body:
        `A sergeant at PP3 (${gbp(sergeantPP[2])}) who passes the NPPF inspector assessment moves to the [inspector pay scale](/police-inspector-pay-calculator/) at **${gbp(inspectorPP[0])}** (PP1), an increase of ${gbp(inspectorPP[0] - sergeantPP[2])}. Inspectors are salaried ranks and **do not receive paid overtime**, so the financial impact of promotion should be considered alongside the loss of overtime earnings.\n\nThe NPPF inspector process includes an online exam and an operational assessment. Some forces require a minimum period at sergeant rank before eligibility.`,
    },
    {
      heading: "Summary",
      body:
        `Sergeant pay runs from ${gbp(sergeantPP[0])} to ${gbp(sergeantPP[2])} across three pay points. Overtime at time and a third applies for rest-day working. London Weighting adds \u00a3${londonWeighting.toLocaleString("en-GB")}. Pension is ${pensionPct}% under the CARE 2015 scheme. For exact take-home figures, use the [take-home pay calculator](/take-home-pay-calculator/) or the [national insurance calculator](/national-insurance-calculator/).`,
    },
  ],
  faq: [
    {
      question: "What is a police sergeant\u2019s salary in 2026?",
      answer: `A police sergeant in England and Wales earns ${gbp(sergeantPP[0])} to ${gbp(sergeantPP[2])} across three pay points in 2026/27. Monthly gross ranges from ${gbp(Math.round(sergeantPP[0] / 12))} to ${gbp(Math.round(sergeantPP[2] / 12))}.`,
    },
    {
      question: "How much more does a sergeant earn than a constable?",
      answer: `A new sergeant at PP1 (${gbp(sergeantPP[0])}) earns ${gbp(sergeantPP[0] - constablePP[6])} more per year than a top-of-scale constable at PP7 (${gbp(constablePP[6])}).`,
    },
    {
      question: "Do sergeants get paid overtime?",
      answer: "Yes. Sergeants are entitled to paid overtime at time and a third for rest-day working and double time for bank holidays, on the same basis as constables.",
    },
    {
      question: "How long does it take to become a sergeant?",
      answer: "Most forces require a minimum of two years\u2019 service before eligibility. The NPPF assessment includes an online exam and work-based assessment. Typical time from joining to promotion is 5\u201310 years.",
    },
    {
      question: "Do detective sergeants earn more than uniformed sergeants?",
      answer: "No. Detective sergeants follow the same national pay scale. The detective designation does not carry an automatic pay premium.",
    },
    {
      question: "What pension does a sergeant contribute?",
      answer: `Sergeants contribute ${pensionPct}% under the CARE 2015 scheme. At PP3 (${gbp(sergeantPP[2])}), this is ${gbp(Math.round(sergeantPP[2] * policePensionRate))} per year.`,
    },
  ],
  relatedSlugs: [
    "police-pay-scale-calculator",
    "police-constable-pay-calculator",
    "police-inspector-pay-calculator",
    "take-home-pay-calculator",
  ],
  defaults: { annualSalary: sergeantPP[2] },
});

// ──────────────────────────────────────────
// 4. INSPECTOR PAY CALCULATOR
// ──────────────────────────────────────────

const inspectorPage: CalculatorContent = calculator({
  type: "calculator",
  slug: "police-inspector-pay-calculator",
  kind: "police-pay",
  title: "Police Inspector Pay Scale 2026/27 | UK Salary Guide",
  metaDescription:
    "Police inspector salary 2026/27: " + gbp(inspectorPP[0]) + " to " + gbp(inspectorPP[3]) + ". Chief inspector " + gbp(chiefInspectorPP[0]) + " to " + gbp(chiefInspectorPP[2]) + ". Salaried rank — no paid overtime.",
  h1: "Police Inspector & Chief Inspector Pay Scale 2026/27",
  intro:
    "A police inspector in England and Wales earns **" + gbp(inspectorPP[0]) + "** to **" + gbp(inspectorPP[3]) + "** and a chief inspector earns **" + gbp(chiefInspectorPP[0]) + "** to **" + gbp(chiefInspectorPP[2]) + "** in 2026/27. Both are **salaried ranks** and do not receive paid overtime. This page covers the full pay scales, promotion from sergeant, pension and take-home estimates. For all ranks, see the [police pay scale calculator](/police-pay-scale-calculator/).",
  formulaExplainer:
    `Inspector and Chief Inspector are salaried ranks. The hourly rate is notional only: annual salary \u00f7 ${policeAnnualHours.toLocaleString("en-GB")}. No paid overtime applies, though some forces offer rest-day compensation or time off in lieu. Pension is ${pensionPct}% of pensionable pay under the CARE 2015 scheme.`,
  howToSteps: [
    { name: "Identify your rank and pay point", text: "Inspector has four pay points (PP1\u2013PP4). Chief Inspector has three pay points (PP1\u2013PP3)." },
    { name: "Check the 2026/27 salary", text: "The confirmed 3.5% uplift applies from 1 September 2026 to all ranks." },
    { name: "Note: no paid overtime", text: "Inspectors and above are salaried. Rest-day compensation varies by force." },
    { name: "Estimate take-home", text: "Deduct 12.44% pension, income tax and National Insurance from gross salary." },
  ],
  sections: [
    {
      heading: "Inspector pay scale 2026/27",
      body:
        `An inspector progresses through four pay points.\n\n:::table\n| Pay point | Annual salary | Monthly gross | Hourly rate (notional) |\n|---|---|---|---|\n${inspectorTable()}\n:::\n\nOn promotion from sergeant PP3 (${gbp(sergeantPP[2])}), a new inspector moves to PP1 (${gbp(inspectorPP[0])}), an increase of **${gbp(inspectorPP[0] - sergeantPP[2])}**. However, the loss of paid overtime can reduce actual take-home pay for officers who previously worked significant rest-day shifts.`,
    },
    {
      heading: "Chief Inspector pay scale 2026/27",
      body:
        `A chief inspector progresses through three pay points.\n\n:::table\n| Pay point | Annual salary | Monthly gross | Hourly rate (notional) |\n|---|---|---|---|\n${chiefInspectorTable()}\n:::\n\nPromotion from inspector PP4 (${gbp(inspectorPP[3])}) to chief inspector PP1 (${gbp(chiefInspectorPP[0])}) is an increase of ${gbp(chiefInspectorPP[0] - inspectorPP[3])}.`,
    },
    {
      heading: "Salaried rank: no paid overtime",
      body:
        `Inspector is the first rank in the police service where paid overtime is **not available** under Police Regulations 2003. This is a significant financial consideration when deciding whether to seek promotion from sergeant.\n\nA sergeant at PP3 (${gbp(sergeantPP[2])}) who regularly works 8 hours of rest-day overtime per month earns approximately ${gbp(Math.round(policeHourlyRate(sergeantPP[2]) * (4/3) * 8 * 12))} in overtime per year, bringing total earnings to around ${gbp(Math.round(sergeantPP[2] + policeHourlyRate(sergeantPP[2]) * (4/3) * 8 * 12))}. An inspector at PP1 earns ${gbp(inspectorPP[0])} with no overtime. The break-even point depends on how much overtime the sergeant works.\n\n:::callout warn\nSome forces offer rest-day compensation (time off in lieu or a \u201crest-day buy-back\u201d scheme), but these are not guaranteed nationally and may be withdrawn.\n:::`,
    },
    {
      heading: "Promotion to inspector (NPPF)",
      body:
        `Promotion to inspector requires passing the **National Police Promotion Framework (NPPF)** assessment at inspector level. The process typically includes:\n\n1. **Eligibility** \u2014 a minimum period as sergeant (usually 2 years, varies by force)\n2. **National Investigators\u2019 Exam (NIE)** or equivalent online assessment\n3. **Work-based assessment** \u2014 demonstrating operational command competence\n4. **Force selection** \u2014 may include interview, assessment centre or both\n\nChief Inspector promotion follows a similar process, with additional emphasis on strategic command. Each force sets its own timeline and requirements.`,
    },
    {
      heading: "London Weighting at inspector level",
      body:
        `London-based inspectors and chief inspectors receive **\u00a3${londonWeighting.toLocaleString("en-GB")}** per year. Some London forces also have separate Inspector pay rates that differ slightly from the national scale \u2014 check with your force HR.\n\nAn inspector at PP4 in London earns ${gbp(inspectorPP[3] + londonWeighting)} gross. A chief inspector at PP3 earns ${gbp(chiefInspectorPP[2] + londonWeighting)} gross.`,
    },
    {
      heading: "Pension at inspector and chief inspector level",
      body:
        `All officers contribute **${pensionPct}%** of pensionable pay to the CARE 2015 scheme.\n\n:::table\n| Rank | Top pay point | Annual pension | Monthly pension |\n|---|---|---|---|\n| Inspector PP4 | ${gbp(inspectorPP[3])} | ${gbp(Math.round(inspectorPP[3] * policePensionRate))} | ${gbp(Math.round(inspectorPP[3] * policePensionRate / 12))} |\n| Chief Inspector PP3 | ${gbp(chiefInspectorPP[2])} | ${gbp(Math.round(chiefInspectorPP[2] * policePensionRate))} | ${gbp(Math.round(chiefInspectorPP[2] * policePensionRate / 12))} |\n:::\n\nAt these salary levels, a significant portion of income falls in the higher-rate tax band (40% above \u00a350,270 of taxable income). Use the [take-home pay calculator](/take-home-pay-calculator/) for an accurate breakdown.`,
    },
    {
      heading: "Superintendent and Chief Superintendent",
      body:
        `Above Chief Inspector, the superintendent ranks are:\n\n- **Superintendent:** ${gbp(superintendentPP[0])}\u2013${gbp(superintendentPP[3])} (four pay points)\n- **Chief Superintendent:** ${gbp(chiefSuperintendentPP[0])}\u2013${gbp(chiefSuperintendentPP[2])} (three pay points)\n\nThese ranks are salaried and subject to the Senior Salary Review Body recommendations. Promotion to superintendent requires the Strategic Command Course or equivalent. See the main [police pay scale calculator](/police-pay-scale-calculator/) for the full table.`,
    },
  ],
  faq: [
    {
      question: "What is a police inspector\u2019s salary in 2026?",
      answer: `An inspector in England and Wales earns ${gbp(inspectorPP[0])} to ${gbp(inspectorPP[3])} across four pay points in 2026/27. Monthly gross ranges from ${gbp(Math.round(inspectorPP[0] / 12))} to ${gbp(Math.round(inspectorPP[3] / 12))}.`,
    },
    {
      question: "Do inspectors get paid overtime?",
      answer: "No. Inspector is a salaried rank. There is no entitlement to paid overtime. Some forces offer rest-day compensation or time off in lieu at their discretion.",
    },
    {
      question: "Is promotion from sergeant to inspector worth it financially?",
      answer: `It depends on overtime. An inspector at PP1 earns ${gbp(inspectorPP[0])}, which is ${gbp(inspectorPP[0] - sergeantPP[2])} more than a sergeant at PP3. But a sergeant who works regular overtime could earn more than an inspector in total.`,
    },
    {
      question: "What is a Chief Inspector\u2019s salary?",
      answer: `A Chief Inspector earns ${gbp(chiefInspectorPP[0])} to ${gbp(chiefInspectorPP[2])} across three pay points in 2026/27.`,
    },
    {
      question: "What pension do inspectors pay?",
      answer: `Inspectors contribute ${pensionPct}% under the CARE 2015 scheme. At PP4 (${gbp(inspectorPP[3])}), this is ${gbp(Math.round(inspectorPP[3] * policePensionRate))} per year.`,
    },
    {
      question: "How much does a superintendent earn?",
      answer: `A superintendent earns ${gbp(superintendentPP[0])} to ${gbp(superintendentPP[3])} and a Chief Superintendent earns ${gbp(chiefSuperintendentPP[0])} to ${gbp(chiefSuperintendentPP[2])} in 2026/27.`,
    },
    {
      question: "What is the London Weighting for inspectors?",
      answer: `Metropolitan Police and City of London inspectors receive \u00a3${londonWeighting.toLocaleString("en-GB")} per year on top of the national pay scale.`,
    },
  ],
  relatedSlugs: [
    "police-pay-scale-calculator",
    "police-sergeant-pay-calculator",
    "police-constable-pay-calculator",
    "take-home-pay-calculator",
    "national-insurance-calculator",
  ],
  defaults: { annualSalary: inspectorPP[3] },
});

// ──────────────────────────────────────────
// EXPORT
// ──────────────────────────────────────────

export const policeCalculators: CalculatorContent[] = [
  pillarPage,
  constablePage,
  sergeantPage,
  inspectorPage,
];
