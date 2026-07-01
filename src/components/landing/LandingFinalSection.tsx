import Link from "next/link";

export default function LandingFinalSection() {
  return (
    <>
      <section aria-labelledby="final-cta-title" className="bg-slate-900 py-14 text-white sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
          <h2 id="final-cta-title" className="text-2xl font-bold sm:text-3xl">
            Ready to take your next confident step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Start with your free assessment and choose the program that matches
            your immediate goal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="w-full rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/programs"
              className="w-full rounded-md border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Fitraat. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privecy" className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/programs" className="hover:text-slate-900">
              Programs
            </Link>
            <Link href="/register" className="hover:text-slate-900">
              Start
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <Link
          href="/register"
          data-analytics-event="hero_cta_click"
          data-analytics-label="Start Free Assessment"
          className="block rounded-md bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          Start Free Assessment
        </Link>
      </div>
    </>
  );
}
