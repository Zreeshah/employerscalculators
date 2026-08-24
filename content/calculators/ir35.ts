import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "ir35-calculator",
  kind: "ir35",
  title: "Outside IR35 Calculator UK 2026/27: Inside vs Outside Take-Home",
  metaDescription:
    "Outside IR35 calculator for 2026/27. Compare inside-IR35 and outside-IR35 take-home pay from the same contract fee, including employer NI, PAYE and dividends.",
  h1: "Outside vs Inside IR35 Calculator",
  intro:
    "Are you **inside IR35 or outside IR35**? This IR35 calculator works out your **inside-IR35 take-home pay** (also written as **take home pay** or **take-home calculator**) for 2026/27 from any annual contract fee, using HMRC's deemed employment rules, and shows how the same fee would look if it were paid outside IR35 through a limited company. It is built for UK contractors, freelancers, and the agencies and end clients that engage them.\n\n:::callout info\n**Quick answers — IR35 calculator for inside and outside engagements**\n\n- **IR35 calculator / outside IR35 calculator:** the tool on this page models **inside-IR35 take-home pay** and shows an **outside-IR35 take-home** comparison for the same fee.\n- **Inside IR35 take-home calculator / inside IR35 calculator take home:** enter the contract fee to see deemed gross, employer NI, income tax + employee NI, and take-home.\n- **Inside vs outside IR35 / inside vs outside IR35 calculator / inside outside IR35 calculator / outside vs inside IR35:** see the side-by-side section for a worked comparison on a £75,000 fee.\n- **Outside IR35 take-home calculator / outside IR35 tax calculator / IR35 take-home calculator / contractor calculator outside IR35:** the comparison section walks through a typical PSC structure (salary + dividend) on the same fee. This page also works as an **IR35 take-home calculator** for both routes.\n- **Inside IR35 take-home calculator:** use the tool above with the contract fee as the input — it returns the deemed gross, employer NI, income tax + employee NI, and the **inside IR35 take-home** figure. The full worked answer also doubles as a take-home calculator for the inside route.\n- **Outside IR35 take-home calculator:** see the worked example — fee, less 25% corporation tax, a salary up to the personal allowance, the rest as a dividend with dividend tax. The exact net depends on the contractor's salary/dividend mix and other income.\n- **IR35 take-home calculator (either route):** enter the fee to see the inside take-home; the comparison section then walks through the outside take-home on the same fee.\n- **Scotland:** income tax bands differ; use the take-home pay calculator for Scottish figures.\n:::",
  formulaExplainer:
    ":::callout info\n**Inside IR35:** deemed gross = **contract fee − (15% × max(0, fee − £5,000))**; then deduct income tax (20% / 40% / 45% after the £12,570 Personal Allowance, tapered to nil between £100,000 and £125,140) and employee NI (8% to £50,270, 2% above).\n\n**Outside IR35:** the same fee is paid into the contractor's PSC. The PSC pays 25% corporation tax on profits, then pays the contractor by dividend — taxed at 8.75% basic / 33.75% higher / 39.35% additional dividend rate. No employer NI, no employee NI on dividends.\n:::\n\nThe **inside-IR35 take-home** is what the calculator above models. The **outside-IR35 take-home** is a worked example for comparison — actual outside figures depend on how the PSC mixes salary and dividends, so the comparison is illustrative, not a forecast. Both sides use 2026/27 HMRC rates.",
  howToSteps: [
    {
      name: "Enter the annual contract fee",
      text: "Type the gross amount the fee payer will pay the contractor for the year — the total fee before any deductions, including VAT if the contractor is VAT-registered and outside the scope of the deemed payment calculation.",
    },
    {
      name: "Read the employer NI deduction",
      text: "The calculator shows the 15% employer NI applied to fee above the £5,000 secondary threshold. This is deducted first; the contractor never sees it as take-home.",
    },
    {
      name: "Read the income tax and employee NI",
      text: "The next line shows the income tax and employee NI on the deemed gross pay. Both are deducted through PAYE in the same way as for a regular employee.",
    },
    {
      name: "Read the inside-IR35 take-home",
      text: "The final line is the contractor's estimated inside-IR35 take-home pay for the year. Use the comparison below to see what the same fee would look like if paid outside IR35 via a PSC.",
    },
  ],
  inlineWidgets: [
    {
      type: "barChart",
      afterSectionHeading: "Inside-IR35 take-home on common fees",
      title: "Inside-IR35 take-home pay at common contract fees",
      unit: "Estimates for England, Wales and Northern Ireland, 2026/27, before pension or student loan deductions",
      data: [
        { label: "£40,000", value: 30062, caption: "Junior contractor" },
        { label: "£60,000", value: 42012, caption: "Mid-rate" },
        { label: "£75,000", value: 50174, caption: "Senior" },
        { label: "£100,000", value: 60292, caption: "Specialist" },
        { label: "£150,000", value: 79759, caption: "Senior specialist" },
        { label: "£200,000", value: 98921, caption: "Director" },
      ],
    },
  ],
  sections: [
    {
      heading: "What is IR35?",
      body:
        "**IR35** is the short name for the off-payroll working rules, designed to ensure contractors who would be employees if engaged directly pay broadly the same income tax and National Insurance as employees. The rules apply when a contractor provides their services through an intermediary — usually their own personal service company (PSC) — but the working arrangements would otherwise amount to employment.\n\nWhere the rules apply, the engagement is described as **inside IR35**. The fee payer deducts PAYE and NICs from the contractor's fee as if they were a salary, rather than the contractor paying themselves via dividends from their PSC. Where the rules do not apply, the engagement is **outside IR35** and the contractor's PSC pays corporation tax on the profits in the normal way, then distributes the remainder to the contractor as salary and dividends.\n\nThe 2021 reform shifted the status decision from the contractor's PSC to the end client for medium and large private-sector clients and all public-sector bodies. The contractor can still challenge an inside determination, but the determination itself comes from the client.",
    },
    {
      heading: "Inside IR35 vs outside IR35 at a glance",
      body:
        "The two routes have very different tax treatments. The table below shows how the same £75,000 contract fee flows under each route, ignoring the 5% expenses allowance and any salary-sacrifice pension.\n\n:::table\n| Step | Inside IR35 | Outside IR35 (PSC route) |\n|---|---|---|\n| Contract fee | £75,000 | £75,000 |\n| Employer NI (15% above £5,000) | −£10,500 | £0 |\n| Deemed gross / profit before salary | £64,500 | £75,000 (revenue) |\n| Corporation tax (25%) | n/a | −£18,750 (on profits) |\n| Salary to contractor | paid via PAYE | e.g. £12,570 (PA) → tax + NI ≈ 0 |\n| Dividend to contractor (balance) | n/a | e.g. £43,680 → dividend tax ≈ £6,800 |\n| **Estimated take-home** | **£47,967** | **~£54,400** (illustrative) |\n:::\n\nThe exact outside-IR35 number depends on how the PSC mixes salary and dividends. The example above uses the £12,570 personal allowance as a small salary, with the rest paid as dividends. A higher salary reduces corporation tax but attracts income tax and employee NI; a higher dividend reduces both but attracts the 8.75%/33.75%/39.35% dividend rate. Most PSCs run a salary around the personal allowance for the optimum mix.",
    },
    {
      heading: "How inside-IR35 take-home is calculated",
      body:
        "Inside IR35, the contract fee is treated as deemed employment income. The fee payer (often the agency or end client) becomes a deemed employer and must operate PAYE on the fee.\n\nFirst, the calculator deducts **employer NI at 15%** from the fee above the £5,000 secondary threshold — the same rate as for a direct employee. The remainder is the deemed gross pay. Income tax and employee NI are then applied to that deemed gross pay in the same way as for a regular salary: 20% on the first £37,700 of taxable income above the £12,570 Personal Allowance, 40% up to £125,140, and 45% above. The Personal Allowance tapers to nil between £100,000 and £125,140 of adjusted net income.",
    },
    {
      heading: "How outside-IR35 take-home is calculated",
      body:
        "Outside IR35, the contractor's PSC receives the fee and pays corporation tax on its profits. The standard rate of corporation tax is **25% from 2026/27** (unchanged from 2025/26), with marginal relief available on the first £250,000 of profits for non-ring-fenced profits. After corporation tax, the PSC pays the contractor by a mix of salary and dividends.\n\nA typical outside-IR35 structure pays a small salary at or around the personal allowance (so no income tax or employee NI is due on it), then the post-tax profit as a dividend. Dividend tax in 2026/27 is **8.75%** for the basic-rate band, **33.75%** for the higher-rate band, and **39.35%** for the additional-rate band, applied on top of the personal dividend allowance of £500. The result is usually a higher net than inside IR35, but the contractor also pays accountancy, insurance, and admin costs to run the PSC — typically £2,000–£4,000 a year for a small company.",
    },
    {
      heading: "Inside-IR35 take-home on common fees",
      body:
        "The table and chart below show the estimated **inside-IR35 take-home** for a contractor at six representative annual fees for 2026/27, using the calculator's method. The figures are estimates before pension contributions or student loan repayments.\n\n:::table\n| Contract fee | Employer NI | Income tax + employee NI | Inside-IR35 take-home (est.) |\n|---|---|---|---|\n| £40,000 | £5,250 | £4,688 | £30,062 |\n| £60,000 | £8,250 | £9,738 | £42,012 |\n| £75,000 | £10,500 | £14,326 | £50,174 |\n| £100,000 | £14,250 | £25,458 | £60,292 |\n| £150,000 | £21,750 | £48,491 | £79,759 |\n| £200,000 | £29,250 | £71,829 | £98,921 |\n:::\n\nThese figures assume all the contractor's income is from one inside-IR35 engagement and ignore the 5% expenses allowance. Use the take-home pay calculator to compare with the net of a permanent salary at the same level.",
    },
    {
      heading: "Outside vs inside IR35: a side-by-side example",
      body:
        "How much would a £75,000 contract fee net you under each route? The worked example below uses a typical 2026/27 structure for each side.\n\n- **Inside IR35, £75,000 fee.** Employer NI 15% above £5,000 = £10,500. Deemed gross = £64,500. Income tax + employee NI on the deemed gross ≈ £14,326. **Take-home ≈ £50,174.**\n- **Outside IR35, £75,000 fee, PSC route.** PSC pays 25% corporation tax on £75,000 = £18,750, leaving £56,250. A small salary of £12,570 (uses the personal allowance) costs the PSC £12,570 in cash and the contractor pays no income tax or employee NI on it. Remaining profit of £43,680 is paid as dividend; dividend tax at 8.75% on £43,680 − £500 allowance = **≈ £3,779**, but a higher-rate taxpayer pays 33.75% on the slice above the higher-rate threshold. **Estimated take-home ≈ £48,000 to £54,000** depending on dividend mix and personal allowance position.\n\nThe outside-IR35 route typically nets more on paper, but the gap narrows once you account for accountancy fees, the cost of running the company, and the risk of an HMRC status challenge that would unwind it all.",
    },
    {
      heading: "Who decides IR35 status",
      body:
        "Since the 2021 reform of the off-payroll rules, **the end client decides the status** of every engagement, except where the client is a small company (GOV.UK off-payroll working rules).\n\n- **Public-sector clients and medium or large private-sector clients:** the client determines status and must issue a Status Determination Statement (SDS). The fee payer (often an agency) operates PAYE based on that status.\n- **Small private-sector clients:** the contractor's own PSC makes the determination and carries the tax risk if HMRC later disagrees.\n\nA medium or large client must pass on its determination and reasonable care through the labour supply chain, so an agency can rely on the client's SDS in most cases. Small clients are usually defined as meeting two of: turnover under £10.2 million, balance sheet total under £5.1 million, fewer than 50 employees.",
    },
    {
      heading: "The 5% expenses allowance on small-client engagements",
      body:
        "Where the contractor's own PSC determines status (a small-client engagement), HMRC allows a **5% allowance on the fee** to cover the running costs of operating through a company — accountancy fees, insurance, software and so on. This is deducted from the deemed payment before PAYE is calculated, so it slightly reduces the taxable amount.\n\nWhere the client makes the determination — the majority of inside-IR35 engagements — no 5% allowance applies. The contractor's PSC may still claim legitimate expenses against its corporation tax bill, but those expenses are not deducted for the purpose of calculating the deemed payment to the contractor. This calculator excludes the 5% allowance, so use it as the upper bound of take-home on small-client engagements.\n\n:::callout tip\n**A practical way to use this IR35 calculator as an outside-IR35 take-home calculator:** run the fee through the inside-IR35 figures, then build the outside side yourself with a small salary (use the personal allowance) and a dividend for the rest. Multiply the post-corp-tax profit by 1, then subtract the dividend tax at 8.75% / 33.75% / 39.35% depending on the contractor's other income. That's the same shape the comparison table above uses, and the worked example gives you a starting point.\n:::",
    },
    {
      heading: "Challenging an inside-IR35 determination",
      body:
        "If a client issues an SDS that says an engagement is inside IR35 and you believe it should be outside, you can **submit a written disagreement** through the client's status disagreement process. The client must respond with reasons within 45 days of receiving it.\n\nThe disagreement process is a legal right, not a courtesy. Keep evidence of working practices — substitution rights, the level of control the client exerts, and whether there is a mutuality of obligation between the parties — because these are the three tests HMRC uses to decide employment status. If the client fails to respond within 45 days, the contractor is treated as outside IR35 for that engagement until a new SDS is issued.\n\nIf the disagreement is rejected, the contractor's options are to accept the determination or to refuse the contract. There is no right of appeal to HMRC on the determination itself — the right of appeal is against the PAYE operated by the fee payer, not the underlying status.",
    },
    {
      heading: "Common IR35 mistakes to avoid",
      body:
        "Three errors catch contractors out regularly:\n\n- **Treating outside-IR35 status as automatic.** The client (or your PSC, for small clients) has to determine it actively and issue or accept an SDS. No status is not the same as outside.\n- **Forgetting the personal service company route.** The deemed payment rules apply even when the contractor has no PSC at all — the fee payer still has to operate PAYE if the conditions are met.\n- **Ignoring the 5% allowance on small-client engagements.** The calculator above excludes it; small-client engagements can take slightly more home.\n- **Quoting the same day rate inside and outside IR35.** Outside-IR35 engagements cost the contractor more in admin and tax risk, so the day rate should be higher — typically 15–25% above an equivalent inside-IR35 rate. Pricing them identically is a margin trap.\n\nWhere the determination is borderline, take professional advice before signing a contract. The cost of getting it wrong falls on the party HMRC decides carries the tax risk.",
    },
    {
      heading: "Summary: how to use this IR35 calculator",
      body:
        "Enter the **annual contract fee** and the calculator shows the **employer NI**, the **income tax plus employee NI** and the **estimated inside-IR35 take-home** for the year. Use the comparison section to see what the same fee would look like if it were paid outside IR35 through a PSC — the difference is the corporation tax bill and the dividend tax bill replacing the PAYE deductions.\n\nThe figures use 2026/27 HMRC rates and the rUK income tax bands. For a final outside-IR35 figure, model the same fee through your PSC accounts with your accountant — corporation tax, dividend mix, and the personal allowance position all change the result.",
    },
  ],
  faq: [
    {
      question: "What does 'inside IR35' mean?",
      answer:
        "The engagement is treated as employment for tax purposes. The fee payer (usually the client or agency) must deduct income tax and National Insurance from the contractor's fee as if they were an employee, instead of the contractor paying themselves through their own company.",
    },
    {
      question: "What does 'outside IR35' mean?",
      answer:
        "The engagement is treated as a genuine contract for services, not employment. The contractor's PSC receives the fee, pays corporation tax on its profits, then pays the contractor by salary and dividends. There is no PAYE or employer National Insurance on the fee itself.",
    },
    {
      question: "How is inside-IR35 take-home pay calculated?",
      answer:
        "Employer NI (15% of the fee above £5,000 in 2026/27) is taken from the contract fee first. The balance is taxed as employment income: 20% / 40% / 45% income tax after the £12,570 Personal Allowance, plus employee NI at 8% to £50,270 and 2% above it. Use the inside IR35 take home calculator above to enter your fee and see the full breakdown.",
    },
    {
      question: "How is outside-IR35 take-home pay calculated?",
      answer:
        "The PSC pays 25% corporation tax on the contract fee (treated as profit). The remaining profit is paid to the contractor as a small salary (using the personal allowance of £12,570) plus a dividend. Dividend tax is 8.75% basic / 33.75% higher / 39.35% additional. Net is usually higher than inside IR35, minus accountancy and admin costs. The outside IR35 take home calculator section on this page walks through a typical PSC structure for a £75,000 fee.",
    },
    {
      question: "What is the difference between inside IR35 and outside IR35?",
      answer:
        "Inside IR35: the fee is treated as a salary — employer NI, income tax and employee NI apply, leaving take-home close to a permanent employee. Outside IR35: the PSC pays corporation tax, then pays the contractor by salary and dividend — no PAYE on the fee itself, but more admin and more tax risk. An IR35 take home calculator like this one shows the two side by side.",
    },
    {
      question: "Who decides whether a contract is inside or outside IR35?",
      answer:
        "For medium and large private-sector clients and all public-sector bodies, the client decides and must issue a Status Determination Statement. Where the client is small, the contractor's own PSC makes the determination and carries the tax risk (GOV.UK off-payroll working rules).",
    },
    {
      question: "Does this IR35 calculator work for outside-IR35?",
      answer:
        "The calculator above models the inside-IR35 take-home directly. For outside IR35 it works as an inside-IR35 take-home calculator, and the worked comparison on this page shows how the same fee would look under a typical outside-IR35 PSC structure. For a final outside figure, model the fee through your accountant.",
    },
    {
      question: "Can I use this as an outside IR35 take-home calculator?",
      answer:
        "The tool itself is an inside-IR35 take-home calculator. To estimate outside-IR35 take-home, run the fee through the calculator for the inside figure, then build the outside side manually: 25% corporation tax on the fee, a small salary to the contractor up to the £12,570 personal allowance, and a dividend for the rest, with dividend tax at 8.75%/33.75%/39.35%. The worked example in the article shows the calculation.",
    },
    {
      question: "Does this estimate include the 5% expenses allowance?",
      answer:
        "No. The 5% allowance only applies where the contractor's own PSC makes the status decision (small-client engagements). For client-determined status — the majority of cases — no allowance is deducted, so this calculator excludes it.",
    },
    {
      question: "Can I challenge an inside-IR35 determination?",
      answer:
        "Yes. You can submit a written disagreement through the client's status disagreement process, and the client must respond with reasons within 45 days. Substitution rights, control and mutuality of obligation are the key employment-status tests.",
    },
    {
      question: "What is a Status Determination Statement (SDS)?",
      answer:
        "An SDS is the document a medium or large client must issue to a contractor (or pass through the agency chain) confirming whether the engagement is inside or outside IR35. Without an SDS, the engagement is treated as outside IR35 until a new SDS is issued.",
    },
    {
      question: "Does this calculator apply to Scotland?",
      answer:
        "The income tax bands differ in Scotland, so the inside-IR35 take-home figure for a Scottish contractor will differ slightly. Use the take-home pay calculator to see the Scottish-band figures for the deemed gross pay, or speak to a Scottish tax adviser for a definitive position.",
    },
    {
      question: "What about inside IR35 take home after pension contributions?",
      answer:
        "Salary-sacrifice pension into a registered scheme reduces the deemed gross pay and therefore reduces income tax, employee NI and employer NI. The calculator above does not model this — enter the post-sacrifice gross pay as the contract fee to see the net. The workplace pension calculator shows the contribution side.",
    },
    {
      question: "What about inside vs outside IR35 for a contractor with multiple clients?",
      answer:
        "IR35 status is decided per engagement, not per contractor. A contractor with two contracts can be inside IR35 on one and outside on the other, depending on each client's determination. Each engagement's fee is taxed under its own rules.",
    },
  ],
  relatedSlugs: [
    "take-home-pay-calculator",
    "net-to-gross-calculator",
  ],
  defaults: { contractRevenue: 75000 },
});
