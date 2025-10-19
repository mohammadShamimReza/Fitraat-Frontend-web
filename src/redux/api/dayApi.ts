import { DayData, ProDaysResponse } from "@/types/contantType";
import { baseApi } from "./baseApi";

const DAYS = "/freedays";
const proDAYS = "/pro-days";

export const daysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDaysByDayId: builder.query<DayData, number>({
      query: (id: number) =>
        `${DAYS}?filters[dayId][$eq]=${id}&populate[0]=free_blog.image&populate[1]=regulerVideo&populate[2]=meditationVideo&populate[3]=free_quizz.quizzess.options&populate[4]=free_kagel.kagelTimes.times`,
      transformResponse: (rawResult: DayData) => {
        return rawResult;
      },
    }),
    getAuthDaysByDayId: builder.query<ProDaysResponse, number>({
      query: (id: number) =>
        `${proDAYS}?filters[dayId][$eq]=${id}&populate[0]=pro_blog.image&populate[1]=regulerVideo&populate[2]=meditationVideo&populate[3]=pro_quizz.quizzess.options&populate[4]=pro_kagel.kagelTimes.times`,
      transformResponse: (rawResult: ProDaysResponse) => {
        return rawResult;
      },
    }),
  }),
});

export const { useGetDaysByDayIdQuery, useGetAuthDaysByDayIdQuery } = daysApi;
