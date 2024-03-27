"use client";
import { useGetDaysByIdQuery } from "@/redux/api/dayApi";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Kagel from "./taskPages/Kagel";
import Quiz from "./taskPages/Quiz";
import Reward from "./taskPages/Reward";
import SortNote from "./taskPages/SortNote";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

const MyTasks: React.FC = () => {
  const { data } = useGetDaysByIdQuery("1");
  console.log(data);
  const tasks = [
    "video",
    "kagel",
    "sortNote",
    "quiz",
    "rewards",
    "suggestBlog",
  ];
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
    }
  };

  const selectedTask = tasks[selectedTaskIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Task List */}
        <div className="lg:w-1/3 pr-8 mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold ">Your Task for Today</h2>
          <ul className="list-decimal pl-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between h-10 cursor-pointer hover:bg-slate-100 rounded"
                onClick={() => handleTaskClick(index)}
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
                    style={{ color: "blue", fontWeight: "bold" }}
                  />
                </span>
              </div>
            ))}
          </ul>
        </div>

        <div className="lg:w-2/3">
          <div
            style={{ height: "500px" }}
            className="p-3 rounded-lg shadow-md    mx-auto flex flex-col justify-evenly "
          >
            <div className="basis-1/6">
              <h3 className="text-xl font-bold ">
                {selectedTask.replace(/^\w/, (c) => c.toUpperCase())}
              </h3>
            </div>
            <div className="basis-4/6">
              <Video selectedTask={selectedTask} />
              <Kagel selectedTask={selectedTask} />
              <SortNote selectedTask={selectedTask} />
              <Quiz selectedTask={selectedTask} />
              <Reward selectedTask={selectedTask} />
              <SuggestedBlog selectedTask={selectedTask} />
            </div>
            <div className="basis-1/6 flex justify-center align-bottom flex-col">
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded  hover:bg-gray-600 focus:outline-none"
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
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none"
                  onClick={handleNext}
                  disabled={selectedTaskIndex === tasks.length - 1}
                >
                  Next
                  <span style={{ paddingLeft: "10px" }}>
                    <ArrowRightOutlined />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
