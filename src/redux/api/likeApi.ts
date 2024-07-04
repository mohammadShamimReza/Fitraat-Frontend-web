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
      invalidatesTags: ["createLike"],
      transformResponse: (rawResult: Post) => {
        return rawResult;
      },
    }),
    getLikeOfPost: builder.query({
      query: (data: { postId: number }) => ({
        url: `${LIKE}?populate[0]=user&populate[1]=post&filters[post][id][$eq]=${data.postId}`,
        method: "GET",
      }),
      providesTags: ["createLike"],
      transformResponse: (rawResult: PostData) => {
        return rawResult;
      },
    }),
    postLikeForCurrentUser: builder.query({
      query: (data: { postId: number; userId: number }) => ({
        url: `${LIKE}??populate[0]=user&filters[user][id][$eq]=${data.userId}&populate[1]=post&filters[post][id][$eq]=${data.postId}`,
        method: "GET",
      }),
      providesTags: ["createLike"],
      transformResponse: (rawResult: PostData) => {
        return rawResult;
      },
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useGetLikeOfPostQuery,
  usePostLikeForCurrentUserQuery,
} = postApi;
