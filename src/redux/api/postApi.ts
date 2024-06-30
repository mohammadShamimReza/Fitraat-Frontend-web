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
  }),
});

export const { useCreatePostMutation } = postApi;