import { Post, PostData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const LIKE = "/post-likes";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation({
      query: (body) => ({
        url: `${LIKE}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createPost"],
      transformResponse: (rawResult: Post) => {
        return rawResult;
      },
    }),
    getLikeOfPost: builder.query({
      query: (data: { postId: number }) => ({
        url: `${LIKE}?populate[0]=user&populate[1]=post&filters[post][id][$eq]=${data.postId}`,
        method: "GET",
      }),
      providesTags: ["createPost"],
      transformResponse: (rawResult: PostData) => {
        return rawResult;
      },
    }),
  }),
});

export const { useCreateLikeMutation, useGetLikeOfPostQuery } = postApi;
