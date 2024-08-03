"use client";

import { message } from "antd";
import { useState } from "react";

import {
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
} from "@/redux/api/authApi";
import {
  useDeletePostMutation,
  useGetPostsByUserIdQuery,
  useUpdatePostMutation,
} from "@/redux/api/postApi";
import {
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "@/redux/api/userApi";

import "tailwindcss/tailwind.css";
import ChangePasswordModal from "./ChangePasswordModal";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import EditProfileModal from "./EditProfileModal";
import UserPosts from "./UserPosts";
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
  const [updatePost] = useUpdatePostMutation(); // Add update post mutation
  const [deletePost] = useDeletePostMutation(); // Add delete post mutation

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false); // State for post modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for delete confirmation modal

  const [currentPost, setCurrentPost] = useState<any>(null); // State to hold the post being edited or deleted
  const [valueEditor, setValueEditor] = useState<string>("");

  const name = authenticatedUserInfoData?.username;
  const age = authenticatedUserInfoData?.age;
  const email = authenticatedUserInfoData?.email;
  const compliteDay = authenticatedUserInfoData?.compliteDay || 0;
  const userId = authenticatedUserInfoData?.id;
  const location = authenticatedUserInfoData?.country;
  const paid = authenticatedUserInfoData?.paid || false;

  const { data: posts } = useGetPostsByUserIdQuery({
    userId: userId || 0,
  });

  const postsByUser = posts?.data;

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

  const showPostModal = (post: any) => {
    setCurrentPost(post);
    setValueEditor(post.attributes.description); // Set initial content for the editor
    setIsPostModalVisible(true);
  };

  const handlePostOk = async () => {
    console.log("hi", valueEditor);

    if (currentPost) {
      try {
        const result = await updatePost({
          body: {
            postId: currentPost.id,

            data: {
              description: valueEditor,
            },
          },
        });
        if (result) {
          message.success("Post updated successfully!");
        } else {
          message.info("something went wrong. please try again later");
        }
        setIsPostModalVisible(false);
        setValueEditor(""); // Clear editor content after successful update
      } catch (error) {
        message.info("something went wrong. please try again later");
      }
    }
  };
  const handlePostCancel = () => {
    setValueEditor(""); // Clear editor content on cancel
    setIsPostModalVisible(false);
  };

  const showDeleteModal = (post: any) => {
    setCurrentPost(post);
    console.log(post);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = async () => {
    console.log(currentPost);
    try {
      const result = await deletePost({ id: currentPost });
      console.log(result);
      if (result) {
        message.success("Post deleted successfully!");
      } else {
        message.info("something went wrong. please try again later");
      }
      setIsDeleteModalVisible(false);
      setCurrentPost(null); // Clear the current post
    } catch (error) {
      message.info("something went wrong. please try again later");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentPost(null); // Clear the current post
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
            location={authenticatedUserInfoData.country}
            paid={authenticatedUserInfoData.paid}
            showProfileModal={showProfileModal}
            showPasswordModal={showPasswordModal}
            handleRestart={handleRestart}
          />

          <UserPosts
            postsByUser={postsByUser}
            showPostModal={showPostModal}
            showDeleteModal={showDeleteModal}
            compliteDay={compliteDay}
            progressData={progressData}
          />

          <EditPostModal
            isPostModalVisible={isPostModalVisible}
            handlePostOk={handlePostOk}
            handlePostCancel={handlePostCancel}
            valueEditor={valueEditor}
            setValueEditor={setValueEditor}
          />

          <DeletePostModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleDeleteOk={handleDeleteOk}
            handleDeleteCancel={handleDeleteCancel}
          />

          <EditProfileModal
            isProfileModalVisible={isProfileModalVisible}
            handleProfileOk={handleProfileOk}
            handleProfileCancel={handleProfileCancel}
            name={authenticatedUserInfoData.username}
            age={authenticatedUserInfoData.age}
            location={authenticatedUserInfoData.country}
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
