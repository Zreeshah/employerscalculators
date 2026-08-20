import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BarChart from "@/components/BarChart";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorShell from "@/components/CalculatorShell";
import EmbedWidgetTeaser from "@/components/EmbedWidgetTeaser";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { renderInline } from "@/components/Prose";
import Prose from "@/components/Prose";
import RelatedContent from "@/components/RelatedContent";
import ReviewedByByline from "@/components/ReviewedByByline";
import RatesTable from "@/components/RatesTable";
import { calculatorBySlug } from "@/content/calculators";
import { simplePages, simplePageBySlug } from "@/content/pages";
import { PENDING } from "@/content/types";
import { faqPageJsonLd, howToJsonLd, pageMetadata, softwareAppJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...calculatorBySlug.keys(), ...simplePages.map((p) => p.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const calc = calculatorBySlug.get(slug);
  const page = simplePageBySlug.get(slug);
  const entry = calc ?? page;
  if (!entry) return {};
  return pageMetadata({
    title: entry.title,
    description: entry.metaDescription || PENDING,
    path: `/${entry.slug}`,
  });
}

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const calc = calculatorBySlug.get(slug);
  const simple = simplePageBySlug.get(slug);
  if (!calc && !simple) notFound();

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (calc) {
    const sections = calc.sections ?? [];
    const hasHowTo = !!calc.howToSteps && calc.howToSteps.length > 0;
    return (
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-8">
        <Breadcrumbs items={[{ name: calc.h1, path: `/${calc.slug}` }]} />

        <header className="space-y-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">{calc.h1}</h1>
          <ReviewedByByline />
        </header>

        {/* Calculator first, above the fold and above any prose */}
        <CalculatorShell kind={calc.kind} defaults={calc.defaults} />

        <div className="text-lg leading-relaxed">
          <Prose text={calc.intro} />
        </div>

        {sections.length > 2 && (
          <nav aria-label="Contents" className="card p-5">
            <p className="text-sm font-semibold">On this page</p>
            <ul className="mt-3 space-y-2">
              {sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="text-sm text-accent-strong hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {hasHowTo && (
          <section aria-labelledby="howto-heading" className="card p-6">
            <h2 id="howto-heading" className="text-xl font-semibold">
              How to use this calculator
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-ink/80">
              {calc.howToSteps!.map((step) => (
                <li key={step.name}>
                  <span className="font-semibold text-ink">{step.name}.</span>{" "}
                  <span>{renderInline(step.text)}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section aria-labelledby="method-heading">
          <h2 id="method-heading" className="text-xl font-semibold">
            How it is calculated
          </h2>
          <div className="mt-3">
            <Prose text={calc.formulaExplainer} />
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.heading} aria-labelledby={slugify(section.heading)}>
            <h2 id={slugify(section.heading)} className="text-xl font-semibold">
              {section.heading}
            </h2>
            <div className="mt-3">
              <Prose text={section.body} />
            </div>
            {calc.inlineWidgets
              ?.filter((w) => w.afterSectionHeading === section.heading)
              .map((w, i) => (
                <BarChart
                  key={i}
                  title={w.title}
                  unit={w.unit}
                  data={w.data}
                />
              ))}
          </section>
        ))}

        <RatesTable />
        <FaqAccordion items={calc.faq} />
        <EmbedWidgetTeaser />
        <RelatedContent slug={calc.slug} />

        <JsonLd data={softwareAppJsonLd({ name: calc.title, description: calc.metaDescription || PENDING, path: `/${calc.slug}` })} />
        {calc.faq.length > 0 && <JsonLd data={faqPageJsonLd(calc.faq)} />}
        {hasHowTo && (
          <JsonLd
            data={howToJsonLd({
              name: `How to calculate a pro rata salary with the ${calc.h1}`,
              description: calc.metaDescription || PENDING,
              path: `/${calc.slug}`,
              steps: calc.howToSteps!,
            })}
          />
        )}
      </div>
    );
  }

  const page = simple;
  if (!page) notFound();
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <Breadcrumbs items={[{ name: page.h1, path: `/${page.slug}` }]} />
      <h1 className="text-3xl font-semibold tracking-tight">{page.h1}</h1>
      <p className="leading-relaxed text-ink/80">{page.intro}</p>
      {page.body.map((paragraph, i) => (
        <p key={i} className="leading-relaxed text-ink/80">
          {paragraph}
        </p>
      ))}
      {page.slug !== "contact" && page.slug !== "privacy-policy" && page.slug !== "terms" && (
        <RelatedContent slug={page.slug} />
      )}
    </div>
  );
}
