// NHS Agenda for Change pay-scale data — single source for the
// /nhs-band-[band]-pay-calculator[-nation] matrix built by generateStaticParams.
//
// Figures: verified 2026/27 Agenda for Change pay scales.
// England source: NHS Employers. Scotland source: gov.scot / STAC.
// Wales source: NHS Wales / Welsh Government.
// Only explicitly sourced combinations are published as static pages.

export type Nation = "england" | "scotland" | "wales" | "northern-ireland";

export interface NhsPayPoint {
  band: string;
  subpoint: number;
  nation: Nation;
  annualSalary: number;
}

const englandBandShapes: Array<{ band: string; salaries: number[] }> = [
  { band: "2", salaries: [25272] },
  { band: "3", salaries: [25760, 27476] },
  { band: "4", salaries: [28392, 31157] },
  { band: "5", salaries: [32073, 34592, 39043] },
  { band: "6", salaries: [39959, 42170, 48117] },
  { band: "7", salaries: [49387, 51932, 56515] },
  { band: "8a", salaries: [57528, 60417, 64750] },
  { band: "8b", salaries: [66582, 70896, 77368] },
  { band: "8c", salaries: [79504, 84346, 91609] },
  { band: "8d", salaries: [94356, 100140, 108814] },
  { band: "9", salaries: [112782, 119583, 129783] },
];

const scotlandBandShapes: Array<{ band: string; salaries: number[] }> = [
  { band: "5", salaries: [34544, 36911, 43039] },
  { band: "6", salaries: [43231, 45135, 52679] },
  { band: "7", salaries: [52845, 54863, 61466] },
  { band: "8a", salaries: [65125, 70303] },
  { band: "9", salaries: [127521, 133044] },
];

const walesBandShapes: Array<{ band: string; salaries: number[] }> = [
  { band: "5", salaries: [32557, 35114, 39631] },
  { band: "6", salaries: [40559, 42805, 48841] },
  { band: "7", salaries: [50129, 52712, 57365] },
  { band: "8a", salaries: [58379, 61317, 65723] },
];

const publishedBandShapes: Array<{ nation: Nation; band: string; salaries: number[] }> = [
  ...englandBandShapes.map((shape) => ({ nation: "england" as const, ...shape })),
  ...scotlandBandShapes.map((shape) => ({ nation: "scotland" as const, ...shape })),
  ...walesBandShapes.map((shape) => ({ nation: "wales" as const, ...shape })),
];

export const nhsPayBands: NhsPayPoint[] = publishedBandShapes.flatMap(({ nation, band, salaries }) =>
  salaries.map((annualSalary, index) => ({ band, subpoint: index + 1, nation, annualSalary })),
);

export function nhsSlug(band: string, nation: Nation): string {
  return nation === "england"
    ? `nhs-band-${band}-pay-calculator`
    : `nhs-${nation}-band-${band}-pay-calculator`;
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
