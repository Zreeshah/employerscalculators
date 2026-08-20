import Link from "next/link";
import { calculatorBySlug } from "@/content/calculators";
import { guideBySlug } from "@/content/guides";
import { relatedFor } from "@/content/taxonomy";

// Data-driven: pulls related calculators + guides from the central taxonomy
export default function RelatedContent({ slug }: { slug: string }) {
  const links = relatedFor(slug)
    .map((related) => {
      const calc = calculatorBySlug.get(related);
      if (calc) return { href: `/${calc.slug}`, label: calc.h1, kind: "Calculator" };
      const guide = guideBySlug.get(related);
      if (guide) return { href: `/guides/${guide.slug}`, label: guide.h1, kind: "Guide" };
      return null;
    })
    .filter((x): x is { href: string; label: string; kind: string } => x !== null);

  if (links.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-lg font-semibold">
        Related calculators &amp; guides
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="card block h-full p-4 text-sm font-medium transition-colors hover:border-accent-strong"
            >
              <span className="text-xs font-normal uppercase tracking-wide text-accent-strong">
                {link.kind}
              </span>
              <span className="mt-1 block">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
