"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { storeDayData } from "@/redux/slice/daySlice";
import React, { useEffect, useState } from "react";



const DataLoader: React.FC = () => {
  const unAuthDayIdFormLocalStorage = localStorage.getItem("unAuthDayId");
  const [unAuthDayId] = useState(
    unAuthDayIdFormLocalStorage ? unAuthDayIdFormLocalStorage : "1"
  );
  console.log(unAuthDayId);
  const dispatch = useAppDispatch();

  const { data: userData } = useGetUserInfoQuery();
  const { data: unAuthenticatedDayData } = useGetDaysByDayIdQuery(
    parseInt(unAuthDayId)
  );
  const authDayDataId = userData?.currentDay!;
  const { data: authenticatedDayData } = useGetDaysByDayIdQuery(authDayDataId, {
    skip: !userData,
  });

  useEffect(() => {
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

  useEffect(() => {
    if (!userData && unAuthenticatedDayData) {
      dispatch(storeDayData(unAuthenticatedDayData));
    } else if (userData && authDayDataId && authenticatedDayData) {
      dispatch(storeDayData(authenticatedDayData));
    }
  }, [
    userData,
    unAuthenticatedDayData,
    authenticatedDayData,
    dispatch,
    authDayDataId,
  ]);

  // const {
  //   data: feedPosts,
  //   isLoading,
  //   isFetching,
  // } = useGetPostQuery({ pageCount: 1 });

  // useEffect(() => {
  //   if (feedPosts) {
  //     dispatch(storeFeedData(feedPosts));
  //   }
  // });

  return null; // This component doesn't render anything, just handles data
};

export default DataLoader;
