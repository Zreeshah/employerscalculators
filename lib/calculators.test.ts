import assert from "node:assert/strict";
import test from "node:test";
import {
  calculate,
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

test("net-to-gross inverts take-home within pennies", () => {
  const [gross] = calculate("net-to-gross", { targetNet: 25000 });
  assert.ok(Math.abs(takeHome(gross.value) - 25000) < 0.01);
});
