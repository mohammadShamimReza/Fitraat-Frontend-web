"use client";
import ReactQuilEditor from "@/components/shared/ReactQuilEditor";
import { useCreatePostMutation } from "@/redux/api/postApi";
import { UserData } from "@/types/contantType";
import { Button, Modal, Tooltip, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const CreatePost = ({ user }: { user: UserData | null }) => {
  const router = useRouter();
  const userId = user ? user.id : null;
  const [modalVisible, setModalVisible] = useState(false);
  const [valueEditor, setValueEditor] = useState("");

  const [createPost, { isError, isLoading, isSuccess }] =
    useCreatePostMutation();

  const handleInputClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setValueEditor(""); // Clear editor content when modal is closed
  };

  const handleCreatePost = async () => {
    if (valueEditor !== "") {
      try {
        const post = {
          description: valueEditor,
          user: userId,
        };

        const result = await createPost({ data: post });

        if (result) {
          setModalVisible(false);
          setValueEditor(""); // Clear editor content after submission
          // Clear the Quill editor content
          const qlEditor = document.getElementsByClassName("ql-editor");
          if (qlEditor.length > 0) {
            qlEditor[0].innerHTML = "";
          }
          message.success("Thanks for sharing your valuable information");
        } else {
          message.error("Something went wrong. Please try again later");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        message.error("An error occurred while creating the post.");
      }
    }
  };

  return (
    <div className="p-5 z-10">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.18.3/antd.min.css"
        />
      </Head>
      <div
        className="fixed bottom-8 right-8 text-gray-600 hover:text-white rounded-full cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out hover:rotate-360 z-10"
        onClick={handleInputClick}
      >
        <Tooltip
          title="Make a post"
          className="rounded-lg p-2 bg-gray-800 text-white text-sm"
        >
          <CiCirclePlus size={80} />
        </Tooltip>
      </div>

      <Modal
        title={userId ? "Create Post" : "Login Required"}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          userId ? (
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>
          ) : null,
          userId ? (
            <Button
              key="submit"
              type="primary"
              onClick={handleCreatePost}
              className={`mt-2 px-4 py-2 text-white rounded bg-gray-600 hover:bg-gray-700 ml-3 ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              Submit
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button
                key="login"
                type="primary"
                className="mt-2 px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 ml-3"
              >
                Login
              </Button>
            </Link>
          ),
        ]}
      >
        {userId ? (
          <div className="my-4">
            <ReactQuilEditor
              valueEditor={valueEditor}
              setValueEditor={setValueEditor}
            />
          </div>
        ) : (
          <div className="flex flex-col border h-20 rounded-lg items-center justify-center text-center space-y-4">
            <p className="text-lg text-blue-600 font-semibold">
              Please log in first to create a post.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CreatePost;
