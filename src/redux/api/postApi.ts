import { Post, PostData } from "@/types/contantType";
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
      transformResponse: (rawResult: Post) => {
        return rawResult;
      },
    }),
    getPost: builder.query({
      query: (body: { pageCount: number }) => ({
        url: `${POST}?sort[0]=updatedAt:desc&populate[0]=user&pagination[page]=${body.pageCount}&pagination[pageSize]=10`,
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
