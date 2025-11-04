"use client";

import Kagel from "@/components/myTasks/taskPages/Kagel";
import { KagelTime } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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
  const sessions = ["morning", "afternoon", "night"];

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<
    "morning" | "afternoon" | "night"
  >("morning");

  const [selectedDay, setSelectedDay] = useState(DayCount);
  const [completedSessions, setCompletedSessions] = useState<
    Record<number, string[]>
  >({});
  // ✅ Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kegelProgress");
    if (saved) {
      setCompletedSessions(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("kegelProgress", JSON.stringify(completedSessions));
  }, [completedSessions]);

  const markSessionComplete = (day: number, sessionType: string) => {
    setCompletedSessions((prev) => {
      const currentDaySessions = prev[day] || [];
      if (!currentDaySessions.includes(sessionType)) {
        const updated = {
          ...prev,
          [day]: [...currentDaySessions, sessionType],
        };
        localStorage.setItem("kegelProgress", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const canAccessSession = (day: number, session: string): boolean => {
    const completed = completedSessions[day] || [];
    if (session === "Morning") return true;
    if (session === "Afternoon") return completed.includes("morning");
    if (session === "Night")
      return completed.includes("morning") && completed.includes("afternoon");
    return false;
  };

  // ✅ Handle next/previous navigation
  const handleNavigation = (direction: "next" | "prev") => {
    const currentIndex = sessions.indexOf(selectedSession);
    const currentDay = selectedDay;

    // Auto-mark the current session complete
    markSessionComplete(currentDay, selectedSession);

    if (direction === "next") {
      if (currentIndex < sessions.length - 1) {
        // Move to next session (same day)
        setSelectedSession(sessions[currentIndex + 1] as any);
      } else {
        // If last session → move to next day morning
        if (currentDay < 40) {
          setSelectedDay(currentDay + 1);
          setSelectedSession("morning");
        }
      }
    } else {
      if (currentIndex > 0) {
        // Move to previous session (same day)
        setSelectedSession(sessions[currentIndex - 1] as any);
      } else {
        // If morning → move to previous day night
        if (currentDay > 1) {
          setSelectedDay(currentDay - 1);
          setSelectedSession("night");
        }
      }
    }
  };

  const renderSessionItem = (day: number, session: string) => {
    const isCompleted = completedSessions[day]?.includes(session.toLowerCase());
    const isActive =
      day === selectedDay && selectedSession === session.toLowerCase();
    const accessible = canAccessSession(day, session);

    return (
      <div
        key={session}
        className={`flex justify-between items-center px-4 py-2 rounded-md text-sm cursor-pointer transition-all
          ${
            isActive
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100"
          }
          ${!accessible ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={() => {
          if (!accessible) return;
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
        <div className="  p-6 border rounded-lg bg-gray-50 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              Day {selectedDay} – {selectedSession.toUpperCase()} Kegel
            </h2>
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
                selectedDay === 1 && selectedSession === "morning"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              onClick={() => handleNavigation("prev")}
              disabled={selectedDay === 1 && selectedSession === "morning"}
            >
              <ArrowLeftOutlined className="mr-2" />
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded text-white ${
                selectedDay === 40 && selectedSession === "night"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              onClick={() => handleNavigation("next")}
              disabled={selectedDay === 40 && selectedSession === "night"}
            >
              Next
              <ArrowRightOutlined className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
