"use client";

import PostContent from "@/components/home/homefeed/post/PostContent";
import ReactQuilEditor from "@/components/shared/ReactQuilEditor";
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
        message.info("something went wrong. please try again letter");
      }
    } catch (error) {
      message.info("something went wrong. please try again letter");
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
          message.info("something went wrong. please try again letter");
        }
        setIsPostModalVisible(false);
        setValueEditor(""); // Clear editor content after successful update
      } catch (error) {
        message.info("something went wrong. please try again letter");
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
        message.info("something went wrong. please try again letter");
      }
      setIsDeleteModalVisible(false);
      setCurrentPost(null); // Clear the current post
    } catch (error) {
      message.info("something went wrong. please try again letter");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentPost(null); // Clear the current post
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Username: {name}</h2>
        <h2 className="text-lg font-medium">Age: {age}</h2>
        <h2 className="text-lg font-medium">Email: {email}</h2>
        <h2 className="text-lg font-medium">Country: {location}</h2>
      </div>

      <div className="flex items-center mb-6 gap-2">
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={showProfileModal}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={showPasswordModal}
        >
          Change Password
        </button>
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={handleRestart}
        >
          Restart Journey
        </button>
      </div>

      <div className={`bg-white border rounded-lg p-6 mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4 ">
          My <span className="text-blue-500"> posts </span>
        </h1>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {postsByUser?.map((data) => (
            <div
              className="border p-2 m-2 relative flex flex-col justify-between h-full"
              key={data.id}
            >
              <div className="flex-grow">
                <PostContent postDescription={data.attributes.description} />
              </div>
              <div className="flex justify-between gap-2 mt-2">
                <button
                  className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
                  onClick={() => showPostModal(data)}
                >
                  Edit post
                </button>
                <button
                  className={`px-4 py-2 rounded-xl focus:outline-none bg-red-400 hover:bg-red-500 text-white`}
                  onClick={() => showDeleteModal(data.id)} // Show delete confirmation modal
                >
                  Delete post
                </button>
              </div>
            </div>
          ))}
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

      <Modal
        title="Edit Post"
        visible={isPostModalVisible}
        onOk={handlePostOk}
        closable={false}
        footer={[
          <button
            key={"ok"}
            className={`px-4 py-2 rounded-xl focus:outline-none border `}
            onClick={() => handlePostCancel()}
          >
            Cancel
          </button>,
          <button
            key={"ok"}
            className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white ml-2`}
            onClick={() => handlePostOk()}
          >
            Update
          </button>,
        ]}
      >
        <ReactQuilEditor
          valueEditor={valueEditor}
          setValueEditor={setValueEditor}
        />
      </Modal>

      <Modal
        title="Delete Post"
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk} // Call the delete function on confirmation
        onCancel={handleDeleteCancel} // Close the modal on cancel
        closable={false}
        footer={[
          <button
            key={"cancel"}
            className={`px-4 py-2 rounded-xl focus:outline-none border `}
            onClick={() => handleDeleteCancel()}
          >
            Cancel
          </button>,
          <button
            key={"delete"}
            className={`px-4 py-2 rounded-xl focus:outline-none bg-red-400 hover:bg-red-500 text-white ml-2`}
            onClick={() => handleDeleteOk()}
          >
            Delete
          </button>,
        ]}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>

      <Modal
        title="Edit Profile"
        visible={isProfileModalVisible}
        onCancel={handleProfileCancel}
        footer={null}
      >
        <Form
          onFinish={handleProfileOk}
          initialValues={{
            username: name,
            age: age,
            country: location,
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input placeholder="Age" type="number" />
          </Form.Item>
          <Form.Item
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
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
                message: "Please confirm your new password!",
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
    </div>
  );
}

export default ProfilePage;
