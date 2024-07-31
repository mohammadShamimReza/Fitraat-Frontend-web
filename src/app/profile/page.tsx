"use client";
import {
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
} from "@/redux/api/authApi";
import {
  useGetPostsByUserIdQuery,
  useUpdatePostMutation,
} from "@/redux/api/postApi";
import {
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "@/redux/api/userApi";
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import "tailwindcss/tailwind.css";

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

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false); // State for post modal
  const [currentPost, setCurrentPost] = useState(null); // State to hold the post being edited

  const name = authenticatedUserInfoData?.username;
  const age = authenticatedUserInfoData?.age;
  const email = authenticatedUserInfoData?.email;
  const compliteDay = authenticatedUserInfoData?.compliteDay || 0;
  const userId = authenticatedUserInfoData?.id;
  const location = authenticatedUserInfoData?.country;

  const { data: postsByUser } = useGetPostsByUserIdQuery({
    userId: 11,
  });

  console.log(postsByUser);
  const days = Array.from({ length: 40 }, (_, i) => i + 1);
  const progressData = days.map((day) => ({
    day,
    completed: day <= compliteDay,
  }));

  const handleRestart = async () => {
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

      message.success("You have successfully started your journey again!");
    } catch (error) {
      console.log(error);
    }
  };

  const showProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const handleProfileOk = async (values: any) => {
    try {
      const result = await updateUserProfile({
        userId: userId,
        username: values.username,
        age: values.age,
        country: values.country,
      });
      message.success("Profile updated successfully!");
      setIsProfileModalVisible(false);
    } catch (error) {
      console.log(error);
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
      message.success("Password updated successfully!");
      setIsPasswordModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const showPostModal = (post: any) => {
    setCurrentPost(post);
    setIsPostModalVisible(true);
  };

  // const handlePostOk = async (values) => {
  //   try {
  //     await updatePost({
  //       id: currentPost.id,
  //       body: { title: values.title, description: values.description },
  //     });
  //     message.success("Post updated successfully!");
  //     setIsPostModalVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handlePostCancel = () => {
  //   setIsPostModalVisible(false);
  // };

  return (
    <div className={"container mx-auto py-8 px-4"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile Info */}
        <div className={"bg-white shadow-lg rounded-lg p-6"}>
          <div className={" "}>
            <h1 className="text-3xl font-semibold mb-4 underline text-blue-500">
              Profile
            </h1>
            <p className="text-xl font-semibold">
              Name: <span className="text-blue-500">{name}</span>
            </p>
            <p className="text-xl font-semibold">
              Age: <span className="text-blue-500"> {age}</span>
            </p>
            <p className="text-xl font-semibold">
              Location: <span className="text-blue-500"> {location}</span>
            </p>
            <p className="text-xl font-semibold">
              Email: <span className="text-blue-500"> {email}</span>
            </p>
            <p className="text-xl font-semibold">
              Completed:{" "}
              <span className="text-blue-500"> {compliteDay} Days</span>
            </p>
            <div className="flex justify-end gap-1">
              <Button type="primary" onClick={showProfileModal}>
                Edit Profile
              </Button>
              <Button type="primary" onClick={showPasswordModal}>
                Update Password
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className={"bg-white shadow-lg rounded-lg p-6"}>
          <h1 className="text-3xl font-semibold text-center mb-4 text-blue-500">
            Do you want to start again?
          </h1>
          <p className="text-center">
            Do you break your commitment. Don&apos;t worry. Start again from
            scratch.
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-6 ">
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none 
                bg-gray-600 hover:bg-gray-700
                `}
                onClick={handleRestart}
              >
                Restart from Day 0
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-white border rounded-lg p-6 mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4 underline">
          Remaining: <span className="text-blue-500">{40 - compliteDay} </span>
          Days
        </h1>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1">
          {progressData.map((data, index) => (
            <div
              key={index}
              className={`p-2 text-center border border-gray-400 ${
                data.completed
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-300"
              }`}
            >
              <p className="font-semibold">{data.day}</p>
              <p className="text-xs mt-1">
                {data.completed ? "Completed" : "Incomplete"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        title="Edit Profile"
        visible={isProfileModalVisible}
        onOk={handleProfileOk}
        onCancel={handleProfileCancel}
        footer={null}
      >
        <Form
          name="profile"
          onFinish={handleProfileOk}
          initialValues={{
            username: name,
            age: age,
            country: location,
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Password Modal */}
      <Modal
        title="Change Password"
        visible={isPasswordModalVisible}
        onOk={handlePasswordOk}
        onCancel={handlePasswordCancel}
        footer={null}
      >
        <Form
          name="password"
          onFinish={handlePasswordOk}
          initialValues={{
            password: "",
          }}
        >
          <Form.Item
            label="currenty Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your Current password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="passwordConfirmation"
            rules={[
              {
                required: true,
                message: "Please input your new password for confirm! ",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Post Update Modal */}
      <Modal
        title="Edit Post"
        visible={isPostModalVisible}
        // onOk={handlePostOk}
        // onCancel={handlePostCancel}
        footer={null}
      >
        <Form
          name="post"
          // onFinish={handlePostOk}
          // initialValues={{
          //   title: currentPost?.attributes.title,
          //   description: currentPost?.attributes.description.join(" "), // Assuming description is an array
          // }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the post title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the post description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProfilePage;
