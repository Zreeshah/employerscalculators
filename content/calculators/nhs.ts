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

// One calculator page per (band, nation) combination — the matrix that
// /app/[slug] turns into static pages via generateStaticParams.
export const nhsCalculators: CalculatorContent[] = nhsPayBands
  .map((p) => `${p.band}:${p.nation}`)
  .filter((key, i, arr) => arr.indexOf(key) === i)
  .map((key) => {
    const [band, nation] = key.split(":") as [string, Nation];
    const { entry, top } = bandRange(band, nation);
    const label = nationLabel[nation];
    const bandTitle = `NHS Band ${band}`;
    return calculator({
      type: "calculator",
      slug: nhsSlug(band, nation),
      kind: "nhs-band",
      title: `${bandTitle} Pay Calculator ${label} (Agenda for Change)`,
      metaDescription: `NHS Band ${band} salary in ${label}: ${gbp(entry)}–${gbp(top)} full-time. Calculate part-time NHS pay by FTE with this free Agenda for Change calculator.`,
      h1: `${bandTitle} Pay Calculator — ${label}`,
      intro: `NHS Band ${band} salaries in ${label} range from ${gbp(entry)} at the entry point to ${gbp(top)} at the top of the band, based on Agenda for Change pay scales. Enter the full-time salary and your FTE fraction to see the part-time equivalent. Note: figures shown are the 2025/26 pay scales; the 2026/27 NHS pay award will be reflected here once confirmed.`,
      formulaExplainer: `Part-time NHS pay is worked out pro rata: full-time salary multiplied by your FTE fraction. For example, a ${gbp(top)} full-time salary at 0.6 FTE equals ${gbp(top * 0.6)} per year. Unsocial hours enhancements and High Cost Area Supplements (where applicable) are added on top and are not included in this calculation.`,
      faq: [
        {
          question: `What is the NHS Band ${band} salary in ${label}?`,
          answer: `Under Agenda for Change, NHS Band ${band} in ${label} pays ${gbp(entry)} at entry rising to ${gbp(top)} at the top of the band (2025/26 scales). Staff typically progress through pay points with years of service.`,
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
  });
