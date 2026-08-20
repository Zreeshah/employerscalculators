import Link from "next/link";
import { ICONS, type IconKey } from "./icons";

interface Props {
  href: string;
  icon: IconKey;
  title: string;
  description: string;
  cta: string;
  stat?: string;
  statCaption?: string;
}

// Sample-style featured card: icon top-left, large ghost stat top-right,
// title + description + arrow CTA bottom. span prop for mosaic layouts.
export default function FeatureCard({
  href,
  icon,
  title,
  description,
  cta,
  stat,
  statCaption,
}: Props) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={href}
      className="group relative block h-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-accent-strong"
    >
      {stat && (
        <div aria-hidden="true" className="pointer-events-none absolute right-2 top-2 select-none text-right leading-none">
          <span className="block text-5xl font-black text-ink/[0.06] tracking-tight sm:text-6xl">
            {stat}
          </span>
          {statCaption && (
            <span className="mt-1 block text-xs font-medium text-ink/[0.18] sm:text-sm">
              {statCaption}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/[0.08] text-accent-strong ring-1 ring-accent/20">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
          {cta}
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}