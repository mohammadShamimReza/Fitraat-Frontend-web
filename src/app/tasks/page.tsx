"use client";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import UnAuthTask from "../myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const userData = useAppSelector((state) => state.auth.userInfo);


  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (userData === undefined || userData?.fitraatPayment !== "Complete") {
    return (
      <div className="min-h-screen">
        <UnAuthTask payment={userData?.fitraatPayment} />
      </div>
    );
  }

  return null;
};

export default MyTasks;
