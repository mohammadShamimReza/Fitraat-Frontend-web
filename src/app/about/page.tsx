function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl shadow-lg border bg-white">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default function Page() {
  const sections = [
    {
      title: "Who We Are",
      content: (
        <p className="text-gray-600">
          Fitraat is designed for Muslims seeking mental clarity, emotional
          stability, and freedom from harmful habits. Our focus is to help
          individuals return to their pure, natural state — their <i>fitrah</i>{" "}
          — through guided programs and practical tools.
        </p>
      ),
    },
    {
      title: "Our Mission",
      content: (
        <p className="text-gray-600">
          Our mission is to empower individuals to overcome modern-day
          challenges like addiction, emotional imbalance, and relationship
          struggles by offering structured, Islamic-centered solutions.
        </p>
      ),
    },
    {
      title: "Our Approach",
      content: (
        <p className="text-gray-600">
          Fitraat integrates neuroscience, behavioral science, Islamic
          knowledge, and actionable daily routines. Every program is designed to
          help users build discipline, gain clarity, and experience real
          transformation.
        </p>
      ),
    },
    {
      title: "What We Offer",
      content: (
        <ul className="list-disc pl-5 text-gray-700">
          <li>40-Day Porn Addiction Recovery Program</li>
          <li>Pre-Marriage Solution Program</li>
          <li>Kegel Exercise Program (6 months)</li>
          <li>Daily tasks, reminders, and motivational guidance</li>
        </ul>
      ),
    },
    {
      title: "Our Values",
      content: (
        <p className="text-gray-600">
          We believe in sincerity, purity of intention, personal growth,
          discipline, emotional awareness, and living in harmony with the
          teachings of Islam. These values shape every program at Fitraat.
        </p>
      ),
    },
    {
      title: "Why Choose Fitraat?",
      content: (
        <ul className="list-disc pl-5 text-gray-700">
          <li>Faith-aligned solutions for modern struggles</li>
          <li>Structured videos, tasks, and progress tracking</li>
          <li>Behavioral science + Islamic guidance combined</li>
          <li>Simple, clear, and result-focused programs</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4 text-center">About Fitraat</h1>

      {/* Intro Paragraph */}
      <p className="mb-8 text-lg text-center max-w-2xl mx-auto">
        Fitraat is a transformative digital platform dedicated to helping
        individuals rebuild their lives through emotional healing, spiritual
        growth, and faith-centered self-development. Our programs blend Islamic
        values with psychology and practical habit-building systems to guide
        users toward a purpose-driven, healthier life.
      </p>

      {/* Sections */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <SectionCard key={index} title={section.title}>
            {section.content}
          </SectionCard>
        ))}
      </div>

      {/* Ending Note */}
      <p className="mt-12 text-lg text-center max-w-2xl mx-auto">
        At Fitraat, our goal is to help you reclaim your true self, strengthen
        your relationship with Allah, and build a life filled with purpose,
        discipline, and spiritual clarity.
      </p>
    </div>
  );
}
