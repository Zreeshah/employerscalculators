import type { FaqItem } from "@/content/types";

// CSS-only accordion (details/summary) — no client JS
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="card p-6">
      <h2 id="faq-heading" className="text-lg font-semibold">
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-ink/10">
        {items.map((item) => (
          <details key={item.question} className="group py-3">
            <summary className="cursor-pointer list-none font-medium">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span aria-hidden="true" className="text-ink/40 group-open:rotate-45 transition-transform">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-ink/80">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
