import Link from "next/link";

export default function LandingGetStartedSection() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-title"
      className="py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:p-8">
          <h2
            id="get-started-title"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Start your journey with a free assessment.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Build momentum with daily guidance, clear structure, and progress
            tracking inside one platform.
          </p>

          <div className="mt-6 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">Porn Recovery Program</p>
              <p className="mt-2">Guided daily recovery plan</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">Kegel Exercise Program</p>
              <p className="mt-2">Structured routine and consistency support</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">
                Parents & Child Digital Safety Course
              </p>
              <p className="mt-2">Practical family digital safety framework</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              data-analytics-event="hero_cta_click"
              data-analytics-label="Start Free Assessment"
              className="rounded-md bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/programs"
              className="rounded-md border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
