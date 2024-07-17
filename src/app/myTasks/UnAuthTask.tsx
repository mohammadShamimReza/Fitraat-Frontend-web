"use client";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { KegelTimes } from "@/types/contantType";
import { Button, message, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

import DayFinishImage from "../assets/dayFinish.gif";

function UnAuthTask({}) {
  const router = useRouter();
  const [unAuthDayId, setUnAuthDayId] = useState("1");

  const { data: unAuthenticatedDayData, isError } = useGetDaysByDayIdQuery(
    parseInt(unAuthDayId)
  );

  console.log(unAuthenticatedDayData);

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
    setIsFinishModalOpen(true);

    if (selectedTask === "Blog") {
      dispatch(storeCurrentTask(tasks[0]));
      setIsFinishModalOpen(true);
      localStorage.setItem(
        "UnAuthDay",
        JSON.stringify(defaultLocalStorageData)
      );

      if (unAuthDayId === null) {
        localStorage.setItem("unAuthDayId", "1");
      } else if (unAuthDayId !== null) {
        let parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
        if (parsedUnAuthDayId === 40) {
          message.success(
            "Hurray this is you last day of task. Then you becone spartan"
          );
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
          router.push("/blog");
        } else if (parsedUnAuthDayId > 40) {
          message.success(
            "Congratulations you have successfully completed your tasks for 40 day"
          );
          window.location.reload();
        }
        if (parsedUnAuthDayId <= 41) {
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
          router.push("/blog");
        }
      }
    } else {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
    }
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
    }
  };
  useEffect(() => {
    setUnAuthDayId(window.localStorage.getItem("unAuthDayId") || "1");
  }, []);
  const showModal = () => {
    setIsFinishModalOpen(true);
  };

  const handleOk = () => {
    setIsFinishModalOpen(false);
  };

  const handleCancel = () => {
    setIsFinishModalOpen(false);
  };

  const [blog, setBlog] = useState<{
    id: number | undefined;

    title: string | undefined;
    content: string | undefined;
  }>({
    id: 1,

    title: "",
    content: "",
  });
  const [kegel, setKegel] = useState<KegelTimes[] | undefined>(undefined);
  const [quiz, setQuiz] = useState<{
    question: string | undefined;
    answer: string | undefined;
    quizOptions: string | undefined;
  }>({
    question: "",
    answer: "",
    quizOptions: "",
  });

  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });

  useEffect(() => {
    if (unAuthenticatedDayData) {
      const unAuthDayData = unAuthenticatedDayData?.data[0].attributes;
      if (unAuthDayData) {
        setBlog({
          id: unAuthDayData.blog.data.id,

          title: unAuthDayData.blog.data.attributes.title,
          content: unAuthDayData.blog.data.attributes.content,
        });
        setQuiz({
          answer: unAuthDayData.quiz.data.attributes.answer,
          question: unAuthDayData.quiz.data.attributes.question,
          quizOptions: unAuthDayData.quiz.data.attributes.quizOptions,
        });

        setVideo({ videoUrl: unAuthDayData.video.data.attributes.VideoUrl });

        setKegel(unAuthDayData?.kegel.data.attributes.kegel_times.data);
      }
    }
  }, [unAuthenticatedDayData, unAuthDayId]);

  const DayCount = parseInt(unAuthDayId) || 0;

  const handleDayid = (id: string) => {
    setUnAuthDayId(id.toString());
  };

  return (
    <>
      <Modal
        title="Hurra you have finished another Day! Congratulations"
        open={isFinishModalOpen}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Image
          className="mx-auto"
          src={DayFinishImage}
          alt="Day Fininsh Congratulation image"
        />
      </Modal>
      {DayCount > 40 ? (
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
          handleDayid={handleDayid}
        />
      )}
    </>
  );
}

export default UnAuthTask;
