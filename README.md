# Employers Calculators

Free UK payroll & employment calculator platform at **employerscalculators.co.uk** — pro rata, SSP, SMP, employer NI, pensions, IR35, NHS pay bands and more. Every figure is sourced to the official HMRC 2026/27 rates.

## Stack

- **Next.js 16** App Router, TypeScript, static export (`output: "export"`)
- **Tailwind CSS v4** — two-tone tokens (ink/paper + emerald accent), zero webfonts
- **React 19** — only the `CalculatorForm` island is client-side; everything else is server-rendered static HTML
- No database, no CMS — content is typed `.ts` data files that produce HTML at build time
- One `node --test` check on the calculation engine (no test runner framework)

## Quickstart

```bash
npm install
npm run dev          # local dev
npm run build        # static export to out/
npm test             # calculation engine self-check
npm run lint
```

Open `out/index.html` after build, or serve the static folder:

```bash
python3 -m http.server 4173 --directory out
# http://localhost:4173
```

## Project layout

```
app/
  layout.tsx, page.tsx           # homepage + root chrome (Header, Footer, Organization JSON-LD)
  globals.css                    # design tokens, .card, focus-visible, reduced-motion
  [slug]/page.tsx                # data-driven route: calculators + utility pages
  guides/page.tsx                # guides index
  guides/[slug]/page.tsx         # guide pages (auto-TOC, Prose, FAQ accordion)
  sitemap.ts, robots.ts          # metadata routes (force-static for export)
  not-found.tsx

components/
  CalculatorShell.tsx            # server wrapper around the client island
  CalculatorForm.tsx ('use client')  # the ONLY client component — live inputs + sticky result panel
  Header.tsx, Footer.tsx
  Breadcrumbs.tsx                # also emits BreadcrumbList JSON-LD
  ReviewedByByline.tsx           # reviewer/credential/date (placeholders until claimed)
  RatesTable.tsx                 # reads /data/rates.ts
  FaqAccordion.tsx               # CSS-only details/summary
  RelatedContent.tsx             # pulls links from /content/taxonomy.ts
  EmbedWidgetTeaser.tsx
  Prose.tsx                      # renders guide bodies: paragraphs + bullet lists
  JsonLd.tsx

content/
  types.ts                       # CalculatorContent, GuideContent, SimplePageContent
  calculators/<slug>.ts          # 18 core calculator content files (one per calculator)
  calculators/nhs.ts             # generates 11 NHS band × England pages from data
  calculators/index.ts           # registry + homepage groups
  guides/<slug>.ts               # 9 guide content files
  guides/index.ts                # registry
  pages.ts                       # 5 utility pages (about, methodology, contact, privacy, terms)
  taxonomy.ts                    # related-slugs map (RelatedContent source of truth)

data/
  rates.ts                       # SINGLE SOURCE for all 2026/27 HMRC figures
  nhs-pay-bands.ts               # Agenda for Change pay scales (England 2025/26, pending 2026/27 award)
  future-pay-scales.ts           # empty stub for teachers' / police pay matrices

lib/
  calculators.ts                 # CalculatorKind, input specs, real formulas + helpers
  calculators.test.ts            # 10 node:test asserts
  seo.ts                         # pageMetadata(), JSON-LD builders (Organization, BreadcrumbList, SoftwareApplication, FAQPage)

next.config.ts                   # output: "export", typedRoutes: false
```

## How to add content

### New calculator

1. Add an entry to `CalculatorKind` in `lib/calculators.ts`.
2. Add input specs and a formula case to `calculate()` (match the existing one-liner style; helpers `incomeTaxRuk`, `employeeNi`, `employerNi`, `takeHome` are available).
3. Create `content/calculators/<slug>.ts` exporting `calculator({ ... })` with kind, title, metaDescription, h1, intro, formulaExplainer (must mirror the code), faq[].
4. Add the slug to a group in `content/calculators/index.ts → calculatorGroups`.
5. Add taxonomy links in `content/taxonomy.ts` for the new calculator (and any guides that should link to it).
6. Optionally add a `tsc --noEmit` assert to `lib/calculators.test.ts`.

### New guide

1. Create `content/guides/<slug>.ts` with `guide({ ... })`. Body strings use `\n\n` between paragraphs and `- ` for bullets (rendered by `Prose`).
2. The guide is automatically picked up by `allGuides` in `content/guides/index.ts` and by `/guides/<slug>`'s `generateStaticParams`.
3. Add reciprocal links in `content/taxonomy.ts`.

### Updating rates

Replace values in `data/rates.ts` and bump `taxYearLabel` + `lastUpdated`. The `RatesTable`, every calculator, and the homepage all read from this single file. Rebuild and re-export.

## Content sources

- **HMRC rates** — [Rates and thresholds for employers 2026 to 2027](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027)
- **NHS pay** — Agenda for Change, England 2025/26 scales (2026/27 award pending; flagged in NHS page copy)
- **Personal Allowance taper, NI bands, tax thresholds** — same HMRC page
- **National Minimum Wage** — same GOV.UK page, effective 1 April 2026

## SEO

- Per-page canonical, Open Graph, Twitter Card (in `app/layout.tsx` + `lib/seo.ts`)
- JSON-LD: Organization (sitewide), BreadcrumbList (every page), SoftwareApplication (calculator pages), FAQPage (pages with FAQ)
- `sitemap.xml` is generated from the route manifest at build (`app/sitemap.ts`); `robots.txt` allows full crawl
- One canonical URL per concept — keyword variants are covered in single pages, not duplicated

## Deployment

Any static host works. The `out/` folder is fully self-contained. Suggested:

- **Cloudflare Pages / Netlify / Vercel static** — point at `out/`, build command `npm run build`, publish directory `out/`
- **Nginx / Caddy / GitHub Pages** — copy `out/` to the web root
- Set `Cache-Control: public, max-age=31536000, immutable` on `/_next/static/*` and a short TTL on HTML

## Local Lighthouse (static export, throttled)

| Page | Performance | A11y | Best practices | SEO |
|------|-------------|------|----------------|-----|
| `/pro-rata-calculator.html` | 86 | 96 | 100 | 100 |
| `/guides/employer-ni-rates-2026-27.html` | 88 | 100 | 100 | 100 |

Performance is throttled-mobile simulation; the only client JS is the small calculator island.

## Known ceilings

- NHS matrix is England-only — Scotland/Wales/NI scales land once verified (see `data/nhs-pay-bands.ts → publishedNations`)
- Company car tax uses a user-supplied BIK% — pulling live CO2-based BIK bands from HMRC is a future task
- IR35 calculator shows an inside-IR35 estimate only; the outside-IR35 comparison needs the user's chosen mix of salary vs dividends
- Occupational sick-pay calculators are out of scope (the SSP floor is shown for comparison)
- `ReviewedByByline` still renders placeholder fields — fill in `name`, `credential`, `verifiedDate` per page once reviewers are onboarded
