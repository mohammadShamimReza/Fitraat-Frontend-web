import { baseApi } from "./baseApi";

const PAYMENT = "/payment";
export const paymentAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentInit: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT}/init`,
        method: "POST",
        body: body,
        transformResponse: (rawResult: { url: string }) => {
          return rawResult;
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { usePaymentInitMutation } = paymentAPi;
