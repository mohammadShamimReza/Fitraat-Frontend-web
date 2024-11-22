"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";

const MyTasks: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: userData,
    isLoading,
    isError: authenticatedUserInfoDataError,
  } = useGetUserInfoQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
    const tokenFromLocalStorage = getTokenFromCookie();
    if (tokenFromLocalStorage) {
      dispatch(storeAuthToken(tokenFromLocalStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      dispatch(storeUserInfo(userData));
    }
  }, [userData, dispatch]);

  if (!isMounted) {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4 rounded-md">
          <Skeleton active title={false} paragraph={{ rows: 6 }} />
        </div>

        {/* Content Box */}
        <div className="flex-1 bg-white p-20 grid grid-cols-2 gap-8">
          {/* Section 1 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <Skeleton
              active
              title={{ width: "50%" }}
              paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
            />
          </div>

          {/* Section 2 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <Skeleton
              active
              title={{ width: "50%" }}
              paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
            />
          </div>

          {/* Section 3 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <Skeleton
              active
              title={{ width: "50%" }}
              paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
            />
          </div>

          {/* Section 4 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <Skeleton
              active
              title={{ width: "50%" }}
              paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
            />
          </div>

          {/* Section 5 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <Skeleton
              active
              title={{ width: "50%" }}
              paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
            />
          </div>

          {/* Section 6 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <Skeleton
              active
              title={{ width: "50%" }}
              paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">hii</div>
    </>
  );
};

export default MyTasks;
