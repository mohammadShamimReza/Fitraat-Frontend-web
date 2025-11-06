// "use client";

// import CompletedKagelTask from "@/components/kagelIndividual/CompleteKagelTask";
// import ProgramSclaton from "@/components/structure/ProgramSclaton";
// import { useGetChildProtectionByDayIdQuery } from "@/redux/api/childProtectionApi";
// import { useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import React, { Suspense, useEffect, useState } from "react";

// const ChildProtectionPage: React.FC = () => {
//   const router = useRouter();

//   const [isMounted, setIsMounted] = useState(false);
//   const [day, setDay] = useState("1");

//   const userData = useAppSelector((state) => state.auth.userInfo);
//   useEffect(() => setIsMounted(true), []);

//   useEffect(() => {
//     if (userData) {
//       setDay(userData.childProtectionDayNumber.toString());
//     }
//   }, [userData]);

//   const {
//     data: protectionData,
//     isLoading,
//     isError,
//   } = useGetChildProtectionByDayIdQuery(day);

//   if (!isMounted || !protectionData || isLoading) return <ProgramSclaton />;
//   console.log(protectionData, "protection data");
//   if (day > "10") {
//     return <CompletedKagelTask />;
//   }

//   console.log(isLoading, "isLoading");

//   const dayCount = protectionData?.data[0].numberCount || 1;
//   const payment = userData?.kagelPayment;
//   const userId = userData?.id;
//   const key = protectionData?.data[0].id || "defaultKey";
//   return <Suspense fallback={<ProgramSclaton />}> </Suspense>;
// };

// export default ChildProtectionPage;

"use client";

import CompletedKagelTask from "@/components/kagelIndividual/CompleteKagelTask";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import {
  useGetChildProtectionAllTitleQuery,
  useGetChildProtectionByDayIdQuery,
} from "@/redux/api/childProtectionApi";
import { useUpdateUserKagelDayMutation } from "@/redux/api/kagelindividualApi";
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
  const [updateUserKagelDay] = useUpdateUserKagelDayMutation();
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<
    Record<number, boolean>
  >({});
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
  console.log(titleData?.data, "title data");
  const handleOk = () => {
    setIsFinishModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const saved = localStorage.getItem("protectionProgress");
    if (saved) setCompletedVideos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("protectionProgress", JSON.stringify(completedVideos));
  }, [completedVideos]);

  if (!isMounted || isLoading || !protectionData || !titleData)
    return <ProgramSclaton />;

  const videos: ProtectionVideo[] =
    protectionData?.data?.[0]?.protectionVideo?.map((v: any) => ({
      id: v.id,
      url: `http://localhost:1337${v.url}`,
      name: v.name,
    })) || [];

  const dayCount = protectionData?.data?.[0]?.numberCount || 1;
  const payment = userData?.childProtectionPayment;
  const userId = userData?.id;

  if (parseInt(day) > 40) return <CompletedKagelTask />; // example limit

  const handleMarkComplete = (videoId: number) => {
    setCompletedVideos((prev) => ({ ...prev, [videoId]: true }));
  };

  const handleNavigation = async (direction: "next" | "prev") => {
    setLoading(true);

    if (direction === "next") {
      if (selectedVideoIndex < videos.length - 1) {
        handleMarkComplete(videos[selectedVideoIndex].id);
        setSelectedVideoIndex(selectedVideoIndex + 1);
      } else {
        // ✅ All videos done → next day
        const res = await updateUserKagelDay({
          compliteDay: parseInt(day) + 1,
          userId,
        });
        console.log(res, "update day response");
        localStorage.setItem("protectionProgress", "{}");
        setIsFinishModalOpen(true);
      }
    } else {
      if (selectedVideoIndex > 0) {
        setSelectedVideoIndex(selectedVideoIndex - 1);
      }
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
          {videos[selectedVideoIndex] ? (
            <VideoPlayer videoUrl={videos[selectedVideoIndex].url} />
          ) : (
            <div className="text-center text-white py-20">
              No videos available.
            </div>
          )}
        </div>
        {/* ✅ All Titles Scrollable Section */}
        {titleData?.data?.length > 0 && (
          <div className="border rounded-lg bg-white shadow p-3 mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              All Child Protection Titles
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
              {titleData.data.map((item: any) => {
                const isCompleted = completedVideos[item.id];

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">
                        {item.numberCount}. {item.title}
                      </span>
                    </div>

                    {/* ✅ Completion Circle */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        isCompleted
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ✅ Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            className={`px-4 py-2 rounded text-white ${
              selectedVideoIndex === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
            disabled={selectedVideoIndex === 0}
            onClick={() => handleNavigation("prev")}
          >
            <ArrowLeftOutlined className="mr-2" /> Previous
          </button>

          <button
            className={`px-4 py-2 rounded text-white ${
              selectedVideoIndex === videos.length - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
            onClick={() => handleNavigation("next")}
          >
            Next <ArrowRightOutlined className="ml-2" />
          </button>
        </div>
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
