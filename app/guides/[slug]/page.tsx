import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import RelatedContent from "@/components/RelatedContent";
import ReviewedByByline from "@/components/ReviewedByByline";
import RatesTable from "@/components/RatesTable";
import { allGuides, guideBySlug } from "@/content/guides";
import { PENDING } from "@/content/types";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }));
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.metaDescription || PENDING,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Guides", path: "/guides" },
          { name: guide.h1, path: `/guides/${guide.slug}` },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{guide.h1}</h1>
        <ReviewedByByline />
      </header>

      <div className="text-lg leading-relaxed">
        <Prose text={guide.intro} />
      </div>

      {guide.sections.length > 2 && (
        <nav aria-label="Contents" className="card p-5">
          <p className="text-sm font-semibold">On this page</p>
          <ul className="mt-3 space-y-2">
            {guide.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="text-sm text-accent-strong hover:underline">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {guide.sections.map((section) => (
        <section key={section.heading} aria-labelledby={slugify(section.heading)}>
          <h2 id={slugify(section.heading)} className="text-xl font-semibold">
            {section.heading}
          </h2>
          <div className="mt-3">
            <Prose text={section.body} />
          </div>
        </section>
      ))}

      <RatesTable />
      <FaqAccordion items={guide.faq} />
      <RelatedContent slug={guide.slug} />

      {guide.faq.length > 0 && <JsonLd data={faqPageJsonLd(guide.faq)} />}
    </div>
  );
}
