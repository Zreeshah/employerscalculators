import type { SourceLink } from "@/content/types";

export default function OfficialSources({ sources }: { sources: SourceLink[] }) {
  if (sources.length === 0) return null;

  return (
    <aside aria-labelledby="official-sources-heading" className="card border-accent-strong/20 bg-accent/[0.04] p-5">
      <h2 id="official-sources-heading" className="text-lg font-semibold">
        Official sources used for this calculator
      </h2>
      <p className="mt-1 text-sm text-ink/75">
        We check the published pay scale and terms below before updating the figures. Your contract and local payroll team remain the source for your individual pay.
      </p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-strong underline decoration-accent-strong/30 underline-offset-2 hover:decoration-accent-strong"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
