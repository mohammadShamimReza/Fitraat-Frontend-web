"use client";

import { message } from "antd";
import { useState } from "react";

import {
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
} from "@/redux/api/authApi";

import {
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "@/redux/api/userApi";

import "tailwindcss/tailwind.css";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "./EditProfileModal";
import UserProfile from "./UserProfile";

function ProfilePage() {
  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

  const [updataUserDay] = useUpdateUserDayMutation();
  const [updateUserProfile] = useUpdateUserMutation();
  const [updateUserPassword] = useUpdateUserPasswordMutation();

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const name = authenticatedUserInfoData?.username;
  const age = authenticatedUserInfoData?.age;
  const email = authenticatedUserInfoData?.email;
  const compliteDay = authenticatedUserInfoData?.compliteDay || 0;
  const userId = authenticatedUserInfoData?.id;
  const paid = authenticatedUserInfoData?.fitraatPayment || false;

  const days = Array.from({ length: 40 }, (_, i) => i + 1);
  const progressData = days.map((day) => ({
    day,
    completed: day <= compliteDay,
  }));

  const handleRestart = async () => {
    alert("Do you want to restart!");

    try {
      await updataUserDay({
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

      message.success("You have successfully started your journey again!");
    } catch (error) {
      console.error(error);
    }
  };

  const showProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const handleProfileOk = async (values: any) => {
    try {
      await updateUserProfile({
        userId: userId,
        username: values.username,
        age: values.age,
        country: values.country,
      });
      message.success("Profile updated successfully!");
      setIsProfileModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileCancel = () => {
    setIsProfileModalVisible(false);
  };

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handlePasswordOk = async (values: any) => {
    try {
      const result = await updateUserPassword({
        userId: userId,
        password: values.password,
      });
      setIsPasswordModalVisible(false);
      if (result) {
        message.success("Password updated successfully!");
      } else {
        message.info("something went wrong. please try again later");
      }
    } catch (error) {
      message.info("something went wrong. please try again later");
    }
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      {/* Conditional Rendering */}
      {authenticatedUserInfoData && (
        <>
          <UserProfile
            name={authenticatedUserInfoData.username}
            age={authenticatedUserInfoData.age}
            email={authenticatedUserInfoData.email}
            paid={authenticatedUserInfoData.fitraatPayment}
            showProfileModal={showProfileModal}
            showPasswordModal={showPasswordModal}
            handleRestart={handleRestart}
          />

          <EditProfileModal
            isProfileModalVisible={isProfileModalVisible}
            handleProfileOk={handleProfileOk}
            handleProfileCancel={handleProfileCancel}
            name={authenticatedUserInfoData.username}
            age={authenticatedUserInfoData.age}
          />

          <ChangePasswordModal
            isPasswordModalVisible={isPasswordModalVisible}
            handlePasswordOk={handlePasswordOk}
            handlePasswordCancel={handlePasswordCancel}
          />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
