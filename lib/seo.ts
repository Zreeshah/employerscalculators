import type { Metadata } from "next";

export const SITE_URL = "https://employerscalculators.co.uk";
export const SITE_NAME = "Employers Calculators";
export const THEME_COLOR = "#fafaf9";

export interface SeoImage {
  /** Site-root-relative path, e.g. "/images/guides/example-1200.jpg". */
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface SeoFields {
  title: string;
  description: string;
  path: string; // e.g. "/pro-rata-calculator"
  image?: SeoImage;
}

const DEFAULT_OG_IMAGE: SeoImage = {
  url: "/images/og-default.png",
  alt: "Employers Calculators — Free UK Payroll & Employment Calculators 2026/27",
  width: 1200,
  height: 630,
};

export function pageMetadata({ title, description, path, image }: SeoFields): Metadata {
  const img = image ?? DEFAULT_OG_IMAGE;
  const socialImage = [
    {
      url: `${SITE_URL}${img.url}`,
      alt: img.alt,
      width: img.width ?? 1200,
      height: img.height ?? 630,
    },
  ];

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
      images: socialImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage,
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
    logo: `${SITE_URL}/icon.jpeg`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@employerscalculators.co.uk",
      contactType: "customer support",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
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
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  image,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  image?: SeoImage;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    url: `${SITE_URL}${path}`,
    inLanguage: "en-GB",
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE_URL}${image.url}`,
            width: image.width ?? 1200,
            height: image.height ?? 630,
            caption: image.alt,
          },
        }
      : {}),
    ...(dateModified ? { dateModified } : {}),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    reviewedBy: {
      "@type": "Person",
      name: REVIEWER.name,
      jobTitle: REVIEWER.credential,
      description: REVIEWER.description,
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
