import { EmergencyProtocolResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const EMERGENCY = "/emergencies";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnergencyContant: builder.query({
      query: () => `${EMERGENCY}?populate=video`,
      transformResponse: (rawResult: EmergencyProtocolResponse) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetEnergencyContantQuery } = blogApi;
