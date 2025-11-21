"use client";

import { useState } from "react";

/* --------------------- TYPE DEFINITIONS --------------------- */
type FeatureSection = {
  heading: string;
  points: string[];
};

type FeatureModalContent = {
  intro: string;
  sections: FeatureSection[];
};

type FeatureItem = {
  id: string;
  title: string;
  shortDesc: string;
  modalFullContent: FeatureModalContent;
};

export default function WhatIs() {
  const [modalData, setModalData] = useState<FeatureItem | null>(null);

  // 🔥 FULL UNIQUE CONTENT FOR EACH FEATURE
  const features: FeatureItem[] = [
    {
      id: "porn",
      title: "40-Day Success Journey",
      shortDesc:
        "A structured program designed to help people overcome porn addiction using science, psychology, and Islamic guidance.",
      modalFullContent: {
        intro:
          "The 40-Day Success Journey is Fitraat’s flagship recovery system. It mixes behavioral science, neuroscience, Islamic principles, accountability, and identity transformation to help users quit pornography permanently.",
        sections: [
          {
            heading: "What You Will Learn",
            points: [
              "How porn rewires the brain & hijacks dopamine",
              "How to rebuild masculinity and self-discipline",
              "Powerful Islamic repentance & purification methods",
              "Daily videos, tasks, and reflection exercises",
              "Mastering urges using neuroscience tools",
            ],
          },
          {
            heading: "Program Structure",
            points: [
              "40 days of progressive habit rewiring",
              "Video lessons for each day",
              "Practical daily challenges",
              "Triggers & urge management training",
              "Morning–Night self-growth checklist",
            ],
          },
          {
            heading: "Results You Can Expect",
            points: [
              "Reduced urges and stronger willpower",
              "Dopamine reset & increased focus",
              "Better emotional control",
              "Spiritual clarity & self-respect",
              "Long-term freedom from addiction",
            ],
          },
        ],
      },
    },

    {
      id: "kegel",
      title: "Kegel Exercise Program",
      shortDesc:
        "A 6-month structured pelvic floor strengthening program that improves stamina, control, and sexual well-being.",
      modalFullContent: {
        intro:
          "The Kegel Exercise Program is a male-focused pelvic floor strengthening system developed to improve sexual stamina, control, and overall pelvic health. The program is scientifically structured and spiritually safe.",
        sections: [
          {
            heading: "Program Breakdown",
            points: [
              "Daily Kegel training with morning–afternoon–night routines",
              "Progressive levels: Beginner → Intermediate → Advanced",
              "Strong focus on breathing, posture, and muscle awareness",
              "Audio cues: 'Squeeze', 'Relax', 'Hold'",
              "Weekly progression to avoid muscle fatigue",
            ],
          },
          {
            heading: "Who Is This For?",
            points: [
              "Men with premature ejaculation issues",
              "Men who want better stamina & control",
              "Men who want stronger erections naturally",
              "Anyone wanting improved pelvic health",
            ],
          },
          {
            heading: "Benefits After 6 Months",
            points: [
              "Better ejaculation control",
              "Improved sexual stamina",
              "Greater confidence",
              "Stronger pelvic muscles",
              "Better urinary control",
            ],
          },
        ],
      },
    },

    {
      id: "marriage",
      title: "Pre-Marriage Solution",
      shortDesc:
        "Prepare emotionally, mentally, and Islamically for a successful marriage with guidance and self-development tools.",
      modalFullContent: {
        intro:
          "Fitraat’s Pre-Marriage Solution is a complete personal development program designed to help people build emotional intelligence, Islamic values, communication skills, and maturity before entering marriage.",
        sections: [
          {
            heading: "Program Outcomes",
            points: [
              "Develop emotional maturity",
              "Understand rights & responsibilities in marriage",
              "Learn healthy communication & conflict-resolution",
              "Identify red flags & compatibility markers",
              "Strengthen Islamic character & values",
            ],
          },
          {
            heading: "What’s Inside",
            points: [
              "Self-awareness assessments",
              "Islamic marriage foundations",
              "Premarital checklist",
              "Emotional intelligence training",
              "Relationship skill development",
            ],
          },
          {
            heading: "Who Should Take This?",
            points: [
              "Singles preparing for marriage",
              "Couples planning to get married soon",
              "Anyone wanting personal growth",
            ],
          },
        ],
      },
    },
  ];

  const openModal = (item: FeatureItem) => setModalData(item);
  const closeModal = () => setModalData(null);

  return (
    <>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">What is Fitraat?</h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-12">
            <span className="font-bold">Fitraat</span> provides{" "}
            <span className="font-bold">faith-aligned</span> and{" "}
            <span className="font-bold">science-backed</span> solutions for
            modern life challenges.
          </p>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            {features.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white rounded-xl shadow-lg flex flex-col h-full border"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 flex-grow">{item.shortDesc}</p>

                <button
                  onClick={() => openModal(item)}
                  className="
    mt-5 inline-block 
    bg-gradient-to-r from-indigo-600 to-blue-600 
    text-white px-4 py-2  
    rounded-br-xl rounded-tl-2xl 
    transition-all duration-300 
    shadow-md

    hover:scale-105 
    hover:-translate-y-1
    hover:shadow-xl
    hover:from-indigo-700 hover:to-blue-700
  "
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== DYNAMIC MODAL ================== */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 relative animate-fadeIn h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">{modalData.title}</h2>

            <p className="text-gray-700 mb-4">
              {modalData.modalFullContent.intro}
            </p>

            {modalData.modalFullContent.sections.map((sec, idx) => (
              <div key={idx} className="mb-5">
                <h3 className="font-semibold text-lg mb-2">{sec.heading}</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {sec.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              onClick={closeModal}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
