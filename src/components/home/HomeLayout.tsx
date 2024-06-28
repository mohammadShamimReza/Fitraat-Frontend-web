"use client";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsPostcard } from "react-icons/bs";
import FeedPost from "./homefeed/FeedPost";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/">Home</Link>, "1", <HomeOutlined />),
];

const authItems: MenuItem[] = [
  getItem(<Link href="/">Home</Link>, "1", <HomeOutlined />),
  getItem(<Link href="/option2">Create post</Link>, "2", <BsPostcard />),
  getItem(
    <Link href="/profile#savedPost">Saved post</Link>,
    "3",
    <AiOutlineSave />
  ),
  getItem(<Link href="/myTask">My Task</Link>, "4", <BiTask />),
];

function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

  return (
    <Layout style={{ minHeight: "100vh", borderRadius: "30px" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={
            authenticatedUserInfoData === undefined &&
            authenticatedUserInfoDataError === true
              ? authItems
              : authenticatedUserInfoData &&
                authenticatedUserInfoDataError === false
              ? authItems
              : authItems
          }
        />
      </Sider>
      <Layout style={{}} className="rounded-2xl">
        <FeedPost />

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default HomeLayout;
