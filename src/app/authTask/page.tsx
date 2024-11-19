"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { Skeleton } from "antd";
import React, { useEffect } from "react";
import AuthMyTask from "../myTasks/AuthMyTask";
import UnAuthTask from "../myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const {
    data: userData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

  const authDayDataId = userData?.currentDay!;
  const userId = userData?.id!;
  const paid = userData?.paid;

  const userInfo = useAppSelector((store) => store.auth.userInfo);
  const userToken = useAppSelector((store) => store.auth.authToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = () => {
      const tokenFromLocalStorage = getTokenFromCookie();
      if (tokenFromLocalStorage) {
        dispatch(storeUserInfo(userData));
        dispatch(storeAuthToken(tokenFromLocalStorage));
      }
    };

    fetchToken(); // Fetch the token on component mount
  }, [dispatch, userData]);

  return (
    <>
      {isLoading ? (
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
      ) : userData &&
        authenticatedUserInfoDataError === false &&
        paid === true ? (
        // Authenticated user render
        <AuthMyTask authDayDataId={authDayDataId} userId={userId} paid={paid} />
      ) : (
        <UnAuthTask paid={userData?.paid} />
      )}
    </>
  );
};

export default MyTasks;
