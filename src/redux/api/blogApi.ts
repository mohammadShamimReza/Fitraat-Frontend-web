import { BlogData, SingleBlogData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const BLOG = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (body: { searchTerm: string; pageCount: number }) =>
        `${BLOG}?filters[title][$containsi]=${body.searchTerm}&pagination[page]=${body.pageCount}&pagination[pageSize]=3`,
      transformResponse: (rawResult: BlogData) => {
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
    get3TrendingBlog: builder.query({
      query: () =>
        `${BLOG}?sort[0]=viewCount:desc&fields[0]=title&fields[1]=content&fields[2]=imageURL&fields[3]=viewCount&pagination[page]=1&pagination[pageSize]=3`,
      transformResponse: (rawResult: BlogData) => {
        return rawResult;
      },
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogsByIdQuery,
  useGet3TrendingBlogQuery,
} = blogApi;
