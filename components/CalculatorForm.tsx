"use client";

import { useMemo, useState } from "react";
import { currentRates } from "@/data/rates";
import {
  calculate,
  calculatorInputs,
  employerNiCategoryThresholds,
  employerNiWithAllowance,
  employerPensionContribution,
  type CalculatorKind,
  type EmployerNiCategory,
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
        className="card bg-paper/70 p-6 shadow-sm md:sticky md:top-20 md:self-start"
      >
        <h2 className="text-2xl font-semibold">Your results</h2>
        <dl className="mt-5 divide-y divide-ink/10">
          {results.map((line) => (
            <div key={line.label} className="py-3 first:pt-0 last:pb-0">
              <dt className="text-sm text-ink/65">{line.label}</dt>
              <dd className="tabular text-3xl font-semibold text-accent-strong">
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

const pensionSchemeLabels: Record<PensionSchemeType, string> = {
  qualifying: "Qualifying Earnings",
  total: "Total Earnings",
};

const chartColours = {
  salary: "#CBD5E1",
  ni: "#15803D",
  pension: "#22C55E",
  additional: "#A3E635",
};

function EmployerNiCalculator({ defaults }: { defaults?: Record<string, number> }) {
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
    const threshold = employerNiCategoryThresholds[category];
    const divisor = periodDivisors[period];
    const totalEmploymentCost = safeSalary + ni.payableNi + pensionContribution + safeAdditionalCosts;
    const totalOnCosts = ni.payableNi + pensionContribution + safeAdditionalCosts;
    const costPercent = safeSalary > 0 ? (totalOnCosts / safeSalary) * 100 : 0;
    const niPercentOfSalary = safeSalary > 0 ? (ni.payableNi / safeSalary) * 100 : 0;
    const pensionBase = pensionScheme === "qualifying"
      ? Math.max(
          0,
          Math.min(safeSalary, currentRates.pension.qualifyingUpperLimit) - currentRates.pension.qualifyingLowerLimit,
        )
      : safeSalary;

    const segments = [
      { key: "salary", label: "Gross salary", value: safeSalary, colour: chartColours.salary },
      { key: "ni", label: "Employer NI", value: ni.payableNi, colour: chartColours.ni },
      { key: "pension", label: "Pension", value: pensionContribution, colour: chartColours.pension },
      { key: "additional", label: "Additional", value: safeAdditionalCosts, colour: chartColours.additional },
    ].map((segment) => ({
      ...segment,
      share: totalEmploymentCost > 0 ? segment.value / totalEmploymentCost : 0,
    }));

    return {
      salary: safeSalary,
      threshold,
      rawNi: ni.rawNi,
      allowanceSaving: ni.allowanceSaving,
      payableNi: ni.payableNi,
      pensionContribution,
      additionalCosts: safeAdditionalCosts,
      totalEmploymentCost,
      totalOnCosts,
      costPercent,
      niPercentOfSalary,
      pensionBase,
      displayNi: ni.payableNi / divisor,
      displayTotalCost: totalEmploymentCost / divisor,
      displayRawNi: ni.rawNi / divisor,
      displaySaving: ni.allowanceSaving / divisor,
      displayPension: pensionContribution / divisor,
      displayAdditionalCosts: safeAdditionalCosts / divisor,
      taxableEarnings: Math.max(0, safeSalary - threshold),
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
    const text = `${value} ${label} total employment cost. Employer NI: ${gbp.format(calculation.displayNi)} ${label}.`;
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
      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
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
                  <label htmlFor="pension-scheme" className="mb-1.5 block text-sm font-medium">
                    Pension scheme type
                  </label>
                  <select
                    id="pension-scheme"
                    value={pensionScheme}
                    onChange={(e) => setPensionScheme(e.target.value as PensionSchemeType)}
                    className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base transition-colors hover:border-ink/30 focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  >
                    {Object.entries(pensionSchemeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pension-rate" className="mb-1.5 block text-sm font-medium">
                    Employer pension rate (%)
                  </label>
                  <input
                    id="pension-rate"
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
            <label htmlFor="additional-costs" className="mb-1.5 block text-sm font-medium">
              Additional annual costs <span className="ml-1 font-normal text-ink/70">(£)</span>
            </label>
            <input
              id="additional-costs"
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

        <div className="space-y-4" aria-live="polite">
          <section className="card bg-paper/70 p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
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

            <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 text-center">
              <button
                type="button"
                onClick={copyResult}
                className="tabular text-5xl font-semibold text-accent-strong transition-colors hover:text-accent sm:text-6xl"
                aria-label={`Copy ${period} total employment cost`}
              >
                {gbp.format(calculation.displayTotalCost)}
              </button>
              <p className="mt-2 text-sm text-ink/60">{periodLabels[period]}</p>
              <p className="mt-2 text-xs font-medium text-accent-strong">{copied ? "Copied" : "Click figure to copy"}</p>
            </div>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-ink/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Employer NI</dt>
                <dd className="tabular mt-1 text-lg font-semibold text-accent-strong">{gbp.format(calculation.displayNi)}</dd>
              </div>
              <div className="rounded-xl border border-ink/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Pension</dt>
                <dd className="tabular mt-1 text-lg font-semibold text-accent-strong">{gbp.format(calculation.displayPension)}</dd>
              </div>
              <div className="rounded-xl border border-ink/10 bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Additional costs</dt>
                <dd className="tabular mt-1 text-lg font-semibold text-accent-strong">{gbp.format(calculation.displayAdditionalCosts)}</dd>
              </div>
              <div className="rounded-xl border border-accent-strong/20 bg-accent/[0.06] p-4">
                <dt className="text-xs uppercase tracking-widest text-ink/55">Above salary</dt>
                <dd className="tabular mt-1 text-lg font-semibold text-accent-strong">{calculation.costPercent.toFixed(1)}%</dd>
              </div>
            </dl>
          </section>

          <a
            href={`/employee-cost-calculator/?salary=${Math.round(calculation.salary)}`}
            className="card flex items-center justify-between gap-4 bg-white p-4 text-sm font-semibold shadow-sm transition-colors hover:border-accent-strong"
          >
            <span>
              Employer NI alone is {gbp.format(calculation.payableNi)} per year. Use the full cost view for payroll planning.
            </span>
            <span aria-hidden="true" className="text-xl text-accent-strong">›</span>
          </a>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Base salary</p>
          <p className="tabular mt-2 text-3xl font-semibold text-accent-strong">{gbp.format(calculation.salary)}</p>
        </div>
        <div className="card bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Employer NI</p>
          <p className="tabular mt-2 text-3xl font-semibold text-accent-strong">{gbp.format(calculation.payableNi)}</p>
          <p className="mt-1 text-sm text-ink/60">{calculation.niPercentOfSalary.toFixed(1)}% of salary</p>
        </div>
        <div className="card bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Pension contribution</p>
          <p className="tabular mt-2 text-3xl font-semibold text-accent-strong">{gbp.format(calculation.pensionContribution)}</p>
          <p className="mt-1 text-sm text-ink/60">{includePension ? pensionSchemeLabels[pensionScheme] : "Not included"}</p>
        </div>
        <div className="card bg-white p-6 shadow-sm">
          <p className="text-sm text-ink/60">Additional costs</p>
          <p className="tabular mt-2 text-3xl font-semibold text-accent-strong">{gbp.format(calculation.additionalCosts)}</p>
        </div>
      </section>

      {applyAllowance && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card bg-white p-6 shadow-sm">
            <p className="text-sm text-ink/60">Employer NI before allowance</p>
            <p className="tabular mt-2 text-3xl font-semibold text-ink">{gbp.format(calculation.rawNi)}</p>
          </div>
          <div className="card bg-white p-6 shadow-sm">
            <p className="text-sm text-ink/60">Employment Allowance saving</p>
            <p className="tabular mt-2 text-3xl font-semibold text-accent-strong">{gbp.format(calculation.allowanceSaving)}</p>
          </div>
        </section>
      )}

      <section className="card bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Cost breakdown</h2>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-[240px_1fr]">
          <div className="mx-auto w-full max-w-[240px]">
            <svg viewBox="0 0 120 120" role="img" aria-label="Cost breakdown chart" className="w-full">
              <circle
                cx="60"
                cy="60"
                r="42"
                fill="none"
                strokeWidth="16"
                stroke={chartColours.salary}
                opacity="0.35"
              />
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
              <text x="60" y="70" textAnchor="middle" className="fill-ink/60 text-[7px]">
                total
              </text>
            </svg>
          </div>

          <dl className="space-y-4">
            {calculation.segments.map((segment) => (
              <div key={segment.key} className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-3 text-sm font-medium">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.colour }} />
                  {segment.label}
                </dt>
                <dd className="tabular text-right font-semibold">
                  {gbp.format(segment.value)} <span className="font-normal text-ink/60">({Math.round(segment.share * 100)}%)</span>
                </dd>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-ink/10 pt-4">
              <dt className="text-lg font-semibold">Total</dt>
              <dd className="tabular text-2xl font-semibold text-accent-strong">
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
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Employer NI formula</p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-4 text-sm text-ink/85">
{`Employer NI = max(Annual salary - ${wholeGbp.format(calculation.threshold)} threshold, 0) × 15%`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Your employer NI</p>
            <p className="mt-2 leading-relaxed text-ink/75">
              ({gbp.format(calculation.salary)} - {gbp.format(calculation.threshold)}) × 15% = {gbp.format(calculation.rawNi)} per year
              {applyAllowance && `, then minus ${gbp.format(calculation.allowanceSaving)} Employment Allowance saving = ${gbp.format(calculation.payableNi)} payable`}.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Pension and extras</p>
            <p className="mt-2 leading-relaxed text-ink/75">
              Pension uses {includePension ? pensionSchemeLabels[pensionScheme] : "no pension contribution"}
              {includePension && `: ${gbp.format(calculation.pensionBase)} × ${pensionRate}% = ${gbp.format(calculation.pensionContribution)}`}. Additional annual costs are {gbp.format(calculation.additionalCosts)}.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">Total employment cost</p>
            <p className="mt-2 leading-relaxed text-ink/75">
              {gbp.format(calculation.salary)} salary + {gbp.format(calculation.payableNi)} employer NI + {gbp.format(calculation.pensionContribution)} pension + {gbp.format(calculation.additionalCosts)} additional costs = {gbp.format(calculation.totalEmploymentCost)}.
            </p>
          </div>
          <p className="text-xs leading-relaxed text-ink/60">
            This is an estimate for planning. Payroll software should apply the exact pay-period rules, NI category letter, pension scheme rules and Employment Allowance eligibility for the employer.
          </p>
        </div>
      </details>
    </div>
  );
}
