import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "company-car-tax-calculator",
  kind: "company-car-tax",
  title: "Company Car Tax Calculator UK 2026/27: BIK & P11D",
  metaDescription:
    "Calculate 2026/27 company car BIK tax from P11D price, CO2, fuel type and PHEV range, plus employee contribution and employer Class 1A NI",
  h1: "Company Car Tax Calculator",
  intro:
    "Calculate the 2026/27 taxable benefit, employee income tax and employer Class 1A National Insurance for a company car. The planned controls use HMRC's official CO2 bands automatically, including electric and plug-in hybrid rates, rather than making you look up a BIK percentage. You can also account for an employee contribution and compare the annual and monthly cost of different cars.",
  formulaExplainer: `:::callout info
**Taxable car benefit = (P11D list price × HMRC BIK percentage) − qualifying employee contribution.** Employee tax is the taxable benefit multiplied by the employee's marginal income tax rate. Employer Class 1A National Insurance is the taxable benefit multiplied by **15%** for 2026/27.

The BIK percentage is selected automatically from the 2026/27 HMRC table using fuel type, CO2 emissions and, for a plug-in hybrid emitting 1–50g/km, its zero-emission electric range. The taxable benefit cannot fall below zero.
:::`,
  howToSteps: [
    {
      name: "Enter the P11D list price",
      text: "Use the manufacturer's list price including VAT, delivery and factory-fitted options, not the discounted invoice or lease cost.",
    },
    {
      name: "Choose the fuel type and enter CO2",
      text: "Select electric, petrol, diesel or plug-in hybrid and enter the official CO2 figure. For a 1–50g/km PHEV, enter its approved electric range as well.",
    },
    {
      name: "Add any employee contribution",
      text: "Enter a qualifying payment the employee makes for private use of the car. The calculator deducts it from the annual cash equivalent, without reducing the result below zero.",
    },
    {
      name: "Select the employee tax rate",
      text: "Use the marginal income tax rate that applies to the benefit. This can differ in Scotland and may be affected by the employee's tax code and other income.",
    },
    {
      name: "Compare employee and employer costs",
      text: "Review the annual and monthly employee tax, the taxable benefit, and the employer's 15% Class 1A National Insurance liability.",
    },
  ],
  sections: [
    {
      heading: "What is company car tax?",
      body: `A company car available for private use is normally a **benefit in kind (BIK)**. HMRC converts that benefit into a taxable cash value using the car's list price and an appropriate percentage linked to emissions. The employee pays income tax on the cash value; the employer pays Class 1A National Insurance on it.

Private use includes commuting. A genuine pool car can be exempt, but HMRC's conditions are strict: it must be shared, normally kept at business premises, and private use must be merely incidental. A car used only for business with private use prohibited may also fall outside the charge.`,
    },
    {
      heading: "Official company car BIK rates for 2026/27",
      body: `HMRC's 2026/27 ready reckoner gives a **4% rate for a zero-emission car**. A plug-in hybrid emitting 1–50g/km uses its approved electric range: the bands are 4%, 7%, 10%, 14% or 16%. Above 50g/km, the rate rises with emissions and reaches the 37% ceiling.

:::table
| 2026/27 vehicle details | BIK percentage |
|---|---|
| 0g/km electric car | 4% |
| PHEV 1–50g/km, 130+ mile range | 4% |
| PHEV 1–50g/km, 70–129 miles | 7% |
| PHEV 1–50g/km, 40–69 miles | 10% |
| PHEV 1–50g/km, 30–39 miles | 14% |
| PHEV 1–50g/km, under 30 miles | 16% |
| Petrol car, 120–124g/km | 30% |
:::` ,
    },
    {
      heading: "A worked company car tax example",
      body: `Take a petrol car with a **£30,000 P11D value** and official emissions of 120g/km. HMRC's 2026/27 percentage is 30%, producing a £9,000 benefit before contributions. If the employee pays £500 towards private use, the calculator reduces the taxable benefit to £8,500.

At a 40% marginal tax rate, employee tax is £3,400 a year, or about £283.33 a month. Employer Class 1A NI is £1,275 because £8,500 × 15% = £1,275. Fuel provided for private use is a separate benefit and is not included in this car-only example.`,
    },
    {
      heading: "What counts as the P11D list price?",
      body: `The **P11D price is not the amount paid**. It normally starts with the manufacturer's UK list price on the day before first registration, including VAT, delivery and factory-fitted accessories. It excludes the first registration fee and vehicle excise duty. Later accessories can also affect the price used for tax under HMRC's rules.

A dealer discount, fleet rebate or cheaper lease does not reduce the list price. For a used company car, the original list price is still relevant. Employee capital contributions towards acquiring the car have separate rules and limits, so do not treat them automatically as the same thing as annual payments for private use.`,
    },
    {
      heading: "Electric cars, PHEVs and diesel edge cases",
      body: `A fully electric company car uses the 4% 2026/27 percentage even if its list price is high. For a **plug-in hybrid**, CO2 alone is not enough when emissions are 1–50g/km: HMRC also needs the approved zero-emission range. Entering the wrong range can move the car across several BIK bands.

Some diesel cars can attract a four-percentage-point supplement, subject to the overall 37% maximum, while qualifying diesels are treated without it. The registration documents or manufacturer data should identify the emissions standard. A mild hybrid is not treated as a PHEV merely because its description includes “hybrid”.`,
    },
    {
      heading: "Employee contributions and periods when the car is unavailable",
      body: `A qualifying contribution for private use can reduce the cash equivalent, but the payment must be required and actually made in the tax year. The calculator subtracts the entered contribution after applying the BIK percentage and stops at zero. Keep evidence of the agreement and payments.

The benefit may also be reduced when the car was unavailable for a qualifying period, for example before it was first provided or after it was permanently withdrawn. Brief repair periods do not always qualify. A replacement car, shared availability, employee capital contribution or mid-year change needs a time-apportioned calculation using HMRC's detailed rules.`,
    },
    {
      heading: "Tax codes, reporting and the employer cost",
      body: `HMRC normally collects the employee's company car tax through PAYE, either by changing the tax code or through registered payrolling of benefits. The figure on a payslip can therefore differ from a simple annual amount divided by 12, especially after a mid-year change or coding adjustment.

For 2026/27 the employer's **Class 1A NI rate is 15%** of the taxable benefit. It is an employer-only cost and is not deducted from employee pay. Reporting requirements depend on whether the benefit is payrolled; employers should retain the P11D value, emissions evidence, availability dates and contribution records.`,
    },
    {
      heading: "Summary: use the automatic 2026/27 calculation",
      body: `Enter the £30,000 example or replace it with the car's actual P11D list price, then choose the fuel type, CO2 emissions and any PHEV electric range. The calculator applies the official 2026/27 percentage, deducts a qualifying employee contribution, and shows employee tax and **15% Class 1A NI**.

Check unusual cases against HMRC guidance, particularly diesel supplements, capital contributions, shared cars, accessories and periods of unavailability. Treat the result as a planning estimate; the employer's payroll and benefit records determine the amount reported to HMRC.`,
    },
  ],
  faq: [
    {
      question: "What is the electric company car BIK rate for 2026/27?",
      answer:
        "The HMRC appropriate percentage for a zero-emission company car is 4% in 2026/27. Multiply the P11D list price by 4%, then apply the employee's marginal income tax rate.",
    },
    {
      question: "What is the BIK rate for a PHEV in 2026/27?",
      answer:
        "For a PHEV emitting 1–50g/km, the 2026/27 rate is 4%, 7%, 10%, 14% or 16% depending on its approved electric range. Cars with higher CO2 use the main emissions table.",
    },
    {
      question: "What is the 2026/27 BIK rate for a petrol car at 120g/km?",
      answer:
        "HMRC's 2026/27 table puts a petrol or standard hybrid car emitting 120–124g/km in the 30% band.",
    },
    {
      question: "Does an employee contribution reduce company car tax?",
      answer:
        "A qualifying contribution required and paid for private use can reduce the annual cash equivalent. Employee capital contributions towards the car follow different rules, so the payment type matters.",
    },
    {
      question: "Is company car tax based on the purchase price?",
      answer:
        "No. It is generally based on the P11D list price, including VAT, delivery and relevant options, even if the employer received a discount or leases the car.",
    },
    {
      question: "How much Class 1A NI does an employer pay on a company car?",
      answer:
        "For 2026/27, the employer pays Class 1A National Insurance at 15% of the taxable car benefit. This charge does not reduce the employee's take-home pay.",
    },
    {
      question: "Is private fuel included in the company car calculation?",
      answer:
        "No. Employer-provided fuel for private journeys can create a separate fuel benefit unless the employee fully makes good the private fuel under HMRC's rules and deadline.",
    },
  ],
  relatedSlugs: [],
  defaults: { listPrice: 30000 },
});
