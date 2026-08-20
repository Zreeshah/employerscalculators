import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-ink/70">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-accent-strong px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
      >
        Back to all calculators
      </Link>
    </div>
  );
}
