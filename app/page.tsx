import type { Metadata } from "next";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { ICONS, type IconKey } from "@/components/icons";
import { calculatorBySlug, calculatorGroups } from "@/content/calculators";
import { calculatorIconMap } from "@/content/calculatorIcons";
import { allGuides } from "@/content/guides";
import { pageMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `Free UK Payroll & Employment Calculators (2026/27) — ${SITE_NAME}`,
  description:
    "Free UK payroll calculators built on the official 2026/27 HMRC rates: pro rata pay, employer NI, SSP, SMP, pensions, IR35 and NHS pay bands. Instant results, no sign-up.",
  path: "/",
});

const trustPoints = [
  "Built on official 2026/27 HMRC rates",
  "Every figure sourced to GOV.UK",
  "Free forever — no sign-up, no email",
];

// Six featured calculators that surface as big cards on the homepage
const featuredSlugs = Object.entries(calculatorIconMap)
  .filter(([, v]) => v.featured)
  .map(([slug]) => slug)
  .filter((slug) => calculatorBySlug.has(slug));

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniCalculatorCard({ slug }: { slug: string }) {
  const calc = calculatorBySlug.get(slug);
  if (!calc) return null;
  const meta = calculatorIconMap[slug];
  const Icon = meta ? ICONS[meta.icon] : null;
  return (
    <li>
      <Link
        href={`/${slug}`}
        className="card group flex h-full items-start gap-3 p-4 transition-colors hover:border-accent-strong"
      >
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/[0.08] text-accent-strong ring-1 ring-accent/20">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <span className="flex-1">
          <span className="block text-sm font-medium">{calc.h1}</span>
          <span className="mt-1 block text-sm text-ink/70 line-clamp-2">{calc.metaDescription}</span>
        </span>
      </Link>
    </li>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* HERO */}
      <section className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">
            UK tax year 2026/27
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Free UK payroll &amp; employment calculators
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Fast, accurate calculators for employers, payroll teams and employees — pro rata pay,
            employer National Insurance, statutory sick and maternity pay, pensions, IR35 and NHS pay
            bands. Every calculator runs on the official 2026/27 HMRC rates and thresholds.
          </p>
          <ul className="mt-6 space-y-2.5">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-ink/80">
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#featured"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-strong px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              See the most used
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
            >
              Our methodology
            </Link>
          </div>
        </div>

        {/* Logo hero panel */}
        <div className="mx-auto rounded-3xl border border-ink/10 bg-white p-8 shadow-sm md:mx-0 md:p-10">
          <img
            src="/logo.jpg"
            alt="Employers Calculators Co.UK"
            width={449}
            height={134}
            className="h-auto w-full max-w-[360px]"
          />
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6 text-center">
            <div>
              <p className="text-2xl font-bold tabular">29+</p>
              <p className="text-xs text-ink/60">calculators</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular">9</p>
              <p className="text-xs text-ink/60">in-depth guides</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular">2026/27</p>
              <p className="text-xs text-ink/60">HMRC rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOST USED */}
      <section id="featured" aria-labelledby="featured-heading" className="mt-20">
        <div className="text-center">
          <h2 id="featured-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Most Used Calculators
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink/65">
            The tools UK employers reach for most. Updated for 2026/27.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSlugs.map((slug) => {
            const calc = calculatorBySlug.get(slug);
            const meta = calculatorIconMap[slug];
            if (!calc || !meta) return null;
            return (
              <FeatureCard
                key={slug}
                href={`/${slug}`}
                icon={meta.icon}
                title={calc.h1}
                description={calc.metaDescription}
                cta="Calculate"
                stat={meta.stat}
                statCaption={meta.statCaption}
              />
            );
          })}
        </div>
      </section>

      {/* ALL CALCULATORS (grouped) */}
      <div id="calculators" className="mt-20 space-y-14">
        {calculatorGroups.map((group) => (
          <section key={group.title} aria-labelledby={`group-${group.title.replace(/\s+/g, "-")}`}>
            <h2 id={`group-${group.title.replace(/\s+/g, "-")}`} className="text-2xl font-semibold">
              {group.title}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug) => (
                <MiniCalculatorCard key={slug} slug={slug} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* GUIDES */}
      <section id="guides" aria-labelledby="guides-heading" className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 id="guides-heading" className="text-2xl font-semibold">
            Payroll guides
          </h2>
          <Link href="/guides" className="text-sm font-medium text-accent-strong hover:underline">
            All guides
          </Link>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allGuides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="card block h-full p-4 font-medium transition-colors hover:border-accent-strong"
              >
                {g.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-20 max-w-2xl text-sm leading-relaxed text-ink/70">
        {SITE_NAME} exists to make UK payroll maths transparent: every rate and formula is sourced
        to GOV.UK and reviewed each tax year. See our methodology for sources and update policy.
      </p>
    </div>
  );
}