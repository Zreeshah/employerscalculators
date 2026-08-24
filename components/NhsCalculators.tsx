"use client";

import { useId, useMemo, useState } from "react";
import type { NhsCalculatorPreset } from "@/content/types";
import { calculateNhsSalary, NHS_REGIONS, type NhsNation, type NhsSalaryInput } from "@/lib/nhs";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
const wholeGbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const inputClass = "tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none";
const selectClass = "w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none";

const nationOptions: { value: NhsNation; label: string }[] = [
  { value: "england", label: "England" }, { value: "scotland", label: "Scotland" }, { value: "wales", label: "Wales" },
];
const studentPlans = [
  ["none", "No student loan"], ["plan1", "Plan 1 (pre-2012)"], ["plan2", "Plan 2 (2012–2023)"], ["plan4", "Plan 4 (Scotland)"], ["plan5", "Plan 5 (2023 onwards)"],
] as const;

function stepLabel(index: number, length: number) {
  return length === 1 ? "Single point" : index === 0 ? "Entry" : index === length - 1 ? "Top of band" : "Intermediate";
}

function NationTabs({ nation, onChange }: { nation: NhsNation; onChange: (nation: NhsNation) => void }) {
  return <div role="tablist" aria-label="Choose UK nation" className="flex flex-wrap gap-1 rounded-lg border border-ink/10 bg-paper p-1">{nationOptions.map((item) => <button key={item.value} type="button" role="tab" aria-selected={nation === item.value} onClick={() => onChange(item.value)} className={nation === item.value ? "rounded-md bg-accent-strong px-4 py-2 text-sm font-semibold text-white shadow-sm" : "rounded-md px-4 py-2 text-sm font-medium hover:bg-white"}>{item.label}</button>)}</div>;
}

function NhsCoreInputs({ input, onChange, showNationTabs = true }: { input: NhsSalaryInput; onChange: (input: NhsSalaryInput) => void; showNationTabs?: boolean }) {
  const inputId = useId();
  const config = NHS_REGIONS[input.nation];
  const band = config.bands.find((item) => item.band === input.band) ?? config.bands[0];
  const step = Math.min(input.stepIndex ?? 0, band.steps.length - 1);
  const set = (patch: Partial<NhsSalaryInput>) => onChange({ ...input, ...patch });
  function changeNation(nation: NhsNation) { set({ nation, hoursPerWeek: NHS_REGIONS[nation].standardHours, hcasZone: "none" }); }
  return <div className="space-y-4">
    {showNationTabs && <NationTabs nation={input.nation} onChange={changeNation} />}
    <div className="grid gap-4 sm:grid-cols-2">
      <div><label htmlFor={`${inputId}-band`} className="mb-1.5 block text-sm font-medium">Band</label><select id={`${inputId}-band`} value={input.band} onChange={(event) => set({ band: event.target.value, stepIndex: 0 })} className={selectClass}>{config.bands.map((item) => <option key={item.band} value={item.band}>Band {item.band}</option>)}</select></div>
      <div><label htmlFor={`${inputId}-step`} className="mb-1.5 block text-sm font-medium">Spine point</label><select id={`${inputId}-step`} value={step} onChange={(event) => set({ stepIndex: Number(event.target.value) })} className={selectClass}>{band.steps.map((salary, index) => <option key={salary} value={index}>{stepLabel(index, band.steps.length)} — {wholeGbp.format(salary)}</option>)}</select></div>
      <div><label htmlFor={`${inputId}-hours`} className="mb-1.5 block text-sm font-medium">Contracted hours / week</label><input id={`${inputId}-hours`} type="number" min={0} max={config.standardHours} step="0.5" value={input.hoursPerWeek} onChange={(event) => set({ hoursPerWeek: Number(event.target.value) })} className={inputClass} /><p className="mt-1 text-xs text-ink/55">Full time is {config.standardHours}h in {config.label}.</p></div>
      {input.nation === "england" && <div><label htmlFor={`${inputId}-hcas`} className="mb-1.5 block text-sm font-medium">London weighting (HCAS)</label><select id={`${inputId}-hcas`} value={input.hcasZone ?? "none"} onChange={(event) => set({ hcasZone: event.target.value })} className={selectClass}><option value="none">None / outside London</option>{config.hcas?.map((zone) => <option key={zone.id} value={zone.id}>{zone.label}</option>)}</select></div>}
    </div>
  </div>;
}

export function NhsTakeHomeCalculatorParity({ preset }: { preset?: NhsCalculatorPreset } = {}) {
  const [input, setInput] = useState<NhsSalaryInput>(() => {
    const nation = preset?.nation ?? "england";
    return {
      nation,
      band: preset?.band ?? "6",
      stepIndex: preset?.stepIndex ?? 0,
      hoursPerWeek: preset?.hoursPerWeek ?? NHS_REGIONS[nation].standardHours,
      hcasZone: "none",
      inPension: true,
      payRisePercent: 0,
      studentLoanPlan: "none",
      postgraduateLoan: false,
      nightSaturdayHoursMonthly: 0,
      sundayBankHolidayHoursMonthly: 0,
    };
  });
  const result = useMemo(() => calculateNhsSalary(input), [input]);
  const baseResult = useMemo(() => calculateNhsSalary({ ...input, payRisePercent: 0 }), [input]);
  const payRiseImpact = result.annualTakeHome - baseResult.annualTakeHome;
  const pct = (value: number) => result.totalGross > 0 ? Math.round((value / result.totalGross) * 100) : 0;
  const set = (patch: Partial<NhsSalaryInput>) => setInput((current) => ({ ...current, ...patch }));

  return <div className="space-y-6">
    <section className="card space-y-5 bg-white p-5 shadow-sm sm:p-6">
      <NhsCoreInputs input={input} onChange={setInput} />
      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-ink/10 bg-paper/60 p-4"><span><span className="block font-medium">In the NHS Pension Scheme</span><span className="mt-1 block text-xs text-ink/60">Uses the tier for your actual pensionable pay.</span></span><input type="checkbox" checked={input.inPension !== false} onChange={(event) => set({ inPension: event.target.checked })} className="h-5 w-5 accent-accent-strong" /></label>
    </section>

    <section className="card number-box min-w-0 overflow-hidden bg-paper/70 p-6 text-center shadow-sm" aria-live="polite">
      <p className="text-sm font-medium text-ink/65">{result.nationLabel} · Band {result.band} · {result.stepLabel}</p>
      <p className="tabular safe-number mt-5 font-semibold text-accent-strong">{gbp.format(result.monthlyTakeHome)}</p><p className="mt-1 text-sm text-ink/65">a month take-home · <strong>{gbp.format(result.annualTakeHome)}</strong> a year</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-5">{[["Gross",result.totalGross],["Income tax",result.incomeTax],["NI",result.employeeNi],["Pension",result.pensionContribution],["Net",result.annualTakeHome]].map(([label,value]) => <div key={label as string} className="rounded-lg bg-white p-3"><p className="text-xs text-ink/55">{label}</p><p className="tabular safe-number-sm mt-1 font-semibold">{gbp.format(value as number)}</p></div>)}</div>
      <div className="mt-6 text-left"><div className="flex justify-between text-sm"><label htmlFor="nhs-pay-rise" className="font-medium">Pay-rise impact</label><strong>{Number(input.payRisePercent ?? 0).toFixed(1)}% · {payRiseImpact >= 0 ? "+" : ""}{gbp.format(payRiseImpact)} net</strong></div><input id="nhs-pay-rise" type="range" min={0} max={15} step="0.1" value={input.payRisePercent ?? 0} onChange={(event) => set({ payRisePercent: Number(event.target.value) })} className="mt-3 w-full accent-accent-strong" /><p className="mt-2 text-xs text-ink/55">Drag to model a future pay award. Tax, NI and pension take a share of the headline increase.</p></div>
    </section>

    <details className="card overflow-hidden bg-white shadow-sm"><summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">Student loan <span className="ml-2 text-sm font-normal text-ink/55">{input.studentLoanPlan === "none" ? "None" : input.studentLoanPlan}</span></summary><div className="grid gap-4 border-t border-ink/10 bg-paper/40 p-6 sm:grid-cols-2"><div><label htmlFor="nhs-student-plan" className="mb-1.5 block text-sm font-medium">Plan</label><select id="nhs-student-plan" value={input.studentLoanPlan} onChange={(event) => set({ studentLoanPlan: event.target.value as NhsSalaryInput["studentLoanPlan"] })} className={selectClass}>{studentPlans.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div><label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={input.postgraduateLoan} onChange={(event) => set({ postgraduateLoan: event.target.checked })} className="h-5 w-5 accent-accent-strong" />Postgraduate loan</label></div></details>
    <details className="card overflow-hidden bg-white shadow-sm"><summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold">Unsocial hours (Section 2) <span className="ml-2 text-sm font-normal text-ink/55">{result.unsocialPay > 0 ? gbp.format(result.unsocialPay) : "None"}</span></summary><div className="grid gap-4 border-t border-ink/10 bg-paper/40 p-6 sm:grid-cols-2"><div><label htmlFor="nhs-night-hours" className="mb-1.5 block text-sm font-medium">Night / Saturday hours per month</label><input id="nhs-night-hours" type="number" min={0} step="0.5" value={input.nightSaturdayHoursMonthly} onChange={(event) => set({ nightSaturdayHoursMonthly: Number(event.target.value) })} className={inputClass} /></div><div><label htmlFor="nhs-sunday-hours" className="mb-1.5 block text-sm font-medium">Sunday / bank holiday hours per month</label><input id="nhs-sunday-hours" type="number" min={0} step="0.5" value={input.sundayBankHolidayHoursMonthly} onChange={(event) => set({ sundayBankHolidayHoursMonthly: Number(event.target.value) })} className={inputClass} /></div></div></details>

    <section className="card bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Where your pay goes</h2><div className="mt-5 space-y-4">{[["NHS pension",result.pensionContribution],["Income tax",result.incomeTax],["National Insurance",result.employeeNi],["Student loan",result.studentLoan],["Take-home",result.annualTakeHome]].filter(([,value]) => (value as number) > 0).map(([label,value]) => <div key={label as string}><div className="mb-1 flex justify-between text-sm"><span>{label}</span><strong>{gbp.format(value as number)} ({pct(value as number)}%)</strong></div><div className="h-2 overflow-hidden rounded-full bg-paper"><div className={label === "Take-home" ? "h-full rounded-full bg-accent-strong" : "h-full rounded-full bg-accent"} style={{ width: `${pct(value as number)}%` }} /></div></div>)}</div></section>

    <section className="card overflow-hidden bg-white shadow-sm"><div className="flex items-center justify-between px-6 py-4"><h2 className="text-xl font-semibold">Simulated monthly payslip</h2><button type="button" onClick={() => window.print()} className="rounded-lg border border-ink/15 px-3 py-2 text-sm font-semibold hover:text-accent-strong">Print / Save PDF</button></div><div className="space-y-3 border-t border-ink/10 bg-paper/40 p-6 text-sm">{[["Gross pay",result.totalGross/12],["PAYE income tax",-result.incomeTax/12],["Employee NI",-result.employeeNi/12],[`NHS pension (${(result.pensionRate*100).toFixed(1)}%)`,-result.pensionContribution/12],...(result.studentLoan > 0 ? [["Student loan",-result.studentLoan/12] as [string,number]] : []),["Net bank credit",result.monthlyTakeHome]].map(([label,value],index,array) => <p key={label as string} className={index === array.length-1 ? "flex justify-between border-t border-ink/10 pt-3 font-semibold text-accent-strong" : "flex justify-between"}><span>{label}</span><strong>{(value as number) < 0 ? "− " : ""}{gbp.format(Math.abs(value as number))}</strong></p>)}</div></section>
  </div>;
}

interface CompareScenario { nation: NhsNation; band: string; stepIndex: number; hoursPerWeek: number }
function ComparisonCard({ name, scenario, onChange }: { name: string; scenario: CompareScenario; onChange: (scenario: CompareScenario) => void }) {
  const nationId = useId();
  const result = calculateNhsSalary({ ...scenario, inPension: true });
  const set = (patch: Partial<CompareScenario>) => onChange({ ...scenario, ...patch });
  const config = NHS_REGIONS[scenario.nation];
  return <section className="card min-w-0 bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold">Scenario {name}</h2><div className="mt-5 space-y-4"><div><label htmlFor={nationId} className="mb-1.5 block text-sm font-medium">Nation</label><select id={nationId} value={scenario.nation} onChange={(event) => { const nation = event.target.value as NhsNation; set({ nation, hoursPerWeek: NHS_REGIONS[nation].standardHours }); }} className={selectClass}>{nationOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div><NhsCoreInputs input={scenario} onChange={(value) => onChange(value as CompareScenario)} showNationTabs={false} /></div><div className="number-box mt-6 min-w-0 rounded-xl bg-paper/70 p-5 text-center"><p className="tabular safe-number-md font-semibold text-accent-strong">{gbp.format(result.monthlyTakeHome)}</p><p className="mt-1 text-sm text-ink/60">a month · {gbp.format(result.annualTakeHome)}/yr</p><p className="mt-3 text-xs text-ink/60">{config.label} · Band {scenario.band} · {wholeGbp.format(result.totalGross)} · {(result.pensionRate*100).toFixed(1)}% pension</p></div></section>;
}

export function NhsPayComparisonCalculatorParity() {
  const [a, setA] = useState<CompareScenario>({ nation: "england", band: "5", stepIndex: 0, hoursPerWeek: 37.5 });
  const [b, setB] = useState<CompareScenario>({ nation: "england", band: "6", stepIndex: 0, hoursPerWeek: 37.5 });
  const resultA = calculateNhsSalary({ ...a, inPension: true }); const resultB = calculateNhsSalary({ ...b, inPension: true });
  const monthlyDifference = resultB.monthlyTakeHome - resultA.monthlyTakeHome; const annualDifference = resultB.annualTakeHome - resultA.annualTakeHome;
  function preset(kind: "steps" | "hours" | "nations") { if (kind === "steps") { setA({nation:"england",band:"5",stepIndex:0,hoursPerWeek:37.5}); setB({nation:"england",band:"5",stepIndex:2,hoursPerWeek:37.5}); } else if (kind === "hours") { setA({nation:"england",band:"6",stepIndex:0,hoursPerWeek:37.5}); setB({nation:"england",band:"6",stepIndex:0,hoursPerWeek:30}); } else { setA({nation:"england",band:"6",stepIndex:0,hoursPerWeek:37.5}); setB({nation:"scotland",band:"6",stepIndex:0,hoursPerWeek:36}); } }
  return <div className="space-y-6"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => preset("steps")} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-accent-strong">Entry vs top of band</button><button type="button" onClick={() => preset("hours")} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-accent-strong">Full-time vs 30h</button><button type="button" onClick={() => preset("nations")} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-accent-strong">England vs Scotland</button></div><div className="grid gap-6 lg:grid-cols-2"><ComparisonCard name="A" scenario={a} onChange={setA} /><ComparisonCard name="B" scenario={b} onChange={setB} /></div><section className="card number-box min-w-0 bg-accent-strong p-6 text-center text-white shadow-sm"><p className="text-lg"><strong>Scenario {monthlyDifference >= 0 ? "B" : "A"}</strong> takes home</p><p className="tabular safe-number-md mt-2 font-semibold">{gbp.format(Math.abs(monthlyDifference))} more a month</p><p className="mt-2 text-sm text-white/80">{gbp.format(Math.abs(annualDifference))} a year</p></section><section className="card bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Why the take-home gap is smaller than the pay gap</h2><p className="mt-3 leading-relaxed text-ink/70">A higher basic salary can also mean more income tax, National Insurance and a higher tier of NHS pension contributions. The net comparison shows what changes in your bank account.</p></section></div>;
}
