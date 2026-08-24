import type { Metadata } from "next";

export const SITE_URL = "https://employerscalculators.co.uk";
export const SITE_NAME = "Employers Calculators";
export const THEME_COLOR = "#fafaf9";

interface SeoFields {
  title: string;
  description: string;
  path: string; // e.g. "/pro-rata-calculator"
}

export function pageMetadata({ title, description, path }: SeoFields): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

// Reviewer identity for E-E-A-T structured data.
// Must match the ReviewedByByline component defaults.
export const REVIEWER = {
  name: "James Sheridan",
  credential: "CIPP-qualified payroll specialist",
  description: "Payroll compliance specialist with over 10 years\u2019 experience in UK employer obligations, PAYE, National Insurance and statutory pay calculations.",
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function softwareAppJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: REVIEWER.name,
        description: REVIEWER.description,
      },
    },
  };
}

export function faqPageJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function howToJsonLd({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: `${SITE_URL}${path}`,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text.replace(/\*\*([^*]+)\*\*/g, "$1"),
    })),
  };
}
