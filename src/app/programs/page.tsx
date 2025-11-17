"use client";

import { useAppSelector } from "@/redux/hooks";
import { PlayCircleOutlined, ReadOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FancyLoading from "../loading";
import kagelIndividual from "./../../app/assets/kagelIndividual.png";
import childProtection from "./../../app/assets/premarriage.png";
import recovary from "./../../app/assets/recovary.png";

type Program = {
  id: number;
  link: string;
  title: string;
  image: any;
  description: string;
  details: string;
  tags: string[];
  benefits: string[];
  features: string[];
};
const programs: Program[] = [
  {
    id: 1,
    link: "/programs/porn-recovary",
    title: "Porn Recovery Program",
    image: recovary,
    description:
      "A structured 40-day journey to overcome pornography addiction with guided videos, daily tasks, and community support.",
    details:
      "A psychology-backed recovery path with daily lessons, accountability tasks, and progress tracking. Designed to rebuild self-control, resilience, and healthy habits.",
    tags: ["porn", "recovery", "pe", "ed"],
    benefits: [
      "Regain mental clarity and focus",
      "Rebuild confidence and motivation",
      "Break free from addiction patterns",
      "Restore healthy sexual performance",
    ],
    features: [
      "40-day structured video lessons",
      "Daily tasks and self-assessments",
      "Community accountability support",
      "Personal progress analytics",
    ],
  },
  {
    id: 2,
    link: "/programs/kegel-exercise",
    title: "Kegel Exercise Program",
    image: kagelIndividual,
    description:
      "Guided Kegel exercises to improve pelvic strength, control and confidence — with timed sessions and progress tracking.",
    details:
      "Step-by-step Kegel training with morning/afternoon/night sessions, audio cues, progress charts, and habit-building challenges.",
    tags: ["pe", "health", "exercise"],
    benefits: [
      "Improve erection strength and control",
      "Prevent premature ejaculation",
      "Boost pelvic floor endurance",
      "Enhance confidence and performance",
    ],
    features: [
      "Audio-guided squeeze & relax sessions",
      "Morning, afternoon, and night routines",
      "Progress tracking with analytics",
      "Adaptive difficulty system",
    ],
  },
  {
    id: 3,
    link: "/programs/pre-marriage",
    title: "Pre-Marriage Solution",
    image: childProtection, // replace with your actual image import
    description:
      "A complete guidance program to prepare you for a strong, confident, and addiction-free marriage — built on emotional maturity, self-control, and mutual respect.",
    details:
      "This program offers psychological and spiritual preparation for marriage. It helps individuals overcome lust-driven habits, develop emotional intelligence, and build the mindset needed for a healthy, faithful, and fulfilling relationship.",
    tags: ["marriage", "relationship", "self-improvement", "addiction-free"],
    benefits: [
      "Develop emotional stability and self-control before marriage",
      "Understand your role and responsibilities in a healthy partnership",
      "Build confidence and readiness for intimacy based on respect and trust",
      "Eliminate addictive habits that harm relationships",
    ],
    features: [
      "Step-by-step video sessions with actionable reflections",
      "Practical exercises for communication and emotional growth",
      "Self-assessment tools to measure readiness for marriage",
      "Guidance from psychology and faith-based perspectives",
    ],
  },
];

const ProgramsPage: React.FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<Program | null>(null);
  const [mounted, setMounted] = useState(false);
  const userData = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <FancyLoading />;

  return (
    <main className="min-h-screen py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 underline">
          Our Programs
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-20">
          Choose a program that fits your needs — guided recovery, physical
          exercises, or tools for protecting children online. Click{" "}
          <span className="font-medium">Try It</span> to begin or{" "}
          <span className="font-medium">Read More</span> for details.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {programs.map((p) => (
            <article
              key={p.id}
              className="transform transition duration-300 hover:-translate-y-2 h-full"
            >
              <Card
                hoverable
                bordered={false}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 !cursor-default h-full flex flex-col"
                cover={
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                }
              >
                <div className="px-1 pb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 ">
                    {p.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {p.tags.map((tag) => (
                      <Tag key={tag} color="default">
                        {tag.toUpperCase()}
                      </Tag>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {p.description}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <Link href={`${p.link}`} className="flex-1">
                      <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        size="middle"
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-md"
                      >
                        {!userData || userData?.fitraatPayment !== "Complete"
                          ? "Try It"
                          : "Continue"}
                      </Button>
                    </Link>

                    <Button
                      type="default"
                      icon={<ReadOutlined />}
                      size="middle"
                      onClick={() => setSelected(p)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            </article>
          ))}
        </section>
      </div>

      {/* Modal */}
      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        centered
        width={720}
        bodyStyle={{ padding: 24 }}
        closeIcon={<span aria-hidden>✕</span>}
      >
        {selected && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              {selected.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag.toUpperCase()}
                </Tag>
              ))}
            </div>

            <p className="text-gray-700 mt-2">{selected.details}</p>

            {/* ✅ Features */}
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mt-4">
                Key Features:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {selected.features.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* ✅ Benefits */}
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mt-4">
                Benefits:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {selected.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-4">
              <Button
                onClick={() => router.push(selected.link)}
                type="primary"
                icon={<PlayCircleOutlined />}
                className="w-full sm:w-auto"
              >
                Try It
              </Button>

              <Button
                onClick={() => setSelected(null)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default ProgramsPage;
