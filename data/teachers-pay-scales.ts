// Teachers' Pay Scales — England & Wales (STPCD 2026/27)
// Source: School Teachers' Pay and Conditions Document 2026
// Effective from 1 September 2026. 5.5% pay award applied.
// Scotland uses SNCT (Scottish Negotiating Committee for Teachers) rates.
// Academies/free schools may set their own pay scales.

export type TeacherRegion = "england" | "inner-london" | "outer-london" | "fringe" | "scotland" | "wales";
export type TeacherScale = "main" | "upper" | "unqualified" | "leading-practitioner" | "leadership";

export interface TeacherPayPoint {
  scale: TeacherScale;
  point: string;
  region: TeacherRegion;
  annualSalary: number;
}

export const regionLabel: Record<TeacherRegion, string> = {
  england: "Rest of England",
  "inner-london": "Inner London",
  "outer-london": "Outer London",
  fringe: "London Fringe",
  scotland: "Scotland",
  wales: "Wales",
};

export const scaleLabel: Record<TeacherScale, string> = {
  main: "Main Pay Range (M1\u2013M6)",
  upper: "Upper Pay Range (UPS1\u2013UPS3)",
  unqualified: "Unqualified Teacher Scale",
  "leading-practitioner": "Leading Practitioner",
  leadership: "Leadership Group",
};

// ---------- England (Rest of England, excl. London) ----------
// STPCD 2026/27, effective 1 September 2026

const englandMain: number[] = [34069, 36042, 38400, 40941, 43529, 46940];
const englandUpper: number[] = [49134, 50956, 52835];
const englandUnqualified: number[] = [23732, 25873, 28014, 30158, 32299, 36494];
const englandLeadingPractitioner = { min: 53847, max: 81861 };
const englandLeadership = { min: 53586, max: 148829 };

// ---------- Inner London ----------
const innerMain: number[] = [38766, 40660, 43038, 45527, 48540, 51179];
const innerUpper: number[] = [56511, 58321, 61849];
const innerUnqualified: number[] = [27476, 29625, 31769, 33913, 36052, 40242];
const innerLeadingPractitioner = { min: 60590, max: 88601 };
const innerLeadership = { min: 59281, max: 147765 };

// ---------- Outer London ----------
const outerMain: number[] = [36413, 38304, 40564, 43047, 46188, 48540];
const outerUpper: number[] = [52287, 54101, 56516];
const outerUnqualified: number[] = [26117, 28271, 30408, 32548, 34689, 38891];
const outerLeadingPractitioner = { min: 57566, max: 85584 };
const outerLeadership = { min: 54281, max: 142765 };

// ---------- London Fringe ----------
const fringeMain: number[] = [32999, 35147, 37478, 40018, 42587, 46006];
const fringeUpper: number[] = [50400, 52214, 53885];
const fringeUnqualified: number[] = [24810, 26961, 29105, 31248, 33388, 37576];
const fringeLeadingPractitioner = { min: 54927, max: 82940 };
const fringeLeadership = { min: 55131, max: 149615 };

// ---------- Scotland (SNCT 2026/27) ----------
// Scotland uses a different structure: probationer, main grade, chartered teacher
const scotlandMain: number[] = [34539, 36426, 38361, 42336, 45468, 48516];
const scotlandUpper: number[] = []; // Scotland doesn't have UPS; uses chartered teacher route
const scotlandChartered: number[] = [52539]; // Chartered Teacher rate

// ---------- Wales ----------
// Wales follows STPCD but negotiated separately via IWPRB
// Using same STPCD figures as England for 2026/27
const walesMain: number[] = [34069, 36042, 38400, 40941, 43529, 46940];
const walesUpper: number[] = [49134, 50956, 52835];
const walesUnqualified: number[] = [23732, 25873, 28014, 30158, 32299, 36494];

// ---------- Build the flat array ----------

function buildPoints(
  scale: TeacherScale,
  region: TeacherRegion,
  salaries: number[],
  pointPrefix: string,
): TeacherPayPoint[] {
  return salaries.map((annualSalary, i) => ({
    scale,
    point: `${pointPrefix}${i + 1}`,
    region,
    annualSalary,
  }));
}

export const teacherPayScales: TeacherPayPoint[] = [
  // England
  ...buildPoints("main", "england", englandMain, "M"),
  ...buildPoints("upper", "england", englandUpper, "UPS"),
  ...buildPoints("unqualified", "england", englandUnqualified, "UQ"),
  // Inner London
  ...buildPoints("main", "inner-london", innerMain, "M"),
  ...buildPoints("upper", "inner-london", innerUpper, "UPS"),
  ...buildPoints("unqualified", "inner-london", innerUnqualified, "UQ"),
  // Outer London
  ...buildPoints("main", "outer-london", outerMain, "M"),
  ...buildPoints("upper", "outer-london", outerUpper, "UPS"),
  ...buildPoints("unqualified", "outer-london", outerUnqualified, "UQ"),
  // London Fringe
  ...buildPoints("main", "fringe", fringeMain, "M"),
  ...buildPoints("upper", "fringe", fringeUpper, "UPS"),
  ...buildPoints("unqualified", "fringe", fringeUnqualified, "UQ"),
  // Scotland
  ...buildPoints("main", "scotland", scotlandMain, "M"),
  // Wales
  ...buildPoints("main", "wales", walesMain, "M"),
  ...buildPoints("upper", "wales", walesUpper, "UPS"),
  ...buildPoints("unqualified", "wales", walesUnqualified, "UQ"),
];

// Ranges for leadership (min/max, not point-by-point)
export const leadershipRanges: Record<string, { min: number; max: number }> = {
  england: englandLeadership,
  "inner-london": innerLeadership,
  "outer-london": outerLeadership,
  fringe: fringeLeadership,
};

export const leadingPractitionerRanges: Record<string, { min: number; max: number }> = {
  england: englandLeadingPractitioner,
  "inner-london": innerLeadingPractitioner,
  "outer-london": outerLeadingPractitioner,
  fringe: fringeLeadingPractitioner,
};

// Pension tiers (Teachers' Pension Scheme, from April 2026)
export const teacherPensionTiers = [
  { upTo: 32135, rate: 0.074 },
  { upTo: 43259, rate: 0.086 },
  { upTo: 51292, rate: 0.096 },
  { upTo: 67979, rate: 0.102 },
  { upTo: 92697, rate: 0.117 },
  { upTo: null as number | null, rate: 0.127 },
];

export function teacherPensionRate(salary: number): number {
  for (const tier of teacherPensionTiers) {
    if (tier.upTo === null || salary <= tier.upTo) return tier.rate;
  }
  return 0.127;
}

// Slug helpers
export function teacherSlug(page: string): string {
  return `teachers-${page}`;
}
