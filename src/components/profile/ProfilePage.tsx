"use client";

import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import KegelExercise from "./type/KegelExercise";
import PreMarriage from "./type/PreMarriage";
import ProfileTypes from "./type/ProfileTypes";
import ProRecovery from "./type/ProRecovery";

// Example section components



export default function ProfilePage() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");

  // ✅ Redux data
  const getUserInfoData = useAppSelector((state) => state.auth.userInfo);
  const name = getUserInfoData?.username || "";
  const email = getUserInfoData?.email || "";
  const compliteDay = getUserInfoData?.compliteDay || 0;
  const userId = getUserInfoData?.id || 0;
  const fitraatPaid = getUserInfoData?.fitraatPayment || "Not Complete";

  const startDate = new Date(getUserInfoData?.startDate || new Date());
  const today = new Date();
  const differenceInTime = today.getTime() - startDate.getTime();
  const daysLeft = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1;

  const days = Array.from({ length: 40 }, (_, i) => i + 1);
  const progressData = days.map((day) => ({
    day,
    completed: day <= compliteDay,
  }));

  const menuItems = [
    "Profile",
    "Pro Recovery",
    "Kegel Exercise",
    "Pre Marriage",
  ];

  return (
    <div className="mx-auto p-3 relative mt-10">
      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-20 bg-white min-w-64 transition-transform transform md:translate-x-0 md:static 
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}`}
        >
          {isSidebarVisible && (
            <button
              className="mt-24 ml-5 z-30 text-2xl p-2 md:hidden hover:bg-gray-300 rounded-md mb-5"
              onClick={() => setSidebarVisible(false)}
              title="Close sidebar"
            >
              <IoMdClose />
            </button>
          )}

          <div className="p-4 border rounded-lg bg-white h-full">
            <div className="text-center text-2xl font-light border-b p-2">
              Types
            </div>
            <div className="mt-4 h-[550px] overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item);
                    setSidebarVisible(false);
                  }}
                  className={`mb-3 text-left w-full p-2 rounded-md transition-all duration-200 
                    ${
                      activeSection === item
                        ? "bg-blue-600 text-white font-medium"
                        : "bg-gray-50 hover:bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hamburger Button (mobile only) */}
        {!isSidebarVisible && (
          <button
            className="absolute top-4 left-4 text-2xl p-2 md:hidden hover:bg-gray-300 rounded-md"
            onClick={() => setSidebarVisible(true)}
            title="Open sidebar"
          >
            <AiOutlineMenu />
          </button>
        )}

        {/* ✅ Main Content Area (one single render block) */}
        <div className="p-6 border rounded-lg bg-gray-50 w-full min-h-[600px] transition-all duration-300">
          <div className="flex justify-center items-center mb-5">
            <h2 className="text-xl font-semibold">{activeSection}</h2>
          </div>

          {/* All components rendered here conditionally */}
          <div className="mt-4">
            {activeSection === "Profile" && (
              <ProfileTypes
                paid={fitraatPaid}
                getUserInfoData={getUserInfoData}
                userId={userId}
                daysLeft={daysLeft}
                email={email}
                name={name}
                compliteDay={compliteDay}
                progressData={progressData}
              />
            )}

            {activeSection === "Pro Recovery" && (
              <ProRecovery
                compliteDay={compliteDay}
                daysLeft={daysLeft}
                paid={fitraatPaid}
                progressData={progressData}
              />
            )}

            {activeSection === "Kegel Exercise" && (
              <KegelExercise
                user={{
                  username: name,
                  kagelPayment: getUserInfoData?.kagelPayment || "",
                  kagelIndividualDayNumber:
                    getUserInfoData?.kagelIndividualDayNumber || 0,
                }}
              />
            )}

            {activeSection === "Pre Marriage" && (
              <PreMarriage
                user={{
                  username: name,
                  childProtectionPayment:
                    getUserInfoData?.childProtectionPayment || "",
                  childProtectionDayNumber:
                    getUserInfoData?.childProtectionDayNumber || 0,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
