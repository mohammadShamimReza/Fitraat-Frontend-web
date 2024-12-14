"use client";

import MainLayout from "@/components/mainLayout/MainLayout";
import Motivation from "@/components/mainLayout/Motivation";
import RecoveryFeature from "@/components/mainLayout/RecoveryFeature";
import { Button, Card, Skeleton } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBookOpen,
  FaDumbbell,
  FaQuestionCircle,
  FaVideo,
} from "react-icons/fa"; // Import icons
import bannerImage from "./assets/banner.webp";

const HomePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Mount logic for better hydration support
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}

        {/* Content Box */}
        <div className="flex-1 bg-white p-20 grid  gap-8">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <Skeleton
                active
                title={{ width: "100%" }}
                paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center h-[500px] md:h-[600px] rounded-2xl bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImage.src})`,
        }}
      >
        {/* Blur and Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        {/* Animated Shapes */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse -top-10 -left-20"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse delay-200 -bottom-10 -right-10"></div>

        {/* Text Content */}
        <div
          className="relative z-10 text-center max-w-4xl px-6 text-white animate-fadeInUp"
          style={{
            animation: "fadeInUp 1.5s ease-out forwards",
          }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 animate-slideIn"
            style={{
              animation: "slideIn 1s ease-out forwards",
            }}
          >
            Recover and Reclaim Your Life
          </h1>
          <p
            className="text-lg md:text-xl mb-8 animate-fadeIn"
            style={{
              animation: "fadeIn 2s ease-out forwards",
            }}
          >
            A 40-day guided recovery challenge with daily tasks, exercises, and
            insights to help you overcome porn addiction.
          </p>
          <Link href="/tasks">
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              Get Started Now
            </Button>
          </Link>
        </div>

        {/* Keyframes for Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>

      {/* Site Overview Section */}
      <div className="py-20 px-6  ">
        <h2 className="text-4xl font-bold text-center mb-12">
          What is Fitraat?
        </h2>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg leading-relaxed ">
            <span className="font-bold">Fitraat</span> is a comprehensive
            recovery platform designed to help individuals struggling with porn
            addiction regain control of their lives. Our program combines
            science-backed methods and community support to guide you through a
            transformative 40-day journey.
          </p>
          <RecoveryFeature />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What You Will Get
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Daily Videos",
              description:
                "Receive motivating and insightful videos every day.",
              icon: <FaVideo className="text-4xl text-blue-500 mx-auto mb-4" />,
            },
            {
              title: "Kegel Exercises",
              description: "Practice guided exercises to improve self-control.",
              icon: (
                <FaDumbbell className="text-4xl text-green-500 mx-auto mb-4" />
              ),
            },
            {
              title: "Quizzes",
              description:
                "Engage with thought-provoking quizzes to challenge your mindset.",
              icon: (
                <FaQuestionCircle className="text-4xl text-yellow-500 mx-auto mb-4" />
              ),
            },
            {
              title: "Informative Blogs",
              description:
                "Read daily blogs filled with strategies and success stories.",
              icon: (
                <FaBookOpen className="text-4xl text-red-500 mx-auto mb-4" />
              ),
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white text-black p-6 rounded-xl shadow-md hover:shadow-lg"
            >
              {feature.icon} {/* Replace image with React Icon */}
              <h3 className="text-xl font-bold text-center">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <Motivation />

      <div className=" py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Stay Engaged</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Community Feed */}
          <div className="text-center border rounded-lg py-8 px-6">
            <h3 className="text-2xl font-semibold mb-4">Community Feed</h3>
            <p className="text-lg mb-4">
              Ask questions, share answers, and engage with a supportive
              community dedicated to personal growth.
            </p>
            <p className="text-lg mb-4">
              Whether you need advice or want to share your experiences, our
              feed is the perfect space for open and respectful discussions.
            </p>
            <Link href="/feeds">
              <Button
                type="primary"
                className="bg-white text-black px-6 py-2 mt-4 rounded-lg"
              >
                Join the Discussion
              </Button>
            </Link>
          </div>

          {/* Read Blogs */}
          <div className="text-center border rounded-lg py-8 px-6">
            <h3 className="text-2xl font-semibold mb-4">Explore Our Blogs</h3>
            <p className="text-lg mb-4">
              Discover insights, actionable tips, and inspiring stories curated
              to help you on your recovery journey.
            </p>
            <p className="text-lg mb-4">
              Our blogs cover a wide range of topics, from personal growth to
              effective recovery strategies.
            </p>
            <Link href="/freeBlog">
              <Button
                type="primary"
                className="bg-white text-black px-6 py-2 mt-4 rounded-lg"
              >
                Read Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-16 px-6">
        <MainLayout />
      </div>
    </>
  );
};

export default HomePage;
