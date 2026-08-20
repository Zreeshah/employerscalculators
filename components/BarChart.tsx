// Inline SVG bar chart — no chart library, no client JS.
// Renders a series of values with labels and a value per bar.

interface BarDatum {
  label: string;
  value: number;
  caption?: string;
}

interface BarChartProps {
  title?: string;
  unit?: string;
  data: BarDatum[];
  height?: number;
  formatValue?: (n: number) => string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export default function BarChart({
  title,
  unit,
  data,
  height = 240,
  formatValue = fmt,
}: BarChartProps) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 0);
  const safeMax = max > 0 ? max : 1;
  const labelHeight = 50;
  const valueHeight = 30;
  const paddingTop = 20;
  const paddingX = 16;
  const barAreaHeight = height - labelHeight - valueHeight - paddingTop;
  const width = 600;
  const barWidth = (width - paddingX * 2) / data.length - 14;

  return (
    <figure
      aria-label={title ?? "Bar chart"}
      className="not-prose my-2 rounded-xl border border-ink/10 bg-white p-5"
    >
      {title && (
        <figcaption className="mb-1 text-sm font-semibold text-ink">{title}</figcaption>
      )}
      {unit && <p className="mb-3 text-xs text-ink/60">{unit}</p>}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block w-full"
        role="img"
        aria-label={title}
      >
        {/* Baseline */}
        <line
          x1={paddingX}
          y1={paddingTop + barAreaHeight}
          x2={width - paddingX}
          y2={paddingTop + barAreaHeight}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth={1}
        />
        {data.map((d, i) => {
          const x = paddingX + i * ((width - paddingX * 2) / data.length) + 7;
          const barH = (d.value / safeMax) * barAreaHeight;
          const y = paddingTop + barAreaHeight - barH;
          return (
            <g key={i}>
              {/* Value label above bar */}
              <text
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="currentColor"
                className="tabular fill-ink"
              >
                {formatValue(d.value)}
              </text>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={4}
                className="fill-accent-strong"
              />
              {/* Label below */}
              <text
                x={x + barWidth / 2}
                y={paddingTop + barAreaHeight + 18}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="currentColor"
                className="fill-ink"
              >
                {d.label}
              </text>
              {d.caption && (
                <text
                  x={x + barWidth / 2}
                  y={paddingTop + barAreaHeight + 34}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  className="fill-ink/60"
                >
                  {d.caption}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
