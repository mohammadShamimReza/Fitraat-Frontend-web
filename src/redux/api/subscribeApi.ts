import { SubscribeResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const SUBSCRIBES = "/subscribers";

export const subscribersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscribers: builder.mutation({
      query: (body) => ({
        url: `${SUBSCRIBES}`,
        method: "POST",
        body: {
          data: body,
        },
      }),

      transformResponse: (rawResult : SubscribeResponse | Error) => {
        return rawResult;
      },
    }),
  }),
});

export const { useCreateSubscribersMutation } = subscribersApi;



