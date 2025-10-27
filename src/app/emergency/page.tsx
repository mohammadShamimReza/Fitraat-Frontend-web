"use client";

import { useGetEnergencyContantQuery } from "@/redux/api/emergencyApi";
import { Button, message, Skeleton, Steps, theme } from "antd";
import React, { useEffect, useState } from "react";

const EmergencyService: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const { data, isLoading } = useGetEnergencyContantQuery(undefined);
  const total = data?.meta.pagination.total ?? 0;
  const [emergencyNumber, setEmergencyNumber] = useState<number | null>(null);

  useEffect(() => {
    if (total > 0) {
      const randomNumber = Math.floor(Math.random() * total);
      setEmergencyNumber(randomNumber);
    }
  }, [total]);
  if (isLoading) {
    return (
      <>
        <div className="mx-auto mt-8">
          {/* Sidebar */}

          {/* Content Box */}
          <div className="flex-1 bg-white p-20">
            <Skeleton
              active
              title={{ width: "60%" }}
              paragraph={{
                rows: 10,
                width: ["100%", "100%", "100%", "100%", "100%"],
              }}
            />
          </div>
        </div>
      </>
    );
  }
  // Helper to render quote text cleanly
  const renderQute = () => {
    const qutes = data?.data[emergencyNumber ?? 0]?.qute ?? [];
    if (!qutes.length) return <p>No content available</p>;

    return (
      <div
        className="flex flex-col items-start gap-4 w-full max-w-2xl mx-auto overflow-y-auto p-4"
        style={{
          maxHeight: "350px",
          textAlign: "left",
          lineHeight: 1.7,
        }}
      >
        {qutes.map((para, index) => (
          <p
            key={index}
            className="text-base sm:text-lg text-gray-800 leading-relaxed"
          >
            {para.children.map((child, i) => (
              <span
                key={i}
                style={{
                  fontWeight: child.bold ? "bold" : "normal",
                  whiteSpace: "pre-line",
                }}
              >
                {child.text}
              </span>
            ))}
          </p>
        ))}
      </div>
    );
  };

  const videoUrl =
    emergencyNumber !== null
      ? data?.data[emergencyNumber]?.video?.url || ""
      : "";

  const steps = [
    {
      title: "Video",
      content: videoUrl ? (
        <div className="flex justify-center items-center w-full">
          <video
            className="w-full sm:w-[90%] md:w-[80%] max-w-[900px] rounded-xl shadow-lg"
            controls
            style={{ backgroundColor: "#000" }}
          >
            <source src={`${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="text-center text-gray-600">No video available</div>
      ),
    },
    {
      title: " Information",
      content: renderQute(),
    },
    {
      title: "Congratulations",
      content: (
        <div className="text-center text-green-500 font-bold text-xl">
          🎉 You’ve successfully completed this emergency recovery step.
        </div>
      ),
    },
  ];

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    padding: 16,
    marginTop: 24,
    backgroundColor: "white",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    boxSizing: "border-box",
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 sm:px-6 md:px-8 py-8 ">
      <h1 className="mb-10 text-2xl md:text-3xl font-semibold text-gray-800">
        Lower you Gaze
      </h1>

      <Steps
        current={current}
        className="flex justify-center mb-6 mt-4 max-w-[600px]"
        items={items}
      />

      <div className=" h-48" style={contentStyle}>
        {steps[current].content}
      </div>

      <div className="m-10 flex justify-center flex-wrap gap-4">
        {current > 0 && (
          <Button onClick={prev} size="large">
            Previous
          </Button>
        )}
        {current < steps.length - 1 ? (
          <Button type="primary" size="large" onClick={next}>
            Next
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              message.success("Emergency Service Completed!");
              setCurrent(0);
            }}
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmergencyService;
