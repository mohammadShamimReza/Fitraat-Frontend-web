import Link from "next/link";
import { navLinks } from "./content";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="rounded-md text-lg font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          Fitraat
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md text-sm font-medium text-slate-700 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/register"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          Start Free Assessment
        </Link>
      </div>
    </header>
  );
}
