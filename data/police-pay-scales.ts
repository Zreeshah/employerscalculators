// Police pay scales — England & Wales, effective 1 September 2026.
// Federated-rank values are published by the Police Federation of England and Wales.
// Scotland and Northern Ireland use separate arrangements and are intentionally excluded.

export type PoliceRank = "constable" | "sergeant" | "inspector" | "chief-inspector" | "superintendent" | "chief-superintendent";
export type PoliceRegion = "england-wales";

export interface PolicePayPoint {
  rank: PoliceRank;
  point: string;
  region: PoliceRegion;
  annualSalary: number;
  legacy?: boolean;
}

export const rankLabel: Record<PoliceRank, string> = {
  constable: "Police Constable",
  sergeant: "Police Sergeant",
  inspector: "Inspector",
  "chief-inspector": "Chief Inspector",
  superintendent: "Superintendent",
  "chief-superintendent": "Chief Superintendent",
};

const constable2627 = [32255, 33609, 34972, 36335, 39058, 44544, 52015];
const sergeant2627 = [55443, 56573, 58175];
const inspector2627 = [66000, 67798, 69589, 71396];
const chiefInspector2627 = [72806, 74225, 75709];
// The 2026/27 award applies to superintending ranks. Confirm an individual force's determination.
const superintendent2627 = [87123, 91545, 96208, 102481];
const chiefSuperintendent2627 = [107430, 110979, 119837];
const constableLegacy2627 = [33969, 37648, 39688, 41976, 43228, 44544, 48258, 52015];

function buildPolicePoints(rank: PoliceRank, salaries: number[], legacy = false): PolicePayPoint[] {
  return salaries.map((annualSalary, index) => ({
    rank,
    point: `PP${legacy ? index : index + 1}`,
    region: "england-wales",
    annualSalary,
    ...(legacy ? { legacy: true } : {}),
  }));
}

export const policePayScales: PolicePayPoint[] = [
  ...buildPolicePoints("constable", constable2627),
  ...buildPolicePoints("constable", constableLegacy2627, true),
  ...buildPolicePoints("sergeant", sergeant2627),
  ...buildPolicePoints("inspector", inspector2627),
  ...buildPolicePoints("chief-inspector", chiefInspector2627),
  ...buildPolicePoints("superintendent", superintendent2627),
  ...buildPolicePoints("chief-superintendent", chiefSuperintendent2627),
];

// PPS 2015 full-member rates from 1 April 2026. The tier uses actual pensionable earnings.
export const policePensionTiers = [
  { upperInclusive: 37035, rate: 0.1288 },
  { upperInclusive: 79587.99, rate: 0.1388 },
  { upperInclusive: Infinity, rate: 0.1422 },
] as const;

/** Estimate the PPS 2015 member contribution rate from annual pensionable pay. */
export function policePensionRate(annualPensionablePay: number): number {
  const pay = Math.max(0, annualPensionablePay || 0);
  return policePensionTiers.find((tier) => pay <= tier.upperInclusive)?.rate ?? 0.1422;
}

export const policeStandardHours = 40;
export const policeAnnualHours = 2085.6;

export function policeHourlyRate(annualSalary: number): number {
  return annualSalary / policeAnnualHours;
}

export function policeSlug(page: string): string {
  return `police-${page}`;
}
