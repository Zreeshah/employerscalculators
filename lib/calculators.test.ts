import assert from "node:assert/strict";
import test from "node:test";
import {
  calculate,
  calculateMaternityAllowance,
  calculateSalarySacrificeImpact,
  employerNi,
  employerNiForCategory,
  employerNiWithAllowance,
  employerPensionContribution,
  incomeTaxRuk,
  takeHome,
} from "./calculators.ts";

test("pro rata scales salary by hours ratio", () => {
  const [r] = calculate("pro-rata", {
    fullTimeSalary: 40000,
    fullTimeHours: 37.5,
    actualHours: 18.75,
  });
  assert.equal(r.value, 20000);
});

test("bradford factor is S squared times D", () => {
  const [r] = calculate("bradford-factor", { spellsOfAbsence: 3, daysOfAbsence: 10 });
  assert.equal(r.value, 90);
});

test("annual leave is 5.6 weeks of days worked", () => {
  const [r] = calculate("annual-leave", { daysWorkedPerWeek: 5 });
  assert.equal(r.value, 28);
});

test("empty inputs are treated as zero, never NaN", () => {
  const [r] = calculate("pro-rata", {});
  assert.equal(r.value, 0);
});

test("employer NI 2026/27: 15% above £5,000 secondary threshold", () => {
  assert.equal(employerNi(30000), 3750);
  assert.equal(employerNi(5000), 0);
});

test("employer NI category thresholds reduce liability for qualifying workers", () => {
  assert.equal(employerNiForCategory(30000, "under21"), 0);
  assert.equal(employerNiForCategory(60000, "apprentice"), 1459.5);
  assert.equal(employerNiForCategory(30000, "freeport"), 750);
});

test("employment allowance offsets employer NI up to the annual cap", () => {
  assert.deepEqual(employerNiWithAllowance(30000, "standard", true), {
    rawNi: 3750,
    allowanceSaving: 3750,
    payableNi: 0,
  });
  assert.deepEqual(employerNiWithAllowance(100000, "standard", true), {
    rawNi: 14250,
    allowanceSaving: 10500,
    payableNi: 3750,
  });
});

test("employer pension contribution supports qualifying and total earnings", () => {
  assert.equal(employerPensionContribution(30000, 3, "qualifying"), 712.8);
  assert.equal(employerPensionContribution(30000, 5, "total"), 1500);
});

test("income tax on £30,000 (rUK) is 20% above the £12,570 PA", () => {
  assert.equal(incomeTaxRuk(30000), 3486);
});

test("take-home on £30,000 deducts tax and NI", () => {
  assert.equal(takeHome(30000), 30000 - 3486 - 1394.4);
});

test("NHS take-home pay deducts pension before tax and NI from gross", () => {
  const result = calculate("nhs-take-home-pay", {
    annualSalary: 38682,
    pensionPercent: 9.8,
    studentLoanMonthly: 0,
  });
  assert.ok(Math.abs(result[0].value - 3790.836) < 0.001);
  assert.ok(result[3].value > 2300 && result[3].value < 2400);
});

test("NHS pay comparison calculates FTE scenario difference", () => {
  const result = calculate("nhs-pay-comparison", {
    salaryA: 31049,
    fteA: 1,
    salaryB: 38682,
    fteB: 0.8,
  });
  assert.equal(result[0].value, 31049);
  assert.equal(result[1].value, 30945.600000000002);
});

test("SSP daily rate uses qualifying days, capped at 28 weeks", () => {
  const [weekly, total] = calculate("ssp", {
    daysOfSickness: 4,
    qualifyingDaysPerWeek: 5,
    averageWeeklyEarnings: 500,
  });
  assert.equal(weekly.value, 123.25);
  assert.equal(total.value, 24.65 * 4);
});

test("SMP first 6 weeks at 90% AWE, then flat rate", () => {
  const [w1, w2, total] = calculate("smp", { weeksOfLeave: 39, averageWeeklyEarnings: 400 });
  assert.equal(w1.value, 360);
  assert.equal(w2.value, 194.32);
  assert.equal(total.value, 6 * 360 + 33 * 194.32);
});

test("Maternity Allowance self-employed with Class 2 NI paid gets standard rate", () => {
  const result = calculateMaternityAllowance({
    situation: "self-employed",
    averageWeeklyEarnings: 500,
    paidClass2Ni: true,
  });
  assert.equal(result.eligible, true);
  assert.equal(result.status, "standard");
  assert.equal(result.weeklyRate, 194.32);
  assert.equal(result.totalPayable, 194.32 * 39);
});

test("Maternity Allowance self-employed without Class 2 NI shows may-not-qualify state", () => {
  const result = calculateMaternityAllowance({
    situation: "self-employed",
    averageWeeklyEarnings: 500,
    paidClass2Ni: false,
  });
  assert.equal(result.eligible, false);
  assert.equal(result.status, "may-not-qualify");
  assert.equal(result.weeklyRate, 0);
  assert.match(result.message, /paid Class 2 NI/);
});

test("Maternity Allowance employed claims cap at lower of flat rate and 90% AWE", () => {
  const result = calculateMaternityAllowance({
    situation: "employed-no-smp",
    averageWeeklyEarnings: 100,
    paidClass2Ni: false,
  });
  assert.equal(result.eligible, true);
  assert.equal(result.weeklyRate, 90);
  assert.equal(result.totalPayable, 90 * 39);
});

test("salary sacrifice impact separates tax, employee NI and employer NI savings", () => {
  const result = calculateSalarySacrificeImpact(30000, 5, false);
  assert.equal(result.sacrificed, 1500);
  assert.equal(result.reducedSalary, 28500);
  assert.ok(result.incomeTaxSaving > 0);
  assert.ok(result.employeeNiSaving > 0);
  assert.equal(result.employerNiSaving, employerNi(30000) - employerNi(28500));
  assert.equal(result.netEmployeeCost, result.sacrificed - result.incomeTaxSaving - result.employeeNiSaving);
});

test("salary sacrifice pension can add employer NI top-up", () => {
  const withoutTopUp = calculateSalarySacrificeImpact(30000, 5, false);
  const withTopUp = calculateSalarySacrificeImpact(30000, 5, true);
  assert.equal(withTopUp.pensionContributionWithEmployerTopUp, withoutTopUp.sacrificed + withoutTopUp.employerNiSaving);
  assert.equal(withTopUp.tenYearPensionValue, withTopUp.pensionContributionWithEmployerTopUp * 10);
});

test("net-to-gross inverts take-home within pennies", () => {
  const [gross] = calculate("net-to-gross", { targetNet: 25000 });
  assert.ok(Math.abs(takeHome(gross.value) - 25000) < 0.01);
});
