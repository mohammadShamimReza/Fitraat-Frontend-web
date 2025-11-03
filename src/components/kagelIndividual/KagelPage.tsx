"use client";

import Kagel from "@/components/myTasks/taskPages/Kagel";
import { KagelTime } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface Props {
  kegel: {
    morningkagel: KagelTime[] | undefined;
    afternoonKagel: KagelTime[] | undefined;
    nightKagel: KagelTime[] | undefined;
  };
  DayCount: number;
}

export default function KegelPage({ kegel, DayCount }: Props) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<
    "morning" | "afternoon" | "night"
  >("morning");

  const [selectedDay, setSelectedDay] = useState(DayCount);
  const [completedSessions, setCompletedSessions] = useState<
    Record<number, string[]>
  >({}); // e.g. { 1: ["morning"], 2: ["morning", "afternoon"] }

  const handleCompleteSession = (sessionType: string) => {
    setCompletedSessions((prev) => {
      const prevSessions = prev[selectedDay] || [];
      if (prevSessions.includes(sessionType)) return prev;
      return {
        ...prev,
        [selectedDay]: [...prevSessions, sessionType],
      };
    });
  };

  const renderSessionItem = (day: number, session: string) => {
    const isCompleted = completedSessions[day]?.includes(session);
    const isActive =
      day === selectedDay && selectedSession === session.toLowerCase();

    return (
      <div
        key={session}
        className={`flex justify-between items-center px-4 py-2 rounded-md text-sm cursor-pointer transition-all
          ${
            isActive
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        onClick={() => {
          setSelectedDay(day);
          setSelectedSession(session.toLowerCase() as any);
          setSidebarVisible(false);
        }}
      >
        <span>{session}</span>
        <FaCheckCircle
          size={18}
          style={{
            color: isCompleted ? "#10b981" : "#d1d5db",
          }}
        />
      </div>
    );
  };

  const renderDayItem = (day: number) => {
    const sessions = ["Morning", "Afternoon", "Night"];
    const allCompleted = completedSessions[day]?.length === sessions.length;
    return (
      <details
        key={day}
        open={day === selectedDay}
        className={`mb-2 border rounded-lg ${
          allCompleted ? "border-green-400 bg-green-50" : "border-gray-200"
        }`}
      >
        <summary
          className={`flex justify-between items-center px-4 py-2 cursor-pointer select-none rounded-t-lg ${
            allCompleted ? "text-green-700 font-semibold" : ""
          }`}
        >
          <span>Day {day}</span>
          <FaCheckCircle
            size={20}
            style={{
              color: allCompleted ? "#10b981" : "#d1d5db",
            }}
          />
        </summary>
        <div className="flex flex-col gap-1 px-2 pb-2">
          {sessions.map((s) => renderSessionItem(day, s))}
        </div>
      </details>
    );
  };

  const allDays = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="mx-auto  p-3 relative mt-10 ">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={` fixed inset-0 z-20 bg-white min-w-64 transition-transform transform md:translate-x-0 md:static 
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}`}
        >
          {isSidebarVisible && (
            <button
              className="mt-20 ml-5 left-4 z-30 text-2xl p-2 md:hidden"
              onClick={() => setSidebarVisible(false)}
            >
              <IoMdClose />
            </button>
          )}
          <div className="p-4 border rounded-lg bg-white">
            <div className="">
              <div className="text-center text-2xl font-light border-b p-2">
                Kegel Days
              </div>
              <div className="mt-4  w-full overflow-x-hidden overflow-y-scroll h-[550px]">
                {allDays.map((day) => renderDayItem(day))}
              </div>
            </div>
          </div>
        </div>

        {/* Hamburger Button (mobile) */}
        {!isSidebarVisible && (
          <button
            className="absolute top-4 left-4 text-2xl p-2 md:hidden"
            onClick={() => setSidebarVisible(true)}
          >
            <AiOutlineMenu />
          </button>
        )}

        {/* Main Content */}
        <div className="  p-6 border rounded-lg bg-gray-50 ">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              Day {selectedDay} – {selectedSession.toUpperCase()} Kegel
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => handleCompleteSession(selectedSession)}
            >
              Mark as Complete
            </button>
          </div>

          <div className="flex justify-center ">
            {selectedSession === "morning" && (
              <Kagel selectedTask="kagel" kegel={kegel.morningkagel} />
            )}
            {selectedSession === "afternoon" && (
              <Kagel selectedTask="kagel" kegel={kegel.afternoonKagel} />
            )}
            {selectedSession === "night" && (
              <Kagel selectedTask="kagel" kegel={kegel.nightKagel} />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              className={`px-4 py-2 rounded text-white ${
                selectedDay === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedDay((d) => Math.max(1, d - 1))}
              disabled={selectedDay === 1}
            >
              <ArrowLeftOutlined className="mr-2" />
              Previous Day
            </button>
            <button
              className={`px-4 py-2 rounded text-white ${
                selectedDay === 40
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedDay((d) => Math.min(40, d + 1))}
              disabled={selectedDay === 40}
            >
              Next Day
              <ArrowRightOutlined className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
