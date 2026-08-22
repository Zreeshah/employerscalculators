// Police Pay Scales — England & Wales (2026/27)
// Source: Home Office circular, Police Regulations 2003
// 2025/26 rates effective 1 September 2025
// 2026/27: confirmed 3.5% uplift from 1 September 2026
// Scotland and Northern Ireland have separate pay structures.

export type PoliceRank = "constable" | "sergeant" | "inspector" | "chief-inspector" | "superintendent" | "chief-superintendent";
export type PoliceRegion = "england-wales" | "scotland";

export interface PolicePayPoint {
  rank: PoliceRank;
  point: string;
  region: PoliceRegion;
  annualSalary: number;
  legacy?: boolean; // Pre-April 2013 appointees
}

export const rankLabel: Record<PoliceRank, string> = {
  constable: "Police Constable",
  sergeant: "Police Sergeant",
  inspector: "Inspector",
  "chief-inspector": "Chief Inspector",
  superintendent: "Superintendent",
  "chief-superintendent": "Chief Superintendent",
};

// ---------- England & Wales 2026/27 (3.5% on 2025/26) ----------
// Post-2013 appointee scales

const constable2627: number[] = [32255, 33609, 34972, 36335, 39068, 44544, 52014];
const sergeant2627: number[] = [55443, 56784, 58175];
const inspector2627: number[] = [65999, 68124, 70237, 71386];
const chiefInspector2627: number[] = [74393, 76102, 77474];
const superintendent2627: number[] = [97014, 100149, 103284, 106419];
const chiefSuperintendent2627: number[] = [109806, 112599, 115383];

// Legacy (pre-April 2013) constable scale
const constableLegacy2627: number[] = [33969, 35252, 34972, 36335, 39068, 44544, 52014, 52014];

// ---------- Scotland 2026/27 ----------
// Police Scotland uses a different structure
const scotlandConstable2627: number[] = [32255, 33609, 34972, 36335, 39068, 44544, 52014];
const scotlandSergeant2627: number[] = [55443, 56784, 58175];

// ---------- Build flat array ----------

function buildPolicePoints(
  rank: PoliceRank,
  region: PoliceRegion,
  salaries: number[],
  legacy = false,
): PolicePayPoint[] {
  return salaries.map((annualSalary, i) => ({
    rank,
    point: `PP${legacy ? i : i + 1}`,
    region,
    annualSalary,
    ...(legacy ? { legacy: true } : {}),
  }));
}

export const policePayScales: PolicePayPoint[] = [
  // England & Wales
  ...buildPolicePoints("constable", "england-wales", constable2627),
  ...buildPolicePoints("constable", "england-wales", constableLegacy2627, true),
  ...buildPolicePoints("sergeant", "england-wales", sergeant2627),
  ...buildPolicePoints("inspector", "england-wales", inspector2627),
  ...buildPolicePoints("chief-inspector", "england-wales", chiefInspector2627),
  ...buildPolicePoints("superintendent", "england-wales", superintendent2627),
  ...buildPolicePoints("chief-superintendent", "england-wales", chiefSuperintendent2627),
  // Scotland
  ...buildPolicePoints("constable", "scotland", scotlandConstable2627),
  ...buildPolicePoints("sergeant", "scotland", scotlandSergeant2627),
];

// London Weighting (Metropolitan Police / City of London)
export const londonWeighting = 3150;

// Police pension (CARE 2015 scheme, from April 2026)
export const policePensionRate = 0.1244; // 12.44% employee contribution

// Standard hours
export const policeStandardHours = 40;
export const policeAnnualHours = 2085.6; // 40 × 52.14

export function policeHourlyRate(annualSalary: number): number {
  return annualSalary / policeAnnualHours;
}

export function policeSlug(page: string): string {
  return `police-${page}`;
}
