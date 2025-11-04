"use client";

import UnAuthTask from "@/components/myTasks/UnAuthTask";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import { useAppSelector } from "@/redux/hooks";
import React, { lazy, Suspense, useEffect, useState } from "react";


const AuthMyTask = lazy(() => import("@/components/myTasks/AuthMyTask"));

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const userData = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => setIsMounted(true), []);

  // Handle SSR hydration phase
  if (!isMounted) return <ProgramSclaton />;

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
    <Suspense fallback={<ProgramSclaton />}>
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
