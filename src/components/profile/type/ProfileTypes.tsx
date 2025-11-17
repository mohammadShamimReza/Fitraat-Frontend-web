"use client";

import {
  useDeleteUserProfileImageMutation,
  useUpdateUserDayMutation,
  useUpdateUserProfileImageMutation,
  useUploadUserProfileImageMutation
} from "@/redux/api/authApi";

import UserInfo from "@/components/profile/UserInfo";
import { UserData } from "@/types/contantType";
import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Spin, Upload } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function ProfileTypes({
  paid,
  userId,
  getUserInfoData,
  daysLeft,
  email,
  name,
  compliteDay,
  progressData,
}: {
  paid: string;
  getUserInfoData: UserData | null;
  userId: number;
  daysLeft: number;
  email: string;
  name: string;
  compliteDay: number;
  progressData: {
    day: number;
    completed: boolean;
  }[];
}) {
  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image

  const [isUploading, setIsUploading] = useState(false);
  const [uploadUserProfileImage] = useUploadUserProfileImageMutation();
  const [updateUserProfileImage] = useUpdateUserProfileImageMutation();
  const [deleteUserProfileImage, { isLoading: deleteImageLoading }] =
    useDeleteUserProfileImageMutation();
  const [isImageUploadModalVisible, setIsImageUploadModalVisible] =
    useState(false); // State for image upload modal
  const handleImageUploadModalCancel = () => {
    setIsImageUploadModalVisible(false);
  };
  const [
    updataUserDay,
    {
      isError: updateUserDayError,
      isLoading: updateUserUpdateDayLoading,
      isSuccess: updateUserDaySuccess,
    },
  ] = useUpdateUserDayMutation();

  // Handle image before uploading
  const handleImageUpload = async (file: File) => {
    const isValidSize = file.size / 1024 / 1024 < 2;
    if (!isValidSize) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      setIsUploading(true);
      const oldImageId = getUserInfoData?.profileImage?.id;
      if (oldImageId) {
        await deleteUserProfileImage(oldImageId).unwrap();
      }
      const uploadResponse: any = await uploadUserProfileImage(
        formData
      ).unwrap();
      const uploadedImage = uploadResponse[0];

      if (!uploadedImage?.id) {
        message.error("Failed to upload image.");
        return;
      }

      // Update user's profile image reference in Strapi
      await updateUserProfileImage({
        userId: userId,
        imageId: uploadedImage.id,
      }).unwrap();

      message.success("Profile image updated successfully!");
      setProfileImage(uploadedImage.url);

      setIsImageUploadModalVisible(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Something went wrong while uploading the image.");
    } finally {
      setIsUploading(false);
    }

    return false;
  };

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

      if (updateUserDaySuccess) {
        message.success("You have successfully started your journey again!");
      } else if (updateUserDayError) {
        message.info("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!getUserInfoData) {
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
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
      <UserInfo
        compliteDay={compliteDay}
        daysLeft={daysLeft}
        email={email}
        getUserInfoData={getUserInfoData}
        handleRestart={handleRestart}
        name={name}
        paid={paid}
        setIsImageUploadModalVisible={setIsImageUploadModalVisible}
      />

    

      <Modal
        title="Upload Image"
        open={isImageUploadModalVisible}
        onCancel={handleImageUploadModalCancel}
        footer={[
          <button
            key={"cancel"}
            className={`px-4 py-2 rounded-xl focus:outline-none border ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleImageUploadModalCancel}
            disabled={isUploading}
          >
            Cancel
          </button>,
        ]}
      >
        <div className="relative">
          {isUploading && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/70 backdrop-blur-sm rounded-lg z-10">
              <Spin size="large" />
              <p className="mt-3 text-gray-700 font-medium">Uploading...</p>
            </div>
          )}

          <Upload.Dragger
            name="image"
            accept="image/*"
            beforeUpload={handleImageUpload}
            showUploadList={false}
            disabled={isUploading}
            className={`${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
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
        </div>

        {profileImage && (
          <div className="relative mt-4 w-32 h-32 mx-auto rounded-full overflow-hidden border">
            <Image
              src={profileImage}
              alt="Uploaded"
              fill
              className="object-cover rounded-full"
              sizes="1"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
