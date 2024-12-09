import { SingleBlogData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const BLOG = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsById: builder.query({
      query: (id: string) =>
        `${BLOG}/${id}?fields[0]=title&fields[1]=content&fields[2]=imageURL&fields[3]=viewCount&fields[4]=authorName`,
      transformResponse: (rawResult: SingleBlogData) => {
        return rawResult;
      },
    }),
    updateBlog: builder.mutation({
      query: ({
        id,
        updatedFields,
      }: {
        id: number;
        updatedFields: Partial<{ viewCount: number }>;
      }) => ({
        url: `${BLOG}/${id}`,
        method: "PUT",
        body: {
          data: updatedFields,
        },
      }),
    }),
  }),
});

export const { useGetBlogsByIdQuery, useUpdateBlogMutation } = blogApi;
