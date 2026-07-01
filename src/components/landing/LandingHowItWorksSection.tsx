import { steps } from "./content";

export default function LandingHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="bg-slate-900 py-14 text-white sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2
          id="how-it-works-title"
          className="text-2xl font-bold sm:text-3xl"
        >
          How it works in 4 simple steps
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/20 bg-white/5 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-200">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
