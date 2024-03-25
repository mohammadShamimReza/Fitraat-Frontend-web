import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { tagTypesList } from "../tag-types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
    }),
  }),
  // tagTypes: tagTypesList,
});

export const { useGetBlogsQuery } = baseApi;
