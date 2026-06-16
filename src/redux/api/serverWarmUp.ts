import { SubscribeResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const SERVERWARMUP = "/server-warm-ups";

export const serverWarmUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCheckServerWarmUp: builder.query({
      query: () => `${SERVERWARMUP}`,
      transformResponse: (rawResult : SubscribeResponse | Error) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetCheckServerWarmUpQuery } = serverWarmUpApi;



