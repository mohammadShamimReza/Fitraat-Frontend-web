"use client";
import { useUpdateUserDayMutation } from "@/redux/api/authApi";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearDayData } from "@/redux/slice/daySlice";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { KegelTimes, Quizzes } from "@/types/contantType";
import { Button, message, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DayFinishImage from "../assets//dayFinish.gif";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

function AuthMyTask({
  authDayDataId,
  userId,
  paid,
}: {
  authDayDataId: number;
  userId: number;
  paid: boolean | undefined;
}) {
  const router = useRouter();

  const tasks = ["video", "kagel", "quiz", "Blog"];

  const [dayId, setDayId] = useState(authDayDataId);

  let authenticatedDayData;

  authenticatedDayData = useAppSelector((state) => state.daySlice.data);

  const { data: authenticatedDayDataForChengeDay, isError } =
    useGetDaysByDayIdQuery(authDayDataId);

  if (!authenticatedDayData) {
    authenticatedDayData = authenticatedDayDataForChengeDay?.data;
  }

  const [updataUserDay] = useUpdateUserDayMutation();

  const currentTask = useAppSelector((state) => state.taskSlice.currentTask);
  const dispatch = useAppDispatch();

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = currentTask || tasks[selectedTaskIndex];

  const initialLocalStorageData = localStorage.getItem("AuthDay");
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
  useEffect(() => {
    localStorage.setItem("AuthDay", JSON.stringify(localStorageData));
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

  const handleNext = async () => {
    if (selectedTask === "Blog") {
      setSelectedTaskIndex(0);
      dispatch(clearDayData());

      setIsFinishModalOpen(true);
      dispatch(storeCurrentTask(tasks[0]));
      if (authDayDataId === 40) {
        setLocalStorageData((prevState: typeof localStorageData) => ({
          ...prevState,
          [selectedTask]: true,
        }));
      } else {
        localStorage.setItem(
          "AuthDay",
          JSON.stringify(defaultLocalStorageData)
        );
      }

      if (authDayDataId + 1 === 40) {
        message.success(
          "Hurray this is you last day of task. Then you becone spartan"
        );
        await updataUserDay({
          currentDay: authDayDataId + 1,
          compliteDay: authDayDataId,
          userId: userId,
        });
        router.push("/freeBlog");
      } else if (authDayDataId + 1 > 40) {
        message.success(
          "Congratulations you have successfully completed your tasks for 40 day"
        );

        router.push("/CompletedTask");
      } else if (authDayDataId + 1 <= 40) {
        await updataUserDay({
          currentDay: authDayDataId + 1,
          compliteDay: authDayDataId,
          userId: userId,
        });
        router.push("/freeBlog");
      }
    } else {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
    }
  };
  const handleOk = () => {
    setIsFinishModalOpen(false);
    router.push("/freeBlog");
  };

  const [blog, setBlog] = useState<{
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
    viewCount: number;
  }>({
    id: 1,
    title: "",
    content: "",
    viewCount: 0,
  });
  const [kegel, setKegel] = useState<KegelTimes[] | undefined>(undefined);
  const [quiz, setQuiz] = useState<Quizzes[] | undefined>(undefined);

  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });

  useEffect(() => {
    if (authenticatedDayData) {
      const authDayData = authenticatedDayData[0].attributes;
      if (authDayData) {
        setBlog({
          id: authDayData.blog.data.id,
          title: authDayData.blog.data.attributes.title,
          content: authDayData.blog.data.attributes.content,
          viewCount: authDayData.blog.data.attributes.viewCount,
        });
        setQuiz(authDayData?.quizzes.data);

        setVideo({ videoUrl: authDayData.video.data.attributes.VideoUrl });
        setKegel(authDayData?.kegel.data.attributes.kegel_times.data);
      }
    }
  }, [authenticatedDayData]);

  const DayCount = authDayDataId;

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
        <CompliteTask auth={true} daysCompleted={40} />
      ) : (
        <>
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
            paid={paid}
          />
        </>
      )}
    </>
  );
}

export default AuthMyTask;
