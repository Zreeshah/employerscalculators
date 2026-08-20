// NHS Agenda for Change pay-scale data — single source for the
// /nhs-band-[band]-pay-calculator[-nation] matrix built by generateStaticParams.
//
// Figures: 2025/26 Agenda for Change pay scales, England
// (source: NHS Employers / RCN published scales; 3.6% uplift on 2024/25).
// TODO: update when the 2026/27 NHS pay award is confirmed.
// ponytail: only England is published — Scotland/Wales/NI pages switch on
// once their verified nation-specific scales land in this file.

export type Nation = "england" | "scotland" | "wales" | "northern-ireland";

export interface NhsPayPoint {
  band: string;
  subpoint: number;
  nation: Nation;
  annualSalary: number;
}

const publishedNations: Nation[] = ["england"];

// Entry and top-of-band full-time salaries per band (England, 2025/26)
const bandShapes: Array<{ band: string; salaries: number[] }> = [
  { band: "2", salaries: [24465] },
  { band: "3", salaries: [24937, 26598] },
  { band: "4", salaries: [27485, 30162] },
  { band: "5", salaries: [31049, 37796] },
  { band: "6", salaries: [38682, 46580] },
  { band: "7", salaries: [47810, 54710] },
  { band: "8a", salaries: [55690, 62682] },
  { band: "8b", salaries: [64455, 74896] },
  { band: "8c", salaries: [76383, 88172] },
  { band: "8d", salaries: [90025, 103614] },
  { band: "9", salaries: [107637, 123537] },
];

export const nhsPayBands: NhsPayPoint[] = bandShapes.flatMap(({ band, salaries }) =>
  publishedNations.flatMap((nation) =>
    salaries.map((annualSalary, i) => ({
      band,
      subpoint: i + 1,
      nation,
      annualSalary,
    })),
  ),
);

export function nhsSlug(band: string, nation: Nation): string {
  return nation === "england"
    ? `nhs-band-${band}-pay-calculator`
    : `nhs-band-${band}-pay-calculator-${nation}`;
}

export function bandRange(band: string, nation: Nation): { entry: number; top: number } {
  const salaries = nhsPayBands
    .filter((p) => p.band === band && p.nation === nation)
    .map((p) => p.annualSalary);
  return { entry: Math.min(...salaries), top: Math.max(...salaries) };
}

export function topPointSalary(band: string, nation: Nation): number {
  return bandRange(band, nation).top;
}
