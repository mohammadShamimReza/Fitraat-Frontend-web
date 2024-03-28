import { baseApi } from "./baseApi";

const DAYS = "/days";

export const daysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDaysById: builder.query({
      query: (id: string) =>
        `${DAYS}?filters[DayId][$eq]=${id}&populate[0]=video&populate[1]=kegel.kegel_times&populate[2]=sort_note&populate[3]=blog`,
      transformResponse: (rawResult) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetDaysByIdQuery } = daysApi;
