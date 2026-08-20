import type { ReactNode } from "react";

// Renders plain-string content bodies with structured blocks.
// Recognised block syntax (HTML-free):
//   Paragraphs:           separated by blank lines
//   Bulleted list:        consecutive lines starting with "- "
//   Numbered list:        consecutive lines starting with "1. " / "2. " etc
//   Bold:                 **text** (inline)
//   Table:                :::table ... rows of | a | b | c | ... ::::
//   Callout:              :::callout [tip|warn|info]   body   ::::
//
// Anything else is rendered as a normal paragraph.

type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "callout"; variant: "tip" | "warn" | "info"; body: string }
  | { kind: "table"; rows: string[][] };

function renderInline(text: string): ReactNode {
  // Replace **bold** with <strong>
  const parts: ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <strong key={`b${key++}`} className="font-semibold text-ink">
        {match[1]}
      </strong>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export { renderInline };

function parseBlocks(body: string): Block[] {
  const lines = body.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Callout
    if (trimmed.startsWith(":::callout")) {
      const variant = (trimmed.split(/\s+/)[1] ?? "info") as "tip" | "warn" | "info";
      i++;
      const bodyLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== ":::") {
        bodyLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::
      blocks.push({ kind: "callout", variant, body: bodyLines.join("\n").trim() });
      continue;
    }

    // Table
    if (trimmed === ":::table") {
      i++;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() !== ":::") {
        const rowLine = lines[i].trim();
        if (rowLine.startsWith("|")) {
          const cells = rowLine
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((c) => c.trim());
          // Skip the separator row |---|---|
          if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        }
        i++;
      }
      i++; // skip closing :::
      if (rows.length) blocks.push({ kind: "table", rows });
      continue;
    }

    // Unordered list
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    // Blank line
    if (trimmed === "") {
      i++;
      continue;
    }

    // Paragraph: collect consecutive non-blank, non-block-starter lines
    const paraLines: string[] = [line];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      const t = next.trim();
      if (t === "" || t.startsWith("- ") || /^d+\.\s/.test(t) || t.startsWith(":::") || t.startsWith("|")) break;
      paraLines.push(next);
      i++;
    }
    blocks.push({ kind: "p", text: paraLines.join(" ").trim() });
  }
  return blocks;
}

const calloutStyles: Record<string, { wrap: string; icon: React.ReactNode; label: string }> = {
  tip: {
    wrap: "border-accent-strong/30 bg-accent/[0.06]",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-accent-strong" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M8 13c0-2.2 4-2.2 4 0M7 8.5c.7-.6 1.8-1 3-1s2.3.4 3 1" />
      </svg>
    ),
    label: "Tip",
  },
  info: {
    wrap: "border-ink/15 bg-ink/[0.04]",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 9v5M10 6h.01" />
      </svg>
    ),
    label: "Note",
  },
  warn: {
    wrap: "border-amber-300 bg-amber-50",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L18 17H2L10 2z" />
        <path d="M10 8v4M10 14h.01" />
      </svg>
    ),
    label: "Watch out",
  },
};

function renderCallout(block: Block & { kind: "callout" }) {
  const style = calloutStyles[block.variant] ?? calloutStyles.info;
  const subBlocks = parseBlocks(block.body);
  return (
    <aside className={`not-prose my-2 flex gap-3 rounded-xl border p-4 ${style.wrap}`}>
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <div className="flex-1 text-sm leading-relaxed text-ink/85">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {style.label}
        </p>
        <div className="space-y-3">
          {subBlocks.map((sub, idx) => {
            if (sub.kind === "p") return <p key={idx}>{renderInline(sub.text)}</p>;
            if (sub.kind === "ul")
              return (
                <ul key={idx} className="list-disc space-y-1.5 pl-5">
                  {sub.items.map((it, j) => (
                    <li key={j}>{renderInline(it)}</li>
                  ))}
                </ul>
              );
            if (sub.kind === "ol")
              return (
                <ol key={idx} className="list-decimal space-y-1.5 pl-5">
                  {sub.items.map((it, j) => (
                    <li key={j}>{renderInline(it)}</li>
                  ))}
                </ol>
              );
            if (sub.kind === "callout") return renderCallout(sub);
            if (sub.kind === "table") return renderTable(sub.rows);
            return null;
          })}
        </div>
      </div>
    </aside>
  );
}

function renderTable(rows: string[][]) {
  const [header, ...body] = rows;
  return (
    <div className="not-prose my-2 overflow-x-auto rounded-xl border border-ink/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-ink/[0.04] text-left">
            {header.map((cell, i) => (
              <th key={i} className="px-4 py-2.5 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-ink/5 last:border-b-0 even:bg-ink/[0.02]">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-ink/85">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Prose({ text }: { text: string }) {
  const blocks = parseBlocks(text);
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} className="leading-relaxed text-ink/80">
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 leading-relaxed text-ink/80">
                {block.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5 leading-relaxed text-ink/80">
                {block.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ol>
            );
          case "callout":
            return <div key={i}>{renderCallout(block)}</div>;
          case "table":
            return <div key={i}>{renderTable(block.rows)}</div>;
        }
      })}
    </div>
  );
}
