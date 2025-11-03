import { KegelDayIndividualSession } from "@/types/contantType";
import { baseApi } from "./baseApi";

const KAGELINDIVIDUAL = "/kagel-exercises";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKagelIndividualByDayId: builder.query({
      query: (id: string) =>
        `${KAGELINDIVIDUAL}?filters[dayCount][$eq]=${id}&populate[morningkagel][populate][0]=times&populate[afternoonKagel][populate][0]=times&populate[nightKagel][populate][0]=times`,
      transformResponse: (rawResult: { data: KegelDayIndividualSession[] }) => {
        return rawResult;
      },
    }),
  }),
});

export const {
useGetKagelIndividualByDayIdQuery
} = blogApi;
