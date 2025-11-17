import { Card } from "antd";
import { FaBookOpen, FaDumbbell, FaQuestionCircle } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

export default function WhatGet() {
  return (
    <div className="my-28 px-6 bg-white border-b border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-12">
        What You Will Get
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Daily Videos",
            description: "Receive motivating and insightful videos every day.",
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
            icon: <FaBookOpen className="text-4xl text-red-500 mx-auto mb-4" />,
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
  );
}
