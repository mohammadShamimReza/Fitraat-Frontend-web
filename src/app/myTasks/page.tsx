"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { Skeleton } from "antd";
import React from "react";
import AuthMyTask from "./AuthMyTask";
import UnAuthTask from "./UnAuthTask";

const MyTasks: React.FC = () => {
  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

  const authDayDataId = authenticatedUserInfoData?.currentDay!;
  const userId = authenticatedUserInfoData?.id!;

  return (
    <>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} active />
        ))
      ) : authenticatedUserInfoData === undefined &&
        authenticatedUserInfoDataError === true ? (
        // Unauthenticated user render
        <UnAuthTask />
      ) : authenticatedUserInfoData &&
        authenticatedUserInfoDataError === false ? (
        // Authenticated user render
        <AuthMyTask authDayDataId={authDayDataId} userId={userId} />
      ) : null}
    </>
  );
};


export default MyTasks;
