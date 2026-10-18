"use client";

import { useMemo, useState } from "react";
import {
  regionLabel,
  scaleLabel,
  teacherPayScales,
  type TeacherRegion,
  type TeacherScale,
} from "@/data/teachers-pay-scales";
import { calculateTeacherPay } from "@/lib/teacherPay";
import type { StudentLoanPlan, TaxCode } from "@/lib/advancedCalculators";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
const inputClass = "tabular w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none";
const selectClass = "w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base focus:border-accent-strong focus:ring-2 focus:ring-accent/20 focus:outline-none";
const taxCodes: TaxCode[] = ["1257L", "BR", "D0", "D1", "0T", "K"];
const studentPlans: Array<{ value: StudentLoanPlan; label: string }> = [
  { value: "none", label: "No student loan" },
  { value: "plan1", label: "Plan 1" },
  { value: "plan2", label: "Plan 2" },
  { value: "plan4", label: "Plan 4" },
  { value: "plan5", label: "Plan 5" },
];
const regions: TeacherRegion[] = ["england", "fringe", "outer-london", "inner-london", "wales", "scotland"];

function MoneyCard({ label, value, help }: { label: string; value: number; help?: string }) {
  return <div className="number-box min-w-0 rounded-xl border border-ink/10 bg-white p-4"><p className="text-xs uppercase tracking-widest text-ink/55">{label}</p><p className="tabular safe-number-sm mt-2 font-semibold text-accent-strong">{gbp.format(value)}</p>{help && <p className="mt-1 text-xs text-ink/55">{help}</p>}</div>;
}

export default function TeacherPayCalculator() {
  const [region, setRegion] = useState<TeacherRegion>("england");
  const [scale, setScale] = useState<TeacherScale>("main");
  const [point, setPoint] = useState("M1");
  const [fte, setFte] = useState(1);
  const [allowance, setAllowance] = useState(0);
  const [taxCode, setTaxCode] = useState<TaxCode>("1257L");
  const [kCode, setKCode] = useState(0);
  const [studentPlan, setStudentPlan] = useState<StudentLoanPlan>("none");
  const [postgraduate, setPostgraduate] = useState(false);
  const scales = useMemo(() => [...new Set(teacherPayScales.filter((item) => item.region === region).map((item) => item.scale))], [region]);
  const points = useMemo(() => teacherPayScales.filter((item) => item.region === region && item.scale === scale), [region, scale]);
  const selected = points.find((item) => item.point === point) ?? points[0];
  const result = useMemo(() => selected ? calculateTeacherPay({
    region,
    fullTimeSalary: selected.annualSalary,
    fte,
    annualPensionableAllowance: allowance,
    taxCode,
    kCodeNumber: kCode,
    studentLoanPlan: studentPlan,
    postgraduateLoan: postgraduate,
  }) : null, [region, selected, fte, allowance, taxCode, kCode, studentPlan, postgraduate]);
  const changeRegion = (next: TeacherRegion) => {
    const nextScale = teacherPayScales.find((item) => item.region === next)?.scale ?? "main";
    const nextPoint = teacherPayScales.find((item) => item.region === next && item.scale === nextScale)?.point ?? "";
    setRegion(next); setScale(nextScale); setPoint(nextPoint);
  };
  const changeScale = (next: TeacherScale) => {
    setScale(next);
    setPoint(teacherPayScales.find((item) => item.region === region && item.scale === next)?.point ?? "");
  };
  const reset = () => { setRegion("england"); setScale("main"); setPoint("M1"); setFte(1); setAllowance(0); setTaxCode("1257L"); setKCode(0); setStudentPlan("none"); setPostgraduate(false); };
  return <div className="space-y-6"><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"><form className="card space-y-5 bg-white p-6 shadow-sm" aria-label="Teacher pay calculator inputs"><div><h2 className="text-2xl font-semibold">Teaching role and deductions</h2><p className="mt-2 text-sm text-ink/60">Select a published pay point. The result is an annualised estimate, not a payslip.</p></div><div><label htmlFor="teacher-region" className="mb-1.5 block text-sm font-medium">Jurisdiction / England region</label><select id="teacher-region" value={region} onChange={(event) => changeRegion(event.target.value as TeacherRegion)} className={selectClass}>{regions.map((item) => <option key={item} value={item}>{regionLabel[item]}</option>)}</select></div><div className="grid gap-3 sm:grid-cols-2"><div><label htmlFor="teacher-scale" className="mb-1.5 block text-sm font-medium">Pay range</label><select id="teacher-scale" value={scale} onChange={(event) => changeScale(event.target.value as TeacherScale)} className={selectClass}>{scales.map((item) => <option key={item} value={item}>{scaleLabel[item]}</option>)}</select></div><div><label htmlFor="teacher-point" className="mb-1.5 block text-sm font-medium">Pay point</label><select id="teacher-point" value={selected?.point ?? ""} onChange={(event) => setPoint(event.target.value)} className={selectClass}>{points.map((item) => <option key={item.point} value={item.point}>{item.point} · {gbp.format(item.annualSalary)}</option>)}</select></div></div><div className="grid gap-3 sm:grid-cols-2"><div><label htmlFor="teacher-fte" className="mb-1.5 block text-sm font-medium">FTE fraction</label><input id="teacher-fte" type="number" min={0} max={1} step={0.1} value={fte} onChange={(event) => setFte(Number(event.target.value))} className={inputClass} /></div><div><label htmlFor="teacher-allowance" className="mb-1.5 block text-sm font-medium">Annual pensionable allowance (£)</label><input id="teacher-allowance" type="number" min={0} step={100} value={allowance} onChange={(event) => setAllowance(Number(event.target.value))} className={inputClass} /><p className="mt-1 text-xs text-ink/55">Enter the actual annual TLR, SEN or other pensionable allowance.</p></div></div><details className="rounded-xl border border-ink/10 bg-paper/50 p-4"><summary className="cursor-pointer font-medium">Tax code and student loan</summary><div className="mt-4 grid gap-3 sm:grid-cols-2"><div><label htmlFor="teacher-tax-code" className="mb-1 block text-sm font-medium">Tax code</label><select id="teacher-tax-code" value={taxCode} onChange={(event) => setTaxCode(event.target.value as TaxCode)} className={selectClass}>{taxCodes.map((code) => <option key={code}>{code}</option>)}</select></div>{taxCode === "K" && <div><label htmlFor="teacher-k-code" className="mb-1 block text-sm font-medium">K code number</label><input id="teacher-k-code" type="number" min={0} value={kCode} onChange={(event) => setKCode(Number(event.target.value))} className={inputClass} /></div>}<div><label htmlFor="teacher-student-plan" className="mb-1 block text-sm font-medium">Student loan</label><select id="teacher-student-plan" value={studentPlan} onChange={(event) => setStudentPlan(event.target.value as StudentLoanPlan)} className={selectClass}>{studentPlans.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div><label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={postgraduate} onChange={(event) => setPostgraduate(event.target.checked)} className="h-5 w-5 accent-accent-strong" />Postgraduate loan</label></div></details><button type="button" onClick={reset} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold hover:border-accent-strong hover:text-accent-strong">Reset</button></form>{result && <section className="card number-box min-w-0 bg-paper/70 p-6 shadow-sm" aria-live="polite"><p className="text-sm font-medium text-ink/60">Estimated take-home pay</p><p className="tabular safe-number mt-3 font-semibold text-accent-strong">{gbp.format(result.annualTakeHome)}</p><p className="mt-1 text-sm text-ink/60">{gbp.format(result.monthlyTakeHome)} a month · {gbp.format(result.pensionablePay)} pensionable pay</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><MoneyCard label="Basic salary" value={result.basicSalary} /><MoneyCard label="Pension contribution" value={result.pensionContribution} help={`${(result.pensionRate * 100).toFixed(2)}% member rate`} /><MoneyCard label="Income tax" value={result.incomeTax} /><MoneyCard label="Employee NI" value={result.employeeNi} /><MoneyCard label="Student loan" value={result.studentLoan} /><MoneyCard label="Employer pension" value={result.employerPensionContribution} help={`${(result.employerPensionRate * 100).toFixed(2)}% paid by employer`} /></div></section>}</div><p className="card bg-white p-5 text-sm leading-relaxed text-ink/70 shadow-sm">England and Wales use Teachers’ Pensions rates; Scotland uses Scottish Teachers’ Pension Scheme rates. The calculation assumes a standard annualised PAYE position. It does not model every contract, taxable benefit, multiple employment or payroll-period rounding.</p></div>;
}
