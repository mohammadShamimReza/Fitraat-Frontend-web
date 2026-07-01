"use client";

import { faqs } from "./content";

export default function LandingFaqSection() {
  const handleToggle = (question: string, isOpen: boolean) => {
    if (!isOpen || typeof window === "undefined") {
      return;
    }

    const analyticsWindow = window as Window & {
      dataLayer?: Array<Record<string, string>>;
    };

    analyticsWindow.dataLayer?.push({
      event: "faq_expand",
      question,
    });
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <h2 id="faq-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              onToggle={(event) =>
                handleToggle(item.question, event.currentTarget.open)
              }
              data-analytics-event="faq_expand"
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <summary className="cursor-pointer list-none rounded-md pr-8 text-base font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
