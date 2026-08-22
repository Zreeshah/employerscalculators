export type NhsNation = "england" | "scotland" | "wales";

export interface NhsBandScale { band: string; steps: number[] }
interface PensionTier { upTo: number | null; rate: number }
export interface NhsRegionConfig {
  label: string;
  standardHours: number;
  bands: NhsBandScale[];
  pensionTiers: PensionTier[];
  hcas?: { id: string; label: string; rate: number; min: number; max: number }[];
}

const sharedPensionTiers: PensionTier[] = [
  { upTo: 13259, rate: 0.052 },
  { upTo: 28854, rate: 0.065 },
  { upTo: 35155, rate: 0.083 },
  { upTo: 52778, rate: 0.098 },
  { upTo: 67668, rate: 0.107 },
  { upTo: null, rate: 0.125 },
];

export const NHS_REGIONS: Record<NhsNation, NhsRegionConfig> = {
  england: {
    label: "England", standardHours: 37.5,
    bands: [
      { band: "2", steps: [25272] }, { band: "3", steps: [25760, 27476] },
      { band: "4", steps: [28392, 31157] }, { band: "5", steps: [32073, 34592, 39043] },
      { band: "6", steps: [39959, 42170, 48117] }, { band: "7", steps: [49387, 51932, 56515] },
      { band: "8a", steps: [57528, 60417, 64750] }, { band: "8b", steps: [66582, 70896, 77368] },
      { band: "8c", steps: [79504, 84346, 91609] }, { band: "8d", steps: [94356, 100140, 108814] },
      { band: "9", steps: [112782, 119583, 129783] },
    ],
    pensionTiers: sharedPensionTiers,
    hcas: [
      { id: "inner", label: "Inner London (+20%)", rate: 0.2, min: 5794, max: 8746 },
      { id: "outer", label: "Outer London (+15%)", rate: 0.15, min: 4870, max: 6137 },
      { id: "fringe", label: "Fringe (+5%)", rate: 0.05, min: 1346, max: 2270 },
    ],
  },
  scotland: {
    label: "Scotland", standardHours: 36,
    bands: [
      { band: "2", steps: [26696, 28988] }, { band: "3", steps: [29103, 31409] },
      { band: "4", steps: [31537, 34303] }, { band: "5", steps: [34544, 36911, 43039] },
      { band: "6", steps: [43231, 45135, 52679] }, { band: "7", steps: [52845, 54863, 61466] },
      { band: "8a", steps: [65125, 70303] }, { band: "8b", steps: [76888, 82251] },
      { band: "8c", steps: [90808, 97338] }, { band: "8d", steps: [107810, 112426] },
      { band: "9", steps: [127521, 133044] },
    ],
    pensionTiers: [
      { upTo: 13330, rate: 0.057 }, { upTo: 28987, rate: 0.064 },
      { upTo: 34302, rate: 0.07 }, { upTo: 43038, rate: 0.087 },
      { upTo: 45134, rate: 0.098 }, { upTo: 54862, rate: 0.105 },
      { upTo: 59369, rate: 0.112 }, { upTo: 83026, rate: 0.116 },
      { upTo: null, rate: 0.127 },
    ],
  },
  wales: {
    label: "Wales", standardHours: 37.5,
    bands: [
      { band: "2", steps: [26300] }, { band: "3", steps: [26300, 27890] },
      { band: "4", steps: [28819, 31626] }, { band: "5", steps: [32557, 35114, 39631] },
      { band: "6", steps: [40559, 42805, 48841] }, { band: "7", steps: [50129, 52712, 57365] },
      { band: "8a", steps: [58379, 61317, 65723] }, { band: "8b", steps: [67583, 71952, 78530] },
      { band: "8c", steps: [80698, 85611, 92984] }, { band: "8d", steps: [95773, 101643, 110448] },
      { band: "9", steps: [114475, 121377, 131732] },
    ],
    pensionTiers: sharedPensionTiers,
  },
};

export interface NhsSalaryInput {
  nation: NhsNation;
  band: string;
  stepIndex?: number;
  hoursPerWeek?: number;
  hcasZone?: string;
  inPension?: boolean;
  payRisePercent?: number;
  studentLoanPlan?: "none" | "plan1" | "plan2" | "plan4" | "plan5";
  postgraduateLoan?: boolean;
  nightSaturdayHoursMonthly?: number;
  sundayBankHolidayHoursMonthly?: number;
}

export interface NhsSalaryResult {
  nationLabel: string;
  band: string;
  stepLabel: string;
  fullTimeBasic: number;
  hoursPerWeek: number;
  wte: number;
  basicSalary: number;
  hcas: number;
  unsocialPay: number;
  totalGross: number;
  pensionRate: number;
  pensionContribution: number;
  incomeTax: number;
  employeeNi: number;
  studentLoan: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
}

function progressiveTax(taxable: number, bands: { width: number | null; rate: number }[]) {
  let remaining = Math.max(0, taxable);
  let tax = 0;
  for (const band of bands) {
    const amount = band.width === null ? remaining : Math.min(remaining, band.width);
    tax += amount * band.rate;
    remaining -= amount;
    if (remaining <= 0) break;
  }
  return tax;
}

export function calculateNhsSalary(input: NhsSalaryInput): NhsSalaryResult {
  const config = NHS_REGIONS[input.nation];
  const bandScale = config.bands.find((item) => item.band === input.band) ?? config.bands[0];
  const stepIndex = Math.max(0, Math.min(input.stepIndex ?? 0, bandScale.steps.length - 1));
  const payRise = 1 + Math.max(-100, input.payRisePercent ?? 0) / 100;
  const fullTimeBasic = bandScale.steps[stepIndex] * payRise;
  const hoursPerWeek = Math.max(0, input.hoursPerWeek ?? config.standardHours);
  const wte = Math.max(0, Math.min(1, hoursPerWeek / config.standardHours));
  const basicSalary = fullTimeBasic * wte;
  const hcasConfig = config.hcas?.find((zone) => zone.id === input.hcasZone);
  const hcasFullTime = hcasConfig ? Math.min(Math.max(fullTimeBasic * hcasConfig.rate, hcasConfig.min), hcasConfig.max) : 0;
  const hcas = hcasFullTime * wte;
  const hourlyRate = fullTimeBasic / ((365 / 7) * config.standardHours);
  const bandNumber = Number.parseInt(input.band, 10);
  const enhancement = bandNumber <= 2 ? { standard: 0.41, higher: 0.83 } : bandNumber === 3 ? { standard: 0.35, higher: 0.69 } : { standard: 0.3, higher: 0.6 };
  const unsocialPay = 12 * ((input.nightSaturdayHoursMonthly ?? 0) * hourlyRate * enhancement.standard + (input.sundayBankHolidayHoursMonthly ?? 0) * hourlyRate * enhancement.higher);
  const totalGross = basicSalary + hcas + unsocialPay;
  const pensionablePay = totalGross;
  const pensionRate = input.inPension === false ? 0 : (config.pensionTiers.find((tier) => tier.upTo === null || pensionablePay <= tier.upTo)?.rate ?? 0);
  const pensionContribution = pensionablePay * pensionRate;
  const adjustedNetIncome = totalGross - pensionContribution;
  const personalAllowance = Math.max(0, 12570 - Math.max(0, adjustedNetIncome - 100000) / 2);
  const taxableIncome = Math.max(0, adjustedNetIncome - personalAllowance);
  const incomeTax = input.nation === "scotland"
    ? progressiveTax(taxableIncome, [
        { width: 3967, rate: 0.19 }, { width: 12989, rate: 0.2 }, { width: 14136, rate: 0.21 },
        { width: 31338, rate: 0.42 }, { width: 62710, rate: 0.45 }, { width: null, rate: 0.48 },
      ])
    : progressiveTax(taxableIncome, [
        { width: 37700, rate: 0.2 }, { width: 74870, rate: 0.4 }, { width: null, rate: 0.45 },
      ]);
  const mainNiEarnings = Math.max(0, Math.min(totalGross, 50270) - 12570);
  const upperNiEarnings = Math.max(0, totalGross - 50270);
  const employeeNi = mainNiEarnings * 0.08 + upperNiEarnings * 0.02;
  const loanThresholds = { plan1: 26900, plan2: 29385, plan4: 33795, plan5: 25000 };
  const plan = input.studentLoanPlan ?? "none";
  const planLoan = plan === "none" ? 0 : Math.max(0, totalGross - loanThresholds[plan]) * 0.09;
  const postgraduateLoan = input.postgraduateLoan ? Math.max(0, totalGross - 21000) * 0.06 : 0;
  const studentLoan = planLoan + postgraduateLoan;
  const annualTakeHome = totalGross - pensionContribution - incomeTax - employeeNi - studentLoan;
  const stepLabel = bandScale.steps.length === 1 ? "Single point" : stepIndex === 0 ? "Entry" : stepIndex === bandScale.steps.length - 1 ? "Top of band" : "Intermediate";
  return { nationLabel: config.label, band: input.band, stepLabel, fullTimeBasic, hoursPerWeek, wte, basicSalary, hcas, unsocialPay, totalGross, pensionRate, pensionContribution, incomeTax, employeeNi, studentLoan, annualTakeHome, monthlyTakeHome: annualTakeHome / 12 };
}
