import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "company-car-tax-calculator",
  kind: "company-car-tax",
  title: "Company Car Tax Calculator UK 2026/27",
  metaDescription:
    "Company car tax calculator for 2026/27. Work out the BIK benefit, the income tax due and the employer's 15% Class 1A National Insurance",
  h1: "Company Car Tax Calculator",
  intro:
    "A company car is taxed as a benefit in kind (BIK) for the employee, on top of the salary they receive. This UK company car tax calculator is built for employers costing a new car scheme, employees comparing the tax on an electric vs petrol model, and payroll teams calculating Class 1A NI. The taxable value is the car's P11D list price multiplied by a BIK percentage set from its CO2 emissions — electric cars sit in the lowest bands — with the employee paying income tax at their marginal rate and the employer paying 15% Class 1A NI.",
  formulaExplainer:
    ":::callout info\n**Company car tax formula (2026/27):** annual benefit = **P11D list price × BIK percentage**. Employee income tax = annual benefit × employee's marginal income tax rate (20%, 40% or 45%). Employer Class 1A NI = annual benefit × **15%**.\n\nThe BIK percentage itself comes from HMRC's CO2-based tables, which change by tax year — check GOV.UK for the band that applies to the car. This calculator accepts any BIK percentage so the same figures can be reused across tax years.\n:::",
  howToSteps: [
    {
      name: "Find the car's P11D list price",
      text: "The P11D value is the list price including VAT, delivery and factory-fitted options, but excluding the first registration fee and road tax. Discounts paid by the dealer or the employee do not change it. Most manufacturer configurators and dealer price lists state the P11D figure alongside the on-the-road price.",
    },
    {
      name: "Look up the BIK percentage for 2026/27",
      text: "HMRC publishes BIK percentage tables on GOV.UK each year, based on the car's CO2 emissions (and electric range for hybrids). The percentage for the current tax year is the figure to use. Electric vehicles sit in the lowest bands; petrol and diesel cars sit higher, scaled by CO2.",
    },
    {
      name: "Multiply P11D by the BIK percentage",
      text: "annual benefit = P11D list price × BIK percentage. For a £35,000 car with a 25% BIK rate, the annual benefit is £35,000 × 0.25 = £8,750. This is the figure the employee is taxed on and the figure the employer pays Class 1A NI on.",
    },
    {
      name: "Apply the employee's income tax rate",
      text: "Employee income tax on the car = annual benefit × employee's marginal income tax rate. At 20% this is £8,750 × 0.20 = £1,750; at 40% it is £3,500; at 45% it is £3,937.50. The tax is usually collected through PAYE by adjusting the employee's tax code.",
    },
    {
      name: "Calculate the employer Class 1A NI",
      text: "Employer Class 1A NI = annual benefit × 15%. For the £35,000 car at 25% BIK, that is £8,750 × 0.15 = £1,312.50 a year. Class 1A NI is reported on form P11D and paid once a year by the employer, not through the regular payroll.",
    },
  ],
  sections: [
    {
      heading: "What is company car tax?",
      body:
        "When an employer provides a car for private use by an employee, HMRC treats the private-use value as a **benefit in kind (BIK)**. The employee pays **income tax** on that benefit at their marginal rate, and the employer pays **Class 1A National Insurance** at 15% on the same value. The two are separate charges for separate parties — both are shown by this calculator.\n\nOnly the **private use** of the car is taxed. A pool car used only for business journeys, or a car that the employee is forbidden from using for anything other than work, is not a BIK. The rules around 'pool car' status are tight — HMRC checks whether private use is genuinely permitted.",
    },
    {
      heading: "How company car tax is calculated",
      body:
        "The tax is built from three figures: the P11D list price of the car, the **BIK percentage** set by HMRC for the car's CO2 emissions, and the employee's marginal income tax rate.\n\n**Annual benefit = P11D × BIK %.** The employee's tax on that benefit is then the benefit × their income tax rate (20%, 40% or 45%). The employer's Class 1A NI is the benefit × 15%. None of these figures are capped, which is why more expensive cars in higher BIK bands produce materially larger tax bills for both sides.\n\nThe table below shows how the benefit, the employee's income tax and the employer's Class 1A NI change at illustrative BIK rates on a £35,000 P11D car.\n\n:::table\n| Example BIK % | Annual benefit (£35,000 P11D) | Employee tax at 40% | Employer Class 1A NI |\n|---|---|---|---|\n| 5% | £1,750 | £700 | £262.50 |\n| 15% | £5,250 | £2,100 | £787.50 |\n| 25% | £8,750 | £3,500 | £1,312.50 |\n| 35% | £12,250 | £4,900 | £1,837.50 |\n:::\n\nThis calculator lets you enter any BIK percentage so you can compare 2026/27 figures with the previous tax year, or model the impact of moving between BIK bands. Use the take-home pay calculator to see the income tax and employee National Insurance on the underlying salary.",
    },
    {
      heading: "What goes into the P11D value and the BIK rate",
      body:
        "The **P11D value** is set once when the car is first registered and stays with it for the life of the BIK calculation. It is the list price including:\n\n- VAT\n- Delivery to the dealer\n- Factory-fitted options (paint, leather, alloy wheels)\n- Any accessories fitted before first registration\n\nIt excludes the first registration fee, road tax (VED), and any discount actually paid. Discounts reduce the invoice but not the BIK value — this is the most common cause of employees being surprised by their tax code adjustment.\n\nThe **BIK percentage** is set annually by HMRC and depends on the car's CO2 emissions in g/km, with a separate scale for electric range on plug-in hybrids. The percentage typically increases year-on-year until it reaches a cap. For 2026/27 the BIK table is published on GOV.UK — electric cars sit in the lowest bands, with rates that make them by far the cheapest company car to tax.\n\n:::callout tip\n**Discounts don't reduce P11D.** The BIK value is the list price, not the price actually paid. A £35,000 list car bought at a £3,000 discount still produces a BIK based on £35,000 — the £3,000 saving is for the employee, the £35,000 is what HMRC sees.\n:::",
    },
    {
      heading: "Electric company cars and the lowest BIK bands",
      body:
        "Electric vehicles attract a **lower BIK percentage** than petrol or diesel equivalents, which makes the taxable benefit — and therefore both the employee's tax and the employer's Class 1A NI — significantly lower. Over a typical three-year lease the combined saving often offsets the higher lease cost of an EV.\n\nThe same calculation applies: annual benefit = P11D × EV BIK %. A £40,000 electric car with a 5% BIK rate generates £2,000 of benefit — at 40% income tax the employee pays £800 a year; the employer pays £300 of Class 1A NI. The same car at a 30% BIK rate would generate £12,000 of benefit and a £4,800 employee tax bill.\n\nFor most UK employers in 2026/27, electric cars are the lowest-taxed company car option available, and the calculation is the same — only the BIK percentage changes.",
    },
    {
      heading: "Summary: how to use this calculator",
      body:
        "Three numbers in, three numbers out. Enter the P11D list price, the BIK percentage (from the HMRC table for 2026/27) and the employee's marginal income tax rate. The company car tax calculator returns the annual taxable benefit, the employee's income tax on the benefit, and the employer's 15% Class 1A NI on the same benefit. Use the same BIK percentage for any tax year — only the percentage changes, not the formula.",
    },
  ],
  faq: [
    {
      question: "How is company car tax calculated?",
      answer:
        "Taxable benefit = P11D list price × BIK percentage (based on CO2 emissions). The employee then pays income tax on that benefit at their marginal rate, and the employer pays 15% Class 1A NI on the same benefit value.",
    },
    {
      question: "Where do I find the BIK percentage for a car?",
      answer:
        "HMRC publishes BIK percentage tables on GOV.UK, based mainly on the car's CO2 emissions (and electric range for hybrids). Electric vehicles attract the lowest percentages. Rates change by tax year, so use the current table.",
    },
    {
      question: "What is the P11D value of a car?",
      answer:
        "It is the car's list price including VAT, delivery and factory-fitted options, but excluding the first registration fee and road tax. It is not the price actually paid — discounts do not reduce it.",
    },
    {
      question: "Who pays company car tax — the employee or the employer?",
      answer:
        "Both pay different charges. The employee pays income tax on the benefit (usually collected through PAYE), and the employer pays Class 1A National Insurance at 15% of the benefit value.",
    },
    {
      question: "Are electric company cars cheaper to tax?",
      answer:
        "Yes. Fully electric cars sit in the lowest BIK bands, so the taxable benefit — and therefore both the employee's tax and the employer's Class 1A NI — is far lower than for an equivalent petrol or diesel car.",
    },
  ],
  relatedSlugs: [],
});
