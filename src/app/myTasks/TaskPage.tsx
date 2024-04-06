"use client";
import { KegelTimes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import Kagel from "./taskPages/Kagel";
import Quiz from "./taskPages/Quiz";
import Reward from "./taskPages/Reward";
import SortNote from "./taskPages/SortNote";
import SuggestedBlog from "./taskPages/SuggestedBlog";
import Video from "./taskPages/Video";

function TaskPage({
  localStorageData,

  handleTaskClick,
  selectedTask,
  selectedTaskIndex,
  handlePrevious,
  handleNext,
  blog,
  quiz,
  sort_note,
  video,
  reward,
  kegel,
}: {
  localStorageData: {
    video: boolean;
    kagel: boolean;
    sortNote: boolean;
    quiz: boolean;
    rewards: boolean;
    suggestBlog: boolean;
  };
  handleTaskClick: (index: number) => void;
  selectedTask: string;
  selectedTaskIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  blog: {
    title: string | undefined;
    content: string | undefined;
  };
  quiz: {
    question: string | undefined;
    answer: string | undefined;
    quizOptions: string | undefined;
  };
  sort_note: {
    sortNoteContent: string | undefined;
  };
  video: {
    videoUrl: string | undefined;
  };
  reward: {
    rewardContant: string | undefined;
  };
  kegel: KegelTimes[] | undefined;
}) {
  const tasks = [
    "video",
    "kagel",
    "sortNote",
    "quiz",
    "rewards",
    "suggestBlog",
  ];
  return (
    <>
      {" "}
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
                      ? "This task is not available"
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
                            ? "blue"
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
              style={{ height: "500px" }}
              className="p-3 rounded-lg shadow-md    mx-auto flex flex-col justify-evenly "
            >
              <div className="basis-1/6">
                <h3 className="text-xl font-bold ">
                  {selectedTask.replace(/^\w/, (c) => c.toUpperCase())}
                </h3>
              </div>
              <div className="basis-4/6">
                <Video selectedTask={selectedTask} video={video} />
                <Kagel selectedTask={selectedTask} kegel={kegel} />
                <SortNote selectedTask={selectedTask} sort_note={sort_note} />
                <Quiz selectedTask={selectedTask} quiz={quiz} />
                <Reward selectedTask={selectedTask} reward={reward} />
                <SuggestedBlog selectedTask={selectedTask} blog={blog} />
              </div>
              <div className="basis-1/6 flex justify-center align-bottom flex-col">
                <div className="flex justify-between mt-4">
                  <button
                    className={`px-4 py-2 text-white rounded focus:outline-none ${
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
                    className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
                  }`}
                    onClick={handleNext}
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
    </>
  );
}

export default TaskPage;
