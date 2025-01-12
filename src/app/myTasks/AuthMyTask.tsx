"use client";
import { useUpdateUserDayMutation } from "@/redux/api/authApi";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearDayData } from "@/redux/slice/daySlice";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { KegelTimes, Quizzes } from "@/types/contantType";
import { Button, message, Modal, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import DayFinishImage from "../asset/dayFinish.gif";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

function AuthMyTask({
  authDayDataId,
  userId,
  paid,
  daysLeft,
}: {
  authDayDataId: number;
  userId: number;
  paid: boolean | undefined;
  daysLeft: number;
}) {
  const router = useRouter();

  const tasks = ["video", "kagel", "quiz", "Blog"];

  const {
    data: authenticatedDayDataForChengeDay,
    isError,
    isLoading,
  } = useGetDaysByDayIdQuery(authDayDataId);

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

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-200 p-4 rounded-md">
            <Skeleton active title={false} paragraph={{ rows: 5 }} />
          </div>

          {/* Content Box */}
          <div className="flex-1 bg-white p-20">
            <Skeleton
              active
              title={{ width: "60%" }}
              paragraph={{
                rows: 10,
                width: ["100%", "90%", "80%", "70%", "50%"],
              }}
            />
          </div>
        </div>
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
            paid={paid}
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
            <Link href="/books">
              <Button
                type="primary"
                className="bg-green-500 hover:bg-green-600 px-6 py-2"
              >
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthMyTask;
