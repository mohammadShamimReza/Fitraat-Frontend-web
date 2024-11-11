"use client";

import { Button, message, Steps, theme } from "antd";
import React, { useState } from "react";

const steps = [
  {
    title: "Emergency Video",
    content: (
      <div className="flex justify-center items-center h-full w-full">
        <iframe
          width="1000"
          height="500"
          src="https://www.youtube.com/embed/VIDEO_ID" // Replace VIDEO_ID with the actual ID of the video
          title="Emergency Service Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ),
  },
  {
    title: "Important Information",
    content: (
      <div className="flex flex-col items-center text-lg text-gray-800 font-semibold p-4">
        <h2>Instructions for Emergency Handling</h2>
        <p className="mt-4 text-center max-w-lg">
          In case of an emergency, please stay calm and follow the steps shown
          in the video. Always remember, your safety is the priority.
        </p>
      </div>
    ),
  },
  {
    title: "Completion & Congratulations",
    content: (
      <div className="text-center text-green-500 font-bold text-xl">
        🎉 Congratulations! You have successfully completed the emergency
        service steps.
      </div>
    ),
  },
];

const EmergencyService: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    padding: 24,
    marginTop: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    width: "1000px",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Steps
        current={current}
        className="flex justify-center mb-6"
        items={items}
      />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Emergency Service Completed!")}
          >
            Finish
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmergencyService;
