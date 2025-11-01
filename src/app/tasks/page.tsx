"use client";

import UnAuthTask from "@/components/myTasks/UnAuthTask";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "antd";
import React, { lazy, Suspense, useEffect, useState } from "react";

// Reusable Skeleton Loader
const PageSkeleton: React.FC = () => (
  <div className="flex h-screen mt-10">
    <div className="w-1/4 bg-gray-200 p-4 rounded-md">
      <Skeleton active title={false} paragraph={{ rows: 5 }} />
    </div>
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
);

const AuthMyTask = lazy(() => import("@/components/myTasks/AuthMyTask"));

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const userData = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => setIsMounted(true), []);

  // Handle SSR hydration phase
  if (!isMounted) return <PageSkeleton />;

  // Handle unauthenticated or unpaid users
  if (!userData || userData.fitraatPayment !== "Complete") {
    return (
      <div className="min-h-screen">
        <UnAuthTask payment={userData?.fitraatPayment} />
      </div>
    );
  }

  // Extract required data for authenticated users
  const { id: userId, currentDay: authDayDataId, startDate } = userData;
  const today = new Date();
  const start = new Date(startDate || today);
  const daysLeft =
    Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <Suspense fallback={<PageSkeleton />}>
      <AuthMyTask
        authDayDataId={authDayDataId}
        userId={userId}
        daysLeft={daysLeft}
        payment="Complete"
      />
    </Suspense>
  );
};

export default MyTasks;
