"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import UnAuthTask from "./myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: userData,
    isLoading,
    isError: authenticatedUserInfoDataError,
  } = useGetUserInfoQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
    const tokenFromLocalStorage = getTokenFromCookie();
    if (tokenFromLocalStorage) {
      dispatch(storeAuthToken(tokenFromLocalStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      dispatch(storeUserInfo(userData));
    }
  }, [userData, dispatch]);

  if (!isMounted) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton style={{ marginTop: "40px" }} key={index} active />
        ))}
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton style={{ marginTop: "40px" }} key={index} active />
        ))}
      </>
    );
  }

  if (
    authenticatedUserInfoDataError ||
    userData === undefined ||
    !userData.paid
  ) {
    return (
      <div className="min-h-screen">
        <UnAuthTask paid={userData?.paid} />
      </div>
    );
  }

  return null;
};

export default MyTasks;
