import { BlogData, SingleBlogData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const BLOG = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => BLOG,
      transformResponse: (rawResult: BlogData) => {
        console.log(rawResult);
        return rawResult;
      },
    }),
    getBlogsById: builder.query({
      query: (id: string) =>
        `${BLOG}/${id}?fields[0]=title&fields[1]=content&fields[2]=imageURL&fields[3]=viewCount`,
      transformResponse: (rawResult: SingleBlogData) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogsByIdQuery } = blogApi;
