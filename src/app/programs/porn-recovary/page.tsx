"use client";

import ProgramSclaton from "@/components/structure/ProgramSclaton";
import { useAppSelector } from "@/redux/hooks";
import React, { lazy, Suspense, useEffect, useState } from "react";

const AuthMyTask = lazy(() => import("@/components/myTasks/AuthMyTask"));

const MyTasks: React.FC = () => {
  const userData = useAppSelector((state) => state.auth.userInfo);
  // Handle SSR hydration phase
  const [mount, setMount] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMount(true);
  }, []);
  if (!mount) return <ProgramSclaton />;

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            This program is available to paid members. Please login first to
            continue.
          </p>
          <button
            onClick={() => window.location.replace("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (userData.fitraatPayment !== "Complete") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Paid Access Required
          </h1>
          <p className="text-gray-600 mb-6">
            Free trial has been removed. Please complete payment to unlock the
            full program.
          </p>
          <button
            onClick={() => window.location.replace("/payment")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
          >
            Go to Payment
          </button>
        </div>
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
      />
    </Suspense>
  );
};

export default MyTasks;
