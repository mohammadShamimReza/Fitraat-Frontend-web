import { BlogData, SingleBlogData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const BLOG = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (body: { searchTerm: string }) =>
        `${BLOG}?filters[title][$containsi]=${body.searchTerm}`,
      transformResponse: (rawResult: BlogData) => {
        return rawResult;
      },
    }),
    getBlogsById: builder.query({
      query: (id: string) =>
        `${BLOG}/${id}?filters[title][$containsi]=i&fields[0]=title&fields[1]=content&fields[2]=imageURL&fields[3]=viewCount`,
      transformResponse: (rawResult: SingleBlogData) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogsByIdQuery } = blogApi;
