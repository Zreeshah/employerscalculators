import type { CalculatorKind } from "@/lib/calculators";

export const PENDING = "Free UK payroll and employment calculators for 2026/27, built on official HMRC rates.";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CalculatorSection {
  heading: string;
  body: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface BarChartDatum {
  label: string;
  value: number;
  caption?: string;
}

export interface InlineBarChart {
  type: "barChart";
  afterSectionHeading: string;
  title: string;
  unit?: string;
  data: BarChartDatum[];
}

export interface NhsCalculatorPreset {
  nation: "england" | "scotland" | "wales";
  band: string;
  stepIndex?: number;
  hoursPerWeek?: number;
}

export interface CalculatorContent {
  type: "calculator";
  slug: string;
  kind: CalculatorKind;
  title: string; // meta title
  metaDescription: string;
  h1: string;
  intro: string;
  formulaExplainer: string;
  sections?: CalculatorSection[];
  howToSteps?: HowToStep[];
  inlineWidgets?: InlineBarChart[];
  faq: FaqItem[];
  // Informational only — the live related-links map is content/taxonomy.ts
  relatedSlugs: string[];
  defaults?: Record<string, number>;
  nhsPreset?: NhsCalculatorPreset;
}

/**
 * Featured image for a guide. `file` is the shared basename in
 * /public/images/guides; the FeaturedImage component appends the width and
 * format, so every guide ships AVIF, WebP and JPEG at 400/800/1200px.
 */
export interface FeaturedImage {
  file: string;
  alt: string;
}

export interface GuideContent {
  type: "guide";
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  image?: FeaturedImage;
  sections: { heading: string; body: string }[];
  faq: FaqItem[];
  relatedSlugs: string[];
}

export interface SimplePageContent {
  type: "simple";
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  body: string[];
}

export const calculator = (c: CalculatorContent): CalculatorContent => c;
export const guide = (g: GuideContent): GuideContent => g;
export const simplePage = (p: SimplePageContent): SimplePageContent => p;
