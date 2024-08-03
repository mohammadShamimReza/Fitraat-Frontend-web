"use client";

import { getTokenFromCookie, removeTokenFromCookie } from "@/lib/auth/token";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { removeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import siteLogo from "../../app/assets/detox1.png";

function NavBar() {
  const router = useRouter();

  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  const [userMenuToggle, setUserMenuToggle] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const authTokenFromRedux = useAppSelector((state) => state.auth.authToken);

  const dispatch = useAppDispatch();
  const handleUserMenuToggle = () => {
    setUserMenuToggle(!userMenuToggle);
  };

  const removeTokenFromCookies = useCallback(() => {
    return removeTokenFromCookie();
  }, []);

  const authToken = getTokenFromCookie() || authTokenFromRedux;
  const { data, error, isLoading } = useGetUserInfoQuery(undefined);

  useEffect(() => {
    if (data) {
      dispatch(storeUserInfo(data)); // Set user in Redux if data is returned
    }
    if (error) {
      dispatch(storeUserInfo(null)); // Clear user state if there's an error
    }
    if (!authToken) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [
    authToken,
    authTokenFromRedux,
    data,
    dispatch,
    error,
    removeTokenFromCookies,
  ]); // include removeTokenFromCookies in the dependency array

  const handleLogout = () => {
    removeTokenFromCookies();
    dispatch(removeAuthToken(null));

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };
  return (
    <div className="mb-7 border rounded-lg shadow-sm  mt-7 bg-white">
      <div className="">
        <div className="  p-1 sm:px-4 lg:px-6">
          <div className=" flex h-16 items-center justify-between ">
            <div className="   flex items-center sm:hidden">
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

            <div className="flex flex-shrink-0 items-center text-lg font-bold">
              <Link href={"/"}>
                {" "}
                <Image src={siteLogo} width={70} alt="website logo" />
              </Link>
            </div>

            <div className="flex  items-center justify-center sm:items-stretch sm:justify-start ">
              <div className="hidden sm:ml-6 sm:block mt-2 ">
                <div className="flex space-x-4 ">
                  <Link
                    href="/"
                    className=" hover:bg-gray-200 rounded-md px-3 py-2 text-md font-normal hover:underline"
                  >
                    Home
                  </Link>
                  <Link
                    href="/feed"
                    className=" hover:bg-gray-200 rounded-md px-3 py-2 text-md font-normal hover:underline"
                  >
                    Feed
                  </Link>
                  <Link
                    href="/freeBlog"
                    className=" hover:bg-gray-200 rounded-md px-3 py-2 text-md font-normal hover:underline"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>

            <div className="  flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 cursor-pointer">
              {!authenticated ? (
                <div className="relative ml-3">
                  <Link href={"/login"}>
                    <span className="sr-only">Login</span>
                    <span className="flex items-center gap-1 text-md hover:bg-gray-100 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span>Login</span>
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
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="relative ml-3">
                  <div
                    onClick={handleUserMenuToggle}
                    className="relative flex text-md hover:bg-gray-100 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-10 w-10 rounded-xl border p-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="7" />
                        <path d="M12 16s-8-1.5-8 4v2h16v-2c0-5.5-8-4-8-4z" />
                      </svg>
                    </div>
                  </div>
                  {userMenuToggle && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-200 rounded-t-xl"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        Profile
                      </Link>
                      {/* <Link
                        href="#"
                        className="block px-4 py-2 text-md text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        Settings
                      </Link> */}
                      <Link
                        href="/"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-200 rounded-b-xl"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                      >
                        Log out
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {menuToggle ? (
          <div
            className="sm:hidden absolute z-10 bg-white w-screen border rounded-lg shadow"
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              <Link
                href="/"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal hover:underline"
              >
                Home
              </Link>
              <Link
                href="/free-blogs"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal hover:underline"
              >
                Blog
              </Link>
              <Link
                href="/feed"
                className=" hover:bg-gray-200  block rounded-md px-3 py-2 text-base font-normal hover:underline"
              >
                Feed
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default NavBar;
