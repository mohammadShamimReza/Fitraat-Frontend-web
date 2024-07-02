"use client";
import Subscribe from "@/components/mainLayout/Subscribe";
import { getTokenFromCookie, removeTokenFromCookie } from "@/lib/auth/token";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeAuthToken } from "@/redux/slice/authSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { BsPostcard } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { IoCashOutline, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import siteLogo from "./assets/detox1.png";
import "./globals.css";

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
};

function CustomLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const [userMenuToggle, setUserMenuToggle] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const authTokenFromRedux = useAppSelector((state) => state.auth.authToken);

  const dispatch = useAppDispatch();

  const removeTokenFromCookies = useCallback(() => {
    return removeTokenFromCookie();
  }, []); // empty dependency array means the function does not depend on any variables

  useEffect(() => {
    const authToken = getTokenFromCookie() || authTokenFromRedux;

    if (!authToken) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [authTokenFromRedux, removeTokenFromCookies]); // include removeTokenFromCookies in the dependency array

  const handleLogout = () => {
    removeTokenFromCookies();
    dispatch(removeAuthToken(null));

    if (typeof window !== "undefined") {
      window.location.href = "/"; // Directly set the href to trigger page reload
    }
  };

  const authItems: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/">Home</Link>,
      icon: <IoHomeOutline size={20} />,
    },
    {
      key: "2",
      label: <Link href="/blog">Blog</Link>,
      icon: <BsPostcard size={20} />,
    },
    {
      key: "3",
      label: <Link href="/myTasks">Task</Link>,
      icon: <BiTask size={20} />,
    },
    {
      key: "4",
      label: <Link href="/donation">Donation</Link>,
      icon: <IoCashOutline size={20} />,
    },
    {
      key: "5",
      label: <Link href="/profile">Profile</Link>,
      icon: <IoPersonOutline size={20} />,
    },
    {
      key: "6",
      label: <Link href="/about">About</Link>,
      icon: <FcAbout size={20} className="text-black" />,
    },
  ];
  const unAuthItems: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/">Home</Link>,
      icon: <IoHomeOutline size={20} />,
    },
    {
      key: "2",
      label: <Link href="/blog">Blog</Link>,
      icon: <BsPostcard size={20} />,
    },
    {
      key: "3",
      label: <Link href="/myTasks">Task</Link>,
      icon: <BiTask size={20} />,
    },
    {
      key: "4",
      label: <Link href="/donation">Donation</Link>,
      icon: <IoCashOutline size={20} />,
    },

    {
      key: "5",
      label: <Link href="/about">About</Link>,
      icon: <FcAbout size={20} className="text-black" />,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = !authenticated ? unAuthItems : authItems;
  return (
    <div className="">
      <div className="backgroundDot">
        {" "}
        <div className="mx-auto min-h-screen max-w-7xl">
          <Layout style={{ minHeight: "100vh", borderRadius: "30px" }}>
            <Sider
              theme="light"
              trigger={null}
              collapsible
              collapsed={collapsed}
              className="border"
            >
              <div className="demo-logo-vertical" />
              <div className="flex flex-shrink-0 items-center justify-center text-lg font-bold mb-5 border-b">
                <Link href={"/"}>
                  <Image src={siteLogo} width={70} alt="website logo" />
                </Link>
              </div>

              <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
                {items.map((item) => (
                  <Item key={item.key} icon={item.icon}>
                    {item.label}
                  </Item>
                ))}
              </Menu>
            </Sider>
            <Layout className="rounded-2xl border-r">
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="border rounded"
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                {!authenticated ? (
                  <Link href={"/login"}>
                    {" "}
                    <button
                      className={" px-3  text-black rounded  hover:bg-gray-100"}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <p>Login</p>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className={" px-3  text-black rounded  hover:bg-gray-100"}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <p>Login</p>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </button>
                )}
              </Header>
              <Content style={{ minHeight: "100vh" }}>{children}</Content>
              <Subscribe />
              <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
                Save Ummah ©{new Date().getFullYear()} Created by Shamim Reza
              </Footer>
            </Layout>
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default CustomLayout;
