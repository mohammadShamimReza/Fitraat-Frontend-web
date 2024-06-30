// components/CreatePost.tsx

import QuillEditor from "@/components/shared/QuillEditor";
import { Button, Input, Modal } from "antd";
import Head from "next/head";
import React, { ChangeEvent, useState } from "react";

const CreatePost: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [postContent, setPostContent] = useState<string>("");
  const [valueEditor, setValueEditor] = useState("");

  const handleInputClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setPostContent(""); // Clear post content when modal is closed
  };

  const handleCreatePost = () => {
    console.log(valueEditor);
    // console.log("Creating post with content:", postContent);
    // sessionStorage.setItem("unfinishedPost", postContent);
    // setModalVisible(false);
    setPostContent("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
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
            placeholder="What you wnat to tell us."
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
          // <Button key="save" onClick={handleCreatePost}>
          //   Save Draft
          // </Button>,
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <button
            key="submit"
            onClick={handleCreatePost}
            className={
              "mt-2 px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700 ml-3"
            }
          >
            <span onClick={handleCreatePost} style={{ paddingRight: "10px" }}>
              {" "}
              submit
            </span>
          </button>,
        ]}
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Content</label>

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
