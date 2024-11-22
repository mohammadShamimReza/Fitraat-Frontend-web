"use client";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "antd";
import React, { useState } from "react";
import UnAuthTask from "../myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const userData = useAppSelector((state) => state.auth.userInfo);

  console.log(userData, "this is user data");

  if (!isMounted) {
    return (
      <>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-200 p-4 rounded-md">
            <Skeleton active title={false} paragraph={{ rows: 5 }} />
          </div>

          {/* Content Box */}
          <div className="flex-1 bg-white p-20">
            <Skeleton
              active
              title={{ width: "60%" }}
              paragraph={{
                rows: 10,
                width: ["100%", "90%", "80%", "70%", "50%"],
              }}
            />
          </div>
        </div>
      </>
    );
  }

  if (userData === undefined || !userData?.paid) {
    return (
      <div className="min-h-screen">
        <UnAuthTask paid={userData?.paid} />
      </div>
    );
  }

  return null;
};

export default MyTasks;
