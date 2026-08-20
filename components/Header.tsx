import Link from "next/link";

const NAV = [
  { href: "/#calculators", label: "Calculators" },
  { href: "/#featured", label: "Most used" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center" aria-label="Employers Calculators — Home">
          <img
            src="/logo.jpg"
            alt="Employers Calculators Co.UK"
            width={449}
            height={134}
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <details className="group relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium">
            Menu
          </summary>
          <nav aria-label="Mobile" className="absolute right-0 z-10 mt-2 w-48 rounded-xl border border-ink/10 bg-white p-2 shadow-lg">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm hover:bg-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink/80 hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}