"use client";

import { useMemo, useState } from "react";
import {
  calculate,
  calculatorInputs,
  type CalculatorKind,
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
      <form className="space-y-5" aria-label="Calculator inputs">
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
        className="rounded-2xl bg-ink p-6 text-paper shadow-sm md:sticky md:top-20 md:self-start"
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-paper/60">
          Your results
        </h2>
        <dl className="mt-5 divide-y divide-paper/10">
          {results.map((line) => (
            <div key={line.label} className="py-3 first:pt-0 last:pb-0">
              <dt className="text-sm text-paper/70">{line.label}</dt>
              <dd className="tabular text-3xl font-semibold text-accent">
                {formatValue(line.value, line.format)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-paper/50">
          Estimates only, based on 2026/27 HMRC rates. Verify against GOV.UK before making payroll decisions.
        </p>
      </div>
    </div>
  );
}
