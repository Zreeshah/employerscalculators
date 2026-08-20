# KONTENT — Content Style Guide

This is the rulebook for every page on Employers Calculators. The Prose renderer in `components/Prose.tsx` is the source of truth for the syntax; the rules below tell you how to use it.

---

## 1. Field shape (calculator pages)

Every calculator content file in `content/calculators/<slug>.ts` exports a `CalculatorContent` object:

```ts
{
  type: "calculator",
  slug,                        // canonical URL segment, never change without a redirect
  kind,                        // matches CalculatorKind in lib/calculators.ts
  title,                       // <title> tag, ≤ 60 chars
  metaDescription,             // meta description, ≤ 160 chars
  h1,                          // on-page heading, the tool name
  intro,                       // 2–4 sentences, sets context and search intent
  formulaExplainer,            // 1–3 paragraphs, MUST match the code in lib/calculators.ts
  sections?,                   // long-form body — see block syntax below
  howToSteps?,                 // drives HowTo JSON-LD; aim for 4–6 steps
  inlineWidgets?,              // inline visualisations (bar chart) — see section 6
  faq,                         // 4–8 Q&As targeting PAA/featured-snippet intent
  relatedSlugs,                // informational; the live map is content/taxonomy.ts
  defaults?,                   // prefilled calculator inputs
}
```

The page template (`app/[slug]/page.tsx`) renders in this order:
1. Breadcrumbs (auto)
2. `<h1>` + ReviewedByByline
3. Intro paragraph
4. **Calculator** (above the fold, no copy above it)
5. TOC (if more than 2 sections)
6. HowTo steps card (if `howToSteps` present)
7. "How it is calculated" + `formulaExplainer`
8. Each section, optionally with a `BarChart` widget
9. `RatesTable` (auto, reads `data/rates.ts`)
10. FAQ accordion
11. EmbedWidgetTeaser
12. RelatedContent (auto, reads `content/taxonomy.ts`)

JSON-LD emitted: `SoftwareApplication` always, `FAQPage` if faq non-empty, `HowTo` if `howToSteps` present.

---

## 2. Voice & tone

- **UK English** — "organise", "behaviour", "pro rata", "gross", "PAYE". Never use US spellings.
- **Second person, present tense** — "Enter the salary…", "Use this when…". No "we" except in the methodology page.
- **One number at a time** — "£30,000 a year" not "£30K pa". Tabular figures are styled with `tabular-nums` in the UI; your text doesn't need them.
- **Cite GOV.UK by name** where relevant. Do not invent reviewer names, credentials or statistics.
- **Estimates, not advice** — every calculator is an estimate, not a payroll guarantee. The result panel already says this; mirror that tone in the intro.
- **Confidence without hype** — no "the best", "the only", "amazing". Plain, direct.

---

## 3. SEO targeting (one canonical page per concept)

Every calculator page targets a **primary keyword** plus its **variant forms** in a single page. Never split "pro rata calculator" / "pro rata salary calculator" into separate pages.

- **Title tag**: primary keyword near the start, year or "UK" suffix, ≤ 60 chars.
  - Good: `Pro Rata Salary Calculator UK 2026/27 — Free Part-Time Pay Tool`
  - Bad: `Pro Rata Salary Calculator` (too generic, loses CTR and SERP features)
- **Meta description**: include the primary keyword, one benefit, one differentiator, ≤ 160 chars. Always end without a full stop to avoid SERP clipping.
- **H1**: the tool's plain name. Not the title tag. Not a question. Not a sentence.
  - Good: `Pro Rata Salary Calculator`
  - Bad: `Use Our Pro Rata Salary Calculator to Work Out Part-Time Pay`
- **URL**: never change `slug` after launch. The URL is the identity of the page in Google's index.

Variants to weave into copy: titles, headings, intro, body, FAQ. Cover at least these forms per page:
- Singular + plural of the tool
- "calculator" / "calc" / "tool"
- "UK" suffix on at least one mention
- "for employers" / "for employees" / "for payroll" as appropriate
- Question forms ("how to…", "how do I…") in the FAQ

---

## 4. The Prose block syntax (content files stay HTML-free)

`Prose` recognises these blocks inside a body string:

### Paragraphs
Plain text, paragraphs separated by a blank line. One idea per paragraph.

### Inline bold
Wrap with `**double asterisks**`. The renderer replaces it with a `<strong class="font-semibold text-ink">`.

### Unordered list
Lines beginning with `- `. Consecutive bullet lines form one list.

### Ordered list
Lines beginning with `1. `, `2. `, etc. Use for steps; pair with `howToSteps` for the schema.

### Callout
```
:::callout tip
Body text, can have **bold** and bullet lists inside.
:::
```

Variants: `tip` (emerald accent, "Tip" label), `info` (ink neutral, "Note" label), `warn` (amber, "Watch out" label). Use sparingly — one or two per article. Callouts are for genuinely helpful asides, not for re-stating the main point.

### Table
```
:::table
| Pattern | How to calculate FTE | Example (full-time £40,000) |
|---|---|---|
| Part-time | Part-time hours ÷ full-time hours | 25/37.5 = 0.67 → £26,667 |
| Job-share | Sum of partners' hours ÷ full-time hours | Two at 0.5 each |
| Term-time | Weeks worked ÷ 52 | 39/52 = 0.75 → £30,000 |
:::
```

The first row is the header. The second row (the `|---|---|---|` separator) is recognised and skipped. Use tables when there are 3+ comparable items across 2+ attributes — that's the point at which a table beats a list.

### Anything else
Lines that don't match a block are joined into a paragraph.

---

## 5. Section structure (when using `sections[]`)

Use `sections` for any calculator that has meaningful content beyond a one-paragraph formula. Pattern:

- **6–9 sections** per page. Quality over quantity.
- **First H2 after the formula explainer** should be a "what is" or definition — search engines (and AI Overviews) love clear definitions high on the page.
- **H2s are questions or noun phrases**, not clickbait:
  - Good: "What is a pro rata salary?", "The pro rata salary formula", "Pro rata salary examples", "Common pro rata mistakes to avoid"
  - Bad: "Why use a pro rata calculator?", "Everything you need to know!", "The truth about pro rata"
- **Each body 60–140 words**. Use bold for the one or two terms you want to survive a snippet extract.
- **Anchor IDs are auto-slugified** from headings — keep them sentence-case so the slugs read naturally (`#common-pro-rata-mistakes-to-avoid`).
- **Final section** is usually a "Summary: how to use this calculator" — a short, scan-friendly recap that loops the reader back to the tool.

For calculator pages that don't need long-form content (shorter-tail calculators), leave `sections` out entirely — the formulaExplainer + FAQs are enough.

---

## 6. Inline widgets (data-driven visualisations)

Add `inlineWidgets: [{ type: "barChart", afterSectionHeading, title, unit, data }]` to a calculator when a simple bar chart earns its place — usually when the answer depends on a single input and has 3–6 sensible values to compare.

The widget is rendered as an inline SVG bar chart, sized to the article width, styled with the design system (accent-strong bars, ink value labels, ink/60 captions).

```ts
inlineWidgets: [
  {
    type: "barChart",
    afterSectionHeading: "Pro rata salary examples",
    title: "Pro rata salary at common FTE fractions",
    unit: "Full-time equivalent salary: £40,000 over 37.5 hours a week",
    data: [
      { label: "0.25 FTE", value: 10000, caption: "1 day a week" },
      { label: "0.5 FTE", value: 20000, caption: "Half time" },
      { label: "0.6 FTE", value: 24000, caption: "3 days / 5" },
      { label: "0.75 FTE", value: 30000, caption: "Term-time" },
      { label: "1.0 FTE", value: 40000, caption: "Full-time" },
    ],
  },
],
```

Rules:
- Only one chart per section (one per `afterSectionHeading`)
- 3–6 bars is the sweet spot
- Values must be real, defensible numbers — never invent them
- The chart complements the prose, it doesn't replace it. Always have the explanation in the body, the chart in the widget.

---

## 7. HowTo steps (for HowTo JSON-LD)

Use `howToSteps` when the calculator answers a "how do I…" question. Each step has a `name` (imperative verb phrase) and `text` (one short paragraph).

- 4–6 steps total. Aim for the fewest number that still walks the user through the calculation.
- First step is usually "find the X" or "decide what you want to calculate". Last step is the result.
- Use the same language as the formulaExplainer — HowTo is the schema wrapper around the calculation, not a different explanation.

The page renders HowTo as a numbered list in a card before the formula explainer. The JSON-LD that comes out is a `HowTo` block — a strong signal for AI Overviews and "How to" SERP features.

---

## 8. FAQs

Every calculator gets 4–8 FAQs. Each question should be a question a real person would type, not a marketing prompt.

Sources for FAQs (in order of preference):
1. "People Also Ask" patterns from the SERP for the primary keyword
2. "Related searches" at the bottom of the SERP
3. Real user questions from review sites, Reddit, GOV.UK forums
4. The most common follow-up questions a payroll novice would ask

Each answer is 1–3 sentences, stands on its own (the answer is the snippet), and cites the formula or rate where relevant. No "click here to learn more" CTAs in FAQs — the related calculators at the bottom do that work.

For question-form keywords (e.g. "how to work out pro rata salary"), the matching FAQ should answer in the exact phrasing a user would search.

---

## 9. Internal linking

The `RelatedContent` component at the bottom of every page reads from `content/taxonomy.ts` — a single source of truth for the related-links cluster. When you add a new page, add reciprocal entries to the map for the 2–4 most relevant siblings.

Inside the body, link by mentioning the related tool by name when it would actually help a reader — "use the take-home pay calculator to see the income tax and employee National Insurance that would be deducted". Do not stuff "and also try our [X] calculator" into every paragraph; the related-content block does that work.

Cross-link to guides (`/guides/...`) when the guide genuinely deepens a topic the calculator covers in summary. For example, the employer NI calculator links to "How much does it cost to employ someone in the UK?".

---

## 10. Theme alignment (so the article feels like part of the site)

- **Colour.** Use the site palette: ink `#0F172A` for body, paper `#FAFAF9` for the page background, accent `#0E9F6E` for highlights (on dark surfaces), accent-strong `#047857` for text on light. Do not introduce new colours. Callouts use accent (`tip`), ink neutral (`info`), or amber (`warn`) — those are the only three callout variants.
- **Type.** Bold (`**...**`) for emphasis. No italics in content files — render with bold if you need emphasis.
- **Cards.** The Prose `:::callout` block produces a styled card with an icon, label and tinted background. Use it instead of inventing your own box.
- **Tables.** The Prose `:::table` block produces a rounded card with a tinted header and zebra rows. Use it for comparisons; use lists for sequences.
- **No emojis.** No icons in the body. Callouts have icons automatically; the rest of the content is type-led.

---

## 11. Quality gate (before saving a content file)

- [ ] `slug`, `kind` unchanged from existing page (or removed in a new file)
- [ ] `title` ≤ 60 chars, includes primary keyword and year or "UK"
- [ ] `metaDescription` ≤ 160 chars, includes primary keyword, ends without full stop
- [ ] `h1` is the tool's plain name, not a sentence
- [ ] `intro` is 2–4 sentences, addresses the search intent
- [ ] `formulaExplainer` matches the implementation in `lib/calculators.ts` (read the switch case for your kind before writing it)
- [ ] `sections` (if used) have 6–9 H2s, each body 60–140 words, last one is a summary
- [ ] `howToSteps` (if used) has 4–6 steps with `name` + `text`
- [ ] `inlineWidgets` (if used) has 3–6 bars with real values
- [ ] `faq` has 4–8 Q&As in plain UK English, each answer standalone
- [ ] `**bold**` used for the 1–2 terms you want to survive a snippet
- [ ] `:::callout` and `:::table` blocks used where the content earns them (not everywhere)
- [ ] No invented reviewers, credentials, or statistics
- [ ] No raw hex colours or one-off styling
- [ ] `cd /Users/resilient/employerscalculators && npx tsc --noEmit` is clean (errors only in your file = fix them; pre-existing errors elsewhere = note them)
