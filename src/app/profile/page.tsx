"use client";

import {
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
} from "@/redux/api/authApi";

import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Spin, Upload } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import UserActivityPieChart from "./UserActivity";
const Player = z.object({
  username: z.string(),
  xp: z.number(),
});

function ProfilePage() {
  const {
    data: getUserInfoData,
    isLoading: getUserInfoLoading,
    isError: getUserInfoDataError,
    isSuccess: getUserInfoSuccess,
  } = useGetUserInfoQuery();

  console.log(getUserInfoData, "user info");
  const [
    updataUserDay,
    {
      isError: updateUserDayError,
      isLoading: updateUserUpdateDayLoading,
      isSuccess: updateUserDaySuccess,
    },
  ] = useUpdateUserDayMutation();

  const [isImageUploadModalVisible, setIsImageUploadModalVisible] =
    useState(false); // State for image upload modal

  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image

  const name = getUserInfoData?.username;
  const age = getUserInfoData?.age;
  const email = getUserInfoData?.email;
  const compliteDay = getUserInfoData?.compliteDay || 0;
  const userId = getUserInfoData?.id;
  const paid = getUserInfoData?.fitraatPayment || "Not Complete";
  const startData = getUserInfoData?.startDate || Date.now();
  const today = new Date();
  const start = new Date(getUserInfoData?.startDate || new Date());
  const differenceInTime = today.getTime() - start.getTime(); // Difference in milliseconds
  const daysLeft = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1;

  const days = Array.from({ length: 40 }, (_, i) => i + 1);
  const progressData = days.map((day) => ({
    day,
    completed: day <= compliteDay,
  }));

  const handleRestart = async () => {
    if (paid || paid !== "Complete") {
      alert("Please update your plan for use this feacture");
      return;
    }

    alert("Do you want to restart!");

    try {
      const result = await updataUserDay({
        currentDay: 1,
        compliteDay: 0,
        userId: userId,
      });
      localStorage.setItem(
        "AuthDay",
        JSON.stringify({
          video: false,
          kagel: false,
          quiz: false,
          Blog: false,
        })
      );
      console.log(result);
      console.log(result);
      if (updateUserDaySuccess) {
        message.success("You have successfully started your journey again!");
      } else if (updateUserDayError) {
        message.info("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUploadModalCancel = () => {
    setIsImageUploadModalVisible(false);
  };

  // Handle image before uploading
  const handleImageUpload = (file: File) => {
    const isValidSize = file.size / 1024 / 1024 < 2; // Check if image size is less than 2MB
    if (!isValidSize) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string); // Convert image to base64 and set it to state
      console.log("Uploaded Image:", reader.result); // Log the image data
    };
    reader.readAsDataURL(file);

    return false;
  };

  if (getUserInfoLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className=" p-8 ">
          <Spin size="large" />
          <p className="text-white text-lg mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

      <div className="mb-4 flex flex-wrap justify-between items-center gap-6">
        {/* User Info Section */}
        <div className="w-full sm:w-auto">
          <h2 className="text-lg font-medium">Name: {name}</h2>
          <h2 className="text-lg font-medium">Age: {age}</h2>
          <h2 className="text-lg font-medium">Email: {email}</h2>
          <h2 className="text-lg font-medium">Start Date: {startData}</h2>
          <h2 className="text-lg font-medium">
            Membership: {paid == "Complete" ? "Pro" : "Free"}
          </h2>
        </div>

        {/* Pie Chart Section */}
        <div className="relative w-full sm:w-auto flex justify-center items-center">
          {/* Pie Chart (always rendered, but blurred if not Pro) */}
          <div
            className={`${
              paid === "Complete" ? "" : "blur-sm pointer-events-none"
            }`}
          >
            <UserActivityPieChart completed={compliteDay} total={daysLeft} />
          </div>

          {/* Overlay message if not Pro */}
          {paid !== "Complete" && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/40 backdrop-blur-sm rounded-lg">
              <p className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">
                Upgrade to <span className="text-blue-700 font-bold">Pro</span>{" "}
                to view your activity details.
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
      </div>

      <div className="flex items-center mb-6 gap-2">
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={handleRestart}
        >
          Restart Journey
        </button>

        {paid === "Complete" && (
          <Link href={"/payment"}>
            <button
              className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
            >
              Become Pro
            </button>
          </Link>
        )}
      </div>

      <div className="relative bg-white border rounded-lg p-6 mt-8">
        <h1 className="text-3xl font-semibold text-center mb-4 underline">
          Remaining: <span className="text-blue-500">{40 - compliteDay}</span>{" "}
          Days
        </h1>

        {/* Membership notice (optional small text above) */}

        {/* Progress section */}
        <div
          className={`relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1 transition-all duration-300 ${
            paid ? "" : "blur-sm pointer-events-none select-none"
          }`}
        >
          {progressData.map((data, index) => (
            <div
              key={index}
              className={`p-2 text-center border border-gray-400 rounded-md ${
                data.completed
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <p className="font-semibold">{data.day}</p>
              <p className="text-xs mt-1">
                {data.completed ? "Completed" : "Incomplete"}
              </p>
            </div>
          ))}
        </div>

        {/* Overlay for non-Pro users */}
        {paid != "Complete" && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/60 backdrop-blur-sm rounded-lg">
            <p className="text-gray-800 font-semibold mb-3 text-center text-sm sm:text-base">
              Upgrade to <span className="text-blue-600 font-bold">Pro</span> to
              view your progress details.
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

      <Modal
        title="Upload Image"
        open={isImageUploadModalVisible}
        onCancel={handleImageUploadModalCancel}
        footer={[
          <button
            key={"cancel"}
            className={`px-4 py-2 rounded-xl focus:outline-none border `}
            onClick={() => handleImageUploadModalCancel()}
          >
            Cancel
          </button>,
        ]}
      >
        <Upload.Dragger
          name="image"
          accept="image/*"
          beforeUpload={handleImageUpload}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Image must be less than 2MB.
          </p>
        </Upload.Dragger>
        {profileImage && (
          <Image
            src={profileImage}
            alt="Uploaded"
            className="mt-4 w-32 h-32 rounded-full"
          />
        )}
      </Modal>
    </div>
  );
}

export default ProfilePage;
