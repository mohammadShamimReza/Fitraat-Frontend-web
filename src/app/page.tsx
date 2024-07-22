"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { Skeleton } from "antd";
import React from "react";
import AuthMyTask from "./myTasks/AuthMyTask";
import UnAuthTask from "./myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

  const authDayDataId = authenticatedUserInfoData?.currentDay!;
  const userId = authenticatedUserInfoData?.id!;
  const paid = authenticatedUserInfoData?.paid;

  return (
    <>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton style={{ marginTop: "40px" }} key={index} active />
        ))
      ) : authenticatedUserInfoData === undefined &&
        authenticatedUserInfoDataError === true &&
        paid === undefined ? (
        // Unauthenticated user render
        <UnAuthTask paid={paid} />
      ) : paid === false ? (
        <UnAuthTask paid={paid} />
      ) : authenticatedUserInfoData &&
        authenticatedUserInfoDataError === false &&
        paid === true ? (
        // Authenticated user render
        <AuthMyTask authDayDataId={authDayDataId} userId={userId} paid={paid} />
      ) : null}
    </>
  );
};

export default MyTasks;
