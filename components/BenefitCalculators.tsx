"use client";

import { useMemo, useState } from "react";
import { currentRates } from "@/data/rates";
import {
  calculateP11d,
  calculateSickPay,
  type EnhancedSickPayMode,
  type SickPayStatus,
} from "@/lib/calculators";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

const inputClass = "tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none";
const selectClass = "w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none";

const benefitTypes = [
  "Private Medical Insurance",
  "Company Van (personal use)",
  "Gym Membership",
  "Interest-Free / Low-Interest Loan",
  "Group Life Insurance (exceeds 4× salary)",
  "Dental Insurance",
  "Travel Insurance",
  "Company Car (use car tax calculator for BIK %)",
  "Home Office Equipment",
  "Other Benefit",
];

export function P11dCalculator({ defaults }: { defaults?: Record<string, number> }) {
  const initialValue = defaults?.benefitValue ?? 1200;
  const [benefitType, setBenefitType] = useState(benefitTypes[0]);
  const [p11dValue, setP11dValue] = useState(initialValue);
  const [taxRate, setTaxRate] = useState(defaults?.taxRate ?? 20);
  const [employeeContribution, setEmployeeContribution] = useState(0);
  const result = useMemo(
    () => calculateP11d({ p11dValue, employeeContribution, taxRatePercent: taxRate }),
    [p11dValue, employeeContribution, taxRate],
  );

  function reset() {
    setBenefitType(benefitTypes[0]);
    setP11dValue(initialValue);
    setTaxRate(defaults?.taxRate ?? 20);
    setEmployeeContribution(0);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-6 bg-white p-6 shadow-sm" aria-label="P11D inputs">
          <div><h2 className="text-2xl font-semibold">Benefit details</h2><p className="mt-2 text-sm text-ink/60">Enter the benefit type and value to calculate P11D tax.</p></div>
          <div><label htmlFor="p11d-benefit-type" className="mb-1.5 block text-sm font-medium">Benefit type</label><select id="p11d-benefit-type" value={benefitType} onChange={(event) => setBenefitType(event.target.value)} className={selectClass}>{benefitTypes.map((type) => <option key={type}>{type}</option>)}</select></div>
          <div><label htmlFor="p11d-value" className="mb-1.5 block text-sm font-medium">Annual P11D value <span className="text-accent-strong">*</span> <span className="font-normal text-ink/70">(£)</span></label><input id="p11d-value" type="number" inputMode="decimal" min={0} step="any" value={p11dValue === 0 ? "" : p11dValue} onChange={(event) => setP11dValue(Number(event.target.value))} className={inputClass} /></div>
          <div><label htmlFor="p11d-tax-rate" className="mb-1.5 block text-sm font-medium">Employee tax rate</label><select id="p11d-tax-rate" value={taxRate} onChange={(event) => setTaxRate(Number(event.target.value))} className={selectClass}><option value={20}>Basic rate (20%)</option><option value={40}>Higher rate (40%)</option><option value={45}>Additional rate (45%)</option></select></div>
          <div><label htmlFor="p11d-contribution" className="mb-1.5 block text-sm font-medium">Employee contribution (makes good) <span className="font-normal text-ink/70">(£)</span></label><input id="p11d-contribution" type="number" inputMode="decimal" min={0} step="any" value={employeeContribution} onChange={(event) => setEmployeeContribution(Number(event.target.value))} className={inputClass} /></div>
          <button type="button" onClick={reset} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold hover:border-accent-strong hover:text-accent-strong">Reset</button>
        </form>

        <section className="card number-box min-w-0 bg-paper/70 p-6 shadow-sm" aria-live="polite">
          <h2 className="text-2xl font-semibold">P11D tax summary</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-5 text-center"><p className="text-sm text-ink/60">Employee tax (annual)</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(result.employeeTaxAnnual)}</p><p className="mt-1 text-xs text-ink/60">{gbp.format(result.employeeTaxMonthly)} per month</p></div>
            <div className="rounded-xl bg-white p-5 text-center"><p className="text-sm text-ink/60">Employer Class 1A NI</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(result.class1aAnnual)}</p><p className="mt-1 text-xs text-ink/60">{gbp.format(result.class1aMonthly)} per month</p></div>
          </div>
          <p className="mt-5 text-sm text-ink/70">Benefit: <strong>{benefitType}</strong></p>
        </section>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">P11D value</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(result.p11dValue)}</p></div>
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">Taxable value</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{gbp.format(result.taxableValue)}</p><p className="mt-1 text-xs text-ink/60">After employee contribution</p></div>
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">Employee tax rate</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">{taxRate}%</p></div>
        <div className="card number-box min-w-0 bg-white p-5 shadow-sm"><p className="text-sm text-ink/60">Class 1A NI rate</p><p className="tabular safe-number-md mt-2 font-semibold text-accent-strong">15%</p></div>
      </section>

      <details className="card overflow-hidden bg-white shadow-sm" open><summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">Calculation breakdown</summary><div className="space-y-3 border-t border-ink/10 bg-paper/50 p-6 text-sm"><p className="flex justify-between"><span>P11D value</span><strong>{gbp.format(result.p11dValue)}</strong></p><p className="flex justify-between"><span>- Employee contribution</span><strong>- {gbp.format(result.employeeContribution)}</strong></p><p className="flex justify-between"><span>= Taxable value</span><strong>{gbp.format(result.taxableValue)}</strong></p><p className="flex justify-between"><span>Employee tax ({taxRate}%)</span><strong>{gbp.format(result.employeeTaxAnnual)}</strong></p><p className="flex justify-between"><span>Employer Class 1A NI (15%)</span><strong>{gbp.format(result.class1aAnnual)}</strong></p><p className="flex justify-between border-t border-ink/10 pt-3"><span className="font-semibold">Total annual tax cost</span><strong className="text-accent-strong">{gbp.format(result.totalAnnualTaxCost)}</strong></p><p>For every £1 of benefit, total tax cost: <strong>{result.taxCostPerPoundPence.toFixed(1)}p</strong>.</p></div></details>
    </div>
  );
}

const enhancedDurations = [1, 2, 3, 4, 6, 8, 12, 13, 26];

export function SickPayCalculator() {
  const [status, setStatus] = useState<SickPayStatus>("employed");
  const [weeklyEarnings, setWeeklyEarnings] = useState(500);
  const [sickDays, setSickDays] = useState(10);
  const [qualifyingDays, setQualifyingDays] = useState(5);
  const [enhancedMode, setEnhancedMode] = useState<EnhancedSickPayMode>("none");
  const [enhancedWeeks, setEnhancedWeeks] = useState(4);
  const [customWeeklyRate, setCustomWeeklyRate] = useState(0);
  const [sspWeeksUsed, setSspWeeksUsed] = useState(0);
  const result = useMemo(() => calculateSickPay({ status, weeklyEarnings, sickDays, qualifyingDays, enhancedMode, enhancedWeeks, customWeeklyRate, sspWeeksUsed }), [status, weeklyEarnings, sickDays, qualifyingDays, enhancedMode, enhancedWeeks, customWeeklyRate, sspWeeksUsed]);

  function reset() {
    setStatus("employed"); setWeeklyEarnings(500); setSickDays(10); setQualifyingDays(5); setEnhancedMode("none"); setEnhancedWeeks(4); setCustomWeeklyRate(0); setSspWeeksUsed(0);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="card space-y-5 bg-white p-6 shadow-sm" aria-label="Sick Pay inputs">
          <div><h2 className="text-2xl font-semibold">Sick pay details</h2><p className="mt-2 text-sm text-ink/60">Enter employment details to calculate sick pay entitlement.</p></div>
          <div><label htmlFor="sick-status" className="mb-1.5 block text-sm font-medium">Employment status</label><select id="sick-status" value={status} onChange={(event) => setStatus(event.target.value as SickPayStatus)} className={selectClass}><option value="employed">Employed</option><option value="worker">Worker (zero-hours / agency)</option><option value="self-employed">Self-employed</option></select></div>
          <div><label htmlFor="weekly-earnings" className="mb-1.5 block text-sm font-medium">Weekly earnings (gross) <span className="text-accent-strong">*</span> <span className="font-normal text-ink/70">(£)</span></label><input id="weekly-earnings" type="number" min={0} step="any" value={weeklyEarnings === 0 ? "" : weeklyEarnings} onChange={(event) => setWeeklyEarnings(Number(event.target.value))} className={inputClass} /></div>
          <div><label htmlFor="sick-days" className="mb-1.5 block text-sm font-medium">Sick days <span className="text-accent-strong">*</span></label><input id="sick-days" type="number" min={1} max={140} step={1} value={sickDays} onChange={(event) => setSickDays(Number(event.target.value))} className={inputClass} /></div>
          <div><label htmlFor="qualifying-days" className="mb-1.5 block text-sm font-medium">Qualifying days per week</label><select id="qualifying-days" value={qualifyingDays} onChange={(event) => setQualifyingDays(Number(event.target.value))} className={selectClass}>{[5,4,3,2,1].map((days) => <option key={days} value={days}>{days}{days === 5 ? " days (full-time)" : days === 1 ? " day" : " days"}</option>)}</select></div>
          <div><label htmlFor="enhanced-pay" className="mb-1.5 block text-sm font-medium">Enhanced sick pay</label><select id="enhanced-pay" value={enhancedMode} onChange={(event) => setEnhancedMode(event.target.value as EnhancedSickPayMode)} className={selectClass}><option value="none">No enhanced pay (SSP only)</option><option value="full">Full pay for a period</option><option value="half">Half pay for a period</option><option value="custom">Custom weekly rate</option></select></div>
          {enhancedMode !== "none" && <div><label htmlFor="enhanced-duration" className="mb-1.5 block text-sm font-medium">Enhanced pay duration</label><select id="enhanced-duration" value={enhancedWeeks} onChange={(event) => setEnhancedWeeks(Number(event.target.value))} className={selectClass}>{enhancedDurations.map((weeks) => <option key={weeks} value={weeks}>{weeks} {weeks === 1 ? "week" : "weeks"}</option>)}</select></div>}
          {enhancedMode === "custom" && <div><label htmlFor="custom-weekly-rate" className="mb-1.5 block text-sm font-medium">Custom weekly rate (£)</label><input id="custom-weekly-rate" type="number" min={0} step="any" value={customWeeklyRate} onChange={(event) => setCustomWeeklyRate(Number(event.target.value))} className={inputClass} /></div>}
          <div><label htmlFor="ssp-used" className="mb-1.5 block text-sm font-medium">SSP already used this period</label><select id="ssp-used" value={sspWeeksUsed} onChange={(event) => setSspWeeksUsed(Number(event.target.value))} className={selectClass}>{Array.from({length:28},(_,week) => <option key={week} value={week}>{week} {week === 0 ? "weeks (new absence)" : week === 1 ? "week already used" : "weeks already used"}</option>)}</select></div>
          <button type="button" onClick={reset} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold hover:border-accent-strong hover:text-accent-strong">Reset</button>
        </form>

        <div className="space-y-4 min-w-0" aria-live="polite">
          <section className={result.eligible ? "card number-box min-w-0 bg-paper/70 p-6 text-center shadow-sm" : "card border-red-300 bg-red-50 p-6 shadow-sm"}>
            <h2 className="text-2xl font-semibold">{result.eligible ? "Total sick pay" : "Not eligible for SSP"}</h2>
            {result.eligible ? <><p className="tabular safe-number mt-7 font-semibold text-accent-strong">{gbp.format(result.totalSickPay)}</p><p className="mt-2 text-sm text-ink/60">for {sickDays} days ({result.absenceWeeks.toFixed(1)} weeks)</p><p className="mt-2 text-sm text-ink/60">SSP rate: {gbp.format(result.sspWeeklyRate)}/week · {gbp.format(result.sspDailyRate)}/day</p></> : <p className="mt-5 text-ink/75">Self-employed people do not qualify for SSP. Check ESA, Universal Credit or income-protection cover.</p>}
          </section>
          {result.eligible && <div className="grid gap-3 sm:grid-cols-2"><div className="card p-4 shadow-sm"><p className="text-sm text-ink/60">SSP payable</p><p className="tabular safe-number-sm mt-2 font-semibold text-accent-strong">{gbp.format(result.sspPay)}</p><p className="mt-1 text-xs text-ink/60">{result.sspDays} days at SSP rate</p></div><div className="card p-4 shadow-sm"><p className="text-sm text-ink/60">Enhanced pay</p><p className="tabular safe-number-sm mt-2 font-semibold text-accent-strong">{gbp.format(result.enhancedPay)}</p><p className="mt-1 text-xs text-ink/60">{result.enhancedDays} days enhanced</p></div><div className="card p-4 shadow-sm"><p className="text-sm text-ink/60">Remaining SSP</p><p className="mt-2 font-semibold text-accent-strong">{result.remainingSspWeeks} weeks</p><p className="mt-1 text-xs text-ink/60">of 28-week maximum</p></div><div className="card p-4 shadow-sm"><p className="text-sm text-ink/60">From day</p><p className="mt-2 font-semibold text-accent-strong">Day 1</p><p className="mt-1 text-xs text-ink/60">No waiting days from Apr 2026</p></div></div>}
        </div>
      </div>
      <details className="card overflow-hidden bg-white shadow-sm"><summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">How this is calculated</summary><div className="space-y-3 border-t border-ink/10 bg-paper/50 p-6 text-sm text-ink/75"><p>SSP is the lower of {gbp.format(currentRates.ssp.weeklyRate)} and 80% of weekly earnings, divided across qualifying days.</p><p>Enhanced days are paid first at the selected contractual rate; remaining eligible days use SSP, subject to the 28-week maximum.</p></div></details>
    </div>
  );
}
