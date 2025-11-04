"use client";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { KagelTime, Quiz } from "@/types/contantType";
import { Button, message, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

import { clearDayData } from "@/redux/slice/daySlice";
import DayFinishImage from "../../app/assets/dayFinish.gif";
import ProgramSclaton from "../structure/ProgramSclaton";

function UnAuthTask({ payment }: { payment: string | undefined }) {
  const router = useRouter();
  const [unAuthDayId, setUnAuthDayId] = useState("1");

  const {
    data: unAuthenticatedDayDataForChengeDay,
    isError,
    isLoading,
  } = useGetDaysByDayIdQuery(parseInt(unAuthDayId));

  const unAuthenticatedDayData = unAuthenticatedDayDataForChengeDay?.data;

  console.log(unAuthenticatedDayData, "user day");
  useEffect(() => {
    const dayId = window.localStorage.getItem("unAuthDayId") || "1";
    if (parseInt(dayId) > 3) {
      router.push("/CompletedFreeTask");
    }
    setUnAuthDayId(dayId);
  }, [router]);

  const tasks = ["video", "kagel", "quiz", "Blog"];

  const currentTask = useAppSelector((state) => state.taskSlice.currentTask);
  const dispatch = useAppDispatch();

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = currentTask || tasks[selectedTaskIndex];

  const initialLocalStorageData = localStorage.getItem("UnAuthDay");
  const defaultLocalStorageData = {
    video: false,
    kagel: false,
    quiz: false,
    Blog: false,
  };

  const [localStorageData, setLocalStorageData] = useState(
    initialLocalStorageData
      ? JSON.parse(initialLocalStorageData)
      : defaultLocalStorageData
  );

  // Update local storage whenever localStorageData changes
  useEffect(() => {
    localStorage.setItem("UnAuthDay", JSON.stringify(localStorageData));
  }, [localStorageData]);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
    dispatch(storeCurrentTask(tasks[index]));
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex - 1]));
    }
  };
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handleNext = () => {
    if (selectedTask === "Blog") {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
      setLocalStorageData(defaultLocalStorageData);
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
      dispatch(clearDayData());
      setSelectedTaskIndex(0);
      setIsFinishModalOpen(true);

      dispatch(storeCurrentTask(tasks[0]));
      localStorage.setItem(
        "UnAuthDay",
        JSON.stringify(defaultLocalStorageData)
      );

      if (unAuthDayId === null) {
        localStorage.setItem("unAuthDayId", "1");
      } else if (unAuthDayId !== null) {
        const parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
        if (parsedUnAuthDayId === 3) {
          message.success(
            " This is you last day of free task. Upgrade membership to access pro contants"
          );
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
          // router.push("/freeBlog");
        } else if (parsedUnAuthDayId > 3) {
          message.success(
            "Congratulations you have successfully completed your tasks for 3 day"
          );

          // window.location.reload();
        }
        if (parsedUnAuthDayId <= 4) {
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
        }
      }
    } else {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
    }
    // if (selectedTaskIndex < tasks.length - 1) {

    // }
  };

  const handleOk = () => {
    setIsFinishModalOpen(false);
    router.push("/freeBlog");
  };

  const [blog, setBlog] = useState<{
    id: string | undefined;

    title: string | undefined;
    content: string | undefined;
  }>({
    id: "",

    title: "",
    content: "",
  });
  const [kegel, setKegel] = useState<KagelTime[] | undefined>(undefined);

  const [quiz, setQuiz] = useState<Quiz[] | undefined>(undefined);

  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });

  useEffect(() => {
    if (unAuthenticatedDayData) {
      const unAuthDayData = unAuthenticatedDayData[0];

      if (unAuthDayData) {
        setBlog({
          id: unAuthDayData?.free_blog?.documentId,
          title: unAuthDayData?.free_blog?.title,
          content: unAuthDayData?.free_blog?.content,
        });

        setQuiz(unAuthDayData?.free_quizz?.quizzess);
        setVideo({ videoUrl: unAuthDayData?.regulerVideo?.url });
        setKegel(unAuthDayData?.free_kagel?.kagelTimes);
      }
    }
  }, [unAuthenticatedDayData, unAuthDayId]);

  const DayCount = parseInt(unAuthDayId) || 0;

  if (isLoading) {
    return (
      <>
        <ProgramSclaton />
      </>
    );
  }

  // if (DayCount > 4) {
  //   return <CompliteTask auth={false} daysCompleted={40} />;
  // }

  return (
    <>
      <Modal
        title="HurraY you have finished another Day! Congratulations. Now time to relax and read blog."
        open={isFinishModalOpen}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Read blogs
          </Button>,
        ]}
      >
        <Image
          className="mx-auto"
          src={DayFinishImage}
          alt="Day Fininsh Congratulation image"
        />
      </Modal>
      {DayCount > 4 ? (
        <CompliteTask auth={false} daysCompleted={40} />
      ) : (
        <TaskPage
          localStorageData={localStorageData}
          handleTaskClick={handleTaskClick}
          selectedTask={selectedTask}
          selectedTaskIndex={selectedTaskIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          blog={blog}
          quiz={quiz}
          video={video}
          kegel={kegel}
          DayCount={DayCount}
          payment={payment}
          daysLeft={0}
        />
      )}
    </>
  );
}

export default UnAuthTask;
