import Link from "next/link";

// Stub for the future accountant-embed feature — placeholder CTA only
export default function EmbedWidgetTeaser() {
  return (
    <section className="rounded-xl border border-dashed border-ink/20 bg-white p-6">
      <h2 className="text-lg font-semibold">Embed this calculator</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">
        Accountants and payroll bureaus: add this calculator to your own website — free, with
        attribution. Embeds are in early access.
      </p>
      <Link
        href="/contact"
        className="mt-4 inline-block rounded-lg bg-accent-strong px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
      >
        Register interest
      </Link>
    </section>
  );
}
