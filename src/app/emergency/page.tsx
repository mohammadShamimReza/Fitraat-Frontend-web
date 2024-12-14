"use client";

import { useGetEnergencyContantQuery } from "@/redux/api/emergencyApi";
import { Button, message, Steps, theme } from "antd";
import React, { useEffect, useState } from "react";

const EmergencyService: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const { data } = useGetEnergencyContantQuery(undefined);
  const total = data?.meta.pagination.total;

  const [emergencyNumber, setEmergencyNumber] = useState<number | null>(null);

  useEffect(() => {
    if (total && typeof total === "number") {
      const randomNumber = Math.floor(Math.random() * total);
      setEmergencyNumber(randomNumber);
    } else {
      console.log("Total is not a valid number");
    }
  }, [total]);

  const steps = [
    {
      title: "Emergency Video",
      content: emergencyNumber !== null && (
        <div className="flex justify-center items-center h-full w-full">
          <iframe
            width="1000"
            height="380"
            src={data?.data[emergencyNumber].attributes.vedio_url}
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
      content: emergencyNumber !== null && (
        <div className="flex flex-col items-center text-lg text-gray-800 font-semibold p-4">
          {data?.data[emergencyNumber].attributes.message}
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

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    padding: 10,
    marginTop: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
    width: "100%",
    maxWidth: "1000px", // Restrict maximum size
    backgroundColor: "white",
    boxSizing: "border-box", // Ensure padding is included in the width calculation
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 sm:px-8">
      <h1 className="mb-12 text-xl md:text-3xl">Emergency Help</h1>
      <Steps
        current={current}
        className="flex justify-center mb-6 mt-12"
        items={items}
      />

      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="m-10"
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Emergency Service Completed!"), setCurrent(0);
            }}
          >
            Finish
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmergencyService;
