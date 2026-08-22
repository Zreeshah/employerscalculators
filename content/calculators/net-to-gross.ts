import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "net-to-gross-calculator",
  kind: "net-to-gross",
  title: "Net to Gross Salary Calculator UK 2026/27",
  metaDescription:
    "Convert monthly or yearly take-home pay to gross salary for 2026/27, with UK regions, tax codes, pensions, student loans and employer costs",
  h1: "Net to Gross Salary Calculator",
  intro:
    "Start with the take-home pay you want and calculate the gross salary needed under 2026/27 PAYE rules. The planned calculator supports monthly or yearly targets, Scottish income tax, tax codes, pension methods, student and postgraduate loans, and an employer-cost view. It is useful for salary negotiations, net-pay agreements and payroll budgeting, but the final payslip remains the payroll record.",
  formulaExplainer: `:::callout info
**Target net pay = gross pay − income tax − employee National Insurance − pension deductions − student loan deductions − postgraduate loan deductions.** The calculator works backwards to find the gross pay at which those deductions leave the selected monthly or yearly target.

Because tax bands, allowances, tax codes and loan thresholds make the equation piecewise, the calculator solves it iteratively rather than using one fixed multiplier. Employer cost is then calculated separately from gross salary, employer NI and any employer pension contribution.
:::`,
  howToSteps: [
    {
      name: "Choose monthly or yearly pay",
      text: "Select the period that matches your target. A £2,500 monthly target is treated as the annual equivalent of £30,000 before the reverse calculation runs.",
    },
    {
      name: "Enter the target take-home pay",
      text: "Use the amount that should remain after the deductions selected in the calculator, not the gross amount shown in an offer.",
    },
    {
      name: "Select the UK tax region and tax code",
      text: "Choose Scotland or the rest of the UK and enter the PAYE tax code that should be modelled. Scottish non-savings income has different bands.",
    },
    {
      name: "Add pensions and education loans",
      text: "Choose the pension deduction method and contribution, then select the applicable student loan plan and postgraduate loan if both are repaid.",
    },
    {
      name: "Review gross pay and employer cost",
      text: "Check the required gross salary, each employee deduction, and the employer's NI and pension costs. Re-run scenarios before agreeing a guaranteed net figure.",
    },
  ],
  sections: [
    {
      heading: "What is a net-to-gross calculation?",
      body: `A **net-to-gross calculation** reverses payroll. Instead of starting with salary and deducting PAYE, you specify the amount that should reach the employee's bank account and solve for the required gross pay. It is also called grossing up.

There is no dependable single percentage because the answer can cross income tax, National Insurance and student loan thresholds. A pension can change taxable pay in one method but not another. The calculator repeatedly tests a gross figure against the full 2026/27 deduction calculation until the resulting net matches the target within payroll-style rounding.`,
    },
    {
      heading: "Monthly and yearly take-home targets",
      body: `Choose **monthly** when you are matching a regular payslip or **yearly** when comparing salary packages. The calculator annualises a monthly target, solves the annual tax position, and displays both periods. For example, £2,500 net a month is a £30,000 yearly target.

Actual PAYE can differ between months because payroll works by pay period and may use cumulative tax, a week 1 or month 1 basis, bonuses or irregular earnings. A yearly result is best for salary planning. A monthly result is an equivalent average, not a promise that every payslip will be identical.`,
    },
    {
      heading: "2026/27 income tax regions and National Insurance",
      body: `HMRC's 2026/27 thresholds published on GOV.UK give England, Wales and Northern Ireland a standard Personal Allowance of £12,570, followed by 20%, 40% and 45% income tax bands. The allowance tapers by £1 for every £2 of adjusted net income over £100,000 and is nil at £125,140.

Scotland uses six rates on earnings and most pension income in 2026/27: 19%, 20%, 21%, 42%, 45% and 48%, with different thresholds. Employee Class 1 National Insurance is UK-wide: normally 8% between £12,570 and £50,270 and 2% above. Savings and dividend tax are outside this salary calculation.`,
    },
    {
      heading: "How tax codes change the gross salary needed",
      body: `The standard tax code is often **1257L**, representing a £12,570 allowance, but the code on the P45 or HMRC notice should be used. An S prefix directs payroll to Scottish rates. Codes such as BR, D0, D1 or 0T can tax all pay at a specified rate or give no allowance; a K code can collect tax on untaxed income or benefits.

A W1, M1 or X marker uses a non-cumulative basis, so a single payslip may not match an annual cumulative estimate. The code is an instruction to payroll, not a personal tax calculation, and HMRC can revise it during the year.`,
    },
    {
      heading: "Pensions, student loans and postgraduate loans",
      body: `Pension treatment materially changes grossing up. **Salary sacrifice** reduces contractual cash pay before income tax and NI. A net pay arrangement deducts the employee contribution before income tax but normally after NI. Relief at source deducts the contribution from net pay and the provider adds basic-rate relief; extra relief may need to be claimed.

Student loan Plans 1, 2, 4 and 5 generally deduct 9% of pay above their plan threshold. A postgraduate loan deducts 6% above its separate threshold and can run at the same time as an undergraduate plan. The calculator applies the selected 2026/27 thresholds rather than treating loan repayments as tax.`,
    },
    {
      heading: "Worked example: £30,000 yearly net pay",
      body: `With a standard 1257L code, England, Wales or Northern Ireland rates, no pension and no education loan, a **£30,000 yearly net target** needs about £36,778 gross in 2026/27. Income tax is about £4,842 and employee NI about £1,937, leaving £30,000. The equivalent target is £2,500 net a month.

This example changes if you select Scotland, a non-standard code, pension contributions or a loan. It also assumes steady earnings for a full tax year. Starting part-way through the year, receiving a bonus or having earlier pay and tax can alter the amount withheld on individual payslips.`,
    },
    {
      heading: "Employer cost is higher than the gross salary",
      body: `The amount an employer budgets is not just the gross salary. In 2026/27, standard employer Class 1 NI is **15% above the £5,000 annual secondary threshold**, subject to category letters and reliefs. Employer pension contributions, benefits, levy costs and payroll overhead can add more.

On gross pay of about £36,778, standard employer NI is roughly £4,767 before any Employment Allowance. A 3% employer pension on qualifying earnings adds another cost. The employer-cost result keeps these amounts separate so a guaranteed net package can be compared with the employee's gross salary and the organisation's total cash commitment.`,
    },
    {
      heading: "Summary: build a complete gross-up scenario",
      body: `Enter the target as monthly or yearly take-home pay, then select the correct tax region and PAYE code. Add the actual pension method, student loan plan and postgraduate loan before relying on the required gross figure. The £30,000 default is an annual equivalent, not £30,000 per month.

Use the employer-cost panel when budgeting an offer, because employer NI and pension sit on top of gross salary. Treat the output as an estimate: taxable benefits, benefits in kind, prior pay, court orders, child maintenance and payroll rounding can all change the real payslip.`,
    },
  ],
  faq: [
    {
      question: "What gross salary gives £2,500 net per month in 2026/27?",
      answer:
        "With a standard 1257L code, rest-of-UK tax rates, no pension and no student loan, £2,500 net a month requires about £36,778 gross a year. Scotland and other deductions change the answer.",
    },
    {
      question: "Does the calculator support Scottish income tax?",
      answer:
        "Yes. Scottish earnings use the 2026/27 starter, basic, intermediate, higher, advanced and top rates, while employee National Insurance remains UK-wide.",
    },
    {
      question: "Why does my tax code affect net-to-gross pay?",
      answer:
        "A tax code tells payroll how much allowance and which special treatment to apply. A code such as BR, 0T, K or an emergency M1 code can produce a different gross requirement from standard 1257L.",
    },
    {
      question: "How are pension contributions handled?",
      answer:
        "Choose salary sacrifice, net pay or relief at source because they affect tax, NI and take-home pay differently. Entering only a percentage without the method can give a misleading gross figure.",
    },
    {
      question: "Can student and postgraduate loans be deducted together?",
      answer:
        "Yes. An undergraduate plan repayment can run alongside a postgraduate loan, so payroll may deduct 9% above one threshold and 6% above the postgraduate threshold in the same period.",
    },
    {
      question: "Is employer National Insurance included in gross salary?",
      answer:
        "No. Employer NI is an extra employer cost. For 2026/27 the standard rate is 15% above the £5,000 annual secondary threshold, before category-specific rules or Employment Allowance.",
    },
    {
      question: "Why might the monthly payslip differ from the calculator?",
      answer:
        "PAYE may be cumulative or use a week 1/month 1 basis, and bonuses, prior pay, benefits and payroll rounding affect individual periods. The yearly calculation is a planning estimate.",
    },
  ],
  relatedSlugs: [],
  defaults: { targetNet: 30000 },
});
