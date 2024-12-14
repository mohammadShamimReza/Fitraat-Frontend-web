"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import AuthMyTask from "../myTasks/AuthMyTask";
import UnAuthTask from "../myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const userData = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();

  console.log(userData, "userData");

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const tokenFromLocalStorage = getTokenFromCookie();
      if (tokenFromLocalStorage) {
        dispatch(storeAuthToken(tokenFromLocalStorage));
        if (userData) {
          dispatch(storeUserInfo(userData));
        }
      }
    }
  }, [dispatch, userData]);

  const authDayDataId = userData?.currentDay!;
  const userId = userData?.id!;
  const paid = userData?.paid;

  const today = new Date();
  const start = new Date(userData?.startDate || new Date());
  const differenceInTime = today.getTime() - start.getTime(); // Difference in milliseconds
  const daysLeft = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1;
  //  setDaysPassed(days);

  return (
    <>
      {isMounted ? (
        userData && paid === true ? (
          // Authenticated user render
          <AuthMyTask
            authDayDataId={authDayDataId}
            userId={userId}
            paid={paid}
            daysLeft={daysLeft}
          />
        ) : (
          // Unauthenticated user render
          <UnAuthTask paid={userData?.paid} />
        )
      ) : (
        // Skeleton loading screen during hydration
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
      )}
    </>
  );
};

export default MyTasks;
