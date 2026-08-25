import Link from "next/link";
import { coreCalculators } from "@/content/calculators";
import { allGuides } from "@/content/guides";
import { lastUpdated, taxYearLabel } from "@/data/rates";
import { SITE_NAME } from "@/lib/seo";

const COMPANY = [
  { href: "/embed", label: "Embed Our Calculators" },
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-4">
          <img src="/logo.jpg" alt="Employers Calculators Co.UK" width={449} height={134} className="h-12 w-auto" />
          <p className="text-sm leading-relaxed text-ink/60">
            Free UK payroll &amp; employment calculators built on the official 2026/27 HMRC rates.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Calculators</p>
          <ul className="space-y-2">
            {coreCalculators.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-sm text-ink/70 hover:text-ink">
                  {c.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Guides</p>
          <ul className="space-y-2">
            {allGuides.slice(0, 6).map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-sm text-ink/70 hover:text-ink">
                  {g.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-semibold">Company</p>
            <ul className="space-y-2">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink/70 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Legal</p>
            <ul className="space-y-2">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink/70 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-ink/60 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="" width={449} height={134} className="h-7 w-auto" />
            <span>
              Figures shown are for tax year {taxYearLabel}. Last updated: {lastUpdated}.
            </span>
          </div>
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}