// Teacher pay data is jurisdiction-specific. Never infer a Welsh or Scottish
// figure from England data. See teacher-pay-sources.ts for the evidence ledger.

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
  main: "Main Pay Range",
  upper: "Upper Pay Range",
  unqualified: "Unqualified Teacher Scale",
  "leading-practitioner": "Leading Practitioner",
  leadership: "Leadership Group",
};

// England: STPCD 2026, effective 1 September 2026.
const englandMain = [34069, 36042, 38400, 40941, 43529, 46940];
const englandUpper = [49134, 50956, 52835];
const englandUnqualified = [23732, 26075, 28758, 31124, 33811, 36494];
const englandLeadingPractitioner = { min: 53847, max: 81861 };
const englandLeadership = { min: 53586, max: 148829 };

// England London areas: STPCD 2026 advisory points.
const fringeMain = [35602, 37647, 39979, 42513, 45070, 48479];
const fringeUpper = [50625, 52442, 54328];
const fringeUnqualified = [24909, 27589, 30272, 32636, 35321, 38004];
const fringeLeadingPractitioner = { min: 55332, max: 83347 };
const fringeLeadership = { min: 55060, max: 150301 };

const outerMain = [39196, 41246, 43403, 45673, 48438, 52241];
const outerUpper = [54047, 56047, 58120];
const outerUnqualified = [27727, 30412, 33094, 35465, 38146, 40831];
const outerLeadingPractitioner = { min: 58120, max: 86136 };
const outerLeadership = { min: 57837, max: 153042 };

const innerMain = [41729, 43713, 45787, 47961, 50666, 54131];
const innerUpper = [59650, 62581, 64684];
const innerUnqualified = [29336, 32018, 34702, 37068, 39747, 42429];
const innerLeadingPractitioner = { min: 64024, max: 92043 };
const innerLeadership = { min: 63709, max: 158863 };

// Wales: announced by Welsh Government, pending the revised STPC(W)D at check.
// Wales has a single five-point qualified classroom scale (M2 to M6).
const walesMain = [34912, 37717, 40623, 43821, 48226];
const walesUpper = [49995, 51849, 53760];
const walesUnqualified = [23820, 26589, 29358, 32126, 34900, 37669];

// Scotland: SNCT scale effective 1 August 2026. The first entry is probationer,
// followed by Main Grade 1 to 5; Scotland does not use England's UPS.
const scotlandMain = [36159, 43383, 45843, 48504, 51582, 54453];
const scotlandChartered = [56142, 58032, 59367, 61818, 64290, 66759];

function buildPoints(scale: TeacherScale, region: TeacherRegion, salaries: number[], prefix: string, firstPoint = 1): TeacherPayPoint[] {
  return salaries.map((annualSalary, index) => ({
    scale,
    point: `${prefix}${index + firstPoint}`,
    region,
    annualSalary,
  }));
}

export const teacherPayScales: TeacherPayPoint[] = [
  ...buildPoints("main", "england", englandMain, "M"),
  ...buildPoints("upper", "england", englandUpper, "UPS"),
  ...buildPoints("unqualified", "england", englandUnqualified, "UQ"),
  ...buildPoints("main", "fringe", fringeMain, "M"),
  ...buildPoints("upper", "fringe", fringeUpper, "UPS"),
  ...buildPoints("unqualified", "fringe", fringeUnqualified, "UQ"),
  ...buildPoints("main", "outer-london", outerMain, "M"),
  ...buildPoints("upper", "outer-london", outerUpper, "UPS"),
  ...buildPoints("unqualified", "outer-london", outerUnqualified, "UQ"),
  ...buildPoints("main", "inner-london", innerMain, "M"),
  ...buildPoints("upper", "inner-london", innerUpper, "UPS"),
  ...buildPoints("unqualified", "inner-london", innerUnqualified, "UQ"),
  ...buildPoints("main", "wales", walesMain, "M", 2),
  ...buildPoints("upper", "wales", walesUpper, "U"),
  ...buildPoints("unqualified", "wales", walesUnqualified, "UQ"),
  ...scotlandMain.map((annualSalary, index) => ({
    scale: "main" as const,
    point: index === 0 ? "Probationer" : `Main Grade ${index}`,
    region: "scotland" as const,
    annualSalary,
  })),
];

export const leadershipRanges: Record<string, { min: number; max: number }> = {
  england: englandLeadership,
  fringe: fringeLeadership,
  "outer-london": outerLeadership,
  "inner-london": innerLeadership,
};

export const leadingPractitionerRanges: Record<string, { min: number; max: number }> = {
  england: englandLeadingPractitioner,
  fringe: fringeLeadingPractitioner,
  "outer-london": outerLeadingPractitioner,
  "inner-london": innerLeadingPractitioner,
};

// Teachers' Pensions (England and Wales), from 1 April 2026.
export const teacherPensionTiers = [
  { upTo: 36198.99, rate: 0.074 },
  { upTo: 48727.99, rate: 0.089 },
  { upTo: 57776.99, rate: 0.099 },
  { upTo: 76572.99, rate: 0.105 },
  { upTo: 104413.99, rate: 0.116 },
  { upTo: null as number | null, rate: 0.12 },
];

export const scottishTeacherPensionTiers = [
  { upTo: 36195, rate: 0.0735 },
  { upTo: 48724, rate: 0.0888 },
  { upTo: 57775, rate: 0.099 },
  { upTo: 67975, rate: 0.1061 },
  { upTo: 92693, rate: 0.1173 },
  { upTo: null as number | null, rate: 0.1214 },
];

function pensionRateFor(salary: number, tiers: ReadonlyArray<{ upTo: number | null; rate: number }>): number {
  return tiers.find((tier) => tier.upTo === null || salary <= tier.upTo)?.rate ?? tiers[tiers.length - 1].rate;
}

export function teacherPensionRate(salary: number): number {
  return pensionRateFor(salary, teacherPensionTiers);
}

export function scottishTeacherPensionRate(salary: number): number {
  return pensionRateFor(salary, scottishTeacherPensionTiers);
}

export const scottishCharteredTeacherPay = scotlandChartered;
