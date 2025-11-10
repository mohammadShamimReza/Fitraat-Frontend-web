"use client";

import ProgramSclaton from "@/components/structure/ProgramSclaton";
import {
  useGetChildProtectionAllTitleQuery,
  useGetChildProtectionByDayIdQuery,
  useUpdateUserChildProtectionDayMutation,
} from "@/redux/api/childProtectionApi";
import { useAppSelector } from "@/redux/hooks";
import { Button, Modal, Skeleton } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DayFinishImage from "@/app/assets/dayFinish.gif";
import ChildProtectionNavigation from "@/components/childProtection/ChildProtectionNavigation";
import ChildProtectionPaymentBlocker from "@/components/childProtection/ChildProtectionPaymentBlocker";
import ChildProtectionTitles from "@/components/childProtection/ChildProtectionTitles";
import ChildProtectionVideo from "@/components/childProtection/ChildProtectionVideo";

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

  if (!isMounted || !protectionData) return <ProgramSclaton />;

  const video: ProtectionVideo[] =
    protectionData?.data?.[0]?.protectionVideo?.map((v: any) => ({
      id: v.id,
      url: `${v.url}`,
      name: v.name,
    })) || [];

  const dayCount = protectionData?.data?.[0]?.numberCount || 1;
  const payment = userData?.childProtectionPayment;
  const userId = userData?.id;

  const handleNavigation = async (direction: "next" | "prev") => {
    setLoading(true);

    if (parseInt(day) >= 10) {
      alert(
        "You have completed watching all available videos. For any further we will notify you via email."
      );
      return;
    }
    if (direction === "next") {
      // ✅ All videos done → next day
      const res = await updateUserChildProtectionDay({
        childProtectionDayNumber: parseInt(day) + 1,
        userId,
      });
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
        {/* ✅ Video Player */}
        {isLoading ? (
          <Skeleton.Node active={true} style={{ width: 880, height: 400 }} />
        ) : (
          <ChildProtectionVideo videos={video} />
        )}

        {/* ✅ Navigation */}
        <ChildProtectionNavigation
          day={day}
          loading={loading}
          onNavigate={handleNavigation}
        />

        {/* ✅ Title List */}
        {titleLoading ? (
          <Skeleton paragraph={{ rows: 4 }} />
        ) : titleData ? (
          <ChildProtectionTitles
            titles={titleData.data}
            userDay={userData?.childProtectionDayNumber}
            currentDay={day}
          />
        ) : null}
      </div>
      {/* ✅ Payment Overlay */}
      {payment !== "Complete" && <ChildProtectionPaymentBlocker />}
    </div>
  );
}
