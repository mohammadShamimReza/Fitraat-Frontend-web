import { painPoints } from "./content";

export default function LandingProblemSection() {
  return (
    <section
      aria-labelledby="problem-title"
      className="border-y border-slate-200 bg-slate-50/80 py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2
          id="problem-title"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          If this feels familiar, you are not alone
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Fitraat helps you move forward with practical steps, not overwhelm.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {painPoints.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
