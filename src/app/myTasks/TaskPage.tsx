"use client";
import { KegelTimes, Quizzes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import Kagel from "./taskPages/Kagel";
import Quiz from "./taskPages/Quiz";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

import { Layout, theme } from "antd";
import { useState } from "react";
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

const { Header, Sider, Content } = Layout;

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

  video: {
    videoUrl: string | undefined;
  };

  kegel: KegelTimes[] | undefined;
  DayCount: number;
  handleDayid: (id: string) => void;
  paid: boolean | undefined;
}) {
  const tasks = ["video", "kagel", "quiz", "Blog"];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const icons = [
    <CiVideoOn key={1} />,
    <GrYoga key={2} />,
    // <GrSteps key={3} />,
    <GrStatusPlaceholder key={4} />,
    <FaBlogger key={5} />,
  ];


  const allDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  return (
    <div className="mx-auto min-h-screen p-3">
      <Layout style={{ minHeight: "100vh", borderRadius: "30px" }}>
        <div className="bg-white  min-h-screen relative">
          <Sider
            theme="light"
            className="border rounded-lg"
            breakpoint="sm"
            collapsedWidth="0"
          >
            <div className="demo-logo-vertical" />
            <p className="text-center text-2xl tracking-wider font-extralight  p-2 border-b">
              Tasks
            </p>
            <div className="mt-4">
              {" "}
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex justify-between hover:bg-slate-100 rounded ${
                    (localStorageData as any)[task] === false
                      ? " cursor-not-allowed"
                      : "cursor-pointer"
                  } ${selectedTask === task && "bg-blue-100"}`}
                  title={
                    (localStorageData as any)[task] === false
                      ? "This task is not unlock yet"
                      : "you have completed this task"
                  }
                  onClick={() => {
                    if ((localStorageData as any)[task] === true) {
                      handleTaskClick(index);
                    }
                  }}
                >
                  {" "}
                  <span
                    className={`transition-colors duration-300  p-2 ${
                      selectedTask === task && "font-bold text-blue-600"
                    }`}
                  >
                    <div className="flex align-middlehandleDayid justify-center">
                      {" "}
                      <span className="mr-2 mt-1"> {icons[index]}</span>
                      {!collapsed ? (
                        <span className="">
                          {task.replace(/^\w/, (c) => c.toUpperCase())}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </span>
                  <span className="pl-3 right-0 p-2 ">
                    <FaCheckCircle
                      className=""
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
            <p className="text-center text-2xl tracking-wider font-extralight  p-2 border-b border-t mt-[100%]">
              Days
            </p>
            <div className="mt-4 h-60 overflow-scroll">
              {" "}
              {allDays.map((day, index) => (
                <div
                  key={index}
                  className={`flex justify-between hover:bg-slate-100 rounded ${
                    DayCount >= day ? "cursor-pointer " : "cursor-not-allowed"
                  } ${DayCount === day ? "bg-blue-100" : ""}  ${
                    paid === undefined || false
                      ? day > 3
                        ? "blur-sm"
                        : "blur-none"
                      : ""
                  }`}
                  title={DayCount >= day ? "Unlocked" : "lock"}
                  onClick={() =>
                    DayCount >= day ? handleDayid(day.toString()) : ""
                  }
                >
                  {" "}
                  <span
                    className={`transition-colors duration-300  p-2  ${
                      DayCount === day && "font-bold text-blue-600 "
                    }`}
                  >
                    <div className="flex align-middle justify-center">
                      {!collapsed ? <span className="">Day: {day}</span> : ""}
                    </div>
                  </span>
                  <span className={`mt-2 `}>
                    {paid === undefined || false
                      ? day > 3
                        ? "Paid"
                        : "Demo"
                      : ""}
                  </span>
                  <span className="pl-3 right-0 p-2 ">
                    <FaCheckCircle
                      className=""
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
          </Sider>
        </div>

        <Layout>
          {/* <Header
            style={{ padding: 0, background: colorBgContainer }}
            className=" rounded"
          ></Header> */}
          <Content
            style={{
              // margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="backgroundDot p-5">
              <div
                // style={{ height: "500px" }}
                className=" mx-auto flex flex-col justify-evenly "
              >
                <div className="basis-1/6">
                  <p className="text-3xl font-bold text-left flex justify-between ">
                    <span>Day: {DayCount}</span>{" "}
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
                  <p className="text-2xl font-bold text-center mb-2">
                    {selectedTask.replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                </div>

                <br />
                <div
                  className="h-[30rem]"
                  // style={{
                  //   width: "100%",
                  //   height: "380px",
                  // }}
                >
                  <div className="basis-4/6 border p-3 rounded-lg h-full ">
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
                      ? "bg-gray-500 cursor-not-allowed "
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={handlePrevious}
                  disabled={selectedTaskIndex === 0}
                >
                  <span style={{ paddingRight: "10px" }}>
                    {" "}
                    <ArrowLeftOutlined />
                  </span>
                  Previous
                </button>

                <button
                  className={
                    "px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700 text-lg"
                  }
                  onClick={handleNext}
                >
                  {selectedTask === "Blog" ? "Complete" : "Next"}
                  <span style={{ paddingLeft: "10px" }}>
                    <ArrowRightOutlined />
                  </span>
                </button>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default TaskPage;
