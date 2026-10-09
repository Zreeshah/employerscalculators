import type { MetadataRoute } from "next";
import { calculatorBySlug } from "@/content/calculators";
import { allGuides } from "@/content/guides";
import { simplePages } from "@/content/pages";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// The NHS calculator matrix received source-level verification and visible
// primary-source citations on 9 October 2026.
const nhsContentUpdatedAt = new Date("2026-10-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/guides/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/embed/`, changeFrequency: "monthly", priority: 0.6 },
    ...simplePages.map((p) => ({
      url: `${SITE_URL}/${p.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return [
    ...staticRoutes,
    ...[...calculatorBySlug.entries()].map(([slug, calculator]) => ({
      url: `${SITE_URL}/${slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      ...(calculator.nhsPreset ? { lastModified: nhsContentUpdatedAt } : {}),
    })),
    ...allGuides.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
