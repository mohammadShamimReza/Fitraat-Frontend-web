import { SubscribeResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const SUBSCRIBES = "/feacture-requests";

export const subscribersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFeatureRequest: builder.mutation({
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

export const { useAddFeatureRequestMutation } = subscribersApi;



