"use client";
import { useUpdateUserDayMutation } from "@/redux/api/authApi";
import { useGetAuthDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearDayData } from "@/redux/slice/daySlice";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { ProKagelTime, ProQuiz } from "@/types/contantType";
import { Button, message, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import DayFinishImage from "../../app/assets/dayFinish.gif";
import ProgramSclaton from "../structure/ProgramSclaton";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

function AuthMyTask({
  authDayDataId,
  userId,
  payment,
  daysLeft,
}: {
  authDayDataId: number;
  userId: number;
  payment: string | undefined;
  daysLeft: number;
}) {
  const router = useRouter();

  const tasks = ["video", "kagel", "quiz", "Blog"];

  const {
    data: authenticatedDayDataForChengeDay,
    isError,
    isLoading,
  } = useGetAuthDaysByDayIdQuery(authDayDataId);

  const authenticatedDayData = authenticatedDayDataForChengeDay?.data;

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
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
      setLocalStorageData(defaultLocalStorageData);
      setSelectedTaskIndex(0);
      dispatch(clearDayData());

      setIsFinishModalOpen(true);
      dispatch(storeCurrentTask(tasks[0]));
      localStorage.setItem("AuthDay", JSON.stringify(defaultLocalStorageData));

      if (authDayDataId + 1 === 40) {
        message.success(
          "Hurray this is you last day of task. Then you become spartan"
        );
        await updataUserDay({
          currentDay: authDayDataId + 1,
          compliteDay: authDayDataId,
          userId: userId,
        });
      } else if (authDayDataId + 1 > 40) {
        message.success(
          "Congratulations you have successfully completed your tasks for 40 day"
        );
      } else if (authDayDataId + 1 <= 40) {
        const res = await updataUserDay({
          currentDay: authDayDataId + 1,
          compliteDay: authDayDataId,
          userId: userId,
        });
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
    id: string | undefined;
    title: string | undefined;
    content: string | undefined;
  }>({
    id: "",
    title: "",
    content: "",
  });
  const [kegel, setKegel] = useState<ProKagelTime[] | undefined>(undefined);
  const [quiz, setQuiz] = useState<ProQuiz[] | undefined>(undefined);

  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });

  useEffect(() => {
    if (authenticatedDayData) {
      const authDayData = authenticatedDayData[0];
      if (authDayData) {
        setBlog({
          id: authDayData?.pro_blog?.documentId,
          title: authDayData?.pro_blog?.titile,
          content: authDayData?.pro_blog?.content,
        });
        setQuiz(authDayData?.pro_quizz?.quizzess);

        setVideo({ videoUrl: authDayData?.regulerVideo?.url });
        setKegel(authDayData?.pro_kagel?.kagelTimes);
      }
    }
  }, [authenticatedDayData]);

  const DayCount = authDayDataId;

  if (isLoading) {
    return (
      <>
        <ProgramSclaton />
      </>
    );
  }

  return (
    <>
      <Modal
        title="Hurra you have finished another Day! Congratulations"
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
      {DayCount > 40 ? (
        <CompliteTask auth={true} daysCompleted={40} />
      ) : authDayDataId <= daysLeft ? (
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
            payment={payment}
            daysLeft={daysLeft}
          />
        </>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center  p-6">
          {/* Congratulations Message */}
          <div className="text-center mb-8">
            <FaRegSmileBeam className="text-yellow-500 text-5xl mb-4" />
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-lg">
              You&apos;ve successfully completed your tasks for the day. 🎉
            </p>
            <p className="text-gray-600 mt-4">
              Pro Tip: Stay on track by exploring a blog or a book to keep
              yourself motivated.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link href="/freeBlog">
              <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2"
              >
                Explore Blogs
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthMyTask;
