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
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },

      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: `${AUTH}`,
        method: "POST",
        body,
      }),
      transformResponse: (rawResult) => {
        return rawResult;
      },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
      invalidatesTags: ["User"],
    }),
    resendConfirmationEmail: builder.mutation({
      query: (body) => ({
        url: `/auth/send-email-confirmation`,
        method: "POST",
        body,
      }),
      transformResponse: (rawResult) => {
        return rawResult;
      },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
      invalidatesTags: ["User"],
    }),
    getUserInfo: builder.query<UserData, void>({
      query: () => ({
        url: `users/me?populate=*`,
      }),
      transformResponse: (rawResult: UserData) => {
        return rawResult;
      },
      providesTags: ["updateUserDay", "updateUser", "User"],
    }),
    updateUserDay: builder.mutation({
      query: (body) => ({
        url: `users/${body.userId}`,
        method: "PUT",
        body: {
          currentDay: body.currentDay,
          compliteDay: body.compliteDay,
        },
      }),
      transformResponse: (rawResult: UserData | Error) => {
        return rawResult;
      },
      invalidatesTags: ["updateUserDay"],
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: {
          email: body.email,
        },
      }),
      transformResponse: (rawResult: { data: { ok: boolean } }) => {
        return rawResult.data;
      },
    }),
    chengePassword: builder.mutation({
      query: (body) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: {
          password: body.password,
          passwordConfirmation: body.passwordConfirmation,
          code: body.code,
        },
      }),
      transformResponse: (rawResult: Error) => {
        return rawResult;
      },
    }),
    uploadUserProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),

    updateUserProfileImage: builder.mutation({
      query: ({ userId, imageId }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { profileImage: imageId },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUserProfileImage: builder.mutation({
      query: (imageId) => ({
        url: `/upload/files/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
  useForgetPasswordMutation,
  useChengePasswordMutation,
  useUploadUserProfileImageMutation,
  useUpdateUserProfileImageMutation,
  useDeleteUserProfileImageMutation,
  useResendConfirmationEmailMutation,
} = daysApi;
