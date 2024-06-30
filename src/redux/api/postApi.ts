import { PostData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const POST = "/posts";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: `${POST}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createPost"],
    }),
    getPost: builder.query({
      query: () => ({
        url: `${POST}?sort[0]=createdAt:desc&populate[0]=user`,
        method: "GET",
      }),
      providesTags: ["createPost"],
      transformResponse: (rawResult: PostData) => {
        return rawResult;
      },
    }),
  }),
});

export const { useCreatePostMutation, useGetPostQuery } = postApi;
