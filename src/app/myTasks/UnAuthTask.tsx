"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TaskPage from "./TaskPage";

function UnAuthTask({}) {
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
    const storedData = localStorage.getItem("UnAuthDay");
    if (storedData) {
      setLocalStorageData(JSON.parse(storedData));
    } else {
      localStorage.setItem("UnAuthDay", JSON.stringify(localStorageData));
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
        localStorage.setItem("UnAuthDay", JSON.stringify(localStorageData));
      }
    } else {
      unAuthInitialRender.current = false;
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
      let unAuthDayId = localStorage.getItem("unAuthDayId");

      if (unAuthDayId === null) {
        localStorage.setItem("unAuthDayId", "1");
      } else if (unAuthDayId !== null) {
        let parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
        localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
      }
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

export default UnAuthTask;
