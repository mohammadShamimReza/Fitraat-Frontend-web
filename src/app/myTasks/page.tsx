"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
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

  if (
    authenticatedUserInfoData === undefined &&
    authenticatedUserInfoDataError === true
  ) {
    return (
      // ! Unauthenticated user render
      <UnAuthTask />
    );
  } else if (
    authenticatedUserInfoData &&
    authenticatedUserInfoDataError === false
  ) {
    return (
      // ! authenticate user render
      <AuthMyTask authDayDataId={authDayDataId} userId={userId} />
    );
  }
};

export default MyTasks;
