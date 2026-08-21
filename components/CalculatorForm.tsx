"use client";

import { useMemo, useState } from "react";
import { currentRates } from "@/data/rates";
import {
  calculate,
  calculatorInputs,
  calculateMaternityAllowance,
  calculateSalarySacrificeImpact,
  employerNiCategoryThresholds,
  employerNiWithAllowance,
  employerPensionContribution,
  type CalculatorKind,
  type EmployerNiCategory,
  type MaternityAllowanceSituation,
  type PensionSchemeType,
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
}: {
  kind: CalculatorKind;
  defaults?: Record<string, number>;
}) {
  if (kind === "employer-ni") return <EmployerNiCalculator defaults={defaults} />;
  if (kind === "employee-cost") return <EmployeeCostCalculator defaults={defaults} />;
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
  const [period, setPeriod] = useState<Period>("annual");

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
    setPeriod("annual");
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
              Annual salary <span className="text-accent-strong">*</span>
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
              Employee age or NI category
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

const maternitySituationLabels: Record<MaternityAllowanceSituation, string> = {
  "self-employed": "Self-employed or freelancer",
  "employed-no-smp": "Employed but do not qualify for SMP",
  "recently-stopped": "Recently stopped working",
};

function MaternityAllowanceCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialAverageWeeklyEarnings = defaults?.averageWeeklyEarnings ?? 500;
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
  const [period, setPeriod] = useState<Period>("annual");
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
    setPeriod("annual");
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
              Annual salary <span className="text-accent-strong">*</span>
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
              Employee age or NI category
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
                    Pension scheme type
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
                    Employer pension rate (%)
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
              Additional annual costs <span className="ml-1 font-normal text-ink/70">(£)</span>
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

function SalarySacrificeCalculator({ defaults, pensionMode }: SalarySacrificeCalculatorProps) {
  const initialSalary = defaults?.annualSalary ?? 30000;
  const [salary, setSalary] = useState(initialSalary);
  const [sacrificePercent, setSacrificePercent] = useState(defaults?.sacrificePercent ?? 5);
  const [employerTopUp, setEmployerTopUp] = useState(pensionMode);

  const calculation = useMemo(
    () => calculateSalarySacrificeImpact(salary, sacrificePercent, pensionMode && employerTopUp),
    [salary, sacrificePercent, pensionMode, employerTopUp],
  );

  const scenarioPercents = [3, 5, 8];
  const scenarios = scenarioPercents.map((percent) => ({
    percent,
    impact: calculateSalarySacrificeImpact(salary, percent, pensionMode && employerTopUp),
  }));

  function resetCalculator() {
    setSalary(initialSalary);
    setSacrificePercent(defaults?.sacrificePercent ?? 5);
    setEmployerTopUp(pensionMode);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Salary sacrifice inputs">
          <div>
            <h2 className="text-2xl font-semibold">Salary sacrifice inputs</h2>
            <p className="mt-2 text-sm text-ink/60">See the tax, NI and take-home effect as you type.</p>
          </div>

          <div>
            <label htmlFor="sacrifice-salary" className="mb-1.5 block text-sm font-medium">
              Annual gross salary <span className="text-accent-strong">*</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="sacrifice-salary"
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
            <label htmlFor="sacrifice-percent" className="mb-1.5 block text-sm font-medium">
              Salary sacrificed <span className="ml-1 font-normal text-ink/70">(%)</span>
            </label>
            <input
              id="sacrifice-percent"
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step="0.1"
              value={sacrificePercent === 0 ? "" : sacrificePercent}
              onChange={(e) => setSacrificePercent(Number(e.target.value))}
              className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            <p className="mt-2 text-xs leading-relaxed text-ink/60">
              This reduces contractual gross pay, so income tax and employee NI usually fall.
            </p>
          </div>

          {pensionMode && (
            <label className="flex gap-3 rounded-lg border border-ink/10 bg-paper/60 p-4 text-sm">
              <input
                type="checkbox"
                checked={employerTopUp}
                onChange={(e) => setEmployerTopUp(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink/30 accent-accent-strong"
              />
              <span>
                <span className="block font-medium text-ink">Add employer NI saving to pension</span>
                <span className="mt-1 block text-ink/60">Some employers pass their NI saving into the pension contribution.</span>
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
          <section className="card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">Net employee cost</h2>
            <p className="mt-2 text-sm text-ink/60">What the sacrifice costs after tax and NI savings</p>
            <p className="tabular safe-number mt-8 font-semibold text-accent-strong">
              {gbp.format(calculation.netEmployeeCost)}
            </p>
            <p className="mt-2 text-sm text-ink/60">{gbp.format(calculation.monthlyNetCost)} per month</p>
          </section>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Salary sacrificed</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.sacrificed)}</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Reduced gross salary</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.reducedSalary)}</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Income tax saving</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.incomeTaxSaving)}</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Employee NI saving</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.employeeNiSaving)}</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Employer NI saving</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.employerNiSaving)}</dd>
            </div>
            <div className="card number-box min-w-0 bg-accent/[0.06] p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Combined tax and NI saving</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.combinedTaxNiSaving)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {pensionMode && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink/60">Annual pension contribution</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">
              {gbp.format(calculation.pensionContributionWithEmployerTopUp)}
            </p>
            <p className="mt-1 text-sm text-ink/60">Includes selected employer NI top-up</p>
          </div>
          <div className="card number-box min-w-0 bg-white p-6 shadow-sm">
            <p className="text-sm text-ink/60">10-year contribution projection</p>
            <p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">
              {gbp.format(calculation.tenYearPensionValue)}
            </p>
            <p className="mt-1 text-sm text-ink/60">Before investment growth or charges</p>
          </div>
        </section>
      )}

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Compare sacrifice rates</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {scenarios.map(({ percent, impact }) => (
            <button
              key={percent}
              type="button"
              onClick={() => setSacrificePercent(percent)}
              className="number-box min-w-0 rounded-2xl border border-ink/10 bg-paper/60 p-4 text-left transition-colors hover:border-accent-strong"
            >
              <span className="block text-sm font-semibold">{percent}% sacrifice</span>
              <span className="tabular safe-number-sm mt-2 block font-semibold text-accent-strong">{gbp.format(impact.sacrificed)}</span>
              <span className="mt-1 block text-xs text-ink/60">Net cost {gbp.format(impact.netEmployeeCost)} per year</span>
            </button>
          ))}
        </div>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">How this is calculated</summary>
        <div className="space-y-4 border-t border-ink/10 bg-paper/50 p-6">
          <p className="leading-relaxed text-ink/75">
            Net employee cost = salary sacrificed minus income tax saving and employee NI saving. Employer NI saving is shown separately because the employer decides whether to keep it or add it to the pension.
          </p>
          <p className="leading-relaxed text-ink/75">
            Your calculation: {gbp.format(calculation.sacrificed)} sacrificed - {gbp.format(calculation.incomeTaxSaving)} tax saving - {gbp.format(calculation.employeeNiSaving)} employee NI saving = {gbp.format(calculation.netEmployeeCost)} net employee cost.
          </p>
        </div>
      </details>
    </div>
  );
}

function WorkplacePensionCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialSalary = defaults?.annualSalary ?? 30000;
  const [salary, setSalary] = useState(initialSalary);
  const [employeePercent, setEmployeePercent] = useState(defaults?.employeePercent ?? currentRates.pension.employeeMinPercent);
  const [employerPercent, setEmployerPercent] = useState(defaults?.employerPercent ?? currentRates.pension.employerMinPercent);
  const [scheme, setScheme] = useState<PensionSchemeType>("qualifying");

  const calculation = useMemo(() => {
    const safeSalary = Number.isFinite(salary) ? Math.max(0, salary) : 0;
    const pensionablePay = scheme === "qualifying"
      ? Math.max(0, Math.min(safeSalary, currentRates.pension.qualifyingUpperLimit) - currentRates.pension.qualifyingLowerLimit)
      : safeSalary;
    const employeeContribution = pensionablePay * (Math.max(0, employeePercent) / 100);
    const employerContribution = pensionablePay * (Math.max(0, employerPercent) / 100);
    return {
      salary: safeSalary,
      pensionablePay,
      employeeContribution,
      employerContribution,
      totalContribution: employeeContribution + employerContribution,
      monthlyEmployeeContribution: employeeContribution / 12,
      monthlyEmployerContribution: employerContribution / 12,
      aboveAutoEnrolmentTrigger: safeSalary >= currentRates.pension.autoEnrolmentTrigger,
    };
  }, [salary, employeePercent, employerPercent, scheme]);

  function resetCalculator() {
    setSalary(initialSalary);
    setEmployeePercent(defaults?.employeePercent ?? currentRates.pension.employeeMinPercent);
    setEmployerPercent(defaults?.employerPercent ?? currentRates.pension.employerMinPercent);
    setScheme("qualifying");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="Workplace pension inputs">
          <div>
            <h2 className="text-2xl font-semibold">Workplace pension inputs</h2>
            <p className="mt-2 text-sm text-ink/60">Choose qualifying earnings or total earnings, then adjust contribution rates.</p>
          </div>

          <div>
            <label htmlFor="pension-salary" className="mb-1.5 block text-sm font-medium">
              Annual gross salary <span className="text-accent-strong">*</span>
              <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="pension-salary"
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
            <label htmlFor="pension-scheme" className="mb-1.5 block text-sm font-medium">Contribution basis</label>
            <select
              id="pension-scheme"
              value={scheme}
              onChange={(e) => setScheme(e.target.value as PensionSchemeType)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
            >
              <option value="qualifying">Qualifying earnings</option>
              <option value="total">Total earnings</option>
            </select>
            <p className="mt-2 text-xs leading-relaxed text-ink/60">
              Qualifying earnings uses the band from {gbp.format(currentRates.pension.qualifyingLowerLimit)} to {gbp.format(currentRates.pension.qualifyingUpperLimit)}.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pension-employee-percent" className="mb-1.5 block text-sm font-medium">Employee contribution (%)</label>
              <input
                id="pension-employee-percent"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={employeePercent === 0 ? "" : employeePercent}
                onChange={(e) => setEmployeePercent(Number(e.target.value))}
                className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pension-employer-percent" className="mb-1.5 block text-sm font-medium">Employer contribution (%)</label>
              <input
                id="pension-employer-percent"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={employerPercent === 0 ? "" : employerPercent}
                onChange={(e) => setEmployerPercent(Number(e.target.value))}
                className="tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>
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
          <section className="card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">Total pension contribution</h2>
            <p className="tabular safe-number mt-8 font-semibold text-accent-strong">
              {gbp.format(calculation.totalContribution)}
            </p>
            <p className="mt-2 text-sm text-ink/60">per year</p>
          </section>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Employee annual</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.employeeContribution)}</dd>
              <dd className="mt-1 text-xs text-ink/60">{gbp.format(calculation.monthlyEmployeeContribution)} monthly</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Employer annual</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.employerContribution)}</dd>
              <dd className="mt-1 text-xs text-ink/60">{gbp.format(calculation.monthlyEmployerContribution)} monthly</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Pensionable pay</dt>
              <dd className="tabular safe-number-sm mt-1 font-semibold text-accent-strong">{gbp.format(calculation.pensionablePay)}</dd>
            </div>
            <div className="card number-box min-w-0 bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase tracking-widest text-ink/55">Auto-enrolment trigger</dt>
              <dd className="mt-1 font-semibold text-accent-strong">{calculation.aboveAutoEnrolmentTrigger ? "Reached" : "Below trigger"}</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Salary sacrifice companion check</h2>
        <p className="mt-3 leading-relaxed text-ink/70">
          If pension contributions are made through salary sacrifice, employee and employer NI can fall. Use the salary sacrifice pension calculator to compare net cost and employer NI top-up.
        </p>
        <a
          href={`/salary-sacrifice-pension-calculator/?salary=${Math.round(calculation.salary)}`}
          className="mt-5 inline-flex rounded-lg bg-accent-strong px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
        >
          Compare salary sacrifice pension
        </a>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">How this is calculated</summary>
        <div className="space-y-4 border-t border-ink/10 bg-paper/50 p-6">
          <p className="leading-relaxed text-ink/75">
            Pensionable pay is {gbp.format(calculation.pensionablePay)} using the selected {scheme === "qualifying" ? "qualifying earnings" : "total earnings"} basis. Employee contribution is {employeePercent}% and employer contribution is {employerPercent}% of that pensionable pay.
          </p>
          <p className="text-xs leading-relaxed text-ink/60">
            This is a planning estimate. Your pension scheme rules can use different definitions of pensionable pay.
          </p>
        </div>
      </details>
    </div>
  );
}
