"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TaskPage from "./TaskPage";

function AuthMyTask() {
  const router = useRouter();

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

  const [localStorageData, setLocalStorageData] = useState({
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
      setLocalStorageData(JSON.parse(storedData));
    } else {
      localStorage.setItem("AuthDay", JSON.stringify(localStorageData));
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
        localStorage.setItem("AuthDay", JSON.stringify(localStorageData));
      }
    } else {
      initialRender.current = false;
    }
  }, [localStorageData]);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };
  const handleNext = () => {
    setLocalStorageData((prevState) => ({
      ...prevState,
      [selectedTask]: true,
    }));

    if (selectedTask === "suggestBlog") {
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
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
    }
  };

  return (
    <>
      <TaskPage
        localStorageData={localStorageData}
        handleTaskClick={handleTaskClick}
        selectedTask={selectedTask}
        selectedTaskIndex={selectedTaskIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </>
  );
}

export default AuthMyTask;
