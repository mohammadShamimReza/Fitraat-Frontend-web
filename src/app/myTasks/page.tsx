"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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

  // ! unAuth user Data
  const [UnAuthLocalStorageData, setUnAuthLocalStorageData] = useState({
    video: false,
    kagel: false,
    sortNote: false,
    quiz: false,
    rewards: false,
    suggestBlog: false,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("UnAuthDay");
    if (storedData) {
      setUnAuthLocalStorageData(JSON.parse(storedData));
    } else {
      localStorage.setItem("UnAuthDay", JSON.stringify(UnAuthLocalStorageData));
    }
  }, []);

  const unAuthInitialRender = useRef(true);

  useEffect(() => {
    if (!unAuthInitialRender.current) {
      if (selectedTask === "suggestBlog") {
        localStorage.setItem(
          "UnAuthDay",
          JSON.stringify({
            video: false,
            kagel: false,
            sortNote: false,
            quiz: false,
            rewards: false,
            suggestBlog: false,
          })
        );
      } else {
        localStorage.setItem(
          "UnAuthDay",
          JSON.stringify(UnAuthLocalStorageData)
        );
      }
    } else {
      unAuthInitialRender.current = false;
    }
  }, [UnAuthLocalStorageData]);

  // ! auth user data

  const [authLocalStorageData, setAuthLocalStorageData] = useState({
    video: false,
    kagel: false,
    sortNote: false,
    quiz: false,
    rewards: false,
    suggestBlog: false,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("AuthDay");
    if (storedData) {
      setAuthLocalStorageData(JSON.parse(storedData));
    } else {
      localStorage.setItem("AuthDay", JSON.stringify(authLocalStorageData));
    }
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      if (selectedTask === "suggestBlog") {
        localStorage.setItem(
          "UnAuthDay",
          JSON.stringify({
            video: false,
            kagel: false,
            sortNote: false,
            quiz: false,
            rewards: false,
            suggestBlog: false,
          })
        );
      } else {
        localStorage.setItem("AuthDay", JSON.stringify(authLocalStorageData));
      }
    } else {
      initialRender.current = false;
    }
  }, [authLocalStorageData]);

  const tasks = [
    "video",
    "kagel",
    "sortNote",
    "quiz",
    "rewards",
    "suggestBlog",
  ];

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = tasks[selectedTaskIndex];

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };

  const handleNext = () => {
    if (
      authenticatedUserInfoData === undefined &&
      authenticatedUserInfoDataError === true
    ) {
      setUnAuthLocalStorageData((prevState) => ({
        ...prevState,
        [selectedTask]: true,
      }));
    } else if (
      authenticatedUserInfoData &&
      authenticatedUserInfoDataError === false
    ) {
      setAuthLocalStorageData((prevState) => ({
        ...prevState,
        [selectedTask]: true,
      }));
    }

    if (selectedTask === "suggestBlog") {
      if (
        authenticatedUserInfoData === undefined &&
        authenticatedUserInfoDataError === true
      ) {
        let unAuthDayId = localStorage.getItem("unAuthDayId");

        if (unAuthDayId === null) {
          localStorage.setItem("unAuthDayId", "1");
        } else if (unAuthDayId !== null) {
          let parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
        }
        router.push("/");
      } else if (
        authenticatedUserInfoData &&
        authenticatedUserInfoDataError === false
      ) {
        localStorage.setItem(
          "AuthDay",
          JSON.stringify({
            video: false,
            kagel: false,
            sortNote: false,
            quiz: false,
            rewards: false,
            suggestBlog: false,
          })
        );
        router.push("/");
      }
    }
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
    }
  };

  if (
    authenticatedUserInfoData === undefined &&
    authenticatedUserInfoDataError === true
  ) {
    return (
      // !Unauthenticated user render
      <UnAuthTask
        tasks={tasks}
        UnAuthLocalStorageData={UnAuthLocalStorageData}
        handleTaskClick={handleTaskClick}
        selectedTask={selectedTask}
        selectedTaskIndex={selectedTaskIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    );
  } else if (
    authenticatedUserInfoData &&
    authenticatedUserInfoDataError === false
  ) {
    return (
      // !authenticate user render
      <AuthMyTask
        tasks={tasks}
        authLocalStorageData={authLocalStorageData}
        handleTaskClick={handleTaskClick}
        selectedTask={selectedTask}
        selectedTaskIndex={selectedTaskIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    );
  }
};

export default MyTasks;
