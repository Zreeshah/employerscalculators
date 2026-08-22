"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { currentRates } from "@/data/rates";
import type { NhsCalculatorPreset } from "@/content/types";
import { P11dCalculator, SickPayCalculator } from "@/components/BenefitCalculators";
import {
  AnnualLeaveCalculator,
  BradfordFactorCalculator,
  CompanyCarTaxCalculator,
  HolidayEntitlementCalculator,
  NetToGrossCalculator,
  TwoJobsTaxCalculator,
} from "@/components/AdvancedCalculators";
import { NhsPayComparisonCalculatorParity, NhsTakeHomeCalculatorParity } from "@/components/NhsCalculators";
import {
  calculate,
  calculatorInputs,
  calculateMaternityAllowance,
  calculateSalarySacrificeImpact,
  calculateSmp,
  calculateWorkplacePension,
  employerNiCategoryThresholds,
  employerNiWithAllowance,
  employerPensionContribution,
  type CalculatorKind,
  type EmployeeTaxBand,
  type EmployerNiCategory,
  type MaternityAllowanceSituation,
  type PensionSchemeType,
  type SalarySacrificeScheme,
} from "@/lib/calculators";

const unitLabels: Record<string, string> = {
  currency: "£",
  percent: "%",
  hours: "hrs",
  days: "days",
  weeks: "weeks",
};

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

const wholeGbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

function formatValue(value: number, format: "currency" | "percent" | "number") {
  if (format === "currency") return gbp.format(value);
  if (format === "percent") return `${value.toFixed(1)}%`;
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value);
}

export default function CalculatorForm({
  kind,
  defaults,
  nhsPreset,
}: {
  kind: CalculatorKind;
  defaults?: Record<string, number>;
  nhsPreset?: NhsCalculatorPreset;
}) {
  if (kind === "employer-ni") return <EmployerNiCalculator defaults={defaults} />;
  if (kind === "employee-cost") return <EmployeeCostCalculator defaults={defaults} />;
  if (kind === "smp") return <SmpCalculator defaults={defaults} />;
  if (kind === "p11d") return <P11dCalculator defaults={defaults} />;
  if (kind === "sick-pay") return <SickPayCalculator />;
  if (kind === "company-car-tax") return <CompanyCarTaxCalculator defaults={defaults} />;
  if (kind === "net-to-gross") return <NetToGrossCalculator />;
  if (kind === "two-jobs-tax") return <TwoJobsTaxCalculator />;
  if (kind === "bradford-factor") return <BradfordFactorCalculator />;
  if (kind === "holiday-entitlement") return <HolidayEntitlementCalculator />;
  if (kind === "annual-leave") return <AnnualLeaveCalculator />;
  if (kind === "nhs-take-home-pay") return <NhsTakeHomeCalculatorParity />;
  if (kind === "nhs-pay-comparison") return <NhsPayComparisonCalculatorParity />;
  if (kind === "nhs-band") return <NhsTakeHomeCalculatorParity preset={nhsPreset} />;
  if (kind === "maternity-allowance") return <MaternityAllowanceCalculator defaults={defaults} />;
  if (kind === "workplace-pension") return <WorkplacePensionCalculator defaults={defaults} />;
  if (kind === "salary-sacrifice" || kind === "salary-sacrifice-pension") {
    return <SalarySacrificeCalculator defaults={defaults} pensionMode={kind === "salary-sacrifice-pension"} />;
  }
  return <GenericCalculatorForm kind={kind} defaults={defaults} />;
}

function GenericCalculatorForm({
  kind,
  defaults,
}: {
  kind: CalculatorKind;
  defaults?: Record<string, number>;
}) {
  const specs = calculatorInputs[kind];
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const spec of specs) {
      initial[spec.name] = defaults?.[spec.name] ?? (spec.name === "fte" ? 1 : 0);
    }
    return initial;
  });

  const results = useMemo(() => calculate(kind, values), [kind, values]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form className="card space-y-5 p-6 shadow-sm" aria-label="Calculator inputs">
        <div>
          <h2 className="text-2xl font-semibold">Calculator inputs</h2>
          <p className="mt-2 text-sm text-ink/60">Results update as you type.</p>
        </div>
        {specs.map((spec) => {
          const id = `input-${kind}-${spec.name}`;
          return (
            <div key={spec.name}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
                {spec.label}
                {spec.unit && <span className="ml-1 font-normal text-ink/70">({unitLabels[spec.unit]})</span>}
              </label>
              <input
                id={id}
                type="number"
                inputMode="decimal"
                step={spec.step ?? "any"}
                min={0}
                value={Number.isNaN(values[spec.name]) ? "" : values[spec.name]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [spec.name]: Number(e.target.value) }))
                }
                className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>
          );
        })}
      </form>

      <div
        aria-live="polite"
        className="card number-box bg-paper/70 p-6 shadow-sm md:sticky md:top-20 md:self-start"
      >
        <h2 className="text-2xl font-semibold">Your results</h2>
        <dl className="mt-5 divide-y divide-ink/10">
          {results.map((line) => (
            <div key={line.label} className="py-3 first:pt-0 last:pb-0">
              <dt className="text-sm text-ink/65">{line.label}</dt>
              <dd className="tabular safe-number-sm font-semibold text-accent-strong">
                {formatValue(line.value, line.format)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-ink/55">
          Estimates only, based on 2026/27 HMRC rates. Verify against GOV.UK before making payroll decisions.
        </p>
      </div>
    </div>
  );
}

type Period = "annual" | "monthly" | "weekly";

const periodDivisors: Record<Period, number> = {
  annual: 1,
  monthly: 12,
  weekly: 52,
};

const periodLabels: Record<Period, string> = {
  annual: "per year",
  monthly: "per month",
  weekly: "per week",
};

const employerNiCategories: Array<{
  value: EmployerNiCategory;
  label: string;
  help: string;
}> = [
  {
    value: "standard",
    label: "21 and over",
    help: "Standard category A style calculation: 15% above the £5,000 secondary threshold.",
  },
  {
    value: "under21",
    label: "Under 21",
    help: "0% employer NI up to the under-21 upper secondary threshold, then 15% above it.",
  },
  {
    value: "apprentice",
    label: "Apprentice under 25",
    help: "0% employer NI up to the apprentice upper secondary threshold, then 15% above it.",
  },
  {
    value: "veteran",
    label: "Qualifying veteran",
    help: "0% employer NI up to the veterans upper secondary threshold, then 15% above it.",
  },
  {
    value: "freeport",
    label: "Freeport or Investment Zone",
    help: "0% employer NI up to the £25,000 Freeport or Investment Zone upper secondary threshold, then 15% above it.",
  },
];

function EmployerNiCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialSalary = defaults?.annualSalary ?? 30000;
  const [salary, setSalary] = useState(initialSalary);
  const [category, setCategory] = useState<EmployerNiCategory>("standard");
  const [applyAllowance, setApplyAllowance] = useState(false);
  const [period, setPeriod] = useState<Period>("weekly");

  const calculation = useMemo(() => {
    const safeSalary = Number.isFinite(salary) ? Math.max(0, salary) : 0;
    const ni = employerNiWithAllowance(safeSalary, category, applyAllowance);
    const threshold = employerNiCategoryThresholds[category];
    const divisor = periodDivisors[period];
    const totalEmploymentCost = safeSalary + ni.payableNi;
    const niShare = totalEmploymentCost > 0 ? ni.payableNi / totalEmploymentCost : 0;
    const salaryShare = totalEmploymentCost > 0 ? safeSalary / totalEmploymentCost : 0;
    const costPercent = safeSalary > 0 ? (ni.payableNi / safeSalary) * 100 : 0;

    return {
      salary: safeSalary,
      threshold,
      rawNi: ni.rawNi,
      allowanceSaving: ni.allowanceSaving,
      payableNi: ni.payableNi,
      displayNi: ni.payableNi / divisor,
      displayRawNi: ni.rawNi / divisor,
      displaySaving: ni.allowanceSaving / divisor,
      totalEmploymentCost,
      niShare,
      salaryShare,
      costPercent,
      taxableEarnings: Math.max(0, safeSalary - threshold),
    };
  }, [salary, category, applyAllowance, period]);

  const categoryHelp = employerNiCategories.find((item) => item.value === category)?.help;
  const circumference = 2 * Math.PI * 42;
  const niDash = calculation.niShare * circumference;
  const salaryPercent = Math.round(calculation.salaryShare * 100);
  const niPercent = Math.round(calculation.niShare * 100);

  function resetCalculator() {
    setSalary(initialSalary);
    setCategory("standard");
    setApplyAllowance(false);
    setPeriod("weekly");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Employer NI inputs">
          <div>
            <h2 className="text-2xl font-semibold">Employer NI inputs</h2>
            <p className="mt-2 text-sm text-ink/60">Results update as you type.</p>
          </div>

          <div>
            <label htmlFor="employer-ni-salary" className="mb-1.5 block text-sm font-medium">
              Annual Salary <span className="text-accent-strong">*</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="employer-ni-salary"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={salary === 0 ? "" : salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="employer-ni-category" className="mb-1.5 block text-sm font-medium">
              Employee Age Category
            </label>
            <select
              id="employer-ni-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as EmployerNiCategory)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              {employerNiCategories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-relaxed text-ink/60">{categoryHelp}</p>
          </div>

          <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
            <input
              type="checkbox"
              checked={applyAllowance}
              onChange={(e) => setApplyAllowance(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
            />
            <span>
              <span className="block font-medium text-ink">Apply Employment Allowance</span>
              <span className="mt-1 block text-ink/60">
                Reduces employer NI by up to {wholeGbp.format(currentRates.employerNi.employmentAllowance)} per year for eligible employers.
              </span>
            </span>
          </label>

          <button
            type="button"
            onClick={resetCalculator}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent-strong hover:text-accent-strong"
          >
            Reset
          </button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className="card min-w-0 bg-paper/70 p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold">Employer NI cost</h2>
                <p className="mt-2 text-sm text-ink/60">
                  {calculation.costPercent.toFixed(1)}% of salary after selected allowances
                </p>
              </div>
              <div className="inline-flex rounded-xl border border-ink/10 bg-white p-1 text-sm shadow-sm">
                {(["annual", "monthly", "weekly"] as Period[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPeriod(item)}
                    className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                      period === item
                        ? "bg-accent-strong text-white shadow-sm"
                        : "text-ink/60 hover:text-accent-strong"
                    }`}
                  >
                    {item[0].toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="number-box mt-8 min-w-0 rounded-2xl border border-ink/10 bg-white p-6 text-center">
              <p className="tabular safe-number font-semibold text-accent-strong">
                {gbp.format(calculation.displayNi)}
              </p>
              <p className="mt-2 text-sm text-ink/60">{periodLabels[period]}</p>
            </div>

            {applyAllowance && (
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="min-w-0 rounded-xl border border-ink/10 bg-white p-4">
                  <dt className="text-xs uppercase tracking-widest text-ink/55">Before allowance</dt>
                  <dd className="tabular mt-1 break-words text-lg font-semibold text-ink">{gbp.format(calculation.displayRawNi)}</dd>
                </div>
                <div className="min-w-0 rounded-xl border border-accent-strong/20 bg-accent/[0.06] p-4">
                  <dt className="text-xs uppercase tracking-widest text-ink/55">Allowance saving</dt>
                  <dd className="tabular mt-1 break-words text-lg font-semibold text-accent-strong">{gbp.format(calculation.displaySaving)}</dd>
                </div>
              </dl>
            )}
          </section>

          <a
            href={`/employee-cost-calculator/?salary=${Math.round(calculation.salary)}`}
            className="card flex items-center justify-between gap-4 bg-white p-4 text-sm font-semibold shadow-sm transition-colors hover:border-accent-strong"
          >
            <span>
              You will pay {gbp.format(calculation.payableNi)} in employer NI. See the full employment cost.
            </span>
            <span aria-hidden="true" className="text-xl text-accent-strong">›</span>
          </a>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Total employment cost</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">
            {gbp.format(calculation.totalEmploymentCost)}
          </p>
          <p className="mt-1 text-sm text-ink/60">Salary plus employer NI after selected allowance</p>
        </div>
        <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">NI savings</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">
            {gbp.format(calculation.allowanceSaving)}
          </p>
          <p className="mt-1 text-sm text-ink/60">From Employment Allowance</p>
        </div>
      </section>

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Cost breakdown</h2>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)]">
          <div className="mx-auto w-full max-w-[220px]">
            <svg viewBox="0 0 120 120" role="img" aria-label="Cost breakdown chart" className="w-full">
              <circle
                cx="60"
                cy="60"
                r="42"
                fill="none"
                strokeWidth="16"
                className="stroke-ink/10"
              />
              {calculation.payableNi > 0 && (
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="none"
                  strokeWidth="16"
                  strokeLinecap="round"
                  className="origin-center -rotate-90 stroke-accent-strong"
                  style={{ strokeDasharray: `${niDash} ${circumference}` }}
                />
              )}
              <text x="60" y="55" textAnchor="middle" className="fill-ink text-[11px] font-semibold">
                {niPercent}%
              </text>
              <text x="60" y="70" textAnchor="middle" className="fill-ink/60 text-[7px]">
                employer NI
              </text>
            </svg>
          </div>

          <dl className="min-w-0 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-3 text-sm font-medium">
                <span className="h-3 w-3 rounded-full bg-ink/20" />
                Gross salary
              </dt>
              <dd className="tabular min-w-0 break-words text-right font-semibold">
                {gbp.format(calculation.salary)} <span className="font-normal text-ink/60">({salaryPercent}%)</span>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-3 text-sm font-medium">
                <span className="h-3 w-3 rounded-full bg-accent-strong" />
                Employer NI
              </dt>
              <dd className="tabular min-w-0 break-words text-right font-semibold">
                {gbp.format(calculation.payableNi)} <span className="font-normal text-ink/60">({niPercent}%)</span>
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-ink/10 pt-4">
              <dt className="text-lg font-semibold">Total</dt>
              <dd className="tabular min-w-0 break-words text-right text-2xl font-semibold text-accent-strong">
                {gbp.format(calculation.totalEmploymentCost)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">
          How this is calculated
        </summary>
        <div className="space-y-4 border-t border-ink/10 bg-paper/50 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Formula</p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-4 text-sm text-ink/85">
{`Employer NI = max(Annual salary - ${wholeGbp.format(calculation.threshold)} threshold, 0) × 15%`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Your calculation</p>
            <p className="mt-2 leading-relaxed text-ink/75">
              ({gbp.format(calculation.salary)} - {gbp.format(calculation.threshold)}) × 15% = {gbp.format(calculation.rawNi)} per year
              {applyAllowance && `, then minus ${gbp.format(calculation.allowanceSaving)} Employment Allowance saving = ${gbp.format(calculation.payableNi)} payable`}.
            </p>
          </div>
          <p className="text-xs leading-relaxed text-ink/60">
            This is an estimate for planning. Payroll software should apply the exact pay-period rules, NI category letter and Employment Allowance eligibility for the employer.
          </p>
        </div>
      </details>
    </div>
  );
}

function SmpCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialSalary = defaults?.annualSalary ?? 30000;
  const [annualSalary, setAnnualSalary] = useState(initialSalary);
  const [useActualAwe, setUseActualAwe] = useState(false);
  const [actualAwe, setActualAwe] = useState(initialSalary / 52);
  const [copied, setCopied] = useState(false);
  const averageWeeklyEarnings = useActualAwe ? actualAwe : annualSalary / 52;
  const calculation = useMemo(() => calculateSmp(averageWeeklyEarnings), [averageWeeklyEarnings]);

  function resetCalculator() {
    setAnnualSalary(initialSalary);
    setUseActualAwe(false);
    setActualAwe(initialSalary / 52);
    setCopied(false);
  }

  async function copyTotal() {
    try {
      await navigator.clipboard.writeText(gbp.format(calculation.totalPayable));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Statutory Maternity Pay inputs">
          <div><h2 className="text-2xl font-semibold">SMP details</h2><p className="mt-2 text-sm text-ink/60">Enter salary or use actual Average Weekly Earnings.</p></div>
          <div>
            <label htmlFor="smp-salary" className="mb-1.5 block text-sm font-medium">Annual salary <span className="text-accent-strong">*</span> <span className="font-normal text-ink/70">(£)</span></label>
            <input id="smp-salary" type="number" inputMode="decimal" min={0} step="any" value={annualSalary === 0 ? "" : annualSalary} onChange={(event) => setAnnualSalary(Number(event.target.value))} className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none" />
          </div>
          <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
            <input type="checkbox" checked={useActualAwe} onChange={(event) => { setUseActualAwe(event.target.checked); if (event.target.checked) setActualAwe(annualSalary / 52); }} className="mt-1 h-4 w-4 rounded accent-accent-strong" />
            <span><span className="block font-medium">Use actual Average Weekly Earnings</span><span className="mt-1 block text-ink/60">Use payroll AWE when it differs from annual salary divided by 52.</span></span>
          </label>
          {useActualAwe && (
            <div><label htmlFor="smp-awe" className="mb-1.5 block text-sm font-medium">Average Weekly Earnings <span className="text-accent-strong">*</span> <span className="font-normal text-ink/70">(£)</span></label><input id="smp-awe" type="number" inputMode="decimal" min={0} step="any" value={actualAwe === 0 ? "" : actualAwe} onChange={(event) => setActualAwe(Number(event.target.value))} className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none" /></div>
          )}
          <button type="button" onClick={resetCalculator} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold hover:border-accent-strong hover:text-accent-strong">Reset</button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className={calculation.eligible ? "card border-accent-strong/30 bg-accent/[0.08] p-6 shadow-sm" : "card border-red-300 bg-red-50 p-6 shadow-sm"}>
            <h2 className="text-2xl font-semibold">{calculation.eligible ? "✓ Eligible for SMP" : "× Does not qualify for SMP"}</h2>
            <p className="mt-4 text-ink/70">Average Weekly Earnings: <strong>{gbp.format(calculation.averageWeeklyEarnings)}</strong></p>
            {!calculation.eligible && <p className="mt-4 leading-relaxed text-ink/75">AWE is below £123 per week. The employer should provide form SMP1 so Maternity Allowance can be considered.</p>}
          </section>
          {calculation.eligible && (
            <section className="card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Statutory Maternity Pay</h2>
              <button type="button" onClick={copyTotal} className="tabular safe-number mx-auto mt-7 block font-semibold text-accent-strong" aria-label="Copy total SMP">{gbp.format(calculation.totalPayable)}</button>
              <p className="mt-2 text-sm text-ink/60">over 39 weeks</p><p className="mt-1 text-sm text-ink/60">≈ {gbp.format(calculation.monthlyEquivalent)}/month</p><p className="mt-2 text-xs font-medium text-accent-strong">{copied ? "Copied" : "Copy total"}</p>
            </section>
          )}
        </div>
      </div>
      {calculation.eligible && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card number-box min-w-0 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Weeks 1 to 6</h2><p className="tabular safe-number-md mt-4 font-semibold text-accent-strong">{gbp.format(calculation.firstSixWeeklyRate)}/week</p><p className="mt-1 text-sm text-ink/60">{gbp.format(calculation.firstSixTotal)} total</p></div>
          <div className="card number-box min-w-0 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Weeks 7 to 39</h2><p className="tabular safe-number-md mt-4 font-semibold text-accent-strong">{gbp.format(calculation.remainingWeeklyRate)}/week</p><p className="mt-1 text-sm text-ink/60">{gbp.format(calculation.remainingTotal)} total</p></div>
        </section>
      )}
      <details className="card overflow-hidden bg-white shadow-sm"><summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">Calculation breakdown</summary><div className="space-y-3 border-t border-ink/10 bg-paper/50 p-6 text-sm text-ink/75"><p>Average Weekly Earnings: {gbp.format(calculation.averageWeeklyEarnings)}.</p><p>First 6 weeks: 90% of AWE. Remaining 33 weeks: lower of 90% of AWE and {gbp.format(currentRates.smp.weeklyRate)}.</p></div></details>
    </div>
  );
}

const maternitySituationLabels: Record<MaternityAllowanceSituation, string> = {
  "self-employed": "Self-employed or freelancer",
  "employed-no-smp": "Employed but don't qualify for SMP",
  "recently-stopped": "Recently stopped working",
};

function MaternityAllowanceCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialAverageWeeklyEarnings = defaults?.averageWeeklyEarnings ?? 300;
  const [situation, setSituation] = useState<MaternityAllowanceSituation>("self-employed");
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState(initialAverageWeeklyEarnings);
  const [paidClass2Ni, setPaidClass2Ni] = useState(true);

  const calculation = useMemo(
    () => calculateMaternityAllowance({ situation, averageWeeklyEarnings, paidClass2Ni }),
    [situation, averageWeeklyEarnings, paidClass2Ni],
  );

  const isSelfEmployed = situation === "self-employed";
  const statusClasses = calculation.eligible
    ? "border-accent-strong/30 bg-accent/[0.08] text-ink"
    : "border-red-300 bg-red-50 text-ink";

  function resetCalculator() {
    setSituation("self-employed");
    setAverageWeeklyEarnings(initialAverageWeeklyEarnings);
    setPaidClass2Ni(true);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Maternity Allowance inputs">
          <div>
            <h2 className="text-2xl font-semibold">Your situation</h2>
            <p className="mt-2 text-sm text-ink/60">Enter your details to check Maternity Allowance eligibility.</p>
          </div>

          <div>
            <label htmlFor="ma-situation" className="mb-1.5 block text-sm font-medium">
              Which applies to you?
            </label>
            <select
              id="ma-situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value as MaternityAllowanceSituation)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              {Object.entries(maternitySituationLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ma-awe" className="mb-1.5 block text-sm font-medium">
              Average weekly earnings <span className="text-accent-strong">*</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="ma-awe"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={averageWeeklyEarnings === 0 ? "" : averageWeeklyEarnings}
              onChange={(e) => setAverageWeeklyEarnings(Number(e.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            <p className="mt-2 text-xs leading-relaxed text-ink/60">
              Use average weekly earnings from the best 13 weeks in the 66-week test period before the expected week of birth.
            </p>
          </div>

          {isSelfEmployed && (
            <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
              <input
                type="checkbox"
                checked={paidClass2Ni}
                onChange={(e) => setPaidClass2Ni(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
              />
              <span>
                <span className="block font-medium text-ink">Paid Class 2 NI for at least 13 weeks</span>
                <span className="mt-1 block text-ink/60">
                  In the 66 weeks before your expected week of birth. Required to claim MA as self-employed.
                </span>
              </span>
            </label>
          )}

          <button
            type="button"
            onClick={resetCalculator}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent-strong hover:text-accent-strong"
          >
            Reset
          </button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className={`card p-6 shadow-sm ${statusClasses}`}>
            <h2 className="text-2xl font-semibold">
              <span aria-hidden="true">{calculation.eligible ? "✓" : "×"}</span> {calculation.title}
            </h2>
            <p className="mt-6 leading-relaxed text-ink/70">{calculation.message}</p>
            <p className="mt-4 font-semibold leading-relaxed">{calculation.action}</p>
          </section>

          {calculation.eligible ? (
            <section className="card number-box min-w-0 border-accent-strong/30 bg-paper/70 p-6 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Maternity Allowance payable</h2>
              <p className="tabular safe-number mt-8 font-semibold text-accent-strong">
                {gbp.format(calculation.totalPayable)}
              </p>
              <p className="mt-2 text-sm text-ink/60">over {calculation.weeks} weeks</p>
              <p className="tabular safe-number-sm mt-5 font-semibold text-ink">
                {gbp.format(calculation.weeklyRate)}/week
              </p>
              <p className="mt-1 text-sm text-ink/60">≈ {gbp.format(calculation.monthlyEquivalent)}/month</p>
            </section>
          ) : (
            <section className="card border-amber-300 bg-amber-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-amber-900">You may be able to pay voluntary Class 2 NI</h2>
              <p className="mt-4 leading-relaxed text-amber-900/80">
                If you have not yet paid 13 weeks of Class 2 NI, you may be able to make voluntary contributions before you claim. Contact HMRC to check your NI record.
              </p>
            </section>
          )}
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="card bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">MA vs SMP at a glance</h2>
          <dl className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 gap-y-4 text-sm">
            <dt className="font-semibold text-ink/60"> </dt>
            <dd className="font-semibold">MA</dd>
            <dd className="font-semibold">SMP</dd>
            <dt className="text-ink/70">Who pays</dt>
            <dd>DWP</dd>
            <dd>Employer</dd>
            <dt className="text-ink/70">Weeks 1 to 6</dt>
            <dd>Flat rate</dd>
            <dd>90% AWE</dd>
            <dt className="text-ink/70">Weeks 7 to 39</dt>
            <dd>Flat rate</dd>
            <dd>{gbp.format(currentRates.smp.weeklyRate)}</dd>
            <dt className="text-ink/70">Self-employed</dt>
            <dd>✓</dd>
            <dd>×</dd>
          </dl>
        </div>

        <div className="card bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">How to claim</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/75">
            <li>Maternity Allowance is claimed from DWP, not your employer.</li>
            <li>Download form MA1 from GOV.UK or request it from Jobcentre Plus.</li>
            <li>Claim from 26 weeks pregnant, not earlier.</li>
            <li>Include evidence of earnings. If employed, include form SMP1 from your employer.</li>
            <li>MA can start from 11 weeks before your expected week of birth, or earlier if you stop work.</li>
          </ul>
        </div>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">How this is calculated</summary>
        <div className="space-y-4 border-t border-ink/10 bg-paper/50 p-6">
          <p className="leading-relaxed text-ink/75">
            The standard weekly rate is {gbp.format(currentRates.maternityAllowance.weeklyRate)} for up to {currentRates.maternityAllowance.totalWeeks} weeks. For employed or recently stopped working claims, the weekly amount is the lower of {gbp.format(currentRates.maternityAllowance.weeklyRate)} and 90% of average weekly earnings.
          </p>
          {isSelfEmployed && (
            <p className="leading-relaxed text-ink/75">
              For self-employed claims, this calculator checks whether Class 2 NI has been paid for at least {currentRates.maternityAllowance.requiredClass2NiWeeks} of the {currentRates.maternityAllowance.qualifyingPeriodWeeks} weeks before the expected week of birth.
            </p>
          )}
          <p className="text-xs leading-relaxed text-ink/60">
            This is an estimate for planning. DWP confirms final entitlement after reviewing the MA1 claim and evidence.
          </p>
        </div>
      </details>
    </div>
  );
}

const pensionSchemeLabels: Record<PensionSchemeType, string> = {
  qualifying: "Qualifying Earnings",
  total: "Total Earnings",
};

const employeeCostChartColours = {
  salary: "#CBD5E1",
  ni: "#15803D",
  pension: "#22C55E",
  additional: "#A3E635",
};

function EmployeeCostCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialSalary = defaults?.annualSalary ?? 30000;
  const [salary, setSalary] = useState(initialSalary);
  const [category, setCategory] = useState<EmployerNiCategory>("standard");
  const [applyAllowance, setApplyAllowance] = useState(false);
  const [includePension, setIncludePension] = useState(true);
  const [pensionScheme, setPensionScheme] = useState<PensionSchemeType>("qualifying");
  const [pensionRate, setPensionRate] = useState(currentRates.pension.employerMinPercent);
  const [additionalCosts, setAdditionalCosts] = useState(0);
  const [period, setPeriod] = useState<Period>("weekly");
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => {
    const safeSalary = Number.isFinite(salary) ? Math.max(0, salary) : 0;
    const safePensionRate = Number.isFinite(pensionRate) ? Math.max(0, pensionRate) : 0;
    const safeAdditionalCosts = Number.isFinite(additionalCosts) ? Math.max(0, additionalCosts) : 0;
    const ni = employerNiWithAllowance(safeSalary, category, applyAllowance);
    const pensionContribution = includePension
      ? employerPensionContribution(safeSalary, safePensionRate, pensionScheme)
      : 0;
    const divisor = periodDivisors[period];
    const totalEmploymentCost = safeSalary + ni.payableNi + pensionContribution + safeAdditionalCosts;
    const totalOnCosts = ni.payableNi + pensionContribution + safeAdditionalCosts;
    const costPercent = safeSalary > 0 ? (totalOnCosts / safeSalary) * 100 : 0;
    const pensionBase = pensionScheme === "qualifying"
      ? Math.max(
          0,
          Math.min(safeSalary, currentRates.pension.qualifyingUpperLimit) - currentRates.pension.qualifyingLowerLimit,
        )
      : safeSalary;
    const segments = [
      { key: "salary", label: "Gross salary", value: safeSalary, colour: employeeCostChartColours.salary },
      { key: "ni", label: "Employer NI", value: ni.payableNi, colour: employeeCostChartColours.ni },
      { key: "pension", label: "Pension", value: pensionContribution, colour: employeeCostChartColours.pension },
      { key: "additional", label: "Additional", value: safeAdditionalCosts, colour: employeeCostChartColours.additional },
    ].map((segment) => ({
      ...segment,
      share: totalEmploymentCost > 0 ? segment.value / totalEmploymentCost : 0,
    }));

    return {
      salary: safeSalary,
      rawNi: ni.rawNi,
      allowanceSaving: ni.allowanceSaving,
      payableNi: ni.payableNi,
      pensionContribution,
      additionalCosts: safeAdditionalCosts,
      totalEmploymentCost,
      costPercent,
      pensionBase,
      displayTotalCost: totalEmploymentCost / divisor,
      displayNi: ni.payableNi / divisor,
      displayPension: pensionContribution / divisor,
      displayAdditionalCosts: safeAdditionalCosts / divisor,
      segments,
    };
  }, [salary, category, applyAllowance, includePension, pensionScheme, pensionRate, additionalCosts, period]);

  const categoryHelp = employerNiCategories.find((item) => item.value === category)?.help;
  const circumference = 2 * Math.PI * 42;
  let dashOffset = 0;
  const chartSegments = calculation.segments.map((segment) => {
    const dash = segment.share * circumference;
    const item = { ...segment, dash, offset: dashOffset };
    dashOffset -= dash;
    return item;
  });

  function resetCalculator() {
    setSalary(initialSalary);
    setCategory("standard");
    setApplyAllowance(false);
    setIncludePension(true);
    setPensionScheme("qualifying");
    setPensionRate(currentRates.pension.employerMinPercent);
    setAdditionalCosts(0);
    setPeriod("weekly");
    setCopied(false);
  }

  async function copyResult() {
    const label = periodLabels[period];
    const value = gbp.format(calculation.displayTotalCost);
    const text = `${value} ${label} total employment cost. Employer NI: ${gbp.format(calculation.displayNi)} ${label}. Pension: ${gbp.format(calculation.displayPension)} ${label}.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Employee cost inputs">
          <div>
            <h2 className="text-2xl font-semibold">Employment cost inputs</h2>
            <p className="mt-2 text-sm text-ink/60">Results update as you type.</p>
          </div>

          <div>
            <label htmlFor="employee-cost-salary" className="mb-1.5 block text-sm font-medium">
              Annual Salary <span className="text-accent-strong">*</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="employee-cost-salary"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={salary === 0 ? "" : salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="employee-cost-category" className="mb-1.5 block text-sm font-medium">
              Employee Age Category
            </label>
            <select
              id="employee-cost-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as EmployerNiCategory)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              {employerNiCategories.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-relaxed text-ink/60">{categoryHelp}</p>
          </div>

          <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
            <input
              type="checkbox"
              checked={applyAllowance}
              onChange={(e) => setApplyAllowance(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
            />
            <span>
              <span className="block font-medium text-ink">Apply Employment Allowance</span>
              <span className="mt-1 block text-ink/60">
                Reduces employer NI by up to {wholeGbp.format(currentRates.employerNi.employmentAllowance)} per year for eligible employers.
              </span>
            </span>
          </label>

          <fieldset className="space-y-4 rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <legend className="px-1 text-sm font-semibold text-ink">Pension settings</legend>
            <label className="flex gap-3 text-sm">
              <input
                type="checkbox"
                checked={includePension}
                onChange={(e) => setIncludePension(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
              />
              <span>
                <span className="block font-medium text-ink">Include Workplace Pension</span>
                <span className="mt-1 block text-ink/60">Add employer pension contributions to the full employment cost.</span>
              </span>
            </label>

            {includePension && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="employee-cost-pension-scheme" className="mb-1.5 block text-sm font-medium">
                    Pension Scheme Type
                  </label>
                  <select
                    id="employee-cost-pension-scheme"
                    value={pensionScheme}
                    onChange={(e) => setPensionScheme(e.target.value as PensionSchemeType)}
                    className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  >
                    {Object.entries(pensionSchemeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="employee-cost-pension-rate" className="mb-1.5 block text-sm font-medium">
                    Employer Pension Rate (%)
                  </label>
                  <input
                    id="employee-cost-pension-rate"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.1"
                    value={pensionRate === 0 ? "" : pensionRate}
                    onChange={(e) => setPensionRate(Number(e.target.value))}
                    className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </fieldset>

          <div>
            <label htmlFor="employee-cost-additional-costs" className="mb-1.5 block text-sm font-medium">
              Additional Annual Costs <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="employee-cost-additional-costs"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              placeholder="0"
              value={additionalCosts === 0 ? "" : additionalCosts}
              onChange={(e) => setAdditionalCosts(Number(e.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            <p className="mt-2 text-xs leading-relaxed text-ink/60">
              Add insurance, software, equipment, recruitment, workspace or other annual employer costs.
            </p>
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent-strong hover:text-accent-strong"
          >
            Reset
          </button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className="card min-w-0 bg-paper/70 p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold">Total employment cost</h2>
                <p className="mt-2 text-sm text-ink/60">
                  {calculation.costPercent.toFixed(1)}% above salary, including selected on-costs
                </p>
              </div>
              <div className="inline-flex rounded-xl border border-ink/10 bg-white p-1 text-sm shadow-sm">
                {(["annual", "monthly", "weekly"] as Period[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPeriod(item)}
                    className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                      period === item ? "bg-accent-strong text-white shadow-sm" : "text-ink/60 hover:text-accent-strong"
                    }`}
                  >
                    {item[0].toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="number-box mt-8 min-w-0 rounded-2xl border border-ink/10 bg-white p-6 text-center">
              <button
                type="button"
                onClick={copyResult}
                className="tabular safe-number mx-auto font-semibold text-accent-strong transition-colors hover:text-accent"
                aria-label={`Copy ${period} total employment cost`}
              >
                {gbp.format(calculation.displayTotalCost)}
              </button>
              <p className="mt-2 text-sm text-ink/60">{periodLabels[period]}</p>
              <p className="mt-2 text-xs font-medium text-accent-strong">{copied ? "Copied" : "Click figure to copy"}</p>
            </div>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-ink/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Employer NI</dt>
                <dd className="tabular mt-1 break-words text-lg font-semibold text-accent-strong">{gbp.format(calculation.displayNi)}</dd>
              </div>
              <div className="min-w-0 rounded-xl border border-ink/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Pension</dt>
                <dd className="tabular mt-1 break-words text-lg font-semibold text-accent-strong">{gbp.format(calculation.displayPension)}</dd>
              </div>
              <div className="min-w-0 rounded-xl border border-ink/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Additional costs</dt>
                <dd className="tabular mt-1 break-words text-lg font-semibold text-accent-strong">{gbp.format(calculation.displayAdditionalCosts)}</dd>
              </div>
              <div className="min-w-0 rounded-xl border border-accent-strong/20 bg-accent/[0.06] p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Above salary</dt>
                <dd className="tabular mt-1 break-words text-lg font-semibold text-accent-strong">{calculation.costPercent.toFixed(1)}%</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Base salary</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.salary)}</p>
        </div>
        <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Employer NI</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.payableNi)}</p>
        </div>
        <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Pension contribution</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.pensionContribution)}</p>
          <p className="mt-1 text-sm text-ink/60">{includePension ? pensionSchemeLabels[pensionScheme] : "Not included"}</p>
        </div>
        <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Additional costs</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.additionalCosts)}</p>
        </div>
      </section>

      {applyAllowance && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink/60">Employer NI before allowance</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-ink">{gbp.format(calculation.rawNi)}</p>
          </div>
          <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink/60">Employment Allowance saving</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.allowanceSaving)}</p>
          </div>
        </section>
      )}

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Cost breakdown</h2>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(180px,240px)_minmax(0,1fr)]">
          <div className="mx-auto w-full max-w-[240px]">
            <svg viewBox="0 0 120 120" role="img" aria-label="Cost breakdown chart" className="w-full">
              <circle cx="60" cy="60" r="42" fill="none" strokeWidth="16" stroke={employeeCostChartColours.salary} opacity="0.35" />
              {chartSegments.map((segment) => (
                segment.value > 0 ? (
                  <circle
                    key={segment.key}
                    cx="60"
                    cy="60"
                    r="42"
                    fill="none"
                    strokeWidth="16"
                    strokeLinecap="butt"
                    stroke={segment.colour}
                    className="origin-center -rotate-90"
                    style={{
                      strokeDasharray: `${segment.dash} ${circumference - segment.dash}`,
                      strokeDashoffset: segment.offset,
                    }}
                  />
                ) : null
              ))}
              <text x="60" y="55" textAnchor="middle" className="fill-ink text-[10px] font-semibold">
                {gbp.format(calculation.totalEmploymentCost)}
              </text>
              <text x="60" y="70" textAnchor="middle" className="fill-ink/60 text-[7px]">total</text>
            </svg>
          </div>

          <dl className="min-w-0 space-y-4">
            {calculation.segments.map((segment) => (
              <div key={segment.key} className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-3 text-sm font-medium">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.colour }} />
                  {segment.label}
                </dt>
                <dd className="tabular min-w-0 break-words text-right font-semibold">
                  {gbp.format(segment.value)} <span className="font-normal text-ink/60">({Math.round(segment.share * 100)}%)</span>
                </dd>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-ink/10 pt-4">
              <dt className="text-lg font-semibold">Total</dt>
              <dd className="tabular min-w-0 break-words text-right text-2xl font-semibold text-accent-strong">
                {gbp.format(calculation.totalEmploymentCost)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">How this is calculated</summary>
        <div className="space-y-4 border-t border-ink/10 bg-paper/50 p-6">
          <p className="leading-relaxed text-ink/75">
            Total employment cost = {gbp.format(calculation.salary)} salary + {gbp.format(calculation.payableNi)} employer NI + {gbp.format(calculation.pensionContribution)} pension + {gbp.format(calculation.additionalCosts)} additional costs = {gbp.format(calculation.totalEmploymentCost)}.
          </p>
          <p className="leading-relaxed text-ink/75">
            Pension uses {includePension ? pensionSchemeLabels[pensionScheme] : "no pension contribution"}
            {includePension && `: ${gbp.format(calculation.pensionBase)} × ${pensionRate}% = ${gbp.format(calculation.pensionContribution)}`}.
          </p>
          <p className="text-xs leading-relaxed text-ink/60">
            This is an estimate for planning. Payroll software should apply the exact pay-period rules, NI category letter, pension scheme rules and Employment Allowance eligibility for the employer.
          </p>
        </div>
      </details>
    </div>
  );
}


type SalarySacrificeCalculatorProps = {
  defaults?: Record<string, number>;
  pensionMode: boolean;
};

const salarySacrificeSchemeLabels: Record<SalarySacrificeScheme, string> = {
  pension: "Pension (saves NI + income tax)",
  "cycle-to-work": "Cycle to Work (saves NI only)",
  "electric-vehicle": "Electric Vehicle (saves NI only)",
  other: "Other benefit (saves NI only)",
};

const employeeTaxBandLabels: Record<EmployeeTaxBand, string> = {
  basic: "Basic rate (20%)",
  higher: "Higher rate (40%)",
  additional: "Additional rate (45%)",
};

function SalarySacrificeCalculator({ defaults, pensionMode }: SalarySacrificeCalculatorProps) {
  const initialSalary = defaults?.annualSalary ?? (pensionMode ? 45000 : 40000);
  const initialSacrifice = defaults?.annualSacrificeAmount ?? 5000;
  const [salary, setSalary] = useState(initialSalary);
  const [sacrificeAmount, setSacrificeAmount] = useState(initialSacrifice);
  const [schemeType, setSchemeType] = useState<SalarySacrificeScheme>("pension");
  const [employeeTaxBand, setEmployeeTaxBand] = useState<EmployeeTaxBand>("basic");
  const [employerPassesNiSaving, setEmployerPassesNiSaving] = useState(pensionMode);

  const calculation = useMemo(
    () => calculateSalarySacrificeImpact({
      annualSalary: salary,
      annualSacrificeAmount: sacrificeAmount,
      schemeType: pensionMode ? "pension" : schemeType,
      employeeTaxBand,
      employerPassesNiSaving: pensionMode && employerPassesNiSaving,
    }),
    [salary, sacrificeAmount, schemeType, employeeTaxBand, pensionMode, employerPassesNiSaving],
  );

  const comparisonAmounts = [2500, 5000, 7500];
  const comparisonResults = comparisonAmounts.map((amount) => ({
    amount,
    result: calculateSalarySacrificeImpact({
      annualSalary: salary,
      annualSacrificeAmount: amount,
      schemeType: pensionMode ? "pension" : schemeType,
      employeeTaxBand,
      employerPassesNiSaving: pensionMode && employerPassesNiSaving,
    }),
  }));

  const taxPercent = calculation.taxRate * 100;
  const employeeNiPercent = calculation.employeeNiRate * 100;
  const employerNiPercent = currentRates.employerNi.rate * 100;
  const sacrificeWasCapped = calculation.effectiveSacrifice < calculation.annualSacrificeAmount;

  function resetCalculator() {
    setSalary(initialSalary);
    setSacrificeAmount(initialSacrifice);
    setSchemeType("pension");
    setEmployeeTaxBand("basic");
    setEmployerPassesNiSaving(pensionMode);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Salary sacrifice inputs">
          <div>
            <h2 className="text-2xl font-semibold">
              {pensionMode ? "Pension salary sacrifice" : "Salary sacrifice details"}
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              {pensionMode
                ? "Enter salary and pension contribution to calculate savings."
                : "Enter salary and sacrifice amount to calculate savings."}
            </p>
          </div>

          <div>
            <label htmlFor="sacrifice-salary" className="mb-1.5 block text-sm font-medium">
              Annual salary <span className="text-accent-strong">*</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="sacrifice-salary"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={salary === 0 ? "" : salary}
              onChange={(event) => setSalary(Number(event.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="sacrifice-amount" className="mb-1.5 block text-sm font-medium">
              {pensionMode ? "Annual pension contribution" : "Annual sacrifice amount"}
              <span className="text-accent-strong"> *</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="sacrifice-amount"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={sacrificeAmount === 0 ? "" : sacrificeAmount}
              onChange={(event) => setSacrificeAmount(Number(event.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            {sacrificeWasCapped && (
              <p className="mt-2 text-xs leading-relaxed text-amber-800">
                Savings are calculated on {gbp.format(calculation.effectiveSacrifice)} so at least £1 of gross salary remains.
              </p>
            )}
          </div>

          {!pensionMode && (
            <div>
              <label htmlFor="sacrifice-scheme" className="mb-1.5 block text-sm font-medium">Scheme type</label>
              <select
                id="sacrifice-scheme"
                value={schemeType}
                onChange={(event) => setSchemeType(event.target.value as SalarySacrificeScheme)}
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
              >
                {Object.entries(salarySacrificeSchemeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="employee-tax-band" className="mb-1.5 block text-sm font-medium">Employee tax band</label>
            <select
              id="employee-tax-band"
              value={employeeTaxBand}
              onChange={(event) => setEmployeeTaxBand(event.target.value as EmployeeTaxBand)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              {Object.entries(employeeTaxBandLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {pensionMode && (
            <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
              <input
                type="checkbox"
                checked={employerPassesNiSaving}
                onChange={(event) => setEmployerPassesNiSaving(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
              />
              <span>
                <span className="block font-medium text-ink">Employer passes NI saving into pension</span>
                <span className="mt-1 block text-ink/60">
                  Adds the employer NI saving to the pension pot at no extra employer cost.
                </span>
              </span>
            </label>
          )}

          <button
            type="button"
            onClick={resetCalculator}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent-strong hover:text-accent-strong"
          >
            Reset
          </button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className="card number-box min-w-0 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">New gross salary after sacrifice</h2>
            <p className="tabular safe-number-md mt-5 font-semibold text-accent-strong">
              {gbp.format(calculation.reducedSalary)}
            </p>
            <p className="mt-2 text-sm text-ink/60">
              {gbp.format(calculation.annualSalary)} - {gbp.format(calculation.annualSacrificeAmount)} sacrifice
            </p>
          </section>

          {pensionMode ? (
            <section className="card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Total pension contribution</h2>
              <p className="tabular safe-number mt-7 font-semibold text-accent-strong">
                {gbp.format(calculation.totalPensionContribution)}
              </p>
              <p className="mt-2 text-sm text-ink/60">annual pension contribution</p>
              <p className="mt-1 text-sm text-ink/60">{calculation.pensionContributionPercent.toFixed(1)}% of salary</p>
              {employerPassesNiSaving && (
                <p className="mt-1 text-xs text-ink/60">Includes {gbp.format(calculation.employerNiSaving)} employer NI saving</p>
              )}
            </section>
          ) : (
            <section className="card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Employee savings</h2>
              <p className="tabular safe-number mt-7 font-semibold text-accent-strong">
                {gbp.format(calculation.employeeTotalSaving)}
              </p>
              <p className="mt-2 text-sm text-ink/60">annual saving</p>
              <p className="mt-4 text-sm text-ink/70">
                Net cost to employee: <strong>{gbp.format(calculation.netEmployeeCost)}</strong> per year instead of {gbp.format(calculation.annualSacrificeAmount)}
              </p>
            </section>
          )}
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pensionMode && (
          <div className="card number-box min-w-0 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink/60">Net cost to employee</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.netEmployeeCost)}</p>
            <p className="mt-1 text-xs text-ink/60">{calculation.netCostPercent.toFixed(1)}% of salary</p>
          </div>
        )}
        {pensionMode && (
          <div className="card number-box min-w-0 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink/60">Employee total saving</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.employeeTotalSaving)}</p>
            <p className="mt-1 text-xs text-ink/60">NI + income tax</p>
          </div>
        )}
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm">
          <p className="text-sm text-ink/60">Employee NI saving</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.employeeNiSaving)}</p>
          <p className="mt-1 text-xs text-ink/60">{employeeNiPercent.toFixed(0)}% NI rate</p>
        </div>
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm">
          <p className="text-sm text-ink/60">Employer NI saving</p>
          <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.employerNiSaving)}</p>
          <p className="mt-1 text-xs text-ink/60">
            {pensionMode ? (employerPassesNiSaving ? "Added to pension" : "Retained by employer") : employerNiPercent.toFixed(0) + "% employer NI"}
          </p>
        </div>
        {!pensionMode && calculation.schemeType === "pension" && (
          <div className="card number-box min-w-0 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink/60">Income tax saving</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.incomeTaxSaving)}</p>
            <p className="mt-1 text-xs text-ink/60">{taxPercent.toFixed(0)}% tax rate</p>
          </div>
        )}
        {!pensionMode && (
          <div className="card number-box min-w-0 bg-accent/[0.06] p-5 shadow-sm">
            <p className="text-sm text-ink/60">Total both save</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.combinedSaving)}</p>
            <p className="mt-1 text-xs text-ink/60">per year combined</p>
          </div>
        )}
        {pensionMode && (
          <div className="card number-box min-w-0 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink/60">Monthly employee saving</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.monthlyEmployeeSaving)}</p>
            <p className="mt-1 text-xs text-ink/60">per month take-home impact</p>
          </div>
        )}
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">
          {pensionMode ? "Full breakdown" : "Calculation breakdown"}
        </summary>
        <div className="border-t border-ink/10 bg-paper/50 p-6">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt>{pensionMode ? "Pension sacrifice" : "Sacrifice amount"}</dt><dd className="tabular font-semibold">{gbp.format(calculation.annualSacrificeAmount)}</dd></div>
            {calculation.incomeTaxSaving > 0 && (
              <div className="flex justify-between gap-4"><dt>- Income tax saving ({taxPercent.toFixed(0)}%)</dt><dd className="tabular font-semibold">- {gbp.format(calculation.incomeTaxSaving)}</dd></div>
            )}
            <div className="flex justify-between gap-4"><dt>- Employee NI saving ({employeeNiPercent.toFixed(0)}%)</dt><dd className="tabular font-semibold">- {gbp.format(calculation.employeeNiSaving)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-ink/10 pt-3"><dt className="font-semibold">Net cost to employee</dt><dd className="tabular font-semibold text-accent-strong">{gbp.format(calculation.netEmployeeCost)}</dd></div>
            <div className="flex justify-between gap-4"><dt>Employer NI saving</dt><dd className="tabular font-semibold">{gbp.format(calculation.employerNiSaving)}</dd></div>
            {pensionMode && (
              <>
                <div className="flex justify-between gap-4 border-t border-ink/10 pt-3"><dt>Base pension contribution</dt><dd className="tabular font-semibold">{gbp.format(calculation.annualSacrificeAmount)}</dd></div>
                {employerPassesNiSaving && (
                  <div className="flex justify-between gap-4"><dt>+ Employer NI saving added</dt><dd className="tabular font-semibold">+ {gbp.format(calculation.employerNiSaving)}</dd></div>
                )}
                <div className="flex justify-between gap-4"><dt className="font-semibold">Total going into pension</dt><dd className="tabular font-semibold text-accent-strong">{gbp.format(calculation.totalPensionContribution)}</dd></div>
              </>
            )}
          </dl>
          {pensionMode && calculation.annualSacrificeAmount > 0 && (
            <p className="mt-5 rounded-lg bg-white p-4 text-sm text-ink/75">
              For every £1 the employee gives up, £{calculation.pensionBoostPerPound.toFixed(2)} goes into the pension.
            </p>
          )}
        </div>
      </details>

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Compare sacrifice amounts</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {comparisonResults.map(({ amount, result }) => (
            <button
              key={amount}
              type="button"
              onClick={() => setSacrificeAmount(amount)}
              className="number-box min-w-0 rounded-2xl border border-ink/10 bg-paper/60 p-4 text-left transition-colors hover:border-accent-strong"
            >
              <span className="block text-sm font-semibold">{gbp.format(amount)} sacrifice</span>
              <span className="tabular safe-number-sm mt-2 block font-semibold text-accent-strong">{gbp.format(result.employeeTotalSaving)} saved</span>
              <span className="mt-1 block text-xs text-ink/60">Net cost {gbp.format(result.netEmployeeCost)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkplacePensionCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialSalary = defaults?.annualSalary ?? 30000;
  const [salary, setSalary] = useState(initialSalary);
  const [employerPercent, setEmployerPercent] = useState(defaults?.employerPercent ?? currentRates.pension.employerMinPercent);
  const [employeePercent, setEmployeePercent] = useState(defaults?.employeePercent ?? currentRates.pension.employeeMinPercent);
  const [scheme, setScheme] = useState<PensionSchemeType>("qualifying");
  const [salaryExchange, setSalaryExchange] = useState(false);
  const [period, setPeriod] = useState<Period>("weekly");
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(
    () => calculateWorkplacePension({
      annualSalary: salary,
      schemeType: scheme,
      employerPercent,
      employeePercent,
      salaryExchange,
    }),
    [salary, scheme, employerPercent, employeePercent, salaryExchange],
  );

  const divisor = periodDivisors[period];
  const displayTotal = calculation.totalContribution / divisor;
  const employerShare = calculation.totalContribution > 0
    ? calculation.employerContribution / calculation.totalContribution
    : 0;
  const employeeShare = calculation.totalContribution > 0
    ? calculation.employeeContribution / calculation.totalContribution
    : 0;
  const circumference = 2 * Math.PI * 42;

  function resetCalculator() {
    setSalary(initialSalary);
    setEmployerPercent(defaults?.employerPercent ?? currentRates.pension.employerMinPercent);
    setEmployeePercent(defaults?.employeePercent ?? currentRates.pension.employeeMinPercent);
    setScheme("qualifying");
    setSalaryExchange(false);
    setPeriod("weekly");
    setCopied(false);
  }

  async function copyTotal() {
    try {
      await navigator.clipboard.writeText(gbp.format(displayTotal));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="card bg-accent/[0.06] p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Qualifying Earnings Band 2026/27</h2>
        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
          <p><span className="block text-ink/60">Lower limit</span><strong>{gbp.format(currentRates.pension.qualifyingLowerLimit)}</strong></p>
          <p><span className="block text-ink/60">Upper limit</span><strong>{gbp.format(currentRates.pension.qualifyingUpperLimit)}</strong></p>
          <p><span className="block text-ink/60">Auto-enrolment trigger</span><strong>{gbp.format(currentRates.pension.autoEnrolmentTrigger)}</strong></p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Workplace pension inputs">
          <div>
            <h2 className="text-2xl font-semibold">Workplace pension inputs</h2>
            <p className="mt-2 text-sm text-ink/60">Results update as you type.</p>
          </div>

          <div>
            <label htmlFor="pension-salary" className="mb-1.5 block text-sm font-medium">
              Annual salary <span className="text-accent-strong">*</span>
            </label>
            <input
              id="pension-salary"
              type="number"
              inputMode="decimal"
              min={0}
              max={10000000}
              step="any"
              value={salary === 0 ? "" : salary}
              onChange={(event) => setSalary(Number(event.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="pension-scheme" className="mb-1.5 block text-sm font-medium">Pension scheme type</label>
            <select
              id="pension-scheme"
              value={scheme}
              onChange={(event) => setScheme(event.target.value as PensionSchemeType)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              <option value="qualifying">Qualifying Earnings</option>
              <option value="total">Total Earnings</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pension-employer-percent" className="mb-1.5 block text-sm font-medium">Employer contribution (%)</label>
              <input
                id="pension-employer-percent"
                type="number"
                inputMode="decimal"
                min={3}
                max={100}
                step="0.5"
                value={employerPercent === 0 ? "" : employerPercent}
                onChange={(event) => setEmployerPercent(Number(event.target.value))}
                className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pension-employee-percent" className="mb-1.5 block text-sm font-medium">Employee contribution (%)</label>
              <input
                id="pension-employee-percent"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step="0.5"
                value={employeePercent === 0 ? "" : employeePercent}
                onChange={(event) => setEmployeePercent(Number(event.target.value))}
                className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>
          </div>

          <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
            <input
              type="checkbox"
              checked={salaryExchange}
              onChange={(event) => setSalaryExchange(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
            />
            <span>
              <span className="block font-medium text-ink">Salary Exchange</span>
              <span className="mt-1 block text-ink/60">Calculate employee and employer NI savings when the employee contribution is sacrificed.</span>
            </span>
          </label>

          <button type="button" onClick={resetCalculator} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent-strong hover:text-accent-strong">Reset</button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className="card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">Total pension contribution</h2>
            <div className="mt-5 inline-flex rounded-xl border border-ink/10 bg-white p-1 text-sm shadow-sm">
              {(["annual", "monthly", "weekly"] as Period[]).map((item) => (
                <button key={item} type="button" onClick={() => setPeriod(item)} className={item === period ? "rounded-lg bg-accent-strong px-3 py-1.5 font-medium text-white" : "rounded-lg px-3 py-1.5 font-medium text-ink/60"}>
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            <button type="button" onClick={copyTotal} className="tabular safe-number mx-auto mt-7 block font-semibold text-accent-strong" aria-label={"Copy per " + period + " figure"}>
              {gbp.format(displayTotal)}
            </button>
            <p className="mt-2 text-sm text-ink/60">{periodLabels[period]}</p>
            <p className="mt-2 text-xs font-medium text-accent-strong">{copied ? "Copied" : "Copy " + period + " figure"}</p>
          </section>

          <Link href="/salary-sacrifice-pension-calculator/" className="card flex items-center justify-between gap-4 bg-white p-4 text-sm font-semibold shadow-sm transition-colors hover:border-accent-strong">
            <span>Compare pension Salary Exchange tax and NI savings</span><span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">Employer contribution</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.employerContribution)}</p></div>
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">Employee contribution</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.employeeContribution)}</p></div>
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">Qualifying Earnings</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(calculation.pensionablePay)}</p><p className="mt-1 text-xs text-ink/60">{scheme === "total" ? "Full salary" : "Selected pensionable band"}</p></div>
      </section>

      {salaryExchange && (
        <section className="card number-box min-w-0 bg-accent/[0.06] p-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Total NI savings</h2>
          <p className="tabular safe-number-md mt-3 font-semibold text-accent-strong">{gbp.format(calculation.totalNiSaving)}</p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><p>Employer NI saving <strong>{gbp.format(calculation.employerNiSaving)}</strong></p><p>Employee NI saving <strong>{gbp.format(calculation.employeeNiSaving)}</strong></p></div>
        </section>
      )}

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Contribution breakdown</h2>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)]">
          <svg viewBox="0 0 120 120" role="img" aria-label="Pension contribution chart" className="mx-auto w-full max-w-[220px]">
            <circle cx="60" cy="60" r="42" fill="none" strokeWidth="16" className="stroke-ink/10" />
            <circle cx="60" cy="60" r="42" fill="none" strokeWidth="16" className="origin-center -rotate-90 stroke-accent-strong" style={{ strokeDasharray: employerShare * circumference + " " + circumference }} />
            <circle cx="60" cy="60" r="42" fill="none" strokeWidth="16" className="origin-center -rotate-90 stroke-accent" style={{ strokeDasharray: employeeShare * circumference + " " + circumference, strokeDashoffset: -employerShare * circumference }} />
          </svg>
          <dl className="space-y-4">
            <div className="flex justify-between gap-4"><dt>Employer</dt><dd className="tabular font-semibold">{gbp.format(calculation.employerContribution)} ({Math.round(employerShare * 100)}%)</dd></div>
            <div className="flex justify-between gap-4"><dt>Employee</dt><dd className="tabular font-semibold">{gbp.format(calculation.employeeContribution)} ({Math.round(employeeShare * 100)}%)</dd></div>
            <div className="flex justify-between gap-4 border-t border-ink/10 pt-4"><dt className="font-semibold">Total</dt><dd className="tabular font-semibold text-accent-strong">{gbp.format(calculation.totalContribution)}</dd></div>
          </dl>
        </div>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm">
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">How this is calculated</summary>
        <div className="space-y-3 border-t border-ink/10 bg-paper/50 p-6 text-sm text-ink/75">
          <p>Pensionable pay is {gbp.format(calculation.pensionablePay)} using {scheme === "qualifying" ? "Qualifying Earnings" : "Total Earnings"}.</p>
          <p>Employer: {gbp.format(calculation.pensionablePay)} × {employerPercent}% = {gbp.format(calculation.employerContribution)}.</p>
          <p>Employee: {gbp.format(calculation.pensionablePay)} × {employeePercent}% = {gbp.format(calculation.employeeContribution)}.</p>
        </div>
      </details>
    </div>
  );
}
