import { DayData } from "@/types/contantType";
import { baseApi } from "./baseApi";

const DAYS = "/days";

export const daysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDaysByDayId: builder.query({
      query: (id: string) =>
        `${DAYS}?filters[DayId][$eq]=${id}&populate[0]=video&populate[1]=kegel.kegel_times&populate[2]=sort_note&populate[3]=blog`,
      transformResponse: (rawResult: DayData) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetDaysByDayIdQuery } = daysApi;
