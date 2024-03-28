"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import siteLogo from "../../app/assets/detox1.png";

function NavBar() {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const [notificationToggle, setNotificationToggle] = useState<boolean>(false);
  const [userMenuToggle, setUserMenuToggle] = useState<boolean>(false);

  return (
    <div className="mb-5 border rounded-xl shadow-md  mt-5">
      <nav className="p-2">
        <div className="  px-1 sm:px-4 lg:px-6">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setMenuToggle(!menuToggle)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center text-lg font-bold">
                <Link href={"/home"}>
                  {" "}
                  <Image src={siteLogo} width={70} alt="website logo" />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block mt-5">
                <div className="flex space-x-4">
                  <a
                    href="/"
                    className=" hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-normal"
                  >
                    Home
                  </a>
                  <a
                    href="/blog"
                    className=" hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-normal"
                  >
                    Blog
                  </a>

                  <a
                    href="/proMember"
                    className=" hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-normal"
                  >
                    Pro Member
                  </a>

                  <a
                    href="/myTasks"
                    className=" hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-normal"
                  >
                    My Tasks
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <div className="">
                <button
                  onClick={() => setNotificationToggle(!notificationToggle)}
                  type="button"
                  className="relative rounded-full  p-2  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                {notificationToggle ? (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div> */}

              <div className="relative ml-3">
                <Link href={"/login"} className="">
                  <div
                    onClick={() => setUserMenuToggle(!userMenuToggle)}
                    className="relative flex   text-sm  hover:bg-gray-100 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <div className="flex gap-1">
                      <p>login</p>
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
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

                {userMenuToggle ? (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white  shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-t-xl"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-b-xl"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        {menuToggle ? (
          <div
            className="sm:hidden absolute z-10 bg-white w-full"
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="/"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal"
              >
                Home
              </a>
              <a
                href="/blog"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal"
              >
                Blog
              </a>

              <a
                href="/faq"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal"
              >
                FAQ{" "}
              </a>
              <a
                href="/about"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal"
                aria-current="page"
              >
                About us
              </a>
              <a
                href="/myTasks"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal"
              >
                My Tasks
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}

export default NavBar;
