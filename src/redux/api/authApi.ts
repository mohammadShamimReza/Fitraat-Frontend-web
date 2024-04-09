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
    getUserInfo: builder.query<UserDataWithDay, void>({
      query: () => ({
        url: `users/me`,
      }),
      transformResponse: (rawResult: UserDataWithDay) => {
        return rawResult;
      },
    }),
    updateUserDay: builder.mutation({
      query: (body) => ({
        url: `users/${body.userId}`,
        method: "PUT",
        body: {
          currentDay: body.currentDay,
          compliteDay: body.currentDay,
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
