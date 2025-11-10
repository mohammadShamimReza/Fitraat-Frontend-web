"use client";

import MainLayout from "@/components/mainLayout/MainLayout";
import Motivation from "@/components/mainLayout/Motivation";
import RecoveryFeature from "@/components/mainLayout/RecoveryFeature";
import { Card } from "antd";
import React, { useState } from "react";
import { FaBookOpen, FaDumbbell, FaQuestionCircle } from "react-icons/fa"; // Import icons
import { MdOutlineOndemandVideo } from "react-icons/md";

const HomePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Mount logic for better hydration support
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const fullWidthStyle: React.CSSProperties = {
    margin: "0 auto",
  };

  return (
    <>
      {/* Hero Section */}

      {/* Site Overview Section */}
      <div className="py-20 px-6  border-b border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-12">
          What is Fitraat?
        </h2>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg leading-relaxed ">
            <span className="font-bold">Fitraat</span> is a recovery platform
            designed to help individuals struggling with{" "}
            <span className="font-bold">porn addiction . </span> Our program
            combines <span className="font-bold">science-backed methods</span>
            to guide you through a transformative{" "}
            <span className="">40-day journey.</span>
          </p>
          <RecoveryFeature />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 px-6 bg-white border-b border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-12">
          What You Will Get
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Daily Videos",
              description:
                "Receive motivating and insightful videos every day.",
              icon: (
                <MdOutlineOndemandVideo className="text-4xl text-blue-500 mx-auto mb-4" />
              ),
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

      {/* Blog Section */}
      <div className="py-16 px-6">
        <MainLayout />
      </div>
    </>
  );
};

export default HomePage;
