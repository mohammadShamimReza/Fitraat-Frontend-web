import { Data } from "@/types/contantType";
import { baseApi } from "./baseApi";

const BLOG = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => BLOG,
      transformResponse: (rawResult: Data) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;
