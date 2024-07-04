"use client";
import { KegelTimes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import Kagel from "./taskPages/Kagel";
import Quiz from "./taskPages/Quiz";
import Reward from "./taskPages/Reward";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

import { Layout, theme } from "antd";
import { useState } from "react";
import { CiVideoOn } from "react-icons/ci";
import { FaBlogger } from "react-icons/fa6";
import { GrStatusPlaceholder, GrTag, GrYoga } from "react-icons/gr";

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
  reward,
  kegel,
  DayCount,
}: {
  localStorageData: {
    video: boolean;
    kagel: boolean;
    quiz: boolean;
    rewards: boolean;
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
  quiz: {
    question: string | undefined;
    answer: string | undefined;
    quizOptions: string | undefined;
  };

  video: {
    videoUrl: string | undefined;
  };
  reward: {
    rewardContant: string | undefined;
  };
  kegel: KegelTimes[] | undefined;
  DayCount: number;
}) {
  const tasks = ["video", "kagel", "quiz", "rewards", "Blog"];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const icons = [
    <CiVideoOn key={1} />,
    <GrYoga key={2} />,
    // <GrSteps key={3} />,
    <GrStatusPlaceholder key={4} />,
    <GrTag key={5} />,
    <FaBlogger key={6} />,
  ];

  return (
    <div className="mx-auto min-h-screen p-3">
      <Layout style={{ minHeight: "100vh", borderRadius: "30px" }}>
        <div className="bg-white  min-h-screen ">
          <Sider theme="light" className="" breakpoint="sm" collapsedWidth="0">
            <div className="demo-logo-vertical" />
            <p className="text-center text-2xl tracking-wider font-extralight  p-2 border">
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
                    <div className="flex align-middle justify-center">
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
                  <div className=""></div>
                  <p className="text-3xl font-bold text-left">
                    Day: {DayCount}
                  </p>
                  <p className="text-2xl font-bold text-center ">
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
                    <Reward selectedTask={selectedTask} reward={reward} />
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
                  Next
                  <span style={{ paddingLeft: "10px" }}>
                    <ArrowRightOutlined />
                  </span>
                </button>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* 
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 pr-8 mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold ">Your Task for Today</h2>
            <ul className="list-decimal pl-6">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex justify-between h-10  hover:bg-slate-100 rounded ${
                    (localStorageData as any)[task] === false
                      ? " cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
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
                  <li
                    className={`transition-colors duration-300  p-2 ${
                      selectedTask === task && "font-bold text-blue-600"
                    }`}
                  >
                    {task.replace(/^\w/, (c) => c.toUpperCase())}
                  </li>
                  <span className="pl-3 right-0 p-2">
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
            </ul>
          </div>

          <div className="lg:w-2/3">
            <div
              // style={{ height: "500px" }}
              className="p-3  mx-auto flex flex-col justify-evenly "
            >
              <div className="basis-1/6">
                <div className=""></div>
                <p className="text-3xl font-bold text-left">Day: {DayCount}</p>
                <p className="text-2xl font-bold text-center ">
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
                  <Reward selectedTask={selectedTask} reward={reward} />
                  <SuggestedBlog selectedTask={selectedTask} blog={blog} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default TaskPage;
