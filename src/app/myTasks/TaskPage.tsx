"use client";

import { KagelTime, Quiz } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CiVideoOn } from "react-icons/ci";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa6";
import {
  GiFrankensteinCreature,
  GiRank1,
  GiRank2,
  GiRank3,
} from "react-icons/gi";
import { GrStatusPlaceholder, GrYoga } from "react-icons/gr";
import { IoMdClose, IoMdLock } from "react-icons/io";
import { TbCurrencyFrank, TbMilitaryRank } from "react-icons/tb";
import Kagel from "./taskPages/Kagel";
import Quizz from "./taskPages/Quiz";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

interface Props {
  localStorageData: Record<string, boolean>;
  handleTaskClick: (index: number) => void;
  selectedTask: string;
  selectedTaskIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  blog: {
    id: string | undefined;
    title: string | undefined;
    content: string | undefined;
  };
  quiz: Quiz[] | undefined;
  video: { videoUrl: string | undefined };
  kegel: KagelTime[] | undefined;
  DayCount: number;
  payment: string | undefined;
  daysLeft: number;
}

function TaskPage({
  localStorageData,
  handleTaskClick,
  selectedTask,
  selectedTaskIndex,
  handlePrevious,
  handleNext,
  blog,
  quiz,
  video,
  kegel,
  DayCount,
  payment,
  daysLeft,
}: Props) {
 

 

  const tasks = ["video", "kagel", "quiz", "Blog"];
  const icons = [
    <CiVideoOn key={1} />,
    <GrYoga key={2} />,
    <GrStatusPlaceholder key={4} />,
    <FaBlogger key={5} />,
  ];
  const allDays = Array.from({ length: 40 }, (_, i) => i + 1);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const renderTaskItem = (task: string, index: number) => {
    const isUnlocked = localStorageData[task];
    return (
      <div
        key={index}
        className={`flex justify-between items-center hover:bg-slate-100 rounded ${
          isUnlocked ? "cursor-pointer" : "cursor-not-allowed"
        } ${selectedTask === task ? "bg-blue-100" : ""}`}
        title={
          isUnlocked
            ? "You have completed this task"
            : "This task is not unlocked yet"
        }
        onClick={() => isUnlocked && handleTaskClick(index)}
      >
        <div
          className={`p-2 ${
            selectedTask === task ? "font-bold text-blue-600" : ""
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">{icons[index]}</span>
            <span>{task.charAt(0).toUpperCase() + task.slice(1)}</span>
          </div>
        </div>
        <FaCheckCircle
          size={25}
          style={{
            color: isUnlocked ? "#0578EA" : "gray",
          }}
        />
      </div>
    );
  };

  const renderDayItem = (day: number) => {
    const isUnlocked = DayCount >= day;
    const isPaidLocked = payment != "Complete" && day > 3;

    return (
      <div
        key={day}
        className={`flex justify-between items-center hover:bg-slate-100 rounded 
          
        ${DayCount === day ? "bg-blue-100" : ""} ${
          isPaidLocked ? "blur-sm" : ""
        }`}
        title={isUnlocked ? "Unlocked" : "Locked"}
      >
        <div
          className={`p-2 ${DayCount === day ? "font-bold text-blue-600" : ""}`}
        >
          <span>Day: {day}</span>
        </div>
        <span>{day > 3 ? "Paid" : "Free"}</span>
        {day <= daysLeft ? (
          <FaCheckCircle
            size={25}
            style={{
              color: isUnlocked ? "#0578EA" : "gray",
            }}
          />
        ) : payment != "Complete" ? (
          <FaCheckCircle
            size={25}
            style={{
              color: isUnlocked ? "#0578EA" : "gray",
            }}
          />
        ) : (
          <IoMdLock
            size={25}
            style={{
              color: isUnlocked ? "#0578EA" : "gray",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto  p-3 relative mt-10">
      <div className="flex ">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-20 bg-white min-w-64 transition-transform transform ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
        >
          <div className="">
            {isSidebarVisible && (
              <button
                className="mt-20 ml-5 left-4 z-30 text-2xl p-2 md:hidden "
                onClick={() => setSidebarVisible(false)}
              >
                <IoMdClose /> {/* Close icon when sidebar is open */}
              </button>
            )}
          </div>

          <div className="p-4  bg-white border rounded-lg">
            <div className="text-center text-2xl font-light border-b p-2">
              Tasks
            </div>
            <div className="mt-4">{tasks.map(renderTaskItem)}</div>
            <div className="text-center text-2xl font-light border-b border-t mt-auto p-2">
              Days
            </div>
            <div className="mt-4 h-96 overflow-scroll">
              {allDays.map(renderDayItem)}
            </div>
          </div>
        </div>

        {/* Hamburger Button */}
        {!isSidebarVisible && (
          <button
            className="absolute top-4 left-4 text-2xl p-2 md:hidden"
            onClick={() => setSidebarVisible(true)}
          >
            <AiOutlineMenu />
          </button>
        )}

        {/* Main Content */}
        <div className="flex-grow p-6 border rounded-lg">
          <div className="backgroundDot rounded-lg">
            <div className="mx-auto flex flex-col gap-3">
              <Link href="/emergency" className="self-center">
                <button className="relative px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900">
                  ⚡ Emergency ⚡
                </button>
              </Link>

              <div className="text-xl font-bold flex justify-between">
                <span>Day: {DayCount}</span>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    Rank:{" "}
                    {DayCount < 5 ? (
                      <GiFrankensteinCreature color="blue" />
                    ) : DayCount >= 40 ? (
                      <TbMilitaryRank style={{ color: "red" }} />
                    ) : DayCount > 30 ? (
                      <GiRank3 style={{ color: "red" }} />
                    ) : DayCount > 20 ? (
                      <GiRank2 style={{ color: "red" }} />
                    ) : DayCount >= 10 ? (
                      <GiRank1 style={{ color: "red" }} />
                    ) : (
                      <TbCurrencyFrank />
                    )}
                  </div>
                  <Link
                    href="https://www.youtube.com/watch?v=M1lStPv08_I"
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <FaInfoCircle />
                    <span>Info</span>
                  </Link>
                </div>
              </div>
              <div className="h-[30rem]">
                {selectedTask === "video" && (
                  <Video selectedTask={selectedTask} video={video} />
                )}
                {selectedTask === "kagel" && (
                  <Kagel selectedTask={selectedTask} kegel={kegel} />
                )}
                {selectedTask === "quiz" && (
                  <Quizz selectedTask={selectedTask} quiz={quiz} />
                )}
                {selectedTask === "Blog" && (
                  <SuggestedBlog selectedTask={selectedTask} blog={blog} />
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className={`px-4 py-2 text-white rounded ${
                selectedTaskIndex === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              onClick={handlePrevious}
              disabled={selectedTaskIndex === 0}
            >
              <ArrowLeftOutlined className="mr-2" />
              Previous
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded"
              onClick={handleNext}
            >
              {selectedTask === "Blog" ? "Complete" : "Next"}
              <ArrowRightOutlined className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
