import { simplePage, type SimplePageContent } from "./types";

// /about, /methodology, /contact, /privacy-policy, /terms — served by app/[slug]
export const simplePages: SimplePageContent[] = [
  simplePage({
    type: "simple",
    slug: "about",
    title: "About",
    metaDescription:
      "Employers Calculators is a free library of UK payroll and employment calculators built on official HMRC rates for tax year 2026/27.",
    h1: "About Employers Calculators",
    intro:
      "Employers Calculators is a free library of UK payroll and employment calculators for small-business owners, payroll and HR staff, accountants, and employees checking their own entitlements.",
    body: [
      "UK payroll rules change every April. Our aim is simple: for every common payroll question \u2014 What does this employee actually cost me? How much SSP do I owe? What is the pro rata salary for this part-time role? \u2014 there should be one fast, accurate, clearly sourced calculator.",
      "Every calculator on this site runs on the official HMRC rates and thresholds for the 2026/27 tax year, and every figure is traceable to a GOV.UK source. There is no sign-up, no paywall and no data collection \u2014 the maths runs in your browser.",
      "Every calculator and guide is reviewed by our editorial team against primary GOV.UK and HMRC sources before publication. Figures are re-verified at the start of each tax year and after any mid-year rate changes. Our full verification process is described on the methodology page.",
      "The site also covers public-sector pay scales \u2014 NHS Agenda for Change bands (England, Scotland, Wales), teachers\u2019 STPCD pay ranges and police pay under the Police Regulations \u2014 each sourced from the relevant government body and updated when new pay awards are confirmed.",
    ],
  }),
  simplePage({
    type: "simple",
    slug: "methodology",
    title: "Methodology & Sources",
    metaDescription:
      "How Employers Calculators sources, verifies and maintains its UK payroll figures: GOV.UK rates pages, annual review each tax year, and corrections policy.",
    h1: "Methodology & Sources",
    intro:
      "Every rate and threshold used on this site comes from primary UK government sources. This page explains what we use, how we verify it, and how we handle updates.",
    body: [
      "Primary sources. All PAYE, National Insurance, statutory pay and minimum wage figures come directly from GOV.UK rather than third-party summaries. Our principal sources are: HMRC\u2019s \u2018Rates and thresholds for employers 2026 to 2027\u2019, the Income Tax rates and Personal Allowances guidance, the National Minimum Wage and National Living Wage rates, and the Statutory Payments (SSP, SMP, SPP, SAP, ShPP) employer guides. NHS pay scales are sourced from NHS Employers\u2019 published Agenda for Change pay tables for England, the Scottish Government\u2019s NHS Scotland pay circular, and NHS Wales pay circulars. Teachers\u2019 pay comes from the School Teachers\u2019 Pay and Conditions Document (STPCD). Police pay is sourced from the Police Regulations and Home Office circulars.",
      "Verification. Each calculator\u2019s formula is written to mirror the published rules (for example, SSP at \u00a3123.25 per week or 80% of average weekly earnings if lower, payable from the first day of sickness in 2026/27) and is checked against GOV.UK worked examples where available. Our editorial team cross-checks inputs, outputs and edge cases against the primary source before publication. Automated unit tests (61 test cases covering benchmark calculations) run on every code change to catch regressions.",
      "Editorial process. Every new calculator or guide follows the same pipeline: (1) identify the primary GOV.UK or government source, (2) extract rates, thresholds and rules, (3) build the calculation logic, (4) write a worked example and cross-check it against the source, (5) run automated tests, (6) publish with source attribution. No figure is published without a traceable GOV.UK reference.",
      "Updates. Rates are reviewed at least once per tax year, after the Autumn Budget and the Spring pre-year HMRC publications. The footer of every page states the tax year the figures belong to.",
      "Limitations. Our calculators show estimates for the standard cases. Edge cases — directors' NI, Scottish income tax bands, K codes, student loan deductions — can change the result. Always verify payroll figures against GOV.UK or your payroll software before acting on them.",
      "Corrections. If you spot a figure that looks wrong, tell us via the contact page and we will check it against the primary source. Accuracy corrections are our top priority and are typically resolved within 24 hours.",
    ],
  }),
  simplePage({
    type: "simple",
    slug: "contact",
    title: "Contact",
    metaDescription:
      "Contact Employers Calculators with corrections, questions about a calculation, or embed enquiries.",
    h1: "Contact",
    intro: "Questions, corrections or embed enquiries — we would like to hear from you.",
    body: [
      "Spotted a figure that looks wrong? Tell us which calculator and what you expected — accuracy fixes are our top priority.",
      "Email: contact@employerscalculators.co.uk",
      "We aim to reply within two working days. Please note we cannot give advice on individual tax or employment situations — for that, speak to your accountant, ACAS or HMRC.",
    ],
  }),
  simplePage({
    type: "simple",
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaDescription:
      "Privacy policy for Employers Calculators: calculators run in your browser, no accounts, no sale of personal data.",
    h1: "Privacy Policy",
    intro: "This site is designed to collect as little data as possible.",
    body: [
      "Calculators run entirely in your browser. The numbers you type are never sent to our servers, stored, or shared.",
      "We do not use advertising trackers and we do not sell personal data. Like most websites, our hosting provider keeps standard server logs (IP address, browser, pages visited) for security and performance purposes.",
      "If you contact us by email, we use your email address only to reply to your enquiry.",
      "If this policy changes, the updated version will be posted on this page with a revised date.",
    ],
  }),
  simplePage({
    type: "simple",
    slug: "terms",
    title: "Terms of Use",
    metaDescription:
      "Terms of use for Employers Calculators: estimates only, not financial advice, verify against GOV.UK before payroll decisions.",
    h1: "Terms of Use",
    intro:
      "By using this site you accept these terms. They exist to be clear about what our calculators are — and what they are not.",
    body: [
      "Estimates, not advice. Results are estimates based on the published 2026/27 UK rates and standard assumptions. They do not constitute financial, tax, legal or employment advice, and they do not replace your payroll software, accountant or HMRC guidance.",
      "Accuracy. We source every figure from GOV.UK and review rates each tax year, but we cannot guarantee that every result is correct for your specific circumstances. Verify figures against GOV.UK before making payroll, hiring or contractual decisions.",
      "Liability. To the extent permitted by law, we accept no liability for loss arising from reliance on calculations on this site.",
      "Acceptable use. You may use the calculators freely for personal and business purposes. Do not scrape, misrepresent the results as official HMRC figures, or embed the tools without permission (embed licensing is coming — see the contact page).",
    ],
  }),
];

export const simplePageBySlug = new Map(simplePages.map((p) => [p.slug, p]));
