import Link from "next/link";

export default function WhatIs() {
  return (
    <section className="py-20 px-6 ">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6">What is Fitraat?</h2>

        {/* Intro paragraph */}
        <p className="text-lg leading-relaxed text-gray-700 mb-12">
          <span className="font-bold">Fitraat</span> is a transformative
          platform that helps individuals and couples overcome modern challenges
          through
          <span className="font-bold"> faith-aligned solutions</span> and
          <span className="font-bold"> science-backed methods</span>.
        </p>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3 text-left">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-3">
              40-Day Success Journey
            </h3>
            <p className="text-gray-600 flex-grow">
              Structured program to recover from porn addiction using behavioral
              science, neuroscience, and Islamic guidance.
            </p>
            <Link
              href="/programs/porn-recovary"
              className="mt-5 inline-block  bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-center"
            >
              Start
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-3">
              Kegel Exercise Program
            </h3>
            <p className="text-gray-600 flex-grow">
              6-month program to improve pelvic strength, confidence, and sexual
              well-being.
            </p>
            <Link
              href="/programs/kegel-exercise"
              className="mt-5 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-center"
            >
              Start
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-3">
              Pre-Marriage Solution
            </h3>
            <p className="text-gray-600 flex-grow">
              Develop emotional maturity, relationship skills, and Islamic
              character for a strong, fulfilling marriage.
            </p>
            <Link
              href="/programs/pre-marriage"
              className="mt-5 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-center"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
