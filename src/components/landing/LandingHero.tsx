import Link from "next/link";
import { trustChips } from "./content";

export default function LandingHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
          Growth with structure, clarity, and care
        </p>
        <h1
          id="hero-title"
          className="text-3xl font-bold leading-tight text-slate-900 sm:text-5xl"
        >
          Rebuild confidence with guided porn recovery, kegel training, and
          family digital safety support.
        </h1>
        <p className="mt-5 text-base text-slate-600 sm:text-lg">
          One platform for three life-improving programs. Start with a free
          assessment, follow proven daily steps, and track real progress.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            data-analytics-event="hero_cta_click"
            data-analytics-label="Start Free Assessment"
            className="w-full rounded-md bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:w-auto"
          >
            Start Free Assessment
          </Link>
          <Link
            href="/programs"
            data-analytics-event="hero_cta_click"
            data-analytics-label="Explore Programs"
            className="w-full rounded-md border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:w-auto"
          >
            Explore Programs
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="Trust highlights">
          {trustChips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 sm:text-sm"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
