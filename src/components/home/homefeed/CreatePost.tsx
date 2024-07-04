"use client";
import QuillEditor from "@/components/shared/QuillEditor";
import { useCreatePostMutation } from "@/redux/api/postApi";
import { Button, Input, Modal, message } from "antd";
import Head from "next/head";
import React, { useState } from "react";

const CreatePost: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [valueEditor, setValueEditor] = useState("");

  const [createPost, { isError, isLoading, isSuccess }] =
    useCreatePostMutation();

  // console.log(isError, isLoading, isSuccess);

  const handleInputClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setValueEditor(""); // Clear editor content when modal is closed
  };

  const handleCreatePost = async () => {
    if (valueEditor.trim() !== "") {
      try {
        const post = {
          description: [
            {
              type: "paragraph",
              children: [{ text: valueEditor, type: "text" }],
            },
          ],
          user: 11,
        };

        const result = await createPost({ data: post });

        if (result) {
          setModalVisible(false);
          setValueEditor(""); // Clear editor content after submission
          // ! it need to be chenge
          const qlEditor = document.getElementsByClassName("ql-editor");
          qlEditor[0].innerHTML = "";
          message.success("Thanks for sharing your valuable information");
        } else if (!result) {
          message.error("Something went wrong. Please try again later");
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.18.3/antd.min.css"
        />
      </Head>
      <div className="flex items-center mb-4 bg-white h-24 w-full p-5 rounded-2xl">
        <img
          src="https://via.placeholder.com/150"
          alt="User image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3 w-full">
          <Input
            placeholder="What you want to tell us."
            onClick={handleInputClick}
            className="h-16"
          />
        </div>
      </div>

      <Modal
        title="Create Post"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCreatePost}
            className={`mt-2 px-4 py-2 text-white rounded  bg-gray-600 hover:bg-gray-700 ml-3 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="my-4">
          {/* need to chenge the editor  */}
          <QuillEditor
            valueEditor={valueEditor}
            setValueEditor={setValueEditor}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
