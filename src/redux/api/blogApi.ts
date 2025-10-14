import { Blog } from "@/types/contantType";
import { baseApi } from "./baseApi";

const BLOG = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsById: builder.query({
      query: (id: string) =>
        `${BLOG}/${id}?fields[0]=title&fields[1]=content&fields[2]=imageURL&fields[3]=viewCount&fields[4]=authorName`,
      transformResponse: (rawResult: Blog) => {
        return rawResult;
      },
    }),
    updateBlog: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `${BLOG}/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetBlogsByIdQuery, useUpdateBlogMutation } = blogApi;
