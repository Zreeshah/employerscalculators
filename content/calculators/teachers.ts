import {
  teacherPayScales,
  teacherPensionRate,
  teacherPensionTiers,
  leadershipRanges,
  leadingPractitionerRanges,
  regionLabel,
  type TeacherRegion,
} from "@/data/teachers-pay-scales";
import { calculator, type CalculatorContent } from "../types";

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

// Helper: get salaries for a scale + region
function salariesFor(scale: string, region: TeacherRegion): number[] {
  return teacherPayScales
    .filter((p) => p.scale === scale && p.region === region)
    .map((p) => p.annualSalary);
}

// Build pension tier table rows
const pensionTierRows = teacherPensionTiers
  .map((t) => `| ${t.upTo ? `Up to ${gbp(t.upTo)}` : `Above ${gbp(teacherPensionTiers[teacherPensionTiers.length - 2].upTo!)}` } | ${(t.rate * 100).toFixed(1)}% |`)
  .join("\n");

// ===================== PILLAR PAGE =====================

const pillarPage = (): CalculatorContent => {
  const eMain = salariesFor("main", "england");
  const eUpper = salariesFor("upper", "england");
  const eUnq = salariesFor("unqualified", "england");
  const iMain = salariesFor("main", "inner-london");
  const oMain = salariesFor("main", "outer-london");
  const fMain = salariesFor("main", "fringe");

  const mainRows = eMain.map((s, i) => `| M${i + 1} | ${gbp(s)} | ${gbp(iMain[i])} | ${gbp(oMain[i])} | ${gbp(fMain[i])} |`).join("\n");
  const upperRows = eUpper.map((s, i) => `| UPS${i + 1} | ${gbp(s)} | ${gbp(salariesFor("upper", "inner-london")[i])} | ${gbp(salariesFor("upper", "outer-london")[i])} | ${gbp(salariesFor("upper", "fringe")[i])} |`).join("\n");

  return calculator({
    type: "calculator",
    slug: "teachers-pay-scale-calculator",
    kind: "teachers-pay",
    title: "Teachers Pay Scale Calculator UK 2026/27 | All Ranges & Regions",
    metaDescription: "Free UK teachers pay scale calculator for 2026/27. Check Main (M1\u2013M6), Upper (UPS1\u2013UPS3), Leadership and Unqualified pay across England, London, Scotland and Wales with take-home estimates.",
    h1: "Teachers Pay Scale Calculator 2026/27",
    intro: `The 2026/27 teachers pay scale runs from ${gbp(eMain[0])} at M1 to ${gbp(eUpper[2])} at UPS3 outside London, and up to ${gbp(148829)} for the most senior head teachers. Use this calculator to check your gross pay, TPS pension contribution and estimated take-home at any pay point or FTE fraction. The tables below cover **Main, Upper, Unqualified, Leading Practitioner and Leadership** ranges across all four England regions, plus links to the separate [Scottish](/teachers-pay-scale-scotland/) and [Welsh](/teachers-pay-scale-wales/) scales.`,
    formulaExplainer: `Teacher take-home pay is calculated as **gross salary \u2212 Teachers\u2019 Pension \u2212 income tax \u2212 employee National Insurance**. Part-time pay uses the FTE fraction: contracted hours divided by 32.5 (the standard directed-time week in most schools). A 0.6 FTE teacher on M6 outside London earns ${gbp(Math.round(eMain[5] * 0.6))} gross. TPS contributions are tiered: ${(teacherPensionRate(eMain[0]) * 100).toFixed(1)}% at M1 rising to ${(teacherPensionRate(eUpper[2]) * 100).toFixed(1)}% at UPS3. Use the [take-home pay calculator](/take-home-pay-calculator/) for a full gross-to-net breakdown, or the [national insurance calculator](/national-insurance-calculator/) to see NI in isolation.`,
    howToSteps: [
      { name: "Find your pay range", text: "Qualified classroom teachers are on the Main (M1\u2013M6) or Upper (UPS1\u2013UPS3) range. Unqualified teachers, leading practitioners and leaders have separate scales." },
      { name: "Select your region", text: "England has four pay bands: Rest of England, Inner London, Outer London and London Fringe. Scotland and Wales have their own structures." },
      { name: "Enter your pay point and FTE", text: "Full-time is 1.0 FTE. Part-time is your contracted hours divided by 32.5. For example, 3 days a week is typically 0.6 FTE." },
      { name: "Read your take-home estimate", text: "The calculator deducts TPS pension, income tax and National Insurance from your gross pay." },
    ],
    sections: [
      {
        heading: "Main Pay Range (M1\u2013M6) 2026/27",
        body: `The **Main Pay Range** covers newly qualified teachers through to experienced classroom teachers who have not yet moved to the Upper Pay Range. The 2026/27 figures below apply from 1 September 2026, following the confirmed 5.5% pay award. For a detailed breakdown of each pay point, see the [Main Pay Range page](/teachers-main-pay-scale/).\n\n:::table\n| Pay point | Rest of England | Inner London | Outer London | Fringe |\n|---|---|---|---|---|\n${mainRows}\n:::\n\nProgression from M1 to M6 is not automatic. Schools make annual pay decisions based on performance, and teachers normally need a successful appraisal to move up. Academy and free schools can set their own pay structures outside the STPCD.`,
      },
      {
        heading: "Upper Pay Range (UPS1\u2013UPS3) 2026/27",
        body: `Teachers who meet the Upper Pay Range threshold standards can apply to move from M6 to UPS1. The application process requires evidence of sustained high performance and substantial contribution to the school. Read the full [Upper Pay Range guide](/teachers-upper-pay-scale/) for application details.\n\n:::table\n| Pay point | Rest of England | Inner London | Outer London | Fringe |\n|---|---|---|---|---|\n${upperRows}\n:::\n\nMovement from UPS1 to UPS3 is subject to the same performance-based assessment. The gap between M6 and UPS1 outside London is ${gbp(eUpper[0] - eMain[5])} a year.`,
      },
      {
        heading: "Unqualified Teacher Scale",
        body: `The Unqualified Teacher Scale applies to teachers without Qualified Teacher Status (QTS), including graduates working towards QTS through School Direct or assessment-only routes, and specialist instructors. Outside London, the scale runs from ${gbp(eUnq[0])} at UQ1 to ${gbp(eUnq[5])} at UQ6.\n\nOnce QTS is obtained, the teacher moves onto the Main Pay Range at a point that reflects their experience, typically at the school\u2019s discretion. The pension contribution rate at UQ1 (${gbp(eUnq[0])}) is ${(teacherPensionRate(eUnq[0]) * 100).toFixed(1)}%.`,
      },
      {
        heading: "Leadership and Leading Practitioner",
        body: `**Leadership Group** pay covers head teachers, deputy heads and assistant heads. The STPCD defines an overall range of ${gbp(leadershipRanges.england.min)} to ${gbp(leadershipRanges.england.max)} outside London, with eight head teacher group bands based on pupil numbers and age range. Governing bodies set the individual school range (ISR) within the relevant band. See the full [Leadership Pay Scale page](/teachers-leadership-pay-scale/) for band details.\n\n**Leading Practitioners** are outstanding classroom teachers who develop teaching practice across the school without taking on management. The range is ${gbp(leadingPractitionerRanges.england.min)} to ${gbp(leadingPractitionerRanges.england.max)} outside London. Schools place teachers within the range based on the scope and complexity of the role.`,
      },
      {
        heading: "Teachers\u2019 Pension Scheme (TPS) tiers",
        body: `TPS member contributions use a tiered structure based on **actual annual pensionable earnings**, not the full-time equivalent rate. A part-time teacher\u2019s tier is determined by their actual part-time salary, not the full-time equivalent. The 2026/27 tiers are:\n\n:::table\n| Salary band | Contribution rate |\n|---|---|\n${pensionTierRows}\n:::\n\nAt M1 outside London (${gbp(eMain[0])}), the annual pension contribution is approximately ${gbp(Math.round(eMain[0] * teacherPensionRate(eMain[0])))}. At UPS3 (${gbp(eUpper[2])}), it rises to approximately ${gbp(Math.round(eUpper[2] * teacherPensionRate(eUpper[2])))}. The employer contribution is 28.68% on top, which does not come out of the teacher\u2019s pay.`,
      },
      {
        heading: "Part-time teacher pay examples",
        body: `Part-time pay is calculated as **full-time salary \u00d7 FTE**. The standard directed-time week in most maintained schools is 32.5 hours, so FTE = contracted hours \u00f7 32.5.\n\n:::table\n| Scenario | Calculation | Annual gross |\n|---|---|---|\n| M1 at 0.6 FTE | ${gbp(eMain[0])} \u00d7 0.6 | ${gbp(Math.round(eMain[0] * 0.6))} |\n| M6 at 0.8 FTE | ${gbp(eMain[5])} \u00d7 0.8 | ${gbp(Math.round(eMain[5] * 0.8))} |\n| UPS3 at 0.4 FTE | ${gbp(eUpper[2])} \u00d7 0.4 | ${gbp(Math.round(eUpper[2] * 0.4))} |\n| M3 Inner London at 0.6 FTE | ${gbp(iMain[2])} \u00d7 0.6 | ${gbp(Math.round(iMain[2] * 0.6))} |\n:::\n\nRemember that the pension contribution tier is based on the actual part-time salary, not the full-time equivalent. A 0.6 FTE teacher on M6 earns ${gbp(Math.round(eMain[5] * 0.6))}, which falls into the ${(teacherPensionRate(Math.round(eMain[5] * 0.6)) * 100).toFixed(1)}% pension tier rather than the ${(teacherPensionRate(eMain[5]) * 100).toFixed(1)}% tier that applies to the full-time M6 salary.`,
      },
      {
        heading: "TLR, SEN and other allowances",
        body: `**Teaching and Learning Responsibility (TLR) payments** are additional amounts for significant sustained responsibility. TLR1 ranges from \u00a39,956 to \u00a316,919; TLR2 from \u00a33,391 to \u00a38,279; TLR3 is a fixed-term payment of \u00a3639 to \u00a33,169. **SEN allowance** ranges from \u00a32,679 to \u00a35,285 for teachers working with pupils with special educational needs.\n\nThese allowances are added to basic salary and are pensionable. They are not included in the pay scale tables above but should be added before calculating pension contributions and take-home pay. Use the [pro rata calculator](/pro-rata-calculator/) if you need to pro-rate a TLR for part-time work.`,
      },
      {
        heading: "Summary: use the teachers pay calculator",
        body: `Find your pay range and region, enter the pay point and FTE fraction, and the calculator estimates your gross pay, TPS contribution and take-home. Add any TLR or SEN allowance separately. For Scottish teachers, use the [Scotland pay scale page](/teachers-pay-scale-scotland/); for Welsh teachers, see the [Wales page](/teachers-pay-scale-wales/); and for London rates, check the [London pay scale page](/teachers-pay-scale-london/). The [NHS take-home pay calculator](/nhs-take-home-pay/) is available if you are comparing careers across the public sector.`,
      },
    ],
    faq: [
      { question: "What is the teachers pay scale for 2026/27?", answer: `The Main Pay Range runs from ${gbp(eMain[0])} (M1) to ${gbp(eMain[5])} (M6) outside London. The Upper Pay Range is ${gbp(eUpper[0])} (UPS1) to ${gbp(eUpper[2])} (UPS3). Inner London rates are higher, starting at ${gbp(iMain[0])} (M1).` },
      { question: "How much is a teacher paid per month?", answer: `A full-time M1 teacher outside London earns approximately ${gbp(Math.round(eMain[0] / 12))} gross per month before pension and tax. After TPS, tax and NI, take-home is roughly ${gbp(Math.round(eMain[0] * (1 - teacherPensionRate(eMain[0])) * 0.77 / 12))} per month.` },
      { question: "How does part-time teacher pay work?", answer: "Part-time pay is the full-time salary multiplied by the FTE fraction. FTE is typically contracted hours divided by 32.5 (the standard directed-time week). A 3-day teacher is usually 0.6 FTE." },
      { question: "What is the Teachers' Pension contribution rate?", answer: `TPS contributions are tiered from ${(teacherPensionTiers[0].rate * 100).toFixed(1)}% on salaries up to ${gbp(teacherPensionTiers[0].upTo!)} to ${(teacherPensionTiers[teacherPensionTiers.length - 1].rate * 100).toFixed(1)}% on salaries above ${gbp(teacherPensionTiers[teacherPensionTiers.length - 2].upTo!)}. The rate applies to actual pensionable pay, not the full-time equivalent.` },
      { question: "How do I move from M6 to UPS1?", answer: "You need to apply through your school\u2019s pay policy. The application requires evidence of sustained high performance and a substantial and sustained contribution to the school. The head teacher or pay committee makes the decision." },
      { question: "Are academy teachers on the same pay scale?", answer: "Academies and free schools are not required to follow the STPCD and can set their own pay structures. Many still use STPCD as a reference, but they are not legally bound to it. Check your contract." },
      { question: "Does Scotland use the same teachers pay scale?", answer: "No. Scotland uses the SNCT (Scottish Negotiating Committee for Teachers) pay structure, which has different pay points and progression rules. See the Scottish teachers pay scale page for details." },
    ],
    relatedSlugs: [
      "teachers-main-pay-scale", "teachers-upper-pay-scale", "teachers-leadership-pay-scale",
      "teachers-pay-scale-scotland", "teachers-pay-scale-wales", "teachers-pay-scale-london",
      "take-home-pay-calculator", "national-insurance-calculator", "pro-rata-calculator",
    ],
    defaults: { annualSalary: 34069 },
  });
};

// ===================== MAIN PAY RANGE =====================

const mainPayPage = (): CalculatorContent => {
  const eng = salariesFor("main", "england");
  const inn = salariesFor("main", "inner-london");
  const out = salariesFor("main", "outer-london");
  const fri = salariesFor("main", "fringe");
  const regionRows = eng.map((s, i) => `| M${i + 1} | ${gbp(s)} | ${gbp(inn[i])} | ${gbp(out[i])} | ${gbp(fri[i])} |`).join("\n");

  return calculator({
    type: "calculator",
    slug: "teachers-main-pay-scale",
    kind: "teachers-pay",
    title: "Teachers Main Pay Range (M1\u2013M6) 2026/27 | Pay Scale UK",
    metaDescription: "Teachers Main Pay Range M1 to M6 for 2026/27. Compare salaries across Rest of England, Inner London, Outer London and Fringe with take-home estimates and pension tiers.",
    h1: "Teachers Main Pay Range (M1\u2013M6) 2026/27",
    intro: `The Main Pay Range covers qualified teachers from their first appointment (M1) through to the top of the classroom teacher scale at M6. Outside London, the range runs from ${gbp(eng[0])} to ${gbp(eng[5])} for the 2026/27 academic year. Inner London teachers start at ${gbp(inn[0])} and reach ${gbp(inn[5])} at M6. Use the [teachers pay scale calculator](/teachers-pay-scale-calculator/) for a full cross-range comparison, or the [Upper Pay Range page](/teachers-upper-pay-scale/) if you have already moved past M6.`,
    formulaExplainer: `Part-time main-range pay is **full-time pay point \u00d7 FTE**. A 0.8 FTE teacher on M3 outside London earns ${gbp(Math.round(eng[2] * 0.8))}. The TPS pension contribution at that actual salary is ${(teacherPensionRate(Math.round(eng[2] * 0.8)) * 100).toFixed(1)}%.`,
    howToSteps: [
      { name: "Find your pay point", text: "M1 is the starting point for newly qualified teachers. Your school places you based on experience and qualifications." },
      { name: "Check your region", text: "Rest of England, Inner London, Outer London or Fringe. Your school\u2019s postcode determines the region." },
      { name: "Calculate part-time pay", text: "Multiply the full-time salary by your FTE fraction (contracted hours \u00f7 32.5)." },
      { name: "Check your pension tier", text: "TPS contributions are tiered on actual salary, not full-time equivalent." },
    ],
    sections: [
      {
        heading: "Main Pay Range table 2026/27",
        body: `All figures are gross annual salaries effective from 1 September 2026, following the confirmed 5.5% pay award.\n\n:::table\n| Pay point | Rest of England | Inner London | Outer London | Fringe |\n|---|---|---|---|---|\n${regionRows}\n:::\n\nThe gap between M1 and M6 outside London is ${gbp(eng[5] - eng[0])} a year (${gbp(Math.round((eng[5] - eng[0]) / 12))} per month). In Inner London, the gap is ${gbp(inn[5] - inn[0])}.`,
      },
      {
        heading: "How Main Pay Range progression works",
        body: `Progression from M1 to M6 is **performance-based**, not automatic. Schools make annual pay decisions, usually after a successful appraisal. The STPCD requires that teachers meeting the appraisal objectives should normally receive a pay increase, but the school\u2019s pay policy governs the timing and size of each step.\n\nA teacher who joins mid-year may not receive a pay increase until the next annual pay review. Some schools allow double pay-point jumps for exceptional performance, but this is at the head teacher\u2019s discretion. Academy and free schools may use entirely different progression rules.`,
      },
      {
        heading: "Starting pay: where do new teachers begin?",
        body: `Most newly qualified teachers (ECTs completing their induction) start at M1. Schools have the discretion to appoint at a higher point to reflect previous relevant experience, additional qualifications, or recruitment difficulties. A career changer with significant professional experience might start at M3 or higher.\n\nThe starting salary at M1 outside London is ${gbp(eng[0])} a year, or approximately ${gbp(Math.round(eng[0] / 12))} gross per month. After TPS pension (${(teacherPensionRate(eng[0]) * 100).toFixed(1)}%), income tax and National Insurance, estimated monthly take-home is around ${gbp(Math.round(eng[0] * (1 - teacherPensionRate(eng[0])) * 0.77 / 12))}.`,
      },
      {
        heading: "Part-time examples on the Main Pay Range",
        body: `:::table\n| Scenario | FTE | Gross annual | Monthly gross |\n|---|---|---|---|\n| M1 at 3 days/week | 0.6 | ${gbp(Math.round(eng[0] * 0.6))} | ${gbp(Math.round(eng[0] * 0.6 / 12))} |\n| M3 at 4 days/week | 0.8 | ${gbp(Math.round(eng[2] * 0.8))} | ${gbp(Math.round(eng[2] * 0.8 / 12))} |\n| M6 at 2.5 days/week | 0.5 | ${gbp(Math.round(eng[5] * 0.5))} | ${gbp(Math.round(eng[5] * 0.5 / 12))} |\n| M4 Inner London at 0.6 FTE | 0.6 | ${gbp(Math.round(inn[3] * 0.6))} | ${gbp(Math.round(inn[3] * 0.6 / 12))} |\n:::`,
      },
      {
        heading: "Pay portability between schools",
        body: `There is no legal requirement for a new school to match your previous pay point. When you change schools, the new school sets your starting pay on the Main Pay Range according to their pay policy. In practice, many schools and trusts will match or improve on the existing pay point to attract candidates, but they are not obliged to do so.\n\nThis is particularly important when moving between a maintained school (which must follow STPCD) and an academy (which may have its own pay structure). Always check the advertised salary range and discuss pay during the recruitment process.`,
      },
      {
        heading: "Moving from M6 to the Upper Pay Range",
        body: `At M6 you can apply to move onto the Upper Pay Range at UPS1. The application requires evidence that you are a highly competent teacher and have made a substantial and sustained contribution to the school. The UPS1 salary outside London is ${gbp(salariesFor("upper", "england")[0])}, a rise of ${gbp(salariesFor("upper", "england")[0] - eng[5])} over M6. See the [Upper Pay Range page](/teachers-upper-pay-scale/) for the full application process and standards.`,
      },
      {
        heading: "Summary",
        body: `The Main Pay Range is where most qualified classroom teachers sit. Use the region tables to find the correct salary, apply the FTE fraction for part-time work, and check the pension tier against your actual salary. For the full picture including leadership and London rates, return to the [teachers pay scale calculator](/teachers-pay-scale-calculator/). To estimate net pay after all deductions, use the [take-home pay calculator](/take-home-pay-calculator/).`,
      },
    ],
    faq: [
      { question: "What is M1 teacher salary in 2026/27?", answer: `M1 is ${gbp(eng[0])} outside London, ${gbp(inn[0])} in Inner London, ${gbp(out[0])} in Outer London and ${gbp(fri[0])} in the Fringe area.` },
      { question: "How long does it take to go from M1 to M6?", answer: "There is no fixed timeline. Each pay point increase requires a successful appraisal. In practice, most teachers reach M6 in 5\u20136 years if they meet performance standards each year." },
      { question: "Can I start above M1?", answer: "Yes. Schools can appoint at any point on the Main Pay Range to reflect prior experience, qualifications or recruitment needs." },
      { question: "Is the pay award automatic?", answer: "The national 5.5% pay award applies to the scale itself. Individual progression through pay points still requires a successful appraisal." },
      { question: "Do academies use the same M1\u2013M6 scale?", answer: "Academies are not required to follow the STPCD. Many do use it as a reference, but they can set their own pay structures. Check your contract." },
      { question: "What pension rate applies at M1?", answer: `At ${gbp(eng[0])}, the TPS contribution is ${(teacherPensionRate(eng[0]) * 100).toFixed(1)}%, which is approximately ${gbp(Math.round(eng[0] * teacherPensionRate(eng[0])))} per year.` },
    ],
    relatedSlugs: ["teachers-pay-scale-calculator", "teachers-upper-pay-scale", "teachers-pay-scale-london", "take-home-pay-calculator"],
    defaults: { annualSalary: eng[0] },
  });
};

// ===================== UPPER PAY RANGE =====================

const upperPayPage = (): CalculatorContent => {
  const eng = salariesFor("upper", "england");
  const inn = salariesFor("upper", "inner-london");
  const out = salariesFor("upper", "outer-london");
  const fri = salariesFor("upper", "fringe");
  const m6Eng = salariesFor("main", "england")[5];
  const rows = eng.map((s, i) => `| UPS${i + 1} | ${gbp(s)} | ${gbp(inn[i])} | ${gbp(out[i])} | ${gbp(fri[i])} |`).join("\n");

  return calculator({
    type: "calculator",
    slug: "teachers-upper-pay-scale",
    kind: "teachers-pay",
    title: "Teachers Upper Pay Range (UPS1\u2013UPS3) 2026/27 | Pay Scale UK",
    metaDescription: "Teachers Upper Pay Range UPS1 to UPS3 for 2026/27. Application process, threshold standards, salary tables for all England regions and pension tier impact.",
    h1: "Teachers Upper Pay Range (UPS1\u2013UPS3) 2026/27",
    intro: `The Upper Pay Range rewards experienced teachers who demonstrate sustained high performance. Outside London, UPS1 is ${gbp(eng[0])}, rising to ${gbp(eng[2])} at UPS3. The step from M6 (${gbp(m6Eng)}) to UPS1 is worth ${gbp(eng[0] - m6Eng)} a year. This page covers the 2026/27 UPS rates across all regions, the application process, evidence requirements and the pension impact of moving up. For the full pay scale including Main and Leadership ranges, see the [teachers pay scale calculator](/teachers-pay-scale-calculator/).`,
    formulaExplainer: `UPS part-time pay follows the same formula: **UPS salary \u00d7 FTE**. At UPS3 outside London, 0.8 FTE is ${gbp(Math.round(eng[2] * 0.8))} gross. The pension tier moves to ${(teacherPensionRate(eng[2]) * 100).toFixed(1)}% at the full-time UPS3 rate.`,
    howToSteps: [
      { name: "Check eligibility", text: "You normally need to be at or near M6 on the Main Pay Range with at least two consecutive successful appraisals." },
      { name: "Prepare your application", text: "Evidence that you are a highly competent teacher and have made a substantial, sustained contribution to the school." },
      { name: "Submit to the head teacher", text: "The application goes through the school\u2019s pay committee. Deadlines vary by school." },
      { name: "Receive the decision", text: "If successful, you move to UPS1. Progression to UPS2 and UPS3 requires further sustained performance." },
    ],
    sections: [
      {
        heading: "Upper Pay Range table 2026/27",
        body: `:::table\n| Pay point | Rest of England | Inner London | Outer London | Fringe |\n|---|---|---|---|---|\n${rows}\n:::\n\nThe gap between UPS1 and UPS3 outside London is ${gbp(eng[2] - eng[0])}. In Inner London it is ${gbp(inn[2] - inn[0])}.`,
      },
      {
        heading: "How to apply for the Upper Pay Range",
        body: `The STPCD requires schools to have a pay policy that explains the application process. In most schools, you submit a written application to the head teacher or pay committee by a deadline (often September or October). The application should demonstrate two things:\n\n1. **Highly competent teacher**: your teaching is consistently good to outstanding, with evidence from lesson observations, pupil outcomes, peer reviews and professional development.\n2. **Substantial and sustained contribution**: you have made a wider contribution to the school beyond your own classroom, such as leading CPD, mentoring colleagues, curriculum development or pastoral leadership.\n\nSchools cannot refuse an application without providing written reasons and a right of appeal.`,
      },
      {
        heading: "Progression from UPS1 to UPS3",
        body: `Movement from UPS1 to UPS2 and then UPS3 is not automatic. Each step requires the school to be satisfied that you continue to meet the UPS standards and have maintained a substantial contribution. In practice, most teachers on the UPS move up roughly every two years, but the school\u2019s pay policy governs the timeline.\n\nUnlike the Main Pay Range, there is no expectation of annual increments. The pay committee reviews UPS teachers\u2019 performance and decides whether to award a pay increase.`,
      },
      {
        heading: "UPS pension impact",
        body: `Moving to UPS changes your TPS contribution tier. At M6 outside London (${gbp(m6Eng)}), the pension rate is ${(teacherPensionRate(m6Eng) * 100).toFixed(1)}%. At UPS1 (${gbp(eng[0])}), it rises to ${(teacherPensionRate(eng[0]) * 100).toFixed(1)}%, increasing the annual contribution by approximately ${gbp(Math.round(eng[0] * teacherPensionRate(eng[0]) - m6Eng * teacherPensionRate(m6Eng)))}.\n\nHowever, the higher pension contribution also builds a larger retirement benefit. The TPS is a career-average scheme where each year\u2019s pensionable earnings contribute to the final pension, so higher UPS pay directly increases your retirement income.`,
      },
      {
        heading: "Part-time UPS examples",
        body: `:::table\n| Scenario | FTE | Gross annual | Pension rate | Annual pension |\n|---|---|---|---|---|\n| UPS1 at 1.0 FTE | 1.0 | ${gbp(eng[0])} | ${(teacherPensionRate(eng[0]) * 100).toFixed(1)}% | ${gbp(Math.round(eng[0] * teacherPensionRate(eng[0])))} |\n| UPS1 at 0.6 FTE | 0.6 | ${gbp(Math.round(eng[0] * 0.6))} | ${(teacherPensionRate(Math.round(eng[0] * 0.6)) * 100).toFixed(1)}% | ${gbp(Math.round(Math.round(eng[0] * 0.6) * teacherPensionRate(Math.round(eng[0] * 0.6))))} |\n| UPS3 at 0.8 FTE | 0.8 | ${gbp(Math.round(eng[2] * 0.8))} | ${(teacherPensionRate(Math.round(eng[2] * 0.8)) * 100).toFixed(1)}% | ${gbp(Math.round(Math.round(eng[2] * 0.8) * teacherPensionRate(Math.round(eng[2] * 0.8))))} |\n:::`,
      },
      {
        heading: "UPS and academy schools",
        body: `Academy and free schools are not legally bound to use the Upper Pay Range. Some academies have replaced UPS with their own pay structures, while others retain it. If you work in an academy, check your contract and the trust\u2019s pay policy to understand how UPS or its equivalent works.\n\nWhen moving from a maintained school (which must use STPCD) to an academy, your UPS pay point is not guaranteed. The academy sets your pay according to its own policy.`,
      },
      {
        heading: "Summary",
        body: `The Upper Pay Range recognises sustained high performance with salaries from ${gbp(eng[0])} to ${gbp(eng[2])} outside London. Apply through your school\u2019s pay policy, provide evidence of high competence and wider contribution, and check the pension tier impact. For leadership roles beyond UPS3, see the [Leadership Pay Scale page](/teachers-leadership-pay-scale/). For a full gross-to-net breakdown, use the [take-home pay calculator](/take-home-pay-calculator/).`,
      },
    ],
    faq: [
      { question: "What is UPS1 salary for teachers in 2026/27?", answer: `UPS1 is ${gbp(eng[0])} outside London, ${gbp(inn[0])} in Inner London, ${gbp(out[0])} in Outer London and ${gbp(fri[0])} in the Fringe.` },
      { question: "How do I apply for UPS?", answer: "Submit a written application to your head teacher or pay committee showing you are a highly competent teacher who has made a substantial and sustained contribution to the school. Check your school\u2019s pay policy for the deadline and required format." },
      { question: "Can a school refuse a UPS application?", answer: "Yes, but the school must provide written reasons and offer a right of appeal through the school\u2019s grievance procedure." },
      { question: "How long between UPS1 and UPS3?", answer: "There is no fixed timeline. Most teachers move up roughly every two years, but progression depends on the school\u2019s pay policy and sustained performance." },
      { question: "Is UPS pay backdated?", answer: "If the application is successful, the new pay point typically applies from 1 September of that academic year, regardless of when the decision is made." },
      { question: "What comes after UPS3?", answer: "The next career step is typically a leadership role (assistant head, deputy head or head teacher) on the Leadership Group pay range, or a Leading Practitioner role." },
    ],
    relatedSlugs: ["teachers-pay-scale-calculator", "teachers-main-pay-scale", "teachers-leadership-pay-scale", "take-home-pay-calculator"],
    defaults: { annualSalary: eng[0] },
  });
};

// ===================== LEADERSHIP =====================

const leadershipPage = (): CalculatorContent => {
  const engL = leadershipRanges.england;
  const innL = leadershipRanges["inner-london"];
  const engLP = leadingPractitionerRanges.england;
  const rangeRows = Object.entries(leadershipRanges).map(([region, r]) => `| ${regionLabel[region as TeacherRegion]} | ${gbp(r.min)} | ${gbp(r.max)} |`).join("\n");

  return calculator({
    type: "calculator",
    slug: "teachers-leadership-pay-scale",
    kind: "teachers-pay",
    title: "Teachers Leadership Pay Scale 2026/27 | Head Teacher Pay UK",
    metaDescription: "Teachers leadership pay scale 2026/27: head teacher, deputy head and assistant head salary ranges across all England regions. School group bands, ISR guidance and pension tiers.",
    h1: "Teachers Leadership Pay Scale 2026/27",
    intro: `The Leadership Group pay range covers head teachers, deputy heads and assistant heads. For the 2026/27 academic year, the overall range runs from ${gbp(engL.min)} to ${gbp(engL.max)} outside London. Governing bodies set the salary within the relevant school group band based on pupil numbers and age range. This page covers group bands, individual school ranges (ISR) and the pension impact at leadership-level salaries. For classroom teacher rates, return to the [teachers pay scale calculator](/teachers-pay-scale-calculator/) or the [Upper Pay Range page](/teachers-upper-pay-scale/).`,
    formulaExplainer: `Leadership pay is set within a range, not at a fixed point. The governing body decides the head teacher\u2019s salary within the school\u2019s group band, and the head teacher sets deputy/assistant head salaries within the overall range. TPS pension at leadership salaries is ${(teacherPensionRate(engL.min) * 100).toFixed(1)}% to ${(teacherPensionRate(engL.max) * 100).toFixed(1)}% depending on actual pensionable pay.`,
    howToSteps: [
      { name: "Identify the school group", text: "The school\u2019s group is determined by pupil numbers and age range, placing it in one of eight head teacher group bands." },
      { name: "Set the ISR", text: "The governing body sets an individual school range (ISR) within the group band for the head teacher role." },
      { name: "Determine the salary", text: "The head teacher\u2019s salary is set within the ISR. Deputy and assistant head salaries are set within the overall leadership range." },
    ],
    sections: [
      {
        heading: "Leadership Group range by region",
        body: `The overall Leadership Group range for 2026/27:\n\n:::table\n| Region | Minimum | Maximum |\n|---|---|---|\n${rangeRows}\n:::\n\nWithin these ranges, the governing body decides the specific salary for head teachers based on the school group band, and head teachers set deputy/assistant head pay within the overall range.`,
      },
      {
        heading: "Head teacher group bands",
        body: `The STPCD defines eight head teacher group bands based on the school\u2019s total unit score (calculated from pupil numbers and age range). Smaller primary schools fall into Groups 1\u20132, while large secondary schools and all-through schools are typically Groups 6\u20138.\n\nThe governing body sets an Individual School Range (ISR) of at least seven consecutive points within the relevant group band. If the school\u2019s circumstances make recruitment difficult, the governing body can set the ISR up to 25% above the group band maximum, subject to external advice.`,
      },
      {
        heading: "Deputy and assistant head teacher pay",
        body: `Deputy and assistant heads are paid within the overall Leadership Group range (${gbp(engL.min)}\u2013${gbp(engL.max)} outside London). The head teacher recommends the salary, and the governing body approves it. There is no requirement for the deputy\u2019s pay to be within the head teacher\u2019s group band, but STPCD guidance expects reasonable differentials between roles.\n\nA deputy head\u2019s salary should not normally exceed the head teacher\u2019s salary. The pay committee must ensure the structure reflects the relative responsibilities of each role.`,
      },
      {
        heading: "Leading Practitioner range",
        body: `The Leading Practitioner range is separate from the Leadership Group and rewards outstanding classroom practitioners. Outside London, it runs from ${gbp(engLP.min)} to ${gbp(engLP.max)}. Schools have wide discretion in placing teachers within this range.\n\nLeading practitioners model excellent teaching, coach colleagues, lead CPD and may work across multiple schools in a trust. The role provides a genuine career pathway for excellent teachers who want to progress without moving into management.`,
      },
      {
        heading: "Pension at leadership salaries",
        body: `TPS pension contributions at leadership-level salaries are significant. At ${gbp(80000)}, the contribution rate is ${(teacherPensionRate(80000) * 100).toFixed(1)}%, costing approximately ${gbp(Math.round(80000 * teacherPensionRate(80000)))} per year. At ${gbp(120000)}, the rate rises to ${(teacherPensionRate(120000) * 100).toFixed(1)}%, costing approximately ${gbp(Math.round(120000 * teacherPensionRate(120000)))}.\n\nHead teachers earning above \u00a3100,000 also face the Personal Allowance taper, which creates an effective 60% marginal tax rate between \u00a3100,000 and \u00a3125,140. The [take-home pay calculator](/take-home-pay-calculator/) models this.`,
      },
      {
        heading: "Summary",
        body: `Leadership pay is set within ranges rather than fixed points. Governing bodies determine head teacher pay through group bands and ISRs, while deputy and assistant head pay sits within the overall Leadership Group range. For classroom teacher rates, see the [Main Pay Range](/teachers-main-pay-scale/) or [Upper Pay Range](/teachers-upper-pay-scale/) pages. Use the [take-home pay calculator](/take-home-pay-calculator/) for net pay at leadership salaries, particularly above \u00a3100,000 where the Personal Allowance taper applies.`,
      },
    ],
    faq: [
      { question: "What is the head teacher pay range for 2026/27?", answer: `The overall Leadership Group range is ${gbp(engL.min)} to ${gbp(engL.max)} outside London. The actual salary depends on the school\u2019s group band and the ISR set by the governing body.` },
      { question: "How are head teacher group bands determined?", answer: "By the school\u2019s total unit score, calculated from pupil numbers and age range. There are eight group bands in the STPCD." },
      { question: "Can a deputy head earn more than the head teacher?", answer: "The STPCD says this should not normally happen. The governing body must ensure reasonable pay differentials between leadership roles." },
      { question: "What is a Leading Practitioner?", answer: `A Leading Practitioner is an outstanding classroom teacher who develops teaching practice across the school without taking on management. The pay range is ${gbp(engLP.min)} to ${gbp(engLP.max)} outside London.` },
      { question: "Do academies use Leadership Group pay?", answer: "Academies can set their own pay structures. Many use the STPCD Leadership Group as a reference, but they are not legally required to follow it." },
      { question: "What pension rate applies to head teachers?", answer: `TPS contributions at leadership-level salaries range from ${(teacherPensionRate(engL.min) * 100).toFixed(1)}% to ${(teacherPensionRate(engL.max) * 100).toFixed(1)}% depending on actual pensionable pay.` },
    ],
    relatedSlugs: ["teachers-pay-scale-calculator", "teachers-upper-pay-scale", "take-home-pay-calculator"],
    defaults: { annualSalary: engL.min },
  });
};

// ===================== SCOTLAND =====================

const scotlandPage = (): CalculatorContent => {
  const scot = salariesFor("main", "scotland");
  const eng = salariesFor("main", "england");
  const compRows = scot.map((s, i) => `| M${i + 1} | ${gbp(s)} | ${gbp(eng[i])} | ${gbp(s - eng[i])} |`).join("\n");

  return calculator({
    type: "calculator",
    slug: "teachers-pay-scale-scotland",
    kind: "teachers-pay",
    title: "Scottish Teachers Pay Scale 2026/27 | SNCT Rates",
    metaDescription: "Scottish teachers pay scale 2026/27 under SNCT. Compare M1\u2013M6 rates with England, check Chartered Teacher pay, Scottish tax impact and TPS pension tiers.",
    h1: "Scottish Teachers Pay Scale 2026/27",
    intro: `Scottish teachers are paid under the **SNCT (Scottish Negotiating Committee for Teachers)** pay structure, which differs from England\u2019s STPCD. The 2026/27 main grade runs from ${gbp(scot[0])} at M1 to ${gbp(scot[5])} at M6. Scotland does not use the Upper Pay Range; instead, teachers can progress to **Chartered Teacher** status at ${gbp(52539)}. Scottish residents also pay Scottish Income Tax through an S-prefix tax code, which affects take-home pay at higher salary levels. For the English pay scale, see the [teachers pay scale calculator](/teachers-pay-scale-calculator/).`,
    formulaExplainer: `Scottish teacher take-home pay uses the same formula as England (**gross \u2212 pension \u2212 tax \u2212 NI**) but with Scottish Income Tax rates applied through the S-prefix tax code (e.g. S1257L). The starter rate is 19%, basic 20%, intermediate 21%, higher 42%, advanced 45% and top 48%. Use the [take-home pay calculator](/take-home-pay-calculator/) for a full Scottish gross-to-net breakdown.`,
    howToSteps: [
      { name: "Identify your SNCT pay point", text: "Scottish teachers start as probationers, then move to the main grade M1\u2013M6." },
      { name: "Check Chartered Teacher status", text: "If you have completed the Chartered Teacher programme, you may be on the Chartered Teacher rate." },
      { name: "Apply Scottish Income Tax", text: "Scottish residents use S-prefix tax codes with different income tax bands." },
    ],
    sections: [
      {
        heading: "Scottish teachers pay scale 2026/27",
        body: `The SNCT main grade for 2026/27:\n\n:::table\n| Pay point | Scotland | England | Difference |\n|---|---|---|---|\n${compRows}\n:::\n\nScottish pay points are generally higher than their English equivalents at most points on the scale. Probationer teachers (in their induction year) are typically paid at or around M1.`,
      },
      {
        heading: "Chartered Teacher",
        body: `Scotland does not use England\u2019s Upper Pay Range (UPS1\u2013UPS3). Instead, teachers who have completed the Chartered Teacher programme can access the Chartered Teacher rate of ${gbp(52539)}. This route recognises advanced professional skills and ongoing commitment to professional development.\n\nThe Chartered Teacher programme was closed to new entrants in 2012, but teachers who achieved the status before that date retain their pay entitlement. Some local authorities have introduced alternative senior teacher scales.`,
      },
      {
        heading: "How Scottish pay progression works",
        body: `SNCT pay progression follows a different model from England. Teachers on the main grade progress through annual increments based on satisfactory performance, with the expectation of moving up one point per year. This is more predictable than the performance-related pay decisions in England, though it still requires satisfactory professional review.\n\nThe probationary year (Teacher Induction Scheme) is a guaranteed one-year placement. Probationers who meet the Standard for Full Registration move to a permanent position on the main grade.`,
      },
      {
        heading: "Scottish Income Tax impact",
        body: `Scottish residents pay income tax at different rates from the rest of the UK. The 2026/27 Scottish bands are:\n\n:::table\n| Band | Rate | Taxable income |\n|---|---|---|\n| Starter | 19% | \u00a30\u2013\u00a32,306 |\n| Basic | 20% | \u00a32,306\u2013\u00a313,517 |\n| Intermediate | 21% | \u00a313,517\u2013\u00a331,044 |\n| Higher | 42% | \u00a331,044\u2013\u00a362,430 |\n| Advanced | 45% | \u00a362,430\u2013\u00a3125,140 |\n| Top | 48% | Above \u00a3125,140 |\n:::\n\nAt M6 (${gbp(scot[5])}), a Scottish teacher\u2019s taxable income of ${gbp(scot[5] - 12570)} falls partly into the higher rate band at 42%, compared to 40% in England. This means slightly lower take-home pay at the same gross salary. Employee National Insurance uses the same UK-wide thresholds.`,
      },
      {
        heading: "TPS pension in Scotland",
        body: `Scottish teachers are in the Teachers\u2019 Pension Scheme (TPS) with the same contribution tiers as England. The pension is administered by the Scottish Public Pensions Agency (SPPA) but uses the same scheme rules and contribution rates. At M1 (${gbp(scot[0])}), the rate is ${(teacherPensionRate(scot[0]) * 100).toFixed(1)}%; at M6 (${gbp(scot[5])}), it is ${(teacherPensionRate(scot[5]) * 100).toFixed(1)}%.`,
      },
      {
        heading: "Summary",
        body: `Scottish teachers are paid under the SNCT, with generally higher gross pay than England but lower take-home at higher salary levels due to Scottish Income Tax. Progression is incremental rather than performance-based, and the Chartered Teacher route replaces England\u2019s Upper Pay Range. For English rates, see the [teachers pay scale calculator](/teachers-pay-scale-calculator/). For a full Scottish gross-to-net breakdown, use the [take-home pay calculator](/take-home-pay-calculator/).`,
      },
    ],
    faq: [
      { question: "What is a Scottish teacher\u2019s starting salary?", answer: `M1 on the SNCT main grade is ${gbp(scot[0])} for 2026/27.` },
      { question: "Does Scotland have UPS?", answer: "No. Scotland uses the Chartered Teacher route instead of England\u2019s Upper Pay Range, though new entrants to Chartered Teacher status are no longer accepted." },
      { question: "Is Scottish teacher pay higher than England?", answer: `At most pay points, yes. M6 in Scotland is ${gbp(scot[5])} versus ${gbp(eng[5])} in England, a difference of ${gbp(scot[5] - eng[5])}. However, Scottish Income Tax rates mean take-home pay may be closer.` },
      { question: "Do Scottish teachers pay a different pension rate?", answer: "No. The TPS contribution tiers are the same across the UK. Administration is handled by SPPA in Scotland." },
      { question: "How does probation work in Scotland?", answer: "The Teacher Induction Scheme provides a one-year guaranteed placement. Probationers who meet the Standard for Full Registration move to a permanent main grade position." },
      { question: "Do Scottish teachers use a different tax code?", answer: "Yes. Scottish residents use an S-prefix tax code (e.g. S1257L) which applies Scottish Income Tax rates instead of the rest-of-UK rates." },
    ],
    relatedSlugs: ["teachers-pay-scale-calculator", "teachers-main-pay-scale", "take-home-pay-calculator"],
    defaults: { annualSalary: scot[0] },
  });
};

// ===================== WALES =====================

const walesPage = (): CalculatorContent => {
  const wal = salariesFor("main", "wales");
  const walU = salariesFor("upper", "wales");

  return calculator({
    type: "calculator",
    slug: "teachers-pay-scale-wales",
    kind: "teachers-pay",
    title: "Teachers Pay Scale Wales 2026/27 | STPCD Rates",
    metaDescription: "Teachers pay scale Wales 2026/27. Main M1\u2013M6, Upper UPS1\u2013UPS3 and Unqualified rates under STPCD, Welsh tax code, TPS pension tiers and take-home estimates.",
    h1: "Teachers Pay Scale Wales 2026/27",
    intro: `Welsh teachers are paid under the **School Teachers\u2019 Pay and Conditions Document (STPCD)**, with pay policy set by the Welsh Government through the Independent Welsh Pay Review Body (IWPRB). The 2026/27 Main Pay Range runs from ${gbp(wal[0])} at M1 to ${gbp(wal[5])} at M6, matching the Rest of England rates. Welsh residents use a **C-prefix tax code** (e.g. C1257L), with income tax rates currently matching the rest-of-UK bands. For English rates including London weighting, see the [teachers pay scale calculator](/teachers-pay-scale-calculator/).`,
    formulaExplainer: `Welsh teacher take-home pay follows the standard formula: **gross salary \u2212 TPS pension \u2212 income tax \u2212 National Insurance**. The C-prefix tax code currently applies the same rates as England, so take-home at the same gross salary is identical. If the Senedd sets different rates in future, the C-prefix code ensures the correct Welsh rates are applied automatically.`,
    howToSteps: [
      { name: "Find your pay point", text: "The Welsh STPCD uses the same Main (M1\u2013M6) and Upper (UPS1\u2013UPS3) ranges as England outside London." },
      { name: "Check the Welsh tax code", text: "Welsh residents use a C-prefix tax code. Current rates match England, but this can change." },
      { name: "Calculate part-time pay", text: "Same formula: full-time salary \u00d7 FTE (contracted hours \u00f7 32.5)." },
    ],
    sections: [
      {
        heading: "Welsh teachers pay scale 2026/27",
        body: `The Welsh STPCD rates for 2026/27, matching the Rest of England:\n\n:::table\n| Pay point | Annual salary | Monthly gross |\n|---|---|---|\n${wal.map((s, i) => `| M${i + 1} | ${gbp(s)} | ${gbp(Math.round(s / 12))} |`).join("\n")}\n| UPS1 | ${gbp(walU[0])} | ${gbp(Math.round(walU[0] / 12))} |\n| UPS2 | ${gbp(walU[1])} | ${gbp(Math.round(walU[1] / 12))} |\n| UPS3 | ${gbp(walU[2])} | ${gbp(Math.round(walU[2] / 12))} |\n:::`,
      },
      {
        heading: "How Welsh teacher pay is set",
        body: `Since 2018, teachers\u2019 pay in Wales has been devolved to the Welsh Government. The IWPRB (Independent Welsh Pay Review Body) makes annual recommendations, which the Education Minister accepts or modifies. The pay award applies to all maintained schools in Wales.\n\nAcademies do not exist in Wales in the same form as England. All state-funded schools in Wales are maintained schools and must follow the Welsh STPCD. This gives Welsh teachers more pay consistency than their English counterparts, where academy trusts can set independent pay structures.`,
      },
      {
        heading: "Welsh income tax (C-prefix code)",
        body: `Since April 2019, Welsh residents have had their own income tax rates, shown on payslips through a C-prefix tax code. For 2026/27, the Welsh rates match the rest-of-UK bands: 20% basic, 40% higher, 45% additional. The Senedd has the power to vary these rates by up to 10p in the pound in future.\n\nEmployee National Insurance uses the same UK-wide thresholds regardless of where you live. The [national insurance calculator](/national-insurance-calculator/) shows your NI separately.`,
      },
      {
        heading: "TPS pension for Welsh teachers",
        body: `Welsh teachers are in the Teachers\u2019 Pension Scheme with the same contribution tiers as England and Scotland. At M1 (${gbp(wal[0])}), the rate is ${(teacherPensionRate(wal[0]) * 100).toFixed(1)}%; at M6 (${gbp(wal[5])}), it is ${(teacherPensionRate(wal[5]) * 100).toFixed(1)}%; at UPS3 (${gbp(walU[2])}), it is ${(teacherPensionRate(walU[2]) * 100).toFixed(1)}%.`,
      },
      {
        heading: "Key differences from England",
        body: `While pay rates currently match England (outside London), Welsh teachers have several structural differences:\n\n- **No academies**: all state schools follow the Welsh STPCD\n- **Curriculum for Wales**: different curriculum framework from the National Curriculum in England\n- **Registration**: teachers must register with the Education Workforce Council (EWC) in Wales\n- **Pay review**: the IWPRB is separate from England\u2019s STRB (School Teachers\u2019 Review Body)\n- **Welsh language**: some posts require Welsh language skills and may attract additional allowances`,
      },
      {
        heading: "Summary",
        body: `Welsh teachers are paid under the STPCD with rates currently matching England outside London. The C-prefix tax code applies Welsh income tax rates (currently identical to rUK). All maintained schools in Wales follow the same pay structure. For English rates including London weighting, see the [teachers pay scale calculator](/teachers-pay-scale-calculator/). For Scottish SNCT rates, see the [Scotland page](/teachers-pay-scale-scotland/). Use the [take-home pay calculator](/take-home-pay-calculator/) for a full net pay estimate.`,
      },
    ],
    faq: [
      { question: "Are Welsh teacher salaries the same as England?", answer: `Currently yes. The 2026/27 Welsh STPCD rates match England outside London: M1 is ${gbp(wal[0])} and M6 is ${gbp(wal[5])}. London weighting does not apply in Wales.` },
      { question: "Do Welsh teachers pay different income tax?", answer: "Welsh residents have a C-prefix tax code. The current rates match the rest of the UK, but the Senedd has the power to change them in future." },
      { question: "Are there academies in Wales?", answer: "No. All state-funded schools in Wales are maintained schools and must follow the Welsh STPCD." },
      { question: "What pension scheme are Welsh teachers in?", answer: "The Teachers\u2019 Pension Scheme (TPS), with the same contribution tiers as England and Scotland." },
      { question: "Who sets teacher pay in Wales?", answer: "The Welsh Government, advised by the Independent Welsh Pay Review Body (IWPRB). Pay has been devolved since 2018." },
      { question: "Do Welsh-medium teachers get extra pay?", answer: "There is no national Welsh language allowance in the STPCD, but schools may consider language skills when setting pay within the range or through TLR payments." },
    ],
    relatedSlugs: ["teachers-pay-scale-calculator", "teachers-pay-scale-scotland", "take-home-pay-calculator"],
    defaults: { annualSalary: wal[0] },
  });
};

// ===================== LONDON =====================

const londonPage = (): CalculatorContent => {
  const eng = salariesFor("main", "england");
  const inn = salariesFor("main", "inner-london");
  const out = salariesFor("main", "outer-london");
  const fri = salariesFor("main", "fringe");
  const innU = salariesFor("upper", "inner-london");
  const outU = salariesFor("upper", "outer-london");
  const friU = salariesFor("upper", "fringe");
  const mainRows = eng.map((s, i) => `| M${i + 1} | ${gbp(inn[i])} | ${gbp(out[i])} | ${gbp(fri[i])} | ${gbp(s)} |`).join("\n");
  const upperRows = innU.map((s, i) => `| UPS${i + 1} | ${gbp(s)} | ${gbp(outU[i])} | ${gbp(friU[i])} | ${gbp(salariesFor("upper", "england")[i])} |`).join("\n");

  return calculator({
    type: "calculator",
    slug: "teachers-pay-scale-london",
    kind: "teachers-pay",
    title: "Teachers Pay Scale London 2026/27 | Inner, Outer & Fringe Rates",
    metaDescription: "London teachers pay scale 2026/27: Inner London, Outer London and Fringe rates for Main M1\u2013M6 and Upper UPS1\u2013UPS3 ranges. Which boroughs qualify and take-home estimates.",
    h1: "Teachers Pay Scale London 2026/27",
    intro: `London teachers receive higher pay than the rest of England through three area-based pay bands: **Inner London**, **Outer London** and the **London Fringe**. At M1, the uplift ranges from ${gbp(fri[0] - eng[0])} (Fringe) to ${gbp(inn[0] - eng[0])} (Inner London) above the Rest of England rate. This page compares all three London bands with the national rate, explains which boroughs fall into each category, and links to the full [teachers pay scale calculator](/teachers-pay-scale-calculator/) for additional ranges.`,
    formulaExplainer: `London teacher pay uses the same take-home formula: **gross salary \u2212 TPS pension \u2212 income tax \u2212 NI**. The higher gross salary pushes more income into higher tax and pension tiers, so the net uplift is smaller than the gross difference. An Inner London M1 teacher earning ${gbp(inn[0])} takes home less of the uplift than the headline ${gbp(inn[0] - eng[0])} difference suggests after pension and tax.`,
    howToSteps: [
      { name: "Check your school\u2019s London band", text: "Your school\u2019s postcode determines whether Inner London, Outer London or Fringe rates apply." },
      { name: "Find the correct pay table", text: "Use the tables below for Main and Upper ranges in each London band." },
      { name: "Compare with Rest of England", text: "The final column shows the Rest of England rate for direct comparison." },
    ],
    sections: [
      {
        heading: "Main Pay Range: London rates 2026/27",
        body: `:::table\n| Pay point | Inner London | Outer London | Fringe | Rest of England |\n|---|---|---|---|---|\n${mainRows}\n:::\n\nThe Inner London M6 rate of ${gbp(inn[5])} is ${gbp(inn[5] - eng[5])} above the Rest of England M6 (${gbp(eng[5])}).`,
      },
      {
        heading: "Upper Pay Range: London rates 2026/27",
        body: `:::table\n| Pay point | Inner London | Outer London | Fringe | Rest of England |\n|---|---|---|---|---|\n${upperRows}\n:::\n\nInner London UPS3 at ${gbp(innU[2])} is the highest classroom teacher salary in the STPCD, ${gbp(innU[2] - salariesFor("upper", "england")[2])} above the national UPS3 rate.`,
      },
      {
        heading: "Which boroughs are Inner London?",
        body: `Inner London includes the boroughs of Camden, City of London, Greenwich, Hackney, Hammersmith and Fulham, Haringey, Islington, Kensington and Chelsea, Lambeth, Lewisham, Newham, Southwark, Tower Hamlets, Wandsworth and Westminster.\n\nSchools in these boroughs automatically attract the Inner London pay band. If you work in one of these boroughs, your M1 starting salary is ${gbp(inn[0])} rather than ${gbp(eng[0])}.`,
      },
      {
        heading: "Which boroughs are Outer London?",
        body: `Outer London includes Barking and Dagenham, Barnet, Bexley, Brent, Bromley, Croydon, Ealing, Enfield, Harrow, Havering, Hillingdon, Hounslow, Kingston, Merton, Redbridge, Richmond, Sutton and Waltham Forest.\n\nOuter London M1 is ${gbp(out[0])}, an uplift of ${gbp(out[0] - eng[0])} above the Rest of England rate.`,
      },
      {
        heading: "London Fringe areas",
        body: `The Fringe band covers areas surrounding London that are not within the Greater London boundary but still have higher living costs. This includes parts of Berkshire, Buckinghamshire, Essex, Hertfordshire, Kent and Surrey. The specific areas are defined in the STPCD.\n\nFringe M1 is ${gbp(fri[0])}, an uplift of ${gbp(fri[0] - eng[0])} above the Rest of England. The Fringe uplift is smaller than Outer London but still adds ${gbp(Math.round((fri[5] - eng[5]) / 12))} per month at M6.`,
      },
      {
        heading: "London cost of living context",
        body: `While London pay is higher, so is the cost of living. The Inner London M1 uplift of ${gbp(inn[0] - eng[0])} is roughly ${gbp(Math.round((inn[0] - eng[0]) / 12))} more per month before tax. After pension, tax and NI, the net monthly difference is smaller. London teachers also face significantly higher housing costs, transport costs and general cost of living.\n\nTeachers considering a move to or from London should compare net take-home pay, not just gross salaries. The [take-home pay calculator](/take-home-pay-calculator/) can help model the difference.`,
      },
      {
        heading: "Summary",
        body: `London teachers earn more than the rest of England, with the largest uplift in Inner London. Check your school\u2019s postcode to determine which band applies. For the full picture including Leadership and Unqualified ranges, use the [teachers pay scale calculator](/teachers-pay-scale-calculator/). For the [Main Pay Range detail](/teachers-main-pay-scale/) or [Upper Pay Range application process](/teachers-upper-pay-scale/), see the dedicated pages.`,
      },
    ],
    faq: [
      { question: "How much more do Inner London teachers earn?", answer: `At M1, Inner London teachers earn ${gbp(inn[0])}, which is ${gbp(inn[0] - eng[0])} more than the Rest of England rate of ${gbp(eng[0])}.` },
      { question: "Which London band does my school fall into?", answer: "It depends on the school\u2019s postcode. Inner London covers the central boroughs, Outer London covers the remaining Greater London boroughs, and the Fringe covers surrounding areas. The STPCD lists the specific areas." },
      { question: "Is there a separate London allowance on top?", answer: "No. London weighting is built into the pay scale itself. There is no separate London allowance for teachers as there is in some other public sector roles." },
      { question: "Does the London rate affect my pension?", answer: "Yes. Your TPS contribution is based on your actual salary, so London teachers pay more into the pension in absolute terms, which also builds a larger retirement benefit." },
      { question: "Can I keep London pay if I move to a school outside London?", answer: "No. Your pay is determined by your new school\u2019s location and pay policy. There is no pay protection for geographical moves." },
      { question: "Do academies in London have to pay London rates?", answer: "Academies are not bound by the STPCD and can set their own pay. Many London academies do pay at or above STPCD London rates to remain competitive, but this is not guaranteed." },
    ],
    relatedSlugs: ["teachers-pay-scale-calculator", "teachers-main-pay-scale", "teachers-upper-pay-scale", "take-home-pay-calculator"],
    defaults: { annualSalary: inn[0] },
  });
};

// ===================== EXPORT =====================

export const teacherCalculators: CalculatorContent[] = [
  pillarPage(),
  mainPayPage(),
  upperPayPage(),
  leadershipPage(),
  scotlandPage(),
  walesPage(),
  londonPage(),
];
