"use client";

import Kagel from "@/components/myTasks/taskPages/Kagel";
import { useUpdateUserKagelDayMutation } from "@/redux/api/kagelindividualApi";
import { KagelTime, PaymentStatus } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DayFinishImage from "../../app/assets/dayFinish.gif";
import DayList from "./DayList";

interface Props {
  kegel: {
    morningkagel: KagelTime[] | undefined;
    afternoonKagel: KagelTime[] | undefined;
    nightKagel: KagelTime[] | undefined;
  };
  DayCount: number;
  payment: PaymentStatus | undefined;
  userId: number | undefined;
  setDay: (day: string) => void;
}

export default function KegelPage({
  kegel,
  DayCount,
  payment,
  userId,
  setDay,
}: Props) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [updateUserKagelDay] = useUpdateUserKagelDayMutation();
  const sessions = ["morning", "afternoon", "night"];
  const [loading, setLoading] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<
    "morning" | "afternoon" | "night"
  >("morning");
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const handleOk = () => {
    setIsFinishModalOpen(false);

    window.location.reload();
  };

  const [selectedDay, setSelectedDay] = useState(DayCount);
  const [completedSessions, setCompletedSessions] = useState<
    Record<string, boolean>
  >(() => {
    const saved = localStorage.getItem("kegelProgress");
    return saved
      ? JSON.parse(saved)
      : {
          morning: false,
          afternoon: false,
          night: false,
        };
  });

  // ✅ Load progress from localStorage
  useEffect(() => {
    localStorage.setItem("kegelProgress", JSON.stringify(completedSessions));
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem("kegelProgress", JSON.stringify(completedSessions));
  }, [completedSessions]);

  const markSessionComplete = (sessionType: string) => {
    setCompletedSessions((prev) => {
      if (!prev[sessionType]) {
        return { ...prev, [sessionType]: true };
      }
      return prev;
    });
  };

  const canAccessSession = (day: number, session: string): boolean => {
    // For the current day, check based on completed sessions
    if (day < selectedDay) return true;
    if (day === selectedDay) {
      if (session === "morning") return true;
      if (session === "afternoon") return completedSessions.morning === true;
      if (session === "night")
        return (
          completedSessions.morning === true &&
          completedSessions.afternoon === true
        );
    }

    return false;
  };

  // ✅ Handle next/previous navigation
  const handleNavigation = async (direction: "next" | "prev") => {
    setLoading(true);
    const currentIndex = sessions.indexOf(selectedSession);
    const currentDay = selectedDay;

    // Auto-mark the current session complete
    markSessionComplete(selectedSession);

    if (direction === "next") {
      if (currentIndex < sessions.length - 1) {
        // Move to next session (same day)
        setSelectedSession(sessions[currentIndex + 1] as any);
      } else {
        // If last session → move to next day morning

        if (currentDay < 365) {
          const res = await updateUserKagelDay({
            compliteDay: currentDay + 1,
            userId: userId,
          });
          console.log(res, "res");
          localStorage.setItem(
            "kegelProgress",
            JSON.stringify({
              morning: false,
              afternoon: false,
              night: false,
            })
          );
          setDay((currentDay + 1).toString());
          // setSelectedDay(currentDay + 1);
          setSelectedSession("morning");
          setIsFinishModalOpen(true);
        }
      }
    } else {
      if (currentIndex > 0) {
        // Move to previous session (same day)
        setSelectedSession(sessions[currentIndex - 1] as any);
      } else {
        // If morning → move to previous day night
        if (currentDay > 1) {
          // setSelectedDay(currentDay - 1);
          setSelectedSession("night");
        }
      }
    }
    setLoading(false);
  };

  const renderSessionItem = (day: number, session: string) => {
    const isCompleted = completedSessions[session.toLowerCase()] === true;
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
          ${!accessible ? "opacity-50 !cursor-not-allowed" : ""}
        `}
        onClick={() => {
          if (!accessible) return;
          // setSelectedDay(day);
          setSelectedSession(session.toLowerCase() as any);
          setSidebarVisible(false);
        }}
      >
        <span>{session}</span>
        <FaCheckCircle
          size={18}
          className={`${
            (isCompleted && day === selectedDay) || day < selectedDay
              ? "text-green-500"
              : "text-gray-300"
          }`}
        />
      </div>
    );
  };

  const allDays = Array.from({ length: 365 }, (_, i) => i + 1);

  return (
    <div className={`mx-auto  p-3 relative mt-10 `}>
      <Modal
        title="Hurra you have finished kagel exercise! Congratulations"
        open={isFinishModalOpen}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Go to next day
          </Button>,
        ]}
      >
        <Image
          className="mx-auto"
          src={DayFinishImage}
          alt="Day Fininsh Congratulation image"
        />
      </Modal>
      <div
        className={`flex relative ${
          payment === "Complete" ? "" : "blur-sm pointer-events-none"
        }`}
      >
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
              <div
                ref={scrollContainerRef}
                className="mt-4  w-full overflow-x-hidden overflow-y-scroll h-[550px]"
              >
                {/* {allDays.map((day) => renderDayItem(day))} */}
                <DayList
                  key={selectedDay}
                  allDays={allDays}
                  completedSessions={completedSessions}
                  renderSessionItem={renderSessionItem}
                  selectedDay={selectedDay}
                  parentRef={scrollContainerRef}
                />
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
                  ? "bg-gray-3650 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              } ${loading ? "cursor-not-allowed" : ""}`}
              onClick={() => handleNavigation("prev")}
              disabled={selectedDay === 1 && selectedSession === "morning"}
            >
              <ArrowLeftOutlined className="mr-2" />
              {loading ? "Loading..." : "Previous"}
            </button>
            <button
              className={`px-4 py-2 rounded text-white ${
                selectedDay === 365 && selectedSession === "night"
                  ? "bg-gray-3650 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              } ${loading ? "cursor-not-allowed" : ""}`}
              onClick={() => handleNavigation("next")}
              disabled={selectedDay === 365 && selectedSession === "night"}
            >
              {loading ? "Loading..." : "Next"}

              <ArrowRightOutlined className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      {payment !== "Complete" && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/365 backdrop-blur-sm rounded-lg">
          <p className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">
            To use this{" "}
            <span className="text-blue-700 font-bold"> kagel exercise</span>{" "}
            feature, please
            <span className="text-blue-700 font-bold"> Make Payment</span>
          </p>
          <button
            onClick={() => (window.location.href = "/payment")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-md"
          >
            Go to Payment
          </button>
        </div>
      )}
    </div>
  );
}




