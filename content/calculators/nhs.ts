import { bandRange, nhsPayBands, nhsSlug, type Nation } from "@/data/nhs-pay-bands";
import { calculator, type CalculatorContent } from "../types";

const nationLabel: Record<Nation, string> = {
  england: "England",
  scotland: "Scotland",
  wales: "Wales",
  "northern-ireland": "Northern Ireland",
};

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

interface TargetBandConfig {
  salaries: number[];
  progression: string[];
  roles: string;
  scope: string;
}

const englandTargetBands: Record<string, TargetBandConfig> = {
  "2": {
    salaries: [25272],
    progression: ["Entry and top point"],
    roles: "healthcare assistants, receptionists, porters, domestic staff and administrative support workers",
    scope: "delivering direct support or operational services under established procedures",
  },
  "3": {
    salaries: [25760, 27476],
    progression: ["Entry: under 2 years", "Top: 2+ years"],
    roles: "emergency care assistants, occupational therapy support workers and experienced clinical support staff",
    scope: "working with greater autonomy than Band 2 while following defined clinical or operational protocols",
  },
  "4": {
    salaries: [28392, 31157],
    progression: ["Entry: under 3 years", "Top: 3+ years"],
    roles: "assistant practitioners, pharmacy technicians, dental nurses and trainee psychological wellbeing practitioners",
    scope: "using specialist technical knowledge or delivering delegated care with defined accountability",
  },
  "5": {
    salaries: [32073, 34592, 39043],
    progression: ["Entry: under 2 years", "Intermediate: 2–4 years", "Top: 4+ years"],
    roles: "newly qualified nurses, midwives, paramedics, physiotherapists, occupational therapists and radiographers",
    scope: "holding professional registration and delivering autonomous clinical care within a defined scope of practice",
  },
  "6": {
    salaries: [39959, 42170, 48117],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "specialist nurses, junior sisters or charge nurses, experienced midwives, paramedics and biomedical scientists",
    scope: "taking specialist clinical responsibility, supervising colleagues or coordinating a defined service area",
  },
  "7": {
    salaries: [49387, 51932, 56515],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "ward managers, senior midwives, advanced practitioners, specialist therapists and pharmacists",
    scope: "leading a team or pathway, making complex decisions and holding responsibility for service standards",
  },
  "8a": {
    salaries: [57528, 60417, 64750],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "matrons, advanced clinical practitioners, service managers and speciality leads",
    scope: "combining advanced professional practice with substantial leadership, budget or service responsibility",
  },
  "8b": {
    salaries: [66582, 70896, 77368],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "deputy directors, consultant therapists, principal clinical psychologists and heads of specialist services",
    scope: "holding accountability for a large service, strategic clinical programme or professional group with significant budget or workforce responsibility",
  },
  "8c": {
    salaries: [79504, 84346, 91609],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "heads of clinical services, senior operational leaders and large-programme or workforce leads",
    scope: "setting strategy and directing complex services across multiple teams, sites or professional groups",
  },
  "8d": {
    salaries: [94356, 100140, 108814],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "directors of operations, directors of nursing, senior medical directors and chief allied health professionals",
    scope: "holding executive-level accountability for a directorate, a major trust-wide professional group or a regional transformation programme",
  },
  "9": {
    salaries: [112782, 119583, 129783],
    progression: ["Entry: under 2 years", "Intermediate: 2–5 years", "Top: 5+ years"],
    roles: "directors of clinical services, chief professional leads and the most senior Agenda for Change posts",
    scope: "holding organisation-wide strategic accountability for major services, professions or transformation programmes",
  },
};

const pensionTier = (salary: number): { rate: number; range: string } => {
  if (salary <= 13259) return { rate: 5.2, range: "up to £13,259" };
  if (salary <= 28854) return { rate: 6.5, range: "£13,260–£28,854" };
  if (salary <= 35155) return { rate: 8.3, range: "£28,855–£35,155" };
  if (salary <= 52778) return { rate: 9.8, range: "£35,156–£52,778" };
  if (salary <= 67668) return { rate: 10.7, range: "£52,779–£67,668" };
  return { rate: 12.5, range: "£67,669 and above" };
};

const createEnglandBandContent = (band: string, config: TargetBandConfig): CalculatorContent => {
  const entry = config.salaries[0];
  const top = config.salaries[config.salaries.length - 1];
  const unsocial = band === "2"
    ? { standard: 41, higher: 83 }
    : band === "3"
      ? { standard: 35, higher: 69 }
      : { standard: 30, higher: 60 };
  const overtimeEligible = !band.startsWith("8") && band !== "9";
  const salaryRows = config.salaries
    .map((salary, index) => `| ${config.progression[index]} | ${gbp(salary)} | ${gbp(salary / 12)} |`)
    .join("\n");
  const pensionRows = config.salaries
    .map((salary, index) => {
      const tier = pensionTier(salary);
      return `| ${config.progression[index]} | ${gbp(salary)} | ${tier.rate}% | ${gbp(salary * tier.rate / 100)} |`;
    })
    .join("\n");
  const progressionSummary = config.salaries.length === 1
    ? `Band ${band} has one national salary value in England for 2026/27. The pay scale still shows an eligibility point after two years, but the entry and top values are both ${gbp(entry)}.`
    : `The 2026/27 scale moves from ${gbp(entry)} to ${gbp(top)} across ${config.salaries.length} pay points. Time in post makes you eligible for a pay-step review; progression is not simply a yearly increment.`;
  const roleProgression = band === "9"
    ? "Movement beyond Band 9 may mean a very senior manager contract rather than another Agenda for Change band."
    : `A move to a higher band requires a role with greater evaluated responsibility; reaching the top of Band ${band} does not itself re-band the post.`;
  const overtimeText = overtimeEligible
    ? "Bands 1 to 7 are eligible for Section 3 overtime: authorised hours above 37.5 in a week are normally time-and-a-half, except general public holidays at double time. Part-time additional hours remain plain time until total weekly hours exceed 37.5."
    : "The handbook says staff in Bands 8 and 9 are not entitled to Section 3 overtime payments. Contracted unsocial hours can still attract Section 2 enhancements, but extra time, on-call arrangements and local allowances must be checked against the contract and local policy.";

  return calculator({
    type: "calculator",
    slug: nhsSlug(band, "england"),
    kind: "nhs-band",
    nhsPreset: { nation: "england", band, stepIndex: 0, hoursPerWeek: 37.5 },
    title: `NHS Band ${band} Take Home Pay Calculator 2026/27 England`,
    metaDescription: `NHS Band ${band} take home pay calculator for England 2026/27: ${gbp(entry)}–${gbp(top)} salary points, net pay after tax, pension and NI, plus part-time FTE examples`,
    h1: `NHS Band ${band} Take Home Pay Calculator — England`,
    intro: `NHS Band ${band} basic pay in England is ${gbp(entry)}${entry === top ? "" : ` to ${gbp(top)}`} in 2026/27. Use the calculator to convert any official pay point to part-time pay by FTE, then check the band-specific guidance below for progression, NHS pension tiers and unsocial-hours payments. The figures are gross basic pay from 1 April 2026, before tax, pension and local additions.`,
    formulaExplainer: `The calculator uses **annual basic pay × FTE**. FTE is contracted weekly hours divided by the English Agenda for Change full-time week of 37.5 hours: 30 hours is 0.8 FTE, while 22.5 hours is 0.6 FTE. At the ${gbp(top)} Band ${band} point, 0.8 FTE is ${gbp(top * 0.8)} a year and 0.6 FTE is ${gbp(top * 0.6)}. Section 2 enhancements, overtime, High Cost Area Supplements and other allowances are separate from this basic-pay result.`,
    howToSteps: [
      {
        name: "Choose the correct Band pay point",
        text: `Select ${config.progression.join(", ").toLowerCase()} and enter its 2026/27 full-time salary.`,
      },
      {
        name: "Convert weekly hours to FTE",
        text: "Divide contracted weekly hours by 37.5. For example, 30 ÷ 37.5 gives 0.8 FTE.",
      },
      {
        name: "Calculate pro rata basic pay",
        text: "Multiply the full-time pay point by FTE. The result is annual gross basic pay before additions and deductions.",
      },
      {
        name: "Check additions and deductions separately",
        text: "Add eligible shift enhancements or HCAS, then check the NHS pension tier, tax and National Insurance for the expected payslip amount.",
      },
    ],
    sections: [
      {
        heading: `What is NHS Band ${band} pay in 2026/27?`,
        body: `**NHS Band ${band} pay in England is ${gbp(entry)}${entry === top ? "" : ` to ${gbp(top)}`} from 1 April 2026.** NHS Employers publishes these annual and hourly Agenda for Change rates. The monthly values below are annual basic salary divided by 12; an actual payslip can differ because payroll dates, pension, PAYE, National Insurance and variable shift pay apply.\n\n:::table\n| Pay point | Annual basic pay | Monthly gross basic |\n|---|---|---|\n${salaryRows}\n:::`,
      },
      {
        heading: `Band ${band} roles and pay progression`,
        body: `${progressionSummary} Typical examples include ${config.roles}. These examples are not guarantees: Agenda for Change banding follows the evaluated demands of the post, not the job title alone. At Band ${band}, the role commonly involves ${config.scope}. ${roleProgression}\n\nA pay-step review checks the standards in the NHS Terms and Conditions of Service Handbook, including appraisal and required training. Check the pay-step date in your contract or ESR.`,
      },
      {
        heading: `Part-time NHS Band ${band} salary examples`,
        body: `Part-time basic pay uses the same full-time point multiplied by FTE. This means two Band ${band} employees can have different annual salaries because they are at different pay points or work different hours, without either salary being wrong. The table gives quick planning examples before enhancements.\n\n:::table\n| Example | Calculation | Annual basic pay |\n|---|---|---|\n| Entry point at 0.6 FTE | ${gbp(entry)} × 0.6 | ${gbp(entry * 0.6)} |\n| Entry point at 0.8 FTE | ${gbp(entry)} × 0.8 | ${gbp(entry * 0.8)} |\n| Top point at 0.8 FTE | ${gbp(top)} × 0.8 | ${gbp(top * 0.8)} |\n| Top point at 0.5 FTE | ${gbp(top)} × 0.5 | ${gbp(top * 0.5)} |\n:::\n\nUse contracted hours, excluding unpaid breaks, when converting hours to FTE.`,
      },
      {
        heading: `Band ${band} unsocial hours and overtime`,
        body: `Under Section 2 of the NHS Terms and Conditions of Service Handbook for England, Band ${band} standard hours worked on Saturdays or on weekdays after 8pm and before 6am attract **time plus ${unsocial.standard}%**. Sundays and public holidays attract **time plus ${unsocial.higher}%**. These are enhancements on eligible basic hourly pay, not a replacement salary and not the same as overtime. Only one unsocial rate applies to an hour. A continuous weekday evening or night shift receives the night enhancement for the whole shift when more than half falls between 8pm and 6am.\n\n${overtimeText}`,
      },
      {
        heading: `NHS pension tiers at Band ${band}`,
        body: `NHS pension member contributions use **actual annual pensionable pay**, not the full-time salary of a part-time post. NHS Employers' official 2026/27 tiers are 5.2% up to £13,259; 6.5% from £13,260 to £28,854; 8.3% from £28,855 to £35,155; 9.8% from £35,156 to £52,778; 10.7% from £52,779 to £67,668; and 12.5% from £67,669. The table applies those tiers to full-time Band ${band} basic pay only.\n\n:::table\n| Pay point | Basic pay | Likely rate | Basic-pay contribution |\n|---|---|---|---|\n${pensionRows}\n:::\n\nRegular pensionable enhancements or another pensionable NHS post can change the assessed tier.`,
      },
      {
        heading: `Band ${band} pay edge cases`,
        body: `Basic-pay calculations need adjustment in several common cases. A London **High Cost Area Supplement** is added separately and does not increase the Section 2 enhancement rate. Acting-up or temporary higher duties may use a locally determined payment rather than moving every hour to another band. A second NHS employment can have a separate FTE and pay point, while pension payroll treatment may consider the pensionable earnings under scheme rules. Bank work can follow a separate rate. Back pay can also make one payslip unusually high without changing annual basic pay.\n\n:::callout warn\nDo not add an unsocial-hours enhancement and overtime enhancement to the same basic hour without checking the handbook and local payroll treatment.\n:::`,
      },
      {
        heading: `Summary: use the Band ${band} calculator`,
        body: `Start with the official 2026/27 England Band ${band} pay point, enter the FTE, and treat the result as gross annual basic pay. Use 37.5 hours as full-time when converting contracted hours to FTE. Then add only the payments that apply to the post, such as eligible Section 2 unsocial hours, HCAS, on-call pay or a recruitment and retention premium. Finally, check actual pensionable pay against the NHS pension tier table before estimating take-home pay. The calculator does not decide whether a post is correctly banded or whether a pay-step standard has been met; use the job description, contract, ESR record and local payroll team for those questions.`,
      },
    ],
    faq: [
      {
        question: `What is the NHS Band ${band} salary in England for 2026/27?`,
        answer: `NHS Band ${band} basic pay is ${config.salaries.map(gbp).join(", ")} from 1 April 2026. The applicable value depends on the official pay point and pay-step eligibility.`,
      },
      {
        question: `How long does NHS Band ${band} pay progression take?`,
        answer: `${progressionSummary} Progression depends on a pay-step review and the standards in the NHS Terms and Conditions of Service Handbook.`,
      },
      {
        question: `What NHS pension rate applies at Band ${band}?`,
        answer: `The rate depends on actual annual pensionable pay, so part-time hours and pensionable enhancements matter. At the full-time Band ${band} points shown, the likely rates are ${[...new Set(config.salaries.map((salary) => pensionTier(salary).rate))].map((rate) => `${rate}%`).join(" or ")}.`,
      },
      {
        question: `What unsocial-hours rate does Band ${band} receive?`,
        answer: `In England, eligible Band ${band} standard hours attract time plus ${unsocial.standard}% on Saturdays and weekday nights, or time plus ${unsocial.higher}% on Sundays and public holidays. Section 2 rules and exclusions still apply.`,
      },
      {
        question: `How much is Band ${band} pay at 0.8 FTE?`,
        answer: `At 0.8 FTE, Band ${band} basic pay runs from ${gbp(entry * 0.8)}${entry === top ? "" : ` to ${gbp(top * 0.8)}`} a year in 2026/27. This excludes enhancements, HCAS and deductions.`,
      },
      {
        question: "Does this calculator include London weighting, overtime or shift enhancements?",
        answer: "No. It calculates pro rata basic pay only. Add HCAS, authorised overtime, unsocial-hours payments, on-call pay and local allowances separately where they apply.",
      },
    ],
    relatedSlugs: ["nhs-take-home-pay", "nhs-pay-comparison", "pro-rata-calculator"],
    defaults: { fullTimeSalary: top, fte: 1 },
  });
};

const createScotlandBand6Content = (): CalculatorContent => {
  const salaries = [43231, 45135, 52679];
  const [entry, intermediate, top] = salaries;
  return calculator({
    type: "calculator",
    slug: nhsSlug("6", "scotland"),
    kind: "nhs-band",
    nhsPreset: { nation: "scotland", band: "6", stepIndex: 0, hoursPerWeek: 36 },
    title: "NHS Band 6 Pay Calculator Scotland 2026/27",
    metaDescription: "Calculate NHS Scotland Band 6 pay for 2026/27 at £43,231, £45,135 or £52,679, including part-time examples based on a 36-hour week",
    h1: "NHS Band 6 Pay Calculator — Scotland",
    intro: `NHS Scotland Band 6 basic pay is ${gbp(entry)}, ${gbp(intermediate)} or ${gbp(top)} in 2026/27. Use this calculator to convert the appropriate full-time point to part-time pay. NHS Scotland's standard full-time week is **36 hours**, so calculate FTE from contracted hours divided by 36 rather than using England's 37.5-hour denominator.`,
    formulaExplainer: `Part-time NHS Scotland Band 6 pay is **full-time annual salary × FTE**, where FTE equals contracted weekly hours divided by 36. For example, 30 hours is 0.8333 FTE, giving about ${gbp(top * 30 / 36)} at the ${gbp(top)} top point. The result is basic pay only; shift enhancements, overtime, pension, tax and local payments are separate.`,
    howToSteps: [
      { name: "Choose the Band 6 pay point", text: `Enter ${gbp(entry)}, ${gbp(intermediate)} or ${gbp(top)} for the relevant 2026/27 point.` },
      { name: "Calculate Scottish FTE", text: "Divide contracted weekly hours by 36, using unrounded FTE where possible." },
      { name: "Read annual basic pay", text: "The calculator multiplies full-time salary by FTE and divides the result by 12 for a monthly equivalent." },
      { name: "Add Scottish terms separately", text: "Check the NHS Scotland handbook, pension rules and local payroll treatment for shifts, overtime and deductions." },
    ],
    sections: [
      {
        heading: "What is NHS Scotland Band 6 pay in 2026/27?",
        body: `The three full-time Band 6 salaries are shown below. They are gross basic pay before NHS pension contributions, Scottish Income Tax, National Insurance or roster payments.\n\n:::table\n| Pay point | Annual basic pay | Monthly gross basic |\n|---|---|---|\n| Entry | ${gbp(entry)} | ${gbp(entry / 12)} |\n| Intermediate | ${gbp(intermediate)} | ${gbp(intermediate / 12)} |\n| Top | ${gbp(top)} | ${gbp(top / 12)} |\n:::\n\nA job title does not set the band by itself. The evaluated duties and responsibilities of the NHS Scotland post determine whether Band 6 applies.`,
      },
      {
        heading: "How the 36-hour week changes Band 6 FTE",
        body: `NHS Scotland's full-time week is 36 hours in 2026/27. Divide the contract by 36 before multiplying by salary: 30 hours is 0.8333 FTE, 24 hours is 0.6667 FTE and 18 hours is 0.5 FTE.\n\n:::table\n| Hours | FTE | Entry-point pay | Top-point pay |\n|---|---|---|---|\n| 30 | 0.8333 | ${gbp(entry * 30 / 36)} | ${gbp(top * 30 / 36)} |\n| 24 | 0.6667 | ${gbp(entry * 24 / 36)} | ${gbp(top * 24 / 36)} |\n| 18 | 0.5 | ${gbp(entry * 0.5)} | ${gbp(top * 0.5)} |\n:::\n\nAvoid importing a 37.5-hour denominator from an English vacancy because it understates Scottish FTE.`,
      },
      {
        heading: "Band 6 progression and responsibilities in Scotland",
        body: `Band 6 posts commonly require specialist practice, independent judgement, supervision or coordination of a defined clinical or operational area. Salary progression and the timing of pay points follow the applicable NHS Scotland terms, so use the contract and HR record rather than assuming England's pay-step timetable. Promotion to Band 7 depends on securing or being appointed to a role evaluated at Band 7; reaching the Band 6 top point does not automatically re-band the existing job. Secondments, acting-up arrangements and protected pay can also change the amount shown on a payslip without changing the substantive Band 6 salary.`,
      },
      {
        heading: "Scottish shift pay, overtime and pension",
        body: `Shift enhancements and overtime are separate from the basic salary calculation. Check the current **NHS Scotland Agenda for Change Handbook** and local roster policy rather than applying England's Section 2 percentages, because country-specific provisions can differ. NHS pension member rates also use pensionable earnings and Scotland has its own contribution table. Regular enhancements may be pensionable and can affect the contribution tier, while overtime or local payments may be treated differently. The calculator therefore leaves all shift and pension amounts outside the FTE result so you can add only the terms that actually apply to the post.`,
      },
      {
        heading: "Band 6 Scotland edge cases",
        body: `A 36-hour full-time week does not mean every shift pattern totals exactly 36 hours each week; annualised or rotating rosters may average the contractual total over a longer cycle. Unpaid breaks should not be counted as contracted hours. Bank shifts can use separate rates, and a second NHS role may have its own band, hours and pension treatment. Back pay, overtime, on-call payments and deductions can make an individual month's gross pay look inconsistent with annual salary divided by 12. Use the annual contract values for FTE, then reconcile variable items against the payslip and local payroll guidance.`,
      },
      {
        heading: "Summary: calculate Scottish Band 6 pay",
        body: `Choose the correct 2026/27 Band 6 salary, divide contracted weekly hours by **36**, and enter that FTE in the calculator. The output is annual and monthly gross basic pay. Keep the unrounded FTE for the calculation, particularly for 30-hour and 24-hour contracts, because rounding early creates a small annual difference. Add Scottish shift enhancements, overtime, on-call pay and any local allowances only after checking the NHS Scotland handbook or payroll policy. Finally, apply the Scottish NHS pension contribution tier and Scottish Income Tax separately when estimating take-home pay.`,
      },
    ],
    faq: [
      { question: "What is NHS Scotland Band 6 pay in 2026/27?", answer: `The full-time Band 6 pay points are ${gbp(entry)}, ${gbp(intermediate)} and ${gbp(top)} a year.` },
      { question: "How many hours is full-time in NHS Scotland?", answer: "Use 36 hours a week for 2026/27 NHS Scotland Agenda for Change FTE calculations." },
      { question: "What is 30 hours as an NHS Scotland FTE?", answer: "Thirty hours divided by 36 is 0.8333 FTE. Keep more decimal places when calculating annual pay." },
      { question: "Does this include NHS Scotland shift enhancements?", answer: "No. The result is pro rata basic pay; add eligible shift, overtime, on-call and local payments under the current Scottish terms." },
      { question: "Does England use the same Band 6 salary and hours?", answer: "No. England has different 2026/27 Band 6 pay points and normally uses a 37.5-hour full-time week." },
      { question: "Which pension rate applies to Scottish Band 6 pay?", answer: "The Scottish NHS pension rate depends on actual pensionable earnings under Scotland's contribution table. Check current SPPA or payroll guidance, especially if regular enhancements apply." },
    ],
    relatedSlugs: ["nhs-take-home-pay", "nhs-pay-comparison", "pro-rata-calculator"],
    defaults: { fullTimeSalary: top, fte: 1 },
  });
};

const createGenericBandContent = (band: string, nation: Nation): CalculatorContent => {
  const { entry, top } = bandRange(band, nation);
  const label = nationLabel[nation];
  const bandTitle = `NHS Band ${band}`;
  return calculator({
    type: "calculator",
    slug: nhsSlug(band, nation),
    kind: "nhs-band",
    nhsPreset: { nation: nation === "northern-ireland" ? "england" : nation, band, stepIndex: 0 },
    title: `${bandTitle} Pay Calculator ${label} (Agenda for Change)`,
    metaDescription: `NHS Band ${band} salary in ${label}: ${gbp(entry)}–${gbp(top)} full-time. Calculate part-time NHS pay by FTE with this free Agenda for Change calculator.`,
    h1: `${bandTitle} Pay Calculator — ${label}`,
    intro: `NHS Band ${band} salaries in ${label} range from ${gbp(entry)} at the entry point to ${gbp(top)} at the top of the band on the verified 2026/27 Agenda for Change scale. Choose the band point and contracted hours to see gross pay, NHS pension, tax, National Insurance and estimated take-home pay.`, 
    formulaExplainer: `Part-time NHS pay is worked out pro rata: full-time salary multiplied by your FTE fraction. For example, a ${gbp(top)} full-time salary at 0.6 FTE equals ${gbp(top * 0.6)} per year. Unsocial hours enhancements and High Cost Area Supplements (where applicable) are added on top and are not included in this calculation.`,
    faq: [
      {
        question: `What is the NHS Band ${band} salary in ${label}?`,
        answer: `Under the 2026/27 Agenda for Change scale, NHS Band ${band} in ${label} pays ${gbp(entry)} at entry rising to ${gbp(top)} at the top of the band. Pay-step eligibility and review requirements apply.`, 
      },
      {
        question: "How is part-time NHS pay calculated?",
        answer: "Part-time NHS pay is pro rata: multiply the full-time salary by your FTE fraction (contracted hours divided by full-time hours, usually 37.5 per week). At 0.5 FTE you receive half the full-time salary.",
      },
      {
        question: "Does this include unsocial hours or London weighting?",
        answer: "No. This calculator shows basic pay only. Unsocial hours enhancements and High Cost Area Supplements (inner/outer London and fringe) are calculated separately on top of basic pay.",
      },
    ],
    relatedSlugs: [],
    defaults: { fullTimeSalary: top, fte: 1 },
  });
};


interface ScotlandBandConfig {
  salaries: number[];
  progression: string[];
  roles: string;
  pensionRates: string;
}

const scotlandTargetBands: Record<string, ScotlandBandConfig> = {
  "5": {
    salaries: [34544, 36911, 43039],
    progression: ["Entry", "Intermediate", "Top"],
    roles: "newly qualified nurses, midwives, paramedics, physiotherapists and radiographers",
    pensionRates: "8.7% across all three points under current SPPA tiers",
  },
  "7": {
    salaries: [52845, 54863, 61466],
    progression: ["Entry", "Intermediate", "Top"],
    roles: "ward managers, advanced practitioners, specialist pharmacists and senior therapists",
    pensionRates: "10.5% at entry and intermediate, 11.2% at top under current SPPA tiers",
  },
  "8a": {
    salaries: [65125, 70303],
    progression: ["Entry", "Top"],
    roles: "advanced clinical practitioners, matrons, principal pharmacists and clinical service managers",
    pensionRates: "11.6% under current SPPA tiers",
  },
  "9": {
    salaries: [127521, 133044],
    progression: ["Entry", "Top"],
    roles: "directors of clinical services, chief professional leads and the most senior Agenda for Change posts",
    pensionRates: "12.7% under current SPPA tiers",
  },
};

const createScotlandBandContent = (band: string, config: ScotlandBandConfig): CalculatorContent => {
  const entry = config.salaries[0];
  const top = config.salaries[config.salaries.length - 1];
  const salaryRows = config.salaries
    .map((salary, index) => `| ${config.progression[index]} | ${gbp(salary)} | ${gbp(salary / 12)} |`)
    .join("\n");
  const fteRows = [30, 24, 18]
    .map((h) => `| ${h} | ${(h / 36).toFixed(4)} | ${gbp(entry * h / 36)} | ${gbp(top * h / 36)} |`)
    .join("\n");
  return calculator({
    type: "calculator",
    slug: nhsSlug(band, "scotland"),
    kind: "nhs-band",
    nhsPreset: { nation: "scotland", band, stepIndex: 0, hoursPerWeek: 36 },
    title: `NHS Band ${band} Pay Calculator Scotland 2026/27`,
    metaDescription: `Calculate NHS Scotland Band ${band} pay for 2026/27 at ${gbp(entry)}${entry === top ? "" : ` to ${gbp(top)}`}. Part-time FTE based on the 36-hour Scottish week, pension tiers and take-home estimates.`,
    h1: `NHS Band ${band} Pay Calculator \u2014 Scotland`,
    intro: `NHS Scotland Band ${band} basic pay is ${config.salaries.map(gbp).join(", ")} in 2026/27. Use this calculator to estimate take-home pay after Scottish Income Tax, National Insurance and NHS pension. Scotland\u2019s standard Agenda for Change week is **36 hours**, so FTE is contracted hours divided by 36.`,
    formulaExplainer: `Part-time NHS Scotland Band ${band} pay is **full-time annual salary \u00d7 FTE**, where FTE equals contracted weekly hours divided by 36. At the ${gbp(top)} top point, 30 hours gives 0.8333 FTE and approximately ${gbp(top * 30 / 36)} a year. Scottish Income Tax applies through the S-prefix tax code (e.g. S1257L), so take-home differs from the English equivalent even at the same gross salary.`,
    howToSteps: [
      { name: "Choose the Band pay point", text: `Select ${config.progression.join(", ").toLowerCase()} and enter the 2026/27 full-time salary.` },
      { name: "Calculate Scottish FTE", text: "Divide contracted weekly hours by 36. Keep unrounded FTE for accuracy." },
      { name: "Read take-home estimate", text: "The calculator applies SPPA pension, Scottish Income Tax bands and National Insurance to the pro-rata salary." },
      { name: "Add Scottish terms separately", text: "Check the NHS Scotland handbook and local payroll for shift enhancements, overtime and on-call." },
    ],
    sections: [
      {
        heading: `What is NHS Scotland Band ${band} pay in 2026/27?`,
        body: `**NHS Scotland Band ${band} pays ${gbp(entry)}${entry === top ? "" : ` to ${gbp(top)}`} from 1 April 2026.** These are gross basic-pay figures before pension, Scottish Income Tax, National Insurance or any enhancements. Monthly values are annual salary divided by 12; actual payslips vary.\n\n:::table\n| Pay point | Annual basic pay | Monthly gross basic |\n|---|---|---|\n${salaryRows}\n:::`,
      },
      {
        heading: "How the 36-hour week changes FTE",
        body: `NHS Scotland\u2019s full-time week is 36 hours in 2026/27. Divide the contract by 36 before multiplying by salary.\n\n:::table\n| Hours | FTE | Entry-point pay | Top-point pay |\n|---|---|---|---|\n${fteRows}\n:::\n\nDo not use England\u2019s 37.5-hour denominator; it understates Scottish FTE.`,
      },
      {
        heading: `Band ${band} roles and progression in Scotland`,
        body: `Typical NHS Scotland Band ${band} roles include ${config.roles}. Banding follows the evaluated demands of the post, not the job title alone. Salary progression and pay-step timing follow the applicable NHS Scotland terms. A move to a higher band requires a role with greater evaluated responsibility; reaching the top of Band ${band} does not itself re-band the existing job. Check the [NHS pay comparison calculator](/nhs-pay-comparison/) to see the net-pay difference between band points or nations.`,
      },
      {
        heading: "Scottish Income Tax and NI",
        body: `Scottish residents use S-prefix tax codes. The 2026/27 Scottish bands are 19% starter (\u00a32,306), 20% basic (\u00a311,211), 21% intermediate (\u00a317,527), 42% higher (above \u00a331,044 of taxable income) and 47% top rate (above \u00a3125,140 of taxable income). The additional rate is 48% above \u00a3150,000. Employee National Insurance uses the same UK-wide thresholds: 8% on \u00a312,570\u2013\u00a350,270 and 2% above. Use the [take-home pay calculator](/take-home-pay-calculator/) for a full gross-to-net comparison.`,
      },
      {
        heading: `NHS pension at Band ${band} in Scotland`,
        body: `SPPA (Scottish Public Pensions Agency) sets Scotland\u2019s pension tiers separately from NHS England. The Band ${band} full-time points are likely to fall into ${config.pensionRates}. Part-time staff pay on actual annual pensionable pay, which can differ from the full-time rate. Regular pensionable enhancements or a second NHS post can also change the assessed tier.`,
      },
      {
        heading: "Shift enhancements and overtime",
        body: `Shift enhancements and overtime follow the **NHS Scotland Agenda for Change Handbook**, which can differ from England\u2019s Section 2 percentages. Do not apply English enhancement rates to a Scottish contract without checking the handbook and local policy. The calculator leaves shift and overtime outside the basic FTE result so you add only what applies to the post.`,
      },
      {
        heading: `Summary: calculate Scottish Band ${band} pay`,
        body: `Start with the official 2026/27 Scotland Band ${band} pay point, divide contracted hours by **36** for FTE, and let the calculator estimate pension, tax and take-home. Add eligible shift and on-call payments under Scottish terms only after checking the handbook. Compare with the [England Band ${band} page](/nhs-band-${band}-pay-calculator/) or use the [NHS take-home pay calculator](/nhs-take-home-pay/) for a wider band comparison.`,
      },
    ],
    faq: [
      { question: `What is NHS Scotland Band ${band} pay in 2026/27?`, answer: `Full-time Band ${band} pay in Scotland is ${config.salaries.map(gbp).join(", ")} a year.` },
      { question: "How many hours is full-time in NHS Scotland?", answer: "36 hours a week for 2026/27 NHS Scotland Agenda for Change." },
      { question: `What is 30 hours as a Scottish FTE?`, answer: "30 \u00f7 36 = 0.8333 FTE. Keep decimal places when calculating annual pay." },
      { question: "Does Scotland use different income tax rates?", answer: "Yes. Scottish residents pay the starter, basic, intermediate, higher, advanced and top rates through an S-prefix tax code." },
      { question: `Does England use the same Band ${band} salary?`, answer: "No. England has different 2026/27 pay points and a 37.5-hour full-time week." },
      { question: "Which pension scheme applies in Scotland?", answer: "NHS Scotland staff are in the Scottish NHS Pension Scheme administered by SPPA, with its own contribution tiers." },
    ],
    relatedSlugs: ["nhs-take-home-pay", "nhs-pay-comparison", `nhs-band-${band}-pay-calculator`],
    defaults: { fullTimeSalary: top, fte: 1 },
  });
};

interface WalesBandConfig {
  salaries: number[];
  progression: string[];
  roles: string;
}

const walesTargetBands: Record<string, WalesBandConfig> = {
  "5": {
    salaries: [32557, 35114, 39631],
    progression: ["Entry", "Intermediate", "Top"],
    roles: "newly qualified nurses, midwives, paramedics, physiotherapists, occupational therapists and radiographers",
  },
  "6": {
    salaries: [40559, 42805, 48841],
    progression: ["Entry", "Intermediate", "Top"],
    roles: "specialist nurses, experienced midwives, paramedics, biomedical scientists and junior sisters",
  },
  "7": {
    salaries: [50129, 52712, 57365],
    progression: ["Entry", "Intermediate", "Top"],
    roles: "ward managers, advanced nurses, specialist pharmacists, senior therapists and team leaders",
  },
  "8a": {
    salaries: [58379, 61317, 65723],
    progression: ["Entry", "Intermediate", "Top"],
    roles: "matrons, advanced clinical practitioners, principal pharmacists and clinical service managers",
  },
};

const createWalesBandContent = (band: string, config: WalesBandConfig): CalculatorContent => {
  const entry = config.salaries[0];
  const top = config.salaries[config.salaries.length - 1];
  const salaryRows = config.salaries
    .map((salary, index) => `| ${config.progression[index]} | ${gbp(salary)} | ${gbp(salary / 12)} |`)
    .join("\n");
  return calculator({
    type: "calculator",
    slug: nhsSlug(band, "wales"),
    kind: "nhs-band",
    nhsPreset: { nation: "wales", band, stepIndex: 0, hoursPerWeek: 37.5 },
    title: `NHS Band ${band} Pay Calculator Wales 2026/27`,
    metaDescription: `Calculate NHS Wales Band ${band} pay for 2026/27 at ${gbp(entry)}${entry === top ? "" : ` to ${gbp(top)}`}. Part-time FTE, Welsh tax code, pension tiers and take-home estimate.`,
    h1: `NHS Band ${band} Pay Calculator \u2014 Wales`,
    intro: `NHS Wales Band ${band} basic pay is ${config.salaries.map(gbp).join(", ")} in 2026/27. Use this calculator to estimate take-home pay after income tax, National Insurance and NHS pension. Wales uses a **37.5-hour** full-time week like England, and Welsh income tax rates currently match the rest-of-UK bands under the C-prefix tax code (e.g. C1257L).`,
    formulaExplainer: `Part-time NHS Wales Band ${band} pay is **full-time annual salary \u00d7 FTE**, where FTE equals contracted weekly hours divided by 37.5. At the ${gbp(top)} top point, 30 hours gives 0.8 FTE and ${gbp(top * 0.8)} a year. Welsh tax codes (C1257L) currently apply the same income tax rates as England.`,
    howToSteps: [
      { name: "Choose the Band pay point", text: `Select ${config.progression.join(", ").toLowerCase()} and enter the 2026/27 full-time salary.` },
      { name: "Calculate FTE", text: "Divide contracted weekly hours by 37.5, the same as England." },
      { name: "Read take-home estimate", text: "The calculator applies NHS pension, income tax and National Insurance to the pro-rata salary." },
      { name: "Check Welsh terms", text: "Add eligible shift enhancements, overtime and any local payments under the NHS Wales handbook." },
    ],
    sections: [
      {
        heading: `What is NHS Wales Band ${band} pay in 2026/27?`,
        body: `**NHS Wales Band ${band} pays ${gbp(entry)}${entry === top ? "" : ` to ${gbp(top)}`} from 1 April 2026.** These are gross basic-pay figures before pension, income tax, National Insurance or any enhancements.\n\n:::table\n| Pay point | Annual basic pay | Monthly gross basic |\n|---|---|---|\n${salaryRows}\n:::\n\nWales has its own Agenda for Change pay scales, negotiated through NHS Wales Employers. The 2026/27 figures may differ from England\u2019s rates.`,
      },
      {
        heading: `Band ${band} roles in Wales`,
        body: `Typical NHS Wales Band ${band} roles include ${config.roles}. Banding follows the job evaluation scheme, not the title. Salary progression follows the NHS Wales terms and conditions. A move to a higher band requires a role evaluated at that level. Compare bands using the [NHS pay comparison calculator](/nhs-pay-comparison/).`,
      },
      {
        heading: "Welsh income tax and National Insurance",
        body: `Since April 2019, Welsh residents have had devolved income tax rates set by the Senedd, shown on payslips through a C-prefix tax code (e.g. C1257L). The 2026/27 Welsh rates currently match the rest-of-UK bands: 20% basic, 40% higher, 45% additional. Employee NI uses the same UK-wide thresholds. If the Senedd ever sets different rates, the C-prefix code ensures HMRC applies the correct Welsh amounts. Use the [take-home pay calculator](/take-home-pay-calculator/) for a full gross-to-net comparison.`,
      },
      {
        heading: "NHS pension in Wales",
        body: `NHS Wales staff are members of the NHS Pension Scheme administered in line with NHS England\u2019s contribution tiers. The 2026/27 tiers are 5.2% up to \u00a313,259; 6.5% from \u00a313,260 to \u00a328,854; 8.3% from \u00a328,855 to \u00a335,155; 9.8% from \u00a335,156 to \u00a352,778; 10.7% from \u00a352,779 to \u00a367,668; and 12.5% from \u00a367,669. Part-time staff pay on actual annual pensionable pay.`,
      },
      {
        heading: "Shift enhancements and overtime",
        body: `NHS Wales follows its own Agenda for Change handbook. Section 2 unsocial-hours enhancements and Section 3 overtime rates may differ from England\u2019s. Check the current NHS Wales terms and local roster policy rather than assuming English enhancement percentages apply.`,
      },
      {
        heading: "Part-time examples",
        body: `\n:::table\n| Example | Calculation | Annual basic pay |\n|---|---|---|\n| Entry at 0.6 FTE | ${gbp(entry)} \u00d7 0.6 | ${gbp(entry * 0.6)} |\n| Entry at 0.8 FTE | ${gbp(entry)} \u00d7 0.8 | ${gbp(entry * 0.8)} |\n| Top at 0.8 FTE | ${gbp(top)} \u00d7 0.8 | ${gbp(top * 0.8)} |\n| Top at 0.5 FTE | ${gbp(top)} \u00d7 0.5 | ${gbp(top * 0.5)} |\n:::`,
      },
      {
        heading: `Summary: calculate Welsh Band ${band} pay`,
        body: `Start with the official 2026/27 Wales Band ${band} pay point, divide contracted hours by **37.5** for FTE, and let the calculator estimate pension, tax and take-home. Add eligible shift and on-call payments under Welsh terms after checking the NHS Wales handbook. Compare with the [England Band ${band} page](/nhs-band-${band}-pay-calculator/) or use the [NHS take-home pay calculator](/nhs-take-home-pay/) for a wider comparison.`,
      },
    ],
    faq: [
      { question: `What is NHS Wales Band ${band} pay in 2026/27?`, answer: `Full-time Band ${band} pay in Wales is ${config.salaries.map(gbp).join(", ")} a year.` },
      { question: "Does Wales use the same tax rates as England?", answer: "Currently yes. Welsh income tax rates match the rest-of-UK bands, applied through a C-prefix tax code." },
      { question: "How many hours is full-time in NHS Wales?", answer: "37.5 hours a week, the same as England." },
      { question: `Does England use the same Band ${band} salary?`, answer: "Not necessarily. England has its own 2026/27 pay points which may differ from the Welsh scale." },
      { question: "Which pension scheme applies in Wales?", answer: "NHS Wales staff are in the NHS Pension Scheme with the same contribution tiers as England." },
      { question: "Does this include shift enhancements?", answer: "No. The result is basic pay and standard deductions only. Add eligible shift, overtime and local payments separately under NHS Wales terms." },
    ],
    relatedSlugs: ["nhs-take-home-pay", "nhs-pay-comparison", `nhs-band-${band}-pay-calculator`],
    defaults: { fullTimeSalary: top, fte: 1 },
  });
};
// One calculator page per (band, nation) combination — the matrix that
// /app/[slug] turns into static pages via generateStaticParams.
export const nhsCalculators: CalculatorContent[] = nhsPayBands
  .map((point) => `${point.band}:${point.nation}`)
  .filter((key, index, keys) => keys.indexOf(key) === index)
  .map((key) => {
    const [band, nation] = key.split(":") as [string, Nation];
    if (nation === "england" && englandTargetBands[band]) {
      return createEnglandBandContent(band, englandTargetBands[band]);
    }
    if (nation === "scotland" && band === "6") {
      return createScotlandBand6Content();
    }
    if (nation === "scotland" && scotlandTargetBands[band]) {
      return createScotlandBandContent(band, scotlandTargetBands[band]);
    }
    if (nation === "wales" && walesTargetBands[band]) {
      return createWalesBandContent(band, walesTargetBands[band]);
    }
    return createGenericBandContent(band, nation);
  });
