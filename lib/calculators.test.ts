import assert from "node:assert/strict";
import test from "node:test";
import { calculateNhsSalary } from "./nhs.ts";
import {
  calculateAnnualLeave,
  calculateBradfordEpisodes,
  calculateCompanyCarTax,
  calculateHolidayEntitlement,
  calculateNetToGrossAdvanced,
  calculateTwoJobsTax,
} from "./advancedCalculators.ts";
import {
  calculate,
  calculateMaternityAllowance,
  calculateP11d,
  calculateSalarySacrificeImpact,
  calculateSickPay,
  calculateSmp,
  calculateWorkplacePension,
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

test("workplace pension matches qualifying earnings benchmark", () => {
  const result = calculateWorkplacePension({ annualSalary: 30000 });
  assert.equal(result.pensionablePay, 23760);
  assert.equal(result.employerContribution, 712.8);
  assert.equal(result.employeeContribution, 1188);
  assert.equal(result.totalContribution, 1900.8);
});

test("workplace pension matches total earnings benchmark", () => {
  const result = calculateWorkplacePension({ annualSalary: 30000, schemeType: "total" });
  assert.equal(result.pensionablePay, 30000);
  assert.equal(result.employerContribution, 900);
  assert.equal(result.employeeContribution, 1500);
  assert.equal(result.totalContribution, 2400);
});

test("workplace pension salary exchange matches competitor NI benchmark", () => {
  const result = calculateWorkplacePension({
    annualSalary: 60000,
    employerPercent: 4,
    employeePercent: 6,
    salaryExchange: true,
  });
  assert.equal(result.pensionablePay, 44030);
  assert.equal(result.employerContribution, 1761.2);
  assert.equal(result.employeeContribution, 2641.8);
  assert.equal(result.totalContribution, 4403);
  assert.equal(result.employerNiSaving, 396.27);
  assert.equal(result.employeeNiSaving, 317.02);
  assert.equal(result.totalNiSaving, 713.29);
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

test("NHS England Band 6 entry matches competitor benchmark", () => {
  const result = calculateNhsSalary({ nation: "england", band: "6", stepIndex: 0, hoursPerWeek: 37.5, inPension: true });
  assert.equal(result.totalGross, 39959);
  assert.equal(Math.round(result.incomeTax * 100) / 100, 4694.6);
  assert.equal(Math.round(result.employeeNi * 100) / 100, 2191.12);
  assert.equal(Math.round(result.pensionContribution * 100) / 100, 3915.98);
  assert.equal(Math.round(result.annualTakeHome * 100) / 100, 29157.29);
  assert.equal(Math.round(result.monthlyTakeHome * 100) / 100, 2429.77);
});

test("NHS England Band 5 entry matches comparison benchmark", () => {
  const result = calculateNhsSalary({ nation: "england", band: "5", stepIndex: 0, hoursPerWeek: 37.5, inPension: true });
  assert.equal(result.totalGross, 32073);
  assert.equal(result.pensionRate, 0.083);
  assert.equal(Math.round(result.annualTakeHome * 100) / 100, 24482.51);
  assert.equal(Math.round(result.monthlyTakeHome * 100) / 100, 2040.21);
});

test("NHS Scotland Band 6 entry uses official 2026/27 pay", () => {
  const result = calculateNhsSalary({ nation: "scotland", band: "6", stepIndex: 0, hoursPerWeek: 36, inPension: true });
  assert.equal(result.totalGross, 43231);
  assert.equal(result.pensionRate, 0.098);
  assert.equal(Math.round(result.incomeTax * 100) / 100, 5339.89);
  assert.equal(Math.round(result.employeeNi * 100) / 100, 2452.88);
  assert.equal(Math.round(result.pensionContribution * 100) / 100, 4236.64);
  assert.equal(Math.round(result.annualTakeHome * 100) / 100, 31201.6);
  assert.equal(Math.round(result.monthlyTakeHome * 100) / 100, 2600.13);
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

test("SMP matches competitor £30,000 salary benchmark", () => {
  const result = calculateSmp(30000 / 52);
  assert.equal(result.eligible, true);
  assert.equal(result.firstSixWeeklyRate, 519.23);
  assert.equal(result.firstSixTotal, 3115.38);
  assert.equal(result.remainingWeeklyRate, 194.32);
  assert.equal(result.remainingTotal, 6412.56);
  assert.equal(result.totalPayable, 9527.94);
});

test("SMP rejects competitor £6,000 salary benchmark", () => {
  const result = calculateSmp(6000 / 52);
  assert.equal(result.eligible, false);
  assert.equal(result.totalPayable, 0);
});

test("SMP actual AWE £150 benchmark totals £5,265", () => {
  const result = calculateSmp(150);
  assert.equal(result.eligible, true);
  assert.equal(result.firstSixWeeklyRate, 135);
  assert.equal(result.remainingWeeklyRate, 135);
  assert.equal(result.totalPayable, 5265);
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

test("Maternity Allowance recently stopped £100 matches competitor benchmark", () => {
  const result = calculateMaternityAllowance({
    situation: "recently-stopped",
    averageWeeklyEarnings: 100,
    paidClass2Ni: false,
  });
  assert.equal(result.eligible, true);
  assert.equal(result.status, "standard");
  assert.equal(result.weeklyRate, 90);
  assert.equal(result.totalPayable, 3510);
});

test("Maternity Allowance requires £30 weekly earnings for employed routes", () => {
  const below = calculateMaternityAllowance({ situation: "employed-no-smp", averageWeeklyEarnings: 29, paidClass2Ni: false });
  const boundary = calculateMaternityAllowance({ situation: "employed-no-smp", averageWeeklyEarnings: 30, paidClass2Ni: false });
  assert.equal(below.eligible, false);
  assert.equal(boundary.eligible, true);
  assert.equal(boundary.status, "standard");
  assert.equal(boundary.weeklyRate, 27);
});

test("Maternity Allowance self-employed below £30 gets lower rate with Class 2 NI", () => {
  const result = calculateMaternityAllowance({
    situation: "self-employed",
    averageWeeklyEarnings: 20,
    paidClass2Ni: true,
  });
  assert.equal(result.eligible, true);
  assert.equal(result.status, "lower-rate");
  assert.equal(result.weeklyRate, 27);
  assert.equal(result.totalPayable, 1053);
});

test("Maternity Allowance employed £300 benchmark gets standard rate", () => {
  const result = calculateMaternityAllowance({
    situation: "employed-no-smp",
    averageWeeklyEarnings: 300,
    paidClass2Ni: false,
  });
  assert.equal(result.eligible, true);
  assert.equal(result.weeklyRate, 194.32);
  assert.equal(result.totalPayable, 7578.48);
});

test("salary sacrifice matches competitor default pension scheme benchmark", () => {
  const result = calculateSalarySacrificeImpact({
    annualSalary: 40000,
    annualSacrificeAmount: 5000,
    schemeType: "pension",
    employeeTaxBand: "basic",
  });
  assert.equal(result.reducedSalary, 35000);
  assert.equal(result.incomeTaxSaving, 1000);
  assert.equal(result.employeeNiSaving, 400);
  assert.equal(result.employerNiSaving, 750);
  assert.equal(result.employeeTotalSaving, 1400);
  assert.equal(result.netEmployeeCost, 3600);
  assert.equal(result.combinedSaving, 2150);
});

test("salary sacrifice non-pension schemes save NI only", () => {
  const result = calculateSalarySacrificeImpact({
    annualSalary: 40000,
    annualSacrificeAmount: 5000,
    schemeType: "cycle-to-work",
    employeeTaxBand: "basic",
  });
  assert.equal(result.incomeTaxSaving, 0);
  assert.equal(result.employeeNiSaving, 400);
  assert.equal(result.employeeTotalSaving, 400);
  assert.equal(result.netEmployeeCost, 4600);
  assert.equal(result.combinedSaving, 1150);
});

test("salary sacrifice higher-rate benchmark uses 40% tax and 2% employee NI", () => {
  const result = calculateSalarySacrificeImpact({
    annualSalary: 40000,
    annualSacrificeAmount: 5000,
    schemeType: "pension",
    employeeTaxBand: "higher",
  });
  assert.equal(result.incomeTaxSaving, 2000);
  assert.equal(result.employeeNiSaving, 100);
  assert.equal(result.employeeTotalSaving, 2100);
  assert.equal(result.netEmployeeCost, 2900);
  assert.equal(result.combinedSaving, 2850);
});

test("salary sacrifice pension matches competitor NI top-up benchmark", () => {
  const result = calculateSalarySacrificeImpact({
    annualSalary: 45000,
    annualSacrificeAmount: 5000,
    schemeType: "pension",
    employeeTaxBand: "basic",
    employerPassesNiSaving: true,
  });
  assert.equal(result.totalPensionContribution, 5750);
  assert.equal(result.netEmployeeCost, 3600);
  assert.equal(result.employeeTotalSaving, 1400);
  assert.equal(result.monthlyEmployeeSaving, 116.67);
  assert.equal(result.pensionBoostPerPound, 1.15);
});

test("salary sacrifice caps the screenshot case at salary minus £1", () => {
  const result = calculateSalarySacrificeImpact({
    annualSalary: 5000,
    annualSacrificeAmount: 5000,
    schemeType: "pension",
    employeeTaxBand: "basic",
    employerPassesNiSaving: true,
  });
  assert.equal(result.effectiveSacrifice, 4999);
  assert.equal(result.reducedSalary, 1);
  assert.equal(result.incomeTaxSaving, 999.8);
  assert.equal(result.employeeNiSaving, 399.92);
  assert.equal(result.employerNiSaving, 749.85);
  assert.equal(result.employeeTotalSaving, 1399.72);
  assert.equal(result.netEmployeeCost, 3599.28);
  assert.equal(result.totalPensionContribution, 5749.85);
});

test("P11D matches default competitor benchmark", () => {
  const result = calculateP11d({ p11dValue: 1200, employeeContribution: 0, taxRatePercent: 20 });
  assert.equal(result.taxableValue, 1200);
  assert.equal(result.employeeTaxAnnual, 240);
  assert.equal(result.class1aAnnual, 180);
  assert.equal(result.totalAnnualTaxCost, 420);
});

test("P11D deducts employee makes-good contribution", () => {
  const result = calculateP11d({ p11dValue: 3600, employeeContribution: 600, taxRatePercent: 40 });
  assert.equal(result.taxableValue, 3000);
  assert.equal(result.employeeTaxAnnual, 1200);
  assert.equal(result.class1aAnnual, 450);
  assert.equal(result.totalAnnualTaxCost, 1650);
});

test("P11D taxable value cannot fall below zero", () => {
  const result = calculateP11d({ p11dValue: 500, employeeContribution: 800, taxRatePercent: 45 });
  assert.equal(result.taxableValue, 0);
  assert.equal(result.totalAnnualTaxCost, 0);
});

test("company sick pay matches SSP-only benchmark", () => {
  const result = calculateSickPay({ status: "employed", weeklyEarnings: 500, sickDays: 10, qualifyingDays: 5, enhancedMode: "none", enhancedWeeks: 4 });
  assert.equal(result.sspWeeklyRate, 123.25);
  assert.equal(result.sspDailyRate, 24.65);
  assert.equal(result.sspPay, 246.5);
  assert.equal(result.totalSickPay, 246.5);
  assert.equal(result.remainingSspWeeks, 26);
});

test("company sick pay matches full-pay then SSP benchmark", () => {
  const result = calculateSickPay({ status: "employed", weeklyEarnings: 500, sickDays: 40, qualifyingDays: 5, enhancedMode: "full", enhancedWeeks: 4 });
  assert.equal(result.enhancedDays, 20);
  assert.equal(result.enhancedPay, 2000);
  assert.equal(result.sspDays, 20);
  assert.equal(result.sspPay, 493);
  assert.equal(result.totalSickPay, 2493);
  assert.equal(result.remainingSspWeeks, 20);
});

test("company sick pay caps low earners at 80%", () => {
  const result = calculateSickPay({ status: "employed", weeklyEarnings: 100, sickDays: 20, qualifyingDays: 5, enhancedMode: "none", enhancedWeeks: 4 });
  assert.equal(result.sspWeeklyRate, 80);
  assert.equal(result.sspDailyRate, 16);
  assert.equal(result.totalSickPay, 320);
  assert.equal(result.remainingSspWeeks, 24);
});

test("net-to-gross inverts take-home within pennies", () => {
  const [gross] = calculate("net-to-gross", { targetNet: 25000 });
  assert.ok(Math.abs(takeHome(gross.value) - 25000) < 0.01);
});


test("company car uses official 2026/27 petrol BIK benchmark", () => {
  const result = calculateCompanyCarTax({ listPrice: 30000, fuel: "petrol", co2: 120, taxRate: 20 });
  assert.equal(result.bikPercent, 30);
  assert.equal(result.taxableValue, 9000);
  assert.equal(result.employeeTaxAnnual, 1800);
  assert.equal(result.class1aAnnual, 1350);
});

test("company car uses official 2026/27 electric BIK benchmark", () => {
  const result = calculateCompanyCarTax({ listPrice: 45000, fuel: "electric", co2: 120, taxRate: 40 });
  assert.equal(result.bikPercent, 4);
  assert.equal(result.taxableValue, 1800);
  assert.equal(result.employeeTaxAnnual, 720);
  assert.equal(result.class1aAnnual, 270);
});

test("company car PHEV benchmark applies electric range and employee payment", () => {
  const result = calculateCompanyCarTax({ listPrice: 50000, fuel: "phev", co2: 45, phevRange: "40-69", taxRate: 45, annualEmployeeContribution: 1000 });
  assert.equal(result.bikPercent, 10);
  assert.equal(result.bikValue, 5000);
  assert.equal(result.taxableValue, 4000);
  assert.equal(result.employeeTaxAnnual, 1800);
  assert.equal(result.class1aAnnual, 600);
});

test("advanced net-to-gross matches default competitor benchmark", () => {
  const result = calculateNetToGrossAdvanced({ targetNetAnnual: 30000 });
  assert.ok(Math.abs(result.gross - 36778.33) < 0.02);
  assert.ok(Math.abs(result.incomeTax - 4841.67) < 0.02);
  assert.ok(Math.abs(result.employeeNi - 1936.67) < 0.02);
  assert.ok(Math.abs(result.employerCost - 41545.08) < 0.02);
});

test("advanced net-to-gross supports salary sacrifice and Plan 2", () => {
  const result = calculateNetToGrossAdvanced({ targetNetAnnual: 50000, pensionMode: "salary-sacrifice", pensionPercent: 5, studentLoanPlan: "plan2" });
  assert.ok(Math.abs(result.gross - 77299.37) < 0.02);
  assert.ok(Math.abs(result.incomeTax - 17471.15) < 0.02);
  assert.ok(Math.abs(result.employeeNi - 3512.56) < 0.02);
  assert.ok(Math.abs(result.pensionContribution - 2201.5) < 0.02);
  assert.ok(Math.abs(result.studentLoan - 4114.16) < 0.02);
  assert.ok(Math.abs(result.employerCost - 86933.45) < 0.02);
});

test("advanced net-to-gross supports Scottish Income Tax", () => {
  const result = calculateNetToGrossAdvanced({ targetNetAnnual: 36000, scotland: true });
  assert.ok(Math.abs(result.gross - 45952.91) < 0.02);
  assert.ok(Math.abs(result.incomeTax - 7282.27) < 0.02);
  assert.ok(Math.abs(result.employeeNi - 2670.63) < 0.02);
});

test("two jobs default tax codes match live benchmark", () => {
  const result = calculateTwoJobsTax({ job1: { salary: 30000, taxCode: "1257L" }, job2: { salary: 12000, taxCode: "BR" } });
  assert.equal(result.combinedGross, 42000);
  assert.ok(Math.abs(result.combinedTakeHome - 34719.6) < 0.01);
  assert.equal(result.taxDeducted, 5886);
  assert.equal(result.employeeNi, 1394.4);
  assert.equal(result.employerCost, 46800);
  assert.equal(result.separateEmploymentNiSaving, 960);
});

test("two jobs detects duplicate Personal Allowances", () => {
  const result = calculateTwoJobsTax({ job1: { salary: 30000, taxCode: "1257L" }, job2: { salary: 12000, taxCode: "1257L" } });
  assert.ok(Math.abs(result.combinedTakeHome - 37119.6) < 0.01);
  assert.equal(result.taxDeducted, 3486);
  assert.equal(result.correctTaxLiability, 5886);
  assert.equal(result.taxReconciliation, 2400);
});

test("two jobs supports pension, bonus, overtime and student loan", () => {
  const result = calculateTwoJobsTax({
    job1: { salary: 40000, taxCode: "1257L", pensionMode: "salary-sacrifice", pensionPercent: 5, annualBonus: 5000, overtimeHours: 100, overtimeHourlyRate: 20, overtimeMultiplier: 1.5 },
    job2: { salary: 15000, taxCode: "BR" },
    studentLoanPlan: "plan2",
  });
  assert.equal(result.combinedGross, 63000);
  assert.ok(Math.abs(result.combinedTakeHome - 46894.41) < 0.01);
  assert.ok(Math.abs(result.taxDeducted - 9668.4) < 0.01);
  assert.ok(Math.abs(result.taxReconciliation - 2128.4) < 0.01);
  assert.ok(Math.abs(result.employeeNi - 2861.76) < 0.01);
  assert.ok(Math.abs(result.studentLoanDeducted - 1487.43) < 0.01);
  assert.ok(Math.abs(result.studentLoanReconciliation - 1350) < 0.01);
  assert.ok(Math.abs(result.employerCost - 69801.6) < 0.01);
});

test("Bradford episode defaults match live benchmark", () => {
  const result = calculateBradfordEpisodes([1, 2, 3]);
  assert.equal(result.score, 54);
  assert.equal(result.band, "No formal action");
  assert.equal(result.additionalDaysToNextThreshold, 6);
});

test("Bradford one long episode stays low", () => {
  const result = calculateBradfordEpisodes([10]);
  assert.equal(result.score, 10);
  assert.equal(result.additionalDaysToNextThreshold, 90);
});

test("Bradford frequent episodes reach written-warning example band", () => {
  const result = calculateBradfordEpisodes([2, 2, 2, 2, 2]);
  assert.equal(result.score, 250);
  assert.equal(result.band, "Written warning");
  assert.equal(result.additionalDaysToNextThreshold, 2);
});

test("holiday entitlement matches full-time benchmark", () => {
  const result = calculateHolidayEntitlement({ hoursPerWeek: 37.5, daysPerWeek: 5, includeBankHolidays: true, region: "england" });
  assert.equal(result.entitlementDays, 28);
  assert.equal(result.entitlementHours, 210);
  assert.equal(result.bankHolidayCount, 8);
});

test("holiday entitlement matches part-time Scotland benchmark", () => {
  const result = calculateHolidayEntitlement({ hoursPerWeek: 22.5, daysPerWeek: 3, includeBankHolidays: true, region: "scotland" });
  assert.ok(Math.abs(result.entitlementDays - 16.8) < 0.001);
  assert.ok(Math.abs(result.entitlementHours - 126) < 0.001);
  assert.equal(result.bankHolidayCount, 9);
});

test("holiday entitlement applies part-year factor", () => {
  const result = calculateHolidayEntitlement({ hoursPerWeek: 20, daysPerWeek: 4, includeBankHolidays: false, partYear: true, monthsWorked: 6 });
  assert.ok(Math.abs(result.entitlementDays - 11.2) < 0.001);
  assert.equal(result.entitlementHours, 56);
  assert.equal(result.factor, 0.5);
});

test("annual leave default benchmark is date-sensitive and reproducible", () => {
  const result = calculateAnnualLeave({ annualEntitlement: 28, leaveYearStartMonth: 3, daysTaken: 5, daysBooked: 3 }, new Date(2026, 7, 21));
  assert.equal(result.monthsElapsed, 4.7);
  assert.ok(Math.abs(result.accruedToDate - 10.9667) < 0.01);
  assert.ok(Math.abs(result.remainingAfterBooked - 2.9667) < 0.01);
  assert.equal(result.availableByYearEnd, 20);
});

test("annual leave rounds booked half-days like the live contract", () => {
  const result = calculateAnnualLeave({ annualEntitlement: 20, leaveYearStartMonth: 0, daysTaken: 4, daysBooked: 2.5 }, new Date(2026, 7, 21));
  assert.equal(result.monthsElapsed, 7.7);
  assert.equal(result.booked, 3);
  assert.ok(Math.abs(result.remainingAfterBooked - 5.8333) < 0.01);
  assert.equal(result.availableByYearEnd, 13);
});

test("annual leave supports enhanced entitlement and custom leave year", () => {
  const result = calculateAnnualLeave({ annualEntitlement: 35, leaveYearStartMonth: 9, daysTaken: 25, daysBooked: 5 }, new Date(2026, 7, 21));
  assert.equal(result.monthsElapsed, 10.7);
  assert.ok(Math.abs(result.remainingAfterBooked - 1.2083) < 0.01);
  assert.equal(result.availableByYearEnd, 5);
});
