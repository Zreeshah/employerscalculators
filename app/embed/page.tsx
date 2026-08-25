import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, faqPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free Embeddable UK Payroll Calculators (2026/27)",
  description:
    "Embed any Employers Calculators tool on your website free — pro rata pay, employer NI, SSP, SMP, take-home pay and more. Copy-paste iframe snippets, attribution required.",
  path: "/embed",
});

const EMBEDDABLE = [
  { slug: "pro-rata-calculator", label: "Pro Rata Calculator", height: 900 },
  { slug: "employer-ni-calculator", label: "Employers NI Calculator", height: 950 },
  { slug: "take-home-pay-calculator", label: "Take-Home Pay Calculator", height: 1000 },
  { slug: "ssp-calculator", label: "SSP Calculator", height: 850 },
  { slug: "smp-calculator", label: "SMP Calculator", height: 950 },
  { slug: "holiday-entitlement-calculator", label: "Holiday Entitlement Calculator", height: 1000 },
  { slug: "workplace-pension-calculator", label: "Workplace Pension Calculator", height: 950 },
  { slug: "bradford-factor-calculator", label: "Bradford Factor Calculator", height: 800 },
];

const FAQ = [
  {
    question: "Is it really free to embed these calculators?",
    answer:
      "Yes. Embedding is free for commercial and non-commercial websites. The only condition is that you keep the attribution link below the calculator so your visitors can find the source.",
  },
  {
    question: "Do the embedded calculators stay up to date?",
    answer:
      "Always. The iframe loads the live version of each tool, so every rate and threshold updates automatically when HMRC figures change for the new tax year. You never need to update your page.",
  },
  {
    question: "Will an embed slow my website down?",
    answer:
      "No. Each widget runs in its own iframe with lazy loading, so it does not load until a visitor scrolls near it, and none of our code affects your page's scripts or styles.",
  },
  {
    question: "Can I remove or change the attribution link?",
    answer:
      "No. Attribution is what keeps the embed free. If you need a white-label licence for an accountant practice, payroll bureau or software product, contact us and we will quote for it.",
  },
];

function snippet(slug: string, height: number) {
  return `<iframe src="${SITE_URL}/${slug}/" title="Employers Calculators" width="100%" height="${height}" style="border:0;border-radius:12px" loading="lazy"></iframe>
<p style="font-size:12px;color:#555">Calculator by <a href="${SITE_URL}/">Employers Calculators</a></p>`;
}

export default function EmbedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold sm:text-4xl">
        Free embeddable UK payroll calculators
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
        Add any of our 2026/27 HMRC-rate calculators to your own website in under a minute.
        Copy, paste, done — no sign-up, no API keys, no maintenance. All we ask is a small
        attribution link under the widget.
      </p>

      <section className="mt-10 rounded-xl border border-ink/10 bg-white p-6">
        <h2 className="text-xl font-semibold">How to embed a calculator</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
          <li>Pick a calculator below and copy its snippet.</li>
          <li>Paste it into your page&rsquo;s HTML where you want the tool to appear.</li>
          <li>Adjust the <code>height</code> if your layout needs more or less room.</li>
        </ol>
      </section>

      <h2 className="mt-14 text-2xl font-semibold">Ready-to-paste snippets</h2>
      <div className="mt-6 space-y-8">
        {EMBEDDABLE.map(({ slug, label, height }) => (
          <div key={slug} id={slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{label}</h3>
              <Link href={`/${slug}/`} className="text-sm font-medium text-accent-strong hover:underline">
                Preview the full calculator &rarr;
              </Link>
            </div>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-ink/15 bg-paper p-4 text-xs leading-relaxed">
              <code>{snippet(slug, height)}</code>
            </pre>
          </div>
        ))}
      </div>

      <section className="mt-14 rounded-xl border border-ink/10 bg-white p-6">
        <h2 className="text-xl font-semibold">Embed terms</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
          <li>Embedding is free for business, charity and personal websites.</li>
          <li>Keep the attribution line beneath the widget exactly as provided.</li>
          <li>Don&rsquo;t present the calculators as official HMRC tools or imply government endorsement.</li>
          <li>Results are estimates based on published 2026/27 rates — see our{" "}
            <Link href="/terms/" className="text-accent-strong hover:underline">terms of use</Link>.
          </li>
          <li>White-label licensing (no attribution, custom branding) is available on request via the{" "}
            <Link href="/contact/" className="text-accent-strong hover:underline">contact page</Link>.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Embed FAQ</h2>
        <dl className="mt-6 space-y-6">
          {FAQ.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold">{f.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink/70">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <JsonLd data={faqPageJsonLd(FAQ)} />
    </div>
  );
}
