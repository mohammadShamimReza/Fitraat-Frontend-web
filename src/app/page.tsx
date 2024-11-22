"use client";
import DataLoader from "@/components/DataLoader";
import MainLayout from "@/components/mainLayout/MainLayout";
import { Skeleton } from "antd";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [unAuthDayId] = useState("1");

  // Mount logic for better hydration support
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}

        {/* Content Box */}
        <div className="flex-1 bg-white p-20 grid grid-cols-2 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <Skeleton
                active
                title={{ width: "50%" }}
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
      {/* Load data */}
      <DataLoader unAuthDayId={unAuthDayId} />

      {/* Main Content */}
      <div className="min-h-screen">
        <MainLayout />
      </div>
    </>
  );
};

export default HomePage;
