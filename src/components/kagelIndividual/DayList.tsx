"use client";

import React, { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  allDays: number[];
  selectedDay: number;
  completedSessions: Record<string, boolean>;
  renderSessionItem: (day: number, session: string) => React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>; // ✅ allow null
}

const DayList: React.FC<Props> = ({
  allDays,
  selectedDay,
  completedSessions,
  renderSessionItem,
  parentRef,
}) => {
  const dayRefs = useRef<Record<number, HTMLDetailsElement | null>>({});

  // Scroll selected day to the top of the parent box
useEffect(() => {
  const selectedRef = dayRefs.current[selectedDay];
  const parent = parentRef.current;

  if (selectedRef && parent) {
    const offset = 90; // adjust this value for spacing from top
    parent.scrollTo({
      top: selectedRef.offsetTop - offset,
      behavior: "smooth",
    });
  }
}, [selectedDay, parentRef]);


  const renderDayItem = (day: number) => {
    const sessions = ["morning", "afternoon", "night"];
    const allCompleted =
      day < selectedDay ||
      (day === selectedDay &&
        sessions.every((s) => completedSessions[s.toLowerCase()] === true));

    return (
      <details
        ref={(el) => {
          dayRefs.current[day] = el;
        }}
        key={day}
        open={day === selectedDay}
        className={`mb-2 border rounded-lg ${
          allCompleted ? "border-green-500 bg-green-50" : "border-gray-200"
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
            style={{ color: allCompleted ? "#10b981" : "#d1d5db" }}
          />
        </summary>
        <div className="flex flex-col gap-1 px-2 pb-2">
          {sessions.map((s) => renderSessionItem(day, s))}
        </div>
      </details>
    );
  };

  return <div>{allDays.map((day) => renderDayItem(day))}</div>;
};

export default DayList;
