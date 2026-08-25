# Employers Calculators — Project Documentation

> **Free UK payroll & employment calculator platform** — 54 calculator routes, 12 guide pages, 5 utility pages, all built on official HMRC 2026/27 rates.

---

## 1. Project Overview

**What:** A static, SEO-first site of free UK payroll/employment calculators (pro-rata, SSP, SMP, employer NI, IR35, pensions, benefits-in-kind, leave, etc.) plus a public-sector pay-band matrix (NHS Agenda for Change) and in-depth guides.

**Audience:** UK small-business owners, HR/payroll staff, accountants, employees checking entitlements.

**Positioning:** Most accurate, clearly sourced, fastest-loading calculator in each category — not a content farm.

**Live URL:** https://employerscalculators.co.uk/

---

## 2. Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16 (App Router) | Static export (`output: 'export'`) |
| Styling | Tailwind CSS v4 | Two-tone design tokens (`--color-ink`, `--color-paper`, `--color-accent`) |
| Language | TypeScript (strict) | Strict mode, path aliases (`@/*`) |
| Fonts | System UI stack | Zero font-loading cost |
| Hosting | Vercel | Auto-deploy on push to `main` |
| Content | Typed `.ts` files | `content/` directory, no CMS |
| Build | Static export (`next build`) | `out/` folder, served statically |

**Key constraints:**
- Only **one client component**: `CalculatorForm` (the interactive calculator). Everything else is Server Components / static HTML.
- Zero webfonts, zero runtime JS for non-calculator pages.
- Clean URLs via `trailingSlash: true` → `/ir35-calculator/` not `.html`.

---

## 3. Project Structure

```
employerscalculators/
├── app/
│   ├── layout.tsx              # Root layout: Header, Footer, Organization JSON-LD
│   ├── page.tsx                # Homepage: calculator directory + guides index
│   ├── globals.css             # Tailwind v4 + design tokens + Prose styles
│   ├── [slug]/page.tsx         # Dynamic route: calculators + simple pages (about, contact, etc.)
│   ├── guides/
│   │   ├── page.tsx            # Guides index
│   │   └── [slug]/page.tsx     # Guide pages (auto-TOC, Prose, FAQ, HowTo)
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx
│   ├── favicon.ico             # (removed, using public/favicon.jpeg)
│   └── icon.jpeg               # Vercel app icon
├── components/
│   ├── CalculatorForm.tsx      # ONLY client component ('use client')
│   ├── CalculatorShell.tsx
│   ├── Prose.tsx               # Markdown-like parser (bold, lists, callouts, tables, charts)
│   ├── BarChart.tsx            # Inline SVG bar chart (no deps)
│   ├── Header.tsx              # Logo, nav, mobile menu (CSS-only)
│   ├── Footer.tsx              # Sitemap links, tax-year note
│   ├── Breadcrumbs.tsx         # + BreadcrumbList JSON-LD
│   ├── Prose.tsx               # Renders prose blocks (callouts, tables, bold, lists)
│   ├── RatesTable.tsx          # Reads from data/rates.ts
│   ├── FaqAccordion.tsx        # CSS-only <details> accordion
│   ├── RelatedContent.tsx      # Data-driven from taxonomy.ts
│   ├── ReviewedByByline.tsx
│   ├── EmbedWidgetTeaser.tsx
│   ├── JsonLd.tsx              # <script type="application/ld+json">
│   └── icons.tsx               # 12 inline SVG icons
├── content/
│   ├── types.ts                # Interfaces: CalculatorContent, GuideContent, SimplePageContent
│   ├── calculatorIcons.ts      # slug → {icon, featured, stat, caption}
│   ├── taxonomy.ts             # relatedSlugs map (single source of truth)
│   ├── pages.ts                # Simple pages (about, methodology, contact, privacy, terms)
│   ├── calculators/
│   │   ├── index.ts            # Registry + homepage groups + NHS generator
│   │   ├── nhs.ts              # Generates 23 NHS pay pages from data/
│   │   ├── pro-rata.ts ...     # 26 calculator modules (core + NHS/teachers/police generators)
│   │   └── ir35.ts ...         # All with Prose blocks, HowTo steps, FAQs
│   ├── guides/
│   │   ├── index.ts            # Guide registry
│   │   ├── employer-ni-rates-2026-27.ts  (and 11 more)
│   │   └── index.ts
│   └── calculatorIcons.ts
├── data/
│   ├── rates.ts                # SINGLE source of truth for all 2026/27 HMRC figures
│   ├── nhs-pay-bands.ts        # NHS Agenda for Change pay scales (England, Scotland, Wales)
│   └── future-pay-scales.ts    # Stub for future teachers/police matrices
├── lib/
│   ├── calculators.ts          # CalculatorKind, input specs, REAL formulas + helpers
│   ├── calculators.test.ts     # 10 node:test asserts (run via `npm test`)
│   └── seo.ts                  # Metadata helpers + JSON-LD generators
├── public/
│   ├── logo.jpg                # Full lockup (emblem + wordmark)
│   ├── logo-mark.svg           # Emblem only (mobile header)
│   ├── favicon.jpeg            # Browser tab icon
│   └── favicon.jpeg (app/icon.jpeg for Vercel)
├── KONTENT.md                  # Content style guide (Prose syntax, SEO rules, tone)
├── PROJECT.md                  # ← you are here
├── next.config.ts              # output: 'export', trailingSlash: true, typedRoutes: false
├── tsconfig.json               # strict, noEmit, allowImportingTsExtensions, paths
└── package.json
```

---

## 4. Content Model

### Core Interfaces (`content/types.ts`)

```typescript
interface CalculatorContent {
  type: "calculator";
  slug: string;                 // URL segment: "pro-rata-calculator"
  kind: CalculatorKind;         // maps to lib/calculators.ts
  title: string;                // meta title (≤60 chars)
  metaDescription: string;      // meta description (≤160 chars)
  h1: string;                   // on-page heading
  intro: string;                // 2-4 sentences, sets context
  formulaExplainer: string;     // 1-3 paragraphs, MUST match lib/calculators.ts
  sections?: CalculatorSection[];  // Long-form: heading + Prose body
  howToSteps?: HowToStep[];     // Drives HowTo JSON-LD (4-6 steps)
  inlineWidgets?: InlineWidget[]; // BarChart embeds
  faq: FaqItem[];               // 4-8 Q&As targeting PAA
  relatedSlugs: string[];       // Informational; live map in taxonomy.ts
  defaults?: Record<string, number>; // Prefill calculator inputs
}

interface GuideContent {
  type: "guide";
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: GuideSection[];     // heading + Prose body (callouts, tables, bold)
  faq: FaqItem[];
  relatedSlugs: string[];
}

interface SimplePageContent {   // about, methodology, contact, privacy, terms
  type: "simple";
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  body: string[];               // paragraphs
}
```

### Key Files

| File | Purpose |
|------|---------|
| `content/calculators/index.ts` | Exports `allCalculators`, `calculatorBySlug`, `calculatorGroups` (homepage groups) |
| `content/calculators/nhs.ts` | Generates 23 NHS pages from `data/nhs-pay-bands.ts` |
| `content/guides/index.ts` | Exports `allGuides`, `guideBySlug` |
| `content/taxonomy.ts` | `relatedMap` + `relatedFor(slug)` — single source for `RelatedContent` |
| `content/calculatorIcons.ts` | Maps slug → `{icon, featured, stat, caption}` for FeatureCard |

---

## 5. Key Components

| Component | Purpose | Notes |
|-----------|---------|-------|
| `CalculatorForm` | **Only client component** — live inputs, live results | `useState` + `useMemo` → `lib/calculators.calculate()` |
| `CalculatorShell` | Server wrapper: card, grid layout, wraps `CalculatorForm` | Adds heading, styling |
| `Prose` | Parses body strings → paragraphs, **bold**, lists, `:::callout`, `:::table` | Used in `intro`, `formulaExplainer`, `section.body` |
| `BarChart` | Inline SVG bar chart (no deps) | Used via `inlineWidgets` in calculator content |
| `CalculatorShell` | Card wrapper around `CalculatorForm` | |
| `RatesTable` | Reads `data/rates.ts` → styled table | Auto on every calculator/guide page |
| `FaqAccordion` | CSS-only `<details>` accordion | Renders FAQPage JSON-LD |
| `RelatedContent` | Reads `taxonomy.ts` → cards with icon/title/link | Auto on every page |
| `Breadcrumbs` | `<ol>` + `BreadcrumbList` JSON-LD | |
| `JsonLd` | `<script type="application/ld+json">` wrapper | |
| `Header` / `Footer` | Logo, nav, mobile menu (CSS-only), footer columns | |
| `ReviewedByByline` | James Sheridan, CIPP-qualified payroll specialist | |
| `EmbedWidgetTeaser` | Placeholder CTA for future embed feature | |

---

## 6. Content Authoring (KONTENT.md)

**Read `KONTENT.md` first** — it is the style guide for all content.

### Prose Block Syntax (in `intro`, `formulaExplainer`, `section.body`)

| Block | Syntax | Renders |
|-------|--------|---------|
| Paragraph | Blank-line separated | `<p>` |
| Bold | `**text**` | `<strong class="font-semibold text-ink">` |
| Bullet list | Lines starting with `- ` | `<ul><li>` |
| Ordered list | `1. `, `2. ` | `<ol><li>` |
| Callout | `:::callout tip\|info\|warn` ... `:::` | Styled card + icon + label |
| Table | `:::table` \| header \| ... `:::` | Styled table with header row |

**Inline bold** (`**text**`) works inside paragraphs, lists, callouts, table cells.

### Calculator Content Checklist

- [ ] `slug`, `kind` unchanged
- [ ] `title` ≤ 60 chars, includes primary keyword + year/UK
- [ ] `metaDescription` ≤ 160 chars, ends without period
- [ ] `h1` = tool name (not a sentence)
- [ ] `intro` 2-4 sentences, search intent addressed
- [ ] `formulaExplainer` uses `:::callout info` + **bold** formula
- [ ] `howToSteps` 4-6 steps (imperative verb + 1 sentence)
- [ ] `sections` 6-9 H2s, each 60-140 words, last = summary
- [ ] `inlineWidgets` 1-2 bar charts where single input → 3-6 outputs
- [ ] `faq` 4-8 Q&As, concise standalone answers
- [ ] `relatedSlugs` = [] (taxonomy handles links)
- [ ] **Run `npx tsc --noEmit`** — no errors in your file

### Guide Content Checklist

Same as calculator, plus:
- `sections` 6-9 H2s, each body 60-140 words
- Last section = "Summary" / "Key takeaways"
- `howToSteps` optional (4-6 steps for HowTo schema)
- Internal links in prose mention tool names naturally

---

## 6. SEO & Schema

| Feature | Implementation |
|---------|----------------|
| Canonical | `alternates: { canonical: path }` via `pageMetadata()` |
| Open Graph / Twitter | `openGraph`, `twitter` in `pageMetadata()` |
| Organization JSON-LD | Site-wide in `app/layout.tsx` |
| BreadcrumbList | Per-page via `Breadcrumbs` component |
| SoftwareApplication | Calculator pages (`SoftwareApplication` + `Offer`) |
| FAQPage | `guide.faq.length > 0` → `FAQPage` JSON-LD |
| HowTo | `calc.howToSteps?.length > 0` → `HowTo` JSON-LD |
| Sitemap | `app/sitemap.ts` → 66 URLs |
| Robots | `app/robots.ts` → allow all + sitemap |
| Canonical URL | `https://employerscalculators.co.uk/<slug>/` |

**Canonical URL pattern:** `https://employerscalculators.co.uk/<slug>/` (trailing slash enforced by `trailingSlash: true`).

---

## 7. Design System

### Tokens (`app/globals.css` → `@theme`)

```css
--color-ink: #0f172a;        /* primary text */
--color-paper: #fafaf9;      /* page background */
--color-accent: #0e9f6e;     /* results, CTAs, links (on dark) */
--color-accent-strong: #047857; /* buttons, links on light (4.5:1) */
--color-accent-deep: #065f46;   /* hover */
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Rules:**
- No gradients, no decorative color.
- Accent used **only** for interactive elements, results, CTAs.
- Tabular numerals via `font-variant-numeric: tabular-nums` on `.tabular`.
- Focus-visible: 2px accent-strong outline.
- Reduced-motion respected (`@media (prefers-reduced-motion: reduce)`).
- Selection color = accent-strong.

### Components

| Component | Style Pattern |
|-----------|---------------|
| Card | `rounded-xl border border-ink/10 bg-white p-6` (`.card` in `@layer components`) |
| Button (CTA) | `rounded-lg bg-accent-strong px-4 py-2 text-sm font-semibold text-white hover:bg-accent-deep transition-colors` |
| Input | `rounded-lg border border-ink/15 bg-white px-3 py-2.5 tabular focus:border-accent-strong focus:ring-2 focus:ring-accent/20` |
| Link card | `block h-full rounded-xl border border-ink/10 bg-white p-4 hover:border-accent-strong` |

---

## 8. Development Workflow

```bash
# Install
npm install

# Dev server
npm run dev              # http://localhost:3000

# Build (static export → out/)
npm run build            # → out/

# Lint
npm run lint             # ESLint (Next.js config)

# Type-check
npx tsc --noEmit         # Must pass before push

# Test (calculation engine)
npm test                 # node --test lib/calculators.test.ts (10 asserts)

# Serve static export locally
python3 -m http.server 4173 --directory out
# → http://localhost:4173/
```

### Content Editing Flow

1. Edit `content/calculators/<slug>.ts` or `content/guides/<slug>.ts`
2. Run `npx tsc --noEmit` to verify types
3. Run `npm run build` to verify build
4. `git add -A && git commit -m "..." && git push`
3. Vercel auto-deploys on push to `main`

---

## 9. Deployment

| Target | Config |
|--------|--------|
| Vercel | Auto-deploy on push to `main` (GitHub integration) |
| Build command | `npm run build` |
| Output directory | `out/` (handled by Next.js export) |
| Custom domain | `employerscalculators.co.uk` (DNS → Vercel) |
| Preview deployments | Automatic on PRs |

**No CI/CD yaml needed** — Vercel's GitHub integration handles it.

---

## 10. Content Pipeline

### Updating Rates (Annual)

1. Edit `data/rates.ts` with new HMRC figures
2. Update `taxYearLabel` and `lastUpdated`
3. Run `npm run build` → all calculators + RatesTable update automatically

### Adding a New Calculator

1. Add `kind` to `CalculatorKind` in `lib/calculators.ts`
2. Add `calculatorInputs[kind]` array
3. Add `calculate()` case with real formula
4. Create `content/calculators/<slug>.ts` with full `CalculatorContent`
5. Add to `calculatorGroups` in `content/calculators/index.ts`
6. Add entry in `content/calculatorIcons.ts`
7. Add related links in `content/taxonomy.ts`
8. Add `howToSteps` if step-by-step, `inlineWidgets` if chart-worthy
9. `npm run build && git add -A && git commit && git push`

### Adding a Guide

1. Create `content/guides/<slug>.ts` with `GuideContent`
10. Add to `content/guides/index.ts`
11. Add reciprocal links in `content/taxonomy.ts`
12. `npm run build && git push`

### NHS Matrix

- Data: `data/nhs-pay-bands.ts` (England, Scotland and Wales pay scales)
- Generator: `content/calculators/nhs.ts` → 23 pages (`/nhs-band-2-pay-calculator/` … `/nhs-wales-band-8a-pay-calculator/`)
- Scotland/Wales: live; Northern Ireland pending

---

## 11. Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Type check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Test calculator engine | `npm test` |
| Local preview of `out/` | `python3 -m http.server 4173 --directory out` |
| Push to live | `git add -A && git commit -m "..." && git push` |

---

## 12. Important Links

| Resource | URL |
|--------|-----|
| Live site | https://employerscalculators.vercel.app/ |
| GitHub repo | https://github.com/Zreeshah/employerscalculators |
| Vercel project | https://vercel.com/.../employerscalculators |
| HMRC 2026/27 rates | https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 |
| NHS Agenda for Change | https://www.nhsemployers.org/pay-pensions-and-reward/agenda-for-change |
| KONTENT.md | ./KONTENT.md (content style guide) |

---

## 13. Gotchas & Conventions

| Area | Rule |
|------|------|
| Content files | Never hardcode rates — always read from `data/rates.ts` |
| SEO | One canonical URL per concept; no near-duplicate pages |
| Calculator inputs | Use `calculatorInputs[kind]` — single source of truth |
| Bold in Prose | `**text**` only — no `_italic_`, no `__underline__` |
| Callouts | Use sparingly (1-2 per page); `tip`/`info`/`warn` only |
| Tables | Use for 3+ comparable items across 2+ attributes |
| Internal links | Mention tool names in prose; taxonomy handles related cards |
| Rates | All from `data/rates.ts` — single source, updated annually |
| NHS | England, Scotland and Wales live; Northern Ireland pending |
| Token hygiene | Never commit tokens; `.env*` gitignored; rotate after use |

---

## 14. Next Up (Maintenance)

- [ ] Keep PROJECT/README counts in sync with the current 66 content pages
- [ ] Monitor Search Console indexing and sitemap reads after deploys
- [ ] Refresh rates, page copy and screenshots for the next tax-year cycle
- [ ] Add future pay matrices when official data appears
- [ ] Add Open Graph images (`og:image`) per page
- [ ] Set up GitHub Actions for `npm run build && npm test` on PRs

---

*Generated for onboarding — keep this file updated as the project evolves.*