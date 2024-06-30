import { baseApi } from "./baseApi";

const POST = "/posts";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBlog: builder.mutation({
      query: (body) => ({
        url: `${POST}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["createPost"],
    }),
  }),
});
