import { testimonials } from "./content";

export default function LandingTestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 id="testimonials-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Trusted by people building healthier habits
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <blockquote className="text-sm text-slate-700">"{item.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
