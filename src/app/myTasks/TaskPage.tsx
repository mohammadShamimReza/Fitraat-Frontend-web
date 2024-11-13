"use client";
import { KegelTimes, Quizzes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import Kagel from "./taskPages/Kagel";
import Quiz from "./taskPages/Quiz";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"; // Hamburger icon
import { CiVideoOn } from "react-icons/ci";
import { FaBlogger } from "react-icons/fa6";
import {
  GiFrankensteinCreature,
  GiRank1,
  GiRank2,
  GiRank3,
} from "react-icons/gi";
import { GrStatusPlaceholder, GrYoga } from "react-icons/gr";
import { TbCurrencyFrank, TbMilitaryRank } from "react-icons/tb";

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
  handleDayid,
  paid,
}: {
  localStorageData: {
    video: boolean;
    kagel: boolean;
    quiz: boolean;
    Blog: boolean;
  };
  handleTaskClick: (index: number) => void;
  selectedTask: string;
  selectedTaskIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  blog: {
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
  };
  quiz: Quizzes[] | undefined;
  video: { videoUrl: string | undefined };
  kegel: KegelTimes[] | undefined;
  DayCount: number;
  handleDayid: (id: string) => void;
  paid: boolean | undefined;
}) {
  const tasks = ["video", "kagel", "quiz", "Blog"];
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const icons = [
    <CiVideoOn key={1} />,
    <GrYoga key={2} />,
    <GrStatusPlaceholder key={4} />,
    <FaBlogger key={5} />,
  ];

  const allDays = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="mx-auto min-h-screen p-3 relative">
      <div className="flex min-h-screen">
        {/* Sidebar for desktop and toggle button for mobile */}
        <div
          className={`fixed inset-0 z-20 bg-white w-64 transition-transform transform ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
        >
          <div className="p-4 bg-white border rounded-lg">
            <p className="text-center text-2xl tracking-wider font-extralight p-2 border-b">
              {isSidebarVisible && (
                <button
                  className="fixed top-4 left-4 z-30 text-2xl p-2 md:hidden"
                  onClick={() => setSidebarVisible(false)}
                >
                  <AiOutlineMenu /> {/* Close icon when sidebar is open */}
                </button>
              )}
              Tasks
            </p>
            <div className="mt-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex justify-between hover:bg-slate-100 rounded ${
                    (localStorageData as any)[task] === false
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } ${selectedTask === task && "bg-blue-100"}`}
                  title={
                    (localStorageData as any)[task] === false
                      ? "This task is not unlocked yet"
                      : "You have completed this task"
                  }
                  onClick={() => {
                    if ((localStorageData as any)[task] === true) {
                      handleTaskClick(index);
                    }
                  }}
                >
                  <span
                    className={`transition-colors duration-300 p-2 ${
                      selectedTask === task && "font-bold text-blue-600"
                    }`}
                  >
                    <div className="flex align-middle justify-center">
                      <span className="mr-2 mt-1">{icons[index]}</span>
                      {!collapsed && (
                        <span>
                          {task.charAt(0).toUpperCase() + task.slice(1)}
                        </span>
                      )}
                    </div>
                  </span>
                  <span className="pl-3 right-0 p-2">
                    <FaCheckCircle
                      size={25}
                      style={{
                        color:
                          (localStorageData as any)[task] === true
                            ? "#0578EA"
                            : "gray",
                        fontWeight: "bold",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-2xl tracking-wider font-extralight p-2 border-b border-t mt-[100%]">
              Days
            </p>
            <div className="mt-4 h-60 overflow-scroll">
              {allDays.map((day, index) => (
                <div
                  key={index}
                  className={`flex justify-between hover:bg-slate-100 rounded ${
                    DayCount >= day ? "cursor-pointer" : "cursor-not-allowed"
                  } ${DayCount === day ? "bg-blue-100" : ""} ${
                    paid === undefined || paid === false
                      ? day > 3
                        ? "blur-sm"
                        : "blur-none"
                      : ""
                  }`}
                  title={DayCount >= day ? "Unlocked" : "Locked"}
                  onClick={() =>
                    DayCount >= day ? handleDayid(day.toString()) : ""
                  }
                >
                  <span
                    className={`transition-colors duration-300 p-2 ${
                      DayCount === day && "font-bold text-blue-600"
                    }`}
                  >
                    <div className="flex align-middle justify-center">
                      {!collapsed && <span>Day: {day}</span>}
                    </div>
                  </span>
                  <span className="mt-2">
                    {paid === undefined || paid === false
                      ? day > 3
                        ? "Paid"
                        : "Demo"
                      : ""}
                  </span>
                  <span className="pl-3 right-0 p-2">
                    <FaCheckCircle
                      size={25}
                      style={{
                        color: DayCount >= day ? "#0578EA" : "gray",
                        fontWeight: "bold",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Hamburger Button for Mobile */}
        {!isSidebarVisible && (
          <button
            className="absolute top-4 left-4  text-2xl p-2 md:hidden"
            onClick={() => setSidebarVisible(true)}
          >
            <AiOutlineMenu /> {/* Hamburger icon when sidebar is closed */}
          </button>
        )}

        {/* Main Content */}
        <div className="flex-grow p-6">
          <div className="backgroundDot p-5 rounded-lg">
            <div className="mx-auto flex flex-col justify-evenly gap-3">
              <div className="basis-1/6">
                <p className="text-3xl font-bold text-left flex justify-between">
                  <span>Day: {DayCount}</span>
                  <Link href="/emergency">
                    <button className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-white transition-all duration-300 ease-out bg-black border border-gray-700 rounded-md hover:bg-gray-900 animate-border-glow">
                      <span className="relative  text-sm">⚡ Emergency ⚡</span>
                    </button>
                  </Link>
                  <span className="flex items-center gap-2">
                    Rank:{" "}
                    {DayCount < 5 ? (
                      <GiFrankensteinCreature />
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
                  </span>
                </p>
              </div>
              <br />
              <div className="h-[30rem]">
                <div className="basis-4/6 border p-3 rounded-lg h-full">
                  <Video selectedTask={selectedTask} video={video} />
                  <Kagel selectedTask={selectedTask} kegel={kegel} />
                  <Quiz selectedTask={selectedTask} quiz={quiz} />
                  <SuggestedBlog selectedTask={selectedTask} blog={blog} />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/6 flex justify-center align-bottom flex-col p-10">
            <div className="flex justify-between">
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none text-lg ${
                  selectedTaskIndex === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
                onClick={handlePrevious}
                disabled={selectedTaskIndex === 0}
              >
                <ArrowLeftOutlined style={{ paddingRight: "10px" }} />
                Previous
              </button>
              <button
                className="px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700 text-lg"
                onClick={handleNext}
              >
                {selectedTask === "Blog" ? "Complete" : "Next"}
                <ArrowRightOutlined style={{ paddingLeft: "10px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
