"use client";

import { useAppSelector } from "@/redux/hooks";
import { PlayCircleOutlined, ReadOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Tag } from "antd";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FancyLoading from "../loading";
import bannerImage from "./../../app/assets/banner.webp";

type Program = {
  id: number;
  link: string;
  title: string;
  image: StaticImageData;
  description: string;
  details: string;
  tags: string[]; // <-- Add tags here
};

const programs: Program[] = [
  {
    id: 1,
    link: "/tasks",
    title: "Porn Recovery Program",
    image: bannerImage,
    description:
      "A structured 40-day journey to overcome pornography addiction with guided videos, daily tasks, and community support.",
    details:
      "A psychology-backed recovery path with daily lessons, accountability tasks, and progress tracking. Designed to rebuild self-control, resilience, and healthy habits.",
    tags: ["porn", "recovary", "pe", "ed"], // example tags
  },
  {
    id: 2,
    link: "/kagel-exercise",

    title: "Kegel Exercise Program",

    image: bannerImage,
    description:
      "Guided Kegel exercises to improve pelvic strength, control and confidence — with timed sessions and progress tracking.",
    details:
      "Step-by-step Kegel training with morning/afternoon/night sessions, audio cues, progress charts, and habit-building challenges.",
    tags: ["pe", "health", "exercise"], // example tags
  },
  {
    id: 3,
    link: "/child-protection",

    title: "Protect Your Child from Porn",
    image: bannerImage,
    description:
      "Parent-focused guidance to protect children from exposure to pornography and build healthy digital habits.",
    details:
      "Practical advice, conversation scripts, and digital-safety tools to help parents prevent exposure and support healthy development.",
    tags: ["parent", "porn", "education"], // example tags
  },
];

const ProgramsPage: React.FC = () => {
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p) => (
            <article
              key={p.id}
              className="transform transition duration-300 hover:-translate-y-2 "
            >
              <Card
                hoverable
                bordered={false}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 !cursor-default "
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
                    <Link href={`/programs/${p.link}`} className="flex-1">
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
            <div className="w-full h-48 overflow-hidden rounded-lg relative">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>

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

            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Structured lessons & daily tasks</li>
              <li>Progress tracking and analytics</li>
              <li>Community & accountability tools</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-4">
              <Button
                onClick={() => alert(`Start ${selected.title}`)}
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
