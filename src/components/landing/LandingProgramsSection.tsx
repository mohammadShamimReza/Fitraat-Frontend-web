import Image from "next/image";
import Link from "next/link";
import { programs } from "./content";

export default function LandingProgramsSection() {
  return (
    <section id="programs" aria-labelledby="programs-title" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 id="programs-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          One platform, 3 transformation programs
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Choose the path that fits your current priority while keeping your
          momentum in one place.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.route}
              data-analytics-event="program_card_click"
              data-analytics-program={program.id}
              className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              <div className="relative h-48 overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{program.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{program.summary}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">{program.outcome}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
