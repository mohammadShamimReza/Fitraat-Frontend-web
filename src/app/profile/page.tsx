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
import { useUpdateUserPasswordMutation } from "@/redux/api/userApi";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import "tailwindcss/tailwind.css";

function ProfilePage() {
  const {
    data: getUserInfoData,
    isLoading: getUserInfoLoading,
    isError: getUserInfoDataError,
    isSuccess: getUserInfoSuccess,
  } = useGetUserInfoQuery();

  const [
    updataUserDay,
    {
      isError: updateUserDayError,
      isLoading: updateUserUpdateDayLoading,
      isSuccess: updateUserDaySuccess,
    },
  ] = useUpdateUserDayMutation();

  const [updateUserPassword] = useUpdateUserPasswordMutation();
  const [
    updatePost,
    {
      isError: updatePostError,
      isLoading: updatePostLoading,
      isSuccess: updatePostSuccess,
    },
  ] = useUpdatePostMutation(); // Add update post mutation
  const [
    deletePost,
    {
      isError: deletePostError,
      isLoading: deletePostLoading,
      isSuccess: deletePostSuccess,
    },
  ] = useDeletePostMutation(); // Add delete post mutation

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false); // State for post modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for delete confirmation modal
  const [isImageUploadModalVisible, setIsImageUploadModalVisible] =
    useState(false); // State for image upload modal

  const [currentPost, setCurrentPost] = useState<any>(null); // State to hold the post being edited or deleted
  const [valueEditor, setValueEditor] = useState<string>("");

  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image

  const name = getUserInfoData?.username;
  const age = getUserInfoData?.age;
  const email = getUserInfoData?.email;
  const compliteDay = getUserInfoData?.compliteDay || 0;
  const userId = getUserInfoData?.id;
  const location = getUserInfoData?.country;
  const paid = getUserInfoData?.paid || false;

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
      if (updateUserDaySuccess) {
        message.success("You have successfully started your journey again!");
      } else if (updateUserDayError) {
        message.info("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
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
        message.info("Something went wrong. Please try again later.");
      }
    } catch (error) {
      message.info("Something went wrong. Please try again later.");
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
        console.log(result);
        if (updatePostSuccess) {
          message.success("Post updated successfully!");
        } else if (updatePostError) {
          message.info("Something went wrong. Please try again later.");
        }
        setIsPostModalVisible(false);
        setValueEditor(""); // Clear editor content after successful update
      } catch (error) {
        message.info("Something went wrong. Please try again later.");
      }
    }
  };

  const handlePostCancel = () => {
    setValueEditor(""); // Clear editor content on cancel
    setIsPostModalVisible(false);
  };

  const showDeletePostModal = (post: any) => {
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
        message.info("Something went wrong. Please try again later.");
      }
      setIsDeleteModalVisible(false);
      setCurrentPost(null); // Clear the current post
    } catch (error) {
      message.info("Something went wrong. Please try again later.");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentPost(null); // Clear the current post
  };

  const handleImageUploadModal = () => {
    setIsImageUploadModalVisible(true);
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

    return false; // Prevent automatic upload
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Name: {name}</h2>
        <h2 className="text-lg font-medium">Age: {age}</h2>
        <h2 className="text-lg font-medium">Email: {email}</h2>
        <h2 className="text-lg font-medium">Country: {location}</h2>
        <h2 className="text-lg font-medium">
          Membership: {paid ? "Pro" : "Free"}
        </h2>
      </div>

      <div className="flex items-center mb-6 gap-2">
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={handleRestart}
        >
          Restart Journey
        </button>

        {/* <button
          className={`px-4 py-2 rounded-xl focus:outline-none bg-blue-500 hover:bg-blue-600 text-white`}
          onClick={handleImageUploadModal}
        >
          Upload Profile Image
        </button> */}

        {/* <button
          className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={showPasswordModal}
        >
          Change Password
        </button> */}
      </div>

      {/* <div>
        <Upload
          name="profileImage"
          accept="image/*"
          beforeUpload={handleImageUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="mt-4 w-32 h-32 rounded-full"
          />
        )}
      </div> */}

      <div className={`bg-white border rounded-lg p-6 mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4 ">
          My <span className="text-blue-500">posts</span>
        </h1>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {postsByUser?.map((data) => (
            <div
              className="border rounded-lg p-2 m-2 relative flex flex-col justify-between h-full"
              key={data.id}
            >
              <div className="">
                {formatDistanceToNow(new Date(data.attributes.createdAt), {
                  addSuffix: true,
                })}
              </div>
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
                  onClick={() => showDeletePostModal(data.id)} // Show delete confirmation modal
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

      {/* Edit post modal */}

      <Modal
        title="Edit Post"
        open={isPostModalVisible}
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

      {/* Delete post modal */}

      <Modal
        title="Delete Post"
        open={isDeleteModalVisible}
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

      {/* Image Upload Modal */}

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
          <img
            src={profileImage}
            alt="Uploaded"
            className="mt-4 w-32 h-32 rounded-full"
          />
        )}
      </Modal>

      {/* Change password modal  */}

      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
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
