import { programs } from "./content";

export default function LandingProgramPreviewSection() {
  return (
    <section aria-labelledby="preview-title" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 id="preview-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Program preview: what a sample day looks like
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {programs.map((program) => (
            <article key={program.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">{program.name}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {program.sampleDay.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
