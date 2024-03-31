import { Error, UserData } from "@/types/contantType";
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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = daysApi;
