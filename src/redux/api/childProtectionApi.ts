import { ChildProtectionListResponse, ProtectionResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const CHILDPROTECTION = "/child-protections";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChildProtectionByDayId: builder.query({
      query: (id: string) =>
        `${CHILDPROTECTION}?filters[numberCount][$eq]=1&populate=*`,
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
    updateUserKagelDay: builder.mutation({
      query: (body) => ({
        url: `users/${body.userId}`,
        method: "PUT",
        body: {
          childProtectionDayNumber: body.compliteDay,
        },
      }),
      transformResponse: (rawResult) => {
        return rawResult;
      },
      invalidatesTags: ["updateUserDay"],
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useGetChildProtectionByDayIdQuery, useUpdateUserKagelDayMutation, useGetChildProtectionAllTitleQuery } =
  blogApi;
