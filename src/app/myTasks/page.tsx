"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React from "react";
import AuthMyTask from "./AuthMyTask";
import UnAuthTask from "./UnAuthTask";

const MyTasks: React.FC = () => {
  const router = useRouter();
  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

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
      <AuthMyTask />
    );
  }
};

export default MyTasks;
