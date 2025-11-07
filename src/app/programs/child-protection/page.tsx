"use client";

import CompletedKagelTask from "@/components/kagelIndividual/CompleteKagelTask";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import {
  useGetChildProtectionAllTitleQuery,
  useGetChildProtectionByDayIdQuery,
  useUpdateUserChildProtectionDayMutation,
} from "@/redux/api/childProtectionApi";
import { useAppSelector } from "@/redux/hooks";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DayFinishImage from "@/app/assets/dayFinish.gif";
import VideoPlayer from "@/components/childProtection/VideoPlayer";

interface ProtectionVideo {
  id: number;
  url: string;
  name: string;
}

export default function ChildProtectionPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [day, setDay] = useState("1");
  const userData = useAppSelector((state) => state.auth.userInfo);
  const [updateUserChildProtectionDay] =
    useUpdateUserChildProtectionDayMutation();
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (userData) {
      setDay(userData.childProtectionDayNumber?.toString() || "1");
    }
  }, [userData]);

  const {
    data: protectionData,
    isLoading,
    isError,
  } = useGetChildProtectionByDayIdQuery(day);

  const {
    data: titleData,
    isLoading: titleLoading,
    isError: titleError,
  } = useGetChildProtectionAllTitleQuery(undefined);
  const handleOk = () => {
    setIsFinishModalOpen(false);
    window.location.reload();
  };

  console.log(protectionData);

  if (!isMounted || isLoading || !protectionData || !titleData || !userData)
    return <ProgramSclaton />;

  const video: ProtectionVideo[] =
    protectionData?.data?.[0]?.protectionVideo?.map((v: any) => ({
      id: v.id,
      url: `http://localhost:1337${v.url}`,
      name: v.name,
    })) || [];

  const dayCount = protectionData?.data?.[0]?.numberCount || 1;
  const payment = userData?.childProtectionPayment;
  const userId = userData?.id;

  if (parseInt(day) > 40) return <CompletedKagelTask />; // example limit

  const handleNavigation = async (direction: "next" | "prev") => {
    setLoading(true);

    if (direction === "next") {
      // ✅ All videos done → next day
      const res = await updateUserChildProtectionDay({
        childProtectionDayNumber: parseInt(day) + 1,
        userId,
      });
      console.log(res, "update day response");
      setIsFinishModalOpen(true);
      setDay((prevDay) => (parseInt(prevDay) + 1).toString());
    } else {
      setDay((prevDay) => (parseInt(prevDay) - 1).toString());
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto p-3 relative mt-10 max-w-4xl">
      {/* ✅ Completion Modal */}
      <Modal
        title="Hurray! You finished today’s video session 🎉"
        open={isFinishModalOpen}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Go to next day
          </Button>,
        ]}
      >
        <Image className="mx-auto" src={DayFinishImage} alt="Day Finished" />
      </Modal>

      <div
        className={`relative ${
          payment === "Complete" ? "" : "blur-sm pointer-events-none"
        }`}
      >
        {/* ✅ Video Player Section (YouTube iframe version) */}
        <div className="border rounded-lg bg-black mb-6">
          {video ? (
            <VideoPlayer videoUrl={video[0].url} />
          ) : (
            <div className="text-center text-white py-20">
              No videos available.
            </div>
          )}
        </div>
        {/* ✅ Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            className={`px-4 py-2 rounded text-white ${
              day === "1"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
            disabled={day === "1" || loading}
            onClick={() => handleNavigation("prev")}
          >
            <ArrowLeftOutlined className="mr-2" /> Previous
          </button>

          <button
            className={`px-4 py-2 rounded text-white ${
              day === "10" || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
            onClick={() => handleNavigation("next")}
          >
            Next <ArrowRightOutlined className="ml-2" />
          </button>
        </div>
        {/* ✅ All Titles Scrollable Section */}
        {titleData?.data?.length > 0 && (
          <div className="border rounded-lg bg-white shadow p-3 mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              All Child Protection Titles
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
              {titleData.data.map((item: any) => {
                const isCompleted =
                  day < userData?.childProtectionDayNumber?.toString();

                return (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center border p-3 rounded-lg hover:bg-gray-200 transition-all duration-200 ${
                      isCompleted ? "bg-green-100 " : ""
                    } ${
                      item.numberCount.toString() === day
                        ? "bg-gray-100 border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">
                        {item.numberCount}. {item.title}
                      </span>
                    </div>

                    {/* ✅ Completion Circle */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        isCompleted ||
                        item.numberCount.toString() <
                          userData?.childProtectionDayNumber?.toString()
                          ? "bg-green-500 border-green-700 "
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Payment Blocker */}
      {payment !== "Complete" && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/80 backdrop-blur-sm rounded-lg">
          <p className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">
            To access this{" "}
            <span className="text-blue-700 font-bold">video program</span>,
            please <span className="text-blue-700 font-bold">make payment</span>
            .
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
