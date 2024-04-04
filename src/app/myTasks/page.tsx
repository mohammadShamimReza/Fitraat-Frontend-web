"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import React, { useEffect, useState } from "react";
import AuthMyTask from "./AuthMyTask";
import UnAuthTask from "./UnAuthTask";

const MyTasks: React.FC = () => {
  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();
  const [blog, setBlog] = useState<{
    title: string | undefined;
    content: string | undefined;
  }>({
    title: "",
    content: "",
  });
  const [kegel, setKegel] = useState();
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

  const authDayData = authenticatedUserInfoData?.currentDay;
  useEffect(() => {
    if (authenticatedUserInfoData) {
      const authDayData = authenticatedUserInfoData.currentDay;
      if (authDayData) {
        setBlog({
          title: authDayData.blog.title,
          content: authDayData.blog.content,
        });
        setQuiz({
          answer: authDayData.quiz.answer,
          question: authDayData.quiz.question,
          quizOptions: authDayData.quiz.quizOptions,
        });
        setSort_note({
          sortNoteContent: authDayData.sort_note.sortNoteContent,
        });
        setVideo({ videoUrl: authDayData.video.VideoUrl });
        setReward({ rewardContant: authDayData.reward });
      }
    }
  }, [authenticatedUserInfoData]);
  console.log(authenticatedUserInfoData);

  if (
    authenticatedUserInfoData === undefined &&
    authenticatedUserInfoDataError === true
  ) {
    return (
      // ! Unauthenticated user render
      <UnAuthTask />
    );
  } else if (
    authenticatedUserInfoData &&
    authenticatedUserInfoDataError === false
  ) {
    return (
      // ! authenticate user render
      <AuthMyTask
        blog={blog}
        quiz={quiz}
        sort_note={sort_note}
        video={video}
        reward={reward}
      />
    );
  }
};

export default MyTasks;
