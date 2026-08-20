// Stub for the future teachers'- and police-pay-scale matrices.
// When figures land, follow the nhs-pay-bands.ts convention: export typed
// rows, then generate slugs/pages from them via the calculators registry.
// ponytail: routes are intentionally not built until real data exists.

export interface FuturePayPoint {
  band: string;
  subpoint: number;
  nation: string;
  annualSalary: number;
}

export const teacherPayScales: FuturePayPoint[] = [];
export const policePayScales: FuturePayPoint[] = [];
