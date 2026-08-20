import type { Metadata } from "next";
import Link from "next/link";
import { allGuides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "UK Payroll & Employment Guides (2026/27)",
  description:
    "Plain-English UK payroll guides for 2026/27: employer NI rates, statutory sick pay, holiday entitlement, salary sacrifice pensions and the true cost of employing someone.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold sm:text-4xl">
        UK payroll &amp; employment guides
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
        In-depth guides behind the calculators — the 2026/27 rates, the rules, and worked examples,
        all sourced to GOV.UK.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allGuides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="block h-full rounded-xl border border-ink/10 bg-white p-4 font-medium hover:border-accent"
            >
              {g.h1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
