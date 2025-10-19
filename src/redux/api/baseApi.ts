"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reliable-deer-385e3b81c0.strapiapp.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.authToken || getTokenFromCookie();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "updateUserDay",
    "updateUser",
    "createPost",
    "deletePost",
    "createLike",
    "deleteLike",
    "createComment",
    "updateComment",
    "deleteComment",
  ],
});
