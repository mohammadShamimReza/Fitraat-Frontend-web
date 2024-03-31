import { Error, UserData, UserDataWithDay } from "@/types/contantType";
import { baseApi } from "./baseApi";

const AUTH = "/auth/local";

export const daysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: `${AUTH}/register`,
        method: "POST",
        body,
      }),
      transformResponse: (rawResult: UserData | Error) => {
        return rawResult;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: `${AUTH}`,
        method: "POST",
        body,
      }),
      transformResponse: (rawResult: UserData | Error) => {
        return rawResult;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    getUserInfo: builder.query<UserDataWithDay | Error, void>({
      query: () => ({
        url: `users/me?populate[0]=currentDay&populate[1]=currentDay.video&populate[2]=currentDay.kegel.kegel_times&populate[3]=currentDay.sort_note&populate[4]=currentDay.blog`,
      }),
      transformResponse: (rawResult: UserDataWithDay | Error) => {
        return rawResult;
      },
    }),
    updateUserDay: builder.mutation({
      query: (body) => ({
        url: `users/${body.userId}`,
        method: "POST",
        body: {
          currentDay: body.dayId,
        },
      }),
      transformResponse: (rawResult: UserData | Error) => {
        return rawResult;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
} = daysApi;
