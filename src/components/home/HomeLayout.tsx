"use client";

import { Button, Layout, Menu, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsPostcard } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import FeedPost from "./homefeed/FeedPost";

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
};

function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);

  const authItems: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/">Home</Link>,
      icon: <IoHomeOutline size={20} />,
    },
    {
      key: "2",
      label: <p onClick={() => setCreatePostModal(true)}>Create post</p>,
      icon: <BsPostcard size={20} />,
    },
    {
      key: "3",
      label: <Link href="/profile#savedPost">Saved post</Link>,
      icon: <AiOutlineSave size={20} />,
    },
    {
      key: "4",
      label: <Link href="/myTask">My Task</Link>,
      icon: <BiTask size={20} />,
    },
  ];

  const handleCreatePost = () => {
    // Logic for handling post creation
    console.log("Creating post...");
  };

  return (
    <Layout style={{ minHeight: "100vh", borderRadius: "30px" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          {authItems.map((item) => (
            <Item key={item.key} icon={item.icon}>
              {item.label}
            </Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="rounded-2xl">
        <Content>
          <FeedPost />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <Modal
        title="Create Post"
        visible={createPostModal}
        onCancel={() => setCreatePostModal(false)}
        footer={[
          <Button key="back" onClick={() => setCreatePostModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreatePost}>
            Create
          </Button>,
        ]}
      >
        <TextArea rows={4} placeholder="Enter your post content..." />
      </Modal>
    </Layout>
  );
}

export default HomeLayout;
