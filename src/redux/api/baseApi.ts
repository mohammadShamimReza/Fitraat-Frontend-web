"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getTokenFromCookie } from "@/lib/auth/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
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
  tagTypes: ["updateUserDay", "updateUser", "User"],
});
