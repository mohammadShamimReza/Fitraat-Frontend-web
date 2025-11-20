import { ChildProtectionListResponse, ProtectionResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const CHILDPROTECTION = "/child-protections";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChildProtectionByDayId: builder.query({
      query: (id: string) =>
        `${CHILDPROTECTION}?filters[numberCount][$eq]=${id}&populate=*`,
      transformResponse: (rawResult: ProtectionResponse) => {
        return rawResult;
      },
    }),
    getChildProtectionAllTitle: builder.query({
      query: () => `${CHILDPROTECTION}?fields[0]=title&fields[1]=numberCount`,
      transformResponse: (rawResult: ChildProtectionListResponse) => {
        return rawResult;
      },
    }),
    updateUserChildProtectionDay: builder.mutation({
      query: (body) => ({
        url: `users/${body.userId}`,
        method: "PUT",
        body: {
          childProtectionDayNumber: body.childProtectionDayNumber,
        },
      }),
      transformResponse: (rawResult) => {
        return rawResult;
      },
      invalidatesTags: ["updateUserDay"],
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const {
  useGetChildProtectionByDayIdQuery,
  useUpdateUserChildProtectionDayMutation,
  useGetChildProtectionAllTitleQuery,
} = blogApi;
