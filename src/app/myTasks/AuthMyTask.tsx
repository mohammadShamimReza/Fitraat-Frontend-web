"use client";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { KegelTimes } from "@/types/contantType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskPage from "./TaskPage";

function AuthMyTask({ authDayDataId }: { authDayDataId: number }) {
  const router = useRouter();

  const tasks = [
    "video",
    "kagel",
    "sortNote",
    "quiz",
    "rewards",
    "suggestBlog",
  ];

  const { data: authenticatedDayData, isError } =
    useGetDaysByDayIdQuery(authDayDataId);

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = tasks[selectedTaskIndex];
  const initialLocalStorageData = localStorage.getItem("AuthDay");
  const defaultLocalStorageData = {
    video: false,
    kagel: false,
    sortNote: false,
    quiz: false,
    rewards: false,
    suggestBlog: false,
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
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };
  const handleNext = () => {
    setLocalStorageData((prevState: typeof localStorageData) => ({
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

  const [blog, setBlog] = useState<{
    title: string | undefined;
    content: string | undefined;
  }>({
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
  const [sort_note, setSort_note] = useState<{
    sortNoteContent: string | undefined;
  }>({
    sortNoteContent: "",
  });
  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });
  const [reward, setReward] = useState<{ rewardContant: string | undefined }>({
    rewardContant: "",
  });

  useEffect(() => {
    if (authenticatedDayData) {
      const authDayData = authenticatedDayData?.data[0].attributes;
      if (authDayData) {
        setBlog({
          title: authDayData.blog.data.attributes.title,
          content: authDayData.blog.data.attributes.content,
        });
        setQuiz({
          answer: authDayData.quiz.data.attributes.answer,
          question: authDayData.quiz.data.attributes.question,
          quizOptions: authDayData.quiz.data.attributes.quizOptions,
        });
        setSort_note({
          sortNoteContent:
            authDayData.sort_note.data.attributes.sortNoteContent,
        });
        setVideo({ videoUrl: authDayData.video.data.attributes.VideoUrl });
        setReward({ rewardContant: authDayData.reward });
        setKegel(authDayData?.kegel.data.attributes.kegel_times.data);
      }
    }
  }, [authenticatedDayData]);

  return (
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
        sort_note={sort_note}
        video={video}
        reward={reward}
        kegel={kegel}
      />
    </>
  );
}

export default AuthMyTask;
